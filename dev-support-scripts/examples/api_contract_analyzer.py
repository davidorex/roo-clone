#!/usr/bin/env python3
"""
API Contract Analyzer

Extracts precise interface contracts from Python modules, including:
- Method signatures with parameter names, types, and defaults
- Constructor parameter specifications
- Interface requirements and inheritance relationships
- Return type annotations

This script helps identify API changes that affect tests by providing a
detailed view of current interface contracts for any module in the system.

Features:
- Takes a target module/directory as input parameter
- Extracts interface definitions from classes and functions
- Captures parameter defaults, types, and docstring details 
- Maps inheritance hierarchies to understand interface requirements
- Exports detailed contract information in machine-readable format
"""

import os
import sys
import ast
import json
import inspect
import argparse
import importlib
import importlib.util
from typing import Dict, List, Any, Optional, Set, Tuple

# Default output directory
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "Output", "api_contracts")


class APIContractVisitor(ast.NodeVisitor):
    """Visitor that extracts API contracts from Python AST."""
    
    def __init__(self, file_path: str, module_name: str):
        self.file_path = file_path
        self.module_name = module_name
        self.classes = {}
        self.functions = {}
        self.imports = {}
        self.current_class = None
    
    def visit_ClassDef(self, node):
        """Extract class definitions and method signatures."""
        # Save current class context
        previous_class = self.current_class
        self.current_class = node.name
        
        # Initialize class info
        class_info = {
            "methods": {},
            "bases": [self._get_name(base) for base in node.bases],
            "docstring": self._get_docstring(node),
            "file_path": self.file_path,
            "decorators": [self._get_name(d) for d in node.decorator_list],
        }
        
        # Visit class body
        for item in node.body:
            self.visit(item)
            
            # Extract methods
            if isinstance(item, ast.FunctionDef):
                method_name = item.name
                if method_name not in class_info["methods"]:
                    class_info["methods"][method_name] = {}
                
                # Extract method signature
                parameters = []
                defaults_offset = len(item.args.args) - len(item.args.defaults)
                
                for i, arg in enumerate(item.args.args):
                    param = {
                        "name": arg.arg,
                        "required": i >= defaults_offset,
                    }
                    
                    # Extract type annotation if available
                    if arg.annotation:
                        param["type"] = self._get_name(arg.annotation)
                    
                    # Extract default value if available
                    if i >= defaults_offset:
                        default_idx = i - defaults_offset
                        param["default"] = self._get_node_value(item.args.defaults[default_idx])
                    
                    parameters.append(param)
                
                # Add method info
                class_info["methods"][method_name] = {
                    "parameters": parameters,
                    "docstring": self._get_docstring(item),
                    "decorators": [self._get_name(d) for d in item.decorator_list],
                    "return_type": self._get_name(item.returns) if item.returns else None,
                }
        
        # Store class info
        self.classes[node.name] = class_info
        
        # Restore previous class context
        self.current_class = previous_class
    
    def visit_FunctionDef(self, node):
        """Extract function definitions."""
        if self.current_class is None:  # Only process module-level functions
            function_info = {
                "docstring": self._get_docstring(node),
                "file_path": self.file_path,
                "decorators": [self._get_name(d) for d in node.decorator_list],
            }
            
            # Extract function signature
            parameters = []
            defaults_offset = len(node.args.args) - len(node.args.defaults)
            
            for i, arg in enumerate(node.args.args):
                param = {
                    "name": arg.arg,
                    "required": i >= defaults_offset,
                }
                
                # Extract type annotation if available
                if arg.annotation:
                    param["type"] = self._get_name(arg.annotation)
                
                # Extract default value if available
                if i >= defaults_offset:
                    default_idx = i - defaults_offset
                    param["default"] = self._get_node_value(node.args.defaults[default_idx])
                
                parameters.append(param)
            
            # Add function info
            function_info["parameters"] = parameters
            function_info["return_type"] = self._get_name(node.returns) if node.returns else None
            
            self.functions[node.name] = function_info
    
    def visit_Import(self, node):
        """Extract import statements."""
        for name in node.names:
            self.imports[name.name] = {"alias": name.asname}
    
    def visit_ImportFrom(self, node):
        """Extract from-import statements."""
        module = node.module or ""
        for name in node.names:
            self.imports[f"{module}.{name.name}"] = {"alias": name.asname, "from_import": True}
    
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
            # Handle generic types like List[str]
            return f"{self._get_name(node.value)}[...]"
        return str(node)
    
    def _get_node_value(self, node):
        """Get value from a node representing a default parameter value."""
        if isinstance(node, ast.Str):
            return node.s
        elif isinstance(node, ast.Num):
            return node.n
        elif isinstance(node, ast.NameConstant):
            return node.value
        elif isinstance(node, ast.List):
            return [self._get_node_value(elt) for elt in node.elts]
        elif isinstance(node, ast.Dict):
            keys = [self._get_node_value(k) for k in node.keys]
            values = [self._get_node_value(v) for v in node.values]
            return dict(zip(keys, values))
        # For other types, just return a placeholder
        return f"<{type(node).__name__}>"


