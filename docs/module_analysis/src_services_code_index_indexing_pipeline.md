# Code Indexing Pipeline in `src/services/code-index`

The code indexing pipeline is a multi-stage process orchestrated by `CodeIndexManager` and primarily executed by `CodeIndexOrchestrator` and `DirectoryScanner`. Its goal is to parse source code files, convert them into semantic vector embeddings, and store these embeddings along with relevant metadata in a Qdrant vector database for efficient similarity search.

## 1. Initialization and Configuration

- **Trigger**: The indexing process typically starts when the extension activates or when relevant configuration changes occur.
- **`CodeIndexManager.initialize()`**:
    - Loads configuration via `CodeIndexConfigManager` (checks if the feature is enabled, gets embedder settings, Qdrant URL, API keys, etc.).
    - If the feature is enabled and configured, it proceeds to initialize core services.
    - Initializes `CacheManager` to track file hashes and avoid re-processing unchanged files.
    - Creates service instances (embedder, vector store, scanner, file watcher) via `CodeIndexServiceFactory`.
    - Initializes `CodeIndexOrchestrator` and `CodeIndexSearchService`.
    - If necessary (e.g., first run, config change requiring restart), it triggers `CodeIndexOrchestrator.startIndexing()`.

## 2. Initial Workspace Scan (Orchestrated by `CodeIndexOrchestrator.startIndexing()`)

- **Vector Store Initialization**:
    - The `QdrantVectorStore.initialize()` method is called.
    - It checks if the target Qdrant collection (name derived from workspace path hash) exists.
    - If not, it creates the collection with the configured vector size and distance metric (Cosine).
    - If it exists but has an incompatible vector size (e.g., due to a model change), the old collection is deleted and a new one is created.
    - Crucially, it creates payload indexes in Qdrant for `pathSegments.0` through `pathSegments.4`. These are used for efficient directory-based filtering during search.
    - If a new collection was created, the local file hash cache (`CacheManager`) is cleared to ensure all files are re-processed.
- **File Discovery and Filtering (`DirectoryScanner.scanDirectory()`):**
    - Uses `listFiles` utility to get a recursive list of all files in the workspace, respecting `.gitignore`.
    - Applies `.rooignore` rules via `RooIgnoreController` for further filtering.
    - Filters the list to include only files with supported extensions (defined in `scannerExtensions`) and not explicitly ignored by the `ignoreInstance` (which also considers `.gitignore`).
- **Parallel File Processing:**
    - Supported files are processed in parallel, with concurrency limits (`PARSING_CONCURRENCY`).
    - For each file:
        - **Size Check**: Files exceeding `MAX_FILE_SIZE_BYTES` are skipped.
        - **Cache Check**: The file's content is read, and its SHA256 hash is calculated. This `currentFileHash` is compared against the hash stored by `CacheManager`. If they match, the file is unchanged and skipped.
        - **Parsing (`CodeParser.parseFile()`):**
            - If the file is new or changed, it's parsed.
            - `tree-sitter` is used to generate an AST.
            - The code is chunked into `CodeBlock` objects based on semantic structures and size heuristics (see `src_services_code_index_chunking_heuristic.md` for details). Each `CodeBlock` contains content, file path, start/end lines, type, identifier, and hashes.
        - The `onFileParsed` callback is invoked with the number of blocks found in the file.

## 3. Batch Processing of Code Blocks (`DirectoryScanner.scanDirectory()` and `processBatch()`)

- **Accumulation**: Parsed `CodeBlock` objects from multiple files are accumulated into batches.
    - A `currentBatchBlocks` array stores the `CodeBlock` objects.
    - A `currentBatchTexts` array stores the trimmed content of these blocks (this is what gets embedded).
    - `currentBatchFileInfos` stores file path, hash, and a flag indicating if the file is new (for cache update and deletion logic).
- **Batch Trigger**: When `currentBatchBlocks.length` reaches `BATCH_SEGMENT_THRESHOLD` (and the embedder is not Ollama, which might have different batching needs), or when all files have been parsed, the accumulated batch is processed.
- **`DirectoryScanner.processBatch()` (Parallel with `BATCH_PROCESSING_CONCURRENCY`):**
    - **Deletion of Stale Data (for modified files)**:
        - For files in the batch that are _modified_ (not new), their existing points are deleted from Qdrant using `qdrantClient.deletePointsByMultipleFilePaths()`. This ensures old versions of chunks are removed before new ones are added.
    - **Embedding Generation**:
        - The `embedder.createEmbeddings()` method is called with `currentBatchTexts` to get an array of vector embeddings.
    - **Point Preparation for Qdrant**:
        - Each `CodeBlock` in the batch, along with its corresponding embedding, is transformed into a Qdrant `PointStruct`.
        - The `id` for each point is a stable UUIDv5 generated from the normalized absolute file path and the block's start line.
        - The `payload` includes:
            - `filePath`: Relative path of the file.
            - `codeChunk`: The actual content of the block.
            - `startLine`, `endLine`: Line numbers.
            - `pathSegments`: An object mapping segment index to path component (e.g., `{ "0": "src", "1": "utils" }`) for directory filtering.
    - **Upsert to Qdrant**:
        - `qdrantClient.upsertPoints()` is called to add/update the batch of points in the Qdrant collection.
    - **Cache Update**: For all files successfully processed in the batch, `CacheManager.updateHash()` is called with the `currentFileHash`.
    - **Progress Reporting**: The `onBlocksIndexed` callback is invoked with the number of blocks successfully indexed in this batch.
    - **Retry Logic**: If batch processing fails (e.g., network error to Qdrant or embedder), it's retried up to `MAX_BATCH_RETRIES` times with exponential backoff.

## 4. Handling Deleted Files (`DirectoryScanner.scanDirectory()`)

- After all supported files have been processed (parsed or skipped due to cache), the `DirectoryScanner` compares the set of `processedFiles` against the files known to the `CacheManager`.
- If a file exists in the cache but was not in the `processedFiles` set (meaning it was deleted from the workspace or is no longer a supported/allowed file type), its corresponding points are deleted from Qdrant using `qdrantClient.deletePointsByFilePath()`, and its entry is removed from the `CacheManager`.

## 5. File Watching (Post-Initial Scan, managed by `CodeIndexOrchestrator` and `FileWatcher`)

- Once the initial scan is complete, `CodeIndexOrchestrator._startWatcher()` initializes and starts the `FileWatcher` service.
- The `FileWatcher` monitors the workspace for:
    - File creations
    - File changes
    - File deletions
- When changes are detected, the `FileWatcher` (implementation likely in `processors/file-watcher.ts`) batches these changes and processes them, typically by:
    - **Creation/Change**: Re-parsing the affected file, generating embeddings for its new/modified blocks, and upserting them to Qdrant (similar to the batch processing in the initial scan, including deleting old points for modified files).
    - **Deletion**: Removing the corresponding points from Qdrant.
- Progress and state updates during file watching are reported via `CodeIndexStateManager`.

This comprehensive pipeline ensures that the code index is built efficiently during the initial setup and kept synchronized with changes in the workspace thereafter.
