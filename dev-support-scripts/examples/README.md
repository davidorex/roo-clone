# Developer Support & Code Analysis Scripts

This directory contains scripts for code analysis, documentation generation, change impact assessment, and development utilities, many of which produce AI-consumable outputs.

## General Output Structure

Most scripts generate their outputs within subdirectories of `dev-support-scripts/Output/`. The typical structure is:

`dev-support-scripts/Output/{script_specific_subdirectory}/`

For example:
- `dependency_graph_generator.py` outputs to `dev-support-scripts/Output/dependency_graph/`
- `api_contract_analyzer.py` outputs to `dev-support-scripts/Output/api_contracts/`

Specific filenaming conventions are detailed under each script.

**Note on Filenaming Heuristics:** The long-term intention is to update all scripts to adopt a consistent output filenaming heuristic where appropriate: `{descriptive_name}_{timestamp}.{extension}` (e.g., `viewer_dependencies_20231027_143055.json`). Currently, some scripts use fixed names or component-derived names without timestamps.

## Scripts

---

### 1. `generate_tree_view.py`
Creates a hierarchical tree visualization of specified project directories.
**AI Utility:** Helps understand the high-level organization of the codebase.

**Features:**
- Color-coded file types.
- Excludes irrelevant directories (e.g., `.git`, `__pycache__`).
**Outputs:**
- **Files:** Text files, one per visualized top-level directory.
- **Location:** `dev-support-scripts/Output/`
- **Filenaming:** `{directory_name}_tree_{timestamp}.txt` (e.g., `viewer_tree_20231027_143055.txt`). The `{timestamp}` is `YYYYMMDD_HHMMSS`.

**Usage:**
```bash
python dev-support-scripts/generate_tree_view.py
```

---

### 2. `extract_docstrings.py`
Extracts docstrings from Python modules, classes, and functions.
**AI Utility:** Provides semantic context (purpose, usage) for code components in a structured JSON format.

**Features:**
- Uses Python's AST module.
- Extracts module, class, and function/method docstrings, including argument names.
- Preserves source directory structure in the output.
**Outputs:**
- **Files:** JSON files, one per processed Python file.
- **Location:** `dev-support-scripts/Output/` (mirrors source structure, e.g., `Output/viewer/models_docstrings_20231027_143055.json`).
- **Filenaming:** `{original_filename_stem}_docstrings_{timestamp}.json`. The `{timestamp}` is `YYYYMMDD_HHMMSS`.

**Usage:**
```bash
python dev-support-scripts/extract_docstrings.py
```

---

### 3. `test_coverage_analyzer.py`
Analyzes test files to estimate test coverage and extract test scenarios.
**AI Utility:** Helps identify untested code areas and understand what existing tests verify.

**Features:**
- Maps test files to source components.
- Extracts test scenarios from docstrings.
- Identifies untested components.
**Outputs:**
- **Files:**
    - `test_coverage_summary.json`: Detailed structured data on coverage and scenarios.
    - `test_coverage_overview.txt`: Concise text summary with key statistics.
- **Location:** `dev-support-scripts/Output/test_coverage/`
- **Filenaming:** Fixed names as listed above. (Future: May adopt timestamped naming).

**Usage:**
```bash
python dev-support-scripts/test_coverage_analyzer.py
```

---

### 4. `dependency_graph_generator.py`
Analyzes import relationships to build a dependency graph, revealing architectural insights.
**AI Utility:** Provides a structured map of module interdependencies, crucial for understanding architecture and change propagation.

**Features:**
- Identifies module dependencies, subsystems, critical components, and circular dependencies.
- Calculates dependency metrics.
**Outputs:**
- **Files:**
    - `dependency_overview.txt`: High-level text summary.
    - `dependency_graph.json`: Complete dependency data in JSON.
    - `subsystem_boundaries.json`: JSON listing cross-subsystem dependencies.
    - `critical_path_components.json`: JSON detailing critical components.
- **Location:** `dev-support-scripts/Output/dependency_graph/`
- **Filenaming:** Fixed names as listed above. (Future: May adopt timestamped naming for main graph/overview).

**Usage:**
```bash
python dev-support-scripts/dependency_graph_generator.py
```

---

### 5. `change_impact_analyzer.py`
Analyzes code to predict the impact of changes, identifying affected components and necessary tests.
**AI Utility:** Critical for safe code modification, providing structured data on potential impacts and actionable steps. The `impact_summary.txt` is specifically designed for AI consumption.

**Features:**
- Baseline and incremental analysis modes.
- Tracks function signature changes, dependencies, and entry points.
**Outputs (Baseline Mode):**
- **Files:** `modules_baseline.json`, `tests_baseline.json`, `entry_points.json`.
- **Location:** `dev-support-scripts/Output/impact_analysis/` (configurable via `--output`).
- **Filenaming:** Fixed names.
**Outputs (Incremental Mode):**
- **Files:** `impact_summary.txt`, `impact_details.json`, `{target_filename}_actions.md`.
- **Location:** `dev-support-scripts/Output/impact_analysis/` (configurable via `--output`).
- **Filenaming:** `impact_summary.txt` and `impact_details.json` are fixed. `{target_filename}_actions.md` is named after the analyzed file (e.g., `views_actions.md`). (Future: Summary/details may adopt timestamped naming).

