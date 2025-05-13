#!/usr/bin/env python3
"""
Extract docstrings from Python files in the project.

This script parses Python files to extract docstrings from modules, classes, and functions,
preserving the original directory structure in the output. This helps AI consumers
understand the purpose and functionality of code components.
"""

import os
import ast
import sys
from pathlib import Path
import json
from datetime import datetime

class DocstringExtractor(ast.NodeVisitor):
    """
    AST visitor that extracts docstrings from Python modules, classes, and functions.
    """
    
    def __init__(self):
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
            elif isinstance(node.body[0].value, ast.Str):  # For backward compatibility
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
            elif isinstance(node.body[0].value, ast.Str):  # For backward compatibility
                self.docstrings["classes"][node.name]["docstring"] = node.body[0].value.s.strip()
        
        # Visit class body
        self.generic_visit(node)
        self.current_class = prev_class
    
    def visit_FunctionDef(self, node):
        """Extract function or method docstring."""
        # Extract docstring
        docstring = None
        if node.body and isinstance(node.body[0], ast.Expr):
            if isinstance(node.body[0].value, ast.Constant) and isinstance(node.body[0].value.value, str):
                docstring = node.body[0].value.value.strip()
            elif isinstance(node.body[0].value, ast.Str):  # For backward compatibility
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

def extract_docstrings_from_file(file_path):
    """
    Extract docstrings from a Python file.
    
    Args:
        file_path (Path): Path to the Python file
        
    Returns:
        dict: Dictionary containing extracted docstrings
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            source = f.read()
        
        # Parse the source code
        tree = ast.parse(source)
        
        # Extract docstrings
        extractor = DocstringExtractor()
        extractor.visit(tree)
        
        return extractor.docstrings
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return {
            "module": None,
            "classes": {},
            "functions": {},
            "error": str(e)
        }

def process_directory(directory, output_base_dir, timestamp):
    """
    Process all Python files in a directory and its subdirectories.
    
    Args:
        directory (Path): Directory to process
        output_base_dir (Path): Base directory for output
        timestamp (str): Timestamp string to append to output filenames
    """
    directory = Path(directory)
    
    # Create corresponding output directory
    rel_dir = directory.name
    output_dir = output_base_dir / rel_dir
    os.makedirs(output_dir, exist_ok=True)
    
    # Process all Python files in this directory
    for item in directory.iterdir():
        if item.is_file() and item.suffix == '.py':
            # Extract docstrings
            docstrings = extract_docstrings_from_file(item)
            
            # Save to output file with timestamp
            output_file = output_dir / f"{item.stem}_docstrings_{timestamp}.json"
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(docstrings, f, indent=2)
            
            print(f"Processed {item} -> {output_file}")
        
        elif item.is_dir() and not item.name.startswith('.') and item.name != '__pycache__':
            # Process subdirectory, maintaining directory structure
            sub_output_dir = output_dir
            process_subdirectory(item, directory, sub_output_dir, timestamp)

def process_subdirectory(directory, parent_dir, output_parent_dir, timestamp):
    """
    Process a subdirectory, maintaining the directory structure in output.
    
    Args:
        directory (Path): Directory to process
        parent_dir (Path): Parent directory
        output_parent_dir (Path): Output parent directory
        timestamp (str): Timestamp string to append to output filenames
    """
    # Create corresponding output directory
    output_dir = output_parent_dir / directory.name
    os.makedirs(output_dir, exist_ok=True)
    
    # Process all Python files in this directory
    for item in directory.iterdir():
        if item.is_file() and item.suffix == '.py':
            # Extract docstrings
            docstrings = extract_docstrings_from_file(item)
            
            # Save to output file with timestamp
            output_file = output_dir / f"{item.stem}_docstrings_{timestamp}.json"
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(docstrings, f, indent=2)
            
            print(f"Processed {item} -> {output_file}")
        
        elif item.is_dir() and not item.name.startswith('.') and item.name != '__pycache__':
            # Recursively process subdirectory
            process_subdirectory(item, directory, output_dir, timestamp)

def main():
    """
    Main function to extract docstrings from specified directories.
    """
    # Base project directory (the repository root)
    base_dir = Path(__file__).parent.parent
    
    # Directories to process
    directories = [
        base_dir / "viewer",
        base_dir / "git_commit_viewer",
        base_dir / "tests"
    ]
    
    # Output directory
    output_dir = Path(__file__).parent / "Output"
    
    # Generate timestamp for filenames
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Process each directory
    for directory in directories:
        if not directory.exists():
            print(f"Directory not found: {directory}")
            continue
        
        print(f"Processing {directory}...")
        process_directory(directory, output_dir, timestamp)
        print(f"Completed processing {directory}")

if __name__ == "__main__":
    main()
