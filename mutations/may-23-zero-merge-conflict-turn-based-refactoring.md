# Zero-Merge-Conflict Turn-Based Refactoring

**Date**: May 23, 2025  
**Objective**: Refactor the task loop to eliminate AI autonomy while minimizing future merge conflicts  
**Approach**: External interceptor pattern with permission-based tool classification

## Problem Statement

The current task loop in [`src/core/task/Task.ts`](../src/core/task/Task.ts) operates autonomously:

- Line 1005: `while (!this.abort)` continuous loop in [`initiateTaskLoop()`](../src/core/task/Task.ts:996)
- Line 1401: Recursive call in [`recursivelyMakeClineRequests()`](../src/core/task/Task.ts:1031)
- AI executes multiple tools without user approval
- No user control over individual actions

## Requirements

1. **Zero AI Autonomy**: No action without explicit user approval
2. **Zero Merge Conflicts**: No changes to existing [`Task.ts`](../src/core/task/Task.ts)
3. **Sequential Read-Only**: Allow safe read operations to execute in sequence
4. **Approval for Writes**: Require approval for any write/execute operations

## Solution Architecture

### External Interceptor Pattern

- Wrap existing [`Task`](../src/core/task/Task.ts:114) class without modifying it
- Intercept method calls using function replacement
- Add approval gates before dangerous operations
- Classify tools by permission level

## Required preparatory reading:

To implement the changes in [`mutations/may-23-zero-merge-conflict-turn-based-refactoring.md`](mutations/may-23-zero-merge-conflict-turn-based-refactoring.md), an LLM would need to read the following code analysis output files for the most relevant existing modules:

1.  **`src/core/task/Task.ts`**:

    - API Contract: [`src/scripts/dev-support-scripts/api_contracts/src_core_task_Task_contracts.json`](src/scripts/dev-support-scripts/api_contracts/src_core_task_Task_contracts.json:1)
    - Dependency Graph: [`src/scripts/dev-support-scripts/dependency_graph/src_core_task_Task_dependencies.json`](src/scripts/dev-support-scripts/dependency_graph/src_core_task_Task_dependencies.json:1)

2.  **`src/core/assistant-message/presentAssistantMessage.ts`**:

    - API Contract: [`src/scripts/dev-support-scripts/api_contracts/src_core_assistant-message_presentAssistantMessage_contracts.json`](src/scripts/dev-support-scripts/api_contracts/src_core_assistant-message_presentAssistantMessage_contracts.json:1)
    - Dependency Graph: [`src/scripts/dev-support-scripts/dependency_graph/src_core_assistant-message_presentAssistantMessage_dependencies.json`](src/scripts/dev-support-scripts/dependency_graph/src_core_assistant-message_presentAssistantMessage_dependencies.json:1)

3.  **`src/core/webview/ClineProvider.ts`**:

    - API Contract: `src/scripts/dev-support-scripts/api_contracts/src_core_webview_ClineProvider_contracts.json`
    - Dependency Graph: `src/scripts/dev-support-scripts/dependency_graph/src_core_webview_ClineProvider_dependencies.json`

4.  **`src/schemas/index.ts`**:
    - API Contract: [`src/scripts/dev-support-scripts/api_contracts/src_schemas_index_contracts.json`](src/scripts/dev-support-scripts/api_contracts/src_schemas_index_contracts.json:1)
    - Dependency Graph: [`src/scripts/dev-support-scripts/dependency_graph/src_schemas_index_dependencies.json`](src/scripts/dev-support-scripts/dependency_graph/src_schemas_index_dependencies.json:1)

## Implementation Steps

### Step 1: Create Tool Permission System

Create [`src/core/task/ToolPermissions.ts`](../src/core/task/ToolPermissions.ts):

