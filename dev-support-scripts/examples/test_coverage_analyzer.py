#!/usr/bin/env python3
"""
Test Coverage Analyzer for AI-Consumable Code Insights

This script analyzes test files to extract coverage information and test scenarios,
presenting them in a structured, concise format that provides valuable insights
for AI consumers without excessive context consumption.
"""

import os
import ast
import sys
import json
import re
from pathlib import Path
from collections import defaultdict
import importlib.util

class TestCoverageSummary:
    """Structured representation of test coverage insights."""
    
    def __init__(self):
        self.coverage_map = {}  # Maps source modules to their test coverage
        self.component_scenarios = defaultdict(list)  # Key test scenarios by component
        self.untested_components = []  # Components with no identified tests
    
    def add_component_test(self, component_path, test_file, test_cases):
        """Add test coverage for a component."""
        if component_path not in self.coverage_map:
            self.coverage_map[component_path] = {
                "test_files": [],
                "test_count": 0,
                "scenario_count": 0
            }
        
        self.coverage_map[component_path]["test_files"].append(test_file)
        self.coverage_map[component_path]["test_count"] += len(test_cases)
        
        # Add extracted test scenarios
        for case in test_cases:
            if case["scenario"] and len(self.component_scenarios[component_path]) < 5:  # Limit to 5 scenarios per component
                self.component_scenarios[component_path].append({
                    "name": case["name"],
                    "scenario": case["scenario"]
                })
                self.coverage_map[component_path]["scenario_count"] += 1
    
    def mark_untested(self, component_path):
        """Mark a component as untested."""
        self.untested_components.append(component_path)
    
    def to_json(self):
        """Convert to JSON representation."""
        return {
            "tested_components": {
                component: {
                    "test_files": info["test_files"],
                    "test_count": info["test_count"],
                    "scenario_count": info["scenario_count"],
                    "scenarios": self.component_scenarios.get(component, [])
                }
                for component, info in self.coverage_map.items()
            },
            "untested_components": self.untested_components,
            "coverage_stats": {
                "total_components": len(self.coverage_map) + len(self.untested_components),
                "tested_components": len(self.coverage_map),
                "total_tests": sum(info["test_count"] for info in self.coverage_map.values()),
                "coverage_percentage": round(100 * len(self.coverage_map) / 
                                          max(1, len(self.coverage_map) + len(self.untested_components)), 2)
            }
        }

class TestCaseExtractor(ast.NodeVisitor):
    """Extract test cases and scenarios from Python test files."""
    
    def __init__(self):
        self.test_cases = []
        self.current_class = None
    
    def visit_ClassDef(self, node):
        """Visit test classes."""
        prev_class = self.current_class
        self.current_class = node.name
        
        # Check if this is a test class
        if node.name.startswith('Test') or node.name.endswith('Test'):
            for base in node.bases:
                if isinstance(base, ast.Name) and base.id in ('TestCase', 'unittest.TestCase'):
                    # Extract class docstring as common scenario
                    class_scenario = None
                    if (node.body and isinstance(node.body[0], ast.Expr) and 
                        isinstance(getattr(node.body[0], 'value', None), ast.Constant)):
                        class_scenario = node.body[0].value.value.strip()
                    
                    # Visit the class methods
                    for item in node.body:
                        if isinstance(item, ast.FunctionDef) and item.name.startswith('test_'):
                            self.extract_test_info(item, class_scenario)
        
        # Visit any nested classes
        self.generic_visit(node)
        self.current_class = prev_class
    
    def visit_FunctionDef(self, node):
        """Visit standalone test functions."""
        if not self.current_class and node.name.startswith('test_'):
            self.extract_test_info(node)
    
    def extract_test_info(self, node, class_scenario=None):
        """Extract test case information from a function node."""
        # Extract function docstring
        scenario = None
        if (node.body and isinstance(node.body[0], ast.Expr) and 
            isinstance(getattr(node.body[0], 'value', None), ast.Constant)):
            scenario = node.body[0].value.value.strip()
        
        # Use the class scenario if no function scenario
        if not scenario and class_scenario:
            scenario = class_scenario
        
        # Create test case entry
        test_case = {
            "name": node.name,
            "scenario": scenario,
            "class": self.current_class
        }
        
        # Look for assertions to get expected behavior
        assertion_extractor = AssertionExtractor()
        assertion_extractor.visit(node)
        
        if assertion_extractor.assertions:
            test_case["assertions"] = assertion_extractor.assertions[:3]  # Limit to 3 assertions
        
        self.test_cases.append(test_case)

class AssertionExtractor(ast.NodeVisitor):
    """Extract assertion statements from AST nodes."""
    
    def __init__(self):
        self.assertions = []
    
    def visit_Call(self, node):
        """Visit function call nodes to find assertions."""
        if isinstance(node.func, ast.Attribute) and node.func.attr.startswith('assert'):
            assertion = self.get_assertion_text(node)
            if assertion:
                self.assertions.append(assertion)
        elif isinstance(node.func, ast.Name) and node.func.id.startswith('assert'):
            assertion = self.get_assertion_text(node)
            if assertion:
                self.assertions.append(assertion)
        
        self.generic_visit(node)
    
    def get_assertion_text(self, node):
        """Convert assertion node to readable text."""
        try:
            if hasattr(ast, 'unparse'):  # Python 3.9+
                return ast.unparse(node).strip()
            else:
                # Simple fallback for earlier Python versions
                if isinstance(node.func, ast.Attribute):
                    return f"{node.func.attr}(...)"
                else:
                    return f"{node.func.id}(...)"
        except:
            return None

