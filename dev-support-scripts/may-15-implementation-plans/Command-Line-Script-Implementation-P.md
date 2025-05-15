# Command-Line Script and Analyzer Implementation (Version P)

This document provides implementation specifications for the analyzer modules and command-line scripts in the Language-Agnostic Code Analysis Suite.

## 1. Dependency Analyzer Command-Line Script

```python
# bin/analyze_dependencies.py
#!/usr/bin/env python3
import os
import sys
import argparse
from pathlib import Path

# Add the parent directory to the path
sys.path.insert(0, str(Path(__file__).parent.parent))

from analyzers.dependency_analyzer import DependencyAnalyzer
from core.utils.output_manager import OutputManager

def main():
    """Main entry point for dependency analysis."""
    parser = argparse.ArgumentParser(description="Generate dependency graph for code analysis")
    parser.add_argument("--src-dir", required=True, help="Source directory to analyze")
    parser.add_argument("--language", choices=["python", "typescript", "auto"], 
                       default="auto", help="Language to analyze")
    parser.add_argument("--output-dir", help="Output directory for analysis files")
    parser.add_argument("--component-name", help="Name of the component being analyzed")
    parser.add_argument("--project-root", help="Root directory of the project (for TypeScript)")
    
    args = parser.parse_args()
    
    # Create output manager
    output_manager = OutputManager(args.output_dir) if args.output_dir else OutputManager()
    
    # Create analyzer
    analyzer = DependencyAnalyzer(output_manager)
    
    # Run analysis
    print(f"Analyzing dependencies in {args.src_dir}...")
    results = analyzer.analyze_project(
        args.src_dir, 
        language=args.language,
        project_root=args.project_root
    )
    
    # Save results
    print("Saving analysis results...")
    output_files = analyzer.save_results(results, args.component_name)
    
    print("\nDependency analysis complete. Results saved to:")
    for output_type, file_path in output_files.items():
        print(f"- {output_type}: {file_path}")

if __name__ == "__main__":
    main()
```

## 2. Docstring Extractor Command-Line Script

```python
# bin/extract_docstrings.py
#!/usr/bin/env python3
import os
import sys
import argparse
from pathlib import Path

# Add the parent directory to the path
sys.path.insert(0, str(Path(__file__).parent.parent))

from analyzers.docstring_extractor import DocstringExtractor
from core.utils.output_manager import OutputManager

def main():
    """Main entry point for docstring extraction."""
    parser = argparse.ArgumentParser(description="Extract docstrings from source code")
    parser.add_argument("--src-dir", required=True, help="Source directory to analyze")
    parser.add_argument("--language", choices=["python", "typescript", "auto"], 
                       default="auto", help="Language to analyze")
    parser.add_argument("--output-dir", help="Output directory for extraction results")
    parser.add_argument("--component-name", help="Name of the component being analyzed")
    parser.add_argument("--project-root", help="Root directory of the project (for TypeScript)")
    
    args = parser.parse_args()
    
    # Create output manager
    output_manager = OutputManager(args.output_dir) if args.output_dir else OutputManager()
    
    # Create extractor
    extractor = DocstringExtractor(output_manager)
    
    # Run extraction
    print(f"Extracting docstrings from {args.src_dir}...")
    results = extractor.extract_docstrings(
        args.src_dir, 
        language=args.language,
        project_root=args.project_root
    )
    
    # Save results
    print("Saving extraction results...")
    output_files = extractor.save_results(results, args.component_name)
    
    print("\nDocstring extraction complete. Results saved to:")
    for output_type, file_path in output_files.items():
        print(f"- {output_type}: {file_path}")

if __name__ == "__main__":
    main()
```

## 3. API Contract Analyzer Command-Line Script

