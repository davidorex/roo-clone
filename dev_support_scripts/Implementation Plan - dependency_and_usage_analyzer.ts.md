# Implementation Plan: `dependency_and_usage_analyzer.ts`

**Date:** May 13, 2025
**Version:** 1.0
**Parent Plan:** [`Implementation Plan - Main.md`](./Implementation%20Plan%20-%20Main.md)
**Overall Spec:** [`May 13 Cline Dev Support Scripts.md`](./May%2013%20Cline%20Dev%20Support%20Scripts.md)

## 1. Purpose

This script is a keystone analyzer. It will map static dependencies (imports/exports) between modules and, more importantly, trace actual usages of significant code elements (classes, methods, functions, interfaces, types, exported constants) across the entire TypeScript codebase. The output will provide critical data for AI agents to understand an element's interconnectedness, assess the potential impact of changes, and identify candidates for immutability or safe mutation.

## 2. Dependencies on Shared Components

*   **`LanguageServiceProvider` (from `src/dev_support_scripts/core/languageServiceProvider.ts`):**
    *   To get the TypeScript `ts.Program`, `ts.TypeChecker`, and `ts.SourceFile` ASTs.
    *   Crucially, to access TypeScript's language services for reference finding (e.g., `ts.FindAllReferences.findReferencingSymbols` or `LanguageService.findReferences`).
*   **`UAIModelTypes` (from `src/dev_support_scripts/models/analysisOutputModels.ts`):**
    *   Will use or define `UsageAnalysisOutput`, `UsageElement`, `UsageStats`, `ReferenceLocationDetails`, `ModuleDependency`.
    ```typescript
    // Example from UAIModelTypes
    interface ReferenceLocationDetails {
      filePath: string; // Relative to project root
      line: number;
      column: number;
      snippet?: string; // Small context snippet around the reference
      referenceType: 'call' | 'read' | 'write' | 'instantiation' | 'type_reference' | 'import' | 'unknown';
      // isWriteAccess?: boolean; // More specific for properties/variables
    }

    interface UsageStats {
      dependentsCount: number;     // Number of distinct *modules* that use this element
      externalUsageCount: number;  // Total number of usages from *other* modules
      internalUsageCount: number;   // Total number of usages within its *own* module
    }

    interface UsageElement {
      id: string; // Matches ID from api_contracts, e.g., filePath#ElementName.SubElement
      name: string; // For easier human reading, can be derived
      kind: string; // From api_contracts
      filePath: string; // From api_contracts
      isExported: boolean; // From api_contracts
      stats: UsageStats;
      // references?: ReferenceLocationDetails[]; // OMITTED from project-wide summary, available on demand
      staticDependencies?: Array<{ resolvedPath: string; importedAs?: string }>; // For module elements, direct static imports
    }

    interface ModuleDependency {
      sourceModulePath: string; // Relative to project root
      targetModulePath: string; // Relative to project root
      type: 'static_import' | 'dynamic_import';
    }

    interface UsageAnalysisOutput {
      projectName: string;
      generatedAt: string; // ISO timestamp
      schemaVersion: string;
      elements: UsageElement[];
      moduleDependencies: ModuleDependency[];
    }
    ```
*   **`AnalysisOutputManager` (from `src/dev_support_scripts/core/analysisOutputManager.ts`):**
    *   To save the JSON output.
*   **Output from `api_contract_analyzer.ts` (Implicit Dependency):**
    *   This analyzer will likely consume the list of all identified code elements (and their IDs) from `api_contract_analyzer.ts` as the basis for what to find usages for. This avoids re-implementing definition discovery.

## 3. Core Logic & Implementation Steps

The script `src/dev_support_scripts/analyzers/dependency_and_usage_analyzer.ts` will contain:

### 3.1. Main Function (`analyzeDependenciesAndUsage`)
*   **Signature:** `async function analyzeDependenciesAndUsage(projectRoot: string, filePaths: string[], languageService: LanguageServiceProvider, apiContractData: ApiContractsOutput, outputManager: AnalysisOutputManager): Promise<void>`
    *   Note: Takes `apiContractData` as input.
