# Core Module Implementation (Version P)

This document provides detailed implementation specifications for the core modules of the Language-Agnostic Code Analysis Suite.

## 1. Abstract Language Parser Interface (`core/language_parser.py`)

This abstract base class defines the interface that all language-specific parsers must implement, providing a consistent API for analyzing different programming languages.

```python
# core/language_parser.py
from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional, Union
from pathlib import Path

class LanguageParser(ABC):
    """Abstract base class for language-specific parsers.
    
    This interface must be implemented by all language parsers to ensure
    consistent behavior across different programming languages.
    """
    
    @abstractmethod
    def find_source_files(self, directory: Union[str, Path]) -> List[str]:
        """Find source files of the appropriate language in directory.
        
        Args:
            directory: The directory to search for source files
            
        Returns:
            List of file paths (as strings) for the source files found
        """
        pass
    
    @abstractmethod
    def parse_file(self, file_path: Union[str, Path]) -> Any:
        """Parse a file and return its syntax tree representation.
        
        Args:
            file_path: Path to the file to parse
            
        Returns:
            The parsed syntax tree in a language-specific format
            (e.g., ast.Module for Python, tree-sitter Tree for TypeScript)
        """
        pass
    
    @abstractmethod
    def extract_imports(self, file_path: Union[str, Path]) -> List[Dict[str, Any]]:
        """Extract imports from a file.
        
        Args:
            file_path: Path to the file to analyze
            
        Returns:
            A list of dictionaries with at least:
                - 'module': str - The imported module name
                - 'type': str - The type of import ('import' or 'from')
                - 'name': Optional[str] - The imported name for 'from' imports
                - 'alias': Optional[str] - Any alias assigned to the import
        """
        pass
    
    @abstractmethod
    def extract_definitions(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """Extract definitions from a file.
        
        Args:
            file_path: Path to the file to analyze
            
        Returns:
            A dictionary with at least:
                - 'classes': Dict[str, Dict] - Class definitions
                - 'functions': Dict[str, Dict] - Function definitions
                - Language-specific entries (e.g., 'interfaces' for TypeScript)
        """
        pass
    
    @abstractmethod
    def extract_docstrings(self, file_path: Union[str, Path]) -> Dict[str, Any]:
        """Extract documentation from a file.
        
        Args:
            file_path: Path to the file to analyze
            
        Returns:
            A dictionary with at least:
                - 'module': Optional[str] - Module-level docstring
                - 'classes': Dict[str, Dict] - Class docstrings
                - 'functions': Dict[str, Dict] - Function docstrings
                - Language-specific entries (e.g., 'interfaces' for TypeScript)
        """
        pass
    
    @abstractmethod
    def determine_subsystem(self, file_path: Union[str, Path]) -> str:
        """Determine which subsystem a file belongs to based on path patterns.
        
        Args:
            file_path: Path to the file to analyze
            
        Returns:
            A string identifying the subsystem (e.g., 'models', 'controllers', etc.)
        """
        pass
```

## 2. Common Data Models (`core/data_models.py`)

These data models provide language-agnostic representations of code structures, allowing the analyzer modules to work with a consistent view of the code regardless of the source language.