def analyze_file(file_path: str, module_prefix: str = "") -> Dict[str, Any]:
    """Analyze a Python file to extract API contracts."""
    with open(file_path, 'r', encoding='utf-8') as f:
        code = f.read()
    
    # Parse the AST
    tree = ast.parse(code, filename=file_path)
    
    # Extract module name from file path
    rel_path = os.path.relpath(file_path, os.path.dirname(__file__))
    parts = os.path.splitext(rel_path)[0].split(os.sep)
    if module_prefix:
        module_name = f"{module_prefix}.{'.'.join(parts[1:])}"
    else:
        module_name = '.'.join(parts)
    
    # Visit the AST to extract API contracts
    visitor = APIContractVisitor(file_path, module_name)
    visitor.visit(tree)
    
    # Build result
    result = {
        "module_name": module_name,
        "file_path": file_path,
        "classes": visitor.classes,
        "functions": visitor.functions,
        "imports": visitor.imports,
    }
    
    return result


def analyze_directory(dir_path: str, module_prefix: str = "") -> Dict[str, Dict[str, Any]]:
    """Recursively analyze a directory to extract API contracts."""
    results = {}
    
    for root, _, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.py'):
                file_path = os.path.join(root, file)
                try:
                    result = analyze_file(file_path, module_prefix)
                    results[result["module_name"]] = result
                except Exception as e:
                    print(f"Error analyzing {file_path}: {e}")
    
    return results


def extract_interface_contracts(target_dir: str, output_dir: str = OUTPUT_DIR, module_prefix: str = None):
    """Extract interface contracts from the specified module directory."""
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    # Determine module prefix from target directory if not provided
    if not module_prefix:
        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
        rel_path = os.path.relpath(target_dir, project_root)
        module_prefix = rel_path.replace(os.sep, '.')
    
    # Analyze the target directory
    print(f"Analyzing {target_dir} with module prefix {module_prefix}...")
    results = analyze_directory(target_dir, module_prefix=module_prefix)
    
    # Generate a component name from the module prefix for output files
    component_name = module_prefix.split('.')[-1] if '.' in module_prefix else module_prefix
    
    # Save raw contract data
    contracts_file = os.path.join(output_dir, f"{component_name}_interface_contracts.json")
    with open(contracts_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)
    
    # Generate a more readable summary
    summary = generate_interface_summary(results, component_name)
    summary_file = os.path.join(output_dir, f"{component_name}_interface_summary.txt")
    with open(summary_file, 'w', encoding='utf-8') as f:
        f.write(summary)
    
    print(f"API contracts extracted to {output_dir}")
    print(f"- Contract data: {contracts_file}")
    print(f"- Summary: {summary_file}")
    
    return results


