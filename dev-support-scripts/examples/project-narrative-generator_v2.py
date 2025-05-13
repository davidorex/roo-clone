#!/usr/bin/env python3
"""
ProjectNarrativeGenerator.py (v2)

Automatically generates a chronological, fact-based narrative of a project's
development history, with enhanced Markdown structure for AI consumption.
It synthesizes information from a structured Git commit database and outputs
from various analysis scripts to provide a comprehensive understanding of
how the codebase has evolved.
"""

import argparse
import json
import os
import sys
from pathlib import Path
from datetime import datetime, timedelta, timezone
from collections import defaultdict
import re
import yaml # For YAML front matter

# --- Django Setup ---
_DJANGO_SETUP_COMPLETE = False

def setup_django_env(settings_module="git_commit_viewer.settings"):
    """Initializes the Django environment."""
    global _DJANGO_SETUP_COMPLETE
    if _DJANGO_SETUP_COMPLETE:
        return

    project_root = Path(__file__).resolve().parent.parent
    if str(project_root) not in sys.path:
        sys.path.insert(0, str(project_root))

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)
    try:
        import django
        django.setup()
        _DJANGO_SETUP_COMPLETE = True
        print("Django environment initialized successfully.")
    except ImportError:
        print("Django not found or DJANGO_SETTINGS_MODULE not set correctly.", file=sys.stderr)
        print(f"Attempted to use project root: {project_root} and settings: {settings_module}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error setting up Django: {e}", file=sys.stderr)
        sys.exit(1)

# --- Model Imports (will be done inside classes/functions after setup) ---

class ConfigManager:
    def __init__(self, args):
        self.output_file = Path(args.output_file)
        self.start_date = datetime.strptime(args.start_date, '%Y-%m-%d').replace(tzinfo=timezone.utc) if args.start_date else None
        self.end_date = datetime.strptime(args.end_date, '%Y-%m-%d').replace(tzinfo=timezone.utc) if args.end_date else datetime.now(timezone.utc)
        if args.end_date and self.start_date and self.end_date < self.start_date:
            raise ValueError("End date cannot be before start date.")
        if args.end_date: # Make end_date inclusive for day by going to end of day
            self.end_date = self.end_date.replace(hour=23, minute=59, second=59, microsecond=999999)

        self.period_granularity = args.period_granularity
        self.dev_scripts_output_dir = Path(args.dev_scripts_output_dir)
        self.django_settings = args.django_settings
        self.min_activity_threshold = args.min_activity_threshold
        self.target_repository = args.target_repository

        self.output_file.parent.mkdir(parents=True, exist_ok=True)
        print(f"Configuration loaded. Output will be to: {self.output_file}")
        if self.start_date: print(f"Start date: {self.start_date.strftime('%Y-%m-%d')}")
        if self.end_date: print(f"End date: {self.end_date.strftime('%Y-%m-%d')}")


class CommitDBReader:
    def __init__(self, target_repository_name="Git-Commit-Viewer"):
        from viewer.models import Commit, Repository # Ensure Django is setup
        self.Commit = Commit
        self.Repository = Repository
        self.target_repository_name = target_repository_name
        print(f"CommitDBReader initialized to target repository: {self.target_repository_name}")

    def get_commits_in_range(self, start_date, end_date):
        print(f"Fetching commits from {start_date} to {end_date} for repository '{self.target_repository_name}'...")
        query = self.Commit.objects.all()
        try:
            target_repo = self.Repository.objects.get(name=self.target_repository_name)
            print(f"Found target repository: {target_repo.name} (ID: {target_repo.id})")
            query = query.filter(branches__repository=target_repo).distinct()
            print(f"Successfully filtered commits for repository '{self.target_repository_name}'.")
        except self.Repository.DoesNotExist:
            print(f"Warning: Target repository '{self.target_repository_name}' not found. Proceeding without repository filtering.", file=sys.stderr)
        except self.Repository.MultipleObjectsReturned:
            print(f"Warning: Multiple repositories found with name '{self.target_repository_name}'. Proceeding without repository filtering.", file=sys.stderr)
        except Exception as e:
            print(f"Warning: Error filtering by repository '{self.target_repository_name}': {e}. Proceeding without repository filtering.", file=sys.stderr)

        if start_date:
            query = query.filter(commit_date__gte=start_date)
        if end_date:
            query = query.filter(commit_date__lte=end_date)
        
        commits_qs = query.order_by('commit_date').prefetch_related('file_changes', 'tags', 'branches')
        
        commit_details_list = []
        for commit in commits_qs:
            full_msg = commit.full_message
            if hasattr(commit, 'message_chunks') and commit.message_chunks.exists():
                full_msg = "".join([chunk.content for chunk in commit.message_chunks.order_by('chunk_index')])
            details = {
                "hash": commit.hash,
                "short_message": commit.short_message,
                "full_message": full_msg,
                "commit_date_iso": commit.commit_date.isoformat(),
                "author_name": commit.author_name,
                "semantic_tags": [tag.name for tag in commit.tags.all()],
                "files_changed": [
                    {"path": fc.path, "status": fc.git_status} for fc in commit.file_changes.all()
                ]
            }
            commit_details_list.append(details)
        print(f"Fetched {len(commit_details_list)} commits.")
        return commit_details_list

