# Factory and Output Manager Implementation (Version P)

This document provides detailed implementation specifications for the factory and output manager components of the Language-Agnostic Code Analysis Suite. These utilities handle parser creation and standardized output formatting.

## 1. Factory Implementation

The factory pattern is used to create appropriate parsers and adapters based on language type or file extension.

### 1.1 Parser Factory

```python
# core/utils/factory.py
from typing import Optional, Dict, Any, Union, Type
from pathlib import Path

from core.language_parser import LanguageParser
from core.parsers.python.ast_parser import PythonAstParser
from core.parsers.typescript.tree_sitter_parser import TypeScriptTreeSitterParser

def get_language_parser(language: str = None, file_path: Union[str, Path] = None, project_root: Union[str, Path] = None, subsystem_patterns: Dict[str, str] = None) -> LanguageParser:
    """Get the appropriate language parser based on language or file extension.
    
    Args:
        language: Language identifier ('python', 'typescript', or 'auto')
        file_path: File path to determine language from (if language='auto')
        project_root: Optional project root directory (for TypeScript tree-sitter files)
        subsystem_patterns: Optional dictionary mapping directory patterns to subsystem names
        
    Returns:
        Language parser instance
        
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
    
    # Create and return the appropriate parser
    if language.lower() == 'python':
        return PythonAstParser(subsystem_patterns)
    elif language.lower() in ('typescript', 'ts'):
        return TypeScriptTreeSitterParser(project_root, subsystem_patterns)
    else:
        raise ValueError(f"Unsupported language: {language}")
```

### 1.2 Adapter Factory

The adapter factory was already defined in the Adapter Implementations document. Referencing it here for completeness:

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

## 2. Output Manager Implementation

The output manager handles standardized output paths and formats for analysis results.

### 2.1 Standard Output Manager

```python
# core/utils/output_manager.py
import os
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, Optional, Union, List

class OutputManager:
    """Manages standardized output paths and formats.
    
    This class handles file paths, naming conventions, and output formatting
    to ensure consistency across all analysis tools and languages.
    """
    
    def __init__(self, base_dir: Optional[Union[str, Path]] = None):
        """Initialize with optional base output directory.
        
        Args:
            base_dir: Base directory for output files. If None, uses 'output' in 
                     the current script directory.
        """
        if base_dir:
            self.base_dir = Path(base_dir)
        else:
            # Default to output directory in the dev-support-scripts directory
            self.base_dir = Path(__file__).parent.parent.parent / "output"
    
    def get_output_path(self, analysis_type: str, component_name: Optional[str] = None, 
                        file_extension: str = 'json') -> Path:
        """Get standardized output path with timestamp.
        
        Args:
            analysis_type: Type of analysis (e.g., 'dependency_graph', 'api_contracts')
            component_name: Optional name of the component being analyzed
            file_extension: File extension (default: 'json')
            
        Returns:
            Path object for the output file
        """
        # Generate timestamp for filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Create output directory
        output_dir = self.base_dir / analysis_type
        os.makedirs(output_dir, exist_ok=True)
        
        # Generate filename
        if component_name:
            filename = f"{component_name}_{analysis_type}_{timestamp}.{file_extension}"
        else:
            filename = f"{analysis_type}_{timestamp}.{file_extension}"
        
        return output_dir / filename
    
    def write_json(self, data: Dict[str, Any], analysis_type: str, 
                  component_name: Optional[str] = None) -> str:
        """Write data to JSON file with standardized path.
        
        Args:
            data: Data to write to file
            analysis_type: Type of analysis (e.g., 'dependency_graph', 'api_contracts')
            component_name: Optional name of the component being analyzed
            
        Returns:
            Path to the output file as a string
        """
        output_path = self.get_output_path(analysis_type, component_name, 'json')
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
        
        return str(output_path)
    
    def write_text(self, text: str, analysis_type: str, 
                  component_name: Optional[str] = None) -> str:
        """Write text to file with standardized path.
        
        Args:
            text: Text data to write to file
            analysis_type: Type of analysis (e.g., 'dependency_graph', 'api_contracts')
            component_name: Optional name of the component being analyzed
            
        Returns:
            Path to the output file as a string
        """
        output_path = self.get_output_path(analysis_type, component_name, 'txt')
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(text)
        
        return str(output_path)
    
    def write_markdown(self, markdown: str, analysis_type: str, 
                      component_name: Optional[str] = None) -> str:
        """Write markdown to file with standardized path.
        
        Args:
            markdown: Markdown formatted text
            analysis_type: Type of analysis (e.g., 'dependency_graph', 'api_contracts')
            component_name: Optional name of the component being analyzed
            
        Returns:
            Path to the output file as a string
        """
        output_path = self.get_output_path(analysis_type, component_name, 'md')
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(markdown)
        
        return str(output_path)
    
    def write_multiple_files(self, data_dict: Dict[str, Any], analysis_type: str,
                            component_name: Optional[str] = None) -> List[str]:
        """Write multiple files from a dictionary.
        
        Each key-value pair in the dictionary becomes a separate file.
        
        Args:
            data_dict: Dictionary mapping filenames to content
            analysis_type: Type of analysis
            component_name: Optional name of the component being analyzed
            
        Returns:
            List of paths to the output files
        """
        output_paths = []
        
        # Create output directory
        output_dir = self.base_dir / analysis_type
        if component_name:
            output_dir = output_dir / component_name
        
        os.makedirs(output_dir, exist_ok=True)
        
        # Generate timestamp for filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Write each file
        for filename, content in data_dict.items():
            # Ensure filename has an extension
            if '.' not in filename:
                # Default to JSON for dictionary data, text for strings
                if isinstance(content, dict) or isinstance(content, list):
                    filename = f"{filename}.json"
                else:
                    filename = f"{filename}.txt"
            
            # Add timestamp to filename
            name_parts = filename.split('.')
            timestamped_filename = f"{name_parts[0]}_{timestamp}.{name_parts[1]}"
            file_path = output_dir / timestamped_filename
            
            # Write content based on type
            if isinstance(content, (dict, list)):
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump(content, f, indent=2)
            else:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(str(content))
            
            output_paths.append(str(file_path))
        
        return output_paths
```

