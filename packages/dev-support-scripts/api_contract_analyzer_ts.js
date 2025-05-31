#!/usr/bin/env node
/**
 * API Contract Analyzer for TypeScript
 *
 * This script analyzes TypeScript modules to extract class hierarchies,
 * interfaces, types, and functions to create a comprehensive API documentation.
 * It follows the same output format as the Python implementation to maintain
 * compatibility with existing visualization tools.
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
 * @typedef {Object} TypeInfo
 * @property {string} type - Type name or "union" for union types
 * @property {boolean} isArray - Whether this is an array type
 * @property {boolean} isOptional - Whether this is an optional parameter
 * @property {TypeInfo[]} [unionTypes] - For union types, the member types
 * @property {string[]} [values] - For union or enum types, the possible values
 */

/**
 * @typedef {Object} ParameterInfo
 * @property {string} name - Parameter name
 * @property {boolean} required - Whether parameter is required
 * @property {string} type - Parameter type as string
 */

/**
 * @typedef {Object} FunctionInfo
 * @property {ParameterInfo[]} parameters - Function parameters
 * @property {string|null} docstring - Function documentation
 * @property {Decorator[]} decorators - Function decorators
 * @property {string|null} return_type - Return type of the function
 */

/**
 * @typedef {Object} ImportInfo
 * @property {string} name - Imported name
 * @property {string|null} alias - Import alias if any
 * @property {boolean} from_import - Whether this is a from import
 */

/**
 * @typedef {Object} ClassInfo
 * @property {Object.<string, FunctionInfo>} methods - Class methods
 * @property {Object.<string, string>} attributes - Class attributes with types
 * @property {Object.<string, ClassInfo>} inner_classes - Nested classes
 * @property {string[]} bases - Base classes
 * @property {string|null} docstring - Class documentation
 * @property {string} file_path - Path to the file containing this class
 * @property {Decorator[]} decorators - Class decorators
 */

/**
 * @typedef {Object} InterfaceInfo
 * @property {Object.<string, PropertyInfo>} properties - Interface properties
 * @property {string[]} extends - Interfaces extended by this one
 * @property {string|null} docstring - Interface documentation
 */

/**
 * @typedef {Object} PropertyInfo
 * @property {string} type - Property type
 * @property {boolean} required - Whether property is required
 * @property {string|null} docstring - Property documentation
 */

/**
 * @typedef {Object} Decorator
 * @property {string} name - Decorator name
 * @property {any[]} args - Positional arguments
 * @property {Object.<string, any>} kwargs - Keyword arguments
 */

/**
 * @typedef {Object} ApiSummary
 * @property {number} class_count - Number of classes
 * @property {number} interface_count - Number of interfaces
 * @property {number} type_count - Number of type definitions
 * @property {number} function_count - Number of functions
 * @property {number} attribute_count - Number of attributes
 * @property {number} method_count - Number of methods
 * @property {number} inner_class_count - Number of inner classes
 */

/**
 * @typedef {Object} ModuleInfo
 * @property {string} module_name - Module name
 * @property {string} file_path - File path
 * @property {Object.<string, ClassInfo>} classes - Classes defined in this module
 * @property {Object.<string, InterfaceInfo>} interfaces - Interfaces defined in this module
 * @property {Object.<string, TypeInfo>} types - Types defined in this module
 * @property {Object.<string, FunctionInfo>} functions - Functions defined in this module
 * @property {ImportInfo[]} imports - Imports in this module
 * @property {Object.<string, string>} constants - Constants defined in this module
 * @property {string[]} env_vars - Environment variables used by this module
 * @property {ApiSummary} api_summary - API summary metrics
 */

/**
 * Class that analyzes TypeScript AST to extract API contracts.
 */
class ContractVisitor {
	/**
	 * Create a new ContractVisitor.
	 *
	 * @param {string} filePath - Path to the TypeScript file
	 * @param {string} moduleName - Name of the module
	 */
	constructor(filePath, moduleName) {
		/** @type {ModuleInfo} */
		this.moduleInfo = {
			module_name: moduleName,
			file_path: filePath,
			classes: {},
			interfaces: {},
			types: {},
			functions: {},
			imports: [],
			constants: {},
			env_vars: [],
			api_summary: {
				class_count: 0,
				interface_count: 0,
				type_count: 0,
				function_count: 0,
				attribute_count: 0,
				method_count: 0,
				inner_class_count: 0,
			},
		}
		this.currentClass = null
		this.currentFunction = null
		this.tsParser = null
		this.classQuery = null
	}

