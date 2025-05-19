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
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads"); // Added missing imports
const os = require("os"); // Was missing, needed for cpuCount
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


/**
 * Generates a dossier for a single symbol.
 * @param {{modulePath: string, className: string|null, symbolName: string}} fqnDetails
 * @param {any} safeMutationsReport - Pre-loaded safe_mutations_report.json content
 * @param {any} circularDepsData - Pre-loaded circular_dependencies.json content
 * @param {any} depIndex - Pre-loaded dependency_index.json content
 * @returns {Promise<SymbolDossier | null>}
 */
async function generateDossierForSymbol(fqnDetails, safeMutationsReport, circularDepsData, depIndex) {
    const { modulePath, className, symbolName } = fqnDetails;
    const fqn = className ? `${modulePath}.${className}.${symbolName}` : `${modulePath}.${symbolName}`;
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
        // console.warn(`Symbol ${symbolName} (class: ${className}) not found in API contracts for module ${modulePath}. Skipping dossier.`);
        return null; // Skip if symbol definition not found
    }

    if (dossier.element_type) {
        dossier.docstring = getBestDocstring(modulePath, className, symbolName, dossier.element_type);
    }

    if (safeMutationsReport) {
        dossier.module_context = safeMutationsReport.find(card => card.module === modulePath) || null;
    }

    if (circularDepsData?.circular_dependencies) {
        const cycle = circularDepsData.circular_dependencies.find(c => c.includes(modulePath));
        if (cycle) {
            dossier.is_in_cycle = true;
            dossier.cycle_details = cycle;
        }
    }
    
    if (depIndex?.modules) {
        depIndex.modules.forEach(mod => {
            if (mod.dependencies?.includes(modulePath)) {
                dossier.used_by_modules_heuristic.push(mod.name);
            }
        });
    }
    dossier.used_by_modules_heuristic = dossier.used_by_modules_heuristic.slice(0,10);

    if (dossier.used_by_modules_heuristic.length > 0) {
        // Only search if the symbol is likely exported (heuristic: top-level or class method)
        // More precise check would be to see if it's in module_context.exports
        const isPotentiallyExported = !className || (className && dossier.element_type === 'method');
        if (isPotentiallyExported) {
             dossier.used_by_locations_heuristic = await findUsageLocationsHeuristic(symbolName, dossier.used_by_modules_heuristic);
        }
    }

    const moduleDepFile = path.join(DEPENDENCY_GRAPH_DIR, `${sanitizedModuleName}_dependencies.json`);
    const moduleDepData = utils.readJsonFile(moduleDepFile);
    if (moduleDepData?.imports) {
        dossier.uses_symbols_heuristic = moduleDepData.imports.map(imp => imp.module).slice(0,10);
    }
    return dossier;
}

/**
 * @param {{ fqnDetailsList: {modulePath: string, className: string|null, symbolName: string}[], safeMutationsReport: any, circularDepsData: any, depIndex: any, workerId: number }} workerData
 */
