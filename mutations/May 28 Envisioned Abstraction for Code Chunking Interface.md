# Envisioned Abstraction for Code Chunking Interface

To better align the code chunking system with the well-abstracted embedding and vector store interfaces, here's an improved design that would allow developers to easily swap chunking strategies:

## Proposed Interface Design

```typescript
/**
 * Interface for code chunking strategies
 */
export interface IChunkingStrategy {
	/**
	 * Unique identifier for the chunking strategy
	 */
	readonly strategyId: string

	/**
	 * Human-readable name of the chunking strategy
	 */
	readonly strategyName: string

	/**
	 * Chunks a code file or content into semantic blocks
	 * @param content The code content to chunk
	 * @param metadata File metadata including language, path, etc.
	 * @param options Optional chunking parameters
	 * @returns Promise resolving to array of code chunks
	 */
	chunkCode(content: string, metadata: CodeFileMetadata, options?: ChunkingOptions): Promise<CodeChunk[]>

	/**
	 * Returns information about supported languages
	 * @returns Array of supported language identifiers
	 */
	getSupportedLanguages(): string[]

	/**
	 * Validates if this strategy can process the given file
	 * @param metadata File metadata to validate
	 * @returns Boolean indicating if this strategy can process the file
	 */
	canProcessFile(metadata: CodeFileMetadata): boolean
}

/**
 * Metadata about a code file
 */
export interface CodeFileMetadata {
	/**
	 * File path
	 */
	filePath: string

	/**
	 * File language identifier (derived from extension)
	 */
	language: string

	/**
	 * File content hash for caching
	 */
	contentHash: string

	/**
	 * Optional additional metadata
	 */
	additionalMetadata?: Record<string, any>
}

/**
 * Options for chunking code
 */
export interface ChunkingOptions {
	/**
	 * Minimum size for a chunk (in characters)
	 */
	minChunkSize?: number

	/**
	 * Target size for a chunk (in characters)
	 */
	targetChunkSize?: number

	/**
	 * Maximum size for a chunk (in characters)
	 */
	maxChunkSize?: number

	/**
	 * Whether to preserve semantic boundaries (functions, classes, etc.)
	 */
	preserveSemanticBoundaries?: boolean

	/**
	 * Strategy-specific options
	 */
	strategySpecificOptions?: Record<string, any>
}

/**
 * Represents a chunk of code with metadata
 */
export interface CodeChunk {
	/**
	 * Unique identifier for the chunk
	 */
	id: string

	/**
	 * The actual code content
	 */
	content: string

	/**
	 * File path the chunk belongs to
	 */
	filePath: string

	/**
	 * Starting line number in the original file
	 */
	startLine: number

	/**
	 * Ending line number in the original file
	 */
	endLine: number

	/**
	 * Type of code structure (function, class, method, etc.)
	 */
	type?: string

	/**
	 * Identifier name if available (function name, class name, etc.)
	 */
	identifier?: string | null

	/**
	 * Content hash for caching
	 */
	contentHash: string

	/**
	 * File content hash
	 */
	fileHash: string

	/**
	 * Additional metadata about the chunk
	 */
	metadata?: Record<string, any>
}

/**
 * Factory for creating chunking strategies
 */
export interface IChunkingStrategyFactory {
	/**
	 * Creates a chunking strategy based on configuration
	 * @param strategyType The type of chunking strategy to create
	 * @param options Optional configuration for the strategy
	 * @returns The created chunking strategy
	 */
	createChunkingStrategy(strategyType: ChunkingStrategyType, options?: Record<string, any>): IChunkingStrategy

	/**
	 * Gets all available chunking strategy types
	 * @returns Array of available strategy types
	 */
	getAvailableStrategies(): ChunkingStrategyType[]
}

/**
 * Available chunking strategy types
 */
export type ChunkingStrategyType =
	| "semantic" // Tree-sitter based semantic chunking
	| "sliding-window" // Simple sliding window chunking
	| "hybrid" // Combination of semantic and sliding window
	| "language-specific" // Language-specific custom chunking
	| string // Allow for extension
```

## Implementation Examples

### Semantic Chunking Strategy (Current Tree-Sitter Approach)

```typescript
export class SemanticChunkingStrategy implements IChunkingStrategy {
	readonly strategyId = "semantic"
	readonly strategyName = "Semantic Code Structure Chunking"

	private languageParsers: LanguageParser = {}

	constructor(private readonly parserOptions?: Record<string, any>) {
		// Initialize language parsers
	}

	async chunkCode(content: string, metadata: CodeFileMetadata, options?: ChunkingOptions): Promise<CodeChunk[]> {
		// Load appropriate parser for the language
		const parser = await this.getParserForLanguage(metadata.language)

		// Parse the content into an AST
		const tree = parser.parse(content)

		// Use tree-sitter to identify semantic structures
		// Transform into CodeChunk objects
		// ...existing tree-sitter logic...

		return chunks
	}

	getSupportedLanguages(): string[] {
		// Return list of languages supported by tree-sitter
		return ["javascript", "typescript", "python" /* etc */]
	}

	canProcessFile(metadata: CodeFileMetadata): boolean {
		return this.getSupportedLanguages().includes(metadata.language)
	}

	// Private helper methods
	private async getParserForLanguage(language: string): Promise<any> {
		// ...
	}
}
```

