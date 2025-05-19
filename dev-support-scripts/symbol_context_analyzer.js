#!/usr/bin/env node
/**
 * Symbol Context Analyzer
 *
 * This script takes a fully qualified symbol name (e.g., src/core/MyClass.methodName)
 * and generates a JSON "dossier" for it by synthesizing information from
 * api_contract_analyzer.js, dependency_graph_generator.js, docstring_extractor.js,
 * docstring_auto_generator.js, and safe_mutations_analyzer.js outputs.
 */

const fs = require("fs").promises;
const path = require("path");
const utils = require("./utils");
const ts = require("typescript"); // For AST traversal if we implement deeper "uses_symbols"

const API_CONTRACTS_DIR = utils.API_CONTRACTS_DIR;
const DEPENDENCY_GRAPH_DIR = utils.DEPENDENCY_GRAPH_DIR;
const DOCSTRING_INVENTORY_DIR = utils.DOCSTRING_INVENTORY_DIR;
const GENERATED_DOCSTRING_INVENTORY_DIR = utils.GENERATED_DOCSTRING_INVENTORY_DIR;
const SAFE_MUTATIONS_ANALYSIS_DIR = path.join(utils.SCRIPT_DIR, "safe_mutations_analysis");
const SYMBOL_CONTEXT_OUTPUT_DIR = path.join(utils.SCRIPT_DIR, "symbol_context_dossiers");

/**
 * @typedef {Object} SymbolDossier
 * @property {string} qualified_name - The input FQN
 * @property {string | null} element_type - e.g., method, function, class, interface, property, type_alias
 * @property {string | null} parent_class - FQN of parent class if element_type is method/property
 * @property {any | null} signature - From API contracts (parameters, return_type)
 * @property {string | null} docstring - Best available (original or generated)
 * @property {any | null} module_context - Module card from safe_mutations_report.json
 * @property {string[]} uses_symbols_heuristic - Heuristic list of symbols this one might use
 * @property {string[]} used_by_modules_heuristic - Heuristic list of modules that import this symbol's module
 * @property {any[]} used_by_locations_heuristic - Heuristic list of potential usage locations (from regex search)
 * @property {boolean} is_in_cycle
 * @property {string[] | null} cycle_details
 * @property {string | null} source_file_path - Absolute path to the source file
 */

/**
 * Finds the specific symbol's data within a module's API contract.
 * @param {any} apiContractData - Parsed JSON from [module]_contracts.json
 * @param {string | null} className - Name of the class, or null for top-level symbols
 * @param {string} symbolName - Name of the symbol
 * @returns {{elementType: string, details: any} | null}
 */
function findSymbolInApiContract(apiContractData, className, symbolName) {
    if (!apiContractData) return null;

    if (className) {
        const classData = apiContractData.classes?.[className];
        if (classData) {
            if (classData.methods?.[symbolName]) {
                return { elementType: "method", details: classData.methods[symbolName] };
            }
            if (classData.attributes?.[symbolName]) {
                return { elementType: "property", details: classData.attributes[symbolName] };
            }
        }
    } else {
        if (apiContractData.functions?.[symbolName]) {
            return { elementType: "function", details: apiContractData.functions[symbolName] };
        }
        if (apiContractData.interfaces?.[symbolName]) {
            return { elementType: "interface", details: apiContractData.interfaces[symbolName] };
        }
        if (apiContractData.types?.[symbolName]) {
            return { elementType: "type_alias", details: apiContractData.types[symbolName] };
        }
        if (apiContractData.classes?.[symbolName]) { // Top-level class
            return { elementType: "class", details: apiContractData.classes[symbolName] };
        }
    }
    return null;
}

/**
 * Finds the best available docstring for a symbol.
 * @param {string} modulePath - Relative path of the module.
 * @param {string | null} className - Name of the class, or null.
 * @param {string} symbolName - Name of the symbol.
 * @param {string} elementType - Type of the symbol.
 * @returns {string | null}
 */
