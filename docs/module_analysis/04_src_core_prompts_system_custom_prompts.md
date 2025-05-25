# 4. Handling of Custom System Prompts

**Parent Report:** [Technical Report: `src/core/prompts/system.ts`](./00_src_core_prompts_system_report_overview.md)

The `src/core/prompts/system.ts` module provides a mechanism for users or specific modes to override the standard, dynamically assembled system prompt with a custom one. This is primarily managed within the main exported `SYSTEM_PROMPT` function.

## 4.1. File-Based Custom System Prompts

- **Loading Mechanism:** The `SYSTEM_PROMPT` function first attempts to load a custom system prompt from a file. This is done using the `loadSystemPromptFile` function, which is imported from `./sections/custom-system-prompt.ts`.
    - `loadSystemPromptFile` takes `cwd` (current working directory), `mode`, and `variablesForPrompt` (like workspace path, current mode, language, shell, OS) as arguments. It likely looks for a specifically named file (e.g., `.roo_system_prompt.md` or similar, possibly mode-specific) within the workspace.
- **Override Logic (Lines 150-167 in `src/core/prompts/system.ts`):**
    - If `loadSystemPromptFile` returns a non-null string (meaning a custom prompt file was found and read), this file content (`fileCustomSystemPrompt`) is used as the main body of the system prompt.
    - In this scenario, the detailed assembly performed by the internal `generatePrompt` function (which includes sections like tools, rules, capabilities, etc.) is **bypassed**.
    - The final prompt in this case consists of:
        1.  The `roleDefinition` (determined from the current mode or `promptComponent`).
        2.  The content of the `fileCustomSystemPrompt`.
        3.  The output of `addCustomInstructions` (which combines mode-specific custom instructions and global custom instructions).
    - This allows users to have almost complete control over the system prompt by providing their own file, while still prepending the standard role definition and appending standard custom instructions.

## 4.2. Mode-Specific Customizations (`PromptComponent`)

- **`CustomModePrompts` and `PromptComponent`:** The `SYSTEM_PROMPT` function can receive an optional `customModePrompts` object. This object maps mode slugs to `PromptComponent` objects.
    - A `PromptComponent` (defined in `../../shared/modes`) can have its own `roleDefinition` and `customInstructions`.
- **Usage:**
    - If a `promptComponent` is found for the current mode, its `roleDefinition` will be preferred over the mode's default `roleDefinition` (see line 58: `const roleDefinition = promptComponent?.roleDefinition || modeConfig.roleDefinition`).
    - Similarly, its `customInstructions` are prioritized when `addCustomInstructions` is called (see line 101 and 153-159).
- This allows for finer-grained customization of role definitions and instructions on a per-mode basis, even when not using a full file-based override.

**In summary:** The system supports two main ways to customize the system prompt:

1.  **Full Override via File:** A user can place a specific file in their workspace to replace most of the standard prompt.
2.  **Mode-Specific Tweaks:** Custom modes can define their own `roleDefinition` and `customInstructions` that augment or override the defaults for that mode, without replacing the entire prompt structure (unless a file-based prompt is also used).
