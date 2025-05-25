# Mutations for src/core/task/Task.ts

## Caveats from Safe Mutation Analysis

- **Classification**: VOLATILE (Cyclic)
- **Risk Assessment**: High risk to modify due to its involvement in dependency cycles, high fan-out, and significant dependency depth. Changes can have wide, unpredictable impacts.
- **Directive**: Proceed with extreme caution. Thorough and comprehensive testing of all task lifecycle scenarios and interactions is mandatory after applying these mutations.
- **Note**: The proposed changes add an optional property to `TaskOptions` and the `Task` class. These are additive. The primary logic for pausing (methods `say`, `ask`, `handleWebviewAskResponse`, flags `isPaused`, `userMessageContentReady`, and the `pWaitFor` pattern) already exists and will be leveraged by tool handlers.

## Mutation 1: Add `pauseAfterProductiveOperation` to `TaskOptions` type

**File**: `src/core/task/Task.ts`
**Lines**: (Locate the `TaskOptions` type definition, typically around line 96)

```diff
<<<<<<< SEARCH
	enableCheckpoints?: boolean
	fuzzyMatchThreshold?: number
	consecutiveMistakeLimit?: number
=======
	enableCheckpoints?: boolean
	pauseAfterProductiveOperation?: boolean; // Added for Pause After State Change
	fuzzyMatchThreshold?: number
	consecutiveMistakeLimit?: number
>>>>>>> REPLACE
```

## Mutation 2: Add `pauseAfterProductiveOperation` property to `Task` class

**File**: `src/core/task/Task.ts`
**Lines**: (Locate class properties, typically around line 114, near other boolean options like `enableCheckpoints`)

```diff
<<<<<<< SEARCH
	// Checkpoints
	enableCheckpoints: boolean
	checkpointService?: RepoPerTaskCheckpointService
=======
	// Checkpoints
	enableCheckpoints: boolean
	readonly pauseAfterProductiveOperation: boolean; // Added for Pause After State Change
	checkpointService?: RepoPerTaskCheckpointService
>>>>>>> REPLACE
```

## Mutation 3: Initialize `pauseAfterProductiveOperation` in `Task` constructor

**File**: `src/core/task/Task.ts`
**Lines**: (Locate the constructor, typically around line 189, and the destructuring of `TaskOptions`)

```diff
<<<<<<< SEARCH
		enableCheckpoints = true,
		fuzzyMatchThreshold = 1.0,
		consecutiveMistakeLimit = 3,
=======
		enableCheckpoints = true,
		pauseAfterProductiveOperation = false, // Default to false if not provided
		fuzzyMatchThreshold = 1.0,
		consecutiveMistakeLimit = 3,
>>>>>>> REPLACE
```

And further down in the constructor, assign it:

```diff
<<<<<<< SEARCH
		this.diffViewProvider = new DiffViewProvider(this.cwd)
		this.enableCheckpoints = enableCheckpoints
=======
		this.diffViewProvider = new DiffViewProvider(this.cwd)
		this.enableCheckpoints = enableCheckpoints
		this.pauseAfterProductiveOperation = pauseAfterProductiveOperation; // Added for Pause After State Change
>>>>>>> REPLACE
```
