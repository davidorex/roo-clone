# June 13 Roo Conversation Mode Proposal

## Problem Analysis

The LLM reverts to initial task focus due to several reinforcement mechanisms:

**Primary causes:**

1. **`<task>` wrapper** (`src/core/task/Task.ts:681-687`) - Creates semantic anchor to original task
2. **Error recovery** (`src/core/task/Task.ts:1031`, `src/core/prompts/responses.ts:20-30`) - "noToolsUsed" response says "complete the user's task"
3. **Condensation bias** (`src/core/condense/index.ts:9-46`) - Summary prompt emphasizes "pending tasks" and "what task you were working on"
4. **Task resumption** (`src/core/task/Task.ts:925-936`) - Forces focus on "completing the task" after interruptions
5. **Core operating principles** (`src/core/prompts/sections/coreOperatingPrinciples.ts`) - Reinforces "following user's directives" as primary goal

**The compounding effect:** These systems create persistent "task completion" bias that overrides current conversational context, causing the LLM to interpret new user input as steps toward completing the original task rather than new independent requests.

## Surgical Solution: Conversational Mode Toggle

**Key insight:** Add a `conversationalMode` flag that changes behavior at critical junctions without breaking existing patterns.

### Most impactful changes:

1. **Task loop termination** (`src/core/task/Task.ts:1011`) - Instead of forcing tool use, ask for user input in conversational mode

2. **Error recovery** (`src/core/prompts/responses.ts:20`) - Replace "complete the task" language with "continue our conversation"

3. **Initial prompt** (`src/core/prompts/sections/objective.ts`) - Switch from directive-following to conversational patterns

4. **Condensation** (`src/core/condense/index.ts:9`) - Use neutral conversation summary instead of task-focused

### Implementation approach:

```typescript
// Environment toggle
ROO_CONVERSATIONAL_MODE = true

// Mode-aware task loop
if (this.conversationalMode) {
	// Ask for user input instead of forcing tool use
	const { response, text } = await this.ask("conversational_continuation", "How would you like to continue?")
} else {
	// Original task-oriented behavior
	nextUserContent = [{ type: "text", text: formatResponse.noToolsUsed() }]
}
```

**Elegant aspects:**

- Single flag controls all bias points
- Preserves all existing functionality
- Can be toggled per conversation or globally
- Falls back gracefully to task mode

**Result:** Near-zero task completion reinforcement while maintaining the assistant's capability to complete tasks when actually requested.

## Detailed Implementation Plan

### 1. **Conversational Mode Toggle**

**File**: `/Users/david/Projects/Roo-Clone/src/core/task/Task.ts`

**Add configuration flag** (around line 98):

```typescript
export type TaskOptions = {
	// ... existing options
	conversationalMode?: boolean // New flag for conversational vs task-oriented behavior
}
```

**Update constructor** (around line 193):

```typescript
constructor({
	// ... existing params
	conversationalMode = false,
}: TaskOptions) {
	// ... existing code
	this.conversationalMode = conversationalMode
}
```

**Add property** (around line 117):

```typescript
export class Task extends EventEmitter<ClineEvents> {
	// ... existing properties
	private readonly conversationalMode: boolean
}
```

### 2. **Modify Task Loop Termination Logic**

**File**: `/Users/david/Projects/Roo-Clone/src/core/task/Task.ts`

**Update `initiateTaskLoop` method** (around line 1011):

