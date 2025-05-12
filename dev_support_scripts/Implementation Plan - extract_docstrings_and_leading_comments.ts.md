# Implementation Plan: `extract_docstrings_and_leading_comments.ts`

**Date:** May 13, 2025
**Version:** 1.0
**Parent Plan:** [`Implementation Plan - Main.md`](./Implementation%20Plan%20-%20Main.md)
**Overall Spec:** [`May 13 Cline Dev Support Scripts.md`](./May%2013%20Cline%20Dev%20Support%20Scripts.md)

## 1. Purpose

This script will analyze TypeScript source files to extract formal TSDoc/JSDoc comments and any informal leading comments associated with classes, interfaces, methods, functions, enums, type aliases, and exported constants. The output will be a structured JSON file designed for AI consumption, providing semantic context and developer intent.

## 2. Dependencies on Shared Components

*   **`LanguageServiceProvider` (from `src/dev_support_scripts/core/languageServiceProvider.ts`):**
    *   To get the TypeScript `ts.Program` and `ts.TypeChecker`.
    *   To get `ts.SourceFile` ASTs.
    *   Potentially to use Tree-sitter for faster comment node identification if the TS Compiler API proves too slow for just finding comment text. (Primary approach: TS Compiler API).
*   **`UAIModelTypes` (from `src/dev_support_scripts/models/analysisOutputModels.ts`):**
    *   Will use or define `DocCommentsOutput`, `DocFileElement`, `DocDefinitionElement`, `ParsedTSDoc`, `TSDocTag`, `StabilityHint`.
    ```typescript
    // Example from UAIModelTypes
    interface ParsedTSDocTag {
      tagName: string; // e.g., "@param", "@returns", "@remarks"
      text?: string; // Content of the tag
    }

    interface ParsedTSDoc {
      summary?: string;
      remarks?: string;
      parameters?: Array<{ name: string; description: string }>;
      returns?: string;
      tags?: ParsedTSDocTag[]; // For other tags like @deprecated, @throws, custom tags
    }

    interface DocDefinitionElement {
      id: string; // e.g., filePath#ElementName.SubElement or filePath#elementName
      name: string;
      kind: string; // "class", "interface", "method", "function", "enum", "type_alias", "const"
      tsDoc?: ParsedTSDoc;
      leadingComments?: string[]; // Raw text of comments immediately preceding
      stabilityHints?: string[]; // Keywords like "STABLE_API", "INTERNAL" extracted
    }

    interface DocFileElement {
      filePath: string; // Relative to project root
      elements: DocDefinitionElement[];
    }

    interface DocCommentsOutput {
      projectName: string;
      generatedAt: string; // ISO timestamp
      schemaVersion: string;
      files: DocFileElement[];
    }
    ```
*   **`AnalysisOutputManager` (from `src/dev_support_scripts/core/analysisOutputManager.ts`):**
    *   To save the JSON output.
*   **Orchestration Script (`run_cline_analysis.ts`):**
    *   To invoke this analyzer.

## 3. Core Logic & Implementation Steps

The script `src/dev_support_scripts/analyzers/extract_docstrings_and_leading_comments.ts` will contain:

### 3.1. Main Function (`extractDocumentation`)
*   **Signature:** `async function extractDocumentation(projectRoot: string, filePaths: string[], languageService: LanguageServiceProvider, outputManager: AnalysisOutputManager): Promise<void>`
*   **Steps:**
    1.  Log start of analysis.
    2.  Get `ts.Program` and `ts.TypeChecker` from `languageService` for the given `filePaths`.
    3.  Initialize `allFileDocData: DocFileElement[] = []`.
    4.  For each `filePath` in `filePaths`:
        a.  Get the `ts.SourceFile` AST node from `languageService`.
        b.  If `sourceFile` exists:
            i.  Create `currentFileDocData: DocFileElement = { filePath: relativePath(projectRoot, filePath), elements: [] }`.
            ii. Instantiate a visitor class (e.g., `DocumentationVisitor`).
            iii. Call `visitor.visitSourceFile(sourceFile, typeChecker, currentFileDocData.elements)`.
            iv. If `currentFileDocData.elements` is not empty, add it to `allFileDocData`.
    5.  Prepare the `DocCommentsOutput` object.
    6.  Use `outputManager.saveAnalysisOutput('doc_comments', 'project_wide', outputData)` to save.
    7.  Log completion.

### 3.2. `DocumentationVisitor` Class
*   **Purpose:** Traverses the TypeScript AST to find definitions and extract their TSDoc and leading comments.
*   **Constructor:** `constructor(private typeChecker: ts.TypeChecker, private sourceFile: ts.SourceFile, private outputElements: DocDefinitionElement[])`
*   **Main Method:** `public visitNode(node: ts.Node): void` (to be called recursively or via `ts.forEachChild`).
*   **Logic for each relevant `ts.Node` kind (e.g., `ClassDeclaration`, `FunctionDeclaration`, `MethodDeclaration`, `InterfaceDeclaration`, `EnumDeclaration`, `TypeAliasDeclaration`, `VariableStatement` for exported consts):**
    1.  **Identify Element:**
        *   Get the element's `name` (e.g., `node.name?.getText()`).
        *   Determine its `kind`.
        *   Construct its unique `id` (e.g., `sourceFile.fileName#name`).
    2.  **Extract TSDoc:**
        *   Use `ts.getJSDocTags(node)` to get all JSDoc tags.
        *   Use `typeChecker.getSymbolAtLocation(node.name || node)?.getDocumentationComment(typeChecker)` to get the main comment block.
        *   Parse these into the `ParsedTSDoc` structure:
            *   Extract `@summary` or the first part of the main comment as `summary`.
            *   Extract `@remarks` block.
            *   Extract `@param` tags into `parameters` array.
            *   Extract `@returns` or `@return` tag.
            *   Collect other tags into `tags` array.
    3.  **Extract Leading Comments:**
        *   Use `ts.getLeadingCommentRanges(sourceFile.getFullText(), node.getFullStart())`.
        *   Filter these to get comments immediately preceding the node (heuristic: check line numbers and proximity).
        *   Store the raw text of these comments.
    4.  **Extract Stability Hints:**
        *   Scan TSDoc tags (e.g., `@stable`, `@internal`, `@experimental`, `@deprecated`).
        *   Scan leading comments for keywords (e.g., "STABLE_API", "INTERNAL USE ONLY").
        *   Populate the `stabilityHints` array.
    5.  **Create `DocDefinitionElement`:** Populate and add to `this.outputElements`.
    6.  **Recurse:** Call `ts.forEachChild(node, child => this.visitNode(child))` to visit children (e.g., methods within a class). For `VariableStatement`, iterate through `node.declarationList.declarations`.

