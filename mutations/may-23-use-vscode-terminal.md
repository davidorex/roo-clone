**Minimal-Conflict Solution: Add Direct Terminal Mode via Settings**

To minimize future merge conflicts, we should **add new functionality** rather than **modify existing code paths**. Here's the surgical approach:

## **Strategy: Conditional Bypass with New Setting**

### **1. Add New Setting (Zero Conflict Risk)**

**File:** [`src/schemas/index.ts`](src/schemas/index.ts:754)

```typescript
// ADD after existing terminal settings:
terminalDirectMode: z.boolean().optional(),
```

**File:** [`src/schemas/index.ts`](src/schemas/index.ts:838)

```typescript
// ADD to defaults:
terminalDirectMode: undefined,
```

### **2. Single Point of Intervention (Minimal Conflict)**

**File:** [`src/core/tools/executeCommandTool.ts`](src/core/tools/executeCommandTool.ts:61)

**Current:**

```typescript
const { terminalOutputLineLimit = 500, terminalShellIntegrationDisabled = false } = clineProviderState ?? {}
```

**Add:**

```typescript
const {
	terminalOutputLineLimit = 500,
	terminalShellIntegrationDisabled = false,
	terminalDirectMode = false, // NEW
} = clineProviderState ?? {}
```

### **3. Early Return for Direct Mode (Minimal Conflict)**

**File:** [`src/core/tools/executeCommandTool.ts`](src/core/tools/executeCommandTool.ts:70)

**Add this block BEFORE existing `executeCommand` call:**

```typescript
// NEW: Direct terminal mode bypass
if (terminalDirectMode) {
    const workingDir = customCwd ?
        (path.isAbsolute(customCwd) ? customCwd : path.resolve(cline.cwd, customCwd)) :
        cline.cwd

    const terminal = vscode.window.createTerminal({
        cwd: workingDir,
        name: "Roo Code - Direct",
        iconPath: new vscode.ThemeIcon("rocket")
    })

    terminal.show(true)
    terminal.sendText(command, true)
    await vscode.commands.executeCommand("workbench.action.terminal.focus")

    pushToolResult(`Command "${command}" executed in terminal. Check terminal for output.`)
    return
}

// EXISTING CODE CONTINUES UNCHANGED...
try {
    const [rejected, result] = await executeCommand(cline, options)
    // ... rest of existing code
```

### **4. Add UI Setting (Zero Conflict Risk)**

**File:** [`webview-ui/src/components/settings/TerminalSettings.tsx`](webview-ui/src/components/settings/TerminalSettings.tsx:220)

**Add after existing terminal settings:**

```typescript
<VSCodeCheckbox
    checked={terminalDirectMode ?? false}
    onChange={(e: any) => setCachedStateField("terminalDirectMode", e.target.checked)}>
    <Trans
        i18nKey="settings:terminal.directMode.label"
        components={[
            <VSCodeLink href={buildDocLink("features/terminal-direct-mode", "settings_terminal_direct_mode")} />
        ]}
    />
</VSCodeCheckbox>
```

### **5. Add Message Handler (Zero Conflict Risk)**

**File:** [`src/core/webview/webviewMessageHandler.ts`](src/core/webview/webviewMessageHandler.ts:662)

**Add after existing terminal handlers:**

```typescript
case "terminalDirectMode":
    await updateGlobalState("terminalDirectMode", message.bool)
    await provider.postStateToWebview()
    break
```

## **Why This Approach Minimizes Conflicts:**

### **✅ Advantages:**

1. **Additive Only** - No existing code is modified, only new code added
2. **Early Return** - Bypasses entire existing execution path when enabled
3. **Feature Flag** - Can be easily disabled/removed if needed
4. **Isolated Changes** - Each change is in a separate, logical location
5. **Backward Compatible** - Default behavior unchanged
6. **Clean Separation** - Direct mode vs existing mode are completely separate paths

### **✅ Merge Conflict Resistance:**

- **Settings additions** rarely conflict (just new lines)
- **Early return pattern** doesn't modify existing logic flow
- **UI additions** are typically in separate sections
- **Message handlers** are usually just new cases in switch statements

### **✅ Future-Proof:**

- If upstream changes `executeCommand` function, our bypass isn't affected
- If terminal integration changes, our direct mode is isolated
- Easy to maintain/update independently
- Can be feature-flagged or A/B tested

## **Result:**

- **Default behavior:** Unchanged (existing users unaffected)
- **With setting enabled:** Commands go directly to visible VSCode terminal
- **Zero disruption** to existing codebase architecture
- **Minimal surface area** for merge conflicts
- **Easy to maintain** and extend