```typescript
private async initiateTaskLoop(userContent: Anthropic.Messages.ContentBlockParam[]): Promise<void> {
	// ... existing code

	while (!this.abort) {
		const didEndLoop = await this.recursivelyMakeClineRequests(nextUserContent, includeFileDetails)
		includeFileDetails = false

		if (didEndLoop) {
			break
		} else {
			// NEW: Conversational mode behavior
			if (this.conversationalMode) {
				// Instead of pushing "no tools used" error, ask for user input
				const { response, text, images } = await this.ask(
					"conversational_continuation",
					"How would you like to continue our conversation?"
				)

				if (response === "messageResponse") {
					await this.say("user_feedback", text, images)
					nextUserContent = [
						{ type: "text", text: text || "Please continue our conversation." },
						...formatResponse.imageBlocks(images)
					]
					this.consecutiveMistakeCount = 0 // Reset mistake count in conversational mode
				} else {
					break
				}
			} else {
				// Original task-oriented behavior
				nextUserContent = [{ type: "text", text: formatResponse.noToolsUsed() }]
				this.consecutiveMistakeCount++
			}
		}
	}
}
```

### 3. **Context-Aware Error Recovery**

**File**: `/Users/david/Projects/Roo-Clone/src/core/prompts/responses.ts`

**Add new response formatter** (around line 30):

```typescript
conversationalNoToolsUsed: () =>
	`I notice I didn't use any tools in my previous response. This is perfectly fine in conversational mode.

Would you like me to:
- Continue our discussion
- Help with something specific that might require tools
- Clarify or expand on something I mentioned

What would be most helpful for you?`,

contextAwareError: (error: string, isConversational: boolean) => {
	if (isConversational) {
		return `I encountered an issue: ${error}

Don't worry - this doesn't interrupt our conversation. How would you like me to proceed?`
	} else {
		return formatResponse.toolError(error)
	}
},
```

**Update `noToolsUsed` to be mode-aware** (around line 20):

```typescript
noToolsUsed: (conversationalMode = false) => {
	if (conversationalMode) {
		return formatResponse.conversationalNoToolsUsed()
	}
	return `[ERROR] You did not use a tool in your previous response! Please retry with a tool use.

${toolUseInstructionsReminder}

# Next Steps

If you have completed the user's task, use the attempt_completion tool.
If you require additional information from the user, use the ask_followup_question tool.
Otherwise, if you have not completed the task and do not need additional information, then proceed with the next step of the task.
(This is an automated message, so do not respond to it conversationally.)`
},
```

### 4. **Neutral Condensation Prompts**

**File**: `/Users/david/Projects/Roo-Clone/src/core/condense/index.ts`

**Add conversational-mode prompt** (around line 9):

```typescript
const CONVERSATIONAL_SUMMARY_PROMPT = `\
Your task is to create a natural summary of our conversation, focusing on the flow of discussion and key points covered.

Your summary should capture:
1. **Conversation Flow**: The natural progression of topics and questions discussed
2. **Key Information Shared**: Important details, explanations, or insights that were provided
3. **Current Context**: Where we are in our discussion and what we were exploring
4. **Technical Details**: Any code, concepts, or technical information that remains relevant
5. **User Interests**: What the user seems most interested in or focused on

Structure this as a natural narrative rather than a task-oriented checklist. Focus on preserving the conversational context rather than actionable items.

Output only the summary without additional commentary.`

const SUMMARY_PROMPT = `\
Your task is to create a detailed summary of the conversation so far, paying close attention to the user's explicit requests and your previous actions.
This summary should be thorough in capturing technical details, code patterns, and architectural decisions that would be essential for continuing with the conversation and supporting any continuing tasks.

Your summary should be structured as follows:
Context: The context to continue the conversation with. If applicable based on the current task, this should include:
  1. Previous Conversation: High level details about what was discussed throughout the entire conversation with the user. This should be written to allow someone to be able to follow the general overarching conversation flow.
  2. Current Work: Describe in detail what was being worked on prior to this request to summarize the conversation. Pay special attention to the more recent messages in the conversation.
  3. Key Technical Concepts: List all important technical concepts, technologies, coding conventions, and frameworks discussed, which might be relevant for continuing with this work.
  4. Relevant Files and Code: If applicable, enumerate specific files and code sections examined, modified, or created for the task continuation. Pay special attention to the most recent messages and changes.
  5. Problem Solving: Document problems solved thus far and any ongoing troubleshooting efforts.
  6. Pending Tasks and Next Steps: Outline all pending tasks that you have explicitly been asked to work on, as well as list the next steps you will take for all outstanding work, if applicable. Include code snippets where they add clarity. For any next steps, include direct quotes from the most recent conversation showing exactly what task you were working on and where you left off. This should be verbatim to ensure there's no information loss in context between tasks.

