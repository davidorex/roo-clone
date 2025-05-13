# ApiOrchestrationService Implementation Plan

## Interface

```typescript
export interface IApiOrchestrationService {
  // Core API interaction methods
  recursivelyMakeClineRequests(
    userContent: UserContent, 
    includeFileDetails?: boolean,
    isNewTask?: boolean
  ): Promise<boolean>;
  
  attemptApiRequest(previousApiReqIndex: number): AsyncGenerator<ApiChunk>;
  presentAssistantMessage(): Promise<void>;
  
  // State notification methods
  notifyPlanModeToggle(): void;
  onChatSettingsUpdate(settings: ChatSettings): void;
  
  // Internal state flags (may need getters)
  isStreaming: boolean;
  isWaitingForFirstChunk: boolean;
  didCompleteReadingStream: boolean;
}
```

## Implementation Strategy

1. **Extract From**:
   - `attemptApiRequest()` method (lines 1277-1445)
   - `presentAssistantMessage()` method (lines 1447-1069)
   - `recursivelyMakeClineRequests()` method (lines 3071-3457)

2. **Key Methods**:
   - API streaming and error handling
   - Assistant message parsing and presentation
   - Loop management for conversational tasks

## Code Migration Pattern

1. Move the core streaming implementation:
   - Extract `attemptApiRequest()` (lines 1277-1445)
   - Handle system prompt generation
   - Manage context window truncation
   - Maintain streaming error recovery 

2. Extract message presentation logic:
   - Move `presentAssistantMessage()` (lines 1447-1069) excluding tool execution
   - Handle message parsing and partial updates
   - Coordinate with ToolExecutionService 

3. Implement recursive request management:
   - Extract `recursivelyMakeClineRequests()` (lines 3071-3457)
   - Coordinate with EnvironmentService for context loading
   - Track conversation tracking metrics

4. Maintain streaming state variables:
   ```typescript
   // Streaming state
   private currentStreamingContentIndex: number = 0;
   private assistantMessageContent: AssistantMessageContent[] = [];
   private presentAssistantMessageLocked: boolean = false;
   private presentAssistantMessageHasPendingUpdates: boolean = false;
   private userMessageContent: UserContent = [];
   private userMessageContentReady: boolean = false;
   ```

## Dependencies

- Requires TaskStateService for history management
- Needs WebviewCommunicationService for UI updates
- Requires ToolExecutionService for tool handling
- Needs EnvironmentService for context information
- Depends on ApiHandler from CoreTaskDependencies
- Maintains state variables for streaming control