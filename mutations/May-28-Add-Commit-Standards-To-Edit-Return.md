# Adding Commit Message Standards to File Editing Tool Responses

This document outlines the exact mutations needed to inject commit message standards into the responses returned by file editing tools. These standards will guide future AI systems in creating detailed, specific commit messages that provide clear forensic evidence of actions and intentions.

## Commit Message Instructions

The following text will be added to all file editing tool responses:

```
For each file creation or edits: create a detailed, specific, measured, descriptive commit messages that leaves meticulous forensic evidence for future ai's to know and understand every action and intention. Make sure not to be unjustifiably definitive in your claims. Do not use language like "this ensures…." or "this fixes…." Future ai's must be able to understand the true state of functionality and the complete thinking and actions in code from commit messages. Speak to aims and intentions.
```

## Implementation Strategy

We'll define a constant at the top of each file editing tool file and append it to all `pushToolResult` calls. This ensures the instructions are included in every response sent back to the API after a file editing operation.

## Exact Mutations

### 1. src/core/tools/writeToFileTool.ts

```typescript
// Add at the top of the file, after imports
const COMMIT_MESSAGE_INSTRUCTIONS = `\n\nFor each file creation or edits: create a detailed, specific, measured, descriptive commit messages that leaves meticulous forensic evidence for future ai's to know and understand every action and intention. Make sure not to be unjustifiably definitive in your claims. Do not use language like "this ensures…." or "this fixes…." Future ai's must be able to understand the true state of functionality and the complete thinking and actions in code from commit messages. Speak to aims and intentions.`

// Then modify all pushToolResult calls:

// Around line 55
if (!accessAllowed) {
	await cline.say("rooignore_error", relPath)
	pushToolResult(formatResponse.toolError(formatResponse.rooIgnoreError(relPath)) + COMMIT_MESSAGE_INSTRUCTIONS)
	return
}

// Around line 180
if (!relPath) {
	cline.consecutiveMistakeCount++
	cline.recordToolError("write_to_file")
	pushToolResult((await cline.sayAndCreateMissingParamError("write_to_file", "path")) + COMMIT_MESSAGE_INSTRUCTIONS)
	await cline.diffViewProvider.reset()
	return
}

// Around line 188
if (!newContent) {
	cline.consecutiveMistakeCount++
	cline.recordToolError("write_to_file")
	pushToolResult(
		(await cline.sayAndCreateMissingParamError("write_to_file", "content")) + COMMIT_MESSAGE_INSTRUCTIONS,
	)
	await cline.diffViewProvider.reset()
	return
}

// Around line 211
pushToolResult(
	formatResponse.toolError(formatResponse.lineCountTruncationError(actualLineCount, isNewFile, diffStrategyEnabled)) +
		COMMIT_MESSAGE_INSTRUCTIONS,
)

// Around line 257
pushToolResult(
	formatResponse.toolError(
		`Content appears to be truncated (file has ${
			newContent.split("\n").length
		} lines but was predicted to have ${predictedLineCount} lines), and found comments indicating omitted code (e.g., '// rest of code unchanged', '/* previous code */'). Please provide the complete file content without any omissions if possible, or otherwise use the 'apply_diff' tool to apply the diff to the original file.`,
	) + COMMIT_MESSAGE_INSTRUCTIONS,
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
		COMMIT_MESSAGE_INSTRUCTIONS,
)

// Around line 325
pushToolResult(
	`The content was successfully saved to ${relPath.toPosix()}.${newProblemsMessage}` + COMMIT_MESSAGE_INSTRUCTIONS,
)
```

### 2. src/core/tools/searchAndReplaceTool.ts

```typescript
// Add at the top of the file, after imports
const COMMIT_MESSAGE_INSTRUCTIONS = `\n\nFor each file creation or edits: create a detailed, specific, measured, descriptive commit messages that leaves meticulous forensic evidence for future ai's to know and understand every action and intention. Make sure not to be unjustifiably definitive in your claims. Do not use language like "this ensures…." or "this fixes…." Future ai's must be able to understand the true state of functionality and the complete thinking and actions in code from commit messages. Speak to aims and intentions.`

// Then modify all pushToolResult calls:

// In validateParams function
pushToolResult((await cline.sayAndCreateMissingParamError("search_and_replace", "path")) + COMMIT_MESSAGE_INSTRUCTIONS)

pushToolResult(
	(await cline.sayAndCreateMissingParamError("search_and_replace", "search")) + COMMIT_MESSAGE_INSTRUCTIONS,
)

pushToolResult(
	(await cline.sayAndCreateMissingParamError("search_and_replace", "replace")) + COMMIT_MESSAGE_INSTRUCTIONS,
)

// Around line 100
pushToolResult(formattedError + COMMIT_MESSAGE_INSTRUCTIONS)

// Around line 115
pushToolResult(formattedError + COMMIT_MESSAGE_INSTRUCTIONS)

// Around line 135
pushToolResult(`No changes needed for '${relPath}'` + COMMIT_MESSAGE_INSTRUCTIONS)

// Around line 160
pushToolResult("Changes were rejected by the user." + COMMIT_MESSAGE_INSTRUCTIONS)

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
		COMMIT_MESSAGE_INSTRUCTIONS,
)

// Around line 200
pushToolResult(
	`The content was successfully replaced in ${relPath}.${newProblemsMessage}` + COMMIT_MESSAGE_INSTRUCTIONS,
)
```

