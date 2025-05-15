# Language-Specific Parser Implementation (Version P)

This document provides detailed implementation specifications for language-specific parsers in the Language-Agnostic Code Analysis Suite.

## 1. Python AST Parser

The Python parser leverages the built-in `ast` module to analyze Python code.

```python
# core/parsers/python/ast_parser.py
import ast
import os
from pathlib import Path
from typing import List, Dict, Any, Optional, Union

from core.language_parser import LanguageParser
from visitors.python.dependency_visitor import PythonDependencyVisitor
from visitors.python.contract_visitor import PythonContractVisitor
from visitors.python.docstring_visitor import PythonDocstringVisitor

class PythonAstParser(LanguageParser):
    """Python implementation of language parser using ast module."""
    
    def __init__(self, subsystem_patterns=None):
        """Initialize Python parser with optional subsystem patterns.
        
        Args:
            subsystem_patterns: Optional dictionary mapping directory patterns to subsystem names.
                               If None, will use directory structure to infer subsystems.
        """
        self.subsystem_patterns = subsystem_patterns or {}
    
    def find_source_files(self, directory: Union[str, Path]) -> List[str]:
        """Find Python files in directory.
        
        Implementation directly draws from examples/dependency_graph_generator.py find_python_files function.
        """
        directory = Path(directory)
        python_files = []
        
        for root, _, files in os.walk(directory):
            for file in files:
                if file.endswith('.py'):
                    python_files.append(os.path.join(root, file))
        
        return python_files
    
    def parse_file(self, file_path: Union[str, Path]) -> ast.Module:
        """Parse a Python file and return the AST."""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return ast.parse(content, filename=str(file_path))
    
    def extract_imports(self, file_path: Union[str, Path]) -> List[Dict[str, Any]]:
        """Extract imports from a Python file using the dependency visitor."""
        tree = self.parse_file(file_path)
        visitor = PythonDependencyVisitor(str(file_path))
        visitor.visit(tree)
        return visitor.get_imports()
    
    def extract_definitions(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """Extract definitions from a Python file using the contract visitor."""
        tree = self.parse_file(file_path)
        visitor = PythonContractVisitor(str(file_path))
        visitor.visit(tree)
        return visitor.get_definitions()
    
    def extract_docstrings(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """Extract docstrings from a Python file using the docstring visitor."""
        tree = self.parse_file(file_path)
        visitor = PythonDocstringVisitor()
        visitor.visit(tree)
        return visitor.get_docstrings()
    
    def determine_subsystem(self, file_path: Union[str, Path]) -> str:
        """Determine subsystem based on file path patterns.
        
        First tries matching against custom subsystem patterns if provided.
        Otherwise infers from directory structure.
        """
        file_path_str = str(file_path)
        
        # First check against custom patterns
        for pattern, subsystem in self.subsystem_patterns.items():
            if pattern in file_path_str:
                return subsystem
        
        # Otherwise infer from directory structure
        path_parts = Path(file_path).parts
        
        # If in a /tests/ or /test/ directory, this is part of the testing subsystem
        if 'tests' in path_parts or 'test' in path_parts:
            return 'tests'
            
        # Typical project subcomponents
        if any(component in path_parts for component in ['models', 'schemas', 'entities']):
            return 'models'
        elif any(component in path_parts for component in ['views', 'controllers', 'handlers']):
            return 'controllers'
        elif any(component in path_parts for component in ['services', 'managers']):
            return 'services'
        elif any(component in path_parts for component in ['utils', 'helpers', 'lib']):
            return 'utilities'
        
        # Check the first subdirectory as a fallback
        if len(path_parts) > 1:
            # Use the first meaningful directory (not . or src)
            for part in path_parts:
                if part not in ['.', 'src', 'app']:
                    return part.lower()
                    
        # Fallback
        return 'core'
```

## 2. TypeScript Tree-Sitter Parser

