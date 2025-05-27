# Abstracted Models and Interfaces for Multi-Language Code Analysis

To synthesize the deep structural analysis (like API contracts and dependency graphs from `dev-support-scripts`) with the semantic code indexing across multiple languages, we need abstracted data models (Intermediate Representations - IRs) and stable interfaces for consumers. This document outlines a conceptual design for such a system.

The core idea is that language-specific parser extensions will be responsible for analyzing code in their respective languages and transforming their findings into these common, language-agnostic IRs. Consumers, such as the Qdrant payload enrichment logic for the code index, will interact only with these IRs and stable provider interfaces.

## I. Abstracted Model for API Contracts

This model aims to capture common structural elements of API definitions found across various programming languages.

**1. Core Entity: `CodeEntity`** (Base for all identifiable code structures) - `id`: A unique identifier for the entity (e.g., combining file path, entity name, and start line, or a UUID). - `name`: The primary name of the entity (e.g., function name, class name, interface name). - `kind`: An enumeration representing the type of code entity (e.g., "module", "class", "interface", "struct", "trait", "enum", "function", "method", "constructor", "property", "variable", "constant", "type_alias"). - `filePath`: Relative path to the source file where the entity is defined. - `startLine`, `endLine`: The line numbers defining the entity's span in the source file. - `language`: The programming language of the source file (e.g., "typescript", "python", "java", "go"). - `docstring`: (Optional) Extracted documentation string or comments associated with the entity. - `textualContent`: (Optional) The raw source text of this entity's definition. This can be useful for linking back to the `CodeBlock.content` used by the semantic indexer. - `accessModifier`: (Optional) An enumeration for common access levels (e.g., "public", "private", "protected", "internal", "package"), normalized where possible across languages. - `decoratorsOrAnnotations`: (Optional) An array of strings or structured objects representing the textual names and arguments of decorators or annotations applied to the entity. - `languageSpecificDetails`: (Optional) A flexible `Record<string, any>` for storing details that are highly specific to a language and don't fit the common model (e.g., Python metaclasses, Rust lifetime annotations as text, C++ template parameters as text).

**2. `CallableEntity` (Extends `CodeEntity`; for functions, methods, constructors)** - `parameters`: An array of `ParameterInfo` objects. - `ParameterInfo`: `{ name: string, typeAnnotationText: string, isOptional: boolean, defaultValueText?: string }` - `typeAnnotationText`: The textual representation of the parameter's type annotation as it appears in the source code. - `returnTypeAnnotationText`: A string representing the textual form of the return type annotation. - `isAsync`: (Optional) Boolean, indicating if the callable is asynchronous. - `isGenerator`: (Optional) Boolean, indicating if the callable is a generator. - `isStatic`: (Optional, for methods) Boolean.

**3. `ContainerEntity` (Extends `CodeEntity`; for classes, interfaces, structs, enums, modules)** - `members`: An array of `CodeEntity` objects (or their unique IDs) representing nested members (e.g., methods, properties, inner classes, enum values). - `baseTypes`: (Optional) An array of strings, where each string is the textual name of an inherited base class or an implemented/extended interface/trait.

**4. `PropertyEntity` (Extends `CodeEntity`; for class/struct attributes, interface properties, enum members, module-level variables/constants)** - `typeAnnotationText`: A string representing the textual form of the property's type annotation. - `isConstantOrReadonly`: (Optional) Boolean. - `isStatic`: (Optional, for class properties) Boolean.

**5. `TypeAliasEntity` (Extends `CodeEntity`)** - `aliasedTypeAnnotationText`: A string representing the textual form of the type that this alias refers to.

**Stable Interface for API Contract Consumers: `ApiContractProvider`**

```typescript
interface ApiContractProvider {
	// Identifies the language this provider handles (e.g., "typescript", "python")
	getLanguage(): string

	// Checks if this provider can handle the given file path (e.g., based on extension)
	isSupportedFile(filePath: string): boolean

	// Parses a single file and returns its API contract structure using the IR models
	parseFile(filePath: string, fileContent?: string): Promise<CodeFile | null> // CodeFile would contain a list of CodeEntity
}
```

## II. Abstracted Model for Dependency Graphs

This model represents modules and the import/export relationships between them.