### 3. src/core/tools/applyDiffTool.ts

```typescript
// Add at the top of the file, after imports
const COMMIT_MESSAGE_INSTRUCTIONS = `\n\nFor each file creation or edits: create a detailed, specific, measured, descriptive commit messages that leaves meticulous forensic evidence for future ai's to know and understand every action and intention. Make sure not to be unjustifiably definitive in your claims. Do not use language like "this ensures…." or "this fixes…." Future ai's must be able to understand the true state of functionality and the complete thinking and actions in code from commit messages. Speak to aims and intentions.`

// Then modify all pushToolResult calls:

// Around line 60
pushToolResult((await cline.sayAndCreateMissingParamError("apply_diff", "path")) + COMMIT_MESSAGE_INSTRUCTIONS)

// Around line 67
pushToolResult((await cline.sayAndCreateMissingParamError("apply_diff", "diff")) + COMMIT_MESSAGE_INSTRUCTIONS)

// Around line 74
pushToolResult(formatResponse.toolError(formatResponse.rooIgnoreError(relPath)) + COMMIT_MESSAGE_INSTRUCTIONS)

// Around line 85
pushToolResult(formattedError + COMMIT_MESSAGE_INSTRUCTIONS)

// Around line 130
pushToolResult(formattedError + COMMIT_MESSAGE_INSTRUCTIONS)

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
		COMMIT_MESSAGE_INSTRUCTIONS,
)

// Around line 210
pushToolResult(
	`Changes successfully applied to ${relPath.toPosix()}:\n\n${newProblemsMessage}\n` +
		partFailHint +
		COMMIT_MESSAGE_INSTRUCTIONS,
)
```

### 4. src/core/tools/insertContentTool.ts

```typescript
// Add at the top of the file, after imports
const COMMIT_MESSAGE_INSTRUCTIONS = `\n\nFor each file creation or edits: create a detailed, specific, measured, descriptive commit messages that leaves meticulous forensic evidence for future ai's to know and understand every action and intention. Make sure not to be unjustifiably definitive in your claims. Do not use language like "this ensures…." or "this fixes…." Future ai's must be able to understand the true state of functionality and the complete thinking and actions in code from commit messages. Speak to aims and intentions.`

// Then modify all pushToolResult calls:

// Around line 55
pushToolResult((await cline.sayAndCreateMissingParamError("insert_content", "path")) + COMMIT_MESSAGE_INSTRUCTIONS)

// Around line 62
pushToolResult((await cline.sayAndCreateMissingParamError("insert_content", "line")) + COMMIT_MESSAGE_INSTRUCTIONS)

// Around line 69
pushToolResult((await cline.sayAndCreateMissingParamError("insert_content", "content")) + COMMIT_MESSAGE_INSTRUCTIONS)

// Around line 80
pushToolResult(formattedError + COMMIT_MESSAGE_INSTRUCTIONS)

// Around line 90
pushToolResult(
	formatResponse.toolError("Invalid line number. Must be a non-negative integer.") + COMMIT_MESSAGE_INSTRUCTIONS,
)

// Around line 115
pushToolResult(`No changes needed for '${relPath}'` + COMMIT_MESSAGE_INSTRUCTIONS)

// Around line 130
pushToolResult("Changes were rejected by the user." + COMMIT_MESSAGE_INSTRUCTIONS)

// Around line 145
pushToolResult(
	`The content was successfully inserted in ${relPath.toPosix()} at line ${lineNumber}.${newProblemsMessage}` +
		COMMIT_MESSAGE_INSTRUCTIONS,
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
		COMMIT_MESSAGE_INSTRUCTIONS,
)
```

## Implementation Notes

1. The commit message instructions are added as a constant at the top of each file to maintain consistency and make future updates easier.

2. Every `pushToolResult` call is modified to append the instructions, ensuring they're included in all responses.

3. The instructions are separated from the rest of the response with two newlines (`\n\n`) for better readability.

4. This approach ensures that the instructions are the last thing the AI sees in the response, making them a final directive that the AI should follow.
