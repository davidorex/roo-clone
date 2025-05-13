#!/usr/bin/env python3
"""
Change Impact Analyzer for AI-Consumable Code Insights

This script analyzes Python code to identify the impacts of potential changes,
providing AI-optimized output that highlights affected components, required tests,
entry points, and suggested next actions.

Two operating modes:
1. Baseline (--all): Analyzes entire codebase, creates dependency cache
2. Incremental (--file): Analyzes specific file and its dependencies
"""

import os
import sys
import ast
import json
import re
import inspect
import importlib
import pickle
from pathlib import Path
from collections import defaultdict, deque
from typing import List, Dict, Set, Tuple, Any, Optional, Union
import argparse

class FunctionSignature:
    """Represents a function signature with parameters and return annotations."""
    
    def __init__(self, name: str, params: List[str], return_type: str = None, 
                 doc: str = None, is_public: bool = True):
        self.name = name
        self.params = params
        self.return_type = return_type
        self.doc = doc
        self.is_public = is_public
        # Risk assessment metrics
        self.external_dependencies = []  # External modules/functions used
        self.try_except_count = 0  # Number of exception handlers
        self.conditional_paths = 0  # Number of if/else branches
        self.complexity_score = 0  # Overall complexity score
        
    def __eq__(self, other):
        if not isinstance(other, FunctionSignature):
            return False
        return (self.name == other.name and 
                self.params == other.params and 
                self.return_type == other.return_type)
                
    def __hash__(self):
        return hash((self.name, tuple(self.params), self.return_type))
        
    def to_dict(self):
        """Convert to dictionary for serialization."""
        return {
            'name': self.name,
            'params': self.params,
            'return_type': self.return_type,
            'doc': self.doc,
            'is_public': self.is_public
        }
        
    @classmethod
    def from_dict(cls, data):
        """Create from dictionary after deserialization."""
        return cls(
            name=data['name'],
            params=data['params'],
            return_type=data.get('return_type'),
            doc=data.get('doc'),
            is_public=data.get('is_public', True)
        )
        
    def is_compatible_with(self, other):
        """Check if this signature is backwards compatible with another signature."""
        if self.name != other.name:
            return False
            
        # Check parameters - new optional params are OK, removing params is not
        self_required = [p for p in self.params if '=' not in p and '*' not in p]
        other_required = [p for p in other.params if '=' not in p and '*' not in p]
        
        # All previously required parameters must still be required
        for param in other_required:
            if param not in self_required:
                return False
                
        # Return type should be the same or a subclass
        # (simplified check, just string comparison)
        if self.return_type != other.return_type and other.return_type is not None:
            return False
            
        return True
        
    def __str__(self):
        params_str = ", ".join(self.params)
        return f"{self.name}({params_str})"


class ModuleInfo:
    """Represents a Python module with its functions, imports and dependencies."""
    
    def __init__(self, module_path: str, file_path: str):
        self.module_path = module_path
        self.file_path = file_path
        self.functions: Dict[str, FunctionSignature] = {}
        self.imports: List[str] = []
        self.imported_by: List[str] = []
        self.calls: Dict[str, List[str]] = defaultdict(list)  # function -> called functions
        self.called_by: Dict[str, List[str]] = defaultdict(list)  # function -> calling functions
        self.entry_points: List[str] = []
        self.related_tests: Dict[str, List[str]] = defaultdict(list)  # function -> test files
        self.internal_dependencies: Dict[str, List[str]] = defaultdict(list)  # function -> internal functions it calls
        self.depended_on_by: Dict[str, List[str]] = defaultdict(list)  # function -> internal functions that call it
        
    def add_function(self, signature: FunctionSignature):
        """Add a function signature to this module."""
        self.functions[signature.name] = signature
        
    def add_import(self, module_name: str):
        """Add an imported module."""
        if module_name not in self.imports:
            self.imports.append(module_name)
            
    def add_imported_by(self, module_name: str):
        """Add a module that imports this module."""
        if module_name not in self.imported_by:
            self.imported_by.append(module_name)
            
    def add_call(self, caller: str, callee: str, module: str = None):
        """Add a function call from caller to callee."""
        if module:
            full_callee = f"{module}.{callee}"
        else:
            full_callee = callee
            
        if full_callee not in self.calls[caller]:
            self.calls[caller].append(full_callee)
            
    def add_called_by(self, callee: str, caller: str, module: str = None):
        """Add a function call to callee from caller."""
        if module:
            full_caller = f"{module}.{caller}"
        else:
            full_caller = caller
            
        if full_caller not in self.called_by[callee]:
            self.called_by[callee].append(full_caller)
            
    def add_entry_point(self, function_name: str):
        """Mark a function as an entry point."""
        if function_name not in self.entry_points:
            self.entry_points.append(function_name)
            
    def add_test(self, function_name: str, test_file: str):
        """Add a test file that tests a function."""
        if test_file not in self.related_tests[function_name]:
            self.related_tests[function_name].append(test_file)
            
    def get_all_dependencies(self) -> List[str]:
        """Get all modules this module depends on."""
        return self.imports
        
    def get_all_dependents(self) -> List[str]:
        """Get all modules that depend on this module."""
        return self.imported_by
        
    def to_dict(self):
        """Convert to dictionary for serialization."""
        return {
            'module_path': self.module_path,
            'file_path': self.file_path,
            'functions': {name: sig.to_dict() for name, sig in self.functions.items()},
            'imports': self.imports,
            'imported_by': self.imported_by,
            'calls': dict(self.calls),
            'called_by': dict(self.called_by),
            'entry_points': self.entry_points,
            'related_tests': dict(self.related_tests)
        }
        
    @classmethod
    def from_dict(cls, data):
        """Create from dictionary after deserialization."""
        module = cls(data['module_path'], data['file_path'])
        module.imports = data['imports']
        module.imported_by = data['imported_by']
        module.calls = defaultdict(list, data['calls'])
        module.called_by = defaultdict(list, data['called_by'])
        module.entry_points = data['entry_points']
        module.related_tests = defaultdict(list, data['related_tests'])
        
        # Restore functions
        for name, func_data in data['functions'].items():
            module.functions[name] = FunctionSignature.from_dict(func_data)
            
        return module


