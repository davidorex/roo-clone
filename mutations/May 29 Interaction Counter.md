# May 29 Interaction Counter - Atomic Mutations for `getInteractionTurnCount()`

## Overview

This mutation plan outlines the implementation of a new public method `getInteractionTurnCount()` for the Task class. This method will count the number of interaction turns in a conversation, providing valuable metrics for task complexity and progress tracking.

## Rationale

The Task class currently tracks conversation history in `apiConversationHistory` and provides metrics through methods like `getTokenUsage()`. Adding an interaction turn counter aligns with the existing pattern of providing task metrics and follows the same architectural approach.

## Implementation Details

### Mutation 1: Add `getInteractionTurnCount()` Method

Add a new public method to the Task class that counts interaction turns based on the API conversation history.

```typescript
/**
 * Returns the number of interaction turns in the current task.
 * An interaction turn is defined as a user message followed by an assistant response.
 * This provides a measure of conversation depth and complexity.
 *
 * @returns {number} The count of complete interaction turns
 */
public getInteractionTurnCount(): number {
  // Filter to only include user and assistant messages (excluding system messages)
  const messages = this.apiConversationHistory.filter(
    msg => msg.role === "user" || msg.role === "assistant"
  );

  // Count complete turns (user -> assistant pairs)
  // A complete turn requires both a user message and an assistant response
  let turnCount = 0;
  let expectingAssistant = false;

  for (const message of messages) {
    if (message.role === "user") {
      expectingAssistant = true;
    } else if (message.role === "assistant" && expectingAssistant) {
      turnCount++;
      expectingAssistant = false;
    }
  }

  return turnCount;
}
```

### Alignment with Existing Code

This implementation follows the established patterns in the Task class:

1. **Public Method**: Like other metrics methods (`getTokenUsage()`), this is a public method that provides task information.

2. **Return Type**: Returns a simple number value, consistent with other metric getters.

3. **Implementation Style**: Uses functional programming patterns with array filtering and iteration, similar to other methods in the codebase.

4. **Documentation**: Includes JSDoc comments that explain the purpose and return value, matching the documentation style in the codebase.

5. **Naming Convention**: Uses the `get` prefix for a getter method, consistent with other getter methods like `getTokenUsage()`.

## Integration Points

The method relies on the existing `apiConversationHistory` array, which is already maintained by the Task class. This ensures the method will work correctly with the existing conversation tracking mechanisms.

## Usage Example

```typescript
// Example usage in a tool or UI component
const task = /* existing Task instance */;
const turnCount = task.getInteractionTurnCount();
console.log(`This task has had ${turnCount} interaction turns so far.`);
```

## Testing Considerations

The method should be tested with various conversation histories to ensure it correctly counts turns:

1. Empty conversation (should return 0)
2. Conversation with only user messages (should return 0)
3. Conversation with alternating user and assistant messages (should return the number of complete pairs)
4. Conversation with system messages interspersed (should ignore system messages)
5. Conversation with multiple consecutive messages of the same role (should handle correctly)

## Potential Future Enhancements

In the future, this method could be extended to:

1. Count partial turns (where a user message exists without an assistant response)
2. Provide more detailed metrics about turn types (e.g., turns with tool usage vs. simple text responses)
3. Track turn duration or token usage per turn

These enhancements would maintain the same interface while providing more detailed analytics.

## Test Implementation

The following tests should be added to `src/core/task/__tests__/Task.test.ts` to ensure proper coverage of the new method. These tests follow the existing patterns in the test file and use the same mocking infrastructure.

