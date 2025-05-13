# CheckpointService Implementation Plan

## Interface

```typescript
export interface ICheckpointService {
  // Core checkpoint operations
  saveCheckpoint(isAttemptCompletionMessage: boolean): Promise<void>;
  restoreCheckpoint(messageTs: number, restoreType: ClineCheckpointRestore): Promise<{
    isAwaitingPlanResponse?: boolean;
  }>;
  
  // Diff and state visualization
  presentMultifileDiff(messageTs: number, seeNewChangesSinceLastTaskCompletion: boolean): Promise<void>;
  doesLatestTaskCompletionHaveNewChanges(): Promise<boolean>;
  
  // Error management
  getErrorMessage(): string | undefined;
  setErrorMessage(message: string | undefined): void;
}
```

## Implementation Strategy

1. **Extract From**:
   - Checkpoint tracker initialization (lines 1107-1162)
   - `saveCheckpoint()` method (lines 1096-1165)
   - `restoreCheckpoint()` method (lines 293-400)
   - `presentMultifileDiff()` method (lines 402-523)
   - `doesLatestTaskCompletionHaveNewChanges()` method (lines 525-584)

2. **Key Methods**:
   - Git-based checkpointing
   - Checkpoint state restoration
   - Diff visualization

## Code Migration Pattern

1. Create CheckpointTracker initialization logic:
   ```typescript
   private async initializeCheckpointTracker(): Promise<void> {
     if (!this.checkpointTracker && !this.errorMessage) {
       try {
         this.checkpointTracker = await CheckpointTracker.create(
           this.coreDependencies.getTaskId(),
           this.coreDependencies.getProvider()?.context.globalStorageUri.fsPath,
         );
       } catch (error) {
         // Error handling logic from lines 1108-1119
       }
     }
   }
   ```

2. Move these methods with minimal adaptation:
   - `saveCheckpoint()` (lines 1096-1165)
   - `restoreCheckpoint()` (lines 293-400)
   - `presentMultifileDiff()` (lines 402-523)
   - `doesLatestTaskCompletionHaveNewChanges()` (lines 525-584)

3. Add checkpoint messaging and state management:
   ```typescript
   private async updateCheckpointMessageHash(commitHash: string, messageType: 'checkpoint_created' | 'completion_result'): Promise<void> {
     // Logic from lines 1108-1128 to update message hash
     const lastMessage = this.findLastMessageByType(messageType);
     if (lastMessage) {
       lastMessage.lastCheckpointHash = commitHash;
       await this.taskStateService.saveClineMessages();
     }
   }
   ```

## Dependencies

- Requires TaskStateService for message updates
- Needs WebviewCommunicationService for UI interaction
- Uses CheckpointTracker for Git operations
- Requires provider access through CoreTaskDependencies
- Tracks error message state for checkpoint failures