#!/usr/bin/env node
/**
 * Docstring Extractor for JavaScript (patterned after existing .js scripts)
 *
 * This script analyzes TypeScript modules to extract JSDoc-style comments
 * (docstrings) from various code elements like classes, methods, functions, etc.
 * It aims to create a structured inventory of documentation within the codebase.
 */

const fs = require("fs").promises // Use promises API for async file operations
const path = require("path")
const ts = require("typescript")
const utils = require("./utils") // Direct require for .js file
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads")
const os = require("os")

// Define the output directory for docstring inventories
const DOCSTRING_INVENTORY_DIR = path.join(utils.SCRIPT_DIR, "docstring_inventory")

// Interfaces would typically be in a .d.ts file or defined via JSDoc for a .js script
// For clarity within this script, we'll describe the structure via JSDoc comments.

/**
 * @typedef {Object} DocstringElementInfo
 * @property {string} element_type - e.g., "module", "class", "method", "function", "interface", "type_alias", "property", "enum", "enum_member"
 * @property {string} name - Simple name of the element
 * @property {string} [parent_name] - Name of the parent element (e.g., class name for a method)
 * @property {string} qualified_name - Fully qualified name (e.g., module_name.ClassName.methodName)
 * @property {string | null} docstring
 * @property {number} line_number
 */

/**
 * @typedef {Object} ModuleDocstrings
 * @property {string} module_name
 * @property {string} file_path
 * @property {DocstringElementInfo[]} elements
 */

class DocstringVisitor {
	/**
	 * @param {string} filePath
	 * @param {string} moduleName
	 */
	constructor(filePath, moduleName) {
		this.filePath = filePath
		this.moduleName = moduleName
		/** @type {DocstringElementInfo[]} */
		this.elements = []
		/** @type {ts.SourceFile | undefined} */
		this.sourceFile = undefined
	}

	/**
	 * @param {ts.Node} node
	 * @returns {number}
	 */
	getLineNumber(node) {
		if (!this.sourceFile) return 0
		const { line } = ts.getLineAndCharacterOfPosition(this.sourceFile, node.getStart())
		return line + 1 // ts returns 0-based line numbers
	}

	/**
	 * @param {ts.Node} node
	 * @param {string} elementType
	 * @param {string} name
	 * @param {string} [parentName]
	 */
	addElement(node, elementType, name, parentName) {
		const qualifiedNameParts = [this.moduleName]
		if (parentName) {
			qualifiedNameParts.push(parentName)
		}
		qualifiedNameParts.push(name)

		this.elements.push({
			element_type: elementType,
			name: name,
			parent_name: parentName,
			qualified_name: qualifiedNameParts.join("."),
			docstring: utils.extractDocstring(node), // extractDocstring is from utils.js
			line_number: this.getLineNumber(node),
		})
	}

	/**
	 * @param {ts.SourceFile} sourceFile
	 */
	visitSourceFile(sourceFile) {
		this.sourceFile = sourceFile
		let moduleDoc = utils.extractDocstring(sourceFile)
		if (moduleDoc) {
			this.elements.push({
				element_type: "module",
				name: this.moduleName,
				qualified_name: this.moduleName,
				docstring: moduleDoc,
				line_number: 1,
			})
		}

		ts.forEachChild(sourceFile, (node) => this.visitNode(node))
	}

