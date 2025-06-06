#!/usr/bin/env node
/**
 * Auto-Generated Docstring Creator for TypeScript code elements.
 *
 * This script identifies code elements lacking docstrings (based on
 * docstring_extractor.js output) and generates basic, templated docstrings
 * for them using structural information from api_contract_analyzer.js.
 * The generated docstrings are saved to a separate output directory.
 * This script does NOT modify the original source code.
 */

const fs = require("fs").promises
const path = require("path")
const utils = require("./utils") // Assuming utils.js is in the same directory
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads")
const os = require("os")

// Directory paths are defined in utils.js as branch-aware getters

/**
 * @typedef {import('./docstring_extractor.js').DocstringElementInfo} OriginalDocstringElementInfo
 */

/**
 * @typedef {Object} GeneratedDocstringElementInfo
 * @property {string} element_type
 * @property {string} name
 * @property {string} [parent_name]
 * @property {string} qualified_name
 * @property {string} generated_docstring - The machine-generated docstring.
 * @property {boolean} original_docstring_missing - Always true for elements in this file.
 * @property {number} line_number
 */

/**
 * @typedef {Object} ModuleGeneratedDocstrings
 * @property {string} module_name
 * @property {string} file_path
 * @property {GeneratedDocstringElementInfo[]} elements
 */

/**
 * Generates a basic docstring for a function or method.
 * @param {string} elementName - Name of the function/method.
 * @param {any} apiElement - The element object from api_contracts.json.
 * @param {string} elementType - "function" or "method".
 * @returns {string} A generated JSDoc-style comment.
 */
function generateFunctionMethodDocstring(elementName, apiElement, elementType) {
	let actionStatement = `${elementType === "method" ? "Method" : "Function"} ${elementName}.`
	let returnDescription = "Description of return value."

	let verb = ""
	let objectCandidate = elementName

	const commonVerbsMap = {
		get: "Retrieves",
		fetch: "Fetches",
		load: "Loads",
		set: "Sets",
		update: "Updates",
		modify: "Modifies",
		is: "Checks if",
		has: "Determines if",
		can: "Checks whether",
		create: "Creates",
		add: "Adds",
		build: "Builds",
		delete: "Deletes",
		remove: "Removes",
		calculate: "Calculates",
		compute: "Computes",
		validate: "Validates",
		verify: "Verifies",
		process: "Processes",
		handle: "Handles",
		parse: "Parses",
		submit: "Submits",
		start: "Starts",
		init: "Initializes",
		stop: "Stops",
		abort: "Aborts",
		save: "Saves",
		store: "Stores",
		execute: "Executes",
		run: "Runs",
		ensure: "Ensures",
		format: "Formats",
		present: "Presents",
		overwrite: "Overwrites",
		ask: "Asks for user input regarding",
		say: "Communicates information about",
		attempt: "Attempts to perform",
		resume: "Resumes",
		should: "Determines if it should",
		initiate: "Initiates",
	}

	const nameParts = elementName.split(/(?=[A-Z])/)
	const firstWordLower = nameParts[0]?.toLowerCase()

	if (firstWordLower && commonVerbsMap[firstWordLower]) {
		verb = firstWordLower
		objectCandidate = elementName.substring(verb.length)
	}

	const objectForSentence = objectCandidate
		.replace(/([A-Z])/g, " $1")
		.toLowerCase()
		.trim()

	const commonVerbs = commonVerbsMap // Keep alias for existing logic

	if (elementName === "constructor") {
		actionStatement = `Initializes a new instance of the ${apiElement.return_type || "class"}.`
	} else if (commonVerbs[verb]) {
		actionStatement = `${commonVerbs[verb]} ${objectForSentence || "a task"}.`
		if (verb === "is" || verb === "has" || verb === "can" || verb === "should") {
			returnDescription = `True if ${objectForSentence || "condition is met"}, false otherwise.`
		} else if (apiElement.return_type && apiElement.return_type !== "void" && apiElement.return_type !== "any") {
			returnDescription = `The ${objectForSentence || "result"} of the operation.`
		}
	} else {
		// Fallback for unmatched verbs
		actionStatement = `Handles the ${elementName
			.replace(/([A-Z])/g, " $1")
			.toLowerCase()
			.trim()} operation.`
	}

	if (apiElement.return_type === "Promise<void>" || apiElement.return_type === "Promise<undefined>") {
		actionStatement = `Asynchronously ${actionStatement.charAt(0).toLowerCase() + actionStatement.slice(1)}`
	} else if (apiElement.return_type?.startsWith("Promise")) {
		actionStatement = `Asynchronously ${actionStatement.charAt(0).toLowerCase() + actionStatement.slice(1)}`
		const match = apiElement.return_type.match(/Promise<(.+)>/)
		if (match && match[1] !== "void" && match[1] !== "any" && match[1] !== "undefined") {
			returnDescription = `A promise that resolves to ${objectForSentence ? "the " + objectForSentence : "the result"}.`
		}
	}

	let doc = `/**\n * ${actionStatement}\n`
	if (apiElement.parameters && apiElement.parameters.length > 0) {
		apiElement.parameters.forEach((param) => {
			let paramDesc = `The ${param.name
				.replace(/([A-Z])/g, " $1")
				.toLowerCase()
				.trim()}`
			if (param.type && param.type.toLowerCase().includes("callback")) {
				paramDesc += ` callback function`
			} else if (param.name.toLowerCase().includes("id")) {
				paramDesc += ` identifier`
			} else if (param.name.toLowerCase().includes("flag") || param.type === "boolean") {
				paramDesc += ` flag`
			}
			doc += ` * @param {${param.type || "any"}} ${param.name} - ${paramDesc}.\n`
		})
	}
	if (
		apiElement.return_type &&
		apiElement.return_type !== "any" &&
		apiElement.return_type !== "void" &&
		!apiElement.return_type.endsWith("Promise<void>") &&
		!apiElement.return_type.endsWith("Promise<undefined>")
	) {
		if (elementName === "constructor" && apiElement.return_type) {
			doc += ` * @returns {${apiElement.return_type}} A new instance of ${apiElement.return_type}.\n`
		} else {
			doc += ` * @returns {${apiElement.return_type}} ${returnDescription}\n`
		}
	}
	doc += ` */`
	return doc
}

