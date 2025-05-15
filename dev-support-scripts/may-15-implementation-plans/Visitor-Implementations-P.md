# Visitor Implementations (Version P)

This document provides detailed implementation specifications for the visitor classes that extract specific information from parsed source code in the Language-Agnostic Code Analysis Suite.

## Python Visitors

### 1. Python Dependency Visitor

This visitor extracts import statements from Python AST.

```python
# visitors/python/dependency_visitor.py
import ast
from typing import List, Dict, Any

from core.visitors.dependency_visitor import DependencyVisitor

class PythonDependencyVisitor(ast.NodeVisitor, DependencyVisitor):
    """Extract import statements from Python AST."""
    
    def __init__(self, module_path):
        """Initialize with module path for context.
        
        Args:
            module_path: Path to the module being visited
        """
        self.module_path = module_path
        self.imports = []
        
    def visit_Import(self, node):
        """Visit Import nodes.
        
        Example:
            import os, sys
        """
        for name in node.names:
            # Skip standard library imports
            if not self._is_standard_library(name.name):
                self.imports.append({
                    'module': name.name,
                    'type': 'import',
                    'alias': name.asname
                })
        self.generic_visit(node)
    
    def visit_ImportFrom(self, node):
        """Visit ImportFrom nodes.
        
        Example:
            from os import path
        """
        if node.module and not self._is_standard_library(node.module):
            for name in node.names:
                self.imports.append({
                    'module': node.module,
                    'name': name.name,
                    'type': 'from',
                    'alias': name.asname
                })
        self.generic_visit(node)
    
    def _is_standard_library(self, module_name):
        """Check if a module is from the standard library.
        
        Args:
            module_name: Name of the module to check
            
        Returns:
            True if the module is from the standard library, False otherwise
        """
        std_libs = [
            'abc', 'argparse', 'ast', 'asyncio', 'base64', 'collections', 'concurrent',
            'contextlib', 'copy', 'csv', 'datetime', 'decimal', 'difflib', 'enum',
            'functools', 'glob', 'gzip', 'hashlib', 'heapq', 'http', 'importlib',
            'inspect', 'io', 'itertools', 'json', 'logging', 'math', 'multiprocessing',
            'operator', 'os', 'pathlib', 'pickle', 'random', 're', 'shutil', 'signal',
            'socket', 'sqlite3', 'statistics', 'string', 'subprocess', 'sys', 'tempfile',
            'threading', 'time', 'traceback', 'typing', 'unittest', 'urllib', 'uuid',
            'warnings', 'weakref', 'xml', 'zipfile'
        ]
        
        return any(module_name == lib or module_name.startswith(f"{lib}.") for lib in std_libs)
    
    def get_imports(self) -> List[Dict[str, Any]]:
        """Get the list of imports.
        
        Implementation of the DependencyVisitor interface method.
        
        Returns:
            List of dictionaries representing imports
        """
        return self.imports
```

### 2. Python Contract Visitor

This visitor extracts API contracts (class and function definitions) from Python AST.

```python
# visitors/python/contract_visitor.py
import ast
from typing import Dict, Any, List, Optional

from core.visitors.contract_visitor import ContractVisitor

class PythonContractVisitor(ast.NodeVisitor, ContractVisitor):
    """Extract API contracts from Python AST."""
    
    def __init__(self, file_path: str):
        """Initialize with file path for context.
        
        Args:
            file_path: Path to the file being visited
        """
        self.file_path = file_path
        self.classes = {}
        self.functions = {}
        self.current_class = None
    
    def visit_ClassDef(self, node):
        """Extract class definitions and method signatures.
        
        This method is called for each class definition in the AST.
        """
        previous_class = self.current_class
        self.current_class = node.name
        
        class_info = {
            "methods": {},
            "bases": [self._get_name(base) for base in node.bases],
            "docstring": self._get_docstring(node),
            "file_path": self.file_path,
            "decorators": [self._get_name(d) for d in node.decorator_list],
        }
        
        # Visit class body to extract methods
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
        """Extract function definitions.
        
        This method only processes top-level functions, not methods.
        """
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
    
    def _get_docstring(self, node):
        """Extract docstring from an AST node.
        
        Args:
            node: An AST node that might have a docstring
            
        Returns:
            The docstring text or None if no docstring is found
        """
        if node.body:
            first_node = node.body[0]
            if isinstance(first_node, ast.Expr):
                if isinstance(first_node.value, ast.Constant) and isinstance(first_node.value.value, str):
                    return first_node.value.value.strip()
                elif isinstance(first_node.value, ast.Str):  # For Python 3.7 compatibility
                    return first_node.value.s.strip()
        return None
    
    def _get_name(self, node):
        """Get string representation of a name node.
        
        Args:
            node: An AST node representing a name
            
        Returns:
            String representation of the name
        """
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
        """Get value from a node representing a default parameter value.
        
        Args:
            node: An AST node representing a value
            
        Returns:
            Python representation of the value
        """
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
    
    def get_definitions(self) -> Dict[str, Any]:
        """Get extracted definitions.
        
        Implementation of the ContractVisitor interface method.
        
        Returns:
            Dictionary with 'classes' and 'functions' keys
        """
        return {
            "classes": self.classes,
            "functions": self.functions
        }
```

