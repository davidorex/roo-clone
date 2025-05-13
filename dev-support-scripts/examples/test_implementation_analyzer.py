#!/usr/bin/env python3
"""
Test-Implementation Alignment Analyzer

Analyzes alignment between tests and implementation to identify discrepancies
that may cause test failures. This script helps identify:

- Tests checking outdated default values
- Mock assertions targeting incorrect paths
- Parameter expectations that don't match implementation signatures
- Incorrect assertions or assumptions in tests

Features:
- Cross-references test assertions with actual implementations
- Identifies value mismatches and signature changes
- Maps test coverage against implementation structure
- Works with any module in the system, not just vector components
"""

import os
import sys
import ast
import json
import re
import argparse
from typing import Dict, List, Any, Set, Tuple, Optional

# Default output directory
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "Output", "test_alignment")


class AssertionVisitor(ast.NodeVisitor):
    """AST visitor that extracts assertions from tests."""
    
    def __init__(self):
        self.assertions = []
        self.current_function = None
        self.current_class = None
        self.imports = {}
        self.from_imports = {}
        self.mocks = []
    
    def visit_ClassDef(self, node):
        """Track the current class."""
        old_class = self.current_class
        self.current_class = node.name
        
        # Visit class body
        for child in node.body:
            self.visit(child)
        
        self.current_class = old_class
    
    def visit_FunctionDef(self, node):
        """Track the current function."""
        # Only process test functions
        if not (node.name.startswith('test_') or 
                (self.current_class and self.current_class.startswith('Test'))):
            return
        
        old_function = self.current_function
        qualname = f"{self.current_class}.{node.name}" if self.current_class else node.name
        self.current_function = qualname
        
        # Visit function body
        for child in node.body:
            self.visit(child)
        
        self.current_function = old_function
    
    def visit_Assert(self, node):
        """Extract assertions."""
        assertion = {
            "function": self.current_function,
            "line_number": node.lineno,
            "type": "assert",
            "test": self._get_assert_details(node.test),
            "message": self._get_assert_message(node)
        }
        self.assertions.append(assertion)
    
    def visit_Call(self, node):
        """Track assertion method calls and mocks."""
        func = node.func
        
        # Look for assertion methods (assertEquals, assertTrue, etc.)
        if isinstance(func, ast.Attribute):
            if func.attr.startswith('assert'):
                assertion = {
                    "function": self.current_function,
                    "line_number": node.lineno,
                    "type": "method",
                    "method": func.attr,
                    "args": [self._extract_arg(arg) for arg in node.args],
                }
                self.assertions.append(assertion)
            
            # Look for patch/mock calls
            elif func.attr in ('patch', 'patch_object', 'Mock', 'MagicMock'):
                mock_info = {
                    "function": self.current_function,
                    "line_number": node.lineno,
                    "type": func.attr
                }
                
                # Extract target
                if node.args:
                    mock_info["target"] = self._extract_arg(node.args[0])
                
                # Extract mock configuration
                for kw in node.keywords:
                    mock_info[kw.arg] = self._extract_arg(kw.value)
                
                self.mocks.append(mock_info)
        
        # Continue visiting arguments
        for arg in node.args:
            self.visit(arg)
        for kw in node.keywords:
            self.visit(kw.value)
    
    def visit_Import(self, node):
        """Track imports."""
        for name in node.names:
            module_name = name.name
            alias = name.asname or module_name
            self.imports[alias] = module_name
    
    def visit_ImportFrom(self, node):
        """Track from-imports."""
        if node.module is None:  # Relative import like "from . import x"
            return
        
        module = node.module
        for name in node.names:
            imported_name = name.name
            alias = name.asname or imported_name
            self.from_imports[alias] = (module, imported_name)
    
    def _get_assert_details(self, node):
        """Extract details from an assertion test node."""
        if isinstance(node, ast.Compare):
            # Handle comparisons like a == b, a > b, etc.
            left = self._extract_arg(node.left)
            ops = [self._get_op_symbol(op) for op in node.ops]
            comparators = [self._extract_arg(comp) for comp in node.comparators]
            
            return {
                "type": "comparison",
                "left": left,
                "ops": ops,
                "comparators": comparators,
            }
        elif isinstance(node, ast.Call):
            # Handle function calls like callable(x)
            func = self._extract_arg(node.func)
            args = [self._extract_arg(arg) for arg in node.args]
            
            return {
                "type": "call",
                "function": func,
                "args": args,
            }
        else:
            # Handle other expressions like bool tests
            return {
                "type": "expression",
                "value": self._extract_arg(node),
            }
    
    def _get_assert_message(self, node):
        """Extract assertion message if available."""
        if hasattr(node, 'msg') and node.msg:
            return self._extract_arg(node.msg)
        return None
    
    def _get_op_symbol(self, op):
        """Convert AST operator to symbol string."""
        op_map = {
            ast.Eq: '==',
            ast.NotEq: '!=',
            ast.Lt: '<',
            ast.LtE: '<=',
            ast.Gt: '>',
            ast.GtE: '>=',
            ast.Is: 'is',
            ast.IsNot: 'is not',
            ast.In: 'in',
            ast.NotIn: 'not in',
        }
        return op_map.get(type(op), str(type(op)))
    
    def _extract_arg(self, node):
        """Extract value from an AST node."""
        if isinstance(node, ast.Str):
            return node.s
        elif isinstance(node, ast.Num):
            return node.n
        elif isinstance(node, ast.NameConstant):
            return node.value
        elif isinstance(node, ast.Name):
            return {"name": node.id}
        elif isinstance(node, ast.Attribute):
            base = self._extract_arg(node.value)
            if isinstance(base, dict) and "name" in base:
                base_name = base["name"]
                return {"name": f"{base_name}.{node.attr}"}
            return f"<attr of {base}>.{node.attr}"
        elif isinstance(node, ast.Call):
            func = self._extract_arg(node.func)
            return f"{func}(...)"
        elif isinstance(node, ast.List):
            return [self._extract_arg(elt) for elt in node.elts]
        elif isinstance(node, ast.Dict):
            keys = [self._extract_arg(k) for k in node.keys]
            values = [self._extract_arg(v) for v in node.values]
            return dict(zip(keys, values))
        return str(type(node))


