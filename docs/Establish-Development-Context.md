# Establishing Development Context with Database Queries

This guide outlines a productive sequence of SQL queries to run against the `git_commit_viewer` database. The goal is to rapidly establish a comprehensive understanding of recent development activity within a specific repository, providing exact forensic insight, particularly useful for developers or LLMs needing to get up to speed quickly.

We will use "Git-Commit-Viewer" as the example target repository. Remember to replace `'Git-Commit-Viewer'` with your actual target repository name if different.

## The Query Sequence

### Step 0a: Identify Target Repository

*   **Purpose:** Before running repository-specific queries, identify the exact name of the target repository as it's stored in the database.
*   **Query:**
    ```sql
    SELECT id, name, path FROM viewer_repository;
    ```
*   **Insights:** This query lists all repositories currently tracked by the `git_commit_viewer` database. Note the `name` of the repository you want to investigate for use in subsequent steps.

### Step 0b: Identify Target Branch

*   **Purpose:** Once the target repository is known, list its branches to identify the specific branch you want to analyze (e.g., 'main', 'develop', a feature branch).
*   **Query:**
    Replace `'Your-Repository-Name'` with the actual name identified in Step 0a.
    ```sql
    SELECT b.id, b.name
    FROM viewer_branch b
    JOIN viewer_repository r ON b.repository_id = r.id
    WHERE r.name = 'Your-Repository-Name' -- From Step 0a
    ORDER BY b.name;
    ```
*   **Insights:** This lists all branches for the specified repository. Note the `name` of the branch you want to focus on.

### Step 1a: Identify Recent Documentation/Planning Activity (All Markdown Files - Branch-Aware)

*   **Purpose:** To specifically identify recent changes to Markdown files across the entire repository on the target branch. These often represent documentation, planning, or ADRs (Architecture Decision Records) and provide crucial context for code changes. This query does not assume specific directory names for these files.
*   **Query:**
    Replace `'Your-Repository-Name'` and `'your-branch-name'` with values from Step 0a and 0b.
    ```sql
    SELECT
        c.commit_date,
        fc.path AS file_path,
        fc.git_status,
        c.hash AS commit_hash,
        c.short_message
    FROM
        viewer_commit c
    JOIN
        viewer_filechange fc ON c.hash = fc.commit_id
    JOIN
        viewer_commit_branches vcb ON c.hash = vcb.commit_id
    JOIN
        viewer_branch vb ON vcb.branch_id = vb.id
    JOIN
        viewer_repository vr ON vb.repository_id = vr.id
    WHERE
        vr.name = 'Your-Repository-Name' -- From Step 0a
        AND vb.name = 'your-branch-name'   -- From Step 0b
        AND fc.path ILIKE '%.md'           -- Focus on Markdown files
    ORDER BY
        c.commit_date DESC,
        fc.path ASC
    LIMIT 20; -- Adjust limit as needed
    ```
*   **Insights:** This query provides a list of recently changed Markdown files. Review the paths and commit messages to identify relevant planning or documentation. This can help contextualize the code changes found in subsequent steps.

### Step 1b: Overview of All Recent Changes (Branch-Aware)

*   **Purpose:** To get a broad understanding of all recent activity on a specific branch (including all file types), complementing the Markdown-specific view from Step 1a.
*   **Query:**
    Replace `'Your-Repository-Name'` and `'your-branch-name'` with values from Step 0a and 0b.
    ```sql
    SELECT
        c.commit_date,
        fc.path AS file_path,
        fc.git_status,
        c.hash AS commit_hash,
        c.short_message
    FROM
        viewer_commit c
    JOIN
        viewer_filechange fc ON c.hash = fc.commit_id
    JOIN
        viewer_commit_branches vcb ON c.hash = vcb.commit_id
    JOIN
        viewer_branch vb ON vcb.branch_id = vb.id
    JOIN
        viewer_repository vr ON vb.repository_id = vr.id
    WHERE
        vr.name = 'Your-Repository-Name' -- From Step 0a
        AND vb.name = 'your-branch-name'   -- From Step 0b
    ORDER BY
        c.commit_date DESC,
        fc.path ASC
    LIMIT 20; -- Adjust limit as needed
    ```