*   **Steps:**
    1.  Log start of analysis.
    2.  Get `ts.Program` and `ts.TypeChecker` from `languageService`.
    3.  Initialize `usageElements: UsageElement[] = []` and `moduleDependencies: ModuleDependency[] = []`.
    4.  **Extract Module Dependencies (Static Imports):**
        *   Iterate through each `sourceFile` in `program.getSourceFiles()`.
        *   For each `sourceFile`, analyze its import declarations (`ts.SyntaxKind.ImportDeclaration`, `ts.SyntaxKind.ExportDeclaration` with module specifier, `ts.SyntaxKind.ImportEqualsDeclaration`).
        *   Use `typeChecker.getSymbolAtLocation(moduleSpecifier)` and `program.getResolvedModuleWithFailedLookupLocationsFromCache(moduleSpecifierText, containingFilePath)` (or similar) to resolve imported module paths.
        *   Populate `moduleDependencies` list.
    5.  **Analyze Usage for Each Element from API Contracts:**
        *   Iterate through each `ApiFileElement` and then each `ApiDefinitionElement` (and its `members`) from the `apiContractData.files`.
        *   For each `element` (or `member`):
            a.  Get its `id`, `name`, `kind`, `filePath`, `isExported`.
            b.  Find the corresponding `ts.Node` in the AST (this might require mapping `id` back to AST nodes, or `api_contract_analyzer.ts` could also output AST node positions).
            c.  If `ts.Node` is found:
                i.  Use TypeScript's language services (e.g., `ts.FindAllReferences.findReferencingSymbols` or `languageService.findReferences(filePath, node.getStart())`) to get all reference entries for this element's symbol.
                ii. Process these references:
                    *   Initialize `internalUsageCount = 0`, `externalUsageCount = 0`.
                    *   Create a `Set<string>` for `dependentModulePaths`.
                    *   For each reference:
                        *   Determine if it's internal (same file) or external.
                        *   Increment respective counts.
                        *   If external, add the referencing file's path to `dependentModulePaths`.
                        *   (Optional for detailed on-demand files): Store `ReferenceLocationDetails`.
                iii. Create `UsageStats` object.
                iv. Create `UsageElement` and add to `usageElements`.
    6.  Prepare the `UsageAnalysisOutput` object.
    7.  Use `outputManager.saveAnalysisOutput('usage_analysis', 'project_wide', outputData)` to save.
    8.  Log completion.

### 3.2. Helper for Reference Processing
*   **`processReferences(references: ts.ReferencedSymbolEntry[], sourceElementFilePath: string): { stats: UsageStats, detailedRefs?: ReferenceLocationDetails[] }`**
    *   Takes the array of references from the TS API.
    *   Iterates through them, classifying each reference (internal/external, type of reference if possible from `reference.kind` or context).
    *   Calculates counts.
    *   Formats `ReferenceLocationDetails` if needed for detailed output.

### 3.3. Mapping API Element IDs to AST Nodes
*   A robust way to get the `ts.Node` for an element ID from `api_contract_analyzer.ts` will be needed.
*   `api_contract_analyzer.ts` could be enhanced to also output the `node.pos` and `node.end` for each element it records.
*   A utility function `findNodeByPosition(sourceFile: ts.SourceFile, pos: number, end: number): ts.Node | undefined` could then be used.

## 4. CLI Integration (via `run_cline_analysis.ts`)

*   The orchestrator will:
    *   First run `api_contract_analyzer.ts` to get its output.
    *   Then, invoke `analyzeDependenciesAndUsage`, passing the file paths and the result from the API contract analysis.

## 5. Output JSON Structure (Recap)

*   Defined in `UAIModelTypes`.
*   Aggregated project-wide file: `usage_analysis_project_wide_YYYYMMDD_HHMMSS.json`.
*   Focus on `stats` (counts) in the main file. Detailed `references` list should be omitted from the project-wide summary to save tokens and generated on-demand or into separate files if necessary.

## 6. Testing Considerations

