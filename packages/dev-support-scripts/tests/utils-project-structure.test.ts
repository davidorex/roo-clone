import * as utils from "../utils"
import * as path from "path"
import * as fs from "fs"

/**
 * Tests for project structure functions
 * These tests validate the project directory detection and processing
 */
describe("getProjectBaseDir", () => {
	test("returns current working directory", () => {
		const projectDir = utils.getProjectBaseDir()

		// Should match process.cwd()
		expect(projectDir).toBe(process.cwd())

		// Should be an absolute path
		expect(path.isAbsolute(projectDir)).toBe(true)

		// Should be a directory that exists
		expect(fs.existsSync(projectDir)).toBe(true)
		expect(fs.statSync(projectDir).isDirectory()).toBe(true)
	})
})

describe("getStandardDirsToProcess", () => {
	// Create test directory structure
	const TEST_DIR = path.join(__dirname, "test-project")

	beforeAll(() => {
		// Clean up any existing test directory
		if (fs.existsSync(TEST_DIR)) {
			fs.rmSync(TEST_DIR, { recursive: true, force: true })
		}

		// Create test project directory structure
		fs.mkdirSync(TEST_DIR, { recursive: true })
		fs.mkdirSync(path.join(TEST_DIR, "src"), { recursive: true })
		fs.mkdirSync(path.join(TEST_DIR, "app"), { recursive: true })
		fs.mkdirSync(path.join(TEST_DIR, "tests"), { recursive: true })
		fs.mkdirSync(path.join(TEST_DIR, "node_modules"), { recursive: true }) // Should be excluded
	})

	afterAll(() => {
		// Clean up test directory
		if (fs.existsSync(TEST_DIR)) {
			fs.rmSync(TEST_DIR, { recursive: true, force: true })
		}
	})

	test("finds standard directories in project", () => {
		const dirs = utils.getStandardDirsToProcess(TEST_DIR)

		// Should find src, app, and tests directories
		expect(dirs.length).toBeGreaterThanOrEqual(3)

		// Convert to relative paths for easier comparison
		const relativeDirs = dirs.map((dir) => path.relative(TEST_DIR, dir))

		expect(relativeDirs).toContain("src")
		expect(relativeDirs).toContain("app")
		expect(relativeDirs).toContain("tests")

		// Should not include node_modules
		expect(relativeDirs).not.toContain("node_modules")
	})

	test("sorts directories in consistent order", () => {
		const dirs = utils.getStandardDirsToProcess(TEST_DIR)

		// Convert to relative paths
		const relativeDirs = dirs.map((dir) => path.relative(TEST_DIR, dir))

		// Create a copy and sort it to compare
		const sortedCopy = [...relativeDirs].sort()

		// The returned directories should already be sorted
		expect(relativeDirs).toEqual(sortedCopy)
	})

	test("returns empty array for non-existent directory", () => {
		const nonExistentDir = path.join(TEST_DIR, "does-not-exist")
		const dirs = utils.getStandardDirsToProcess(nonExistentDir)

		expect(Array.isArray(dirs)).toBe(true)
		expect(dirs.length).toBe(0)
	})
})