```typescript
export enum ToolPermission {
	READ_ONLY = "read_only",
	WRITE = "write",
	EXECUTE = "execute",
}

export const TOOL_PERMISSIONS: Record<string, ToolPermission> = {
	// Read-only tools (can execute sequentially)
	read_file: ToolPermission.READ_ONLY,
	list_files: ToolPermission.READ_ONLY,
	list_code_definition_names: ToolPermission.READ_ONLY,
	search_files: ToolPermission.READ_ONLY,
	access_mcp_resource: ToolPermission.READ_ONLY,

	// Write tools (require approval)
	write_to_file: ToolPermission.WRITE,
	apply_diff: ToolPermission.WRITE,
	insert_content: ToolPermission.WRITE,
	search_and_replace: ToolPermission.WRITE,

	// Execute tools (require approval)
	execute_command: ToolPermission.EXECUTE,
	browser_action: ToolPermission.EXECUTE,
	use_mcp_tool: ToolPermission.EXECUTE,

	// Special tools (require approval)
	attempt_completion: ToolPermission.WRITE,
	ask_followup_question: ToolPermission.WRITE,
	switch_mode: ToolPermission.WRITE,
	new_task: ToolPermission.WRITE,
}

export function getToolPermission(toolName: string): ToolPermission {
	return TOOL_PERMISSIONS[toolName] ?? ToolPermission.WRITE
}

export function isReadOnlyTool(toolName: string): boolean {
	return getToolPermission(toolName) === ToolPermission.READ_ONLY
}

export function requiresApproval(toolName: string): boolean {
	return getToolPermission(toolName) !== ToolPermission.READ_ONLY
}
```

### Step 2: Create Task Interceptor

Create [`src/core/task/TaskInterceptor.ts`](../src/core/task/TaskInterceptor.ts):

