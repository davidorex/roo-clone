# Specification: CurrentCodeSnapshotGenerator.py

Date: May 12, 2025

## 1. Objective

The `CurrentCodeSnapshotGenerator.py` script aims to generate a comprehensive, multi-faceted snapshot of the project's current state. It will synthesize the latest outputs from various analysis scripts (from the Language-Agnostic Code Analysis Suite) to provide an AI-consumable and human-readable overview of the codebase's architecture, key APIs, documentation coverage, and other relevant metrics as of the last analysis run.

This script is designed to give developers and AI agents an up-to-date understanding of the project's structure and key components without needing to delve into historical evolution (which is covered by `ProjectNarrativeGenerator.py`).

## 2. Core Idea

The script will function as an aggregator and presenter of the most recent analysis data. It will:
1.  Identify and parse the latest timestamped outputs from core analysis modules (dependency graph, API contracts, docstrings, test coverage, complexity, etc.).
2.  Synthesize this information into a structured report, highlighting key aspects of the current codebase.
3.  Prioritize information that is most useful for understanding the current design, public interfaces, and overall health/complexity.

## 3. Data Sources (Latest Timestamped Versions)

The script will primarily rely on the latest outputs from the Language-Agnostic Code Analysis Suite, including:

*   **`dependency_graph_{timestamp}.json`**: For current module interdependencies, subsystem structure, and centrality metrics.
*   **`{component}_api_contracts_{timestamp}.json`**: For precise current API signatures of modules/classes/functions.
*   **`{component}_documentation_{timestamp}.json`**: For current docstring coverage and content for modules, classes, and functions.
*   **`test_coverage_summary_{timestamp}.json`**: For current test coverage statistics.
*   **(Future) `code_complexity_report_{timestamp}.json`**: For current complexity scores of key components.
*   **(Future) `dead_code_report_{timestamp}.json`**: For currently identified unused code.
*   **(Future) `tech_stack_report_{timestamp}.json`**: For currently identified dependencies and libraries.

## 4. Proposed Architecture (Conceptual Components)

*   **`ConfigManager`:**
    *   Handles script configuration: paths to the base `Output/` directory of the analysis suite, output file naming, thresholds for highlighting (e.g., "show top N most complex modules").
*   **`LatestAnalysisParser`:**
    *   Responsible for finding and parsing the most recent timestamped JSON output files for each required analysis type (dependency graph, API contracts for specified components, docstrings, etc.).
    *   Provides a unified way to access the latest structured data from all relevant analysis scripts.
*   **`SnapshotSynthesizer`:**
    *   Takes the parsed data from `LatestAnalysisParser`.
    *   Aggregates project-wide statistics (total modules, LoC by language, overall coverage percentages, count of critical architectural concerns, etc.) for the YAML front matter and the "Project Overview & Health Summary" section.
    *   Extracts and structures detailed key information for the subsequent sections of the snapshot report. This includes:
        *   Detailed architectural overview (key subsystems, central modules).
        *   API summaries for major components/modules.
        *   Documentation coverage statistics and links/summaries for key undocumented items.
        *   Test coverage highlights.
        *   (Future) Complexity hotspots, dead code summaries.
*   **`ReportFormatter (Markdown/JSON)`:**
    *   Assembles the synthesized snapshot into a well-structured output format.
    *   **Markdown Output:** Human-readable, with embedded AI-consumable JSON blocks (similar to `ProjectNarrativeGenerator_v2.py` but focused on current state).
    *   **JSON Output (Optional):** A single, comprehensive JSON object representing the entire snapshot, optimized purely for machine consumption.

## 5. Key Features & Functionality

*   **Architectural Overview:**
    *   Summarize key subsystems identified in the latest dependency graph.
    *   List top N most central/critical modules (high fan-in/fan-out).
    *   Highlight any significant architectural patterns or concerns (e.g., major circular dependencies if present).
*   **API Surface Summary:**
    *   For selected key modules/components (configurable or auto-detected):
        *   List public classes, functions, and methods.
        *   Provide concise signatures (name, parameters, return type).
        *   Link to or embed snippets of their docstrings.
*   **Documentation Status:**
    *   Overall docstring coverage percentage (if calculable from `DocumentationExtractor` output).
    *   List key public APIs lacking documentation.
