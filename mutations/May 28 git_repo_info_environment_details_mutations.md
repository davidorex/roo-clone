# Git Repository Information Integration Mutations

This document outlines the exact mutations needed to implement a feature that inserts current repository information, branch information, and the last 10 commits into the environment details.

## 1. Export Helper Functions and Add New Functions to Git Utility Module

First, we need to export the existing helper functions and add new functions to the `src/utils/git.ts` file to retrieve the current repository name, branch information, and recent commits.

### 1.1 Export Existing Helper Functions

Change the existing helper functions from private to exported:

```typescript
// CHANGE this line (around line 16):
async function checkGitRepo(cwd: string): Promise<boolean> {

// TO:
export async function checkGitRepo(cwd: string): Promise<boolean> {

// CHANGE this line (around line 25):
async function checkGitInstalled(): Promise<boolean> {

// TO:
export async function checkGitInstalled(): Promise<boolean> {
```

### 1.2 Add New Functions

Add these new functions to the end of `src/utils/git.ts`:

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

**Note**: The `GitCommit` interface is already defined in `src/utils/git.ts` (lines 8-14), so no additional type definition is needed.

## 2. Modify getEnvironmentDetails Function

Next, we need to modify the `getEnvironmentDetails` function in `src/core/environment/getEnvironmentDetails.ts` to include the Git repository information.

First, add the import for the new Git utility functions and the GitCommit type:

