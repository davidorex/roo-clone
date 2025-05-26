# Mutations for src/core/tools/writeToFileTool.ts

This file adds a call to `cline.checkForPauseAfterProductiveOperation` after a file is successfully written.

```diff
--- a/src/core/tools/writeToFileTool.ts
+++ b/src/core/tools/writeToFileTool.ts
@@ -217,6 +217,8 @@

 			cline.didEditFile = true // used to determine if we should wait for busy terminal to update before sending api request

+			await cline.checkForPauseAfterProductiveOperation("write_to_file");
+
 			if (userEdits) {
 				await cline.say(
 					"user_feedback_diff",
```
