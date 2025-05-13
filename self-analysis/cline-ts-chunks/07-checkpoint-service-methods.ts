// 07-checkpoint-service-methods: Additional checkpoint methods (CheckpointService)
// Extracted from Cline.ts for refactoring into CheckpointService

	// Checkpoints

	async saveCheckpoint(isAttemptCompletionMessage: boolean = false) {
		// Set isCheckpointCheckedOut to false for all checkpoint_created messages
		this.clineMessages.forEach((message) => {
			if (message.say === "checkpoint_created") {
				message.isCheckpointCheckedOut = false
			}
		})

		if (!isAttemptCompletionMessage) {
			// For non-attempt completion we just say checkpoints
			await this.say("checkpoint_created")
			this.checkpointTracker?.commit().then(async (commitHash) => {
				const lastCheckpointMessage = findLast(this.clineMessages, (m) => m.say === "checkpoint_created")
				if (lastCheckpointMessage) {
					lastCheckpointMessage.lastCheckpointHash = commitHash
					await this.saveClineMessages()
				}
			}) // silently fails for now

			//
		} else {
			// attempt completion requires checkpoint to be sync so that we can present button after attempt_completion
			const commitHash = await this.checkpointTracker?.commit()
			// For attempt_completion, find the last completion_result message and set its checkpoint hash. This will be used to present the 'see new changes' button
			const lastCompletionResultMessage = findLast(
				this.clineMessages,
				(m) => m.say === "completion_result" || m.ask === "completion_result",
			)
			if (lastCompletionResultMessage) {
				lastCompletionResultMessage.lastCheckpointHash = commitHash
				await this.saveClineMessages()
			}
		}

		// if (commitHash) {

		// Previously we checkpointed every message, but this is excessive and unnecessary.
		// // Start from the end and work backwards until we find a tool use or another message with a hash
		// for (let i = this.clineMessages.length - 1; i >= 0; i--) {
		// 	const message = this.clineMessages[i]
		// 	if (message.lastCheckpointHash) {
		// 		// Found a message with a hash, so we can stop
		// 		break
		// 	}
		// 	// Update this message with a hash
		// 	message.lastCheckpointHash = commitHash

		// 	// We only care about adding the hash to the last tool use (we don't want to add this hash to every prior message ie for tasks pre-checkpoint)
		// 	const isToolUse =
		// 		message.say === "tool" ||
		// 		message.ask === "tool" ||
		// 		message.say === "command" ||
		// 		message.ask === "command" ||
		// 		message.say === "completion_result" ||
		// 		message.ask === "completion_result" ||
		// 		message.ask === "followup" ||
		// 		message.say === "use_mcp_server" ||
		// 		message.ask === "use_mcp_server" ||
		// 		message.say === "browser_action" ||
		// 		message.say === "browser_action_launch" ||
		// 		message.ask === "browser_action_launch"

		// 	if (isToolUse) {
		// 		break
		// 	}
		// }
		// // Save the updated messages
		// await this.saveClineMessages()
		// }
	}
