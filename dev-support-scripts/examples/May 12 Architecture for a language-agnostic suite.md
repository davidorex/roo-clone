Based on a comprehensive analysis of all scripts in `dev-support-scripts`, including `test_coverage_analyzer.py`, `change_impact_analyzer.py`, `api_contract_analyzer.py`, `mock_access_path_analyzer.py`, and `test_implementation_analyzer.py`, a refined architecture for a language-agnostic suite supporting Python, TypeScript, and Swift is proposed:

1.  **Language-Specific Parsing & Analysis Backends:**
    *   **Python:** Use `ast` for structure, potentially augmented with static analysis tools (e.g., `jedi`, `mypy` internals) for richer semantics.
    *   **TypeScript:** Leverage the official **TypeScript Compiler API** (via Node.js wrapper) for AST, accurate type info, and symbol resolution.
    *   **Swift:** Utilize **`SwiftSyntax`** for syntax trees, potentially integrating with **SourceKit** (e.g., via `sourcekit-lsp`) for deeper semantic analysis.

2.  **Comprehensive Unified Analysis Interface:** Define a detailed Python interface (Protocol/ABC) specifying methods to retrieve language-agnostic representations of:
    *   Code definitions (classes, functions, etc.) with full signatures, inheritance, visibility.
    *   Dependencies and their resolved paths.
    *   Detailed call graphs.
    *   Symbol definitions and references.
    *   Structured documentation comments.
    *   Constant values and parameter defaults.
    *   Test constructs (suites, cases).
    *   Assertion details (types, values).
    *   Mocking information (targets, configurations).
    *   Application entry points (using language/framework heuristics).

3.  **Language Adapters:** Implement the unified interface for each language (Python, TS, Swift), using the respective backend tools and translating their output into the common interface format.

4.  **Analysis Modules:** Rewrite the core logic of the existing analysis scripts to operate solely against the comprehensive Unified Analysis Interface, making them language-agnostic.

5.  **Orchestration:** A top-level script handles file processing, language detection, adapter selection, analysis module invocation, and result formatting.

6.  **Separate Utilities:** Scripts like `generate_tree_view.py` and `apply-multiple-diffs` remain separate, as they perform filesystem or text manipulation rather than language structure analysis, though they might consume output from the analysis suite.

This architecture uses robust, language-specific open-source tools for parsing and analysis while maintaining a language-agnostic core through a detailed unified interface, capable of supporting the complex requirements of all analyzed scripts across the target languages.