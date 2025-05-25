# 6. How to Extend (Adding a New Tool)

**Parent Report:** [Technical Report: `src/core/prompts/tools/index.ts`](./00_src_core_prompts_tools_index_report_overview.md)

To add a new tool and its description to the system via this module, follow these steps:

1.  **Define the Tool in Shared Configurations:**

    - Ensure the new tool's name is added to the `ToolName` enum/type (likely in `src/schemas/index.ts` or a similar central schema definition file). This name must be a valid XML tag name.
    - Add the tool to the appropriate `TOOL_GROUPS` array or to `ALWAYS_AVAILABLE_TOOLS` in `src/shared/tools/index.ts`. This defines its grouping and general availability within different AI modes.
    - Define the tool's XML schema (if it uses one) for parsing its arguments by the AI model. This schema is typically part of the tool's description that you will create in the next step.

2.  **Create the Description Generator Function:**

    - In the `src/core/prompts/tools/` directory, create a new TypeScript file, e.g., `get_my_new_tool_description.ts`.
    - Inside this new file, implement and export a function that generates the tool's description. This function should accept `ToolArgs` (imported from `./types`) and return a string. The description should clearly outline the tool's purpose, parameters (required/optional, types, examples), and provide a usage example in XML format.

    ```typescript
    // Example: src/core/prompts/tools/get_my_new_tool_description.ts
    import { ToolArgs } from "./types"

    export function getMyNewToolDescription(args: ToolArgs): string {
    	// Access args.cwd, args.mcpHub etc. if needed for dynamic parts of the description
    	return `
    ## my_new_tool
    Description: Brief explanation of what my_new_tool does. This tool helps in performing XYZ.
    Parameters:
    - param1: (required) Description of param1. Example: <param1>example_value</param1>
    - param2: (optional) Description of param2. Example: <param2>another_value</param2>
    Usage:
    <my_new_tool>
    <param1>Value1</param1>
    <param2>Value2</param2>
    </my_new_tool>
        `.trim() // .trim() is good practice to remove leading/trailing whitespace.
    }
    ```

3.  **Register the New Tool in `src/core/prompts/tools/index.ts`:**

    - Import your newly created description generator function at the top of `src/core/prompts/tools/index.ts`:
        ```typescript
        import { getMyNewToolDescription } from "./get_my_new_tool_description"
        ```
    - Add an entry for your new tool in the `toolDescriptionMap` constant. The key should be the tool's name (as defined in `ToolName`), and the value should be a lambda calling your new function:
        ```typescript
        const toolDescriptionMap: Record<string, (args: ToolArgs) => string | undefined> = {
        	// ... existing tools
        	my_new_tool: (args) => getMyNewToolDescription(args),
        }
        ```
    - (Optional) If the description generator function needs to be accessible directly from outside this module (e.g., for testing or specific use cases), add it to the `export { ... }` block at the end of the file.

4.  **Mode Configuration (If Tool is Group-Specific):**

    - If the new tool is not part of `ALWAYS_AVAILABLE_TOOLS`, ensure that the AI modes intended to use this tool have the relevant tool group (that now includes your new tool) listed in their `groups` array. This is typically configured in `src/shared/modes/index.ts` or in custom mode definition files.

5.  **Implement Tool Execution Logic:**
    - The actual runtime logic for the new tool (what happens when the AI decides to use it) must be implemented. This usually involves creating a corresponding handler function or class in the `src/core/tools/` directory (e.g., `myNewToolTool.ts`) and registering it with the tool execution framework. This framework is responsible for parsing the AI's XML tool usage request and invoking the correct handler.
