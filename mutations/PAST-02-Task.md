# Mutations for src/core/task/Task.ts

This file adds the `checkForPauseAfterProductiveOperation` method to the `Task` class.

```diff
--- a/src/core/task/Task.ts
+++ b/src/core/task/Task.ts
@@ -702,6 +702,35 @@
 		}
 	}

+	public async checkForPauseAfterProductiveOperation(toolName: ToolName): Promise<void> {
+		if (this.pauseAfterProductiveOperation) {
+			// Finalize any previous partial message to ensure clean UI state before pausing.
+			const lastMessage = this.clineMessages.at(-1);
+			if (lastMessage?.partial) {
+				lastMessage.partial = false;
+				// Assuming subsequent .say or .ask will trigger necessary saves/updates
+				// or that their internal logic handles finalizing previous partials if necessary.
+			}
+
+			await this.say("operation_completed", "Operation complete.");
+			// Pass an empty string for the ask prompt text, as the UI for "operation_acknowledgment"
+			// should provide the standard input field and "Continue" bar.
+			// The preceding "say" message gives the main context.
+			const { response, text } = await this.ask("operation_acknowledgment", "");
+
+			if (response === "messageResponse" && text && text.trim().length > 0) {
+				// Display feedback in UI
+				await this.say("user_feedback", text);
+
+				// Add feedback to API conversation history for the LLM
+				await this.addToApiConversationHistory({
+					role: "user",
+					content: [{ type: "text", text }],
+				});
+				telemetryService.captureConversationMessage(this.taskId, "user");
+			}
+			// If response is 'yesButtonClicked' (Continue with no text), no new message is added to apiConversationHistory.
+			// The task loop will then proceed, and the result of the 'toolName' operation will form part of the next user message to the LLM.
+		}
+	}
+
 	// Checkpoints

 	public async checkpointSave() {
```
