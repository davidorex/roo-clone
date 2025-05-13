# EnvironmentService Implementation Plan

## Interface

```typescript
export interface IEnvironmentService {
  // Core context methods
  loadContext(userContent: UserContent, includeFileDetails?: boolean): Promise<[UserContent, string]>;
  getEnvironmentDetails(includeFileDetails?: boolean): Promise<string>;
  
  // Optional helper methods
  parseMentions(text: string): Promise<string>;
  getTerminalStatus(): Promise<{
    busyTerminals: TerminalInfo[];
    inactiveTerminals: TerminalInfo[];
  }>;
}
```

## Implementation Strategy

1. **Extract From**:
   - `loadContext()` method (lines 3459-3484)
   - `getEnvironmentDetails()` method (lines 3486-3654)
   - Mention parsing (if needed)

2. **Key Methods**:
   - Context gathering and formatting
   - Terminal status monitoring
   - Workspace information collection

## Code Migration Pattern

1. Extract environment details collection:
   - Move `getEnvironmentDetails()` (lines 3486-3654) with minimal changes
   - Retain formatting and section structure
   - Keep current integration with TerminalManager

2. Extract context loading:
   - Move `loadContext()` (lines 3459-3484) with mention parsing
   - Maintain integration with UrlContentFetcher
   - Ensure proper combination of parsed content and environment details

3. Add helper methods for environment data:
   ```typescript
   private getCurrentTimeString(): string {
     // Extract time formatting logic from getEnvironmentDetails()
     const now = new Date();
     const formatter = new Intl.DateTimeFormat(undefined, {
       // Options from lines 3615-3623
     });
     // Format and return time string
   }
   ```

4. Identify any filesystem queries for workspace information:
   ```typescript
   private async getVisibleEditorFiles(): Promise<string[]> {
     // Extract logic from lines 3491-3502
     const visibleFilePaths = vscode.window.visibleTextEditors
       ?.map((editor) => editor.document?.uri?.fsPath)
       // ... rest of logic
     return this.coreDependencies.getClineIgnoreController()
       .filterPaths(visibleFilePaths)
       .map((p) => p.toPosix());
   }
   ```

## Dependencies

- Uses TerminalManager from CoreTaskDependencies
- Needs ClineIgnoreController for file filtering
- Requires UrlContentFetcher for mention processing
- Accesses VSCode workspace APIs for file information
- Uses workspace path from CoreTaskDependencies