async function workerThread() {
    const { fqnDetailsList, safeMutationsReport, circularDepsData, depIndex, workerId } = workerData;
    // console.log(`SymbolContext Worker ${workerId}: Processing ${fqnDetailsList.length} symbols`);

    for (const fqnDetails of fqnDetailsList) {
        try {
            const dossier = await generateDossierForSymbol(fqnDetails, safeMutationsReport, circularDepsData, depIndex);
            if (dossier) {
                const fqn = fqnDetails.className ? `${fqnDetails.modulePath}.${fqnDetails.className}.${fqnDetails.symbolName}` : `${fqnDetails.modulePath}.${fqnDetails.symbolName}`;
                const outputFileName = fqn.replace(/\//g, "_").replace(/\./g, "_") + "_dossier.json";
                const outputFilePath = path.join(SYMBOL_CONTEXT_OUTPUT_DIR, outputFileName);
                utils.writeJsonFile(outputFilePath, dossier, 2, false); // Timestamp not needed for individual files
            }
        } catch (error) {
            const fqn = fqnDetails.className ? `${fqnDetails.modulePath}.${fqnDetails.className}.${fqnDetails.symbolName}` : `${fqnDetails.modulePath}.${fqnDetails.symbolName}`;
            console.error(`Error generating dossier for ${fqn} in worker ${workerId}:`, error);
        }
    }
    parentPort.postMessage(fqnDetailsList.length); // Send back count of processed items
}

async function main() {
    if (!isMainThread) {
        return workerThread();
    }

    try {
        utils.ensureDirExists(SYMBOL_CONTEXT_OUTPUT_DIR);

        // Pre-load global reports
        const safeMutationsReportFile = path.join(SAFE_MUTATIONS_ANALYSIS_DIR, "safe_mutations_report.json");
        const safeMutationsReport = utils.readJsonFile(safeMutationsReportFile);
        const circularDepsFile = path.join(DEPENDENCY_GRAPH_DIR, "circular_dependencies.json");
        const circularDepsData = utils.readJsonFile(circularDepsFile);
        const depIndexFile = path.join(DEPENDENCY_GRAPH_DIR, "dependency_index.json");
        const depIndex = utils.readJsonFile(depIndexFile);

        if (!safeMutationsReport || !circularDepsData || !depIndex) {
            console.error("Failed to load one or more global report files. Exiting.");
            process.exit(1);
        }

        const apiContractsIndexFile = path.join(API_CONTRACTS_DIR, "___analysis.json");
        const apiContractsIndex = utils.readJsonFile(apiContractsIndexFile);

        if (!apiContractsIndex || !apiContractsIndex.modules) {
            console.error("Could not read API contracts index file or it's improperly formatted.");
            process.exit(1);
        }

        /** @type {{modulePath: string, className: string|null, symbolName: string}[]} */
        let allFqnDetails = [];

        for (const moduleEntry of apiContractsIndex.modules) {
            const modulePath = moduleEntry.name; // Assuming name is the relative module path
            const sanitizedModuleName = modulePath.replace(/\//g, "_").replace(/\./g, "_");
            const apiContractFile = path.join(API_CONTRACTS_DIR, `${sanitizedModuleName}_contracts.json`);
            const apiContractData = utils.readJsonFile(apiContractFile);

            if (!apiContractData) continue;

            // Top-level functions, interfaces, types, classes
            Object.keys(apiContractData.functions || {}).forEach(funcName => allFqnDetails.push({ modulePath, className: null, symbolName: funcName }));
            Object.keys(apiContractData.interfaces || {}).forEach(ifaceName => allFqnDetails.push({ modulePath, className: null, symbolName: ifaceName }));
            Object.keys(apiContractData.types || {}).forEach(typeName => allFqnDetails.push({ modulePath, className: null, symbolName: typeName }));
            Object.keys(apiContractData.classes || {}).forEach(className => {
                allFqnDetails.push({ modulePath, className: null, symbolName: className }); // The class itself
                const classData = apiContractData.classes[className];
                Object.keys(classData.methods || {}).forEach(methodName => allFqnDetails.push({ modulePath, className, symbolName: methodName }));
                Object.keys(classData.attributes || {}).forEach(propName => allFqnDetails.push({ modulePath, className, symbolName: propName }));
            });
        }
        
        console.log(`Found ${allFqnDetails.length} symbols to analyze.`);
        if (allFqnDetails.length === 0) {
            console.log("No symbols found to process.");
            return;
        }

        const cpuCount = os.cpus().length;
        const defaultMaxWorkers = Math.max(1, cpuCount > 1 ? cpuCount - 1 : 1);
        const args = process.argv.slice(2);
        const concurrencyArgIndex = args.indexOf("--concurrency");
        const userMaxWorkers = concurrencyArgIndex !== -1 ? parseInt(args[concurrencyArgIndex + 1], 10) : null;
        const maxWorkers = userMaxWorkers || defaultMaxWorkers;
        
        const useParallel = allFqnDetails.length > 50 && maxWorkers > 1; // Adjust threshold as needed
        let totalProcessed = 0;

        if (useParallel) {
            console.log(`Using ${maxWorkers} worker threads for symbol context analysis.`);
            const chunkSize = Math.ceil(allFqnDetails.length / maxWorkers);
            const workerPayloads = [];
            for (let i = 0; i < allFqnDetails.length; i += chunkSize) {
                workerPayloads.push({
                    fqnDetailsList: allFqnDetails.slice(i, i + chunkSize),
                    safeMutationsReport,
                    circularDepsData,
                    depIndex,
                    workerId: workerPayloads.length
                });
            }

            const workerPromises = workerPayloads.map((payload) => {
                return new Promise((resolve, reject) => {
                    const worker = new Worker(__filename, { workerData: payload });
                    worker.on("message", (count) => resolve(count)); // Worker sends back count of items it processed
                    worker.on("error", reject);
                    worker.on("exit", (code) => {
                        if (code !== 0) {
                            reject(new Error(`Worker ${payload.workerId} stopped with exit code ${code}`));
                        }
                    });
                });
            });
            const counts = await Promise.all(workerPromises);
            totalProcessed = counts.reduce((sum, count) => sum + count, 0);

        } else {
            console.log("Using sequential processing for symbol context analysis.");
            for (const fqnDetail of allFqnDetails) {
                try {
                    const dossier = await generateDossierForSymbol(fqnDetail, safeMutationsReport, circularDepsData, depIndex);
                    if (dossier) {
                        const fqn = fqnDetail.className ? `${fqnDetail.modulePath}.${fqnDetail.className}.${fqnDetail.symbolName}` : `${fqnDetail.modulePath}.${fqnDetail.symbolName}`;
                        const outputFileName = fqn.replace(/\//g, "_").replace(/\./g, "_") + "_dossier.json";
                        const outputFilePath = path.join(SYMBOL_CONTEXT_OUTPUT_DIR, outputFileName);
                        utils.writeJsonFile(outputFilePath, dossier, 2, false);
                        totalProcessed++;
                    }
                } catch (error) {
                     const fqn = fqnDetail.className ? `${fqnDetail.modulePath}.${fqnDetail.className}.${fqnDetail.symbolName}` : `${fqnDetail.modulePath}.${fqnDetail.symbolName}`;
                    console.error(`Error generating dossier for ${fqn}:`, error);
                }
            }
        }
        
        // Create an index file
        const indexFilePath = path.join(SYMBOL_CONTEXT_OUTPUT_DIR, "___symbol_dossiers_index.json");
        const indexContent = {
            generated_on: utils.getTimestamp(),
            command: process.argv.map(arg => arg.includes(" ") ? `"${arg}"` : arg).join(" "),
            total_symbols_processed: totalProcessed,
            // Could list all FQNs and their filenames here if needed, but might be very large
        };
        utils.writeJsonFile(indexFilePath, indexContent, 2);


        console.log(`Symbol context analysis complete. ${totalProcessed} dossiers generated in: ${SYMBOL_CONTEXT_OUTPUT_DIR}`);

    } catch (error) {
        console.error(`Fatal error in Symbol Context Analyzer: ${error}`);
        process.exit(1);
    }
}


main().catch(error => {
    console.error("Symbol Context Analyzer Main Error:", error);
    process.exit(1);
});
