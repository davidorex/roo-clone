# Mutations for src/core/tools/writeToFileTool.ts

## Caveats from Safe Mutation Analysis

- **Classification**: VOLATILE
- **Risk Assessment**: High risk to modify due to its high fan-out or dependency depth. Changes can have wide, unpredictable impact.
- **Directive**: Proceed with extreme caution. Thorough and comprehensive testing of all interaction paths, especially with the `Task` object and error handling, is mandatory after applying these mutations.

## Mutation 1: Add Pause After State Change Logic

**File**: `src/core/tools/writeToFileTool.ts`
**Context for Insertion**: This new block of code should be inserted immediately _after_ the line `cline.didEditFile = true;` (which is approximately line 218 in the last read file content) and _before_ the `if (userEdits)` block (which starts approximately at line 220). The implementing agent must verify exact line numbers against the current file content before applying the diff.

```diff
<<<<<<< SEARCH
			// Track file edit operation
			if (relPath) {
				await cline.fileContextTracker.trackFileContext(relPath, "roo_edited" as RecordSource)
			}

			cline.didEditFile = true // used to determine if we should wait for busy terminal to update before sending api request

			if (userEdits) {
				await cline.say(
=======
			// Track file edit operation
			if (relPath) {
				await cline.fileContextTracker.trackFileContext(relPath, "roo_edited" as RecordSource)
			}

			cline.didEditFile = true // used to determine if we should wait for busy terminal to update before sending api request

			// --- BEGIN PAUSE AFTER STATE CHANGE LOGIC ---
			// Ensure cline.pauseAfterProductiveOperation is accessed correctly (it was added to Task class properties)
			if (cline.pauseAfterProductiveOperation) {
				const operationPayload = JSON.stringify({
					operation: "write",
					path: getReadablePath(cline.cwd, relPath), // relPath is available in this scope
				});
				await cline.say("operation_completed", operationPayload);

				const ack = await cline.ask(
					"operation_acknowledgment",
					`File '${getReadablePath(cline.cwd, relPath)}' was successfully written. Continue?`
				);

				// Handle user's acknowledgment response
				if (ack.response === "noButtonClicked" || ack.response === "cancel") { // Example cancellation check
					pushToolResult(formatResponse.toolError("Operation acknowledged and paused by user."));
					await cline.diffViewProvider.reset(); // Reset diff view if operation is stopped here
					return; // Stop further processing in this tool
				}

				if (ack.text) {
					await cline.addToClineMessages({
						ts: Date.now(),
						type: "say",
						say: "user_feedback",
						text: `[User acknowledged write to '${getReadablePath(cline.cwd, relPath)}'] ${ack.text}`,
					});
				}
			}
			// --- END PAUSE AFTER STATE CHANGE LOGIC ---

			if (userEdits) {
				await cline.say(
>>>>>>> REPLACE
```
