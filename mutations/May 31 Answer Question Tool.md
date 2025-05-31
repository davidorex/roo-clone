# Implementation Plan: Answer Question Tool

**Date:** May 31, 2025  
**Tool Name:** `respond_to_question`  
**Type:** Always Available Tool with Pause-After-State-Change

## Overview

Create a new always-available tool that allows the AI to provide structured responses to user questions, incorporating the pause-after-productive-operation pattern for user acknowledgment.

## File Mutations Required

### 1. Schema Definition (`src/schemas/index.ts`)

**Line 1147 - Add to `toolNames` array:**

```typescript
export const toolNames = [
	"execute_command",
	"read_file",
	"write_to_file",
	"apply_diff",
	"insert_content",
	"search_and_replace",
	"search_files",
	"list_files",
	"list_code_definition_names",
	"browser_action",
	"use_mcp_tool",
	"access_mcp_resource",
	"ask_followup_question",
	"attempt_completion",
	"switch_mode",
	"new_task",
	"fetch_instructions",
	"codebase_search",
	"respond_to_question", // ADD THIS LINE
] as const
```

### 2. Tool Interface Definition (`src/shared/tools.ts`)

**After line 164 - Add new interface:**

```typescript
export interface RespondToQuestionToolUse extends ToolUse {
	name: "respond_to_question"
	params: Partial<Pick<Record<ToolParamName, string>, "question" | "response" | "reasoning">>
}
```

**Line 226 - Add to `ALWAYS_AVAILABLE_TOOLS` array:**

```typescript
export const ALWAYS_AVAILABLE_TOOLS: ToolName[] = [
	"ask_followup_question",
	"attempt_completion",
	"switch_mode",
	"new_task",
	"respond_to_question", // ADD THIS LINE
] as const
```

**Line 29 - Add to `toolParamNames` array:**

```typescript
export const toolParamNames = [
	"command",
	"path",
	"content",
	"line_count",
	"regex",
	"file_pattern",
	"recursive",
	"action",
	"url",
	"coordinate",
	"text",
	"server_name",
	"tool_name",
	"arguments",
	"uri",
	"question",
	"result",
	"diff",
	"start_line",
	"end_line",
	"mode_slug",
	"reason",
	"operations",
	"line",
	"mode",
	"message",
	"cwd",
	"follow_up",
	"task",
	"size",
	"search",
	"replace",
	"use_regex",
	"ignore_case",
	"start_line",
	"end_line",
	"query",
	"response", // ADD THIS LINE
	"reasoning", // ADD THIS LINE
] as const
```

**Line 172 - Add to `TOOL_DISPLAY_NAMES`:**

```typescript
export const TOOL_DISPLAY_NAMES: Record<ToolName, string> = {
	execute_command: "run commands",
	read_file: "read files",
	fetch_instructions: "fetch instructions",
	write_to_file: "write files",
	apply_diff: "apply changes",
	search_files: "search files",
	list_files: "list files",
	list_code_definition_names: "list definitions",
	browser_action: "use a browser",
	use_mcp_tool: "use mcp tools",
	access_mcp_resource: "access mcp resources",
	ask_followup_question: "ask questions",
	attempt_completion: "complete tasks",
	switch_mode: "switch modes",
	new_task: "create new task",
	insert_content: "insert content",
	search_and_replace: "search and replace",
	codebase_search: "codebase search",
	respond_to_question: "answer questions", // ADD THIS LINE
} as const
```

### 3. Tool Description Generator (`src/core/prompts/tools/respond-to-question.ts`)

**Create new file:**

```typescript
export function getRespondToQuestionDescription(): string {
	return `## respond_to_question
Description: Provide a direct and relevant response to the user's question. This tool should be used when the user asks a direct question that requires analysis, explanation, or detailed information. The response will be presented to the user for acknowledgment before proceeding with any further actions.
Parameters:
- question: (required) The user's question that needs to be answered
- response: (required) A comprehensive, well-structured answer to the question
- reasoning: (optional) The reasoning process or methodology used to arrive at the answer
Usage:
<respond_to_question>
<question>What is the difference between async and sync functions in JavaScript?</question>
<response>
Async and sync functions in JavaScript differ in how they handle operations:

**Synchronous Functions:**
- Execute line by line in sequence
- Block execution until completion
- Return values directly
- Example: \`function add(a, b) { return a + b; }\`

**Asynchronous Functions:**
- Allow non-blocking execution
- Return promises
- Use async/await or .then() for handling results
- Example: \`async function fetchData() { return await fetch('/api'); }\`

Key differences:
1. **Blocking**: Sync blocks, async doesn't
2. **Return type**: Sync returns values, async returns promises
3. **Error handling**: Sync uses try/catch, async uses try/catch with await or .catch()
</response>
<reasoning>
I structured this answer by first defining each type, then providing examples, and finally highlighting the key differences. This approach helps users understand both the concepts and practical applications.
</reasoning>
</respond_to_question>

Example: Responding to a technical question
<respond_to_question>
<question>How does React's useEffect hook work?</question>
<response>
React's useEffect hook manages side effects in functional components:

**Basic Syntax:**
\`\`\`javascript
useEffect(() => {
  // Side effect code
}, [dependencies]);
\`\`\`

**Key Concepts:**
1. **Effect function**: First argument containing the side effect
2. **Dependency array**: Second argument controlling when effect runs
3. **Cleanup function**: Optional return from effect function

**Common Patterns:**
- Empty dependency array []: Runs once on mount
- No dependency array: Runs on every render
- With dependencies [value]: Runs when dependencies change
</response>
</respond_to_question>`
}
```

### 4. Tool Registration (`src/core/prompts/tools/index.ts`)

**Line 22 - Add import:**

```typescript
import { getRespondToQuestionDescription } from "./respond-to-question"
```

**Line 27 - Add to `toolDescriptionMap`:**

```typescript
const toolDescriptionMap: Record<string, (args: ToolArgs) => string | undefined> = {
	execute_command: (args) => getExecuteCommandDescription(args),
	read_file: (args) => getReadFileDescription(args),
	fetch_instructions: () => getFetchInstructionsDescription(),
	write_to_file: (args) => getWriteToFileDescription(args),
	search_files: (args) => getSearchFilesDescription(args),
	list_files: (args) => getListFilesDescription(args),
	list_code_definition_names: (args) => getListCodeDefinitionNamesDescription(args),
	browser_action: (args) => getBrowserActionDescription(args),
	// ask_followup_question: () => getAskFollowupQuestionDescription(),
	attempt_completion: () => getAttemptCompletionDescription(),
	use_mcp_tool: (args) => getUseMcpToolDescription(args),
	access_mcp_resource: (args) => getAccessMcpResourceDescription(args),
	codebase_search: () => getCodebaseSearchDescription(),
	// switch_mode: () => getSwitchModeDescription(),
	// new_task: (args) => getNewTaskDescription(args),
	insert_content: (args) => getInsertContentDescription(args),
	search_and_replace: (args) => getSearchAndReplaceDescription(args),
	respond_to_question: () => getRespondToQuestionDescription(), // ADD THIS LINE
	apply_diff: (args) =>
		args.diffStrategy ? args.diffStrategy.getToolDescription({ cwd: args.cwd, toolOptions: args.toolOptions }) : "",
}
```

**Line 121 - Add to exports:**

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
	getRespondToQuestionDescription, // ADD THIS LINE
}
```

### 5. Tool Implementation (`src/core/tools/respondToQuestionTool.ts`)

**Create new file:**

