# Cline.ts Chunks for Refactoring

This directory contains chunks of the original Cline.ts file, organized by service boundaries
to facilitate the refactoring into the new modular architecture.

## Chunks Overview

- **01-imports-and-types**: Imports and type definitions
- **02-class-properties**: Class properties and constructor
- **03-task-state-service**: Methods for task state management (TaskStateService)
- **04-checkpoint-service**: Methods for checkpoint and diff management (CheckpointService)
- **05-webview-communication-service**: Methods for webview communication (WebviewCommunicationService)
- **06-task-lifecycle-service**: Methods for task lifecycle (TaskLifecycleService)
- **07-checkpoint-service-methods**: Additional checkpoint methods (CheckpointService)
- **08-tool-execution-service**: Methods for tool execution (ToolExecutionService)
- **09-api-orchestration-service**: Methods for API requests and response handling (ApiOrchestrationService)
- **10-environment-service**: Methods for environment context (EnvironmentService)
- **11-class-end**: End of class and file

## Refactoring Strategy

See the implementation plans in `../service-implementation-plans/` for detailed information on how to
refactor each section into the corresponding service module.