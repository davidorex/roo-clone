# Cline Dev Support Scripts - TypeScript Suite: Implementation Plan

**Date:** May 13, 2025
**Version:** 1.0

## 1. Introduction

This document outlines the detailed implementation plan for creating the new TypeScript-based Developer Support Script Suite for the Cline VS Code extension. The primary audience for this plan is an AI coding agent, and steps are intended to be atomic and actionable.

The overarching goal is to create tools that provide persistent, AI-consumable insights into the Cline codebase, facilitating AI-driven customization, porting of existing features, and a foundational understanding for future development needs.

This plan references and builds upon the design decisions outlined in:
*   `dev_support_scripts/May 13 Cline Dev Support Scripts.md` (Overall Specification)

## 2. Core Architectural Components & Shared Setup

Before implementing individual analysis scripts, the following shared components and conventions need to be established. These will likely reside in a shared directory within `dev_support_scripts/src/core/` or similar.

### 2.1. `LanguageServiceProvider`
*   **Purpose:** Abstract interaction with code parsing and analysis backends.
*   **Implementation Steps:**
    1.  Create `src/dev_support_scripts/core/languageServiceProvider.ts`.
    2.  Adapt and integrate the Tree-sitter loading and parsing logic from the existing Cline extension's `src/services/tree-sitter/languageParser.ts`.
        *   Ensure it can load WASM parsers for TypeScript.
        *   Provide a method like `getTreeSitterParser(language: 'typescript' | 'python' | 'swift'): Promise<Parser>`.
        *   Provide a method like `getTreeSitterQuery(language: 'typescript' | 'python' | 'swift', queryName: string): Promise<Parser.Query>` (loading queries from adapted versions of `src/services/tree-sitter/queries/`).
    3.  Implement functionality to initialize and manage a TypeScript `ts.Program` and `ts.TypeChecker` for a given set of project files (respecting `tsconfig.json`).
        *   Method: `getTSProgram(projectRoot: string, filePaths?: string[]): ts.Program`.
        *   Method: `getTSTypeChecker(program: ts.Program): ts.TypeChecker`.
    4.  Consider caching `ts.Program` instances for performance.
*   **Key Interface (Conceptual):**
    ```typescript
    interface LanguageServiceProvider {
      getTreeSitterParser(language: string): Promise<Parser>;
      getTreeSitterQuery(language: string, queryContent: string): Parser.Query; // Query content passed directly
      getTSProgram(projectRoot: string, entryFiles: string[]): ts.Program;
      getTSTypeChecker(program: ts.Program): ts.TypeChecker;
      getSourceFile(program: ts.Program, filePath: string): ts.SourceFile | undefined;
    }
    ```

### 2.2. `UAIModelTypes` (Shared Data Structures)
*   **Purpose:** Define the TypeScript interfaces for all JSON output structures.
*   **Implementation Steps:**
    1.  Create `src/dev_support_scripts/models/analysisOutputModels.ts` (or similar).
    2.  Define interfaces based on the JSON structures outlined in the "Outputs and Location" section of the main specification document (`May 13 Cline Dev Support Scripts.md`) and refined in subsequent discussions. Examples:
        *   `ProjectMetadata`, `ApiContractFile`, `ApiElement`, `ApiMember`, `ParameterDetail`
        *   `UsageAnalysisFile`, `UsageElement`, `UsageStats`, `ReferenceLocation`
        *   `TestCoverageFile`, `CoverageDataItem`, `CoveringTestDetail`
        *   `DocCommentsFile`, `DocElement`, `ParsedTSDoc`, `StabilityHint`
        *   `TreeViewNode`
    3.  Ensure all IDs are consistently defined (e.g., `filePath#ElementName.SubElement` or similar unique URI).
    4.  Include `schemaVersion` and `generatedAt` in top-level interfaces.

### 2.3. `AnalysisOutputManager`
*   **Purpose:** Standardize the writing of analysis results to disk.
*   **Implementation Steps:**
    1.  Create `src/dev_support_scripts/core/analysisOutputManager.ts`.
    2.  Implement a function like `saveAnalysisOutput<T>(analyzerName: string, scope: string, data: T, outputBaseDir: string): Promise<string>`.
        *   Handles creating subdirectories within `outputBaseDir` (e.g., `dev_support_outputs/`).
        *   Generates timestamped filenames (e.g., `{analyzerName}_{scope}_{YYYYMMDD_HHMMSS}.json`).
        *   Writes data as formatted JSON.
    3.  Ensure directories are created if they don't exist.