### 3. Python Docstring Visitor

This visitor extracts docstrings from Python modules, classes, and functions.

```python
# visitors/python/docstring_visitor.py
import ast
from typing import Dict, Any, Optional

from core.visitors.docstring_visitor import DocstringVisitor

class PythonDocstringVisitor(ast.NodeVisitor, DocstringVisitor):
    """Extract docstrings from Python modules, classes, and functions."""
    
    def __init__(self):
        """Initialize the docstring visitor."""
        self.docstrings = {
            "module": None,
            "classes": {},
            "functions": {}
        }
        self.current_class = None
    
    def visit_Module(self, node):
        """Extract module-level docstring."""
        if node.body and isinstance(node.body[0], ast.Expr):
            if isinstance(node.body[0].value, ast.Constant) and isinstance(node.body[0].value.value, str):
                self.docstrings["module"] = node.body[0].value.value.strip()
            elif isinstance(node.body[0].value, ast.Str):  # For Python 3.7 compatibility
                self.docstrings["module"] = node.body[0].value.s.strip()
        self.generic_visit(node)
    
    def visit_ClassDef(self, node):
        """Extract class docstring and method docstrings."""
        prev_class = self.current_class
        self.current_class = node.name
        
        # Initialize class entry
        self.docstrings["classes"][node.name] = {
            "docstring": None,
            "methods": {}
        }
        
        # Extract class docstring
        if node.body and isinstance(node.body[0], ast.Expr):
            if isinstance(node.body[0].value, ast.Constant) and isinstance(node.body[0].value.value, str):
                self.docstrings["classes"][node.name]["docstring"] = node.body[0].value.value.strip()
            elif isinstance(node.body[0].value, ast.Str):  # For Python 3.7 compatibility
                self.docstrings["classes"][node.name]["docstring"] = node.body[0].value.s.strip()
        
        # Visit class body to extract method docstrings
        self.generic_visit(node)
        self.current_class = prev_class
    
    def visit_FunctionDef(self, node):
        """Extract function or method docstring."""
        # Extract docstring
        docstring = None
        if node.body and isinstance(node.body[0], ast.Expr):
            if isinstance(node.body[0].value, ast.Constant) and isinstance(node.body[0].value.value, str):
                docstring = node.body[0].value.value.strip()
            elif isinstance(node.body[0].value, ast.Str):  # For Python 3.7 compatibility
                docstring = node.body[0].value.s.strip()
        
        # Store as method if inside a class, otherwise as function
        if self.current_class:
            self.docstrings["classes"][self.current_class]["methods"][node.name] = {
                "docstring": docstring,
                "args": [arg.arg for arg in node.args.args if arg.arg != 'self']
            }
        else:
            self.docstrings["functions"][node.name] = {
                "docstring": docstring,
                "args": [arg.arg for arg in node.args.args]
            }
        
        # Visit function body
        self.generic_visit(node)
    
    def get_docstrings(self) -> Dict[str, Any]:
        """Get the extracted docstrings.
        
        Implementation of the DocstringVisitor interface method.
        
        Returns:
            Dictionary with 'module', 'classes', and 'functions' keys
        """
        return self.docstrings
```