```typescript
import { Task } from "../task/Task"
import { formatResponse } from "../prompts/responses"
import { ToolUse, AskApproval, HandleError, PushToolResult, RemoveClosingTag } from "../../shared/tools"

export async function respondToQuestionTool(
	cline: Task,
	toolUse: ToolUse,
	askApproval: AskApproval,
	handleError: HandleError,
	pushToolResult: PushToolResult,
	removeClosingTag: RemoveClosingTag,
): Promise<void> {
	const { question, response, reasoning } = toolUse.params

	if (!question) {
		await cline.sayAndCreateMissingParamError("respond_to_question", "question")
		return
	}

	if (!response) {
		await cline.sayAndCreateMissingParamError("respond_to_question", "response")
		return
	}

	try {
		// Ensure response follows markdown formatting requirements from system prompt
		// ALL responses MUST show ANY language construct OR filename reference as clickable
		// Format: [`filename OR language.declaration()`](relative/file/path.ext:line)
		let formattedResponse = response

		// Validate and enhance markdown formatting
		// Ensure proper markdown structure with headers, code blocks, and clickable references
		if (!formattedResponse.includes("**") && !formattedResponse.includes("#")) {
			// Add basic structure if missing
			formattedResponse = `## Answer\n\n${formattedResponse}`
		}

		// Present the structured response to the user
		await cline.say("text", formattedResponse)

		// Add reasoning if provided, formatted as markdown
		if (reasoning) {
			const formattedReasoning = `## Reasoning\n\n${reasoning}`
			await cline.say("text", formattedReasoning)
		}

		// Check for pause after productive operation
		await cline.checkForPauseAfterProductiveOperation("respond_to_question")

		// Provide tool result
		pushToolResult(
			formatResponse.toolResult(`Successfully provided structured markdown answer to question: "${question}"`),
		)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		await handleError("respond_to_question", new Error(`Failed to respond to question: ${errorMessage}`))
	}
}
```

### 6. Tool Execution Integration

**File: `src/core/task/Task.ts`**

**Find the tool execution switch statement and add:**

```typescript
case "respond_to_question":
	await respondToQuestionTool(this, toolUse, askApproval, handleError, pushToolResult, removeClosingTag)
	break
```

**Add import at top of file:**

```typescript
import { respondToQuestionTool } from "../tools/respondToQuestionTool"
```

### 7. Tool Validation (`src/core/tools/validateToolUse.ts`)

**Add validation case:**

```typescript
case "respond_to_question":
	if (!toolUse.params.question) {
		return "Question parameter is required"
	}
	if (!toolUse.params.response) {
		return "Response parameter is required"
	}
	return null
```

## Implementation Steps

1. **Schema Updates**: Update `src/schemas/index.ts` to add tool name to `toolNames` array
2. **Tool Interface**: Add `RespondToQuestionToolUse` interface and update tool arrays in `src/shared/tools.ts`
3. **Description Generator**: Create `src/core/prompts/tools/respond-to-question.ts`
4. **Tool Registration**: Update `src/core/prompts/tools/index.ts` to register the new tool
5. **Tool Implementation**: Create `src/core/tools/respondToQuestionTool.ts`
6. **Task Integration**: Update `src/core/task/Task.ts` to handle the new tool
7. **Validation**: Update `src/core/tools/validateToolUse.ts` for parameter validation

## Testing Considerations

1. **Unit Tests**: Create tests for the tool implementation
2. **Integration Tests**: Test pause-after-productive-operation functionality
3. **Parameter Validation**: Test required/optional parameter handling
4. **Error Handling**: Test error scenarios and user feedback

## Expected Behavior

1. User asks a question through the AI interface
2. AI uses `respond_to_question` tool to provide structured answer
3. Response is displayed to user with question, answer, and optional reasoning
4. If pause-after-productive-operation is enabled, user must acknowledge before continuing
5. Tool result confirms successful response delivery

## Commit Strategy

1. **Commit 1**: Add schema definitions and tool interface
2. **Commit 2**: Create tool description generator and registration
3. **Commit 3**: Implement tool logic and task integration
4. **Commit 4**: Add validation and error handling
5. **Commit 5**: Add comprehensive tests

Each commit should include detailed forensic evidence of changes and intentions for future AI sessions.
