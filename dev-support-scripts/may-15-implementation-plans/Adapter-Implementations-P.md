# Adapter Implementations (Version P)

This document provides detailed implementation specifications for the language adapter classes in the Language-Agnostic Code Analysis Suite. These adapters bridge between language-specific parsers and the language-agnostic analysis modules.

## 1. Python Adapter

The Python adapter connects the Python AST parser with the common analysis frameworks.

```python
# core/adapters/python_adapter.py
from typing import List, Dict, Any, Union
import os
from pathlib import Path

from core.language_parser import LanguageParser
from core.parsers.python.ast_parser import PythonAstParser
from visitors.python.dependency_visitor import PythonDependencyVisitor
from visitors.python.contract_visitor import PythonContractVisitor
from visitors.python.docstring_visitor import PythonDocstringVisitor

class PythonAdapter:
    """Python adapter implementation.
    
    This adapter connects the Python AST parser to the common analysis framework,
    providing a consistent interface for Python code analysis.
    """
    
    def __init__(self, subsystem_patterns=None):
        """Initialize the Python adapter.
        
        Args:
            subsystem_patterns: Optional dictionary mapping directory patterns to subsystem names
        """
        self.parser = PythonAstParser(subsystem_patterns)
    
    def find_source_files(self, directory: Union[str, Path]) -> List[str]:
        """Find Python files in directory.
        
        Args:
            directory: Directory to search for Python files
            
        Returns:
            List of file paths to Python files
        """
        return self.parser.find_source_files(directory)
    
    def extract_module_info(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """Extract comprehensive information about a Python module.
        
        This method aggregates information from various visitors to build a complete 
        picture of the module's structure, dependencies, and documentation.
        
        Args:
            file_path: Path to the Python file
            
        Returns:
            Dict containing module information including imports, definitions, and docstrings
        """
        # Get imports
        imports = self.parser.extract_imports(file_path)
        
        # Get definitions
        definitions = self.parser.extract_definitions(file_path)
        
        # Get docstrings
        docstrings = self.parser.extract_docstrings(file_path)
        
        # Calculate relative path and module name
        directory = Path(os.getcwd())
        rel_path = os.path.relpath(file_path, directory)
        module_path = str(rel_path).replace(os.sep, '.').replace('.py', '')
        
        # Skip __init__.py files in module path
        if '__init__' in module_path:
            module_path = module_path.replace('.__init__', '')
        
        # Determine subsystem
        subsystem = self.parser.determine_subsystem(file_path)
        
        # Build unified module information model
        module_info = {
            "name": module_path,
            "file_path": rel_path,
            "imports": imports,
            "classes": definitions.get("classes", {}),
            "functions": definitions.get("functions", {}),
            "module_docstring": docstrings.get("module"),
            "subsystem": subsystem
        }
        
        # Integrate docstrings with class and function definitions
        self._integrate_docstrings(module_info, docstrings)
        
        return module_info
    
    def _integrate_docstrings(self, module_info: Dict[str, Any], docstrings: Dict[str, Any]) -> None:
        """Integrate docstrings with class and function definitions.
        
        This method enriches the class and function definitions with their corresponding
        docstrings from the docstrings dictionary.
        
        Args:
            module_info: Module information to enrich
            docstrings: Extracted docstrings
        """
        # Integrate class docstrings
        for class_name, class_info in module_info["classes"].items():
            if class_name in docstrings.get("classes", {}):
                class_doc = docstrings["classes"][class_name]
                class_info["docstring"] = class_doc.get("docstring")
                
                # Integrate method docstrings
                for method_name, method_info in class_info.get("methods", {}).items():
                    if method_name in class_doc.get("methods", {}):
                        method_info["docstring"] = class_doc["methods"][method_name].get("docstring")
        
        # Integrate function docstrings
        for func_name, func_info in module_info["functions"].items():
            if func_name in docstrings.get("functions", {}):
                func_info["docstring"] = docstrings["functions"][func_name].get("docstring")
    
    def analyze_imports(self, file_path: Union[str, Path]) -> List[Dict[str, Any]]:
        """Analyze imports for a specific file.
        
        This convenience method extracts just the import information.
        
        Args:
            file_path: Path to the Python file
            
        Returns:
            List of import dictionaries
        """
        return self.parser.extract_imports(file_path)
    
    def analyze_definitions(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """Analyze class and function definitions for a specific file.
        
        This convenience method extracts just the definition information.
        
        Args:
            file_path: Path to the Python file
            
        Returns:
            Dict containing class and function definitions
        """
        return self.parser.extract_definitions(file_path)
    
    def analyze_docstrings(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """Analyze docstrings for a specific file.
        
        This convenience method extracts just the docstring information.
        
        Args:
            file_path: Path to the Python file
            
        Returns:
            Dict containing module, class, and function docstrings
        """
        return self.parser.extract_docstrings(file_path)
```

