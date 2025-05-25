# Querying the Git Commit Viewer Database for roo-clone Commits

This guide explains how to query the `git_commit_viewer` PostgreSQL database to retrieve commit information for the roo-clone repository using the newly installed PostgreSQL MCP server.

## Database Schema Overview

The database uses the following key tables for commit-related queries:

- `viewer_repository` - Repository information (id, name, path)
- `viewer_commit` - Commit details (hash, messages, author, date)
- `viewer_branch` - Branch information (id, name, repository_id)
- `viewer_commit_branches` - Junction table connecting commits to branches
- `viewer_filechange` - File-level changes for each commit

### Key Tables and Their Columns

#### viewer_repository

- `id` (bigint) - Primary key
- `name` (varchar 255) - Repository name
- `path` (varchar 255) - File system path to repository
- `last_fetched` (timestamp with timezone) - When repo was last updated

#### viewer_branch

- `id` (bigint) - Primary key
- `name` (varchar 255) - Branch name
- `repository_id` (bigint) - Foreign key to viewer_repository.id

#### viewer_commit

- `hash` (varchar 40) - Primary key, git commit hash
- `short_message` (text) - First line of commit message
- `full_message` (text) - Complete commit message
- `commit_date` (timestamp with timezone) - When commit was made
- `files_changed` (text) - Summary of files changed
- `author_email` (varchar 255) - Email of commit author
- `author_name` (varchar 255) - Name of commit author
- `committer_email` (varchar 255) - Email of committer
- `committer_name` (varchar 255) - Name of committer
- `parent_hashes` (array) - Array of parent commit hashes
- `message_embedding` (user-defined) - Vector embedding of commit message

#### viewer_commit_branches

- `id` (bigint) - Primary key
- `commit_id` (varchar 40) - Foreign key to viewer_commit.hash
- `branch_id` (bigint) - Foreign key to viewer_branch.id

#### viewer_filechange

- `id` (bigint) - Primary key
- `path` (text) - Path of the changed file
- `commit_id` (varchar 40) - Foreign key to viewer_commit.hash
- `diff_content` (text) - The actual diff content
- `diff_summary_stats` (text) - Summary statistics about the diff
- `file_extension` (varchar 20) - File extension of the changed file
- `lines_added` (text) - Information about lines added
- `lines_removed` (text) - Information about lines removed
- `original_path` (text) - Original path if file was moved
- `git_status` (text) - Git status of the file change
- `diff_embedding` (user-defined) - Vector embedding of the diff content

### Table Relationships

- viewer_branch → viewer_repository: Many branches belong to one repository
- viewer_commit_branches → viewer_commit: Many-to-many relationship between commits and branches
- viewer_commit_branches → viewer_branch: Many-to-many relationship between branches and commits
- viewer_filechange → viewer_commit: Many file changes belong to one commit

## Basic Queries

### Get roo-clone Repository ID

```sql
SELECT id, name, path FROM viewer_repository WHERE name = 'roo-clone';
```

### Retrieve Recent roo-clone Commits

This query fetches the 10 most recent commits from the roo-clone repository:

```sql
SELECT c.hash, c.short_message, c.author_name, c.commit_date
FROM viewer_commit c
JOIN viewer_commit_branches cb ON c.hash = cb.commit_id
JOIN viewer_branch b ON cb.branch_id = b.id
JOIN viewer_repository r ON b.repository_id = r.id
WHERE r.name = 'roo-clone'
ORDER BY c.commit_date DESC
LIMIT 10;
```

### Get Full Commit Message

To retrieve the full commit message for a specific commit:

```sql
SELECT hash, short_message, full_message, author_name, commit_date
FROM viewer_commit
WHERE hash = '661df704df929ec1847f97bdeeda71990a15be8a';
```

## Filtered Queries

### Commits by Date Range

Get roo-clone commits within a specific date range:

```sql
SELECT c.hash, c.short_message, c.commit_date
FROM viewer_commit c
JOIN viewer_commit_branches cb ON c.hash = cb.commit_id
JOIN viewer_branch b ON cb.branch_id = b.id
WHERE b.repository_id = (SELECT id FROM viewer_repository WHERE name = 'roo-clone')
AND c.commit_date BETWEEN '2025-05-01' AND '2025-05-15'
ORDER BY c.commit_date DESC;
```

### Commits by Author

Find commits by a specific author:

```sql
SELECT c.hash, c.short_message, c.commit_date
FROM viewer_commit c
JOIN viewer_commit_branches cb ON c.hash = cb.commit_id
JOIN viewer_branch b ON cb.branch_id = b.id
WHERE b.repository_id = (SELECT id FROM viewer_repository WHERE name = 'roo-clone')
AND c.author_name = 'David Ryan'
ORDER BY c.commit_date DESC
LIMIT 10;
```

### Search for Commits by Message Content

Search for commits containing specific keywords in their message:

```sql
SELECT c.hash, c.short_message, c.commit_date
FROM viewer_commit c
JOIN viewer_commit_branches cb ON c.hash = cb.commit_id
JOIN viewer_branch b ON cb.branch_id = b.id
WHERE b.repository_id = (SELECT id FROM viewer_repository WHERE name = 'roo-clone')
AND (c.short_message ILIKE '%typescript%' OR c.full_message ILIKE '%typescript%')
ORDER BY c.commit_date DESC;
```

## Advanced Queries

### File Changes in a Specific Commit

Get all file changes for a specific commit:

```sql
SELECT f.path, f.diff_content, f.lines_added, f.lines_removed
FROM viewer_filechange f
WHERE f.commit_id = '661df704df929ec1847f97bdeeda71990a15be8a';
```

### Count Commits by Branch

Count the number of commits per branch in roo-clone:

```sql
SELECT b.name as branch_name, COUNT(cb.commit_id) as commit_count
FROM viewer_branch b
JOIN viewer_commit_branches cb ON b.id = cb.branch_id
WHERE b.repository_id = (SELECT id FROM viewer_repository WHERE name = 'roo-clone')
GROUP BY b.name
ORDER BY commit_count DESC;
```

### Commits Affecting Specific Files

Find commits that changed a specific file:

```sql
SELECT c.hash, c.short_message, c.commit_date
FROM viewer_commit c
JOIN viewer_filechange f ON c.hash = f.commit_id
JOIN viewer_commit_branches cb ON c.hash = cb.commit_id
JOIN viewer_branch b ON cb.branch_id = b.id
WHERE b.repository_id = (SELECT id FROM viewer_repository WHERE name = 'roo-clone')
AND f.path LIKE '%typescript%'
ORDER BY c.commit_date DESC;
```

## Using with MCP Server

To execute these queries via the PostgreSQL MCP server, use the `query` tool:

```javascript
<use_mcp_tool>
<server_name>github.com/modelcontextprotocol/servers/tree/main/src/postgres</server_name>
<tool_name>query</tool_name>
<arguments>
{
  "sql": "SELECT c.hash, c.short_message, c.author_name, c.commit_date FROM viewer_commit c JOIN viewer_commit_branches cb ON c.hash = cb.commit_id JOIN viewer_branch b ON cb.branch_id = b.id WHERE b.repository_id = (SELECT id FROM viewer_repository WHERE name = 'roo-clone') ORDER BY c.commit_date DESC LIMIT 10;"
}
</arguments>
</use_mcp_tool>
```

This provides a convenient way to access your Git commit history programmatically through the MCP interface.
