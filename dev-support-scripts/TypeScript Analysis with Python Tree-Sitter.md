TypeScript Analysis with Python Tree-Sitter

## 1. Create the Core Utility Module

File: `dev-support-scripts/ts_parser_utils.py`

```python
import os
import re
from pathlib import Path
from tree_sitter import Language, Parser

class TypeScriptParser:
    def __init__(self, project_root=None):
        """Initialize TypeScript parser with tree-sitter."""
        if not project_root:
            # Default to two directories up from this file
            self.project_root = Path(__file__).parent.parent
        else:
            self.project_root = Path(project_root)

        # Initialize parser
        self.parser = Parser()
        self.language = self._load_typescript_language()
        self.query = self._load_typescript_query()

    def _load_typescript_language(self):
        """Load TypeScript language from WASM file."""
        # Look for the WASM file in the expected location
        wasm_path = self.project_root / "src" / "services" / "tree-sitter" / "tree-sitter-typescript.wasm"

        if not wasm_path.exists():
            # Try alternative locations
            alt_paths = [
                self.project_root / "src" / "services" / "tree-sitter" / "typescript.wasm",
                self.project_root / "node_modules" / "web-tree-sitter" / "tree-sitter-typescript.wasm"
            ]

            for path in alt_paths:
                if path.exists():
                    wasm_path = path
                    break
            else:
                raise FileNotFoundError(f"Could not find TypeScript WASM file in {self.project_root}")

        # Build language from WASM file
        language = Language.build_library('typescript.so', [str(wasm_path)])
        self.parser.set_language(language)
        return language

    def _load_typescript_query(self):
        """Load TypeScript query from the TypeScript project."""
        # Path to the TypeScript query file
        query_path = self.project_root / "src" / "services" / "tree-sitter" / "queries" / "typescript.ts"

        if not query_path.exists():
            raise FileNotFoundError(f"Could not find TypeScript query file at {query_path}")

        # Extract query string from TypeScript file
        with open(query_path, 'r') as f:
            content = f.read()

        # Extract the query string from the TypeScript file
        # The query is typically defined as a template literal between backticks
        match = re.search(r'`([\s\S]*?)`', content)
        if not match:
            raise ValueError(f"Could not extract query string from {query_path}")

        query_string = match.group(1)
        return self.language.query(query_string)

    def find_typescript_files(self, directory):
        """Find all TypeScript files in a directory."""
        directory = Path(directory)
        typescript_files = []

        for path in directory.rglob('*'):
            if path.suffix in ['.ts', '.tsx'] and not path.name.startswith('.'):
                typescript_files.append(str(path))

        return typescript_files

    def parse_file(self, file_path):
        """Parse a TypeScript file and return the syntax tree."""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        return self.parser.parse(bytes(content, 'utf8'))

    def extract_imports(self, file_path):
        """Extract imports from a TypeScript file."""
        tree = self.parse_file(file_path)
        imports = []

        # Run the query on the parsed tree
        captures = self.query.captures(tree.root_node)

        # Process captures to extract imports
        for node, tag in captures:
            if tag == "import":
                # Extract import details
                imports.append({
                    'module': node.text.decode('utf8'),
                    'type': 'import'
                })

        return imports

    def extract_interfaces(self, file_path):
        """Extract interface definitions from a TypeScript file."""
        tree = self.parse_file(file_path)
        interfaces = []

        # Run the query on the parsed tree
        captures = self.query.captures(tree.root_node)

        # Process captures to extract interfaces
        for node, tag in captures:
            if tag == "definition.interface" or tag == "definition.type":
                # Extract interface details
                interfaces.append({
                    'name': node.child_by_field_name('name').text.decode('utf8') if node.child_by_field_name('name') else "anonymous",
                    'type': tag,
                    'text': node.text.decode('utf8')
                })

        return interfaces
```

## 2. Adapt Dependency Graph Generator

File: `dev-support-scripts/typescript_dependency_graph_generator.py`

```python
#!/usr/bin/env python3
"""
TypeScript Dependency Graph Generator

Analyzes TypeScript files to extract import relationships and build a
dependency graph, using the same output format as the Python version.
"""

import os
import json
from datetime import datetime
from pathlib import Path
from ts_parser_utils import TypeScriptParser

def generate_dependency_graph(src_dir):
    """Generate dependency graph for TypeScript files."""
    # Initialize TypeScript parser
    ts_parser = TypeScriptParser()

    # Generate timestamp for filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    # Hard-coded output directory
    output_dir = os.path.join(os.path.dirname(__file__), "output", "dependency_graph")
    os.makedirs(output_dir, exist_ok=True)

    # Fixed filename pattern with timestamp
    output_file = os.path.join(output_dir, f"dependency_graph_{timestamp}.json")

    # Find TypeScript files
    typescript_files = ts_parser.find_typescript_files(src_dir)

    # Extract imports
    imports = []
    for file_path in typescript_files:
        try:
            file_imports = ts_parser.extract_imports(file_path)
            # Add source file information
            for imp in file_imports:
                imp['source_file'] = file_path
            imports.extend(file_imports)
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    # Process imports to build graph (reuse existing graph building logic)
    graph = build_graph(imports)

    # Write to timestamped output file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(graph, f, indent=2)

    print(f"Dependency graph generated: {output_file}")
    return output_file

def build_graph(imports):
    """Build dependency graph from imports (reuse from existing script)."""
    # This would contain the same graph building logic as the Python version
    # For brevity, this is a placeholder
    graph = {
        "nodes": {},
        "edges": []
    }

    # Process imports to build the graph
    # ...

    return graph

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate TypeScript dependency graph")
    parser.add_argument("--src-dir", required=True, help="Source directory to analyze")

    args = parser.parse_args()
    generate_dependency_graph(args.src_dir)
```

