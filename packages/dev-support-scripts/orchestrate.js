#!/usr/bin/env node
/**
 * Code Analysis Orchestrator
 *
 * This script orchestrates the execution of all code analysis scripts in the correct order:
 * 1. API Contract Analysis
 * 2. Dependency Graph Generation
 * 3. Docstring Extraction
 * 4. Docstring Auto-Generation
 * 5. Safe Mutations Analysis
 *
 * Usage:
 *   node orchestrate.js --branch <branch-name>
 *
 * The --branch parameter is required and specifies which git branch is being analyzed.
 * Analysis results will be output to branch-specific directories to allow side-by-side
 * comparison of results from different branches.
 */

const { execSync } = require("child_process")
const path = require("path")
const fs = require("fs")
const utils = require("./utils")

// Parse command-line arguments
const args = process.argv.slice(2)
const branchIndex = args.indexOf("--branch")

// Check if branch is specified
if (branchIndex === -1 || !args[branchIndex + 1]) {
	console.error("[ERROR] Branch must be specified with --branch argument")
	console.error("Usage: node orchestrate.js --branch <branch-name>")
	process.exit(1)
}

// Get the branch name
const branchName = args[branchIndex + 1]

// Set the branch in utils
utils.setBranch(branchName)

// Define the scripts to run in order
const SCRIPTS = [
	{
		name: "API Contract Analysis",
		command: "node ./api_contract_analyzer_ts.js",
		outputCheck: `./branches/${branchName}/api_contracts/___index.json`,
	},
	{
		name: "Dependency Graph Generation",
		command: "node ./dependency_graph_generator_ts.js",
		outputCheck: `./branches/${branchName}/dependency_graph/dependency_index.json`,
	},
	{
		name: "Docstring Extraction",
		command: "node ./docstring_extractor.js",
		outputCheck: `./branches/${branchName}/docstring_inventory/___docstrings_index.json`,
	},
	{
		name: "Docstring Auto-Generation",
		command: "node ./docstring_auto_generator.js",
		outputCheck: `./branches/${branchName}/generated_docstring_inventory/___generated_docstrings_index.json`,
	},
	{
		name: "Safe Mutations Analysis",
		command: "node ./safe_mutations_analyzer.js",
		outputCheck: `./branches/${branchName}/safe_mutations_analysis/___safe_mutations_index.json`,
	},
]

/**
 * Runs a script and returns whether it was successful
 * @param {string} command - Command to run
 * @param {string} name - Name of the script for logging
 * @returns {boolean} Whether the script ran successfully
 */
function runScript(command, name) {
	console.log(`\n[RUNNING] ${name}...`)
	const startTime = Date.now()

	try {
		// Pass branch as an environment variable
		execSync(command, {
			stdio: "inherit",
			env: {
				...process.env,
				ANALYSIS_BRANCH: branchName,
			},
		})
		const duration = ((Date.now() - startTime) / 1000).toFixed(2)
		console.log(`[SUCCESS] ${name} completed in ${duration}s`)
		return true
	} catch (error) {
		const duration = ((Date.now() - startTime) / 1000).toFixed(2)
		console.error(`[FAILED] ${name} failed after ${duration}s: ${error.message}`)
		return false
	}
}

/**
 * Main function to orchestrate script execution
 */
function main() {
	console.log("========================================")
	console.log("   Code Analysis Orchestration Script   ")
	console.log("========================================\n")

	const startTime = Date.now()
	let allSuccessful = true

	// Process each script in order
	for (const script of SCRIPTS) {
		// Run the script
		const success = runScript(script.command, script.name)

		// If the script failed, stop the process
		if (!success) {
			allSuccessful = false
			console.error(`\n[ERROR] Orchestration stopped due to failure in ${script.name}`)
			break
		}

		// Verify output was created
		if (!fs.existsSync(script.outputCheck)) {
			console.error(`\n[ERROR] ${script.name} did not produce expected output: ${script.outputCheck}`)
			allSuccessful = false
			break
		}
	}

	// Report final status
	const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2)
	if (allSuccessful) {
		console.log(`\n[COMPLETE] All analysis steps completed successfully in ${totalDuration}s`)
	} else {
		console.error(`\n[INCOMPLETE] Orchestration failed after ${totalDuration}s`)
		process.exit(1)
	}
}

// Run the main function
main()
