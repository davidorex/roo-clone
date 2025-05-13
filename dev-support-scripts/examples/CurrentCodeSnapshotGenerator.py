#!/usr/bin/env python3
"""
CurrentCodeSnapshotGenerator.py

Generates a comprehensive, multi-faceted snapshot of the project's current state.
It synthesizes the latest outputs from various analysis scripts to provide an
AI-consumable and human-readable overview of the codebase's architecture,
key APIs, documentation coverage, and other relevant metrics.
"""

import argparse
import json
import os
import sys
from pathlib import Path
from datetime import datetime, timezone
from collections import defaultdict
import yaml # For YAML front matter

# --- Global Configuration ---
DEFAULT_ANALYSIS_INPUT_DIR = Path("dev-support-scripts/Output/")
DEFAULT_SNAPSHOT_OUTPUT_DIR = DEFAULT_ANALYSIS_INPUT_DIR / "code_snapshot"
DEFAULT_MARKDOWN_FILENAME = "CurrentCodeSnapshot.md"
DEFAULT_JSON_FILENAME = "CurrentCodeSnapshot.json"

class ConfigManager:
    def __init__(self, args):
        self.analysis_input_dir = Path(args.analysis_input_dir)
        self.snapshot_output_dir = Path(args.output_dir)
        self.components_for_api_summary = args.components_for_api_summary.split(',') if args.components_for_api_summary else []
        self.output_format = args.output_format
        self.top_n_central_modules = args.top_n_central_modules
        # self.top_n_complex_modules = args.top_n_complex_modules # Future

        self.snapshot_output_dir.mkdir(parents=True, exist_ok=True)
        print(f"Configuration loaded.")
        print(f"Analysis input directory: {self.analysis_input_dir}")
        print(f"Snapshot output directory: {self.snapshot_output_dir}")
        print(f"Output format(s): {self.output_format}")

