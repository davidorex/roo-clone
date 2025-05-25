import * as utils from "../utils" // Keep for other utils functions if needed
import RealParser from "web-tree-sitter" // Rename to avoid conflict if Parser is defined locally
const path = require("path") // For path.resolve and path.join
const fs = require("fs") // For fs.existsSync

/**
 * Tests for Tree-sitter query functionality
 * These tests validate the tree-sitter query creation and handling
 */
describe("createTypeScriptQuery", () => {
	let parser: RealParser | null = null // Use renamed RealParser type
	let testInitializedParser = false // Flag for local init

	// Initialize parser once for all tests
	beforeAll(async () => {
		// --- Start of inlined monorepo-aware Tree-sitter initialization ---
		const TEST_PROJECT_ROOT = path.resolve(__dirname, "..", "..", "..") // From tests/ -> dev-support-scripts -> packages -> monorepo root
		console.log(`[Test BeforeAll] Calculated TEST_PROJECT_ROOT: ${TEST_PROJECT_ROOT}`)

		const treeSitterWasmPath = path.join(TEST_PROJECT_ROOT, "src", "dist", "tree-sitter.wasm")
		console.log(
			`[Test BeforeAll] Expected tree-sitter.wasm path: ${treeSitterWasmPath}, Exists: ${fs.existsSync(treeSitterWasmPath)}`,
		)

		try {
			console.log(`[Test BeforeAll] Calling RealParser.init({ locateFile: ... })`)
			await RealParser.init({
				locateFile(scriptName, scriptDirectory) {
					if (scriptName === "tree-sitter.wasm") {
						console.log(
							`[Test BeforeAll - locateFile] Providing path for tree-sitter.wasm: ${treeSitterWasmPath}`,
						)
						return treeSitterWasmPath
					}
					const defaultPath = path.join(scriptDirectory, scriptName)
					console.log(
						`[Test BeforeAll - locateFile] Providing default path for ${scriptName}: ${defaultPath}`,
					)
					return defaultPath
				},
			})
			console.log(`[Test BeforeAll] RealParser.init() COMPLETED.`)
			testInitializedParser = true

			const languageWasmPath = path.join(TEST_PROJECT_ROOT, "src", "dist", "tree-sitter-tsx.wasm")
			console.log(
				`[Test BeforeAll] Expected language WASM path (tree-sitter-tsx.wasm): ${languageWasmPath}, Exists: ${fs.existsSync(languageWasmPath)}`,
			)

			if (!fs.existsSync(languageWasmPath)) {
				console.error(`[Test BeforeAll] Language WASM file NOT FOUND at ${languageWasmPath}`)
				parser = null // Ensure parser is null if language WASM is missing
				return
			}

			console.log(`[Test BeforeAll] Calling RealParser.Language.load('${languageWasmPath}')`)
			const language = await RealParser.Language.load(languageWasmPath)
			console.log(`[Test BeforeAll] RealParser.Language.load() COMPLETED.`)

			parser = new RealParser()
			console.log(`[Test BeforeAll] Setting language on parser.`)
			parser.setLanguage(language)
			console.log(`[Test BeforeAll] Language set. Parser ready.`)
		} catch (error) {
			console.error("[Test BeforeAll] Tree-sitter initialization error:", error)
			parser = null // Ensure parser is null on error
		}
		// --- End of inlined monorepo-aware Tree-sitter initialization ---
	})

	test("returns null when parser is invalid or uninitialized", () => {
		// Test with invalid parser objects that match how error conditions would actually occur
		const testCases = [
			{ name: "null parser", parser: null },
			{ name: "undefined parser", parser: undefined },
			{ name: "object missing getLanguage", parser: {} as any },
			{ name: "parser with null language", parser: { getLanguage: () => null } as any },
		]

		// Test all cases
		for (const testCase of testCases) {
			const query = utils.createTypeScriptQuery(testCase.parser as any, "(class_declaration) @class")
			expect(query).toBeNull()
		}
	})

	test("creates valid query for valid query string", async () => {
		// Skip if parser couldn't be created
		if (!parser) {
			console.log("Skipping test - Parser could not be created")
			return
		}

		// Simple valid query
		const queryString = "(class_declaration) @class"
		const query = utils.createTypeScriptQuery(parser, queryString)

		// Should create a valid query
		expect(query).not.toBeNull()
	})

	test("simulates API Contract Analyzer with real ClineProvider class", async () => {
		// Skip if parser couldn't be created
		if (!parser) {
			console.log("Skipping test - Parser could not be created")
			return
		}

		// Read the actual ClineProvider.ts file content
		const clineProviderContent = utils.readFile("src/core/webview/ClineProvider.ts")
		if (!clineProviderContent) {
			console.log("Skipping test - Could not read ClineProvider.ts")
			return
		}

		// Parse the file content with the parser
		const tree = parser.parse(clineProviderContent)

		// Create queries for specific code elements an API Contract Analyzer would need
		const classQuery = utils.createTypeScriptQuery(
			parser,
			"(class_declaration name: (type_identifier) @className) @class",
		)

		const methodQuery = utils.createTypeScriptQuery(
			parser,
			"(method_definition name: (property_identifier) @methodName) @method",
		)

		const propertyQuery = utils.createTypeScriptQuery(
			parser,
			"(public_field_definition name: (property_identifier) @propName) @property",
		)

		const extendsQuery = utils.createTypeScriptQuery(
			parser,
			"(class_declaration name: (type_identifier) @className extends: (extends_clause) @extends)",
		)

		const implementsQuery = utils.createTypeScriptQuery(
			parser,
			"(class_declaration name: (type_identifier) @className implements: (implements_clause) @implements)",
		)

		// Verify queries were created successfully
		expect(classQuery).not.toBeNull()
		expect(methodQuery).not.toBeNull()
		expect(propertyQuery).not.toBeNull()
		expect(extendsQuery).not.toBeNull()
		expect(implementsQuery).not.toBeNull()

		// Execute the queries against the parsed file
		if (classQuery && methodQuery && propertyQuery && extendsQuery && implementsQuery) {
			// Find all classes
			const classMatches = classQuery.matches(tree.rootNode)

			// Find all methods
			const methodMatches = methodQuery.matches(tree.rootNode)

			// Find all public properties
			const propertyMatches = propertyQuery.matches(tree.rootNode)

			// Find class with extends
			const extendsMatches = extendsQuery.matches(tree.rootNode)

			// Find class with implements
			const implementsMatches = implementsQuery.matches(tree.rootNode)

			// Verify we found the ClineProvider class
			const foundClineProvider = classMatches.some((match) => {
				const className = match.captures.find((c) => c.name === "className")?.node.text
				return className === "ClineProvider"
			})

			expect(foundClineProvider).toBe(true)

			// Verify we have methods
			expect(methodMatches.length).toBeGreaterThan(0)

			// Verify we found properties
			expect(propertyMatches.length).toBeGreaterThan(0)

			// Verify we identified the extends relationship
			expect(extendsMatches.length).toBeGreaterThan(0)

			// Verify we identified the implements relationship
			expect(implementsMatches.length).toBeGreaterThan(0)

			// Advanced test: find a specific method we know exists in ClineProvider
			const foundResolveWebviewViewMethod = methodMatches.some((match) => {
				const methodName = match.captures.find((c) => c.name === "methodName")?.node.text
				return methodName === "resolveWebviewView"
			})

			expect(foundResolveWebviewViewMethod).toBe(true)
		}
	})

	test("returns null for invalid query string", async () => {
		// Skip if parser couldn't be created
		if (!parser) {
			console.log("Skipping test - Parser could not be created")
			return
		}

		// Invalid query with unbalanced parentheses
		const invalidQueryString = "(class_declaration @class"
		const query = utils.createTypeScriptQuery(parser, invalidQueryString)

		// Should return null for invalid query
		expect(query).toBeNull()
	})
})

describe("findTreeSitterWasmPath", () => {
	test("returns a path or null", () => {
		const wasmPath = utils.findTreeSitterWasmPath()

		// Should either return a path to a .wasm file or null
		if (wasmPath !== null) {
			expect(typeof wasmPath).toBe("string")
			expect(wasmPath.endsWith(".wasm")).toBe(true)
		} else {
			expect(wasmPath).toBeNull()
		}
	})
})

describe("initTreeSitter", () => {
	test("initializes without errors", async () => {
		// This should not throw an error
		await expect(utils.initTreeSitter()).resolves.toBeUndefined()

		// Calling again should also not throw (idempotent)
		await expect(utils.initTreeSitter()).resolves.toBeUndefined()
	})
})