**Usage:**
```bash
# Baseline mode (run first, adjust --base-dir to project root if script is run from elsewhere)
python dev-support-scripts/change_impact_analyzer.py --all --base-dir . --output dev-support-scripts/Output/impact_analysis

# Incremental mode (analyze a specific file relative to --base-dir)
python dev-support-scripts/change_impact_analyzer.py --file viewer/models.py --base-dir . --output dev-support-scripts/Output/impact_analysis
```

---

### 6. `api_contract_analyzer.py`
Extracts precise API interface contracts from modules.
**AI Utility:** Provides machine-readable API definitions (signatures, parameters, types, defaults), enabling an AI to correctly interact with code and generate compatible calls.

**Features:**
- AST-based extraction of method/function signatures.
- Captures parameter details, docstrings, and inheritance.
**Outputs:**
- **Files:**
    - `{component_name}_interface_contracts.json`: Complete API details in JSON.
    - `{component_name}_interface_summary.txt`: Human-readable summary.
- **Location:** `dev-support-scripts/Output/api_contracts/` (configurable via `--output-dir`).
- **Filenaming:** `{component_name}` is derived from the `module_prefix` or the target directory name. (Future: May adopt timestamped naming).

**Usage:**
```bash
# Example: Analyze the 'viewer/services' directory
python dev-support-scripts/api_contract_analyzer.py viewer/services --module-prefix viewer.services --output-dir dev-support-scripts/Output/api_contracts
```

---

### 7. `mock_access_path_analyzer.py`
Analyzes function access paths to diagnose mock interception failures.
**AI Utility:** Helps understand complex call chains and why mocks might not work as expected, enabling an AI to write more effective tests.

**Features:**
- Traces import patterns and call paths.
- Identifies alternative access routes and indirect calls.
**Outputs:**
- **Files:**
    - `{component_name}_call_data.json`: Complete function call path data in JSON.
    - `{component_name}_mock_paths.txt`: Human-readable analysis and mocking recommendations.
- **Location:** `dev-support-scripts/Output/mock_paths/` (configurable via `--output-dir`).
- **Filenaming:** `{component_name}` is derived from the base name of the `target_dir`. (Future: May adopt timestamped naming).

**Usage:**
```bash
# Example: Analyze the 'viewer/semantic' directory, focusing on 'viewer.semantic.vector*' modules
python dev-support-scripts/mock_access_path_analyzer.py viewer/semantic --target-modules "viewer.semantic.vector*" --output-dir dev-support-scripts/Output/mock_paths
```

---

### 8. `test_implementation_analyzer.py`
Cross-references test assertions with actual implementation values to find misalignments.
**AI Utility:** Helps identify unreliable or incorrect tests by comparing test assumptions (e.g., hard-coded defaults, mock targets) against actual code.

**Features:**
- Compares test assertions with implementation defaults.
- Identifies outdated mock targets.
**Outputs:**
- **Files:**
    - `{component_name}_test_analysis.json`: Extracted test assertions/mocks.
    - `{component_name}_impl_analysis.json`: Implementation values/signatures.
    - `{component_name}_alignment_report.txt`: Report on mismatches and recommendations.
- **Location:** `dev-support-scripts/Output/test_alignment/` (configurable via `--output-dir`).
- **Filenaming:** `{component_name}` is derived from the base name of the `impl_dir`. (Future: May adopt timestamped naming).

**Usage:**
```bash
# Example: Analyze tests in 'tests/unit/semantic' against implementations in 'viewer/semantic'
python dev-support-scripts/test_implementation_analyzer.py tests/unit/semantic viewer/semantic --output-dir dev-support-scripts/Output/test_alignment
```

---

### 9. `apply-multiple-diffs/macos_apply_multi_mutation_diffs.py`
Safely applies multiple sequential code mutations defined in a YAML specification file. Optimized for macOS with native filesystem features for reliability.
**AI Utility:** Allows an AI to request complex, multi-step refactoring or code generation tasks and receive structured feedback on the success of each modification. The JSON output is key for this feedback loop.

**Features:**
- Reads mutations from a YAML file (file path, line numbers, search/replace text).
- Applies mutations sequentially, adjusting line numbers automatically.
- Verifies `search_text` before applying changes.
- macOS-native atomic file operations and backup tracking (with fallbacks for other OS).
- Optional verification command execution per file with automatic rollback on failure.
- Dry-run mode.
**Outputs:**
- **Primary Output File:**
    - **File:** A single JSON file summarizing the results.
    - **Location:** User-specified via the `--output-file` argument.
    - **Filenaming:** User-defined (e.g., `mutation_results_20231027_143055.json`). It is recommended to include a timestamp.
- **Backup Files:**
    - **Location:** A timestamped subdirectory (e.g., `./backup_YYYYMMDD_HHMMSS/`), configurable via `--backup-dir`.
    - **Filenaming:** `{original_basename}.{unique_id}.bak`.

**Usage:**
```bash
# Example: Apply mutations from 'my_mutations.yaml', output results to 'apply_results_YYYYMMDD_HHMMSS.json'
python dev-support-scripts/apply-multiple-diffs/macos_apply_multi_mutation_diffs.py --spec my_mutations.yaml --output-file apply_results_$(date +%Y%m%d_%H%M%S).json --verbose
