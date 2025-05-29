import os from "os"
import osName from "os-name"

import { getShell } from "../../../utils/shell"

export function getSystemInfoSection(cwd: string): string {
	let details = `====

SYSTEM INFORMATION

Operating System: ${osName()}
Default Shell: ${getShell()}
Home Directory: ${os.homedir().toPosix()}
Current Workspace Directory: ${cwd.toPosix()}

The Current Workspace Directory is the active VS Code project directory, and is therefore the default directory for all tool operations. New terminals will be created in the current workspace directory, however if you change directories in a terminal it will then have a different working directory; changing directories in a terminal does not modify the workspace directory, because you do not have access to change the workspace directory. When the user initially gives you a directive, a recursive list of all filepaths in the current workspace directory ('/test/path') will be included in environment_details. This provides an overview of the project's file structure, offering key insights into the project from directory/file names (how developers conceptualize and organize their code) and file extensions (the language used). This can also guide decision-making on which files to explore further. If you need to further explore directories such as outside the current workspace directory, you can use the list_files tool. If you pass 'true' for the recursive parameter, it will list files recursively. Otherwise, it will list files at the top level, which is better suited for generic directories where you don't necessarily need the nested structure, like the Desktop.`

	// Add conditional block based on working directory
	if (cwd.includes("roo-clone")) {
		details += `
		Use the following code analysis output indexes and their listed files when establishing exact understanding of the existing patterns and methods to extend and reproduce when implementing user directives:

		packages/dev-support-scripts/api_contracts/___analysis.json
		packages/dev-support-scripts/api_contracts/___index.json
		packages/dev-support-scripts/dependency_graph/dependency_index.json
		packages/dev-support-scripts/dependency_graph/circular_dependencies.json
		packages/dev-support-scripts/dependency_graph/entanglement_depth.json
		packages/dev-support-scripts/docstring_inventory/___docstrings_index.json
		packages/dev-support-scripts/generated_docstring_inventory/___generated_docstrings_index.json
		packages/dev-support-scripts/safe_mutations_analysis/___safe_mutations_index.json
`
	}

	return details
}