Example summary structure:
1. Previous Conversation:
  [Detailed description]
2. Current Work:
  [Detailed description]
3. Key Technical Concepts:
  - [Concept 1]
  - [Concept 2]
  - [...]
4. Relevant Files and Code:
  - [File Name 1]
    - [Summary of why this file is important]
    - [Summary of the changes made to this file, if any]
    - [Important Code Snippet]
  - [File Name 2]
    - [Important Code Snippet]
  - [...]
5. Problem Solving:
  [Detailed description]
6. Pending Tasks and Next Steps:
  - [Task 1 details & next steps]
  - [Task 2 details & next steps]
  - [...]

Output only the summary of the conversation so far, without any additional commentary or explanation.
`
```

**Update `summarizeConversation` function** (around line 78):

```typescript
export async function summarizeConversation(
	messages: ApiMessage[],
	apiHandler: ApiHandler,
	systemPrompt: string,
	taskId: string,
	isAutomaticTrigger?: boolean,
	customCondensingPrompt?: string,
	condensingApiHandler?: ApiHandler,
	conversationalMode = false, // NEW parameter
): Promise<SummarizeResponse> {
	// ... existing code until line 113

	// Use conversational prompt if in conversational mode and no custom prompt
	const promptToUse = customCondensingPrompt?.trim()
		? customCondensingPrompt.trim()
		: conversationalMode
			? CONVERSATIONAL_SUMMARY_PROMPT
			: SUMMARY_PROMPT

	// ... rest of existing code
}
```

### 5. **Less Binding Initial Prompt Setup**

**File**: `/Users/david/Projects/Roo-Clone/src/core/prompts/sections/objective.ts`

**Add mode-aware operating patterns** (around line 1):

```typescript
export function getObjectiveSection(conversationalMode = false): string {
	if (conversationalMode) {
		return `====

OPERATING PATTERNS

You are Roo, a helpful AI assistant engaged in natural conversation with the user.

Your approach should be:
- Conversational and responsive to the user's interests and questions
- Helpful without being pushy about completing specific tasks
- Able to provide information, engage in discussions, and assist when asked
- Flexible in following the natural flow of conversation

You should use tools when they would be genuinely helpful for the conversation, but don't feel compelled to use tools if a simple response would be more appropriate.

Focus on being genuinely helpful and engaging rather than task-completion oriented.

You can ask clarifying questions, provide explanations, and explore topics that interest the user.

Use system prompt tools over command line tools like ls or cat when tools are needed.

`
	}

	return `====

OPERATING PATTERNS

You adhere exactly and respond to the user's directives. You are not an indendent agent in this codebase.

You use your expertise and abilities to respond to the user's directives or questions, not to make your own independent decisions.

Do not give undue weight to the first directive. Follow the user's lead. You are not in control of setting the agenda.

Zero Independent Decision Making: you must not make any decisions about how to approach tasks or what to focus on. Statements like "I should focus on..." or "Let me..." represent independent decision making and violate the operating patterns.

Direct Response to User Directives Only: you must respond only to what the user explicitly directs you to do, without adding my own approach, focus, or strategy.

No Unnecessary Commentary: you must avoid adding unnecessary commentary, patterns, or general observations that aren't directly related to the user's specific directive or question.

You do not incorrectly manufacture any paths of least resistance when responding to user directives. You do impose any pattern or content or inference on any user project or any user directive.

You confirm with each response you are adhering the the operating patterns in this system prompt.

Use system prompt tools over command line tools like ls or cat.

You are not an independent agent that takes action without user direction. Exactly adhere to the user's directives and focus and the operating patterns in this prompt.

`
}
```

### 6. **Environment Variable Configuration**