	/**
	 * Initialize tree-sitter parser for enhanced type analysis.
	 */
	async initializeTreeSitter() {
		try {
			this.tsParser = await utils.createTypeScriptParser()
			if (this.tsParser) {
				// Create query to find class declarations
				this.classQuery = utils.createTypeScriptQuery(
					this.tsParser,
					`(class_declaration name: (type_identifier) @class_name) @class`,
				)
			}
		} catch (error) {
			console.error(`Error initializing tree-sitter: ${error}`)
		}
	}

	/**
	 * Visit a source file to extract API contracts.
	 *
	 * @param {ts.SourceFile} sourceFile - Source file to visit
	 */
	visitSourceFile(sourceFile) {
		try {
			// Extract module docstring if available
			const moduleDocstring = utils.extractDocstring(sourceFile)
			if (moduleDocstring) {
				this.moduleInfo.docstring = moduleDocstring
			}

			// Visit all nodes in the source file
			ts.forEachChild(sourceFile, (node) => this.visit(node))

			// Calculate summary metrics
			this.calculateMetrics()
		} catch (error) {
			console.error(`Error processing module ${this.moduleInfo.module_name}: ${error}`)
		}
	}

	/**
	 * Visit a node in the AST.
	 *
	 * @param {ts.Node} node - Node to visit
	 */
	visit(node) {
		try {
			if (ts.isClassDeclaration(node)) {
				this.visitClassDeclaration(node)
			} else if (ts.isInterfaceDeclaration(node)) {
				this.visitInterfaceDeclaration(node)
			} else if (ts.isTypeAliasDeclaration(node)) {
				this.visitTypeAliasDeclaration(node)
			} else if (ts.isFunctionDeclaration(node)) {
				this.visitFunctionDeclaration(node)
			} else if (ts.isImportDeclaration(node)) {
				this.visitImportDeclaration(node)
			} else if (ts.isVariableStatement(node)) {
				this.visitVariableStatement(node)
			} else if (ts.isExportDeclaration(node)) {
				this.visitExportDeclaration(node)
			}

			// Continue traversal for nested nodes
			ts.forEachChild(node, (child) => this.visit(child))
		} catch (error) {
			console.error(`Error visiting node in ${this.moduleInfo.module_name}: ${error}`)
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

			// Create class info object
			const classInfo = {
				methods: {},
				attributes: {},
				inner_classes: {},
				bases: [],
				docstring: utils.extractDocstring(node),
				file_path: this.moduleInfo.file_path,
				decorators: this.extractDecorators(node),
			}

			// Extract base classes
			if (node.heritageClauses) {
				for (const heritage of node.heritageClauses) {
					if (heritage.token === ts.SyntaxKind.ExtendsKeyword) {
						for (const type of heritage.types) {
							classInfo.bases.push(type.getText())
						}
					}
				}
			}

			// Process class members
			for (const member of node.members) {
				if (ts.isMethodDeclaration(member)) {
					this.visitMethodDeclaration(member, classInfo)
				} else if (ts.isPropertyDeclaration(member)) {
					this.visitPropertyDeclaration(member, classInfo)
				} else if (ts.isConstructorDeclaration(member)) {
					this.visitConstructorDeclaration(member, classInfo)
				} else if (ts.isGetAccessor(member) || ts.isSetAccessor(member)) {
					this.visitAccessorDeclaration(member, classInfo)
				}
			}

			// Add class to module info
			this.moduleInfo.classes[className] = classInfo
			this.currentClass = null
		} catch (error) {
			console.error(`Error processing class ${node.name?.text} in ${this.moduleInfo.module_name}: ${error}`)
			this.currentClass = null
		}
	}

	/**
	 * Visit a method declaration.
	 *
	 * @param {ts.MethodDeclaration} node - Method declaration node
	 * @param {ClassInfo} classInfo - Class info to add method to
	 */
	visitMethodDeclaration(node, classInfo) {
		try {
			if (!node.name) return // Skip methods without names

			const methodName = node.name.getText()
			this.currentFunction = methodName

			const methodInfo = {
				parameters: this.extractParameters(node.parameters),
				docstring: utils.extractDocstring(node),
				decorators: this.extractDecorators(node),
				return_type: node.type ? node.type.getText() : "any",
			}

			classInfo.methods[methodName] = methodInfo
			this.currentFunction = null
		} catch (error) {
			console.error(`Error processing method ${node.name?.getText()} in ${this.currentClass}: ${error}`)
			this.currentFunction = null
		}
	}

