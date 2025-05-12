# Implementation Plan: `test_coverage_analyzer.ts` (Robust Version)

**Date:** May 13, 2025
**Version:** 1.0
**Parent Plan:** [`Implementation Plan - Main.md`](./Implementation%20Plan%20-%20Main.md)
**Overall Spec:** [`May 13 Cline Dev Support Scripts.md`](./May%2013%20Cline%20Dev%20Support%20Scripts.md)

## 1. Purpose

This script will analyze TypeScript test files and production code to provide a reasonably accurate mapping of which production code elements (functions, methods, classes) are covered by which test cases. It aims to identify not just if an element is imported by a test, but if it's actively used or asserted against. The output will help AI agents assess the risk of modifying code and guide them in updating or adding tests.

## 2. Dependencies on Shared Components

*   **`LanguageServiceProvider` (from `src/dev_support_scripts/core/languageServiceProvider.ts`):**
    *   To get `ts.Program`, `ts.TypeChecker`, and `ts.SourceFile` ASTs for both production and test files.
    *   For symbol resolution (`typeChecker.getSymbolAtLocation`, `typeChecker.getAliasedSymbol`) to link test usages back to production code declarations.
    *   For reference finding (`findReferences`) if needed to trace symbols.
*   **`UAIModelTypes` (from `src/dev_support_scripts/models/analysisOutputModels.ts`):**
    *   Will use or define `TestCoverageOutput`, `TestCoverageItem`, `CoveringTestData`, `TestCoverageSummary`.
    ```typescript
    // Example from UAIModelTypes
    interface CoveringTestData {
      testFilePath: string; // Relative to project root
      testCaseName: string; // e.g., "describe > it" or function name
      relevantAssertionSnippets?: string[]; // Sample of key assertions related to the production element
      mockedDependencies?: string[]; // IDs of dependencies of the production element that were mocked
    }

    interface TestCoverageItem {
      productionElementId: string; // Matches ID from api_contracts, e.g., filePath#ElementName.SubElement
      filePath: string; // Production file path
      elementName: string; // Production element name
      kind: string; // Production element kind
      isCovered: boolean;
      coverageConfidence: 'high' | 'medium' | 'low' | 'none'; // Heuristic
      coveringTests: CoveringTestData[];
      uncoveredAspects?: string[]; // Optional: Heuristically identified aspects not covered
    }

    interface TestCoverageSummary {
      totalProductionElements: number;
      coveredElements: number;
      coveragePercentage: number;
    }

    interface TestCoverageOutput {
      projectName: string;
      generatedAt: string; // ISO timestamp
      schemaVersion: string;
      coverageData: TestCoverageItem[];
      summary: TestCoverageSummary;
    }
    ```
*   **`AnalysisOutputManager` (from `src/dev_support_scripts/core/analysisOutputManager.ts`):**
    *   To save the JSON output.
*   **Output from `api_contract_analyzer.ts` (Implicit Dependency):**
    *   Needs the list of all production code elements and their IDs to map coverage against.
*   **Orchestration Script (`run_cline_analysis.ts`):**
    *   To invoke this analyzer.

## 3. Core Logic & Implementation Steps

The script `src/dev_support_scripts/analyzers/test_coverage_analyzer.ts` will contain:

### 3.1. Main Function (`analyzeTestCoverage`)
*   **Signature:** `async function analyzeTestCoverage(projectRoot: string, allSourceFilePaths: string[], testFilePatterns: string[], languageService: LanguageServiceProvider, apiContractData: ApiContractsOutput, outputManager: AnalysisOutputManager): Promise<void>`
    *   `allSourceFilePaths`: All `.ts`/`.tsx` files in the project.
    *   `testFilePatterns`: Glob patterns to identify test files (e.g., `**/*.test.ts`, `**/*.spec.ts`).
    *   `apiContractData`: Output from `api_contract_analyzer.ts`.
