The system delivers context history to the AI through a process managed primarily by the `Cline` class (in `src/core/Cline.ts`) and the `ContextManager` class (likely in `src/core/context-management/ContextManager.ts`).

Here's a breakdown of the method:

1.  **History Storage**:
    *   The `Cline` class maintains a property `apiConversationHistory`, which is an array of messages (`Anthropic.MessageParam[]`). This array stores the entire conversation with the AI, including user inputs, AI responses, tool calls, and tool results, structured with roles (`user`, `assistant`) and content.
    *   This `apiConversationHistory` is saved to a JSON file (`api_conversation_history.json`) in a task-specific directory, allowing for persistence and task resumption.

2.  **Pre-API Processing by `ContextManager`**:
    *   Before each call to the AI model (within the `attemptApiRequest` method in `Cline.ts`), the `apiConversationHistory` is passed to an instance of `ContextManager`.
    *   The `contextManager.getNewContextMessagesAndMetadata()` method processes this history. Its primary role here is to manage the context window of the AI model.

3.  **Context Truncation**:
    *   If the full `apiConversationHistory` exceeds the token limit of the selected AI model, the `ContextManager` truncates it.
    *   It uses a strategy (indicated by methods like `getNextTruncationRange` mentioned in your `.clinerules`) to remove older parts of the conversation.
    *   The `Cline` class keeps track of what has been truncated using the `conversationHistoryDeletedRange` property. This ensures that truncation is handled consistently across multiple API calls.
    *   The `ContextManager` returns a `truncatedConversationHistory`.

4.  **Sending to the AI**:
    *   The `truncatedConversationHistory` (which is the version of the conversation history that fits the model's context window) is then passed, along with the system prompt, to the `this.api.createMessage()` method.
    *   This method, implemented by the specific API handler (e.g., for Anthropic, OpenAI), makes the actual request to the AI service, providing the model with the relevant preceding conversation.

5.  **Handling Task Resumption**:
    *   When a task is resumed, the `resumeTaskFromHistory` method in `Cline.ts` loads the saved `apiConversationHistory` from disk.
    *   It may adjust this history to reflect that the task was interrupted (e.g., noting incomplete tool calls).
    *   A special `[TASK RESUMPTION]` message is typically added to the content sent to the AI to provide context about the resumption.

In summary, the system maintains a full conversation history, but before sending it to the AI, it uses a `ContextManager` to intelligently truncate older messages if necessary to fit the model's context window. This (potentially truncated) history is then delivered to the AI with each request.