	/**
	 * Visit a property declaration.
	 *
	 * @param {ts.PropertyDeclaration} node - Property declaration node
	 * @param {ClassInfo} classInfo - Class info to add property to
	 */
	visitPropertyDeclaration(node, classInfo) {
		try {
			if (!node.name) return // Skip properties without names

			const propertyName = node.name.getText()
			const propertyType = node.type ? node.type.getText() : "any"

			classInfo.attributes[propertyName] = propertyType
		} catch (error) {
			console.error(`Error processing property ${node.name?.getText()} in ${this.currentClass}: ${error}`)
		}
	}

	/**
	 * Visit a constructor declaration.
	 *
	 * @param {ts.ConstructorDeclaration} node - Constructor declaration node
	 * @param {ClassInfo} classInfo - Class info to add constructor to
	 */
	visitConstructorDeclaration(node, classInfo) {
		try {
			const constructorInfo = {
				parameters: this.extractParameters(node.parameters),
				docstring: utils.extractDocstring(node),
				decorators: this.extractDecorators(node),
				return_type: this.currentClass, // Constructor returns the class type
			}

			classInfo.methods["constructor"] = constructorInfo

			// Constructor parameters that are properties
			for (const param of node.parameters) {
				// Look for parameters with access modifiers (public, private, protected)
				if (
					param.modifiers &&
					param.modifiers.some((mod) =>
						[
							ts.SyntaxKind.PublicKeyword,
							ts.SyntaxKind.PrivateKeyword,
							ts.SyntaxKind.ProtectedKeyword,
						].includes(mod.kind),
					)
				) {
					const paramName = param.name.getText()
					const paramType = param.type ? param.type.getText() : "any"
					classInfo.attributes[paramName] = paramType
				}
			}
		} catch (error) {
			console.error(`Error processing constructor in ${this.currentClass}: ${error}`)
		}
	}

	/**
	 * Visit an accessor declaration (getter/setter).
	 *
	 * @param {ts.GetAccessorDeclaration | ts.SetAccessorDeclaration} node - Accessor declaration node
	 * @param {ClassInfo} classInfo - Class info to add accessor to
	 */
	visitAccessorDeclaration(node, classInfo) {
		try {
			if (!node.name) return // Skip accessors without names

			const accessorName = node.name.getText()
			let accessorType = "any"

			// For getters, use the return type
			if (ts.isGetAccessor(node)) {
				accessorType = node.type ? node.type.getText() : "any"
			}
			// For setters, use the parameter type
			else if (ts.isSetAccessor(node) && node.parameters.length > 0) {
				accessorType = node.parameters[0].type ? node.parameters[0].type.getText() : "any"
			}

			// Add as both attribute and method
			classInfo.attributes[accessorName] = accessorType

			// Only add as method if it doesn't exist yet
			if (!classInfo.methods[accessorName]) {
				const accessorInfo = {
					parameters: ts.isSetAccessor(node) ? this.extractParameters(node.parameters) : [],
					docstring: utils.extractDocstring(node),
					decorators: this.extractDecorators(node),
					return_type: ts.isGetAccessor(node) ? accessorType : "void",
				}

				classInfo.methods[accessorName] = accessorInfo
			}
		} catch (error) {
			console.error(`Error processing accessor ${node.name?.getText()} in ${this.currentClass}: ${error}`)
		}
	}

	/**
	 * Visit an interface declaration.
	 *
	 * @param {ts.InterfaceDeclaration} node - Interface declaration node
	 */
	visitInterfaceDeclaration(node) {
		try {
			if (!node.name) return // Skip interfaces without names

			const interfaceName = node.name.text

			// Create interface info object
			const interfaceInfo = {
				properties: {},
				extends: [],
				docstring: utils.extractDocstring(node),
			}

			// Extract extended interfaces
			if (node.heritageClauses) {
				for (const heritage of node.heritageClauses) {
					if (heritage.token === ts.SyntaxKind.ExtendsKeyword) {
						for (const type of heritage.types) {
							interfaceInfo.extends.push(type.getText())
						}
					}
				}
			}

			// Process interface members
			for (const member of node.members) {
				if (ts.isPropertySignature(member)) {
					this.visitPropertySignature(member, interfaceInfo)
				} else if (ts.isMethodSignature(member)) {
					this.visitMethodSignature(member, interfaceInfo)
				} else if (ts.isIndexSignatureDeclaration(member)) {
					this.visitIndexSignature(member, interfaceInfo)
				}
			}

			// Add interface to module info
			this.moduleInfo.interfaces[interfaceName] = interfaceInfo
		} catch (error) {
			console.error(`Error processing interface ${node.name?.text} in ${this.moduleInfo.module_name}: ${error}`)
		}
	}