```typescript
// Add this import to src/core/environment/getEnvironmentDetails.ts after line 15 (after utils imports)
import { getRepositoryName, getCurrentBranch, getRecentCommits, GitCommit } from "../../utils/git"
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

1. **Export existing helper functions**: Change `async function checkGitRepo` and `async function checkGitInstalled` to `export async function` (around lines 16 and 25)

2. **Add new functions**: Add the three new functions (`getRepositoryName`, `getCurrentBranch`, and `getRecentCommits`) at the end of the file

### File: src/core/environment/getEnvironmentDetails.ts

1. **Add import statement**: Add the import after line 15 (after utils imports) and before line 18 (before core imports):

```typescript
import { getRepositoryName, getCurrentBranch, getRecentCommits, GitCommit } from "../../utils/git"
```

2. **Add Git repository information section**: Add the Git repository information section before the final return statement (after the workspace directory files section).

## 4. Testing the Changes

After implementing these changes, you can test them by:

1. Opening a Git repository in VSCode
2. Sending a message to the AI assistant in the Roo-Clone extension, which automatically generates environment details for each user message
3. Verifying that the Git repository information appears in the environment details section of the AI's context

## 5. Type Safety

The implementation leverages the existing `GitCommit` interface already defined in `src/utils/git.ts` (lines 8-14):

```typescript
export interface GitCommit {
	hash: string
	shortHash: string
	subject: string
	author: string
	date: string
}
```

This ensures type safety throughout the implementation and maintains consistency with existing git-related functions.

## 6. Error Handling and Edge Cases

The implementation includes robust error handling:

1. Checks if Git is installed using the existing `checkGitInstalled()` function
2. Checks if the current directory is a Git repository using the existing `checkGitRepo()` function
3. Handles different remote URL formats (HTTPS and SSH)
4. Gracefully handles missing information (no remote, no commits, etc.)
5. Provides meaningful error messages in the console for debugging

## 7. Performance Considerations

The Git operations are relatively lightweight, but they do involve spawning child processes. To optimize performance:

1. All Git operations are asynchronous
2. The functions return early if Git is not installed or the directory is not a repository
3. The implementation reuses the existing `checkGitRepo` and `checkGitInstalled` functions to avoid redundant checks

This implementation follows the existing patterns in the codebase and extends the functionality in a way that is consistent with the current architecture.

## 8. Test Mutations

To ensure proper test coverage for the new functionality, we need to add tests that follow the existing patterns in the codebase. Here are the exact test mutations required:

### File: src/utils/**tests**/git.test.ts

Add the following test cases for the new Git utility functions:

```typescript
describe("getRepositoryName", () => {
	it("should return repository name when git is installed and repo exists with HTTPS URL", async () => {
		// Set up mock responses
		const responses = new Map([
			["git --version", { stdout: "git version 2.39.2", stderr: "" }],
			["git rev-parse --git-dir", { stdout: ".git", stderr: "" }],
			["git remote get-url origin", { stdout: "https://github.com/username/repo-name.git", stderr: "" }],
		])

		exec.mockImplementation((command: string, options: { cwd?: string }, callback: Function) => {
			// Find matching response
			for (const [cmd, response] of responses) {
				if (command === cmd) {
					callback(null, response)
					return
				}
			}
			callback(new Error(`Unexpected command: ${command}`))
		})

		const result = await getRepositoryName(cwd)

		// Verify the result is correct
		expect(result).toBe("username/repo-name")

		// Verify all commands were called correctly
		expect(exec).toHaveBeenCalledWith("git --version", {}, expect.any(Function))
		expect(exec).toHaveBeenCalledWith("git rev-parse --git-dir", { cwd }, expect.any(Function))
		expect(exec).toHaveBeenCalledWith("git remote get-url origin", { cwd }, expect.any(Function))
	})

	it("should return repository name when git is installed and repo exists with SSH URL", async () => {
		// Set up mock responses
		const responses = new Map([
			["git --version", { stdout: "git version 2.39.2", stderr: "" }],
			["git rev-parse --git-dir", { stdout: ".git", stderr: "" }],
			["git remote get-url origin", { stdout: "git@github.com:username/repo-name.git", stderr: "" }],
		])

		exec.mockImplementation((command: string, options: { cwd?: string }, callback: Function) => {
			// Find matching response
			for (const [cmd, response] of responses) {
				if (command === cmd) {
					callback(null, response)
					return
				}
			}
			callback(new Error(`Unexpected command: ${command}`))
		})

		const result = await getRepositoryName(cwd)

		// Verify the result is correct
		expect(result).toBe("username/repo-name")

		// Verify all commands were called correctly
		expect(exec).toHaveBeenCalledWith("git --version", {}, expect.any(Function))
		expect(exec).toHaveBeenCalledWith("git rev-parse --git-dir", { cwd }, expect.any(Function))
		expect(exec).toHaveBeenCalledWith("git remote get-url origin", { cwd }, expect.any(Function))
	})

	it("should return repository name for non-GitHub URLs", async () => {
		// Set up mock responses
		const responses = new Map([
			["git --version", { stdout: "git version 2.39.2", stderr: "" }],
			["git rev-parse --git-dir", { stdout: ".git", stderr: "" }],
			["git remote get-url origin", { stdout: "https://gitlab.com/username/repo-name.git", stderr: "" }],
		])

		exec.mockImplementation((command: string, options: { cwd?: string }, callback: Function) => {
			// Find matching response
			for (const [cmd, response] of responses) {
				if (command === cmd) {
					callback(null, response)
					return
				}
			}
			callback(new Error(`Unexpected command: ${command}`))
		})

		const result = await getRepositoryName(cwd)

		// Verify the result is correct
		expect(result).toBe("repo-name")
	})

	it("should return null when git is not installed", async () => {
		exec.mockImplementation((command: string, options: { cwd?: string }, callback: Function) => {
			if (command === "git --version") {
				callback(new Error("git not found"))
				return
			}
			callback(new Error("Unexpected command"))
		})

		const result = await getRepositoryName(cwd)
		expect(result).toBeNull()
		expect(exec).toHaveBeenCalledWith("git --version", {}, expect.any(Function))
	})

	it("should return null when not in a git repository", async () => {
		const responses = new Map([
			["git --version", { stdout: "git version 2.39.2", stderr: "" }],
			["git rev-parse --git-dir", null], // null indicates error should be called
		])

		exec.mockImplementation((command: string, options: { cwd?: string }, callback: Function) => {
			const response = responses.get(command)
			if (response === null) {
				callback(new Error("not a git repository"))
			} else if (response) {
				callback(null, response)
			} else {
				callback(new Error("Unexpected command"))
			}
		})

		const result = await getRepositoryName(cwd)
		expect(result).toBeNull()
		expect(exec).toHaveBeenCalledWith("git --version", {}, expect.any(Function))
		expect(exec).toHaveBeenCalledWith("git rev-parse --git-dir", { cwd }, expect.any(Function))
	})

	it("should return null when no remote URL is available", async () => {
		const responses = new Map([
			["git --version", { stdout: "git version 2.39.2", stderr: "" }],
			["git rev-parse --git-dir", { stdout: ".git", stderr: "" }],
			["git remote get-url origin", null], // null indicates error should be called
		])

		exec.mockImplementation((command: string, options: { cwd?: string }, callback: Function) => {
			const response = responses.get(command)
			if (response === null) {
				callback(new Error("no remote named 'origin'"))
			} else if (response) {
				callback(null, response)
			} else {
				callback(new Error("Unexpected command"))
			}
		})

		const result = await getRepositoryName(cwd)
		expect(result).toBeNull()
	})
})