```python
# bin/analyze_api_contracts.py
#!/usr/bin/env python3
import os
import sys
import argparse
from pathlib import Path

# Add the parent directory to the path
sys.path.insert(0, str(Path(__file__).parent.parent))

from analyzers.api_contract_analyzer import APIContractAnalyzer
from core.utils.output_manager import OutputManager

def main():
    """Main entry point for API contract analysis."""
    parser = argparse.ArgumentParser(description="Analyze API contracts in source code")
    parser.add_argument("--src-dir", required=True, help="Source directory to analyze")
    parser.add_argument("--language", choices=["python", "typescript", "auto"], 
                       default="auto", help="Language to analyze")
    parser.add_argument("--output-dir", help="Output directory for analysis files")
    parser.add_argument("--component-name", help="Name of the component being analyzed")
    parser.add_argument("--project-root", help="Root directory of the project (for TypeScript)")
    
    args = parser.parse_args()
    
    # Create output manager
    output_manager = OutputManager(args.output_dir) if args.output_dir else OutputManager()
    
    # Create analyzer
    analyzer = APIContractAnalyzer(output_manager)
    
    # Run analysis
    print(f"Analyzing API contracts in {args.src_dir}...")
    results = analyzer.analyze_contracts(
        args.src_dir, 
        language=args.language,
        project_root=args.project_root
    )
    
    # Save results
    print("Saving analysis results...")
    output_files = analyzer.save_results(results, args.component_name)
    
    print("\nAPI contract analysis complete. Results saved to:")
    for output_type, file_path in output_files.items():
        print(f"- {output_type}: {file_path}")

if __name__ == "__main__":
    main()
```

## 4. Common Analyzer Structure

Each analyzer follows a similar pattern:

1. **Constructor**:
   - Takes an optional `OutputManager` 
   - Initializes internal data structures

2. **Main Analysis Method**:
   - Takes source directory, language, and other parameters
   - Delegates to the appropriate language adapter
   - Returns analysis results as structured data

3. **Helper Methods**:
   - Process and transform data
   - Calculate metrics and identify patterns
   - Generate human-readable summaries

4. **Output Methods**:
   - Save results in standardized formats
   - Generate multiple output files as needed

## 5. Implementation Plan for Additional Analyzers

### 5.1 Change Impact Analyzer

The change impact analyzer would identify the potential impact of changes to specific modules:

```python
# analyzers/change_impact_analyzer.py
# Key methods:
#  - analyze_change_impact(src_dir, target_modules, language='auto')
#  - _trace_dependents(module, depth)
#  - _identify_entry_points()
#  - _calculate_impact_severity()
#  - save_results(results, component_name)
```

### 5.2 Mock Path Analyzer

The mock path analyzer would identify mock usage patterns in tests:

```python
# analyzers/mock_path_analyzer.py
# Key methods:
#  - analyze_mock_paths(src_dir, test_dir, language='auto')
#  - _extract_mock_targets()
#  - _match_mocks_to_implementations()
#  - _validate_mock_paths()
#  - save_results(results, component_name)
```

### 5.3 Test Alignment Analyzer

The test alignment analyzer would analyze the relationship between tests and implementations:

```python
# analyzers/test_alignment_analyzer.py
# Key methods:
#  - analyze_test_alignment(src_dir, test_dir, language='auto')
#  - _map_tests_to_implementations()
#  - _calculate_coverage_metrics()
#  - _identify_untested_components()
#  - save_results(results, component_name)
```

## 6. Execution Flow

The common execution flow in all command-line scripts is:

1. Parse command-line arguments
2. Create an output manager
3. Create the appropriate analyzer
4. Run the analysis
5. Save the results
6. Print a summary of the output locations

This structure ensures consistency across all analysis tools while maintaining the flexibility to handle different languages through the adapter pattern.

## 7. Testing Strategy

Each command-line script should be tested with:

1. **Unit tests** for specific analyzer methods
2. **Integration tests** using sample projects for each language
3. **Command-line interface tests** to verify argument parsing

Example test for a command-line script:

```python
# tests/test_analyzers/test_dependency_analyzer_cli.py
import unittest
import tempfile
import subprocess
import os
from pathlib import Path

class TestDependencyAnalyzerCLI(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.script_path = Path(__file__).parent.parent.parent / "bin" / "analyze_dependencies.py"
        
        # Create a simple test project
        self.project_dir = Path(self.temp_dir.name) / "test_project"
        os.makedirs(self.project_dir)
        
        # Create a Python file
        with open(self.project_dir / "module1.py", "w") as f:
            f.write("import os\n\ndef test_function():\n    return True\n")
        
        with open(self.project_dir / "module2.py", "w") as f:
            f.write("from module1 import test_function\n\ndef another_function():\n    return test_function()\n")
    
    def tearDown(self):
        self.temp_dir.cleanup()
    
    def test_cli_basic_execution(self):
        """Test basic CLI execution with minimum arguments."""
        output_dir = Path(self.temp_dir.name) / "output"
        os.makedirs(output_dir)
        
        result = subprocess.run([
            "python", str(self.script_path),
            "--src-dir", str(self.project_dir),
            "--language", "python",
            "--output-dir", str(output_dir)
        ], capture_output=True, text=True)
        
        # Check command execution
        self.assertEqual(result.returncode, 0)
        
        # Check output messages
        self.assertIn("Analyzing dependencies", result.stdout)
        self.assertIn("Dependency analysis complete", result.stdout)
        
        # Check output files
        self.assertTrue(any(Path(output_dir).glob("dependency_graph/*.json")))
        self.assertTrue(any(Path(output_dir).glob("dependency_overview/*.txt")))
```