The TypeScript parser leverages the existing tree-sitter implementation from the Cline codebase.

```python
# core/parsers/typescript/tree_sitter_parser.py
import os
from pathlib import Path
from typing import List, Dict, Any, Optional, Union, Tuple
from tree_sitter import Language, Parser

from core.language_parser import LanguageParser
from visitors.typescript.dependency_visitor import TypeScriptDependencyVisitor
from visitors.typescript.contract_visitor import TypeScriptContractVisitor
from visitors.typescript.docstring_visitor import TypeScriptDocstringVisitor

class TypeScriptTreeSitterParser(LanguageParser):
    """TypeScript implementation of language parser using tree-sitter from Cline codebase."""
    
    def __init__(self, project_root=None, subsystem_patterns=None):
        """Initialize TypeScript parser with tree-sitter.
        
        Args:
            project_root: Root directory of the project (to locate Cline's tree-sitter files)
            subsystem_patterns: Optional dictionary mapping directory patterns to subsystem names.
                               If None, will use directory structure to infer subsystems.
        """
        if not project_root:
            # Default to the base directory (same as cline repo)
            self.project_root = Path(__file__).parent.parent.parent.parent.parent
        else:
            self.project_root = Path(project_root)
        
        # Initialize parser
        self.parser, self.language = self._load_typescript_language()
        
        # Initialize subsystem patterns
        self.subsystem_patterns = subsystem_patterns or {}
        
    def _load_typescript_language(self) -> Tuple[Parser, Language]:
        """Load TypeScript language from existing WASM file in Cline codebase.
        
        This method specifically looks for tree-sitter-typescript.wasm in the cline codebase
        locations, following the same approach used in Cline's own source code.
        
        Returns:
            A tuple of (parser, language)
        
        Raises:
            FileNotFoundError: If TypeScript WASM file cannot be found in Cline codebase
        """
        # Look for the WASM file in the locations used by Cline
        wasm_paths = [
            # Primary location in Cline services
            self.project_root / "src" / "services" / "tree-sitter" / "tree-sitter-typescript.wasm",
            # Alternative location
            self.project_root / "src" / "services" / "tree-sitter" / "typescript.wasm",
            # Node modules location
            self.project_root / "node_modules" / "web-tree-sitter" / "tree-sitter-typescript.wasm"
        ]
        
        found_wasm_path = None
        for path in wasm_paths:
            if path.exists():
                found_wasm_path = path
                break
        
        if not found_wasm_path:
            raise FileNotFoundError(
                f"Could not find TypeScript WASM file in Cline codebase at {self.project_root}. "
                f"Searched paths: {', '.join(str(p) for p in wasm_paths)}"
            )
            
        # Build language object using the found WASM file
        # This matches Cline's approach to loading tree-sitter grammars
        language = Language.build_library('typescript.so', [str(found_wasm_path)])
        parser = Parser()
        parser.set_language(language)
        return parser, language
    
    def find_source_files(self, directory: Union[str, Path]) -> List[str]:
        """Find TypeScript files in directory."""
        directory = Path(directory)
        typescript_files = []
        
        for path in directory.rglob('*'):
            if path.suffix in ['.ts', '.tsx'] and not path.name.startswith('.'):
                typescript_files.append(str(path))
        
        return typescript_files
    
    def parse_file(self, file_path: Union[str, Path]) -> Any:
        """Parse a TypeScript file and return the syntax tree.
        
        Uses the tree-sitter parser from Cline's codebase.
        """
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Use the parser initialized with Cline's tree-sitter grammar
        return self.parser.parse(bytes(content, 'utf8'))
    
    def extract_imports(self, file_path: Union[str, Path]) -> List[Dict[str, Any]]:
        """Extract imports from a TypeScript file using the dependency visitor."""
        tree = self.parse_file(file_path)
        visitor = TypeScriptDependencyVisitor(self.language)
        return visitor.extract_imports(tree)
    
    def extract_definitions(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """Extract definitions from a TypeScript file using the contract visitor."""
        tree = self.parse_file(file_path)
        visitor = TypeScriptContractVisitor(self.language)
        return visitor.extract_definitions(tree)
    
    def extract_docstrings(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """Extract JSDoc comments from a TypeScript file using the docstring visitor."""
        tree = self.parse_file(file_path)
        visitor = TypeScriptDocstringVisitor(self.language)
        return visitor.extract_docstrings(tree)
    
    def determine_subsystem(self, file_path: Union[str, Path]) -> str:
        """Determine subsystem based on file path patterns.
        
        First tries matching against custom subsystem patterns if provided.
        Otherwise infers from directory structure using TypeScript conventions.
        """
        file_path_str = str(file_path)
        
        # First check against custom patterns
        for pattern, subsystem in self.subsystem_patterns.items():
            if pattern in file_path_str:
                return subsystem
        
        # Otherwise infer from directory structure using TypeScript conventions
        path_parts = Path(file_path).parts
        
        # TypeScript/JavaScript specific directories 
        if any(part in path_parts for part in ['components', 'pages']):
            return 'ui'
        elif 'hooks' in path_parts:
            return 'hooks'
        elif 'contexts' in path_parts:
            return 'contexts'
        elif 'redux' in path_parts or 'store' in path_parts:
            return 'state'
            
        # General components (shared with Python)
        if any(component in path_parts for component in ['models', 'types', 'interfaces']):
            return 'models'
        elif any(component in path_parts for component in ['services', 'api']):
            return 'services'
        elif any(component in path_parts for component in ['utils', 'helpers', 'lib']):
            return 'utilities'
        elif 'tests' in path_parts or 'test' in path_parts or '__tests__' in path_parts:
            return 'tests'
            
        # Check the first subdirectory as a fallback
        if len(path_parts) > 1:
            # Use the first meaningful directory (not . or src)
            for part in path_parts:
                if part not in ['.', 'src', 'app']:
                    return part.lower()
                    
        # Fallback
        return 'core'
```

