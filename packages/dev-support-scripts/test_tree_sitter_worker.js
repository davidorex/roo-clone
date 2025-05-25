// packages/dev-support-scripts/test_tree_sitter_worker.js
const path = require("path")
const fs = require("fs")
const Parser = require("web-tree-sitter")
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads")

const PROJECT_ROOT = path.resolve(__dirname, "..", "..")

async function initializeAndLoadLanguage(threadType = "Main") {
	console.log(`[${threadType} PID: ${process.pid}] Attempting Tree-sitter initialization...`)
	console.log(`[${threadType}] PROJECT_ROOT: ${PROJECT_ROOT}`)
	const treeSitterWasmPath = path.join(PROJECT_ROOT, "src", "dist", "tree-sitter.wasm")
	console.log(
		`[${threadType}] Expected tree-sitter.wasm path: ${treeSitterWasmPath}, Exists: ${fs.existsSync(treeSitterWasmPath)}`,
	)

	try {
		console.log(`[${threadType}] Calling Parser.init({ locateFile: ... })`)
		await Parser.init({
			locateFile(scriptName, scriptDirectory) {
				if (scriptName === "tree-sitter.wasm") {
					console.log(
						`[${threadType} - locateFile] Providing path for tree-sitter.wasm: ${treeSitterWasmPath}`,
					)
					return treeSitterWasmPath
				}
				const defaultPath = path.join(scriptDirectory, scriptName)
				console.log(`[${threadType} - locateFile] Providing default path for ${scriptName}: ${defaultPath}`)
				return defaultPath
			},
		})
		console.log(`[${threadType}] Parser.init() COMPLETED.`)

		const languageWasmPath = path.join(PROJECT_ROOT, "src", "dist", "tree-sitter-tsx.wasm")
		console.log(
			`[${threadType}] Expected language WASM path (tree-sitter-tsx.wasm): ${languageWasmPath}, Exists: ${fs.existsSync(languageWasmPath)}`,
		)

		if (!fs.existsSync(languageWasmPath)) {
			console.error(`[${threadType}] Language WASM file NOT FOUND at ${languageWasmPath}`)
			return false
		}

		console.log(`[${threadType}] Calling Parser.Language.load('${languageWasmPath}')`)
		const language = await Parser.Language.load(languageWasmPath)
		console.log(`[${threadType}] Parser.Language.load() COMPLETED.`)

		const parser = new Parser()
		console.log(`[${threadType}] Setting language on parser.`)
		parser.setLanguage(language)
		console.log(`[${threadType}] Language set. Parser ready.`)
		const tree = parser.parse("let x = 1;")
		console.log(`[${threadType}] Simple parse successful. Root node: ${tree.rootNode.type}`)
		return true
	} catch (error) {
		console.error(`[${threadType}] Error during Tree-sitter setup:`, error)
		return false
	}
}

if (isMainThread) {
	console.log(`[Main PID: ${process.pid}] Starting Tree-sitter load test...`)
	initializeAndLoadLanguage("Main")
		.then((mainSuccess) => {
			console.log(`[Main] Main thread test success: ${mainSuccess}`)
			if (!mainSuccess) {
				console.error("[Main] Main thread test FAILED. Aborting worker test.")
				process.exit(1)
			}
			console.log("[Main] Spawning worker thread...")
			const worker = new Worker(__filename) // Spawns itself as a worker
			worker.on("message", (msg) => {
				console.log(`[Main] Message from worker: ${msg}`)
				process.exit(msg === "worker_success" ? 0 : 1)
			})
			worker.on("error", (err) => {
				console.error("[Main] Worker error:", err)
				process.exit(1)
			})
			worker.on("exit", (code) => {
				if (code !== 0) {
					console.error(`[Main] Worker exited with code ${code}`)
					process.exit(code)
				}
			})
		})
		.catch((err) => {
			console.error("[Main] Main thread test threw unhandled exception:", err)
			process.exit(1)
		})
} else {
	// Worker thread
	console.log(`[Worker PID: ${process.pid}] Worker thread started.`)
	initializeAndLoadLanguage("Worker")
		.then((workerSuccess) => {
			parentPort.postMessage(workerSuccess ? "worker_success" : "worker_failure")
		})
		.catch((err) => {
			console.error("[Worker] Worker thread test threw unhandled exception:", err)
			parentPort.postMessage("worker_error_exception")
		})
}