```typescript
import { Task } from "./Task"
import { presentAssistantMessage } from "../assistant-message"
import { ToolPermission, getToolPermission, isReadOnlyTool, requiresApproval } from "./ToolPermissions"
import { AssistantMessageContent } from "../assistant-message"

interface ToolCall {
	name: string
	params: Record<string, any>
	id?: string
}

export class TaskInterceptor {
	private originalTask: Task
	private approvalRequired: boolean = true
	private allowSequentialReads: boolean = true
	private originalPresentAssistantMessage: typeof presentAssistantMessage

	constructor(task: Task, options: { requireApproval?: boolean; allowSequentialReads?: boolean } = {}) {
		this.originalTask = task
		this.approvalRequired = options.requireApproval ?? true
		this.allowSequentialReads = options.allowSequentialReads ?? true
		this.originalPresentAssistantMessage = presentAssistantMessage

		if (this.approvalRequired) {
			this.wrapTaskMethods()
		}
	}

	private wrapTaskMethods(): void {
		// Intercept API calls
		const originalAttemptApiRequest = this.originalTask.attemptApiRequest.bind(this.originalTask)
		this.originalTask.attemptApiRequest = async (...args) => {
			if (this.approvalRequired) {
				const approved = await this.requestApiApproval()
				if (!approved) {
					return this.createEmptyStream()
				}
			}
			return originalAttemptApiRequest(...args)
		}

		// Intercept recursive loop continuation
		const originalRecursivelyMakeClineRequests = this.originalTask.recursivelyMakeClineRequests.bind(
			this.originalTask,
		)
		this.originalTask.recursivelyMakeClineRequests = async (userContent, includeFileDetails) => {
			const result = await originalRecursivelyMakeClineRequests(userContent, includeFileDetails)

			if (this.approvalRequired) {
				// Check if the last response contained only read-only tools
				const lastResponse = this.originalTask.assistantMessageContent
				const toolCalls = this.extractToolCalls(lastResponse)
				const hasWriteTools = toolCalls.some((tool) => requiresApproval(tool.name))

				if (hasWriteTools || toolCalls.length === 0) {
					// Had write tools or no tools - pause for user directive
					await this.waitForNextDirective()
					return true // End the loop
				} else {
					// Only read-only tools - allow continuation for potential follow-up
					return false
				}
			}

			return result
		}

		// Replace global presentAssistantMessage function
		const self = this
		presentAssistantMessage = async function (task: Task) {
			if (task === self.originalTask && self.approvalRequired) {
				return self.gatedPresentAssistantMessage(task)
			}
			return self.originalPresentAssistantMessage(task)
		}
	}

	private async requestApiApproval(): Promise<boolean> {
		const { response } = await this.originalTask.ask(
			"api_approval_required" as any,
			"AI wants to process your request. Approve API call?",
		)
		return response === "yesButtonClicked"
	}

	private async gatedPresentAssistantMessage(task: Task): Promise<void> {
		const toolCalls = this.extractToolCalls(task.assistantMessageContent)

		if (toolCalls.length === 0) {
			// No tools, proceed normally - but still wait for next directive
			await this.originalPresentAssistantMessage(task)
			await this.waitForNextDirective()
			return
		}

		// Separate read-only from write tools
		const readOnlyTools = toolCalls.filter((tool) => isReadOnlyTool(tool.name))
		const writeTools = toolCalls.filter((tool) => requiresApproval(tool.name))

		if (readOnlyTools.length > 0 && writeTools.length === 0 && this.allowSequentialReads) {
			// All read-only tools - execute sequentially without approval
			await this.executeReadOnlyToolsSequentially(readOnlyTools)
		} else if (writeTools.length > 0) {
			// Has write tools - present full plan for approval including proposed mutations
			await this.presentPlanForApproval(toolCalls)
		} else {
			// Fallback to original behavior
			return this.originalPresentAssistantMessage(task)
		}
	}

	private async executeReadOnlyToolsSequentially(tools: ToolCall[]): Promise<void> {
		await this.originalTask.say("info", `Executing ${tools.length} read-only operations sequentially...`)

		for (const tool of tools) {
			await this.originalTask.say(
				"tool_execution",
				`Reading: ${tool.name}(${Object.keys(tool.params).join(", ")})`,
				undefined,
				true,
			)

			try {
				const result = await this.executeSingleTool(tool)
				await this.originalTask.say("tool_execution", `✓ ${tool.name} completed`, undefined, false)

				// Add tool result to conversation
				this.originalTask.userMessageContent.push({
					type: "text",
					text: `[${tool.name} Result]\n\n${result}`,
				})
			} catch (error) {
				await this.originalTask.say("error", `Failed to execute ${tool.name}: ${error.message}`)
				this.originalTask.userMessageContent.push({
					type: "text",
					text: `[${tool.name} Error]\n\n${error.message}`,
				})
			}
		}

		// Report completion and wait for next directive
		await this.originalTask.say("completion_result", "Done.")
		await this.waitForNextDirective()
	}

	private async presentPlanForApproval(tools: ToolCall[]): Promise<void> {
		// Build plan description showing all proposed actions
		const readOnlyTools = tools.filter((tool) => isReadOnlyTool(tool.name))
		const writeTools = tools.filter((tool) => requiresApproval(tool.name))

		let planDescription = "AI proposes the following plan:\n\n"

		if (readOnlyTools.length > 0) {
			planDescription += "**Read Operations (will execute automatically):**\n"
			readOnlyTools.forEach((tool) => {
				planDescription += `- ${tool.name}: ${JSON.stringify(tool.params)}\n`
			})
			planDescription += "\n"
		}

		if (writeTools.length > 0) {
			planDescription += "**Write/Execute Operations (require approval):**\n"
			writeTools.forEach((tool) => {
				planDescription += `- ${tool.name}: ${JSON.stringify(tool.params)}\n`
			})
			planDescription += "\n"
		}

		planDescription += "Approve this plan?"

		const { response } = await this.originalTask.ask("tool_approval_required" as any, planDescription)

		if (response === "yesButtonClicked") {
			// Execute all tools in sequence
			for (const tool of tools) {
				try {
					const result = await this.executeSingleTool(tool)
					this.originalTask.userMessageContent.push({
						type: "text",
						text: `[${tool.name} Result]\n\n${result}`,
					})
				} catch (error) {
					this.originalTask.userMessageContent.push({
						type: "text",
						text: `[${tool.name} Error]\n\n${error.message}`,
					})
				}
			}
			await this.originalTask.say("completion_result", "Plan executed. Done.")
		} else {
			// User rejected the plan
			this.originalTask.userMessageContent.push({
				type: "text",
				text: "[Plan rejected by user]",
			})
			await this.originalTask.say("completion_result", "Plan rejected. Done.")
		}

		await this.waitForNextDirective()
	}

	private async requestToolApproval(tool: ToolCall, permission: ToolPermission): Promise<boolean> {
		const permissionText = permission === ToolPermission.EXECUTE ? "EXECUTE" : "WRITE"
		const paramsText =
			Object.keys(tool.params).length > 0 ? `\nParameters: ${JSON.stringify(tool.params, null, 2)}` : ""

		const { response } = await this.originalTask.ask(
			"tool_approval_required" as any,
			`AI wants to ${permissionText}: ${tool.name}${paramsText}\n\nApprove this action?`,
		)
		return response === "yesButtonClicked"
	}

	private async waitForNextDirective(): Promise<void> {
		const { response, text } = await this.originalTask.ask(
			"next_directive_required" as any,
			"Task paused. What's your next directive?",
		)

		if (response === "messageResponse" && text) {
			// Process the new directive
			const userContent = [{ type: "text", text }]
			await this.originalTask.recursivelyMakeClineRequests(userContent, false)
		}
	}

	private extractToolCalls(content: AssistantMessageContent[]): ToolCall[] {
		return content
			.filter((block) => block.type === "tool_use")
			.map((block) => ({
				name: block.name,
				params: block.input || {},
				id: block.id,
			}))
	}

	private async executeSingleTool(tool: ToolCall): Promise<string> {
		// This would need to be implemented to execute individual tools
		// For now, return a placeholder
		return `Tool ${tool.name} executed with params: ${JSON.stringify(tool.params)}`
	}

	private createEmptyStream(): AsyncGenerator<any, void, unknown> {
		return (async function* () {
			// Empty stream when API call is rejected
		})()
	}
}
```

