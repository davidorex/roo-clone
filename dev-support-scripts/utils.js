const fs = require("fs");
const path = require("path");
const { Worker } = require("worker_threads");
const os = require("os");
const ts = require("typescript");

const SCRIPT_DIR = __dirname;
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "..");
const EXCLUDED_DIRS = ["node_modules", ".git", "dist", "build", "out", "coverage", "assets", "locales", "webview-ui/build", "dev-support-scripts"];
const EXCLUDED_FILES = [".DS_Store", "package-lock.json"];
const MAX_FILE_SIZE_KB = 500; // Max file size in KB to parse for AST

const API_CONTRACTS_DIR = path.join(SCRIPT_DIR, "api_contracts");
const DEPENDENCY_GRAPH_DIR = path.join(SCRIPT_DIR, "dependency_graph");
const DOCSTRING_INVENTORY_DIR = path.join(SCRIPT_DIR, "docstring_inventory");
const GENERATED_DOCSTRING_INVENTORY_DIR = path.join(SCRIPT_DIR, "generated_docstring_inventory");


function getTimestamp() {
	return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
}

function ensureDirExists(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}

function writeJsonFile(filePath, data, indent = 2, includeTimestamp = false) {
	try {
		let content = JSON.stringify(data, null, indent);
		if (includeTimestamp) {
			const timestamp = getTimestamp();
			const command = process.argv.map(arg => arg.includes(" ") ? `"${arg}"` : arg).join(" ");
			content = `// Generated on: ${timestamp}\n// Command: ${command}\n` + content;
		}
		fs.writeFileSync(filePath, content);
		// console.log(`Successfully wrote JSON to ${filePath}`);
	} catch (error) {
		console.error(`Error writing JSON to ${filePath}: ${error}`);
	}
}

function readJsonFile(filePath) {
	try {
		if (fs.existsSync(filePath)) {
			let rawData = fs.readFileSync(filePath, "utf8");
            // Remove BOM if present
            if (rawData.charCodeAt(0) === 0xFEFF) {
                rawData = rawData.slice(1);
            }
			// Remove all single-line comments that start a line (possibly with leading whitespace)
            // Remove all multi-line comments
            const jsonString = rawData
                .replace(/^\s*\/\/.*$/gm, '') // Remove full lines of single-line comments
                .replace(/\/\*[\s\S]*?\*\//g, ''); // Remove multi-line comments
			return JSON.parse(jsonString.trim()); // Trim whitespace before parsing
		}
		// console.warn(`File not found: ${filePath}`);
		return null;
	} catch (error) {
		console.error(`Error reading or parsing JSON from ${filePath}: ${error}`);
		return null;
	}
}

function getSourceFiles(dir, exclusions = EXCLUDED_DIRS, fileExtensions = [".ts", ".tsx"]) {
	let files = [];
	const items = fs.readdirSync(dir, { withFileTypes: true });

	for (const item of items) {
		const fullPath = path.join(dir, item.name);
		if (exclusions.some((ex) => fullPath.includes(path.normalize(ex))) || EXCLUDED_FILES.includes(item.name)) {
			continue;
		}

		if (item.isDirectory()) {
			files = files.concat(getSourceFiles(fullPath, exclusions, fileExtensions));
		} else if (fileExtensions.includes(path.extname(item.name))) {
			try {
				const stats = fs.statSync(fullPath);
				if (stats.size / 1024 <= MAX_FILE_SIZE_KB) {
					files.push(fullPath);
				} else {
					// console.warn(`Skipping large file: ${fullPath} (${(stats.size / 1024).toFixed(2)} KB)`);
				}
			} catch (error) {
				console.error(`Error getting stats for file ${fullPath}: ${error}`);
			}
		}
	}
	return files;
}

function parseTypeScriptFile(filePath) {
	try {
		const fileContent = fs.readFileSync(filePath, "utf8");
		return ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
	} catch (error) {
		console.error(`Error parsing TypeScript file ${filePath}: ${error}`);
		return null;
	}
}

function extractDocstring(node, sourceFile) {
    const ranges = ts.getLeadingCommentRanges(sourceFile.getFullText(), node.pos);
    if (ranges && ranges.length > 0) {
        for (const range of ranges) {
            const commentText = sourceFile.getFullText().substring(range.pos, range.end);
            // Check if it's a JSDoc-style comment (starts with /**, ends with */)
            if (commentText.startsWith("/**") && commentText.endsWith("*/")) {
                // Clean up the comment block (remove /**, */, and leading * on lines)
                return commentText
                    .replace(/^\/\*\*!?/, "") // Remove /** or /**!
                    .replace(/\*\/$/, "")     // Remove */
                    .replace(/^\s*\* ?/gm, "") // Remove leading * and space
                    .trim();
            }
        }
    }
    return null;
}

/**
 * Parses a fully qualified symbol name into its components.
 * e.g., "src/core/MyClass.methodName" -> { modulePath: "src/core", className: "MyClass", symbolName: "methodName" }
 * e.g., "src/utils/myFunction" -> { modulePath: "src/utils", className: null, symbolName: "myFunction" }
 * @param {string} fqn - The fully qualified name.
 * @returns {{ modulePath: string, className: string | null, symbolName: string } | null}
 */
function parseFullyQualifiedSymbol(fqn) {
    if (!fqn || typeof fqn !== 'string') return null;

    const parts = fqn.split('.');
    if (parts.length === 0) return null;

    const symbolName = parts.pop();
    if (!symbolName) return null;

    let modulePathParts = [];
    let className = null;

    // Iterate backwards from the second to last part to find the module/class boundary
    // The first part that starts with an uppercase letter and is followed by the symbol name
    // is likely the class name. Everything before it is the module path.
    // If no such part is found, all preceding parts form the module path.

    let potentialClassIndex = -1;
    for (let i = parts.length - 1; i >= 0; i--) {
        const currentPart = parts[i];
        if (currentPart.length > 0 && currentPart[0] === currentPart[0].toUpperCase()) {
            // Check if it's a plausible class name (not just a directory name that happens to be capitalized)
            // This is heuristic. A more robust way might involve checking against actual class names from API contracts.
            // For now, we assume if it's capitalized and directly precedes the symbol, it's the class.
            potentialClassIndex = i;
            break; 
        }
    }
    
    if (potentialClassIndex !== -1) {
        className = parts[potentialClassIndex];
        modulePathParts = parts.slice(0, potentialClassIndex);
    } else {
        modulePathParts = parts;
    }
    
    // Reconstruct modulePath, handling cases where it might be just a filename without subdirs
    let modulePath = modulePathParts.join('/');
    if (!modulePath && className && symbolName && !fqn.includes('/')) { // e.g. MyClass.methodName
        modulePath = className; // Assume class name is also the file name
        className = null; // Treat as top-level symbol in a file named MyClass.ts
    } else if (!modulePath && !className && symbolName && !fqn.includes('/')) { // e.g. myFunction
         modulePath = symbolName; // Assume symbol name is also the file name
    }


    return { modulePath, className, symbolName };
}


module.exports = {
	SCRIPT_DIR,
	PROJECT_ROOT,
	EXCLUDED_DIRS,
	MAX_FILE_SIZE_KB,
    API_CONTRACTS_DIR,
    DEPENDENCY_GRAPH_DIR,
    DOCSTRING_INVENTORY_DIR,
    GENERATED_DOCSTRING_INVENTORY_DIR,
	getTimestamp,
	ensureDirExists,
	writeJsonFile,
	readJsonFile,
	getSourceFiles,
	parseTypeScriptFile,
    extractDocstring,
    parseFullyQualifiedSymbol
};
