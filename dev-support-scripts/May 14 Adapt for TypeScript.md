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

## Output File Conventions

All scripts will use consistent, predictable output paths and filenames:

1. **Hard-coded Base Directories**: All output goes to predetermined paths under `dev-support-scripts/output/`
2. **Timestamped Filenames**: All output files include ISO-format timestamps (YYYYMMDD_HHMMSS)
3. **Component Prefixes**: When analyzing specific components, filenames include the component name

Example directory structure:
```
dev-support-scripts/
├── output/
│   ├── dependency_graph/
│   │   └── dependency_graph_20250514_053000.json
│   ├── api_contracts/
│   │   └── core_api_contracts_20250514_053100.json
│   └── test_coverage/
│       └── test_coverage_summary_20250514_053200.json
```

## Script-Specific Adaptations

### Dependency Graph Generator

```python
def generate_dependency_graph(src_dir):
    # Generate timestamp for filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Hard-coded output directory
    output_dir = os.path.join(os.path.dirname(__file__), "output", "dependency_graph")
    os.makedirs(output_dir, exist_ok=True)
    
    # Fixed filename pattern with timestamp
    output_file = os.path.join(output_dir, f"dependency_graph_{timestamp}.json")
    
    # Extract imports using tree-sitter
    imports = []
    for file_path in find_typescript_files(src_dir):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            file_imports = extract_typescript_imports(content, parser, query)
            imports.extend(file_imports)
    
    # Process imports to build graph
    graph = build_graph(imports)
    
    # Write to timestamped output file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(graph, f, indent=2)
    
    print(f"Dependency graph generated: {output_file}")
    return output_file

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
```

### API Contract Analyzer

```python
def analyze_api_contracts(component_pattern):
    # Generate timestamp for filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Hard-coded output directory
    output_dir = os.path.join(os.path.dirname(__file__), "output", "api_contracts")
    os.makedirs(output_dir, exist_ok=True)
    
    # Component name used in filename
    component_slug = component_pattern.replace("/", "-").replace(".", "-")
    
    # Fixed filename pattern with timestamp
    output_file = os.path.join(output_dir, f"{component_slug}_api_contracts_{timestamp}.json")
    
    # Extract interfaces
    interfaces = []
    for file_path in find_typescript_files(component_pattern):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            file_interfaces = extract_typescript_interfaces(content, parser, query)
            interfaces.extend(file_interfaces)
    
    # Write to timestamped output file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(interfaces, f, indent=2)
    
    print(f"API contracts generated: {output_file}")
    return output_file

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

# Run the analysis - note no output path needed, it's hardcoded in the script
python dependency_graph_generator.py --src-dir ../src
```

### Generating API Contract Documentation

```bash
# No output directory needed - script uses timestamp and hard-coded paths
python api_contract_analyzer.py --component-pattern "src/core"
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