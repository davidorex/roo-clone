# 4. Key Imports and Dependencies

**Parent Report:** [Technical Report: `src/core/prompts/tools/index.ts`](./00_src_core_prompts_tools_index_report_overview.md)

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

**Dependency Graph Insights:**

- The module has a high fan-out (23 direct dependencies according to `packages/dev-support-scripts/dependency_graph/src_core_prompts_tools_index_dependencies.json`), indicating its role as an integrator of various pieces of information related to tools.
- It primarily depends on modules within `src/shared/`, `src/services/`, `src/schemas/`, and its sibling files in `src/core/prompts/tools/`.
