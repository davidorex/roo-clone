#!/usr/bin/env python3
"""
Enhanced Mock Access Path Analyzer

Analyzes how functions are called and imported across the codebase to discover why
mocks might fail to intercept certain call paths. This enhanced version specifically
focuses on:

1. Robust path resolution regardless of how the script is invoked
2. Better target module recognition with more flexible matching
3. Improved import resolution including relative imports
4. Enhanced detection of both direct and indirect function calls
5. Special handling for utility functions accessed through various patterns

Helps identify why mock assertions might fail when functions are called through
alternative pathways that bypass the mocked targets.
"""

import os
import sys
import ast
import json
import argparse
from typing import Dict, List, Any, Set, Tuple, Optional
from collections import defaultdict

# Default output directory
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "Output", "mock_paths")


class EnhancedFunctionCallVisitor(ast.NodeVisitor):
    """Enhanced AST visitor that tracks all possible function call patterns."""
    
    def __init__(self):
        # Track function calls
        self.calls = []
        
        # Track all import patterns
        self.imports = {}
        self.from_imports = {}
        self.aliases = {}
        self.all_imports = set()
        
        # Context tracking
        self.current_function = None
        self.current_class = None
        
        # Track variable assignments
        self.variable_sources = {}
        
        # Track module-level variables
        self.module_variables = {}
    
    def visit_Import(self, node):
        """Track regular imports with better alias handling."""
        for name in node.names:
            module_name = name.name
            alias = name.asname or module_name
            self.imports[alias] = module_name
            self.aliases[alias] = module_name
            self.all_imports.add(module_name)
    
    def visit_ImportFrom(self, node):
        """Track from-imports with better relative import handling."""
        if node.module is None:  # Relative import like "from . import x"
            # For simplicity, we'll use a placeholder for relative imports
            module = "_relative_"
        else:
            module = node.module
        
        for name in node.names:
            imported_name = name.name
            alias = name.asname or imported_name
            self.from_imports[alias] = (module, imported_name)
            self.aliases[alias] = f"{module}.{imported_name}"
            self.all_imports.add(f"{module}.{imported_name}")
            
            # Handle "from x import *" by adding to module variables
            if imported_name == "*":
                self.module_variables[f"{module}.*"] = True
    
    def visit_Assign(self, node):
        """Track variable assignments to find indirect access paths."""
        for target in node.targets:
            if isinstance(target, ast.Name):
                var_name = target.id
                # Track the source of this variable
                if isinstance(node.value, ast.Name):
                    # Simple assignment: x = y
                    self.variable_sources[var_name] = node.value.id
                elif isinstance(node.value, ast.Attribute):
                    # Assignment from attribute: x = module.func
                    path = self._extract_call_path(node.value)
                    if path:
                        self.variable_sources[var_name] = path
                
                # If we're at module level, track module variables
                if self.current_class is None and self.current_function is None:
                    self.module_variables[var_name] = True
        
        # Continue visiting
        self.generic_visit(node)
    
    def visit_ClassDef(self, node):
        """Track the current class with improved context."""
        old_class = self.current_class
        self.current_class = node.name
        
        # Visit all nodes in the class
        for child in node.body:
            self.visit(child)
        
        self.current_class = old_class
    
    def visit_FunctionDef(self, node):
        """Track the current function with improved context."""
        old_function = self.current_function
        qualname = f"{self.current_class}.{node.name}" if self.current_class else node.name
        self.current_function = qualname
        
        # Visit all nodes in the function
        for child in node.body:
            self.visit(child)
        
        self.current_function = old_function
    
    def visit_Call(self, node):
        """Enhanced tracking of function calls with variable resolution."""
        # Get the function being called
        func_node = node.func
        func_path = self._extract_call_path(func_node)
        
        if func_path:
            # Try to resolve variables to their sources
            resolved_path = self._resolve_variable_path(func_path)
            
            # Record the call with additional context and both original and resolved paths
            self.calls.append({
                "caller": self.current_function,
                "path": func_path,
                "resolved_path": resolved_path,
                "source": self._resolve_import_path(resolved_path),
                "context": f"{self.current_class}.{self.current_function}" if self.current_class else self.current_function,
                "is_direct": '.' in func_path,  # Whether it's a direct module.func() call
            })
        
        # Continue visiting arguments
        for arg in node.args:
            self.visit(arg)
        for kw in node.keywords:
            self.visit(kw.value)
    
    def _extract_call_path(self, node):
        """Extract the call path from a node with improved handling of complex paths."""
        if isinstance(node, ast.Name):
            # Direct function call: func()
            return node.id
        elif isinstance(node, ast.Attribute):
            # Attribute access: module.func() or obj.method()
            base = self._extract_call_path(node.value)
            if base:
                return f"{base}.{node.attr}"
            return node.attr
        elif isinstance(node, ast.Call):
            # Function call result used as function: func()()
            return self._extract_call_path(node.func) + "()"
        elif isinstance(node, ast.Subscript):
            # Subscript access: module[key].func()
            base = self._extract_call_path(node.value)
            if base:
                return f"{base}[...]"
        return None
    
    def _resolve_variable_path(self, path):
        """Recursively resolve variables to their sources to find actual call targets."""
        # If not a simple variable, check if it starts with a variable
        if '.' in path:
            base, rest = path.split('.', 1)
            if base in self.variable_sources:
                # Resolve the base variable
                resolved_base = self._resolve_variable_path(self.variable_sources[base])
                return f"{resolved_base}.{rest}"
        else:
            # Simple variable name, check if it's in variable sources
            if path in self.variable_sources:
                return self._resolve_variable_path(self.variable_sources[path])
        
        # If no resolution found, return the original path
        return path
    
    def _resolve_import_path(self, call_path):
        """Enhanced resolution of import paths with better handling of complex imports."""
        if '.' not in call_path:
            # Simple function name, could be from a from-import
            if call_path in self.from_imports:
                module, name = self.from_imports[call_path]
                return f"{module}.{name}"
            # Or it could be a module variable
            for import_path in self.all_imports:
                if import_path.endswith(f".{call_path}"):
                    return import_path
            return call_path
        
        # Module attribute access: module.func()
        parts = call_path.split('.', 1)
        base = parts[0]
        rest = parts[1]
        
        if base in self.imports:
            # Direct import with possible alias
            return f"{self.imports[base]}.{rest}"
        elif base in self.from_imports:
            # From-import with attribute access
            module, name = self.from_imports[base]
            return f"{module}.{name}.{rest}"
        elif f"{base}.*" in self.module_variables:
            # Might be from a "from module import *"
            return f"{base}.{rest}"
        
        # Check if this could be a nested module import
        for import_path in self.all_imports:
            # Find if any imported module is a prefix of this call path
            if call_path.startswith(f"{import_path}."):
                return call_path
            
            # Handle cases where import is aliased
            for alias, original in self.aliases.items():
                if call_path.startswith(f"{alias}.") and original == import_path:
                    after_alias = call_path[len(alias)+1:]
                    return f"{original}.{after_alias}"
        
        return call_path


