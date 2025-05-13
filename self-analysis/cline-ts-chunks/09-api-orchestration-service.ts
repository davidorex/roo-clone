// 09-api-orchestration-service: Methods for API requests and response handling (ApiOrchestrationService)
// Extracted from Cline.ts for refactoring into ApiOrchestrationService

	async *attemptApiRequest(previousApiReqIndex: number): ApiStream {
		// Wait for MCP servers to be connected before generating system prompt
		await pWaitFor(() => this.providerRef.deref()?.mcpHub?.isConnecting !== true, { timeout: 10_000 }).catch(() => {
			console.error("MCP servers failed to connect in time")
		})

		const mcpHub = this.providerRef.deref()?.mcpHub
		if (!mcpHub) {
			throw new Error("MCP hub not available")
		}

		const disableBrowserTool = vscode.workspace.getConfiguration("cline").get<boolean>("disableBrowserTool") ?? false
		const modelSupportsComputerUse = this.api.getModel().info.supportsComputerUse ?? false

		const supportsComputerUse = modelSupportsComputerUse && !disableBrowserTool // only enable computer use if the model supports it and the user hasn't disabled it

		let systemPrompt = await SYSTEM_PROMPT(cwd, supportsComputerUse, mcpHub, this.browserSettings)

		let settingsCustomInstructions = this.customInstructions?.trim()
		const preferredLanguage = getLanguageKey(
			vscode.workspace.getConfiguration("cline").get<LanguageDisplay>("preferredLanguage"),
		)
		const preferredLanguageInstructions =
			preferredLanguage && preferredLanguage !== DEFAULT_LANGUAGE_SETTINGS
				? `# Preferred Language\n\nSpeak in ${preferredLanguage}.`
				: ""
		const clineRulesFilePath = path.resolve(cwd, GlobalFileNames.clineRules)
		let clineRulesFileInstructions: string | undefined
		if (await fileExistsAtPath(clineRulesFilePath)) {
			if (await isDirectory(clineRulesFilePath)) {
				try {
					// Read all files in the .clinerules/ directory.
					const ruleFiles = await fs
						.readdir(clineRulesFilePath, { withFileTypes: true, recursive: true })
						.then((files) => files.filter((file) => file.isFile()))
						.then((files) => files.map((file) => path.resolve(file.parentPath, file.name)))
					const ruleFileContent = await Promise.all(
						ruleFiles.map(async (file) => {
							const ruleFilePath = path.resolve(clineRulesFilePath, file)
							const ruleFilePathRelative = path.relative(cwd, ruleFilePath)
							return `${ruleFilePathRelative}\n` + (await fs.readFile(ruleFilePath, "utf8")).trim()
						}),
					).then((contents) => contents.join("\n\n"))
					clineRulesFileInstructions = `# .clinerules/\n\nThe following is provided by a root-level .clinerules/ directory where the user has specified instructions for this working directory (${cwd.toPosix()})\n\n${ruleFileContent}`
				} catch {
					console.error(`Failed to read .clinerules directory at ${clineRulesFilePath}`)
				}
			} else {
				try {
					const ruleFileContent = (await fs.readFile(clineRulesFilePath, "utf8")).trim()
					if (ruleFileContent) {
						clineRulesFileInstructions = `# .clinerules\n\nThe following is provided by a root-level .clinerules file where the user has specified instructions for this working directory (${cwd.toPosix()})\n\n${ruleFileContent}`
					}
				} catch {
					console.error(`Failed to read .clinerules file at ${clineRulesFilePath}`)
				}
			}
		}

		const clineIgnoreContent = this.clineIgnoreController.clineIgnoreContent
		let clineIgnoreInstructions: string | undefined
		if (clineIgnoreContent) {
			clineIgnoreInstructions = `# .clineignore\n\n(The following is provided by a root-level .clineignore file where the user has specified files and directories that should not be accessed. When using list_files, you'll notice a ${LOCK_TEXT_SYMBOL} next to files that are blocked. Attempting to access the file's contents e.g. through read_file will result in an error.)\n\n${clineIgnoreContent}\n.clineignore`
		}

		if (
			settingsCustomInstructions ||
			clineRulesFileInstructions ||
			clineIgnoreInstructions ||
			preferredLanguageInstructions
		) {
			// altering the system prompt mid-task will break the prompt cache, but in the grand scheme this will not change often so it's better to not pollute user messages with it the way we have to with <potentially relevant details>
			systemPrompt += addUserInstructions(
				settingsCustomInstructions,
				clineRulesFileInstructions,
				clineIgnoreInstructions,
				preferredLanguageInstructions,
			)
		}
		const contextManagementMetadata = this.contextManager.getNewContextMessagesAndMetadata(
			this.apiConversationHistory,
			this.clineMessages,
			this.api,
			this.conversationHistoryDeletedRange,
			previousApiReqIndex,
		)

		if (contextManagementMetadata.updatedConversationHistoryDeletedRange) {
			this.conversationHistoryDeletedRange = contextManagementMetadata.conversationHistoryDeletedRange
			await this.saveClineMessages() // saves task history item which we use to keep track of conversation history deleted range
		}

		let stream = this.api.createMessage(systemPrompt, contextManagementMetadata.truncatedConversationHistory)

		const iterator = stream[Symbol.asyncIterator]()

		try {
			// awaiting first chunk to see if it will throw an error
			this.isWaitingForFirstChunk = true
			const firstChunk = await iterator.next()
			yield firstChunk.value
			this.isWaitingForFirstChunk = false
		} catch (error) {
			const isOpenRouter = this.api instanceof OpenRouterHandler || this.api instanceof ClineHandler
			const isAnthropic = this.api instanceof AnthropicHandler
			const isOpenRouterContextWindowError = checkIsOpenRouterContextWindowError(error) && isOpenRouter
			const isAnthropicContextWindowError = checkIsAnthropicContextWindowError(error) && isAnthropic

			if (isAnthropic && isAnthropicContextWindowError && !this.didAutomaticallyRetryFailedApiRequest) {
				this.conversationHistoryDeletedRange = this.contextManager.getNextTruncationRange(
					this.apiConversationHistory,
					this.conversationHistoryDeletedRange,
					"quarter", // Force aggressive truncation
				)
				await this.saveClineMessages()

				this.didAutomaticallyRetryFailedApiRequest = true
			} else if (isOpenRouter && !this.didAutomaticallyRetryFailedApiRequest) {
				if (isOpenRouterContextWindowError) {
					this.conversationHistoryDeletedRange = this.contextManager.getNextTruncationRange(
						this.apiConversationHistory,
						this.conversationHistoryDeletedRange,
						"quarter", // Force aggressive truncation
					)
					await this.saveClineMessages()
				}

				console.log("first chunk failed, waiting 1 second before retrying")
				await setTimeoutPromise(1000)
				this.didAutomaticallyRetryFailedApiRequest = true
			} else {
				// request failed after retrying automatically once, ask user if they want to retry again
				// note that this api_req_failed ask is unique in that we only present this option if the api hasn't streamed any content yet (ie it fails on the first chunk due), as it would allow them to hit a retry button. However if the api failed mid-stream, it could be in any arbitrary state where some tools may have executed, so that error is handled differently and requires cancelling the task entirely.

				if (isOpenRouterContextWindowError || isAnthropicContextWindowError) {
					const truncatedConversationHistory = this.contextManager.getTruncatedMessages(
						this.apiConversationHistory,
						this.conversationHistoryDeletedRange,
					)

					// If the conversation has more than 3 messages, we can truncate again. If not, then the conversation is bricked.
					// ToDo: Allow the user to change their input if this is the case.
					if (truncatedConversationHistory.length > 3) {
						error = new Error("Context window exceeded. Click retry to truncate the conversation and try again.")
						this.didAutomaticallyRetryFailedApiRequest = false
					}
				}

				const errorMessage = this.formatErrorWithStatusCode(error)

				const { response } = await this.ask("api_req_failed", errorMessage)

				if (response !== "yesButtonClicked") {
					// this will never happen since if noButtonClicked, we will clear current task, aborting this instance
					throw new Error("API request failed")
				}

				await this.say("api_req_retried")
			}
			// delegate generator output from the recursive call
			yield* this.attemptApiRequest(previousApiReqIndex)
			return
		}

		// no error, so we can continue to yield all remaining chunks
		// (needs to be placed outside of try/catch since it we want caller to handle errors not with api_req_failed as that is reserved for first chunk failures only)
		// this delegates to another generator or iterable object. In this case, it's saying "yield all remaining values from this iterator". This effectively passes along all subsequent chunks from the original stream.
		yield* iterator
	}

	async presentAssistantMessage() {
		if (this.abort) {
			throw new Error("Cline instance aborted")
		}

		if (this.presentAssistantMessageLocked) {
			this.presentAssistantMessageHasPendingUpdates = true
			return
		}
		this.presentAssistantMessageLocked = true
		this.presentAssistantMessageHasPendingUpdates = false

		if (this.currentStreamingContentIndex >= this.assistantMessageContent.length) {
			// this may happen if the last content block was completed before streaming could finish. if streaming is finished, and we're out of bounds then this means we already presented/executed the last content block and are ready to continue to next request
			if (this.didCompleteReadingStream) {
				this.userMessageContentReady = true
			}
			// console.log("no more content blocks to stream! this shouldn't happen?")
			this.presentAssistantMessageLocked = false
			return
			//throw new Error("No more content blocks to stream! This shouldn't happen...") // remove and just return after testing
		}

		const block = cloneDeep(this.assistantMessageContent[this.currentStreamingContentIndex]) // need to create copy bc while stream is updating the array, it could be updating the reference block properties too
		switch (block.type) {
			case "text": {
				if (this.didRejectTool || this.didAlreadyUseTool) {
					break
				}
				let content = block.content
				if (content) {
					// (have to do this for partial and complete since sending content in thinking tags to markdown renderer will automatically be removed)
					// Remove end substrings of <thinking or </thinking (below xml parsing is only for opening tags)
					// (this is done with the xml parsing below now, but keeping here for reference)
					// content = content.replace(/<\/?t(?:h(?:i(?:n(?:k(?:i(?:n(?:g)?)?)?)?)?)?)?$/, "")
					// Remove all instances of <thinking> (with optional line break after) and </thinking> (with optional line break before)
					// - Needs to be separate since we dont want to remove the line break before the first tag
					// - Needs to happen before the xml parsing below
					content = content.replace(/<thinking>\s?/g, "")
					content = content.replace(/\s?<\/thinking>/g, "")

					// Remove partial XML tag at the very end of the content (for tool use and thinking tags)
					// (prevents scrollview from jumping when tags are automatically removed)
					const lastOpenBracketIndex = content.lastIndexOf("<")
					if (lastOpenBracketIndex !== -1) {
						const possibleTag = content.slice(lastOpenBracketIndex)
						// Check if there's a '>' after the last '<' (i.e., if the tag is complete) (complete thinking and tool tags will have been removed by now)
						const hasCloseBracket = possibleTag.includes(">")
						if (!hasCloseBracket) {
							// Extract the potential tag name
							let tagContent: string
							if (possibleTag.startsWith("</")) {
								tagContent = possibleTag.slice(2).trim()
							} else {
								tagContent = possibleTag.slice(1).trim()
							}
							// Check if tagContent is likely an incomplete tag name (letters and underscores only)
							const isLikelyTagName = /^[a-zA-Z_]+$/.test(tagContent)
							// Preemptively remove < or </ to keep from these artifacts showing up in chat (also handles closing thinking tags)
							const isOpeningOrClosing = possibleTag === "<" || possibleTag === "</"
							// If the tag is incomplete and at the end, remove it from the content
							if (isOpeningOrClosing || isLikelyTagName) {
								content = content.slice(0, lastOpenBracketIndex).trim()
							}
						}
					}
				}

				if (!block.partial) {
					// Some models add code block artifacts (around the tool calls) which show up at the end of text content
					// matches ``` with at least one char after the last backtick, at the end of the string
					const match = content?.trimEnd().match(/```[a-zA-Z0-9_-]+$/)
					if (match) {
						const matchLength = match[0].length
						content = content.trimEnd().slice(0, -matchLength)
					}
				}

				await this.say("text", content, undefined, block.partial)
				break
			}
			case "tool_use":
				const toolDescription = () => {
					switch (block.name) {
						case "execute_command":
							return `[${block.name} for '${block.params.command}']`
						case "read_file":
							return `[${block.name} for '${block.params.path}']`
						case "write_to_file":
							return `[${block.name} for '${block.params.path}']`
						case "replace_in_file":
							return `[${block.name} for '${block.params.path}']`
						case "search_files":
							return `[${block.name} for '${block.params.regex}'${
								block.params.file_pattern ? ` in '${block.params.file_pattern}'` : ""
							}]`
						case "list_files":
							return `[${block.name} for '${block.params.path}']`
						case "list_code_definition_names":
							return `[${block.name} for '${block.params.path}']`
						case "browser_action":
							return `[${block.name} for '${block.params.action}']`
						case "use_mcp_tool":
							return `[${block.name} for '${block.params.server_name}']`
						case "access_mcp_resource":
							return `[${block.name} for '${block.params.server_name}']`
						case "ask_followup_question":
							return `[${block.name} for '${block.params.question}']`
						case "plan_mode_respond":
							return `[${block.name}]`
						case "attempt_completion":
							return `[${block.name}]`
					}
				}

				if (this.didRejectTool) {
					// ignore any tool content after user has rejected tool once
					if (!block.partial) {
						this.userMessageContent.push({
							type: "text",
							text: `Skipping tool ${toolDescription()} due to user rejecting a previous tool.`,
						})
					} else {
						// partial tool after user rejected a previous tool
						this.userMessageContent.push({
							type: "text",
							text: `Tool ${toolDescription()} was interrupted and not executed due to user rejecting a previous tool.`,
						})
					}
					break
				}

				if (this.didAlreadyUseTool) {
					// ignore any content after a tool has already been used
					this.userMessageContent.push({
						type: "text",
						text: `Tool [${block.name}] was not executed because a tool has already been used in this message. Only one tool may be used per message. You must assess the first tool's result before proceeding to use the next tool.`,
					})
					break
				}

				const pushToolResult = (content: ToolResponse) => {
					this.userMessageContent.push({
						type: "text",
						text: `${toolDescription()} Result:`,
					})
					if (typeof content === "string") {
						this.userMessageContent.push({
							type: "text",
							text: content || "(tool did not return anything)",
						})
					} else {
						this.userMessageContent.push(...content)
					}
					// once a tool result has been collected, ignore all other tool uses since we should only ever present one tool result per message
					this.didAlreadyUseTool = true
				}

				// The user can approve, reject, or provide feedback (rejection). However the user may also send a message along with an approval, in which case we add a separate user message with this feedback.
				const pushAdditionalToolFeedback = (feedback?: string, images?: string[]) => {
					if (!feedback && !images) {
						return
					}
					const content = formatResponse.toolResult(
						`The user provided the following feedback:\n<feedback>\n${feedback}\n</feedback>`,
						images,
					)
					if (typeof content === "string") {
						this.userMessageContent.push({
							type: "text",
							text: content,
						})
					} else {
						this.userMessageContent.push(...content)
					}
				}

				const askApproval = async (type: ClineAsk, partialMessage?: string) => {
					const { response, text, images } = await this.ask(type, partialMessage, false)
					if (response !== "yesButtonClicked") {
						// User pressed reject button or responded with a message, which we treat as a rejection
						pushToolResult(formatResponse.toolDenied())
						if (text || images?.length) {
							pushAdditionalToolFeedback(text, images)
							await this.say("user_feedback", text, images)
						}
						this.didRejectTool = true // Prevent further tool uses in this message
						return false
					} else {
						// User hit the approve button, and may have provided feedback
						if (text || images?.length) {
							pushAdditionalToolFeedback(text, images)
							await this.say("user_feedback", text, images)
						}
						return true
					}
				}

				const showNotificationForApprovalIfAutoApprovalEnabled = (message: string) => {
					if (this.autoApprovalSettings.enabled && this.autoApprovalSettings.enableNotifications) {
						showSystemNotification({
							subtitle: "Approval Required",
							message,
						})
					}
				}

				const handleError = async (action: string, error: Error) => {
					if (this.abandoned) {
						console.log("Ignoring error since task was abandoned (i.e. from task cancellation after resetting)")
						return
					}
					const errorString = `Error ${action}: ${JSON.stringify(serializeError(error))}`
					await this.say(
						"error",
						`Error ${action}:\n${error.message ?? JSON.stringify(serializeError(error), null, 2)}`,
					)
					// this.toolResults.push({
					// 	type: "tool_result",
					// 	tool_use_id: toolUseId,
					// 	content: await this.formatToolError(errorString),
					// })
					pushToolResult(formatResponse.toolError(errorString))
				}

				// If block is partial, remove partial closing tag so its not presented to user
				const removeClosingTag = (tag: ToolParamName, text?: string) => {
					if (!block.partial) {
						return text || ""
					}
					if (!text) {
						return ""
					}
					// This regex dynamically constructs a pattern to match the closing tag:
					// - Optionally matches whitespace before the tag
					// - Matches '<' or '</' optionally followed by any subset of characters from the tag name
					const tagRegex = new RegExp(
						`\\s?<\/?${tag
							.split("")
							.map((char) => `(?:${char})?`)
							.join("")}$`,
						"g",
					)
					return text.replace(tagRegex, "")
				}

				if (block.name !== "browser_action") {
					await this.browserSession.closeBrowser()
				}

				switch (block.name) {
					case "write_to_file":
					case "replace_in_file": {
						const relPath: string | undefined = block.params.path
						let content: string | undefined = block.params.content // for write_to_file
						let diff: string | undefined = block.params.diff // for replace_in_file
						if (!relPath || (!content && !diff)) {
							// checking for content/diff ensures relPath is complete
							// wait so we can determine if it's a new file or editing an existing file
							break
						}

						const accessAllowed = this.clineIgnoreController.validateAccess(relPath)
						if (!accessAllowed) {
							await this.say("clineignore_error", relPath)
							pushToolResult(formatResponse.toolError(formatResponse.clineIgnoreError(relPath)))

							break
						}

						// Check if file exists using cached map or fs.access
						let fileExists: boolean
						if (this.diffViewProvider.editType !== undefined) {
							fileExists = this.diffViewProvider.editType === "modify"
						} else {
							const absolutePath = path.resolve(cwd, relPath)
							fileExists = await fileExistsAtPath(absolutePath)
							this.diffViewProvider.editType = fileExists ? "modify" : "create"
						}

						try {
							// Construct newContent from diff
							let newContent: string
							if (diff) {
								if (!this.api.getModel().id.includes("claude")) {
									// deepseek models tend to use unescaped html entities in diffs
									diff = fixModelHtmlEscaping(diff)
									diff = removeInvalidChars(diff)
								}

								// open the editor if not done already.  This is to fix diff error when model provides correct search-replace text but Cline throws error
								// because file is not open.
								if (!this.diffViewProvider.isEditing) {
									await this.diffViewProvider.open(relPath)
								}

								try {
									newContent = await constructNewFileContent(
										diff,
										this.diffViewProvider.originalContent || "",
										!block.partial,
									)
								} catch (error) {
									await this.say("diff_error", relPath)

									// Extract error type from error message if possible, or use a generic type
									const errorType =
										error instanceof Error && error.message.includes("does not match anything")
											? "search_not_found"
											: "other_diff_error"

									// Add telemetry for diff edit failure
									telemetryService.captureDiffEditFailure(this.taskId, errorType)

									pushToolResult(
										formatResponse.toolError(
											`${(error as Error)?.message}\n\n` +
												`This is likely because the SEARCH block content doesn't match exactly with what's in the file, or if you used multiple SEARCH/REPLACE blocks they may not have been in the order they appear in the file.\n\n` +
												`The file was reverted to its original state:\n\n` +
												`<file_content path="${relPath.toPosix()}">\n${this.diffViewProvider.originalContent}\n</file_content>\n\n` +
												`First, make sure you call the read_file tool and re-read the file again in case any changes were made, to get its latest state. Then, make a proper, TARGETED search and replace edit using the write_to_file tool.` +
												`You may want to try fewer/more precise SEARCH blocks.\n(If you run into this error three times in a row, you may use the write_to_file tool as a fallback. ` +
												`Keep in mind, the write_to_file fallback is far from ideal, as this means you'll be re-writing the entire contents of the file just to make a few edits, which takes time and money. So let's bias towards using replace_in_file as effectively as possible)`,
										),
									)
									await this.diffViewProvider.revertChanges()
									await this.diffViewProvider.reset()
									break
								}
							} else if (content) {
								newContent = content

								// pre-processing newContent for cases where weaker models might add artifacts like markdown codeblock markers (deepseek/llama) or extra escape characters (gemini)
								if (newContent.startsWith("```")) {
									// this handles cases where it includes language specifiers like ```python ```js
									newContent = newContent.split("\n").slice(1).join("\n").trim()
								}
								if (newContent.endsWith("```")) {
									newContent = newContent.split("\n").slice(0, -1).join("\n").trim()
								}

								if (!this.api.getModel().id.includes("claude")) {
									// it seems not just llama models are doing this, but also gemini and potentially others
									newContent = fixModelHtmlEscaping(newContent)
									newContent = removeInvalidChars(newContent)
								}
							} else {
								// can't happen, since we already checked for content/diff above. but need to do this for type error
								break
							}

							newContent = newContent.trimEnd() // remove any trailing newlines, since it's automatically inserted by the editor

							const sharedMessageProps: ClineSayTool = {
								tool: fileExists ? "editedExistingFile" : "newFileCreated",
								path: getReadablePath(cwd, removeClosingTag("path", relPath)),
								content: diff || content,
							}

							if (block.partial) {
								// update gui message
								const partialMessage = JSON.stringify(sharedMessageProps)
								if (this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "tool") // in case the user changes auto-approval settings mid stream
									await this.say("tool", partialMessage, undefined, block.partial)
								} else {
									this.removeLastPartialMessageIfExistsWithType("say", "tool")
									await this.ask("tool", partialMessage, block.partial).catch(() => {})
								}
								// update editor
								if (!this.diffViewProvider.isEditing) {
									// open the editor and prepare to stream content in
									await this.diffViewProvider.open(relPath)
								}
								// editor is open, stream content in
								await this.diffViewProvider.update(newContent, false)
								break
							} else {
								if (!relPath) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError(block.name, "path"))
									await this.diffViewProvider.reset()

									break
								}
								if (block.name === "replace_in_file" && !diff) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("replace_in_file", "diff"))
									await this.diffViewProvider.reset()

									break
								}
								if (block.name === "write_to_file" && !content) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("write_to_file", "content"))
									await this.diffViewProvider.reset()

									break
								}

								this.consecutiveMistakeCount = 0

								// if isEditingFile false, that means we have the full contents of the file already.
								// it's important to note how this function works, you can't make the assumption that the block.partial conditional will always be called since it may immediately get complete, non-partial data. So this part of the logic will always be called.
								// in other words, you must always repeat the block.partial logic here
								if (!this.diffViewProvider.isEditing) {
									// show gui message before showing edit animation
									const partialMessage = JSON.stringify(sharedMessageProps)
									await this.ask("tool", partialMessage, true).catch(() => {}) // sending true for partial even though it's not a partial, this shows the edit row before the content is streamed into the editor
									await this.diffViewProvider.open(relPath)
								}
								await this.diffViewProvider.update(newContent, true)
								await setTimeoutPromise(300) // wait for diff view to update
								this.diffViewProvider.scrollToFirstDiff()
								// showOmissionWarning(this.diffViewProvider.originalContent || "", newContent)

								const completeMessage = JSON.stringify({
									...sharedMessageProps,
									content: diff || content,
									// ? formatResponse.createPrettyPatch(
									// 		relPath,
									// 		this.diffViewProvider.originalContent,
									// 		newContent,
									// 	)
									// : undefined,
								} satisfies ClineSayTool)

								if (this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "tool")
									await this.say("tool", completeMessage, undefined, false)
									this.consecutiveAutoApprovedRequestsCount++
									telemetryService.captureToolUsage(this.taskId, block.name, true, true)

									// we need an artificial delay to let the diagnostics catch up to the changes
									await setTimeoutPromise(3_500)
								} else {
									// If auto-approval is enabled but this tool wasn't auto-approved, send notification
									showNotificationForApprovalIfAutoApprovalEnabled(
										`Cline wants to ${fileExists ? "edit" : "create"} ${path.basename(relPath)}`,
									)
									this.removeLastPartialMessageIfExistsWithType("say", "tool")

									// Need a more customized tool response for file edits to highlight the fact that the file was not updated (particularly important for deepseek)
									let didApprove = true
									const { response, text, images } = await this.ask("tool", completeMessage, false)
									if (response !== "yesButtonClicked") {
										// User either sent a message or pressed reject button
										// TODO: add similar context for other tool denial responses, to emphasize ie that a command was not run
										const fileDeniedNote = fileExists
											? "The file was not updated, and maintains its original contents."
											: "The file was not created."
										pushToolResult(`The user denied this operation. ${fileDeniedNote}`)
										if (text || images?.length) {
											pushAdditionalToolFeedback(text, images)
											await this.say("user_feedback", text, images)
										}
										this.didRejectTool = true
										didApprove = false
										telemetryService.captureToolUsage(this.taskId, block.name, false, false)
									} else {
										// User hit the approve button, and may have provided feedback
										if (text || images?.length) {
											pushAdditionalToolFeedback(text, images)
											await this.say("user_feedback", text, images)
										}
										telemetryService.captureToolUsage(this.taskId, block.name, false, true)
									}

									if (!didApprove) {
										await this.diffViewProvider.revertChanges()
										break
									}
								}

								const { newProblemsMessage, userEdits, autoFormattingEdits, finalContent } =
									await this.diffViewProvider.saveChanges()
								this.didEditFile = true // used to determine if we should wait for busy terminal to update before sending api request
								if (userEdits) {
									await this.say(
										"user_feedback_diff",
										JSON.stringify({
											tool: fileExists ? "editedExistingFile" : "newFileCreated",
											path: getReadablePath(cwd, relPath),
											diff: userEdits,
										} satisfies ClineSayTool),
									)
									pushToolResult(
										`The user made the following updates to your content:\n\n${userEdits}\n\n` +
											(autoFormattingEdits
												? `The user's editor also applied the following auto-formatting to your content:\n\n${autoFormattingEdits}\n\n(Note: Pay close attention to changes such as single quotes being converted to double quotes, semicolons being removed or added, long lines being broken into multiple lines, adjusting indentation style, adding/removing trailing commas, etc. This will help you ensure future SEARCH/REPLACE operations to this file are accurate.)\n\n`
												: "") +
											`The updated content, which includes both your original modifications and the additional edits, has been successfully saved to ${relPath.toPosix()}. Here is the full, updated content of the file that was saved:\n\n` +
											`<final_file_content path="${relPath.toPosix()}">\n${finalContent}\n</final_file_content>\n\n` +
											`Please note:\n` +
											`1. You do not need to re-write the file with these changes, as they have already been applied.\n` +
											`2. Proceed with the task using this updated file content as the new baseline.\n` +
											`3. If the user's edits have addressed part of the task or changed the requirements, adjust your approach accordingly.` +
											`4. IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including both user edits and any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.\n` +
											`${newProblemsMessage}`,
									)
								} else {
									pushToolResult(
										`The content was successfully saved to ${relPath.toPosix()}.\n\n` +
											(autoFormattingEdits
												? `Along with your edits, the user's editor applied the following auto-formatting to your content:\n\n${autoFormattingEdits}\n\n(Note: Pay close attention to changes such as single quotes being converted to double quotes, semicolons being removed or added, long lines being broken into multiple lines, adjusting indentation style, adding/removing trailing commas, etc. This will help you ensure future SEARCH/REPLACE operations to this file are accurate.)\n\n`
												: "") +
											`Here is the full, updated content of the file that was saved:\n\n` +
											`<final_file_content path="${relPath.toPosix()}">\n${finalContent}\n</final_file_content>\n\n` +
											`IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.\n\n` +
											`${newProblemsMessage}`,
									)
								}

								if (!fileExists) {
									this.providerRef.deref()?.workspaceTracker?.populateFilePaths()
								}

								await this.diffViewProvider.reset()

								await this.saveCheckpoint()

								break
							}
						} catch (error) {
							await handleError("writing file", error)
							await this.diffViewProvider.revertChanges()
							await this.diffViewProvider.reset()

							break
						}
					}
					case "read_file": {
						const relPath: string | undefined = block.params.path
						const sharedMessageProps: ClineSayTool = {
							tool: "readFile",
							path: getReadablePath(cwd, removeClosingTag("path", relPath)),
						}
						try {
							if (block.partial) {
								const partialMessage = JSON.stringify({
									...sharedMessageProps,
									content: undefined,
								} satisfies ClineSayTool)
								if (this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "tool")
									await this.say("tool", partialMessage, undefined, block.partial)
								} else {
									this.removeLastPartialMessageIfExistsWithType("say", "tool")
									await this.ask("tool", partialMessage, block.partial).catch(() => {})
								}
								break
							} else {
								if (!relPath) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("read_file", "path"))

									break
								}

								const accessAllowed = this.clineIgnoreController.validateAccess(relPath)
								if (!accessAllowed) {
									await this.say("clineignore_error", relPath)
									pushToolResult(formatResponse.toolError(formatResponse.clineIgnoreError(relPath)))

									break
								}

								this.consecutiveMistakeCount = 0
								const absolutePath = path.resolve(cwd, relPath)
								const completeMessage = JSON.stringify({
									...sharedMessageProps,
									content: absolutePath,
								} satisfies ClineSayTool)
								if (this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "tool")
									await this.say("tool", completeMessage, undefined, false) // need to be sending partialValue bool, since undefined has its own purpose in that the message is treated neither as a partial or completion of a partial, but as a single complete message
									this.consecutiveAutoApprovedRequestsCount++
									telemetryService.captureToolUsage(this.taskId, block.name, true, true)
								} else {
									showNotificationForApprovalIfAutoApprovalEnabled(
										`Cline wants to read ${path.basename(absolutePath)}`,
									)
									this.removeLastPartialMessageIfExistsWithType("say", "tool")
									const didApprove = await askApproval("tool", completeMessage)
									if (!didApprove) {
										telemetryService.captureToolUsage(this.taskId, block.name, false, false)
										break
									}
									telemetryService.captureToolUsage(this.taskId, block.name, false, true)
								}
								// now execute the tool like normal
								const content = await extractTextFromFile(absolutePath)
								pushToolResult(content)

								break
							}
						} catch (error) {
							await handleError("reading file", error)

							break
						}
					}
					case "list_files": {
						const relDirPath: string | undefined = block.params.path
						const recursiveRaw: string | undefined = block.params.recursive
						const recursive = recursiveRaw?.toLowerCase() === "true"
						const sharedMessageProps: ClineSayTool = {
							tool: !recursive ? "listFilesTopLevel" : "listFilesRecursive",
							path: getReadablePath(cwd, removeClosingTag("path", relDirPath)),
						}
						try {
							if (block.partial) {
								const partialMessage = JSON.stringify({
									...sharedMessageProps,
									content: "",
								} satisfies ClineSayTool)
								if (this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "tool")
									await this.say("tool", partialMessage, undefined, block.partial)
								} else {
									this.removeLastPartialMessageIfExistsWithType("say", "tool")
									await this.ask("tool", partialMessage, block.partial).catch(() => {})
								}
								break
							} else {
								if (!relDirPath) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("list_files", "path"))

									break
								}
								this.consecutiveMistakeCount = 0

								const absolutePath = path.resolve(cwd, relDirPath)

								const [files, didHitLimit] = await listFiles(absolutePath, recursive, 200)

								const result = formatResponse.formatFilesList(
									absolutePath,
									files,
									didHitLimit,
									this.clineIgnoreController,
								)
								const completeMessage = JSON.stringify({
									...sharedMessageProps,
									content: result,
								} satisfies ClineSayTool)
								if (this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "tool")
									await this.say("tool", completeMessage, undefined, false)
									this.consecutiveAutoApprovedRequestsCount++
									telemetryService.captureToolUsage(this.taskId, block.name, true, true)
								} else {
									showNotificationForApprovalIfAutoApprovalEnabled(
										`Cline wants to view directory ${path.basename(absolutePath)}/`,
									)
									this.removeLastPartialMessageIfExistsWithType("say", "tool")
									const didApprove = await askApproval("tool", completeMessage)
									if (!didApprove) {
										telemetryService.captureToolUsage(this.taskId, block.name, false, false)
										break
									}
									telemetryService.captureToolUsage(this.taskId, block.name, false, true)
								}
								pushToolResult(result)

								break
							}
						} catch (error) {
							await handleError("listing files", error)

							break
						}
					}
					case "list_code_definition_names": {
						const relDirPath: string | undefined = block.params.path
						const sharedMessageProps: ClineSayTool = {
							tool: "listCodeDefinitionNames",
							path: getReadablePath(cwd, removeClosingTag("path", relDirPath)),
						}
						try {
							if (block.partial) {
								const partialMessage = JSON.stringify({
									...sharedMessageProps,
									content: "",
								} satisfies ClineSayTool)
								if (this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "tool")
									await this.say("tool", partialMessage, undefined, block.partial)
								} else {
									this.removeLastPartialMessageIfExistsWithType("say", "tool")
									await this.ask("tool", partialMessage, block.partial).catch(() => {})
								}
								break
							} else {
								if (!relDirPath) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("list_code_definition_names", "path"))

									break
								}

								this.consecutiveMistakeCount = 0

								const absolutePath = path.resolve(cwd, relDirPath)
								const result = await parseSourceCodeForDefinitionsTopLevel(
									absolutePath,
									this.clineIgnoreController,
								)

								const completeMessage = JSON.stringify({
									...sharedMessageProps,
									content: result,
								} satisfies ClineSayTool)
								if (this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "tool")
									await this.say("tool", completeMessage, undefined, false)
									this.consecutiveAutoApprovedRequestsCount++
									telemetryService.captureToolUsage(this.taskId, block.name, true, true)
								} else {
									showNotificationForApprovalIfAutoApprovalEnabled(
										`Cline wants to view source code definitions in ${path.basename(absolutePath)}/`,
									)
									this.removeLastPartialMessageIfExistsWithType("say", "tool")
									const didApprove = await askApproval("tool", completeMessage)
									if (!didApprove) {
										telemetryService.captureToolUsage(this.taskId, block.name, false, false)
										break
									}
									telemetryService.captureToolUsage(this.taskId, block.name, false, true)
								}
								pushToolResult(result)

								break
							}
						} catch (error) {
							await handleError("parsing source code definitions", error)

							break
						}
					}
					case "search_files": {
						const relDirPath: string | undefined = block.params.path
						const regex: string | undefined = block.params.regex
						const filePattern: string | undefined = block.params.file_pattern
						const sharedMessageProps: ClineSayTool = {
							tool: "searchFiles",
							path: getReadablePath(cwd, removeClosingTag("path", relDirPath)),
							regex: removeClosingTag("regex", regex),
							filePattern: removeClosingTag("file_pattern", filePattern),
						}
						try {
							if (block.partial) {
								const partialMessage = JSON.stringify({
									...sharedMessageProps,
									content: "",
								} satisfies ClineSayTool)
								if (this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "tool")
									await this.say("tool", partialMessage, undefined, block.partial)
								} else {
									this.removeLastPartialMessageIfExistsWithType("say", "tool")
									await this.ask("tool", partialMessage, block.partial).catch(() => {})
								}
								break
							} else {
								if (!relDirPath) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("search_files", "path"))

									break
								}
								if (!regex) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("search_files", "regex"))

									break
								}
								this.consecutiveMistakeCount = 0

								const absolutePath = path.resolve(cwd, relDirPath)
								const results = await regexSearchFiles(
									cwd,
									absolutePath,
									regex,
									filePattern,
									this.clineIgnoreController,
								)

								const completeMessage = JSON.stringify({
									...sharedMessageProps,
									content: results,
								} satisfies ClineSayTool)
								if (this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "tool")
									await this.say("tool", completeMessage, undefined, false)
									this.consecutiveAutoApprovedRequestsCount++
									telemetryService.captureToolUsage(this.taskId, block.name, true, true)
								} else {
									showNotificationForApprovalIfAutoApprovalEnabled(
										`Cline wants to search files in ${path.basename(absolutePath)}/`,
									)
									this.removeLastPartialMessageIfExistsWithType("say", "tool")
									const didApprove = await askApproval("tool", completeMessage)
									if (!didApprove) {
										telemetryService.captureToolUsage(this.taskId, block.name, false, false)
										break
									}
									telemetryService.captureToolUsage(this.taskId, block.name, false, true)
								}
								pushToolResult(results)

								break
							}
						} catch (error) {
							await handleError("searching files", error)

							break
						}
					}
					case "browser_action": {
						const action: BrowserAction | undefined = block.params.action as BrowserAction
						const url: string | undefined = block.params.url
						const coordinate: string | undefined = block.params.coordinate
						const text: string | undefined = block.params.text
						if (!action || !browserActions.includes(action)) {
							// checking for action to ensure it is complete and valid
							if (!block.partial) {
								// if the block is complete and we don't have a valid action this is a mistake
								this.consecutiveMistakeCount++
								pushToolResult(await this.sayAndCreateMissingParamError("browser_action", "action"))
								await this.browserSession.closeBrowser()
							}
							break
						}

						try {
							if (block.partial) {
								if (action === "launch") {
									if (this.shouldAutoApproveTool(block.name)) {
										this.removeLastPartialMessageIfExistsWithType("ask", "browser_action_launch")
										await this.say(
											"browser_action_launch",
											removeClosingTag("url", url),
											undefined,
											block.partial,
										)
									} else {
										this.removeLastPartialMessageIfExistsWithType("say", "browser_action_launch")
										await this.ask(
											"browser_action_launch",
											removeClosingTag("url", url),
											block.partial,
										).catch(() => {})
									}
								} else {
									await this.say(
										"browser_action",
										JSON.stringify({
											action: action as BrowserAction,
											coordinate: removeClosingTag("coordinate", coordinate),
											text: removeClosingTag("text", text),
										} satisfies ClineSayBrowserAction),
										undefined,
										block.partial,
									)
								}
								break
							} else {
								let browserActionResult: BrowserActionResult
								if (action === "launch") {
									if (!url) {
										this.consecutiveMistakeCount++
										pushToolResult(await this.sayAndCreateMissingParamError("browser_action", "url"))
										await this.browserSession.closeBrowser()

										break
									}
									this.consecutiveMistakeCount = 0

									if (this.shouldAutoApproveTool(block.name)) {
										this.removeLastPartialMessageIfExistsWithType("ask", "browser_action_launch")
										await this.say("browser_action_launch", url, undefined, false)
										this.consecutiveAutoApprovedRequestsCount++
									} else {
										showNotificationForApprovalIfAutoApprovalEnabled(
											`Cline wants to use a browser and launch ${url}`,
										)
										this.removeLastPartialMessageIfExistsWithType("say", "browser_action_launch")
										const didApprove = await askApproval("browser_action_launch", url)
										if (!didApprove) {
											break
										}
									}

									// NOTE: it's okay that we call this message since the partial inspect_site is finished streaming. The only scenario we have to avoid is sending messages WHILE a partial message exists at the end of the messages array. For example the api_req_finished message would interfere with the partial message, so we needed to remove that.
									// await this.say("inspect_site_result", "") // no result, starts the loading spinner waiting for result
									await this.say("browser_action_result", "") // starts loading spinner

									await this.browserSession.launchBrowser()
									browserActionResult = await this.browserSession.navigateToUrl(url)
								} else {
									if (action === "click") {
										if (!coordinate) {
											this.consecutiveMistakeCount++
											pushToolResult(
												await this.sayAndCreateMissingParamError("browser_action", "coordinate"),
											)
											await this.browserSession.closeBrowser()

											break // can't be within an inner switch
										}
									}
									if (action === "type") {
										if (!text) {
											this.consecutiveMistakeCount++
											pushToolResult(await this.sayAndCreateMissingParamError("browser_action", "text"))
											await this.browserSession.closeBrowser()

											break
										}
									}
									this.consecutiveMistakeCount = 0
									await this.say(
										"browser_action",
										JSON.stringify({
											action: action as BrowserAction,
											coordinate,
											text,
										} satisfies ClineSayBrowserAction),
										undefined,
										false,
									)
									switch (action) {
										case "click":
											browserActionResult = await this.browserSession.click(coordinate!)
											break
										case "type":
											browserActionResult = await this.browserSession.type(text!)
											break
										case "scroll_down":
											browserActionResult = await this.browserSession.scrollDown()
											break
										case "scroll_up":
											browserActionResult = await this.browserSession.scrollUp()
											break
										case "close":
											browserActionResult = await this.browserSession.closeBrowser()
											break
									}
								}

								switch (action) {
									case "launch":
									case "click":
									case "type":
									case "scroll_down":
									case "scroll_up":
										await this.say("browser_action_result", JSON.stringify(browserActionResult))
										pushToolResult(
											formatResponse.toolResult(
												`The browser action has been executed. The console logs and screenshot have been captured for your analysis.\n\nConsole logs:\n${
													browserActionResult.logs || "(No new logs)"
												}\n\n(REMEMBER: if you need to proceed to using non-\`browser_action\` tools or launch a new browser, you MUST first close this browser. For example, if after analyzing the logs and screenshot you need to edit a file, you must first close the browser before you can use the write_to_file tool.)`,
												browserActionResult.screenshot ? [browserActionResult.screenshot] : [],
											),
										)

										break
									case "close":
										pushToolResult(
											formatResponse.toolResult(
												`The browser has been closed. You may now proceed to using other tools.`,
											),
										)

										break
								}

								break
							}
						} catch (error) {
							await this.browserSession.closeBrowser() // if any error occurs, the browser session is terminated
							await handleError("executing browser action", error)

							break
						}
					}
					case "execute_command": {
						const command: string | undefined = block.params.command
						const requiresApprovalRaw: string | undefined = block.params.requires_approval
						const requiresApproval = requiresApprovalRaw?.toLowerCase() === "true"

						try {
							if (block.partial) {
								if (this.shouldAutoApproveTool(block.name)) {
									// since depending on an upcoming parameter, requiresApproval this may become an ask - we cant partially stream a say prematurely. So in this particular case we have to wait for the requiresApproval parameter to be completed before presenting it.
									// await this.say(
									// 	"command",
									// 	removeClosingTag("command", command),
									// 	undefined,
									// 	block.partial,
									// ).catch(() => {})
								} else {
									// don't need to remove last partial since we couldn't have streamed a say
									await this.ask("command", removeClosingTag("command", command), block.partial).catch(() => {})
								}
								break
							} else {
								if (!command) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("execute_command", "command"))

									break
								}
								if (!requiresApprovalRaw) {
									this.consecutiveMistakeCount++
									pushToolResult(
										await this.sayAndCreateMissingParamError("execute_command", "requires_approval"),
									)

									break
								}
								this.consecutiveMistakeCount = 0

								const ignoredFileAttemptedToAccess = this.clineIgnoreController.validateCommand(command)
								if (ignoredFileAttemptedToAccess) {
									await this.say("clineignore_error", ignoredFileAttemptedToAccess)
									pushToolResult(
										formatResponse.toolError(formatResponse.clineIgnoreError(ignoredFileAttemptedToAccess)),
									)

									break
								}

								let didAutoApprove = false

								if (!requiresApproval && this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "command")
									await this.say("command", command, undefined, false)
									this.consecutiveAutoApprovedRequestsCount++
									didAutoApprove = true
								} else {
									showNotificationForApprovalIfAutoApprovalEnabled(
										`Cline wants to execute a command: ${command}`,
									)
									// this.removeLastPartialMessageIfExistsWithType("say", "command")
									const didApprove = await askApproval(
										"command",
										command +
											`${this.shouldAutoApproveTool(block.name) && requiresApproval ? COMMAND_REQ_APP_STRING : ""}`, // ugly hack until we refactor combineCommandSequences
									)
									if (!didApprove) {
										break
									}
								}

								let timeoutId: NodeJS.Timeout | undefined
								if (didAutoApprove && this.autoApprovalSettings.enableNotifications) {
									// if the command was auto-approved, and it's long running we need to notify the user after some time has passed without proceeding
									timeoutId = setTimeout(() => {
										showSystemNotification({
											subtitle: "Command is still running",
											message:
												"An auto-approved command has been running for 30s, and may need your attention.",
										})
									}, 30_000)
								}

								const [userRejected, result] = await this.executeCommandTool(command)
								if (timeoutId) {
									clearTimeout(timeoutId)
								}
								if (userRejected) {
									this.didRejectTool = true
								}

								// Re-populate file paths in case the command modified the workspace (vscode listeners do not trigger unless the user manually creates/deletes files)
								this.providerRef.deref()?.workspaceTracker?.populateFilePaths()

								pushToolResult(result)

								await this.saveCheckpoint()

								break
							}
						} catch (error) {
							await handleError("executing command", error)

							break
						}
					}
					case "use_mcp_tool": {
						const server_name: string | undefined = block.params.server_name
						const tool_name: string | undefined = block.params.tool_name
						const mcp_arguments: string | undefined = block.params.arguments
						try {
							if (block.partial) {
								const partialMessage = JSON.stringify({
									type: "use_mcp_tool",
									serverName: removeClosingTag("server_name", server_name),
									toolName: removeClosingTag("tool_name", tool_name),
									arguments: removeClosingTag("arguments", mcp_arguments),
								} satisfies ClineAskUseMcpServer)

								if (this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "use_mcp_server")
									await this.say("use_mcp_server", partialMessage, undefined, block.partial)
								} else {
									this.removeLastPartialMessageIfExistsWithType("say", "use_mcp_server")
									await this.ask("use_mcp_server", partialMessage, block.partial).catch(() => {})
								}

								break
							} else {
								if (!server_name) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("use_mcp_tool", "server_name"))

									break
								}
								if (!tool_name) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("use_mcp_tool", "tool_name"))

									break
								}
								// arguments are optional, but if they are provided they must be valid JSON
								// if (!mcp_arguments) {
								// 	this.consecutiveMistakeCount++
								// 	pushToolResult(await this.sayAndCreateMissingParamError("use_mcp_tool", "arguments"))
								// 	break
								// }
								let parsedArguments: Record<string, unknown> | undefined
								if (mcp_arguments) {
									try {
										parsedArguments = JSON.parse(mcp_arguments)
									} catch (error) {
										this.consecutiveMistakeCount++
										await this.say(
											"error",
											`Cline tried to use ${tool_name} with an invalid JSON argument. Retrying...`,
										)
										pushToolResult(
											formatResponse.toolError(
												formatResponse.invalidMcpToolArgumentError(server_name, tool_name),
											),
										)

										break
									}
								}
								this.consecutiveMistakeCount = 0
								const completeMessage = JSON.stringify({
									type: "use_mcp_tool",
									serverName: server_name,
									toolName: tool_name,
									arguments: mcp_arguments,
								} satisfies ClineAskUseMcpServer)

								const isToolAutoApproved = this.providerRef
									.deref()
									?.mcpHub?.connections?.find((conn) => conn.server.name === server_name)
									?.server.tools?.find((tool) => tool.name === tool_name)?.autoApprove

								if (this.shouldAutoApproveTool(block.name) && isToolAutoApproved) {
									this.removeLastPartialMessageIfExistsWithType("ask", "use_mcp_server")
									await this.say("use_mcp_server", completeMessage, undefined, false)
									this.consecutiveAutoApprovedRequestsCount++
								} else {
									showNotificationForApprovalIfAutoApprovalEnabled(
										`Cline wants to use ${tool_name} on ${server_name}`,
									)
									this.removeLastPartialMessageIfExistsWithType("say", "use_mcp_server")
									const didApprove = await askApproval("use_mcp_server", completeMessage)
									if (!didApprove) {
										break
									}
								}

								// now execute the tool
								await this.say("mcp_server_request_started") // same as browser_action_result
								const toolResult = await this.providerRef
									.deref()
									?.mcpHub?.callTool(server_name, tool_name, parsedArguments)

								// TODO: add progress indicator and ability to parse images and non-text responses
								const toolResultPretty =
									(toolResult?.isError ? "Error:\n" : "") +
										toolResult?.content
											.map((item) => {
												if (item.type === "text") {
													return item.text
												}
												if (item.type === "resource") {
													const { blob, ...rest } = item.resource
													return JSON.stringify(rest, null, 2)
												}
												return ""
											})
											.filter(Boolean)
											.join("\n\n") || "(No response)"
								await this.say("mcp_server_response", toolResultPretty)
								pushToolResult(formatResponse.toolResult(toolResultPretty))

								await this.saveCheckpoint()

								break
							}
						} catch (error) {
							await handleError("executing MCP tool", error)

							break
						}
					}
					case "access_mcp_resource": {
						const server_name: string | undefined = block.params.server_name
						const uri: string | undefined = block.params.uri
						try {
							if (block.partial) {
								const partialMessage = JSON.stringify({
									type: "access_mcp_resource",
									serverName: removeClosingTag("server_name", server_name),
									uri: removeClosingTag("uri", uri),
								} satisfies ClineAskUseMcpServer)

								if (this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "use_mcp_server")
									await this.say("use_mcp_server", partialMessage, undefined, block.partial)
								} else {
									this.removeLastPartialMessageIfExistsWithType("say", "use_mcp_server")
									await this.ask("use_mcp_server", partialMessage, block.partial).catch(() => {})
								}

								break
							} else {
								if (!server_name) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("access_mcp_resource", "server_name"))

									break
								}
								if (!uri) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("access_mcp_resource", "uri"))

									break
								}
								this.consecutiveMistakeCount = 0
								const completeMessage = JSON.stringify({
									type: "access_mcp_resource",
									serverName: server_name,
									uri,
								} satisfies ClineAskUseMcpServer)

								if (this.shouldAutoApproveTool(block.name)) {
									this.removeLastPartialMessageIfExistsWithType("ask", "use_mcp_server")
									await this.say("use_mcp_server", completeMessage, undefined, false)
									this.consecutiveAutoApprovedRequestsCount++
								} else {
									showNotificationForApprovalIfAutoApprovalEnabled(
										`Cline wants to access ${uri} on ${server_name}`,
									)
									this.removeLastPartialMessageIfExistsWithType("say", "use_mcp_server")
									const didApprove = await askApproval("use_mcp_server", completeMessage)
									if (!didApprove) {
										break
									}
								}

								// now execute the tool
								await this.say("mcp_server_request_started")
								const resourceResult = await this.providerRef.deref()?.mcpHub?.readResource(server_name, uri)
								const resourceResultPretty =
									resourceResult?.contents
										.map((item) => {
											if (item.text) {
												return item.text
											}
											return ""
										})
										.filter(Boolean)
										.join("\n\n") || "(Empty response)"
								await this.say("mcp_server_response", resourceResultPretty)
								pushToolResult(formatResponse.toolResult(resourceResultPretty))

								break
							}
						} catch (error) {
							await handleError("accessing MCP resource", error)

							break
						}
					}
					case "ask_followup_question": {
						const question: string | undefined = block.params.question
						const optionsRaw: string | undefined = block.params.options
						const sharedMessage = {
							question: removeClosingTag("question", question),
							options: parsePartialArrayString(removeClosingTag("options", optionsRaw)),
						} satisfies ClineAskQuestion
						try {
							if (block.partial) {
								await this.ask("followup", JSON.stringify(sharedMessage), block.partial).catch(() => {})
								break
							} else {
								if (!question) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("ask_followup_question", "question"))

									break
								}
								this.consecutiveMistakeCount = 0

								if (this.autoApprovalSettings.enabled && this.autoApprovalSettings.enableNotifications) {
									showSystemNotification({
										subtitle: "Cline has a question...",
										message: question.replace(/\n/g, " "),
									})
								}

								const { text, images } = await this.ask("followup", JSON.stringify(sharedMessage), false)

								// Check if options contains the text response
								if (optionsRaw && text && parsePartialArrayString(optionsRaw).includes(text)) {
									// Valid option selected, don't show user message in UI
									// Update last followup message with selected option
									const lastFollowupMessage = findLast(this.clineMessages, (m) => m.ask === "followup")
									if (lastFollowupMessage) {
										lastFollowupMessage.text = JSON.stringify({
											...sharedMessage,
											selected: text,
										} satisfies ClineAskQuestion)
										await this.saveClineMessages()
									}
								} else {
									// Option not selected, send user feedback
									await this.say("user_feedback", text ?? "", images)
								}

								pushToolResult(formatResponse.toolResult(`<answer>\n${text}\n</answer>`, images))

								break
							}
						} catch (error) {
							await handleError("asking question", error)

							break
						}
					}
					case "plan_mode_respond": {
						const response: string | undefined = block.params.response
						const optionsRaw: string | undefined = block.params.options
						const sharedMessage = {
							response: removeClosingTag("response", response),
							options: parsePartialArrayString(removeClosingTag("options", optionsRaw)),
						} satisfies ClinePlanModeResponse
						try {
							if (block.partial) {
								await this.ask("plan_mode_respond", JSON.stringify(sharedMessage), block.partial).catch(() => {})
								break
							} else {
								if (!response) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("plan_mode_respond", "response"))
									//
									break
								}
								this.consecutiveMistakeCount = 0

								// if (this.autoApprovalSettings.enabled && this.autoApprovalSettings.enableNotifications) {
								// 	showSystemNotification({
								// 		subtitle: "Cline has a response...",
								// 		message: response.replace(/\n/g, " "),
								// 	})
								// }

								this.isAwaitingPlanResponse = true
								let { text, images } = await this.ask("plan_mode_respond", JSON.stringify(sharedMessage), false)
								this.isAwaitingPlanResponse = false

								// webview invoke sendMessage will send this marker in order to put webview into the proper state (responding to an ask) and as a flag to extension that the user switched to ACT mode.
								if (text === "PLAN_MODE_TOGGLE_RESPONSE") {
									text = ""
								}

								// Check if options contains the text response
								if (optionsRaw && text && parsePartialArrayString(optionsRaw).includes(text)) {
									// Valid option selected, don't show user message in UI
									// Update last followup message with selected option
									const lastPlanMessage = findLast(this.clineMessages, (m) => m.ask === "plan_mode_respond")
									if (lastPlanMessage) {
										lastPlanMessage.text = JSON.stringify({
											...sharedMessage,
											selected: text,
										} satisfies ClinePlanModeResponse)
										await this.saveClineMessages()
									}
								} else {
									// Option not selected, send user feedback
									if (text || images?.length) {
										await this.say("user_feedback", text ?? "", images)
									}
								}

								if (this.didRespondToPlanAskBySwitchingMode) {
									pushToolResult(
										formatResponse.toolResult(
											`[The user has switched to ACT MODE, so you may now proceed with the task.]` +
												(text
													? `\n\nThe user also provided the following message when switching to ACT MODE:\n<user_message>\n${text}\n</user_message>`
													: ""),
											images,
										),
									)
								} else {
									// if we didn't switch to ACT MODE, then we can just send the user_feedback message
									pushToolResult(formatResponse.toolResult(`<user_message>\n${text}\n</user_message>`, images))
								}

								//
								break
							}
						} catch (error) {
							await handleError("responding to inquiry", error)
							//
							break
						}
					}
					case "attempt_completion": {
						/*
						this.consecutiveMistakeCount = 0
						let resultToSend = result
						if (command) {
							await this.say("completion_result", resultToSend)
							// TODO: currently we don't handle if this command fails, it could be useful to let cline know and retry
							const [didUserReject, commandResult] = await this.executeCommand(command, true)
							// if we received non-empty string, the command was rejected or failed
							if (commandResult) {
								return [didUserReject, commandResult]
							}
							resultToSend = ""
						}
						const { response, text, images } = await this.ask("completion_result", resultToSend) // this prompts webview to show 'new task' button, and enable text input (which would be the 'text' here)
						if (response === "yesButtonClicked") {
							return [false, ""] // signals to recursive loop to stop (for now this never happens since yesButtonClicked will trigger a new task)
						}
						await this.say("user_feedback", text ?? "", images)
						return [
						*/
						const result: string | undefined = block.params.result
						const command: string | undefined = block.params.command

						const addNewChangesFlagToLastCompletionResultMessage = async () => {
							// Add newchanges flag if there are new changes to the workspace

							const hasNewChanges = await this.doesLatestTaskCompletionHaveNewChanges()
							const lastCompletionResultMessage = findLast(this.clineMessages, (m) => m.say === "completion_result")
							if (
								lastCompletionResultMessage &&
								hasNewChanges &&
								!lastCompletionResultMessage.text?.endsWith(COMPLETION_RESULT_CHANGES_FLAG)
							) {
								lastCompletionResultMessage.text += COMPLETION_RESULT_CHANGES_FLAG
							}
							await this.saveClineMessages()
						}

						try {
							const lastMessage = this.clineMessages.at(-1)
							if (block.partial) {
								if (command) {
									// the attempt_completion text is done, now we're getting command
									// remove the previous partial attempt_completion ask, replace with say, post state to webview, then stream command

									// const secondLastMessage = this.clineMessages.at(-2)
									// NOTE: we do not want to auto approve a command run as part of the attempt_completion tool
									if (lastMessage && lastMessage.ask === "command") {
										// update command
										await this.ask("command", removeClosingTag("command", command), block.partial).catch(
											() => {},
										)
									} else {
										// last message is completion_result
										// we have command string, which means we have the result as well, so finish it (doesnt have to exist yet)
										await this.say("completion_result", removeClosingTag("result", result), undefined, false)
										await this.saveCheckpoint(true)
										await addNewChangesFlagToLastCompletionResultMessage()
										await this.ask("command", removeClosingTag("command", command), block.partial).catch(
											() => {},
										)
									}
								} else {
									// no command, still outputting partial result
									await this.say(
										"completion_result",
										removeClosingTag("result", result),
										undefined,
										block.partial,
									)
								}
								break
							} else {
								if (!result) {
									this.consecutiveMistakeCount++
									pushToolResult(await this.sayAndCreateMissingParamError("attempt_completion", "result"))
									break
								}
								this.consecutiveMistakeCount = 0

								if (this.autoApprovalSettings.enabled && this.autoApprovalSettings.enableNotifications) {
									showSystemNotification({
										subtitle: "Task Completed",
										message: result.replace(/\n/g, " "),
									})
								}

								let commandResult: ToolResponse | undefined
								if (command) {
									if (lastMessage && lastMessage.ask !== "command") {
										// havent sent a command message yet so first send completion_result then command
										await this.say("completion_result", result, undefined, false)
										await this.saveCheckpoint(true)
										await addNewChangesFlagToLastCompletionResultMessage()
										telemetryService.captureTaskCompleted(this.taskId)
									} else {
										// we already sent a command message, meaning the complete completion message has also been sent
										await this.saveCheckpoint(true)
									}

									// complete command message
									const didApprove = await askApproval("command", command)
									if (!didApprove) {
										break
									}
									const [userRejected, execCommandResult] = await this.executeCommandTool(command!)
									if (userRejected) {
										this.didRejectTool = true
										pushToolResult(execCommandResult)
										break
									}
									// user didn't reject, but the command may have output
									commandResult = execCommandResult
								} else {
									await this.say("completion_result", result, undefined, false)
									await this.saveCheckpoint(true)
									await addNewChangesFlagToLastCompletionResultMessage()
									telemetryService.captureTaskCompleted(this.taskId)
								}

								// we already sent completion_result says, an empty string asks relinquishes control over button and field
								const { response, text, images } = await this.ask("completion_result", "", false)
								if (response === "yesButtonClicked") {
									pushToolResult("") // signals to recursive loop to stop (for now this never happens since yesButtonClicked will trigger a new task)
									break
								}
								await this.say("user_feedback", text ?? "", images)

								const toolResults: (Anthropic.TextBlockParam | Anthropic.ImageBlockParam)[] = []
								if (commandResult) {
									if (typeof commandResult === "string") {
										toolResults.push({
											type: "text",
											text: commandResult,
										})
									} else if (Array.isArray(commandResult)) {
										toolResults.push(...commandResult)
									}
								}
								toolResults.push({
									type: "text",
									text: `The user has provided feedback on the results. Consider their input to continue the task, and then attempt completion again.\n<feedback>\n${text}\n</feedback>`,
								})
								toolResults.push(...formatResponse.imageBlocks(images))
								this.userMessageContent.push({
									type: "text",
									text: `${toolDescription()} Result:`,
								})
								this.userMessageContent.push(...toolResults)

								//
								break
							}
						} catch (error) {
							await handleError("attempting completion", error)

							break
						}
					}
				}
				break
		}

		/*
		Seeing out of bounds is fine, it means that the next too call is being built up and ready to add to assistantMessageContent to present. 
		When you see the UI inactive during this, it means that a tool is breaking without presenting any UI. For example the write_to_file tool was breaking when relpath was undefined, and for invalid relpath it never presented UI.
		*/
		this.presentAssistantMessageLocked = false // this needs to be placed here, if not then calling this.presentAssistantMessage below would fail (sometimes) since it's locked
		// NOTE: when tool is rejected, iterator stream is interrupted and it waits for userMessageContentReady to be true. Future calls to present will skip execution since didRejectTool and iterate until contentIndex is set to message length and it sets userMessageContentReady to true itself (instead of preemptively doing it in iterator)
		if (!block.partial || this.didRejectTool || this.didAlreadyUseTool) {
			// block is finished streaming and executing
			if (this.currentStreamingContentIndex === this.assistantMessageContent.length - 1) {
				// its okay that we increment if !didCompleteReadingStream, it'll just return bc out of bounds and as streaming continues it will call presentAssistantMessage if a new block is ready. if streaming is finished then we set userMessageContentReady to true when out of bounds. This gracefully allows the stream to continue on and all potential content blocks be presented.
				// last block is complete and it is finished executing
				this.userMessageContentReady = true // will allow pwaitfor to continue
			}

			// call next block if it exists (if not then read stream will call it when its ready)
			this.currentStreamingContentIndex++ // need to increment regardless, so when read stream calls this function again it will be streaming the next block

			if (this.currentStreamingContentIndex < this.assistantMessageContent.length) {
				// there are already more content blocks to stream, so we'll call this function ourselves
				// await this.presentAssistantContent()

				this.presentAssistantMessage()
				return
			}
		}
		// block is partial, but the read stream may have finished
		if (this.presentAssistantMessageHasPendingUpdates) {
			this.presentAssistantMessage()
		}
	}

	async recursivelyMakeClineRequests(
		userContent: UserContent,
		includeFileDetails: boolean = false,
		isNewTask: boolean = false,
	): Promise<boolean> {
		if (this.abort) {
			throw new Error("Cline instance aborted")
		}

		if (this.consecutiveMistakeCount >= 3) {
			if (this.autoApprovalSettings.enabled && this.autoApprovalSettings.enableNotifications) {
				showSystemNotification({
					subtitle: "Error",
					message: "Cline is having trouble. Would you like to continue the task?",
				})
			}
			const { response, text, images } = await this.ask(
				"mistake_limit_reached",
				this.api.getModel().id.includes("claude")
					? `This may indicate a failure in his thought process or inability to use a tool properly, which can be mitigated with some user guidance (e.g. "Try breaking down the task into smaller steps").`
					: "Cline uses complex prompts and iterative task execution that may be challenging for less capable models. For best results, it's recommended to use Claude 3.7 Sonnet for its advanced agentic coding capabilities.",
			)
			if (response === "messageResponse") {
				userContent.push(
					...[
						{
							type: "text",
							text: formatResponse.tooManyMistakes(text),
						} as Anthropic.Messages.TextBlockParam,
						...formatResponse.imageBlocks(images),
					],
				)
			}
			this.consecutiveMistakeCount = 0
		}

		if (
			this.autoApprovalSettings.enabled &&
			this.consecutiveAutoApprovedRequestsCount >= this.autoApprovalSettings.maxRequests
		) {
			if (this.autoApprovalSettings.enableNotifications) {
				showSystemNotification({
					subtitle: "Max Requests Reached",
					message: `Cline has auto-approved ${this.autoApprovalSettings.maxRequests.toString()} API requests.`,
				})
			}
			await this.ask(
				"auto_approval_max_req_reached",
				`Cline has auto-approved ${this.autoApprovalSettings.maxRequests.toString()} API requests. Would you like to reset the count and proceed with the task?`,
			)
			// if we get past the promise it means the user approved and did not start a new task
			this.consecutiveAutoApprovedRequestsCount = 0
		}

		// get previous api req's index to check token usage and determine if we need to truncate conversation history
		const previousApiReqIndex = findLastIndex(this.clineMessages, (m) => m.say === "api_req_started")

		// Save checkpoint if this is the first API request
		const isFirstRequest = this.clineMessages.filter((m) => m.say === "api_req_started").length === 0
		if (isFirstRequest) {
			await this.say("checkpoint_created") // no hash since we need to wait for CheckpointTracker to be initialized
		}

		// getting verbose details is an expensive operation, it uses globby to top-down build file structure of project which for large projects can take a few seconds
		// for the best UX we show a placeholder api_req_started message with a loading spinner as this happens
		await this.say(
			"api_req_started",
			JSON.stringify({
				request: userContent.map((block) => formatContentBlockToMarkdown(block)).join("\n\n") + "\n\nLoading...",
			}),
		)

		// use this opportunity to initialize the checkpoint tracker (can be expensive to initialize in the constructor)
		// FIXME: right now we're letting users init checkpoints for old tasks, but this could be a problem if opening a task in the wrong workspace
		// isNewTask &&
		if (!this.checkpointTracker && !this.checkpointTrackerErrorMessage) {
			try {
				this.checkpointTracker = await pTimeout(
					CheckpointTracker.create(this.taskId, this.providerRef.deref()?.context.globalStorageUri.fsPath),
					{
						milliseconds: 15_000,
						message:
							"Checkpoints taking too long to initialize. Consider re-opening Cline in a project that uses git, or disabling checkpoints.",
					},
				)
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : "Unknown error"
				console.error("Failed to initialize checkpoint tracker:", errorMessage)
				this.checkpointTrackerErrorMessage = errorMessage // will be displayed right away since we saveClineMessages next which posts state to webview
			}
		}

		// Now that checkpoint tracker is initialized, update the dummy checkpoint_created message with the commit hash. (This is necessary since we use the API request loading as an opportunity to initialize the checkpoint tracker, which can take some time)
		if (isFirstRequest) {
			const commitHash = await this.checkpointTracker?.commit()
			const lastCheckpointMessage = findLast(this.clineMessages, (m) => m.say === "checkpoint_created")
			if (lastCheckpointMessage) {
				lastCheckpointMessage.lastCheckpointHash = commitHash
				await this.saveClineMessages()
			}
		}

		const [parsedUserContent, environmentDetails] = await this.loadContext(userContent, includeFileDetails)
		userContent = parsedUserContent
		// add environment details as its own text block, separate from tool results
		userContent.push({ type: "text", text: environmentDetails })

		await this.addToApiConversationHistory({
			role: "user",
			content: userContent,
		})

		telemetryService.captureConversationTurnEvent(this.taskId, this.apiProvider, this.api.getModel().id, "user")

		// since we sent off a placeholder api_req_started message to update the webview while waiting to actually start the API request (to load potential details for example), we need to update the text of that message
		const lastApiReqIndex = findLastIndex(this.clineMessages, (m) => m.say === "api_req_started")
		this.clineMessages[lastApiReqIndex].text = JSON.stringify({
			request: userContent.map((block) => formatContentBlockToMarkdown(block)).join("\n\n"),
		} satisfies ClineApiReqInfo)
		await this.saveClineMessages()
		await this.providerRef.deref()?.postStateToWebview()

		try {
			let cacheWriteTokens = 0
			let cacheReadTokens = 0
			let inputTokens = 0
			let outputTokens = 0
			let totalCost: number | undefined

			// update api_req_started. we can't use api_req_finished anymore since it's a unique case where it could come after a streaming message (ie in the middle of being updated or executed)
			// fortunately api_req_finished was always parsed out for the gui anyways, so it remains solely for legacy purposes to keep track of prices in tasks from history
			// (it's worth removing a few months from now)
			const updateApiReqMsg = (cancelReason?: ClineApiReqCancelReason, streamingFailedMessage?: string) => {
				this.clineMessages[lastApiReqIndex].text = JSON.stringify({
					...JSON.parse(this.clineMessages[lastApiReqIndex].text || "{}"),
					tokensIn: inputTokens,
					tokensOut: outputTokens,
					cacheWrites: cacheWriteTokens,
					cacheReads: cacheReadTokens,
					cost:
						totalCost ??
						calculateApiCostAnthropic(
							this.api.getModel().info,
							inputTokens,
							outputTokens,
							cacheWriteTokens,
							cacheReadTokens,
						),
					cancelReason,
					streamingFailedMessage,
				} satisfies ClineApiReqInfo)
			}

			const abortStream = async (cancelReason: ClineApiReqCancelReason, streamingFailedMessage?: string) => {
				if (this.diffViewProvider.isEditing) {
					await this.diffViewProvider.revertChanges() // closes diff view
				}

				// if last message is a partial we need to update and save it
				const lastMessage = this.clineMessages.at(-1)
				if (lastMessage && lastMessage.partial) {
					// lastMessage.ts = Date.now() DO NOT update ts since it is used as a key for virtuoso list
					lastMessage.partial = false
					// instead of streaming partialMessage events, we do a save and post like normal to persist to disk
					console.log("updating partial message", lastMessage)
					// await this.saveClineMessages()
				}

				// Let assistant know their response was interrupted for when task is resumed
				await this.addToApiConversationHistory({
					role: "assistant",
					content: [
						{
							type: "text",
							text:
								assistantMessage +
								`\n\n[${
									cancelReason === "streaming_failed"
										? "Response interrupted by API Error"
										: "Response interrupted by user"
								}]`,
						},
					],
				})

				// update api_req_started to have cancelled and cost, so that we can display the cost of the partial stream
				updateApiReqMsg(cancelReason, streamingFailedMessage)
				await this.saveClineMessages()

				telemetryService.captureConversationTurnEvent(this.taskId, this.apiProvider, this.api.getModel().id, "assistant")

				// signals to provider that it can retrieve the saved messages from disk, as abortTask can not be awaited on in nature
				this.didFinishAbortingStream = true
			}

			// reset streaming state
			this.currentStreamingContentIndex = 0
			this.assistantMessageContent = []
			this.didCompleteReadingStream = false
			this.userMessageContent = []
			this.userMessageContentReady = false
			this.didRejectTool = false
			this.didAlreadyUseTool = false
			this.presentAssistantMessageLocked = false
			this.presentAssistantMessageHasPendingUpdates = false
			this.didAutomaticallyRetryFailedApiRequest = false
			await this.diffViewProvider.reset()

			const stream = this.attemptApiRequest(previousApiReqIndex) // yields only if the first chunk is successful, otherwise will allow the user to retry the request (most likely due to rate limit error, which gets thrown on the first chunk)
			let assistantMessage = ""
			let reasoningMessage = ""
			this.isStreaming = true
			let didReceiveUsageChunk = false
			try {
				for await (const chunk of stream) {
					if (!chunk) {
						continue
					}
					switch (chunk.type) {
						case "usage":
							didReceiveUsageChunk = true
							inputTokens += chunk.inputTokens
							outputTokens += chunk.outputTokens
							cacheWriteTokens += chunk.cacheWriteTokens ?? 0
							cacheReadTokens += chunk.cacheReadTokens ?? 0
							totalCost = chunk.totalCost
							break
						case "reasoning":
							// reasoning will always come before assistant message
							reasoningMessage += chunk.reasoning
							await this.say("reasoning", reasoningMessage, undefined, true)
							break
						case "text":
							if (reasoningMessage && assistantMessage.length === 0) {
								// complete reasoning message
								await this.say("reasoning", reasoningMessage, undefined, false)
							}
							assistantMessage += chunk.text
							// parse raw assistant message into content blocks
							const prevLength = this.assistantMessageContent.length
							this.assistantMessageContent = parseAssistantMessage(assistantMessage)
							if (this.assistantMessageContent.length > prevLength) {
								this.userMessageContentReady = false // new content we need to present, reset to false in case previous content set this to true
							}
							// present content to user
							this.presentAssistantMessage()
							break
					}

					if (this.abort) {
						console.log("aborting stream...")
						if (!this.abandoned) {
							// only need to gracefully abort if this instance isn't abandoned (sometimes openrouter stream hangs, in which case this would affect future instances of cline)
							await abortStream("user_cancelled")
						}
						break // aborts the stream
					}

					if (this.didRejectTool) {
						// userContent has a tool rejection, so interrupt the assistant's response to present the user's feedback
						assistantMessage += "\n\n[Response interrupted by user feedback]"
						// this.userMessageContentReady = true // instead of setting this premptively, we allow the present iterator to finish and set userMessageContentReady when its ready
						break
					}

					// PREV: we need to let the request finish for openrouter to get generation details
					// UPDATE: it's better UX to interrupt the request at the cost of the api cost not being retrieved
					if (this.didAlreadyUseTool) {
						assistantMessage +=
							"\n\n[Response interrupted by a tool use result. Only one tool may be used at a time and should be placed at the end of the message.]"
						break
					}
				}
			} catch (error) {
				// abandoned happens when extension is no longer waiting for the cline instance to finish aborting (error is thrown here when any function in the for loop throws due to this.abort)
				if (!this.abandoned) {
					this.abortTask() // if the stream failed, there's various states the task could be in (i.e. could have streamed some tools the user may have executed), so we just resort to replicating a cancel task
					const errorMessage = this.formatErrorWithStatusCode(error)

					await abortStream("streaming_failed", errorMessage)
					const history = await this.providerRef.deref()?.getTaskWithId(this.taskId)
					if (history) {
						await this.providerRef.deref()?.initClineWithHistoryItem(history.historyItem)
						// await this.providerRef.deref()?.postStateToWebview()
					}
				}
			} finally {
				this.isStreaming = false
			}

			// OpenRouter/Cline may not return token usage as part of the stream (since it may abort early), so we fetch after the stream is finished
			// (updateApiReq below will update the api_req_started message with the usage details. we do this async so it updates the api_req_started message in the background)
			if (!didReceiveUsageChunk) {
				this.api.getApiStreamUsage?.().then(async (apiStreamUsage) => {
					if (apiStreamUsage) {
						inputTokens += apiStreamUsage.inputTokens
						outputTokens += apiStreamUsage.outputTokens
						cacheWriteTokens += apiStreamUsage.cacheWriteTokens ?? 0
						cacheReadTokens += apiStreamUsage.cacheReadTokens ?? 0
						totalCost = apiStreamUsage.totalCost
					}
					updateApiReqMsg()
					await this.saveClineMessages()
					await this.providerRef.deref()?.postStateToWebview()
				})
			}

			// need to call here in case the stream was aborted
			if (this.abort) {
				throw new Error("Cline instance aborted")
			}

			this.didCompleteReadingStream = true

			// set any blocks to be complete to allow presentAssistantMessage to finish and set userMessageContentReady to true
			// (could be a text block that had no subsequent tool uses, or a text block at the very end, or an invalid tool use, etc. whatever the case, presentAssistantMessage relies on these blocks either to be completed or the user to reject a block in order to proceed and eventually set userMessageContentReady to true)
			const partialBlocks = this.assistantMessageContent.filter((block) => block.partial)
			partialBlocks.forEach((block) => {
				block.partial = false
			})
			// this.assistantMessageContent.forEach((e) => (e.partial = false)) // cant just do this bc a tool could be in the middle of executing ()
			if (partialBlocks.length > 0) {
				this.presentAssistantMessage() // if there is content to update then it will complete and update this.userMessageContentReady to true, which we pwaitfor before making the next request. all this is really doing is presenting the last partial message that we just set to complete
			}

			updateApiReqMsg()
			await this.saveClineMessages()
			await this.providerRef.deref()?.postStateToWebview()

			// now add to apiconversationhistory
			// need to save assistant responses to file before proceeding to tool use since user can exit at any moment and we wouldn't be able to save the assistant's response
			let didEndLoop = false
			if (assistantMessage.length > 0) {
				telemetryService.captureConversationTurnEvent(this.taskId, this.apiProvider, this.api.getModel().id, "assistant")

				await this.addToApiConversationHistory({
					role: "assistant",
					content: [{ type: "text", text: assistantMessage }],
				})

				// NOTE: this comment is here for future reference - this was a workaround for userMessageContent not getting set to true. It was due to it not recursively calling for partial blocks when didRejectTool, so it would get stuck waiting for a partial block to complete before it could continue.
				// in case the content blocks finished
				// it may be the api stream finished after the last parsed content block was executed, so  we are able to detect out of bounds and set userMessageContentReady to true (note you should not call presentAssistantMessage since if the last block is completed it will be presented again)
				// const completeBlocks = this.assistantMessageContent.filter((block) => !block.partial) // if there are any partial blocks after the stream ended we can consider them invalid
				// if (this.currentStreamingContentIndex >= completeBlocks.length) {
				// 	this.userMessageContentReady = true
				// }

				await pWaitFor(() => this.userMessageContentReady)

				// if the model did not tool use, then we need to tell it to either use a tool or attempt_completion
				const didToolUse = this.assistantMessageContent.some((block) => block.type === "tool_use")

				if (!didToolUse) {
					// normal request where tool use is required
					this.userMessageContent.push({
						type: "text",
						text: formatResponse.noToolsUsed(),
					})
					this.consecutiveMistakeCount++
				}

				const recDidEndLoop = await this.recursivelyMakeClineRequests(this.userMessageContent)
				didEndLoop = recDidEndLoop
			} else {
				// if there's no assistant_responses, that means we got no text or tool_use content blocks from API which we should assume is an error
				await this.say(
					"error",
					"Unexpected API Response: The language model did not provide any assistant messages. This may indicate an issue with the API or the model's output.",
				)
				await this.addToApiConversationHistory({
					role: "assistant",
					content: [
						{
							type: "text",
							text: "Failure: I did not provide a response.",
						},
					],
				})
			}

			return didEndLoop // will always be false for now
		} catch (error) {
			// this should never happen since the only thing that can throw an error is the attemptApiRequest, which is wrapped in a try catch that sends an ask where if noButtonClicked, will clear current task and destroy this instance. However to avoid unhandled promise rejection, we will end this loop which will end execution of this instance (see startTask)
			return true // needs to be true so parent loop knows to end task
		}
	}
