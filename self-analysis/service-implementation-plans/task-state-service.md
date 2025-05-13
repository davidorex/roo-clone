# TaskStateService Implementation Plan

## Interface

```typescript
export interface ITaskStateService {
  // Conversation history access
  getApiConversationHistory(): Anthropic.MessageParam[];
  getClineMessages(): ClineMessage[];
  getConversationHistoryDeletedRange(): [number, number] | undefined;
  
  // State modification
  addToApiConversationHistory(message: Anthropic.MessageParam): Promise<void>;
  overwriteApiConversationHistory(newHistory: Anthropic.MessageParam[]): Promise<void>;
  addToClineMessages(message: ClineMessage): Promise<void>;
  overwriteClineMessages(newMessages: ClineMessage[]): Promise<void>;
  setConversationHistoryDeletedRange(range: [number, number] | undefined): void;
  
  // Task directory management
  ensureTaskDirectoryExists(): Promise<string>;
  
  // State initialization from history
  initializeFromHistoryItem(historyItem: HistoryItem): Promise<void>;
}
```

## Implementation Strategy

1. **Extract From**: 
   - Task directory code (lines 186-194)
   - API conversation history methods (lines 196-223)
   - Cline messages methods (lines 225-288)
   - History initialization (lines 841-874)

2. **Key Methods**:
   - State persistence (save/load from files)
   - History truncation management
   - Task history updates

## Code Migration Pattern

1. Move these methods directly with minimal changes:
   - `ensureTaskDirectoryExists()` (lines 186-194)
   - `getSavedApiConversationHistory()` (lines 196-203) 
   - `addToApiConversationHistory()` (lines 205-208)
   - `overwriteApiConversationHistory()` (lines 210-213)
   - `saveApiConversationHistory()` (lines 215-223)
   - All Cline messages methods (lines 225-288)

2. Extract initialization logic from `resumeTaskFromHistory()` (lines 842-874):
   - Loading saved conversation history and messages
   - Handling of conversationHistoryDeletedRange

## Dependencies

- Needs access to `taskId` via CoreTaskDependencies
- Needs ClineProvider access for global storage path
- Maintains references to:
  - `apiConversationHistory: Anthropic.MessageParam[]`
  - `clineMessages: ClineMessage[]`
  - `conversationHistoryDeletedRange?: [number, number]`