The `src/services/code-index` directory implements a feature for creating, maintaining, and searching a semantic index of the codebase within the current workspace.

Key components and their roles:

- **`CodeIndexManager`**: The central controller and public API for the feature. It initializes and coordinates other components.
- **`CodeIndexConfigManager`**: Manages configuration settings (embedding providers like OpenAI/Ollama, API keys, vector store details, search parameters) and determines if changes require a service restart.
- **`CodeIndexStateManager`**: Tracks and broadcasts the operational state (e.g., "Standby", "Indexing", "Error") and progress of the indexing process.
- **`CodeIndexOrchestrator`**: Manages the indexing lifecycle. It performs initial workspace scans, processes files into vector embeddings, stores them in a vector database (e.g., Qdrant), and uses a file watcher to keep the index up-to-date with changes.
- **`CodeIndexSearchService`**: Handles search requests by converting queries into embeddings and querying the vector store for semantically similar code.
- **`CacheManager`**: Manages a local cache to potentially speed up indexing operations.
- **`CodeIndexServiceFactory`**: Responsible for creating instances of various services like embedders and vector stores.

Subdirectories and their likely purpose:

- `__tests__/`: Unit/integration tests.
- `constants/`: Shared constant values.
- `embedders/`: Implementations for different embedding services (e.g., OpenAI, Ollama).
- `interfaces/`: TypeScript interfaces defining contracts for components (e.g., `IEmbedder`, `IVectorStore`).
- `processors/`: File and directory processing logic (e.g., `DirectoryScanner`, code chunking).
- `shared/`: Shared utilities and types.
- `vector-store/`: Implementations for interacting with vector databases (e.g., Qdrant client).

In essence, this system enables semantic understanding and search of code by converting code into numerical representations (embeddings) and storing them in a specialized database for efficient similarity searches.

**Embedding Metadata:**

When code chunks are embedded and stored in the Qdrant vector database, the following metadata (payload) is stored alongside each vector:

- **`filePath`**: The relative path to the source file from which the chunk was extracted.
- **`codeChunk`**: The actual text content of the code chunk itself.
- **`startLine`**: The starting line number of the chunk within its original file.
- **`endLine`**: The ending line number of the chunk within its original file.

This metadata is crucial for retrieving contextually relevant information when search results are returned. Other details from the internal `CodeBlock` structure (like `identifier`, `type`, `segmentHash`, `fileHash`) are not directly stored in the Qdrant payload. The unique ID for each vector point in Qdrant is a UUID generated based on the file path and start line of the chunk.

**Qdrant Search Query Construction:**

When a search is performed (via `CodeIndexSearchService` and then `QdrantVectorStore`), the query to Qdrant is constructed as follows:

1.  **Query Vector**: The user's textual search query is first converted into a numerical embedding vector by the active `IEmbedder`. This vector is the primary input for the Qdrant search.
2.  **Directory Filtering (Optional)**:
    - If a `directoryPrefix` is provided with the search request (e.g., "src/utils"), the system leverages pre-indexed path segments.
    - During indexing, file paths are broken into segments (e.g., "src", "utils", "helper.ts") and stored in the Qdrant payload under a field like `pathSegments: { "0": "src", "1": "utils", ... }`. Payload indexes are created for these segments.
    - The Qdrant query will include a `filter` with a `must` clause, requiring matches for each segment of the `directoryPrefix` (e.g., `pathSegments.0` must be "src" AND `pathSegments.1` must be "utils"). This efficiently scopes the search to the specified directory.
3.  **Search Parameters**:
    - **`score_threshold`**: A minimum similarity score (e.g., 0.4 or 0.5, configurable) is applied. Results below this threshold are discarded.
    - **`limit`**: A maximum number of search results to return is specified (e.g., 20 or 50).
    - **`params` (HNSW)**: Parameters for Qdrant's HNSW (Hierarchical Navigable Small World) approximate nearest neighbor search algorithm are set (e.g., `hnsw_ef: 128`, `exact: false`) to balance search speed and accuracy.
4.  **Payload Retrieval**: The query requests specific payload fields to be returned with matching vectors, including `filePath`, `codeChunk`, `startLine`, `endLine`, and `pathSegments`.

This allows for targeted semantic searches within specific parts of the codebase, with control over relevance and the number of results returned.