*   **Test Coverage Status:**
    *   Overall test coverage percentage.
    *   List key modules/components with low test coverage.
*   **(Future) Code Quality Metrics:**
    *   Top N most complex modules/functions.
    *   Summary of identified dead code.
*   **AI-Consumable Output:**
    *   Markdown with embedded JSON for key data structures.
    *   Optional pure JSON output.
    *   YAML front matter in Markdown for quick top-level metadata.

## 6. Output Format

### a. Markdown Output (`CurrentCodeSnapshot_{timestamp}.md`)
*   **YAML Front Matter:**
    *   `report_type: CurrentCodeSnapshot`
    *   `generation_timestamp_iso:`
    *   `analysis_data_timestamp_iso:` (timestamp of the latest analysis files used)
    *   `project_name:`
    *   `summary_stats:`
        *   `total_modules_analyzed:`
        *   `total_files_analyzed:`
        *   `lines_of_code_by_language: {python: X, typescript: Y, swift: Z}` (Requires LoC capability in analysis suite)
        *   `public_api_entry_points_count:` (e.g., top-level functions, key class methods)
        *   `overall_docstring_coverage_percentage:`
        *   `overall_test_coverage_percentage:`
        *   `critical_architectural_concerns_count:` (e.g., number of major cycles)
        *   `(Future) key_dependencies_count:`
        *   `(Future) overall_complexity_score_avg:`
        *   `(Future) dead_code_percentage:`
*   **Sections:**
    *   **1. Project Overview & Health Summary:** (Synthesizes key metrics from YAML and other sections)
        *   Brief narrative summary of project size, main languages, and overall health indicators.
        *   Highlights from `summary_stats`.
        *   Top 2-3 Architectural Concerns.
        *   `<!-- AI_DATA_PROJECT_OVERVIEW: {json_object_with_overview_stats_and_key_points} -->`
    *   **2. Overall Architecture:**
        *   Key Subsystems (list, brief description if available from docstrings).
        *   Central Modules (list, centrality score, brief purpose).
        *   Architectural Concerns (e.g., cycles).
        *   `<!-- AI_DATA_ARCHITECTURE: {json_object_with_arch_details} -->`
    *   **2. Key API Contracts:** (Loop per selected component)
        *   Component Name
        *   Public Functions/Methods (name, signature snippet, docstring summary).
        *   `<!-- AI_DATA_API_{ComponentName}: {json_object_with_api_details} -->`
    *   **3. Documentation Coverage:**
        *   Overall Statistics.
        *   Key Undocumented Public APIs.
        *   `<!-- AI_DATA_DOC_COVERAGE: {json_object_with_doc_stats} -->`
    *   **4. Test Coverage:**
        *   Overall Statistics.
        *   Modules with Low Coverage.
        *   `<!-- AI_DATA_TEST_COVERAGE: {json_object_with_test_stats} -->`
    *   **(Future) 5. Code Complexity Hotspots:**
    *   **(Future) 6. Dead Code Summary:**
    *   **(Future) 7. Technology Stack:**

### b. JSON Output (Optional - `CurrentCodeSnapshot_{timestamp}.json`)
*   A single JSON object containing all the structured data presented in the Markdown, optimized for direct machine parsing.

## 7. Configuration Options (Command-line arguments)

*   `--output-dir`: Path for the generated report files.
*   `--analysis-input-dir`: Path to the base `Output/` directory of the analysis suite. Default: `dev-support-scripts/Output/`.
*   `--components-for-api-summary`: Comma-separated list of module/component name patterns for detailed API summaries. (e.g., `viewer.semantic.*`, `git_commit_viewer.utils`)
*   `--output-format`: `markdown` (default) or `json`.
*   `--top-n-central-modules`: Number of central modules to highlight.
*   `--top-n-complex-modules`: (Future) Number of complex modules to highlight.

## 8. Usage Example

```bash
python dev-support-scripts/CurrentCodeSnapshotGenerator.py \
    --output-dir documentation/snapshots/ \
    --analysis-input-dir dev-support-scripts/Output/ \
    --components-for-api-summary "viewer.semantic.vector,viewer.models" \
    --output-format markdown
```

This script will provide a valuable, up-to-date reference point for understanding the current state of the codebase, complementing the historical perspective offered by the `ProjectNarrativeGenerator`.