## 3. Implementation Considerations

### Leveraging Cline's Tree-Sitter Implementation

1. **Reusing WASM Grammar Files**:
   - The TypeScript parser is designed to reuse the existing tree-sitter grammar files from the Cline codebase
   - This ensures consistency with Cline's parsing approach while avoiding duplication
   - The implementation searches for the WASM file in several standard locations based on Cline's structure

2. **Tree-Sitter Query Integration**:
   - Tree-sitter queries should follow the format already used in Cline
   - Examine existing TypeScript parsing in Cline to identify common patterns for queries
   - Reuse query schemas where possible to maintain consistency

3. **Error Handling**:
   - Detailed error messages are provided if the WASM file is not found
   - Multiple paths are searched to maximize compatibility with different Cline code structures
   - Errors include specific guidance on how to resolve issues

### Extending to Other Languages

To add support for additional languages, follow these steps:

1. **Create a new language-specific parser package**:
   ```
   core/parsers/[language]/
   ├── __init__.py
   └── [language]_parser.py  # e.g., swift_parser.py
   ```

2. **Implement the LanguageParser interface**:
   - Follow the same pattern as the Python and TypeScript implementations
   - Ensure all abstract methods are implemented

3. **Create language-specific visitors**:
   ```
   visitors/[language]/
   ├── __init__.py
   ├── dependency_visitor.py
   ├── contract_visitor.py
   └── docstring_visitor.py
   ```

4. **Create a language adapter**:
   ```
   core/adapters/[language]_adapter.py
   ```

5. **Update the factory to recognize the new language**:
   ```python
   # In core/utils/factory.py
   def get_language_adapter(language=None, file_path=None, project_root=None):
       # Add new language case
       elif language == '[language]':
           return NewLanguageAdapter(project_root)
   ```

