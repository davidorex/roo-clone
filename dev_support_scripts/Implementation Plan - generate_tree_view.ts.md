# Implementation Plan: `generate_tree_view.ts`

**Date:** May 13, 2025
**Version:** 1.0
**Parent Plan:** [`Implementation Plan - Main.md`](./Implementation%20Plan%20-%20Main.md)
**Overall Spec:** [`May 13 Cline Dev Support Scripts.md`](./May%2013%20Cline%20Dev%20Support%20Scripts.md)

## 1. Purpose

This script will generate a JSON representation of the project's file and directory structure for specified target directories. This output is primarily for AI consumption to provide a basic orientation to the codebase structure.

## 2. Dependencies on Shared Components

*   **`UAIModelTypes` (from `src/dev_support_scripts/models/analysisOutputModels.ts`):**
    *   Will use or define `TreeViewNode` and a top-level interface for the output (e.g., `TreeViewOutput`).
    ```typescript
    // Example from UAIModelTypes
    interface TreeViewNode {
      name: string;
      path: string; // Relative to project root
      type: 'directory' | 'file';
      children?: TreeViewNode[];
      // Optional: size, lastModified
    }

    interface TreeViewOutput {
      projectName: string;
      generatedAt: string; // ISO timestamp
      schemaVersion: string;
      targetDirectory: string; // The directory this tree represents, relative to project root
      root: TreeViewNode;
    }
    ```
*   **`AnalysisOutputManager` (from `src/dev_support_scripts/core/analysisOutputManager.ts`):**
    *   Will be used to save the JSON output to a timestamped file in the designated output directory.
*   **Orchestration Script (`run_cline_analysis.ts`):**
    *   This script will be callable from the orchestrator, receiving parameters like target directories and output path.

## 3. Core Logic & Implementation Steps

The script `src/dev_support_scripts/analyzers/generate_tree_view.ts` will contain the following:

### 3.1. Main Function (`generateTreeView`)
*   **Signature:** `async function generateTreeView(projectRoot: string, targetRelativeDir: string, outputBaseDir: string, outputManager: AnalysisOutputManager): Promise<void>`
*   **Steps:**
    1.  Log start of analysis for `targetRelativeDir`.
    2.  Construct the full path to the `targetRelativeDir` using `projectRoot`.
    3.  Validate that `targetRelativeDir` exists and is a directory. If not, log an error and return.
    4.  Initialize the root `TreeViewNode` for `targetRelativeDir`.
    5.  Call a recursive helper function (e.g., `buildTreeRecursively`) to populate the `children` of the root node.
    6.  Prepare the `TreeViewOutput` object, including `projectName` (derived from `projectRoot` or passed in), `generatedAt`, `schemaVersion`, `targetDirectory`, and the populated `root` node.
    7.  Use `outputManager.saveAnalysisOutput('tree_view', targetRelativeDir.replace(/[\/\\]/g, '_'), outputData)` to save the JSON.
    8.  Log completion or any errors.

### 3.2. Recursive Helper Function (`buildTreeRecursively`)
*   **Signature:** `async function buildTreeRecursively(currentPath: string, projectRoot: string, parentNode: TreeViewNode, ignorePatterns: string[]): Promise<void>`
*   **Steps:**
    1.  Read the contents of `currentPath` using `fs.promises.readdir(currentPath, { withFileTypes: true })`.
    2.  Initialize `parentNode.children = []`.
    3.  For each `dirent` (directory entry) in the contents:
        a.  Get the `entryName = dirent.name`.
        b.  Check if `entryName` matches any pattern in `ignorePatterns` (e.g., from a `.gitignore` parser or a predefined list like `node_modules`, `.git`, `.DS_Store`, `*.log`). If it matches, skip this entry.
        c.  Construct the `entryRelativePath` (relative to `projectRoot`).
        d.  If `dirent.isDirectory()`:
            i.  Create a new `childNode: TreeViewNode` with `type: 'directory'`, `name: entryName`, `path: entryRelativePath`.
            ii. Add `childNode` to `parentNode.children`.
            iii. Recursively call `buildTreeRecursively(path.join(currentPath, entryName), projectRoot, childNode, ignorePatterns)`.
        e.  If `dirent.isFile()`:
            i.  Create a new `childNode: TreeViewNode` with `type: 'file'`, `name: entryName`, `path: entryRelativePath`.
            ii. Add `childNode` to `parentNode.children`.
    4.  Sort `parentNode.children` alphabetically by name (directories first, then files, or just alphabetically).

