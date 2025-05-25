# 2. Key Functionality

**Parent Report:** [Technical Report: `src/core/prompts/system.ts`](./00_src_core_prompts_system_report_overview.md)

This module exports one primary function, `SYSTEM_PROMPT`, and contains an internal helper function, `generatePrompt`, which handles the main logic of assembling the standard system prompt.

## 2.1. `SYSTEM_PROMPT` (Exported Function)

**Signature (Full signature details can be found in the API contract file: `packages/dev-support-scripts/api_contracts/src_core_prompts_system_contracts.json`):**

```typescript
export const SYSTEM_PROMPT = async (
	context: vscode.ExtensionContext,
	cwd: string,
	supportsComputerUse: boolean,
	mcpHub?: McpHub,
	diffStrategy?: DiffStrategy,
	browserViewportSize?: string,
	mode: Mode = defaultModeSlug,
	customModePrompts?: CustomModePrompts,
	customModes?: ModeConfig[],
	globalCustomInstructions?: string,
	diffEnabled?: boolean,
	experiments?: Record<string, boolean>,
	enableMcpServerCreation?: boolean,
	language?: string,
	rooIgnoreInstructions?: string,
): Promise<string>
```

**Role:**
This is the main public interface for obtaining the system prompt. It orchestrates the process by:

1.  Determining the current mode and its configuration (including custom modes using `getModeBySlug` and `modes` from `../../shared/modes`).
2.  Attempting to load a file-based custom system prompt using `loadSystemPromptFile` (from `./sections/custom-system-prompt`).
    - If a file-based custom prompt is found, it's used directly, prepended with the AI's `roleDefinition` and appended with processed `customInstructions`. In this scenario, the detailed assembly of other sections (like tools, rules, etc.) performed by `generatePrompt` is bypassed.
3.  If no file-based custom prompt is found, it calls the internal `generatePrompt` function to construct the standard system prompt based on the current mode and context.

**Parameters:**
Accepts a comprehensive set of parameters to provide context for prompt generation, including:

- `context: vscode.ExtensionContext` (required): The VS Code extension context.
- `cwd: string` (required): The current working directory.
- `supportsComputerUse: boolean` (required): Flag indicating if computer-interacting tools are allowed.
- `mcpHub?: McpHub`: Optional MCP Hub instance.
- `diffStrategy?: DiffStrategy`: Optional diffing strategy.
- `browserViewportSize?: string`: Optional browser viewport size information.
- `mode: Mode = defaultModeSlug`: The target AI mode, defaults to `defaultModeSlug` (from `../../shared/modes`).
- `customModePrompts?: CustomModePrompts`: Optional custom prompts for modes.
- `customModes?: ModeConfig[]`: Optional array of custom mode configurations.
- `globalCustomInstructions?: string`: Optional global custom instructions.
- `diffEnabled?: boolean`: Optional flag to indicate if diffing is enabled.
- `experiments?: Record<string, boolean>`: Optional record of enabled experimental features.
- `enableMcpServerCreation?: boolean`: Optional flag for MCP server creation capabilities.
- `language?: string`: Optional language override.
- `rooIgnoreInstructions?: string`: Optional instructions derived from `.rooignore` files.

**Return Value:**

- `Promise<string>`: A promise that resolves to the fully assembled system prompt string.

## 2.2. `generatePrompt` (Internal Function)

**Signature (Full signature details can be found in the API contract file: `packages/dev-support-scripts/api_contracts/src_core_prompts_system_contracts.json`, noting potential minor discrepancies as detailed below):**

```typescript
async function generatePrompt(
	context: vscode.ExtensionContext,
	cwd: string,
	supportsComputerUse: boolean,
	mode: Mode, // Note: In the source, this is the slug, but effectively represents the Mode
	mcpHub?: McpHub,
	diffStrategy?: DiffStrategy,
	browserViewportSize?: string,
	promptComponent?: PromptComponent,
	customModeConfigs?: ModeConfig[],
	globalCustomInstructions?: string,
	diffEnabled?: boolean,
	experiments?: Record<string, boolean>,
	enableMcpServerCreation?: boolean,
	language?: string,
	rooIgnoreInstructions?: string,
): Promise<string>
```

_(Note: The API contract for `generatePrompt` might not list `globalCustomInstructions` and `diffEnabled`, but the source code of `SYSTEM_PROMPT` passes these, and the `generatePrompt` function definition in `src/core/prompts/system.ts` does accept them.)_

**Role:**
This function is responsible for the detailed assembly of the standard system prompt when a file-based custom prompt is not used. It sequentially calls various section generator functions (imported from `./sections/index.ts` and `./tools/index.ts`) and concatenates their string outputs to form the `basePrompt`.

**Parameters:**
Receives a similar set of contextual parameters as `SYSTEM_PROMPT` to pass down to the individual section and tool description generators.

**Return Value:**

- `Promise<string>`: A promise that resolves to the assembled `basePrompt` string.

**Key Operations:**

- Determines the `roleDefinition` based on the current mode or a specific `promptComponent`.
- Fetches and includes various predefined sections like Markdown formatting, tool usage, tool descriptions, guidelines, MCP server info, capabilities, modes, rules, system info, and objectives.
- Incorporates custom instructions.
- The exact order of assembly is critical and is detailed in the "Prompt Assembly Logic" section of this report.