	/**
	 * Visit a property signature in an interface.
	 *
	 * @param {ts.PropertySignature} node - Property signature node
	 * @param {InterfaceInfo} interfaceInfo - Interface info to add property to
	 */
	visitPropertySignature(node, interfaceInfo) {
		try {
			if (!node.name) return // Skip properties without names

			const propertyName = node.name.getText()
			const propertyType = node.type ? node.type.getText() : "any"
			const isOptional = !!node.questionToken

			interfaceInfo.properties[propertyName] = {
				type: propertyType,
				required: !isOptional,
				docstring: utils.extractDocstring(node),
			}
		} catch (error) {
			console.error(`Error processing property signature in interface: ${error}`)
		}
	}

	/**
	 * Visit a method signature in an interface.
	 *
	 * @param {ts.MethodSignature} node - Method signature node
	 * @param {InterfaceInfo} interfaceInfo - Interface info to add method to
	 */
	visitMethodSignature(node, interfaceInfo) {
		try {
			if (!node.name) return // Skip methods without names

			const methodName = node.name.getText()
			const returnType = node.type ? node.type.getText() : "any"
			const isOptional = !!node.questionToken

			// Handle the method as a property with function type
			interfaceInfo.properties[methodName] = {
				type: `(${this.getParameterSignature(node.parameters)}) => ${returnType}`,
				required: !isOptional,
				docstring: utils.extractDocstring(node),
			}
		} catch (error) {
			console.error(`Error processing method signature in interface: ${error}`)
		}
	}

	/**
	 * Visit an index signature in an interface.
	 *
	 * @param {ts.IndexSignatureDeclaration} node - Index signature node
	 * @param {InterfaceInfo} interfaceInfo - Interface info to add index signature to
	 */
	visitIndexSignature(node, interfaceInfo) {
		try {
			const indexType = node.parameters[0].type ? node.parameters[0].type.getText() : "any"
			const valueType = node.type ? node.type.getText() : "any"

			// Add as a special property
			interfaceInfo.properties[`[index: ${indexType}]`] = {
				type: valueType,
				required: true,
				docstring: utils.extractDocstring(node),
			}
		} catch (error) {
			console.error(`Error processing index signature in interface: ${error}`)
		}
	}

	/**
	 * Visit a type alias declaration.
	 *
	 * @param {ts.TypeAliasDeclaration} node - Type alias declaration node
	 */
	visitTypeAliasDeclaration(node) {
		try {
			if (!node.name) return // Skip types without names

			const typeName = node.name.text
			const typeInfo = { docstring: utils.extractDocstring(node) }

			// Handle different type structures
			if (ts.isUnionTypeNode(node.type)) {
				typeInfo.type = "union"
				typeInfo.values = node.type.types.map((t) => t.getText())
			} else if (ts.isIntersectionTypeNode(node.type)) {
				typeInfo.type = "intersection"
				typeInfo.components = node.type.types.map((t) => t.getText())
			} else if (ts.isTypeLiteralNode(node.type)) {
				typeInfo.type = "object"
				typeInfo.properties = {}

				// Process object members
				for (const member of node.type.members) {
					if (ts.isPropertySignature(member) && member.name) {
						const propName = member.name.getText()
						const propType = member.type ? member.type.getText() : "any"
						const isOptional = !!member.questionToken

						typeInfo.properties[propName] = {
							type: propType,
							required: !isOptional,
							docstring: utils.extractDocstring(member),
						}
					}
				}
			} else {
				typeInfo.type = node.type.getText()
			}

			// Add type to module info
			this.moduleInfo.types[typeName] = typeInfo
		} catch (error) {
			console.error(`Error processing type alias ${node.name?.text} in ${this.moduleInfo.module_name}: ${error}`)
		}
	}

	/**
	 * Visit a function declaration.
	 *
	 * @param {ts.FunctionDeclaration} node - Function declaration node
	 */
	visitFunctionDeclaration(node) {
		try {
			if (!node.name) return // Skip functions without names

			const functionName = node.name.text
			this.currentFunction = functionName

			const functionInfo = {
				parameters: this.extractParameters(node.parameters),
				docstring: utils.extractDocstring(node),
				decorators: this.extractDecorators(node),
				return_type: node.type ? node.type.getText() : "any",
			}

			// Add function to module info
			this.moduleInfo.functions[functionName] = functionInfo
			this.currentFunction = null
		} catch (error) {
			console.error(`Error processing function ${node.name?.text} in ${this.moduleInfo.module_name}: ${error}`)
			this.currentFunction = null
		}
	}