function getBestDocstring(modulePath, className, symbolName, elementType) {
    const sanitizedModuleName = modulePath.replace(/\//g, "_").replace(/\./g, "_");
    
    const originalDocPath = path.join(DOCSTRING_INVENTORY_DIR, `${sanitizedModuleName}_docstrings.json`);
    const originalDocData = utils.readJsonFile(originalDocPath);
    if (originalDocData?.elements) {
        const el = originalDocData.elements.find(e => 
            e.name === symbolName && 
            (className ? e.parent_name === className : !e.parent_name) &&
            e.element_type === elementType
        );
        if (el?.docstring) return el.docstring;
    }

    const generatedDocPath = path.join(GENERATED_DOCSTRING_INVENTORY_DIR, `${sanitizedModuleName}_generated_docstrings.json`);
    const generatedDocData = utils.readJsonFile(generatedDocPath);
    if (generatedDocData?.elements) {
         const el = generatedDocData.elements.find(e => 
            e.name === symbolName && 
            (className ? e.parent_name === className : !e.parent_name) &&
            e.element_type === elementType
        );
        if (el?.generated_docstring) return el.generated_docstring;
    }
    return null;
}

/**
 * Heuristic to find potential usage locations of a symbol by searching in dependent modules.
 * @param {string} symbolName - The name of the symbol to search for.
 * @param {string[]} dependentModulePaths - Array of module paths that import the symbol's module.
 * @returns {Promise<any[]>}
 */
async function findUsageLocationsHeuristic(symbolName, dependentModulePaths) {
    const locations = [];
    // This is a simplified regex; a more robust one would handle word boundaries, etc.
    // It also doesn't distinguish between symbol types (e.g. a variable vs a function call)
    const regex = new RegExp(`\\b${symbolName}\\b`, 'g'); 

    for (const modulePath of dependentModulePaths) {
        const fullModulePath = path.join(utils.PROJECT_ROOT, modulePath + ".ts"); // Assuming .ts
        try {
            await fs.access(fullModulePath);
            const content = await fs.readFile(fullModulePath, "utf-8");
            let match;
            while ((match = regex.exec(content)) !== null) {
                const lineNumber = content.substring(0, match.index).split('\n').length;
                const lineStart = content.lastIndexOf('\n', match.index -1) + 1;
                const lineEnd = content.indexOf('\n', match.index);
                const contextLine = content.substring(lineStart, lineEnd > -1 ? lineEnd : undefined).trim();
                locations.push({
                    file: modulePath + ".ts",
                    line: lineNumber,
                    context: contextLine.substring(0, 100) // Trim context line
                });
            }
        } catch (err) {
            // File might not exist (e.g. if modulePath was just a name without extension) or other read error
            // console.warn(`Could not search in ${fullModulePath}: ${err.message}`);
        }
    }
    return locations.slice(0, 10); // Limit results for brevity
}


async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error("Usage: ./symbol_context_analyzer.js <fully_qualified_symbol_name>");
        console.error("Example: ./symbol_context_analyzer.js src/core/Cline.Cline.initiateTaskLoop");
        console.error("Example: ./symbol_context_analyzer.js src/utils/string.fixModelHtmlEscaping");
        process.exit(1);
    }

    const fqn = args[0];
    const parsedFqn = utils.parseFullyQualifiedSymbol(fqn);

    if (!parsedFqn) {
        console.error(`Invalid fully qualified symbol name: ${fqn}`);
        process.exit(1);
    }

    const { modulePath, className, symbolName } = parsedFqn;
    const sanitizedModuleName = modulePath.replace(/\//g, "_").replace(/\./g, "_");

    /** @type {SymbolDossier} */
    const dossier = {
        qualified_name: fqn,
        element_type: null,
        parent_class: className ? `${modulePath}.${className}` : null,
        signature: null,
        docstring: null,
        module_context: null,
        uses_symbols_heuristic: [],
        used_by_modules_heuristic: [],
        used_by_locations_heuristic: [],
        is_in_cycle: false,
        cycle_details: null,
        source_file_path: path.join(utils.PROJECT_ROOT, modulePath + ".ts") // Assuming .ts
    };

    // 1. Get API Contract info for the symbol
    const apiContractFile = path.join(API_CONTRACTS_DIR, `${sanitizedModuleName}_contracts.json`);
    const apiContractData = utils.readJsonFile(apiContractFile);
    const symbolApiInfo = findSymbolInApiContract(apiContractData, className, symbolName);
    
    if (symbolApiInfo) {
        dossier.element_type = symbolApiInfo.elementType;
        dossier.signature = {
            parameters: symbolApiInfo.details.parameters,
            return_type: symbolApiInfo.details.return_type
        };
        if (symbolApiInfo.elementType === "class") {
            dossier.signature.methods = Object.keys(symbolApiInfo.details.methods || {});
            dossier.signature.properties = Object.keys(symbolApiInfo.details.attributes || {});
        }
    } else {
        console.warn(`Symbol ${symbolName} (class: ${className}) not found in API contracts for module ${modulePath}.`);
    }

    // 2. Get best available docstring
    if (dossier.element_type) {
        dossier.docstring = getBestDocstring(modulePath, className, symbolName, dossier.element_type);
    }

    // 3. Get module context from safe_mutations_report
    const safeMutationsReportFile = path.join(SAFE_MUTATIONS_ANALYSIS_DIR, "safe_mutations_report.json");
    const safeMutationsReport = utils.readJsonFile(safeMutationsReportFile);
    if (safeMutationsReport) {
        dossier.module_context = safeMutationsReport.find(card => card.module === modulePath) || null;
    }

    // 4. Get cycle info
    const circularDepsFile = path.join(DEPENDENCY_GRAPH_DIR, "circular_dependencies.json");
    const circularDepsData = utils.readJsonFile(circularDepsFile);
    if (circularDepsData?.circular_dependencies) {
        const cycle = circularDepsData.circular_dependencies.find(c => c.includes(modulePath));
        if (cycle) {
            dossier.is_in_cycle = true;
            dossier.cycle_details = cycle;
        }
    }
    
    // 5. "Used By Modules" Heuristic (Modules importing this symbol's module)
    const depIndexFile = path.join(DEPENDENCY_GRAPH_DIR, "dependency_index.json");
    const depIndex = utils.readJsonFile(depIndexFile);
    if (depIndex?.modules) {
        depIndex.modules.forEach(mod => {
            if (mod.dependencies?.includes(modulePath)) {
                dossier.used_by_modules_heuristic.push(mod.name);
            }
        });
    }
    dossier.used_by_modules_heuristic = dossier.used_by_modules_heuristic.slice(0,10); // Limit for brevity

    // 6. "Used By Locations" Heuristic (Regex search in dependent modules)
    if (dossier.used_by_modules_heuristic.length > 0) {
        dossier.used_by_locations_heuristic = await findUsageLocationsHeuristic(symbolName, dossier.used_by_modules_heuristic);
    }

    // 7. "Uses Symbols" Heuristic (TODO: Implement AST traversal for more accuracy)
    // For now, list module-level imports as a proxy
    const moduleDepFile = path.join(DEPENDENCY_GRAPH_DIR, `${sanitizedModuleName}_dependencies.json`);
    const moduleDepData = utils.readJsonFile(moduleDepFile);
    if (moduleDepData?.imports) {
        dossier.uses_symbols_heuristic = moduleDepData.imports.map(imp => imp.module).slice(0,10);
    }

    // Ensure output directory exists
    utils.ensureDirExists(SYMBOL_CONTEXT_OUTPUT_DIR);

    // Generate filename from FQN
    const outputFileName = fqn.replace(/\//g, "_").replace(/\./g, "_") + "_dossier.json";
    const outputFilePath = path.join(SYMBOL_CONTEXT_OUTPUT_DIR, outputFileName);

    utils.writeJsonFile(outputFilePath, dossier, 2, true);
    console.log(`Symbol dossier generated: ${outputFilePath}`);
}

main().catch(error => {
    console.error("Symbol Context Analyzer Main Error:", error);
    process.exit(1);
});
