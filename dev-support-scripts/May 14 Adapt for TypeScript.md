# Adapting Python Analysis Scripts for TypeScript Codebases

## Overview

This document outlines a simple, elegant approach for using Python-based analysis scripts with TypeScript codebases, specifically within the Cline project. By leveraging the existing tree-sitter implementation and maintaining a clean separation of concerns, we achieve a system that combines the strengths of both ecosystems without complicating the VSIX build process.

## Design Principles

1. **Keep It Simple** - Use existing infrastructure rather than creating new abstractions
2. **Clean Separation** - Ensure Python scripts stay outside the VSIX package
3. **Shared Parsing** - Leverage tree-sitter with consistent queries across languages
4. **Isolated Dependencies** - Manage Python dependencies without affecting core TypeScript project

## Implementation Details

### Core Mechanism: Tree-Sitter Integration

The key insight is that we can use the same tree-sitter grammar files and queries from both TypeScript and Python:

```python
# Python-based TypeScript parser using the same WASM files
from tree_sitter import Language, Parser
import os

# Find the tree-sitter WASM file in the TypeScript project
TS_WASM_PATH = os.path.join(os.path.dirname(__file__), 
                            "../src/services/tree-sitter/tree-sitter-typescript.wasm")

# Load and use the same language definition
parser = Parser()
language = Language.build_library('typescript.so', [TS_WASM_PATH])
parser.set_language(language)

# Port the exact same query strings from TS to Python
typescript_query = """
(function_signature
  name: (identifier) @name.definition.function) @definition.function

(method_signature
  name: (property_identifier) @name.definition.method) @definition.method

# ... rest of the query copied from src/services/tree-sitter/queries/typescript.ts
"""

query = language.query(typescript_query)
```

### Project Structure

```
cline/
├── src/                           # TypeScript project source
│   └── services/tree-sitter/      # Existing TS tree-sitter implementation
│       ├── *.wasm                 # Shared WASM grammar files
│       └── queries/*.ts           # Query strings to be ported to Python
│
└── dev-support-scripts/           # Python analysis scripts (outside VSIX)
    ├── venv/                      # Python virtual environment
    ├── requirements.txt           # Python dependencies
    ├── examples/                  # Reference implementations
    ├── dependency_graph_generator.py     # Adapted TypeScript-aware script
    ├── api_contract_analyzer.py          # Adapted TypeScript-aware script  
    └── ...
```

### .vscodeignore Additions

To ensure Python scripts don't affect the VSIX build:

```
# Python support scripts
dev-support-scripts/**/*.py
dev-support-scripts/venv/
dev-support-scripts/__pycache__/
dev-support-scripts/Output/
dev-support-scripts/requirements.txt
```

## Script-Specific Adaptations

### Dependency Graph Generator

```python
def extract_typescript_imports(file_content, parser, query):
    """Extract imports from TypeScript files using tree-sitter."""
    tree = parser.parse(bytes(file_content, "utf8"))
    captures = query.captures(tree.root_node)
    
    imports = []
    for capture in captures:
        if capture[1] == "import":
            # Extract import details similar to how it's done in the TS implementation
            # ...
    
    return imports

# Main function would then process these imports to build the dependency graph
```

### API Contract Analyzer

```python
def extract_typescript_interfaces(file_content, parser, query):
    """Extract interface definitions from TypeScript files."""
    tree = parser.parse(bytes(file_content, "utf8"))
    captures = query.captures(tree.root_node)
    
    interfaces = []
    for capture in captures:
        if capture[1] == "definition.interface" or capture[1] == "definition.type":
            # Extract interface details
            # ...
    
    return interfaces
```

## Usage Examples

### Running a Dependency Analysis

```bash
# Activate the Python environment
cd dev-support-scripts

# Run the analysis on the TypeScript codebase
python dependency_graph_generator.py --src-dir ../src --output-dir ./Output/dependency_graph
```

### Generating API Contract Documentation

```bash
python api_contract_analyzer.py --component-pattern "src/core" --output-dir ./Output/api_contracts
```

## Benefits of This Approach

1. **Maintains Build Integrity** - Python scripts remain external to VSIX without adding build complexity
2. **Leverages Existing Work** - Reuses the tree-sitter implementation already in the codebase
3. **Script Portability** - Python scripts can be used on any TypeScript project with minimal adaptation
4. **Development Flexibility** - Scripts can be enhanced without touching the core TypeScript codebase

## Future Considerations

- Create a Python utility module to standardize tree-sitter initialization and query sharing
- Build script wrappers that automatically locate WASM files and handle project-specific configurations
- Add npm scripts to simplify running Python tools from package.json