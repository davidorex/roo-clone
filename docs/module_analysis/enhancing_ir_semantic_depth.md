# Enhancing IR Semantic Depth for Multi-Language Code Analysis

The challenge of an abstracted Intermediate Representation (IR) "likely capturing less semantic depth" than dedicated language-specific tools is significant. To address this and ensure the IR _does_ reliably capture substantial semantic depth, we need a more ambitious design for both the IR itself and the language analysis extensions that populate it.

The vision is to move towards a system that can build a **Code Knowledge Graph**, where the IR defines the schema for nodes (code symbols) and edges (relationships). The Qdrant vector store, used for semantic search on code text, would then be enriched with denormalized attributes or references from this graph.

## I. Core Principles for a Semantically Deeper IR

1.  **Explicit Semantic Primitives in the IR**: The IR must go beyond basic syntax and textual annotations to explicitly model deeper semantic concepts.
2.  **Tiered Information & Provenance**: The IR should accommodate varying levels of detail from different language analyzers. Information should ideally be tagged with its source or confidence level.
3.  **Pluggable, High-Capability Language Analysis Engines**: The system must rely on language-specific "Analysis Engines" that use the best available tools for that language (Compiler APIs, Language Server Protocol (LSP) interactions, advanced static analyzers, or `tree-sitter` as a fallback).

## II. Refined Abstracted IR Model for Enhanced Semantic Depth

This model expands on previous IR concepts to include more explicit semantic fields.

**1. `CodeSymbol` (Central Entity for any identifiable code element)** - `id`: Global unique identifier (e.g., `language:filePath#canonicalName@startLineOffset`). - `name`: The simple, local name of the symbol (e.g., `myFunction`, `MyClass`). - `canonicalName`: A fully qualified or otherwise unique name within the codebase (e.g., `com.example.package.MyClass.myMethod`, `my_module.my_function`). This is crucial for cross-file references. - `kind`: Detailed type of symbol (e.g., "class", "interface", "struct", "enum", "function", "method", "constructor", "field", "property", "parameter", "variable", "constant", "type_alias", "module", "namespace"). - `language`: The programming language (e.g., "typescript", "python", "java"). - `filePath`: Relative path to the defining file. - `startPosition`: `{ line: number, character: number, offset: number }`. - `endPosition`: `{ line: number, character: number, offset: number }`. - `docstringText`: (Optional) Extracted documentation. - `textContent`: (Optional) The raw source text of this symbol's definition. Useful for linking to the `CodeBlock` content used by the semantic indexer. - `accessModifier`: (Optional, normalized enum: "public", "private", "protected", "internal", "package_private", "file_private"). - `decoratorsOrAnnotations`: (Optional) Array of structured objects: `{ name: string, argumentsText?: string[] }`. - **`typeInfo`**: (Optional) `ResolvedTypeInfo` object, representing the type of this symbol (e.g., type of a variable, return type of a function). - `ResolvedTypeInfo`: - `displayText`: Textual representation as it appears in the source (e.g., `"List[User]"`, `"string[]"`, `"Map<String, Integer>"`). **This is the baseline, always populated if a type annotation exists.** - `canonicalTypeName?`: (Optional) Fully qualified name of the resolved type (e.g., `"java.util.List"`, `"my_project.models.User"`). - `typeKind?`: (Optional, enum: "primitive", "class", "interface", "enum", "function_type", "generic_instance", "union", "intersection", "unknown"). - `definitionSymbolId?`: (Optional) The `id` of the `CodeSymbol` where this type is defined (if resolvable and applicable). - `genericArguments?`: (Optional) Array of `ResolvedTypeInfo` for generic type parameters. - `isArray?`: (Optional) Boolean. - `isOptionalOrNullable?`: (Optional) Boolean. - `analysisProvenance`: (Optional) `{ tool: string, confidence?: number }` (e.g., tool: "typescript_compiler_api", "pylsp_hover_info", "treesitter_syntax"). - `languageSpecificDetails`: (Optional) `Record<string, any>` for truly unique features.

**2. `CallableSymbol` (Extends `CodeSymbol`)** - `parameters`: Array of `CodeSymbol` where `kind` is "parameter". Each parameter `CodeSymbol` has its own `typeInfo`. - `returnTypeInfo`: (Optional) `ResolvedTypeInfo` (this is also the `typeInfo` of the `CallableSymbol` itself). - `calls`: (Optional) Array of `CallLink` objects. - `CallLink`: `{ targetCanonicalName?: string, targetSymbolId?: string /* ID of called symbol */, lineOfCall: number, isDynamicDispatch?: boolean, type: "direct" | "indirect" | "virtual" }`. - `isAsync`, `isGenerator`, `isStatic`, `isAbstract`, `isOverride`.

