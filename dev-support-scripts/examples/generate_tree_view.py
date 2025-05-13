#!/usr/bin/env python3
"""
Generate a tree-view visualization of the project structure.

This script creates a hierarchical representation of the project's file structure,
which helps AI consumers understand the organization of the codebase.
"""

import os
import sys
from pathlib import Path
from rich.tree import Tree
from rich.console import Console
from datetime import datetime  # Added datetime import

def build_directory_tree(directory, tree, exclude_dirs=None, exclude_patterns=None):
    """
    Recursively build a tree representation of the directory structure.
    
    Args:
        directory (Path): The directory to visualize
        tree (Tree): The rich Tree object to add nodes to
        exclude_dirs (list): Directories to exclude from the tree
        exclude_patterns (list): File/directory patterns to exclude
        
    Returns:
        Tree: The populated tree object
    """
    if exclude_dirs is None:
        exclude_dirs = ['.git', '__pycache__', 'venv', 'env', '.venv', '.env', 'node_modules']
    
    if exclude_patterns is None:
        exclude_patterns = ['.pyc', '.pyo', '.pyd', '.DS_Store']
    
    directory = Path(directory)
    
    try:
        # Sort paths to ensure consistent output
        paths = sorted(directory.iterdir())
        
        for path in paths:
            # Skip excluded directories and patterns
            if path.name in exclude_dirs:
                continue
                
            if any(pattern in path.name for pattern in exclude_patterns):
                continue
            
            if path.is_dir():
                # Create a branch for directories
                branch = tree.add(f"[bold blue]{path.name}/[/bold blue]")
                build_directory_tree(path, branch, exclude_dirs, exclude_patterns)
            else:
                # Get last modified timestamp
                try:
                    mtime = path.stat().st_mtime
                    last_modified_date = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d')
                    date_str = f" ({last_modified_date})"
                except Exception: # Handle potential errors like file not found during stat
                    date_str = "" # Or some error indicator

                # Add a leaf for files with appropriate styling based on extension
                if path.suffix == '.py':
                    tree.add(f"[green]{path.name}[/green]{date_str}")
                elif path.suffix in ['.md', '.txt']:
                    tree.add(f"[yellow]{path.name}[/yellow]{date_str}")
                elif path.suffix in ['.json', '.yaml', '.yml']:
                    tree.add(f"[magenta]{path.name}[/magenta]{date_str}")
                else:
                    tree.add(f"{path.name}{date_str}")
    except PermissionError:
        tree.add("[red]Permission denied[/red]")
    
    return tree

def save_tree_to_file(tree, output_path):
    """
    Save the tree visualization to a file.
    
    Args:
        tree (Tree): The rich Tree object to save
        output_path (str): Path where the tree should be saved
    """
    console = Console(file=open(output_path, 'w'))
    console.print(tree)
    console.file.close()
    print(f"Tree view saved to {output_path}")

def main():
    """
    Main function to generate tree views for specified directories.
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
    
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Get current timestamp for filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Process each directory
    for directory in directories:
        if not directory.exists():
            print(f"Directory not found: {directory}")
            continue
            
        # Create tree for this directory
        tree = Tree(f"[bold]{directory.name}[/bold]")
        build_directory_tree(directory, tree)
        
        # Save to output file with timestamp
        output_path = output_dir / f"{directory.name}_tree_{timestamp}.txt"
        save_tree_to_file(tree, output_path)

if __name__ == "__main__":
    main()
