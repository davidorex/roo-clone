# Settings Framework

This document provides a detailed explanation of the settings system in the Roo codebase and how to create new settings.

## Overview

The settings framework in Roo is designed to manage user preferences and configuration options across the application. It provides a type-safe, schema-validated approach to storing, retrieving, and updating settings. The framework handles both global settings (application-wide) and provider-specific settings (related to AI providers like OpenAI, Anthropic, etc.).

## Key Components

The settings system consists of several key components:

1. **Schema Definitions** (`src/schemas/index.ts`)
2. **Settings Management** (`src/core/config/ProviderSettingsManager.ts`)
3. **Context Proxy** (`src/core/config/ContextProxy.ts`)
4. **Provider Interface** (`src/core/webview/ClineProvider.ts`)
5. **UI Components** (`webview-ui/src/components/settings/`)

## Schema Definitions

All settings are defined using [Zod](https://github.com/colinhacks/zod), a TypeScript-first schema validation library. This ensures type safety and runtime validation of settings values.

The main schema definitions are in `src/schemas/index.ts`:

```typescript
// Global settings that apply to the entire application
export const globalSettingsSchema = z.object({
	// Various settings with their types and validation rules
	customInstructions: z.string().optional(),
	diffEnabled: z.boolean().optional(),
	// ... many more settings
})

// Provider-specific settings
export const providerSettingsSchema = z.object({
	apiProvider: providerNamesSchema.optional(),
	// Provider-specific settings
	// ... many provider-specific settings
})

// Combined settings type
export type RooCodeSettings = GlobalSettings & ProviderSettings
```

## Storage Mechanisms

Settings are stored in two main locations:

1. **VSCode Global State**: For non-sensitive settings
2. **VSCode Secrets Storage**: For sensitive settings like API keys

The `ContextProxy` class manages the interaction with these storage mechanisms:

```typescript
// Simplified example
class ContextProxy {
	constructor(private context: vscode.ExtensionContext) {}

	async setValue<K extends keyof GlobalState>(key: K, value: GlobalState[K]) {
		await this.context.globalState.update(key, value)
	}

	getValue<K extends keyof GlobalState>(key: K): GlobalState[K] {
		return this.context.globalState.get(key)
	}

	// Methods for secrets storage
	async setSecret(key: string, value: string) {
		await this.context.secrets.store(key, value)
	}
}
```

## Provider Settings Management

The `ProviderSettingsManager` class handles provider-specific settings, including:

- Saving and loading provider profiles
- Managing migrations between setting versions
- Activating different provider profiles

```typescript
export class ProviderSettingsManager {
	// Methods for managing provider settings
	async saveConfig(name: string, config: ProviderSettingsWithId): Promise<string> {
		// Save a provider configuration
	}

	async getProfile(params: { name: string } | { id: string }): Promise<ProviderSettingsWithId & { name: string }> {
		// Get a provider profile
	}

	async activateProfile(
		params: { name: string } | { id: string },
	): Promise<ProviderSettingsWithId & { name: string }> {
		// Activate a provider profile
	}
}
```

## ClineProvider Interface

The `ClineProvider` class serves as the main interface for accessing and updating settings. It provides methods like:

- `getState()`: Get the current state of all settings
- `updateGlobalState()`: Update a global setting
- `postStateToWebview()`: Send the current state to the webview UI

```typescript
export class ClineProvider {
	// Methods for accessing and updating settings
	async getState() {
		// Return the current state of all settings
	}

	private async updateGlobalState<K extends keyof GlobalState>(key: K, value: GlobalState[K]) {
		// Update a global setting
	}

	async postStateToWebview() {
		// Send the current state to the webview UI
	}
}
```

## UI Components

The settings UI is implemented in React components in the `webview-ui/src/components/settings/` directory. These components provide user interfaces for viewing and editing settings.

## How to Create a New Setting

To add a new setting to the application, follow these steps:

### 1. Add the Setting to the Schema

First, add the new setting to the appropriate schema in `src/schemas/index.ts`:

```typescript
// For a global setting
export const globalSettingsSchema = z.object({
	// Existing settings...
	myNewSetting: z.boolean().optional(), // Add your new setting here
	// More settings...
})

// Also add it to the record for type safety
const globalSettingsRecord: GlobalSettingsRecord = {
	// Existing settings...
	myNewSetting: undefined, // Add your new setting here
	// More settings...
}
```

### 2. Update TypeScript Types

The types are automatically generated from the schemas, so you don't need to manually update them. However, you should run the type generation script to ensure the types are up to date:

```bash
pnpm generate-types
```

### 3. Add UI Controls

Add UI controls for the new setting in the appropriate settings component:

```tsx
// In the appropriate settings component
import { Switch } from "../ui/switch"

function MySettingControl() {
	const { state, updateState } = useExtensionState()

	return (
		<div className="flex items-center justify-between">
			<div>
				<h3 className="text-sm font-medium">My New Setting</h3>
				<p className="text-sm text-vscode-descriptionForeground">Description of what this setting does</p>
			</div>
			<Switch
				checked={state.myNewSetting ?? false}
				onCheckedChange={(checked) => updateState("myNewSetting", checked)}
			/>
		</div>
	)
}
```

### 4. Use the Setting in Your Code

Now you can use the setting in your code:

```typescript
// In a component or service
const { myNewSetting } = await clineProvider.getState()

if (myNewSetting) {
	// Do something when the setting is enabled
} else {
	// Do something when the setting is disabled
}
```

### 5. Add Migration Logic (If Needed)

If your setting needs to be migrated from an older version, add migration logic in the appropriate manager class:

```typescript
// In ProviderSettingsManager or another appropriate class
private async migrateMyNewSetting(settings: SomeSettingsType) {
  // Migration logic here
}
```

## Best Practices

1. **Always provide defaults**: When accessing a setting, always provide a default value in case the setting is not defined:

    ```typescript
    const myNewSetting = state.myNewSetting ?? false
    ```

2. **Use optional settings**: Make settings optional in the schema to allow for partial updates:

    ```typescript
    myNewSetting: z.boolean().optional(),
    ```

3. **Group related settings**: Keep related settings together in the UI and in the code.

4. **Document settings**: Add clear descriptions to settings in the UI to help users understand their purpose.

5. **Consider performance**: Settings are accessed frequently, so avoid expensive operations when getting or setting values.

## Example: Adding a Git Repository Information Setting

Let's walk through a concrete example of adding a setting to control whether Git repository information is shown in the environment details:

### 1. Add the Setting to the Schema

```typescript
// In src/schemas/index.ts
export const globalSettingsSchema = z.object({
	// Existing settings...
	showGitRepositoryInfo: z.boolean().optional(),
	// More settings...
})

const globalSettingsRecord: GlobalSettingsRecord = {
	// Existing settings...
	showGitRepositoryInfo: undefined,
	// More settings...
}
```

### 2. Add UI Controls

```tsx
// In webview-ui/src/components/settings/ContextManagementSettings.tsx
function GitRepositoryInfoSetting() {
	const { state, updateState } = useExtensionState()

	return (
		<div className="flex items-center justify-between">
			<div>
				<h3 className="text-sm font-medium">Show Git Repository Information</h3>
				<p className="text-sm text-vscode-descriptionForeground">
					Include Git repository information in the environment details
				</p>
			</div>
			<Switch
				checked={state.showGitRepositoryInfo ?? true}
				onCheckedChange={(checked) => updateState("showGitRepositoryInfo", checked)}
			/>
		</div>
	)
}
```

### 3. Use the Setting in the Environment Details

```typescript
// In src/core/environment/getEnvironmentDetails.ts
async function getEnvironmentDetails(cline: Task, includeFileDetails: boolean = false): Promise<string> {
	// Existing code...

	const { showGitRepositoryInfo = true } = (await cline.providerRef?.deref()?.getState()) || {}

	// Only include Git repository information if the setting is enabled
	if (showGitRepositoryInfo) {
		const repoName = await getRepositoryName(cline.cwd)
		const currentBranch = await getCurrentBranch(cline.cwd)
		const recentCommits = await getRecentCommits(cline.cwd, 10)

		if (repoName || currentBranch || recentCommits.length > 0) {
			details += "\n\n# Git Repository Information"

			if (repoName) {
				details += `\n## Repository: ${repoName}`
			}

			if (currentBranch) {
				details += `\n## Current Branch: ${currentBranch}`
			}

			if (recentCommits.length > 0) {
				details += "\n## Recent Commits"
				recentCommits.forEach((commit, index) => {
					details += `\n${index + 1}. ${commit.shortHash} - ${commit.subject} (${commit.author}, ${commit.date})`
				})
			}
		}
	}

	// More existing code...
}
```

## Conclusion

The settings framework in Roo provides a robust, type-safe way to manage user preferences and configuration options. By following the patterns established in the codebase, you can easily add new settings that integrate seamlessly with the existing system.
