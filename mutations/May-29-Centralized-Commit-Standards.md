# Centralizing Commit Message Standards

This document outlines a more centralized approach to implementing commit message standards in file editing tool responses, addressing the duplication issue in the previous implementation.

## Current Implementation

The current implementation, as outlined in `mutations/May-28-Add-Commit-Standards-To-Edit-Return.md`, defines the same commit message instructions text in each file editing tool:

1. `src/core/tools/writeToFileTool.ts`
2. `src/core/tools/searchAndReplaceTool.ts`
3. `src/core/tools/applyDiffTool.ts`
4. `src/core/tools/insertContentTool.ts`

This approach leads to duplication and makes it harder to maintain consistency if the standards need to be updated in the future.

## Proposed Solution

Instead of duplicating the commit message standards in each file, we can define them once in a central location and reference them from each file editing tool. After analyzing the codebase patterns, the most appropriate approach is to add a new function to the `formatResponse` object in `src/core/prompts/responses.ts`.

### Benefits of this approach:

1. **Single Source of Truth**: The commit message standards are defined in one place, making them easier to update and maintain.
2. **Consistency**: All file editing tools will use the exact same text, ensuring consistency across the codebase.
3. **Alignment with Existing Patterns**: The `formatResponse` object is already used for similar purposes throughout the codebase and is imported in all file editing tools.

## Implementation Details

### 1. Update `src/core/prompts/responses.ts`

Add a new function to the `formatResponse` object:

```typescript
// In src/core/prompts/responses.ts
export const formatResponse = {
	// Existing functions...

	commitMessageInstructions: () =>
		`\n\nFor each file creation or edits: create a detailed, specific, measured, descriptive commit messages that leaves meticulous forensic evidence for future ai's to know and understand every action and intention. Make sure not to be unjustifiably definitive in your claims. Do not use unwarranted maximalist language like "this ensures…." or "this fixes…." Future ai's must be able to understand the true state of functionality and the complete thinking and actions in code from commit messages. Speak to aims and intentions.`,

	// Other existing functions...
}
```

### 2. Update File Editing Tools

#### a. Update `src/core/tools/writeToFileTool.ts`

```typescript
// No need to define COMMIT_MESSAGE_INSTRUCTIONS at the top of the file

// Around line 55
if (!accessAllowed) {
	await cline.say("rooignore_error", relPath)
	pushToolResult(
		formatResponse.toolError(formatResponse.rooIgnoreError(relPath)) + formatResponse.commitMessageInstructions(),
	)
	return
}

// Around line 180
if (!relPath) {
	cline.consecutiveMistakeCount++
	cline.recordToolError("write_to_file")
	pushToolResult(
		(await cline.sayAndCreateMissingParamError("write_to_file", "path")) +
			formatResponse.commitMessageInstructions(),
	)
	await cline.diffViewProvider.reset()
	return
}

// Around line 188
if (!newContent) {
	cline.consecutiveMistakeCount++
	cline.recordToolError("write_to_file")
	pushToolResult(
		(await cline.sayAndCreateMissingParamError("write_to_file", "content")) +
			formatResponse.commitMessageInstructions(),
	)
	await cline.diffViewProvider.reset()
	return
}

// Around line 211
pushToolResult(
	formatResponse.toolError(formatResponse.lineCountTruncationError(actualLineCount, isNewFile, diffStrategyEnabled)) +
		formatResponse.commitMessageInstructions(),
)

// Around line 257
pushToolResult(
	formatResponse.toolError(
		`Content appears to be truncated (file has ${
			newContent.split("\n").length
		} lines but was predicted to have ${predictedLineCount} lines), and found comments indicating omitted code (e.g., '// rest of code unchanged', '/* previous code */'). Please provide the complete file content without any omissions if possible, or otherwise use the 'apply_diff' tool to apply the diff to the original file.`,
	) + formatResponse.commitMessageInstructions(),
)

// Around line 310
pushToolResult(
	`The user made the following updates to your content:\n\n${userEdits}\n\n` +
		`The updated content, which includes both your original modifications and the user's edits, has been successfully saved to ${relPath.toPosix()}. Here is the full, updated content of the file, including line numbers:\n\n` +
		`<final_file_content path="${relPath.toPosix()}">\n${addLineNumbers(
			finalContent || "",
		)}\n</final_file_content>\n\n` +
		`Please note:\n` +
		`1. You do not need to re-write the file with these changes, as they have already been applied.\n` +
		`2. Proceed with the task using this updated file content as the new baseline.\n` +
		`3. If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.` +
		`${newProblemsMessage}` +
		formatResponse.commitMessageInstructions(),
)

// Around line 325
pushToolResult(
	`The content was successfully saved to ${relPath.toPosix()}.${newProblemsMessage}` +
		formatResponse.commitMessageInstructions(),
)
```

#### b. Update `src/core/tools/searchAndReplaceTool.ts`

```typescript
// No need to define COMMIT_MESSAGE_INSTRUCTIONS at the top of the file

// In validateParams function
pushToolResult(
	(await cline.sayAndCreateMissingParamError("search_and_replace", "path")) +
		formatResponse.commitMessageInstructions(),
)

pushToolResult(
	(await cline.sayAndCreateMissingParamError("search_and_replace", "search")) +
		formatResponse.commitMessageInstructions(),
)