### 2.2 Output Format Standardizer

```python
# core/utils/format_manager.py
from typing import Dict, Any, List, Optional, Union
import json
from datetime import datetime

class FormatManager:
    """Standardizes output formats across different analysis types and languages.
    
    This class ensures consistent formatting of analysis results regardless of
    source language or analysis type.
    """
    
    @staticmethod
    def format_dependency_graph(nodes: Dict[str, Any], edges: List[Dict[str, Any]], 
                              subsystems: Dict[str, List[str]], 
                              metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Format dependency graph data into a standardized structure.
        
        Args:
            nodes: Dictionary mapping module names to node attributes
            edges: List of dependency relationships
            subsystems: Dictionary mapping subsystem names to module lists
            metadata: Optional metadata about the analysis
            
        Returns:
            Standardized dependency graph dictionary
        """
        if metadata is None:
            metadata = {}
        
        # Add standard metadata fields
        metadata.update({
            "timestamp": datetime.now().isoformat(),
            "node_count": len(nodes),
            "edge_count": len(edges),
            "subsystem_count": len(subsystems)
        })
        
        return {
            "metadata": metadata,
            "nodes": nodes,
            "edges": edges,
            "subsystems": subsystems
        }
    
    @staticmethod
    def format_api_contracts(contracts: Dict[str, Any], metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Format API contract data into a standardized structure.
        
        Args:
            contracts: Dictionary of API contracts by component
            metadata: Optional metadata about the analysis
            
        Returns:
            Standardized API contract dictionary
        """
        if metadata is None:
            metadata = {}
        
        # Add standard metadata fields
        metadata.update({
            "timestamp": datetime.now().isoformat(),
            "contract_count": len(contracts)
        })
        
        return {
            "metadata": metadata,
            "contracts": contracts
        }
    
    @staticmethod
    def format_docstrings(docstrings: Dict[str, Any], metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Format docstring data into a standardized structure.
        
        Args:
            docstrings: Dictionary of docstrings by module
            metadata: Optional metadata about the analysis
            
        Returns:
            Standardized docstring dictionary
        """
        if metadata is None:
            metadata = {}
        
        # Add standard metadata fields
        metadata.update({
            "timestamp": datetime.now().isoformat(),
            "module_count": len(docstrings)
        })
        
        return {
            "metadata": metadata,
            "docstrings": docstrings
        }
    
    @staticmethod
    def format_change_impact(affected_modules: List[str], entry_points: List[str],
                           change_details: Dict[str, Any],
                           metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Format change impact data into a standardized structure.
        
        Args:
            affected_modules: List of modules affected by a change
            entry_points: List of API entry points affected
            change_details: Detailed information about the change impact
            metadata: Optional metadata about the analysis
            
        Returns:
            Standardized change impact dictionary
        """
        if metadata is None:
            metadata = {}
        
        # Add standard metadata fields
        metadata.update({
            "timestamp": datetime.now().isoformat(),
            "affected_module_count": len(affected_modules),
            "entry_point_count": len(entry_points)
        })
        
        return {
            "metadata": metadata,
            "affected_modules": affected_modules,
            "entry_points": entry_points,
            "change_details": change_details
        }
    
    @staticmethod
    def format_summary(stats: Dict[str, Any], highlights: List[str],
                     issues: List[Dict[str, Any]] = None,
                     metadata: Optional[Dict[str, Any]] = None) -> Dict[str, str]:
        """Format analysis summary as a human-readable markdown text.
        
        Args:
            stats: Key statistics from the analysis
            highlights: List of important findings
            issues: Optional list of identified issues
            metadata: Optional metadata about the analysis
            
        Returns:
            Dictionary with markdown-formatted summary keys
        """
        if metadata is None:
            metadata = {}
        if issues is None:
            issues = []
            
        # Add standard metadata
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        metadata["timestamp"] = timestamp
        
        # Create summary header
        summary = f"# Analysis Summary\n\n"
        summary += f"Generated: {timestamp}\n\n"
        
        # Add metadata section
        if metadata:
            summary += "## Metadata\n\n"
            for key, value in metadata.items():
                if key != "timestamp":  # Already included above
                    summary += f"- **{key}**: {value}\n"
            summary += "\n"
        
        # Add statistics section
        summary += "## Statistics\n\n"
        for key, value in stats.items():
            summary += f"- **{key}**: {value}\n"
        summary += "\n"
        
        # Add highlights section
        summary += "## Key Findings\n\n"
        for highlight in highlights:
            summary += f"- {highlight}\n"
        summary += "\n"
        
        # Add issues section if there are any
        if issues:
            summary += "## Issues\n\n"
            for issue in issues:
                summary += f"### {issue['title']}\n\n"
                summary += f"{issue['description']}\n\n"
                if 'recommendation' in issue:
                    summary += f"**Recommendation**: {issue['recommendation']}\n\n"
        
        return {
            "summary": summary,
            "metadata": json.dumps(metadata, indent=2),
            "stats": json.dumps(stats, indent=2),
            "highlights": "\n".join(highlights),
            "issues": json.dumps(issues, indent=2) if issues else ""
        }
```

