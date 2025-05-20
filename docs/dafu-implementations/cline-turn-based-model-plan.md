# Plan: Transitioning `cline` from Autonomous Loop to Turn-Based Model

This document outlines an envisioned plan to modify the `cline` codebase, transforming it from its current autonomous, looping "task completion" model to a more traditional, turn-based interaction model. The goal is for the LLM to make one response (potentially including a single tool use) and then wait for the next explicit user input, rather than engaging in self-driven loops to "complete a task."

This analysis is based on the `cline` source code (primarily `src/core/Cline.ts` and `src/core/prompts/system.ts`) and relevant analysis scripts.

## I. Understanding `cline`'s Current Autonomous Loop

The core of `cline`'s autonomous behavior resides in `src/core/Cline.ts`:

1.  **`initiateTaskLoop(userContent: UserContent)`:** This method contains the main `while (!this.abort)` loop that drives the continuous interaction until a task is explicitly completed by `attempt_completion` or aborted.
2.  **`recursivelyMakeClineRequests(nextUserContent, includeFileDetails)`:** This function is called within the loop. It:
    *   Makes an API call to the LLM (`attemptApiRequest`).
    *   Processes the LLM's response, including executing any tools (`presentAssistantMessage`).
    *   **Key Looping Mechanism**: If the LLM responds with only text and does *not* use the `attempt_completion` tool, the `initiateTaskLoop` itself constructs a new input for the LLM using `formatResponse.noToolsUsed()` (which essentially tells the LLM it must use a tool or complete the task) and calls `recursivelyMakeClineRequests` again. This creates the autonomous, self-perpetuating loop.
3.  **`presentAssistantMessage`:** This method handles the LLM's response. If a `tool_use` block is present, it executes the tool. The result of this tool execution (`tool_result`) is then packaged as `userContent` for the *next* iteration of `recursivelyMakeClineRequests`.
4.  **System Prompt Influence:** The current system prompt in `src/core/prompts/system.ts` is heavily geared towards iterative task execution, guiding the LLM to use tools repeatedly until a task is "done" and then call `attempt_completion`.

## II. Envisioned Plan for Transition to a Turn-Based Model

### A. Core Logic Modifications in `cline/src/core/Cline.ts`

1.  **Eliminate the Main Autonomous Loop in `initiateTaskLoop`:**
    *   **Action:** Remove the `while (!this.abort)` loop from `initiateTaskLoop`.
    *   **Refactor:** `initiateTaskLoop` should be restructured to make only a *single* call to a processing function (e.g., a modified `recursivelyMakeClineRequests` or a new function like `processSingleUserTurn`).
    *   **Remove Auto-Reprompting:** The critical logic where `initiateTaskLoop` checks if the LLM used a tool and, if not, automatically sends `formatResponse.noToolsUsed()` to force another cycle, **must be removed entirely.**

2.  **Refactor `recursivelyMakeClineRequests` (e.g., to `processSingleTurn`):**
    *   **Purpose Change:** This function will now manage a single turn of interaction.
    *   **Actions:**
        *   It will still call `attemptApiRequest` to get one response from the LLM.
        *   It will still call `presentAssistantMessage` to parse the LLM's response, display text, and execute *at most one* tool if requested by the LLM.
    *   **Critical Change:** After `presentAssistantMessage` completes (i.e., LLM text is displayed, and if a tool was used, it has executed and its result is available), this function must **return control flow**. It should no longer call itself or trigger another API request automatically. The system will then wait for the actual human user's next input.

3.  **Adapt State Management for Tool Results:**
    *   Currently, `presentAssistantMessage` collects tool results into `this.userMessageContent`, which feeds the next iteration of the autonomous loop.
    *   **New Behavior:** When a tool is executed within `presentAssistantMessage` in a turn-based model:
        *   The `tool_result` should still be formatted.
        *   This `tool_result` will be added to `this.apiConversationHistory` to provide context for the LLM's *next* turn (which will only occur after new user input).
        *   It will also be added to `this.clineMessages` to be displayed in the UI.
        *   The system then idles, awaiting the next message from the human user.

4.  **Review `userMessageContentReady` Mechanism:**
    *   The `pWaitFor(() => this.userMessageContentReady)` is used to ensure tool execution completes before the loop continues.
    *   In a turn-based model, this might still be useful within `presentAssistantMessage` to ensure a single assistant message (including its one tool use, if any) is fully processed before `processSingleTurn` returns. However, it will no longer trigger an automatic loop continuation.

