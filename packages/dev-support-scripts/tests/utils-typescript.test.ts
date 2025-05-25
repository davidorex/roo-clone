import * as utils from "../utils"
import * as path from "path"
import * as fs from "fs"
import * as ts from "typescript"

// Setup test directory
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

// Create TypeScript test files
beforeEach(() => {
	utils.ensureDirExists(TEST_DIR)

	// Create a test TypeScript file with various elements
	const testFile = `
/**
 * Test module docstring
 * @module TestModule
 */
import { Component } from 'react';
import * as utils from './utils';

/**
 * Interface for user data
 */
interface UserData {
  id: number;
  name: string;
  email?: string;
}

/**
 * Component class docstring
 * @class TestComponent
 */
class TestComponent {
  /**
   * Class property with docstring
   */
  private userData: UserData;
  
  /**
   * Constructor docstring
   * @param initialData Initial user data
   */
  constructor(initialData: UserData) {
    this.userData = initialData;
  }
  
  /**
   * Method docstring
   * @param id User ID to find
   * @returns Found user or null
   */
  findUserById(id: number): UserData | null {
    return this.userData.id === id ? this.userData : null;
  }
}

/**
 * Function docstring
 * @param name User name
 * @returns Greeting message
 */
function greetUser(name: string): string {
  return \`Hello, \${name}!\`;
}

export { TestComponent, greetUser };
`

	fs.writeFileSync(path.join(TEST_DIR, "test-component.ts"), testFile)
})

// TypeScript parsing tests
describe("TypeScript Parsing Functions", () => {
	test("parseTypeScriptFile returns a valid SourceFile", () => {
		const filePath = path.join(TEST_DIR, "test-component.ts")
		const sourceFile = utils.parseTypeScriptFile(filePath)

		expect(sourceFile).not.toBeNull()
		expect(sourceFile?.fileName).toBe(filePath)
		expect(sourceFile?.statements.length).toBeGreaterThan(0)
	})

	test("parseTypeScriptFile returns null for non-existent file", () => {
		const filePath = path.join(TEST_DIR, "non-existent.ts")
		const sourceFile = utils.parseTypeScriptFile(filePath)

		expect(sourceFile).toBeNull()
	})

	test("extractDocstring finds JSDoc comments correctly", () => {
		const filePath = path.join(TEST_DIR, "test-component.ts")
		const sourceFile = utils.parseTypeScriptFile(filePath)

		if (!sourceFile) {
			fail("Source file parsing failed")
			return
		}

		// Find the class declaration
		let testClass: ts.ClassDeclaration | null = null
		ts.forEachChild(sourceFile, (node) => {
			if (ts.isClassDeclaration(node) && node.name?.getText() === "TestComponent") {
				testClass = node
			}
		})

		if (!testClass) {
			fail("TestComponent class not found")
			return
		}

		// Extract the docstring
		const docstring = utils.extractDocstring(testClass)
		expect(docstring).toContain("Component class docstring")
		expect(docstring).toContain("@class TestComponent")
	})

	test("extractDocstring finds method docstrings", () => {
		const filePath = path.join(TEST_DIR, "test-component.ts")
		const sourceFile = utils.parseTypeScriptFile(filePath)

		if (!sourceFile) {
			fail("Source file parsing failed")
			return
		}

		// Find the findUserById method
		let findUserMethod: ts.MethodDeclaration | null = null

		function findMethod(node: ts.Node) {
			if (ts.isMethodDeclaration(node) && node.name.getText() === "findUserById") {
				findUserMethod = node
			}
			ts.forEachChild(node, findMethod)
		}

		ts.forEachChild(sourceFile, findMethod)

		if (!findUserMethod) {
			fail("findUserById method not found")
			return
		}

		// Extract the docstring
		const docstring = utils.extractDocstring(findUserMethod)
		expect(docstring).toContain("Method docstring")
		expect(docstring).toContain("@param id")
		expect(docstring).toContain("@returns Found user")
	})

	test("extractDocstring finds function docstrings", () => {
		const filePath = path.join(TEST_DIR, "test-component.ts")
		const sourceFile = utils.parseTypeScriptFile(filePath)

		if (!sourceFile) {
			fail("Source file parsing failed")
			return
		}

		// Find the greetUser function
		let greetUserFunction: ts.FunctionDeclaration | null = null
		ts.forEachChild(sourceFile, (node) => {
			if (ts.isFunctionDeclaration(node) && node.name?.getText() === "greetUser") {
				greetUserFunction = node
			}
		})

		if (!greetUserFunction) {
			fail("greetUser function not found")
			return
		}

		// Extract the docstring
		const docstring = utils.extractDocstring(greetUserFunction)
		expect(docstring).toContain("Function docstring")
		expect(docstring).toContain("@param name")
		expect(docstring).toContain("@returns Greeting")
	})
})

// Tree-sitter tests - conditional, since WASM files might not be available
describe("Tree-sitter Integration Functions", () => {
	test("findTreeSitterWasmPath returns path or null", () => {
		const wasmPath = utils.findTreeSitterWasmPath()

		// This could be null in test environments without the WASM files
		expect(wasmPath === null || typeof wasmPath === "string").toBe(true)

		if (wasmPath) {
			expect(wasmPath.endsWith(".wasm")).toBe(true)
		}
	})

	test("initTreeSitter initializes parser without errors", async () => {
		// This should not throw an error
		await expect(utils.initTreeSitter()).resolves.toBeUndefined()
	})

	test("createTypeScriptParser can create parser if WASM is available", async () => {
		const wasmPath = utils.findTreeSitterWasmPath()

		if (!wasmPath) {
			// Skip this test if WASM file is not available
			console.log("Skipping tree-sitter parser test - WASM file not found")
			return
		}

		const parser = await utils.createTypeScriptParser()
		expect(parser).not.toBeNull()
	})
})
