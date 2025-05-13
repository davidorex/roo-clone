# CoreTaskDependencies Implementation Plan

## Interface

```typescript
export interface ICoreTaskDependencies {
  // Core access
  getProvider(): ClineProvider | undefined;
  getTaskId(): string;
  setTaskId(id: string): void;
  getWorkingDirectory(): string;
  
  // API and settings
  getApiHandler(): ApiHandler;
  getAutoApprovalSettings(): AutoApprovalSettings;
  getBrowserSettings(): BrowserSettings;
  updateBrowserSettings(settings: BrowserSettings): void;
  getChatSettings(): ChatSettings;
  updateChatSettings(settings: ChatSettings): void;
  
  // Shared services
  getTerminalManager(): TerminalManager;
  getBrowserSession(): BrowserSession;
  getUrlContentFetcher(): UrlContentFetcher;
  getClineIgnoreController(): ClineIgnoreController;
  getDiffViewProvider(): DiffViewProvider;
}
```

## Implementation Strategy

1. **Extract From**: Lines 128-164 of Cline constructor
2. **Key Methods**: 
   - Constructor to initialize all services
   - Getters for all dependencies 
   - Settings update methods

## Code Migration Pattern

1. Move initialization of these dependencies from Cline constructor:
   - `TerminalManager` (line 146)
   - `UrlContentFetcher` (line 147)
   - `BrowserSession` (line 148)
   - `ClineIgnoreController` (line 139)
   - `DiffViewProvider` (line 150)

2. Store provider in a WeakRef as in original code (line 143)

3. Implement update methods that properly cascade to relevant services:
   ```typescript
   updateBrowserSettings(settings: BrowserSettings): void {
     this._browserSettings = settings;
     this._browserSession.browserSettings = settings;
   }
   ```

## Dependencies

- Must be constructed with valid ClineProvider
- Needs access to global workspace information for CWD
- Should store the task ID for later access by services