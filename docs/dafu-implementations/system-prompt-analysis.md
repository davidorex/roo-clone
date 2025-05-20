# Analysis of System Prompt Generation: `cline` vs. `dafu`

This document details the differences in how the system prompt is constructed in the `cline` (current) and `dafu` (older fork) repositories, based on code analysis script outputs.

## `cline` Repository System Prompt Construction

Based on the API contracts for `cline/src/core/Cline.ts` and `cline/src/core/prompts/system.ts`:

1.  **Primary Components in `cline/src/core/prompts/system.ts`**:
    *   Exports a constant named `SYSTEM_PROMPT`. While its internal structure isn't fully detailed by its own contract, its containing module (`src/core/prompts/system.ts`) imports `getShell`, `os`, `osName`, `McpHub`, and `BrowserSettings`. This indicates that `SYSTEM_PROMPT` likely incorporates these system-level details and configurations directly into its definition or generation logic.
    *   Exports a function `addUserInstructions(settingsCustomInstructions?: string, clineRulesFileInstructions?: string, clineIgnoreInstructions?: string, preferredLanguageInstructions?: string)`.

2.  **Usage in `cline/src/core/Cline.ts`**:
    *   The `attemptApiRequest` method first utilizes `SYSTEM_PROMPT` to get the base system prompt.
    *   Subsequently, it calls `addUserInstructions`, passing the various specific instruction strings (global custom instructions, `.clinerules` content, `.clineignore` content, and preferred language instructions) to augment this base prompt.

**Interpretation for `cline`**:
The system prompt in `cline` is formed by taking a substantial base prompt (defined by `SYSTEM_PROMPT`, which itself seems to integrate various system and configuration details) and then appending specific blocks of user-defined and workspace-defined instructions via `addUserInstructions`.

## `dafu` Repository System Prompt Construction

Based on the API contracts for `dafu/src/core/Cline.ts` and `dafu/src/core/prompts/system.ts`:

1.  **Primary Component in `dafu/src/core/prompts/system.ts`**:
    *   Exports a function `generatePrompt`. (Note: `dafu/src/core/Cline.ts` imports this as `SYSTEM_PROMPT`).
    *   The `generatePrompt` function is highly parameterized, accepting 14 arguments: `context: vscode.ExtensionContext`, `cwd: string`, `supportsComputerUse: boolean`, `mode: Mode`, `mcpHub?: McpHub`, `diffStrategy?: DiffStrategy`, `browserViewportSize?: string`, `promptComponent?: PromptComponent`, `customModeConfigs?: ModeConfig[]`, `globalCustomInstructions?: string`, `preferredLanguage?: string`, `diffEnabled?: boolean`, `experiments?: Record<string, boolean>`, `enableMcpServerCreation?: boolean`.

2.  **Modular Imports in `dafu/src/core/prompts/system.ts`**:
    *   The API contract for this module explicitly lists imports for several functions whose names indicate they generate specific sections of the prompt:
        *   `getMandatoryOperatingPatternsSection`
        *   `getSystemInfoSection`
        *   `getMcpServersSection`
        *   `getModesSection`
    *   It also imports `getToolDescriptionsForMode` (for tool definitions) and `addCustomInstructions` (for handling custom rules and preferences).

3.  **Usage in `dafu/src/core/Cline.ts`**:
    *   The `attemptApiRequest` method calls `generatePrompt` (aliased as `SYSTEM_PROMPT`), passing the wide array of necessary parameters.

**Interpretation for `dafu`**:
The system prompt in `dafu` is constructed by the `generatePrompt` function acting as an orchestrator. This function explicitly calls the imported section-generating functions and `getToolDescriptionsForMode`, assembling their outputs into the final system prompt. Custom instructions are passed as parameters to `generatePrompt` and likely handled by the imported `addCustomInstructions` function or integrated directly by `generatePrompt`.

## Key Architectural Differences in Prompt Construction

1.  **Orchestration of Assembly**:
    *   **`dafu`**: Employs an **explicitly modular assembly**. The `generatePrompt` function clearly acts as an assembler, piecing together the system prompt from various components returned by dedicated, imported functions (e.g., `getSystemInfoSection()`, `getModesSection()`). The parameters passed to `generatePrompt` allow fine-grained control over these components.
    *   **`cline`**: Uses a **base prompt augmentation model**. It starts with a more monolithic `SYSTEM_PROMPT` entity (which internally might be assembled from parts, as suggested by its module's imports) and then appends distinct blocks of custom instructions using a separate `addUserInstructions` function. The top-level call from `Cline.ts` is less about assembling many small pieces and more about taking a large piece and adding to it.

2.  **Parameterization at the `Cline.ts` Level**:
    *   **`dafu`**: `Cline.ts` passes a large number of specific configuration and state parameters directly to `generatePrompt`.
    *   **`cline`**: `Cline.ts` passes fewer parameters to `SYSTEM_PROMPT` directly (`cwd`, `supportsComputerUse`, `mcpHub`, `browserSettings`). Other details like OS/shell info are likely derived within `SYSTEM_PROMPT` itself. Custom instructions are handled via a separate set of parameters to `addUserInstructions`.

3.  **Handling of Custom Instructions**:
    *   **`dafu`**: `globalCustomInstructions` and `customModeConfigs` are direct parameters to `generatePrompt`, which then likely uses its imported `addCustomInstructions` internally.
    *   **`cline`**: Custom instructions from various sources (`.clinerules`, settings, `.clineignore`, language preferences) are collated in `Cline.ts` and then passed to the separate `addUserInstructions` function.

## Conclusion

The analysis scripts confirm that `dafu` utilizes a more explicitly modular architecture for constructing its system prompt, where a central `generatePrompt` function assembles the prompt from various imported, section-specific functions. `cline`, on the other hand, uses a primary `SYSTEM_PROMPT` entity for its core content, which is then extended by appending specific instruction sets via `addUserInstructions`. The `dafu` approach allows for more granular parameterization of the prompt generation process directly from `Cline.ts`.
