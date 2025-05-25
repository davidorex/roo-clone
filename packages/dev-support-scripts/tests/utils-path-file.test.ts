import * as utils from "../utils"
import * as path from "path"
import * as fs from "fs"

// Create test directory
const TEST_DIR = path.join(__dirname, "temp")

// Cleanup helper
function cleanup() {
	if (fs.existsSync(TEST_DIR)) {
		fs.rmSync(TEST_DIR, { recursive: true, force: true })
	}
}

// Setup and cleanup
beforeAll(cleanup)
afterAll(cleanup)

// Path and directory tests
describe("Path and Directory Functions", () => {
	test("ensureDirExists creates nested directories", () => {
		const testPath = path.join(TEST_DIR, "nested/dir")
		utils.ensureDirExists(testPath)
		expect(fs.existsSync(testPath)).toBe(true)
	})

	test("getOutputDir returns correct path with subdirectory", () => {
		const scriptPath = path.join(TEST_DIR, "script.ts")
		const outputDir = utils.getOutputDir(scriptPath, "testsubdir")
		expect(outputDir).toBe(path.join(TEST_DIR, "Output", "testsubdir"))
		expect(fs.existsSync(outputDir)).toBe(true)
	})

	test("getModuleNameFromPath works with different paths", () => {
		const projectRoot = utils.PROJECT_ROOT

		// Test absolute path
		const absPath = path.join(projectRoot, "src/components/Button.ts")
		expect(utils.getModuleNameFromPath(absPath)).toBe("src/components/Button")

		// Test with baseDir
		expect(utils.getModuleNameFromPath(absPath, projectRoot)).toBe("src/components/Button")

		// Test with different extensions
		const tsxPath = path.join(projectRoot, "src/components/Form.tsx")
		expect(utils.getModuleNameFromPath(tsxPath)).toBe("src/components/Form")
	})
})

// File I/O tests
describe("File I/O Functions", () => {
	const testFilePath = path.join(TEST_DIR, "test-file.txt")
	const testJsonPath = path.join(TEST_DIR, "test-file.json")

	beforeEach(() => {
		utils.ensureDirExists(TEST_DIR)
	})

	test("writeFile and readFile work correctly", () => {
		const content = "Test content for file"

		// Write without header
		utils.writeFile(testFilePath, content, false)

		// Read back
		const readContent = utils.readFile(testFilePath)
		expect(readContent).toBe(content)
	})

	test("writeFile adds header when requested", () => {
		const content = "Test content with header"

		// Write with header
		utils.writeFile(testFilePath, content, true)

		// Read back and check for header
		const readContent = utils.readFile(testFilePath)
		expect(readContent).toContain("Generated on:")
		expect(readContent).toContain("Command:")
		expect(readContent).toContain(content)
	})

	test("writeJsonFile and readJsonFile work correctly", () => {
		const data = { test: "value", number: 42, nested: { key: "nested value" } }

		// Write without header
		utils.writeJsonFile(testJsonPath, data, 2, false)

		// Read back
		const readData = utils.readJsonFile(testJsonPath)
		expect(readData).toEqual(data)
	})

	test("readJsonFile handles comments", () => {
		// Create JSON file with comments
		const jsonWithComments =
			"// This is a comment\n" +
			"{\n" +
			'  "key": "value",\n' +
			"  // Another comment\n" +
			'  "number": 42\n' +
			"}"

		fs.writeFileSync(testJsonPath, jsonWithComments)

		// Read back
		const readData = utils.readJsonFile(testJsonPath)
		expect(readData).toEqual({ key: "value", number: 42 })
	})
})

// File finding tests
describe("File Finding Functions", () => {
	beforeEach(() => {
		// Create test directory structure
		utils.ensureDirExists(path.join(TEST_DIR, "src/components"))
		utils.ensureDirExists(path.join(TEST_DIR, "src/utils"))
		utils.ensureDirExists(path.join(TEST_DIR, "node_modules/pkg"))

		// Create test files
		fs.writeFileSync(path.join(TEST_DIR, "src/index.ts"), "")
		fs.writeFileSync(path.join(TEST_DIR, "src/components/Button.tsx"), "")
		fs.writeFileSync(path.join(TEST_DIR, "src/components/Form.ts"), "")
		fs.writeFileSync(path.join(TEST_DIR, "src/utils/helper.ts"), "")
		fs.writeFileSync(path.join(TEST_DIR, "src/utils/helper.test.ts"), "")
		fs.writeFileSync(path.join(TEST_DIR, "node_modules/pkg/index.ts"), "")
	})

	test("findTypeScriptFiles finds correct files", () => {
		const files = utils.findTypeScriptFiles(TEST_DIR)

		// Should find 4 files (excluding test file and node_modules)
		expect(files.length).toBe(4)
		expect(files.some((f) => f.includes("index.ts"))).toBe(true)
		expect(files.some((f) => f.includes("Button.tsx"))).toBe(true)
		expect(files.some((f) => f.includes("Form.ts"))).toBe(true)
		expect(files.some((f) => f.includes("helper.ts"))).toBe(true)

		// Should not include test file
		expect(files.some((f) => f.includes("helper.test.ts"))).toBe(false)

		// Should not include node_modules
		expect(files.some((f) => f.includes("node_modules"))).toBe(false)
	})

	test("walkDirectoryTree applies callback to each item", () => {
		const items: string[] = []

		utils.walkDirectoryTree(path.join(TEST_DIR, "src"), (itemPath) => {
			items.push(path.basename(itemPath))
		})

		// Should include all non-excluded directories and files
		expect(items).toContain("components")
		expect(items).toContain("utils")
		expect(items).toContain("index.ts")
		expect(items).toContain("Button.tsx")
		expect(items).toContain("Form.ts")
		expect(items).toContain("helper.ts")
	})
})