class DevScriptOutputParser:
    def __init__(self, dev_scripts_output_dir):
        self.base_dir = Path(dev_scripts_output_dir)
        print(f"DevScriptOutputParser initialized for directory: {self.base_dir}")

    def _find_latest_timestamped_file(self, sub_dir_name, prefix, suffix=".json"):
        target_dir = self.base_dir / sub_dir_name
        latest_file = None
        latest_ts_obj = None
        if not target_dir.exists():
            print(f"Warning: Directory {target_dir} not found.", file=sys.stderr)
            return None
        for f_name in os.listdir(target_dir):
            if f_name.startswith(prefix) and f_name.endswith(suffix):
                try:
                    ts_part = f_name[len(prefix):-len(suffix)].lstrip("_")
                    current_ts_obj = datetime.strptime(ts_part, "%Y%m%d_%H%M%S")
                    if latest_ts_obj is None or current_ts_obj > latest_ts_obj:
                        latest_ts_obj = current_ts_obj
                        latest_file = target_dir / f_name
                except ValueError:
                    if latest_file is None or (target_dir / f_name).stat().st_mtime > latest_file.stat().st_mtime:
                        latest_file = target_dir / f_name
        if latest_file and latest_file.exists():
            print(f"Found latest file: {latest_file}")
            try:
                with open(latest_file, 'r', encoding='utf-8') as f: return json.load(f)
            except Exception as e: print(f"Error reading/parsing {latest_file}: {e}", file=sys.stderr)
        return None

    def get_latest_dependency_graph(self):
        print("Attempting to load latest dependency graph...")
        return self._find_latest_timestamped_file("dependency_graph", "dependency_graph_")

class TemporalAnalyzer:
    def __init__(self, granularity='weekly'):
        self.granularity = granularity
        print(f"TemporalAnalyzer initialized with granularity: {self.granularity}")

    def group_commits_by_period(self, commits):
        periods = defaultdict(lambda: {"commits": [], "label": "", "start_date_iso": "", "end_date_iso": ""})
        if not commits: return {}
        for commit in commits:
            commit_date_obj = datetime.fromisoformat(commit['commit_date_iso'])
            if self.granularity == 'weekly':
                period_start_date = commit_date_obj - timedelta(days=commit_date_obj.weekday())
                period_end_date = period_start_date + timedelta(days=6)
                period_key = period_start_date.strftime('%Y-%U')
                label = f"{period_start_date.strftime('%Y-%m-%d')} to {period_end_date.strftime('%Y-%m-%d')}"
            elif self.granularity == 'monthly':
                period_start_date = commit_date_obj.replace(day=1)
                next_month = period_start_date.replace(day=28) + timedelta(days=4)
                period_end_date = next_month - timedelta(days=next_month.day)
                period_key = period_start_date.strftime('%Y-%m')
                label = period_start_date.strftime('%B %Y')
            else: # daily
                period_start_date = commit_date_obj
                period_end_date = commit_date_obj # For daily, start and end are same
                period_key = period_start_date.strftime('%Y-%m-%d')
                label = period_key
            periods[period_key]["commits"].append(commit)
            periods[period_key]["label"] = label
            periods[period_key]["start_date_iso"] = period_start_date.date().isoformat()
            periods[period_key]["end_date_iso"] = period_end_date.date().isoformat()
        sorted_periods = dict(sorted(periods.items()))
        print(f"Grouped commits into {len(sorted_periods)} periods.")
        return sorted_periods