## 3. Testing the Factory and Output Manager

### 3.1 Factory Tests

```python
# tests/test_core/test_factory.py
import unittest
from pathlib import Path
import tempfile
import os

from core.utils.factory import get_language_parser
from core.utils.adapter_factory import get_language_adapter
from core.parsers.python.ast_parser import PythonAstParser
from core.parsers.typescript.tree_sitter_parser import TypeScriptTreeSitterParser
from core.adapters.python_adapter import PythonAdapter
from core.adapters.typescript_adapter import TypeScriptAdapter

class TestFactory(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        
        # Create a simple Python file for testing
        self.python_file = Path(self.temp_dir.name) / "test_module.py"
        with open(self.python_file, 'w') as f:
            f.write('print("Hello, world!")')
        
        # Create a simple TypeScript file for testing
        self.typescript_file = Path(self.temp_dir.name) / "test_module.ts"
        with open(self.typescript_file, 'w') as f:
            f.write('console.log("Hello, world!");')
    
    def tearDown(self):
        self.temp_dir.cleanup()
    
    def test_get_language_parser(self):
        # Test with explicit language
        parser = get_language_parser('python')
        self.assertIsInstance(parser, PythonAstParser)
        
        parser = get_language_parser('typescript')
        self.assertIsInstance(parser, TypeScriptTreeSitterParser)
        
        # Test with file path
        parser = get_language_parser(file_path=self.python_file)
        self.assertIsInstance(parser, PythonAstParser)
        
        parser = get_language_parser(file_path=self.typescript_file)
        self.assertIsInstance(parser, TypeScriptTreeSitterParser)
        
        # Test auto detection
        parser = get_language_parser('auto', self.python_file)
        self.assertIsInstance(parser, PythonAstParser)
        
        parser = get_language_parser('auto', self.typescript_file)
        self.assertIsInstance(parser, TypeScriptTreeSitterParser)
        
        # Test with subsystem patterns
        subsystem_patterns = {'test': 'test_subsystem'}
        parser = get_language_parser('python', subsystem_patterns=subsystem_patterns)
        self.assertIsInstance(parser, PythonAstParser)
        
        # Test error case
        with self.assertRaises(ValueError):
            get_language_parser('unknown')
    
    def test_get_language_adapter(self):
        # Test with explicit language
        adapter = get_language_adapter('python')
        self.assertIsInstance(adapter, PythonAdapter)
        
        adapter = get_language_adapter('typescript')
        self.assertIsInstance(adapter, TypeScriptAdapter)
        
        # Test with file path
        adapter = get_language_adapter(file_path=self.python_file)
        self.assertIsInstance(adapter, PythonAdapter)
        
        adapter = get_language_adapter(file_path=self.typescript_file)
        self.assertIsInstance(adapter, TypeScriptAdapter)
        
        # Test auto detection
        adapter = get_language_adapter('auto', self.python_file)
        self.assertIsInstance(adapter, PythonAdapter)
        
        adapter = get_language_adapter('auto', self.typescript_file)
        self.assertIsInstance(adapter, TypeScriptAdapter)
        
        # Test with subsystem patterns
        subsystem_patterns = {'test': 'test_subsystem'}
        adapter = get_language_adapter('python', subsystem_patterns=subsystem_patterns)
        self.assertIsInstance(adapter, PythonAdapter)
        
        # Test error case
        with self.assertRaises(ValueError):
            get_language_adapter('unknown')
```