### 2.4. Orchestration Script (`run_cline_analysis.ts`)
*   **Purpose:** Main CLI entry point to run one or more analyzers.
*   **Implementation Steps:**
    1.  Create `src/dev_support_scripts/run_cline_analysis.ts`.
    2.  Use a CLI library like `commander` or `yargs` to define commands and options.
        *   Command to run all Phase 1 analyzers.
        *   Sub-commands or flags to run specific analyzers.
        *   Options for `--projectRoot`, `--outputDir`, target files/directories.
    3.  Instantiate `LanguageServiceProvider` and `AnalysisOutputManager`.
    4.  Call the respective analysis modules based on CLI arguments.

## 3. Order of Script Implementation & Detailed Plans

The following order is recommended. Each script will have its own detailed implementation plan document.

1.  **Setup Shared Components (as above)**:
    *   Implement `LanguageServiceProvider` (basic Tree-sitter and TS Program/TypeChecker access).
    *   Define initial `UAIModelTypes` for the first few scripts.
    *   Implement `AnalysisOutputManager`.
    *   Create a basic structure for `run_cline_analysis.ts`.

2.  **`generate_tree_view.ts`**
    *   Detailed Plan: [`Implementation Plan - generate_tree_view.ts.md`](./Implementation%20Plan%20-%20generate_tree_view.ts.md)
    *   Focus: Basic file system traversal and structured JSON output.

3.  **`extract_docstrings_and_leading_comments.ts`**
    *   Detailed Plan: [`Implementation Plan - extract_docstrings_and_leading_comments.ts.md`](./Implementation%20Plan%20-%20extract_docstrings_and_leading_comments.ts.md)
    *   Focus: Using `LanguageServiceProvider` (Tree-sitter and/or TS Compiler API) to get comments.

4.  **`api_contract_analyzer.ts`**
    *   Detailed Plan: [`Implementation Plan - api_contract_analyzer.ts.md`](./Implementation%20Plan%20-%20api_contract_analyzer.ts.md)
    *   Focus: Deep analysis using TS Compiler API via `LanguageServiceProvider`. Defines core element IDs.

5.  **`dependency_and_usage_analyzer.ts`**
    *   Detailed Plan: [`Implementation Plan - dependency_and_usage_analyzer.ts.md`](./Implementation%20Plan%20-%20dependency_and_usage_analyzer.ts.md)
    *   Focus: Leveraging TS Compiler API for import resolution and reference finding. Consumes element IDs from API contracts.

6.  **`test_coverage_analyzer.ts` (Robust Version)**
    *   Detailed Plan: [`Implementation Plan - test_coverage_analyzer.ts.md`](./Implementation%20Plan%20-%20test_coverage_analyzer.ts.md)
    *   Focus: Complex analysis involving parsing test files, resolving symbols against production code, and heuristic mapping.

## 4. General Guidelines for AI Coder

*   **Atomic Commits:** Commit frequently after implementing small, testable pieces of functionality.
*   **TypeScript Best Practices:** Use strong typing, interfaces, and ES modules. Adhere to the project's ESLint/Prettier configurations.
*   **Error Handling:** Implement robust error handling, especially for file I/O and interactions with external APIs (like TS Compiler API).
*   **Logging:** Use a simple logging mechanism (e.g., `console.log` prefixed with script name) for progress and debugging.
*   **Testing:** For each utility or analysis module, consider what unit tests would be appropriate. AI can be prompted to generate these.
*   **Modularity:** Keep functions and classes focused on a single responsibility.
*   **Configuration:** Allow key parameters (paths, thresholds) to be configurable, likely via the orchestrator script.
*   **Performance:** Be mindful of performance, especially for full-project analyses. Use `async/await` appropriately. Caching in `LanguageServiceProvider` for `ts.Program` is important.

This plan provides a structured approach to developing the dev support script suite. The AI coder should refer to the individual script plan documents for atomic implementation steps.
