# 2. Key Functionality

**Parent Report:** [Technical Report: `src/core/prompts/tools/index.ts`](./00_src_core_prompts_tools_index_report_overview.md)

The primary export and most crucial component of this module is the `getToolDescriptionsForMode` function.

## 2.1. `getToolDescriptionsForMode`

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