### 3.2 Output Manager Tests

```python
# tests/test_core/test_output_manager.py
import unittest
import tempfile
import os
import json
from pathlib import Path
from datetime import datetime

from core.utils.output_manager import OutputManager
from core.utils.format_manager import FormatManager

class TestOutputManager(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.output_manager = OutputManager(self.temp_dir.name)
    
    def tearDown(self):
        self.temp_dir.cleanup()
    
    def test_get_output_path(self):
        # Test basic path generation
        path = self.output_manager.get_output_path('test_analysis')
        
        # Check that path is in the right directory
        self.assertTrue(str(path).startswith(self.temp_dir.name))
        
        # Check that path has the right structure
        self.assertIn('test_analysis', str(path))
        
        # Check that path includes timestamp
        # Format: test_analysis_YYYYMMDD_HHMMSS.json
        filename = os.path.basename(path)
        self.assertTrue(filename.startswith('test_analysis_'))
        self.assertTrue(filename.endswith('.json'))
        
        # Check timestamp format by extracting from filename
        timestamp_str = filename.replace('test_analysis_', '').replace('.json', '')
        # Should be parseable as a date
        self.assertEqual(len(timestamp_str), 15)  # YYYYMMDD_HHMMSS = 15 chars
        
        # Test with component name
        path = self.output_manager.get_output_path('test_analysis', 'component')
        filename = os.path.basename(path)
        self.assertTrue(filename.startswith('component_test_analysis_'))
        
        # Test with different extension
        path = self.output_manager.get_output_path('test_analysis', file_extension='txt')
        self.assertTrue(str(path).endswith('.txt'))
    
    def test_write_json(self):
        # Test writing JSON data
        data = {'test': 'data', 'nested': {'value': 123}}
        path = self.output_manager.write_json(data, 'test_analysis')
        
        # Check that file exists
        self.assertTrue(os.path.exists(path))
        
        # Check that file contains the expected data
        with open(path, 'r') as f:
            loaded_data = json.load(f)
        
        self.assertEqual(loaded_data, data)
    
    def test_write_text(self):
        # Test writing text data
        text = 'This is a test.\nWith multiple lines.'
        path = self.output_manager.write_text(text, 'test_analysis')
        
        # Check that file exists
        self.assertTrue(os.path.exists(path))
        
        # Check that file contains the expected text
        with open(path, 'r') as f:
            loaded_text = f.read()
        
        self.assertEqual(loaded_text, text)
    
    def test_write_markdown(self):
        # Test writing markdown data
        markdown = '# Test Heading\n\nThis is a *formatted* text with **bold** parts.'
        path = self.output_manager.write_markdown(markdown, 'test_analysis')
        
        # Check that file exists
        self.assertTrue(os.path.exists(path))
        
        # Check that file contains the expected markdown
        with open(path, 'r') as f:
            loaded_markdown = f.read()
        
        self.assertEqual(loaded_markdown, markdown)

class TestFormatManager(unittest.TestCase):
    def test_format_dependency_graph(self):
        nodes = {'module1': {'metrics': {'centrality': 5}}}
        edges = [{'from': 'module1', 'to': 'module2'}]
        subsystems = {'subsystem1': ['module1', 'module2']}
        
        result = FormatManager.format_dependency_graph(nodes, edges, subsystems)
        
        # Check structure
        self.assertIn('metadata', result)
        self.assertIn('nodes', result)
        self.assertIn('edges', result)
        self.assertIn('subsystems', result)
        
        # Check that metadata contains standard fields
        self.assertIn('timestamp', result['metadata'])
        self.assertIn('node_count', result['metadata'])
        self.assertEqual(result['metadata']['node_count'], 1)
        
        # Check that data is preserved
        self.assertEqual(result['nodes'], nodes)
        self.assertEqual(result['edges'], edges)
        self.assertEqual(result['subsystems'], subsystems)
    
    def test_format_summary(self):
        stats = {'total_modules': 10, 'average_complexity': 2.5}
        highlights = ['Found 3 circular dependencies', 'High coupling detected']
        
        result = FormatManager.format_summary(stats, highlights)
        
        # Check that all section types are included
        self.assertIn('summary', result)
        self.assertIn('metadata', result)
        self.assertIn('stats', result)
        self.assertIn('highlights', result)
        
        # Check that summary contains all sections
        summary = result['summary']
        self.assertIn('# Analysis Summary', summary)
        self.assertIn('## Statistics', summary)
        self.assertIn('## Key Findings', summary)
        
        # Check that stats are included
        self.assertIn('total_modules: 10', summary)
        self.assertIn('average_complexity: 2.5', summary)
        
        # Check that highlights are included
        self.assertIn('Found 3 circular dependencies', summary)
        self.assertIn('High coupling detected', summary)
```