pushToolResult(
	(await cline.sayAndCreateMissingParamError("search_and_replace", "replace")) +
		formatResponse.commitMessageInstructions(),
)

// Around line 100
pushToolResult(formattedError + formatResponse.commitMessageInstructions())

// Around line 115
pushToolResult(formattedError + formatResponse.commitMessageInstructions())

// Around line 135
pushToolResult(`No changes needed for '${relPath}'` + formatResponse.commitMessageInstructions())

// Around line 160
pushToolResult("Changes were rejected by the user." + formatResponse.commitMessageInstructions())

// Around line 195
pushToolResult(
	`The user made the following updates to your content:\n\n${userEdits}\n\n` +
		`The updated content has been successfully saved to ${validRelPath.toPosix()}. Here is the full, updated content of the file:\n\n` +
		`<final_file_content path="${validRelPath.toPosix()}">\n${finalContent}\n</final_file_content>\n\n` +
		`Please note:\n` +
		`1. You do not need to re-write the file with these changes, as they have already been applied.\n` +
		`2. Proceed with the task using the updated file content as the new baseline.\n` +
		`3. If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.` +
		newProblemsMessage +
		formatResponse.commitMessageInstructions(),
)

// Around line 200
pushToolResult(
	`The content was successfully replaced in ${relPath}.${newProblemsMessage}` +
		formatResponse.commitMessageInstructions(),
)
```

#### c. Update `src/core/tools/applyDiffTool.ts`

```typescript
// No need to define COMMIT_MESSAGE_INSTRUCTIONS at the top of the file

// Around line 60
pushToolResult(
	(await cline.sayAndCreateMissingParamError("apply_diff", "path")) + formatResponse.commitMessageInstructions(),
)

// Around line 67
pushToolResult(
	(await cline.sayAndCreateMissingParamError("apply_diff", "diff")) + formatResponse.commitMessageInstructions(),
)

// Around line 74
pushToolResult(
	formatResponse.toolError(formatResponse.rooIgnoreError(relPath)) + formatResponse.commitMessageInstructions(),
)

// Around line 85
pushToolResult(formattedError + formatResponse.commitMessageInstructions())

// Around line 130
pushToolResult(formattedError + formatResponse.commitMessageInstructions())

// Around line 190
pushToolResult(
	`The user made the following updates to your content:\n\n${userEdits}\n\n` +
		partFailHint +
		`The updated content, which includes both your original modifications and the user's edits, has been successfully saved to ${relPath.toPosix()}. Here is the full, updated content of the file, including line numbers:\n\n` +
		`<final_file_content path="${relPath.toPosix()}">\n${addLineNumbers(
			finalContent || "",
		)}\n</final_file_content>\n\n` +
		`Please note:\n` +
		`1. You do not need to re-write the file with these changes, as they have already been applied.\n` +
		`2. Proceed with the task using this updated file content as the new baseline.\n` +
		`3. If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.` +
		`${newProblemsMessage}` +
		formatResponse.commitMessageInstructions(),
)

// Around line 210
pushToolResult(
	`Changes successfully applied to ${relPath.toPosix()}:\n\n${newProblemsMessage}\n` +
		partFailHint +
		formatResponse.commitMessageInstructions(),
)
```

#### d. Update `src/core/tools/insertContentTool.ts`

```typescript
// No need to define COMMIT_MESSAGE_INSTRUCTIONS at the top of the file

// Around line 55
pushToolResult(
	(await cline.sayAndCreateMissingParamError("insert_content", "path")) + formatResponse.commitMessageInstructions(),
)

// Around line 62
pushToolResult(
	(await cline.sayAndCreateMissingParamError("insert_content", "line")) + formatResponse.commitMessageInstructions(),
)

// Around line 69
pushToolResult(
	(await cline.sayAndCreateMissingParamError("insert_content", "content")) +
		formatResponse.commitMessageInstructions(),
)

// Around line 80
pushToolResult(formattedError + formatResponse.commitMessageInstructions())

// Around line 90
pushToolResult(
	formatResponse.toolError("Invalid line number. Must be a non-negative integer.") +
		formatResponse.commitMessageInstructions(),
)

// Around line 115
pushToolResult(`No changes needed for '${relPath}'` + formatResponse.commitMessageInstructions())

// Around line 130
pushToolResult("Changes were rejected by the user." + formatResponse.commitMessageInstructions())

// Around line 145
pushToolResult(
	`The content was successfully inserted in ${relPath.toPosix()} at line ${lineNumber}.${newProblemsMessage}` +
		formatResponse.commitMessageInstructions(),
)

// Around line 165
pushToolResult(
	`The user made the following updates to your content:\n\n${userEdits}\n\n` +
		`The updated content has been successfully saved to ${relPath.toPosix()}. Here is the full, updated content of the file:\n\n` +
		`<final_file_content path="${relPath.toPosix()}">\n${finalContent}\n</final_file_content>\n\n` +
		`Please note:\n` +
		`1. You do not need to re-write the file with these changes, as they have already been applied.\n` +
		`2. Proceed with the task using this updated file content as the new baseline.\n` +
		`3. If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.` +
		`${newProblemsMessage}` +
		formatResponse.commitMessageInstructions(),
)
```

## Conclusion

This centralized approach aligns with the existing patterns in the codebase and provides a more maintainable solution for implementing commit message standards. By defining the standards once in the `formatResponse` object, we ensure consistency across all file editing tools and make it easier to update the standards in the future if needed.
