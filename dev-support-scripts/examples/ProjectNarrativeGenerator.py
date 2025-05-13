#!/usr/bin/env python3
"""
ProjectNarrativeGenerator.py

Automatically generates a chronological, fact-based narrative of a project's
development history. It synthesizes information from a structured Git commit
database (like the one used by git-commit-viewer) and outputs from various
analysis scripts (like those in dev-support-scripts) to provide a comprehensive
understanding of how the codebase has evolved.

A primary use case for this script is the self-analysis of the
git-commit-viewer project itself, aiding its own development and documentation.
"""

import argparse
import json
import os
import sys
from pathlib import Path
from datetime import datetime, timedelta, timezone
from collections import defaultdict
import re

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

        self.output_file.parent.mkdir(parents=True, exist_ok=True)
        print(f"Configuration loaded. Output will be to: {self.output_file}")
        if self.start_date: print(f"Start date: {self.start_date.strftime('%Y-%m-%d')}")
        if self.end_date: print(f"End date: {self.end_date.strftime('%Y-%m-%d')}")


class CommitDBReader:
    def __init__(self, target_repository_name="Git-Commit-Viewer"): # Default to Git-Commit-Viewer (case-sensitive match)
        from viewer.models import Commit, Repository, Branch # Ensure Django is setup
        self.Commit = Commit
        self.Repository = Repository
        self.Branch = Branch
        self.target_repository_name = target_repository_name
        print(f"CommitDBReader initialized to target repository: {self.target_repository_name}")

    def get_commits_in_range(self, start_date, end_date):
        print(f"Fetching commits from {start_date} to {end_date} for repository '{self.target_repository_name}'...")
        
        query = self.Commit.objects.all()
        
        # Attempt to filter by the target repository
        try:
            # Assuming Repository name is unique or a reliable identifier.
            target_repo = self.Repository.objects.get(name=self.target_repository_name)
            print(f"Found target repository: {target_repo.name} (ID: {target_repo.id})")
            
            # Filter commits that are associated with any of the target repository's branches
            # This assumes Commits are linked to Branches, and Branches to Repositories.
            query = query.filter(branches__repository=target_repo).distinct()
            print(f"Successfully filtered commits for repository '{self.target_repository_name}'.")
            
        except self.Repository.DoesNotExist:
            print(f"Warning: Target repository '{self.target_repository_name}' not found in the database. "
                  f"Proceeding without repository-specific filtering. Narrative may include data from other repositories if present.", 
                  file=sys.stderr)
        except self.Repository.MultipleObjectsReturned:
            print(f"Warning: Multiple repositories found with name '{self.target_repository_name}'. "
                  f"Proceeding without repository-specific filtering. Please ensure repository names are unique or use a more specific identifier.",
                  file=sys.stderr)
        except Exception as e:
            print(f"Warning: An unexpected error occurred while trying to filter by repository '{self.target_repository_name}': {e}. "
                  f"Proceeding without repository-specific filtering.", 
                  file=sys.stderr)

        if start_date:
            query = query.filter(commit_date__gte=start_date)
        if end_date:
            query = query.filter(commit_date__lte=end_date) # Use lte for inclusive end date
        
        commits_qs = query.order_by('commit_date').prefetch_related(
            'file_changes', 'tags', 'branches'
        )
        
        commit_details_list = []
        for commit in commits_qs:
            # Reassemble full_message if chunked (simplified for now)
            full_msg = commit.full_message 
            if hasattr(commit, 'message_chunks') and commit.message_chunks.exists():
                full_msg = "".join([chunk.content for chunk in commit.message_chunks.order_by('chunk_index')])

            details = {
                "hash": commit.hash,
                "short_message": commit.short_message,
                "full_message": full_msg,
                "commit_date": commit.commit_date.isoformat(), # Keep as datetime object for sorting
                "author_name": commit.author_name,
                "semantic_tags": [tag.name for tag in commit.tags.all()],
                "files_changed": [
                    {
                        "path": fc.path,
                        "status": fc.git_status,
                        "original_path": fc.original_path,
                        "extension": fc.file_extension,
                        # Diff content would be fetched here if needed, possibly from DiffChunk
                    } for fc in commit.file_changes.all()
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
            print(f"Warning: Directory {target_dir} not found for dev script outputs.", file=sys.stderr)
            return None

        for f_name in os.listdir(target_dir):
            if f_name.startswith(prefix) and f_name.endswith(suffix):
                try:
                    ts_part = f_name[len(prefix):-len(suffix)]
                    if ts_part.startswith("_"): ts_part = ts_part[1:]
                    current_ts_obj = datetime.strptime(ts_part, "%Y%m%d_%H%M%S")
                    if latest_ts_obj is None or current_ts_obj > latest_ts_obj:
                        latest_ts_obj = current_ts_obj
                        latest_file = target_dir / f_name
                except ValueError:
                    # If parsing timestamp fails, consider it based on modification time if no timestamped one found yet
                    if latest_file is None or (target_dir / f_name).stat().st_mtime > latest_file.stat().st_mtime:
                        latest_file = target_dir / f_name
        
        if latest_file and latest_file.exists():
            print(f"Found latest file: {latest_file}")
            try:
                with open(latest_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as e:
                print(f"Error reading/parsing {latest_file}: {e}", file=sys.stderr)
        elif latest_file :
             print(f"Warning: Latest file {latest_file} found but could not be read or does not exist.", file=sys.stderr)
        else:
            print(f"Warning: No '{prefix}*{suffix}' files found in {target_dir}", file=sys.stderr)
        return None

    def get_latest_dependency_graph(self):
        print("Attempting to load latest dependency graph...")
        return self._find_latest_timestamped_file("dependency_graph", "dependency_graph_")

    # Stubs for other parsers as per spec - to be implemented
    def get_latest_api_contracts(self, component_name_pattern):
        print(f"Stub: Would load API contracts for {component_name_pattern}")
        return None 
    def get_latest_docstrings(self, module_path_stem):
        print(f"Stub: Would load docstrings for {module_path_stem}")
        return None


class TemporalAnalyzer:
    def __init__(self, granularity='weekly'):
        self.granularity = granularity
        print(f"TemporalAnalyzer initialized with granularity: {self.granularity}")

    def group_commits_by_period(self, commits):
        periods = defaultdict(lambda: {"commits": [], "label": ""})
        if not commits:
            return {}

        for commit in commits:
            commit_date_obj = datetime.fromisoformat(commit['commit_date'])
            
            if self.granularity == 'weekly':
                period_start_date = commit_date_obj - timedelta(days=commit_date_obj.weekday()) # Monday
                period_end_date = period_start_date + timedelta(days=6) # Sunday
                period_key = period_start_date.strftime('%Y-%U') # Year-WeekNumber
                label = f"{period_start_date.strftime('%Y-%m-%d')} to {period_end_date.strftime('%Y-%m-%d')}"
            elif self.granularity == 'monthly':
                period_start_date = commit_date_obj.replace(day=1)
                next_month = period_start_date.replace(day=28) + timedelta(days=4) # go to next month
                period_end_date = next_month - timedelta(days=next_month.day)
                period_key = period_start_date.strftime('%Y-%m')
                label = period_start_date.strftime('%B %Y')
            else: # daily
                period_start_date = commit_date_obj
                period_key = period_start_date.strftime('%Y-%m-%d')
                label = period_key
            
            periods[period_key]["commits"].append(commit)
            periods[period_key]["label"] = label # Store label for the period
            periods[period_key]["start_date"] = period_start_date.strftime('%Y-%m-%d')
            periods[period_key]["end_date"] = period_end_date.strftime('%Y-%m-%d')


        # Sort periods by their key (which is chronological)
        sorted_periods = dict(sorted(periods.items()))
        print(f"Grouped commits into {len(sorted_periods)} periods.")
        return sorted_periods


class ChangeCorrelator:
    def __init__(self, dev_script_parser):
        self.parser = dev_script_parser
        self.dependency_graph_data = self.parser.get_latest_dependency_graph()
        # In a full version, load API contracts, docstrings etc.
        print("ChangeCorrelator initialized.")
        if self.dependency_graph_data:
            print(f"Loaded dependency graph with {len(self.dependency_graph_data.get('nodes', {}))} nodes.")
        else:
            print("Warning: Dependency graph data not loaded for ChangeCorrelator.")


    def analyze_period_changes(self, period_commits):
        period_analysis = {
            "new_modules": set(),
            "modified_modules": defaultdict(int),
            "architectural_notes": [],
            "commit_details": []
        }

        for commit in period_commits:
            commit_detail = {
                "hash": commit["hash"],
                "message": commit["short_message"],
                "author": commit["author_name"],
                "date": commit["commit_date"][:10], # YYYY-MM-DD
                "tags": commit["semantic_tags"],
                "files": []
            }
            for fc in commit["files_changed"]:
                module_path_key = fc["path"].replace("/", ".").rsplit(".py", 1)[0]
                commit_detail["files"].append(f"{fc['status']}: {fc['path']}")

                if fc["status"] == 'A':
                    period_analysis["new_modules"].add(module_path_key)
                period_analysis["modified_modules"][module_path_key] += 1
            
            period_analysis["commit_details"].append(commit_detail)

        # Example: Check if a key module (e.g., viewer.models) was modified
        if self.dependency_graph_data and "viewer.models" in period_analysis["modified_modules"]:
            if "viewer.models" in self.dependency_graph_data.get("nodes", {}):
                model_imports = [imp["module"] for imp in self.dependency_graph_data["nodes"]["viewer.models"]["imports"]]
                if "viewer.semantic.vector" in model_imports:
                     period_analysis["architectural_notes"].append(
                        "Core models (`viewer.models`) now directly integrate with the `viewer.semantic.vector` subsystem."
                    )
        return period_analysis

class SemanticAnalyzer:
    def __init__(self):
        print("SemanticAnalyzer initialized.")

    def analyze_commit_themes(self, commit):
        themes = []
        msg = commit['short_message'].lower() + " " + commit['full_message'].lower()
        
        if re.search(r'\bfix(es|ed)?\b|\bbug\b', msg): themes.append("BugFix")
        if re.search(r'\bfeat(ure)?\b|\badd(ed)?\b|\bimplement(ed)?\b', msg): themes.append("Feature")
        if re.search(r'\brefactor(ed)?\b|\bimprov(e|ed|ement)?\b', msg): themes.append("Refactor/Improvement")
        if re.search(r'\bdocs?\b|\bdocumentation\b', msg): themes.append("Documentation")
        if re.search(r'\btest(s|ed|ing)?\b', msg): themes.append("Testing")
        if re.search(r'\bvector\b|\bembed(ding)?\b', msg): themes.append("Vector/Embedding")
        if re.search(r'\bsemantic\b', msg): themes.append("Semantic Subsystem")
        if re.search(r'\bui\b|\bfrontend\b|\breact\b|\btsx\b', msg): themes.append("UI/Frontend")

        # Add semantic tags from DB
        themes.extend(commit.get("semantic_tags", []))
        
        return list(set(themes)) if themes else ["General Update"]


class MarkdownFormatter:
    def __init__(self):
        print("MarkdownFormatter initialized.")

    def format_narrative(self, project_name, chronological_data):
        lines = [f"# Automated Project Narrative: {project_name} (Recent Developments First)\n"]
        lines.append(f"Generated on: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S %Z')}\n")

        # Iterate over period keys in reverse chronological order
        for period_key in reversed(list(chronological_data.keys())):
            period_data = chronological_data[period_key]
            lines.append(f"## Development Period: {period_data['label']}\n")
            lines.append(f"({period_data['start_date']} to {period_data['end_date']})\n")
            
            period_themes = defaultdict(int)
            commit_count_in_period = len(period_data["analysis"]["commit_details"])
            lines.append(f"**Total Commits:** {commit_count_in_period}\n")

            if not period_data["analysis"]["commit_details"] and not period_data["analysis"]["new_modules"] and not period_data["analysis"]["modified_modules"]:
                lines.append("No significant tracked activity in this period.\n")
            
            if period_data["analysis"]["new_modules"]:
                lines.append(f"**New Modules Introduced:** {', '.join(sorted(list(period_data['analysis']['new_modules'])))}\n")

            if period_data["analysis"]["modified_modules"]:
                lines.append("**Key Modified Modules (by commit frequency):**")
                sorted_modified = sorted(period_data["analysis"]["modified_modules"].items(), key=lambda item: item[1], reverse=True)
                for mod, count in sorted_modified[:5]: # Top 5
                    lines.append(f"- `{mod}` ({count} commits)")
                if len(sorted_modified) > 5:
                    lines.append("- ...and others.")
                lines.append("")

            if period_data["analysis"]["architectural_notes"]:
                lines.append("**Architectural Notes:**")
                for note in period_data["analysis"]["architectural_notes"]:
                    lines.append(f"- {note}")
                lines.append("")

            lines.append("**Commit Highlights & Themes:**")
            if not period_data["analysis"]["commit_details"]:
                 lines.append("  - No specific commit details to highlight for this period's summary.")
            
            # Sort commit_details within the period to be reverse chronological if not already
            # Assuming commit_details are dictionaries with a 'date' key that is ISO format string
            sorted_commit_details = sorted(period_data["analysis"]["commit_details"], key=lambda x: x['date'], reverse=True)

            for commit_info in sorted_commit_details:
                themes = commit_info.get("themes", ["General Update"])
                for theme in themes: period_themes[theme] +=1
                lines.append(f"- **{commit_info['date']} (Commit `{commit_info['hash'][:7]}` by {commit_info['author']})**: {commit_info['message']}")
                lines.append(f"  - Themes: {', '.join(themes)}")
                if commit_info["files"]:
                     lines.append(f"  - Files: {', '.join(commit_info['files'][:3])}{'...' if len(commit_info['files']) > 3 else ''}")


            if period_themes:
                lines.append("\n**Overall Themes for Period:**")
                for theme, count in sorted(period_themes.items(), key=lambda item: item[1], reverse=True):
                    lines.append(f"- {theme}: {count} mentions/commits")
            lines.append("\n---\n")
            
        return "\n".join(lines)

# --- Main Script Logic ---
def main():
    parser = argparse.ArgumentParser(description="Generates a project development narrative.")
    parser.add_argument('--output-file', required=True, help='Path for the generated Markdown narrative.')
    parser.add_argument('--start-date', help='YYYY-MM-DD format to limit the narrative scope (start).')
    parser.add_argument('--end-date', help='YYYY-MM-DD format to limit the narrative scope (end). Defaults to now.')
    parser.add_argument('--period-granularity', choices=['daily', 'weekly', 'monthly'], default='weekly', help='Granularity for time periods.')
    parser.add_argument('--dev-scripts-output-dir', default='dev-support-scripts/Output/', help='Path to the base Output/ directory of other dev-support scripts.')
    parser.add_argument('--django-settings', default='git_commit_viewer.settings', help='Django settings module.')
    parser.add_argument('--min-activity-threshold', type=int, default=1, help='Minimum number of commits to consider a period active.')
    parser.add_argument('--target-repository', default='Git-Commit-Viewer', help='Name of the repository in the DB to analyze.')
    
    args = parser.parse_args()

    print("Starting Project Narrative Generator...")
    
    # Setup Django
    setup_django_env(args.django_settings)

    # Initialize components
    config = ConfigManager(args)
    db_reader = CommitDBReader(target_repository_name=args.target_repository)
    dev_script_parser = DevScriptOutputParser(config.dev_scripts_output_dir)
    temporal_analyzer = TemporalAnalyzer(config.period_granularity)
    change_correlator = ChangeCorrelator(dev_script_parser) # Pass parser
    semantic_analyzer = SemanticAnalyzer()
    markdown_formatter = MarkdownFormatter()

    # 1. Fetch commit data
    all_commits = db_reader.get_commits_in_range(config.start_date, config.end_date)
    if not all_commits:
        print("No commits found in the specified date range. Exiting.")
        with open(config.output_file, 'w', encoding='utf-8') as f:
            f.write(f"# Project Narrative for {Path.cwd().name}\n\n")
            f.write(f"Generated on: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S %Z')}\n\n")
            f.write("No commit data found for the specified period.\n")
        return

    # 2. Group commits by period
    periods_data = temporal_analyzer.group_commits_by_period(all_commits)
    
    # 3. Analyze changes and correlate for each period
    narrative_data_by_period = {}
    for period_key, period_info in periods_data.items():
        print(f"Analyzing period: {period_info['label']}")
        if len(period_info["commits"]) < config.min_activity_threshold:
            print(f"Skipping period {period_info['label']} due to low activity ({len(period_info['commits'])} commits).")
            # Still create an entry so it can be noted as low activity
            narrative_data_by_period[period_key] = {
                "label": period_info["label"],
                "start_date": period_info["start_date"],
                "end_date": period_info["end_date"],
                "analysis": {"commit_details": [], "new_modules": set(), "modified_modules": defaultdict(int), "architectural_notes": []}
            }
            continue

        # Correlate changes within the period
        period_analysis = change_correlator.analyze_period_changes(period_info["commits"])
        
        # Semantic analysis for each commit in the period
        for commit_data in period_analysis["commit_details"]: # Use details from correlator
            commit_themes = semantic_analyzer.analyze_commit_themes(
                next(c for c in period_info["commits"] if c["hash"] == commit_data["hash"]) # Find original commit for full message
            )
            commit_data["themes"] = commit_themes
            
        narrative_data_by_period[period_key] = {
            "label": period_info["label"],
            "start_date": period_info["start_date"],
            "end_date": period_info["end_date"],
            "analysis": period_analysis
        }

    # 4. Format into Markdown
    project_name = Path.cwd().name # Or get from settings/config
    markdown_output = markdown_formatter.format_narrative(project_name, narrative_data_by_period)

    # 5. Write to output file
    with open(config.output_file, 'w', encoding='utf-8') as f:
        f.write(markdown_output)
    
    print(f"Project narrative successfully generated: {config.output_file}")

if __name__ == "__main__":
    main()
