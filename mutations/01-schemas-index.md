# Mutations for src/schemas/index.ts

## Caveats from Safe Mutation Analysis

- **Classification**: NORMAL
- **Recommendation**: "Standard module. Evaluate changes based on specific dependencies and dependents. Follow standard testing procedures."
- **Note**: Changes are additive. After applying, run `pnpm generate-types` and perform thorough testing of dependent components for type compatibility.

## Mutation 1: Add "operation_acknowledgment" to `clineAsks`

**File**: `src/schemas/index.ts`
**Lines**: (Locate the `clineAsks` array, typically around line 1028-1041)

```diff
<<<<<<< SEARCH
export const clineAsks = [
	"followup",
	"command",
	"command_output",
	"completion_result",
	"tool",
	"api_req_failed",
	"resume_task",
	"resume_completed_task",
	"mistake_limit_reached",
	"browser_action_launch",
	"use_mcp_server",
	"auto_approval_max_req_reached",
] as const
=======
export const clineAsks = [
	"followup",
	"command",
	"command_output",
	"completion_result",
	"tool",
	"api_req_failed",
	"resume_task",
	"resume_completed_task",
	"mistake_limit_reached",
	"browser_action_launch",
	"use_mcp_server",
	"auto_approval_max_req_reached",
	"operation_acknowledgment", // Added for Pause After State Change
] as const
>>>>>>> REPLACE
```

## Mutation 2: Add "operation_completed" to `clineSays`

**File**: `src/schemas/index.ts`
**Lines**: (Locate the `clineSays` array, typically around line 1049-1073)

```diff
<<<<<<< SEARCH
export const clineSays = [
	"error",
	"api_req_started",
	"api_req_finished",
	"api_req_retried",
	"api_req_retry_delayed",
	"api_req_deleted",
	"text",
	"reasoning",
	"completion_result",
	"user_feedback",
	"user_feedback_diff",
	"command_output",
	"shell_integration_warning",
	"browser_action",
	"browser_action_result",
	"mcp_server_request_started",
	"mcp_server_response",
	"subtask_result",
	"checkpoint_saved",
	"rooignore_error",
	"diff_error",
	"condense_context",
	"codebase_search_result",
] as const
=======
export const clineSays = [
	"error",
	"api_req_started",
	"api_req_finished",
	"api_req_retried",
	"api_req_retry_delayed",
	"api_req_deleted",
	"text",
	"reasoning",
	"completion_result",
	"user_feedback",
	"user_feedback_diff",
	"command_output",
	"shell_integration_warning",
	"browser_action",
	"browser_action_result",
	"mcp_server_request_started",
	"mcp_server_response",
	"subtask_result",
	"checkpoint_saved",
	"rooignore_error",
	"diff_error",
	"condense_context",
	"codebase_search_result",
	"operation_completed", // Added for Pause After State Change
] as const
>>>>>>> REPLACE
```

## Mutation 3: Add `pauseAfterProductiveOperation` to `globalSettingsSchema`

**File**: `src/schemas/index.ts`
**Lines**: (Locate `globalSettingsSchema = z.object({ ... })`, typically around line 775. Add the new field alphabetically or group with similar boolean flags like `autoApprovalEnabled`.)

_Self-correction: For clarity and consistency, I will place it near `autoApprovalEnabled`._

```diff
<<<<<<< SEARCH
	customCondensingPrompt: z.string().optional(),

	autoApprovalEnabled: z.boolean().optional(),
	alwaysAllowReadOnly: z.boolean().optional(),
=======
	customCondensingPrompt: z.string().optional(),

	autoApprovalEnabled: z.boolean().optional(),
	pauseAfterProductiveOperation: z.boolean().optional(), // Added for Pause After State Change
	alwaysAllowReadOnly: z.boolean().optional(),
>>>>>>> REPLACE
```

## Mutation 4: Add `pauseAfterProductiveOperation` to `globalSettingsRecord`

**File**: `src/schemas/index.ts`
**Lines**: (Locate `globalSettingsRecord: GlobalSettingsRecord = { ... }`, typically around line 861. Add the new field alphabetically or group with similar boolean flags.)

_Self-correction: For clarity and consistency, I will place it near `autoApprovalEnabled`._

```diff
<<<<<<< SEARCH
	customCondensingPrompt: undefined,

	autoApprovalEnabled: undefined,
	alwaysAllowReadOnly: undefined,
=======
	customCondensingPrompt: undefined,

	autoApprovalEnabled: undefined,
	pauseAfterProductiveOperation: undefined, // Added for Pause After State Change
	alwaysAllowReadOnly: undefined,
>>>>>>> REPLACE
```