class FunctionVisitor(ast.NodeVisitor):
    """Extract function definitions and calls from Python AST."""
    
    def __init__(self, module_name):
        self.module_name = module_name
        self.functions = {}
        self.calls = defaultdict(list)
        self.current_function = None
        self.imports = {}  # alias -> module_name
        
    def visit_FunctionDef(self, node):
        """Visit function definition nodes."""
        # Skip private functions (starting with _)
        is_public = not node.name.startswith('_')
        
        # Extract parameters
        params = []
        for arg in node.args.args:
            # Handle default values (simplified, doesn't show actual default)
            if arg.annotation:
                if isinstance(arg.annotation, ast.Name):
                    type_name = arg.annotation.id
                elif isinstance(arg.annotation, ast.Attribute):
                    type_name = self._get_attribute_name(arg.annotation)
                else:
                    type_name = "complex_type"
                params.append(f"{arg.arg}: {type_name}")
            else:
                params.append(arg.arg)
                
        # Add default parameters
        defaults_offset = len(node.args.args) - len(node.args.defaults)
        for i, default in enumerate(node.args.defaults):
            arg_pos = i + defaults_offset
            params[arg_pos] = f"{params[arg_pos]}=..."
            
        # Add *args if present
        if node.args.vararg:
            params.append(f"*{node.args.vararg.arg}")
            
        # Add **kwargs if present
        if node.args.kwarg:
            params.append(f"**{node.args.kwarg.arg}")
            
        # Extract return type if available
        return_type = None
        if node.returns:
            if isinstance(node.returns, ast.Name):
                return_type = node.returns.id
            elif isinstance(node.returns, ast.Attribute):
                return_type = self._get_attribute_name(node.returns)
            else:
                return_type = "complex_type"
                
        # Extract docstring if available
        docstring = ast.get_docstring(node)
        
        # Create function signature
        signature = FunctionSignature(
            name=node.name,
            params=params,
            return_type=return_type,
            doc=docstring,
            is_public=is_public
        )
        
        # Analyze function complexity and risk factors
        try_except_count = 0
        conditional_paths = 0
        external_dependencies = []
        
        # Count try/except blocks and conditionals
        for child in ast.walk(node):
            if isinstance(child, ast.Try):
                try_except_count += 1
            elif isinstance(child, ast.If) or isinstance(child, ast.IfExp):
                conditional_paths += 1
            elif isinstance(child, ast.Call) and isinstance(child.func, ast.Attribute):
                # Check for external dependencies in method calls
                if isinstance(child.func.value, ast.Name):
                    module_name = child.func.value.id
                    if module_name in self.imports:
                        ext_dep = self.imports[module_name]
                        if ext_dep not in external_dependencies:
                            external_dependencies.append(ext_dep)
        
        # Add complexity metrics to signature
        signature.try_except_count = try_except_count
        signature.conditional_paths = conditional_paths
        signature.external_dependencies = external_dependencies
        signature.complexity_score = try_except_count + (conditional_paths * 0.5) + len(external_dependencies)
        
        self.functions[node.name] = signature
        
        # Set current function for call tracking
        prev_function = self.current_function
        self.current_function = node.name
        
        # Visit function body
        self.generic_visit(node)
        
        # Restore previous function context
        self.current_function = prev_function
        
    def visit_Import(self, node):
        """Visit Import nodes."""
        for name in node.names:
            if name.asname:
                self.imports[name.asname] = name.name
            else:
                self.imports[name.name] = name.name
        self.generic_visit(node)
        
    def visit_ImportFrom(self, node):
        """Visit ImportFrom nodes."""
        if node.module:
            for name in node.names:
                if name.asname:
                    self.imports[name.asname] = f"{node.module}.{name.name}"
                else:
                    self.imports[name.name] = f"{node.module}.{name.name}"
        self.generic_visit(node)
        
    def visit_Call(self, node):
        """Visit function call nodes."""
        if self.current_function:
            # Extract called function name
            if isinstance(node.func, ast.Name):
                # Direct function call
                called_name = node.func.id
                self.calls[self.current_function].append(called_name)
            elif isinstance(node.func, ast.Attribute):
                # Method call or imported function
                module_name = None
                if isinstance(node.func.value, ast.Name):
                    module_name = node.func.value.id
                    # Check if it's an imported module
                    if module_name in self.imports:
                        module_name = self.imports[module_name]
                        
                called_name = node.func.attr
                if module_name:
                    self.calls[self.current_function].append((module_name, called_name))
                else:
                    self.calls[self.current_function].append(called_name)
                    
        self.generic_visit(node)
        
    def _get_attribute_name(self, node):
        """Get the full name of an attribute node."""
        if isinstance(node.value, ast.Name):
            return f"{node.value.id}.{node.attr}"
        elif isinstance(node.value, ast.Attribute):
            return f"{self._get_attribute_name(node.value)}.{node.attr}"
        return f"?.{node.attr}"