describe("getCurrentBranch", () => {
	it("should return branch name when git is installed and repo exists", async () => {
		// Set up mock responses
		const responses = new Map([
			["git --version", { stdout: "git version 2.39.2", stderr: "" }],
			["git rev-parse --git-dir", { stdout: ".git", stderr: "" }],
			["git rev-parse --abbrev-ref HEAD", { stdout: "main", stderr: "" }],
		])

		exec.mockImplementation((command: string, options: { cwd?: string }, callback: Function) => {
			// Find matching response
			for (const [cmd, response] of responses) {
				if (command === cmd) {
					callback(null, response)
					return
				}
			}
			callback(new Error(`Unexpected command: ${command}`))
		})

		const result = await getCurrentBranch(cwd)

		// Verify the result is correct
		expect(result).toBe("main")

		// Verify all commands were called correctly
		expect(exec).toHaveBeenCalledWith("git --version", {}, expect.any(Function))
		expect(exec).toHaveBeenCalledWith("git rev-parse --git-dir", { cwd }, expect.any(Function))
		expect(exec).toHaveBeenCalledWith("git rev-parse --abbrev-ref HEAD", { cwd }, expect.any(Function))
	})

	it("should return null when git is not installed", async () => {
		exec.mockImplementation((command: string, options: { cwd?: string }, callback: Function) => {
			if (command === "git --version") {
				callback(new Error("git not found"))
				return
			}
			callback(new Error("Unexpected command"))
		})

		const result = await getCurrentBranch(cwd)
		expect(result).toBeNull()
		expect(exec).toHaveBeenCalledWith("git --version", {}, expect.any(Function))
	})

	it("should return null when not in a git repository", async () => {
		const responses = new Map([
			["git --version", { stdout: "git version 2.39.2", stderr: "" }],
			["git rev-parse --git-dir", null], // null indicates error should be called
		])

		exec.mockImplementation((command: string, options: { cwd?: string }, callback: Function) => {
			const response = responses.get(command)
			if (response === null) {
				callback(new Error("not a git repository"))
			} else if (response) {
				callback(null, response)
			} else {
				callback(new Error("Unexpected command"))
			}
		})

		const result = await getCurrentBranch(cwd)
		expect(result).toBeNull()
		expect(exec).toHaveBeenCalledWith("git --version", {}, expect.any(Function))
		expect(exec).toHaveBeenCalledWith("git rev-parse --git-dir", { cwd }, expect.any(Function))
	})
})

