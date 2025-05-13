#!/usr/bin/env python3
"""
Dependency Graph Generator for AI-Consumable Code Insights

This script analyzes Python files to extract import relationships and build a
dependency graph. It presents these relationships in structured, concise formats
(JSON and text summaries) that provide architectural insights for AI consumers
without excessive context consumption.

Outputs are generated in the 'dev-support-scripts/Output/dependency_graph/' directory
and follow a '{descriptive_name}_{timestamp}.{extension}' naming convention
(e.g., 'dependency_graph_20230512_103000.json').

Key insights provided include:
- Module interdependencies and overall graph structure.
- Identification of critical/central components.
- Detection of circular dependencies.
- Mapping of subsystem boundaries and cross-subsystem interactions.
"""

import os
import sys
import ast
import json
import re
from pathlib import Path
from collections import defaultdict, Counter, deque
import importlib.util
from datetime import datetime

class DependencyGraph:
    """Represents a directed graph of module dependencies."""
    
    def __init__(self):
        self.nodes = {}  # Module name -> Node
        self.subsystems = defaultdict(list)  # Subsystem name -> list of modules
    
    def add_node(self, name, path, subsystem=None):
        """Add a node to the graph."""
        if name not in self.nodes:
            self.nodes[name] = {
                'path': path,
                'imports': [],
                'imported_by': [],
                'metrics': {
                    'centrality': 0,
                    'fanout': 0,
                    'dependency_depth': 0
                }
            }
            
            if subsystem:
                self.subsystems[subsystem].append(name)
    
    def add_edge(self, from_module, to_module, import_type='import'):
        """Add a directed edge representing an import."""
        if from_module in self.nodes and to_module in self.nodes:
            # Add the import relationship
            if to_module not in self.nodes[from_module]['imports']:
                self.nodes[from_module]['imports'].append({
                    'module': to_module,
                    'type': import_type
                })
                
            # Add the imported_by relationship
            if from_module not in self.nodes[to_module]['imported_by']:
                self.nodes[to_module]['imported_by'].append(from_module)
    
    def calculate_metrics(self):
        """Calculate dependency metrics for all nodes."""
        self._calculate_centrality()
        self._calculate_fanout()
        self._calculate_dependency_depth()
    
    def _calculate_centrality(self):
        """Calculate how central each node is in the dependency graph."""
        for module, data in self.nodes.items():
            # Simple centrality measure: number of modules that import this one
            data['metrics']['centrality'] = len(data['imported_by'])
    
    def _calculate_fanout(self):
        """Calculate the number of direct dependencies for each module."""
        for module, data in self.nodes.items():
            data['metrics']['fanout'] = len(data['imports'])
    
    def _calculate_dependency_depth(self):
        """Calculate the longest dependency chain for each module."""
        for start_module in self.nodes:
            # Use breadth-first search to find the longest path
            visited = {module: False for module in self.nodes}
            distance = {module: 0 for module in self.nodes}
            queue = deque([start_module])
            visited[start_module] = True
            
            while queue:
                module = queue.popleft()
                for import_info in self.nodes[module]['imports']:
                    imported_module = import_info['module']
                    if not visited.get(imported_module, True):  # Skip if not in graph or already visited
                        visited[imported_module] = True
                        distance[imported_module] = distance[module] + 1
                        queue.append(imported_module)
            
            self.nodes[start_module]['metrics']['dependency_depth'] = max(distance.values())
    
    def detect_circular_dependencies(self):
        """Detect circular dependencies in the graph."""
        circular_deps = []
        
        def check_cycle(module, path=None, visited=None):
            if path is None:
                path = []
            if visited is None:
                visited = set()
                
            visited.add(module)
            path.append(module)
            
            for import_info in self.nodes[module]['imports']:
                imported_module = import_info['module']
                if imported_module in path:
                    # Found a cycle
                    cycle_start = path.index(imported_module)
                    circular_deps.append(path[cycle_start:] + [imported_module])
                elif imported_module not in visited and imported_module in self.nodes:
                    check_cycle(imported_module, path.copy(), visited.copy())
        
        for module in self.nodes:
            check_cycle(module)
        
        # Remove duplicates and sort by length
        unique_cycles = []
        seen = set()
        for cycle in sorted(circular_deps, key=len):
            cycle_key = '→'.join(sorted(cycle))
            if cycle_key not in seen:
                seen.add(cycle_key)
                unique_cycles.append(cycle)
        
        return unique_cycles[:10]  # Limit to 10 cycles
    
    def get_critical_components(self, limit=20):
        """Get the most critical components based on centrality."""
        critical = sorted(
            [(module, data['metrics']['centrality']) for module, data in self.nodes.items()],
            key=lambda x: x[1],
            reverse=True
        )
        return critical[:limit]
    
    def get_subsystem_boundaries(self):
        """Get cross-subsystem dependencies."""
        boundaries = []
        
        # Create a map of module to subsystem
        module_to_subsystem = {}
        for subsystem, modules in self.subsystems.items():
            for module in modules:
                module_to_subsystem[module] = subsystem
        
        # Find cross-subsystem dependencies
        for module, data in self.nodes.items():
            module_subsystem = module_to_subsystem.get(module)
            if not module_subsystem:
                continue
                
            for import_info in data['imports']:
                imported_module = import_info['module']
                imported_subsystem = module_to_subsystem.get(imported_module)
                
                if imported_subsystem and imported_subsystem != module_subsystem:
                    boundaries.append({
                        'from_module': module,
                        'from_subsystem': module_subsystem,
                        'to_module': imported_module,
                        'to_subsystem': imported_subsystem,
                        'type': import_info['type']
                    })
        
        return boundaries
    
    def to_dict(self):
        """Convert the graph to a dictionary."""
        return {
            'nodes': self.nodes,
            'subsystems': {k: v for k, v in self.subsystems.items()},
            'metrics': {
                'total_modules': len(self.nodes),
                'total_subsystems': len(self.subsystems),
                'avg_dependencies': sum(len(data['imports']) for data in self.nodes.values()) / max(1, len(self.nodes)),
                'most_central_module': max(
                    self.nodes.items(),
                    key=lambda x: x[1]['metrics']['centrality'],
                    default=(None, {'metrics': {'centrality': 0}})
                )[0]
            }
        }