class ImplementationVisitor(ast.NodeVisitor):
    """AST visitor that extracts implementation details for comparison."""
    
    def __init__(self):
        self.functions = {}
        self.classes = {}
        self.constants = {}
        self.default_values = {}
        self.current_class = None
    
    def visit_ClassDef(self, node):
        """Extract class information."""
        class_info = {
            "name": node.name,
            "methods": {},
            "attributes": {},
            "base_classes": [self._get_name(base) for base in node.bases],
            "docstring": self._get_docstring(node),
        }
        
        old_class = self.current_class
        self.current_class = node.name
        
        # Look for class attributes
        for item in node.body:
            if isinstance(item, ast.Assign):
                for target in item.targets:
                    if isinstance(target, ast.Name):
                        class_info["attributes"][target.id] = self._extract_value(item.value)
            self.visit(item)
        
        self.classes[node.name] = class_info
        self.current_class = old_class
    
    def visit_FunctionDef(self, node):
        """Extract function information."""
        if self.current_class:
            # Method in a class
            method_info = self._extract_function_info(node)
            self.classes[self.current_class]["methods"][node.name] = method_info
        else:
            # Top-level function
            function_info = self._extract_function_info(node)
            self.functions[node.name] = function_info
    
    def visit_Assign(self, node):
        """Extract top-level assignments (constants)."""
        if not self.current_class:  # Only at module level
            for target in node.targets:
                if isinstance(target, ast.Name):
                    name = target.id
                    # If name is all caps, treat as constant
                    if name.isupper():
                        self.constants[name] = self._extract_value(node.value)
    
    def _extract_function_info(self, node):
        """Extract detailed information about a function."""
        # Get function signature
        parameters = []
        defaults_offset = len(node.args.args) - len(node.args.defaults)
        
        for i, arg in enumerate(node.args.args):
            param = {
                "name": arg.arg,
                "has_default": i >= defaults_offset,
            }
            
            # Extract type annotation if available
            if arg.annotation:
                param["type"] = self._get_name(arg.annotation)
            
            # Extract default value if available
            if i >= defaults_offset:
                default_idx = i - defaults_offset
                default_value = self._extract_value(node.args.defaults[default_idx])
                param["default"] = default_value
                
                # Track default value with function name context
                context = f"{self.current_class}.{node.name}.{arg.arg}" if self.current_class else f"{node.name}.{arg.arg}"
                self.default_values[context] = default_value
            
            parameters.append(param)
        
        # Extract return value patterns
        returns = self._extract_return_patterns(node)
        
        return {
            "parameters": parameters,
            "docstring": self._get_docstring(node),
            "return_type": self._get_name(node.returns) if node.returns else None,
            "returns": returns,
        }
    
    def _extract_return_patterns(self, node):
        """Extract return statement patterns from a function."""
        class ReturnVisitor(ast.NodeVisitor):
            def __init__(self):
                self.returns = []
            
            def visit_Return(self, node):
                if node.value:
                    self.returns.append(node.value)
        
        visitor = ReturnVisitor()
        visitor.visit(node)
        
        # Convert return AST nodes to values
        return [self._extract_value(ret) for ret in visitor.returns]
    
    def _extract_value(self, node):
        """Extract a value from an AST node."""
        if isinstance(node, ast.Str):
            return node.s
        elif isinstance(node, ast.Num):
            return node.n
        elif isinstance(node, ast.NameConstant):
            return node.value
        elif isinstance(node, ast.Name):
            return {"reference": node.id}
        elif isinstance(node, ast.Attribute):
            if isinstance(node.value, ast.Name):
                return {"reference": f"{node.value.id}.{node.attr}"}
            return {"complex_reference": self._get_name(node)}
        elif isinstance(node, ast.List):
            return [self._extract_value(elt) for elt in node.elts]
        elif isinstance(node, ast.Dict):
            keys = [self._extract_value(k) for k in node.keys]
            values = [self._extract_value(v) for v in node.values]
            return {"dict": dict(zip(keys, values))}
        elif isinstance(node, ast.Call):
            return {"call": self._get_name(node.func)}
        return {"unknown": str(type(node))}
    
    def _get_docstring(self, node):
        """Extract docstring from an AST node."""
        if not node.body:
            return None
        first_node = node.body[0]
        if isinstance(first_node, ast.Expr) and isinstance(first_node.value, ast.Str):
            return first_node.value.s.strip()
        return None
    
    def _get_name(self, node):
        """Get string representation of a name node."""
        if isinstance(node, ast.Name):
            return node.id
        elif isinstance(node, ast.Attribute):
            return f"{self._get_name(node.value)}.{node.attr}"
        elif isinstance(node, ast.Call):
            return f"{self._get_name(node.func)}(...)"
        elif isinstance(node, ast.Subscript):
            return f"{self._get_name(node.value)}[...]"
        return str(type(node))