## TypeScript Visitors

### 1. TypeScript Dependency Visitor

This visitor extracts import statements from TypeScript using tree-sitter.

```python
# visitors/typescript/dependency_visitor.py
from typing import List, Dict, Any

class TypeScriptDependencyVisitor:
    """Extract import statements from TypeScript using tree-sitter."""
    
    def __init__(self, language):
        """Initialize with tree-sitter language for queries.
        
        Args:
            language: The tree-sitter language object
        """
        self.language = language
    
    def extract_imports(self, tree) -> List[Dict[str, Any]]:
        """Extract imports from a TypeScript tree.
        
        Args:
            tree: A tree-sitter tree
            
        Returns:
            List of dictionaries representing imports
        """
        imports = []
        
        # Define query to find import statements
        # This leverages the existing tree-sitter grammar from Cline
        query_string = """
        (import_statement
          source: (string) @source) @import
        
        (import_statement
          (import_clause
            (named_imports
              (import_specifier
                name: (identifier) @import_name
                alias: (identifier)? @import_alias)?))) @named_import
        """
        
        query = self.language.query(query_string)
        captures = query.captures(tree.root_node)
        
        current_source = None
        
        for node, tag in captures:
            if tag == "source":
                # Extract the module path (remove quotes)
                source_text = node.text.decode('utf-8')
                current_source = source_text.strip('\'"')
            elif tag == "import":
                # Basic import statement
                if current_source:
                    imports.append({
                        'module': current_source,
                        'type': 'import'
                    })
            elif tag == "import_name":
                # Named import
                name = node.text.decode('utf-8')
                if current_source:
                    imports.append({
                        'module': current_source,
                        'name': name,
                        'type': 'from'
                    })
            elif tag == "import_alias":
                # Update the last import with alias information
                if imports:
                    imports[-1]['alias'] = node.text.decode('utf-8')
        
        return imports
```

### 2. TypeScript Contract Visitor

This visitor extracts API contracts (classes, interfaces, functions) from TypeScript using tree-sitter.