### 3.3. Utility for TSDoc Parsing
*   A helper function `parseTSDoc(mainComment: ts.SymbolDisplayPart[] | undefined, tags: readonly ts.JSDocTagInfo[]): ParsedTSDoc` might be useful to structure the TSDoc extraction logic.

## 4. CLI Integration (via `run_cline_analysis.ts`)

*   The orchestrator will:
    *   Identify all `.ts` and `.tsx` files in the project (respecting `tsconfig.json` includes/excludes).
    *   Pass the list of files to `extractDocumentation`.

## 5. Output JSON Structure (Recap)

*   Defined in `UAIModelTypes` as `DocCommentsOutput`, `DocFileElement`, `DocDefinitionElement`, `ParsedTSDoc`.
*   Aggregated project-wide file: `doc_comments_project_wide_YYYYMMDD_HHMMSS.json`.
*   Focus on `summary` and `stabilityHints` for the main AI context, with full TSDoc available if drilled down.

## 6. Testing Considerations

*   Test with various TSDoc comment styles (single-line, multi-line, different tags).
*   Test extraction of leading comments (single, multiple, different spacing).
*   Test identification of stability hints from various sources.
*   Test on files with classes, functions, interfaces, enums, type aliases, and exported constants.
*   Verify correct `id` generation and `filePath` reporting.

## 7. Atomic Implementation Steps for AI Coder

1.  **Setup:**
    *   Ensure `UAIModelTypes` in `src/dev_support_scripts/models/analysisOutputModels.ts` includes the necessary `Doc...` interfaces.
    *   Ensure `LanguageServiceProvider` and `AnalysisOutputManager` are available.
2.  **Create File:** Create `src/dev_support_scripts/analyzers/extract_docstrings_and_leading_comments.ts`.
3.  **Import Dependencies:** `ts` (TypeScript Compiler API), `path`, shared types, `LanguageServiceProvider`, `AnalysisOutputManager`.
4.  **Implement `parseTSDoc` Utility (Optional but Recommended):**
    *   Signature: `function parseTSDoc(mainCommentParts: ts.SymbolDisplayPart[] | undefined, tags: readonly ts.JSDocTagInfo[]): ParsedTSDoc`
    *   Logic to convert raw TS Compiler API comment/tag info into the `ParsedTSDoc` interface structure. Handle common tags like `@param`, `@returns`, `@summary`, `@remarks`, `@deprecated`, `@internal`, `@experimental`.
5.  **Implement `DocumentationVisitor` Class:**
    *   Constructor: `(typeChecker: ts.TypeChecker, sourceFile: ts.SourceFile, outputElements: DocDefinitionElement[])`.
    *   `visitNode(node: ts.Node)` method:
        *   Switch on `node.kind`.
        *   Handle `ts.SyntaxKind.ClassDeclaration`, `InterfaceDeclaration`, `FunctionDeclaration`, `MethodDeclaration`, `GetAccessor`, `SetAccessor`, `EnumDeclaration`, `TypeAliasDeclaration`, `VariableStatement` (for exported consts).
        *   For each, extract name, generate ID.
        *   Call `typeChecker.getSymbolAtLocation(...)?.getDocumentationComment(...)` and `ts.getJSDocTags(...)`.
        *   Call `ts.getLeadingCommentRanges(...)`.
        *   Parse/process these into `ParsedTSDoc`, `leadingComments`, and `stabilityHints`.
        *   Construct and push `DocDefinitionElement`.
        *   Call `ts.forEachChild` for relevant nodes (e.g., class members).
6.  **Implement Main `extractDocumentation` Function:**
    *   Signature: `export async function extractDocumentation(projectRoot: string, filePaths: string[], languageService: LanguageServiceProvider, outputManager: AnalysisOutputManager): Promise<void>`
    *   Get `ts.Program` and `ts.TypeChecker`.
    *   Loop through `filePaths`:
        *   Get `ts.SourceFile`.
        *   Create `DocumentationVisitor`.
        *   Call `ts.forEachChild(sourceFile, node => visitor.visitNode(node))` to start traversal (or `visitor.visitSourceFile` if preferred).
        *   Collect results into `DocFileElement`.
    *   Construct `DocCommentsOutput`.
    *   Save using `outputManager`.
    *   Add logging.
7.  **Integrate with `run_cline_analysis.ts`:**
    *   Add command/option to run this analyzer.
    *   Ensure `filePaths` (all relevant project TS files) are passed.
8.  **(Self-Correction/Refinement):** Test with diverse code examples. Verify TSDoc parsing for various tags. Check leading comment extraction accuracy. Ensure stability hints are correctly identified.

This plan provides a detailed path for implementing the docstring and comment extraction functionality.
