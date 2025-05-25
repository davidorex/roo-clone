Envisioning the "most elegant `PromptBuilder`" that integrates with and repurposes existing `roo-clone` codebase elements for "Atomic Just-in-Time (JIT) Prompt Composition," while ensuring the LLM has "enough context to be aware of where it is and what’s gone on before," involves these key ideas:

**1. Centralized JIT Orchestration within `src/core/task/Task.ts`:**
The `Task` class, which already manages the LLM interaction loop and `apiConversationHistory`, would be enhanced to embody the `PromptBuilder`'s intelligence. Before each call to `apiHandler.createMessage(system, messages)`, `Task.ts` would dynamically construct both the `system` (now minimal and potentially turn-specific) and `messages` (lean history + JIT injections) arguments.

**2. Repurposing Existing Prompt Component Generators (from `src/core/prompts/`):**

- Modules currently generating large static sections of the system prompt (e.g., `getToolDescriptionsForMode` in `src/core/prompts/tools/index.ts`, `getRulesSection` in `src/core/prompts/sections/rules.ts`) would be refactored.
- **New Behavior**: They become granular, queryable sources. For example, `getToolDescriptionsForMode` could become `getToolSpecification(toolName: string)` or `getToolsByCategory(category: string)`. `getRulesSection` could become `getSpecificRule(ruleId: string)`.
- **JIT Usage**: `Task.ts` (as `PromptBuilder`) calls these refactored functions on-demand to fetch only specific tool specs, rules, or capability snippets relevant to the LLM's current action, query, or a detected need (e.g., a rule violation). This fetched information is injected into the prompt for the _current turn only_.

**3. Integration with a `ContentCacheService` (New Component):**

- This service stores unique versions of file contents (from `read_file`, `write_to_file` results, `@mention` resolutions) and potentially other large tool outputs, returning a `ContentReferenceID`.
- **`Task.ts` Role**:
- Ensures that when file content is obtained (e.g., via `src/core/mentions/index.ts`'s `getFileOrFolderContent` or tool results), it's stored in `ContentCacheService`, and the `apiConversationHistory` stores the `ContentReferenceID` plus minimal metadata (e.g., `[File: foo.txt, Ref: <id>, Size: 10KB, Action: Read]`).
- For the current LLM prompt, `Task.ts` decides which references from the lean history are relevant, retrieves their full content from `ContentCacheService`, and injects this full content _transiently_ into the prompt. This content is not re-persisted in full to `apiConversationHistory`.

**4. Adapting `src/core/environment/getEnvironmentDetails.ts`:**

- This module could be refactored to offer different levels of detail:
- `getFullDetails()`: For the initial turn.
- `getDeltaSince(previousState)`: For subsequent turns, providing only changes to the environment.
- `getMinimalSummary()`: Providing a very high-level overview, requiring the LLM to use tools (whose results are then cached/referenced) for more specifics.
- `Task.ts` (as `PromptBuilder`) selects the appropriate detail level for the current turn.

**5. Maintaining LLM Awareness ("What's Gone On Before"):**

- The persistent `apiConversationHistory` remains the LLM's "narrative thread." It will contain:
- Full user inputs and LLM textual reasoning/responses.
- Concise log entries for all tool invocations (e.g., `[Tool 'read_file' on 'bar.txt' called.]`).
- For file modifications, version references (e.g., `[File 'foo.txt' updated. Prior: <hash_A>, New: <hash_B>.]`).
- For critical information-gathering tools, an optional, very brief summary of the key finding alongside the `ContentReferenceID` (e.g., `[Read 'package.json'. Version: '1.2.3'. Full content cached (ref: <id>).]`).
- This lean but informative history allows the LLM to track the sequence of events. If it needs full details behind a reference or log, it can implicitly or explicitly signal this, and the `PromptBuilder` handles JIT injection from the `ContentCacheService`.

**Elegance & Effectiveness:**
This approach repurposes existing information sources by making them granular and callable by a more intelligent `Task.ts` (acting as the `PromptBuilder`). It centralizes the JIT decision-making. The system provides a highly tailored, minimal prompt for each LLM interaction, injecting detailed context (tool specs, file contents, rules) only when and where it's most relevant for the immediate step, while the lean persistent history ensures the LLM maintains situational awareness. This supports both token efficiency (Goal 1) and provides the necessary context for the LLM to be guided towards creating additive codebase changes (Goal 2).