class TestVisitor(ast.NodeVisitor):
    """Extract test functions and their targets from Python test files."""
    
    def __init__(self):
        self.test_functions = []
        self.imported_modules = {}
        self.targeted_functions = defaultdict(list)  # test_name -> targeted functions
        
    def visit_FunctionDef(self, node):
        """Visit function definition nodes."""
        # Look for test functions
        if node.name.startswith('test_'):
            self.test_functions.append(node.name)
            
            # Look for targeted functions in the docstring
            docstring = ast.get_docstring(node)
            if docstring:
                self._extract_targets_from_docstring(node.name, docstring)
                
            # Look for targeted functions in the function body
            self._extract_targets_from_body(node.name, node)
            
        self.generic_visit(node)
        
    def visit_Import(self, node):
        """Visit Import nodes."""
        for name in node.names:
            if name.asname:
                self.imported_modules[name.asname] = name.name
            else:
                self.imported_modules[name.name] = name.name
        self.generic_visit(node)
        
    def visit_ImportFrom(self, node):
        """Visit ImportFrom nodes."""
        if node.module:
            for name in node.names:
                if name.asname:
                    self.imported_modules[name.asname] = f"{node.module}.{name.name}"
                else:
                    self.imported_modules[name.name] = f"{node.module}.{name.name}"
        self.generic_visit(node)
        
    def _extract_targets_from_docstring(self, test_name, docstring):
        """Extract targeted functions from docstring."""
        # Look for phrases like "Test for function_name" or "Tests the xyz function"
        patterns = [
            r"[Tt]est (?:for|of|that) ([a-zA-Z0-9_]+)",
            r"[Tt]ests? the ([a-zA-Z0-9_]+)",
            r"[Vv]erify (?:that )?([a-zA-Z0-9_]+)"
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, docstring)
            for match in matches:
                self.targeted_functions[test_name].append(match)
                
    def _extract_targets_from_body(self, test_name, node):
        """Extract targeted functions from function body based on calls and asserts."""
        patch_targets = []
        call_targets = []
        
        # Find patch targets
        for child_node in ast.walk(node):
            # Look for patch decorators
            if isinstance(child_node, ast.Call) and \
               isinstance(child_node.func, ast.Attribute) and \
               child_node.func.attr == 'patch':
                if child_node.args and isinstance(child_node.args[0], ast.Constant):
                    target = child_node.args[0].value
                    # Extract function name from patch target
                    if '.' in target:
                        patch_targets.append(target.split('.')[-1])
            
            # Look for assert calls on specific functions
            if isinstance(child_node, ast.Call) and \
               isinstance(child_node.func, ast.Name) and \
               child_node.func.id.startswith('assert'):
                for arg in child_node.args:
                    if isinstance(arg, ast.Call) and isinstance(arg.func, ast.Name):
                        call_targets.append(arg.func.id)
        
        # Add unique targets
        for target in set(patch_targets + call_targets):
            if target not in self.targeted_functions[test_name]:
                self.targeted_functions[test_name].append(target)