```python
# visitors/typescript/contract_visitor.py
from typing import Dict, Any, List, Optional

class TypeScriptContractVisitor:
    """Extract API contracts from TypeScript using tree-sitter."""
    
    def __init__(self, language):
        """Initialize with tree-sitter language for queries.
        
        Args:
            language: The tree-sitter language object
        """
        self.language = language
    
    def extract_definitions(self, tree) -> Dict[str, Any]:
        """Extract definitions from a TypeScript tree.
        
        Args:
            tree: A tree-sitter tree
            
        Returns:
            Dictionary with 'classes', 'interfaces', and 'functions' keys
        """
        return {
            "classes": self._extract_classes(tree),
            "interfaces": self._extract_interfaces(tree),
            "functions": self._extract_functions(tree)
        }
    
    def _extract_classes(self, tree) -> Dict[str, Any]:
        """Extract class definitions.
        
        Args:
            tree: A tree-sitter tree
            
        Returns:
            Dictionary mapping class names to their information
        """
        classes = {}
        
        # Define query to find class declarations
        # This leverages the existing tree-sitter grammar from Cline
        query_string = """
        (class_declaration
          name: (type_identifier) @class_name
          body: (class_body) @class_body) @class
        """
        
        query = self.language.query(query_string)
        captures = query.captures(tree.root_node)
        
        current_class = None
        
        for node, tag in captures:
            if tag == "class_name":
                class_name = node.text.decode('utf-8')
                current_class = class_name
                classes[class_name] = {
                    "methods": {},
                    "bases": [],  # Will extract in a separate query
                    "docstring": None,  # Will extract with docstring visitor
                    "decorators": []  # TypeScript decorators would require additional parsing
                }
            elif tag == "class_body" and current_class:
                # Extract methods from class body using a separate query
                methods = self._extract_methods(node, current_class)
                classes[current_class]["methods"] = methods
                
                # Add extends information if present
                # This requires a separate query pattern to get base classes
                parent_node = node.parent
                extends_clause = None
                for child in parent_node.children:
                    if child.type == "extends_clause":
                        extends_clause = child
                        break
                
                if extends_clause:
                    for child in extends_clause.children:
                        if child.type == "type_identifier":
                            classes[current_class]["bases"].append(child.text.decode('utf-8'))
        
        return classes
    
    def _extract_methods(self, class_body_node, class_name) -> Dict[str, Any]:
        """Extract methods from a class body.
        
        Args:
            class_body_node: The tree-sitter node for the class body
            class_name: The name of the class
            
        Returns:
            Dictionary mapping method names to their information
        """
        methods = {}
        
        # Define query to find method definitions
        query_string = """
        (method_definition
          name: (property_identifier) @method_name) @method
        """
        
        query = self.language.query(query_string)
        captures = query.captures(class_body_node)
        
        for node, tag in captures:
            if tag == "method_name":
                method_name = node.text.decode('utf-8')
                methods[method_name] = {
                    "parameters": self._extract_parameters(node.parent),
                    "docstring": None,  # Will be filled by docstring visitor
                    "decorators": [],  # TypeScript decorators would require additional parsing
                    "return_type": self._extract_return_type(node.parent)
                }
        
        return methods
    
    def _extract_parameters(self, method_node) -> List[Dict[str, Any]]:
        """Extract parameters from a method definition.
        
        Args:
            method_node: The tree-sitter node for the method
            
        Returns:
            List of dictionaries representing parameters
        """
        parameters = []
        
        # Find the parameter list
        params_node = None
        for child in method_node.children:
            if child.type == "formal_parameters":
                params_node = child
                break
                
        if not params_node:
            return parameters
            
        # Extract individual parameters
        for child in params_node.children:
            if child.type == "required_parameter":
                param_name = None
                param_type = None
                
                # Get parameter name
                for param_child in child.children:
                    if param_child.type == "identifier":
                        param_name = param_child.text.decode('utf-8')
                    elif param_child.type == "type_annotation":
                        for type_child in param_child.children:
                            if type_child.type != ":":  # Skip the colon
                                param_type = type_child.text.decode('utf-8')
                
                if param_name:
                    parameters.append({
                        "name": param_name,
                        "type": param_type,
                        "required": True  # More complex logic would be needed to determine optional parameters
                    })
                    
            elif child.type == "optional_parameter":
                # Handle optional parameters (with default values)
                param_name = None
                param_type = None
                
                for param_child in child.children:
                    if param_child.type == "identifier":
                        param_name = param_child.text.decode('utf-8')
                    elif param_child.type == "type_annotation":
                        for type_child in param_child.children:
                            if type_child.type != ":":  # Skip the colon
                                param_type = type_child.text.decode('utf-8')
                
                if param_name:
                    parameters.append({
                        "name": param_name,
                        "type": param_type,
                        "required": False
                    })
        
        return parameters
    
    def _extract_return_type(self, method_node) -> Optional[str]:
        """Extract return type from a method definition.
        
        Args:
            method_node: The tree-sitter node for the method
            
        Returns:
            Return type as a string, or None if not specified
        """
        # Find the return type annotation
        for child in method_node.children:
            if child.type == "type_annotation":
                # The return type will be after the colon
                for type_child in child.children:
                    if type_child.type != ":":  # Skip the colon
                        return type_child.text.decode('utf-8')
        
        return None
    
    def _extract_interfaces(self, tree) -> Dict[str, Any]:
        """Extract interface definitions.
        
        Args:
            tree: A tree-sitter tree
            
        Returns:
            Dictionary mapping interface names to their information
        """
        interfaces = {}
        
        # Define query to find interface declarations
        query_string = """
        (interface_declaration
          name: (type_identifier) @interface_name) @interface
        """
        
        query = self.language.query(query_string)
        captures = query.captures(tree.root_node)
        
        for node, tag in captures:
            if tag == "interface_name":
                interface_name = node.text.decode('utf-8')
                
                # Get the parent interface declaration node
                interface_node = node.parent
                
                # Initialize interface info
                interfaces[interface_name] = {
                    "properties": self._extract_interface_properties(interface_node),
                    "methods": self._extract_interface_methods(interface_node),
                    "extends": self._extract_interface_extends(interface_node),
                    "docstring": None  # Will be filled by docstring visitor
                }
        
        return interfaces
    
    def _extract_interface_properties(self, interface_node) -> Dict[str, str]:
        """Extract properties from an interface declaration.
        
        Args:
            interface_node: The tree-sitter node for the interface
            
        Returns:
            Dictionary mapping property names to their types
        """
        properties = {}
        
        # Find the interface body
        body_node = None
        for child in interface_node.children:
            if child.type == "object_type":
                body_node = child
                break
                
        if not body_node:
            return properties
            
        # Query for property signatures
        query_string = """
        (property_signature
          name: (property_identifier) @prop_name
          type: (type_annotation) @prop_type) @prop
        """
        
        query = self.language.query(query_string)
        captures = query.captures(body_node)
        
        current_prop = None
        
        for node, tag in captures:
            if tag == "prop_name":
                current_prop = node.text.decode('utf-8')
                properties[current_prop] = None
            elif tag == "prop_type" and current_prop:
                # Get the type from the annotation (skipping the colon)
                for child in node.children:
                    if child.type != ":":  # Skip the colon
                        properties[current_prop] = child.text.decode('utf-8')
                        break
        
        return properties
    
    def _extract_interface_methods(self, interface_node) -> Dict[str, Any]:
        """Extract methods from an interface declaration.
        
        Args:
            interface_node: The tree-sitter node for the interface
            
        Returns:
            Dictionary mapping method names to their information
        """
        methods = {}
        
        # Find the interface body
        body_node = None
        for child in interface_node.children:
            if child.type == "object_type":
                body_node = child
                break
                
        if not body_node:
            return methods
            
        # Query for method signatures
        query_string = """
        (method_signature
          name: (property_identifier) @method_name) @method
        """
        
        query = self.language.query(query_string)
        captures = query.captures(body_node)
        
        for node, tag in captures:
            if tag == "method_name":
                method_name = node.text.decode('utf-8')
                methods[method_name] = {
                    "parameters": self._extract_parameters(node.parent),
                    "docstring": None,  # Will be filled by docstring visitor
                    "return_type": self._extract_return_type(node.parent)
                }
        
        return methods
    
    def _extract_interface_extends(self, interface_node) -> List[str]:
        """Extract extended interfaces.
        
        Args:
            interface_node: The tree-sitter node for the interface
            
        Returns:
            List of interface names that this interface extends
        """
        extends = []
        
        # Find the extends clause
        extends_clause = None
        for child in interface_node.children:
            if child.type == "extends_clause":
                extends_clause = child
                break
                
        if not extends_clause:
            return extends
            
        # Extract base interface names
        for child in extends_clause.children:
            if child.type == "type_identifier":
                extends.append(child.text.decode('utf-8'))
        
        return extends
    
    def _extract_functions(self, tree) -> Dict[str, Any]:
        """Extract function declarations.
        
        Args:
            tree: A tree-sitter tree
            
        Returns:
            Dictionary mapping function names to their information
        """
        functions = {}
        
        # Define query to find function declarations
        query_string = """
        (function_declaration
          name: (identifier) @function_name) @function
        """
        
        query = self.language.query(query_string)
        captures = query.captures(tree.root_node)
        
        for node, tag in captures:
            if tag == "function_name":
                function_name = node.text.decode('utf-8')
                functions[function_name] = {
                    "parameters": self._extract_parameters(node.parent),
                    "docstring": None,  # Will be filled by docstring visitor
                    "return_type": self._extract_return_type(node.parent),
                    "decorators": []  # TypeScript decorators would require additional parsing
                }
        
        return functions
```

