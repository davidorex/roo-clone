# Implementation Plan: `api_contract_analyzer.ts`

**Date:** May 13, 2025
**Version:** 1.0
**Parent Plan:** [`Implementation Plan - Main.md`](./Implementation%20Plan%20-%20Main.md)
**Overall Spec:** [`May 13 Cline Dev Support Scripts.md`](./May%2013%20Cline%20Dev%20Support%20Scripts.md)

## 1. Purpose

This script will analyze TypeScript source files to extract detailed API contracts for all significant code elements (classes, interfaces, methods, functions, enums, type aliases, and exported constants). This includes signatures, parameter details (name, type, optionality, initializers), return types, visibility, `readonly` status, and heritage. The output is a structured JSON file designed for AI consumption, crucial for understanding how to interact with the codebase and for comparative analysis between versions.

## 2. Dependencies on Shared Components

*   **`LanguageServiceProvider` (from `src/dev_support_scripts/core/languageServiceProvider.ts`):**
    *   To get the TypeScript `ts.Program` and `ts.TypeChecker`.
    *   To get `ts.SourceFile` ASTs.
*   **`UAIModelTypes` (from `src/dev_support_scripts/models/analysisOutputModels.ts`):**
    *   Will use or define `ApiContractsOutput`, `ApiFileElement`, `ApiDefinitionElement`, `ApiMember`, `ApiParameter`, `HeritageClause`.
    ```typescript
    // Example from UAIModelTypes
    interface ApiParameter {
      name: string;
      typeString: string;
      isOptional: boolean;
      initializer?: string; // Text representation of default value
      isRest?: boolean;
    }

    interface ApiMember { // For class/interface members
      id: string;
      name: string;
      kind: 'method' | 'property' | 'constructor' | 'getter' | 'setter';
      visibility: 'public' | 'protected' | 'private'; // TypeScript's interpretation
      isStatic?: boolean;
      isAsync?: boolean;
      isReadonly?: boolean; // For properties
      parameters?: ApiParameter[]; // For methods/constructors/setters
      returnTypeString?: string; // For methods/getters
      typeString?: string; // For properties
      // signatureSummary?: string; // Concise signature
    }

    interface ApiDefinitionElement {
      id: string; // e.g., filePath#ElementName or filePath#ClassName.memberName
      name: string;
      kind: 'class' | 'interface' | 'function' | 'enum' | 'type_alias' | 'const' | 'namespace';
      isExported: boolean;
      // signatureSummary?: string; // Concise signature
      parameters?: ApiParameter[]; // For functions
      returnTypeString?: string; // For functions
      typeString?: string; // For const, type_alias
      members?: ApiMember[]; // For classes, interfaces, enums, namespaces
      heritageClauses?: string[]; // e.g., ["extends BaseClass", "implements IInterface"]
      isReadonly?: boolean; // For top-level const exports
      // stabilityHints?: string[]; // To be populated by docstring analyzer or merged later
    }

    interface ApiFileElement {
      filePath: string; // Relative to project root
      elements: ApiDefinitionElement[];
    }

    interface ApiContractsOutput {
      projectName: string;
      generatedAt: string; // ISO timestamp
      schemaVersion: string;
      files: ApiFileElement[];
    }
    ```
*   **`AnalysisOutputManager` (from `src/dev_support_scripts/core/analysisOutputManager.ts`):**
    *   To save the JSON output.
*   **Orchestration Script (`run_cline_analysis.ts`):**
    *   To invoke this analyzer.

## 3. Core Logic & Implementation Steps

The script `src/dev_support_scripts/analyzers/api_contract_analyzer.ts` will contain:

### 3.1. Main Function (`extractApiContracts`)
*   **Signature:** `async function extractApiContracts(projectRoot: string, filePaths: string[], languageService: LanguageServiceProvider, outputManager: AnalysisOutputManager): Promise<void>`
*   **Steps:**
    1.  Log start of analysis.
    2.  Get `ts.Program` and `ts.TypeChecker` from `languageService`.
    3.  Initialize `allFileApiData: ApiFileElement[] = []`.
    4.  For each `filePath` in `filePaths`:
        a.  Get the `ts.SourceFile` AST node.
        b.  If `sourceFile` exists:
            i.  Create `currentFileApiData: ApiFileElement = { filePath: relativePath(projectRoot, filePath), elements: [] }`.
            ii. Instantiate `ApiContractVisitor`.
            iii. Call `visitor.visitSourceFile(sourceFile, typeChecker, currentFileApiData.elements)`.
            iv. If `currentFileApiData.elements` is not empty, add it to `allFileApiData`.
    5.  Prepare the `ApiContractsOutput` object.
    6.  Use `outputManager.saveAnalysisOutput('api_contracts', 'project_wide', outputData)` to save.
    7.  Log completion.