## 8. Example Docstring Extractor Implementation

This implementation extracts docstrings from Python and TypeScript code, demonstrating how the language-agnostic architecture works with different languages.

```python
# analyzers/docstring_extractor.py
from pathlib import Path
from typing import Dict, Any, List, Optional, Union
import json

from core.utils.adapter_factory import get_language_adapter
from core.utils.output_manager import OutputManager
from core.utils.format_manager import FormatManager

class DocstringExtractor:
    """Extract docstrings from source code in multiple languages."""
    
    def __init__(self, output_manager=None):
        """Initialize the docstring extractor.
        
        Args:
            output_manager: Optional output manager for saving results
        """
        self.output_manager = output_manager or OutputManager()
    
    def extract_docstrings(self, src_dir: Union[str, Path], language: str = 'auto',
                         project_root: Optional[Union[str, Path]] = None) -> Dict[str, Any]:
        """Extract docstrings from source files.
        
        Args:
            src_dir: Directory containing source files
            language: Language to analyze ('python', 'typescript', or 'auto')
            project_root: Optional project root directory (for TypeScript tree-sitter)
            
        Returns:
            Dictionary of extracted docstrings by module
        """
        # Get the appropriate language adapter
        adapter = get_language_adapter(language, project_root=project_root)
        
        # Find source files
        print(f"Finding {language} source files in {src_dir}...")
        source_files = adapter.find_source_files(src_dir)
        print(f"Found {len(source_files)} source files")
        
        # Extract docstrings from each file
        print("Extracting docstrings...")
        docstrings_by_module = {}
        
        for file_path in source_files:
            # Get module info with docstrings
            module_info = adapter.extract_module_info(file_path)
            
            # Store docstrings for this module
            if not module_info["name"]:
                continue  # Skip modules without names
                
            docstrings_by_module[module_info["name"]] = {
                "module": module_info.get("module_docstring"),
                "classes": {},
                "functions": {},
                "interfaces": {},  # For TypeScript
                "file_path": module_info["file_path"]
            }
            
            # Classes with methods
            for class_name, class_info in module_info.get("classes", {}).items():
                docstrings_by_module[module_info["name"]]["classes"][class_name] = {
                    "docstring": class_info.get("docstring"),
                    "methods": {}
                }
                
                # Methods
                for method_name, method_info in class_info.get("methods", {}).items():
                    docstrings_by_module[module_info["name"]]["classes"][class_name]["methods"][method_name] = {
                        "docstring": method_info.get("docstring"),
                        "args": [p.get("name") for p in method_info.get("parameters", [])]
                    }
            
            # Functions
            for func_name, func_info in module_info.get("functions", {}).items():
                docstrings_by_module[module_info["name"]]["functions"][func_name] = {
                    "docstring": func_info.get("docstring"),
                    "args": [p.get("name") for p in func_info.get("parameters", [])]
                }
                
            # Interfaces (TypeScript)
            for interface_name, interface_info in module_info.get("interfaces", {}).items():
                docstrings_by_module[module_info["name"]]["interfaces"][interface_name] = {
                    "docstring": interface_info.get("docstring"),
                    "methods": {}
                }
                
                # Interface methods
                for method_name, method_info in interface_info.get("methods", {}).items():
                    docstrings_by_module[module_info["name"]]["interfaces"][interface_name]["methods"][method_name] = {
                        "docstring": method_info.get("docstring"),
                        "args": [p.get("name") for p in method_info.get("parameters", [])]
                    }
        
        # Calculate statistics
        total_modules = len(docstrings_by_module)
        total_classes = sum(len(module_data["classes"]) for module_data in docstrings_by_module.values())
        total_functions = sum(len(module_data["functions"]) for module_data in docstrings_by_module.values())
        total_interfaces = sum(len(module_data.get("interfaces", {})) for module_data in docstrings_by_module.values())
        
        # Calculate docstring coverage
        modules_with_docs = sum(1 for module_data in docstrings_by_module.values() if module_data["module"])
        classes_with_docs = sum(sum(1 for class_data in module_data["classes"].values() if class_data["docstring"]) 
                              for module_data in docstrings_by_module.values())
        functions_with_docs = sum(sum(1 for func_data in module_data["functions"].values() if func_data["docstring"]) 
                                for module_data in docstrings_by_module.values())
        
        # Prepare results dictionary
        results = {
            "docstrings": docstrings_by_module,
            "stats": {
                "total_modules": total_modules,
                "total_classes": total_classes,
                "total_functions": total_functions,
                "total_interfaces": total_interfaces,
                "modules_with_docs": modules_with_docs,
                "classes_with_docs": classes_with_docs,
                "functions_with_docs": functions_with_docs,
                "module_coverage": modules_with_docs / total_modules if total_modules else 0,
                "class_coverage": classes_with_docs / total_classes if total_classes else 0,
                "function_coverage": functions_with_docs / total_functions if total_functions else 0
            }
        }
        
        return results
    
    def generate_summary(self, results: Dict[str, Any], component_name: Optional[str] = None) -> Dict[str, str]:
        """Generate a human-readable summary of the extraction results.
        
        Args:
            results: Docstring extraction results
            component_name: Optional component name for the summary
            
        Returns:
            Dictionary with markdown-formatted summary text
        """
        stats = {
            'Total Modules': results['stats']['total_modules'],
            'Total Classes': results['stats']['total_classes'],
            'Total Functions': results['stats']['total_functions'],
            'Total Interfaces': results['stats']['total_interfaces'],
            'Module Docstring Coverage': f"{results['stats']['module_coverage'] * 100:.1f}%",
            'Class Docstring Coverage': f"{results['stats']['class_coverage'] * 100:.1f}%",
            'Function Docstring Coverage': f"{results['stats']['function_coverage'] * 100:.1f}%"
        }
        
        # Identify modules with missing documentation
        highlights = []
        
        # Overall coverage assessment
        total_coverage = ((results['stats']['module_coverage'] + 
                          results['stats']['class_coverage'] + 
                          results['stats']['function_coverage']) / 3)
        
        if total_coverage >= 0.8:
            highlights.append(f"Good documentation coverage: {total_coverage * 100:.1f}%")
        elif total_coverage >= 0.5:
            highlights.append(f"Moderate documentation coverage: {total_coverage * 100:.1f}%")
        else:
            highlights.append(f"Poor documentation coverage: {total_coverage * 100:.1f}%")
        
        # Add more specific findings
        modules_missing_docs = []
        for module_name, module_data in results['docstrings'].items():
            if not module_data['module']:
                modules_missing_docs.append(module_name)
        
        if modules_missing_docs:
            if len(modules_missing_docs) <= 3:
                highlights.append(f"Modules missing documentation: {', '.join(modules_missing_docs)}")
            else:
                highlights.append(f"{len(modules_missing_docs)} modules are missing documentation")
        
        # Generate the summary
        metadata = {
            'component': component_name or 'Project',
            'analysis_type': 'Docstring Extraction'
        }
        
        return FormatManager.format_summary(stats, highlights, metadata=metadata)
    
    def save_results(self, results: Dict[str, Any], component_name: Optional[str] = None) -> Dict[str, str]:
        """Save extraction results to files.
        
        Args:
            results: Docstring extraction results
            component_name: Optional component name for the output files
            
        Returns:
            Dictionary mapping output types to file paths
        """
        output_paths = {}
        
        # Format results for output
        formatted_results = FormatManager.format_docstrings(
            results['docstrings'], 
            metadata={'stats': results['stats']}
        )
        
        # Save consolidated docstring data
        output_paths['docstrings'] = self.output_manager.write_json(
            formatted_results, 'docstrings', component_name
        )
        
        # Save individual module docstrings
        module_outputs = {}
        for module_name, module_data in results['docstrings'].items():
            safe_name = module_name.replace('.', '_').replace('/', '_')
            module_outputs[f"{safe_name}_docstrings"] = module_data
        
        # Save all module docstrings
        module_paths = self.output_manager.write_multiple_files(
            module_outputs, 'docstrings_by_module', component_name
        )
        output_paths['module_docstrings'] = module_paths
        
        # Generate and save summary
        summary = self.generate_summary(results, component_name)
        output_paths['summary'] = self.output_manager.write_markdown(
            summary['summary'], 'docstring_coverage', component_name
        )
        
        return output_paths
```

The implementation for other analyzers follows the same pattern, with adaptations specific to the analysis type. The key advantage of this architecture is that new languages can be added without changing the analyzer code, as long as the language adapter implements the required interface methods.
