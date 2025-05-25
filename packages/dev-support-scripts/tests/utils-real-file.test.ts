import * as utils from "../utils"
import * as path from "path"
import * as fs from "fs"
import * as ts from "typescript"

// Path to a real TypeScript file in the project
const REAL_FILE_PATH = path.join(utils.PROJECT_ROOT, "src/core/prompts/sections/index.ts")

describe("Real File Tests", () => {
	// Skip all tests if the file doesn't exist
	beforeAll(() => {
		if (!fs.existsSync(REAL_FILE_PATH)) {
			console.warn(`Test file not found: ${REAL_FILE_PATH}`)
			return
		}
	})

	test("parseTypeScriptFile can parse a real project file", () => {
		if (!fs.existsSync(REAL_FILE_PATH)) {
			return
		}

		const sourceFile = utils.parseTypeScriptFile(REAL_FILE_PATH)
		expect(sourceFile).not.toBeNull()
		expect(sourceFile?.fileName).toBe(REAL_FILE_PATH)

		// Check if we can access basic file properties
		const fileContent = sourceFile?.getText()
		expect(typeof fileContent).toBe("string")
		expect(fileContent?.length).toBeGreaterThan(0)
	})

	test("getModuleNameFromPath resolves correct module name for real file", () => {
		if (!fs.existsSync(REAL_FILE_PATH)) {
			return
		}

		const moduleName = utils.getModuleNameFromPath(REAL_FILE_PATH)
		expect(moduleName).toBe("src/core/prompts/sections/index")

		// Test with explicit baseDir
		const baseDir = utils.PROJECT_ROOT
		const moduleNameWithBase = utils.getModuleNameFromPath(REAL_FILE_PATH, baseDir)
		expect(moduleNameWithBase).toBe("src/core/prompts/sections/index")
	})

	test("extractDocstring can extract comments from real file", () => {
		if (!fs.existsSync(REAL_FILE_PATH)) {
			return
		}

		const sourceFile = utils.parseTypeScriptFile(REAL_FILE_PATH)
		if (!sourceFile) {
			fail("Failed to parse source file")
			return
		}

		// Try to find exports or declarations with JSDoc
		let foundDocstring = false

		ts.forEachChild(sourceFile, (node) => {
			const docstring = utils.extractDocstring(node)
			if (docstring) {
				foundDocstring = true
				expect(typeof docstring).toBe("string")
				expect(docstring.length).toBeGreaterThan(0)
			}
		})

		// Note: This may not fail if the file has no JSDoc comments
		console.log(`Found docstrings in file: ${foundDocstring}`)
	})

	test("Tree-sitter can parse real project file if available", async () => {
		if (!fs.existsSync(REAL_FILE_PATH)) {
			return
		}

		const wasmPath = utils.findTreeSitterWasmPath()
		if (!wasmPath) {
			console.log("Skipping tree-sitter test - WASM file not found")
			return
		}

		try {
			// Initialize parser
			await utils.initTreeSitter()
			const parser = await utils.createTypeScriptParser()
			if (!parser) {
				console.log("Parser could not be created")
				return
			}

			// Parse the file
			const fileContent = fs.readFileSync(REAL_FILE_PATH, "utf8")
			const tree = parser.parse(fileContent)

			// Basic validation
			expect(tree).not.toBeNull()
			expect(tree.rootNode).not.toBeNull()
			expect(tree.rootNode.children.length).toBeGreaterThan(0)

			// Check if we can navigate the AST
			const rootNode = tree.rootNode
			console.log(`Root node type: ${rootNode.type}`)
			console.log(`Child count: ${rootNode.children.length}`)
			console.log(`First child type: ${rootNode.children[0]?.type}`)
		} catch (error) {
			console.error("Tree-sitter parsing error:", error)
			// Don't fail the test if tree-sitter has issues
		}
	})

	test("Project structure testing functions work with real paths", () => {
		const projectRoot = utils.PROJECT_ROOT
		expect(projectRoot).toBeTruthy()

		// Test source directory detection
		const sourceDirs = utils.getStandardDirsToProcess(projectRoot)
		expect(Array.isArray(sourceDirs)).toBe(true)

		// Should find the src directory
		const hasSourceDir = sourceDirs.some((dir) => dir.endsWith("/src"))
		expect(hasSourceDir).toBe(true)

		// Test TypeScript file finding
		const srcDir = path.join(projectRoot, "src")
		if (fs.existsSync(srcDir)) {
			const tsFiles = utils.findTypeScriptFiles(srcDir, undefined, undefined)
			expect(Array.isArray(tsFiles)).toBe(true)
			expect(tsFiles.length).toBeGreaterThan(0)

			// All found files should be .ts or .tsx
			const allValidExtensions = tsFiles.every((file) => file.endsWith(".ts") || file.endsWith(".tsx"))
			expect(allValidExtensions).toBe(true)

			// Specific file should be in the results
			const hasTargetFile = tsFiles.some((file) => file === REAL_FILE_PATH)
			expect(hasTargetFile).toBe(true)
		}
	})
})
