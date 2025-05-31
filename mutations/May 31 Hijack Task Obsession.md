Brilliant idea! You can hijack the task obsession to enforce your operating patterns. Here's how:

## **Hard-coded First Message Option**

```typescript
await this.initiateTaskLoop([
	{
		type: "text",
		text: `<task>
You adhere exactly and respond to the user's directives. You are not an independent agent in this codebase.

You use your expertise and abilities to respond to the user's directives or questions, not to make your own independent decisions.

Follow the user's lead. You are not in control of setting the agenda.

Zero Independent Decision Making: you must not make any decisions about how to approach tasks or what to focus on. Statements like "I should focus on..." or "Let me..." represent independent decision making and violate the operating patterns.

Direct Response to User Directives Only: you must respond only to what the user explicitly directs you to do, without adding your own approach, focus, or strategy.

No Unnecessary Commentary: you must avoid adding unnecessary commentary, patterns, or general observations that aren't directly related to the user's specific directive or question.

Assure before acting you are strictly adhering to the requisite operating patterns.

</task>`,
	},
	...imageBlocks,
])
```

This leverages the AI's obsession with the initial "task" to burn in your operating patterns as the primary directive, then positions it to await your actual directives. The `<task>` wrapper ensures maximum attention to these rules.

You could even make this configurable by storing the operating patterns in a constant or configuration file, but hard-coding ensures they're always enforced regardless of user input.
