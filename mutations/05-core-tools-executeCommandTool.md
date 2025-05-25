# Mutations for src/core/tools/executeCommandTool.ts

## Caveats from Safe Mutation Analysis

- **Classification**: VOLATILE
- **Risk Assessment**: High risk to modify due to its high fan-out or dependency depth. Changes can have wide, unpredictable impact.
- **Directive**: Proceed with extreme caution. Thorough and comprehensive testing of all interaction paths, especially with the `Task` object, terminal interactions, and error handling, is mandatory after applying these mutations.

## Mutation 1: Add Pause After State Change Logic in `executeCommandTool`

**File**: `src/core/tools/executeCommandTool.ts`
**Context for Insertion**: Inside the `executeCommandTool` function, within the `else` block (after `if (block.partial)`), inside the first `try` block. This new logic should be placed _after_ the `executeCommand` helper function call has returned its `result` and the `rejected` flag has been processed (e.g., setting `cline.didRejectTool`), but _before_ `pushToolResult(result)` is called. This is approximately after line 76 and before line 78 in the last read file content.

```diff
<<<<<<< SEARCH
				const [rejected, result] = await executeCommand(cline, options)

				if (rejected) {
					cline.didRejectTool = true
				}

				pushToolResult(result)
			} catch (error: unknown) {
=======
				const [rejected, result] = await executeCommand(cline, options)

				if (rejected) {
					// This flag indicates user interjected during command output streaming.
					// The pause after state change might still be desired by the user
					// to acknowledge the overall command completion.
					cline.didRejectTool = true
				}

				// --- BEGIN PAUSE AFTER STATE CHANGE LOGIC ---
				if (cline.pauseAfterProductiveOperation) {
					const operationPayload = JSON.stringify({
						operation: "command",
						command: options.command,
						// Potentially include a summary of 'result' or exit status if concise.
						// For now, the UI message will refer to the preceding command output.
					});
					// It's important that the 'result' (command output) is pushed to clineMessages
					// by the 'executeCommand' helper (via its internal cline.say calls) BEFORE this point,
					// or that this 'say' message itself contains the summary.
					// The original technical report implies the pause happens *after* results are available.
					await cline.say("operation_completed", operationPayload);

					const ack = await cline.ask(
						"operation_acknowledgment",
						`Command '${options.command}' finished. Review output above. Continue?`
					);

					if (ack.response === "noButtonClicked" || ack.response === "cancel") {
						// If user cancels at this stage, we still push the original command result,
						// but signal that the user paused further operations.
						pushToolResult(formatResponse.toolError(`User paused after command execution. Original command result:\n${result.content?.[0]?.text || result}`)); // Accessing text from ToolResponse
						return; // Stop further processing in this tool handler
					}

					if (ack.text) {
						await cline.addToClineMessages({
							ts: Date.now(),
							type: "say",
							say: "user_feedback",
							text: `[User acknowledged command '${options.command}'] ${ack.text}`,
						});
					}
				}
				// --- END PAUSE AFTER STATE CHANGE LOGIC ---

				pushToolResult(result)
			} catch (error: unknown) {
>>>>>>> REPLACE
```

**Clarification on `result` and `pushToolResult`**:
The `executeCommand` helper function internally calls `cline.say("command_output", result)` (line 176 of `executeCommandTool.ts` in the last read content) which adds the command's output to `clineMessages`. The `result` variable returned by `executeCommand` to `executeCommandTool` is a `ToolResponse`. The `pushToolResult(result)` call (line 78) then sends this `ToolResponse` back to the AI model as the outcome of the tool use.

The "Pause After State Change" logic is inserted _after_ `executeCommand` has finished and its output (`result`) is available, and _after_ `cline.say("command_output", ...)` has likely been called by `executeCommand`. The `cline.say("operation_completed", ...)` will be a new, distinct message. The `pushToolResult(result)` then happens _after_ the acknowledgment. This sequence ensures the AI gets the command output as part of the tool's result, and the user gets to acknowledge before the AI proceeds.
