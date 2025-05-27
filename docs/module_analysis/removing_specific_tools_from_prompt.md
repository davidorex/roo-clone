# How to Comment Out Specific Tools from the LLM Prompt

Based on the files I've read about the tool description generation system, to learn how to comment out specific tools from appearing in the prompt given to the LLM, you should read these key files:

1. `src/shared/tools/index.ts` - This file defines the `TOOL_GROUPS` constant and `ALWAYS_AVAILABLE_TOOLS` arrays, which determine which tools belong to which groups and which tools are always available regardless of mode. Modifying these collections would impact which tools are included when generating tool descriptions.

2. `src/shared/modes/index.ts` - This file contains the `getModeConfig` and `isToolAllowedForMode` functions which determine what tools are permitted in each mode. The mode configurations define which tool groups are available in specific modes.

These two files are critical because the `getToolDescriptionsForMode` function in `src/core/prompts/tools/index.ts` specifically:

1. Gets the mode configuration
2. Iterates through tool groups defined in the mode
3. Looks up tools in each group from `TOOL_GROUPS`
4. Uses `isToolAllowedForMode` to verify if each tool is permitted
5. Adds tools from `ALWAYS_AVAILABLE_TOOLS` to the set of available tools
6. Has conditional exclusion logic for certain tools

To comment out specific tools, you would need to either:

- Modify the tool groups in `TOOL_GROUPS`
- Adjust which modes have access to specific tool groups
- Update the `isToolAllowedForMode` function to include additional filtering logic
- Or customize the conditional exclusion logic in `getToolDescriptionsForMode`