## 2. TypeScript Adapter

The TypeScript adapter connects the tree-sitter based TypeScript parser with the common analysis frameworks.

```python
# core/adapters/typescript_adapter.py
from typing import List, Dict, Any, Union
import os
from pathlib import Path

from core.parsers.typescript.tree_sitter_parser import TypeScriptTreeSitterParser

class TypeScriptAdapter:
    """TypeScript adapter implementation.
    
    This adapter connects the TypeScript tree-sitter parser to the common analysis framework,
    providing a consistent interface for TypeScript code analysis that leverages Cline's
    existing tree-sitter implementation.
    """
    
    def __init__(self, project_root=None, subsystem_patterns=None):
        """Initialize the TypeScript adapter.
        
        Args:
            project_root: Root directory of the project (for finding Cline's tree-sitter files)
            subsystem_patterns: Optional dictionary mapping directory patterns to subsystem names
        """
        self.parser = TypeScriptTreeSitterParser(project_root, subsystem_patterns)
    
    def find_source_files(self, directory: Union[str, Path]) -> List[str]:
        """Find TypeScript files in directory.
        
        Args:
            directory: Directory to search for TypeScript files
            
        Returns:
            List of file paths to TypeScript files
        """
        return self.parser.find_source_files(directory)
    
    def extract_module_info(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """Extract comprehensive information about a TypeScript module.
        
        This method aggregates information from various visitors to build a complete 
        picture of the module's structure, dependencies, and documentation.
        
        Args:
            file_path: Path to the TypeScript file
            
        Returns:
            Dict containing module information including imports, definitions, and docstrings
        """
        # Get imports
        imports = self.parser.extract_imports(file_path)
        
        # Get definitions
        definitions = self.parser.extract_definitions(file_path)
        
        # Get docstrings
        docstrings = self.parser.extract_docstrings(file_path)
        
        # Calculate relative path and module name in a TypeScript-appropriate way
        directory = Path(os.getcwd())
        rel_path = os.path.relpath(file_path, directory)
        
        # Create module path similar to Python's style but TypeScript-appropriate
        # Remove file extension and convert path separators to dots
        module_path = str(rel_path).replace(os.sep, '.').replace('.ts', '').replace('.tsx', '')
        
        # Handle index.ts files (common TypeScript pattern)
        if module_path.endswith('.index'):
            module_path = module_path[:-6]
        
        # Determine subsystem
        subsystem = self.parser.determine_subsystem(file_path)
        
        # Build unified module information model
        module_info = {
            "name": module_path,
            "file_path": rel_path,
            "imports": imports,
            "classes": definitions.get("classes", {}),
            "interfaces": definitions.get("interfaces", {}),
            "functions": definitions.get("functions", {}),
            "module_docstring": docstrings.get("module"),
            "subsystem": subsystem
        }
        
        # Integrate docstrings with definitions
        self._integrate_docstrings(module_info, docstrings)
        
        return module_info
    
    def _integrate_docstrings(self, module_info: Dict[str, Any], docstrings: Dict[str, Any]) -> None:
        """Integrate docstrings with class, interface, and function definitions.
        
        This method enriches the class, interface, and function definitions with their
        corresponding docstrings from the docstrings dictionary.
        
        Args:
            module_info: Module information to enrich
            docstrings: Extracted docstrings
        """
        # Integrate class docstrings
        for class_name, class_info in module_info["classes"].items():
            if class_name in docstrings.get("classes", {}):
                class_doc = docstrings["classes"][class_name]
                class_info["docstring"] = class_doc.get("docstring")
                
                # Integrate method docstrings
                for method_name, method_info in class_info.get("methods", {}).items():
                    if method_name in class_doc.get("methods", {}):
                        method_info["docstring"] = class_doc["methods"][method_name].get("docstring")
        
        # Integrate interface docstrings
        for interface_name, interface_info in module_info["interfaces"].items():
            if interface_name in docstrings.get("interfaces", {}):
                interface_doc = docstrings["interfaces"][interface_name]
                interface_info["docstring"] = interface_doc.get("docstring")
                
                # Integrate method docstrings
                for method_name, method_info in interface_info.get("methods", {}).items():
                    if method_name in interface_doc.get("methods", {}):
                        method_info["docstring"] = interface_doc["methods"][method_name].get("docstring")
        
        # Integrate function docstrings
        for func_name, func_info in module_info["functions"].items():
            if func_name in docstrings.get("functions", {}):
                func_info["docstring"] = docstrings["functions"][func_name].get("docstring")
    
    def analyze_imports(self, file_path: Union[str, Path]) -> List[Dict[str, Any]]:
        """Analyze imports for a specific file.
        
        This convenience method extracts just the import information.
        
        Args:
            file_path: Path to the TypeScript file
            
        Returns:
            List of import dictionaries
        """
        return self.parser.extract_imports(file_path)
    
    def analyze_definitions(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """Analyze class, interface, and function definitions for a specific file.
        
        This convenience method extracts just the definition information.
        
        Args:
            file_path: Path to the TypeScript file
            
        Returns:
            Dict containing class, interface, and function definitions
        """
        return self.parser.extract_definitions(file_path)
    
    def analyze_docstrings(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """Analyze JSDoc comments for a specific file.
        
        This convenience method extracts just the docstring information.
        
        Args:
            file_path: Path to the TypeScript file
            
        Returns:
            Dict containing module, class, interface, and function docstrings
        """
        return self.parser.extract_docstrings(file_path)
```