class ChangeCorrelator:
    def __init__(self, dev_script_parser):
        self.parser = dev_script_parser
        self.dependency_graph_data = self.parser.get_latest_dependency_graph()
        print("ChangeCorrelator initialized.")
        if self.dependency_graph_data: print(f"Loaded dependency graph with {len(self.dependency_graph_data.get('nodes', {}))} nodes.")
        else: print("Warning: Dependency graph data not loaded.", file=sys.stderr)

    def analyze_period_changes(self, period_commits):
        period_analysis = {
            "new_modules": set(),
            "modified_modules_details": defaultdict(lambda: {"count": 0, "commits": []}),
            "architectural_notes": [],
            "commit_details_for_period": [] # Renamed for clarity
        }
        for commit in period_commits:
            commit_data_for_ai = {
                "hash": commit["hash"],
                "short_message": commit["short_message"],
                "author": commit["author_name"],
                "date_iso": commit["commit_date_iso"][:10], # YYYY-MM-DD
                "semantic_tags": commit["semantic_tags"],
                "files_changed": commit["files_changed"] # Already a list of dicts
            }
            period_analysis["commit_details_for_period"].append(commit_data_for_ai)
            for fc in commit["files_changed"]:
                module_path_key = fc["path"].replace("/", ".").rsplit(".py", 1)[0]
                if fc["status"] == 'A': period_analysis["new_modules"].add(module_path_key)
                period_analysis["modified_modules_details"][module_path_key]["count"] += 1
                period_analysis["modified_modules_details"][module_path_key]["commits"].append(commit["hash"][:7])
        
        # Example architectural note (can be expanded)
        if self.dependency_graph_data:
            modified_this_period = set(period_analysis["modified_modules_details"].keys())
            if "viewer.models" in modified_this_period and \
               "viewer.models" in self.dependency_graph_data.get("nodes", {}) and \
               any("viewer.semantic.vector" in imp["module"] for imp in self.dependency_graph_data["nodes"]["viewer.models"]["imports"]):
                period_analysis["architectural_notes"].append({
                    "id": f"arch_note_{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S%f')}", # Unique ID
                    "text": "Core models (`viewer.models`) show interaction with the `viewer.semantic.vector` subsystem, indicating integration of vector capabilities."
                })
        return period_analysis

class SemanticAnalyzer:
    def __init__(self):
        print("SemanticAnalyzer initialized.")

    def analyze_commit_themes(self, commit_data_for_ai): # Takes the AI-formatted commit data
        themes = []
        # Use pre-processed short_message and full_message if available, otherwise just short
        short_msg = commit_data_for_ai.get('short_message', '').lower()
        # Assuming full_message might be added to commit_data_for_ai if needed by other parts
        # For now, let's assume it's not directly in commit_data_for_ai for theme analysis to keep it lean
        # If full_message is needed, it should be passed or fetched.
        # For this version, we'll rely on short_message and semantic_tags.
        
        msg_content = short_msg # Could be expanded if full_message is included
        
        if re.search(r'\bfix(es|ed)?\b|\bbug\b', msg_content): themes.append("BugFix")
        if re.search(r'\bfeat(ure)?\b|\badd(ed)?\b|\bimplement(ed)?\b', msg_content): themes.append("Feature")
        if re.search(r'\brefactor(ed)?\b|\bimprov(e|ed|ement)?\b', msg_content): themes.append("Refactor/Improvement")
        if re.search(r'\bdocs?\b|\bdocumentation\b', msg_content): themes.append("Documentation")
        if re.search(r'\btest(s|ed|ing)?\b', msg_content): themes.append("Testing")
        if re.search(r'\bvector\b|\bembed(ding)?\b', msg_content): themes.append("Vector/Embedding")
        if re.search(r'\bsemantic\b', msg_content): themes.append("Semantic Subsystem")
        if re.search(r'\bui\b|\bfrontend\b|\breact\b|\btsx\b', msg_content): themes.append("UI/Frontend")

        themes.extend(commit_data_for_ai.get("semantic_tags", []))
        unique_themes = list(set(themes))
        return unique_themes if unique_themes else ["General Update"]

