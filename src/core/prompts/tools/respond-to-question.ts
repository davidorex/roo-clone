export function getRespondToQuestionDescription(): string {
	return `## respond_to_question
Description: Provide a direct and relevant response to the user's question. Use this tool when the user asks a question. Your answer will be presented to the user for consideration before proceeding with any further actions.
Parameters:
- question: (required) The question the user asked
- response: (required) Your informed, concise, detailed answer to the question
- reasoning: (optional) IF ASKED FOR, the reasoning process or methodology used to arrive at the answer
Usage:
<respond_to_question>
<question>The user's question</question>
<response>
Your answer.
</response>
<reasoning>
Reason, only if asked for.
</reasoning>
</respond_to_question>
`
}