```python
# core/data_models.py
from typing import Dict, List, Any, Optional, Set, Union
from dataclasses import dataclass, field
from pathlib import Path

@dataclass
class Import:
    """Represents an import statement."""
    module: str
    type: str  # 'import' or 'from'
    name: Optional[str] = None  # For 'from' imports
    alias: Optional[str] = None
    
@dataclass
class Parameter:
    """Represents a function parameter."""
    name: str
    type_annotation: Optional[str] = None
    default_value: Optional[Any] = None
    is_required: bool = True
    
@dataclass
class FunctionSignature:
    """Represents a function signature."""
    name: str
    parameters: List[Parameter] = field(default_factory=list)
    return_type: Optional[str] = None
    docstring: Optional[str] = None
    is_public: bool = True
    decorators: List[str] = field(default_factory=list)
    
@dataclass
class ClassDefinition:
    """Represents a class definition."""
    name: str
    methods: Dict[str, FunctionSignature] = field(default_factory=dict)
    base_classes: List[str] = field(default_factory=list)
    docstring: Optional[str] = None
    decorators: List[str] = field(default_factory=list)
    
@dataclass
class InterfaceDefinition:
    """Represents a TypeScript interface definition."""
    name: str
    properties: Dict[str, str] = field(default_factory=dict)
    methods: Dict[str, FunctionSignature] = field(default_factory=dict)
    extends: List[str] = field(default_factory=list)
    docstring: Optional[str] = None
    
@dataclass
class ModuleInfo:
    """Represents a module with its dependencies and definitions."""
    name: str
    file_path: str
    imports: List[Import] = field(default_factory=list)
    functions: Dict[str, FunctionSignature] = field(default_factory=dict)
    classes: Dict[str, ClassDefinition] = field(default_factory=dict)
    interfaces: Dict[str, InterfaceDefinition] = field(default_factory=dict)
    docstring: Optional[str] = None
    subsystem: Optional[str] = None

@dataclass
class DependencyRelation:
    """Represents a dependency relationship between modules."""
    from_module: str
    to_module: str
    import_type: str  # 'import' or 'from'
    imported_names: List[str] = field(default_factory=list)
    
@dataclass
class DependencyGraph:
    """Represents a directed graph of module dependencies."""
    nodes: Dict[str, Dict[str, Any]] = field(default_factory=dict)
    edges: List[DependencyRelation] = field(default_factory=list)
    subsystems: Dict[str, List[str]] = field(default_factory=dict)
```

## 3. Base Visitor Interfaces

These classes define the abstract visitor patterns that specific language visitors will implement.

### 3.1 Base Visitor (`core/visitors/base_visitor.py`)

```python
# core/visitors/base_visitor.py
from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional

class BaseVisitor(ABC):
    """Base class for all visitors."""
    
    @abstractmethod
    def visit(self, node: Any) -> Any:
        """Visit a node in the syntax tree."""
        pass
```

### 3.2 Dependency Visitor (`core/visitors/dependency_visitor.py`)

```python
# core/visitors/dependency_visitor.py
from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from .base_visitor import BaseVisitor

class DependencyVisitor(BaseVisitor, ABC):
    """Abstract base class for import extraction visitors."""
    
    @abstractmethod
    def get_imports(self) -> List[Dict[str, Any]]:
        """Get extracted imports.
        
        Returns:
            A list of dictionaries containing import information
        """
        pass
```

### 3.3 Contract Visitor (`core/visitors/contract_visitor.py`)

```python
# core/visitors/contract_visitor.py
from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from .base_visitor import BaseVisitor

class ContractVisitor(BaseVisitor, ABC):
    """Abstract base class for API contract extraction visitors."""
    
    @abstractmethod
    def get_definitions(self) -> Dict[str, Any]:
        """Get extracted definitions.
        
        Returns:
            A dictionary of class and function definitions
        """
        pass
```

### 3.4 Docstring Visitor (`core/visitors/docstring_visitor.py`)

```python
# core/visitors/docstring_visitor.py
from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from .base_visitor import BaseVisitor

class DocstringVisitor(BaseVisitor, ABC):
    """Abstract base class for docstring extraction visitors."""
    
    @abstractmethod
    def get_docstrings(self) -> Dict[str, Any]:
        """Get extracted docstrings.
        
        Returns:
            A dictionary of docstrings organized by scope (module, class, function)
        """
        pass
```

## Implementation Guidelines

1. **Separation of Concerns**:
   - Keep the abstract interfaces in the `core` module
   - Place language-specific implementations in their respective modules
   - Ensure that data models are fully language-agnostic

2. **Type Annotations**:
   - Use proper type hints throughout to ensure type safety
   - Leverage Python's typing module for clear interface definitions

3. **Documentation**:
   - Every class, method, and function should have comprehensive docstrings
   - Include examples where appropriate
   - Document parameters, return values, and exceptions

4. **Error Handling**:
   - Define clear error cases and appropriate exceptions
   - Implement graceful fallbacks when possible
   - Log errors with context information

5. **Extension Points**:
   - Design interfaces with extensibility in mind
   - Ensure new languages can be added without modifying existing code
   - Use abstract base classes to enforce interface contracts

## Implementation Sequence

1. Start by implementing the `LanguageParser` abstract base class
2. Create the data models to represent code structures
3. Implement the base visitor interfaces
4. Test the core interfaces before moving on to specific implementations

This approach ensures that the foundation is solid before building language-specific parsers and analyzers on top of it.