### B. System Prompt Modifications in `cline/src/core/prompts/system.ts`

The system prompt needs significant rephrasing to align with a turn-based model.

1.  **Revise "OBJECTIVE" Section:**
    *   **Current:** Emphasizes iterative task accomplishment, breaking down goals, and using tools sequentially until completion.
    *   **New:** Should emphasize responding accurately and helpfully to the user's *current* message, using at most one tool if necessary to gather information or perform an action, and then awaiting further user input. The concept of an overarching "task" that the LLM autonomously completes should be removed or heavily de-emphasized.

2.  **Adjust "Tool Use Guidelines":**
    *   The core instruction "use one tool at a time per message" remains valid.
    *   Phrases like "accomplish the task iteratively" should be removed or rephrased to reflect user-driven turns.
    *   The strong emphasis on `attempt_completion` as the signal for task finalization needs to be softened. It might still be used if the LLM believes it has fully addressed the user's immediate request, but it no longer gates the end of an autonomous process.

3.  **Remove "Pushing" or "Autonomous Action" Language:**
    *   Eliminate any phrasing that encourages the LLM to continue working on its own, to "keep trying," or to use tools until a multi-step "task" is finished.
    *   The automated message `formatResponse.noToolsUsed()` (defined in `cline/src/core/prompts/responses.ts`) should no longer be used by `Cline.ts` to re-prompt the LLM if it doesn't use a tool.

### C. Webview and `cline/src/core/webview/ClineProvider.ts` Interaction

1.  **`ClineProvider.ts` as the Turn Initiator:**
    *   The method in `ClineProvider.ts` that handles messages from the webview (e.g., when the user sends a chat message) will become the primary trigger for each turn of interaction.
    *   **Flow:**
        1.  User sends a message from the webview.
        2.  `ClineProvider.ts` receives this message.
        3.  `ClineProvider.ts` calls the refactored method in `Cline.ts` (e.g., `processSingleTurn`) with the new user content.
        4.  `Cline.ts` makes one call to the LLM API.
        5.  The LLM responds (text, and optionally one tool_use).
        6.  `Cline.ts` processes this response (displays text, executes the tool if present).
        7.  The results (LLM's text response, and any tool_result) are sent back to the webview via `ClineProvider.ts`.
        8.  The system now waits for the next user action.

2.  **Task Resumption Logic (`resumeTaskFromHistory` in `Cline.ts`):**
    *   This will need to change. Instead of trying to restart an autonomous loop, it should load the conversation history, present it to the user, and then wait for the user to provide the next message to continue the turn-based conversation.

### D. Impact on Specific Tools

*   **`attempt_completion`**: Its role shifts. It's no longer the signal that an autonomous task is complete. It might be used by the LLM to indicate it believes it has fulfilled the user's most recent request. The UI behavior tied to this might need review.
*   **`ask_followup_question`**: This tool fits more naturally into a turn-based model.
*   **`plan_mode_respond`**: The general interaction model will become more akin to PLAN MODE by default, where each LLM response is a discrete turn. The `plan_mode_respond` tool itself would still be specific to when the user explicitly puts `cline` into "PLAN MODE" via UI.

## Summary of Key Architectural Changes

1.  **Core Loop Removal (`Cline.ts`):** The primary `while` loop in `initiateTaskLoop` and the recursive nature of `recursivelyMakeClineRequests` (that forces continued interaction) must be dismantled.
2.  **Single Turn Processing (`Cline.ts`):** Methods will be refactored to handle just one cycle: User Input -> LLM API Call -> LLM Response Processing (incl. one tool use) -> Return to wait for next User Input.
3.  **System Prompt Overhaul (`system.ts`):** All language promoting autonomous, iterative task completion and "rushing" the LLM must be replaced with instructions for a responsive, turn-based interaction.
4.  **Control Flow Shift:** `ClineProvider.ts` (handling webview messages) will become the explicit initiator of each turn, rather than `Cline.ts` self-looping.

This transformation will fundamentally change `cline` from an agentic system designed to complete multi-step tasks autonomously into a more traditional co-pilot that responds to each user input in a discrete turn.