### 3.2. `ApiContractVisitor` Class
*   **Purpose:** Traverses the TypeScript AST to find all relevant definitions and extract their API contract details.
*   **Constructor:** `constructor(private typeChecker: ts.TypeChecker, private sourceFile: ts.SourceFile, private outputElements: ApiDefinitionElement[])`
*   **Main Method:** `public visitNode(node: ts.Node): void`
*   **Logic for each relevant `ts.Node` kind:**
    *   **Common Logic for all Definitions:**
        1.  Get symbol: `typeChecker.getSymbolAtLocation(node.name || node)`.
        2.  Determine `name`, `kind`.
        3.  Generate unique `id` (e.g., `sourceFile.fileName#name` for top-level, `sourceFile.fileName#ClassName.methodName` for members).
        4.  Check `isExported`: `(ts.getCombinedModifierFlags(node as ts.Declaration) & ts.ModifierFlags.Export) !== 0` or if it's a default export, or if symbol is in `typeChecker.getExportsOfModule(symbol.parent!)`.
    *   **`ts.SyntaxKind.ClassDeclaration`, `ts.SyntaxKind.InterfaceDeclaration`:**
        1.  Extract `name`, `kind`, `id`, `isExported`.
        2.  Extract `heritageClauses` (extends, implements) using `node.heritageClauses` and `typeChecker.typeToString`.
        3.  Create `ApiDefinitionElement`.
        4.  Iterate `node.members`:
            *   For `MethodDeclaration`, `PropertyDeclaration`, `Constructor`, `GetAccessor`, `SetAccessor`:
                *   Call helper to extract `ApiMember` details (see below).
                *   Add to `ApiDefinitionElement.members`.
        5.  Add to `this.outputElements`.
    *   **`ts.SyntaxKind.FunctionDeclaration`:**
        1.  Extract `name`, `kind`, `id`, `isExported`.
        2.  Call helper to get `parameters` and `returnTypeString`.
        3.  Check `isAsync` (modifier or `Promise` return type).
        4.  Create and add `ApiDefinitionElement`.
    *   **`ts.SyntaxKind.EnumDeclaration`:**
        1.  Extract `name`, `kind`, `id`, `isExported`.
        2.  Iterate `node.members` (`EnumMember`) to create `ApiMember` entries (kind: 'property', name, initializer value if present).
        3.  Create and add `ApiDefinitionElement`.
    *   **`ts.SyntaxKind.TypeAliasDeclaration`:**
        1.  Extract `name`, `kind`, `id`, `isExported`.
        2.  Get `typeString` from `node.type.getText(sourceFile)`.
        3.  Create and add `ApiDefinitionElement`.
    *   **`ts.SyntaxKind.VariableStatement` (for exported const/let):**
        1.  Iterate `node.declarationList.declarations`. For each `ts.VariableDeclaration`:
            *   If `(ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0` or symbol is exported.
            *   Extract `name` (`declaration.name.getText()`), `kind: 'const'` (or 'let').
            *   Get `typeString` using `typeChecker.typeToString(typeChecker.getTypeAtLocation(declaration.name))`.
            *   Check `isReadonly` if it's a `const` or has `readonly` modifier.
            *   Get `initializerValue` text if simple literal.
            *   Create and add `ApiDefinitionElement`.
    *   **`ts.SyntaxKind.ModuleDeclaration` (Namespaces):**
        1.  Extract `name`, `kind: 'namespace'`, `id`, `isExported`.
        2.  Recursively visit `node.body` (which can be `ModuleBlock` or another `ModuleDeclaration`) to find members.
        3.  Create and add `ApiDefinitionElement`.
    *   **Recurse:** Call `ts.forEachChild(node, child => this.visitNode(child))` where appropriate (e.g., inside namespaces, but not usually inside functions for API contracts).

### 3.3. Helper for `ApiMember` and `ApiParameter` Extraction
*   **`extractApiMemberDetails(memberNode: ts.ClassElement | ts.TypeElement, classSymbol: ts.Symbol): ApiMember`**
    *   Get `name`, `kind`.
    *   Determine `visibility` using `ts.getCombinedModifierFlags(memberNode)`.
    *   Check `isStatic`, `isAsync`, `isReadonly`.
    *   If method/constructor/accessor:
        *   Get signature: `typeChecker.getSignatureFromDeclaration(memberNode as ts.SignatureDeclaration)`.
        *   Extract `parameters` (see below).
        *   Extract `returnTypeString`.
    *   If property:
        *   Extract `typeString`.
