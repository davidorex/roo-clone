# Mutations for src/core/environment/getEnvironmentDetails.ts

This document outlines the exact mutations required to integrate Git information into `src/core/environment/getEnvironmentDetails.ts`.

## 1. Add Imports for Git Utilities

Add the import statement for Git utility functions from `src/utils/git.ts`.

```diff
<<<<<<< SEARCH
:start_line:15
-------
import { arePathsEqual } from "../../utils/path"
import { formatResponse } from "../prompts/responses"
=======
import { arePathsEqual } from "../../utils/path"
import { getCurrentBranch, getRepoName, getLatestCommits, GitCommit } from "../../utils/git"
import { formatResponse } from "../prompts/responses"
>>>>>>> REPLACE
```

## 2. Add Git Information Section

Insert the new "# Git Information" section before the "# Current Time" section.

```diff
<<<<<<< SEARCH
:start_line:165
-------
		for (const filePath of recentlyModifiedFiles) {
			details += `\n${filePath}`
		}
	}

	if (terminalDetails) {
		details += terminalDetails
	}

	// Add current time information with timezone.
	const now = new Date()
=======
		for (const filePath of recentlyModifiedFiles) {
			details += `\n${filePath}`
		}
	}

	if (terminalDetails) {
		details += terminalDetails
	}

	// Add Git Information section
	details += "\n\n# Git Information"
	try {
		const repoName = await getRepoName(cline.cwd)
		const branchName = await getCurrentBranch(cline.cwd)

		if (repoName && branchName) {
			details += `\nRepository: ${repoName}`
			details += `\nBranch: ${branchName}`

			const commits = await getLatestCommits(cline.cwd, 10)
			if (commits.length > 0) {
				details += "\nLatest Commits:"
				for (const commit of commits) {
					details += `\n- ${commit.shortHash} ${commit.date} ${commit.subject}`
				}
			} else {
				details += "\n(No commits found)"
			}
		} else if (repoName) {
			details += `\nRepository: ${repoName}`
			details += "\n(Unable to retrieve full Git repository details - branch or commits missing)"
		} else {
			details += "\n(Not a Git repository or Git not found/accessible)"
		}
	} catch (gitError) {
		// console.error("Error retrieving Git information:", gitError) // Optional
		details += "\n(Error retrieving Git information)"
	}
	// End Git Information section

	// Add current time information with timezone.
	const now = new Date()
>>>>>>> REPLACE
```