describe("getRecentCommits", () => {
	const mockCommitData = [
		"abc123def456",
		"abc123",
		"fix: test commit",
		"John Doe",
		"2024-01-06",
		"def456abc789",
		"def456",
		"feat: new feature",
		"Jane Smith",
		"2024-01-05",
	].join("\n")

	it("should return commits when git is installed and repo exists", async () => {
		// Set up mock responses
		const responses = new Map([
			["git --version", { stdout: "git version 2.39.2", stderr: "" }],
			["git rev-parse --git-dir", { stdout: ".git", stderr: "" }],
			['git log -n 10 --format="%H%n%h%n%s%n%an%n%ad" --date=short', { stdout: mockCommitData, stderr: "" }],
		])

		exec.mockImplementation((command: string, options: { cwd?: string }, callback: Function) => {
			// Find matching response
			for (const [cmd, response] of responses) {
				if (command.startsWith(cmd)) {
					callback(null, response)
					return
				}
			}
			callback(new Error(`Unexpected command: ${command}`))
		})

		const result = await getRecentCommits(cwd)

		// First verify the result is correct
		expect(result).toHaveLength(2)
		expect(result[0]).toEqual({
			hash: "abc123def456",
			shortHash: "abc123",
			subject: "fix: test commit",
			author: "John Doe",
			date: "2024-01-06",
		})

		// Then verify all commands were called correctly
		expect(exec).toHaveBeenCalledWith("git --version", {}, expect.any(Function))
		expect(exec).toHaveBeenCalledWith("git rev-parse --git-dir", { cwd }, expect.any(Function))
		expect(exec).toHaveBeenCalledWith(
			'git log -n 10 --format="%H%n%h%n%s%n%an%n%ad" --date=short',
			{ cwd },
			expect.any(Function),
		)
	})

	it("should return empty array when git is not installed", async () => {
		exec.mockImplementation((command: string, options: { cwd?: string }, callback: Function) => {
			if (command === "git --version") {
				callback(new Error("git not found"))
				return
			}
			callback(new Error("Unexpected command"))
		})

		const result = await getRecentCommits(cwd)
		expect(result).toEqual([])
		expect(exec).toHaveBeenCalledWith("git --version", {}, expect.any(Function))
	})

	it("should return empty array when not in a git repository", async () => {
		const responses = new Map([
			["git --version", { stdout: "git version 2.39.2", stderr: "" }],
			["git rev-parse --git-dir", null], // null indicates error should be called
		])

		exec.mockImplementation((command: string, options: { cwd?: string }, callback: Function) => {
			const response = responses.get(command)
			if (response === null) {
				callback(new Error("not a git repository"))
			} else if (response) {
				callback(null, response)
			} else {
				callback(new Error("Unexpected command"))
			}
		})

		const result = await getRecentCommits(cwd)
		expect(result).toEqual([])
		expect(exec).toHaveBeenCalledWith("git --version", {}, expect.any(Function))
		expect(exec).toHaveBeenCalledWith("git rev-parse --git-dir", { cwd }, expect.any(Function))
	})

	it("should respect the count parameter", async () => {
		// Set up mock responses
		const responses = new Map([
			["git --version", { stdout: "git version 2.39.2", stderr: "" }],
			["git rev-parse --git-dir", { stdout: ".git", stderr: "" }],
			['git log -n 5 --format="%H%n%h%n%s%n%an%n%ad" --date=short', { stdout: mockCommitData, stderr: "" }],
		])

		exec.mockImplementation((command: string, options: { cwd?: string }, callback: Function) => {
			// Find matching response
			for (const [cmd, response] of responses) {
				if (command.startsWith(cmd)) {
					callback(null, response)
					return
				}
			}
			callback(new Error(`Unexpected command: ${command}`))
		})

		await getRecentCommits(cwd, 5)

		// Verify the command was called with the correct count
		expect(exec).toHaveBeenCalledWith(
			'git log -n 5 --format="%H%n%h%n%s%n%an%n%ad" --date=short',
			{ cwd },
			expect.any(Function),
		)
	})
})
```

### File: src/core/environment/**tests**/getEnvironmentDetails.test.ts

Add the following test case for the Git repository information section:

```typescript
// Add these imports at the top of the file with the other imports
import * as git from "../../../utils/git"