```typescript
describe("getInteractionTurnCount", () => {
	it("should return 0 for empty conversation history", () => {
		// Create Task instance with standard mocks
		const cline = new Task({
			provider: mockProvider,
			apiConfiguration: mockApiConfig,
			task: "test task",
			startTask: false,
		})

		// Set up test condition
		cline.apiConversationHistory = []

		// Assert expected result
		expect(cline.getInteractionTurnCount()).toBe(0)
	})

	it("should return 0 for conversation with only user messages", () => {
		const cline = new Task({
			provider: mockProvider,
			apiConfiguration: mockApiConfig,
			task: "test task",
			startTask: false,
		})

		cline.apiConversationHistory = [
			{
				role: "user",
				content: [{ type: "text", text: "message 1" }],
				ts: Date.now(),
			},
			{
				role: "user",
				content: [{ type: "text", text: "message 2" }],
				ts: Date.now(),
			},
		]

		expect(cline.getInteractionTurnCount()).toBe(0)
	})

	it("should return correct count for alternating user-assistant messages", () => {
		const cline = new Task({
			provider: mockProvider,
			apiConfiguration: mockApiConfig,
			task: "test task",
			startTask: false,
		})

		cline.apiConversationHistory = [
			{
				role: "user",
				content: [{ type: "text", text: "message 1" }],
				ts: Date.now(),
			},
			{
				role: "assistant",
				content: [{ type: "text", text: "response 1" }],
				ts: Date.now(),
			},
			{
				role: "user",
				content: [{ type: "text", text: "message 2" }],
				ts: Date.now(),
			},
			{
				role: "assistant",
				content: [{ type: "text", text: "response 2" }],
				ts: Date.now(),
			},
		]

		expect(cline.getInteractionTurnCount()).toBe(2)
	})

	it("should ignore system messages when counting turns", () => {
		const cline = new Task({
			provider: mockProvider,
			apiConfiguration: mockApiConfig,
			task: "test task",
			startTask: false,
		})

		cline.apiConversationHistory = [
			{
				role: "system",
				content: [{ type: "text", text: "system prompt" }],
				ts: Date.now(),
			},
			{
				role: "user",
				content: [{ type: "text", text: "message 1" }],
				ts: Date.now(),
			},
			{
				role: "assistant",
				content: [{ type: "text", text: "response 1" }],
				ts: Date.now(),
			},
		]

		expect(cline.getInteractionTurnCount()).toBe(1)
	})

	it("should handle non-alternating message sequences correctly", () => {
		const cline = new Task({
			provider: mockProvider,
			apiConfiguration: mockApiConfig,
			task: "test task",
			startTask: false,
		})

		cline.apiConversationHistory = [
			{
				role: "user",
				content: [{ type: "text", text: "message 1" }],
				ts: Date.now(),
			},
			{
				role: "user",
				content: [{ type: "text", text: "message 2" }],
				ts: Date.now(),
			},
			{
				role: "assistant",
				content: [{ type: "text", text: "response 1" }],
				ts: Date.now(),
			},
			{
				role: "assistant",
				content: [{ type: "text", text: "response 2" }],
				ts: Date.now(),
			},
			{
				role: "user",
				content: [{ type: "text", text: "message 3" }],
				ts: Date.now(),
			},
		]

		// Should count 1 turn (the second user message paired with the first assistant response)
		expect(cline.getInteractionTurnCount()).toBe(1)
	})

	it("should handle incomplete conversation (ending with user message)", () => {
		const cline = new Task({
			provider: mockProvider,
			apiConfiguration: mockApiConfig,
			task: "test task",
			startTask: false,
		})

		cline.apiConversationHistory = [
			{
				role: "user",
				content: [{ type: "text", text: "message 1" }],
				ts: Date.now(),
			},
			{
				role: "assistant",
				content: [{ type: "text", text: "response 1" }],
				ts: Date.now(),
			},
			{
				role: "user",
				content: [{ type: "text", text: "message 2" }],
				ts: Date.now(),
			},
		]

		// Should count only the completed turn
		expect(cline.getInteractionTurnCount()).toBe(1)
	})
})
```

These tests ensure that the `getInteractionTurnCount()` method correctly handles various conversation scenarios, including:

1. Empty conversations
2. Conversations with only user messages
3. Alternating user-assistant message pairs
4. Conversations with system messages
5. Non-alternating message sequences
6. Incomplete conversations ending with a user message

The test structure follows the existing patterns in the Task test file, with each test:

- Creating a Task instance with the standard mock setup
- Setting up specific test conditions by manipulating the apiConversationHistory
- Asserting the expected result from the getInteractionTurnCount() method
