# ToolExecutionService Implementation Plan

## Interface

```typescript
export interface IToolExecutionService {
  // Core tool execution methods
  executeToolUseBlock(block: AssistantMessageContent): Promise<UserContent>;
  shouldAutoApproveTool(toolName: ToolUseName): boolean;
  
  // Specific tool handlers
  executeReadFileTool(params: any, partial: boolean): Promise<ToolResponse>;
  executeWriteToFileTool(params: any, partial: boolean): Promise<ToolResponse>;
  executeReplaceInFileTool(params: any, partial: boolean): Promise<ToolResponse>;
  executeListFilesTool(params: any, partial: boolean): Promise<ToolResponse>;
  executeListCodeDefinitionNamesTool(params: any, partial: boolean): Promise<ToolResponse>;
  executeSearchFilesTool(params: any, partial: boolean): Promise<ToolResponse>;
  executeBrowserActionTool(params: any, partial: boolean): Promise<ToolResponse>;
  executeCommandTool(command: string): Promise<[boolean, ToolResponse]>;
  executeUseMcpToolTool(params: any, partial: boolean): Promise<ToolResponse>;
  executeAccessMcpResourceTool(params: any, partial: boolean): Promise<ToolResponse>;
  executeAskFollowupQuestionTool(params: any, partial: boolean): Promise<ToolResponse>;
  executePlanModeRespondTool(params: any, partial: boolean): Promise<ToolResponse>;
  executeAttemptCompletionTool(params: any, partial: boolean): Promise<ToolResponse>;
  
  // Error handling
  handleToolError(action: string, error: Error): Promise<void>;
}
```

## Implementation Strategy

1. **Extract From**:
   - Tool execution from `presentAssistantMessage()` (lines 1528-3036)
   - Auto-approval logic (lines 1246-1267)
   - Error handling (lines 1654-1670)

2. **Key Methods**:
   - Individual tool handler methods
   - Tool approval management
   - Error reporting mechanisms

## Code Migration Pattern

1. Extract the tool execution dispatch from presentAssistantMessage:
   ```typescript
   async executeToolUseBlock(block: AssistantMessageContent): Promise<UserContent> {
     // Logic to dispatch to specific tool handler based on block.name
     // Returns userMessageContent built from tool execution results
   }
   ```

2. Create separate methods for each tool type:
   - Extract each case branch from the switch statement in presentAssistantMessage
   - Create toolName-specific methods (e.g., executeReadFileTool, executeCommandTool)
   - Maintain same parameters, error handling, and return types

3. Move these supporting functions:
   - `shouldAutoApproveTool()` (lines 1246-1267)
   - `handleError()` (lines 1654-1670)
   - Tool response formatting helpers

4. Handle common tool execution patterns:
   ```typescript
   // Common pattern extraction
   private async handlePartialToolExecution(
     toolName: string, 
     params: any, 
     messageGenerator: (params: any) => ClineSayTool
   ): Promise<void> {
     // Common code for handling partial tool execution
   }
   ```

## Dependencies

- Needs WebviewCommunicationService for user interaction
- Requires CheckpointService for saveCheckpoint calls
- Uses EnvironmentService for workspace context
- Depends on core tool implementations from CoreTaskDependencies:
  - BrowserSession
  - TerminalManager
  - DiffViewProvider
  - ClineIgnoreController