## 3. Adapt API Contract Analyzer

File: `dev-support-scripts/typescript_api_contract_analyzer.py`

```python
#!/usr/bin/env python3
"""
TypeScript API Contract Analyzer

Extracts interface definitions from TypeScript files, using the same
output format as the Python version.
"""

import os
import json
from datetime import datetime
from pathlib import Path
from ts_parser_utils import TypeScriptParser

def analyze_api_contracts(component_pattern):
    """Analyze API contracts in TypeScript files."""
    # Initialize TypeScript parser
    ts_parser = TypeScriptParser()

    # Generate timestamp for filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    # Hard-coded output directory
    output_dir = os.path.join(os.path.dirname(__file__), "output", "api_contracts")
    os.makedirs(output_dir, exist_ok=True)

    # Component name used in filename
    component_slug = component_pattern.replace("/", "-").replace(".", "-")

    # Fixed filename pattern with timestamp
    output_file = os.path.join(output_dir, f"{component_slug}_api_contracts_{timestamp}.json")

    # Find TypeScript files matching the component pattern
    typescript_files = []
    for file_path in ts_parser.find_typescript_files(component_pattern):
        typescript_files.append(file_path)

    # Extract interfaces
    interfaces = []
    for file_path in typescript_files:
        try:
            file_interfaces = ts_parser.extract_interfaces(file_path)
            # Add source file information
            for interface in file_interfaces:
                interface['source_file'] = file_path
            interfaces.extend(file_interfaces)
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    # Write to timestamped output file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(interfaces, f, indent=2)

    print(f"API contracts generated: {output_file}")
    return output_file

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Extract TypeScript API contracts")
    parser.add_argument("--component-pattern", required=True, help="Component pattern to analyze")

    args = parser.parse_args()
    analyze_api_contracts(args.component_pattern)
```

## 4. Create a Simple Test Script

File: `dev-support-scripts/test_typescript_parser.py`

```python
#!/usr/bin/env python3
"""
Test script for TypeScript parser utilities.
"""

import os
from pathlib import Path
from ts_parser_utils import TypeScriptParser

def test_parser():
    """Test the TypeScript parser on a sample file."""
    # Initialize parser
    parser = TypeScriptParser()

    # Find a TypeScript file to test
    project_root = Path(__file__).parent.parent
    test_file = None

    # Look for a TypeScript file in src directory
    for path in (project_root / "src").rglob("*.ts"):
        if path.is_file() and not path.name.startswith("."):
            test_file = path
            break

    if not test_file:
        print("Could not find a TypeScript file to test")
        return

    print(f"Testing parser on {test_file}")

    # Test import extraction
    print("\nTesting import extraction:")
    imports = parser.extract_imports(test_file)
    for imp in imports[:5]:  # Show first 5 imports
        print(f"- {imp}")

    # Test interface extraction
    print("\nTesting interface extraction:")
    interfaces = parser.extract_interfaces(test_file)
    for interface in interfaces[:5]:  # Show first 5 interfaces
        print(f"- {interface['name']} ({interface['type']})")

if __name__ == "__main__":
    test_parser()
```

## 5. Update .vscodeignore

File: `.vscodeignore` (append to existing file)

```
# Python support scripts
dev-support-scripts/**/*.py
dev-support-scripts/venv/
dev-support-scripts/__pycache__/
dev-support-scripts/Output/
dev-support-scripts/requirements.txt
```

## 6. Create a README for the Python Scripts

File: `dev-support-scripts/README.md`

```markdown
# TypeScript Analysis Scripts

Python-based analysis scripts for TypeScript codebases.

## Setup

1. Create a virtual environment:
```

cd dev-support-scripts
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate

```

2. Install dependencies:
```

pip install -r requirements.txt

```

## Usage

### Test the TypeScript Parser

```

python test_typescript_parser.py

```

### Generate Dependency Graph

```

python typescript_dependency_graph_generator.py --src-dir ../src

```

### Analyze API Contracts

```

python typescript_api_contract_analyzer.py --component-pattern ../src/core

```

## Output

All output files are stored in the `output` directory with timestamped filenames.
```
