# 5. Other Exports

**Parent Report:** [Technical Report: `src/core/prompts/tools/index.ts`](./00_src_core_prompts_tools_index_report_overview.md)

The module also re-exports many of the individual tool description getter functions:

```typescript
export {
	getExecuteCommandDescription,
	getReadFileDescription,
	getFetchInstructionsDescription,
	getWriteToFileDescription,
	getSearchFilesDescription,
	getListFilesDescription,
	getListCodeDefinitionNamesDescription,
	getBrowserActionDescription,
	getAskFollowupQuestionDescription,
	getAttemptCompletionDescription,
	getUseMcpToolDescription,
	getAccessMcpResourceDescription,
	getSwitchModeDescription,
	getInsertContentDescription,
	getSearchAndReplaceDescription,
	getCodebaseSearchDescription,
	getNewTaskDescription, // This was present in the source code's export block.
}
```

**Note:** The description for `apply_diff` is handled directly within the `toolDescriptionMap` using the `diffStrategy` (if provided) and is not re-exported as a standalone getter function from this `index.ts` module. Its description logic is tied to the `DiffStrategy` interface's `getToolDescription` method.