/**
 * Generates a basic docstring for a class.
 * @param {string} className - Name of the class.
 * @param {any} apiElement - The class object from api_contracts.json.
 * @param {any} dependenciesData - The module's dependency data.
 * @returns {string} A generated JSDoc-style comment.
 */
function generateClassDocstring(className, apiElement, dependenciesData) {
	let role = ""
	const lowerClassName = className.toLowerCase()
	const suffixes = {
		Service: "Provides services related to",
		Controller: "Controls operations related to",
		Manager: "Manages resources or operations for",
		Repository: "Manages data access for",
		Provider: "Provides core functionality for", // Made more specific
		Factory: "Creates instances of",
		Handler: "Handles",
		Util: "Provides utility functions for",
		Utils: "Provides utility functions for",
	}

	for (const suffix in suffixes) {
		if (className.endsWith(suffix)) {
			role = suffixes[suffix]
			break
		}
	}

	let objectName = className
	if (role) {
		// If a role was found via suffix, try to get a cleaner object name
		for (const suffix in suffixes) {
			if (className.endsWith(suffix)) {
				objectName = className.substring(0, className.length - suffix.length)
				break
			}
		}
	}
	objectName = objectName
		.replace(/([A-Z])/g, " $1")
		.toLowerCase()
		.trim()
	if (!objectName) objectName = className.toLowerCase()

	// Theme analysis
	const themes = new Set() // Use a Set to avoid duplicate themes
	const methodNames = apiElement.methods ? Object.keys(apiElement.methods) : []
	const propertyTypesAndNames = apiElement.attributes
		? Object.entries(apiElement.attributes).map(([name, type]) => ({
				name: name.toLowerCase(),
				type: String(type).toLowerCase(),
			}))
		: []
	const importNames = dependenciesData?.imports ? dependenciesData.imports.map((imp) => imp.module.toLowerCase()) : []

	// Method-based themes
	if (methodNames.some((m) => m.toLowerCase().includes("task"))) themes.add("task lifecycle management")
	if (methodNames.some((m) => m.toLowerCase().includes("api") || m.toLowerCase().includes("request")))
		themes.add("API interactions")
	if (
		methodNames.some(
			(m) =>
				m.toLowerCase().includes("message") ||
				m.toLowerCase().includes("webview") ||
				m.toLowerCase().includes("ui"),
		)
	)
		themes.add("UI/webview communication")
	if (methodNames.some((m) => m.toLowerCase().includes("tool"))) themes.add("tool execution")
	if (
		methodNames.some(
			(m) =>
				m.toLowerCase().includes("state") ||
				m.toLowerCase().includes("history") ||
				m.toLowerCase().includes("settings") ||
				m.toLowerCase().includes("config"),
		)
	)
		themes.add("state and configuration")
	if (methodNames.some((m) => m.toLowerCase().includes("mcp"))) themes.add("MCP integration")
	if (methodNames.some((m) => m.toLowerCase().includes("auth"))) themes.add("authentication")
	if (methodNames.some((m) => m.toLowerCase().includes("checkpoint") || m.toLowerCase().includes("git")))
		themes.add("version control and checkpoints")
	if (methodNames.some((m) => m.toLowerCase().includes("file") || m.toLowerCase().includes("directory")))
		themes.add("file system operations")
	if (methodNames.some((m) => m.toLowerCase().includes("event") || m.toLowerCase().includes("listener")))
		themes.add("event handling")

	// Property-based themes
	if (propertyTypesAndNames.some((p) => p.type.includes("cline") && !p.name.includes("provider")))
		themes.add("Cline instance orchestration") // Avoid self-reference for ClineProvider
	if (propertyTypesAndNames.some((p) => p.type.includes("mcphub"))) themes.add("MCP Hub interactions")
	if (propertyTypesAndNames.some((p) => p.type.includes("workspacetracker"))) themes.add("workspace tracking")
	if (propertyTypesAndNames.some((p) => p.type.includes("accountservice"))) themes.add("account services")
	if (propertyTypesAndNames.some((p) => p.type.includes("webview"))) themes.add("VS Code webview integration")

	// Import-based themes
	if (importNames.includes("vscode")) themes.add("VS Code API integration")

	let themeString = ""
	if (themes.size > 0) {
		const themeArray = Array.from(themes)
		if (themes.size === 1) {
			themeString = ` focusing on ${themeArray[0]}`
		} else if (themes.size === 2) {
			themeString = ` focusing on ${themeArray[0]} and ${themeArray[1]}`
		} else {
			themeString = ` with key responsibilities in ${themeArray.slice(0, 2).join(", ")}, and ${themeArray[2]}`
		}
	}

	let desc
	if (role) {
		desc = `${role} ${objectName}${themeString}.`
	} else {
		if (themes.size > 0) {
			desc = `Core class for ${className} operations,${themeString}.`
		} else {
			desc = `Manages the primary functionality and operations for ${className}.` // Fallback
		}
	}

	if (apiElement.bases && apiElement.bases.length > 0) {
		desc += ` Extends ${apiElement.bases.join(", ")}.`
	}
	return `/**\n * ${desc}\n */`
}