### 3. TypeScript Docstring Visitor

This visitor extracts JSDoc comments from TypeScript using tree-sitter.

```python
# visitors/typescript/docstring_visitor.py
from typing import Dict, Any, Optional

class TypeScriptDocstringVisitor:
    """Extract JSDoc comments from TypeScript files using tree-sitter."""
    
    def __init__(self, language):
        """Initialize the docstring visitor.
        
        Args:
            language: The tree-sitter language object
        """
        self.language = language
        self.docstrings = {
            "module": None,
            "classes": {},
            "interfaces": {},
            "functions": {}
        }
    
    def extract_docstrings(self, tree) -> Dict[str, Any]:
        """Extract all JSDoc comments from the tree.
        
        Args:
            tree: A tree-sitter tree
            
        Returns:
            Dictionary with 'module', 'classes', 'interfaces', and 'functions' keys
        """
        # Extract module docstring
        self.docstrings["module"] = self._extract_module_doc(tree)
        
        # Extract class docstrings
        self.docstrings["classes"] = self._extract_class_docs(tree)
        
        # Extract interface docstrings
        self.docstrings["interfaces"] = self._extract_interface_docs(tree)
        
        # Extract function docstrings
        self.docstrings["functions"] = self._extract_function_docs(tree)
        
        return self.docstrings
    
    def _extract_module_doc(self, tree) -> Optional[str]:
        """Extract module-level JSDoc comment.
        
        This looks for a JSDoc comment at the beginning of the file.
        
        Args:
            tree: A tree-sitter tree
            
        Returns:
            Module JSDoc comment or None if not found
        """
        # Define a query to find a JSDoc comment at the beginning of the file
        query_string = """
        (comment) @module_doc
        """
        query = self.language.query(query_string)
        
        # Execute the query
        captures = query.captures(tree.root_node)
        
        # Check if the first comment is a JSDoc comment
        if captures:
            first_comment = captures[0][0]
            comment_text = first_comment.text.decode('utf-8')
            if comment_text.startswith('/**') and comment_text.endswith('*/'):
                return self._clean_jsdoc(comment_text)
        
        return None
    
    def _extract_class_docs(self, tree) -> Dict[str, Dict[str, Any]]:
        """Extract class JSDoc comments.
        
        Args:
            tree: A tree-sitter tree
            
        Returns:
            Dictionary mapping class names to their docstrings and methods
        """
        classes = {}
        
        # Define a query to find class declarations with docstrings
        query_string = """
        (comment)? @class_doc
        (class_declaration
          name: (type_identifier) @class_name) @class
        """
        query = self.language.query(query_string)
        
        # Execute the query
        captures = query.captures(tree.root_node)
        
        # Process the results to match comment nodes with the following class declaration
        current_doc = None
        
        for node, tag in captures:
            if tag == "class_doc":
                comment_text = node.text.decode('utf-8')
                if comment_text.startswith('/**') and comment_text.endswith('*/'):
                    current_doc = self._clean_jsdoc(comment_text)
            elif tag == "class_name":
                class_name = node.text.decode('utf-8')
                classes[class_name] = {
                    "docstring": current_doc,
                    "methods": {}
                }
                current_doc = None
        
        # Now extract method docstrings for each class
        for class_name in classes:
            # Skip classes without docstrings as they're likely not fully documented
            if classes[class_name]["docstring"] is not None:
                classes[class_name]["methods"] = self._extract_method_docs(tree, class_name)
        
        return classes
    
    def _extract_method_docs(self, tree, class_name) -> Dict[str, Dict[str, Any]]:
        """Extract method JSDoc comments for a specific class.
        
        Args:
            tree: A tree-sitter tree
            class_name: The name of the class to extract methods for
            
        Returns:
            Dictionary mapping method names to their docstrings
        """
        methods = {}
        
        # Define a query to find method declarations with docstrings
        query_string = f"""
        (class_declaration
          name: (type_identifier) @class_name
          body: (class_body
            (comment)? @method_doc
            (method_definition
              name: (property_identifier) @method_name) @method))
        """
        query = self.language.query(query_string)
        
        # Execute the query
        captures = query.captures(tree.root_node)
        
        # Process the results
        current_class = None
        current_doc = None
        
        for node, tag in captures:
            if tag == "class_name":
                current_class = node.text.decode('utf-8')
            elif tag == "method_doc" and current_class == class_name:
                comment_text = node.text.decode('utf-8')
                if comment_text.startswith('/**') and comment_text.endswith('*/'):
                    current_doc = self._clean_jsdoc(comment_text)
            elif tag == "method_name" and current_class == class_name:
                method_name = node.text.decode('utf-8')
                methods[method_name] = {
                    "docstring": current_doc,
                    "args": []  # Would need more complex parsing to extract arguments from JSDoc
                }
                current_doc = None
        
        return methods
    
    def _extract_interface_docs(self, tree) -> Dict[str, Dict[str, Any]]:
        """Extract interface JSDoc comments.
        
        Args:
            tree: A tree-sitter tree
            
        Returns:
            Dictionary mapping interface names to their docstrings
        """
        interfaces = {}
        
        # Define a query to find interface declarations with docstrings
        query_string = """
        (comment)? @interface_doc
        (interface_declaration
          name: (type_identifier) @interface_name) @interface
        """
        query = self.language.query(query_string)
        
        # Execute the query
        captures = query.captures(tree.root_node)
        
        # Process the results
        current_doc = None
        
        for node, tag in captures:
            if tag == "interface_doc":
                comment_text = node.text.decode('utf-8')
                if comment_text.startswith('/**') and comment_text.endswith('*/'):
                    current_doc = self._clean_jsdoc(comment_text)
            elif tag == "interface_name":
                interface_name = node.text.decode('utf-8')
                interfaces[interface_name] = {
                    "docstring": current_doc,
                    "methods": {}  # Would need more complex parsing to extract methods
                }
                current_doc = None
        
        return interfaces
    
    def _extract_function_docs(self, tree) -> Dict[str, Dict[str, Any]]:
        """Extract function JSDoc comments.
        
        Args:
            tree: A tree-sitter tree
            
        Returns:
            Dictionary mapping function names to their docstrings
        """
        functions = {}
        
        # Define a query to find function declarations with docstrings
        query_string = """
        (comment)? @function_doc
        (function_declaration
          name: (identifier) @function_name) @function
        """
        query = self.language.query(query_string)
        
        # Execute the query
        captures = query.captures(tree.root_node)
        
        # Process the results
        current_doc = None
        
        for node, tag in captures:
            if tag == "function_doc":
                comment_text = node.text.decode('utf-8')
                if comment_text.startswith('/**') and comment_text.endswith('*/'):
                    current_doc = self._clean_jsdoc(comment_text)
            elif tag == "function_name":
                function_name = node.text.decode('utf-8')
                functions[function_name] = {
                    "docstring": current_doc,
                    "args": []  # Would need more complex parsing to extract arguments from JSDoc
                }
                current_doc = None
        
        return functions
    
    def _clean_jsdoc(self, comment_text: str) -> str:
        """Clean up JSDoc format by removing comment markers.
        
        Args:
            comment_text: Raw JSDoc comment text
            
        Returns:
            Cleaned JSDoc text without comment markers
        """
        lines = comment_text.split('\n')
        cleaned_lines = []
        for line in lines:
            line = line.strip()
            if line.startswith('/**'):
                line = line[3:].strip()
            elif line.startswith('*/'):
                continue
            elif line.startswith('*'):
                line = line[1:].strip()
            cleaned_lines.append(line)
        return '\n'.join(cleaned_lines).strip()
```

