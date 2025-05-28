# PostgreSQL Queries for Establishing Feature Development Context

The following SQL queries can be executed using the PostgreSQL MCP tool to establish immediate context of feature development and trace changes to relevant files:

## 1. Identify Repository and Feature Branch

```sql
SELECT id, name, path FROM viewer_repository
WHERE name = 'Roo-Clone';

SELECT b.id, b.name
FROM viewer_branch b
JOIN viewer_repository r ON b.repository_id = r.id
WHERE r.name = 'Roo-Clone';
```

-- List all branches with their latest commit dates to determine recency
SELECT b.id, b.name, MAX(c.commit_date) as latest_commit_date
FROM viewer_branch b
JOIN viewer_repository r ON b.repository_id = r.id
JOIN viewer_commit_branches cb ON b.id = cb.branch_id
JOIN viewer_commit c ON cb.commit_id = c.hash
WHERE r.name = 'Roo-Clone'
GROUP BY b.id, b.name
ORDER BY latest_commit_date DESC;

In general, while executing the queries in order listed in this document, use the most recent branch unless the user directs otherwise.

## 2. Get Recent Feature Development History (Chronological Order)

```sql
SELECT c.commit_date, c.hash, c.short_message
FROM viewer_commit c
JOIN viewer_commit_branches vcb ON c.hash = vcb.commit_id
JOIN viewer_branch vb ON vcb.branch_id = vb.id
JOIN viewer_repository vr ON vb.repository_id = vr.id
WHERE vr.name = 'Roo-Clone'
AND vb.name = :branch_name -- Replace with the branch name of interest
ORDER BY c.commit_date ASC
LIMIT 15;
```

## 3. Examine Core Implementation in Task.ts

```sql
-- View the initial implementation of checkForPauseAfterProductiveOperation
SELECT fc.path, fc.diff_content
FROM viewer_filechange fc
JOIN viewer_commit c ON fc.commit_id = c.hash
WHERE c.hash = '2d0f50a39873838fff6413e69af910f3f47aeef5'
AND fc.path LIKE '%Task.ts%';

-- View the bugfix implementation in Task.ts
SELECT fc.path, fc.diff_content
FROM viewer_filechange fc
JOIN viewer_commit c ON fc.commit_id = c.hash
WHERE c.hash = (
  SELECT hash FROM viewer_commit
  WHERE short_message LIKE 'fix(pause-after-state-change): resolve task loop stalling%'
  ORDER BY commit_date DESC LIMIT 1
)
AND fc.path LIKE '%Task.ts%';
```

## 4. Trace Integration Across Tools

```sql
-- View integration into writeToFileTool.ts
SELECT fc.path, fc.diff_content
FROM viewer_filechange fc
JOIN viewer_commit c ON fc.commit_id = c.hash
WHERE c.hash = '5be5862fc32ba87e6d7ced3bbc5d034a962baa0f'
AND fc.path LIKE '%writeToFileTool.ts%';

-- Find all tools with integration of pause functionality
SELECT fc.path, c.short_message, c.commit_date, c.hash
FROM viewer_filechange fc
JOIN viewer_commit c ON fc.commit_id = c.hash
JOIN viewer_commit_branches vcb ON c.hash = vcb.commit_id
JOIN viewer_branch vb ON vcb.branch_id = vb.id
WHERE vb.name = :branch_name -- Replace with the branch name of interest
AND fc.path LIKE '%Tool.ts%'
AND fc.diff_content LIKE '%checkForPauseAfterProductiveOperation%'
ORDER BY c.commit_date ASC;
```

## 5. View UI Component Implementation

```sql
-- Check UI implementation in ChatRow.tsx
SELECT fc.path, fc.diff_content
FROM viewer_filechange fc
JOIN viewer_commit c ON fc.commit_id = c.hash
WHERE c.hash = '360ed146b3e54eab457c2d08f559c96be1dd2171'
AND fc.path LIKE '%ChatRow.tsx%';

-- View settings UI implementation
SELECT fc.path, fc.diff_content
FROM viewer_filechange fc
JOIN viewer_commit c ON fc.commit_id = c.hash
WHERE c.short_message LIKE '%Implement UI for%' -- Adjust search pattern based on feature of interest
AND fc.path LIKE '%ExperimentalSettings.tsx%';
```

These queries provide a comprehensive view of a feature's implementation history, from initial development through bugfix, across both backend functionality and UI components.

## Usage Notes

1. First identify the repository and list all branches with their recency information
2. Choose a branch to analyze based on:
    - The most recent branch (default)
    - A specific branch directed by the user
3. Replace `:branch_name` in the queries with your chosen branch name
4. Adjust other search patterns as needed based on the specific feature being analyzed

## 6. File-Focused Analysis Queries

The following queries focus on analyzing changes to specific files or file types, providing insights into how code and documentation evolve over time.

### 6.1 Identify Recent Documentation Changes

This query identifies recent changes to Markdown files, which often represent documentation, planning, or architecture decisions:

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
    vr.name = 'Roo-Clone'
    AND vb.name = :branch_name
    AND fc.path ILIKE '%.md'
ORDER BY
    c.commit_date DESC
LIMIT 20;
```

### 6.2 Overview of Recent File Changes

This query provides a broad view of all recent file changes on a specific branch:

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
    vr.name = 'Roo-Clone'
    AND vb.name = :branch_name
    -- Optional date filter
    -- AND c.commit_date >= :start_date
ORDER BY
    c.commit_date DESC
LIMIT 30;
```

### 6.3 Focus on Code Changes in Specific Directories

This query targets code changes in specific directories, filtering out documentation or other non-code files:

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
    vr.name = 'Roo-Clone'
    AND vb.name = :branch_name
    AND fc.path LIKE 'src/%'  -- Focus on source code
    AND fc.path NOT ILIKE '%.md'  -- Exclude documentation
