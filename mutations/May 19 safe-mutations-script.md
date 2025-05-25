Yes — you absolutely can build a “safe mutations” script based on the infrastructure from dependency_graph_generator_ts.js and api_contract_analyzer_ts.js. Both scripts already provide deep static introspection. What’s missing is mutation-awareness — i.e., understanding what should not be changed, what must be changed together, and what can safely be extended.

Here’s how to design and implement this Safe Mutations Analyzer, incorporating the existing architecture and my earlier feedback:

⸻

🛠️ 1. Purpose of the Safe Mutations Script

Provide a developer or AI agent with:

    •	Critical integration points and interface contracts not to be broken.
    •	Clusters of mutually dependent modules (change one = change others).
    •	Immutables: stable, high-centrality contracts/interfaces/types/classes.
    •	Extension points: low-fanout, low-centrality modules safe for additions.
    •	Graph-based blast radius estimations for given files.

⸻

🧩 2. Inputs & Building Blocks

You already have:
• ✔️ Module dependency graph (DependencyGraph)
• ✔️ API contract model (ModuleInfo)
• ✔️ Usage contexts, fanout, centrality, circular dependencies, etc.
• ✔️ Class/interface/function/type boundaries and metrics

Add:
• 🔍 Stability Heuristics:
• High-centrality + low volatility = immutable
• Circular dependencies + frequent imports = volatile
• 🔍 Risk Classifications:
• Immutable: Should not mutate (e.g., shared interfaces, core contracts).
• Volatile: High fanout, cycles, or deep chains (risky to touch).
• Extension Point: Low fanout + low centrality = safe to add features.
• Isolated: Unused or standalone (safe to refactor or remove).

⸻

🧠 3. Analysis Algorithm Sketch

for (const module of graph.nodes.values()) {
const metrics = module.metrics
const api = apiContractByModule[module.module_name]

const classification = classifyModule(metrics, api)

results.push({
module: module.module_name,
classification,
fanout: metrics.fanout,
centrality: metrics.centrality,
dependency_depth: metrics.dependency_depth,
classes: Object.keys(module.classes),
functions: Object.keys(module.functions),
interfaces: Object.keys(api?.interfaces || {}),
types: Object.keys(api?.types || {}),
imports: module.imports.map(i => i.module),
imported_by: module.imported_by,
})
}

classifyModule() logic:

function classifyModule(metrics, api) {
if (metrics.centrality >= 10 && metrics.fanout <= 3 && api.interface_count >= 1) {
return "IMMUTABLE"
}
if (metrics.fanout >= 10 || metrics.dependency_depth >= 5) {
return "VOLATILE"
}
if (metrics.centrality <= 2 && metrics.fanout <= 2) {
return "EXTENSION_POINT"
}
return "NORMAL"
}

⸻

📤 4. Output Format

[
{
"module": "src/api/userService",
"classification": "IMMUTABLE",
"centrality": 17,
"fanout": 1,
"interfaces": ["User", "AuthResponse"],
"functions": ["loginUser", "logoutUser"],
"imported_by": ["src/pages/dashboard", "src/hooks/useAuth"],
"imports": ["src/constants/urls"],
"safe_to_mutate": false,
"recommended_action": "Avoid changing; consider adapter pattern."
},
{
"module": "src/pages/help",
"classification": "EXTENSION_POINT",
"safe_to_mutate": true,
"recommended_action": "Safe place to add features."
}
]

⸻

🚦 5. Additional Enhancements

Feature Description
Impact estimation If you mutate X, how many downstream modules are affected?
Mutation summary reports Show which types/functions/interfaces are touched and who depends on them.
CLI filtering --only-immutables, --blast-radius src/api/userService.ts
Visualization layer Optional: Generate DOT/Graphviz or JSON for D3/SigmaJS graphs showing impact.
Integration with git diff Run against a diff to flag potential unsafe mutations.

⸻

✅ Summary

You can safely and effectively create a safe_mutations_analyzer.js using the existing dependency + API introspection infrastructure. It will:
• Identify critical modules/interfaces.
• Detect safe mutation zones.
• Provide refactoring guidance with contract-awareness.
• Be immediately useful for risk mitigation and architectural hygiene.

The only required additions are a risk classifier and some summary/output orchestration logic — the hard work (AST, usage, graph modeling) is already done.
