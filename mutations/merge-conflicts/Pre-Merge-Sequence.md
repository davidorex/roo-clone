# Pre-Merge Analysis Sequence

This document outlines the step-by-step process for identifying and analyzing merge conflicts between branches before attempting an actual merge. This approach allows for thorough planning and resolution strategies to be developed before committing to a merge operation.

## 1. Branch Preparation

1. Create two working branches to protect the original branches:

    - Create a branch from `main`: `git switch -c main-for-merge`
    - Create a branch from `my-main`: `git switch -c my-main-for-merge`

    This ensures we're working with clean branches that won't affect the original branches.

## 2. Identify Files with Merge Conflicts

1. Check out the target branch (the branch you want to merge into):

    ```bash
    git switch my-main-for-merge
    ```

2. Attempt a dry-run merge to identify conflicts without committing, using the patience merge strategy for better conflict detection:

    ```bash
    git merge --no-commit --no-ff -X patience main-for-merge
    ```

    The patience merge strategy:

    - Focuses on unique lines as anchor points for the merge
    - Provides better handling of code refactoring and moved blocks
    - Creates cleaner conflict boundaries that align with code structure
    - Reduces false conflicts in reformatted code

3. Note the list of files with merge conflicts.

4. Abort the merge to return to a clean state:

    ```bash
    git merge --abort
    ```

5. Create a list of all files with merge conflicts for further analysis.

## 3. Database Query Sequence for Conflict Analysis

For each file with conflicts, use the following PostgreSQL query sequence to gather comprehensive information for pre-merge planning:

### 3.1. Identify File History in Both Branches

```sql
-- Get file history in the first branch
SELECT
    fc.path,
    c.short_message,
    c.commit_date,
    fc.diff_content
FROM
    viewer_filechange fc
JOIN
    viewer_commit c ON fc.commit_id = c.hash
JOIN
    viewer_commit_branches vcb ON c.hash = vcb.commit_id
JOIN
    viewer_branch vb ON vcb.branch_id = vb.id
WHERE
    vb.name = 'main'
    AND fc.path = 'src/core/task/Task.ts'
ORDER BY
    c.commit_date DESC
LIMIT 5;

-- Repeat for the second branch
SELECT
    fc.path,
    c.short_message,
    c.commit_date,
    fc.diff_content
FROM
    viewer_filechange fc
JOIN
    viewer_commit c ON fc.commit_id = c.hash
JOIN
    viewer_commit_branches vcb ON c.hash = vcb.commit_id
JOIN
    viewer_branch vb ON vcb.branch_id = vb.id
WHERE
    vb.name = 'my-main'
    AND fc.path = 'src/core/task/Task.ts'
ORDER BY
    c.commit_date DESC
LIMIT 5;
```

### 3.2. Get Full File Content from Both Branches

```sql
-- Get the full content of the file in the first branch
SELECT
    fs.content
FROM
    viewer_filestate fs
JOIN
    viewer_commit c ON fs.commit_id = c.hash
JOIN
    viewer_commit_branches vcb ON c.hash = vcb.commit_id
JOIN
    viewer_branch vb ON vcb.branch_id = vb.id
JOIN
    viewer_file f ON fs.file_id = f.id
WHERE
    vb.name = 'my-main'
    AND f.path = 'src/core/task/Task.ts'
ORDER BY
    c.commit_date DESC
LIMIT 1;

-- Get the full content of the file in the second branch
SELECT
    fs.content
FROM
    viewer_filestate fs
JOIN
    viewer_commit c ON fs.commit_id = c.hash
JOIN
    viewer_commit_branches vcb ON c.hash = vcb.commit_id
JOIN
    viewer_branch vb ON vcb.branch_id = vb.id
JOIN
    viewer_file f ON fs.file_id = f.id
WHERE
    vb.name = 'main'
    AND f.path = 'src/core/task/Task.ts'
ORDER BY
    c.commit_date DESC
LIMIT 1;
```

