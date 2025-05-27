# Mutations for src/utils/git.ts

This document outlines the exact mutations required to add new Git information utility functions to `src/utils/git.ts`.

## Add New Git Utility Functions

The following functions will be added to the end of the file `src/utils/git.ts`.

```diff
<<<<<<< SEARCH
:start_line:160
-------
}
=======
}

export async function getCurrentBranch(cwd: string): Promise<string | null> {
	try {
		const isInstalled = await checkGitInstalled()
		if (!isInstalled) {
			// console.error("Git is not installed") // Optional: keep console logs for debugging if desired
			return null
		}
		const isRepo = await checkGitRepo(cwd)
		if (!isRepo) {
			// console.error("Not a git repository")
			return null
		}
		const { stdout } = await execAsync("git rev-parse --abbrev-ref HEAD", { cwd })
		return stdout.trim()
	} catch (error) {
		// console.error("Error getting current branch:", error)
		return null
	}
}

export async function getRepoName(cwd: string): Promise<string | null> {
	try {
		const isInstalled = await checkGitInstalled()
		if (!isInstalled) {
			return null
		}
		const isRepo = await checkGitRepo(cwd)
		if (!isRepo) {
			return null
		}
		const { stdout } = await execAsync("git rev-parse --show-toplevel", { cwd })
		const repoPath = stdout.trim()
		return repoPath ? path.basename(repoPath) : null
	} catch (error) {
		// console.error("Error getting repo name:", error)
		return null
	}
}

export async function getLatestCommits(cwd: string, count: number = 10): Promise<GitCommit[]> {
	try {
		const isInstalled = await checkGitInstalled()
		if (!isInstalled) {
			return []
		}
		const isRepo = await checkGitRepo(cwd)
		if (!isRepo) {
			return []
		}
		const { stdout } = await execAsync(
			`git log -n ${count} --format="%H%n%h%n%s%n%an%n%ad" --date=short`,
			{ cwd },
		)

		if (!stdout.trim()) {
			return []
		}

		const commits: GitCommit[] = []
		const lines = stdout
			.trim()
			.split("\n")
			.filter((line) => line !== "--") // Should not be necessary with this format string

		for (let i = 0; i < lines.length; i += 5) {
			if (lines.length < i + 5) {
				// console.warn("Incomplete commit data received from git log")
				break // Avoids error if git log output is unexpected
			}
			commits.push({
				hash: lines[i],
				shortHash: lines[i + 1],
				subject: lines[i + 2],
				author: lines[i + 3],
				date: lines[i + 4],
			})
		}
		return commits
	} catch (error) {
		// console.error("Error getting latest commits:", error)
		return []
	}
}
>>>>>>> REPLACE
```
