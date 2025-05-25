#!/usr/bin/env node
/**
 * Safe Mutations Analyzer
 *
 * This script analyzes module characteristics using outputs from
 * api_contract_analyzer.js, dependency_graph_generator.js, and docstring_extractor.js
 * to classify modules (e.g., IMMUTABLE, VOLATILE, EXTENSION_POINT) and provide
 * recommendations for safe code modifications.
 */

const fs = require("fs").promises
const path = require("path")
const utils = require("./utils")
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads")
const os = require("os")

const API_CONTRACTS_DIR = path.join(utils.SCRIPT_DIR, "api_contracts")
const DEPENDENCY_GRAPH_DIR = path.join(utils.SCRIPT_DIR, "dependency_graph")
const DOCSTRING_INVENTORY_DIR = path.join(utils.SCRIPT_DIR, "docstring_inventory")
const GENERATED_DOCSTRING_INVENTORY_DIR = path.join(utils.SCRIPT_DIR, "generated_docstring_inventory")
const SAFE_MUTATIONS_OUTPUT_DIR = path.join(utils.SCRIPT_DIR, "safe_mutations_analysis")

/**
 * @typedef {Object} ModuleCard
 * @property {string} module - Module name
 * @property {string} classification - e.g., IMMUTABLE, VOLATILE, EXTENSION_POINT, NORMAL
 * @property {number} centrality - Number of modules importing this one
 * @property {number} fanout - Number of modules this one imports
 * @property {number} dependency_depth - Max path length to a leaf node
 * @property {string[]} exports - Trimmed list of key public exports (classes, functions, interfaces)
 * @property {string[] | number} imports - Count or trimmed list of imported modules
 * @property {string[] | number} used_by - Count or trimmed list of modules using this one
 * @property {string | null} subsystem - Subsystem name
 * @property {string | null} docstring - Best available docstring (original or generated)
 * @property {string} recommendation - Actionable advice
 * @property {boolean} in_cycle - Whether the module is part of a circular dependency
 * @property {number} [interface_count]
 * @property {number} [class_count]
 * @property {number} [function_count]
 * @property {number} [method_count]
 */

/**
 * Classifies a module based on its metrics and API information.
 * @param {any} metrics - From dependency graph (centrality, fanout, depth).
 * @param {any} apiInfo - From API contracts (interface_count, class_count, etc.).
 * @param {boolean} isInCycle - Whether the module is in a circular dependency.
 * @returns {string} Classification string.
 */
function classifyModule(metrics, apiInfo, isInCycle) {
	const centrality = metrics?.centrality || 0
	const fanout = metrics?.fanout || 0
	const dependency_depth = metrics?.dependency_depth || 0
	const interface_count = apiInfo?.api_summary?.interface_count || apiInfo?.interface_count || 0 // Handle both ___analysis.json and individual contract structure

	if (isInCycle && (fanout > 5 || centrality > 5)) {
		return "VOLATILE (Cyclic)"
	}
	if (centrality >= 10 && interface_count >= 1 && fanout <= 3) {
		return "IMMUTABLE"
	}
	if (fanout >= 10 || dependency_depth >= 5 || isInCycle) {
		// isInCycle makes it volatile by default if not caught by IMMUTABLE
		return "VOLATILE"
	}
	if (centrality <= 2 && fanout <= 2) {
		return "EXTENSION_POINT"
	}
	return "NORMAL"
}

/**
 * Generates a recommendation based on classification.
 * @param {string} classification
 * @param {string} moduleName
 * @returns {string}
 */
function generateRecommendation(classification, moduleName) {
	if (classification === "IMMUTABLE") {
		return "Avoid direct mutations. Used by many critical parts. Consider wrapper/adapter patterns for changes or extensions. Verify all dependents after any modification."
	}
	if (classification.startsWith("VOLATILE")) {
		const reason = classification.includes("Cyclic")
			? "its involvement in dependency cycles"
			: "its high fan-out or dependency depth"
		return `High risk to modify due to ${reason}. Changes can have wide, unpredictable impact. Refactor to reduce coupling if possible, or proceed with extreme caution and thorough testing.`
	}
	if (classification === "EXTENSION_POINT") {
		return "Relatively safe to add new features or modify. Low impact on other modules."
	}
	return "Standard module. Evaluate changes based on specific dependencies and dependents. Follow standard testing procedures."
}

/**
 * Processes a single module to create its "Module Card".
 * @param {string} moduleName
 * @param {string} moduleFilePath - Original source file path for the module.
 * @param {any} circularDepsData - Full data from circular_dependencies.json
 * @returns {Promise<ModuleCard | null>}
 */
