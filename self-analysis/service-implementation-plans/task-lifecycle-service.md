# TaskLifecycleService Implementation Plan

## Interface

```typescript
export interface ITaskLifecycleService {
  // Core lifecycle methods
  startTask(taskText?: string, images?: string[]): Promise<{
    isInitialized: boolean;
    aborted: boolean;
  }>;
  
  resumeTaskFromHistory(historyItem: HistoryItem): Promise<{
    isInitialized: boolean;
    aborted: boolean;
  }>;
  
  initiateTaskLoop(
    userContent: UserContent, 
    isNewTask: boolean
  ): Promise<void>;
  
  abortTask(): Promise<{
    aborted: boolean;
    didFinishAbortingStream: boolean;
  }>;
}
```

## Implementation Strategy

1. **Extract From**:
   - `startTask()` method (lines 816-839)
   - `resumeTaskFromHistory()` method (lines 841-1052)
   - `initiateTaskLoop()` method (lines 1054-1082)
   - `abortTask()` method (lines 1084-1092)

2. **Key Methods**:
   - Task initialization and state setup
   - History resumption logic
   - Task loop management
   - Cleanup and abortion handling

## Code Migration Pattern

1. Extract task initialization:
   - Move `startTask()` (lines 816-839) with telemetry calls
   - Adapt to use other services for UI updates and state management
   ```typescript
   async startTask(taskText?: string, images?: string[]): Promise<{isInitialized: boolean, aborted: boolean}> {
     // Reset states through TaskStateService
     await this.taskStateService.resetTaskState();
     
     // Send task text to webview
     await this.webviewCommunicationService.say("text", taskText, images);
     
     // Set initialized flag
     const isInitialized = true;
     
     // Start the conversation loop
     await this.initiateTaskLoop(
       [
         { type: "text", text: `<task>\n${taskText}\n</task>` },
         ...this.formatImageBlocks(images),
       ],
       true
     );
     
     return { isInitialized, aborted: this.aborted };
   }
   ```

2. Extract history resumption logic:
   - Move `resumeTaskFromHistory()` (lines 841-1052)
   - Adapt to use TaskStateService for history loading
   - Modify to use WebviewCommunicationService for UI interaction
   - Ensure proper error handling for history data

3. Move task loop management:
   - Extract `initiateTaskLoop()` (lines 1054-1082)
   - Delegate API requests to ApiOrchestrationService
   - Handle consecutive mistake tracking
   - Manage auto-approval limits

4. Move task abortion:
   - Extract `abortTask()` (lines 1084-1092)
   - Coordinate cleanup across all services
   - Ensure proper state flags are updated

## Dependencies

- Requires TaskStateService for history and message management
- Needs WebviewCommunicationService for UI updates
- Uses ApiOrchestrationService for API interaction
- Coordinates with CheckpointService for initialization
- Needs access to all core service dependencies for cleanup