## Testing the Parser Implementations

### Python Parser Testing

```python
# tests/test_parsers/test_python_parser.py
import unittest
from pathlib import Path
import tempfile
import os

from core.parsers.python.ast_parser import PythonAstParser

class TestPythonAstParser(unittest.TestCase):
    def setUp(self):
        self.parser = PythonAstParser()
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
        # Test that the parser finds Python files
        files = self.parser.find_source_files(self.temp_dir.name)
        self.assertEqual(len(files), 1)
        self.assertTrue(str(self.test_file) in files)
    
    def test_parse_file(self):
        # Test that the parser can parse a file
        ast = self.parser.parse_file(self.test_file)
        self.assertIsNotNone(ast)
    
    def test_extract_imports(self):
        # Test that imports are extracted correctly
        imports = self.parser.extract_imports(self.test_file)
        self.assertEqual(len(imports), 2)
        self.assertEqual(imports[0]['module'], 'os')
        self.assertEqual(imports[1]['module'], 'pathlib')
        self.assertEqual(imports[1]['name'], 'Path')
    
    def test_extract_definitions(self):
        # Test that definitions are extracted correctly
        defs = self.parser.extract_definitions(self.test_file)
        self.assertIn('classes', defs)
        self.assertIn('functions', defs)
        self.assertIn('TestClass', defs['classes'])
        self.assertIn('test_function', defs['functions'])
    
    def test_extract_docstrings(self):
        # Test that docstrings are extracted correctly
        docs = self.parser.extract_docstrings(self.test_file)
        self.assertEqual(docs['module'], 'Module docstring.')
        self.assertEqual(docs['classes']['TestClass']['docstring'], 'Class docstring.')
        self.assertEqual(docs['functions']['test_function']['docstring'], 'Function docstring.')
```

### TypeScript Parser Testing

```python
# tests/test_parsers/test_typescript_parser.py
import unittest
from pathlib import Path
import tempfile
import os

from core.parsers.typescript.tree_sitter_parser import TypeScriptTreeSitterParser

class TestTypeScriptParser(unittest.TestCase):
    def setUp(self):
        # Find the Cline project root for testing
        # This assumes the test is run from within the Cline project
        project_root = Path(__file__).parent.parent.parent.parent
        self.parser = TypeScriptTreeSitterParser(project_root=project_root)
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
        # Test that the parser finds TypeScript files
        files = self.parser.find_source_files(self.temp_dir.name)
        self.assertEqual(len(files), 1)
        self.assertTrue(str(self.test_file) in files)
    
    def test_parse_file(self):
        # Test that the parser can parse a file
        tree = self.parser.parse_file(self.test_file)
        self.assertIsNotNone(tree)
    
    def test_extract_imports(self):
        # Test that imports are extracted correctly
        imports = self.parser.extract_imports(self.test_file)
        self.assertEqual(len(imports), 2)
        self.assertEqual(imports[0]['module'], 'fs')
        self.assertEqual(imports[1]['module'], 'path')
        self.assertEqual(imports[1]['name'], 'join')
    
    def test_extract_definitions(self):
        # Test that definitions are extracted correctly
        defs = self.parser.extract_definitions(self.test_file)
        self.assertIn('classes', defs)
        self.assertIn('interfaces', defs)
        self.assertIn('functions', defs)
        self.assertIn('TestClass', defs['classes'])
        self.assertIn('TestInterface', defs['interfaces'])
        self.assertIn('testFunction', defs['functions'])
    
    def test_extract_docstrings(self):
        # Test that docstrings are extracted correctly
        docs = self.parser.extract_docstrings(self.test_file)
        self.assertIsNotNone(docs['module'])
        self.assertIn('Module level JSDoc comment', docs['module'])
        self.assertIn('TestClass', docs['classes'])
        self.assertIn('TestInterface', docs['interfaces'])
        self.assertIn('testFunction', docs['functions'])