def analyze_file_calls(file_path: str, module_maps: Dict[str, str] = None) -> Dict[str, Any]:
    """Analyze function calls in a Python file with improved module name resolution."""
    with open(file_path, 'r', encoding='utf-8') as f:
        code = f.read()
    
    # Parse the AST
    try:
        tree = ast.parse(code, filename=file_path)
    except SyntaxError as e:
        print(f"Syntax error in {file_path}: {e}")
        return None
    
    # Extract module name from file path with better resolution
    module_name = extract_module_name(file_path, module_maps)
    
    # Visit the AST to extract calls
    visitor = EnhancedFunctionCallVisitor()
    visitor.visit(tree)
    
    # Build result
    result = {
        "module_name": module_name,
        "file_path": file_path,
        "imports": visitor.imports,
        "from_imports": visitor.from_imports,
        "calls": visitor.calls,
        "module_variables": list(visitor.module_variables.keys()),
        "variable_sources": visitor.variable_sources,
    }
    
    return result


def extract_module_name(file_path: str, module_maps: Dict[str, str] = None) -> str:
    """Extract module name from file path with multiple fallback strategies."""
    # Normalize path
    file_path = os.path.normpath(file_path)
    
    # Use module maps if provided (manual mappings)
    if module_maps:
        for path_prefix, module_prefix in module_maps.items():
            if file_path.startswith(path_prefix):
                # Replace path prefix with module prefix
                rel_path = file_path[len(path_prefix):].lstrip(os.sep)
                rel_path = os.path.splitext(rel_path)[0]  # Remove .py
                return f"{module_prefix}.{rel_path.replace(os.sep, '.')}"
    
    # Try to find common Python package patterns
    parts = file_path.split(os.sep)
    
    # Look for known module names like 'viewer'
    known_modules = ['viewer', 'django', 'tests']
    for known in known_modules:
        if known in parts:
            idx = parts.index(known)
            module_parts = parts[idx:]
            module_name = '.'.join(module_parts[:-1] if module_parts[-1].endswith('.py') else module_parts)
            return module_name
    
    # Fall back to file name as module name
    base_name = os.path.basename(file_path)
    return os.path.splitext(base_name)[0]


