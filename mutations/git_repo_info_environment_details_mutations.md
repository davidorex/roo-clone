# Git Repository Information Integration Mutations

This document outlines the exact mutations needed to implement a feature that inserts current repository information, branch information, and the last 10 commits into the environment details.

## 1. Extend Git Utility Module

First, we need to add new functions to the `src/utils/git.ts` file to retrieve the current repository name, branch information, and recent commits.

```typescript
// Add these new functions to src/utils/git.ts

/**
 * Gets the current repository name from the remote URL
 * @param cwd Current working directory
 * @returns Repository name or null if not available
 */
export async function getRepositoryName(cwd: string): Promise<string | null> {
	try {
		const isInstalled = await checkGitInstalled()
		if (!isInstalled) {
			return null
		}

		const isRepo = await checkGitRepo(cwd)
		if (!isRepo) {
			return null
		}

		// Get the remote URL and extract repo name
		const { stdout } = await execAsync("git remote get-url origin", { cwd }).catch(() => ({ stdout: "" }))

		if (!stdout.trim()) {
			return null
		}

		// Extract repo name from URL
		// Handle different URL formats: HTTPS or SSH
		const url = stdout.trim()
		let repoName = null

		if (url.includes("github.com")) {
			// Format: https://github.com/username/repo.git or git@github.com:username/repo.git
			const match = url.match(/github\.com[\/:]([^\/]+)\/([^\/\.]+)/)
			if (match && match.length >= 3) {
				repoName = `${match[1]}/${match[2].replace(".git", "")}`
			}
		} else {
			// Try to extract the last part of the URL as the repo name
			const parts = url.split("/").filter(Boolean)
			if (parts.length > 0) {
				repoName = parts[parts.length - 1].replace(".git", "")
			}
		}

		return repoName
	} catch (error) {
		console.error("Error getting repository name:", error)
		return null
	}
}

/**
 * Gets the current branch name
 * @param cwd Current working directory
 * @returns Current branch name or null if not available
 */
export async function getCurrentBranch(cwd: string): Promise<string | null> {
	try {
		const isInstalled = await checkGitInstalled()
		if (!isInstalled) {
			return null
		}

		const isRepo = await checkGitRepo(cwd)
		if (!isRepo) {
			return null
		}

		// Get the current branch name
		const { stdout } = await execAsync("git rev-parse --abbrev-ref HEAD", { cwd })
		return stdout.trim() || null
	} catch (error) {
		console.error("Error getting current branch:", error)
		return null
	}
}

/**
 * Gets the last N commits from the repository
 * @param cwd Current working directory
 * @param count Number of commits to retrieve (default: 10)
 * @returns Array of GitCommit objects or empty array if not available
 */
export async function getRecentCommits(cwd: string, count: number = 10): Promise<GitCommit[]> {
	try {
		const isInstalled = await checkGitInstalled()
		if (!isInstalled) {
			return []
		}

		const isRepo = await checkGitRepo(cwd)
		if (!isRepo) {
			return []
		}

		// Get the last N commits
		const { stdout } = await execAsync(`git log -n ${count} --format="%H%n%h%n%s%n%an%n%ad" --date=short`, { cwd })

		if (!stdout.trim()) {
			return []
		}

		const commits: GitCommit[] = []
		const lines = stdout
			.trim()
			.split("\n")
			.filter((line) => line !== "--")

		for (let i = 0; i < lines.length; i += 5) {
			if (i + 4 < lines.length) {
				commits.push({
					hash: lines[i],
					shortHash: lines[i + 1],
					subject: lines[i + 2],
					author: lines[i + 3],
					date: lines[i + 4],
				})
			}
		}

		return commits
	} catch (error) {
		console.error("Error getting recent commits:", error)
		return []
	}
}
```

## 2. Modify getEnvironmentDetails Function

Next, we need to modify the `getEnvironmentDetails` function in `src/core/environment/getEnvironmentDetails.ts` to include the Git repository information.

First, add the import for the new Git utility functions:

```typescript
// Add this import to src/core/environment/getEnvironmentDetails.ts
import { getRepositoryName, getCurrentBranch, getRecentCommits } from "../../utils/git"
```

Then, add the Git repository information section to the `getEnvironmentDetails` function. Insert this code before the final return statement:

```typescript
// Add this code before the final return statement in getEnvironmentDetails function

// Add Git repository information
const repoName = await getRepositoryName(cline.cwd)
const currentBranch = await getCurrentBranch(cline.cwd)
const recentCommits = await getRecentCommits(cline.cwd, 10)

if (repoName || currentBranch || recentCommits.length > 0) {
	details += "\n\n# Git Repository Information"

	if (repoName) {
		details += `\n## Repository: ${repoName}`
	}

	if (currentBranch) {
		details += `\n## Current Branch: ${currentBranch}`
	}

	if (recentCommits.length > 0) {
		details += "\n## Recent Commits"
		recentCommits.forEach((commit, index) => {
			details += `\n${index + 1}. ${commit.shortHash} - ${commit.subject} (${commit.author}, ${commit.date})`
		})
	}
}
```

## 3. Complete Mutation Plan

Here's the complete mutation plan with exact file changes:

### File: src/utils/git.ts

Add the three new functions (`getRepositoryName`, `getCurrentBranch`, and `getRecentCommits`) at the end of the file, just before the closing brace.

### File: src/core/environment/getEnvironmentDetails.ts

1. Add the import statement at the top of the file with the other imports:

```typescript
import { getRepositoryName, getCurrentBranch, getRecentCommits } from "../../utils/git"
```

2. Add the Git repository information section before the final return statement (after the workspace directory files section).

## 4. Testing the Changes

After implementing these changes, you can test them by:

1. Opening a Git repository in VSCode
2. Sending a message to the AI assistant in the Roo-Clone extension, which automatically generates environment details for each user message
3. Verifying that the Git repository information appears in the environment details section of the AI's context

## 5. Error Handling and Edge Cases

The implementation includes robust error handling:

1. Checks if Git is installed
2. Checks if the current directory is a Git repository
3. Handles different remote URL formats (HTTPS and SSH)
4. Gracefully handles missing information (no remote, no commits, etc.)
5. Provides meaningful error messages in the console for debugging

## 6. Performance Considerations

The Git operations are relatively lightweight, but they do involve spawning child processes. To optimize performance:

1. All Git operations are asynchronous
2. The functions return early if Git is not installed or the directory is not a repository
3. The implementation reuses the existing `checkGitRepo` and `checkGitInstalled` functions to avoid redundant checks

This implementation follows the existing patterns in the codebase and extends the functionality in a way that is consistent with the current architecture.
