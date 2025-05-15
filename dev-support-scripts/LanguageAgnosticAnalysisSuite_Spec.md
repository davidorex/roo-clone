# Specification: Language-Agnostic Code Analysis Suite

Date: May 12, 2025

## 1. Objective

To create a suite of code analysis tools capable of providing consistent, structured, and AI-consumable insights across multiple programming languages, initially focusing on Python, TypeScript, and Swift. This suite will replace and enhance the existing Python-specific scripts in `dev-support-scripts`, enabling deeper understanding of code structure, dependencies, APIs, changes, and test alignment in polyglot projects like `git-commit-viewer`. The outputs are designed to be foundational data points for higher-level synthesis tools (like `ProjectNarrativeGenerator`) and direct AI/developer consumption.

## 2. Core Idea

The suite employs a modular architecture centered around a **Unified Analysis Interface**. Language-specific parsing and analysis capabilities are encapsulated within **Language Adapters** that interact with robust backend tools (native AST parsers, compiler APIs, syntax libraries). Core **Analysis Modules** (e.g., dependency graph generator, API contract analyzer) are implemented against the unified interface, making their logic language-agnostic. An **Orchestration Layer** manages file processing, language detection, adapter selection, and module execution.

## 3. Architecture Overview

```mermaid
graph TD
    subgraph Analysis Modules (Language Agnostic Logic)
        A[DependencyGraphGenerator]
        B[APIAContractAnalyzer]
        C[DocumentationExtractor]
        D[ChangeImpactAnalyzer]
        E[TestCoverageAnalyzer]
        F[MockPathAnalyzer]
        G[TestAlignmentAnalyzer]
        H[...]
    end

    UAI[Unified Analysis Interface\n(get_definitions, get_dependencies, ...)]

    subgraph Language Adapters
        P_Adapter[PythonAdapter]
        TS_Adapter[TypeScriptAdapter]
        S_Adapter[SwiftAdapter]
    end

    subgraph Parsing & Analysis Backends
        P_Backend[Python: 'ast' + Static Analysis Tools (e.g., jedi)]
        TS_Backend[TypeScript: TS Compiler API (via Node.js)]
        S_Backend[Swift: SwiftSyntax + SourceKit (via Swift tool)]
    end

    A -- uses --> UAI;
    B -- uses --> UAI;
    C -- uses --> UAI;
    D -- uses --> UAI;
    E -- uses --> UAI;
    F -- uses --> UAI;
    G -- uses --> UAI;
    H -- uses --> UAI;

    P_Adapter -- implements --> UAI;
    TS_Adapter -- implements --> UAI;
    S_Adapter -- implements --> UAI;

    P_Adapter -- uses --> P_Backend;
    TS_Adapter -- interacts with --> TS_Backend;
    S_Adapter -- interacts with --> S_Backend;

    P_Backend -- analyzes --> Python_Code[Python Source Code];
    TS_Backend -- analyzes --> TS_Code[TypeScript Source Code];
    S_Backend -- analyzes --> Swift_Code[Swift Source Code];
```

*   **Parsing & Analysis Backends:** Language-specific tools providing detailed syntax and semantic information (AST, types, symbols, etc.).
*   **Language Adapters:** Implement the Unified Analysis Interface for a specific language, translating backend tool output into the common format.
*   **Unified Analysis Interface:** A Python Protocol or Abstract Base Class defining the standard methods for querying code information (e.g., `get_definitions`, `get_dependencies`, `get_calls`, `get_documentation`).
*   **Analysis Modules:** Contain the core logic for specific analyses (dependency graphing, API extraction), operating solely on data retrieved via the Unified Interface.
*   **Orchestration Layer:** Manages execution, file handling, adapter selection, and output generation.

## 4. Core Analysis Modules & Outputs

Each module operates on specified source files, leveraging the appropriate Language Adapter via the Unified Interface. Outputs are primarily structured JSON, placed in subdirectories under a configurable base output path (e.g., `dev-support-scripts/Output/`). Timestamped and component-specific naming conventions will be used where appropriate (e.g., `{component_name}_api_contracts_{timestamp}.json`).

### a. DependencyGraphGenerator
*   **Purpose:** Build a cross-language dependency graph showing module/file interrelationships.
*   **Interface Needs:** `get_dependencies(file_path)` providing source/target modules/files and import types.
*   **Output (`dependency_graph_{timestamp}.json`):** JSON representing nodes (modules/files across languages) and edges (dependencies), including metrics like centrality, fan-out, and identification of cross-subsystem links and potential cycles. Also generates a text summary (`dependency_overview_{timestamp}.txt`).