*   **Steps:**
    1.  Log start of analysis.
    2.  Get `ts.Program` and `ts.TypeChecker` from `languageService` (ensure it includes all source and test files).
    3.  Identify production files vs. test files from `allSourceFilePaths` using `testFilePatterns`.
    4.  Initialize `coverageDataMap: Map<string, TestCoverageItem>`. Pre-populate this map with all production elements from `apiContractData`, marking them initially as `isCovered: false`.
    5.  For each identified `testFilePath`:
        a.  Get its `ts.SourceFile`.
        b.  Instantiate `TestFileVisitor`.
        c.  Call `visitor.analyzeTestFile(testSourceFile, typeChecker, program)` to get a list of production symbols referenced/asserted within that test file, along with test case context.
        d.  For each production symbol found by the visitor:
            i.  Resolve it to its declaration to get its unique `productionElementId`.
            ii. If `productionElementId` exists in `coverageDataMap`:
                *   Mark `isCovered = true`.
                *   Update `coverageConfidence` (e.g., "medium" for direct usage, "low" for import-only).
                *   Add `CoveringTestData` (test file path, test case name, assertion snippets, mocks) to the `coveringTests` array for that `productionElementId`.
    6.  Convert `coverageDataMap.values()` into an array for `TestCoverageOutput.coverageData`.
    7.  Calculate `TestCoverageSummary`.
    8.  Prepare the `TestCoverageOutput` object.
    9.  Use `outputManager.saveAnalysisOutput('test_coverage', 'project_wide', outputData)` to save.
    10. Log completion.

