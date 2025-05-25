# Mutations for src/core/tools/searchAndReplaceTool.ts

## Caveats from Safe Mutation Analysis

- **Classification**: VOLATILE
- **Risk Assessment**: High risk to modify due to its high fan-out or dependency depth. Changes can have wide, unpredictable impact.
- **Directive**: Proceed with extreme caution. Thorough and comprehensive testing of all interaction paths, especially with the `Task` object and error handling, is mandatory after applying these mutations.

## Mutation 1: Add Pause After State Change Logic

**File**: `src/core/tools/searchAndReplaceTool.ts`
**Context for Insertion**: This new block of code should be inserted immediately _after_ line 221 `cline.didEditFile = true` and _before_ line 223 `if (!userEdits)` block.

```diff
<<<<<<< SEARCH
		cline.didEditFile = true

		if (!userEdits) {
=======
		cline.didEditFile = true

		// --- BEGIN PAUSE AFTER STATE CHANGE LOGIC ---
		if (cline.pauseAfterProductiveOperation) {
			const shouldPause = cline.shouldPauseAfterOperation()
			if (shouldPause) {
				await cline.say("operation_completed", "Search and replace operation completed successfully.")
				const { response } = await cline.ask("operation_acknowledgment", "")
				if (response === "messageResponse") {
					// User acknowledged, continue with normal flow
				}
			}
		}
		// --- END PAUSE AFTER STATE CHANGE LOGIC ---

		if (!userEdits) {
>>>>>>> REPLACE
```

**Rationale**: This insertion point is optimal because:

- It occurs after the successful search and replace operation (`cline.didEditFile = true`)
- It's before any user feedback processing (`if (!userEdits)`)
- It maintains the existing error handling and success flow
- It preserves the tool's existing return patterns