async function processModule(moduleName, moduleFilePath, circularDepsData) {
	try {
		const sanitizedModuleName = moduleName.replace(/\//g, "_").replace(/\./g, "_")

		const apiContractPath = path.join(API_CONTRACTS_DIR, `${sanitizedModuleName}_contracts.json`)
		const depGraphPath = path.join(DEPENDENCY_GRAPH_DIR, `${sanitizedModuleName}_dependencies.json`)
		const docstringPath = path.join(DOCSTRING_INVENTORY_DIR, `${sanitizedModuleName}_docstrings.json`)
		const genDocstringPath = path.join(
			GENERATED_DOCSTRING_INVENTORY_DIR,
			`${sanitizedModuleName}_generated_docstrings.json`,
		)

		const apiContract = utils.readJsonFile(apiContractPath)
		const depInfo = utils.readJsonFile(depGraphPath)

		if (!apiContract || !depInfo) {
			// console.warn(`Skipping module ${moduleName}: missing API contract or dependency info.`);
			return null
		}

		const originalDocstrings = utils.readJsonFile(docstringPath)
		// Gracefully handle missing generated_docstrings file
		let generatedDocstrings = null
		try {
			// Check if file exists before attempting to read
			await fs.access(genDocstringPath) // This will throw if file doesn't exist
			generatedDocstrings = utils.readJsonFile(genDocstringPath)
		} catch (e) {
			// console.warn(`No generated docstring file for ${moduleName} at ${genDocstringPath}, assuming no generated docstrings.`);
		}

		let moduleDocstring = null
		if (originalDocstrings?.elements) {
			const modDoc = originalDocstrings.elements.find((e) => e.element_type === "module")
			if (modDoc && modDoc.docstring) moduleDocstring = modDoc.docstring
		}
		if (!moduleDocstring && generatedDocstrings?.elements) {
			const genModDoc = generatedDocstrings.elements.find((e) => e.element_type === "module")
			if (genModDoc && genModDoc.generated_docstring) moduleDocstring = genModDoc.generated_docstring
		}
		if (!moduleDocstring) {
			// Fallback if module-specific docstring is still null
			const classNames = Object.keys(apiContract.classes || {})
			if (classNames.length === 1) {
				// If only one class, use its docstring
				const className = classNames[0]
				if (originalDocstrings?.elements) {
					const classDoc = originalDocstrings.elements.find(
						(e) => e.element_type === "class" && e.name === className,
					)
					if (classDoc && classDoc.docstring) moduleDocstring = classDoc.docstring
				}
				if (!moduleDocstring && generatedDocstrings?.elements) {
					const genClassDoc = generatedDocstrings.elements.find(
						(e) => e.element_type === "class" && e.name === className,
					)
					if (genClassDoc && genClassDoc.generated_docstring)
						moduleDocstring = genClassDoc.generated_docstring
				}
			}
		}

		const isInCycle = circularDepsData.circular_dependencies.some((cycle) => cycle.includes(moduleName))
		const classification = classifyModule(depInfo.metrics, apiContract, isInCycle)
		const recommendation = generateRecommendation(classification, moduleName)

		const exports = [
			...Object.keys(apiContract.classes || {}),
			...Object.keys(apiContract.functions || {}),
			...Object.keys(apiContract.interfaces || {}),
			...Object.keys(apiContract.types || {}),
		].slice(0, 5) // Trim to 5 for brevity

		return {
			module: moduleName,
			classification,
			centrality: depInfo.metrics?.centrality || 0,
			fanout: depInfo.metrics?.fanout || 0,
			dependency_depth: depInfo.metrics?.dependency_depth || 0,
			exports,
			imports: depInfo.imports?.length || 0, // Count for now
			used_by: depInfo.imported_by?.length || 0, // Count for now (centrality)
			subsystem: depInfo.subsystem || null,
			docstring: moduleDocstring,
			recommendation,
			in_cycle: isInCycle,
			interface_count:
				apiContract.api_summary?.interface_count || Object.keys(apiContract.interfaces || {}).length,
			class_count: apiContract.api_summary?.class_count || Object.keys(apiContract.classes || {}).length,
			function_count: apiContract.api_summary?.function_count || Object.keys(apiContract.functions || {}).length,
			method_count: apiContract.api_summary?.method_count || 0, // method_count is in api_summary
		}
	} catch (error) {
		console.error(`Error processing module ${moduleName}: ${error}`)
		return null
	}
}

/**
 * @param {{ moduleList: { name: string, file_path: string }[], circularDepsData: any, workerId: number }} workerData
 */
async function workerThread() {
	const { moduleList, circularDepsData, workerId } = workerData
	// console.log(`SafeMutations Worker ${workerId}: Processing ${moduleList.length} modules`);

	/** @type {(ModuleCard | null)[]} */
	const results = []
	for (const moduleEntry of moduleList) {
		const result = await processModule(moduleEntry.name, moduleEntry.file_path, circularDepsData)
		if (result) {
			results.push(result)
		}
	}
	// console.log(`SafeMutations Worker ${workerId}: Completed processing ${results.length} modules`);
	parentPort.postMessage(results)
}

/**
 * @param {{ name: string, file_path: string }[]} moduleList
 * @param {any} circularDepsData
 * @param {number} maxWorkers
 * @returns {Promise<(ModuleCard | null)[]>}
 */
async function processModulesInParallel(moduleList, circularDepsData, maxWorkers) {
	const chunkSize = Math.ceil(moduleList.length / maxWorkers)
	/** @type {{ moduleList: { name: string, file_path: string }[], circularDepsData: any, workerId: number }[]} */
	const workerPayloads = []
	for (let i = 0; i < moduleList.length; i += chunkSize) {
		workerPayloads.push({
			moduleList: moduleList.slice(i, i + chunkSize),
			circularDepsData,
			workerId: workerPayloads.length,
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

function generateSafeMutationsIndexFile(results, outputDir) {
	try {
		const indexData = {
			component: ".", // Default component context as targetDir is not parsed in this script
			modules: results.map((card) => ({
				name: card.module, // module is the qualified name from ModuleCard
				file: `${card.module.replace(/\//g, "_").replace(/\./g, "_")}_safe_mutation_card.json`,
			})),
			module_count: results.length,
		}
		utils.writeJsonFile(
			path.join(outputDir, "___safe_mutations_index.json"),
			indexData,
			2, // indent
			true, // addHeader
		)
	} catch (error) {
		console.error(`Error generating safe mutations index file: ${error}`)
	}
}

async function main() {
	if (!isMainThread) {
		return workerThread()
	}

	try {
		utils.ensureDirExists(SAFE_MUTATIONS_OUTPUT_DIR)

		// Load main dependency index to get list of all modules
		const depIndexFile = path.join(DEPENDENCY_GRAPH_DIR, "dependency_index.json")
		const depIndex = utils.readJsonFile(depIndexFile)
		if (!depIndex || !depIndex.modules) {
			console.error("Could not read dependency_index.json or it's improperly formatted.")
			process.exit(1)
		}

		// Load circular dependencies data once
		const circularDepsFile = path.join(DEPENDENCY_GRAPH_DIR, "circular_dependencies.json")
		const circularDepsData = utils.readJsonFile(circularDepsFile)
		if (!circularDepsData) {
			console.error("Could not read circular_dependencies.json.")
			process.exit(1)
		}

		const moduleList = depIndex.modules.map((m) => ({ name: m.name, file_path: m.file_path })) // Assuming file_path is in depIndex.modules

		console.log(`Found ${moduleList.length} modules to analyze for safe mutations.`)

		const cpuCount = os.cpus().length
		const defaultMaxWorkers = Math.max(1, cpuCount > 1 ? cpuCount - 1 : 1)
		const args = process.argv.slice(2)
		const concurrencyArgIndex = args.indexOf("--concurrency")
		const userMaxWorkers = concurrencyArgIndex !== -1 ? parseInt(args[concurrencyArgIndex + 1], 10) : null
		const maxWorkers = userMaxWorkers || defaultMaxWorkers

		/** @type {(ModuleCard | null)[]} */
		let analysisResults = []
		const useParallel = moduleList.length > 10 && maxWorkers > 1

		if (useParallel) {
			console.log(`Using ${maxWorkers} worker threads for safe mutations analysis.`)
			analysisResults = await processModulesInParallel(moduleList, circularDepsData, maxWorkers)
		} else {
			console.log("Using sequential processing for safe mutations analysis.")
			for (const moduleEntry of moduleList) {
				const result = await processModule(moduleEntry.name, moduleEntry.file_path, circularDepsData)
				if (result) {
					analysisResults.push(result)
				}
			}
		}

		const validResults = /** @type {ModuleCard[]} */ (analysisResults.filter((r) => r !== null))

		// Sort by classification then module name for consistent output
		validResults.sort((a, b) => {
			if (a.classification < b.classification) return -1
			if (a.classification > b.classification) return 1
			if (a.module < b.module) return -1
			if (a.module > b.module) return 1
			return 0
		})

		// Write individual module card files
		for (const card of validResults) {
			const sanitizedModuleName = card.module.replace(/\//g, "_").replace(/\./g, "_")
			const cardFilename = `${sanitizedModuleName}_safe_mutation_card.json`
			const cardFilePath = path.join(SAFE_MUTATIONS_OUTPUT_DIR, cardFilename)
			utils.writeJsonFile(cardFilePath, card, 2, true)
		}

		// Generate the index file
		generateSafeMutationsIndexFile(validResults, SAFE_MUTATIONS_OUTPUT_DIR)

		console.log(
			`Safe mutations analysis complete. Individual reports and index file in: ${SAFE_MUTATIONS_OUTPUT_DIR}`,
		)
	} catch (error) {
		console.error(`Fatal error in Safe Mutations Analyzer: ${error}`)
		process.exit(1)
	}
}

if (isMainThread) {
	main().catch((error) => {
		console.error("Safe Mutations Analyzer Main Error:", error)
		process.exit(1)
	})
} else {
	workerThread()
}