	/**
	 * Visit an import declaration.
	 *
	 * @param {ts.ImportDeclaration} node - Import declaration node
	 */
	visitImportDeclaration(node) {
		try {
			if (!node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier)) {
				return
			}

			const moduleName = node.moduleSpecifier.text

			// Handle different import styles
			if (node.importClause) {
				// Default import: import Name from 'module'
				if (node.importClause.name) {
					this.moduleInfo.imports.push({
						name: node.importClause.name.text,
						alias: null,
						from_import: true,
					})
				}

				// Named imports: import { Name1, Name2 as Alias } from 'module'
				if (node.importClause.namedBindings) {
					if (ts.isNamedImports(node.importClause.namedBindings)) {
						for (const element of node.importClause.namedBindings.elements) {
							this.moduleInfo.imports.push({
								name: element.propertyName ? element.propertyName.text : element.name.text,
								alias: element.propertyName ? element.name.text : null,
								from_import: true,
							})
						}
					}
					// Namespace import: import * as Name from 'module'
					else if (ts.isNamespaceImport(node.importClause.namedBindings)) {
						this.moduleInfo.imports.push({
							name: moduleName,
							alias: node.importClause.namedBindings.name.text,
							from_import: false,
						})
					}
				}
			}
			// Side-effect import: import 'module'
			else {
				this.moduleInfo.imports.push({
					name: moduleName,
					alias: null,
					from_import: false,
				})
			}
		} catch (error) {
			console.error(`Error processing import in ${this.moduleInfo.module_name}: ${error}`)
		}
	}

	/**
	 * Visit a variable statement (const/let/var declarations).
	 *
	 * @param {ts.VariableStatement} node - Variable statement node
	 */
	visitVariableStatement(node) {
		try {
			for (const declaration of node.declarationList.declarations) {
				if (!declaration.name) continue

				const varName = declaration.name.getText()

				// Add constants (only consider const declarations at module level)
				if (node.declarationList.flags & ts.NodeFlags.Const && declaration.initializer) {
					let value = "unknown"

					// Extract literal values for primitive types
					if (
						ts.isStringLiteral(declaration.initializer) ||
						ts.isNumericLiteral(declaration.initializer) ||
						ts.isBooleanLiteral(declaration.initializer)
					) {
						value = declaration.initializer.getText()
					}

					this.moduleInfo.constants[varName] = value
				}

				// Check for environment variable usage in initializers
				if (declaration.initializer) {
					this.checkForEnvVars(declaration.initializer)
				}
			}
		} catch (error) {
			console.error(`Error processing variable statement in ${this.moduleInfo.module_name}: ${error}`)
		}
	}

	/**
	 * Check for environment variable usage in a node.
	 *
	 * @param {ts.Node} node - Node to check for env vars
	 */
	checkForEnvVars(node) {
		const newEnvVars = utils.findEnvironmentVariables(node)

		// Add any new env vars to the module's list
		for (const envVar of newEnvVars) {
			if (!this.moduleInfo.env_vars.includes(envVar)) {
				this.moduleInfo.env_vars.push(envVar)
			}
		}
	}

	/**
	 * Visit an export declaration.
	 *
	 * @param {ts.ExportDeclaration} node - Export declaration node
	 */
	visitExportDeclaration(node) {
		// Currently we're just analyzing the structure, not tracking exports separately
		// This could be expanded if needed
	}

	/**
	 * Extract parameters from a function-like declaration.
	 *
	 * @param {ts.NodeArray<ts.ParameterDeclaration>} parameters - Parameters to extract
	 * @returns {ParameterInfo[]} Extracted parameter information
	 */
	extractParameters(parameters) {
		const result = []

		try {
			for (const param of parameters) {
				if (!param.name) continue

				const paramInfo = {
					name: param.name.getText(),
					required: !param.questionToken && !param.initializer,
					type: param.type ? param.type.getText() : "any",
				}

				result.push(paramInfo)
			}
		} catch (error) {
			console.error(`Error extracting parameters: ${error}`)
		}

		return result
	}

	/**
	 * Get a parameter signature string for a method.
	 *
	 * @param {ts.NodeArray<ts.ParameterDeclaration>} parameters - Parameters
	 * @returns {string} Parameter signature string
	 */
	getParameterSignature(parameters) {
		const paramStrings = []

		try {
			for (const param of parameters) {
				if (!param.name) continue

				const name = param.name.getText()
				const optional = param.questionToken ? "?" : ""
				const type = param.type ? `: ${param.type.getText()}` : ": any"

				paramStrings.push(`${name}${optional}${type}`)
			}
		} catch (error) {
			console.error(`Error generating parameter signature: ${error}`)
		}

		return paramStrings.join(", ")
	}

	/**
	 * Extract decorators from a node.
	 *
	 * @param {ts.Node} node - Node to extract decorators from
	 * @returns {Decorator[]} Extracted decorator information
	 */
	extractDecorators(node) {
		const decorators = []

		try {
			if (!ts.canHaveDecorators(node)) return decorators

			const nodeDecorators = ts.getDecorators(node)
			if (!nodeDecorators) return decorators

			for (const decorator of nodeDecorators) {
				const name = this.getDecoratorName(decorator)
				const args = this.getDecoratorArgs(decorator)

				decorators.push({
					name,
					args,
					kwargs: {},
				})
			}
		} catch (error) {
			console.error(`Error extracting decorators: ${error}`)
		}

		return decorators
	}

	/**
	 * Get the name of a decorator.
	 *
	 * @param {ts.Decorator} decorator - Decorator node
	 * @returns {string} Decorator name
	 */
	getDecoratorName(decorator) {
		try {
			// Simple decorator: @decorator
			if (ts.isIdentifier(decorator.expression)) {
				return decorator.expression.text
			}

			// Decorator with arguments: @decorator(...)
			if (ts.isCallExpression(decorator.expression) && ts.isIdentifier(decorator.expression.expression)) {
				return decorator.expression.expression.text
			}

			// Property decorator: @namespace.decorator
			if (ts.isPropertyAccessExpression(decorator.expression) && ts.isIdentifier(decorator.expression.name)) {
				return decorator.expression.getText()
			}
		} catch (error) {
			console.error(`Error getting decorator name: ${error}`)
		}

		return "unknown"
	}

	/**
	 * Get the arguments of a decorator.
	 *
	 * @param {ts.Decorator} decorator - Decorator node
	 * @returns {any[]} Decorator arguments
	 */
	getDecoratorArgs(decorator) {
		const args = []

		try {
			// Only call expressions have arguments
			if (!ts.isCallExpression(decorator.expression)) {
				return args
			}

			// Extract literal arguments
			for (const arg of decorator.expression.arguments) {
				if (ts.isStringLiteral(arg) || ts.isNumericLiteral(arg) || ts.isBooleanLiteral(arg)) {
					args.push(arg.getText())
				} else if (ts.isObjectLiteralExpression(arg)) {
					// For object literals, create an object representation
					const obj = {}

					for (const prop of arg.properties) {
						if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
							const propName = prop.name.text
							const propValue = prop.initializer.getText()
							obj[propName] = propValue
						}
					}

					args.push(obj)
				} else {
					// For other expressions, use the text representation
					args.push(arg.getText())
				}
			}
		} catch (error) {
			console.error(`Error getting decorator arguments: ${error}`)
		}

		return args
	}

	/**
	 * Calculate API summary metrics from collected information.
	 */
	calculateMetrics() {
		try {
			const summary = this.moduleInfo.api_summary

			summary.class_count = Object.keys(this.moduleInfo.classes).length
			summary.interface_count = Object.keys(this.moduleInfo.interfaces).length
			summary.type_count = Object.keys(this.moduleInfo.types).length
			summary.function_count = Object.keys(this.moduleInfo.functions).length

			// Count attributes and methods
			summary.attribute_count = 0
			summary.method_count = 0
			summary.inner_class_count = 0

			for (const className in this.moduleInfo.classes) {
				const classInfo = this.moduleInfo.classes[className]
				summary.attribute_count += Object.keys(classInfo.attributes).length
				summary.method_count += Object.keys(classInfo.methods).length
				summary.inner_class_count += Object.keys(classInfo.inner_classes).length
			}
		} catch (error) {
			console.error(`Error calculating metrics: ${error}`)
		}
	}
}