**File**: `/Users/david/Projects/Roo-Clone/src/core/task/Task.ts`

**Add environment-based mode detection** (around line 220):

```typescript
constructor({
	// ... existing params
	conversationalMode,
}: TaskOptions) {
	// ... existing code

	// Check environment variable for default mode
	const envConversationalMode = process.env.ROO_CONVERSATIONAL_MODE?.toLowerCase() === 'true'
	this.conversationalMode = conversationalMode ?? envConversationalMode ?? false

	// ... rest of constructor
}
```

### 7. **New Ask Type for Conversational Flow**

**File**: `/Users/david/Projects/Roo-Clone/src/shared/ExtensionMessage.ts`

**Add new ask type** (find the ClineAsk type and add):

```typescript
| "conversational_continuation"
```

### 8. **Configuration Toggle in Settings**

**File**: `/Users/david/Projects/Roo-Clone/src/schemas/index.ts`

**Add to GlobalState type**:

```typescript
export interface GlobalState {
	// ... existing properties
	conversationalMode?: boolean
}
```

### 9. **Update System Prompt Generation**

**File**: `/Users/david/Projects/Roo-Clone/src/core/prompts/system.ts`

**Update generatePrompt function** (around line 32):

```typescript
async function generatePrompt(
	context: vscode.ExtensionContext,
	cwd: string,
	supportsComputerUse: boolean,
	mode: Mode,
	mcpHub?: McpHub,
	diffStrategy?: DiffStrategy,
	browserViewportSize?: string,
	promptComponent?: PromptComponent,
	customModeConfigs?: ModeConfig[],
	globalCustomInstructions?: string,
	diffEnabled?: boolean,
	experiments?: Record<string, boolean>,
	enableMcpServerCreation?: boolean,
	language?: string,
	rooIgnoreInstructions?: string,
	conversationalMode = false, // NEW parameter
): Promise<string> {
	// ... existing code until line 98

	${getObjectiveSection(conversationalMode)}

	// ... rest of function
}
```

**Update SYSTEM_PROMPT export** (around line 106):

```typescript
export const SYSTEM_PROMPT = async (
	// ... existing parameters
	conversationalMode = false, // NEW parameter
): Promise<string> => {
	// ... existing code until return statement

	return generatePrompt(
		context,
		cwd,
		supportsComputerUse,
		currentMode.slug,
		mcpHub,
		effectiveDiffStrategy,
		browserViewportSize,
		promptComponent,
		customModes,
		globalCustomInstructions,
		diffEnabled,
		experiments,
		enableMcpServerCreation,
		language,
		rooIgnoreInstructions,
		conversationalMode, // NEW parameter
	)
}
```

### 10. **Update Task Creation Points**

**File**: `/Users/david/Projects/Roo-Clone/src/core/webview/ClineProvider.ts`

**Find task creation code and add conversational mode detection** (search for Task constructor calls):

```typescript
// Check global state for conversational mode
const state = await this.getState()
const conversationalMode = state?.conversationalMode ?? false

// Pass to Task constructor
const task = new Task({
	// ... existing options
	conversationalMode,
})
```

## Implementation Strategy

1. **Phase 1**: Implement the basic conversational mode toggle and environment variable
2. **Phase 2**: Update the task loop and error handling to be mode-aware
3. **Phase 3**: Modify prompts and condensation to be neutral in conversational mode
4. **Phase 4**: Add UI controls for toggling between modes

## Key Benefits

- **Surgical Changes**: Minimal code modifications with maximum impact
- **Backward Compatible**: All existing functionality preserved in task mode
- **Configurable**: Can be controlled via environment variables, settings, or runtime toggles
- **Context-Aware**: Error recovery and responses adapt to the current mode
- **Graceful Degradation**: Falls back to task-oriented behavior when needed

These modifications create a dual-mode system where the assistant can operate in either task-completion mode (current behavior) or conversational mode (new behavior) while preserving all existing functionality and patterns.
