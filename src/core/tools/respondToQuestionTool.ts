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
	const question: string | undefined = toolUse.params.question
	const response: string | undefined = toolUse.params.response
	const reasoning: string | undefined = toolUse.params.reasoning

	// Only validate parameters if this is a complete tool use
	// This allows the LLM to finish typing the tool use without interruption
	if (!toolUse.partial) {
		if (!question) {
			cline.consecutiveMistakeCount++
			cline.recordToolError("respond_to_question")
			pushToolResult(await cline.sayAndCreateMissingParamError("respond_to_question", "question"))
			return
		}

		if (!response) {
			cline.consecutiveMistakeCount++
			cline.recordToolError("respond_to_question")
			pushToolResult(await cline.sayAndCreateMissingParamError("respond_to_question", "response"))
			return
		}
	} else {
		// For partial tool uses, just return without executing
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

		// Provide tool result with the actual content
		let resultContent = `<answer>\n${formattedResponse}`
		if (reasoning) {
			resultContent += `\n\n## Reasoning\n\n${reasoning}`
		}
		resultContent += `\n</answer>`

		pushToolResult(formatResponse.toolResult(resultContent))
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		await handleError("respond_to_question", new Error(`Failed to respond to question: ${errorMessage}`))
	}
}