/**
 * Generates a basic docstring for an interface.
 * @param {string} interfaceName - Name of the interface.
 * @param {any} apiElement - The interface object from api_contracts.json.
 * @returns {string} A generated JSDoc-style comment.
 */
function generateInterfaceDocstring(interfaceName, apiElement) {
	let desc = `Defines the contract for a ${interfaceName
		.replace(/([A-Z])/g, " $1")
		.toLowerCase()
		.trim()}.`
	if (apiElement.extends && apiElement.extends.length > 0) {
		desc += ` Extends ${apiElement.extends.join(", ")}.`
	}
	return `/**\n * ${desc}\n */`
}

/**
 * Generates a basic docstring for a property.
 * @param {string} propertyName - Name of the property.
 * @param {any} apiProperty - The property object from api_contracts.json (could be an attribute or interface property).
 * @returns {string} A generated JSDoc-style comment.
 */
function generatePropertyDocstring(propertyName, apiProperty) {
	const type = apiProperty.type || (typeof apiProperty === "string" ? apiProperty : "any")
	let desc = `The ${propertyName
		.replace(/([A-Z])/g, " $1")
		.toLowerCase()
		.trim()}`
	const lowerPropName = propertyName.toLowerCase()
	const humanizedName = propertyName
		.replace(/([A-Z])/g, " $1")
		.toLowerCase()
		.trim()

	if (lowerPropName.endsWith("id") || lowerPropName.endsWith("identifier")) {
		desc = `The ${humanizedName} identifier`
	} else if (
		lowerPropName.startsWith("is") ||
		lowerPropName.startsWith("has") ||
		lowerPropName.startsWith("did") ||
		lowerPropName.startsWith("can") ||
		lowerPropName.startsWith("should") ||
		type === "boolean"
	) {
		desc = `Flag indicating if ${humanizedName.substring(humanizedName.indexOf(" ") + 1)}` // "is active" -> "active"
	} else if (lowerPropName.includes("config")) {
		desc = `The ${humanizedName} configuration object`
	} else if (lowerPropName.includes("setting")) {
		// handles singular "setting" too
		desc = `The ${humanizedName} settings`
	} else if (lowerPropName.includes("history")) {
		desc = `The ${humanizedName} history`
	} else if (lowerPropName.includes("message") && !lowerPropName.includes("errormessage")) {
		// avoid "error message message content"
		desc = `The ${humanizedName} message content`
	} else if (type && type !== "any") {
		const typeLower = String(type).toLowerCase()
		if (lowerPropName.includes(typeLower.replace(/<.*>/, "").trim())) {
			// if prop name contains base type name e.g. terminalManager: TerminalManager
			desc = `The ${humanizedName} instance`
		} else {
			desc = `The ${humanizedName}`
		}
	} else {
		desc = `The ${humanizedName}`
	}
	return `/** @type {${type}} - ${desc}. */`
}