This approach gives you the direct terminal access you want while being **maximally compatible** with future upstream changes.

**Zero Merge Conflict Implementation Plan Confirmed**

Based on the mutation documents, here's the complete implementation plan that minimizes merge conflicts:

## **Core Implementation (5 Files)**

### **1. Schema Changes**

**File:** [`src/schemas/index.ts`](src/schemas/index.ts:754)

- **Line 754:** Add `terminalDirectMode: z.boolean().optional(),` after `allowedCommands`
- **Line 838:** Add `terminalDirectMode: undefined,` to defaults

### **2. Execute Command Tool Changes**

**File:** [`src/core/tools/executeCommandTool.ts`](src/core/tools/executeCommandTool.ts:61)

- **Line 61:** Extend destructuring to include `terminalDirectMode = false`
- **Line 70:** Add early return block BEFORE existing `executeCommand` call:

```typescript
// NEW: Direct terminal mode bypass
if (terminalDirectMode) {
	const workingDir = customCwd
		? path.isAbsolute(customCwd)
			? customCwd
			: path.resolve(cline.cwd, customCwd)
		: cline.cwd

	const terminal = vscode.window.createTerminal({
		cwd: workingDir,
		name: "Roo Code - Direct",
		iconPath: new vscode.ThemeIcon("rocket"),
	})

	terminal.show(true)
	terminal.sendText(command, true)
	await vscode.commands.executeCommand("workbench.action.terminal.focus")

	pushToolResult(`Command "${command}" executed in terminal. Check terminal for output.`)
	return
}
```

### **3. Message Handler**

**File:** [`src/core/webview/webviewMessageHandler.ts`](src/core/webview/webviewMessageHandler.ts:662)

- Add new case after existing terminal handlers:

```typescript
case "terminalDirectMode":
    await updateGlobalState("terminalDirectMode", message.bool)
    await provider.postStateToWebview()
    break
```

### **4. UI Component**

**File:** [`webview-ui/src/components/settings/TerminalSettings.tsx`](webview-ui/src/components/settings/TerminalSettings.tsx:220)

- Add checkbox after existing terminal settings

### **5. Shared Types**

**File:** [`src/shared/WebviewMessage.ts`](src/shared/WebviewMessage.ts:30)

- Add `"terminalDirectMode"` to message type union

## **Test Implementation (3 Files)**

### **1. VSCode Mock Extension**

**File:** [`src/__mocks__/vscode.js`](src/__mocks__/vscode.js:104)

- Add to existing window object:

```javascript
createTerminal: jest.fn().mockReturnValue({
    show: jest.fn(),
    sendText: jest.fn(),
    dispose: jest.fn(),
}),
```

- Add commands and ThemeIcon mocks

### **2. Execute Command Tool Tests**

**File:** [`src/core/tools/__tests__/executeCommandTool.test.ts`](src/core/tools/__tests__/executeCommandTool.test.ts:279)

- Add new `describe("Direct Terminal Mode")` block
- Test direct mode enabled/disabled scenarios
- Follow existing mock implementation pattern

### **3. Settings Tests**

**File:** [`src/core/webview/__tests__/ClineProvider.test.ts`](src/core/webview/__tests__/ClineProvider.test.ts:753)

- Add test for `terminalDirectMode` setting handling
- Follow existing settings test pattern

## **Why This Minimizes Merge Conflicts:**

### **✅ Additive Only Changes:**

- **No existing code modified** - only new lines added
- **Early return pattern** - bypasses existing logic completely
- **Feature flag approach** - can be easily disabled

### **✅ Low-Risk Insertion Points:**

- Schema additions rarely conflict (just new property lines)
- Early return before existing logic flow
- New case in switch statement
- UI additions in separate sections

### **✅ Isolated Functionality:**

- Direct mode completely separate from existing terminal logic
- No shared state or dependencies
- Independent test coverage
- Easy to remove if needed

### **✅ Backward Compatibility:**

- Default behavior unchanged (`terminalDirectMode: false`)
- Existing users unaffected
- All existing tests continue to pass

## **Implementation Order:**

1. Schema changes (foundation)
2. Core logic (executeCommandTool.ts)
3. Message handling (webviewMessageHandler.ts)
4. UI component (TerminalSettings.tsx)
5. Shared types (WebviewMessage.ts)
6. Test mocks (vscode.js)
7. Test implementations (3 test files)

This approach provides **maximum compatibility** with future upstream changes while delivering the direct terminal functionality you want.