def analyze_directory_calls(dir_path: str, module_maps: Dict[str, str] = None) -> Dict[str, Dict[str, Any]]:
    """Recursively analyze function calls in all Python files with improved error handling."""
    results = {}
    
    for root, _, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.py'):
                file_path = os.path.join(root, file)
                try:
                    result = analyze_file_calls(file_path, module_maps)
                    if result:  # Skip files with errors
                        results[result["module_name"]] = result
                except Exception as e:
                    print(f"Error analyzing {file_path}: {e}")
    
    return results


def build_module_call_graph(call_results: Dict[str, Dict[str, Any]]) -> Dict[str, Any]:
    """Build a module-level call graph with enhanced path resolution."""
    # Initialize the graph structure
    graph = {
        "modules": {},
        "function_paths": {},
        "common_mocks": set(),
        "utility_functions": defaultdict(set),  # Track functions that are likely utilities
    }
    
    # Collect all modules and their exports
    for module_name, result in call_results.items():
        graph["modules"][module_name] = {
            "imports": result["imports"],
            "from_imports": result["from_imports"],
            "outgoing_calls": {},
            "incoming_calls": {},
        }
    
    # Process calls with enhanced path tracking
    for module_name, result in call_results.items():
        # Group calls by target module or function
        for call in result["calls"]:
            # Use the resolved source path for better accuracy
            source_path = call["source"]
            
            # Track all paths, not just external ones
            if '.' in source_path:
                parts = source_path.split('.')
                target_module = '.'.join(parts[:-1])  # Get module part
                function_name = parts[-1]  # Get function name
                
                # Register the call in the outgoing calls
                if target_module not in graph["modules"][module_name]["outgoing_calls"]:
                    graph["modules"][module_name]["outgoing_calls"][target_module] = []
                
                graph["modules"][module_name]["outgoing_calls"][target_module].append({
                    "function": function_name,
                    "caller": call["caller"],
                    "full_path": source_path,
                    "original_path": call["path"],
                    "resolved_path": call["resolved_path"],
                })
                
                # Register the call in the incoming calls of the target module
                if target_module in graph["modules"]:
                    if module_name not in graph["modules"][target_module]["incoming_calls"]:
                        graph["modules"][target_module]["incoming_calls"][module_name] = []
                    
                    graph["modules"][target_module]["incoming_calls"][module_name].append({
                        "function": function_name,
                        "caller": call["caller"],
                        "full_path": source_path,
                        "original_path": call["path"],
                    })
                
                # Track the function path
                if source_path not in graph["function_paths"]:
                    graph["function_paths"][source_path] = {
                        "callers": [],
                        "caller_modules": set(),
                        "call_patterns": set(),  # Track different ways this function is called
                    }
                
                graph["function_paths"][source_path]["callers"].append({
                    "module": module_name,
                    "function": call["caller"],
                    "original_path": call["path"],
                })
                graph["function_paths"][source_path]["caller_modules"].add(module_name)
                graph["function_paths"][source_path]["call_patterns"].add(call["path"])
                
                # Track utility function patterns
                if "utils" in target_module or function_name.startswith("get_") or function_name.startswith("is_"):
                    graph["utility_functions"][target_module].add(function_name)
    
    # Identify potential mock targets (functions called from multiple modules)
    for path, info in graph["function_paths"].items():
        if len(info["caller_modules"]) > 1:
            graph["common_mocks"].add(path)
    
    return graph