### b. APIContractAnalyzer
*   **Purpose:** Extract detailed public API contracts for modules, classes, interfaces, protocols, functions, etc.
*   **Interface Needs:** `get_definitions(file_path)` providing detailed signature information (parameters with types/defaults, return types, visibility, inheritance/conformance, associated documentation).
*   **Output (`{component}_api_contracts_{timestamp}.json`):** Structured JSON detailing the public interfaces of components within the analyzed scope. Also generates a text summary (`{component}_api_summary_{timestamp}.txt`).

### c. DocumentationExtractor
*   **Purpose:** Extract structured documentation comments (Python docstrings, JSDoc, Swift/JavaDoc style, C# XML Docs) associated with code definitions.
*   **Interface Needs:** `get_definitions(file_path)`, `get_documentation(definition)`.
*   **Output (`{component}_documentation_{timestamp}.json`):** JSON mapping code elements (classes, functions, methods) to their extracted documentation content.

### d. ChangeImpactAnalyzer
*   **Purpose:** Analyze the potential impact of changes in specified files against a baseline, identifying affected components and required tests across languages.
*   **Interface Needs:** `get_definitions` (with full signatures), `get_calls`, `get_callers`, `resolve_symbol`, `get_dependencies`, `get_entry_points`, `get_test_definitions`, `map_test_to_source`. Requires baseline comparison capabilities.
*   **Output:**
    *   Baseline Mode: `modules_baseline.json`, `tests_baseline.json`, `entry_points.json` (language-agnostic structure).
    *   Incremental Mode: `impact_summary.txt` (AI-focused summary), `impact_details.json` (structured data), `{target_filename}_actions.md` (developer checklist).

### e. TestCoverageAnalyzer
*   **Purpose:** Estimate test coverage by mapping test files/functions to the source code components they likely target.
*   **Interface Needs:** `get_test_definitions(file_path)`, `get_dependencies(test_file_path)`, `resolve_symbol`, `map_test_to_source` (heuristic or symbol-based mapping).
*   **Output (`test_coverage_summary_{timestamp}.json`, `test_coverage_overview_{timestamp}.txt`):** Structured data and text summary mapping source components to tests, identifying untested components, and potentially extracting test scenarios from documentation.

### f. MockPathAnalyzer
*   **Purpose:** Diagnose potential mocking issues by analyzing the various import and call paths used to access functions/methods.
*   **Interface Needs:** `get_dependencies` (with alias info), `get_calls` (with context), `resolve_symbol` (to trace indirect calls).
*   **Output (`{component}_mock_paths_{timestamp}.json`, `{component}_mock_paths_report_{timestamp}.txt`):** Structured data and text report detailing different access paths to functions, highlighting potential conflicts for mocking frameworks.

### g. TestAlignmentAnalyzer
*   **Purpose:** Cross-reference test assertions and mock configurations against actual implementation details (signatures, defaults, constants).
*   **Interface Needs:** `get_test_definitions`, `get_assertions`, `get_mocks`, `get_definitions` (with defaults), `get_constants`.
*   **Output (`{component}_test_analysis.json`, `{component}_impl_analysis.json`, `{component}_alignment_report_{timestamp}.txt`):** Raw test/implementation data and a report highlighting potential mismatches (e.g., outdated default value checks, incorrect mock targets).

## 5. Unified Analysis Interface (Illustrative Key Methods)

```python
from typing import Protocol, List, Dict, Optional, Any

class CodePosition: ...
class CodeRange: ...
class CodeDefinition: # Represents class, func, method, protocol, etc.
    name: str
    kind: str # 'class', 'function', 'method', 'interface', ...
    signature: Any # Language-specific or structured signature info
    range: CodeRange
    # ... other common attributes
class DependencyInfo:
    source_module: str
    target_specifier: str # What was imported (e.g., 'fs', './utils', 'com.example.Lib')
    resolved_target: Optional[str] # Resolved absolute module/file path
    alias: Optional[str]
    # ...
class CallInfo:
    caller_definition: CodeDefinition
    callee_specifier: str # How it was called (e.g., 'fs.readFile', 'myFunc')
    resolved_callee: Optional[CodeDefinition]
    call_site: CodeRange
    # ...
class DocumentationInfo: ...
class ConstantInfo: ...
class TestDefinition: ...
class AssertionInfo: ...
class MockInfo: ...

class UnifiedAnalysisInterface(Protocol):
    def get_definitions(self, file_path: str) -> List[CodeDefinition]: ...
    def get_dependencies(self, file_path: str) -> List[DependencyInfo]: ...
    def get_calls(self, file_path: str) -> List[CallInfo]: ...
    def get_callers(self, definition: CodeDefinition) -> List[CallInfo]: ...
    def resolve_symbol(self, file_path: str, position: CodePosition) -> Optional[CodeDefinition]: ...
    def get_documentation(self, definition: CodeDefinition) -> Optional[DocumentationInfo]: ...
    def get_constants(self, file_path: str) -> List[ConstantInfo]: ...
    # ... methods for tests, assertions, mocks, entry points ...
```
*(Note: Actual interface definition requires careful design)*

## 6. Configuration & Usage

*   **Configuration:** Requires paths to source directories, potentially paths to language backend tools (if not on PATH), language detection settings (e.g., file extensions), output directory path.
*   **Usage:** Invoked via the Orchestration Layer, likely a main script accepting arguments specifying the analysis type(s) to run, target files/directories, and configuration options.
    ```bash
    python run_analysis.py --analysis dependency_graph api_contract --target-dir ./src --output-dir ./analysis_output
    ```

## 7. Limitations & Future Enhancements

*   **Limitations:**
    *   Accuracy depends heavily on the quality and capabilities of the underlying language-specific backend tools (parsers, type checkers, symbol resolvers).
    *   Handling dynamic language features or complex metaprogramming remains challenging.
    *   The design of the Unified Analysis Interface requires careful balancing of detail vs. generality.
*   **Future Enhancements:**
    *   Support for additional languages (Java, C#, Go, Ruby, etc.) by implementing new Language Adapters.
    *   **Deeper semantic analysis (e.g., data flow tracking):** This involves analyzing how data values originate, propagate through assignments and function calls, and are ultimately used.
        *   **Benefits:** Enables advanced security analysis (taint tracking to find vulnerabilities like SQL injection/XSS), improves dead code detection (unused variables/parameters), helps understand complex variable lifecycles, supports refactoring, and can uncover subtle bugs (uninitialized variables, type mismatches in flows).
        *   **Implementation:** Requires significant enhancements to the architecture:
            *   *Backends:* Need tools capable of flow analysis (e.g., TS Compiler API's capabilities, Python static analysis libs like `pysa` or `pytype`, Swift analysis via SourceKit).
            *   *Interface:* Needs new methods like `trace_data_flow`, `find_taint_flows`, `get_value_origin`.
            *   *Modules:* New analysis modules would leverage this data (e.g., `TaintAnalyzer`, `AdvancedDeadCodeAnalyzer`).
        *   **Challenges:** High complexity, performance overhead, reliance on backend tool capabilities, handling dynamic language features.
    *   **Integration with Language Server Protocol (LSP):**
        *   **Concept:** Instead of (or alongside) direct backend integration, adapters could communicate with standard Language Servers for various languages using the LSP protocol. The adapters would act as LSP clients, sending requests (e.g., `textDocument/definition`, `textDocument/references`) and translating responses into the Unified Analysis Interface format.
        *   **Pros:** Leverages a widely adopted standard, potentially enables faster support for many languages with existing LSP servers, utilizes existing investment in server development.
        *   **Cons/Why Future:** Adds infrastructural complexity (managing server processes, JSON-RPC communication), potential performance overhead (inter-process communication vs. library calls), variable quality and feature completeness across different LSP servers (may not support all needed analysis queries like detailed call graphs or data flow). Initial focus is on high-fidelity analysis via direct integration for core languages.
    *   **Caching mechanisms:**
        *   **Concept:** Store results of expensive operations (parsing into AST/CST, dependency graph calculation, API contract extraction, etc.) to avoid recomputation if source files haven't changed. Could involve file-based caches (JSON/pickle) keyed by file path and modification time/hash, or in-memory caches.
        *   **Pros:** Can dramatically speed up repeated analyses or incremental checks (like change impact analysis). Reduces redundant computation.
        *   **Cons/Why Future:** Cache invalidation is complex and critical. The system must reliably detect relevant file changes and invalidate dependent cache entries (e.g., changing one file might invalidate its AST cache and the project-wide dependency graph cache). Implementing robust invalidation adds significant design complexity. Priority is on core functionality first, then performance optimization via caching.
    *   **Leveraging Native macOS APIs (where applicable):**
        *   **Concept:** Utilize specific macOS frameworks for potential performance or capability gains, particularly when running the analysis suite on macOS.
        *   **Examples:**
            *   *FSEvents:* Use the highly efficient FSEvents API for monitoring file system changes. This could make the **Caching Mechanism** significantly more performant and accurate by providing precise change notifications instead of relying solely on polling modification times or hashing file contents.
            *   *SourceKit:* Direct integration with SourceKit for Swift analysis (already part of the backend strategy) is the native, most powerful approach on macOS.
        *   **Considerations:** Adds platform-specific code paths, potentially reducing cross-platform portability if not handled carefully (e.g., via conditional imports or platform-specific adapters). FSEvents integration would primarily benefit the caching layer.
    *   Support for additional languages (Java, C#, Go, Ruby, etc.) by implementing new Language Adapters.


This specification outlines a powerful, extensible suite for multi-language code analysis, providing a solid foundation for generating diverse, AI-consumable project insights.