## Extending Visitors for New Languages

### Adding a New Language Visitor Set

1. **Create Language-Specific Visitor Package**:
   ```
   visitors/[language]/
   ├── __init__.py
   ├── dependency_visitor.py
   ├── contract_visitor.py
   └── docstring_visitor.py
   ```

2. **Implement Core Visitor Interfaces**:
   - Each visitor should implement the respective interface from `core/visitors/`
   - Follow the patterns established in the Python and TypeScript visitors
   - Ensure compatibility with the common data models

3. **Handle Language-Specific Features**:
   - Adapt docstring extraction for the language's documentation style
   - Handle language-specific import mechanisms
   - Account for unique type systems or language constructs

### Visitor Testing Guidelines

1. **Create Unit Tests for Each Visitor**:
   ```python
   # Example test for a new language visitor
   class TestNewLanguageDependencyVisitor(unittest.TestCase):
       def setUp(self):
           self.visitor = NewLanguageDependencyVisitor()
           # Create test files or mock parse trees
           
       def test_extract_imports(self):
           # Test import extraction logic
           
       # Additional test methods...
   ```

2. **Test with a Variety of Code Patterns**:
   - Simple and complex imports
   - Nested class and function definitions
   - Various docstring formats
   - Edge cases specific to the language

3. **Verify Common Data Model Compatibility**:
   - Ensure all output adheres to the common data model specifications
   - Verify that language-specific features are represented appropriately