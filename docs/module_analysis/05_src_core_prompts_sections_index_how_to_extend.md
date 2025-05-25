# 5. How to Extend

**Parent Report:** [Technical Report: `src/core/prompts/sections/index.ts`](./00_src_core_prompts_sections_index_report_overview.md)

Extending this module involves adding a new prompt section to be aggregated and re-exported. The process is straightforward:

1.  **Create the New Section Module:**

    - Within the `src/core/prompts/sections/` directory, create a new TypeScript file for your new section (e.g., `my_new_section.ts`).
    - In this new file, define and export the function or constant that provides the content for this new prompt section.

        ```typescript
        // Example: src/core/prompts/sections/my_new_section.ts

        // Assuming SectionGeneratorArgs is a type for arguments if your section is dynamic
        // import { SectionGeneratorArgs } from "../types"; // Or a relevant shared type

        export function getMyNewSection(/* args?: SectionGeneratorArgs */): string {
        	return `
        ## My New Section Title
        Content for my new section...
            `.trim()
        }

        // Or, if it's a static string:
        // export const myNewSectionContent: string = `
        // ## My New Section Title
        // Static content...
        // `;
        ```

2.  **Re-export from `index.ts`:**
    - Open `src/core/prompts/sections/index.ts`.
    - Add a new export line to re-export the symbol(s) from your newly created section module.
        ```typescript
        // Add this line to src/core/prompts/sections/index.ts
        export { getMyNewSection /*, myNewSectionContent */ } from "./my_new_section"
        ```

**Considerations:**

- **Naming Conventions:** Follow existing naming conventions for files (kebab-case) and exported symbols (e.g., `get<SectionName>Section` for functions, `<sectionName>Section` for constants).
- **Dynamic vs. Static Sections:** Decide if your section content is static (can be a constant string) or dynamic (requires a function that might take arguments to generate the string).
- **Dependencies of the New Section:** If your new section module (`my_new_section.ts`) has its own dependencies, manage them within that file. The `index.ts` file should remain clean of direct imports other than for re-exporting purposes.
- **Purpose and Clarity:** Ensure the new section serves a clear purpose in the construction of AI prompts and is well-documented within its own module.