## 3. Factory Method

A generic adapter factory method simplifies using the appropriate adapter for a given language.

```python
# core/utils/adapter_factory.py
from typing import Optional, Union
from pathlib import Path

from core.adapters.python_adapter import PythonAdapter
from core.adapters.typescript_adapter import TypeScriptAdapter

def get_language_adapter(language: str = None, file_path: Union[str, Path] = None, project_root: Union[str, Path] = None, subsystem_patterns: dict = None):
    """Get the appropriate language adapter.
    
    This factory method creates the appropriate adapter based on the specified language
    or infers it from the file extension if a file path is provided.
    
    Args:
        language: Language identifier ('python', 'typescript', or 'auto')
        file_path: File path to determine language from (if language='auto')
        project_root: Optional project root directory (for TypeScript tree-sitter files)
        subsystem_patterns: Optional dictionary mapping directory patterns to subsystem names
        
    Returns:
        Language adapter instance
        
    Raises:
        ValueError: If language can't be determined or is unsupported
    """
    # Auto-detect language if not specified or 'auto'
    if language == 'auto' or language is None:
        if file_path:
            # Determine from file extension
            file_path_str = str(file_path)
            if file_path_str.endswith('.py'):
                language = 'python'
            elif file_path_str.endswith(('.ts', '.tsx')):
                language = 'typescript'
            else:
                raise ValueError(f"Cannot determine language for {file_path}")
        else:
            # Default to Python if no information provided
            language = 'python'
    
    # Create and return the appropriate adapter
    if language.lower() == 'python':
        return PythonAdapter(subsystem_patterns)
    elif language.lower() in ('typescript', 'ts'):
        return TypeScriptAdapter(project_root, subsystem_patterns)
    else:
        raise ValueError(f"Unsupported language: {language}")
```

