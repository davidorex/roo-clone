# Mutations for webview-ui/src/components/chat/ChatRow.tsx

This file implements the UI for the `operation_acknowledgment` ask type.

```diff
--- a/webview-ui/src/components/chat/ChatRow.tsx
+++ b/webview-ui/src/components/chat/ChatRow.tsx
@@ -642,6 +642,28 @@
 				case "auto_approval_max_req_reached": {
 					return <AutoApprovedRequestLimitWarning message={message} />
 				}
+				case "operation_acknowledgment":
+					// The main prompt "Operation complete." is shown by a preceding "say" message.
+					// This UI provides the "Continue" button.
+					// Optional user feedback would be typed into the main chat input,
+					// and ChatView would need to handle sending that as a "messageResponse"
+					// when this "Continue" is clicked or when the main input is submitted
+					// while this acknowledgment is pending.
+					// For this ChatRow, we just provide the Continue button.
+					return (
+						<div className="mt-2 flex flex-col items-start">
+							{/* message.text from the ask can be displayed if it contains relevant info,
+							    but current plan is for it to be minimal/empty. */}
+							{message.text && message.text.trim().length > 0 && (
+								<p style={pStyle}>{message.text}</p>
+							)}
+							<VSCodeButton
+								onClick={() => {
+									vscode.postMessage({ type: "askResponse", askResponse: "yesButtonClicked", ts: message.ts });
+								}}
+								className="mt-2">
+								{t("common:buttons.continue", "Continue")}
+							</VSCodeButton>
+						</div>
+					);
 				default:
 					return null
 			}
```

**Note on `ChatRow.tsx` and user input:**
The above change adds a "Continue" button. For the user to type a message in the "normal message input field" and have _that specific "Continue" button_ send the typed message, `ChatView.tsx` (which typically owns the main input field and the list of `ChatRow`s) would need to:

1. Be aware that an `operation_acknowledgment` ask is active (e.g., via a prop or context).
2. When this specific "Continue" button in the `ChatRow` is clicked, `ChatView` would need to check the main input field.
3. If the main input field has text, `ChatView` would then trigger `vscode.postMessage({ type: "askResponse", askResponse: "messageResponse", text: mainInputValue, ts: message.ts })`.
4. If the main input field is empty, it would trigger `vscode.postMessage({ type: "askResponse", askResponse: "yesButtonClicked", ts: message.ts })`.

The `replace_in_file` diff above only implements the "Continue" button sending `yesButtonClicked`. A more complete solution for capturing text from the main input field would require changes in `ChatView.tsx` or a shared state/callback mechanism. The current `Task.ts` logic _can_ handle `messageResponse` if it's sent.