def generate_enhanced_mock_report(call_graph: Dict[str, Any], target_modules: List[str]) -> str:
    """Generate an enhanced report of mock access paths with better insights."""
    lines = ["Enhanced Mock Access Path Analysis", "===============================", ""]
    
    # Focus on specified target modules with more flexible matching
    target_functions = set()
    target_modules_expanded = set()
    
    # Expand target modules list for more flexible matching
    for module in target_modules:
        target_modules_expanded.add(module)
        if module.endswith('*'):
            # Already a wildcard pattern
            prefix = module[:-1]
            target_modules_expanded.add(prefix)
        else:
            # Add a wildcard version
            target_modules_expanded.add(module + '*')
    
    # Find functions from target modules with more flexible matching
    for func_path in call_graph["function_paths"]:
        parts = func_path.split('.')
        if len(parts) >= 2:
            module_path = '.'.join(parts[:-1])
            # Check if this function belongs to any target module
            for target in target_modules_expanded:
                if target.endswith('*'):
                    prefix = target[:-1]
                    if module_path.startswith(prefix):
                        target_functions.add(func_path)
                        break
                elif module_path == target:
                    target_functions.add(func_path)
                    break
    
    lines.append(f"Analyzed {len(target_functions)} functions from target modules")
    
    # List all examined target modules
    lines.append("\nTarget Modules Examined:")
    for module in sorted(target_modules):
        lines.append(f"- {module}")
    lines.append("")
    
    # Show utility functions by module
    utility_modules = sorted([m for m in call_graph["utility_functions"] 
                            if any(t.replace('*', '') in m for t in target_modules_expanded)])
    
    if utility_modules:
        lines.append("\nUtility Functions by Module")
        lines.append("-------------------------")
        
        for module in utility_modules:
            functions = sorted(call_graph["utility_functions"][module])
            lines.append(f"\n{module}:")
            for func in functions:
                full_path = f"{module}.{func}"
                # Add extra info if this is a common mock target
                is_common = full_path in call_graph["common_mocks"]
                call_count = len(call_graph["function_paths"].get(full_path, {}).get("callers", []))
                tag = " [COMMON MOCK]" if is_common else ""
                lines.append(f"  - {func}{tag} (called from {call_count} places)")
    
    # Report functions called from multiple places
    frequently_called = []
    for func_path in target_functions:
        if func_path in call_graph["function_paths"]:
            callers = call_graph["function_paths"][func_path]["callers"]
            if len(callers) > 1:
                call_patterns = call_graph["function_paths"][func_path]["call_patterns"]
                frequently_called.append((func_path, callers, call_patterns))
    
    # Sort by number of callers (most called first)
    frequently_called.sort(key=lambda x: len(x[1]), reverse=True)
    
    if frequently_called:
        lines.append("\nFunctions with Multiple Call Paths")
        lines.append("-------------------------------")
        
        for func_path, callers, call_patterns in frequently_called[:15]:  # Limit to top 15
            module_name = '.'.join(func_path.split('.')[:-1])
            function_name = func_path.split('.')[-1]
            
            lines.append(f"\n{func_path}")
            lines.append(f"  Called from {len(callers)} locations via {len(call_patterns)} different patterns:")
            
            # Show different call patterns
            if call_patterns:
                lines.append("  Call patterns:")
                for pattern in sorted(call_patterns):
                    lines.append(f"  - {pattern}")
            
            # Group callers by module
            by_module = {}
            for caller in callers:
                caller_module = caller["module"]
                if caller_module not in by_module:
                    by_module[caller_module] = []
                by_module[caller_module].append((caller["function"], caller["original_path"]))
            
            # Show callers by module
            for caller_module, functions in by_module.items():
                lines.append(f"  Called from module: {caller_module}")
                if len(functions) <= 5:
                    for func, path in functions:
                        lines.append(f"    - {func} via {path}")
                else:
                    for i, (func, path) in enumerate(functions[:3]):
                        lines.append(f"    {i+1}. {func} via {path}")
                    lines.append(f"    ... and {len(functions) - 3} more calls")
    else:
        lines.append("\nNo functions with multiple call paths found.")
    
    # Find alternative import paths with better categorization
    lines.append("\nPotential Alternative Import Paths")
    lines.append("-------------------------------")
    
    alternative_paths = []
    for module_name, module_info in call_graph["modules"].items():
        # Check from-imports for targets
        for alias, (source_module, name) in module_info["from_imports"].items():
            full_path = f"{source_module}.{name}"
            # Check if this import matches any of our targets
            for target in target_functions:
                if full_path == target or target.startswith(f"{full_path}."):
                    alternative_paths.append((target, module_name, f"from {source_module} import {name} as {alias}"))
        
        # Check direct imports for module-level access
        for alias, source_module in module_info["imports"].items():
            # Check if this import provides access to any target
            for target in target_functions:
                if target.startswith(f"{source_module}."):
                    alternative_paths.append((target, module_name, f"import {source_module} as {alias}"))
    
    # Group by target function
    by_target = {}
    for target, module, import_stmt in alternative_paths:
        if target not in by_target:
            by_target[target] = []
        by_target[target].append((module, import_stmt))
    
    # Show alternative paths
    if by_target:
        for target, paths in sorted(by_target.items()):
            lines.append(f"\n{target}")
            lines.append(f"  Imported via:")
            for module, stmt in paths:
                lines.append(f"  - {module}: {stmt}")
    else:
        lines.append("\nNo alternative import paths found for target functions.")
    
    # Enhanced mock strategies with more specific recommendations
    lines.append("\nMock Strategy Recommendations")
    lines.append("---------------------------")
    
    # Find commonly mocked functions
    common_mocks = [f for f in target_functions if f in call_graph["common_mocks"]]
    if common_mocks:
        lines.append("\nPriority Mock Targets (used across modules):")
        for i, func in enumerate(sorted(common_mocks)[:10]):
            # Count different call patterns
            patterns = len(call_graph["function_paths"][func]["call_patterns"])
            lines.append(f"{i+1}. {func} ({patterns} different access patterns)")
        
        lines.append("\nEnhanced Mocking Recommendations:")
        lines.append("1. Multiple Access Patterns: Use module-level patching when functions are accessed through various paths")
        lines.append("   Example: patch('viewer.semantic.vector.utils', ...) instead of patch('viewer.semantic.vector.utils.function_name')")
        lines.append("")
        lines.append("2. Registry/Service Layer: Consider mocking at higher levels that centralize access")
        lines.append("   Example: patch('viewer.semantic.vector.registry.VectorDatabaseRegistry.get')")
        lines.append("")
        lines.append("3. Precise Method Targeting: Use patch.object() for class methods to avoid import path issues")
        lines.append("   Example: patch.object(MemoryVectorDatabase, 'store_vectors', ...)")
        lines.append("")
        lines.append("4. Custom Validation: Implement validation functions that check call effects rather than just counting calls")
        lines.append("   Example: assert validate_vectors_stored(vectors) instead of mock_store.assert_called()")
    else:
        lines.append("No commonly mocked functions found in the target modules.")
    
    return "\n".join(lines)


