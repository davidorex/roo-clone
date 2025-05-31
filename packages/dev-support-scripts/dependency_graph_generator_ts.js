#!/usr/bin/env node
/**
 * Dependency Graph Generator for TypeScript
 *
 * This script analyzes import/export relationships between TypeScript modules
 * to create a comprehensive dependency map of the codebase. It identifies
 * circular dependencies, subsystem boundaries, and usage patterns.
 */

const fs = require("fs")
const path = require("path")
const ts = require("typescript")
const utils = require("./utils")
const Parser = require("web-tree-sitter")
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads")
const os = require("os")

// Type definitions
/**
 * @typedef {Object} UsageLocation
 * @property {number} lineno - Line number where the import is used
 * @property {string} context - Context of the usage (surrounding code)
 * @property {string} type - Type of usage (import, reference)
 */

/**
 * @typedef {Object} ImportRelation
 * @property {string} module - Imported module name
 * @property {string} type - Type of import (direct, re-export, dynamic)
 * @property {number} usage_count - Number of times the import is used
 * @property {boolean} is_type_only - Whether the import is type-only
 * @property {UsageLocation[]} usage_locations - Locations where the import is used
 */

/**
 * @typedef {Object} ModuleMetrics
 * @property {number} centrality - Number of modules importing this module
 * @property {number} fanout - Number of modules this module imports
 * @property {number} dependency_depth - Maximum path length to a leaf node
 * @property {number} usage_count - Total number of import usages
 */

/**
 * @typedef {Object} ClassInfo
 * @property {string} type - Type of class
 * @property {string[]} methods - Method names
 * @property {string[]} attributes - Attribute names
 */

/**
 * @typedef {Object} FunctionInfo
 * @property {string} type - Type of function
 * @property {string[]} parameters - Parameter names
 * @property {string} return_type - Return type
 */

/**
 * @typedef {Object} ModuleNode
 * @property {string} module_name - Module name
 * @property {string} file_path - File path
 * @property {string|null} docstring - Module documentation
 * @property {ImportRelation[]} imports - Modules imported by this module
 * @property {string[]} imported_by - Modules that import this module
 * @property {ModuleMetrics} metrics - Module metrics
 * @property {string|null} subsystem - Subsystem this module belongs to
 * @property {Object.<string, ClassInfo>} classes - Classes defined in this module
 * @property {Object.<string, FunctionInfo>} functions - Functions defined in this module
 */

/**
 * @typedef {Object} SubsystemBoundary
 * @property {string} from_module - Source module
 * @property {string} from_subsystem - Source subsystem
 * @property {string} to_module - Target module
 * @property {string} to_subsystem - Target subsystem
 * @property {string} type - Type of dependency
 * @property {number} usage_count - Number of usages
 * @property {boolean} is_type_only - Whether the dependency is type-only
 */

/**
 * @typedef {Object} EntanglementMetrics
 * @property {number} cycleCount - Number of cycles the module is involved in
 * @property {number} maxCycleLength - Length of the longest cycle
 * @property {number} totalCyclePaths - Total sum of all cycle paths
 * @property {number} entanglementScore - Overall entanglement score
 * @property {number} cycles - Number of cycles (for reference)
 */

/**
 * @typedef {Object} SubsystemChurnMetrics
 * @property {string} fromSubsystem - Source subsystem
 * @property {string} toSubsystem - Target subsystem
 * @property {number} count - Number of dependencies
 * @property {number} typeOnlyCount - Number of type-only dependencies
 * @property {string[]} uniqueFromModules - List of unique source modules
 * @property {string[]} uniqueToModules - List of unique target modules
 * @property {number} uniqueFromModuleCount - Number of unique source modules
 * @property {number} uniqueToModuleCount - Number of unique target modules
 * @property {number} fromModulePercentage - Percentage of source subsystem modules involved
 * @property {number} toModulePercentage - Percentage of target subsystem modules involved
 * @property {number} churnScore - Cross-subsystem coupling score
 */

/**
 * Class that maintains the dependency graph.
 */
