**Aligned Test Strategy: Following Existing Patterns**

After analyzing the existing test patterns, here's how to test the direct terminal mode feature using **only existing patterns**:

## **1. Extend Existing executeCommandTool.test.ts**

**Pattern:** The codebase uses **single test files per tool** with **describe blocks** for different scenarios.

**File:** [`src/core/tools/__tests__/executeCommandTool.test.ts`](src/core/tools/__tests__/executeCommandTool.test.ts:279)

**Add new describe block:**

```typescript
describe("Direct Terminal Mode", () => {
	beforeEach(() => {
		// Use existing mock setup patterns
		jest.clearAllMocks()

		// Mock VSCode terminal creation (following existing VSCode mock pattern)
		const mockTerminal = {
			show: jest.fn(),
			sendText: jest.fn(),
			dispose: jest.fn(),
		}
		vscode.window.createTerminal = jest.fn().mockReturnValue(mockTerminal)
		vscode.commands.executeCommand = jest.fn()
	})

	it("should create VSCode terminal when terminalDirectMode is enabled", async () => {
		// Follow existing test structure: Setup -> Execute -> Verify
		mockToolUse.params.command = "echo test"

		// Mock provider state (following existing pattern from ClineProvider.test.ts)
		const mockProviderState = { terminalDirectMode: true }
		mockCline.providerRef = {
			deref: jest.fn().mockResolvedValue({
				getState: jest.fn().mockResolvedValue(mockProviderState),
			}),
		}

		await executeCommandTool(
			mockCline as unknown as Task,
			mockToolUse,
			mockAskApproval as unknown as AskApproval,
			mockHandleError as unknown as HandleError,
			mockPushToolResult as unknown as PushToolResult,
			mockRemoveClosingTag as unknown as RemoveClosingTag,
		)

		expect(vscode.window.createTerminal).toHaveBeenCalledWith({
			cwd: expect.any(String),
			name: "Roo Code - Direct",
			iconPath: expect.any(Object),
		})
	})

	it("should use existing execution path when terminalDirectMode is disabled", async () => {
		// Test backward compatibility
		const mockProviderState = { terminalDirectMode: false }
		// ... rest follows existing test pattern
	})
})
```

## **2. Follow Existing VSCode Mock Pattern**

**Pattern:** The codebase extends the existing VSCode mock in [`src/__mocks__/vscode.js`](src/__mocks__/vscode.js:104)

**Add to existing mock:**

```javascript
// ADD to existing vscode mock object (line 104):
window: {
    // ... existing window mocks
    createTerminal: jest.fn().mockReturnValue({
        show: jest.fn(),
        sendText: jest.fn(),
        dispose: jest.fn(),
        name: "Mock Terminal",
    }),
},
commands: {
    executeCommand: jest.fn().mockResolvedValue(undefined),
},
ThemeIcon: class {
    constructor(id) { this.id = id }
},
```

## **3. Follow Existing Settings Test Pattern**

**Pattern:** Settings tests are in [`src/core/webview/__tests__/ClineProvider.test.ts`](src/core/webview/__tests__/ClineProvider.test.ts:525-534)

**Add to existing ClineProvider.test.ts:**

```typescript
test("handles terminalDirectMode setting", async () => {
	await provider.resolveWebviewView(mockWebviewView)
	const messageHandler = (mockWebviewView.webview.onDidReceiveMessage as jest.Mock).mock.calls[0][0]

	await messageHandler({ type: "terminalDirectMode", bool: true })

	expect(mockContext.globalState.update).toHaveBeenCalledWith("terminalDirectMode", true)
	expect(mockPostMessage).toHaveBeenCalled()
})
```

## **4. Follow Existing Schema Test Pattern**

**Pattern:** Schema tests are in [`src/schemas/__tests__/index.test.ts`](src/schemas/__tests__/index.test.ts:10)

**Add to existing schema tests:**

```typescript
it("should contain terminalDirectMode in GLOBAL_STATE_KEYS", () => {
	expect(GLOBAL_STATE_KEYS).toContain("terminalDirectMode")
})
```

## **5. Follow Existing Mock Implementation Pattern**

**Pattern:** The codebase uses **complex mock implementations** that replicate real behavior (see lines 34-72 in executeCommandTool.test.ts)

**Extend existing mock:**

```typescript
// In executeCommandTool.test.ts beforeEach (line 34):
executeCommandTool.mockImplementation(async (cline, block, askApproval, handleError, pushToolResult) => {
	// ... existing validation logic

	// NEW: Check for direct mode
	const providerState = await cline.providerRef?.deref()?.getState?.()
	if (providerState?.terminalDirectMode) {
		// Direct terminal path
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

	// EXISTING: Normal execution path
	const [userRejected, result] = await mockExecuteCommand(cline, command, customCwd)
	// ... rest of existing logic
})
```

## **6. Test Command**

**Pattern:** Individual test files have their own npm script comments (line 1 of each test file)

**Add comment to test file:**

```typescript
// npx jest src/core/tools/__tests__/executeCommandTool.test.ts --testNamePattern="Direct Terminal Mode"
```

This approach ensures **zero merge conflicts** because it:

1. **Extends existing files** rather than creating new ones
2. **Follows existing mock patterns** exactly
3. **Uses existing test structure** and naming conventions
4. **Reuses existing setup/teardown** patterns
5. **Maintains backward compatibility** testing

The tests will be **maintainable** and **consistent** with the rest of the codebase.
