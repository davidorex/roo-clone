import * as utils from "../utils"
import Parser from "web-tree-sitter"

/**
 * Tests for Tree-sitter query functionality
 * These tests validate the tree-sitter query creation and handling
 */
describe("createTypeScriptQuery", () => {
	let parser: Parser | null = null

	// Initialize parser once for all tests
	beforeAll(async () => {
		try {
			await utils.initTreeSitter()
			parser = await utils.createTypeScriptParser()
		} catch (error) {
			console.error("Tree-sitter initialization error:", error)
		}
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
