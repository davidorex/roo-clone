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