def analyze_test_file(file_path: str) -> Dict[str, Any]:
    """Analyze assertions and mocks in a test file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        code = f.read()
    
    # Parse the AST
    tree = ast.parse(code, filename=file_path)
    
    # Extract test module name
    rel_path = os.path.relpath(file_path, os.path.dirname(__file__))
    module_name = os.path.splitext(rel_path)[0].replace(os.sep, '.')
    
    # Get test details
    visitor = AssertionVisitor()
    visitor.visit(tree)
    
    return {
        "module_name": module_name,
        "file_path": file_path,
        "assertions": visitor.assertions,
        "mocks": visitor.mocks,
        "imports": visitor.imports,
        "from_imports": visitor.from_imports,
    }


def analyze_implementation_file(file_path: str) -> Dict[str, Any]:
    """Analyze an implementation file for comparison with tests."""
    with open(file_path, 'r', encoding='utf-8') as f:
        code = f.read()
    
    # Parse the AST
    tree = ast.parse(code, filename=file_path)
    
    # Extract module name
    rel_path = os.path.relpath(file_path, os.path.dirname(__file__))
    module_name = os.path.splitext(rel_path)[0].replace(os.sep, '.')
    
    # Get implementation details
    visitor = ImplementationVisitor()
    visitor.visit(tree)
    
    return {
        "module_name": module_name,
        "file_path": file_path,
        "classes": visitor.classes,
        "functions": visitor.functions,
        "constants": visitor.constants,
        "default_values": visitor.default_values,
    }


def analyze_test_directory(dir_path: str) -> Dict[str, Dict[str, Any]]:
    """Recursively analyze test files in a directory."""
    results = {}
    
    for root, _, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.py') and (file.startswith('test_') or 'test' in root):
                file_path = os.path.join(root, file)
                try:
                    result = analyze_test_file(file_path)
                    results[result["module_name"]] = result
                except Exception as e:
                    print(f"Error analyzing test file {file_path}: {e}")
    
    return results


def analyze_implementation_directory(dir_path: str) -> Dict[str, Dict[str, Any]]:
    """Recursively analyze implementation files in a directory."""
    results = {}
    
    for root, _, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.py') and not (file.startswith('test_') or 'test' in root):
                file_path = os.path.join(root, file)
                try:
                    result = analyze_implementation_file(file_path)
                    results[result["module_name"]] = result
                except Exception as e:
                    print(f"Error analyzing implementation file {file_path}: {e}")
    
    return results


def identify_mismatches(test_results: Dict[str, Dict[str, Any]],
                       impl_results: Dict[str, Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
    """Identify mismatches between tests and implementations."""
    mismatches = {
        "default_values": [],
        "mock_targets": [],
        "assertion_values": [],
        "method_signatures": [],
    }
    
    # Collect all default values from implementations
    all_defaults = {}
    for module, result in impl_results.items():
        all_defaults.update(result["default_values"])
        
        # Add constants that look like defaults
        for const_name, const_value in result["constants"].items():
            if const_name.startswith('DEFAULT_'):
                param_name = const_name[8:].lower()
                all_defaults[f"{module}.{param_name}"] = const_value
    
    # Check for hard-coded assertion values that might be testing defaults
    default_value_patterns = {
        1536: ["dimension", "vector_dimension"],
        "cosine": ["metric", "similarity_metric", "distance"]
    }
    
    for module, test in test_results.items():
        for assertion in test["assertions"]:
            # Check for value assertions
            if assertion["type"] == "assert" and assertion["test"]["type"] == "comparison":
                # Extract values from comparison
                values = []
                if isinstance(assertion["test"]["left"], (int, float, str)):
                    values.append((assertion["test"]["left"], "left"))
                
                for i, comp in enumerate(assertion["test"]["comparators"]):
                    if isinstance(comp, (int, float, str)):
                        values.append((comp, f"comparator_{i}"))
                
                # Check if these values match known defaults
                for value, position in values:
                    if isinstance(value, (int, float, str)):
                        # Look for similar patterns in default values
                        for def_key, def_value in all_defaults.items():
                            if def_value == value:
                                # This might be a default value assertion
                                mismatches["default_values"].append({
                                    "test_module": module,
                                    "test_function": assertion["function"],
                                    "line": assertion["line_number"],
                                    "assertion_value": value,
                                    "default_source": def_key,
                                    "position": position,
                                })
                            
                        # Check for common default patterns
                        for pattern_value, related_names in default_value_patterns.items():
                            if value == pattern_value:
                                # Find nearby variable names for context
                                context = str(assertion["test"])
                                matches = False
                                for name in related_names:
                                    if name in context.lower():
                                        matches = True
                                        break
                                
                                if matches:
                                    mismatches["default_values"].append({
                                        "test_module": module,
                                        "test_function": assertion["function"],
                                        "line": assertion["line_number"],
                                        "assertion_value": value,
                                        "default_pattern": f"Possible {pattern_value} default",
                                        "position": position,
                                    })
    
    # Check for mock targets that might not exist or have moved
    mock_targets = {}
    for module, test in test_results.items():
        for mock in test["mocks"]:
            if "target" in mock and isinstance(mock["target"], str):
                if mock["target"] not in mock_targets:
                    mock_targets[mock["target"]] = []
                mock_targets[mock["target"]].append({
                    "test_module": module,
                    "test_function": mock["function"],
                    "line": mock["line_number"],
                    "type": mock["type"],
                })
    
    # Look for implementation modules matching mock targets
    for target, mocks in mock_targets.items():
        found = False
        
        # Try to match to an implementation module/function
        for module, impl in impl_results.items():
            # Check direct module match
            if target == module or target.startswith(f"{module}."):
                found = True
                break
            
            # Check function match
            for func_name in impl["functions"]:
                if target.endswith(f".{func_name}"):
                    found = True
                    break
            
            # Check class/method match
            for class_name, class_info in impl["classes"].items():
                class_path = f"{module}.{class_name}"
                if target == class_path or target.startswith(f"{class_path}."):
                    found = True
                    break
        
        if not found:
            for mock_info in mocks:
                mismatches["mock_targets"].append({
                    "test_module": mock_info["test_module"],
                    "test_function": mock_info["test_function"],
                    "line": mock_info["line"],
                    "mock_target": target,
                    "mock_type": mock_info["type"],
                    "issue": "Mock target not found in analyzed implementations",
                })
    
    return mismatches


def generate_alignment_report(mismatches: Dict[str, List[Dict[str, Any]]], 
                            additional_info: Dict[str, Any] = None) -> str:
    """Generate a human-readable report of test-implementation mismatches."""
    lines = ["Test-Implementation Alignment Analysis", 
             "=====================================", ""]
    
    # Add stats
    total_issues = sum(len(issues) for issues in mismatches.values())
    lines.append(f"Total potential issues detected: {total_issues}")
    
    for category, issues in mismatches.items():
        if issues:
            lines.append(f"- {category}: {len(issues)} issues")
    
    lines.append("")
    
    # Add module coverage info if provided
    if additional_info and "coverage" in additional_info:
        coverage = additional_info["coverage"]
        lines.append(f"Implementation modules: {coverage['total_modules']}")
        lines.append(f"Test modules: {coverage['total_test_modules']}")
        lines.append(f"Modules with tests: {coverage['modules_with_tests']} ({coverage['coverage_percentage']:.1f}%)")
        lines.append("")
    
    # Default value mismatches
    if mismatches["default_values"]:
        lines.append("Potential Default Value Mismatches")
        lines.append("-------------------------------")
        
        # Group by similar values
        by_value = {}
        for issue in mismatches["default_values"]:
            value = issue["assertion_value"]
            if value not in by_value:
                by_value[value] = []
            by_value[value].append(issue)
        
        for value, issues in by_value.items():
            lines.append(f"\nValue: {value}")
            for issue in issues[:5]:  # Limit to first 5 occurrences
                lines.append(f"  - {issue['test_module']}.{issue['test_function']} (line {issue['line']})")
                if "default_source" in issue:
                    lines.append(f"    Default source: {issue['default_source']}")
                if "default_pattern" in issue:
                    lines.append(f"    Pattern: {issue['default_pattern']}")
            
            if len(issues) > 5:
                lines.append(f"    ... and {len(issues) - 5} more instances")
    
    # Mock target issues
    if mismatches["mock_targets"]:
        lines.append("\nPotential Mock Target Issues")
        lines.append("--------------------------")
        
        # Group by mock target
        by_target = {}
        for issue in mismatches["mock_targets"]:
            target = issue["mock_target"]
            if target not in by_target:
                by_target[target] = []
            by_target[target].append(issue)
        
        for target, issues in by_target.items():
            lines.append(f"\nMock target: {target}")
            for issue in issues[:5]:  # Limit to first 5 occurrences
                lines.append(f"  - {issue['test_module']}.{issue['test_function']} (line {issue['line']})")
                lines.append(f"    Issue: {issue['issue']}")
            
            if len(issues) > 5:
                lines.append(f"    ... and {len(issues) - 5} more instances")
    
    # Add recommendations
    lines.append("\nRecommendations")
    lines.append("--------------")
    
    if mismatches["default_values"]:
        lines.append("\n1. Default Value Testing:")
        lines.append("   - Consider retrieving default values dynamically in tests instead of hardcoding them")
        lines.append("   - Update tests to match current default values or use configuration-aware approaches")
        lines.append("   - Use direct API calls to get actual defaults instead of assuming values")
    
    if mismatches["mock_targets"]:
        lines.append("\n2. Mock Targeting:")
        lines.append("   - Update mock targets to match current module structure")
        lines.append("   - Consider mocking at a higher level (services/registry) instead of individual functions")
        lines.append("   - Verify mock assertions with alternative validation approaches")
    
    lines.append("\nGeneral Testing Strategy:")
    lines.append("- Focus on validating behavior rather than implementation details")
    lines.append("- Use more flexible assertions that accommodate legitimate implementation variations")
    lines.append("- Consider introducing test helpers that adapt to implementation changes")
    
    return "\n".join(lines)


def analyze_test_implementation_alignment(test_dir: str, impl_dir: str, 
                                        output_dir: str = OUTPUT_DIR):
    """Analyze alignment between tests and implementations."""
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    # Determine component name from impl directory path
    component_name = os.path.basename(os.path.normpath(impl_dir))
    
    # Analyze tests
    print(f"Analyzing tests in {test_dir}...")
    test_results = analyze_test_directory(test_dir)
    
    # Analyze implementations
    print(f"Analyzing implementations in {impl_dir}...")
    impl_results = analyze_implementation_directory(impl_dir)
    
    # Save raw analysis results
    test_file = os.path.join(output_dir, f"{component_name}_test_analysis.json")
    with open(test_file, 'w', encoding='utf-8') as f:
        json.dump(test_results, f, indent=2, default=str)
    
    impl_file = os.path.join(output_dir, f"{component_name}_impl_analysis.json") 
    with open(impl_file, 'w', encoding='utf-8') as f:
        json.dump(impl_results, f, indent=2, default=str)
    
    # Identify mismatches
    mismatches = identify_mismatches(test_results, impl_results)
    
    # Calculate basic coverage statistics
    impl_modules = set(impl_results.keys())
    test_modules = set(test_results.keys())
    
    # Transform test module names to match impl modules for comparison
    test_patterns = []
    for test_module in test_modules:
        # Extract core module name from test module name
        parts = test_module.split('.')
        for i, part in enumerate(parts):
            if part == 'tests' or part.startswith('test_'):
                # Look at the part after 'tests' or 'test_'
                if i+1 < len(parts):
                    test_patterns.append(parts[i+1])
                break
    
    # Count modules that appear to have tests
    modules_with_tests = 0
    for impl_module in impl_modules:
        parts = impl_module.split('.')
        for part in parts:
            if part in test_patterns:
                modules_with_tests += 1
                break
    
    coverage_info = {
        "total_modules": len(impl_modules),
        "total_test_modules": len(test_modules),
        "modules_with_tests": modules_with_tests,
        "coverage_percentage": (modules_with_tests / len(impl_modules) * 100) if impl_modules else 0,
    }
    
    # Generate report
    report = generate_alignment_report(mismatches, {"coverage": coverage_info})
    report_file = os.path.join(output_dir, f"{component_name}_alignment_report.txt")
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"Test-implementation alignment analysis completed:")
    print(f"- Test analysis: {test_file}")
    print(f"- Implementation analysis: {impl_file}")
    print(f"- Alignment report: {report_file}")
    
    return mismatches


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Analyze alignment between tests and implementations")
    parser.add_argument(
        "test_dir", 
        help="Test directory to analyze (relative to project root)"
    )
    parser.add_argument(
        "impl_dir", 
        help="Implementation directory to analyze (relative to project root)"
    )
    parser.add_argument(
        "--output-dir", 
        help="Output directory for analysis files",
        default=OUTPUT_DIR
    )
    
    args = parser.parse_args()
    
    # Resolve directory paths
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    test_dir = os.path.join(project_root, args.test_dir)
    impl_dir = os.path.join(project_root, args.impl_dir)
    
    analyze_test_implementation_alignment(
        test_dir=test_dir,
        impl_dir=impl_dir,
        output_dir=args.output_dir
    )