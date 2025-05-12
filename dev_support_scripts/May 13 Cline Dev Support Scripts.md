# Implementation Specification: Cline Dev Support Scripts (TypeScript Suite)

**Date:** May 13, 2025
**Version:** 1.0

## 1. Introduction & Goals

This document outlines the plan for creating a new suite of developer support scripts for the Cline VS Code extension project. These scripts will be written in **TypeScript** and are designed primarily for consumption by AI coding agents (like Cline itself) to assist in the development, customization, and maintenance of the Cline extension.

**Primary Goals:**

1.  **Facilitate AI-Driven Customization & Porting:** Provide AI agents with deep, structured, and up-to-date insights into the Cline TypeScript codebase (both the current `cline-david` branch and any older forks) to enable effective implementation of new features and porting of existing customizations.
2.  **Enable Comparative Analysis:** Generate comparable outputs for different codebase versions to help AI understand structural and API differences, primarily to support the porting of customizations. This groundwork will also be beneficial for future integration tasks, such as managing updates from `cline/main`.
3.  **Persistent, AI-Consumable Knowledge Base:** Move away from ephemeral analysis by generating structured, version-able insight files that live with the codebase.
4.  **Leverage Existing Cline Infrastructure:** Utilize and extend existing code analysis capabilities within the Cline extension where possible (e.g., the Tree-sitter service).

## 2. Guiding Principles

*   **TypeScript First:** The suite will be implemented in TypeScript, aligning with the Cline extension's primary language.
*   **AI-Consumable Outputs:** The primary output of analysis scripts will be well-defined JSON structures, described by TypeScript interfaces, tailored for AI understanding.
*   **Best-of-Breed Analysis:** For TypeScript code, leverage the TypeScript Compiler API for semantic depth and the existing Tree-sitter service for syntactic speed and structure.
*   **Modularity & Extensibility:** Design for clear separation of concerns and ease of adding new analysis capabilities or supporting new aspects of the codebase.
*   **Phased Implementation:** Start with core analysis tools generating timestamped outputs, then evolve towards more automated "living context" systems.

## 3. Core Architecture (TypeScript Suite)

The suite will generally follow a modular architecture:

*   **Orchestration Layer (`run_cline_analysis.ts`):**
    *   CLI for invoking specific analyses (using `commander.js` or `yargs`).
    *   Manages file discovery, configuration, and invokes analysis modules.
*   **Analysis Modules (e.g., `dependency_graph_generator.ts`):**
    *   Contain the logic for specific types of code analysis.
    *   Consume services for AST parsing and semantic analysis.
    *   Produce structured JSON outputs.
*   **Core Services:**
    *   **`LanguageServiceProvider` (incorporating existing Tree-sitter logic):**
        *   Provides access to Tree-sitter parsers and query execution for rapid syntactic analysis (repurposing `src/services/tree-sitter/languageParser.ts` and queries).
        *   Manages and provides access to the TypeScript Compiler API (`ts.Program`, `ts.TypeChecker`) for deep semantic analysis of TypeScript files.
    *   **`UAIModelTypes` (e.g., `src/dev_support_scripts/models.ts`):**
        *   A collection of shared TypeScript `interface` definitions for all structured data output by the analyzers (e.g., `CodeDefinition`, `APISignature`, `DependencyLink`). This ensures type safety and consistency.
    *   **`AnalysisOutputManager`:**
        *   Utility for standardized writing of JSON outputs, handling timestamping, directory structures (e.g., `dev_support_outputs/`), etc.

## 4. Prioritized Scripts & Implementation Details (Phase 1)

The following scripts will be developed/rewritten in TypeScript, producing timestamped JSON outputs. The immediate focus of these Phase 1 tools is to provide a deep understanding of the *current* `cline-david` codebase and any *old fork* being ported from, to facilitate direct development and porting tasks.

### 4.1. `generate_tree_view.ts`

*   **Purpose:** Provide a basic file and directory structure overview.
*   **TS Implementation:**
    *   Use Node.js `fs` module for recursive directory traversal.
    *   Respect `.gitignore` and common exclusion patterns (e.g., `node_modules`, `.git`).