ORDER BY
    c.commit_date DESC
LIMIT 20;
```

### 6.4 Trace File Evolution Over Time

This query traces the complete evolution of a specific file across all commits that modified it, showing how the file changed over time:

```sql
SELECT
    c.commit_date,
    c.hash,
    c.short_message,
    vb.name AS branch_name,
    fc.git_status,
    fc.diff_content
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
    vr.name = 'Roo-Clone'
    AND fc.path = :file_path  -- e.g., 'src/core/tools/writeToFileTool.ts'
    -- Optional filters
    -- AND vb.name = :branch_name  -- Limit to specific branch
    -- AND c.commit_date >= :start_date  -- Limit to recent changes
    AND fc.diff_content IS NOT NULL
    AND fc.diff_content != ''
ORDER BY
    c.commit_date ASC;
```

### 6.5 Get Latest Change to a Specific File

This query retrieves the most recent change made to a particular file:

```sql
SELECT
    fc.id,
    c.hash AS commit_hash,
    c.short_message,
    c.commit_date,
    vb.name AS branch_name,
    fc.path AS file_path,
    fc.git_status,
    fc.diff_content
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
    fc.path = :file_path  -- Specify the file path
    AND vr.name = 'Roo-Clone'
    -- Optional branch filter
    -- AND vb.name = :branch_name
    AND fc.diff_content IS NOT NULL
    AND fc.diff_content != ''
ORDER BY
    c.commit_date DESC, fc.id DESC
LIMIT 1;
```

## 7. Advanced Context Establishment Queries

The following queries provide more sophisticated approaches to establishing development context, particularly useful for complex repositories with multiple branches and features.

### 6.1 Branch Creation Dates and First Commits

This query helps identify when branches were created and what their first commits were about, which can provide insights into the original purpose of the branch:

```sql
SELECT b.id, b.name, MIN(c.commit_date) AS first_commit_date,
  (SELECT c2.short_message
   FROM viewer_commit c2
   JOIN viewer_commit_branches vcb2 ON c2.hash = vcb2.commit_id
   WHERE vcb2.branch_id = b.id
   ORDER BY c2.commit_date ASC LIMIT 1) AS first_commit_message
FROM viewer_branch b
JOIN viewer_repository r ON b.repository_id = r.id
JOIN viewer_commit_branches vcb ON b.id = vcb.branch_id
JOIN viewer_commit c ON vcb.commit_id = c.hash
WHERE r.name = 'Roo-Clone'
GROUP BY b.id, b.name
ORDER BY first_commit_date DESC;
```

### 6.2 Merge Commit Identification

This query identifies merge commits, which are critical integration points between branches. These often represent significant milestones in feature development:

```sql
SELECT c.commit_date, c.hash, c.short_message, vb.name AS branch_name
FROM viewer_commit c
JOIN viewer_commit_branches vcb ON c.hash = vcb.commit_id
JOIN viewer_branch vb ON vcb.branch_id = vb.id
JOIN viewer_repository vr ON vb.repository_id = vr.id
WHERE vr.name = 'Roo-Clone'
AND (c.short_message LIKE 'merge%' OR c.short_message LIKE 'Merge%')
ORDER BY c.commit_date DESC LIMIT 15;
```

### 6.3 Branch-Specific Commits (Excluding Shared History)

This more complex query identifies commits that are unique to a specific branch, filtering out commits that are shared with other branches (such as those inherited from parent branches):

```sql
WITH branch_commits AS (
  SELECT vb.name AS branch_name, c.hash, c.commit_date, c.short_message,
    COUNT(DISTINCT vcb2.branch_id) AS branch_count
  FROM viewer_commit c
  JOIN viewer_commit_branches vcb ON c.hash = vcb.commit_id
  JOIN viewer_branch vb ON vcb.branch_id = vb.id
  JOIN viewer_repository vr ON vb.repository_id = vr.id
  LEFT JOIN viewer_commit_branches vcb2 ON c.hash = vcb2.commit_id
  WHERE vr.name = 'Roo-Clone'
  GROUP BY vb.name, c.hash, c.commit_date, c.short_message
)
SELECT branch_name, hash, commit_date, short_message
FROM branch_commits
WHERE branch_count = 1 AND branch_name = :branch_name
ORDER BY commit_date DESC LIMIT 20;
```

### 6.4 Feature-Specific Commits with Date and Keyword Filtering

This query combines date filtering and keyword searching to focus on commits related to a specific feature after a certain date (such as after a merge):

```sql
SELECT c.commit_date, c.hash, c.short_message
FROM viewer_commit c
JOIN viewer_commit_branches vcb ON c.hash = vcb.commit_id
JOIN viewer_branch vb ON vcb.branch_id = vb.id
JOIN viewer_repository vr ON vb.repository_id = vr.id
WHERE vr.name = 'Roo-Clone'
AND vb.name = :branch_name
AND c.commit_date > :start_date -- e.g., '2025-05-27T12:00:00.000Z'
AND (c.short_message LIKE :keyword1 OR c.short_message LIKE :keyword2)
ORDER BY c.commit_date ASC;
```

### 6.5 Recommended Query Sequence

For optimal context establishment:

1. First, identify repositories and list all branches with their latest activity (Sections 1 and 6.1)
2. Identify merge commits to understand integration points (Section 6.2)
3. Query for branch-specific commits to focus on unique work (Section 6.3)
4. Use date and keyword filtering to narrow down to specific feature work (Section 6.4)
5. Examine file changes in key commits to understand implementation details (Sections 3-5)

This progressive approach helps filter out noise and focus on the most relevant development context.