// Add this to the jest.mock section
jest.mock("../../../utils/git")

// Add this to the beforeEach function to set up the mocks
;(git.getRepositoryName as jest.Mock).mockResolvedValue(null)
;(git.getCurrentBranch as jest.Mock).mockResolvedValue(null)
;(git.getRecentCommits as jest.Mock).mockResolvedValue([])

// Add this test case
it("should include git repository information when available", async () => {
	const mockRepoName = "username/repo-name"
	const mockBranch = "main"
	const mockCommits = [
		{
			hash: "abc123def456",
			shortHash: "abc123",
			subject: "fix: test commit",
			author: "John Doe",
			date: "2024-01-06",
		},
		{
			hash: "def456abc789",
			shortHash: "def456",
			subject: "feat: new feature",
			author: "Jane Smith",
			date: "2024-01-05",
		},
	]

	// Set up the mocks to return git information
	;(git.getRepositoryName as jest.Mock).mockResolvedValue(mockRepoName)
	;(git.getCurrentBranch as jest.Mock).mockResolvedValue(mockBranch)
	;(git.getRecentCommits as jest.Mock).mockResolvedValue(mockCommits)

	const result = await getEnvironmentDetails(mockCline as Task)

	// Verify the git information is included
	expect(result).toContain("# Git Repository Information")
	expect(result).toContain(`## Repository: ${mockRepoName}`)
	expect(result).toContain(`## Current Branch: ${mockBranch}`)
	expect(result).toContain("## Recent Commits")
	expect(result).toContain("1. abc123 - fix: test commit (John Doe, 2024-01-06)")
	expect(result).toContain("2. def456 - feat: new feature (Jane Smith, 2024-01-05)")

	// Verify the git functions were called with the correct parameters
	expect(git.getRepositoryName).toHaveBeenCalledWith(mockCwd)
	expect(git.getCurrentBranch).toHaveBeenCalledWith(mockCwd)
	expect(git.getRecentCommits).toHaveBeenCalledWith(mockCwd, 10)
})

it("should not include git repository information when not available", async () => {
	// Set up the mocks to return no git information
	;(git.getRepositoryName as jest.Mock).mockResolvedValue(null)
	;(git.getCurrentBranch as jest.Mock).mockResolvedValue(null)
	;(git.getRecentCommits as jest.Mock).mockResolvedValue([])

	const result = await getEnvironmentDetails(mockCline as Task)

	// Verify the git information section is not included
	expect(result).not.toContain("# Git Repository Information")
})

it("should include partial git information when available", async () => {
	// Set up the mocks to return partial git information
	;(git.getRepositoryName as jest.Mock).mockResolvedValue(null)
	;(git.getCurrentBranch as jest.Mock).mockResolvedValue("main")
	;(git.getRecentCommits as jest.Mock).mockResolvedValue([])

	const result = await getEnvironmentDetails(mockCline as Task)

	// Verify only the available git information is included
	expect(result).toContain("# Git Repository Information")
	expect(result).not.toContain("## Repository:")
	expect(result).toContain("## Current Branch: main")
	expect(result).not.toContain("## Recent Commits")
})
```

### Import Changes

Make sure to update the imports in both test files to include the new functions:

1. In `src/utils/__tests__/git.test.ts`, update the import statement:

```typescript
import {
	searchCommits,
	getCommitInfo,
	getWorkingState,
	getRepositoryName,
	getCurrentBranch,
	getRecentCommits,
} from "../git"
```

2. In `src/core/environment/__tests__/getEnvironmentDetails.test.ts`, add the import for the Git utility functions:

```typescript
import * as git from "../../../utils/git"
```

These test mutations follow the existing patterns in the codebase and provide comprehensive coverage for the new functionality.