### 3.3. Get Latest Diff Content for the File

```sql
-- Get the latest diff content for the file in the first branch
SELECT
    fc.path,
    fc.diff_content
FROM
    viewer_filechange fc
JOIN
    viewer_commit c ON fc.commit_id = c.hash
JOIN
    viewer_commit_branches vcb ON c.hash = vcb.commit_id
JOIN
    viewer_branch vb ON vcb.branch_id = vb.id
WHERE
    vb.name = 'my-main'
    AND fc.path = 'src/core/task/Task.ts'
ORDER BY
    c.commit_date DESC
LIMIT 1;

-- Get the latest diff content for the file in the second branch
SELECT
    fc.path,
    fc.diff_content
FROM
    viewer_filechange fc
JOIN
    viewer_commit c ON fc.commit_id = c.hash
JOIN
    viewer_commit_branches vcb ON c.hash = vcb.commit_id
JOIN
    viewer_branch vb ON vcb.branch_id = vb.id
WHERE
    vb.name = 'main'
    AND fc.path = 'src/core/task/Task.ts'
ORDER BY
    c.commit_date DESC
LIMIT 1;
```

### 3.4. Find Related Files and Features

```sql
-- Find commits related to a specific feature (e.g., "pause after state change")
SELECT
    c.commit_date,
    c.hash,
    c.short_message
FROM
    viewer_commit c
JOIN
    viewer_commit_branches vcb ON c.hash = vcb.commit_id
JOIN
    viewer_branch vb ON vcb.branch_id = vb.id
WHERE
    vb.name = 'my-main'
    AND c.short_message LIKE '%pause%'
ORDER BY
    c.commit_date DESC;

-- Find all files modified in these feature-related commits
SELECT
    DISTINCT fc.path
FROM
    viewer_filechange fc
JOIN
    viewer_commit c ON fc.commit_id = c.hash
WHERE
    c.short_message LIKE '%pause%'
ORDER BY
    fc.path;
```

### 3.5. Identify Repository and Branch Information

```sql
-- Get repository information
SELECT
    id,
    name,
    path
FROM
    viewer_repository
WHERE
    name = 'Roo-Clone';

-- Get branch information
SELECT
    b.id,
    b.name
FROM
    viewer_branch b
JOIN
    viewer_repository r ON b.repository_id = r.id
WHERE
    r.name = 'Roo-Clone';
```

## 4. Create Detailed Conflict Analysis Document

For each file with conflicts, create a markdown document (like `Task.ts.md`) that includes:

1. **File Overview**: Basic information about the file and its purpose
2. **Complete Differences**: All differences between the two branches
3. **Conflict Areas**: Specific sections where conflicts occur
4. **Branch Relationship Context**: How the branches relate to each other
5. **Merge Strategy**: Recommended approach for resolving conflicts

Example structure:

````markdown
# [Filename] Merge Conflict Analysis

## Complete Differences in [Filename]

### 1. [Difference Category]

**Main Branch:**

```code
// Code from main branch
```
````

**My-Main Branch:**

```code
// Code from my-main branch
```

## Comprehensive Merge Conflict Analysis

A merge between these branches would result in conflicts in the following areas:

1. **[Conflict Area 1]**:
    - Main branch [description]
    - My-main branch [description]
    - This represents [significance of the difference]

## Branch Relationship Context

[Explanation of branch relationship]

## Merge Strategy

[Recommended approach for resolving conflicts]

```

## 5. Develop Pre-Merge Plan

Based on the conflict analysis documents, create a comprehensive pre-merge plan that:

1. Lists all files with conflicts
2. Prioritizes conflicts based on complexity and impact
3. Outlines specific resolution strategies for each file
4. Identifies dependencies between conflicted files
5. Establishes a sequence for resolving conflicts

This pre-merge planning process ensures that when the actual merge is performed, all potential issues have been identified and resolution strategies are in place.
```
