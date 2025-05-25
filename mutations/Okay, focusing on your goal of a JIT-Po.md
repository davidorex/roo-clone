Okay, focusing on your goal of a "JIT-Powered Code Mode" as your primary (or sole) mode, achieved through "pure elegant programmatic pragmatism" by repurposing existing codebase elements:

**Vision: "JIT-Powered Code Mode" - Pragmatic Refinement of Existing Structures**

This approach refines the existing "code" mode (or replaces it as your default) to operate with a Just-in-Time (JIT) prompt composition strategy. The elegance comes from leveraging current structures where possible, and the pragmatism from centralizing new JIT logic rather than requiring an immediate, widespread rewrite of all prompt-generating components.

1.  **Mode Configuration & Activation (Repurposing Existing Mode System):**

    - The "JIT-Powered Code Mode" is set as your active mode.
    - The existing mode definition system (handled by `src/core/webview/ClineProvider.ts` and understood by `src/core/prompts/system.ts`) is used to define the _superset_ of all tools, rules, and core persona/objective elements relevant to this advanced coding mode.

2.  **`JitPromptOrchestrator` (New Logic, likely integrated within `src/core/task/Task.ts`):**
    This is the intelligent core of the JIT system for this mode.

    - **Initialization (Pragmatic Reuse - "Wrapper" Style):**
        - When a `Task` starts in "JIT-Powered Code Mode," the `JitPromptOrchestrator`:
            1.  Calls existing functions like `getToolDescriptionsForMode("JIT_CODE_MODE")`, `getRulesSection()`, `getMcpServersSection("JIT_CODE_MODE")`, etc., _once_. These functions return their current verbose string outputs, already filtered by what's defined as available for this mode.
            2.  The orchestrator **caches these complete strings** (e.g., `this.cachedModeToolSpecsXML`, `this.cachedModeRulesText`). This avoids needing to immediately refactor all those individual generator functions for more granular, on-demand fetching.
    - **Per-Turn Dynamic Prompt Assembly:**
      Before each LLM API call, the `JitPromptOrchestrator`:
        1.  **Base System Prompt**: Constructs an **ultra-minimal base system prompt**. This might include the core persona/objective defined for the "JIT-Powered Code Mode" and brief guidance on how the LLM can request further details (e.g., "Tool specs and rules provided contextually or on request.").
        2.  **Lean Conversation History**: `Task.ts` provides the current `apiConversationHistory`. This history is kept lean by:
            - Including full user inputs and LLM textual reasoning.
            - Logging file modifications with **version references** to a `ContentCacheService`.
            - Logging information-gathering tool calls with a concise action record, an optional **micro-summary** of key findings (for LLM awareness), and a `ContentReferenceID` to the full data in the `ContentCacheService`.
        3.  **JIT Injection by Parsing Cached Full Texts**:
            - Based on the immediate conversational context (user query, LLM's partial output, inferred intent), the orchestrator _parses its internally cached full strings_ (e.g., `this.cachedModeToolSpecsXML`, `this.cachedModeRulesText`) to extract and inject _only the specific snippets_ (e.g., one tool's XML spec, one relevant rule) into the current prompt. This requires robust parsing/extraction logic within the orchestrator.
        4.  **JIT File Content Resolution (via `ContentCacheService` - New Component)**: Relevant `ContentReferenceID`s from the lean history are identified. Full content is fetched from the new `ContentCacheService` and injected _transiently_ into the current prompt. Fresh file state is always provided before a `replace_in_file` operation.
        5.  **JIT Environment Details**: Output from `getEnvironmentDetails.ts` is processed (potentially providing full details initially, then deltas or summaries) for injection.
        6.  The final assembled prompt (minimal system part + dynamic messages part with JIT injections) is passed to the `ApiHandler`.

3.  **Key Supporting Components:**
    - **`ContentCacheService` (New)**: Essential for storing all unique file contents and large tool outputs, providing `ContentReferenceID`s.
    - **`src/core/task/Task.ts`**: Hosts/integrates the `JitPromptOrchestrator`, manages the lean `apiConversationHistory`, and interacts with `ContentCacheService`.
    - **`src/core/mentions/index.ts`**: Modified to use `ContentCacheService` for resolved file mentions, returning references.
    - **`src/core/prompts/system.ts` (`SYSTEM_PROMPT` function)**: Simplified for the "JIT-Powered Code Mode" to only return the ultra-minimal base prompt, delegating detailed assembly to the `JitPromptOrchestrator`.

**Pragmatism and Elegance:**

- This approach pragmatically reuses the existing mode system to define the _scope_ of available information (tools, rules relevant to "coding") and reuses the _outputs_ of current prompt component generators, minimizing their immediate refactoring.
- The elegance lies in the dynamic, context-sensitive assembly of the LLM's prompt by the `JitPromptOrchestrator`, ensuring the LLM receives a highly focused yet sufficiently aware context for each turn.
- This directly addresses your desire for a JIT system that becomes your primary, refined "code" mode, built by intelligently layering new JIT orchestration logic on top of existing codebase structures.