/**
 * Generates a basic docstring for a type alias.
 * @param {string} typeName - Name of the type alias.
 * @param {any} apiType - The type alias object from api_contracts.json.
 * @returns {string} A generated JSDoc-style comment.
 */
function generateTypeAliasDocstring(typeName, apiType) {
	let baseType = apiType.type || "a custom type"
	if (apiType.values && apiType.type === "union") {
		// from api_contract_analyzer for type aliases
		baseType = `a union of ${apiType.values.length > 3 ? apiType.values.slice(0, 3).join(", ") + ", ..." : apiType.values.join(" | ")}`
	} else if (apiType.components && apiType.type === "intersection") {
		baseType = `an intersection of ${apiType.components.join(" & ")}`
	} else if (apiType.properties && apiType.type === "object") {
		baseType = `an object with properties: ${Object.keys(apiType.properties).slice(0, 2).join(", ")}${Object.keys(apiType.properties).length > 2 ? ", ..." : ""}`
	}
	return `/**\n * Type alias ${typeName}.\n * Represents ${baseType}.\n */`
}

/**
 * Analyzes a single module to generate docstrings for undocumented elements.
 * @param {string} moduleDocstringsPath - Path to the module's file from docstring_extractor.
 * @param {string} moduleApiContractsPath - Path to the module's file from api_contract_analyzer.
 * @param {string} moduleDependenciesPath - Path to the module's file from dependency_graph_generator.
 * @returns {Promise<ModuleGeneratedDocstrings | null>}
 */
async function analyzeAndGenerateForFile(moduleDocstringsPath, moduleApiContractsPath, moduleDependenciesPath) {
	try {
		const docstringsData = utils.readJsonFile(moduleDocstringsPath)
		const apiContractsData = utils.readJsonFile(moduleApiContractsPath)
		const dependenciesData = utils.readJsonFile(moduleDependenciesPath)

		if (!docstringsData || !apiContractsData || !dependenciesData) {
			// console.warn(`Missing input data for ${moduleDocstringsPath}, ${moduleApiContractsPath} or ${moduleDependenciesPath}`);
			return null
		}

		/** @type {GeneratedDocstringElementInfo[]} */
		const generatedElements = []

		for (const extractedElement of docstringsData.elements) {
			if (extractedElement.docstring === null) {
				// Only process if original docstring is missing
				let apiElement
				let generatedDocstring = "/** Placeholder docstring. */" // Default

				// Find the corresponding element in API contracts
				switch (extractedElement.element_type) {
					case "class":
						apiElement = apiContractsData.classes?.[extractedElement.name]
						if (apiElement)
							generatedDocstring = generateClassDocstring(
								extractedElement.name,
								apiElement,
								dependenciesData,
							)
						break
					case "method":
					case "constructor":
					case "getter":
					case "setter":
						apiElement =
							apiContractsData.classes?.[extractedElement.parent_name]?.methods?.[extractedElement.name]
						if (apiElement)
							generatedDocstring = generateFunctionMethodDocstring(
								extractedElement.name,
								apiElement,
								extractedElement.element_type,
							)
						break
					case "function":
						apiElement = apiContractsData.functions?.[extractedElement.name]
						if (apiElement)
							generatedDocstring = generateFunctionMethodDocstring(
								extractedElement.name,
								apiElement,
								"function",
							)
						break
					case "interface":
						apiElement = apiContractsData.interfaces?.[extractedElement.name]
						if (apiElement)
							generatedDocstring = generateInterfaceDocstring(extractedElement.name, apiElement)
						break
					case "property": // Can be class attribute or interface property
						if (
							extractedElement.parent_name &&
							apiContractsData.classes?.[extractedElement.parent_name]?.attributes
						) {
							apiElement =
								apiContractsData.classes[extractedElement.parent_name].attributes[extractedElement.name]
						} else if (
							extractedElement.parent_name &&
							apiContractsData.interfaces?.[extractedElement.parent_name]?.properties
						) {
							apiElement =
								apiContractsData.interfaces[extractedElement.parent_name].properties[
									extractedElement.name
								]
						}
						if (apiElement)
							generatedDocstring = generatePropertyDocstring(extractedElement.name, apiElement)
						break
					case "type_alias":
						apiElement = apiContractsData.types?.[extractedElement.name]
						if (apiElement)
							generatedDocstring = generateTypeAliasDocstring(extractedElement.name, apiElement)
						break
					// Not attempting to generate for 'module', 'enum', 'enum_member', 'namespace', 'variable' for now,
					// as their structure in api_contracts might be less straightforward for simple templating
					// or they are less commonly lacking basic JSDoc.
				}

				generatedElements.push({
					element_type: extractedElement.element_type,
					name: extractedElement.name,
					parent_name: extractedElement.parent_name,
					qualified_name: extractedElement.qualified_name,
					generated_docstring: generatedDocstring,
					original_docstring_missing: true,
					line_number: extractedElement.line_number,
				})
			}
		}

		if (generatedElements.length === 0) return null // No missing docstrings to generate for this module

		return {
			module_name: docstringsData.module_name,
			file_path: docstringsData.file_path,
			elements: generatedElements,
		}
	} catch (error) {
		console.error(`Error auto-generating docstrings for module based on ${moduleDocstringsPath}: ${error}`)
		return null
	}
}