	/**
	 * @param {ts.Node} node
	 * @param {string} [parentName]
	 */
	visitNode(node, parentName) {
		if (ts.isClassDeclaration(node) && node.name) {
			const className = node.name.text
			this.addElement(node, "class", className, parentName)
			ts.forEachChild(node, (child) => this.visitNode(child, className))
		} else if (ts.isMethodDeclaration(node) && node.name && ts.isIdentifier(node.name)) {
			this.addElement(node, "method", node.name.text, parentName)
		} else if (ts.isPropertyDeclaration(node) && node.name && ts.isIdentifier(node.name)) {
			this.addElement(node, "property", node.name.text, parentName)
		} else if (ts.isGetAccessorDeclaration(node) && node.name && ts.isIdentifier(node.name)) {
			this.addElement(node, "getter", node.name.text, parentName)
		} else if (ts.isSetAccessorDeclaration(node) && node.name && ts.isIdentifier(node.name)) {
			this.addElement(node, "setter", node.name.text, parentName)
		} else if (ts.isConstructorDeclaration(node)) {
			this.addElement(node, "constructor", "constructor", parentName)
		} else if (ts.isFunctionDeclaration(node) && node.name) {
			this.addElement(node, "function", node.name.text, parentName)
		} else if (ts.isInterfaceDeclaration(node) && node.name) {
			const interfaceName = node.name.text
			this.addElement(node, "interface", interfaceName, parentName)
			ts.forEachChild(node, (child) => this.visitNode(child, interfaceName))
		} else if (ts.isTypeAliasDeclaration(node) && node.name) {
			this.addElement(node, "type_alias", node.name.text, parentName)
		} else if (ts.isEnumDeclaration(node) && node.name) {
			const enumName = node.name.text
			this.addElement(node, "enum", enumName, parentName)
			node.members.forEach((member) => {
				if (member.name && ts.isIdentifier(member.name)) {
					this.addElement(member, "enum_member", member.name.text, enumName)
				}
			})
		} else if (ts.isModuleDeclaration(node) && node.name && ts.isIdentifier(node.name)) {
			const namespaceName = node.name.text
			this.addElement(node, "namespace", namespaceName, parentName)
			if (node.body && ts.isModuleBlock(node.body)) {
				ts.forEachChild(node.body, (child) =>
					this.visitNode(child, parentName ? `${parentName}.${namespaceName}` : namespaceName),
				)
			}
		} else if (ts.isVariableStatement(node)) {
			node.declarationList.declarations.forEach((declaration) => {
				if (declaration.name && ts.isIdentifier(declaration.name)) {
					const doc = utils.extractDocstring(node) // Docstring is on the statement
					if (doc) {
						this.addElement(node, "variable", declaration.name.text, parentName)
					}
				}
			})
		} else if (
			!ts.isClassDeclaration(node) &&
			!ts.isInterfaceDeclaration(node) &&
			!ts.isEnumDeclaration(node) &&
			!ts.isModuleDeclaration(node)
		) {
			ts.forEachChild(node, (child) => this.visitNode(child, parentName))
		}
	}
}

/**
 * @param {string} filePath
 * @returns {Promise<ModuleDocstrings | null>}
 */
async function analyzeFile(filePath) {
	try {
		const sourceFile = utils.parseTypeScriptFile(filePath) // parseTypeScriptFile is from utils.js
		if (!sourceFile) {
			console.warn(`Could not parse ${filePath} for docstrings.`)
			return null
		}

		const moduleName = utils.getModuleNameFromPath(filePath, utils.PROJECT_ROOT) // getModuleNameFromPath is from utils.js
		const visitor = new DocstringVisitor(filePath, moduleName)
		visitor.visitSourceFile(sourceFile)

		return {
			module_name: moduleName,
			file_path: filePath,
			elements: visitor.elements,
		}
	} catch (error) {
		console.error(`Error analyzing file ${filePath} for docstrings: ${error}`)
		return null
	}
}

/**
 * @param {string[]} files
 * @param {number} maxWorkers
 * @returns {Promise<(ModuleDocstrings | null)[]>}
 */
async function processFilesInParallel(files, maxWorkers) {
	const chunkSize = Math.ceil(files.length / maxWorkers)
	/** @type {string[][]} */
	const fileChunks = []
	for (let i = 0; i < files.length; i += chunkSize) {
		fileChunks.push(files.slice(i, i + chunkSize))
	}

	const workerPromises = fileChunks.map((chunk, index) => {
		return new Promise((resolve, reject) => {
			const worker = new Worker(__filename, {
				workerData: { files: chunk, workerId: index },
			})
			worker.on("message", resolve)
			worker.on("error", reject)
			worker.on("exit", (code) => {
				if (code !== 0) {
					reject(new Error(`Worker ${index} stopped with exit code ${code}`))
				}
			})
		})
	})

	const results = await Promise.all(workerPromises)
	// @ts-ignore
	return results.flat().filter(Boolean)
}