## 4. Extending with New Languages

### 4.1 Updating the Factory

When adding support for a new language, you need to update the factory methods to include the new language:

```python
# In core/utils/factory.py
def get_language_parser(language=None, file_path=None, project_root=None, subsystem_patterns=None):
    # ... existing code ...
    
    # Auto-detect language from file extension
    if language == 'auto' or language is None:
        if file_path:
            file_path_str = str(file_path)
            if file_path_str.endswith('.py'):
                language = 'python'
            elif file_path_str.endswith(('.ts', '.tsx')):
                language = 'typescript'
            elif file_path_str.endswith('.swift'):  # Add new language extensions
                language = 'swift'
            else:
                raise ValueError(f"Cannot determine language for {file_path}")
    
    # ... existing code ...
    
    # Create parser based on language
    if language.lower() == 'python':
        return PythonAstParser(subsystem_patterns)
    elif language.lower() in ('typescript', 'ts'):
        return TypeScriptTreeSitterParser(project_root, subsystem_patterns)
    elif language.lower() == 'swift':  # Add new language case
        return SwiftParser(subsystem_patterns)
    else:
        raise ValueError(f"Unsupported language: {language}")
```

### 4.2 Standardized Output Formats

The output manager ensures that analysis results are formatted consistently regardless of source language. When adding support for new languages, you don't need to modify the output manager as long as your language-specific parsers and adapters produce data in the expected format.

If the new language requires unique output formats, you can extend the `FormatManager` class with new formatting methods:

```python
# In core/utils/format_manager.py
@staticmethod
def format_swift_specific_output(swift_data, metadata=None):
    """Format Swift-specific analysis output."""
    if metadata is None:
        metadata = {}
    
    # Add standard metadata
    metadata.update({
        "timestamp": datetime.now().isoformat(),
        "swift_specific_count": len(swift_data)
    })
    
    return {
        "metadata": metadata,
        "swift_data": swift_data
    }
```

The factory and output manager components provide a flexible, extensible foundation for the Language-Agnostic Code Analysis Suite. By encapsulating the language-specific details behind common interfaces, they enable the analysis tools to work with multiple languages while maintaining consistent behavior and output formats.