### Step 3: Create Task Factory

Create [`src/core/task/TaskFactory.ts`](../src/core/task/TaskFactory.ts):

```typescript
import { Task, TaskOptions } from "./Task"
import { TaskInterceptor } from "./TaskInterceptor"

export class TaskFactory {
	static create(options: TaskOptions): Task {
		const originalTask = new Task(options)

		// Check if approval mode is enabled
		const requireApproval = options.experiments?.requireApproval ?? false
		const allowSequentialReads = options.experiments?.allowSequentialReads ?? true

		if (requireApproval) {
			// Return intercepted task (cast to Task interface)
			new TaskInterceptor(originalTask, { requireApproval, allowSequentialReads })
			return originalTask // The interceptor modifies the original task in place
		}

		return originalTask
	}
}
```

### Step 4: Update Task Options Type

Modify [`src/core/task/Task.ts`](../src/core/task/Task.ts) - **ONLY** the type definition (lines 96-112):

```typescript
export type TaskOptions = {
	provider: ClineProvider
	apiConfiguration: ProviderSettings
	enableDiff?: boolean
	enableCheckpoints?: boolean
	fuzzyMatchThreshold?: number
	consecutiveMistakeLimit?: number
	task?: string
	images?: string[]
	historyItem?: HistoryItem
	experiments?: Record<string, boolean> & {
		requireApproval?: boolean // Enable approval mode
		allowSequentialReads?: boolean // Allow read-only tools to execute sequentially
	}
	startTask?: boolean
	rootTask?: Task
	parentTask?: Task
	taskNumber?: number
	onCreated?: (cline: Task) => void
}
```

### Step 5: Update ClineProvider Integration

Modify [`src/core/webview/ClineProvider.ts`](../src/core/webview/ClineProvider.ts) - **SINGLE LINE CHANGE**:

Find the Task instantiation (likely around line 200-300) and change:

```typescript
// FROM:
const task = new Task(options)

// TO:
import { TaskFactory } from "../task/TaskFactory"
const task = TaskFactory.create(options)
```

### Step 6: Add New Ask Types

Add to [`src/shared/ExtensionMessage.ts`](../src/shared/ExtensionMessage.ts) in the `ClineAsk` type:

```typescript
export type ClineAsk =
	| "followup"
	| "command"
	| "completion_result"
	| "tool"
	| "api_req_failed"
	| "api_req_retried"
	| "resume_task"
	| "resume_completed_task"
	| "mistake_limit_reached"
	| "api_approval_required" // New
	| "tool_approval_required" // New
	| "next_directive_required" // New
```