*   Test with various import/export patterns (named, default, re-exports, star exports, dynamic imports).
*   Test usage tracking for different kinds of elements (classes, methods, functions, properties, enums, types).
*   Verify counts for internal vs. external usage and dependent modules.
*   Test with a project structure that has inter-dependencies.
*   Ensure correct mapping between API contract element IDs and the symbols being analyzed for references.

## 7. Atomic Implementation Steps for AI Coder

1.  **Setup:**
    *   Ensure `UAIModelTypes` includes `UsageAnalysisOutput`, `UsageElement`, `UsageStats`, `ReferenceLocationDetails`, `ModuleDependency`.
    *   Ensure `LanguageServiceProvider` (with robust `findReferences` or equivalent access) and `AnalysisOutputManager` are ready.
    *   Modify `api_contract_analyzer.ts` (or its plan) to ensure it can provide necessary information to locate `ts.Node`s for its reported elements (e.g., by including `pos` and `end` in `ApiDefinitionElement` and `ApiMember`).
2.  **Create File:** `src/dev_support_scripts/analyzers/dependency_and_usage_analyzer.ts`.
3.  **Import Dependencies:** `ts`, `path`, shared types, services, and the output types from `api_contract_analyzer.ts`.
4.  **Implement Module Dependency Extraction Logic:**
    *   Within `analyzeDependenciesAndUsage`, iterate `program.getSourceFiles()`.
    *   For each `sourceFile`, find all import/export declarations.
    *   Use `program.getResolvedModuleWithFailedLookupLocationsFromCache` or `typeChecker.getSymbolAtLocation` on module specifiers to get resolved paths.
    *   Populate the `moduleDependencies: ModuleDependency[]` array.
5.  **Implement `findNodeByPosition` Utility (if needed):**
    *   `function findNodeByPosition(sourceFile: ts.SourceFile, pos: number, end: number): ts.Node | undefined`
    *   Uses `ts.forEachChild` and checks `node.pos` and `node.end`.
6.  **Implement `processReferences` Helper Function:**
    *   Signature: `function processReferences(referenceEntries: readonly ts.ReferenceEntry[], sourceElementFilePath: string, typeChecker: ts.TypeChecker, program: ts.Program): { stats: UsageStats, detailedRefsSample?: ReferenceLocationDetails[] }`
    *   Iterate `referenceEntries`.
    *   For each `entry`, get its `ts.SourceFile`.
    *   Determine if internal/external. Increment counts. Add to `dependentModulePaths` set.
    *   (For detailed on-demand output, format a few `ReferenceLocationDetails`, including `referenceType` by inspecting the referring node).
    *   Return `stats` and optional `detailedRefsSample`.
7.  **Implement Main `analyzeDependenciesAndUsage` Function (Usage Part):**
    *   Loop through elements from `apiContractData`.
    *   For each element, find its `ts.Node` in the correct `ts.SourceFile` (using position info from `apiContractData` and `findNodeByPosition`, or by re-traversing and matching names/kinds if positions aren't available).
    *   Get the symbol for the node: `typeChecker.getSymbolAtLocation(node.name || node)`.
    *   Use `languageService.findReferences(filePath, node.name.getStart())` (or equivalent like `ts.FindAllReferences.findReferencingSymbols`) to get reference entries.
    *   Call `processReferences` to get `UsageStats`.
    *   Construct and add `UsageElement` to `usageElements`.
8.  **Finalize `analyzeDependenciesAndUsage`:**
    *   Construct `UsageAnalysisOutput` object using `usageElements` and `moduleDependencies`.
    *   Save using `outputManager`.
    *   Add logging.
9.  **Integrate with `run_cline_analysis.ts`:**
    *   Ensure it runs *after* `api_contract_analyzer.ts`.
    *   Pass the output of API contracts to this analyzer.
10. **(Self-Correction/Refinement):** Test thoroughly. Verify dependency resolution. Check usage counts. Ensure IDs match across analyzers. Test performance on a reasonably sized project.

This analyzer is complex due to its reliance on semantic analysis (reference finding). Careful use of the TypeScript Compiler API is key.