class ChangeImpactAnalyzer:
    """Analyzes the impact of changes to Python code."""
    
    def __init__(self, base_dir: str, output_dir: str = None):
        """Initialize with base directory for code analysis."""
        self.base_dir = Path(base_dir)
        self.output_dir = Path(output_dir) if output_dir else self.base_dir / "Output" / "impact_analysis"
        self.modules = {}  # module_path -> ModuleInfo
        self.test_modules = {}  # test_file -> test info
        self.entry_points = []  # List of entry point functions
        self.management_commands = []  # List of management commands
        
    def analyze_file(self, file_path: str) -> Optional[ModuleInfo]:
        """Analyze a single Python file."""
        file_path = Path(file_path)
        
        # Skip if not a Python file
        if not str(file_path).endswith('.py'):
            return None
            
        # Calculate module path from file path
        file_path = Path(os.path.abspath(file_path))
        base_dir = Path(os.path.abspath(self.base_dir))
        rel_path = file_path.relative_to(base_dir)
        module_path = str(rel_path.with_suffix('')).replace(os.sep, '.')
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Parse AST
            tree = ast.parse(content)
            
            # Extract functions and calls
            visitor = FunctionVisitor(module_path)
            visitor.visit(tree)
            
            # Create module info
            module_info = ModuleInfo(module_path, str(rel_path))
            
            # Add functions
            for name, signature in visitor.functions.items():
                module_info.add_function(signature)
                
            # Add imports
            for alias, module_name in visitor.imports.items():
                module_info.add_import(module_name)
                
            # Add function calls
            for caller, callees in visitor.calls.items():
                for callee in callees:
                    if isinstance(callee, tuple):
                        module, func = callee
                        module_info.add_call(caller, func, module)
                    else:
                        module_info.add_call(caller, callee)
                        
            # Check if this is a management command
            if 'management/commands' in str(file_path):
                # Extract command name from path
                command_name = file_path.stem
                if command_name != '__init__':
                    self.management_commands.append({
                        'name': command_name,
                        'module': module_path
                    })
                    # Mark handle method as entry point
                    if 'handle' in module_info.functions:
                        module_info.add_entry_point('handle')
                        
            # Store module info
            self.modules[module_path] = module_info
            return module_info
            
        except Exception as e:
            print(f"Error analyzing {file_path}: {e}")
            return None
            
    def analyze_test_file(self, file_path: str):
        """Analyze a test file to extract test targets."""
        file_path = Path(file_path)
        
        # Skip if not a Python file
        if not str(file_path).endswith('.py'):
            return
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Parse AST
            tree = ast.parse(content)
            
            # Extract test functions and targets
            visitor = TestVisitor()
            visitor.visit(tree)
            
            # Store test info
            self.test_modules[str(file_path)] = {
                'functions': visitor.test_functions,
                'targets': visitor.targeted_functions,
                'imports': visitor.imported_modules
            }
            
            # Map test files to target functions
            for test_name, targets in visitor.targeted_functions.items():
                for target in targets:
                    # Try to find the module containing this function
                    for module_path, module_info in self.modules.items():
                        if target in module_info.functions:
                            module_info.add_test(target, str(file_path))
                            
        except Exception as e:
            print(f"Error analyzing test file {file_path}: {e}")
            
    def analyze_all_files(self):
        """Analyze all Python files in the project."""
        # Find all Python files
        python_files = []
        test_files = []
        
        # Define directories to include and exclude
        include_dirs = ['viewer', 'tests', 'git_commit_viewer']
        exclude_dirs = ['.venv', '.git', '__pycache__', 'migrations']
        
        for root, dirs, files in os.walk(self.base_dir):
            # Skip excluded directories
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            
            # Only process files in included directories
            rel_path = os.path.relpath(root, self.base_dir)
            if rel_path == '.' or any(rel_path.startswith(d) for d in include_dirs):
                for file in files:
                    if file.endswith('.py'):
                        file_path = os.path.join(root, file)
                        if '/tests/' in file_path or file_path.endswith('_test.py') or file_path.endswith('test_.py'):
                            test_files.append(file_path)
                        else:
                            python_files.append(file_path)
                        
        # First analyze regular Python files
        for file_path in python_files:
            self.analyze_file(file_path)
            
        # Then analyze test files
        for file_path in test_files:
            self.analyze_test_file(file_path)
            
        # Link imported modules
        self._link_imports()
        
        # Identify entry points
        self._identify_entry_points()
        
    def _link_imports(self):
        """Link imported modules to their importers."""
        for module_path, module_info in self.modules.items():
            for imported_module in module_info.imports:
                # Find the matching module
                imported_parts = imported_module.split('.')
                for i in range(len(imported_parts), 0, -1):
                    candidate = '.'.join(imported_parts[:i])
                    if candidate in self.modules:
                        self.modules[candidate].add_imported_by(module_path)
                        break
                        
    def _identify_entry_points(self):
        """Identify entry points in the code."""
        # Management commands are already identified
        
        # Django views
        for module_path, module_info in self.modules.items():
            if '/views.py' in module_info.file_path:
                # Functions in views.py are likely entry points
                for func_name in module_info.functions:
                    if not func_name.startswith('_'):  # Skip private functions
                        module_info.add_entry_point(func_name)
                        self.entry_points.append({
                            'type': 'view',
                            'name': func_name,
                            'module': module_path
                        })
        
        # Django URLs
        for module_path, module_info in self.modules.items():
            if '/urls.py' in module_info.file_path:
                # Functions used in urls.py could be entry points
                # This is a simplified heuristic
                for func, calls in module_info.calls.items():
                    for call in calls:
                        if isinstance(call, tuple):
                            module, called_func = call
                            if module in self.modules:
                                self.modules[module].add_entry_point(called_func)
                                self.entry_points.append({
                                    'type': 'url',
                                    'name': called_func,
                                    'module': module
                                })
                        
    def save_baseline(self):
        """Save baseline data for future incremental analysis."""
        os.makedirs(self.output_dir, exist_ok=True)
        
        # Save modules
        modules_data = {path: info.to_dict() for path, info in self.modules.items()}
        with open(self.output_dir / "modules_baseline.json", 'w', encoding='utf-8') as f:
            json.dump(modules_data, f, indent=2)
            
        # Save test modules
        with open(self.output_dir / "tests_baseline.json", 'w', encoding='utf-8') as f:
            json.dump(self.test_modules, f, indent=2)
            
        # Save entry points
        with open(self.output_dir / "entry_points.json", 'w', encoding='utf-8') as f:
            json.dump({
                'entry_points': self.entry_points,
                'management_commands': self.management_commands
            }, f, indent=2)
            
        print(f"Baseline saved to {self.output_dir}")
        
    def load_baseline(self):
        """Load baseline data for incremental analysis."""
        try:
            # Load modules
            with open(self.output_dir / "modules_baseline.json", 'r', encoding='utf-8') as f:
                modules_data = json.load(f)
                self.modules = {
                    path: ModuleInfo.from_dict(data) for path, data in modules_data.items()
                }
                
            # Load test modules
            with open(self.output_dir / "tests_baseline.json", 'r', encoding='utf-8') as f:
                self.test_modules = json.load(f)
                
            # Load entry points
            with open(self.output_dir / "entry_points.json", 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.entry_points = data['entry_points']
                self.management_commands = data['management_commands']
                
            return True
        except FileNotFoundError:
            print("Baseline not found. Please run with --all first.")
            return False
        except Exception as e:
            print(f"Error loading baseline: {e}")
            return False
            
    def analyze_impact(self, file_path: str):
        """Analyze the impact of changes to a specific file."""
        # Check if baseline exists
        if not os.path.exists(self.output_dir / "modules_baseline.json"):
            print("Baseline not found. Running full analysis first...")
            self.analyze_all_files()
            self.save_baseline()
        else:
            # Load baseline
            if not self.load_baseline():
                return
                
        # Analyze the specified file
        file_path = os.path.abspath(file_path)
        base_dir = os.path.abspath(self.base_dir)
        rel_path = os.path.relpath(file_path, base_dir)
        module_path = rel_path.replace(os.sep, '.').replace('.py', '')
        
        if module_path not in self.modules:
            print(f"File {file_path} not found in baseline. Running analysis...")
            self.analyze_file(file_path)
        
        # Get module info
        module_info = self.modules.get(module_path)
        if not module_info:
            print(f"Could not analyze {file_path}")
            return
            
        # Get current version of the file to compare
        current_module = self.analyze_file(file_path)
        
        # Generate impact report
        self._generate_impact_report(module_info, current_module)
        
    def _get_entry_point_paths(self, function_name: str, module_path: str, max_depth: int = 5):
        """Find paths from entry points to a specific function."""
        paths = []
        visited = set()
        
        def dfs(current_module, current_func, path, depth):
            # Stop if we reached the target
            if current_module == module_path and current_func == function_name:
                paths.append(path.copy())
                return
                
            # Stop if we've reached max depth
            if depth >= max_depth:
                return
                
            # Mark as visited
            visited.add((current_module, current_func))
            
            # Check function calls
            module_info = self.modules.get(current_module)
            if module_info:
                for called_func in module_info.calls.get(current_func, []):
                    if isinstance(called_func, tuple):
                        called_module, called_func_name = called_func
                    elif '.' in called_func:
                        parts = called_func.split('.')
                        called_module = '.'.join(parts[:-1])
                        called_func_name = parts[-1]
                    else:
                        called_module = current_module
                        called_func_name = called_func
                        
                    if (called_module, called_func_name) not in visited:
                        path.append((called_module, called_func_name))
                        dfs(called_module, called_func_name, path, depth + 1)
                        path.pop()
                        
        # Check each entry point
        for entry in self.entry_points:
            entry_module = entry['module']
            entry_func = entry['name']
            
            # Start DFS from this entry point
            dfs(entry_module, entry_func, [(entry_module, entry_func)], 0)
            
        return paths
        
    def _generate_impact_report(self, baseline_module: ModuleInfo, current_module: ModuleInfo):
        """Generate an impact report for a module."""
        os.makedirs(self.output_dir, exist_ok=True)
        
        # Identify changed/new/removed functions
        baseline_funcs = set(baseline_module.functions.keys())
        current_funcs = set(current_module.functions.keys() if current_module else [])
        
        new_funcs = current_funcs - baseline_funcs
        removed_funcs = baseline_funcs - current_funcs
        changed_funcs = []
        
        for func_name in baseline_funcs.intersection(current_funcs):
            if current_module and not baseline_module.functions[func_name].is_compatible_with(current_module.functions[func_name]):
                changed_funcs.append(func_name)
                
        # Identify affected modules and functions
        affected_modules = []
        critical_impacts = []
        test_requirements = []
        
        # Check direct importers
        for importer in baseline_module.imported_by:
            if importer in self.modules:
                affected_modules.append({
                    'module': importer,
                    'reason': 'imports',
                    'severity': 'MEDIUM'
                })
                
        # Check function call dependencies
        for func_name in list(changed_funcs) + list(removed_funcs):
            # Find functions that call this function
            for module_path, module_info in self.modules.items():
                if module_path == baseline_module.module_path:
                    continue
                    
                for caller, callees in module_info.calls.items():
                    for callee in callees:
                        if isinstance(callee, tuple):
                            called_module, called_func = callee
                            if called_module == baseline_module.module_path and called_func == func_name:
                                affected_modules.append({
                                    'module': module_path,
                                    'function': caller,
                                    'reason': f'calls {func_name}',
                                    'severity': 'HIGH'
                                })
                                
                                # Mark as critical impact if it's a public API
                                if not caller.startswith('_'):
                                    critical_impacts.append({
                                        'module': module_path,
                                        'function': caller,
                                        'reason': f'depends on {func_name}'
                                    })
        
        # Check tests affected
        for func_name in list(changed_funcs) + list(removed_funcs) + list(new_funcs):
            # Find tests for this function
            for test_file in baseline_module.related_tests.get(func_name, []):
                test_info = self.test_modules.get(test_file, {})
                for test_func, targets in test_info.get('targets', {}).items():
                    if func_name in targets:
                        test_requirements.append({
                            'test_file': test_file,
                            'test_function': test_func,
                            'target_function': func_name,
                            'reason': 'direct test'
                        })
        
        # Find entry points that reach this module
        entry_point_paths = []
        for func_name in baseline_module.functions:
            if func_name in changed_funcs or func_name in removed_funcs:
                paths = self._get_entry_point_paths(func_name, baseline_module.module_path)
                for path in paths:
                    entry_point_paths.append({
                        'function': func_name,
                        'path': path,
                        'entry_point': path[0] if path else None
                    })
        
        # Sort by severity
        affected_modules.sort(key=lambda x: 0 if x.get('severity') == 'HIGH' else 1)
        
        # Generate summary report
        self._generate_summary_report(
            baseline_module, 
            changed_funcs, new_funcs, removed_funcs,
            affected_modules, critical_impacts, test_requirements, entry_point_paths
        )
        
        # Generate detailed report
        self._generate_detailed_report(
            baseline_module, current_module,
            changed_funcs, new_funcs, removed_funcs,
            affected_modules, critical_impacts, test_requirements, entry_point_paths
        )
        
        # Generate actionable steps
        self._generate_actionable_steps(
            baseline_module,
            changed_funcs, new_funcs, removed_funcs,
            affected_modules, critical_impacts, test_requirements, entry_point_paths
        )
    
    def _generate_summary_report(self, module, changed, new, removed, affected, critical, tests, entry_points):
        """Generate a summary report for AI consumption."""
        with open(self.output_dir / "impact_summary.txt", 'w', encoding='utf-8') as f:
            f.write(f"# Change Impact Analysis: {module.file_path}\n\n")
            
            # Critical impacts section
            f.write("## CRITICAL IMPACTS (↑↑↑)\n")
            if critical:
                for impact in critical[:5]:  # Limit to 5 most important
                    f.write(f"- {impact['module']}: {impact['reason']}\n")
            else:
                f.write("- No critical impacts identified\n")
            f.write("\n")
            
            # Test requirements section
            f.write("## TEST REQUIREMENTS (✓)\n")
            if tests:
                for test in tests[:5]:  # Limit to 5 most important
                    test_name = test['test_function']
                    func_name = test['target_function']
                    f.write(f"- {test_name}: Required for {func_name}\n")
            else:
                f.write("- No existing tests identified - new tests needed\n")
            f.write("\n")
            
            # Entry point exposure section
            f.write("## ENTRY POINT EXPOSURE\n")
            if entry_points:
                for entry in entry_points[:3]:  # Limit to 3 most important
                    path = entry['path']
                    depth = len(path) - 1
                    entry_type = "API" if "/views.py" in str(path[0]) else "Command"
                    f.write(f"- {entry_type} entry point: Reaches through {depth} layers\n")
            else:
                f.write("- No entry points reach this code - may be unused\n")
            f.write("\n")
            
            # Suggested actions section
            f.write("## SUGGESTED NEXT ACTIONS\n")
            
            # If functions changed, update callers
            if changed:
                callers = set()
                for mod in affected:
                    if 'function' in mod:
                        callers.add(f"{mod['module']}.{mod['function']}")
                if callers:
                    f.write(f"1. Update callers: {', '.join(list(callers)[:3])}\n")
                    
            # If tests needed, update tests
            if tests:
                test_files = set(test['test_file'] for test in tests)
                if test_files:
                    f.write(f"2. Update tests in: {', '.join(list(test_files)[:2])}\n")
            else:
                f.write(f"2. Add tests for: {', '.join(list(changed) + list(new))[:3]}\n")
                
            # If critical impacts, update documentation
            if critical:
                f.write("3. Update API documentation to reflect changes\n")
                
    def _generate_detailed_report(self, baseline_module, current_module, changed, new, removed, 
                               affected, critical, tests, entry_points):
        """Generate a detailed technical report in JSON format."""
        report = {
            'module': baseline_module.module_path,
            'file_path': baseline_module.file_path,
            'changes': {
                'changed_functions': [baseline_module.functions[f].to_dict() for f in changed],
                'new_functions': [current_module.functions[f].to_dict() for f in new] if current_module else [],
                'removed_functions': [baseline_module.functions[f].to_dict() for f in removed]
            },
            'impacts': {
                'affected_modules': affected,
                'critical_impacts': critical,
                'test_requirements': tests,
                'entry_point_exposure': entry_points
            }
        }
        
        with open(self.output_dir / "impact_details.json", 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2)
            
    def _calculate_risk_score(self, signature):
        """Calculate a risk score for a function based on its characteristics."""
        score = 0
        
        # Check try/except blocks
        if hasattr(signature, 'try_except_count'):
            score += min(signature.try_except_count, 3)  # Cap at 3
            
        # Check conditional paths
        if hasattr(signature, 'conditional_paths'):
            score += min(signature.conditional_paths, 3) / 2  # Cap at 1.5
            
        # Check external dependencies
        if hasattr(signature, 'external_dependencies') and signature.external_dependencies:
            score += min(len(signature.external_dependencies), 4) / 2  # Cap at 2
            
        # Public functions are higher risk
        if signature.is_public:
            score += 0.5
            
        return score
        
    def _generate_test_scenarios(self, signature):
        """Generate test scenario recommendations based on function characteristics."""
        scenarios = []
        
        # Check if it has try/except blocks
        if hasattr(signature, 'try_except_count') and signature.try_except_count > 0:
            scenarios.append("test exception handling paths")
            
        # Check if it has conditional paths
        if hasattr(signature, 'conditional_paths') and signature.conditional_paths > 0:
            scenarios.append("test each conditional branch")
            
        # Check external dependencies
        if hasattr(signature, 'external_dependencies') and signature.external_dependencies:
            # Django-specific
            if any('django' in dep.lower() for dep in signature.external_dependencies):
                scenarios.append("mock Django dependencies")
                
        # Check docstring for parameters that need boundary tests
        if signature.doc:
            # Look for parameter descriptions
            param_match = re.search(r'Args?:(.*?)(?:Returns?:|$)', signature.doc, re.DOTALL)
            if param_match:
                param_section = param_match.group(1)
                # Look for numeric parameters
                if re.search(r'(int|float|number|dimension)', param_section, re.IGNORECASE):
                    scenarios.append("test boundary values")
                    
        # Default scenario if none were added
        if not scenarios:
            scenarios.append("verify basic functionality")
            
        # Format the result
        if len(scenarios) == 1:
            return scenarios[0]
        else:
            return ", ".join(scenarios[:-1]) + " and " + scenarios[-1]
            
    def _generate_actionable_steps(self, module, changed, new, removed, affected, critical, tests, entry_points):
        """Generate actionable steps in markdown format."""
        # Generate filename based on target file
        target_filename = Path(module.file_path).name
        output_filename = f"{target_filename.replace('.py', '')}_actions.md"
        
        with open(self.output_dir / output_filename, 'w', encoding='utf-8') as f:
            f.write(f"# Actionable Steps: {module.file_path}\n\n")
            
            # Function changes section
            if changed or new or removed:
                f.write("## 1. Function Changes\n\n")
                
                if changed:
                    f.write("### Modified Functions\n\n")
                    for func_name in changed:
                        signature = module.functions[func_name]
                        f.write(f"#### `{func_name}`\n\n")
                        f.write(f"- Original signature: `{signature}`\n")
                        f.write("- Required updates:\n")
                        f.write("  - Update all callers to match new signature\n")
                        f.write("  - Update tests to verify new behavior\n\n")
                
                if new:
                    f.write("### New Functions\n\n")
                    for func_name in new:
                        f.write(f"- `{func_name}`: Add tests and documentation\n")
                    f.write("\n")
                
                if removed:
                    f.write("### Removed Functions\n\n")
                    for func_name in removed:
                        f.write(f"- `{func_name}`: Remove calls from dependent modules\n")
                    f.write("\n")
            
            # Module updates section
            if affected:
                f.write("## 2. Required Module Updates\n\n")
                
                for impact in affected:
                    module_path = impact['module']
                    reason = impact['reason']
                    function = impact.get('function', '')
                    
                    if function:
                        f.write(f"- `{module_path}.{function}`: {reason}\n")
                    else:
                        f.write(f"- `{module_path}`: {reason}\n")
                
                # Add internal function dependencies
                has_internal_dependencies = False
                for func_name in module.functions:
                    if hasattr(module, 'internal_dependencies') and func_name in module.internal_dependencies and module.internal_dependencies[func_name]:
                        if not has_internal_dependencies:
                            f.write("\n### Internal Function Dependencies\n\n")
                            has_internal_dependencies = True
                        called_funcs = module.internal_dependencies[func_name]
                        f.write(f"- `{func_name}` calls: {', '.join([f'`{c}`' for c in called_funcs])}\n")
                f.write("\n")
            
            # Test updates section
            if tests:
                f.write("## 3. Test Updates\n\n")
                
                test_files = {}
                for test in tests:
                    file = test['test_file']
                    if file not in test_files:
                        test_files[file] = []
                    test_files[file].append(test)
                
                for file, file_tests in test_files.items():
                    f.write(f"### {os.path.basename(file)}\n\n")
                    for test in file_tests:
                        f.write(f"- `{test['test_function']}`: Update for `{test['target_function']}` changes\n")
                    f.write("\n")
            else:
                f.write("## 3. New Tests Needed\n\n")
                if not changed and not new:
                    f.write("- No function changes detected that require new tests\n")
                    f.write("- Consider adding general coverage tests for this module\n")
                    # Extract functions for general testing recommendations
                    func_names = list(module.functions.keys())
                    if func_names:
                        f.write("- Key functions to test:\n")
                        for func_name in func_names[:3]:  # Limit to first 3 functions
                            if not func_name.startswith('_'):  # Skip private functions
                                f.write(f"  - `{func_name}`: Basic functionality tests\n")
                else:
                    for func_name in changed:
                        f.write(f"- Create test for modified function `{func_name}`\n")
                    for func_name in new:
                        f.write(f"- Create test for new function `{func_name}`\n")
                f.write("\n")
            
            # Entry point validation section
            if entry_points:
                f.write("## 4. Entry Point Validation\n\n")
                
                entry_types = {}
                for entry in entry_points:
                    path = entry['path']
                    if not path:
                        continue
                        
                    entry_module, entry_func = path[0]
                    key = f"{entry_module}.{entry_func}"
                    
                    if key not in entry_types:
                        entry_types[key] = []
                    entry_types[key].append(entry)
                
                for key, entries in entry_types.items():
                    f.write(f"### {key}\n\n")
                    f.write("Verify changes through the following call path:\n\n")
                    
                    # Pick the first entry only
                    path = entries[0]['path']
                    for i, (module, func) in enumerate(path):
                        indent = "  " * i
                        f.write(f"{indent}- `{module}.{func}`\n")
                    f.write("\n")


def main():
    """Main entry point for the script."""
    parser = argparse.ArgumentParser(description='Analyze the impact of code changes.')
    
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--all', action='store_true', help='Analyze all files and create a baseline.')
    group.add_argument('--file', type=str, help='Analyze a specific file for changes.')
    
    parser.add_argument('--output', type=str, help='Output directory for reports.')
    parser.add_argument('--base-dir', type=str, default='.', help='Base directory of the project.')
    
    args = parser.parse_args()
    
    # Create analyzer
    analyzer = ChangeImpactAnalyzer(args.base_dir, args.output)
    
    if args.all:
        # Full analysis
        print("Analyzing all files to create baseline...")
        analyzer.analyze_all_files()
        analyzer.save_baseline()
        print("Baseline analysis complete.")
    else:
        # Single file analysis
        print(f"Analyzing impact of changes to {args.file}...")
        analyzer.analyze_impact(args.file)
        print(f"Impact analysis complete. Results in {analyzer.output_dir}")


if __name__ == "__main__":
    main()