### 3.2. `TestFileVisitor` Class
*   **Purpose:** Traverses a test file's AST to find references to production code and details of test cases.
*   **Constructor:** `constructor(private typeChecker: ts.TypeChecker, private program: ts.Program, private testFilePath: string)`
*   **Main Method:** `public analyzeTestFile(testSourceFile: ts.SourceFile): Array<{ productionSymbol: ts.Symbol, testCaseName: string, assertions: string[], mocks: string[] }>`
*   **Internal State:** `currentDescribeBlocks: string[]`, `currentTestCaseName?: string`.
*   **Logic:**
    1.  Use `ts.forEachChild` to traverse the `testSourceFile`.
    2.  **Identify Test Scopes:**
        *   On encountering `describe` calls: Push block name to `currentDescribeBlocks`. Pop on exit.
        *   On encountering `it` or `test` calls: Set `currentTestCaseName` (e.g., joined `describe` names + `it` name). Clear on exit.
    3.  **Identify Production Code Usages:**
        *   Inside test cases, look for `ts.SyntaxKind.Identifier` and `ts.SyntaxKind.PropertyAccessExpression`.
        *   For each, get its symbol: `typeChecker.getSymbolAtLocation(identifierNode)`.
        *   If the symbol has a declaration (`symbol.valueDeclaration` or `symbol.declarations?.[0]`):
            *   Get the `ts.SourceFile` of the declaration: `declaration.getSourceFile()`.
            *   If this source file is *not* a test file (i.e., it's production code):
                *   This is a usage of production code. Store the `productionSymbol`, current `testCaseName`.
                *   Extract nearby assertion snippets and mock information related to this usage.
    4.  **Extract Assertion Snippets:**
        *   When a production symbol usage is found, look in the surrounding AST (e.g., parent `CallExpression` if it's an `expect().toEqual()` chain) for assertion text.
    5.  **Extract Mock Information:**
        *   Look for `jest.mock()`, `vi.mock()`, `sinon.stub()` calls. Record the mocked module path or object/method being mocked. Associate this with the current test case.

### 3.3. Helper for Symbol to ID Conversion
*   A utility `getProductionElementId(symbol: ts.Symbol, typeChecker: ts.TypeChecker): string | undefined` will be needed to generate the same unique IDs used by `api_contract_analyzer.ts`. This involves getting the symbol's primary declaration, its source file, and constructing the ID.

## 4. CLI Integration (via `run_cline_analysis.ts`)

*   The orchestrator will:
    *   Run `api_contract_analyzer.ts` first.
    *   Identify all source files and test files (e.g., using glob patterns like `src/**/*.ts` and `src/**/*.test.ts`).
    *   Invoke `analyzeTestCoverage`, passing all file paths, test patterns, the `LanguageServiceProvider`, and the API contract data.

## 5. Output JSON Structure (Recap)

*   Defined in `UAIModelTypes`.
*   Aggregated project-wide file: `test_coverage_project_wide_YYYYMMDD_HHMMSS.json`.
*   Focus on linking production elements to specific test cases. Detailed assertion text and mock info should be summarized or sampled to manage token count.

## 6. Testing Considerations

*   Test with various testing frameworks/styles if possible (though focus on common patterns like `describe`/`it`).
*   Test different ways production code is imported and used in tests.
*   Test symbol resolution for aliased imports, re-exports.
*   Verify accuracy of `coverageConfidence` heuristic.
*   Test with files that have no tests, and production files that are not used in any test.

## 7. Atomic Implementation Steps for AI Coder

1.  **Setup:**
    *   Ensure `UAIModelTypes` includes `TestCoverageOutput`, `TestCoverageItem`, `CoveringTestData`, `TestCoverageSummary`.
    *   Ensure `LanguageServiceProvider`, `AnalysisOutputManager`, and `ApiContractsOutput` type are available.
2.  **Create File:** `src/dev_support_scripts/analyzers/test_coverage_analyzer.ts`.
3.  **Import Dependencies:** `ts`, `path`, `glob` (for test file patterns), shared types, services.
4.  **Implement `getProductionElementId` Utility:**
    *   Takes `ts.Symbol` and `ts.TypeChecker`.
    *   Finds the primary declaration of the symbol.
    *   Constructs the unique ID string (e.g., `relativeFilePath#ClassName.methodName` or `relativeFilePath#functionName`) consistent with `api_contract_analyzer.ts`.
5.  **Implement `TestFileVisitor` Class:**
    *   Constructor: `(typeChecker: ts.TypeChecker, program: ts.Program, testFilePath: string)`.
    *   `analyzeTestFile(testSourceFile: ts.SourceFile)` method:
        *   Initialize `currentDescribeBlocks = []`, `foundProductionUsages = []`.
        *   Implement `visitNode(node: ts.Node)` recursive helper.
        *   Inside `visitNode`:
            *   Detect `describe`, `it`, `test` calls to track `currentTestCaseName`.
            *   For `Identifier` and `PropertyAccessExpression` nodes within test cases:
                *   Get symbol using `typeChecker.getSymbolAtLocation()`.
                *   Resolve aliased symbols: `typeChecker.getAliasedSymbol()`.
                *   Get symbol's declaration and its source file.
                *   If declaration is in a non-test (production) file, record `productionSymbol`, `testCaseName`.
                *   Helper to find surrounding assertion text (e.g., up to 3 parent nodes, get text).
                *   Helper to find associated `jest.mock` or similar calls (scan current scope or file-level).
        *   Return `foundProductionUsages`.
6.  **Implement Main `analyzeTestCoverage` Function:**
    *   Signature as defined in 3.1.
    *   Get `ts.Program`, `ts.TypeChecker`.
    *   Use `glob` or similar to expand `testFilePatterns` against `allSourceFilePaths` to get actual test file list. Differentiate production files.
    *   Initialize `coverageDataMap` from `apiContractData` (all production elements marked `isCovered: false`).
    *   Loop through each `testFilePath`:
        *   Get `ts.SourceFile`.
        *   Instantiate `TestFileVisitor`.
        *   Call `visitor.analyzeTestFile(...)`.
        *   For each `productionUsage` returned:
            *   Call `getProductionElementId(productionUsage.productionSymbol, typeChecker)` to get the ID.
            *   Update the corresponding entry in `coverageDataMap`: set `isCovered = true`, add `CoveringTestData`.
            *   Determine `coverageConfidence` (e.g., "medium" if direct usage found, "low" if only imported).
    *   Convert map to `TestCoverageItem[]`.
    *   Calculate `TestCoverageSummary`.
    *   Construct `TestCoverageOutput`.
    *   Save using `outputManager`.
    *   Add logging.
7.  **Integrate with `run_cline_analysis.ts`:**
    *   Ensure it runs after `api_contract_analyzer.ts`.
    *   Pass necessary file lists, patterns, and API contract data.
8.  **(Self-Correction/Refinement):** Test with actual project test files. Verify that production code usages are correctly linked. Check if assertion snippets and mock data are relevant and not too verbose. Refine `coverageConfidence` heuristic.

This plan aims for a robust test coverage analyzer that provides meaningful insights for AI agents.
