To include the current Git repository name, branch, and the last 10 commits in the environmental details provided to the LLM, the following approach can be implemented:

1.  **Enhance Git Utilities (`src/utils/git.ts`):**

    - The existing file `src/utils/git.ts` will be augmented with new exported asynchronous functions:
        - `getCurrentBranch(cwd: string): Promise<string | null>`: This function will execute `git rev-parse --abbrev-ref HEAD` within the specified `cwd` to retrieve the current active branch name. It will return the branch name as a string or `null` if an error occurs or if not in a Git repository.
        - `getRepoName(cwd: string): Promise<string | null>`: This function will execute `git rev-parse --show-toplevel` to find the root directory of the Git repository. It will then extract and return the base name of this root directory (which typically corresponds to the repository name) or `null` on error.
        - `getLatestCommits(cwd: string, count: number = 10): Promise<GitCommit[]>`: This function will execute `git log -n ${count} --format="%H%n%h%n%s%n%an%n%ad" --date=short` to fetch the specified number of latest commits. It will parse the output into an array of `GitCommit` objects (where `GitCommit` is an existing interface in the file, including `shortHash`, `subject`, and `date`). It will return an empty array on error or if no commits are found.
    - These functions will include checks for Git installation (`checkGitInstalled`) and whether the `cwd` is a Git repository (`checkGitRepo`), similar to existing functions in the file.

2.  **Integrate Git Information into Environmental Details (`src/core/environment/getEnvironmentDetails.ts`):**
    - The `getEnvironmentDetails` function in this file will be modified.
    - It will import the new utility functions (`getCurrentBranch`, `getRepoName`, `getLatestCommits`, and the `GitCommit` interface) from `src/utils/git.ts`.
    - A new section, titled `# Git Information`, will be added to the `details` string that this function constructs.
    - Within this new section:
        - `getRepoName(cline.cwd)` and `getCurrentBranch(cline.cwd)` will be called. If successful, the repository name and branch will be appended.
        - `getLatestCommits(cline.cwd, 10)` will be called. If commits are returned, they will be formatted and appended (e.g., `shortHash date subject` for each commit).
        - Appropriate fallback messages (e.g., "(Not a Git repository or Git not found)", "(Unable to retrieve full Git repository details)", "(No commits found)") will be included if the Git information cannot be fully retrieved.
    - This new Git information section will be placed before other details like "Current Time" or "Current Context Size" to ensure it's prominently featured in the `<environment_details>` block.

This approach leverages existing patterns for executing Git commands and integrates the new information into the established mechanism for providing environmental context to the LLM.
