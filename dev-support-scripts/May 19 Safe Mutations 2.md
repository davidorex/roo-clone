Here’s how to reshape and implement the safe_mutations script using your two analyzers as the foundation:

⸻

✅ GOAL

Create a safe_mutations_analyzer.ts that emits compact, structured JSON summaries for each module, suitable for:
• AI model ingestion
• Inlining into prompts
• Supporting intelligent code mutation/refactoring decisions

⸻

🧱 IMPLEMENTATION OUTLINE

1. Leverage Existing Data

Use outputs from:
• DependencyGraph.nodes
• ModuleInfo (from api_contract_analyzer)
• Combined by module_name

2. Heuristic Classifier

Inline a light scoring system:

function classifyModule(metrics, api): "IMMUTABLE" | "VOLATILE" | "NORMAL" | "EXTENSION_POINT" {
if (metrics.centrality > 10 && api.interface_count > 0) return "IMMUTABLE"
if (metrics.fanout > 10 || metrics.dependency_depth > 5) return "VOLATILE"
if (metrics.centrality < 3 && metrics.fanout < 3) return "EXTENSION_POINT"
return "NORMAL"
}

⸻

3. Output Format (Optimized for AI Context Windows)

Each module should emit a compact JSON object with:

{
"module": "src/api/userService",
"classification": "IMMUTABLE",
"centrality": 17,
"fanout": 1,
"interfaces": ["User", "AuthResponse"],
"functions": ["loginUser", "logoutUser"],
"imported_by": 12,
"imports": 3,
"recommendation": "Avoid mutating; used by many. Use wrapper or extension.",
}

🔹 Keep list fields like interfaces trimmed to 3–5 max entries for context size.

⸻

4. Optional Flags and Filters

Support CLI flags:

node safe_mutations_analyzer.js --only IMMUTABLE
node safe_mutations_analyzer.js --include-volatile
node safe_mutations_analyzer.js --compact

⸻

5. Single Entry Point Script

Suggested final file: safe_mutations_analyzer.ts

It should:
• Load precomputed DependencyGraph and ModuleInfo objects (already computed in other scripts).
• Iterate and classify.
• Emit a flat JSON array of modules.
• Write or console.log for piping.

⸻

🧠 EXAMPLE AI-READY OUTPUT

[
{
"module": "src/core/config",
"classification": "IMMUTABLE",
"centrality": 21,
"fanout": 2,
"interfaces": ["AppConfig"],
"functions": [],
"imported_by": 33,
"imports": 1,
"recommendation": "Avoid changing. Define stable extensions externally if needed."
},
{
"module": "src/pages/settings",
"classification": "EXTENSION_POINT",
"centrality": 1,
"fanout": 2,
"interfaces": [],
"functions": ["renderSettingsPage"],
"imported_by": 0,
"imports": 1,
"recommendation": "Safe to add features or mutate directly."
}
]

⸻

✅ SUMMARY
• Reuse all AST and graph code.
• Add a classification + summarization pass.
• Emit small, focused per-module objects.
• Perfect for AI use in mutation/refactor workflows.