async function workerThread() {
	const { files, workerId } = workerData
	// console.log(`Docstring Worker ${workerId}: Processing ${files.length} files`);

	/** @type {(ModuleDocstrings | null)[]} */
	const results = []
	for (const file of files) {
		const result = await analyzeFile(file)
		if (result) {
			results.push(result)
		}
	}
	// console.log(`Docstring Worker ${workerId}: Completed processing ${results.length} files`);
	parentPort.postMessage(results)
}

/**
 * @param {ModuleDocstrings[]} results
 * @param {string} targetDir
 */
function generateIndexFile(results, targetDir) {
	try {
		const indexData = {
			component: targetDir,
			modules: results.map((r) => ({
				name: r.module_name,
				file: r.module_name.replace(/\//g, "_").replace(/\./g, "_") + "_docstrings.json",
			})),
			module_count: results.length,
		}
		utils.writeJsonFile(
			// writeJsonFile is from utils.js
			path.join(DOCSTRING_INVENTORY_DIR, "___docstrings_index.json"),
			indexData,
			2,
			true,
		)
	} catch (error) {
		console.error(`Error generating docstring index file: ${error}`)
	}
}

async function main() {
	if (!isMainThread) {
		return workerThread()
	}

	try {
		const args = process.argv.slice(2)
		const targetDir = args[0] || "."
		const excludeDirsArgIndex = args.indexOf("--exclude")
		const excludeDirs =
			excludeDirsArgIndex !== -1 ? args.slice(excludeDirsArgIndex + 1) : utils.DEFAULT_EXCLUDE_DIRS

		const concurrencyArgIndex = args.indexOf("--concurrency")
		const userMaxWorkers = concurrencyArgIndex !== -1 ? parseInt(args[concurrencyArgIndex + 1], 10) : null

		const absoluteTargetDir = path.resolve(utils.PROJECT_ROOT, targetDir)
		utils.ensureDirExists(DOCSTRING_INVENTORY_DIR) // ensureDirExists is from utils.js

		const files = utils.findTypeScriptFiles(absoluteTargetDir, excludeDirs, utils.DEFAULT_EXCLUDE_PATTERNS) // findTypeScriptFiles is from utils.js
		console.log(`Found ${files.length} TypeScript files to analyze for docstrings.`)

		const cpuCount = os.cpus().length
		const defaultMaxWorkers = Math.max(1, cpuCount > 1 ? cpuCount - 1 : 1)
		const maxWorkers = userMaxWorkers || defaultMaxWorkers

		/** @type {(ModuleDocstrings | null)[]} */
		let analysisResults = []

		const useParallel = files.length > 10 && maxWorkers > 1

		if (useParallel) {
			console.log(`Using ${maxWorkers} worker threads for docstring extraction.`)
			analysisResults = await processFilesInParallel(files, maxWorkers)
		} else {
			console.log("Using sequential processing for docstring extraction.")
			for (const file of files) {
				const result = await analyzeFile(file)
				if (result) {
					analysisResults.push(result)
				}
			}
		}

		const validResults = /** @type {ModuleDocstrings[]} */ (analysisResults.filter((r) => r !== null))

		for (const moduleInfo of validResults) {
			const sanitizedName = moduleInfo.module_name.replace(/\//g, "_").replace(/\./g, "_")
			const filename = `${sanitizedName}_docstrings.json`
			utils.writeJsonFile(
				// writeJsonFile is from utils.js
				path.join(DOCSTRING_INVENTORY_DIR, filename),
				moduleInfo,
				2,
				true,
			)
		}

		generateIndexFile(validResults, targetDir)
		console.log(`Docstring extraction complete. Results in: ${DOCSTRING_INVENTORY_DIR}`)
	} catch (error) {
		console.error(`Fatal error in Docstring Extractor: ${error}`)
		process.exit(1)
	}
}

if (isMainThread) {
	main().catch((error) => {
		console.error("Docstring Extractor Main Error:", error)
		process.exit(1)
	})
} else {
	workerThread()
}
