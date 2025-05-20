# Plan: Requiring LLM to Use Git Commit Templates in `cline`

This document outlines an envisioned plan to modify the `cline` codebase to require the LLM to use Git commit templates when committing changes after successful file modifications. This aims to improve the quality, structure, and consistency of commit messages.

## I. Core Principle: LLM Fills a Template, `cline` Commits Using It

The current idea of the LLM generating a free-form commit message via `git commit -m "..."` will be replaced. The new workflow will involve:
1.  **Template Discovery/Provision:** `cline` and the LLM will work to identify a project-specific Git commit template. If none is found, a well-structured default template will be used.
2.  **LLM Populates Template:** The LLM will be instructed to fill out the sections of the identified template based on the changes made.
3.  **Commit via Template Content:** `cline` will use the LLM-populated template content to make the Git commit, likely via `git commit -F <path_to_file_with_llm_message>`.

## II. Envisioned Modifications and Workflow

### A. Commit Template Handling

1.  **Project-Specific Template Discovery:**
    *   **Priority:** Use the project's own defined commit template if available.
    *   **LLM Actions (instructed by `cline`):**
        1.  Use `execute_command` to run `git config commit.template`.
        2.  If a path is returned by `git config`, use `read_file` to fetch the content of this template file.
        3.  If `git config commit.template` is not set or the file is inaccessible, use `read_file` to check for a conventional template file at the repository root (e.g., `.gitmessage`).
2.  **`cline`-Provided Default Template:**
    *   **Fallback:** If no project-specific template is found, `cline` will make a default template available to the LLM.
    *   **Content:** This default template should guide the LLM to produce structured and informative commit messages (e.g., Conventional Commits style, sections for subject, body, issue IDs, scope, breaking changes).
    *   **Provision to LLM:**
        *   Option A: `cline` could provide the default template text directly in its instructions to the LLM if no project template is found.
        *   Option B: A new tool, e.g., `get_default_commit_template`, could be called by the LLM.

    *   **Example Default Template (`default_commit_template.txt` structure):**
        ```
        Subject: <Summarize change in 50 chars or less, use imperative mood>

        Body:
        <Provide more detailed explanatory text, if necessary. Wrap it at
        72 characters. Focus on WHY the change was made, not just WHAT.
        Address any relevant issues or context.>

        Issue ID: <If applicable, JIRA-123, #456, etc.>
        Scope: <e.g., frontend, backend, docs, specific_module>
        Breaking Changes: <Describe any breaking changes, or "None">

        # Lines starting with '#' will be ignored.
        # An empty message aborts the commit.
        # Summary of changes made (for LLM reference, to be removed/commented before commit):
        # {auto_generated_summary_of_changes_by_cline_or_llm}
        ```

### B. Modifying the "Commit After Edit" Workflow

The existing plan to require commits after `write_to_file` or `replace_in_file` needs to be adapted for templates.

1.  **Enhanced Tool Success Message (in `cline/src/core/Cline.ts`):**
    *   After a successful file modification, the appended instructions must guide the LLM through the new template-based commit process.
    *   **Revised Instruction Flow (Example):**
        1.  "IMPORTANT ACTION REQUIRED: File '{filePath}' was successfully modified."
        2.  "You MUST now prepare and execute a commit using a Git commit template."
        3.  **"Step 1: Obtain Commit Template."**
            *   "Use `execute_command` to run `git config commit.template`.
            *   "If a path is returned, use `read_file` to get its content. This is your template."
            *   "If no path is returned or that file is not found, use `read_file` to check for a `.gitmessage` file at the repository root. If found, this is your template."
            *   "If neither project-specific template is found, state this. I will then provide you with the default commit template to use." (Or, `cline` could proactively provide the default if the LLM reports none found).
        4.  **"Step 2: Populate the Template."**
            *   (After LLM has template content) "Based on the changes made to '{filePath}' (I can provide a summary if needed), fill out all relevant sections of the commit template (Subject, Body, Issue ID, etc.). Ensure your message is detailed, specific, adheres to the template's structure, and removes any placeholder/comment lines from the template itself."
        5.  **"Step 3: Provide Populated Template for Commit."**
            *   "Once you have formulated the complete commit message by filling the template, provide the *entire filled template content* using the `execute_commit_with_template_content` tool (see new tool below)."

2.  **System Prompt Reinforcement (`cline/src/core/prompts/system.ts`):**
    *   Update system prompt rules to emphasize:
        *   The mandatory use of commit templates.
        *   The process of finding or requesting the template.
        *   The importance of accurately and comprehensively filling all required sections of the template.

