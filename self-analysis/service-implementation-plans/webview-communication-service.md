# WebviewCommunicationService Implementation Plan

## Interface

```typescript
export interface IWebviewCommunicationService {
  // Core communication methods
  ask(
    type: ClineAsk,
    text?: string,
    partial?: boolean
  ): Promise<{
    response: ClineAskResponse;
    text?: string;
    images?: string[];
  }>;
  
  say(
    type: ClineSay,
    text?: string,
    images?: string[],
    partial?: boolean
  ): Promise<void>;
  
  // Response handling
  handleWebviewAskResponse(
    askResponse: ClineAskResponse,
    text?: string,
    images?: string[]
  ): Promise<{
    isAwaitingPlanResponse: boolean;
    notifyApiOrchestratorOfPlanToggle?: boolean;
  }>;
  
  // Helper methods
  removeLastPartialMessageIfExistsWithType(type: "ask" | "say", askOrSay: ClineAsk | ClineSay): Promise<void>;
  sayAndCreateMissingParamError(toolName: ToolUseName, paramName: string, relPath?: string): Promise<string>;
}
```

## Implementation Strategy

1. **Extract From**:
   - `ask()` method (lines 589-708)
   - `say()` method (lines 716-793)
   - `handleWebviewAskResponse()` method (lines 710-714)
   - Helper methods (lines 795-812)

2. **Key Methods**:
   - Partial message handling
   - Message state tracking
   - UI update coordination

## Code Migration Pattern

1. Move these methods with minimal changes:
   - `ask()` (lines 589-708)
   - `say()` (lines 716-793)
   - `handleWebviewAskResponse()` (lines 710-714)
   - `removeLastPartialMessageIfExistsWithType()` (lines 805-812)
   - `sayAndCreateMissingParamError()` (lines 796-803)

2. Add state tracking for:
   - `askResponse`, `askResponseText`, `askResponseImages`
   - `lastMessageTs`
   - `isAwaitingPlanResponse`
   - `didRespondToPlanAskBySwitchingMode`

3. Modify methods to use TaskStateService for message persistence:
   ```typescript
   async say(type: ClineSay, text?: string, images?: string[], partial?: boolean): Promise<void> {
     // Original logic but using taskStateService for message operations
     await this.taskStateService.addToClineMessages({
       ts: Date.now(),
       type: "say",
       say: type,
       text,
       images,
       partial,
     });
     // Post to webview via provider
   }
   ```

## Dependencies

- Requires TaskStateService for message persistence
- Needs ClineProvider access for webview communication
- Maintains references to:
  - `askResponse?: ClineAskResponse`
  - `askResponseText?: string`
  - `askResponseImages?: string[]`
  - `lastMessageTs?: number`
  - `isAwaitingPlanResponse: boolean = false`
  - `didRespondToPlanAskBySwitchingMode: boolean = false`