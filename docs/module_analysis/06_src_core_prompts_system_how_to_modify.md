# 6. How to Modify Prompt Structure

**Parent Report:** [Technical Report: `src/core/prompts/system.ts`](./00_src_core_prompts_system_report_overview.md)

Modifying the structure or order of the system prompt involves making changes within the `src/core/prompts/system.ts` file, primarily within the `generatePrompt` function.

## 6.1. Reordering Existing Sections

- **Locate `generatePrompt`:** Identify the `generatePrompt` async function within `src/core/prompts/system.ts`.
- **Identify `basePrompt` Assembly:** The `basePrompt` template string (lines 69-101 in the current version) is where the sections are concatenated.
- **Modify Order:** To change the order, cut and paste the lines corresponding to the section generator functions within this template string. For example, to move the "Rules" section (`getRulesSection(...)`) to appear before the "Tools" section (`getToolDescriptionsForMode(...)`), you would move the line:
    ```typescript
    // ${getRulesSection(cwd, supportsComputerUse, effectiveDiffStrategy)}
    ```
    to an earlier position in the `basePrompt` template string.

## 6.2. Adding a New Standard Section

1.  **Create the Section Content Module:**

    - Follow the procedure outlined in the "How to Extend" section of the `src/core/prompts/sections/index.ts` report:
        - Create a new file in `src/core/prompts/sections/` (e.g., `my_brand_new_section.ts`).
        - Define and export a function (e.g., `getMyBrandNewSection(): string`) or a constant string from this new file.
    - Re-export this new symbol from `src/core/prompts/sections/index.ts`.
        ```typescript
        // In src/core/prompts/sections/index.ts
        export { getMyBrandNewSection } from "./my_brand_new_section"
        ```

2.  **Import and Use in `system.ts`:**
    - In `src/core/prompts/system.ts`, import your new section generator from `./sections`:
        ```typescript
        import { /* ..., */ getMyBrandNewSection } from "./sections"
        ```
    - Add a placeholder for your new section within the `basePrompt` template string in the `generatePrompt` function, at the desired position:
        ```typescript
        const basePrompt = `...
        ${getMyBrandNewSection()}
        ...`
        ```
    - Ensure any necessary arguments are passed to your new section generator if it requires them.

## 6.3. Removing a Standard Section

- To remove a section, simply delete or comment out its corresponding placeholder and function call from the `basePrompt` template string within the `generatePrompt` function.
- Consider if the imported function for that section is still needed elsewhere in `system.ts` or if the import statement itself can be removed.

## 6.4. Modifying Conditional Logic for Sections

- Some sections, like `mcpServersSection`, are included conditionally.
    ```typescript
    // Example for mcpServersSection
    // const [modesSection, mcpServersSection] = await Promise.all([
    // 	getModesSection(context),
    // 	modeConfig.groups.some((groupEntry) => getGroupName(groupEntry) === "mcp")
    // 		? getMcpServersSection(mcpHub, effectiveDiffStrategy, enableMcpServerCreation)
    // 		: Promise.resolve(""),
    // ]);
    ```
- To change the conditions under which a section appears, modify the relevant conditional logic before or during its inclusion in `basePrompt`.

## Important Considerations:

- **Logical Flow:** When reordering or adding sections, consider the logical flow of information for the LLM. Some sections might provide context necessary for subsequent sections.
- **Impact on LLM Behavior:** The order and content of the system prompt can significantly affect the LLM's performance, adherence to instructions, and overall behavior. **Thorough testing is crucial after any modifications.**
- **Custom System Prompt Overrides:** Remember that changes to `generatePrompt` will **not** affect users who are utilizing a file-based custom system prompt (via `loadSystemPromptFile`), as this bypasses the standard assembly for most sections.
- **Parameter Passing:** If a new or modified section generator requires new parameters, ensure these are passed down through `SYSTEM_PROMPT` and `generatePrompt` if they originate from outside this module.
