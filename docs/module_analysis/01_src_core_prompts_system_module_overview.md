# 1. Module Overview

**Parent Report:** [Technical Report: `src/core/prompts/system.ts`](./00_src_core_prompts_system_report_overview.md)

**File Path:** `src/core/prompts/system.ts`

**Subsystem:** `core`

**Purpose:**
This module is responsible for generating the complete system prompt that is sent to the Large Language Model (LLM). It orchestrates the assembly of various informational sections, including the AI's role definition, operational rules, tool descriptions, custom instructions, and contextual information like system details and current objectives.

The module dynamically constructs this prompt based on several factors:

- The current operational `mode` of the AI.
- The availability of services like codebase indexing (`CodeIndexManager`) and MCP Hub (`McpHub`).
- User-defined custom instructions (global or mode-specific).
- The possibility of loading a completely custom system prompt from a file, which can override the standard assembly process.

Its primary export, `SYSTEM_PROMPT`, serves as the main entry point for obtaining the finalized system prompt string.
