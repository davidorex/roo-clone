Dev-support-script suite with comprehensive per-file documentation:

1. **Conflict Detection Script**

    - Creates working branches from main and my-main
    - Runs `git merge --no-commit --no-ff -X patience` to identify conflicts
    - Outputs JSON with full conflict information including:
        - File paths
        - Conflict markers with line numbers
        - Surrounding context lines

2. **Database Query Script**

    - For each conflicting file:
        - Captures all diffs with complete context
        - Queries related files modified in the same commits

3. **Analysis Generation Script**

    - Creates one detailed markdown file per conflicting file using a template
    - Includes complete sections:
        - File purpose and role in codebase
        - Full code differences with syntax highlighting
        - Line-by-line conflict analysis
        - Complete feature implementation details
        - Detailed merge strategy with specific code examples

4. **Merge Planning Script**
    - Generates individual merge plan per file with:
        - Step-by-step resolution instructions
        - Specific code snippets to keep from each branch
        - Exact commands for resolving each conflict
        - References to dependent files and their merge plans

Each file would have its own complete documentation with all information needed for merge decisions without requiring inference or condensation.