### 3.3. Ignore Pattern Handling (Utility)
*   **Purpose:** To filter out unwanted files and directories.
*   **Implementation:**
    1.  Create a utility function `loadIgnorePatterns(projectRoot: string): Promise<string[]>` that:
        *   Reads `.gitignore` from `projectRoot` if it exists.
        *   Parses its rules (can use a simple line-by-line approach for basic patterns, or a library like `ignore` for full `.gitignore` semantics).
        *   Adds common default ignores (e.g., `.git`, `node_modules`, `__pycache__`, `*.pyc`, `.DS_Store`).
    2.  Pass these patterns to `buildTreeRecursively`.

## 4. CLI Integration (via `run_cline_analysis.ts`)

*   The orchestrator script (`run_cline_analysis.ts`) will:
    *   Accept a `--target-dirs` option (comma-separated list of directories relative to project root, e.g., "src,scripts").
    *   For each target directory, invoke `generateTreeView`.
    *   Default target directories could be `src/` or the project root itself if not specified.

## 5. Output JSON Structure (Recap)

*   Defined in `UAIModelTypes` as `TreeViewOutput` and `TreeViewNode`.
*   Example (for a single target directory):
    ```json
    // dev_support_outputs/tree_view_src_YYYYMMDD_HHMMSS.json
    {
      "projectName": "cline",
      "generatedAt": "2025-05-13T06:00:00.000Z",
      "schemaVersion": "1.0",
      "targetDirectory": "src",
      "root": {
        "name": "src",
        "path": "src",
        "type": "directory",
        "children": [
          { "name": "extension.ts", "path": "src/extension.ts", "type": "file" },
          {
            "name": "core",
            "path": "src/core",
            "type": "directory",
            "children": [
              { "name": "index.ts", "path": "src/core/index.ts", "type": "file" }
            ]
          }
        ]
      }
    }
    ```

## 6. Testing Considerations

*   Create mock directory structures.
*   Test recursive traversal.
*   Test ignore pattern application.
*   Verify JSON output structure against `TreeViewOutput` interface.
*   Test handling of empty directories or directories with only ignored files.

## 7. Atomic Implementation Steps for AI Coder

1.  **Setup:**
    *   Ensure `UAIModelTypes` in `src/dev_support_scripts/models/analysisOutputModels.ts` includes `TreeViewNode` and `TreeViewOutput` interfaces as specified.
    *   Ensure `AnalysisOutputManager` is available.
2.  **Create File:** Create `src/dev_support_scripts/analyzers/generate_tree_view.ts`.
3.  **Import Dependencies:** Add necessary imports (`fs`, `path`, shared types, `AnalysisOutputManager`).
4.  **Implement `loadIgnorePatterns` Utility:**
    *   Function signature: `async function loadIgnorePatterns(projectRoot: string): Promise<string[]>`
    *   Read `.gitignore` from `projectRoot`.
    *   Parse basic patterns (lines that are not empty or comments).
    *   Add default patterns: `.git`, `node_modules`, `dist`, `out`, `*.log`, `__pycache__`, `.DS_Store`.
    *   Return unique list of patterns.
5.  **Implement `buildTreeRecursively` Function:**
    *   Function signature: `async function buildTreeRecursively(currentAbsPath: string, projectRoot: string, currentRelativePath: string, ignorePatterns: string[]): Promise<TreeViewNode>`
    *   Create `node: TreeViewNode` for `currentAbsPath`.
    *   Read directory entries from `currentAbsPath`.
    *   Filter entries using `ignorePatterns`.
    *   For each valid entry:
        *   If directory, create child `TreeViewNode` and recursively call `buildTreeRecursively`.
        *   If file, create child `TreeViewNode`.
        *   Add child to `node.children`.
    *   Sort `node.children`.
    *   Return `node`.
6.  **Implement Main `generateTreeView` Function:**
    *   Function signature: `export async function generateTreeView(projectRoot: string, targetRelativeDir: string, outputManager: AnalysisOutputManager): Promise<void>`
    *   Resolve `targetAbsDir` from `projectRoot` and `targetRelativeDir`.
    *   Call `loadIgnorePatterns(projectRoot)`.
    *   Call `buildTreeRecursively(targetAbsDir, projectRoot, targetRelativeDir, ignorePatterns)` to get the `rootNode`.
    *   Construct the `TreeViewOutput` object.
    *   Use `outputManager.saveAnalysisOutput(...)` to save the result.
    *   Add logging for start, completion, and errors.
7.  **Integrate with `run_cline_analysis.ts`:**
    *   Add a command or option to trigger `generateTreeView`.
    *   Pass necessary parameters (`projectRoot`, `targetRelativeDir` from CLI args, instantiated `AnalysisOutputManager`).
8.  **(Self-Correction/Refinement):** Test with a sample directory structure. Ensure paths (absolute vs. relative) are handled correctly. Ensure ignore patterns work. Verify JSON output.

This detailed plan should provide sufficient guidance for an AI coder to implement the `generate_tree_view.ts` script.