## 4. Testing the Adapters

### Python Adapter Test

```python
# tests/test_core/test_adapters.py
import unittest
from pathlib import Path
import tempfile
import os

from core.adapters.python_adapter import PythonAdapter
from core.utils.adapter_factory import get_language_adapter

class TestPythonAdapter(unittest.TestCase):
    def setUp(self):
        self.adapter = PythonAdapter()
        self.temp_dir = tempfile.TemporaryDirectory()
        
        # Create a simple Python file for testing
        self.test_file = Path(self.temp_dir.name) / "test_module.py"
        with open(self.test_file, 'w') as f:
            f.write('''"""Module docstring."""
import os
from pathlib import Path

class TestClass:
    """Class docstring."""
    
    def test_method(self, param1, param2="default"):
        """Method docstring."""
        return param1 + param2
        
def test_function():
    """Function docstring."""
    return True
''')
    
    def tearDown(self):
        self.temp_dir.cleanup()
    
    def test_find_source_files(self):
        # Test that the adapter finds Python files
        files = self.adapter.find_source_files(self.temp_dir.name)
        self.assertEqual(len(files), 1)
        self.assertTrue(str(self.test_file) in files)
    
    def test_extract_module_info(self):
        # Test that module info extraction works correctly
        module_info = self.adapter.extract_module_info(self.test_file)
        
        # Check module information
        self.assertEqual(module_info["module_docstring"], "Module docstring.")
        
        # Check import information
        self.assertEqual(len(module_info["imports"]), 2)
        self.assertEqual(module_info["imports"][0]["module"], "os")
        
        # Check class information
        self.assertIn("TestClass", module_info["classes"])
        self.assertEqual(module_info["classes"]["TestClass"]["docstring"], "Class docstring.")
        self.assertIn("test_method", module_info["classes"]["TestClass"]["methods"])
        
        # Check function information
        self.assertIn("test_function", module_info["functions"])
        self.assertEqual(module_info["functions"]["test_function"]["docstring"], "Function docstring.")
    
    def test_adapter_factory(self):
        # Test factory method with explicit language
        adapter = get_language_adapter('python')
        self.assertIsInstance(adapter, PythonAdapter)
        
        # Test factory method with auto-detection
        adapter = get_language_adapter(file_path=self.test_file)
        self.assertIsInstance(adapter, PythonAdapter)
```

### TypeScript Adapter Test