*   **`extractParameters(signature: ts.Signature): ApiParameter[]`**
    *   Iterate `signature.parameters` (symbols).
    *   For each param symbol:
        *   Get `name`.
        *   Get `typeString` using `typeChecker.typeToString(typeChecker.getTypeOfSymbolAtLocation(paramSymbol, paramSymbol.valueDeclaration!))`.
        *   Check `isOptional` (`(paramSymbol.valueDeclaration as ts.ParameterDeclaration).questionToken`).
        *   Get `initializer` text if present (`(paramSymbol.valueDeclaration as ts.ParameterDeclaration).initializer?.getText(sourceFile)`).
        *   Check `isRest` (`(paramSymbol.valueDeclaration as ts.ParameterDeclaration).dotDotDotToken`).

## 4. CLI Integration (via `run_cline_analysis.ts`)

*   The orchestrator will:
    *   Identify all relevant `.ts` and `.tsx` files.
    *   Pass the list of files to `extractApiContracts`.

## 5. Output JSON Structure (Recap)

*   Defined in `UAIModelTypes`.
*   Aggregated project-wide file: `api_contracts_project_wide_YYYYMMDD_HHMMSS.json`.
*   Focus on providing enough detail for AI to understand how to call functions/methods and what data shapes to expect. Summaries can be generated by the AI agent if needed from this detailed data.

## 6. Testing Considerations

*   Test with diverse TypeScript features: classes, interfaces, functions, enums, type aliases, namespaces, generics.
*   Test various export patterns (named, default, re-exports).
*   Test different parameter types, optionality, rest parameters, initializers.
*   Test visibility modifiers, static, async, readonly.
*   Test complex return types and property types.
*   Verify correct `id` generation.

## 7. Atomic Implementation Steps for AI Coder

1.  **Setup:**
    *   Ensure `UAIModelTypes` includes all `Api...` interfaces.
    *   Ensure `LanguageServiceProvider` and `AnalysisOutputManager` are ready.
2.  **Create File:** `src/dev_support_scripts/analyzers/api_contract_analyzer.ts`.
3.  **Import Dependencies:** `ts`, `path`, shared types, services.
4.  **Implement Parameter Extraction Helper:**
    *   `function extractParameters(signature: ts.Signature, typeChecker: ts.TypeChecker, sourceFile: ts.SourceFile): ApiParameter[]`
5.  **Implement Member Extraction Helper:**
    *   `function extractApiMemberDetails(memberNode: ts.ClassElement | ts.TypeElement, typeChecker: ts.TypeChecker, sourceFile: ts.SourceFile): ApiMember` (may need class symbol too for context).
6.  **Implement `ApiContractVisitor` Class:**
    *   Constructor: `(typeChecker: ts.TypeChecker, sourceFile: ts.SourceFile, outputElements: ApiDefinitionElement[])`.
    *   `visitNode(node: ts.Node)` method with `switch(node.kind)`:
        *   Implement logic for `ClassDeclaration`, `InterfaceDeclaration`.
        *   Implement logic for `FunctionDeclaration`.
        *   Implement logic for `EnumDeclaration`.
        *   Implement logic for `TypeAliasDeclaration`.
        *   Implement logic for `VariableStatement` (filtering for exported const/let).
        *   Implement logic for `ModuleDeclaration` (namespaces).
        *   Use helper functions for parameters and members.
        *   Correctly determine `isExported` status for each element.
        *   Generate unique `id` for each element and member.
        *   Populate and push `ApiDefinitionElement` to `outputElements`.
        *   Handle recursion with `ts.forEachChild` appropriately.
7.  **Implement Main `extractApiContracts` Function:**
    *   Signature: `export async function extractApiContracts(projectRoot: string, filePaths: string[], languageService: LanguageServiceProvider, outputManager: AnalysisOutputManager): Promise<void>`
    *   Get `ts.Program`, `ts.TypeChecker`.
    *   Loop `filePaths`, get `ts.SourceFile`.
    *   Instantiate and run `ApiContractVisitor` for each file.
    *   Aggregate results into `ApiContractsOutput`.
    *   Save using `outputManager`.
    *   Add logging.
8.  **Integrate with `run_cline_analysis.ts`**.
9.  **(Self-Correction/Refinement):** Test extensively. Verify accuracy of types, parameters, visibility, export status, and IDs. Ensure all relevant constructs are captured.

This plan details the steps for creating a robust API contract analyzer, which is a cornerstone of the dev support suite.
