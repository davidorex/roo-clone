// 02-class-properties: Class properties and constructor
// Extracted from Cline.ts for refactoring into services

export class Cline {
	readonly taskId: string
	readonly apiProvider?: string
	api: ApiHandler
	private terminalManager: TerminalManager
	private urlContentFetcher: UrlContentFetcher
	browserSession: BrowserSession
	contextManager: ContextManager
	private didEditFile: boolean = false
	customInstructions?: string
	autoApprovalSettings: AutoApprovalSettings
	private browserSettings: BrowserSettings
	private chatSettings: ChatSettings
	apiConversationHistory: Anthropic.MessageParam[] = []
	clineMessages: ClineMessage[] = []
	private clineIgnoreController: ClineIgnoreController
	private askResponse?: ClineAskResponse
	private askResponseText?: string
	private askResponseImages?: string[]
	private lastMessageTs?: number
	private consecutiveAutoApprovedRequestsCount: number = 0
	private consecutiveMistakeCount: number = 0
	private providerRef: WeakRef<ClineProvider>
	private abort: boolean = false
	didFinishAbortingStream = false
	abandoned = false
	private diffViewProvider: DiffViewProvider
	private checkpointTracker?: CheckpointTracker
	checkpointTrackerErrorMessage?: string
	conversationHistoryDeletedRange?: [number, number]
	isInitialized = false
	isAwaitingPlanResponse = false
	didRespondToPlanAskBySwitchingMode = false

	// streaming
	isWaitingForFirstChunk = false
	isStreaming = false
	private currentStreamingContentIndex = 0
	private assistantMessageContent: AssistantMessageContent[] = []
	private presentAssistantMessageLocked = false
	private presentAssistantMessageHasPendingUpdates = false
	private userMessageContent: (Anthropic.TextBlockParam | Anthropic.ImageBlockParam)[] = []
	private userMessageContentReady = false
	private didRejectTool = false
	private didAlreadyUseTool = false
	private didCompleteReadingStream = false
	private didAutomaticallyRetryFailedApiRequest = false

	constructor(
		provider: ClineProvider,
		apiConfiguration: ApiConfiguration,
		autoApprovalSettings: AutoApprovalSettings,
		browserSettings: BrowserSettings,
		chatSettings: ChatSettings,
		customInstructions?: string,
		task?: string,
		images?: string[],
		historyItem?: HistoryItem,
	) {
		this.clineIgnoreController = new ClineIgnoreController(cwd)
		this.clineIgnoreController.initialize().catch((error) => {
			console.error("Failed to initialize ClineIgnoreController:", error)
		})
		this.providerRef = new WeakRef(provider)
		this.apiProvider = apiConfiguration.apiProvider
		this.api = buildApiHandler(apiConfiguration)
		this.terminalManager = new TerminalManager()
		this.urlContentFetcher = new UrlContentFetcher(provider.context)
		this.browserSession = new BrowserSession(provider.context, browserSettings)
		this.contextManager = new ContextManager()
		this.diffViewProvider = new DiffViewProvider(cwd)
		this.customInstructions = customInstructions
		this.autoApprovalSettings = autoApprovalSettings
		this.browserSettings = browserSettings
		this.chatSettings = chatSettings
		if (historyItem) {
			this.taskId = historyItem.id
			this.conversationHistoryDeletedRange = historyItem.conversationHistoryDeletedRange
			this.resumeTaskFromHistory()
		} else if (task || images) {
			this.taskId = Date.now().toString()
			this.startTask(task, images)
		} else {
			throw new Error("Either historyItem or task/images must be provided")
		}

		if (historyItem) {
			// Open task from history
			telemetryService.captureTaskRestarted(this.taskId, this.apiProvider)
		} else {
			// New task started
			telemetryService.captureTaskCreated(this.taskId, this.apiProvider)
		}
	}

	updateBrowserSettings(browserSettings: BrowserSettings) {
		this.browserSettings = browserSettings
		this.browserSession.browserSettings = browserSettings
	}

	updateChatSettings(chatSettings: ChatSettings) {
		this.chatSettings = chatSettings
	}

	// Storing task to disk for history