**1. `ModuleNode`** - `id`: Unique identifier (typically the normalized, relative file path). - `filePath`: Relative path to the module file. - `language`: The programming language. - `subsystem`: (Optional) An architectural grouping or subsystem classification. - `exports`: An array of `ExportedSymbolInfo` objects. - `ExportedSymbolInfo`: `{ name: string, kind: CodeEntityKind /* from API contract model */, isDefaultExport?: boolean }` - `imports`: An array of `ImportReferenceInfo` objects. - `ImportReferenceInfo`: `{
              sourceModulePath: string, // The literal string used in the import statement (e.g., "./utils", "lodash")
              resolvedModuleId?: string, // The ID of the ModuleNode this import resolves to, if successful
              importedSymbols?: Array<{ name: string, alias?: string, isTypeOnly?: boolean }>, // Specific symbols imported
              isDynamicImport?: boolean,
              usageLocations?: Array<{ line: number, character: number, contextSnippet?: string }> // Where the import is used
            }`

**Stable Interface for Dependency Graph Consumers: `DependencyGraphProvider`**

```typescript
interface DependencyGraphProvider {
	getLanguage(): string
	isSupportedFile(filePath: string): boolean

	// Analyzes a single file for its direct imports and exports
	getModuleDirectDependencies(filePath: string, fileContent?: string): Promise<ModuleNode | null>

	// (Optional: These might be part of a separate graph construction/querying service)
	// buildGraphFromFiles(rootDirectory: string, allFilePaths: string[]): Promise<void>;
	// getOutgoingDependencies(moduleId: string): Promise<ModuleNode[]>; // Modules this one imports
	// getIncomingDependencies(moduleId: string): Promise<ModuleNode[]>; // Modules that import this one
}
```

## III. Role of Language-Specific Extensions

- **Registration**: Each language-specific extension (e.g., `TypeScriptContractParser`, `PythonDependencyParser`, `JavaTreeSitterContractExtractor`) would register itself, indicating the language(s) it supports and that it implements the `ApiContractProvider` and/or `DependencyGraphProvider` interfaces.
- **Parsing & Transformation**:
    - When a file needs to be analyzed, the system delegates to the appropriate registered extension based on the file's language.
    - The extension uses its best-suited internal parsing technology (e.g., TypeScript Compiler API for TS, Python's `ast` module, or a `tree-sitter`-based extractor for other languages).
    - The core responsibility of the extension is to **transform its detailed, language-specific parse results into the common, abstracted IR models** defined above.
- **Consumption**:
    - Consumers, such as the `code-indexer`'s Qdrant payload enrichment logic, or other analysis tools, interact _only_ with the abstracted IR models via the stable provider interfaces. They remain agnostic to the specific parsing details of each language.

## IV. Synthesizing with the Semantic Code Indexer

When the `code-indexer` processes a file and generates `CodeBlock`s using its `tree-sitter`-based chunking:

1.  It would determine the language of the file.
2.  It would invoke the registered `ApiContractProvider` for that language, calling `parseFile(filePath)`.
3.  From the returned `CodeFile` (containing `CodeEntity` IR objects), it would find the `CodeEntity` that most closely corresponds to the current `CodeBlock` (e.g., by matching `filePath`, `identifier` from `CodeBlock`, and `startLine`/`endLine` ranges).
4.  It would then extract relevant fields from this IR `CodeEntity` (e.g., `kind`, textual parameter/return type annotations, base type names) and add them to the Qdrant payload for the `CodeBlock`'s vector embedding.
5.  Similarly, it could use the `DependencyGraphProvider` to get `ModuleNode` information (like `subsystem` or a summary of file-level imports) to add to the payload.

## Benefits

- **Stable Interfaces for Consumers**: Simplifies tools that need to consume this data.
- **Extensibility**: New languages can be supported by creating new extensions that map to the IR.
- **Decoupling**: Separates language-specific parsing logic from the general consumption of structural code data.
- **Cross-Language Query Potential**: Enables queries that filter or facet on common structural properties (e.g., "find all functions named 'initialize' regardless of language," then refine with semantic search).

## Challenges

- **IR Design Balance**: The IR must be general enough for diverse languages yet specific enough to be useful. Some language-specific nuances might be abstracted away or placed in `languageSpecificDetails`.
- **Depth vs. Generality**: The abstracted IR will likely capture less semantic depth (especially around type systems) than a dedicated, language-specific compiler API (like TypeScript's). The focus is on common structural patterns and textual representations of types/signatures.
- **Implementation Effort**: Developing robust parser extensions for multiple languages to accurately populate the IR is a considerable task.

This abstracted model approach provides a viable path towards a more unified and extensible system for deep codebase analysis, enabling the semantic code index to be enriched with structured, queryable metadata across multiple programming languages.