class ImportExtractor(ast.NodeVisitor):
    """Extract import statements from Python AST."""
    
    def __init__(self, module_name):
        self.module_name = module_name
        self.imports = []
    
    def visit_Import(self, node):
        """Visit Import nodes."""
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
        """Visit ImportFrom nodes."""
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
        """Check if a module is from the standard library."""
        if module_name.startswith(('django', 'viewer', 'git_commit_viewer')):
            return False
            
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

def extract_imports_from_file(file_path, module_name=None):
    """Extract imports from a Python file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if not module_name:
            # Try to determine module name from file path
            parts = str(file_path).replace('\\', '/').split('/')
            if 'viewer' in parts:
                idx = parts.index('viewer')
                module_name = '.'.join(['viewer'] + parts[idx+1:])
            elif 'git_commit_viewer' in parts:
                idx = parts.index('git_commit_viewer')
                module_name = '.'.join(['git_commit_viewer'] + parts[idx+1:])
            else:
                module_name = os.path.basename(file_path)
                
            module_name = module_name.replace('.py', '')
        
        tree = ast.parse(content)
        extractor = ImportExtractor(module_name)
        extractor.visit(tree)
        return extractor.imports
    except Exception as e:
        print(f"Error extracting imports from {file_path}: {e}")
        return []

def find_python_files(directory):
    """Find all Python files in a directory."""
    directory = Path(directory)
    python_files = []
    
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.py'):
                python_files.append(os.path.join(root, file))
    
    return python_files

def determine_subsystem(file_path):
    """Determine the subsystem a file belongs to."""
    if 'viewer/semantic/vector' in str(file_path):
        return 'vector'
    elif 'viewer/semantic/chunking' in str(file_path):
        return 'chunking'
    elif 'viewer/semantic/tagging' in str(file_path):
        return 'tagging'
    elif 'viewer/semantic/linguistic' in str(file_path):
        return 'linguistic'
    elif 'viewer/semantic' in str(file_path):
        return 'semantic_core'
    elif 'viewer/pgvector' in str(file_path):
        return 'pgvector'
    elif 'viewer/services' in str(file_path):
        return 'services'
    elif 'viewer/management' in str(file_path):
        return 'management'
    elif 'viewer' in str(file_path):
        return 'viewer_core'
    elif 'git_commit_viewer' in str(file_path):
        return 'project_core'
    else:
        return 'other'

def normalize_module_name(import_info, file_path):
    """Normalize module names for consistent representation."""
    module = import_info['module']
    
    # Handle relative imports
    if module.startswith('.'):
        # Try to resolve relative import based on file path
        parts = str(file_path).replace('\\', '/').split('/')
        if 'viewer' in parts:
            idx = parts.index('viewer')
            current_package = '.'.join(['viewer'] + parts[idx+1:-1])  # Exclude the file itself
        elif 'git_commit_viewer' in parts:
            idx = parts.index('git_commit_viewer')
            current_package = '.'.join(['git_commit_viewer'] + parts[idx+1:-1])
        else:
            return None  # Can't resolve relative import
            
        # Count leading dots
        dots = len(module) - len(module.lstrip('.'))
        if dots == 1:  # From same package
            base = current_package
        else:  # From parent package
            base_parts = current_package.split('.')
            base = '.'.join(base_parts[:-dots+1]) if len(base_parts) >= dots else ''
            
        # Append the actual module part if any
        name = module[dots:]
        if name:
            return f"{base}.{name}" if base else name
        return base
    
    return module

def build_dependency_graph(base_dir):
    """Build dependency graph from Python files."""
    base_dir = Path(base_dir)
    graph = DependencyGraph()
    
    # Identify source directories
    source_dirs = [
        base_dir / "viewer",
        base_dir / "git_commit_viewer"
    ]
    
    # Find Python files
    python_files = []
    for source_dir in source_dirs:
        if source_dir.exists():
            python_files.extend(find_python_files(source_dir))
    
    # First pass: Add all modules to the graph
    for file_path in python_files:
        rel_path = os.path.relpath(file_path, base_dir)
        module_path = str(rel_path).replace(os.sep, '.').replace('.py', '')
        
        # Skip __init__.py files in module path
        if '__init__' in module_path:
            module_path = module_path.replace('.__init__', '')
        
        subsystem = determine_subsystem(file_path)
        graph.add_node(module_path, str(rel_path), subsystem)
    
    # Second pass: Add dependencies
    for file_path in python_files:
        rel_path = os.path.relpath(file_path, base_dir)
        module_path = str(rel_path).replace(os.sep, '.').replace('.py', '')
        
        # Skip __init__.py files in module path
        if '__init__' in module_path:
            module_path = module_path.replace('.__init__', '')
        
        imports = extract_imports_from_file(file_path, module_path)
        
        for import_info in imports:
            normalized_import = normalize_module_name(import_info, file_path)
            if normalized_import and normalized_import in graph.nodes:
                graph.add_edge(module_path, normalized_import, import_info['type'])
    
    # Calculate metrics
    graph.calculate_metrics()
    
    return graph

def generate_dependency_summary(base_dir, output_dir):
    """Generate dependency graph summary for a project."""
    base_dir = Path(base_dir)
    output_dir = Path(output_dir)
    os.makedirs(output_dir, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Build dependency graph
    print("Building dependency graph...")
    graph = build_dependency_graph(base_dir)
    
    # Generate dependency overview text
    print("Generating dependency overview...")
    overview_filename = f"dependency_overview_{timestamp}.txt"
    with open(output_dir / overview_filename, 'w', encoding='utf-8') as f:
        critical_components = graph.get_critical_components(10)
        circular_deps = graph.detect_circular_dependencies()
        subsystem_boundaries = graph.get_subsystem_boundaries()
        
        f.write("Dependency Graph Overview\n")
        f.write("========================\n\n")
        
        # Basic stats
        f.write(f"Total modules: {len(graph.nodes)}\n")
        f.write(f"Total subsystems: {len(graph.subsystems)}\n")
        f.write(f"Average dependencies per module: {graph.to_dict()['metrics']['avg_dependencies']:.2f}\n\n")
        
        # Critical components
        f.write("Most Central Components:\n")
        for module, centrality in critical_components:
            f.write(f"  - {module} ({centrality} dependents)\n")
        f.write("\n")
        
        # Circular dependencies
        if circular_deps:
            f.write("Circular Dependencies:\n")
            for cycle in circular_deps:
                f.write(f"  - {' → '.join(cycle)}\n")
            f.write("\n")
        
        # Subsystem boundary count
        subsystem_crossings = Counter([(b['from_subsystem'], b['to_subsystem']) for b in subsystem_boundaries])
        f.write("Subsystem Boundaries:\n")
        for (from_subsys, to_subsys), count in subsystem_crossings.most_common(10):
            f.write(f"  - {from_subsys} → {to_subsys}: {count} dependencies\n")
    
    # Generate detailed dependency graph
    print("Generating detailed dependency information...")
    graph_filename = f"dependency_graph_{timestamp}.json"
    with open(output_dir / graph_filename, 'w', encoding='utf-8') as f:
        json.dump(graph.to_dict(), f, indent=2)
    
    # Generate subsystem boundaries
    print("Generating subsystem boundary information...")
    boundaries_filename = f"subsystem_boundaries_{timestamp}.json"
    with open(output_dir / boundaries_filename, 'w', encoding='utf-8') as f:
        json.dump(graph.get_subsystem_boundaries(), f, indent=2)
    
    # Generate critical component details
    print("Generating critical component information...")
    critical_filename = f"critical_components_{timestamp}.json"
    with open(output_dir / critical_filename, 'w', encoding='utf-8') as f:
        critical_info = {}
        for module, centrality in graph.get_critical_components(20):
            critical_info[module] = {
                'centrality': centrality,
                'fanout': graph.nodes[module]['metrics']['fanout'],
                'dependents': graph.nodes[module]['imported_by'],
                'dependencies': [imp['module'] for imp in graph.nodes[module]['imports']]
            }
        json.dump(critical_info, f, indent=2)
    
    print(f"Dependency analysis complete. Results saved to {output_dir}")
    # Return the main graph filename for consistency, though others are also created
    return output_dir / graph_filename

def main():
    """Main function to generate dependency analysis."""
    # Base project directory (should be the root of the git-commit-viewer project)
    base_dir = Path(__file__).resolve().parent.parent
    
    # Output directory
    output_dir = Path(__file__).resolve().parent / "Output" / "dependency_graph"
    
    # Generate dependency summary
    graph_file = generate_dependency_summary(base_dir, output_dir)
    print(f"Dependency graph generated: {graph_file}")

if __name__ == "__main__":
    main()