### C. New Tool: `execute_commit_with_template_content` (Recommended)

To simplify the final commit step for the LLM and manage temporary files internally.

*   **Tool Name:** `execute_commit_with_template_content`
*   **Description:** Stages the specified file(s) and then commits them using the provided multi-line message content (which is the LLM-populated template).
*   **Parameters:**
    *   `file_paths: string[]` (required): An array of file paths to be staged with `git add`. For a single file edit, this would be `["{filePath}"]`.
    *   `commit_message_content: string` (required): The complete, multi-line commit message content as formulated by the LLM from the template.
    *   `requires_approval: boolean` (required): Should be `true` to allow user review of the full commit message before execution.
*   **Implementation in `cline/src/core/Cline.ts`:**
    1.  Receive `file_paths` and `commit_message_content`.
    2.  Create a temporary file (e.g., using `path.join(os.tmpdir(), \`cline_commit_msg_\${Date.now()}.txt\`)`).
    3.  Write the `commit_message_content` received from the LLM into this temporary file using `fs.writeFile`.
    4.  Execute `git add {file_paths.join(" ")}` via an internal shell execution utility (similar to how `execute_command` tool works, but without LLM invocation for this part). Check for success.
    5.  If `git add` is successful, execute `git commit -F <path_to_temporary_file>` via the internal shell utility.
    6.  Ensure the temporary file is deleted after the commit attempt (success or failure) in a `finally` block.
    7.  Return the standard output/error from the `git commit` command as the tool result.

### D. Alternative to New Tool: Using Existing Tools (`write_to_file` + `execute_command`)

If a new tool is undesirable, the LLM could be instructed to:
1.  Get/fill the template.
2.  Use `write_to_file` to save its populated template content to a known temporary path (e.g., `.git/COMMIT_MSG_LLM_TEMP`).
3.  Use `execute_command` for `git add {filePath}`.
4.  Use `execute_command` for `git commit -F .git/COMMIT_MSG_LLM_TEMP`.
5.  Use `execute_command` to delete the temporary commit message file.
This is more steps for the LLM and relies on it managing the temporary file path correctly.

### E. LLM Interaction Flow (with New Tool):

1.  LLM successfully modifies a file via `write_to_file` or `replace_in_file`.
2.  `cline` returns success, instructing LLM to find/get a commit template.
3.  LLM uses `execute_command` and/or `read_file` to find a project template.
4.  (If no project template) LLM informs `cline`, and `cline` provides the default template text in its next response (or LLM uses `get_default_commit_template` tool).
5.  LLM has the template. `cline` might provide a summary of changes to aid the LLM.
6.  LLM formulates the full commit message by populating the template.
7.  LLM calls:
    ```xml
    <execute_commit_with_template_content>
      <file_paths>["{filePath}"]</file_paths>
      <commit_message_content>
    Subject: LLM-filled subject

    Body:
    LLM-filled body, adhering to template structure.

    Issue ID: LLM-filled ID
    Scope: LLM-filled scope
    Breaking Changes: LLM-filled breaking changes
      </commit_message_content>
      <requires_approval>true</requires_approval>
    </execute_commit_with_template_content>
    ```
8.  `cline` executes the `git add` and `git commit -F <temp_file_with_content>` sequence. The user approves the commit (which now shows the full, structured message from the temporary file).
9.  `cline` returns the result of the Git operation.

### F. Key Considerations:

*   **LLM Instruction Following:** This process is more involved for the LLM. Clear, precise instructions are paramount.
*   **Template Parsing and Adherence:** The LLM must correctly parse the template, understand its sections, remove placeholder comments, and provide relevant information for each part.
*   **Default Template Design:** A well-commented and structured default template is essential if project-specific ones are not found.
*   **Error Handling:** Each step (template discovery, file I/O for temp files, Git commands) needs robust error handling.
*   **Interaction with `CheckpointTracker`:** This template-based commit process should ideally replace `CheckpointTracker`'s automated commits to avoid redundancy and maintain a clean Git history authored by the LLM (or user).

## IV. Summary

This plan aims to elevate the quality and consistency of LLM-generated commits by enforcing the use of Git commit templates. It involves `cline` guiding the LLM to find or receive a template, the LLM populating it, and then `cline` using that populated content for the actual commit, likely via a new dedicated tool or a carefully orchestrated sequence of existing tools.
