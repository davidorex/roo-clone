The Python scripts in `dev-support-scripts/` and its subdirectories perform various development support tasks, primarily focused on code analysis and manipulation. Here's a summary of their functionality and output:

**1. `dev-support-scripts/api_contract_analyzer.py`**
   - **Functionality:** Analyzes Python modules to extract API contracts (class/method/function signatures, parameters, return types, docstrings, inheritance).
   - **Output Files:**
     - `{component_name}_interface_contracts.json`: Detailed machine-readable API contracts.
     - `{component_name}_interface_summary.txt`: Human-readable summary of key interfaces.
   - **Output Location:** `dev-support-scripts/Output/api_contracts/`
   - **Filenaming Heuristic:** `component_name` is derived from the target module/directory name.

**2. `dev-support-scripts/change_impact_analyzer.py`**
   - **Functionality:** Analyzes Python code to identify the impact of changes. Operates in baseline (full analysis) or incremental (single file change) mode. Tracks function signatures, calls, imports, and test relationships.
   - **Output Files (Baseline Mode):**
     - `modules_baseline.json`: Data on all analyzed modules.
     - `tests_baseline.json`: Data on test files and their targets.
     - `entry_points.json`: Identified entry points (views, URLs, management commands).
   - **Output Files (Incremental Mode):**
     - `impact_summary.txt`: AI-consumable summary of impacts.
     - `impact_details.json`: Detailed JSON report of changes and impacts.
     - `{target_filename}_actions.md`: Markdown file with actionable steps for developers.
   - **Output Location:** `dev-support-scripts/Output/impact_analysis/`
   - **Filenaming Heuristic:** Baseline files are fixed. Incremental report `_actions.md` is named after the analyzed file.

**3. `dev-support-scripts/dependency_graph_generator.py`**
   - **Functionality:** Builds a dependency graph based on import statements in Python files (focuses on `viewer` and `git_commit_viewer` directories). Calculates metrics like centrality, fanout, and detects circular dependencies.
   - **Output Files:**
     - `dependency_overview.txt`: Human-readable summary of the graph.
     - `dependency_graph.json`: Detailed JSON representation of the graph.
     - `subsystem_boundaries.json`: JSON listing cross-subsystem dependencies.
     - `critical_path_components.json`: JSON detailing critical components.
   - **Output Location:** `dev-support-scripts/Output/dependency_graph/`
   - **Filenaming Heuristic:** Output filenames are fixed.

**4. `dev-support-scripts/extract_docstrings.py`**
   - **Functionality:** Parses Python files (in `viewer`, `git_commit_viewer`, `tests`) to extract docstrings from modules, classes, and functions/methods, including argument names.
   - **Output Files:**
     - `{original_filename_stem}_docstrings_{timestamp}.json`: One JSON file per processed Python file, containing its docstrings.
   - **Output Location:** `dev-support-scripts/Output/` (mirrors the source directory structure, e.g., `Output/viewer/models_docstrings_TIMESTAMP.json`).
   - **Filenaming Heuristic:** Filenames include the original Python file's stem and a timestamp (`YYYYMMDD_HHMMSS`).

**5. `dev-support-scripts/generate_tree_view.py`**
   - **Functionality:** Creates a tree-like visualization of the file structure for specified project directories (`viewer`, `git_commit_viewer`, `tests`). Uses `rich` library for colored output.
   - **Output Files:**
     - `{directory_name}_tree_{timestamp}.txt`: One text file per visualized top-level directory.
   - **Output Location:** `dev-support-scripts/Output/`
   - **Filenaming Heuristic:** Filenames include the visualized directory's name and a timestamp (`YYYYMMDD_HHMMSS`).

**6. `dev-support-scripts/mock_access_path_analyzer.py`**
   - **Functionality:** Analyzes how functions are called and imported to help diagnose why mocks might fail. Tracks call paths, import patterns, and variable assignments to resolve actual call targets.
   - **Output Files:**
     - `{component_name}_call_data.json`: Raw JSON data of all calls, imports, and resolved paths.
     - `{component_name}_mock_paths.txt`: Human-readable report focusing on target modules, showing alternative access paths and mock strategy recommendations.
   - **Output Location:** `dev-support-scripts/Output/mock_paths/`
   - **Filenaming Heuristic:** `component_name` is derived from the target directory being analyzed.

**7. `dev-support-scripts/test_coverage_analyzer.py`**
   - **Functionality:** Analyzes test files to estimate test coverage. Maps test cases to source code components, extracts test scenarios from docstrings, and identifies untested components.
   - **Output Files:**
     - `test_coverage_summary.json`: Detailed JSON with coverage maps, scenarios, and untested components.
     - `test_coverage_overview.txt`: Human-readable summary with overall stats and top untested components.
   - **Output Location:** `dev-support-scripts/Output/test_coverage/`
   - **Filenaming Heuristic:** Output filenames are fixed.

**8. `dev-support-scripts/test_implementation_analyzer.py`**
   - **Functionality:** Compares test code (assertions, mocks) with implementation code (function signatures, default values, constants) to find potential misalignments.
   - **Output Files:**
     - `{component_name}_test_analysis.json`: Raw JSON analysis of test files.
     - `{component_name}_impl_analysis.json`: Raw JSON analysis of implementation files.
     - `{component_name}_alignment_report.txt`: Human-readable report on potential mismatches (e.g., outdated default value assertions, incorrect mock targets) and recommendations.
   - **Output Location:** `dev-support-scripts/Output/test_alignment/`
   - **Filenaming Heuristic:** `component_name` is derived from the implementation directory being analyzed.

**9. `dev-support-scripts/apply-multiple-diffs/macos_apply_multi_mutation_diffs.py`**
   - **Functionality:** Applies a sequence of code mutations (defined in a YAML spec file) to target files. It handles line number adjustments as changes are made and verifies that the `search_text` matches before applying a mutation. It includes features for safe file operations (especially on macOS using native APIs), backups, and optional verification command execution with rollback on failure.
   - **Output Files:**
     - A single JSON file (name specified by `--output-file` argument) summarizing the success/failure of applying mutations to each file, including any errors or verification failures.
     - Backup files are created in a separate backup directory (default: `./backup_{timestamp}/`).
   - **Output Location:** The main JSON output location is user-specified. Backups are in a local timestamped directory.
   - **Filenaming Heuristic:** The JSON output filename is user-defined. Backup files are named `{original_basename}.{unique_id}.bak`.


   Based on the analysis of the Python scripts in `dev-support-scripts/`:

**Scripts that use a filenaming heuristic appending a time-date stamp AND descriptive filenaming for their output files:**

*   `dev-support-scripts/extract_docstrings.py` (e.g., `{original_filename_stem}_docstrings_{timestamp}.json`)
*   `dev-support-scripts/generate_tree_view.py` (e.g., `{directory_name}_tree_{timestamp}.txt`)

**Scripts that DO NOT append a time-date stamp to their primary output filenames (they use fixed names, descriptive names without timestamps, or user-defined names):**

*   `dev-support-scripts/api_contract_analyzer.py`
*   `dev-support-scripts/change_impact_analyzer.py`
*   `dev-support-scripts/dependency_graph_generator.py`
*   `dev-support-scripts/mock_access_path_analyzer.py`
*   `dev-support-scripts/test_coverage_analyzer.py`
*   `dev-support-scripts/test_implementation_analyzer.py`
*   `dev-support-scripts/apply-multiple-diffs/macos_apply_multi_mutation_diffs.py` (Its primary output filename is user-defined. While it creates a timestamped *backup directory*, the backup *files* within use unique IDs rather than appending the directory's timestamp to their names.)