```python
# tests/test_core/test_typescript_adapter.py
import unittest
from pathlib import Path
import tempfile
import os

from core.adapters.typescript_adapter import TypeScriptAdapter
from core.utils.adapter_factory import get_language_adapter

class TestTypeScriptAdapter(unittest.TestCase):
    def setUp(self):
        # Find the Cline project root for testing
        # This assumes the test is run from within the Cline project
        project_root = Path(__file__).parent.parent.parent.parent
        self.adapter = TypeScriptAdapter(project_root=project_root)
        self.temp_dir = tempfile.TemporaryDirectory()
        
        # Create a simple TypeScript file for testing
        self.test_file = Path(self.temp_dir.name) / "test_module.ts"
        with open(self.test_file, 'w') as f:
            f.write('''/**
 * Module level JSDoc comment.
 */
import * as fs from 'fs';
import { join } from 'path';

/**
 * Interface docstring.
 */
interface TestInterface {
  property: string;
  method(): void;
}

/**
 * Class docstring.
 */
class TestClass implements TestInterface {
  property: string;
  
  /**
   * Method docstring.
   */
  method(): void {
    console.log('test');
  }
}

/**
 * Function docstring.
 */
function testFunction(param1: string, param2: number = 0): boolean {
  return true;
}
''')
    
    def tearDown(self):
        self.temp_dir.cleanup()
    
    def test_find_source_files(self):
        # Test that the adapter finds TypeScript files
        files = self.adapter.find_source_files(self.temp_dir.name)
        self.assertEqual(len(files), 1)
        self.assertTrue(str(self.test_file) in files)
    
    def test_extract_module_info(self):
        # Test that module info extraction works correctly
        module_info = self.adapter.extract_module_info(self.test_file)
        
        # Check module information
        self.assertIsNotNone(module_info["module_docstring"])
        self.assertIn("Module level JSDoc comment", module_info["module_docstring"])
        
        # Check import information
        self.assertEqual(len(module_info["imports"]), 2)
        self.assertEqual(module_info["imports"][0]["module"], "fs")
        self.assertEqual(module_info["imports"][1]["module"], "path")
        self.assertEqual(module_info["imports"][1]["name"], "join")
        
        # Check class information
        self.assertIn("TestClass", module_info["classes"])
        self.assertEqual(module_info["classes"]["TestClass"]["docstring"], "Class docstring.")
        self.assertIn("method", module_info["classes"]["TestClass"]["methods"])
        
        # Check interface information
        self.assertIn("TestInterface", module_info["interfaces"])
        self.assertEqual(module_info["interfaces"]["TestInterface"]["docstring"], "Interface docstring.")
        
        # Check function information
        self.assertIn("testFunction", module_info["functions"])
        self.assertEqual(module_info["functions"]["testFunction"]["docstring"], "Function docstring.")
    
    def test_adapter_factory(self):
        # Test factory method with explicit language
        adapter = get_language_adapter('typescript')
        self.assertIsInstance(adapter, TypeScriptAdapter)
        
        # Test factory method with auto-detection
        adapter = get_language_adapter(file_path=self.test_file)
        self.assertIsInstance(adapter, TypeScriptAdapter)
```

## 5. Extending with New Language Adapters

To add support for a new language (e.g., Swift), follow these steps:

1. **Create a Language-Specific Parser**:
   - Implement the `LanguageParser` interface for the new language
   - Place it in `core/parsers/[language]/`

2. **Create Language-Specific Visitors**:
   - Implement visitors for imports, contracts, and docstrings
   - Place them in `visitors/[language]/`

3. **Create a Language Adapter**:
   - Create a new adapter class that uses the parser and visitors
   - Implement the same interface as the existing adapters
   - Place it in `core/adapters/[language]_adapter.py`

4. **Update the Adapter Factory**:
   - Add a new case to `get_language_adapter()` function
   - Include extension detection in the auto-detection logic

Example skeleton for a new language adapter:

```python
# core/adapters/swift_adapter.py
from typing import List, Dict, Any, Union
import os
from pathlib import Path

from core.parsers.swift.swift_parser import SwiftParser

class SwiftAdapter:
    """Swift adapter implementation."""
    
    def __init__(self, subsystem_patterns=None):
        """Initialize the Swift adapter."""
        self.parser = SwiftParser(subsystem_patterns)
    
    def find_source_files(self, directory: Union[str, Path]) -> List[str]:
        """Find Swift files in directory."""
        return self.parser.find_source_files(directory)
    
    def extract_module_info(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """Extract comprehensive information about a Swift module."""
        # Implementation follows the same pattern as Python and TypeScript adapters
        # ...
        
    # Additional methods follow the same pattern
```

With this implementation pattern, each language adapter presents a consistent interface to the analysis modules while handling the language-specific parsing details internally.