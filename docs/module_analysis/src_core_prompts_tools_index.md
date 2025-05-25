# Technical Report: src/core/prompts/tools/index.ts

**Date:** 2025-05-25
**Author:** DàFú (AI Assistant)
**Version:** 1.0

## 1. Module Overview

**File Path:** `src/core/prompts/tools/index.ts`

**Subsystem:** `core`

**Purpose:**
This module serves as the central aggregator and provider for generating the descriptive text of all tools available to the AI model. The generated descriptions are dynamically tailored based on the AI's current operational "mode," enabled experimental features, and the availability of certain services (like codebase indexing or MCP Hub). This module ensures that the AI model receives an accurate and context-aware list of tools it can utilize for a given task.

## 2. Key Functionality

The primary export and most crucial component of this module is the `getToolDescriptionsForMode` function.

### 2.1. `getToolDescriptionsForMode`

**Signature:**

```typescript
export function getToolDescriptionsForMode(
	mode: Mode,
	cwd: string,
	supportsComputerUse: boolean,
	codeIndexManager?: CodeIndexManager,
	diffStrategy?: DiffStrategy,
	browserViewportSize?: string,
	mcpHub?: McpHub,
	customModes?: ModeConfig[],
	experiments?: Record<string, boolean>,
): string
```

**Role:**
This function constructs a formatted string containing the descriptions of all tools permitted for the specified `mode` and operational context. The output string is intended to be directly consumable by the AI model as part of its system prompt.

**Parameters:**

| Parameter             | Type                                   | Required | Origin (Typical)                             | Description                                                                                                  |
| --------------------- | -------------------------------------- | -------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `mode`                | `Mode`                                 | Yes      | `../../../shared/modes`                      | The current operational mode of the AI (e.g., "code", "architect").                                          |
| `cwd`                 | `string`                               | Yes      | System Environment                           | The current working directory, used for context in some tool descriptions.                                   |
| `supportsComputerUse` | `boolean`                              | Yes      | System Capability Flag                       | Indicates if tools that interact with the local computer (e.g., file system, command execution) are allowed. |
| `codeIndexManager`    | `CodeIndexManager \| undefined`        | No       | `../../../services/code-index/manager`       | Manages codebase indexing; its presence and status affect `codebase_search` tool availability.               |
| `diffStrategy`        | `DiffStrategy \| undefined`            | No       | `../../../shared/tools`                      | The strategy to use for diffing operations, can influence the `apply_diff` tool description.                 |
| `browserViewportSize` | `string \| undefined`                  | No       | Browser Service                              | Information about the browser viewport, potentially used by browser-related tool descriptions.               |
| `mcpHub`              | `McpHub \| undefined`                  | No       | `../../../services/mcp/McpHub`               | Manages Model Context Protocol (MCP) servers; influences MCP tool descriptions.                              |
| `customModes`         | `ModeConfig[] \| undefined`            | No       | `../../../shared/modes` (Custom Mode Config) | Array of custom mode configurations.                                                                         |
| `experiments`         | `Record<string, boolean> \| undefined` | No       | Experimentation Framework                    | A record of enabled experimental features, which can toggle tool availability.                               |

**Return Value:**

- `string`: A single string formatted with Markdown. It starts with `# Tools\n\n` followed by the descriptions of each available tool, separated by double newlines.

**Operational Logic:**

1.  **Mode Configuration:** Retrieves the configuration for the given `mode` using `getModeConfig` (from `../../../shared/modes`).
2.  **Tool Gathering from Groups:** Iterates through the `groups` (e.g., "edit", "read") defined in the mode's configuration. For each group, it looks up the associated tools in the `TOOL_GROUPS` constant (from `../../../shared/tools`).
3.  **Permission Check:** For each tool found, it calls `isToolAllowedForMode` (from `../../../shared/modes`) to verify if the tool is permitted in the current `mode`, considering any `customModes` and active `experiments`.
4.  **Always Available Tools:** Adds tools listed in `ALWAYS_AVAILABLE_TOOLS` (from `../../../shared/tools`) to the set of available tools.
5.  **Conditional Exclusions:**
    - The `codebase_search` tool is specifically excluded if the `codeIndexManager` is not provided, not enabled, not configured, or not initialized.
6.  **Description Mapping:** For each permitted tool, it retrieves its description string by calling the corresponding function from the internal `toolDescriptionMap`.
7.  **Formatting:** Concatenates all retrieved descriptions into the final Markdown string.

## 3. Core Data Structures and Constants

### 3.1. `toolDescriptionMap`

**Structure:**

```typescript
const toolDescriptionMap: Record<string, (args: ToolArgs) => string | undefined> = {
	// Example entry:
	// execute_command: (args) => getExecuteCommandDescription(args),
	// ... other tools
}
```

- This is a JavaScript object acting as a map.
- **Keys:** Tool names (strings, e.g., `"read_file"`, `"execute_command"`). These names correspond to `ToolName` type (from `../../../schemas`).
- **Values:** Functions that take a `ToolArgs` object and return the tool's description string or `undefined`.

**Population:**
The functions used as values in this map are imported from individual TypeScript files located in the same directory (`src/core/prompts/tools/`). For example, the description for the `read_file` tool is generated by `getReadFileDescription`, which is imported from `./read-file.ts`.

### 3.2. `ToolArgs`

**Origin:** `./types.ts` (within the same directory)

**Purpose:** This type defines the shape of the arguments object passed to each individual tool description generator function.

```typescript
// From src/core/prompts/tools/types.ts (illustrative based on usage)
export interface ToolArgs {
	cwd: string
	supportsComputerUse: boolean
	diffStrategy?: DiffStrategy
	browserViewportSize?: string
	mcpHub?: McpHub
	toolOptions?: any // Specific options for a tool, if any. Usually undefined at top-level generation.
}
```

The `toolOptions` field is generally `undefined` when descriptions are generated via `getToolDescriptionsForMode` as it uses a group-based approach for most tools. However, it can be utilized by specific tool description generators, such as `apply_diff` when using a `diffStrategy`.

## 4. Key Imports and Dependencies

This module relies on several other modules and shared configurations:

| Imported Symbol/Module                                                        | Path                                   | Role                                                                                                                              |
| ----------------------------------------------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `ToolName`                                                                    | `../../../schemas`                     | Type definition for valid tool names.                                                                                             |
| `TOOL_GROUPS`, `ALWAYS_AVAILABLE_TOOLS`, `DiffStrategy`                       | `../../../shared/tools`                | Definitions of tool groupings, tools that are always active, and the diffing strategy type.                                       |
| `McpHub`                                                                      | `../../../services/mcp/McpHub`         | Type for the MCP Hub, used for MCP tool descriptions.                                                                             |
| `Mode`, `ModeConfig`, `getModeConfig`, `isToolAllowedForMode`, `getGroupName` | `../../../shared/modes`                | Types and utility functions for handling AI operational modes and their configurations.                                           |
| `ToolArgs`                                                                    | `./types`                              | Interface for arguments passed to individual tool description functions.                                                          |
| `get<SpecificToolName>Description` functions                                  | `./<specific-tool-name>.ts`            | A suite of functions, each responsible for generating the description for a specific tool (e.g., `getExecuteCommandDescription`). |
| `CodeIndexManager`                                                            | `../../../services/code-index/manager` | Type for the codebase indexing manager, relevant for the `codebase_search` tool.                                                  |
