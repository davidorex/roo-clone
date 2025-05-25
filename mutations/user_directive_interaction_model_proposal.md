# Proposal: User-Directive Driven Interaction Model

This document outlines a conceptual plan to shift the extension's interaction model from an autonomous LLM action-driven model to one where the user provides a directive, the model responds, and then all action stops until the user's next directive. Tool use will only occur when explicitly commanded by the user.

## Core Idea: A Controlled Pause After Every AI Response

The central mechanism is to introduce an explicit pause in the `Task` class's main processing loop. This pause occurs after the AI has completed its turn (i.e., its full response has been presented to the user). The loop will only resume upon receiving the user's next explicit input.

## Key Conceptual Changes for Implementing the Pause:

1.  **Introduce a "Wait for User Directive" State in `Task.ts`:**

    - Add a new boolean attribute to the `Task` class:
        ```typescript
        public isAwaitingUserDirective: boolean = false;
        ```
    - This flag will control whether the task's main loop should pause or continue.

2.  **`presentAssistantMessage.ts` Signals the Pause:**

    - After `presentAssistantMessage.ts` finishes processing and displaying all content blocks from the AI's current message:
        - It will set `cline.isAwaitingUserDirective = true;`.
        - Crucially, `presentAssistantMessage.ts` must **not** trigger the signal (e.g., by resolving `cline.userMessageContentReadyResolver()`) that normally tells `Task.recursivelyMakeClineRequests()` to proceed with the next AI call if `isAwaitingUserDirective` is now true. This ensures the pause takes effect.

3.  **`Task.recursivelyMakeClineRequests()` Respects the Pause:**

    - Within the main loop in `Task.ts` (specifically in `recursivelyMakeClineRequests()` or an equivalent loop control point), before it attempts to make the next API call to the AI:
        - It will add a check: `if (this.isAwaitingUserDirective) { ... }`.
        - If `true`, the loop will effectively pause (e.g., by `return`ing).
        - The loop will not proceed until this flag is cleared by new user input.

4.  **User Input Resumes the Loop:**
    - When a new message/directive arrives from the user via the webview:
        - The handler for this new user input (likely within `Task.ts` methods called by `ClineProvider.ts`) will first set `this.isAwaitingUserDirective = false;`.
        - The user's new input then becomes the `userContent` for the next iteration of the loop.
        - The `recursivelyMakeClineRequests()` loop will then be re-entered or signaled to continue, now using this fresh `userContent`.

## Strict User-Directed Tool Use:

- **Interaction Flow Example:**

    1.  **User:** "Summarize the main points of `src/core/task/Task.ts`."
    2.  **AI (Response):** (Provides a textual summary).
    3.  _(System pauses, `isAwaitingUserDirective` is true)_
    4.  **User:** "Read the first 20 lines of `docs/user_directive_interaction_model_proposal.md`."
    5.  **AI (Response):**
        ```xml
        <read_file>
        <path>docs/user_directive_interaction_model_proposal.md</path>
        <end_line>20</end_line>
        </read_file>
        ```
    6.  _(System executes `read_file`, its output is prepared as the next input to the AI. System pauses, `isAwaitingUserDirective` is true. The AI will receive the file content as a tool result in its next turn if the user gives a follow-up directive like "What do you see?" or "Now summarize that.")_
    7.  **User:** "Apply this diff to `src/core/task/Task.ts`: [diff content]"
    8.  **AI (Response):**
        ```xml
        <apply_diff>
        <path>src/core/task/Task.ts</path>
        <diff>[diff content]</diff>
        </apply_diff>
        ```
    9.  _(System executes `apply_diff`. The existing `askApproval` within `applyDiffTool` might still show a preview for this specific, user-commanded action. System pauses.)_

- **Tool Execution:** When `presentAssistantMessage.ts` receives an AI response consisting _only_ of a valid tool XML, it will process and execute that tool. The existing per-tool confirmation mechanisms (like diff previews for `apply_diff`) can remain as a final safeguard for the specific execution, but the decision to invoke the tool at all is now solely driven by the user's preceding directive.

## Rationale for This Approach:

- **User Control:** This model places control firmly with the user. The AI is responsive, not proactive with actions.
- **Simplicity in AI Logic:** The AI's task is simplified: respond to the directive, or if the directive is a tool command, generate the tool XML.
- **Focused Code Changes:** The primary code modifications are to the task loop control flow (`Task.ts` and `presentAssistantMessage.ts`) to implement the pause, and to the system prompt.
- **Iterative Refinement:** This provides a clear, safe baseline. Further refinements to UI or how tool results are presented can be built upon this foundation.

This strategy aims to achieve the core "stop-and-wait for user directive" behavior with maximal user control and targeted, manageable changes.