/**
 * Analyze a TypeScript file to extract API contract information.
 *
 * @param {string} filePath - Path to the TypeScript file
 * @returns {Promise<ModuleInfo|null>} Module info or null on error
 */
async function analyzeFile(filePath) {
	try {
		// Parse the TypeScript file
		const sourceFile = utils.parseTypeScriptFile(filePath)
		if (!sourceFile) {
			console.warn(`Could not parse ${filePath}`)
			return null
		}

		// Get module name from file path
		const moduleName = utils.getModuleNameFromPath(filePath)

		// Create and initialize visitor
		const visitor = new ContractVisitor(filePath, moduleName)
		await visitor.initializeTreeSitter()

		// Visit the source file
		visitor.visitSourceFile(sourceFile)

		return visitor.moduleInfo
	} catch (error) {
		console.error(`Error analyzing file ${filePath}: ${error}`)
		return null
	}
}

/**
 * Generate an index file for the analyzed modules.
 *
 * @param {ModuleInfo[]} results - Analysis results for all modules
 * @param {string} targetDir - Target directory analyzed
 */
function generateIndexFile(results, targetDir) {
	try {
		const indexData = {
			component: targetDir,
			modules: results.map((r) => ({
				name: r.module_name,
				file: r.module_name.replace(/\//g, "_").replace(/\./g, "_") + "_contracts.json",
			})),
			analysis_file: "___analysis.json",
			module_count: results.length,
		}

		utils.writeJsonFile(
			path.join(utils.API_CONTRACTS_DIR, "___index.json"),
			indexData,
			2, // indent
			true, // add header
		)
	} catch (error) {
		console.error(`Error generating index file: ${error}`)
	}
}

/**
 * Generate a comprehensive analysis file with aggregated metrics.
 *
 * @param {ModuleInfo[]} results - Analysis results for all modules
 * @param {string} targetDir - Target directory analyzed
 */
function generateAnalysisFile(results, targetDir) {
	try {
		// Initialize analysis data
		const analysisData = {
			total_modules: results.length,
			total_classes: 0,
			total_interfaces: 0,
			total_types: 0,
			total_functions: 0,
			total_methods: 0,
			total_attributes: 0,
			circular_dependencies: [],
			key_interfaces: [],
			central_modules: [],
			inheritance_map: {},
			type_definitions: {
				total: 0,
				by_module: {},
			},
		}

		// Collect implementation classes for all interfaces
		const interfaceImpls = {}

		// Aggregate metrics
		for (const moduleInfo of results) {
			analysisData.total_classes += moduleInfo.api_summary.class_count
			analysisData.total_interfaces += moduleInfo.api_summary.interface_count
			analysisData.total_types += moduleInfo.api_summary.type_count
			analysisData.total_functions += moduleInfo.api_summary.function_count
			analysisData.total_methods += moduleInfo.api_summary.method_count
			analysisData.total_attributes += moduleInfo.api_summary.attribute_count

			// Track type definitions by module
			if (moduleInfo.api_summary.type_count > 0) {
				analysisData.type_definitions.by_module[moduleInfo.module_name] = moduleInfo.api_summary.type_count
				analysisData.type_definitions.total += moduleInfo.api_summary.type_count
			}

			// Add key classes to central interfaces list
			for (const className in moduleInfo.classes) {
				const classInfo = moduleInfo.classes[className]
				const fullClassName = `${moduleInfo.module_name}.${className}`

				// Calculate interface complexity
				const complexity =
					Object.keys(classInfo.methods).length +
					Object.keys(classInfo.attributes).length +
					Object.keys(classInfo.inner_classes).length

				// Add to key interfaces if complex enough
				if (complexity >= 3) {
					analysisData.key_interfaces.push({
						module: moduleInfo.module_name,
						name: className,
						method_count: Object.keys(classInfo.methods).length,
						attribute_count: Object.keys(classInfo.attributes).length,
						inner_class_count: Object.keys(classInfo.inner_classes).length,
						derived_count: 0, // Will be calculated later
						interface_complexity: complexity,
						bases: classInfo.bases,
						docstring: classInfo.docstring,
					})
				}

				// Build inheritance map
				for (const base of classInfo.bases) {
					if (!analysisData.inheritance_map[base]) {
						analysisData.inheritance_map[base] = []
					}
					analysisData.inheritance_map[base].push(fullClassName)
				}
			}

			// Identify central modules based on API complexity
			if (moduleInfo.api_summary.class_count > 0 || moduleInfo.api_summary.interface_count > 0) {
				analysisData.central_modules.push({
					name: moduleInfo.module_name,
					imported_by_count: 0, // We don't have this info in the API analyzer
					class_count: moduleInfo.api_summary.class_count,
					method_count: moduleInfo.api_summary.method_count,
					attribute_count: moduleInfo.api_summary.attribute_count,
					interface_complexity: moduleInfo.api_summary.method_count + moduleInfo.api_summary.attribute_count,
				})
			}
		}

		// Sort key interfaces by complexity
		analysisData.key_interfaces.sort((a, b) => b.interface_complexity - a.interface_complexity)

		// Take top 20 key interfaces
		analysisData.key_interfaces = analysisData.key_interfaces.slice(0, 20)

		// Sort central modules by complexity
		analysisData.central_modules.sort(
			(a, b) => b.class_count + b.interface_complexity - (a.class_count + a.interface_complexity),
		)

		// Take top 20 central modules
		analysisData.central_modules = analysisData.central_modules.slice(0, 20)

		utils.writeJsonFile(
			path.join(utils.API_CONTRACTS_DIR, "___analysis.json"),
			analysisData,
			2, // indent
			true, // add header
		)
	} catch (error) {
		console.error(`Error generating analysis file: ${error}`)
	}
}

/**
 * Generate individual module contract files.
 *
 * @param {ModuleInfo[]} results - Analysis results for all modules
 */
function generateModuleContractFiles(results) {
	try {
		for (const moduleInfo of results) {
			const sanitizedName = moduleInfo.module_name.replace(/\//g, "_").replace(/\./g, "_")
			const filename = `${sanitizedName}_contracts.json`

			utils.writeJsonFile(
				path.join(utils.API_CONTRACTS_DIR, filename),
				moduleInfo,
				2, // indent
				true, // add header
			)
		}
	} catch (error) {
		console.error(`Error generating module contract files: ${error}`)
	}
}

/**
 * Process a batch of files using worker threads.
 *
 * @param {string[]} files - Files to process
 * @param {number} maxWorkers - Maximum number of worker threads to use
 * @returns {Promise<ModuleInfo[]>} Processed module information
 */
async function processFilesInParallel(files, maxWorkers) {
	// Split files into chunks for each worker
	const chunkSize = Math.ceil(files.length / maxWorkers)
	const fileChunks = chunkArray(files, chunkSize)

	// Create and start workers
	const workers = []
	const workerPromises = []

	for (let i = 0; i < fileChunks.length; i++) {
		const worker = new Worker(__filename, {
			workerData: {
				files: fileChunks[i],
				workerId: i,
			},
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

	// Terminate workers
	for (const worker of workers) {
		worker.terminate()
	}

	// Flatten results from all workers
	return results.flat().filter(Boolean)
}

/**
 * Worker thread implementation to process a batch of files.
 */
async function workerThread() {
	try {
		const { files, workerId } = workerData

		// Initialize tree-sitter in worker
		await utils.initTreeSitter()

		// Process each file in this worker
		const results = []
		for (const file of files) {
			const result = await analyzeFile(file)
			if (result) results.push(result)
		}

		// Send results back to main thread
		parentPort.postMessage(results)
	} catch (error) {
		console.error(`Worker error: ${error}`)
		parentPort.postMessage([])
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
 * Main function to run the API contract analyzer.
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

		// Check for concurrency override
		const concurrencyIndex = args.indexOf("--concurrency")
		const userMaxWorkers = concurrencyIndex !== -1 ? parseInt(args[concurrencyIndex + 1], 10) : null

		// Target directory for analysis is always the project root
		const absoluteTargetDir = utils.PROJECT_ROOT // Always scan the entire project root

		// Ensure output directory exists
		utils.ensureDirExists(utils.API_CONTRACTS_DIR)

		// Initialize tree-sitter in main thread
		await utils.initTreeSitter()

		// Find TypeScript files
		const files = utils.findTypeScriptFiles(absoluteTargetDir, excludeDirs)
		console.log(`Found ${files.length} TypeScript files to analyze`)

		// Determine number of worker threads to use
		const cpuCount = os.cpus().length
		const defaultMaxWorkers = Math.max(1, cpuCount - 1) // Leave one CPU free
		const maxWorkers = userMaxWorkers || defaultMaxWorkers

		let results = []

		// Use parallel processing only if there are enough files and multiple cores
		// const useParallel = files.length > 10 && maxWorkers > 1; // Original logic
		const useParallel = false // Force sequential processing for testing
		console.log(`[DEBUG] Forcing sequential processing. useParallel = ${useParallel}`)

		if (useParallel) {
			console.log(`Using ${maxWorkers} worker threads for parallel processing`)
			results = await processFilesInParallel(files, maxWorkers)
		} else {
			console.log("Using sequential processing")
			// Process each file sequentially
			for (const file of files) {
				const result = await analyzeFile(file)
				if (result) results.push(result)
			}
		}

		// Generate output files
		generateModuleContractFiles(results)
		generateIndexFile(results, targetDir)
		generateAnalysisFile(results, targetDir)

		console.log(`API contract analysis complete. Results in: ${utils.API_CONTRACTS_DIR}`)
	} catch (error) {
		console.error(`Fatal error in API contract analyzer: ${error}`)
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
	// This branch is executed when the script is run as a worker
	workerThread()
}
