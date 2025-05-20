To port `dafu`'s selective MCP tool detail incorporation (whitelisting for inline details, file references for others) into the `cline` codebase, the following detailed steps are necessary, based on analysis of both systems' analysis outputs and the source code of `dafu/src/core/prompts/sections/mcp-servers.ts`:

**I. Enhance `cline/src/services/mcp/McpHub.ts` for Documentation File Management:**

This part of `cline`'s `McpHub` will need new responsibilities to manage and write documentation files for non-whitelisted MCP tools.

1.  **Add File Path Management Methods:**
    *   Implement `async getToolDetailsDirectory(): Promise<string>`:
        *   **Purpose**: To define a consistent, persistent directory for storing detailed MCP tool documentation files.
        *   **Action**: This method will construct a path within the extension's global storage (e.g., `path.join(this.context.globalStorageUri.fsPath, "mcp_tool_details")`).
        *   It must ensure this directory exists using `await fs.mkdir(directoryPath, { recursive: true })`.
        *   **Dependencies**: Requires `this.context` (for `globalStorageUri`), and imports for `fs/promises` and `path`.
    *   Implement `async getToolDetailsPath(serverName: string): Promise<string>`:
        *   **Purpose**: To generate a unique and predictable file path for a specific server's detailed tool documentation.
        *   **Action**: This method will return a path like `path.join(await this.getToolDetailsDirectory(), \`\${sanitizeFilename(serverName)}_tools.json\`)` (or `.md`). A `sanitizeFilename` utility function will be needed to ensure `serverName` is a valid component of a file path.

2.  **Implement Documentation File Writing Logic:**
    *   **Trigger**: This logic should be integrated into the existing method within `McpHub.ts` that processes newly connected or registered MCP servers and their tools.
    *   **Action**:
        1.  Define or access a "whitelist" of server names (e.g., `const whitelist = ["project-memory", "github-mcp-server"];`). This list determines which servers get full details in the prompt versus a file reference.
        2.  For each connected server, after its `server.tools` are available:
            *   **If `!whitelist.includes(server.name)` (i.e., the server is non-whitelisted):**
                *   Iterate through `server.tools`.
                *   Collect all details for each tool: `name`, `description`, `inputSchema`, and any other relevant metadata.
                *   Format this collection of tool details into a structured string (e.g., a JSON array of tool objects, or a Markdown document).
                *   Determine the target file path: `const filePath = await this.getToolDetailsPath(server.name);`.
                *   Write the formatted tool details string to this `filePath` using `await fs.writeFile(filePath, formattedToolDetailsString);`.
        *   This ensures that documentation for non-whitelisted tools is written to disk when the server is processed by `McpHub`.

**II. Refactor MCP Server Section Generation in `cline`'s Prompt System:**

This involves modifying how the "MCP SERVERS" section of the system prompt is built.

1.  **Create/Modify `cline/src/core/prompts/sections/mcp-servers.ts`:**
    *   If `cline` currently embeds all MCP server information directly within its main `SYSTEM_PROMPT` definition (in `cline/src/core/prompts/system.ts`), this logic needs to be extracted into a new, dedicated function `getMcpServersSection` in a new file: `cline/src/core/prompts/sections/mcp-servers.ts`.
    *   This new `getMcpServersSection` function should largely mirror the logic found in `dafu/src/core/prompts/sections/mcp-servers.ts`.
    *   **Function Signature**: `async function getMcpServersSection(mcpHub?: McpHub /*, other cline-specific params if needed */): Promise<string>`
    *   **Implementation Details**:
        1.  Handle the case where `mcpHub` is not provided or no servers are connected.
        2.  Define the same server name whitelist as used in `McpHub` (or make it a shared constant).
        3.  Fetch connected servers: `mcpHub.getServers().filter(server => server.status === "connected")`.
        4.  Asynchronously map over these servers to generate their respective prompt sections:
            *   **For whitelisted servers**:
                *   Iterate through `server.tools`.
                *   For each tool, format its `name`, `description`, and full `inputSchema` (stringified and indented if JSON) directly into the prompt string for that server.
                *   Example structure:
                    ```
                    ## {server.name}

                    ### Available Tools
                    - {tool.name}: {tool.description}
                        Input Schema:
                        {JSON.stringify(tool.inputSchema, null, 2) ...}
                    ```
            *   **For non-whitelisted servers**:
                *   Retrieve the pre-generated documentation file path: `const serverToolsPath = await mcpHub.getToolDetailsPath(server.name);`.
                *   List only the `tool.name`s directly in the prompt string.
                *   Append the mandatory directive: `MANDATORY USE READ_FILE READ USAGE DETAILS ${server.name} AT:\n${serverToolsPath}`.
        5.  Join all individual server section strings.
        6.  Wrap the combined server information with the standard "MCP SERVERS" section header and introductory/explanatory text (as seen in `dafu`).
    *   **Dependencies**: This module will need to import `McpHub` from `cline/src/services/mcp/McpHub.ts`.

2.  **Modify `cline/src/core/prompts/system.ts` (where `SYSTEM_PROMPT` is defined/assembled):**
    *   Import the new `getMcpServersSection` from `./sections/mcp-servers.ts`.
    *   In the logic that assembles the main `SYSTEM_PROMPT`, replace the existing way MCP server details are included with a call to `await getMcpServersSection(mcpHub)`. The `mcpHub` instance is already passed to `SYSTEM_PROMPT`'s generation logic in `cline`.

**III. Ensure `read_file` Tool Compatibility:**

*   The `read_file` tool in `cline` (as handled in `cline/src/core/Cline.ts`) must be able to correctly access and read the content of the documentation files whose paths are generated by `McpHub.getToolDetailsPath()`. These paths will reside within the extension's global storage area, which should generally be accessible.

**Summary of Changes for Porting:**

The core of porting this functionality from `dafu` to `cline` involves:
1.  **Augmenting `cline`'s `McpHub`**: Giving it the new responsibilities of creating, managing, and writing detailed documentation files for non-whitelisted MCP tools to a designated directory.
2.  **Refactoring `cline`'s System Prompt Generation**: Specifically, the part that generates the "MCP SERVERS" section. This will now use a new `getMcpServersSection` function that implements `dafu`'s whitelisting logic: embedding full details for some servers and providing file path references (with a `read_file` directive) for others.

This will result in `cline`'s system prompt becoming more dynamic and potentially much shorter when numerous complex MCP servers are connected, as detailed schemas for most tools will be offloaded to separate files, accessible on demand by the AI using the `read_file` tool.