/**
 * @param {{ files: { docstringsFile: string, apiContractsFile: string, dependenciesFile: string }[], workerId: number }} workerData
 */
async function workerThread() {
	const { files, workerId } = workerData
	// console.log(`Auto-Docstring Worker ${workerId}: Processing ${files.length} modules`);

	/** @type {(ModuleGeneratedDocstrings | null)[]} */
	const results = []
	for (const fileTuple of files) {
		const result = await analyzeAndGenerateForFile(
			fileTuple.docstringsFile,
			fileTuple.apiContractsFile,
			fileTuple.dependenciesFile,
		)
		if (result) {
			results.push(result)
		}
	}
	// console.log(`Auto-Docstring Worker ${workerId}: Completed processing ${results.length} modules`);
	parentPort.postMessage(results)
}

/**
 * @param {{ docstringsFile: string, apiContractsFile: string, dependenciesFile: string }[]} fileTuples
 * @param {number} maxWorkers
 * @returns {Promise<(ModuleGeneratedDocstrings | null)[]>}
 */
async function processFilesInParallel(fileTuples, maxWorkers) {
	const chunkSize = Math.ceil(fileTuples.length / maxWorkers)
	/** @type {{ files: { docstringsFile: string, apiContractsFile: string, dependenciesFile: string }[], workerId: number }[]} */
	const workerPayloads = []
	for (let i = 0; i < fileTuples.length; i += chunkSize) {
		workerPayloads.push({
			files: fileTuples.slice(i, i + chunkSize),
			workerId: workerPayloads.length, // Assign workerId based on chunk index
		})
	}

	const workerPromises = workerPayloads.map((payload) => {
		return new Promise((resolve, reject) => {
			const worker = new Worker(__filename, { workerData: payload })
			worker.on("message", resolve)
			worker.on("error", reject)
			worker.on("exit", (code) => {
				if (code !== 0) {
					reject(new Error(`Worker ${payload.workerId} stopped with exit code ${code}`))
				}
			})
		})
	})

	const results = await Promise.all(workerPromises)
	// @ts-ignore
	return results.flat().filter(Boolean)
}

/**
 * @param {ModuleGeneratedDocstrings[]} results
 * @param {string} targetDir
 */