*   **Insights:** Provides a chronological list of the latest 20 file changes of all types on the specified branch. This helps identify concurrent work on planning (seen in Step 1a) and actual code or other file modifications.

### Step 2: Focus on Recent Code Changes (Branch-Aware)

*   **Purpose:** To specifically identify recent code modifications on the target branch, filtering out documentation or other non-code files.
*   **Query:**
    Replace `'Your-Repository-Name'` and `'your-branch-name'` accordingly.
    ```sql
    SELECT
        c.commit_date,
        fc.path AS file_path,
        fc.git_status,
        c.hash AS commit_hash,
        c.short_message
    FROM
        viewer_commit c
    JOIN
        viewer_filechange fc ON c.hash = fc.commit_id
    JOIN
        viewer_commit_branches vcb ON c.hash = vcb.commit_id
    JOIN
        viewer_branch vb ON vcb.branch_id = vb.id
    JOIN
        viewer_repository vr ON vb.repository_id = vr.id
    WHERE
        vr.name = 'Your-Repository-Name' -- From Step 0a
        AND vb.name = 'your-branch-name'   -- From Step 0b
        AND fc.path NOT ILIKE '%.md'       -- Exclude Markdown files
    ORDER BY
        c.commit_date DESC,
        fc.path ASC
    LIMIT 20; -- Adjust limit as needed
    ```
*   **Insights:** Yields a list of recent changes to non-Markdown files on the specified branch.

### Step 3: Deep Dive into Specific Code Modifications (Full Diffs - Branch Context)

*   **Purpose:** To understand the exact nature of recent code modifications by examining the actual changes made to specific files identified in Step 2.
*   **Action:** For each unique code file (or a selected subset of the most recent/relevant ones) from Step 2, retrieve the full diff content of its change in the specific commit.
*   **Example Query (for one file change identified in Step 2):**
    Replace `'specific_commit_hash'` and `'specific_file_path'` with actual values from the output of Step 2.
    ```sql
    SELECT
        fc.path AS file_path,
        fc.git_status,
        c.short_message AS commit_message,
        fc.diff_content -- Full diff content
    FROM
        viewer_filechange fc
    JOIN
        viewer_commit c ON fc.commit_id = c.hash
    WHERE
        fc.commit_id = 'specific_commit_hash' -- From Step 2 results
        AND fc.path = 'specific_file_path';   -- From Step 2 results
    ```
    Alternatively, to get the absolute most recent diff for a *particular file path on a specific branch* if you suspect it might have changed multiple times recently and only want the very latest on that branch:
    Replace `'Your-Repository-Name'`, `'your-branch-name'`, and `'specific_file_path_of_interest'` accordingly.
    ```sql
    SELECT
        fc.id,
        c.hash AS commit_hash,
        c.short_message,
        fc.path AS file_path,
        fc.git_status,
        fc.diff_content -- Full diff content
    FROM
        viewer_filechange fc
    JOIN
        viewer_commit c ON fc.commit_id = c.hash
    JOIN
        viewer_commit_branches vcb ON c.hash = vcb.commit_id
    JOIN
        viewer_branch vb ON vcb.branch_id = vb.id
    JOIN
        viewer_repository vr ON vb.repository_id = vr.id
    WHERE
        fc.path = 'specific_file_path_of_interest' -- Specify the file path
        AND vr.name = 'Your-Repository-Name'      -- From Step 0a
        AND vb.name = 'your-branch-name'          -- From Step 0b
        AND fc.path NOT ILIKE '%.md'
        AND fc.diff_content IS NOT NULL
        AND fc.diff_content != ''
    ORDER BY
        c.commit_date DESC, fc.id DESC
    LIMIT 1;
    ```
*   **Insights:** This step provides the raw diff output for changes on the specified branch, showing exact lines added, removed, or modified. This is crucial for understanding the implementation details, the scope of changes, and the specific logic being altered or introduced within the context of that branch.

## Conclusion

By running this sequence of queries, one can efficiently build a detailed and accurate understanding of the latest development activities within a repository. This approach moves from a general overview to specific code-level insights, providing the necessary context to continue development, perform code reviews, or understand project evolution.