**3. `ContainerSymbol` (Extends `CodeSymbol`; for classes, interfaces, modules, namespaces)** - `members`: Array of `CodeSymbol` IDs that are defined within this container. - `inheritance`: (Optional) Array of `InheritanceLink`. - `InheritanceLink`: `{ baseTypeCanonicalName?: string, baseTypeSymbolId?: string, kind: ("extends" | "implements" | "mixes_in") }`.

**4. `ModuleSymbol` (Extends `ContainerSymbol`)** - `imports`: Array of `ImportLink`. - `ImportLink`: `{ sourceModulePathString: string, importedSymbols: Array<{ nameInSource: string, alias?: string, resolvedSymbolId?: string /* ID of original symbol */, isTypeOnly?: boolean }> }`. - `exports`: Array of `ExportLink`. - `ExportLink`: `{ exportedName: string, localSymbolId: string }`. - `subsystem`: (Optional) String.

## III. Role of Language Analysis Engines (Extensions)

- **TypeScript Engine**: Leverages `api_contract_analyzer_ts.js` logic (TypeScript Compiler API). Can populate most fields in `ResolvedTypeInfo` (including `canonicalTypeName`, `definitionSymbolId`), detailed `inheritance`, and potentially `calls`.
- **Java/C# Engines**: Would use respective compiler APIs (e.g., Roslyn, Spoon) to achieve similar depth.
- **Python Engine**:
    - **Baseline**: `ast` module + `tree-sitter` for `displayText` in `typeInfo`.
    - **Enhanced**: Integrate with MyPy or a Language Server (e.g., Pyright/Pylance via LSP queries) to populate `canonicalTypeName`, `definitionSymbolId` for types, and resolve some `calls`.
- **Go Engine**: Use `go/parser`, `go/types` for strong typing and interface resolution.
- **Fallback Engines (for other languages)**: Rely primarily on `tree-sitter` to extract syntactic information. They would populate `displayText` for types and basic structural kinds. `canonicalTypeName` and `definitionSymbolId` would often be missing unless simple heuristics can be applied.

## IV. Impact on Qdrant Payload for Code Indexing

The `CodeBlock` (text chunk for semantic embedding) is still the primary unit indexed in Qdrant. Its payload would be enriched by:

1.  Identifying the primary `CodeSymbol`(s) that the `CodeBlock`'s text represents or is part of.
2.  Embedding key, denormalized semantic attributes from the IR of these `CodeSymbol`(s) into the Qdrant payload.
    - `filePath`, `startLine`, `endLine` (from `CodeBlock`).
    - `language` (from `CodeSymbol`).
    - `primarySymbol_id`, `primarySymbol_name`, `primarySymbol_canonicalName`, `primarySymbol_kind`.
    - `primarySymbol_typeInfo_displayText`.
    - `primarySymbol_typeInfo_canonicalTypeName?` (if resolved by the language engine).
    - `primarySymbol_typeInfo_typeKind?`.
    - `primarySymbol_parent_canonicalName?` (e.g., class name for a method).
    - `module_subsystem?`.
    - `module_imports_textual?`: A list of import strings from the file for quick filtering.
    - `analysis_provenance_level?`: A tag indicating the depth of semantic analysis available for this chunk's main symbol (e.g., "full_semantic", "lsp_assisted", "syntactic_only").

## V. Addressing the "Likely Capture Less Depth" Concern

This refined approach addresses the concern by:

1.  **Designing an IR Schema Capable of Holding Depth**: The IR explicitly includes fields for resolved types, definition links, call relationships, etc.
2.  **Mandating Best Effort from Language Engines**: Each language-specific analysis engine is tasked with populating these deep semantic fields to the best of its ability, using the most powerful tools available for that language (Compiler APIs > LSPs > Advanced Static Analyzers > `tree-sitter` + heuristics).
3.  **Graceful Degradation**: If a language engine cannot provide deep semantic information for a field (e.g., `canonicalTypeName`), the field can be omitted or a less precise fallback (like `displayText`) is relied upon. The `analysis_provenance_level` helps consumers understand this.
4.  **Prioritization**: Development effort can be prioritized for language engines where deep semantic analysis tools are mature and readily available (e.g., TypeScript, Java, C#).
5.  **Textual Annotations as Universal Baseline**: The `displayText` for types, extracted syntactically, remains a reliable fallback, ensuring a minimum level of type-related searchability across all languages.

This makes the capture of semantic depth less a matter of "likelihood" of being shallow, and more a reflection of the capabilities of the specific language analysis engine used for each source file. The IR is structured to accept and represent deep semantic information when it can be provided, thus ensuring that the system is _not inherently limited_ to shallow analysis if a powerful enough language engine is plugged in.