def generate_interface_summary(contracts: Dict[str, Dict[str, Any]], component_name: str) -> str:
    """Generate a human-readable summary of interface contracts."""
    lines = [f"{component_name.title()} Interface Contract Summary", "="*40, ""]
    
    # Summarize classes with full method signatures
    classes_count = sum(len(module["classes"]) for module in contracts.values())
    methods_count = sum(
        sum(len(cls["methods"]) for cls in module["classes"].values())
        for module in contracts.values()
    )
    functions_count = sum(len(module["functions"]) for module in contracts.values())
    
    lines.append(f"Total classes: {classes_count}")
    lines.append(f"Total methods: {methods_count}")
    lines.append(f"Total functions: {functions_count}")
    lines.append("")
    
    # List all modules
    modules = sorted(contracts.keys())
    lines.append(f"Modules analyzed: {len(modules)}")
    for module in modules:
        lines.append(f"- {module}")
    lines.append("")
    
    # List key interfaces
    lines.append("Key Interfaces")
    lines.append("-------------")
    
    # Find interfaces with the most methods or most derived classes first
    interfaces = []
    for module_name, module in contracts.items():
        for class_name, cls in module["classes"].items():
            interfaces.append((
                module_name, 
                class_name, 
                cls, 
                len(cls["methods"]), 
                len([c for m in contracts.values() for c in m["classes"].values() if class_name in c["bases"]])
            ))
    
    # Sort by most derived from, then most methods
    interfaces.sort(key=lambda x: (x[4], x[3]), reverse=True)
    
    # Take top 10 interfaces
    for module_name, class_name, cls, _, _ in interfaces[:10]:
        lines.append(f"\n{module_name}.{class_name}")
        
        if cls["bases"]:
            lines.append(f"  Bases: {', '.join(cls['bases'])}")
        
        if cls["docstring"]:
            # Add docstring summary (first line only)
            lines.append(f"  Doc: {cls['docstring'].split('.')[0]}")
        
        lines.append("  Methods:")
        for method_name, method in cls["methods"].items():
            # Skip private methods
            if method_name.startswith("_") and method_name != "__init__":
                continue
            
            # Format parameters
            params = [p["name"] for p in method["parameters"]]
            if params and params[0] in ["self", "cls"]:
                params = params[1:]  # Remove self/cls
            
            param_str = ", ".join(params)
            lines.append(f"    {method_name}({param_str})")
            
            # Add parameter details for constructor or important methods
            if method_name == "__init__" or method_name in ["create", "get", "search", "store"]:
                for param in method["parameters"]:
                    if param["name"] in ["self", "cls"]:
                        continue
                    
                    param_info = []
                    if "type" in param:
                        param_info.append(f"type: {param['type']}")
                    if "default" in param:
                        param_info.append(f"default: {param['default']}")
                    if param_info:
                        lines.append(f"      - {param['name']}: {', '.join(param_info)}")
    
    # Add key utility functions
    lines.append("\nKey Utility Functions")
    lines.append("-------------------")
    
    # Find functions from all modules
    utility_functions = []
    for module_name, module in contracts.items():
        for func_name, func in module["functions"].items():
            # Skip private functions
            if func_name.startswith("_"):
                continue
            
            # Count parameters as a proxy for function importance
            param_count = len(func["parameters"])
            utility_functions.append((module_name, func_name, func, param_count))
    
    # Sort by parameter count (more complex functions first)
    utility_functions.sort(key=lambda x: x[3], reverse=True)
    
    # Take top 10 utility functions
    for module_name, func_name, func, _ in utility_functions[:10]:
        # Format parameters
        params = [p["name"] for p in func["parameters"]]
        param_str = ", ".join(params)
        lines.append(f"\n{module_name}.{func_name}({param_str})")
        
        if func["docstring"]:
            # Add docstring summary (first line only)
            lines.append(f"  Doc: {func['docstring'].split('.')[0]}")
        
        # Add parameter details
        for param in func["parameters"]:
            param_info = []
            if "type" in param:
                param_info.append(f"type: {param['type']}")
            if "default" in param:
                param_info.append(f"default: {param['default']}")
            if param_info:
                lines.append(f"  - {param['name']}: {', '.join(param_info)}")
    
    return "\n".join(lines)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract API contracts from Python modules")
    parser.add_argument(
        "target_dir", 
        help="Target directory to analyze (relative to project root)"
    )
    parser.add_argument(
        "--module-prefix", 
        help="Module prefix for the target directory",
        default=None
    )
    parser.add_argument(
        "--output-dir", 
        help="Output directory for contract files",
        default=OUTPUT_DIR
    )
    
    args = parser.parse_args()
    
    # Resolve target directory path
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    target_dir = os.path.join(project_root, args.target_dir)
    
    extract_interface_contracts(
        target_dir=target_dir,
        output_dir=args.output_dir,
        module_prefix=args.module_prefix
    )