# Removing .rooignore Elements from the System Prompt

This document outlines the steps required to prevent instructions derived from the `.rooignore` file from being included in the system prompt generated for the LLM.

## Background

Currently, the content of the `.rooignore` file is processed by the `RooIgnoreController` into a string typically referred to as `rooIgnoreInstructions`. This string is then passed through several functions:

1.  From `Task.attemptApiRequest` to `SYSTEM_PROMPT` (in `src/core/prompts/system.ts`).
2.  Within `src/core/prompts/system.ts`, from `SYSTEM_PROMPT` to the internal `generatePrompt` function.
3.  Within `generatePrompt`, it's passed as part of an options object to `addCustomInstructions`.
4.  The `addCustomInstructions` function (in `src/core/prompts/sections/custom-instructions.ts`) then incorporates these `rooIgnoreInstructions` into the "USER'S CUSTOM INSTRUCTIONS" section of the system prompt, specifically under a "Rules:" subheading.

## Plan for Removal

To completely remove `.rooignore` elements from the system prompt, we need to interrupt this chain by stopping the `rooIgnoreInstructions` from being passed into the prompt generation logic and removing the code that specifically processes it for inclusion in the prompt.

### Step 1: Modify `RooIgnoreController.ts` (Optional but Recommended for Clarity)

- **File**: `src/core/ignore/RooIgnoreController.ts`
- **Method**: `getInstructions()`
- **Action**:
    - Consider changing the `getInstructions()` method to return an empty string or `undefined`. This makes the controller's intent clear that these instructions are no longer meant for the system prompt.
    - If `rooIgnoreInstructions` are used for other purposes within the system (e.g., direct file access filtering independent of the LLM prompt), this step might be adjusted or skipped. However, for the sole purpose of prompt modification, the subsequent steps are critical.

### Step 2: Stop Passing `rooIgnoreInstructions` in `Task.ts`

- **File**: `src/core/task/Task.ts`
- **Method**: `attemptApiRequest`
- **Action**:

    - In the `attemptApiRequest` method, locate the part where `this.rooIgnoreController?.getInstructions()` is called and its result is passed to `SYSTEM_PROMPT`.
    - Remove the `rooIgnoreInstructions` argument from the call to `SYSTEM_PROMPT`.

    **Conceptual Change:**

    ```typescript
    // In src/core/task/Task.ts, inside attemptApiRequest:

    // Before:
    // const rooIgnoreInstructions = this.rooIgnoreController?.getInstructions();
    // ...
    // const systemPrompt = await SYSTEM_PROMPT(
    //     context,
    //     this.cwd,
    //     // ... other arguments ...
    //     language,
    //     rooIgnoreInstructions // This argument
    // );

    // After:
    // const rooIgnoreInstructions = this.rooIgnoreController?.getInstructions(); // This line can be removed if not used elsewhere
    // ...
    // const systemPrompt = await SYSTEM_PROMPT(
    //     context,
    //     this.cwd,
    //     // ... other arguments ...
    //     language
    //     // rooIgnoreInstructions argument removed
    // );
    ```

### Step 3: Modify `SYSTEM_PROMPT` and `generatePrompt` in `src/core/prompts/system.ts`

- **File**: `src/core/prompts/system.ts`
- **Functions**: `SYSTEM_PROMPT` (exported) and `generatePrompt` (internal)
- **Action**:

    1.  **`SYSTEM_PROMPT` function signature**: Remove the `rooIgnoreInstructions?: string` parameter.
    2.  **`SYSTEM_PROMPT` body**: When calling `generatePrompt`, remove the `rooIgnoreInstructions` argument.
    3.  **`generatePrompt` function signature**: Remove the `rooIgnoreInstructions?: string` parameter.
    4.  **`generatePrompt` body**: When calling `addCustomInstructions`, remove `rooIgnoreInstructions` from the options object.

    **Conceptual Change in `generatePrompt`:**

    ```typescript
    // In src/core/prompts/system.ts, inside generatePrompt:

    // Before:
    // ...
    // const customUserInstructions = await addCustomInstructions(
    //     promptComponent?.customInstructions || modeConfig.customInstructions || "",
    //     globalCustomInstructions || "",
    //     cwd,
    //     mode, // Assuming 'mode.slug' or similar is passed for 'mode' argument
    //     { language: language ?? formatLanguage(vscode.env.language), rooIgnoreInstructions }
    // );
    // promptSections.push(customUserInstructions);

    // After:
    // ...
    // const customUserInstructions = await addCustomInstructions(
    //    promptComponent?.customInstructions || modeConfig.customInstructions || "",
    //    globalCustomInstructions || "",
    //    cwd,
    //    mode, // Assuming 'mode.slug' or similar is passed for 'mode' argument
    //    { language: language ?? formatLanguage(vscode.env.language) } // rooIgnoreInstructions removed from options
    // );
    // promptSections.push(customUserInstructions);
    ```

    _(Note: The actual structure of how `addCustomInstructions` result is used might involve direct concatenation rather than `promptSections.push`, adapt as per actual code.)_

### Step 4: Modify `addCustomInstructions` in `src/core/prompts/sections/custom-instructions.ts`

- **File**: `src/core/prompts/sections/custom-instructions.ts`
- **Function**: `addCustomInstructions`
- **Action**:

    1.  **Function signature**: Modify the `options` parameter to remove `rooIgnoreInstructions?: string`.

        ```typescript
        // Before:
        // export async function addCustomInstructions(
        //     modeCustomInstructions: string,
        //     globalCustomInstructions: string,
        //     cwd: string,
        //     mode: string,
        //     options: { language?: string; rooIgnoreInstructions?: string } = {},
        // ): Promise<string>

        // After:
        export async function addCustomInstructions(
        	modeCustomInstructions: string,
        	globalCustomInstructions: string,
        	cwd: string,
        	mode: string,
        	options: { language?: string } = {}, // rooIgnoreInstructions removed from options type
        ): Promise<string>
        ```

    2.  **Function body**: Remove the code block that specifically checks for `options.rooIgnoreInstructions` and adds it to the `rules` array.

        ```typescript
        // In src/core/prompts/sections/custom-instructions.ts, inside addCustomInstructions:

        // Remove this block:
        // if (options.rooIgnoreInstructions) {
        //     rules.push(options.rooIgnoreInstructions);
        // }
        ```

## Verification Steps

After implementing these changes:

1.  **Compile**: Ensure the entire application compiles successfully without type errors related to the modified function signatures or removed variables.
2.  **Test with `.rooignore`**: Run the application with a `.rooignore` file present in the workspace.
3.  **Inspect System Prompt**: Use logging, debugging, or any available development tools to inspect the actual system prompt being sent to the LLM.
4.  **Confirm Absence**: Verify that the "USER'S CUSTOM INSTRUCTIONS" section, and particularly its "Rules:" subsection, no longer contains any text or rules derived from the `.rooignore` file.

By following these steps, the influence of the `.rooignore` file on the LLM's system prompt will be effectively eliminated.