### Sliding Window Chunking Strategy (Alternative Approach)

```typescript
export class SlidingWindowChunkingStrategy implements IChunkingStrategy {
	readonly strategyId = "sliding-window"
	readonly strategyName = "Sliding Window Chunking"

	constructor(private readonly defaultOptions: Partial<ChunkingOptions> = {}) {}

	async chunkCode(content: string, metadata: CodeFileMetadata, options?: ChunkingOptions): Promise<CodeChunk[]> {
		const mergedOptions = { ...this.defaultOptions, ...options }
		const { targetChunkSize = 1000, minChunkSize = 100, maxChunkSize = 2000 } = mergedOptions

		const lines = content.split("\n")
		const chunks: CodeChunk[] = []

		// Simple sliding window algorithm
		let currentChunk: string[] = []
		let currentSize = 0
		let chunkStartLine = 0

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i]
			const lineSize = line.length + 1 // +1 for newline

			if (currentSize + lineSize > targetChunkSize && currentSize >= minChunkSize) {
				// Create a chunk
				chunks.push(this.createChunk(currentChunk.join("\n"), metadata, chunkStartLine, i - 1))

				// Start a new chunk
				currentChunk = [line]
				currentSize = lineSize
				chunkStartLine = i
			} else {
				// Add to current chunk
				currentChunk.push(line)
				currentSize += lineSize
			}
		}

		// Add the last chunk if it's not empty
		if (currentChunk.length > 0) {
			chunks.push(this.createChunk(currentChunk.join("\n"), metadata, chunkStartLine, lines.length - 1))
		}

		return chunks
	}

	getSupportedLanguages(): string[] {
		// Works with any language
		return ["*"]
	}

	canProcessFile(metadata: CodeFileMetadata): boolean {
		// Can process any file
		return true
	}

	private createChunk(content: string, metadata: CodeFileMetadata, startLine: number, endLine: number): CodeChunk {
		const contentHash = this.hashContent(content)

		return {
			id: this.generateChunkId(metadata.filePath, startLine, contentHash),
			content,
			filePath: metadata.filePath,
			startLine: startLine + 1, // Convert to 1-based
			endLine: endLine + 1, // Convert to 1-based
			type: "sliding_window_chunk",
			identifier: null,
			contentHash,
			fileHash: metadata.contentHash,
			metadata: {
				strategy: this.strategyId,
				language: metadata.language,
			},
		}
	}

	private hashContent(content: string): string {
		// Create a hash of the content
		return createHash("sha256").update(content).digest("hex")
	}

	private generateChunkId(filePath: string, startLine: number, contentHash: string): string {
		// Generate a stable ID for the chunk
		return uuidv5(`${filePath}:${startLine}:${contentHash}`, NAMESPACE_UUID)
	}
}
```

## Integration with Service Factory

```typescript
export class CodeIndexServiceFactory {
	// ...existing code...

	/**
	 * Creates a chunking strategy based on configuration
	 */
	public createChunkingStrategy(): IChunkingStrategy {
		const config = this.configManager.getConfig()
		const strategyType = config.chunkingStrategy || "semantic"

		switch (strategyType) {
			case "semantic":
				return new SemanticChunkingStrategy({
					minComponentLines: config.minComponentLines || 4,
				})

			case "sliding-window":
				return new SlidingWindowChunkingStrategy({
					targetChunkSize: config.targetChunkSize || 1000,
					minChunkSize: config.minChunkSize || 100,
					maxChunkSize: config.maxChunkSize || 2000,
				})

			case "hybrid":
				return new HybridChunkingStrategy({
					fallbackStrategy: "sliding-window",
					preferSemanticForLanguages: ["javascript", "typescript", "python"],
				})

			default:
				throw new Error(`Unknown chunking strategy: ${strategyType}`)
		}
	}

	/**
	 * Creates a code parser with the configured chunking strategy
	 */
	public createCodeParser(): ICodeParser {
		const chunkingStrategy = this.createChunkingStrategy()
		return new ConfigurableCodeParser(chunkingStrategy)
	}

	// ...rest of factory methods...
}
```

## Benefits of This Design

1. **Clear Separation of Concerns**: Separates file handling from the actual chunking logic
2. **Strategy Pattern**: Allows different chunking algorithms to be easily swapped
3. **Configuration-Driven**: Chunking behavior can be configured through settings
4. **Language Agnostic**: Base interface works with any language, with specialization possible
5. **Extensible**: New chunking strategies can be added without modifying existing code
6. **Factory Integration**: Fully integrated with the service factory pattern
7. **Metadata Rich**: Provides detailed information about chunks and their origins

This design would allow developers to easily implement and swap different chunking strategies while maintaining compatibility with the rest of the code index system.