*   **JSON Output (`tree_view_YYYYMMDD_HHMMSS.json`):**
    ```json
    {
      "projectName": "cline",
      "generatedAt": "iso_timestamp",
      "root": {
        "name": "src",
        "type": "directory",
        "children": [
          { "name": "extension.ts", "type": "file" },
          { "name": "core", "type": "directory", "children": [...] }
        ]
      }
    }
    ```
*   **Supports Development Needs:** Basic context for AI orientation.

### 4.2. `extract_docstrings.ts` (JSDoc/TSDoc Extractor)

*   **Purpose:** Extract structured documentation from TSDoc/JSDoc comments for classes, interfaces, methods, functions.
*   **TS Implementation:**
    *   Use `LanguageServiceProvider` to get Tree-sitter ASTs.
    *   Use Tree-sitter queries (adapted from existing `queries/typescript.ts` or new ones) to locate definitions.
    *   Navigate the Tree-sitter tree to find comment nodes associated with definitions.
    *   Alternatively, for richer semantic association, use the TypeScript Compiler API (`ts.getJSDocTags`, `symbol.getDocumentationComment()`).
*   **JSON Output (e.g., `docstrings_src_core_webview_YYYYMMDD_HHMMSS.json` per file, or aggregated):**
    ```json
    {
      "filePath": "src/core/webview/index.ts",
      "generatedAt": "iso_timestamp",
      "definitions": [
        {
          "name": "WebviewProvider",
          "kind": "class",
          "docstring": "Manages the webview lifecycle...",
          "parameters": [{"name": "context", "doc": "The extension context."}],
          "returnTypeDoc": "A promise that resolves when..."
        }
        // ... other definitions
      ]
    }
    ```
*   **Supports Development Needs:** Crucial for AI to understand the purpose and usage of code elements when porting or customizing.

### 4.3. `dependency_graph_generator.ts`

*   **Purpose:** Map `import` and `export` relationships between TypeScript modules.
*   **TS Implementation:**
    *   Use `LanguageServiceProvider` to get ASTs (Tree-sitter or TS Compiler API).
    *   Analyze `ts.SyntaxKind.ImportDeclaration`, `ts.SyntaxKind.ExportDeclaration`.
    *   The TS Compiler API's `program.getSourceFile(filePath).resolvedModules` can provide resolved import paths.
    *   Use a library like `graphology` to build and store the graph.
*   **JSON Output (`dependency_graph_YYYYMMDD_HHMMSS.json`):**
    ```json
    {
      "generatedAt": "iso_timestamp",
      "nodes": [
        {"id": "src/extension.ts", "label": "extension.ts"},
        {"id": "src/core/controller/index.ts", "label": "controller/index.ts"}
      ],
      "edges": [
        {"source": "src/extension.ts", "target": "src/core/controller/index.ts", "type": "static_import"}
      ],
      "metrics": { /* centrality, etc. */ }
    }
    ```
*   **Supports Development Needs:** Helps AI understand module coupling for porting (how custom features were wired) and for assessing merge impact (how upstream changes affect module interactions).

### 4.4. `api_contract_analyzer.ts`

*   **Purpose:** Extract detailed public API contracts (signatures, types, visibility) for modules, classes, interfaces, functions.
*   **TS Implementation:**
    *   Primarily use the TypeScript Compiler API (`TypeChecker`) via `LanguageServiceProvider`.
    *   For each exported symbol:
        *   Get its signature (`checker.getSignatureFromDeclaration`).
        *   Extract parameters: name, type (`checker.typeToString(type)`), optionality, initializers.
        *   Extract return type.
        *   Determine visibility (public, private, protected).
        *   Identify inheritance (`classDeclaration.heritageClauses`) and interface implementations.