class MarkdownFormatter:
    def __init__(self):
        print("MarkdownFormatter initialized.")

    def _format_json_for_ai_comment(self, data, indent=0):
        """Formats JSON data nicely within an HTML comment."""
        json_str = json.dumps(data, indent=2)
        # Indent each line of the JSON string
        indented_json_str = "\n".join(" " * indent + line for line in json_str.splitlines())
        return f"<!-- AI_DATA_START\n{indented_json_str}\n{' ' * (indent-2 if indent > 1 else 0)}AI_DATA_END -->"

    def format_narrative(self, project_name, config_start_date, config_end_date, narrative_data_by_period):
        overall_summary_data = {
            "project_name": project_name,
            "report_generation_date_iso": datetime.now(timezone.utc).isoformat(),
            "narrative_start_date_iso": config_start_date.isoformat() if config_start_date else "N/A",
            "narrative_end_date_iso": config_end_date.isoformat(),
            "total_periods_analyzed": len(narrative_data_by_period),
            "total_commits_analyzed": sum(len(p_data["analysis"]["commit_details_for_period"]) for p_data in narrative_data_by_period.values()),
            "period_summaries": []
        }

        period_lines_map = {} # Store lines for each period to sort later

        for period_key, period_data in narrative_data_by_period.items():
            period_summary_for_front_matter = {
                "period_label": period_data["label"],
                "start_date_iso": period_data["start_date_iso"],
                "end_date_iso": period_data["end_date_iso"],
                "commit_count": len(period_data["analysis"]["commit_details_for_period"]),
                "new_modules_count": len(period_data["analysis"]["new_modules"]),
                "modified_modules_count": len(period_data["analysis"]["modified_modules_details"]),
                "dominant_themes": [], # To be populated
                "architectural_note_ids": [note["id"] for note in period_data["analysis"]["architectural_notes"]]
            }
            
            current_period_lines = []
            current_period_lines.append(f"## Development Period: {period_data['label']}")
            current_period_lines.append(f"({period_data['start_date_iso']} to {period_data['end_date_iso']})\n")

            period_ai_summary = {
                "label": period_data["label"],
                "start_date_iso": period_data["start_date_iso"],
                "end_date_iso": period_data["end_date_iso"],
                "commit_count": len(period_data["analysis"]["commit_details_for_period"]),
                "new_modules": sorted(list(period_data["analysis"]["new_modules"])),
                "modified_modules": sorted([
                    {"module": mod, "commit_count": details["count"], "example_commits": details["commits"][:3]} 
                    for mod, details in period_data["analysis"]["modified_modules_details"].items()
                ], key=lambda x: x["commit_count"], reverse=True),
                "architectural_notes": period_data["analysis"]["architectural_notes"]
            }
            current_period_lines.append(self._format_json_for_ai_comment(period_ai_summary, indent=2))
            
            current_period_lines.append(f"**Total Commits:** {len(period_data['analysis']['commit_details_for_period'])}\n")

            if not period_data["analysis"]["commit_details_for_period"] and \
               not period_data["analysis"]["new_modules"] and \
               not period_data["analysis"]["modified_modules_details"]:
                current_period_lines.append("No significant tracked activity in this period.\n")
            
            if period_data["analysis"]["new_modules"]:
                current_period_lines.append(f"**New Modules Introduced:** {', '.join(sorted(list(period_data['analysis']['new_modules'])))}\n")

            if period_data["analysis"]["modified_modules_details"]:
                current_period_lines.append("**Key Modified Modules (by commit frequency):**")
                sorted_modified = sorted(period_data["analysis"]["modified_modules_details"].items(), key=lambda item: item[1]["count"], reverse=True)
                for mod, details in sorted_modified[:5]:
                    current_period_lines.append(f"- `{mod}` ({details['count']} commits)")
                if len(sorted_modified) > 5: current_period_lines.append("- ...and others.")
                current_period_lines.append("")

            if period_data["analysis"]["architectural_notes"]:
                current_period_lines.append("**Architectural Notes:**")
                for note in period_data["analysis"]["architectural_notes"]:
                    current_period_lines.append(f"<!-- AI_ARCH_NOTE_ID: {note['id']} -->")
                    current_period_lines.append(f"- {note['text']}")
                current_period_lines.append("")

            current_period_lines.append("**Commit Highlights & Themes:**")
            if not period_data["analysis"]["commit_details_for_period"]:
                 current_period_lines.append("  - No specific commit details to highlight for this period's summary.")
            
            period_themes_counter = defaultdict(int)
            # Sort commits within period by date (desc) for "recent first" within period
            sorted_commits_for_prose = sorted(period_data["analysis"]["commit_details_for_period"], key=lambda x: x['date_iso'], reverse=True)

            for commit_ai_data in sorted_commits_for_prose: # commit_ai_data already has themes
                themes = commit_ai_data.get("themes", ["General Update"]) # Themes added by SemanticAnalyzer
                for theme in themes: period_themes_counter[theme] += 1
                
                current_period_lines.append(f"- **{commit_ai_data['date_iso']} (Commit `{commit_ai_data['hash'][:7]}` by {commit_ai_data['author']})**: {commit_ai_data['short_message']}")
                current_period_lines.append(self._format_json_for_ai_comment(commit_ai_data, indent=4)) # Embed AI data for commit
                current_period_lines.append(f"  - Themes: {', '.join(themes)}")
                if commit_ai_data["files_changed"]:
                     files_summary = [f"{f['status']}: {f['path']}" for f in commit_ai_data['files_changed'][:3]]
                     current_period_lines.append(f"  - Files: {', '.join(files_summary)}{'...' if len(commit_ai_data['files_changed']) > 3 else ''}")
            
            if period_themes_counter:
                current_period_lines.append("\n**Overall Themes for Period:**")
                # AI data for period themes
                period_themes_ai_data = [{"theme": th, "count": ct} for th, ct in sorted(period_themes_counter.items(), key=lambda item: item[1], reverse=True)]
                current_period_lines.append(self._format_json_for_ai_comment({"themes_summary": period_themes_ai_data}, indent=2))
                for theme, count in sorted(period_themes_counter.items(), key=lambda item: item[1], reverse=True):
                    current_period_lines.append(f"- {theme}: {count} mentions/commits")
                # Populate for front matter
                period_summary_for_front_matter["dominant_themes"] = [item["theme"] for item in period_themes_ai_data[:3]]


            current_period_lines.append("\n---\n")
            period_lines_map[period_key] = current_period_lines
            overall_summary_data["period_summaries"].append(period_summary_for_front_matter)
        
        # Construct final lines, starting with YAML front matter
        final_lines = ["---"]
        final_lines.append(yaml.dump(overall_summary_data, sort_keys=False, allow_unicode=True).strip())
        final_lines.append("---\n")
        final_lines.append(f"# Automated Project Narrative: {project_name} (Recent Developments First)")
        final_lines.append(f"Generated on: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S %Z')}\n")

        # Add period data in reverse chronological order of periods
        for period_key in reversed(list(narrative_data_by_period.keys())): # Already sorted by TemporalAnalyzer
            final_lines.extend(period_lines_map.get(period_key, []))
            
        return "\n".join(final_lines)