def find_source_component(test_file, source_dirs):
    """Find the source component that a test file is testing."""
    # Extract potential component name from test file name
    test_name = os.path.basename(test_file)
    # Remove test_ prefix and _test suffix from filename
    component_name = re.sub(r'^test_|_test$', '', os.path.splitext(test_name)[0])
    
    # Look for potential source files in source directories
    potential_matches = []
    for source_dir in source_dirs:
        for root, _, files in os.walk(source_dir):
            for file in files:
                if file.endswith('.py') and component_name in file:
                    potential_match = os.path.join(root, file)
                    potential_matches.append(potential_match)
    
    # If we have a single match, return it
    if len(potential_matches) == 1:
        return potential_matches[0]
    
    # If we have multiple matches, check imports in the test file
    if len(potential_matches) > 1:
        try:
            with open(test_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            tree = ast.parse(content)
            for node in ast.walk(tree):
                if isinstance(node, ast.Import) or isinstance(node, ast.ImportFrom):
                    for match in potential_matches:
                        module_name = os.path.splitext(os.path.basename(match))[0]
                        if isinstance(node, ast.Import):
                            for name in node.names:
                                if module_name == name.name:
                                    return match
                        elif isinstance(node, ast.ImportFrom):
                            if module_name in node.module:
                                return match
        except Exception as e:
            print(f"Error parsing imports in {test_file}: {e}")
    
    # If still no match, return the best guess or None
    return potential_matches[0] if potential_matches else None

def analyze_test_file(test_file):
    """Analyze a test file to extract test cases and scenarios."""
    try:
        with open(test_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        tree = ast.parse(content)
        extractor = TestCaseExtractor()
        extractor.visit(tree)
        return extractor.test_cases
    except Exception as e:
        print(f"Error analyzing {test_file}: {e}")
        return []

def find_python_files(directory, file_pattern):
    """Find all Python files in a directory that match the pattern."""
    directory = Path(directory)
    python_files = []
    
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.py') and file_pattern in file:
                python_files.append(os.path.join(root, file))
    
    return python_files

def find_untested_components(source_dirs, tested_components):
    """Find source components that don't have tests."""
    untested = []
    
    for source_dir in source_dirs:
        for root, _, files in os.walk(source_dir):
            for file in files:
                if file.endswith('.py'):
                    # Skip __init__.py and obvious utility files
                    if file == '__init__.py' or 'utils' in file or 'helpers' in file:
                        continue
                    
                    filepath = os.path.join(root, file)
                    if filepath not in tested_components:
                        untested.append(filepath)
    
    return untested

def generate_coverage_summary(base_dir, output_dir):
    """Generate test coverage summary for a project."""
    base_dir = Path(base_dir)
    summary = TestCoverageSummary()
    
    # Identify source and test directories
    source_dirs = [
        base_dir / "viewer",
        base_dir / "git_commit_viewer"
    ]
    test_dirs = [
        base_dir / "tests",
    ]
    
    # Find test files
    test_files = []
    for test_dir in test_dirs:
        if test_dir.exists():
            test_files.extend(find_python_files(test_dir, 'test_'))
    
    # Analyze each test file
    for test_file in test_files:
        component = find_source_component(test_file, source_dirs)
        if component:
            test_cases = analyze_test_file(test_file)
            summary.add_component_test(component, test_file, test_cases)
    
    # Find untested components
    tested_components = list(summary.coverage_map.keys())
    untested = find_untested_components(source_dirs, tested_components)
    for component in untested:
        summary.mark_untested(component)
    
    # Generate summaries
    output_dir = Path(output_dir)
    os.makedirs(output_dir, exist_ok=True)
    
    # Summary by module
    with open(output_dir / "test_coverage_summary.json", 'w', encoding='utf-8') as f:
        json.dump(summary.to_json(), f, indent=2)
    
    # High-level statistics in text format for quick review
    with open(output_dir / "test_coverage_overview.txt", 'w', encoding='utf-8') as f:
        stats = summary.to_json()["coverage_stats"]
        f.write(f"Test Coverage Overview\n")
        f.write(f"=====================\n\n")
        f.write(f"Total components: {stats['total_components']}\n")
        f.write(f"Components with tests: {stats['tested_components']} ({stats['coverage_percentage']}%)\n")
        f.write(f"Total test cases: {stats['total_tests']}\n\n")
        
        # Add top untested components (limit to 10)
        if summary.untested_components:
            f.write(f"Top untested components:\n")
            for component in summary.untested_components[:10]:
                f.write(f"  - {os.path.relpath(component, base_dir)}\n")
            
            if len(summary.untested_components) > 10:
                f.write(f"  - ... and {len(summary.untested_components) - 10} more\n")
    
    print(f"Test coverage analysis complete. Results saved to {output_dir}")
    return output_dir / "test_coverage_summary.json"

def main():
    """Main function to generate test coverage analysis."""
    # Base project directory
    base_dir = Path(__file__).parent.parent.parent
    
    # Output directory
    output_dir = Path(__file__).parent / "Output" / "test_coverage"
    
    # Generate coverage summary
    coverage_file = generate_coverage_summary(base_dir, output_dir)
    print(f"Coverage summary generated: {coverage_file}")

if __name__ == "__main__":
    main()