### Step 7: Update WebView Message Handler

Add handlers in [`src/core/webview/webviewMessageHandler.ts`](../src/core/webview/webviewMessageHandler.ts):

```typescript
// Add to the message handler switch statement
case "toggleApprovalMode": {
  const currentState = await getGlobalState()
  const newState = {
    ...currentState,
    experiments: {
      ...currentState.experiments,
      requireApproval: !currentState.experiments?.requireApproval
    }
  }
  await updateGlobalState(newState)
  await provider.postStateToWebview()
  break
}
```

## Usage Examples

### Example 1: Read-Only Sequential Execution

**User Input**: `"Read files config.json, package.json, and README.md"`

**Execution Flow**:

1. User provides directive
2. AI responds with 3 `read_file` tool calls
3. System detects all read-only tools
4. Executes sequentially: config.json → package.json → README.md
5. System reports "Done."
6. System waits for next directive

### Example 2: Mixed Operations

**User Input**: `"Read config.json then update the version number"`

**Execution Flow**:

1. User provides directive
2. AI responds with `read_file` + request to use `write_to_file` tool, presenting mutations proposed to user
3. If user approves, system executes `read_file`
4. If approved → executes write operation
5. System waits for next directive

### Example 3: Write Operations

**User Input**: `"Create a new React component"`

**Execution Flow**:

1. User provides directive
2. AI responds with `write_to_file` tool
3. System asks: "AI wants to WRITE: write_to_file. Approve?"
4. If approved → executes file creation
5. System waits for next directive

## Configuration

Enable approval mode in settings:

```json
{
	"experiments": {
		"requireApproval": true,
		"allowSequentialReads": true
	}
}
```

## Benefits

### Zero Merge Conflicts

- No changes to existing [`Task.ts`](../src/core/task/Task.ts) logic
- All new code in separate files
- Interceptor pattern preserves original behavior
- Can be completely disabled/removed

### User Control

- Explicit approval for all write/execute operations
- Automatic execution of safe read operations
- Clear distinction between safe and dangerous actions
- Ability to reject individual tools

### Backward Compatibility

- Existing behavior unchanged when disabled
- All existing tests continue to work
- No breaking changes to interfaces
- Future Task updates automatically supported

## Testing Strategy

### Unit Tests

- Test tool permission classification
- Test interceptor approval flows
- Test sequential read execution
- Test approval rejection handling

### Integration Tests

- Test with approval mode enabled/disabled
- Test mixed read/write operations
- Test user rejection scenarios
- Test error handling in sequential reads

### Manual Testing

- Verify no autonomous actions occur
- Verify read operations execute sequentially
- Verify write operations require approval
- Verify system waits for user directives

## Rollback Plan

To completely remove this feature:

1. Delete [`src/core/task/ToolPermissions.ts`](../src/core/task/ToolPermissions.ts)
2. Delete [`src/core/task/TaskInterceptor.ts`](../src/core/task/TaskInterceptor.ts)
3. Delete [`src/core/task/TaskFactory.ts`](../src/core/task/TaskFactory.ts)
4. Revert ClineProvider to use `new Task()` directly
5. Remove experiment flags from TaskOptions

The system will return to exactly the original behavior with zero residual changes.

## Future Enhancements

### Custom Tool Permissions

Allow users to override default tool classifications:

```json
{
	"experiments": {
		"requireApproval": true,
		"customToolPermissions": {
			"search_files": "write", // Treat as requiring approval
			"list_files": "write" // More restrictive
		}
	}
}
```

### Batch Approval

Allow approving multiple tools at once:

- "Approve all read operations"
- "Approve this entire plan"
- "Execute next 3 steps"

### Approval Presets

Pre-approved tool combinations:

- "Auto-approve file analysis workflows"
- "Auto-approve documentation updates"
- "Require approval for all system changes"

This refactoring achieves zero AI autonomy while maintaining perfect compatibility with future upstream changes, ensuring zero merge conflicts.
