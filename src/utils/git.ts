import { exec } from "child_process"
import { promisify } from "util"
import { truncateOutput } from "../integrations/misc/extract-text"

const execAsync = promisify(exec)
const GIT_OUTPUT_LINE_LIMIT = 500

export interface GitCommit {
	hash: string
	shortHash: string
	subject: string
	author: string
	date: string
}

export async function checkGitRepo(cwd: string): Promise<boolean> {
	try {
		await execAsync("git rev-parse --git-dir", { cwd })
		return true
	} catch (error) {
		return false
	}
}

export async function checkGitInstalled(): Promise<boolean> {
	try {
		await execAsync("git --version")
		return true
	} catch (error) {
		return false
	}
}

export async function searchCommits(query: string, cwd: string): Promise<GitCommit[]> {
	try {
		const isInstalled = await checkGitInstalled()
		if (!isInstalled) {
			console.error("Git is not installed")
			return []
		}

		const isRepo = await checkGitRepo(cwd)
		if (!isRepo) {
			console.error("Not a git repository")
			return []
		}

		// Search commits by hash or message, limiting to 10 results
		const { stdout } = await execAsync(
			`git log -n 10 --format="%H%n%h%n%s%n%an%n%ad" --date=short ` + `--grep="${query}" --regexp-ignore-case`,
			{ cwd },
		)

		let output = stdout
		if (!output.trim() && /^[a-f0-9]+$/i.test(query)) {
			// If no results from grep search and query looks like a hash, try searching by hash
			const { stdout: hashStdout } = await execAsync(
				`git log -n 10 --format="%H%n%h%n%s%n%an%n%ad" --date=short ` + `--author-date-order ${query}`,
				{ cwd },
			).catch(() => ({ stdout: "" }))

			if (!hashStdout.trim()) {
				return []
			}

			output = hashStdout
		}

		const commits: GitCommit[] = []
		const lines = output
			.trim()
			.split("\n")
			.filter((line) => line !== "--")

		for (let i = 0; i < lines.length; i += 5) {
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
		console.error("Error searching commits:", error)
		return []
	}
}

export async function getCommitInfo(hash: string, cwd: string): Promise<string> {
	try {
		const isInstalled = await checkGitInstalled()
		if (!isInstalled) {
			return "Git is not installed"
		}

		const isRepo = await checkGitRepo(cwd)
		if (!isRepo) {
			return "Not a git repository"
		}

		// Get commit info, stats, and diff separately
		const { stdout: info } = await execAsync(`git show --format="%H%n%h%n%s%n%an%n%ad%n%b" --no-patch ${hash}`, {
			cwd,
		})
		const [fullHash, shortHash, subject, author, date, body] = info.trim().split("\n")

		const { stdout: stats } = await execAsync(`git show --stat --format="" ${hash}`, { cwd })

		const { stdout: diff } = await execAsync(`git show --format="" ${hash}`, { cwd })

		const summary = [
			`Commit: ${shortHash} (${fullHash})`,
			`Author: ${author}`,
			`Date: ${date}`,
			`\nMessage: ${subject}`,
			body ? `\nDescription:\n${body}` : "",
			"\nFiles Changed:",
			stats.trim(),
			"\nFull Changes:",
		].join("\n")

		const output = summary + "\n\n" + diff.trim()
		return truncateOutput(output, GIT_OUTPUT_LINE_LIMIT)
	} catch (error) {
		console.error("Error getting commit info:", error)
		return `Failed to get commit info: ${error instanceof Error ? error.message : String(error)}`
	}
}

export async function getWorkingState(cwd: string): Promise<string> {
	try {
		const isInstalled = await checkGitInstalled()
		if (!isInstalled) {
			return "Git is not installed"
		}

		const isRepo = await checkGitRepo(cwd)
		if (!isRepo) {
			return "Not a git repository"
		}

		// Get status of working directory
		const { stdout: status } = await execAsync("git status --short", { cwd })
		if (!status.trim()) {
			return "No changes in working directory"
		}

		// Get all changes (both staged and unstaged) compared to HEAD
		const { stdout: diff } = await execAsync("git diff HEAD", { cwd })
		const lineLimit = GIT_OUTPUT_LINE_LIMIT
		const output = `Working directory changes:\n\n${status}\n\n${diff}`.trim()
		return truncateOutput(output, lineLimit)
	} catch (error) {
		console.error("Error getting working state:", error)
		return `Failed to get working state: ${error instanceof Error ? error.message : String(error)}`
	}
}

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
