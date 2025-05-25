# Using Context7 MCP Server

This guide demonstrates how to use the Context7 MCP server to retrieve up-to-date documentation for libraries and frameworks directly from their source.

## What is Context7?

Context7 is an MCP (Model Context Protocol) server that provides AI assistants with fresh, accurate documentation for libraries and frameworks. Unlike the training data in AI models which may be outdated, Context7 fetches the latest documentation directly from source repositories.

## Prerequisites

- The Context7 MCP server has been installed and configured in your Cline settings
- Server configured using the name `github.com/upstash/context7-mcp`

## Available Tools

Context7 provides two primary tools:

1. `resolve-library-id` - Finds Context7-compatible library IDs based on a library name
2. `get-library-docs` - Retrieves documentation for a specific library using its ID

## Using Context7 Step-by-Step

### Step 1: Resolve a Library ID

Before retrieving documentation, you need to find the correct Context7-compatible library ID. This is typically in the format `/organization/repository`.

```javascript
<use_mcp_tool>
<server_name>github.com/upstash/context7-mcp</server_name>
<tool_name>resolve-library-id</tool_name>
<arguments>
{
  "libraryName": "tree-sitter"
}
</arguments>
</use_mcp_tool>
```

This will return a list of matching libraries with information including:

- Library ID (format: `/org/repo`)
- Library name
- Description
- Number of code snippets available
- GitHub stars (popularity indicator)

Example result format:

```
Available Libraries (top matches):

- Title: Tree-sitter
- Context7-compatible library ID: /tree-sitter/tree-sitter
- Description: An incremental parsing system for programming tools
- Code Snippets: 331
- GitHub Stars: 20416
```

Select the most appropriate match based on:

- Name similarity to your query
- Description relevance
- Code snippet count (more is better)
- GitHub stars (popularity)

### Step 2: Retrieve Documentation

Once you have the library ID, you can retrieve the documentation:

```javascript
<use_mcp_tool>
<server_name>github.com/upstash/context7-mcp</server_name>
<tool_name>get-library-docs</tool_name>
<arguments>
{
  "context7CompatibleLibraryID": "/tree-sitter/tree-sitter",
  "tokens": 10000
}
</arguments>
</use_mcp_tool>
```

Parameters:

- `context7CompatibleLibraryID` (required): The library ID from step 1
- `topic` (optional): Focus documentation on a specific topic (e.g., "hooks", "routing")
- `tokens` (optional): Maximum number of tokens to retrieve (default: 10000)

The result will be a collection of code snippets, examples, and documentation retrieved directly from the library's repository.

### Step 3: Save Output to File (Optional)

Since Context7 doesn't have a direct file output option, you can save the results using Cline's `write_to_file` tool:

```javascript
<write_to_file>
<path>/path/to/output/library-docs.md</path>
<content>
# Library Documentation

Documentation content from Context7...
```