function generateOutputIndexFile(results, targetDir) {
	try {
		const indexData = {
			component: targetDir,
			modules: results.map((r) => ({
				name: r.module_name,
				file: r.module_name.replace(/\//g, "_").replace(/\./g, "_") + "_generated_docstrings.json",
			})),
			module_count: results.length,
		}
		utils.writeJsonFile(
			path.join(utils.GENERATED_DOCSTRING_INVENTORY_DIR, "___generated_docstrings_index.json"),
			indexData,
			2,
			true,
		)
	} catch (error) {
		console.error(`Error generating auto-docstring index file: ${error}`)
	}
}

async function main() {
	if (!isMainThread) {
		return workerThread()
	}

	try {
		const args = process.argv.slice(2)
		const targetDir = args[0] || "." // Not directly used for input paths, but for context in index file
		// Exclusions are handled by the input from docstring_extractor which should already be filtered.

		const concurrencyArgIndex = args.indexOf("--concurrency")
		const userMaxWorkers = concurrencyArgIndex !== -1 ? parseInt(args[concurrencyArgIndex + 1], 10) : null

		utils.ensureDirExists(utils.GENERATED_DOCSTRING_INVENTORY_DIR)

		// Read the index from docstring_extractor to know which modules to process
		const docstringsIndexFile = path.join(utils.DOCSTRING_INVENTORY_DIR, "___docstrings_index.json")
		const docstringsIndex = utils.readJsonFile(docstringsIndexFile)

		if (!docstringsIndex || !docstringsIndex.modules) {
			console.error("Could not read docstring extractor index file or it's improperly formatted.")
			process.exit(1)
		}

		/** @type {{ docstringsFile: string, apiContractsFile: string, dependenciesFile: string }[]} */
		// Asynchronously filter modules to ensure all prerequisite files exist
		const modulePromises = docstringsIndex.modules.map(async (mod) => {
			const baseFileName = mod.file.replace("_docstrings.json", "")
			const fileTuple = {
				docstringsFile: path.join(utils.DOCSTRING_INVENTORY_DIR, mod.file),
				apiContractsFile: path.join(utils.API_CONTRACTS_DIR, `${baseFileName}_contracts.json`),
				dependenciesFile: path.join(utils.DEPENDENCY_GRAPH_DIR, `${baseFileName}_dependencies.json`),
			}
			try {
				await fs.access(fileTuple.apiContractsFile)
				await fs.access(fileTuple.dependenciesFile)
				return fileTuple // Keep if all files exist
			} catch {
				// console.warn(`Skipping ${fileTuple.docstringsFile}, missing corresponding API contract or dependency file: ${fileTuple.apiContractsFile} or ${fileTuple.dependenciesFile}`);
				return null // Mark for removal if any file is missing
			}
		})

		const resolvedFileTuples = await Promise.all(modulePromises)
		const fileTuplesToProcess = resolvedFileTuples.filter((tuple) => tuple !== null)

		console.log(`Found ${fileTuplesToProcess.length} modules to analyze for auto-generating docstrings.`)

		const cpuCount = os.cpus().length
		const defaultMaxWorkers = Math.max(1, cpuCount > 1 ? cpuCount - 1 : 1)
		const maxWorkers = userMaxWorkers || defaultMaxWorkers

		/** @type {(ModuleGeneratedDocstrings | null)[]} */
		let generationResults = []
		// const useParallel = fileTuplesToProcess.length > 10 && maxWorkers > 1; // Original logic
		const useParallel = false // Force sequential processing

		if (useParallel) {
			console.log(`Using ${maxWorkers} worker threads for auto-generating docstrings.`)
			generationResults = await processFilesInParallel(fileTuplesToProcess, maxWorkers)
		} else {
			console.log("Using sequential processing for auto-generating docstrings.")
			for (const fileTuple of fileTuplesToProcess) {
				const result = await analyzeAndGenerateForFile(
					fileTuple.docstringsFile,
					fileTuple.apiContractsFile,
					fileTuple.dependenciesFile,
				)
				if (result) {
					generationResults.push(result)
				}
			}
		}

		const validResults = /** @type {ModuleGeneratedDocstrings[]} */ (generationResults.filter((r) => r !== null))

		for (const moduleInfo of validResults) {
			const sanitizedName = moduleInfo.module_name.replace(/\//g, "_").replace(/\./g, "_")
			const filename = `${sanitizedName}_generated_docstrings.json`
			utils.writeJsonFile(path.join(utils.GENERATED_DOCSTRING_INVENTORY_DIR, filename), moduleInfo, 2, true)
		}

		generateOutputIndexFile(validResults, targetDir)
		console.log(`Auto-docstring generation complete. Results in: ${utils.GENERATED_DOCSTRING_INVENTORY_DIR}`)
	} catch (error) {
		console.error(`Fatal error in Docstring Auto-Generator: ${error}`)
		process.exit(1)
	}
}

if (isMainThread) {
	main().catch((error) => {
		console.error("Docstring Auto-Generator Main Error:", error)
		process.exit(1)
	})
} else {
	workerThread()
}
