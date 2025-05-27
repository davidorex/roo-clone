The chunking heuristic used in `src/services/code-index/processors/parser.ts` aims to break down code files into manageable `CodeBlock` objects suitable for semantic indexing and search. It employs a hybrid approach, prioritizing semantic structures identified by `tree-sitter` but falling back to line-based chunking when necessary.

Here's a breakdown of the process:

1.  **Primary Method (Tree-sitter based):**

    - The system first uses `tree-sitter` (a parser generator tool) to parse the code file into an Abstract Syntax Tree (AST). This provides a structured, language-aware representation of the code.
    - Specific syntax nodes (e.g., functions, classes, methods, import statements) are identified using pre-defined `tree-sitter` queries tailored for each supported programming language. These captured nodes become the initial candidates for code blocks.
    - **Size Checks and Refinement:**
        - **Minimum Size:** Nodes whose text content is smaller than `MIN_BLOCK_CHARS` (a defined constant, e.g., 50-100 characters) are generally discarded as they might not contain enough context for meaningful embedding.
        - **Maximum Size & Subdivision:** Nodes larger than `MAX_BLOCK_CHARS * MAX_CHARS_TOLERANCE_FACTOR` (a target maximum size, e.g., 1000-2000 characters, with a tolerance factor like 1.5-2.0) are considered too large for a single embedding.
            - If such a large node has children in the AST (e.g., a large class containing multiple methods), its children are processed recursively. This attempts to break down the oversized structure into its smaller, constituent semantic units.
            - If a large node is a "leaf" node in the AST (meaning it has no further structural children according to `tree-sitter`) but still exceeds the size limit, it's passed to a specialized line-based chunking mechanism (`_chunkLeafNodeByLines`).
        - **Valid Block Creation:** Nodes that fall within the acceptable size range (i.e., `>= MIN_BLOCK_CHARS` and `<= MAX_BLOCK_CHARS * MAX_CHARS_TOLERANCE_FACTOR`) are directly converted into `CodeBlock` objects. These blocks include metadata like file path, identifier (if available, like a function name), node type, start/end line numbers, and the actual code content.

2.  **Fallback Method (`_performFallbackChunking`):**

    - This method is invoked if `tree-sitter` fails to identify any meaningful structural captures in a file (e.g., for plain text files or unsupported/malformed code where queries yield no results), provided the file content itself is large enough (i.e., `> MIN_BLOCK_CHARS`).
    - It splits the entire file content by lines and then uses the common line-based chunking logic (`_chunkTextByLines`) to divide the text.

3.  **Line-Based Chunking (`_chunkTextByLines` and `_chunkLeafNodeByLines`):**
    - This is the core mechanism for splitting text when `tree-sitter` structures are either too large (for leaf nodes) or not found (fallback).
    - **Target Size:** It aims to create chunks whose character length is close to `MAX_BLOCK_CHARS`.
    - **Minimum Size:** Ensures that generated chunks are at least `MIN_BLOCK_CHARS` long to maintain some level of contextual meaning.
    - **Oversized Line Splitting:** If a single line of code itself is longer than `MAX_BLOCK_CHARS * MAX_CHARS_TOLERANCE_FACTOR`, that individual line is aggressively broken down into smaller segments, each approximately `MAX_BLOCK_CHARS` long. Each segment becomes a distinct `CodeBlock`.
    - **Remainder Re-balancing Logic:** When accumulating lines to form a chunk, if adding the next line would cause the chunk to exceed the maximum size, the system doesn't just cut it off. Instead, it looks at the potential "remainder" (all subsequent lines yet to be chunked). If this remainder would be very small (e.g., less than `MIN_CHUNK_REMAINDER_CHARS`, a constant like 50 characters), the system attempts to adjust the split point of the _current_ chunk. It might "give back" one or more lines from the end of the current chunk to the upcoming remainder, aiming to make both the current chunk and the next one reasonably sized. This prevents the creation of a well-sized chunk followed by a tiny, almost useless one.
    - Each chunk generated through this line-based process becomes a `CodeBlock`.

**Key Constants Guiding the Chunking Process:**

- `MIN_BLOCK_CHARS`: The minimum character length for a code block to be considered valid and useful for embedding.
- `MAX_BLOCK_CHARS`: The target maximum character length for a code block. This is often aligned with the input token limits of embedding models.
- `MAX_CHARS_TOLERANCE_FACTOR`: A multiplier (e.g., 1.5 or 2.0) applied to `MAX_BLOCK_CHARS`. Chunks can exceed `MAX_BLOCK_CHARS` up to this factored limit before more aggressive splitting (like child node processing or line-based chunking) is enforced.
- `MIN_CHUNK_REMAINDER_CHARS`: The preferred minimum size for a "leftover" chunk when the re-balancing logic is applied during line-based chunking.

This hybrid approach is designed to create code chunks that are both semantically coherent (by respecting the code's AST structure where possible) and appropriately sized for effective use with vector embedding models.