def analyze_mock_paths(target_dir: str, target_modules: List[str] = None, output_dir: str = OUTPUT_DIR):
    """Analyze mock paths with enhanced detection capabilities."""
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    # Extract component name from target directory for output files
    component_name = os.path.basename(os.path.normpath(target_dir))
    
    # Create module maps to improve module name resolution
    module_maps = {
        os.path.abspath(os.path.join(target_dir, 'viewer')): 'viewer',
        os.path.abspath(target_dir): '',
    }
    
    # Analyze the target directory
    print(f"Analyzing calls in {target_dir}...")
    call_results = analyze_directory_calls(target_dir, module_maps)
    
    # Build the call graph
    call_graph = build_module_call_graph(call_results)
    
    # Save raw call data
    calls_file = os.path.join(output_dir, f"{component_name}_call_data.json")
    with open(calls_file, 'w', encoding='utf-8') as f:
        # Convert sets to lists for JSON serialization
        serializable_graph = {}
        for key, value in call_graph.items():
            if key == "common_mocks":
                serializable_graph[key] = list(value)
            elif key == "utility_functions":
                serializable_graph[key] = {k: list(v) for k, v in value.items()}
            elif key == "modules":
                serializable_graph[key] = value  # Already serializable
            elif key == "function_paths":
                serializable_paths = {}
                for path, path_info in value.items():
                    serializable_path_info = path_info.copy()
                    serializable_path_info["caller_modules"] = list(path_info["caller_modules"])
                    serializable_path_info["call_patterns"] = list(path_info["call_patterns"])
                    serializable_paths[path] = serializable_path_info
                serializable_graph[key] = serializable_paths
            else:
                serializable_graph[key] = value
        
        json.dump(serializable_graph, f, indent=2)
    
    # Determine target modules if not specified
    if not target_modules:
        # Default to utility modules and common patterns
        target_modules = []
        for module_name in call_results.keys():
            parts = module_name.split('.')
            if len(parts) >= 2:
                # Look for utility modules or other common targets
                if 'utils' in parts or 'helpers' in parts:
                    target_modules.append('.'.join(parts[:3]) + '*')
                    continue
                
                # Add common module prefixes
                if parts[0] == 'viewer' and len(parts) >= 3:
                    target_modules.append('.'.join(parts[:3]) + '*')
        
        # Remove duplicates
        target_modules = list(set(target_modules))
        
        # Add fallback if no targets found
        if not target_modules and 'viewer' in call_results:
            target_modules = ['viewer.*']
    
    # Generate report
    report = generate_enhanced_mock_report(call_graph, target_modules)
    report_file = os.path.join(output_dir, f"{component_name}_mock_paths.txt")
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"Enhanced mock access paths analysis completed:")
    print(f"- Call data: {calls_file}")
    print(f"- Mock paths report: {report_file}")
    
    return call_graph


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Analyze mock access paths in Python modules")
    parser.add_argument(
        "target_dir", 
        help="Target directory to analyze (relative to project root)"
    )
    parser.add_argument(
        "--target-modules",
        help="Comma-separated list of target modules to focus on",
        default=None
    )
    parser.add_argument(
        "--output-dir", 
        help="Output directory for analysis files",
        default=OUTPUT_DIR
    )
    
    args = parser.parse_args()
    
    # Resolve target directory path
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    target_dir = os.path.join(project_root, args.target_dir)
    
    # Parse target modules
    target_modules = args.target_modules.split(',') if args.target_modules else None
    
    analyze_mock_paths(
        target_dir=target_dir,
        target_modules=target_modules,
        output_dir=args.output_dir
    )