class DependencyGraph {
	constructor() {
		/** @type {Map<string, ModuleNode>} */
		this.nodes = new Map()

		/** @type {Map<string, string[]>} */
		this.subsystems = new Map()

		/** @type {Object.<string, RegExp[]>} */
		this.subsystemPatterns = {
			core: [/\/src\/core\//],
			components: [/\/src\/components\//],
			services: [/\/src\/services\//],
			utils: [/\/src\/utils\//],
			pages: [/\/src\/pages\//],
			hooks: [/\/src\/hooks\//],
			contexts: [/\/src\/contexts\//],
			api: [/\/src\/api\//],
			types: [/\/src\/types\//],
			constants: [/\/src\/constants\//],
			tests: [/\/tests\//],
			mocks: [/\/mocks\//],
		}
	}

	/**
	 * Add a node to the dependency graph.
	 *
	 * @param {string} moduleName - Module name
	 * @param {string} filePath - File path
	 * @param {string|null} subsystem - Subsystem name
	 * @returns {ModuleNode} The created or existing node
	 */
	addNode(moduleName, filePath, subsystem = null) {
		if (!this.nodes.has(moduleName)) {
			/** @type {ModuleNode} */
			const node = {
				module_name: moduleName,
				file_path: filePath,
				docstring: null,
				imports: [],
				imported_by: [],
				metrics: {
					centrality: 0,
					fanout: 0,
					dependency_depth: 0,
					usage_count: 0,
				},
				subsystem,
				classes: {},
				functions: {},
			}

			this.nodes.set(moduleName, node)

			// Add to subsystem map
			if (subsystem) {
				if (!this.subsystems.has(subsystem)) {
					this.subsystems.set(subsystem, [])
				}
				this.subsystems.get(subsystem).push(moduleName)
			}
		}

		return this.nodes.get(moduleName)
	}

	/**
	 * Add an import relationship between modules.
	 *
	 * @param {string} fromModule - Importing module
	 * @param {string} toModule - Imported module
	 * @param {string} importType - Type of import
	 * @param {boolean} isTypeOnly - Whether the import is type-only
	 */
	addImport(fromModule, toModule, importType = "direct", isTypeOnly = false) {
		try {
			// Add import relationship
			const fromNode = this.nodes.get(fromModule)
			if (!fromNode) return

			// Check if import already exists
			const existingImport = fromNode.imports.find((imp) => imp.module === toModule)

			if (existingImport) {
				existingImport.usage_count++
				if (isTypeOnly && !existingImport.is_type_only) {
					existingImport.is_type_only = false // At least one import is not type-only
				}
			} else {
				fromNode.imports.push({
					module: toModule,
					type: importType,
					usage_count: 1,
					is_type_only: isTypeOnly,
					usage_locations: [],
				})
			}

			// Update imported_by relationship
			const toNode = this.nodes.get(toModule)
			if (toNode && !toNode.imported_by.includes(fromModule)) {
				toNode.imported_by.push(fromModule)
			}
		} catch (error) {
			console.error(`Error adding import from ${fromModule} to ${toModule}: ${error}`)
		}
	}

	/**
	 * Add a usage location for an import.
	 *
	 * @param {string} fromModule - Importing module
	 * @param {string} toModule - Imported module
	 * @param {number} lineNumber - Line number of usage
	 * @param {string} context - Context of usage
	 * @param {string} usageType - Type of usage
	 */
	addUsageLocation(fromModule, toModule, lineNumber, context, usageType = "reference") {
		try {
			const fromNode = this.nodes.get(fromModule)
			if (!fromNode) return

			const importRelation = fromNode.imports.find((imp) => imp.module === toModule)
			if (!importRelation) return

			if (!importRelation.usage_locations) {
				importRelation.usage_locations = []
			}

			importRelation.usage_locations.push({
				lineno: lineNumber,
				context,
				type: usageType,
			})
		} catch (error) {
			console.error(`Error adding usage location from ${fromModule} to ${toModule}: ${error}`)
		}
	}

	/**
	 * Calculate metrics for all nodes in the graph.
	 */
	calculateMetrics() {
		try {
			// Calculate centrality (number of modules importing this module)
			for (const [moduleName, node] of this.nodes.entries()) {
				node.metrics.centrality = node.imported_by.length
				node.metrics.fanout = node.imports.length
				node.metrics.usage_count = node.imports.reduce((sum, imp) => sum + imp.usage_count, 0)

				// Calculate dependency depth (max path length to a leaf node)
				node.metrics.dependency_depth = this.calculateDependencyDepth(moduleName, new Set())
			}
		} catch (error) {
			console.error(`Error calculating metrics: ${error}`)
		}
	}

	/**
	 * Calculate the dependency depth for a module.
	 *
	 * @param {string} moduleName - Module name
	 * @param {Set<string>} visited - Set of visited modules
	 * @returns {number} Dependency depth
	 */
	calculateDependencyDepth(moduleName, visited) {
		try {
			if (visited.has(moduleName)) return 0 // Prevent circular dependency issues

			visited.add(moduleName)
			const node = this.nodes.get(moduleName)
			if (!node || node.imports.length === 0) return 0

			const depths = node.imports.map((imp) => this.calculateDependencyDepth(imp.module, new Set(visited)) + 1)
			return Math.max(...depths, 0) // Ensure we return at least 0
		} catch (error) {
			console.error(`Error calculating dependency depth for ${moduleName}: ${error}`)
			return 0
		}
	}

	/**
	 * Find circular dependencies in the graph.
	 *
	 * @returns {string[][]} List of circular dependency chains
	 */
	findCircularDependencies() {
		const cycles = []

		try {
			const visited = new Map()
			const path = []

			const dfs = (current) => {
				if (path.includes(current)) {
					// Found cycle
					const cycleStart = path.indexOf(current)
					cycles.push(path.slice(cycleStart).concat(current))
					return
				}

				if (visited.get(current) === true) return

				visited.set(current, true)
				path.push(current)

				const node = this.nodes.get(current)
				if (node) {
					for (const imp of node.imports) {
						dfs(imp.module)
					}
				}

				path.pop()
			}

			for (const moduleName of this.nodes.keys()) {
				visited.clear()
				path.length = 0
				dfs(moduleName)
			}
		} catch (error) {
			console.error(`Error finding circular dependencies: ${error}`)
		}

		return cycles
	}

	/**
	 * Determine the subsystem for a file path.
	 *
	 * @param {string} filePath - File path
	 * @returns {string|null} Subsystem name or null
	 */
	determineSubsystem(filePath) {
		try {
			// Check each subsystem's patterns
			for (const [subsystem, patterns] of Object.entries(this.subsystemPatterns)) {
				if (patterns.some((pattern) => pattern.test(filePath))) {
					return subsystem
				}
			}

			// Legacy fallback patterns
			if (filePath.includes("/src/core/")) return "core"
			if (filePath.includes("/src/services/")) return "services"
			if (filePath.includes("/src/components/")) return "components"
			if (filePath.includes("/src/utils/")) return "utils"
		} catch (error) {
			console.error(`Error determining subsystem for ${filePath}: ${error}`)
		}

		return null
	}

	/**
	 * Find subsystem boundaries in the graph.
	 *
	 * @returns {SubsystemBoundary[]} List of subsystem boundaries
	 */
	findSubsystemBoundaries() {
		/** @type {SubsystemBoundary[]} */
		const boundaries = []

		try {
			for (const [moduleName, node] of this.nodes.entries()) {
				const fromSubsystem = node.subsystem
				if (!fromSubsystem) continue

				for (const imp of node.imports) {
					const toNode = this.nodes.get(imp.module)
					if (!toNode || !toNode.subsystem || toNode.subsystem === fromSubsystem) continue

					boundaries.push({
						from_module: moduleName,
						from_subsystem: fromSubsystem,
						to_module: imp.module,
						to_subsystem: toNode.subsystem,
						type: imp.type,
						usage_count: imp.usage_count,
						is_type_only: imp.is_type_only,
					})
				}
			}
		} catch (error) {
			console.error(`Error finding subsystem boundaries: ${error}`)
		}

		return boundaries
	}

	/**
	 * Calculate the entanglement depth for each module involved in circular dependencies.
	 * This measures how deeply each module is involved in dependency cycles.
	 *
	 * @returns {Map<string, EntanglementMetrics>} Module to entanglement metrics mapping
	 */
	calculateEntanglementDepth() {
		const entanglementMap = new Map()
		const cycles = this.findCircularDependencies()

		return utils.safeExecute(
			() => {
				// Initialize with all modules
				for (const moduleName of this.nodes.keys()) {
					entanglementMap.set(moduleName, {
						cycleCount: 0, // Number of cycles the module is involved in
						maxCycleLength: 0, // Length of the longest cycle it's in
						totalCyclePaths: 0, // Total sum of all cycle paths it's involved in
						cycles: [], // List of cycles (for reference)
					})
				}

				// Calculate metrics for each cycle
				for (const cycle of cycles) {
					const cycleLength = cycle.length

					for (const moduleName of cycle) {
						const metrics = entanglementMap.get(moduleName)
						if (metrics) {
							metrics.cycleCount++
							metrics.maxCycleLength = Math.max(metrics.maxCycleLength, cycleLength)
							metrics.totalCyclePaths += cycleLength
							metrics.cycles.push(cycle)
						}
					}
				}

				// Calculate an overall entanglement score (higher = more entangled)
				for (const [moduleName, metrics] of entanglementMap.entries()) {
					// Score formula: number of cycles × average cycle length × max cycle length
					metrics.entanglementScore =
						metrics.cycleCount > 0
							? metrics.cycleCount *
								(metrics.totalCyclePaths / metrics.cycleCount) *
								metrics.maxCycleLength
							: 0

					// Don't serialize the full cycles list to keep output size reasonable
					metrics.cycles = metrics.cycles.length
				}

				return entanglementMap
			},
			"calculating entanglement depth",
			new Map(),
		)
	}

	/**
	 * Analyze dependencies between subsystems to identify "churn" or volatility.
	 *
	 * @returns {Object.<string, SubsystemChurnMetrics>} Subsystem dependency metrics
	 */
	analyzeSubsystemChurn() {
		return utils.safeExecute(
			() => {
				const boundaries = this.findSubsystemBoundaries()
				const subsystemDeps = {}
				const subsystemModules = {}

				// Initialize subsystem tracking
				for (const subsystem of this.subsystems.keys()) {
					subsystemModules[subsystem] = this.subsystems.get(subsystem).length
				}

				// Track dependencies between subsystems
				for (const boundary of boundaries) {
					const key = `${boundary.from_subsystem} -> ${boundary.to_subsystem}`

					if (!subsystemDeps[key]) {
						subsystemDeps[key] = {
							count: 0,
							fromSubsystem: boundary.from_subsystem,
							toSubsystem: boundary.to_subsystem,
							typeOnlyCount: 0,
							moduleCount: 0,
							uniqueFromModules: new Set(),
							uniqueToModules: new Set(),
						}
					}

					subsystemDeps[key].count++
					subsystemDeps[key].uniqueFromModules.add(boundary.from_module)
					subsystemDeps[key].uniqueToModules.add(boundary.to_module)

					if (boundary.is_type_only) {
						subsystemDeps[key].typeOnlyCount++
					}
				}

				// Calculate additional metrics and convert sets to counts
				for (const key in subsystemDeps) {
					const dep = subsystemDeps[key]
					dep.uniqueFromModuleCount = dep.uniqueFromModules.size
					dep.uniqueToModuleCount = dep.uniqueToModules.size

					// Calculate percentages of modules involved
					const fromTotalModules = subsystemModules[dep.fromSubsystem] || 1
					const toTotalModules = subsystemModules[dep.toSubsystem] || 1

					dep.fromModulePercentage = (dep.uniqueFromModules.size / fromTotalModules) * 100
					dep.toModulePercentage = (dep.uniqueToModules.size / toTotalModules) * 100

					// Calculate "churn" score - higher values indicate more cross-subsystem coupling
					// This accounts for both the absolute number of dependencies and the proportion of modules involved
					dep.churnScore = dep.count * (dep.fromModulePercentage / 100) * (dep.toModulePercentage / 100)

					// Convert sets to arrays for JSON serialization
					dep.uniqueFromModules = Array.from(dep.uniqueFromModules)
					dep.uniqueToModules = Array.from(dep.uniqueToModules)
				}

				return subsystemDeps
			},
			"analyzing subsystem churn",
			{},
		)
	}
}

/**
 * Class that analyzes imports in a TypeScript file.
 */
class ImportVisitor {
	/**
	 * Create a new ImportVisitor.
	 *
	 * @param {DependencyGraph} graph - Dependency graph
	 * @param {string} moduleName - Module name
	 * @param {string} filePath - File path
	 */
	constructor(graph, moduleName, filePath) {
		this.graph = graph
		this.currentModule = moduleName
		this.filePath = filePath
		this.moduleCache = new Map()

		// Add node for current module
		this.graph.addNode(moduleName, filePath, this.graph.determineSubsystem(filePath))
	}

	/**
	 * Visit a source file to extract imports.
	 *
	 * @param {ts.SourceFile} sourceFile - Source file to visit
	 */
	visitSourceFile(sourceFile) {
		try {
			// Extract module docstring
			let moduleDocstring = null
			try {
				moduleDocstring = utils.extractDocstring(sourceFile)
			} catch (error) {
				console.error(`Error extracting docstring from ${this.currentModule}: ${error}`)
			}

			if (moduleDocstring) {
				const node = this.graph.nodes.get(this.currentModule)
				if (node) {
					node.docstring = moduleDocstring
				}
			}

			// Visit all nodes in the source file
			this.visitNode(sourceFile)
		} catch (error) {
			console.error(`Error visiting source file ${this.filePath}: ${error}`)
		}
	}

	/**
	 * Visit a node in the AST.
	 *
	 * @param {ts.Node} node - Node to visit
	 * @param {Set<ts.Node>} visited - Set of visited nodes
	 */
	visitNode(node, visited = new Set()) {
		try {
			// Prevent circular visitation
			if (visited.has(node)) return
			visited.add(node)

			// Handle different node types
			if (ts.isImportDeclaration(node)) {
				this.visitImportDeclaration(node)
			} else if (ts.isExportDeclaration(node)) {
				this.visitExportDeclaration(node)
			} else if (ts.isImportEqualsDeclaration(node)) {
				this.visitImportEqualsDeclaration(node)
			} else if (ts.isCallExpression(node) && this.isDynamicImport(node)) {
				this.visitDynamicImport(node)
			}

			// Continue traversal with updated visited set
			ts.forEachChild(node, (child) => this.visitNode(child, visited))
		} catch (error) {
			console.error(`Error visiting node in ${this.currentModule}: ${error}`)
		}
	}

	/**
	 * Check if a call expression is a dynamic import.
	 *
	 * @param {ts.CallExpression} node - Call expression node
	 * @returns {boolean} Whether the call is a dynamic import
	 */
	isDynamicImport(node) {
		return (
			node.expression.kind === ts.SyntaxKind.ImportKeyword &&
			node.arguments.length === 1 &&
			ts.isStringLiteral(node.arguments[0])
		)
	}

	/**
	 * Visit an import declaration.
	 *
	 * @param {ts.ImportDeclaration} node - Import declaration node
	 */
	visitImportDeclaration(node) {
		try {
			// Process import declaration
			if (!node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier)) {
				return
			}

			const moduleSpecifier = node.moduleSpecifier.text

			// Resolve the module name
			const importedModule = this.resolveModuleName(moduleSpecifier)
			if (!importedModule) return

			// Check if it's a type-only import
			const isTypeOnly = node.importClause?.isTypeOnly || false

			// Add import relationship
			this.graph.addImport(this.currentModule, importedModule, "direct", isTypeOnly)

			// Track usage locations
			const line = ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.getStart()).line + 1
			const context = node.getText()

			this.graph.addUsageLocation(this.currentModule, importedModule, line, context, "import")
		} catch (error) {
			console.error(`Error processing import declaration in ${this.currentModule}: ${error}`)
		}
	}

	/**
	 * Visit an export declaration.
	 *
	 * @param {ts.ExportDeclaration} node - Export declaration node
	 */
	visitExportDeclaration(node) {
		try {
			// Only process export ... from "module"
			if (!node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier)) {
				return
			}

			const moduleSpecifier = node.moduleSpecifier.text

			// Resolve the module name
			const importedModule = this.resolveModuleName(moduleSpecifier)
			if (!importedModule) return

			// Check if it's a type-only export
			const isTypeOnly = node.isTypeOnly || false

			// Add import relationship (re-export is still an import dependency)
			this.graph.addImport(this.currentModule, importedModule, "re-export", isTypeOnly)

			// Track usage locations
			const line = ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.getStart()).line + 1
			const context = node.getText()

			this.graph.addUsageLocation(this.currentModule, importedModule, line, context, "re-export")
		} catch (error) {
			console.error(`Error processing export declaration in ${this.currentModule}: ${error}`)
		}
	}

	/**
	 * Visit an import equals declaration.
	 *
	 * @param {ts.ImportEqualsDeclaration} node - Import equals declaration node
	 */
	visitImportEqualsDeclaration(node) {
		try {
			// Only process external module references
			if (!node.moduleReference || !ts.isExternalModuleReference(node.moduleReference)) {
				return
			}

			if (!node.moduleReference.expression || !ts.isStringLiteral(node.moduleReference.expression)) {
				return
			}

			const moduleSpecifier = node.moduleReference.expression.text

			// Resolve the module name
			const importedModule = this.resolveModuleName(moduleSpecifier)
			if (!importedModule) return

			// Add import relationship
			this.graph.addImport(this.currentModule, importedModule, "direct", false)

			// Track usage locations
			const line = ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.getStart()).line + 1
			const context = node.getText()

			this.graph.addUsageLocation(this.currentModule, importedModule, line, context, "import")
		} catch (error) {
			console.error(`Error processing import equals declaration in ${this.currentModule}: ${error}`)
		}
	}

	/**
	 * Visit a dynamic import.
	 *
	 * @param {ts.CallExpression} node - Dynamic import call expression
	 */
	visitDynamicImport(node) {
		try {
			const moduleSpecifier = node.arguments[0].text

			// Resolve the module name
			const importedModule = this.resolveModuleName(moduleSpecifier)
			if (!importedModule) return

			// Add import relationship
			this.graph.addImport(this.currentModule, importedModule, "dynamic", false)

			// Track usage locations
			const line = ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.getStart()).line + 1
			const context = node.getText()

			this.graph.addUsageLocation(this.currentModule, importedModule, line, context, "dynamic-import")
		} catch (error) {
			console.error(`Error processing dynamic import in ${this.currentModule}: ${error}`)
		}
	}

	/**
	 * Resolve a module specifier to a module name.
	 *
	 * @param {string} specifier - Module specifier
	 * @returns {string|null} Resolved module name
	 */
	resolveModuleName(specifier) {
		return utils.resolveModuleName(specifier, this.filePath, this.moduleCache)
	}
}

/**
 * Class that analyzes how imported modules are used.
 */
class UsageVisitor {
	/**
	 * Create a new UsageVisitor.
	 *
	 * @param {DependencyGraph} graph - Dependency graph
	 * @param {string} moduleName - Module name
	 */
	constructor(graph, moduleName) {
		this.graph = graph
		this.currentModule = moduleName
		this.imports = new Map() // Import -> Symbol mapping
		this.moduleCache = new Map()
	}

	/**
	 * Visit a source file to track import usage.
	 *
	 * @param {ts.SourceFile} sourceFile - Source file to visit
	 */
	visitSourceFile(sourceFile) {
		try {
			// First collect all imports and their symbols
			this.collectImports(sourceFile)

			// Then track usage of imported symbols
			this.visitNode(sourceFile)
		} catch (error) {
			console.error(`Error visiting source file for usage tracking in ${this.currentModule}: ${error}`)
		}
	}

	/**
	 * Collect all imports and their symbols from a source file.
	 *
	 * @param {ts.SourceFile} sourceFile - Source file to collect imports from
	 */
	collectImports(sourceFile) {
		try {
			ts.forEachChild(sourceFile, (node) => {
				if (ts.isImportDeclaration(node) && node.importClause) {
					if (!node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier)) {
						return
					}

					const moduleSpecifier = node.moduleSpecifier.text
					const importedModule = this.resolveModuleName(moduleSpecifier)

					if (!importedModule) return

					// Track imported symbols
					if (node.importClause.name) {
						// Default import: import Name from 'module'
						this.addImportMapping(importedModule, node.importClause.name.text)
					}

					if (node.importClause.namedBindings) {
						if (ts.isNamespaceImport(node.importClause.namedBindings)) {
							// Namespace import: import * as Name from 'module'
							this.addImportMapping(importedModule, node.importClause.namedBindings.name.text)
						} else if (ts.isNamedImports(node.importClause.namedBindings)) {
							// Named imports: import { Name1, Name2 } from 'module'
							for (const element of node.importClause.namedBindings.elements) {
								const importName = element.propertyName?.text || element.name.text
								this.addImportMapping(importedModule, element.name.text)
							}
						}
					}
				}
			})
		} catch (error) {
			console.error(`Error collecting imports in ${this.currentModule}: ${error}`)
		}
	}

	/**
	 * Add an import mapping.
	 *
	 * @param {string} module - Imported module
	 * @param {string} symbol - Imported symbol
	 */
	addImportMapping(module, symbol) {
		try {
			if (!this.imports.has(module)) {
				this.imports.set(module, [])
			}
			this.imports.get(module).push(symbol)
		} catch (error) {
			console.error(`Error adding import mapping for ${module}.${symbol} in ${this.currentModule}: ${error}`)
		}
	}

	/**
	 * Visit a node in the AST.
	 *
	 * @param {ts.Node} node - Node to visit
	 * @param {Set<ts.Node>} visited - Set of visited nodes
	 */
	visitNode(node, visited = new Set()) {
		try {
			// Prevent circular visitation
			if (visited.has(node)) return
			visited.add(node)

			// Skip import declarations (already processed)
			if (ts.isImportDeclaration(node)) return

			// Check if node is an identifier that might be from an import
			if (ts.isIdentifier(node)) {
				this.checkIdentifierUsage(node)
			}

			// Continue traversal with updated visited set
			ts.forEachChild(node, (child) => this.visitNode(child, visited))
		} catch (error) {
			console.error(`Error visiting node for usage tracking in ${this.currentModule}: ${error}`)
		}
	}

	/**
	 * Check if an identifier is from an import.
	 *
	 * @param {ts.Identifier} id - Identifier node
	 */
	checkIdentifierUsage(id) {
		try {
			const symbolName = id.text

			// Check if this identifier comes from an import
			for (const [module, symbols] of this.imports.entries()) {
				if (symbols.includes(symbolName)) {
					// Found usage of imported symbol
					const line = ts.getLineAndCharacterOfPosition(id.getSourceFile(), id.getStart()).line + 1
					const context = this.getContext(id)

					this.graph.addUsageLocation(this.currentModule, module, line, context, "reference")
					break
				}
			}
		} catch (error) {
			console.error(`Error checking identifier usage in ${this.currentModule}: ${error}`)
		}
	}

	/**
	 * Get the context of a node.
	 *
	 * @param {ts.Node} node - Node to get context for
	 * @returns {string} Context string
	 */
	getContext(node) {
		try {
			// Get parent statement or declaration for context
			let current = node
			while (
				current.parent &&
				!ts.isStatement(current) &&
				!ts.isClassDeclaration(current) &&
				!ts.isFunctionDeclaration(current) &&
				!ts.isMethodDeclaration(current)
			) {
				current = current.parent
			}

			// Truncate if too long
			const text = current.getText()
			const maxLength = 100
			if (text.length > maxLength) {
				return text.substring(0, maxLength - 3) + "..."
			}

			return text
		} catch (error) {
			console.error(`Error getting context in ${this.currentModule}: ${error}`)
			return "Error getting context"
		}
	}

	/**
	 * Resolve a module specifier to a module name.
	 *
	 * @param {string} specifier - Module specifier
	 * @returns {string|null} Resolved module name
	 */
	resolveModuleName(specifier) {
		const node = this.graph.nodes.get(this.currentModule)
		if (!node) return null

		return utils.resolveModuleName(specifier, node.file_path, this.moduleCache)
	}
}

/**
 * Class that extracts class and function information.
 */
class StructureVisitor {
	/**
	 * Create a new StructureVisitor.
	 *
	 * @param {DependencyGraph} graph - Dependency graph
	 * @param {string} moduleName - Module name
	 */
	constructor(graph, moduleName) {
		this.graph = graph
		this.currentModule = moduleName
		this.currentClass = null
	}

	/**
	 * Visit a source file to extract structure information.
	 *
	 * @param {ts.SourceFile} sourceFile - Source file to visit
	 */
	visitSourceFile(sourceFile) {
		try {
			// Visit all nodes in the source file
			this.visitNode(sourceFile)
		} catch (error) {
			console.error(`Error visiting source file for structure in ${this.currentModule}: ${error}`)
		}
	}

	/**
	 * Visit a node in the AST.
	 *
	 * @param {ts.Node} node - Node to visit
	 * @param {Set<ts.Node>} visited - Set of visited nodes
	 */
	visitNode(node, visited = new Set()) {
		try {
			// Prevent circular visitation
			if (visited.has(node)) return
			visited.add(node)

			if (ts.isClassDeclaration(node)) {
				this.visitClassDeclaration(node)
			} else if (ts.isFunctionDeclaration(node)) {
				this.visitFunctionDeclaration(node)
			}

			// Continue traversal with updated visited set
			ts.forEachChild(node, (child) => this.visitNode(child, visited))
		} catch (error) {
			console.error(`Error visiting node for structure in ${this.currentModule}: ${error}`)
		}
	}

	/**
	 * Visit a class declaration.
	 *
	 * @param {ts.ClassDeclaration} node - Class declaration node
	 */
	visitClassDeclaration(node) {
		try {
			if (!node.name) return // Skip anonymous classes

			const className = node.name.text
			this.currentClass = className

			const moduleNode = this.graph.nodes.get(this.currentModule)
			if (!moduleNode) return

			// Extract methods and attributes
			const methods = []
			const attributes = []

			for (const member of node.members) {
				if (ts.isMethodDeclaration(node) && member.name) {
					methods.push(member.name.getText())
				} else if (ts.isPropertyDeclaration(node) && member.name) {
					attributes.push(member.name.getText())
				}
			}

			// Add class info to module node
			moduleNode.classes[className] = {
				type: "class",
				methods,
				attributes,
			}

			this.currentClass = null
		} catch (error) {
			console.error(`Error processing class ${node.name?.text} in ${this.currentModule}: ${error}`)
			this.currentClass = null
		}
	}

	/**
	 * Visit a function declaration.
	 *
	 * @param {ts.FunctionDeclaration} node - Function declaration node
	 */
	visitFunctionDeclaration(node) {
		try {
			if (!node.name) return // Skip anonymous functions

			const functionName = node.name.text

			const moduleNode = this.graph.nodes.get(this.currentModule)
			if (!moduleNode) return

			// Extract parameters
			const parameters = node.parameters.map((p) => p.name?.getText() || "unnamed").filter(Boolean)

			// Add function info to module node
			moduleNode.functions[functionName] = {
				type: "function",
				parameters,
				return_type: node.type ? node.type.getText() : "any",
			}
		} catch (error) {
			console.error(`Error processing function ${node.name?.text} in ${this.currentModule}: ${error}`)
		}
	}
}

/**
 * Generate output files from the dependency graph.
 *
 * @param {DependencyGraph} graph - Dependency graph
 * @param {string} targetDir - Target directory analyzed
 */
function generateOutputFiles(graph, targetDir) {
	try {
		// Write individual module dependencies
		for (const [moduleName, node] of graph.nodes.entries()) {
			const sanitizedName = moduleName.replace(/\//g, "_").replace(/\./g, "_")
			const filename = `${sanitizedName}_dependencies.json`

			utils.writeJsonFile(
				path.join(utils.DEPENDENCY_GRAPH_DIR, filename),
				node,
				2, // indent
				true, // add header
			)
		}

		// Write dependency index
		const indexData = {
			modules: Array.from(graph.nodes.values()).map((node) => ({
				name: node.module_name,
				file: node.module_name.replace(/\//g, "_").replace(/\./g, "_") + "_dependencies.json",
				subsystem: node.subsystem,
				has_insights: node.imports.length > 0 || node.imported_by.length > 0,
				class_count: Object.keys(node.classes).length,
				function_count: Object.keys(node.functions).length,
			})),
			subsystems: Array.from(graph.subsystems.keys()),
			analysis_files: {
				circular_dependencies: "circular_dependencies.json",
				interface_implementations: "interface_implementations.json",
				subsystem_boundaries: "subsystem_boundaries.json",
				entanglement_depth: "entanglement_depth.json",
				subsystem_churn: "subsystem_churn.json",
			},
			total_modules: graph.nodes.size,
			total_subsystems: graph.subsystems.size,
			stats: {
				avg_dependencies: calculateAverageDependencies(graph),
				most_central_module: findMostCentralModule(graph),
				total_classes: countClasses(graph),
				total_functions: countFunctions(graph),
			},
		}

		utils.writeJsonFile(
			path.join(utils.DEPENDENCY_GRAPH_DIR, "dependency_index.json"),
			indexData,
			2, // indent
			true, // add header
		)

		// Write circular dependencies
		const circularDeps = graph.findCircularDependencies()
		utils.writeJsonFile(
			path.join(utils.DEPENDENCY_GRAPH_DIR, "circular_dependencies.json"),
			{ circular_dependencies: circularDeps, count: circularDeps.length },
			2, // indent
			true, // add header
		)
		// Write subsystem boundaries
		const boundaries = graph.findSubsystemBoundaries()
		utils.writeJsonFile(
			path.join(utils.DEPENDENCY_GRAPH_DIR, "subsystem_boundaries.json"),
			boundaries,
			2, // indent
			true, // add header
		)

		// Add entanglement depth analysis
		const entanglementData = {}
		for (const [moduleName, metrics] of graph.calculateEntanglementDepth().entries()) {
			if (metrics.entanglementScore > 0) {
				// Only include modules involved in cycles
				entanglementData[moduleName] = metrics
			}
		}

		utils.writeJsonFile(
			path.join(utils.DEPENDENCY_GRAPH_DIR, "entanglement_depth.json"),
			{
				modules: entanglementData,
				most_entangled: Object.entries(entanglementData)
					.sort((a, b) => b[1].entanglementScore - a[1].entanglementScore)
					.slice(0, 10)
					.map(([module, metrics]) => ({
						module,
						score: metrics.entanglementScore,
						cycleCount: metrics.cycleCount,
					})),
			},
			2, // indent
			true, // add header
		)

		// Add subsystem churn analysis
		const subsystemChurn = graph.analyzeSubsystemChurn()
		const subsystemChurnArray = Object.values(subsystemChurn)

		utils.writeJsonFile(
			path.join(utils.DEPENDENCY_GRAPH_DIR, "subsystem_churn.json"),
			{
				dependencies: subsystemChurn,
				highest_churn: subsystemChurnArray
					.sort((a, b) => b.churnScore - a.churnScore)
					.slice(0, 10)
					.map((dep) => ({
						from: dep.fromSubsystem,
						to: dep.toSubsystem,
						score: dep.churnScore,
						dependencyCount: dep.count,
						fromModulePercentage: dep.fromModulePercentage,
					})),
			},
			2, // indent
			true, // add header
		)
	} catch (error) {
		console.error(`Error generating output files: ${error}`)
	}
}

/**
 * Calculate the average number of dependencies per module.
 *
 * @param {DependencyGraph} graph - Dependency graph
 * @returns {number} Average dependencies
 */
function calculateAverageDependencies(graph) {
	try {
		let totalDeps = 0
		for (const node of graph.nodes.values()) {
			totalDeps += node.imports.length
		}
		return graph.nodes.size > 0 ? (totalDeps / graph.nodes.size).toFixed(1) : 0
	} catch (error) {
		console.error(`Error calculating average dependencies: ${error}`)
		return 0
	}
}

/**
 * Find the most central module in the graph.
 *
 * @param {DependencyGraph} graph - Dependency graph
 * @returns {string} Most central module name
 */
function findMostCentralModule(graph) {
	try {
		let mostCentral = null
		let maxCentrality = -1

		for (const [moduleName, node] of graph.nodes.entries()) {
			if (node.metrics.centrality > maxCentrality) {
				maxCentrality = node.metrics.centrality
				mostCentral = moduleName
			}
		}

		return mostCentral || ""
	} catch (error) {
		console.error(`Error finding most central module: ${error}`)
		return ""
	}
}

/**
 * Count the total number of classes in the graph.
 *
 * @param {DependencyGraph} graph - Dependency graph
 * @returns {number} Total class count
 */
function countClasses(graph) {
	try {
		let count = 0
		for (const node of graph.nodes.values()) {
			count += Object.keys(node.classes).length
		}
		return count
	} catch (error) {
		console.error(`Error counting classes: ${error}`)
		return 0
	}
}

/**
 * Count the total number of functions in the graph.
 *
 * @param {DependencyGraph} graph - Dependency graph
 * @returns {number} Total function count
 */
function countFunctions(graph) {
	try {
		let count = 0
		for (const node of graph.nodes.values()) {
			count += Object.keys(node.functions).length
		}
		return count
	} catch (error) {
		console.error(`Error counting functions: ${error}`)
		return 0
	}
}

/**
 * Process a batch of files in a worker thread.
 *
 * @param {string[]} files - Files to process
 * @param {DependencyGraph} graph - Dependency graph for this worker
 * @returns {Object} Module graph data to merge
 */
async function processFileBatch(files, graph) {
	// First pass: collect module info and imports
	for (const file of files) {
		try {
			const moduleName = utils.getModuleNameFromPath(file)
			const sourceFile = utils.parseTypeScriptFile(file)
			if (!sourceFile) continue

			// Add to graph
			const visitor = new ImportVisitor(graph, moduleName, file)
			visitor.visitSourceFile(sourceFile)
		} catch (error) {
			console.error(`Error in first pass for file ${file}: ${error}`)
		}
	}

	// Second pass: analyze usage patterns
	for (const file of files) {
		try {
			const moduleName = utils.getModuleNameFromPath(file)
			const sourceFile = utils.parseTypeScriptFile(file)
			if (!sourceFile) continue

			// Track usage
			const visitor = new UsageVisitor(graph, moduleName)
			visitor.visitSourceFile(sourceFile)
		} catch (error) {
			console.error(`Error in second pass for file ${file}: ${error}`)
		}
	}

	// Third pass: extract class and function information
	for (const file of files) {
		try {
			const moduleName = utils.getModuleNameFromPath(file)
			const sourceFile = utils.parseTypeScriptFile(file)
			if (!sourceFile) continue

			// Extract structure
			const visitor = new StructureVisitor(graph, moduleName)
			visitor.visitSourceFile(sourceFile)
		} catch (error) {
			console.error(`Error in third pass for file ${file}: ${error}`)
		}
	}

	// Return serializable data from the graph
	return {
		nodes: Array.from(graph.nodes.entries()),
		subsystems: Array.from(graph.subsystems.entries()),
	}
}

/**
 * Worker thread implementation.
 */
async function workerThread() {
	try {
		// Initialize tree-sitter in worker
		await utils.initTreeSitter()

		// Create worker's dependency graph
		const graph = new DependencyGraph()

		// Process the files assigned to this worker
		const result = await processFileBatch(workerData.files, graph)

		// Send results back to parent thread
		parentPort.postMessage(result)
	} catch (error) {
		console.error(`Worker error: ${error}`)
		parentPort.postMessage({ error: error.toString() })
	}
}

/**
 * Split array into chunks of specified size.
 *
 * @param {Array} array - Array to split
 * @param {number} chunkSize - Size of each chunk
 * @returns {Array[]} Array of chunks
 */
function chunkArray(array, chunkSize) {
	const chunks = []
	for (let i = 0; i < array.length; i += chunkSize) {
		chunks.push(array.slice(i, i + chunkSize))
	}
	return chunks
}

/**
 * Merge worker results into the main graph.
 *
 * @param {DependencyGraph} mainGraph - Main dependency graph
 * @param {Object[]} results - Results from worker threads
 */
function mergeWorkerResults(mainGraph, results) {
	for (const result of results) {
		// Add nodes from worker
		for (const [moduleName, nodeData] of result.nodes) {
			mainGraph.nodes.set(moduleName, nodeData)
		}

		// Merge subsystems
		for (const [subsystem, modules] of result.subsystems) {
			if (!mainGraph.subsystems.has(subsystem)) {
				mainGraph.subsystems.set(subsystem, [])
			}

			for (const module of modules) {
				if (!mainGraph.subsystems.get(subsystem).includes(module)) {
					mainGraph.subsystems.get(subsystem).push(module)
				}
			}
		}
	}
}

/**
 * Main function to run the dependency graph generator.
 */
async function main() {
	// Only run main thread code in the main thread
	if (!isMainThread) {
		return workerThread()
	}

	try {
		// Parse command-line arguments
		const args = process.argv.slice(2)
		const targetDir = args[0] || "."
		const excludeDirsIndex = args.indexOf("--exclude")
		const excludeDirs = utils.DEFAULT_EXCLUDE_DIRS

		// Resolve the target directory
		const absoluteTargetDir = path.resolve(utils.PROJECT_ROOT, targetDir)

		// Ensure output directory exists
		utils.ensureDirExists(utils.DEPENDENCY_GRAPH_DIR)

		// Initialize tree-sitter
		await utils.initTreeSitter()

		// Find TypeScript files
		const files = utils.findTypeScriptFiles(absoluteTargetDir, excludeDirs)
		console.log(`Found ${files.length} TypeScript files to analyze for dependencies`)

		// Create main dependency graph
		const graph = new DependencyGraph()

		// Determine number of worker threads to use (leave one core free)
		const numWorkers = Math.max(1, os.cpus().length - 1)
		console.log(`Using ${numWorkers} worker threads for parallel processing`)

		// Disable workers for small file counts
		// const useWorkers = files.length > numWorkers * 5 && numWorkers > 1; // Original logic
		const useWorkers = false // Force sequential processing

		if (useWorkers) {
			// Split files into chunks for each worker
			const filesPerWorker = Math.ceil(files.length / numWorkers)
			const fileChunks = chunkArray(files, filesPerWorker)

			// Create and start workers
			const workers = []
			const workerPromises = []

			for (let i = 0; i < fileChunks.length; i++) {
				const worker = new Worker(__filename, {
					workerData: { files: fileChunks[i] },
				})

				const workerPromise = new Promise((resolve, reject) => {
					worker.on("message", resolve)
					worker.on("error", reject)
					worker.on("exit", (code) => {
						if (code !== 0) {
							reject(new Error(`Worker stopped with exit code ${code}`))
						}
					})
				})

				workers.push(worker)
				workerPromises.push(workerPromise)
			}

			// Wait for all workers to complete
			const results = await Promise.all(workerPromises)

			// Merge results from all workers
			mergeWorkerResults(graph, results)

			// Terminate workers
			for (const worker of workers) {
				worker.terminate()
			}
		} else {
			// Process all files in the main thread for small file sets
			console.log("Processing files in main thread")
			await processFileBatch(files, graph)
			// No need to merge as we're working directly on the graph object
		}

		// Calculate metrics
		graph.calculateMetrics()

		// Generate output
		generateOutputFiles(graph, targetDir)

		console.log(`Dependency analysis complete. Results in: ${utils.DEPENDENCY_GRAPH_DIR}`)
	} catch (error) {
		console.error(`Fatal error in dependency graph generator: ${error}`)
		process.exit(1)
	}
}

// Start execution
if (isMainThread) {
	main().catch((error) => {
		console.error("Fatal error:", error)
		process.exit(1)
	})
} else {
	workerThread()
}
