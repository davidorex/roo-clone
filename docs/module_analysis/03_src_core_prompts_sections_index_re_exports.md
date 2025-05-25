# 3. Re-exported Symbols

**Parent Report:** [Technical Report: `src/core/prompts/sections/index.ts`](./00_src_core_prompts_sections_index_report_overview.md)

The `src/core/prompts/sections/index.ts` module re-exports the following symbols from their respective files within the `./` (i.e., `src/core/prompts/sections/`) directory. These symbols are typically functions that return string-based prompt sections or constants representing static prompt text.

| Re-exported Symbol            | Source File             | Description (Inferred from Name)                                       |
| ----------------------------- | ----------------------- | ---------------------------------------------------------------------- |
| `getRulesSection`             | `./rules`               | Retrieves the "Rules" section for the AI prompt.                       |
| `getSystemInfoSection`        | `./system-info`         | Retrieves the "System Information" section for the AI prompt.          |
| `getObjectiveSection`         | `./objective`           | Retrieves the "Objective" section for the AI prompt.                   |
| `addCustomInstructions`       | `./custom-instructions` | A function to add or incorporate custom instructions into a prompt.    |
| `getSharedToolUseSection`     | `./tool-use`            | Retrieves a shared "Tool Use" description section.                     |
| `getMcpServersSection`        | `./mcp-servers`         | Retrieves the "MCP Servers" information section.                       |
| `getToolUseGuidelinesSection` | `./tool-use-guidelines` | Retrieves the "Tool Use Guidelines" section.                           |
| `getCapabilitiesSection`      | `./capabilities`        | Retrieves the "Capabilities" section outlining what the AI can do.     |
| `getModesSection`             | `./modes`               | Retrieves the "Modes" section describing available operational modes.  |
| `markdownFormattingSection`   | `./markdown-formatting` | A constant or function providing the "Markdown Formatting" guidelines. |

Each of these re-exported symbols provides a piece of the overall system prompt or context given to the AI model. The actual implementation and content of these sections reside in their respective source files (e.g., `rules.ts`, `system-info.ts`).