def main():
    parser = argparse.ArgumentParser(description="Generates a project development narrative (v2).")
    parser.add_argument('--output-file', required=True, help='Path for the generated Markdown narrative.')
    parser.add_argument('--start-date', help='YYYY-MM-DD format to limit the narrative scope (start).')
    parser.add_argument('--end-date', help='YYYY-MM-DD format to limit the narrative scope (end). Defaults to now.')
    parser.add_argument('--period-granularity', choices=['daily', 'weekly', 'monthly'], default='weekly', help='Granularity for time periods.')
    parser.add_argument('--dev-scripts-output-dir', default='dev-support-scripts/Output/', help='Path to the base Output/ directory.')
    parser.add_argument('--django-settings', default='git_commit_viewer.settings', help='Django settings module.')
    parser.add_argument('--min-activity-threshold', type=int, default=1, help='Minimum commits for an active period.')
    parser.add_argument('--target-repository', default='Git-Commit-Viewer', help='Repository name in DB.')
    
    args = parser.parse_args()
    print("Starting Project Narrative Generator (v2)...")
    setup_django_env(args.django_settings)

    config = ConfigManager(args)
    db_reader = CommitDBReader(target_repository_name=config.target_repository)
    dev_script_parser = DevScriptOutputParser(config.dev_scripts_output_dir)
    temporal_analyzer = TemporalAnalyzer(config.period_granularity)
    change_correlator = ChangeCorrelator(dev_script_parser)
    semantic_analyzer = SemanticAnalyzer()
    markdown_formatter = MarkdownFormatter()

    all_commits = db_reader.get_commits_in_range(config.start_date, config.end_date)
    if not all_commits:
        print("No commits found. Exiting.")
        # Create minimal file if no commits
        overall_summary_data = {
            "project_name": Path.cwd().name,
            "report_generation_date_iso": datetime.now(timezone.utc).isoformat(),
            "narrative_start_date_iso": config.start_date.isoformat() if config.start_date else "N/A",
            "narrative_end_date_iso": config.end_date.isoformat(),
            "total_periods_analyzed": 0,
            "total_commits_analyzed": 0,
            "message": "No commit data found for the specified period."
        }
        final_lines = ["---"]
        final_lines.append(yaml.dump(overall_summary_data, sort_keys=False, allow_unicode=True).strip())
        final_lines.append("---\n")
        final_lines.append(f"# Automated Project Narrative: {Path.cwd().name} (Recent Developments First)")
        final_lines.append(f"Generated on: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S %Z')}\n")
        final_lines.append("No commit data found for the specified period.\n")
        with open(config.output_file, 'w', encoding='utf-8') as f:
            f.write("\n".join(final_lines))
        return

    periods_data = temporal_analyzer.group_commits_by_period(all_commits)
    narrative_data_by_period = {}
    for period_key, period_info in periods_data.items():
        print(f"Analyzing period: {period_info['label']}")
        if len(period_info["commits"]) < config.min_activity_threshold:
            print(f"Skipping period {period_info['label']} (low activity).")
            narrative_data_by_period[period_key] = {
                "label": period_info["label"],
                "start_date_iso": period_info["start_date_iso"],
                "end_date_iso": period_info["end_date_iso"],
                "analysis": {"commit_details_for_period": [], "new_modules": set(), 
                             "modified_modules_details": defaultdict(lambda: {"count": 0, "commits": []}), 
                             "architectural_notes": []}
            }
            continue
        
        # Get original commits for this period to pass to SemanticAnalyzer
        original_commits_for_period = period_info["commits"]
        
        period_analysis = change_correlator.analyze_period_changes(original_commits_for_period)
        
        # Enrich commit_details_for_period with themes
        for commit_ai_data in period_analysis["commit_details_for_period"]:
            # Find the original full commit data to pass to semantic analyzer if it needs more than what's in commit_ai_data
            original_commit = next((c for c in original_commits_for_period if c["hash"] == commit_ai_data["hash"]), None)
            if original_commit:
                 # SemanticAnalyzer now expects the AI-formatted dict, but ensure it has what it needs
                 # For this version, analyze_commit_themes uses short_message and semantic_tags from commit_ai_data
                commit_themes = semantic_analyzer.analyze_commit_themes(commit_ai_data) # Pass the AI-formatted dict
                commit_ai_data["themes"] = commit_themes
            else: # Should not happen if data is consistent
                commit_ai_data["themes"] = ["Error: Original commit not found"]

        narrative_data_by_period[period_key] = {
            "label": period_info["label"],
            "start_date_iso": period_info["start_date_iso"],
            "end_date_iso": period_info["end_date_iso"],
            "analysis": period_analysis
        }

    markdown_output = markdown_formatter.format_narrative(
        Path.cwd().name, 
        config.start_date, 
        config.end_date, 
        narrative_data_by_period
    )
    with open(config.output_file, 'w', encoding='utf-8') as f:
        f.write(markdown_output)
    print(f"Project narrative (v2) successfully generated: {config.output_file}")

if __name__ == "__main__":
    main()