class LatestAnalysisParser:
    def __init__(self, analysis_input_dir: Path):
        self.base_dir = analysis_input_dir
        print(f"LatestAnalysisParser initialized for directory: {self.base_dir}")

    def _run_prerequisite_script(self, script_name: str, command: str) -> bool:
        """Runs a prerequisite analysis script."""
        print(f"Attempting to run prerequisite script: {script_name}...")
        try:
            # Construct the full command. Assuming scripts are in the same directory or on PATH.
            # For scripts within dev-support-scripts, adjust path if needed.
            script_path = Path(__file__).parent / script_name
            if not script_path.exists(): # Fallback if script_name is just the name
                script_path = script_name

            full_command = f"python {script_path}" # Basic command, might need more args for specific scripts
            if command: # If a specific command string is provided
                full_command = command

            print(f"Executing: {full_command}")
            # Using os.system for simplicity in this context. Subprocess is generally better.
            # Ensure that the prerequisite scripts write to their expected output locations.
            exit_code = os.system(full_command)
            if exit_code == 0:
                print(f"Script {script_name} executed successfully.")
                return True
            else:
                print(f"Warning: Script {script_name} execution failed with exit code {exit_code}.", file=sys.stderr)
                return False
        except Exception as e:
            print(f"Warning: Error running script {script_name}: {e}", file=sys.stderr)
            return False

    def _find_latest_timestamped_json(self, sub_dir_name: str, prefix: str, prerequisite_script_info: dict | None = None, exact_filename_on_retry: str | None = None) -> dict | None:
        target_dir = self.base_dir / sub_dir_name
        latest_file = None
        latest_ts_obj = None

        if not target_dir.exists():
            # If dir doesn't exist and we can run a script that might create it.
            if prerequisite_script_info and self._run_prerequisite_script(prerequisite_script_info["name"], prerequisite_script_info["command"]):
                # After running, check again if dir exists. If not, then fail.
                if not target_dir.exists():
                    print(f"Warning: Directory {target_dir} still not found after running prerequisite script.", file=sys.stderr)
                    return None
            else: # Dir doesn't exist and no script to run
                print(f"Warning: Directory {target_dir} not found for '{prefix}*' files.", file=sys.stderr)
                return None

        # Attempt to find the file
        found_files = []
        for f_name in os.listdir(target_dir):
            if f_name.startswith(prefix) and f_name.endswith(".json"):
                found_files.append(target_dir / f_name)

        if not found_files:
            # No files found initially
            if prerequisite_script_info and self._run_prerequisite_script(prerequisite_script_info["name"], prerequisite_script_info["command"]):
                print(f"Retrying to find files in {target_dir} after running prerequisite script.")
                # Retry finding files
                for f_name in os.listdir(target_dir): # Re-scan directory
                    if f_name.startswith(prefix) and f_name.endswith(".json"):
                        found_files.append(target_dir / f_name)
                if not found_files and exact_filename_on_retry: # Specific check for exact filename after script run
                    exact_path = target_dir / exact_filename_on_retry
                    if exact_path.exists():
                        found_files.append(exact_path)
            
            if not found_files:
                print(f"Warning: No '{prefix}*.json' (or exact '{exact_filename_on_retry}') files found in {target_dir} even after potential prerequisite run.", file=sys.stderr)
                return None

        # Process found files to find the latest (timestamped or by mtime)
        for file_path in found_files:
            f_name = file_path.name
            try:
                ts_part = f_name[len(prefix):].replace(".json", "")
                if ts_part.startswith("_"): ts_part = ts_part[1:] # Handles prefix_timestamp.json
                
                # If ts_part is empty, it means filename is exactly prefix + ".json" (non-timestamped)
                if not ts_part and f_name == f"{prefix}.json": # Exact match for non-timestamped
                    if latest_file is None or file_path.stat().st_mtime > latest_file.stat().st_mtime:
                        latest_file = file_path
                        latest_ts_obj = None # Mark as non-timestamped for priority
                    continue

                current_ts_obj = datetime.strptime(ts_part, "%Y%m%d_%H%M%S")
                if latest_ts_obj is None or current_ts_obj > latest_ts_obj:
                    latest_ts_obj = current_ts_obj
                    latest_file = file_path
            except ValueError: # Non-timestamped file that starts with prefix
                if latest_file is None or file_path.stat().st_mtime > latest_file.stat().st_mtime:
                    # Prioritize timestamped files if one has been found
                    if latest_ts_obj is None:
                         latest_file = file_path
        
        if latest_file and latest_file.exists():
            print(f"Selected file: {latest_file}")
            try:
                with open(latest_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    data['_analysis_source_file'] = str(latest_file.name)
                    data['_analysis_source_timestamp_iso'] = datetime.fromtimestamp(latest_file.stat().st_mtime, tz=timezone.utc).isoformat()
                    return data
            except Exception as e:
                print(f"Error reading/parsing {latest_file}: {e}", file=sys.stderr)
        elif latest_file: # Should not happen if logic above is correct
             print(f"Warning: Selected file {latest_file} found but does not exist upon read attempt.", file=sys.stderr)
        
        return None

    def get_latest_dependency_graph(self) -> dict | None:
        return self._find_latest_timestamped_json("dependency_graph", "dependency_graph_")

    def get_latest_api_contracts(self, component_pattern: str) -> dict | None:
        # This needs to be smarter if component_pattern is a wildcard or to find multiple
        # For now, assume component_pattern is a direct prefix like "viewer.semantic.vector"
        # and files are named like "viewer.semantic.vector_api_contracts_TIMESTAMP.json"
        # Or, if the analyzer script names them like "{component_name}_interface_contracts_TIMESTAMP.json"
        # then component_pattern would be "viewer.semantic.vector" and prefix "{component_pattern}_interface_contracts_"
        
        # Simplified: look for any file starting with the component pattern in api_contracts dir
        # This needs to align with actual output filenames from api_contract_analyzer.py
        # Assuming files are named like: {component_name_slug}_api_contracts_{timestamp}.json
        # where component_name_slug might be viewer-semantic-vector
        
        # For this PoC, let's assume a simple direct match or a common pattern.
        # This part is highly dependent on the actual output structure of the (future) language-agnostic API analyzer.
        # For now, we'll use a placeholder logic.
        
        # Try matching common naming conventions from the spec
        # 1. {component}_api_contracts_{timestamp}.json
        # 2. {component}_interface_contracts_{timestamp}.json
        
        # Convert pattern like "viewer.semantic.*" to a regex or glob if needed
        # For now, let's assume component_pattern is a specific prefix used in filenames
        
        # This is a placeholder. A real implementation would need to list files in api_contracts,
        # match them against component_pattern (which could be a glob), and find the latest.
        print(f"Attempting to load latest API contracts for pattern: {component_pattern}...")
        # Example: if component_pattern is "viewer.semantic.vector"
        # and files are "viewer.semantic.vector_api_contracts_TS.json"
        # or "vector_interface_contracts_TS.json" (if component name is extracted differently)
        
        # This is a stub and needs actual implementation based on how API contract files are named and organized.
        # For now, it will likely return None unless a very specific naming is matched by _find_latest_timestamped_json
        return self._find_latest_timestamped_json("api_contracts", f"{component_pattern.replace('.', '-')}_api_contracts_") or \
               self._find_latest_timestamped_json("api_contracts", f"{component_pattern.split('.')[-1]}_interface_contracts_")


    def get_latest_docstrings(self, component_pattern: str) -> dict | None:
        # Similar to API contracts, this depends on the output structure of DocumentationExtractor
        # Assuming files might be named {component_slug}_documentation_{timestamp}.json
        print(f"Attempting to load latest docstrings for pattern: {component_pattern}...")
        return self._find_latest_timestamped_json("documentation_extracted", f"{component_pattern.replace('.', '-')}_documentation_") # Placeholder subdir

    def get_latest_test_coverage(self) -> dict | None:
        # test_coverage_analyzer.py produces "test_coverage_summary.json" (no timestamp)
        return self._find_latest_timestamped_json(
            "test_coverage", 
            "test_coverage_summary", # Prefix is now exact stem
            prerequisite_script_info={
                "name": "test_coverage_analyzer.py", 
                "command": "python dev-support-scripts/test_coverage_analyzer.py"
            },
            exact_filename_on_retry="test_coverage_summary.json" # Explicitly check this after script run
        )

    # Stubs for future analysis outputs
    def get_latest_code_complexity(self) -> dict | None: return None
    def get_latest_dead_code(self) -> dict | None: return None
    def get_latest_tech_stack(self) -> dict | None: return None


class SnapshotSynthesizer:
    def __init__(self, parser: LatestAnalysisParser, config: ConfigManager):
        self.parser = parser
        self.config = config
        self.snapshot_data = {}
        self.analysis_source_timestamps = {} # To track timestamps of data sources

    def _add_source_timestamp(self, data_key: str, data: dict | None):
        if data and '_analysis_source_timestamp_iso' in data:
            self.analysis_source_timestamps[data_key] = data['_analysis_source_timestamp_iso']
        
    def synthesize(self):
        print("Synthesizing code snapshot...")
        # 1. Overall Architecture
        dep_graph = self.parser.get_latest_dependency_graph()
        self._add_source_timestamp("dependency_graph", dep_graph)
        arch_summary = {"key_subsystems": [], "central_modules": [], "architectural_concerns": []}
        if dep_graph and "nodes" in dep_graph:
            nodes = dep_graph["nodes"]
            arch_summary["total_modules_analyzed_in_graph"] = len(nodes)
            
            # Simple subsystem detection (example: top-level dirs in module paths)
            subsystems = defaultdict(int)
            for mod_path in nodes.keys():
                subsystems[mod_path.split('.')[0]] += 1
            arch_summary["key_subsystems"] = [{"name": k, "module_count": v} for k,v in sorted(subsystems.items(), key=lambda item: item[1], reverse=True)[:5]]

            # Central modules (example: by number of dependents - 'imported_by')
            centrality = []
            for mod_path, data in nodes.items():
                centrality.append({"name": mod_path, "dependents_count": len(data.get("imported_by", [])), "dependencies_count": len(data.get("imports", []))})
            
            arch_summary["central_modules"] = sorted(centrality, key=lambda x: x["dependents_count"], reverse=True)[:self.config.top_n_central_modules]
            # TODO: Add cycle detection summary if available in dep_graph output
        self.snapshot_data["architecture"] = arch_summary

        # 2. Key API Contracts
        self.snapshot_data["api_contracts"] = []
        for comp_pattern in self.config.components_for_api_summary:
            api_data = self.parser.get_latest_api_contracts(comp_pattern)
            self._add_source_timestamp(f"api_contracts_{comp_pattern}", api_data)
            if api_data:
                # Simplified summary for PoC
                summary = {"component_pattern": comp_pattern, "modules_found": len(api_data)}
                # In a real scenario, extract key public APIs from api_data
                self.snapshot_data["api_contracts"].append(summary)

        # 3. Documentation Status
        doc_summary = {"overall_coverage_percentage": "N/A", "key_undocumented_apis": []}
        # This would require parsing all docstring files and comparing against API contracts
        # For PoC, we'll leave it as N/A or use a placeholder if a single summary file existed.
        # Example: doc_data = self.parser.get_latest_docstrings_summary()
        self.snapshot_data["documentation_status"] = doc_summary
        
        # 4. Test Coverage
        test_coverage = self.parser.get_latest_test_coverage()
        self._add_source_timestamp("test_coverage", test_coverage)
        coverage_stats = {"overall_percentage": "N/A", "low_coverage_modules": []}
        if test_coverage and "coverage_stats" in test_coverage:
            coverage_stats["overall_percentage"] = test_coverage["coverage_stats"].get("coverage_percentage", "N/A")
            # Add logic to find low coverage modules if data structure supports it
        self.snapshot_data["test_coverage_status"] = coverage_stats
        
        # (Future sections: Complexity, Dead Code, Tech Stack)
        self.snapshot_data["code_complexity"] = {"status": "Not Implemented"}
        self.snapshot_data["dead_code"] = {"status": "Not Implemented"}
        self.snapshot_data["tech_stack"] = {"status": "Not Implemented"}

        print("Snapshot synthesis complete.")
        return self.snapshot_data

class ReportFormatter:
    def __init__(self, config: ConfigManager):
        self.config = config

    def _format_json_for_ai_comment(self, data, indent=0):
        json_str = json.dumps(data, indent=2, ensure_ascii=False)
        indented_json_str = "\n".join(" " * indent + line for line in json_str.splitlines())
        return f"<!-- AI_DATA_START\n{indented_json_str}\n{' ' * (indent-2 if indent > 1 else 0)}AI_DATA_END -->"

    def _generate_markdown(self, project_name: str, snapshot_data: dict, analysis_timestamps: dict) -> str:
        lines = []
        
        # YAML Front Matter
        front_matter = {
            "report_type": "CurrentCodeSnapshot",
            "generation_timestamp_iso": datetime.now(timezone.utc).isoformat(),
            "analysis_data_timestamps_iso": analysis_timestamps, # Timestamps of data sources
            "project_name": project_name,
            "summary_stats": {
                "total_modules_analyzed": snapshot_data.get("architecture",{}).get("total_modules_analyzed_in_graph", "N/A"),
                # Add more stats as they become available from synthesizers
                "overall_docstring_coverage_percentage": snapshot_data.get("documentation_status",{}).get("overall_coverage_percentage", "N/A"),
                "overall_test_coverage_percentage": snapshot_data.get("test_coverage_status",{}).get("overall_percentage", "N/A"),
            }
        }
        lines.append("---")
        lines.append(yaml.dump(front_matter, sort_keys=False, allow_unicode=True).strip())
        lines.append("---\n")

        lines.append(f"# Current Code Snapshot: {project_name}")
        lines.append(f"Generated: {front_matter['generation_timestamp_iso']}")
        if analysis_timestamps:
            lines.append("Analysis Data From (approximate latest):")
            for key, ts in analysis_timestamps.items():
                lines.append(f"- {key}: {ts}")
        lines.append("\n")

        # 1. Project Overview & Health Summary (Simplified for PoC)
        lines.append("## 1. Project Overview & Health Summary")
        overview_ai_data = {
            "total_modules": front_matter["summary_stats"]["total_modules_analyzed"],
            "doc_coverage": front_matter["summary_stats"]["overall_docstring_coverage_percentage"],
            "test_coverage": front_matter["summary_stats"]["overall_test_coverage_percentage"],
            "key_architectural_points": snapshot_data.get("architecture",{}).get("central_modules", [])[:1] # Example
        }
        lines.append(self._format_json_for_ai_comment(overview_ai_data, 2))
        lines.append(f"- Total Modules (from dep graph): {overview_ai_data['total_modules']}")
        lines.append(f"- Documentation Coverage: {overview_ai_data['doc_coverage']}")
        lines.append(f"- Test Coverage: {overview_ai_data['test_coverage']}\n")

        # 2. Overall Architecture
        arch = snapshot_data.get("architecture", {})
        lines.append("## 2. Overall Architecture")
        lines.append(self._format_json_for_ai_comment(arch, 2))
        if arch.get("key_subsystems"):
            lines.append("### Key Subsystems:")
            for sub in arch["key_subsystems"]: lines.append(f"- {sub['name']} ({sub['module_count']} modules)")
        if arch.get("central_modules"):
            lines.append("\n### Central Modules (by dependents):")
            for mod in arch["central_modules"]: lines.append(f"- `{mod['name']}` (Dependents: {mod['dependents_count']}, Dependencies: {mod['dependencies_count']})")
        lines.append("\n")
        
        # 3. Key API Contracts
        apis = snapshot_data.get("api_contracts", [])
        lines.append("## 3. Key API Contracts")
        if not apis: lines.append("No API contract data loaded or components specified for summary.\n")
        for api_summary in apis:
            lines.append(f"### Component Pattern: {api_summary['component_pattern']}")
            lines.append(self._format_json_for_ai_comment(api_summary, 4)) # Embed raw summary
            lines.append(f"- Modules found matching pattern: {api_summary['modules_found']}")
            # Detailed API listing would go here if parsed
            lines.append("\n")

        # 4. Documentation Coverage
        docs = snapshot_data.get("documentation_status", {})
        lines.append("## 4. Documentation Coverage")
        lines.append(self._format_json_for_ai_comment(docs, 2))
        lines.append(f"- Overall Coverage: {docs.get('overall_coverage_percentage', 'N/A')}")
        if docs.get("key_undocumented_apis"):
            lines.append("\n### Key Undocumented APIs:")
            for api in docs["key_undocumented_apis"][:5]: lines.append(f"- `{api}`")
        lines.append("\n")

        # 5. Test Coverage
        tests = snapshot_data.get("test_coverage_status", {})
        lines.append("## 5. Test Coverage")
        lines.append(self._format_json_for_ai_comment(tests, 2))
        lines.append(f"- Overall Coverage: {tests.get('overall_percentage', 'N/A')}")
        if tests.get("low_coverage_modules"):
            lines.append("\n### Modules with Low Coverage:")
            for mod in tests["low_coverage_modules"][:5]: lines.append(f"- `{mod}`")
        lines.append("\n")

        # Future sections
        lines.append("## (Future) Code Complexity Hotspots\n- Not Implemented\n")
        lines.append("## (Future) Dead Code Summary\n- Not Implemented\n")
        lines.append("## (Future) Technology Stack\n- Not Implemented\n")

        return "\n".join(lines)

    def generate_report(self, project_name: str, snapshot_data: dict, analysis_timestamps: dict):
        output_formats = self.config.output_format.split(',')

        if "markdown" in output_formats:
            md_content = self._generate_markdown(project_name, snapshot_data, analysis_timestamps)
            md_file_path = self.config.snapshot_output_dir / DEFAULT_MARKDOWN_FILENAME
            with open(md_file_path, 'w', encoding='utf-8') as f:
                f.write(md_content)
            print(f"Markdown snapshot generated: {md_file_path}")

        if "json" in output_formats:
            json_file_path = self.config.snapshot_output_dir / DEFAULT_JSON_FILENAME
            # Add generation timestamp to the pure JSON output as well
            snapshot_data_with_meta = {
                "report_metadata": {
                    "report_type": "CurrentCodeSnapshot",
                    "generation_timestamp_iso": datetime.now(timezone.utc).isoformat(),
                    "analysis_data_timestamps_iso": analysis_timestamps,
                    "project_name": project_name
                },
                "snapshot_data": snapshot_data
            }
            with open(json_file_path, 'w', encoding='utf-8') as f:
                json.dump(snapshot_data_with_meta, f, indent=2, ensure_ascii=False)
            print(f"JSON snapshot generated: {json_file_path}")


def main():
    parser = argparse.ArgumentParser(description="Generates a current code snapshot report (v1).")
    parser.add_argument('--output-dir', default=str(DEFAULT_SNAPSHOT_OUTPUT_DIR),
                        help=f'Output directory for report files. Default: {DEFAULT_SNAPSHOT_OUTPUT_DIR}')
    parser.add_argument('--analysis-input-dir', default=str(DEFAULT_ANALYSIS_INPUT_DIR),
                        help=f'Base Output/ directory of the analysis suite. Default: {DEFAULT_ANALYSIS_INPUT_DIR}')
    parser.add_argument('--components-for-api-summary', default="",
                        help='Comma-separated list of module/component name patterns for detailed API summaries (e.g., "viewer.semantic.*,git_commit_viewer.utils")')
    parser.add_argument('--output-format', default='markdown',
                        help='Output format(s), comma-separated (markdown, json). Default: markdown')
    parser.add_argument('--top-n-central-modules', type=int, default=5,
                        help='Number of central modules to highlight.')
    # parser.add_argument('--top-n-complex-modules', type=int, default=5, help='(Future) Number of complex modules to highlight.') # Future

    args = parser.parse_args()
    print("Starting Current Code Snapshot Generator...")

    config = ConfigManager(args)
    parser = LatestAnalysisParser(config.analysis_input_dir)
    synthesizer = SnapshotSynthesizer(parser, config)
    formatter = ReportFormatter(config)

    snapshot_content = synthesizer.synthesize()
    
    # Use project directory name as a default project name
    project_name = Path.cwd().name 
    
    formatter.generate_report(project_name, snapshot_content, synthesizer.analysis_source_timestamps)
    
    print("Snapshot generation complete.")

if __name__ == "__main__":
    main()