*   **JSON Output (e.g., `api_contracts_src_core_controller_YYYYMMDD_HHMMSS.json` per file, or aggregated):**
    ```json
    {
      "filePath": "src/core/controller/index.ts",
      "generatedAt": "iso_timestamp",
      "apis": [
        {
          "name": "Controller.constructor",
          "kind": "method",
          "visibility": "public",
          "parameters": [
            {"name": "context", "type": "vscode.ExtensionContext", "optional": false}
          ],
          "returnType": "Controller"
        },
        {
          "name": "Controller.executeTask",
          "kind": "method",
          "parameters": [{"name": "taskDetails", "type": "TaskDetails"}],
          "returnType": "Promise<void>"
        }
      ]
    }
    ```
*   **Supports Development Needs:** Essential for comparing APIs between old forks and `cline-david`, and between `cline-david` and `cline/main` to identify changes that break custom integrations.

### 4.5. `compare_analysis_outputs.ts` (New Tool)

*   **Purpose:** Specifically compare two sets of JSON outputs (e.g., API contracts or dependency graphs) from different codebase versions (old_fork vs. `cline-david`, or `cline-david` vs. `cline/main`).
*   **TS Implementation:**
    *   Takes paths to two directories of analysis outputs (or specific files) as input.
    *   Loads and parses the JSON files.
    *   Performs a structured diff (e.g., identifies added/removed/changed API signatures, new/broken dependencies).
    *   Uses a library like `deep-diff` for generic JSON diffing if applicable, or custom logic for specific structures.
*   **JSON Output (`comparison_report_apicontracts_YYYYMMDD_HHMMSS.json`):**
    ```json
    {
      "comparisonType": "api_contracts",
      "sourceA": "path_to_source_A_outputs",
      "sourceB": "path_to_source_B_outputs",
      "generatedAt": "iso_timestamp",
      "changes": [
        {
          "type": "api_modified",
          "filePath": "src/core/controller/index.ts",
          "apiName": "Controller.executeTask",
          "details": "Parameter 'taskDetails' type changed from 'OldTaskDetails' to 'NewTaskDetails'"
        },
        {
          "type": "dependency_added",
          "sourceModule": "src/extension.ts",
          "targetModule": "src/new_service.ts"
        }
      ]
    }
    ```
*   **Supports Development Needs:** Directly addresses the need to understand what changed between versions to guide porting. While essential for comparing versions for porting, its use for proactive merge conflict management with `cline/main` is a secondary, future benefit. This tool can be considered lower priority in Phase 1 if immediate focus is solely on porting to the current `cline-david` state without immediate upstream merge concerns.

## 5. Future Scripts (Phase 2 or later)

*   `test_coverage_analyzer.ts` (Static heuristic version)
*   `change_impact_analyzer.ts` (Leveraging API contracts, dependency graph, and TS Compiler API's "find all references")
*   `mock_access_path_analyzer.ts`
*   `test_implementation_analyzer.ts`
*   `CurrentCodeSnapshotGenerator.ts` (Aggregates outputs from Phase 1 tools into a "current best view" for version control)
*   `ProjectNarrativeGenerator.ts` (Git history analysis using `simple-git`)

## 6. Output Management

*   All Phase 1 scripts will output timestamped JSON files to a common directory (e.g., `dev_support_outputs/`).
*   The `.gitignore` file for the Cline project should initially ignore this `dev_support_outputs/` directory to prevent committing frequently changing timestamped files.
*   In Phase 2, the `CurrentCodeSnapshotGenerator.ts` will produce non-timestamped, "current state" files in a directory like `.ai_context/` which *will* be version controlled and updated by git hooks.

## 7. AI-Driven Development Considerations

*   **Clear Schemas:** The TypeScript interfaces for JSON outputs serve as clear schemas for AI to understand and generate data.
*   **Modularity:** Each analysis script should be a focused tool. AI can be prompted to create or modify individual analyzers.
*   **Testability:** Each script should be testable. AI can be tasked with generating unit tests for these analysis tools.

This specification provides a roadmap for developing a powerful, TypeScript-native suite of dev support tools that directly address the outlined development needs for the Cline project, particularly in an AI-assisted context.
