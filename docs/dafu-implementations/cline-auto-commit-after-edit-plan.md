# Plan: Requiring LLM to Commit After File Edits in `cline`

This document outlines an envisioned plan to modify the `cline` codebase to require the LLM to use the `execute_command` tool to `git add` and `git commit` changes after every successful `write_to_file` or `replace_in_file` operation. The goal is for the LLM to drive these commits with descriptive messages.

## I. Core Principle

After a file is successfully modified by the LLM (and approved by the user), `cline` will explicitly instruct the LLM that its immediate next actions **must** be to:
1.  Stage the modified file using `git add <filepath>`.
2.  Commit the staged file using `git commit -m "LLM-generated descriptive message"`.
Both actions will be performed by the LLM invoking the `execute_command` tool.

## II. Envisioned Modifications

### A. Enhancing Tool Success Messages (Primary Instruction Point)

The most direct method to ensure LLM compliance is to include a strong directive in the success message returned after a `write_to_file` or `replace_in_file` tool execution.

1.  **Target File:** `cline/src/core/Cline.ts`
2.  **Location:** Within the `presentAssistantMessage` method, at the point where a successful file modification by `write_to_file` or `replace_in_file` is confirmed (i.e., after `this.diffViewProvider.saveChanges()` has been approved and completed).
3.  **Modification:**
    *   When constructing the success message string that is sent back to the LLM (e.g., via `pushToolResult(formatResponse.toolResult(...))`), append a clear and mandatory instruction.
    *   **Example Appended Instruction Text:**
        ```text
        \n\nIMPORTANT ACTION REQUIRED: The file '{filePath}' has been successfully modified. You MUST now perform the following Git operations using the 'execute_command' tool, in this exact order:
        1. Stage the changes: Use '<execute_command><command>git add {filePath}</command><requires_approval>false</requires_approval></execute_command>'
        2. Commit the changes: Use '<execute_command><command>git commit -m "Your detailed, specific, and descriptive commit message here, explaining the purpose and nature of the changes made."</command><requires_approval>true</requires_approval></execute_command>'

        Provide a comprehensive commit message that will be clear to other developers and future AI assistants. Execute these commands NOW before proceeding with any other actions or tools.
        ```
        *(Note: `{filePath}` should be replaced with the actual relative path of the modified file, properly formatted for a shell command. The `requires_approval` for `git add` could be `false`, while for `git commit` should likely be `true` to allow user review of the message.)*

### B. Reinforcing with System Prompt Modifications

To further ensure compliance and set clear expectations, the main system prompt should be updated.

1.  **Target File:** `cline/src/core/prompts/system.ts`
2.  **Location:** Within the `SYSTEM_PROMPT` template literal, under a relevant section like `# RULES` or `# Tool Use Guidelines`.
3.  **Modification:**
    *   Add a new rule emphasizing the mandatory nature of committing after edits.
    *   **Example Rule Text:**
        ```text
        - After every successful file modification using 'write_to_file' or 'replace_in_file', your IMMEDIATE next action MUST be to use the 'execute_command' tool to stage and commit the changes for that specific file.
        - First, invoke `execute_command` with `git add <filepath>`.
        - Second, after the 'git add' is successful, invoke `execute_command` with `git commit -m "Your descriptive commit message"`.
        - Your commit message must be detailed, specific, and accurately reflect the changes made and their purpose. This is critical for project history and collaboration.
        - Failure to perform these Git operations immediately after a file modification will be considered an operational error.
        ```

### C. Expected LLM Interaction Flow

1.  LLM calls `write_to_file` or `replace_in_file` with a specific file path.
2.  `cline` processes the tool, shows the diff via `DiffViewProvider`, and the user approves the changes. The file is saved to disk.
3.  `cline` returns a success message to the LLM, which now includes the "IMPORTANT ACTION REQUIRED..." directive to `git add` and `git commit`.
4.  The LLM, guided by this direct instruction and the system prompt rule, should then:
    *   In its next response, generate a tool call: `<execute_command><command>git add <modified_file_path></command><requires_approval>false</requires_approval></execute_command>`.
    *   `cline` executes this command.
    *   `cline` returns the result of `git add` to the LLM.
    *   In its subsequent response, the LLM generates another tool call: `<execute_command><command>git commit -m "LLM-generated descriptive message"</command><requires_approval>true</requires_approval></execute_command>`.
    *   `cline` executes this command (likely after user approval of the commit message if `requires_approval` is true).
    *   `cline` returns the result of `git commit` to the LLM.
5.  The LLM can then proceed with other tasks or use `attempt_completion`.

### D. Key Considerations

1.  **Commit Message Quality:** The effectiveness relies on the LLM's ability to generate good commit messages based on the prompt's guidance.
2.  **Error Handling for Git Commands:** The `execute_command` tool's success/failure reporting must be clear so the LLM can react appropriately (e.g., if a commit fails due to an empty message or other Git issues).
3.  **Interaction with `CheckpointTracker`:**
    *   `cline` has an internal `CheckpointTracker` that uses Git for versioning changes, typically creating commits with generic messages after successful file edits (via `saveCheckpoint()`).
    *   If the LLM also makes commits, this could lead to two commits per logical change.
    *   **Potential Adjustments to `CheckpointTracker` (to be decided during implementation):**
        *   Option A: Disable `CheckpointTracker`'s automatic commit when an LLM-driven commit is expected.
        *   Option B: Modify `CheckpointTracker` to amend its last commit with the LLM's message if an LLM commit follows shortly.
        *   Option C: Allow both, distinguishing them by commit message style (e.g., `Checkpoint:` prefix for tracker).
        *   For this envisioning, the primary goal is to enable LLM-driven commits; `CheckpointTracker` integration is a subsequent refinement.
4.  **User Experience:** The user will observe these `git add` and `git commit` commands. Setting `requires_approval: true` for `git commit` is recommended so the user can review and approve/modify the LLM-generated commit message.
5.  **File Path Accuracy:** The `{filePath}` variable in the appended instruction must accurately reflect the path of the file that was modified, relative to the workspace root, suitable for Git commands.
6.  **State Management (e.g., `lastReadFile`):** If a "read-before-edit" check is implemented (as discussed separately), consideration must be given to when the `lastReadFile` state is cleared or updated in relation to the commit process. Ideally, it should persist until after the commit, or the commit instruction itself should be the absolute final part of the successful edit tool's response flow.

## III. Summary

This plan focuses on using strong, explicit prompting within tool success messages, reinforced by general system prompt rules, to guide the LLM to perform `git add` and `git commit` operations via the `execute_command` tool after each file modification. This approach leverages existing `cline` capabilities while aiming for LLM-authored commit messages, enhancing traceability and integration with standard development workflows.
