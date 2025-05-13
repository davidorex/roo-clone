// 01-imports-and-types: Imports and type definitions
// Extracted from Cline.ts for refactoring into services

import { Anthropic } from "@anthropic-ai/sdk"
import cloneDeep from "clone-deep"
import { setTimeout as setTimeoutPromise } from "node:timers/promises"
import fs from "fs/promises"
import getFolderSize from "get-folder-size"
import os from "os"
import pWaitFor from "p-wait-for"
import * as path from "path"
import { serializeError } from "serialize-error"
import * as vscode from "vscode"
import { ApiHandler, buildApiHandler } from "../api"
import { OpenRouterHandler } from "../api/providers/openrouter"
import CheckpointTracker from "../integrations/checkpoints/CheckpointTracker"
import { DIFF_VIEW_URI_SCHEME, DiffViewProvider } from "../integrations/editor/DiffViewProvider"
import { formatContentBlockToMarkdown } from "../integrations/misc/export-markdown"
import { extractTextFromFile } from "../integrations/misc/extract-text"
import { showSystemNotification } from "../integrations/notifications"
import { TerminalManager } from "../integrations/terminal/TerminalManager"
import { BrowserSession } from "../services/browser/BrowserSession"
import { UrlContentFetcher } from "../services/browser/UrlContentFetcher"
import { listFiles } from "../services/glob/list-files"
import { regexSearchFiles } from "../services/ripgrep"
import { parseSourceCodeForDefinitionsTopLevel } from "../services/tree-sitter"
import { ApiConfiguration } from "../shared/api"
import { findLast, findLastIndex, parsePartialArrayString } from "../shared/array"
import { AutoApprovalSettings } from "../shared/AutoApprovalSettings"
import { BrowserSettings } from "../shared/BrowserSettings"
import { ChatSettings } from "../shared/ChatSettings"
import { combineApiRequests } from "../shared/combineApiRequests"
import { combineCommandSequences, COMMAND_REQ_APP_STRING } from "../shared/combineCommandSequences"
import {
	BrowserAction,
	BrowserActionResult,
	browserActions,
	ClineApiReqCancelReason,
	ClineApiReqInfo,
	ClineAsk,
	ClineAskQuestion,
	ClineAskUseMcpServer,
	ClineMessage,
	ClinePlanModeResponse,
	ClineSay,
	ClineSayBrowserAction,
	ClineSayTool,
	COMPLETION_RESULT_CHANGES_FLAG,
} from "../shared/ExtensionMessage"
import { getApiMetrics } from "../shared/getApiMetrics"
import { HistoryItem } from "../shared/HistoryItem"
import { ClineAskResponse, ClineCheckpointRestore } from "../shared/WebviewMessage"
import { calculateApiCostAnthropic } from "../utils/cost"
import { fileExistsAtPath, isDirectory } from "../utils/fs"
import { arePathsEqual, getReadablePath } from "../utils/path"
import { fixModelHtmlEscaping, removeInvalidChars } from "../utils/string"
import { AssistantMessageContent, parseAssistantMessage, ToolParamName, ToolUseName } from "./assistant-message"
import { constructNewFileContent } from "./assistant-message/diff"
import { ClineIgnoreController, LOCK_TEXT_SYMBOL } from "./ignore/ClineIgnoreController"
import { parseMentions } from "./mentions"
import { formatResponse } from "./prompts/responses"
import { addUserInstructions, SYSTEM_PROMPT } from "./prompts/system"
import { ContextManager } from "./context-management/ContextManager"
import { OpenAiHandler } from "../api/providers/openai"
import { ApiStream } from "../api/transform/stream"
import { ClineHandler } from "../api/providers/cline"
import { ClineProvider } from "./webview/ClineProvider"
import { DEFAULT_LANGUAGE_SETTINGS, getLanguageKey, LanguageDisplay, LanguageKey } from "../shared/Languages"
import { telemetryService } from "../services/telemetry/TelemetryService"
import pTimeout from "p-timeout"
import { GlobalFileNames } from "../global-constants"
import {
	checkIsAnthropicContextWindowError,
	checkIsOpenRouterContextWindowError,
} from "./context-management/context-error-handling"
import { AnthropicHandler } from "../api/providers/anthropic"

const cwd = vscode.workspace.workspaceFolders?.map((folder) => folder.uri.fsPath).at(0) ?? path.join(os.homedir(), "Desktop") // may or may not exist but fs checking existence would immediately ask for permission which would be bad UX, need to come up with a better solution

type ToolResponse = string | Array<Anthropic.TextBlockParam | Anthropic.ImageBlockParam>
type UserContent = Array<Anthropic.ContentBlockParam>
