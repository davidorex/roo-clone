# 4. Dependencies

**Parent Report:** [Technical Report: `src/core/prompts/sections/index.ts`](./00_src_core_prompts_sections_index_report_overview.md)

The `src/core/prompts/sections/index.ts` module's primary dependencies are the local modules from which it re-exports symbols. These are all located within the same directory: `src/core/prompts/sections/`.

**Direct Dependencies (Re-exported Modules):**

Based on the dependency graph analysis (`src_core_prompts_sections_index_dependencies.json`):

1.  `./rules`
2.  `./system-info`
3.  `./objective`
4.  `./custom-instructions`
5.  `./tool-use`
6.  `./mcp-servers`
7.  `./tool-use-guidelines`
8.  `./capabilities`
9.  `./modes`
10. `./markdown-formatting`

**Dependency Metrics:**

- **Fanout:** 10 (This module directly re-exports from 10 other modules).
- **Centrality:** 0 (As a pure re-exporting index file, it doesn't typically have other modules depending on it for unique logic, but rather for convenient access to the re-exported symbols).
- **Imported By:** This module is designed to be imported by other parts of the application that need to construct system prompts (e.g., modules in `src/core/prompts/` or `src/core/webview/`). The `src_core_prompts_sections_index_dependencies.json` file itself lists `imported_by: []`, which means the dependency analysis tool did not find direct imports _of this index file_ within the scope of its analysis run for _this specific file_. However, its purpose implies it _is_ imported elsewhere.

The API contract file (`src_core_prompts_sections_index_contracts.json`) shows an empty `imports` array because re-exports (`export { ... } from '...'`) are not treated as direct imports of the `index.ts` file itself in that context. The dependencies are implicitly defined by the `from "./module-name"` clauses.
