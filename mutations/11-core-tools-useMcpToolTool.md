# Mutations for src/core/tools/useMcpToolTool.ts

## Caveats from Safe Mutation Analysis

- **Classification**: VOLATILE
- **Risk Assessment**: High risk to modify due to its high fan-out or dependency depth. Changes can have wide, unpredictable impact.
- **Directive**: Proceed with extreme caution. Thorough and comprehensive testing of all interaction paths, especially with the `Task` object and error handling, is mandatory after applying these mutations.

## Mutation 1: Add Pause After State Change Logic

**File**: `src/core/tools/useMcpToolTool.ts`
**Context for Insertion**: This new block of code should be inserted immediately _after_ line 101 `await cline.say("mcp_server_response", toolResultPretty)` and _before_ line 102 `pushToolResult(formatResponse.toolResult(toolResultPretty))`.

```diff
<<<<<<< SEARCH
			await cline.say("mcp_server_response", toolResultPretty)
			pushToolResult(formatResponse.toolResult(toolResultPretty))
=======
			await cline.say("mcp_server_response", toolResultPretty)

			// --- BEGIN PAUSE AFTER STATE CHANGE LOGIC ---
			if (cline.pauseAfterProductiveOperation) {
				const shouldPause = cline.shouldPauseAfterOperation()
				if (shouldPause) {
					await cline.say("operation_completed", "MCP tool execution completed successfully.")
					const { response } = await cline.ask("operation_acknowledgment", "")
					if (response === "messageResponse") {
						// User acknowledged, continue with normal flow
					}
				}
			}
			// --- END PAUSE AFTER STATE CHANGE LOGIC ---

			pushToolResult(formatResponse.toolResult(toolResultPretty))
>>>>>>> REPLACE
```

**Rationale**: This insertion point is optimal because:

- It occurs after the MCP server response is displayed to the user
- It's before the final tool result is pushed to the conversation
- It maintains the existing error handling and success flow
- It preserves the tool's existing return patterns for all MCP tool operations
