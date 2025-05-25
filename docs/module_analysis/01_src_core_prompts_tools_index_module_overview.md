# 1. Module Overview

**Parent Report:** [Technical Report: `src/core/prompts/tools/index.ts`](./00_src_core_prompts_tools_index_report_overview.md)

**File Path:** `src/core/prompts/tools/index.ts`

**Subsystem:** `core`

**Purpose:**
This module serves as the central aggregator and provider for generating the descriptive text of all tools available to the AI model. The generated descriptions are dynamically tailored based on the AI's current operational "mode," enabled experimental features, and the availability of certain services (like codebase indexing or MCP Hub). This module ensures that the AI model receives an accurate and context-aware list of tools it can utilize for a given task.
