---
project_name: git-commit-viewer
report_generation_date_iso: '2025-05-12T11:10:07.908693+00:00'
narrative_start_date_iso: N/A
narrative_end_date_iso: '2025-05-12T11:10:07.716267+00:00'
total_periods_analyzed: 4
total_commits_analyzed: 522
period_summaries:
- period_label: 2025-04-21 to 2025-04-27
  start_date_iso: '2025-04-21'
  end_date_iso: '2025-04-27'
  commit_count: 76
  new_modules_count: 1
  modified_modules_count: 32
  dominant_themes:
  - General Update
  - BugFix
  - Feature
  architectural_note_ids:
  - arch_note_20250512111007903895
- period_label: 2025-04-28 to 2025-05-04
  start_date_iso: '2025-04-28'
  end_date_iso: '2025-05-04'
  commit_count: 320
  new_modules_count: 26
  modified_modules_count: 257
  dominant_themes:
  - Feature
  - Documentation
  - Vector/Embedding
  architectural_note_ids:
  - arch_note_20250512111007904980
- period_label: 2025-05-05 to 2025-05-11
  start_date_iso: '2025-05-05'
  end_date_iso: '2025-05-11'
  commit_count: 125
  new_modules_count: 24
  modified_modules_count: 318
  dominant_themes:
  - Testing
  - Feature
  - Vector/Embedding
  architectural_note_ids:
  - arch_note_20250512111007907766
- period_label: 2025-05-12 to 2025-05-18
  start_date_iso: '2025-05-12'
  end_date_iso: '2025-05-18'
  commit_count: 1
  new_modules_count: 0
  modified_modules_count: 6
  dominant_themes:
  - General Update
  architectural_note_ids: []
---

# Automated Project Narrative: git-commit-viewer (Recent Developments First)
Generated on: 2025-05-12 11:10:07 UTC

## Development Period: 2025-05-12 to 2025-05-18
(2025-05-12 to 2025-05-18)

<!-- AI_DATA_START
  {
    "label": "2025-05-12 to 2025-05-18",
    "start_date_iso": "2025-05-12",
    "end_date_iso": "2025-05-18",
    "commit_count": 1,
    "new_modules": [],
    "modified_modules": [
      {
        "module": "documentation.Automated_Narrative_GCV_Corrected_20250512_072053.md",
        "commit_count": 1,
        "example_commits": [
          "9dbea84"
        ]
      },
      {
        "module": "documentation.May 12 Documentation-Review-and-Update-Plan.md",
        "commit_count": 1,
        "example_commits": [
          "9dbea84"
        ]
      },
      {
        "module": "documentation.May 12 Establishment of Current PGVector Status.md",
        "commit_count": 1,
        "example_commits": [
          "9dbea84"
        ]
      },
      {
        "module": "documentation.May 12 Eval of Project Narrative Generator.md",
        "commit_count": 1,
        "example_commits": [
          "9dbea84"
        ]
      },
      {
        "module": "documentation.May 12 ProjectNarrativeGenerator Spec.md",
        "commit_count": 1,
        "example_commits": [
          "9dbea84"
        ]
      },
      {
        "module": "documentation.Project Dev Narrative to Date.md",
        "commit_count": 1,
        "example_commits": [
          "9dbea84"
        ]
      }
    ],
    "architectural_notes": []
  }
AI_DATA_END -->
**Total Commits:** 1

**Key Modified Modules (by commit frequency):**
- `documentation.Automated_Narrative_GCV_Corrected_20250512_072053.md` (1 commits)
- `documentation.May 12 Documentation-Review-and-Update-Plan.md` (1 commits)
- `documentation.May 12 Establishment of Current PGVector Status.md` (1 commits)
- `documentation.May 12 Eval of Project Narrative Generator.md` (1 commits)
- `documentation.May 12 ProjectNarrativeGenerator Spec.md` (1 commits)
- ...and others.

**Commit Highlights & Themes:**
- **2025-05-12 (Commit `9dbea84` by David Ryan)**: group project-narrative-generator files into eponymous dir
<!-- AI_DATA_START
    {
      "hash": "9dbea843349a2419ad4346dd30de6439a699a1e3",
      "short_message": "group project-narrative-generator files into eponymous dir",
      "author": "David Ryan",
      "date_iso": "2025-05-12",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Automated_Narrative_GCV_Corrected_20250512_072053.md",
          "status": "R"
        },
        {
          "path": "documentation/May 12 Documentation-Review-and-Update-Plan.md",
          "status": "R"
        },
        {
          "path": "documentation/May 12 Establishment of Current PGVector Status.md",
          "status": "R"
        },
        {
          "path": "documentation/May 12 Eval of Project Narrative Generator.md",
          "status": "R"
        },
        {
          "path": "documentation/May 12 ProjectNarrativeGenerator Spec.md",
          "status": "R"
        },
        {
          "path": "documentation/Project Dev Narrative to Date.md",
          "status": "R"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: R: documentation/Automated_Narrative_GCV_Corrected_20250512_072053.md, R: documentation/May 12 Documentation-Review-and-Update-Plan.md, R: documentation/May 12 Establishment of Current PGVector Status.md...

**Overall Themes for Period:**
<!-- AI_DATA_START
  {
    "themes_summary": [
      {
        "theme": "General Update",
        "count": 1
      }
    ]
  }
AI_DATA_END -->
- General Update: 1 mentions/commits

---

## Development Period: 2025-05-05 to 2025-05-11
(2025-05-05 to 2025-05-11)

<!-- AI_DATA_START
  {
    "label": "2025-05-05 to 2025-05-11",
    "start_date_iso": "2025-05-05",
    "end_date_iso": "2025-05-11",
    "commit_count": 125,
    "new_modules": [
      "Output.mock_paths.vector_call_data.json",
      "Output.test_alignment.vector_alignment_report.txt",
      "Output.test_alignment.vector_impl_analysis.json",
      "Output.test_alignment.vector_test_analysis.json",
      "dev-support-scripts.Output.git_commit_viewer_tree.txt",
      "dev-support-scripts.Output.tests_tree.txt",
      "dev-support-scripts.Output.viewer_tree.txt",
      "dev-support-scripts.apply-multiple-diffs.test_samples.backup_20250509_074209.test_context_flow_sample",
      "dev-support-scripts.apply-multiple-diffs.test_samples.backup_20250509_074432.test_context_flow_sample",
      "dev-support-scripts.apply-multiple-diffs.test_samples.backup_20250509_075933.test_context_flow_sample",
      "dev-support-scripts.apply-multiple-diffs.test_samples.backup_20250509_080106.test_context_flow_sample",
      "documentation.Vector-Interface README.md",
      "documentation.Vector-Interface-Migration-Guide.md",
      "programming_scripts.macos_apply_diff",
      "programming_scripts.simple_apply_diff",
      "pytest_integration_results.txt",
      "pytest_results.txt",
      "pytest_results_2025-05-10_23-37-24.txt",
      "pytest_results_20250511_073004.txt",
      "test_diff.txt",
      "test_file.txt",
      "tests.unit.semantic.vector.test_capability_negotiation",
      "tests.unit.semantic.vector.test_independence",
      "theory-and-planning.May 11 Tests analysis and Attempted Fixes.May 11 Failing Tests Analysis and Fix Attempts.md"
    ],
    "modified_modules": [
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations",
        "commit_count": 20,
        "example_commits": [
          "8222cd2",
          "f0318f0",
          "f0318f0"
        ]
      },
      {
        "module": "tests.unit.semantic.vector.test_error_recovery",
        "commit_count": 19,
        "example_commits": [
          "9b448e4",
          "4499472",
          "e435a63"
        ]
      },
      {
        "module": "theory-and-planning.Vector System Test Refactoring 3 May 6.Vector-Test-Refactoring-Plan-Revised.md",
        "commit_count": 16,
        "example_commits": [
          "6376193",
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "tests.unit.semantic.vector.test_contract",
        "commit_count": 10,
        "example_commits": [
          "c5ce8fc",
          "bfd3218",
          "40202d7"
        ]
      },
      {
        "module": "tests.integration.test_context_flow",
        "commit_count": 8,
        "example_commits": [
          "d7775a7",
          "700ba55",
          "55e4f71"
        ]
      },
      {
        "module": "theory-and-planning.May-5-Vector-System-Testing.May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md",
        "commit_count": 8,
        "example_commits": [
          "cd86e11",
          "1dd1077",
          "e679399"
        ]
      },
      {
        "module": "theory-and-planning.May-5-Vector-System-Testing.May-5-Vector-Interface-Utils-Refactoring-Plan.md",
        "commit_count": 7,
        "example_commits": [
          "4dbe29d",
          "769f58e",
          "9e48350"
        ]
      },
      {
        "module": "tests.unit.semantic.vector.test_independence",
        "commit_count": 7,
        "example_commits": [
          "411a510",
          "2bdfedc",
          "6b2c2b0"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.2. For dimension mismatches.md",
        "commit_count": 7,
        "example_commits": [
          "ccd49db",
          "f0318f0",
          "6725f12"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.Start Here - May 11 Insights for Continued Refactoring of Tests.md",
        "commit_count": 7,
        "example_commits": [
          "ccd49db",
          "c41b35d",
          "8222cd2"
        ]
      },
      {
        "module": "tests.unit.semantic.vector.test_utils",
        "commit_count": 6,
        "example_commits": [
          "7c4e8c3",
          "1dd1077",
          "e36c79d"
        ]
      },
      {
        "module": "tests.integration.test_cross_backend_consistency",
        "commit_count": 6,
        "example_commits": [
          "65e33d9",
          "f0318f0",
          "5d104e9"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.README.md",
        "commit_count": 5,
        "example_commits": [
          "d4eb272",
          "75c342d",
          "b48e570"
        ]
      },
      {
        "module": "theory-and-planning.May 10 Vector Subsystem Tests Phase 4.May 10 Foundations of Mutations for Vector Tests.md",
        "commit_count": 5,
        "example_commits": [
          "cb080af",
          "edcd02d",
          "6aab615"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.1. For PostgreSQL connection issues.md",
        "commit_count": 5,
        "example_commits": [
          "ccd49db",
          "f0318f0",
          "d5904af"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.3.  For registry context awareness.md",
        "commit_count": 5,
        "example_commits": [
          "ccd49db",
          "e40deac",
          "842c184"
        ]
      },
      {
        "module": "tests.unit.semantic.vector.test_capability_negotiation",
        "commit_count": 4,
        "example_commits": [
          "6d8e204",
          "6d3403c",
          "c844aa9"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.real_mutations.may-09-2025-vector_test_refactoring_mutations.yaml",
        "commit_count": 4,
        "example_commits": [
          "b48e570",
          "6cc8e6f",
          "55e4f71"
        ]
      },
      {
        "module": "theory-and-planning.May 10 Vector System Testing Phase 5.Analysis of Failing Tests.md",
        "commit_count": 4,
        "example_commits": [
          "7cf31a4",
          "739ba03",
          "96b5029"
        ]
      },
      {
        "module": "theory-and-planning.May-5-Vector-System-Testing.May-5-Vector-Interface-Context.md",
        "commit_count": 3,
        "example_commits": [
          "9c6f8d2",
          "f7b86a0",
          "7698f87"
        ]
      },
      {
        "module": "tests.integration.test_vector_fields",
        "commit_count": 3,
        "example_commits": [
          "00416cb",
          "fbb466c",
          "81c9db0"
        ]
      },
      {
        "module": "tests.conftest",
        "commit_count": 3,
        "example_commits": [
          "fc6a49a",
          "5258710",
          "8c58876"
        ]
      },
      {
        "module": ".gitignore",
        "commit_count": 3,
        "example_commits": [
          "313c60b",
          "67038c9",
          "b1c96ee"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.README.md",
        "commit_count": 3,
        "example_commits": [
          "8e0ca4b",
          "a5dec2a",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.mock_access_path_analyzer",
        "commit_count": 3,
        "example_commits": [
          "8e0ca4b",
          "342160c",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.test_implementation_analyzer",
        "commit_count": 3,
        "example_commits": [
          "8e0ca4b",
          "fa939a4",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Vector System Test Refactoring 3 May 6.May 6 Handoff - Vector System Test Refactoring.md",
        "commit_count": 3,
        "example_commits": [
          "6376193",
          "55e4f71",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.macos_apply_multi_mutation_diffs",
        "commit_count": 3,
        "example_commits": [
          "d4eb272",
          "75c342d",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.test_samples.test_apply_mutations.sh",
        "commit_count": 3,
        "example_commits": [
          "d4eb272",
          "75c342d",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Vector System Test Refactoring Progress May 9.md",
        "commit_count": 3,
        "example_commits": [
          "55e4f71",
          "d46bf20",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analysis and Attempted Fixes.May 11 Failing Tests Analysis and Fix Attempts.md",
        "commit_count": 3,
        "example_commits": [
          "739ba03",
          "96b5029",
          "ccd49db"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.Systematic Method for Vector System Test Refactoring.md",
        "commit_count": 3,
        "example_commits": [
          "7279a89",
          "e40deac",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.Remaining Test Issues - May 11.md",
        "commit_count": 3,
        "example_commits": [
          "68b834b",
          "0d726ce",
          "7698f87"
        ]
      },
      {
        "module": "viewer.semantic.vector.backends.postgresql",
        "commit_count": 2,
        "example_commits": [
          "9e48350",
          "d5904af"
        ]
      },
      {
        "module": "viewer.semantic.registry",
        "commit_count": 2,
        "example_commits": [
          "2698f9f",
          "6e7fadb"
        ]
      },
      {
        "module": "theory-and-planning.May-5-Vector-System-Testing.Context-and-Knowledge-for-Vector-System-Testing-Update.md",
        "commit_count": 2,
        "example_commits": [
          "ad1cc18",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May-5-Vector-System-Testing.May-5-Vector-Interface-Context-Update.md",
        "commit_count": 2,
        "example_commits": [
          "ad1cc18",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May-5-Vector-System-Testing.May-5-Vector-Interface-Test-Implementation-Plan.md",
        "commit_count": 2,
        "example_commits": [
          "22314c4",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.api_contract_analyzer",
        "commit_count": 2,
        "example_commits": [
          "8e0ca4b",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.change_impact_analyzer",
        "commit_count": 2,
        "example_commits": [
          "8e0ca4b",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.dependency_graph_generator",
        "commit_count": 2,
        "example_commits": [
          "8e0ca4b",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.extract_docstrings",
        "commit_count": 2,
        "example_commits": [
          "8e0ca4b",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.generate_tree_view",
        "commit_count": 2,
        "example_commits": [
          "8e0ca4b",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.test_coverage_analyzer",
        "commit_count": 2,
        "example_commits": [
          "8e0ca4b",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Vector System Test Refactoring 3 May 6.enhanced_apply_diff",
        "commit_count": 2,
        "example_commits": [
          "f395b79",
          "7698f87"
        ]
      },
      {
        "module": "programming_scripts.simple_apply_diff",
        "commit_count": 2,
        "example_commits": [
          "6376193",
          "75c342d"
        ]
      },
      {
        "module": "theory-and-planning.Vector System Test Refactoring 3 May 6.Vector-Test-Refactoring-Plan.md",
        "commit_count": 2,
        "example_commits": [
          "6376193",
          "7698f87"
        ]
      },
      {
        "module": "programming_scripts.macos_apply_diff",
        "commit_count": 2,
        "example_commits": [
          "f36ac77",
          "75c342d"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.test_samples.README.md",
        "commit_count": 2,
        "example_commits": [
          "d4eb272",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.test_samples.test_context_flow_sample",
        "commit_count": 2,
        "example_commits": [
          "d4eb272",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.test_samples.vector_test_mutations.yaml",
        "commit_count": 2,
        "example_commits": [
          "d4eb272",
          "c311fd2"
        ]
      },
      {
        "module": "test_diff.txt",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "c311fd2"
        ]
      },
      {
        "module": "test_file.txt",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Add Sophisticated AI-RAG Capabilities to Django Projects.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "theory-and-planning.Augmented Retrieval- A New Dimension for Any Django Project.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "theory-and-planning.Essential Files for Comprehensive Understanding Vector Interface Testing.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.File-System-Models.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "theory-and-planning.For Review- Specialized Chunking Strategies and Linguistic Backends for Git-Viewer and Beyond.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "theory-and-planning.Leveraging Vector Semantics for Curriculum Development.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "theory-and-planning.Leveraging Vector Semantics for Document-Enhanced Learning.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "theory-and-planning.Linguistics interface and prompt embedding.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "theory-and-planning.May 9 Final Yard for Extending Embedding Architecture.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Optimal Chunking Backends & Linguistic Parsing for Educational Content.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "theory-and-planning.Prompt Composition Pipeline- Leveraging the Framework for LLM Integration.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "theory-and-planning.Prompt Expansion as Semantic Enrichment with Linguistics Interface.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "theory-and-planning.Query Embedding for Semantic Search.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "theory-and-planning.Retrieval coordination layer.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "theory-and-planning.School Teaching & Learning App.md",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "f0e5283"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.requirements-apply-diff.txt",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Vector System Test Refactoring 3 May 6.test_diff.txt",
        "commit_count": 2,
        "example_commits": [
          "75c342d",
          "7698f87"
        ]
      },
      {
        "module": "pytest_integration_results.txt",
        "commit_count": 2,
        "example_commits": [
          "55e4f71",
          "c311fd2"
        ]
      },
      {
        "module": "pytest_results.txt",
        "commit_count": 2,
        "example_commits": [
          "55e4f71",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.real_mutations.may-09-2025-vector_test_refactoring-dry-run-results.json",
        "commit_count": 2,
        "example_commits": [
          "55e4f71",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.real_mutations.may-09-2025-vector_test_refactoring-results.json",
        "commit_count": 2,
        "example_commits": [
          "55e4f71",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.test_samples.backup_20250509_074209.test_context_flow_sample",
        "commit_count": 2,
        "example_commits": [
          "55e4f71",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.test_samples.backup_20250509_074432.test_context_flow_sample",
        "commit_count": 2,
        "example_commits": [
          "55e4f71",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.test_samples.backup_20250509_075933.test_context_flow_sample",
        "commit_count": 2,
        "example_commits": [
          "55e4f71",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.Support-Scripts.apply-multiple-diffs.test_samples.backup_20250509_080106.test_context_flow_sample",
        "commit_count": 2,
        "example_commits": [
          "55e4f71",
          "c311fd2"
        ]
      },
      {
        "module": "theory-and-planning.May 10 Vector Subsystem Tests Phase 4.May 10 Vector Tests Status.md",
        "commit_count": 2,
        "example_commits": [
          "145ab4b",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 10 Vector Subsystem Tests Phase 4.Vector Implementation Forensic Analysis.md",
        "commit_count": 2,
        "example_commits": [
          "cb080af",
          "7698f87"
        ]
      },
      {
        "module": "Output.mock_paths.vector_call_data.json",
        "commit_count": 2,
        "example_commits": [
          "edcd02d",
          "c311fd2"
        ]
      },
      {
        "module": "Output.mock_paths.vector_mock_paths.txt",
        "commit_count": 2,
        "example_commits": [
          "edcd02d",
          "c311fd2"
        ]
      },
      {
        "module": "Output.test_alignment.vector_alignment_report.txt",
        "commit_count": 2,
        "example_commits": [
          "edcd02d",
          "c311fd2"
        ]
      },
      {
        "module": "Output.test_alignment.vector_impl_analysis.json",
        "commit_count": 2,
        "example_commits": [
          "edcd02d",
          "c311fd2"
        ]
      },
      {
        "module": "Output.test_alignment.vector_test_analysis.json",
        "commit_count": 2,
        "example_commits": [
          "edcd02d",
          "c311fd2"
        ]
      },
      {
        "module": "viewer.semantic.vector.README.md",
        "commit_count": 2,
        "example_commits": [
          "a3127c0",
          "5de7e07"
        ]
      },
      {
        "module": "README_AI.md",
        "commit_count": 2,
        "example_commits": [
          "c311fd2",
          "03f2ed4"
        ]
      },
      {
        "module": "dev-support-scripts.Output.dependency_graph.critical_path_components.json",
        "commit_count": 2,
        "example_commits": [
          "c311fd2",
          "afc504f"
        ]
      },
      {
        "module": "dev-support-scripts.Output.dependency_graph.dependency_graph.json",
        "commit_count": 2,
        "example_commits": [
          "c311fd2",
          "afc504f"
        ]
      },
      {
        "module": "dev-support-scripts.Output.dependency_graph.dependency_overview.txt",
        "commit_count": 2,
        "example_commits": [
          "c311fd2",
          "afc504f"
        ]
      },
      {
        "module": "dev-support-scripts.Output.dependency_graph.subsystem_boundaries.json",
        "commit_count": 2,
        "example_commits": [
          "c311fd2",
          "afc504f"
        ]
      },
      {
        "module": "dev-support-scripts.Output.git_commit_viewer_tree.txt",
        "commit_count": 2,
        "example_commits": [
          "c311fd2",
          "739ba03"
        ]
      },
      {
        "module": "dev-support-scripts.Output.impact_analysis.modules_baseline.json",
        "commit_count": 2,
        "example_commits": [
          "c311fd2",
          "7cf31a4"
        ]
      },
      {
        "module": "dev-support-scripts.Output.impact_analysis.tests_baseline.json",
        "commit_count": 2,
        "example_commits": [
          "c311fd2",
          "7cf31a4"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests_tree.txt",
        "commit_count": 2,
        "example_commits": [
          "c311fd2",
          "739ba03"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer_tree.txt",
        "commit_count": 2,
        "example_commits": [
          "c311fd2",
          "739ba03"
        ]
      },
      {
        "module": "theory-and-planning.old may 4 readme vector-Interface.md",
        "commit_count": 2,
        "example_commits": [
          "c311fd2",
          "7698f87"
        ]
      },
      {
        "module": "dev-support-scripts.generate_tree_view",
        "commit_count": 2,
        "example_commits": [
          "ad3d3f3",
          "03f2ed4"
        ]
      },
      {
        "module": "pytest_results_2025-05-10_23-37-24.txt",
        "commit_count": 2,
        "example_commits": [
          "7cf31a4",
          "7698f87"
        ]
      },
      {
        "module": "pytest_results_20250511_073004.txt",
        "commit_count": 2,
        "example_commits": [
          "ccd49db",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.4. For context property issues.md",
        "commit_count": 2,
        "example_commits": [
          "ccd49db",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.Process for Evaluating Mutation Success after each phase 1-4.md",
        "commit_count": 2,
        "example_commits": [
          "7279a89",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.May 11 Vector Dimension Mismatches Remedied.md",
        "commit_count": 2,
        "example_commits": [
          "0e8c1e8",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.May 11 Fix String Concatenation.md",
        "commit_count": 2,
        "example_commits": [
          "259b3c5",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.Safe String Utility.md",
        "commit_count": 2,
        "example_commits": [
          "259b3c5",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.PostgreSQL Connection Issues Remedied.md",
        "commit_count": 2,
        "example_commits": [
          "c1a7083",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.May 11 installing and enforcing flake8-implicit-str-concat.md",
        "commit_count": 2,
        "example_commits": [
          "0d726ce",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.Fixed_Context_Flow_Tests",
        "commit_count": 2,
        "example_commits": [
          "1b1ed77",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.May 11 Technical Evaluation of SafeString Solution Based on Test Output Evidence.md",
        "commit_count": 2,
        "example_commits": [
          "1b1ed77",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.SafeString Utility Implementation",
        "commit_count": 2,
        "example_commits": [
          "1b1ed77",
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 11 Tests analyses and Proposed Mutations.SafeString_Utility",
        "commit_count": 2,
        "example_commits": [
          "1b1ed77",
          "7698f87"
        ]
      },
      {
        "module": "dev-support-scripts.dependency_graph_generator",
        "commit_count": 2,
        "example_commits": [
          "afc504f",
          "c3473ac"
        ]
      },
      {
        "module": "documentation.Project Dev Narrative to Date.md",
        "commit_count": 2,
        "example_commits": [
          "afc504f",
          "020da00"
        ]
      },
      {
        "module": "viewer.semantic.vector.utils",
        "commit_count": 1,
        "example_commits": [
          "f7b86a0"
        ]
      },
      {
        "module": "viewer.semantic.vector.__init__",
        "commit_count": 1,
        "example_commits": [
          "4dbe29d"
        ]
      },
      {
        "module": "viewer.semantic.vector.service",
        "commit_count": 1,
        "example_commits": [
          "769f58e"
        ]
      },
      {
        "module": "viewer.semantic.vector.backends.memory",
        "commit_count": 1,
        "example_commits": [
          "05a8982"
        ]
      },
      {
        "module": "viewer.semantic.vector.fields",
        "commit_count": 1,
        "example_commits": [
          "6994f1a"
        ]
      },
      {
        "module": "theory-and-planning.Second Stage Further Features.May 6 Future Looking Next-Gen Rag Elements.md",
        "commit_count": 1,
        "example_commits": [
          "bfd3218"
        ]
      },
      {
        "module": "theory-and-planning.Vector Interface.Vector Interface Integration Status 3.md",
        "commit_count": 1,
        "example_commits": [
          "75c342d"
        ]
      },
      {
        "module": "theory-and-planning.# Next Steps for Capability Negotiation .md",
        "commit_count": 1,
        "example_commits": [
          "f0e5283"
        ]
      },
      {
        "module": "documentation.Vector-Interface-Migration-Guide.md",
        "commit_count": 1,
        "example_commits": [
          "5de7e07"
        ]
      },
      {
        "module": "dev-support-scripts.Output.api_contracts.vector_interface_contracts.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.api_contracts.vector_interface_summary.txt",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.git_commit_viewer.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.git_commit_viewer.asgi_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.git_commit_viewer.settings_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.git_commit_viewer.urls_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.git_commit_viewer.wsgi_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.impact_analysis.actionable_steps.md",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.impact_analysis.entry_points.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.impact_analysis.impact_details.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.impact_analysis.impact_summary.txt",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.impact_analysis.utils_actions.md",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.mock_paths.semantic_call_data.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.mock_paths.semantic_mock_paths.txt",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.mock_paths.vector_call_data.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.test_alignment.vector_alignment_report.txt",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.test_alignment.vector_impl_analysis.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.test_alignment.vector_test_analysis.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.test_coverage.test_coverage_overview.txt",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.test_coverage.test_coverage_summary.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.conftest_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.integration.test_capability_negotiation_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.integration.test_context_flow_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.integration.test_contexts_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.integration.test_cross_backend_consistency_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.integration.test_embedding_integration_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.integration.test_initialization_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.integration.test_metadata_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.integration.test_vector_fields_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.package.test_independence_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.unit.semantic.linguistic.test_registry_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.unit.semantic.vector.test_capability_negotiation_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.unit.semantic.vector.test_contract_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.unit.semantic.vector.test_error_recovery_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.unit.semantic.vector.test_independence_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.tests.unit.semantic.vector.test_utils_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.admin_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.apps_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.management.commands.add_self_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.management.commands.clear_data_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.management.commands.evaluate_semantic_search_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.management.commands.generate_commit_tags_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.management.commands.generate_embeddings_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.management.commands.import_tag_taxonomy_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.management.commands.manage_tag_dictionary_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.management.commands.populate_self_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.management.commands.process_linguistic_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.management.commands.semantic_search_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.management.commands.sync_vector_dimensions_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.management.commands.test_dimension_fix_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.migrations.0001_initial_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.migrations.0002_commit_files_changed_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.migrations.0003_remove_commit_branch_commit_branches_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.migrations.0004_alter_commit_commit_date_filechange_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.migrations.0005_repository_last_fetched_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.migrations.0006_install_pgvector_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.migrations.0007_commitmessagechunk_diffchunk_commit_author_email_and_more_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.migrations.0008_remove_filechange_viewer_file_path_74026f_idx_and_more_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.migrations.0009_embeddingprovider_alter_branch_options_and_more_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.migrations.0010_alter_commit_message_embedding_and_more_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.migrations.0011_tagdictionary_canonicaltag_alter_commit_tags_and_more_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.migrations.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.models_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.models_tagging_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.apps_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.context_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.expressions_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.fields_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.indexes_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.lookups_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.management.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.management.commands.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.management.commands.install_pgvector_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.registry_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.service_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.tests.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.pgvector.tests.test_fields_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.adapters_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.chunking.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.chunking.adapters_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.chunking.base_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.chunking.linguistic_strategy_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.chunking.paragraph_strategy_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.chunking.registry_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.chunking.service_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.chunking.token_strategy_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.context_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.decorators_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.fields_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.linguistic.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.linguistic.backends.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.linguistic.backends.spacy_processor_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.linguistic.boundary_provider_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.linguistic.interfaces_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.linguistic.models_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.linguistic.registry_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.linguistic.service_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.linguistic.strategies_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.managers_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.mixins_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.registry_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.tagging.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.tagging.adapters_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.tagging.base_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.tagging.chain_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.tagging.linguistic_strategy_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.tagging.pattern_strategy_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.tagging.registry_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.tagging.service_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.vector.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.vector.backends.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.vector.backends.memory_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.vector.backends.postgresql_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.vector.fields_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.vector.interfaces_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.vector.models_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.vector.registry_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.vector.service_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.semantic.vector.utils_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.services.__init___docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.services.chunkers_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.services.embedder_registry_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.services.embedders_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.services.embedding_processor_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.services.nlp_service_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.services.repository_processor_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.services.search_service_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.services.tag_normalization_service_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.tests_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.urls_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.Output.viewer.views_docstrings.json",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "documentation.May 1 Update Repository command.md",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "documentation.Project Files.md",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "documentation.Tag-System-README.md",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "documentation.Vector-Interface README.md",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "documentation.Vector-Interface.md",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "vector-interface-migration-plan.md",
        "commit_count": 1,
        "example_commits": [
          "c311fd2"
        ]
      },
      {
        "module": "dev-support-scripts.extract_docstrings",
        "commit_count": 1,
        "example_commits": [
          "d1bd648"
        ]
      },
      {
        "module": "viewer.models",
        "commit_count": 1,
        "example_commits": [
          "37b312a"
        ]
      },
      {
        "module": "tests.unit.semantic.vector.test_vector_capability_negotiation",
        "commit_count": 1,
        "example_commits": [
          "6ecdd32"
        ]
      },
      {
        "module": "tests.unit.semantic.vector.test_vector_independence",
        "commit_count": 1,
        "example_commits": [
          "6ecdd32"
        ]
      },
      {
        "module": "dev-support-scripts.apply-multiple-diffs.test_samples.test_context_flow_sample",
        "commit_count": 1,
        "example_commits": [
          "7cf31a4"
        ]
      },
      {
        "module": "viewer.pgvector.tests.test_fields",
        "commit_count": 1,
        "example_commits": [
          "7cf31a4"
        ]
      },
      {
        "module": "dev-support-scripts.apply-multiple-diffs.test_samples.backup_20250509_074209.test_context_flow_sample",
        "commit_count": 1,
        "example_commits": [
          "739ba03"
        ]
      },
      {
        "module": "dev-support-scripts.apply-multiple-diffs.test_samples.backup_20250509_074432.test_context_flow_sample",
        "commit_count": 1,
        "example_commits": [
          "739ba03"
        ]
      },
      {
        "module": "dev-support-scripts.apply-multiple-diffs.test_samples.backup_20250509_075933.test_context_flow_sample",
        "commit_count": 1,
        "example_commits": [
          "739ba03"
        ]
      },
      {
        "module": "dev-support-scripts.apply-multiple-diffs.test_samples.backup_20250509_080106.test_context_flow_sample",
        "commit_count": 1,
        "example_commits": [
          "739ba03"
        ]
      },
      {
        "module": "viewer.semantic.vector.models",
        "commit_count": 1,
        "example_commits": [
          "8a1efb3"
        ]
      },
      {
        "module": "theory-and-planning.Front End User Interface.May 1 Possible UI Buttons Left Column:Panel.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 3 Architecture Integration Overview.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 3 Unified Registry System Design.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Capability-Negotiation-Analysis.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Context-Object-Propagation.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Embedding-Integration-Analysis.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.High-Confidence Mutations for Embedding System Integration.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.High-Confidence-Mutations.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Integration-Analysis-Summary.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Integration-Testing-Plan.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Project-Structure.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Service-Initialization-Dependencies.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Service-Layer-Integration-Analysis.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Session-Summary.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Type-Conversion-Analysis.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 Testing after unified registry updates.Implementation Error Analysis and Fix Approach.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 Testing after unified registry updates.Initialization-Test-Progress.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 Testing after unified registry updates.May 4 Context System and Capability Negotiation Test Failures and Fixes.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 Testing after unified registry updates.May 4 Proposed Tests To Complete Test Suite.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 Testing after unified registry updates.Registry-Implementation-Analysis.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May 4 Testing after unified registry updates.Testing-Execution-Plan.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.May-5-Vector-System-Testing.Context-and-Knowledge-for-Vector-System-Testing.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Next Steps for Capability Negotiation .md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Prompt-Composition Pipeline as a Universal Django NLP Layer.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Prompt-composition-pipeline.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Stand alone django-pgvector.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Unified Registry System Impact on Existing Systems.Enhancing the Prompt-Composition Pipeline with Unified Registry System.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Unified Registry System Impact on Existing Systems.Implementation Impact Analysis- Unified Registry System & Chunking Architecture.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Unified Registry System Impact on Existing Systems.Unified Registry System & Linguistics Interface- Implementation Impact Analysis.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Unified Registry System Impact on Existing Systems.Unified_Registry_System_Implementation_Plan.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Unified Registry-focused implementation plans.Chunking Architecture with Unified Registry Implementation Plan.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Unified Registry-focused implementation plans.Linguistics Implementation Plan for Unified Registry System.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Unified Registry-focused implementation plans.Tag System with Unified Registry Implementation.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.Unified Registry-focused implementation plans.Unified Registry System Impact- Embedder Registry.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.capability-negotiation-comprehensive-implementation-plan.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.old vector-interface-migration-plan.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "theory-and-planning.older may 2 Tag-System-README.md",
        "commit_count": 1,
        "example_commits": [
          "7698f87"
        ]
      },
      {
        "module": "dev-support-scripts.README.md",
        "commit_count": 1,
        "example_commits": [
          "03f2ed4"
        ]
      },
      {
        "module": "dev-support-scripts.may 12 inventory.md",
        "commit_count": 1,
        "example_commits": [
          "03f2ed4"
        ]
      },
      {
        "module": "documentation.May 12 Documentation-Review-and-Update-Plan.md",
        "commit_count": 1,
        "example_commits": [
          "03f2ed4"
        ]
      },
      {
        "module": "documentation.May 12 Establishment of Current PGVector Status.md",
        "commit_count": 1,
        "example_commits": [
          "afc504f"
        ]
      },
      {
        "module": "documentation.May 12 ProjectNarrativeGenerator Spec.md",
        "commit_count": 1,
        "example_commits": [
          "bd72706"
        ]
      },
      {
        "module": "dev-support-scripts.ProjectNarrativeGenerator",
        "commit_count": 1,
        "example_commits": [
          "2a48623"
        ]
      },
      {
        "module": "documentation.Automated_Narrative_GCV_Corrected_20250512_072053.md",
        "commit_count": 1,
        "example_commits": [
          "2a48623"
        ]
      },
      {
        "module": "documentation.May 12 Eval of Project Narrative Generator.md",
        "commit_count": 1,
        "example_commits": [
          "2a48623"
        ]
      }
    ],
    "architectural_notes": [
      {
        "id": "arch_note_20250512111007907766",
        "text": "Core models (`viewer.models`) show interaction with the `viewer.semantic.vector` subsystem, indicating integration of vector capabilities."
      }
    ]
  }
AI_DATA_END -->
**Total Commits:** 125

**New Modules Introduced:** Output.mock_paths.vector_call_data.json, Output.test_alignment.vector_alignment_report.txt, Output.test_alignment.vector_impl_analysis.json, Output.test_alignment.vector_test_analysis.json, dev-support-scripts.Output.git_commit_viewer_tree.txt, dev-support-scripts.Output.tests_tree.txt, dev-support-scripts.Output.viewer_tree.txt, dev-support-scripts.apply-multiple-diffs.test_samples.backup_20250509_074209.test_context_flow_sample, dev-support-scripts.apply-multiple-diffs.test_samples.backup_20250509_074432.test_context_flow_sample, dev-support-scripts.apply-multiple-diffs.test_samples.backup_20250509_075933.test_context_flow_sample, dev-support-scripts.apply-multiple-diffs.test_samples.backup_20250509_080106.test_context_flow_sample, documentation.Vector-Interface README.md, documentation.Vector-Interface-Migration-Guide.md, programming_scripts.macos_apply_diff, programming_scripts.simple_apply_diff, pytest_integration_results.txt, pytest_results.txt, pytest_results_2025-05-10_23-37-24.txt, pytest_results_20250511_073004.txt, test_diff.txt, test_file.txt, tests.unit.semantic.vector.test_capability_negotiation, tests.unit.semantic.vector.test_independence, theory-and-planning.May 11 Tests analysis and Attempted Fixes.May 11 Failing Tests Analysis and Fix Attempts.md

**Key Modified Modules (by commit frequency):**
- `theory-and-planning.May 11 Tests analyses and Proposed Mutations` (20 commits)
- `tests.unit.semantic.vector.test_error_recovery` (19 commits)
- `theory-and-planning.Vector System Test Refactoring 3 May 6.Vector-Test-Refactoring-Plan-Revised.md` (16 commits)
- `tests.unit.semantic.vector.test_contract` (10 commits)
- `tests.integration.test_context_flow` (8 commits)
- ...and others.

**Architectural Notes:**
<!-- AI_ARCH_NOTE_ID: arch_note_20250512111007907766 -->
- Core models (`viewer.models`) show interaction with the `viewer.semantic.vector` subsystem, indicating integration of vector capabilities.

**Commit Highlights & Themes:**
- **2025-05-11 (Commit `ccd49db` by David Ryan)**: docs: add detailed analysis and proposed mutations for vector system test failures
<!-- AI_DATA_START
    {
      "hash": "ccd49db039326c0ecb0bfc7e5706d2c238071ba2",
      "short_message": "docs: add detailed analysis and proposed mutations for vector system test failures",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "pytest_results_20250511_073004.txt",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/1. For PostgreSQL connection issues.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/2. For dimension mismatches.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/3.  For registry context awareness.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/4. For context property issues.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Start Here - May 11 Insights for Continued Refactoring of Tests.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analysis and Attempted Fixes/May 11 Failing Tests Analysis and Fix Attempts.md",
          "status": "A"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Testing, Feature
  - Files: D: pytest_results_20250511_073004.txt, D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/1. For PostgreSQL connection issues.md, D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/2. For dimension mismatches.md...
- **2025-05-11 (Commit `7279a89` by David Ryan)**: docs: add methodical approach for test repair and mutation evaluation
<!-- AI_DATA_START
    {
      "hash": "7279a89332c865182854f4f4eeb1d5bd6413299c",
      "short_message": "docs: add methodical approach for test repair and mutation evaluation",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Process for Evaluating Mutation Success after each phase 1-4.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Systematic Method for Vector System Test Refactoring.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing, Feature
  - Files: D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/Process for Evaluating Mutation Success after each phase 1-4.md, D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/Systematic Method for Vector System Test Refactoring.md
- **2025-05-11 (Commit `c41b35d` by David Ryan)**: Add recommended order for implementing mutations to theory-and-planning/May 11 Tests analyses and Proposed Mutations/Start Here - May 11 Insights for Continued Refactoring of Tests.md.
<!-- AI_DATA_START
    {
      "hash": "c41b35d62f0094a4f8bba4ac28ab6dcd7a955177",
      "short_message": "Add recommended order for implementing mutations to theory-and-planning/May 11 Tests analyses and Proposed Mutations/Start Here - May 11 Insights for Continued Refactoring of Tests.md.",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Start Here - May 11 Insights for Continued Refactoring of Tests.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Feature
  - Files: M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/Start Here - May 11 Insights for Continued Refactoring of Tests.md
- **2025-05-11 (Commit `8a1efb3` by David Ryan)**: fix(vector): add language and query_vector attributes to VectorContext class
<!-- AI_DATA_START
    {
      "hash": "8a1efb3f8c7f3361ae11c68b1e2f0316318c51a1",
      "short_message": "fix(vector): add language and query_vector attributes to VectorContext class",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/vector/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature, BugFix
  - Files: M: viewer/semantic/vector/models.py
- **2025-05-11 (Commit `e40deac` by David Ryan)**: docs: enhance test output documentation and reference methodology
<!-- AI_DATA_START
    {
      "hash": "e40deac29ab1c13ad6b4615c173cfb8230bb57ca",
      "short_message": "docs: enhance test output documentation and reference methodology",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/3.  For registry context awareness.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Systematic Method for Vector System Test Refactoring.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing
  - Files: M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/3.  For registry context awareness.md, M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/Systematic Method for Vector System Test Refactoring.md
- **2025-05-11 (Commit `8222cd2` by David Ryan)**: fix(tests): update test_registry_context_awareness to properly register implementation
<!-- AI_DATA_START
    {
      "hash": "8222cd27a98740d56651b637fe4bc45b9dabec76",
      "short_message": "fix(tests): update test_registry_context_awareness to properly register implementation",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_context_flow.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Start Here - May 11 Insights for Continued Refactoring of Tests.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_4-context-property-issues_20250511_084307.txt",
          "status": "D"
        }
      ],
      "themes": [
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, BugFix
  - Files: M: tests/integration/test_context_flow.py, M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/Start Here - May 11 Insights for Continued Refactoring of Tests.md, D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_4-context-property-issues_20250511_084307.txt
- **2025-05-11 (Commit `842c184` by David Ryan)**: docs: document phase 2 and 3 for registry context awareness mutation
<!-- AI_DATA_START
    {
      "hash": "842c184372f966d1b9aa6ee239a1d8a87f7069b5",
      "short_message": "docs: document phase 2 and 3 for registry context awareness mutation",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/3.  For registry context awareness.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/3.  For registry context awareness.md
- **2025-05-11 (Commit `6e7fadb` by David Ryan)**: fix(registry): enhance get_with_context to properly support **kwargs parameters
<!-- AI_DATA_START
    {
      "hash": "6e7fadbe2b7e5a23a80534e7af46338049d36ce5",
      "short_message": "fix(registry): enhance get_with_context to properly support **kwargs parameters",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/semantic/registry.py
- **2025-05-11 (Commit `ed1ac92` by David Ryan)**: docs: add phases 4 and 5 to registry context awareness document
<!-- AI_DATA_START
    {
      "hash": "ed1ac92d7b1382cf01e269cdc8ba9679ae2c8aaa",
      "short_message": "docs: add phases 4 and 5 to registry context awareness document",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/3.  For registry context awareness.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/3.  For registry context awareness.md
- **2025-05-11 (Commit `0599aa2` by David Ryan)**: docs: restructure and enhance Start Here guide for vector system refactoring
<!-- AI_DATA_START
    {
      "hash": "0599aa22aa6aabc06d8c1fb02473e2bc2477c370",
      "short_message": "docs: restructure and enhance Start Here guide for vector system refactoring",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Start Here - May 11 Insights for Continued Refactoring of Tests.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/Start Here - May 11 Insights for Continued Refactoring of Tests.md
- **2025-05-11 (Commit `f0318f0` by David Ryan)**: fix(tests): implement vector dimension consistency improvements across tests
<!-- AI_DATA_START
    {
      "hash": "f0318f0b5c1eb18749ed4509b1839a8f7edd4930",
      "short_message": "fix(tests): implement vector dimension consistency improvements across tests",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_cross_backend_consistency.py",
          "status": "M"
        },
        {
          "path": "tests/unit/semantic/vector/test_contract.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/1. For PostgreSQL connection issues.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/2. For dimension mismatches.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Start Here - May 11 Insights for Continued Refactoring of Tests.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_3-registry-context-awareness-fixed_20250511_093356.txt",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_3-registry-context-awareness_20250511_090146.txt",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature, BugFix
  - Files: M: tests/integration/test_cross_backend_consistency.py, M: tests/unit/semantic/vector/test_contract.py, M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/1. For PostgreSQL connection issues.md...
- **2025-05-11 (Commit `6725f12` by David Ryan)**: docs: update dimension mismatches analysis with test results and revised mutations
<!-- AI_DATA_START
    {
      "hash": "6725f12cedaeb128b43d541c455f04dd3932dd01",
      "short_message": "docs: update dimension mismatches analysis with test results and revised mutations",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/2. For dimension mismatches.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-dimension-mismatches_20250511_102009.txt",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing
  - Files: M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/2. For dimension mismatches.md, D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-dimension-mismatches_20250511_102009.txt
- **2025-05-11 (Commit `5d104e9` by David Ryan)**: fix(tests): add TEST_DIMENSIONS constant to cross_backend_consistency test
<!-- AI_DATA_START
    {
      "hash": "5d104e9042edd6cba2b10f5626e4334ae24bbdc5",
      "short_message": "fix(tests): add TEST_DIMENSIONS constant to cross_backend_consistency test",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_cross_backend_consistency.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/2. For dimension mismatches.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Feature, BugFix
  - Files: M: tests/integration/test_cross_backend_consistency.py, M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/2. For dimension mismatches.md
- **2025-05-11 (Commit `aa3c2cf` by David Ryan)**: fix(tests): add TEST_DIMENSIONS constant to remaining test files
<!-- AI_DATA_START
    {
      "hash": "aa3c2cf0c556f9fb3c7267117a0779cfe93c1b45",
      "short_message": "fix(tests): add TEST_DIMENSIONS constant to remaining test files",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_contract.py",
          "status": "M"
        },
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Feature, BugFix
  - Files: M: tests/unit/semantic/vector/test_contract.py, M: tests/unit/semantic/vector/test_error_recovery.py
- **2025-05-11 (Commit `6d86001` by David Ryan)**: fix(tests): update remaining cross_backend_consistency tests to use TEST_DIMENSIONS
<!-- AI_DATA_START
    {
      "hash": "6d86001d56cc81654af30f84848cd85b4464ffa4",
      "short_message": "fix(tests): update remaining cross_backend_consistency tests to use TEST_DIMENSIONS",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_cross_backend_consistency.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, BugFix
  - Files: M: tests/integration/test_cross_backend_consistency.py
- **2025-05-11 (Commit `09be57f` by David Ryan)**: docs: add test results and analysis for dimension mismatch fixes
<!-- AI_DATA_START
    {
      "hash": "09be57fe3da20d1a19631435d34a8b06a179940c",
      "short_message": "docs: add test results and analysis for dimension mismatch fixes",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/2. For dimension mismatches.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Testing",
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing, Feature, BugFix
  - Files: M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/2. For dimension mismatches.md
- **2025-05-11 (Commit `2e77092` by David Ryan)**: fix(tests): complete dimension consistency fixes in remaining test files
<!-- AI_DATA_START
    {
      "hash": "2e770921d63bb9195d7d135e3f5f975c05c71c23",
      "short_message": "fix(tests): complete dimension consistency fixes in remaining test files",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_contract.py",
          "status": "M"
        },
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Start Here - May 11 Insights for Continued Refactoring of Tests.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-dimension-mismatches-crossbackend_20250511_111215.txt",
          "status": "D"
        }
      ],
      "themes": [
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, BugFix
  - Files: M: tests/unit/semantic/vector/test_contract.py, M: tests/unit/semantic/vector/test_error_recovery.py, M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/Start Here - May 11 Insights for Continued Refactoring of Tests.md...
- **2025-05-11 (Commit `250ef74` by David Ryan)**: fix(tests): update test_error_recovery.py to use consistent TEST_DIMENSIONS
<!-- AI_DATA_START
    {
      "hash": "250ef747e5eafa4c12fee00091b8781b44c4b942",
      "short_message": "fix(tests): update test_error_recovery.py to use consistent TEST_DIMENSIONS",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/2. For dimension mismatches.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-dimension-mismatches-final_20250511_113358.txt",
          "status": "D"
        }
      ],
      "themes": [
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, BugFix
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py, M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/2. For dimension mismatches.md, D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-dimension-mismatches-final_20250511_113358.txt
- **2025-05-11 (Commit `0e8c1e8` by David Ryan)**: Test output shows apparent succes in remaining dimension mismatch issues. See May 11 Vector Dimension Mismatches Remedied.md. Next step is PostgreSQL Connection Issues: theory-and-planning/May 11 Tests analyses and Proposed Mutations/1. For PostgreSQL connection issues.md
<!-- AI_DATA_START
    {
      "hash": "0e8c1e83e9acff671fc9ac2438f91eb91aabf6af",
      "short_message": "Test output shows apparent succes in remaining dimension mismatch issues. See May 11 Vector Dimension Mismatches Remedied.md. Next step is PostgreSQL Connection Issues: theory-and-planning/May 11 Tests analyses and Proposed Mutations/1. For PostgreSQL connection issues.md",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/May 11 Vector Dimension Mismatches Remedied.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-dimension-mismatches-complete_20250511_115621.txt",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing
  - Files: D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/May 11 Vector Dimension Mismatches Remedied.md, D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-dimension-mismatches-complete_20250511_115621.txt
- **2025-05-11 (Commit `d5904af` by David Ryan)**: fix(postgresql): fix connection import order in PostgreSQLVectorDatabase.conn property
<!-- AI_DATA_START
    {
      "hash": "d5904af60214a2a59dc45b58070faeb0b09afa13",
      "short_message": "fix(postgresql): fix connection import order in PostgreSQLVectorDatabase.conn property",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/1. For PostgreSQL connection issues.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/backends/postgresql.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/1. For PostgreSQL connection issues.md, M: viewer/semantic/vector/backends/postgresql.py
- **2025-05-11 (Commit `e4a59d6` by David Ryan)**: fix(tests): add PostgreSQL connection mocking to test_context_flow.py
<!-- AI_DATA_START
    {
      "hash": "e4a59d69e2a73bd26c65a71ad2aebbed0d1f6aee",
      "short_message": "fix(tests): add PostgreSQL connection mocking to test_context_flow.py",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_context_flow.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/1. For PostgreSQL connection issues.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Feature, BugFix
  - Files: M: tests/integration/test_context_flow.py, M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/1. For PostgreSQL connection issues.md
- **2025-05-11 (Commit `4490364` by David Ryan)**: fix(tests): add PostgreSQL connection mocking to test_cross_backend_consistency.py
<!-- AI_DATA_START
    {
      "hash": "44903646cbf1f86b3779071dcbffc04d73beba17",
      "short_message": "fix(tests): add PostgreSQL connection mocking to test_cross_backend_consistency.py",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_cross_backend_consistency.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Feature, BugFix
  - Files: M: tests/integration/test_cross_backend_consistency.py
- **2025-05-11 (Commit `fbc93b7` by David Ryan)**: fix(tests): expand PostgreSQL connection mocking to all tests using get_available_backends()
<!-- AI_DATA_START
    {
      "hash": "fbc93b7da5216ef5af314db4fbca825518bbbd31",
      "short_message": "fix(tests): expand PostgreSQL connection mocking to all tests using get_available_backends()",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_cross_backend_consistency.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, BugFix
  - Files: M: tests/integration/test_cross_backend_consistency.py
- **2025-05-11 (Commit `259b3c5` by David Ryan)**: docs(tests): analyze and document invisible string adjacency issue
<!-- AI_DATA_START
    {
      "hash": "259b3c54786865dd351d6285fd29df4a91bdaa9b",
      "short_message": "docs(tests): analyze and document invisible string adjacency issue",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_context_flow.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/May 11 Fix String Concatenation.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Safe String Utility.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing
  - Files: M: tests/integration/test_context_flow.py, D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/May 11 Fix String Concatenation.md, D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/Safe String Utility.md
- **2025-05-11 (Commit `c1a7083` by David Ryan)**: add PostgreSQL Connection Issues Remedied.md to document that phase of refactoring to be complete, save for the issues noted in the previous commit.
<!-- AI_DATA_START
    {
      "hash": "c1a7083a8906a1b6c477fada75a673aef627e17a",
      "short_message": "add PostgreSQL Connection Issues Remedied.md to document that phase of refactoring to be complete, save for the issues noted in the previous commit.",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/PostgreSQL Connection Issues Remedied.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_1-postgresql-connection_20250511_131710.txt",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-context_flow_fix_20250511_133142.txt",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_3-context_propagation_fix_20250511_134528.txt",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/PostgreSQL Connection Issues Remedied.md, D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_1-postgresql-connection_20250511_131710.txt, D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-context_flow_fix_20250511_133142.txt...
- **2025-05-11 (Commit `68b834b` by David Ryan)**: docs(tests): detail remaining string adjacency issues in tests
<!-- AI_DATA_START
    {
      "hash": "68b834bef4e6106fc5ceab1f325367b32eea8157",
      "short_message": "docs(tests): detail remaining string adjacency issues in tests",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Remaining Test Issues - May 11.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing
  - Files: D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/Remaining Test Issues - May 11.md
- **2025-05-11 (Commit `0d726ce` by David Ryan)**: proposal for pre-commit hook for enforcing flake8-implicit-str-concat
<!-- AI_DATA_START
    {
      "hash": "0d726ce35fd51d056990358218ad0e1c7599e37b",
      "short_message": "proposal for pre-commit hook for enforcing flake8-implicit-str-concat",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/May 11 installing and enforcing flake8-implicit-str-concat.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Remaining Test Issues - May 11.md",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/May 11 installing and enforcing flake8-implicit-str-concat.md, M: theory-and-planning/May 11 Tests analyses and Proposed Mutations/Remaining Test Issues - May 11.md
- **2025-05-11 (Commit `1b1ed77` by David Ryan)**: add proposals for SafeString utility, possible replacement tests to make use of it, as well as a technical evaluation, to be evaluated.
<!-- AI_DATA_START
    {
      "hash": "1b1ed77fc373ab2858a99559cdcb5394793004ba",
      "short_message": "add proposals for SafeString utility, possible replacement tests to make use of it, as well as a technical evaluation, to be evaluated.",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Fixed_Context_Flow_Tests.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/May 11 Technical Evaluation of SafeString Solution Based on Test Output Evidence.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/SafeString Utility Implementation.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/SafeString_Utility.py",
          "status": "D"
        }
      ],
      "themes": [
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Feature
  - Files: D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/Fixed_Context_Flow_Tests.py, D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/May 11 Technical Evaluation of SafeString Solution Based on Test Output Evidence.md, D: theory-and-planning/May 11 Tests analyses and Proposed Mutations/SafeString Utility Implementation.py...
- **2025-05-11 (Commit `7698f87` by David Ryan)**: Reorganize theory-and-planning dir
<!-- AI_DATA_START
    {
      "hash": "7698f87e305ebab6f518bb0200ee7448b51853ea",
      "short_message": "Reorganize theory-and-planning dir",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "pytest_results_2025-05-10_23-37-24.txt",
          "status": "A"
        },
        {
          "path": "pytest_results_20250511_073004.txt",
          "status": "A"
        },
        {
          "path": "theory-and-planning/Essential Files for Comprehensive Understanding Vector Interface Testing.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Front End User Interface/May 1 Possible UI Buttons Left Column:Panel.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 10 Vector Subsystem Tests Phase 4/May 10 Foundations of Mutations for Vector Tests.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 10 Vector Subsystem Tests Phase 4/May 10 Vector Tests Status.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 10 Vector Subsystem Tests Phase 4/Vector Implementation Forensic Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 10 Vector System Testing Phase 5/Analysis of Failing Tests.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/1. For PostgreSQL connection issues.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/2. For dimension mismatches.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/3.  For registry context awareness.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/4. For context property issues.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Fixed_Context_Flow_Tests.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/May 11 Fix String Concatenation.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/May 11 Technical Evaluation of SafeString Solution Based on Test Output Evidence.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/May 11 Vector Dimension Mismatches Remedied.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/May 11 installing and enforcing flake8-implicit-str-concat.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/PostgreSQL Connection Issues Remedied.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Process for Evaluating Mutation Success after each phase 1-4.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Remaining Test Issues - May 11.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Safe String Utility.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/SafeString Utility Implementation.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/SafeString_Utility.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Start Here - May 11 Insights for Continued Refactoring of Tests.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/Systematic Method for Vector System Test Refactoring.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_1-postgresql-connection_20250511_131710.txt",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-context_flow_fix_20250511_133142.txt",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-dimension-mismatches-complete_20250511_115621.txt",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-dimension-mismatches-crossbackend_20250511_111215.txt",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-dimension-mismatches-final_20250511_113358.txt",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_2-dimension-mismatches_20250511_102009.txt",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_3-context_propagation_fix_20250511_134528.txt",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_3-registry-context-awareness-fixed_20250511_093356.txt",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_3-registry-context-awareness_20250511_090146.txt",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 11 Tests analyses and Proposed Mutations/pytest_results_4-context-property-issues_20250511_084307.txt",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 3 Architecture Integration Overview.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 3 Unified Registry System Design.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Capability-Negotiation-Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Context-Object-Propagation.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Embedding-Integration-Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/High-Confidence Mutations for Embedding System Integration.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/High-Confidence-Mutations.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Integration-Analysis-Summary.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Integration-Testing-Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Project-Structure.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Service-Initialization-Dependencies.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Service-Layer-Integration-Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Type-Conversion-Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/Implementation Error Analysis and Fix Approach.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/Initialization-Test-Progress.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/May 4 Context System and Capability Negotiation Test Failures and Fixes.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/May 4 Proposed Tests To Complete Test Suite.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/Registry-Implementation-Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/Testing-Execution-Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 9 Final Yard for Extending Embedding Architecture.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/Context-and-Knowledge-for-Vector-System-Testing-Update.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/Context-and-Knowledge-for-Vector-System-Testing.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Context-Update.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Context.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Test-Implementation-Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Next Steps for Capability Negotiation .md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Prompt-Composition Pipeline as a Universal Django NLP Layer.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Prompt-composition-pipeline.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Stand alone django-pgvector.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Unified Registry System Impact on Existing Systems/Enhancing the Prompt-Composition Pipeline with Unified Registry System.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Unified Registry System Impact on Existing Systems/Implementation Impact Analysis- Unified Registry System & Chunking Architecture.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Unified Registry System Impact on Existing Systems/Unified Registry System & Linguistics Interface- Implementation Impact Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Unified Registry System Impact on Existing Systems/Unified_Registry_System_Implementation_Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Unified Registry-focused implementation plans/Chunking Architecture with Unified Registry Implementation Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Unified Registry-focused implementation plans/Linguistics Implementation Plan for Unified Registry System.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Unified Registry-focused implementation plans/Tag System with Unified Registry Implementation.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Unified Registry-focused implementation plans/Unified Registry System Impact- Embedder Registry.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/May 6 Handoff - Vector System Test Refactoring.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/enhanced_apply_diff.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/test_diff.txt",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring Progress May 9.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/capability-negotiation-comprehensive-implementation-plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/old may 4 readme vector-Interface.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/old vector-interface-migration-plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/older may 2 Tag-System-README.md",
          "status": "R"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: A: pytest_results_2025-05-10_23-37-24.txt, A: pytest_results_20250511_073004.txt, R: theory-and-planning/Essential Files for Comprehensive Understanding Vector Interface Testing.md...
- **2025-05-11 (Commit `03f2ed4` by David Ryan)**: feat(dev-support): Enhance project analysis and documentation capabilities
<!-- AI_DATA_START
    {
      "hash": "03f2ed4a9c50144cb6833c0cbd60ab650dc23ceb",
      "short_message": "feat(dev-support): Enhance project analysis and documentation capabilities",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "M"
        },
        {
          "path": "dev-support-scripts/README.md",
          "status": "M"
        },
        {
          "path": "dev-support-scripts/generate_tree_view.py",
          "status": "M"
        },
        {
          "path": "dev-support-scripts/may 12 inventory.md",
          "status": "D"
        },
        {
          "path": "documentation/May 12 Documentation-Review-and-Update-Plan.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: M: README_AI.md, M: dev-support-scripts/README.md, M: dev-support-scripts/generate_tree_view.py...
- **2025-05-11 (Commit `afc504f` by David Ryan)**: docs(analysis): Update project documentation and dev-support scripts
<!-- AI_DATA_START
    {
      "hash": "afc504fb44c7317b61bda7d190bc5f15df9ad671",
      "short_message": "docs(analysis): Update project documentation and dev-support scripts",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "dev-support-scripts/Output/dependency_graph/critical_path_components.json",
          "status": "M"
        },
        {
          "path": "dev-support-scripts/Output/dependency_graph/dependency_graph.json",
          "status": "M"
        },
        {
          "path": "dev-support-scripts/Output/dependency_graph/dependency_overview.txt",
          "status": "M"
        },
        {
          "path": "dev-support-scripts/Output/dependency_graph/subsystem_boundaries.json",
          "status": "M"
        },
        {
          "path": "dev-support-scripts/dependency_graph_generator.py",
          "status": "M"
        },
        {
          "path": "documentation/May 12 Establishment of Current PGVector Status.md",
          "status": "D"
        },
        {
          "path": "documentation/Project Dev Narrative to Date.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: dev-support-scripts/Output/dependency_graph/critical_path_components.json, M: dev-support-scripts/Output/dependency_graph/dependency_graph.json, M: dev-support-scripts/Output/dependency_graph/dependency_overview.txt...
- **2025-05-11 (Commit `c3473ac` by David Ryan)**: refactor(dev-support): Update dependency_graph_generator.py filenaming
<!-- AI_DATA_START
    {
      "hash": "c3473ac8b2a7b66ad6a241eff724f71241218561",
      "short_message": "refactor(dev-support): Update dependency_graph_generator.py filenaming",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "dev-support-scripts/dependency_graph_generator.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement
  - Files: M: dev-support-scripts/dependency_graph_generator.py
- **2025-05-11 (Commit `020da00` by David Ryan)**: docs: Enhance Project Development Narrative with Dependency Insights
<!-- AI_DATA_START
    {
      "hash": "020da00bfab847a1277b1f01592ebcc770daabcc",
      "short_message": "docs: Enhance Project Development Narrative with Dependency Insights",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Project Dev Narrative to Date.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: documentation/Project Dev Narrative to Date.md
- **2025-05-11 (Commit `bd72706` by David Ryan)**: docs: Refine ProjectNarrativeGenerator spec for self-analysis
<!-- AI_DATA_START
    {
      "hash": "bd727062b3034c0d5dce747ad767857e45f80399",
      "short_message": "docs: Refine ProjectNarrativeGenerator spec for self-analysis",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/May 12 ProjectNarrativeGenerator Spec.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: documentation/May 12 ProjectNarrativeGenerator Spec.md
- **2025-05-11 (Commit `2a48623` by David Ryan)**: feat(dev-support): Introduce ProjectNarrativeGenerator.py and initial run
<!-- AI_DATA_START
    {
      "hash": "2a48623c25d291f5db1a8a10f95347a79fe426db",
      "short_message": "feat(dev-support): Introduce ProjectNarrativeGenerator.py and initial run",
      "author": "David Ryan",
      "date_iso": "2025-05-11",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "dev-support-scripts/ProjectNarrativeGenerator.py",
          "status": "D"
        },
        {
          "path": "documentation/Automated_Narrative_GCV_Corrected_20250512_072053.md",
          "status": "D"
        },
        {
          "path": "documentation/May 12 Eval of Project Narrative Generator.md",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: dev-support-scripts/ProjectNarrativeGenerator.py, D: documentation/Automated_Narrative_GCV_Corrected_20250512_072053.md, D: documentation/May 12 Eval of Project Narrative Generator.md
- **2025-05-10 (Commit `cb080af` by David Ryan)**: docs(vector): comprehensive architectural analysis and test mutation guide
<!-- AI_DATA_START
    {
      "hash": "cb080af3c41f98345e73717f32fefd45a88a34f4",
      "short_message": "docs(vector): comprehensive architectural analysis and test mutation guide",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 10 Vector Subsystem Tests Phase 4/May 10 Foundations of Mutations for Vector Tests.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 10 Vector Subsystem Tests Phase 4/Vector Implementation Forensic Analysis.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Testing
  - Files: D: theory-and-planning/May 10 Vector Subsystem Tests Phase 4/May 10 Foundations of Mutations for Vector Tests.md, D: theory-and-planning/May 10 Vector Subsystem Tests Phase 4/Vector Implementation Forensic Analysis.md, M: theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md
- **2025-05-10 (Commit `a0441b4` by David Ryan)**: refactor(tests): implement Mutation 6.1R for test_error_recovery.py connection mock path
<!-- AI_DATA_START
    {
      "hash": "a0441b405a54b8c242577faf40cb343c12b98b54",
      "short_message": "refactor(tests): implement Mutation 6.1R for test_error_recovery.py connection mock path",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py
- **2025-05-10 (Commit `6aa6a21` by David Ryan)**: refactor(tests): begin implementing Mutation 6.3 by adding ensure_dimensions import
<!-- AI_DATA_START
    {
      "hash": "6aa6a213354f0d98465c1e944e92ed440489fb74",
      "short_message": "refactor(tests): begin implementing Mutation 6.3 by adding ensure_dimensions import",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py
- **2025-05-10 (Commit `3f8596d` by David Ryan)**: refactor(tests): complete Mutation 6.3 for test_error_recovery.py dimension normalization
<!-- AI_DATA_START
    {
      "hash": "3f8596dc5f3736e3156b11fe7ebaace8824a8aa3",
      "short_message": "refactor(tests): complete Mutation 6.3 for test_error_recovery.py dimension normalization",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py
- **2025-05-10 (Commit `cd6e07e` by David Ryan)**: refactor(tests): begin implementing Mutation 6.4 by adding unittest.mock import
<!-- AI_DATA_START
    {
      "hash": "cd6e07e9b18a58ee9c7fa2a67e8cb56c220cb4b2",
      "short_message": "refactor(tests): begin implementing Mutation 6.4 by adding unittest.mock import",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py
- **2025-05-10 (Commit `deffe52` by David Ryan)**: refactor(tests): complete Mutation 6.4 for test_error_recovery.py database dependencies
<!-- AI_DATA_START
    {
      "hash": "deffe52c471454ff9c366e8ce96efe352d6a7e87",
      "short_message": "refactor(tests): complete Mutation 6.4 for test_error_recovery.py database dependencies",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py
- **2025-05-10 (Commit `57c6bc9` by David Ryan)**: refactor(tests): implement Mutation 6.5 for test_error_recovery.py dimension matching in invalid metric test
<!-- AI_DATA_START
    {
      "hash": "57c6bc96c5f0d7c315d6b32fda0d0b7e46617333",
      "short_message": "refactor(tests): implement Mutation 6.5 for test_error_recovery.py dimension matching in invalid metric test",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py
- **2025-05-10 (Commit `edcd02d` by David Ryan)**: refactor(tests): implement Mutation 6.3R for test_error_recovery.py vector dimensions
<!-- AI_DATA_START
    {
      "hash": "edcd02d6d3cc3c298c826c1e92eaf436dbf0bd8e",
      "short_message": "refactor(tests): implement Mutation 6.3R for test_error_recovery.py vector dimensions",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "Output/mock_paths/vector_call_data.json",
          "status": "D"
        },
        {
          "path": "Output/mock_paths/vector_mock_paths.txt",
          "status": "D"
        },
        {
          "path": "Output/test_alignment/vector_alignment_report.txt",
          "status": "D"
        },
        {
          "path": "Output/test_alignment/vector_impl_analysis.json",
          "status": "D"
        },
        {
          "path": "Output/test_alignment/vector_test_analysis.json",
          "status": "D"
        },
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 10 Vector Subsystem Tests Phase 4/May 10 Foundations of Mutations for Vector Tests.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Refactor/Improvement, Feature
  - Files: D: Output/mock_paths/vector_call_data.json, D: Output/mock_paths/vector_mock_paths.txt, D: Output/test_alignment/vector_alignment_report.txt...
- **2025-05-10 (Commit `4f8ccc5` by David Ryan)**: refactor(tests): implement Mutation 6.4R for test_error_recovery.py Django settings mock
<!-- AI_DATA_START
    {
      "hash": "4f8ccc5fa3dcf34ea2868c259c9014735f3f194d",
      "short_message": "refactor(tests): implement Mutation 6.4R for test_error_recovery.py Django settings mock",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py
- **2025-05-10 (Commit `6e315a7` by David Ryan)**: refactor(tests): implement Mutation 6.5R for test_error_recovery.py django settings in invalid metric test
<!-- AI_DATA_START
    {
      "hash": "6e315a7de5955ec7526fafba20fb646d0fe7ba73",
      "short_message": "refactor(tests): implement Mutation 6.5R for test_error_recovery.py django settings in invalid metric test",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py
- **2025-05-10 (Commit `eae3304` by David Ryan)**: refactor(tests): implement Mutation 6.6 for test_error_recovery.py Django mocking in empty vector test
<!-- AI_DATA_START
    {
      "hash": "eae3304d22a0fef13cafa18b35f90a353624b403",
      "short_message": "refactor(tests): implement Mutation 6.6 for test_error_recovery.py Django mocking in empty vector test",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py
- **2025-05-10 (Commit `5686e12` by David Ryan)**: refactor(tests): continue Mutation 6.6 for test_error_recovery.py Django mocking in dimension test
<!-- AI_DATA_START
    {
      "hash": "5686e12f95f93131f8f44ac1581141903539df68",
      "short_message": "refactor(tests): continue Mutation 6.6 for test_error_recovery.py Django mocking in dimension test",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py
- **2025-05-10 (Commit `3b5af61` by David Ryan)**: refactor(tests): complete Mutation 6.6 for test_error_recovery.py Django mocking in duplicate ID test
<!-- AI_DATA_START
    {
      "hash": "3b5af61b1304f498118900f9e32b6bd3e5f26992",
      "short_message": "refactor(tests): complete Mutation 6.6 for test_error_recovery.py Django mocking in duplicate ID test",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py
- **2025-05-10 (Commit `6aab615` by David Ryan)**: refactor(tests): implement Mutation 6.7 for test_error_recovery.py error handling in invalid metric test
<!-- AI_DATA_START
    {
      "hash": "6aab6153a6bdc853adecbe81e210402844ba3c2b",
      "short_message": "refactor(tests): implement Mutation 6.7 for test_error_recovery.py error handling in invalid metric test",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 10 Vector Subsystem Tests Phase 4/May 10 Foundations of Mutations for Vector Tests.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py, M: theory-and-planning/May 10 Vector Subsystem Tests Phase 4/May 10 Foundations of Mutations for Vector Tests.md
- **2025-05-10 (Commit `a3127c0` by David Ryan)**: docs(vector): create comprehensive vector subsystem README.md
<!-- AI_DATA_START
    {
      "hash": "a3127c016fc62114945e117a2c6da213c7d145d9",
      "short_message": "docs(vector): create comprehensive vector subsystem README.md",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/vector/README.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: D: viewer/semantic/vector/README.md
- **2025-05-10 (Commit `5de7e07` by David Ryan)**: moved renamed Vector-Interface README.md to appropriate documentation/ dir.
<!-- AI_DATA_START
    {
      "hash": "5de7e075b4355390465aec850c82c384501b1855",
      "short_message": "moved renamed Vector-Interface README.md to appropriate documentation/ dir.",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Vector-Interface-Migration-Guide.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/May 10 Vector Subsystem Tests Phase 4/May 10 Foundations of Mutations for Vector Tests.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/README.md",
          "status": "R"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: A: documentation/Vector-Interface-Migration-Guide.md, M: theory-and-planning/May 10 Vector Subsystem Tests Phase 4/May 10 Foundations of Mutations for Vector Tests.md, R: viewer/semantic/vector/README.md
- **2025-05-10 (Commit `c311fd2` by David Ryan)**: reorganize and clean up stale files. new dir dev-support-scripts at top of project dir.
<!-- AI_DATA_START
    {
      "hash": "c311fd2ebf2e7ceb3fca61f26e8be5d4136bee23",
      "short_message": "reorganize and clean up stale files. new dir dev-support-scripts at top of project dir.",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "Output/mock_paths/vector_call_data.json",
          "status": "A"
        },
        {
          "path": "Output/mock_paths/vector_mock_paths.txt",
          "status": "R"
        },
        {
          "path": "Output/test_alignment/vector_alignment_report.txt",
          "status": "A"
        },
        {
          "path": "Output/test_alignment/vector_impl_analysis.json",
          "status": "A"
        },
        {
          "path": "Output/test_alignment/vector_test_analysis.json",
          "status": "A"
        },
        {
          "path": "README_AI.md",
          "status": "M"
        },
        {
          "path": "dev-support-scripts/Output/api_contracts/vector_interface_contracts.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/api_contracts/vector_interface_summary.txt",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/dependency_graph/critical_path_components.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/dependency_graph/dependency_graph.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/dependency_graph/dependency_overview.txt",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/dependency_graph/subsystem_boundaries.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/git_commit_viewer/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/git_commit_viewer/asgi_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/git_commit_viewer/settings_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/git_commit_viewer/urls_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/git_commit_viewer/wsgi_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/git_commit_viewer_tree.txt",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/impact_analysis/actionable_steps.md",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/impact_analysis/entry_points.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/impact_analysis/impact_details.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/impact_analysis/impact_summary.txt",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/impact_analysis/modules_baseline.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/impact_analysis/tests_baseline.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/impact_analysis/utils_actions.md",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/mock_paths/semantic_call_data.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/mock_paths/semantic_mock_paths.txt",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/mock_paths/vector_call_data.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/test_alignment/vector_alignment_report.txt",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/test_alignment/vector_impl_analysis.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/test_alignment/vector_test_analysis.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/test_coverage/test_coverage_overview.txt",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/test_coverage/test_coverage_summary.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/conftest_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/integration/test_capability_negotiation_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/integration/test_context_flow_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/integration/test_contexts_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/integration/test_cross_backend_consistency_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/integration/test_embedding_integration_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/integration/test_initialization_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/integration/test_metadata_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/integration/test_vector_fields_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/package/test_independence_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/unit/semantic/linguistic/test_registry_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/unit/semantic/vector/test_capability_negotiation_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/unit/semantic/vector/test_contract_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/unit/semantic/vector/test_error_recovery_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/unit/semantic/vector/test_independence_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests/unit/semantic/vector/test_utils_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/tests_tree.txt",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/admin_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/apps_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/management/commands/add_self_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/management/commands/clear_data_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/management/commands/evaluate_semantic_search_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/management/commands/generate_commit_tags_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/management/commands/generate_embeddings_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/management/commands/import_tag_taxonomy_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/management/commands/manage_tag_dictionary_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/management/commands/populate_self_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/management/commands/process_linguistic_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/management/commands/semantic_search_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/management/commands/sync_vector_dimensions_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/management/commands/test_dimension_fix_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/migrations/0001_initial_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/migrations/0002_commit_files_changed_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/migrations/0003_remove_commit_branch_commit_branches_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/migrations/0004_alter_commit_commit_date_filechange_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/migrations/0005_repository_last_fetched_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/migrations/0006_install_pgvector_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/migrations/0007_commitmessagechunk_diffchunk_commit_author_email_and_more_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/migrations/0008_remove_filechange_viewer_file_path_74026f_idx_and_more_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/migrations/0009_embeddingprovider_alter_branch_options_and_more_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/migrations/0010_alter_commit_message_embedding_and_more_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/migrations/0011_tagdictionary_canonicaltag_alter_commit_tags_and_more_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/migrations/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/models_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/models_tagging_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/apps_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/context_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/expressions_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/fields_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/indexes_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/lookups_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/management/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/management/commands/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/management/commands/install_pgvector_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/registry_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/service_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/tests/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/pgvector/tests/test_fields_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/adapters_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/chunking/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/chunking/adapters_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/chunking/base_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/chunking/linguistic_strategy_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/chunking/paragraph_strategy_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/chunking/registry_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/chunking/service_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/chunking/token_strategy_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/context_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/decorators_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/fields_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/linguistic/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/linguistic/backends/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/linguistic/backends/spacy_processor_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/linguistic/boundary_provider_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/linguistic/interfaces_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/linguistic/models_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/linguistic/registry_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/linguistic/service_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/linguistic/strategies_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/managers_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/mixins_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/registry_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/tagging/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/tagging/adapters_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/tagging/base_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/tagging/chain_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/tagging/linguistic_strategy_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/tagging/pattern_strategy_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/tagging/registry_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/tagging/service_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/vector/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/vector/backends/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/vector/backends/memory_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/vector/backends/postgresql_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/vector/fields_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/vector/interfaces_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/vector/models_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/vector/registry_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/vector/service_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/semantic/vector/utils_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/services/__init___docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/services/chunkers_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/services/embedder_registry_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/services/embedders_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/services/embedding_processor_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/services/nlp_service_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/services/repository_processor_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/services/search_service_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/services/tag_normalization_service_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/tests_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/urls_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer/views_docstrings.json",
          "status": "D"
        },
        {
          "path": "dev-support-scripts/Output/viewer_tree.txt",
          "status": "D"
        },
        {
          "path": "documentation/May 1 Update Repository command.md",
          "status": "R"
        },
        {
          "path": "documentation/Project Files.md",
          "status": "R"
        },
        {
          "path": "documentation/Tag-System-README.md",
          "status": "R"
        },
        {
          "path": "documentation/Vector-Interface README.md",
          "status": "A"
        },
        {
          "path": "documentation/Vector-Interface.md",
          "status": "M"
        },
        {
          "path": "pytest_integration_results.txt",
          "status": "A"
        },
        {
          "path": "pytest_results.txt",
          "status": "A"
        },
        {
          "path": "test_diff.txt",
          "status": "A"
        },
        {
          "path": "test_file.txt",
          "status": "A"
        },
        {
          "path": "theory-and-planning/Support-Scripts/README.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/api_contract_analyzer.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/README.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/macos_apply_multi_mutation_diffs.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/real_mutations/may-09-2025-vector_test_refactoring-dry-run-results.json",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/real_mutations/may-09-2025-vector_test_refactoring-results.json",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/real_mutations/may-09-2025-vector_test_refactoring_mutations.yaml",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/requirements-apply-diff.txt",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/README.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/backup_20250509_074209/test_context_flow_sample.py.5df0cf76.bak",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/backup_20250509_074432/test_context_flow_sample.py.0222d36c.bak",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/backup_20250509_075933/test_context_flow_sample.py.6e7fa5cb.bak",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/backup_20250509_080106/test_context_flow_sample.py.d24fe111.bak",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/test_apply_mutations.sh",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/test_context_flow_sample.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/vector_test_mutations.yaml",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/change_impact_analyzer.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/dependency_graph_generator.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/extract_docstrings.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/generate_tree_view.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/mock_access_path_analyzer.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/test_coverage_analyzer.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Support-Scripts/test_implementation_analyzer.py",
          "status": "R"
        },
        {
          "path": "theory-and-planning/old may 4 readme vector-Interface.md",
          "status": "D"
        },
        {
          "path": "vector-interface-migration-plan.md",
          "status": "R"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: A: Output/mock_paths/vector_call_data.json, R: Output/mock_paths/vector_mock_paths.txt, A: Output/test_alignment/vector_alignment_report.txt...
- **2025-05-10 (Commit `b1c96ee` by David Ryan)**: update gitignore
<!-- AI_DATA_START
    {
      "hash": "b1c96eebf278fb233c433e5c69e4334d75ac5904",
      "short_message": "update gitignore",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": ".gitignore",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: .gitignore
- **2025-05-10 (Commit `ad3d3f3` by David Ryan)**: feat(dev-scripts): add timestamp to generate_tree_view.py output filenames
<!-- AI_DATA_START
    {
      "hash": "ad3d3f3ed40721ca45df4c72eb4d9ae539f5e6c0",
      "short_message": "feat(dev-scripts): add timestamp to generate_tree_view.py output filenames",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "dev-support-scripts/generate_tree_view.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: dev-support-scripts/generate_tree_view.py
- **2025-05-10 (Commit `d1bd648` by David Ryan)**: refactor extract_docstrings.py to add timestamps to filenames output by the script
<!-- AI_DATA_START
    {
      "hash": "d1bd6484f9877510c99876d2648e3bb4dcd40ad0",
      "short_message": "refactor extract_docstrings.py to add timestamps to filenames output by the script",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "dev-support-scripts/extract_docstrings.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement, Feature
  - Files: M: dev-support-scripts/extract_docstrings.py
- **2025-05-10 (Commit `37b312a` by David Ryan)**: refactor(vector): update viewer/models.py to use unified vector interface
<!-- AI_DATA_START
    {
      "hash": "37b312af68c35c9a48de189a5c442947aeb7cb6e",
      "short_message": "refactor(vector): update viewer/models.py to use unified vector interface",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Refactor/Improvement
  - Files: M: viewer/models.py
- **2025-05-10 (Commit `6ecdd32` by David Ryan)**: refactor(tests): rename vector test modules to avoid collection conflicts
<!-- AI_DATA_START
    {
      "hash": "6ecdd3221f070d2f3d7657629c67528dd4d81036",
      "short_message": "refactor(tests): rename vector test modules to avoid collection conflicts",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_vector_capability_negotiation.py",
          "status": "D"
        },
        {
          "path": "tests/unit/semantic/vector/test_vector_independence.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Refactor/Improvement
  - Files: D: tests/unit/semantic/vector/test_vector_capability_negotiation.py, D: tests/unit/semantic/vector/test_vector_independence.py
- **2025-05-10 (Commit `7cf31a4` by David Ryan)**: output of pytest and evaluation of results.
<!-- AI_DATA_START
    {
      "hash": "7cf31a467b34830fd6b675f3b7e045c3dbaefd1f",
      "short_message": "output of pytest and evaluation of results.",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "dev-support-scripts/Output/impact_analysis/modules_baseline.json",
          "status": "M"
        },
        {
          "path": "dev-support-scripts/Output/impact_analysis/tests_baseline.json",
          "status": "M"
        },
        {
          "path": "dev-support-scripts/apply-multiple-diffs/test_samples/test_context_flow_sample.py",
          "status": "R"
        },
        {
          "path": "pytest_results_2025-05-10_23-37-24.txt",
          "status": "D"
        },
        {
          "path": "tests/unit/semantic/vector/test_capability_negotiation.py",
          "status": "A"
        },
        {
          "path": "tests/unit/semantic/vector/test_independence.py",
          "status": "A"
        },
        {
          "path": "theory-and-planning/May 10 Vector System Testing Phase 5/Analysis of Failing Tests.md",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/tests/test_fields.py",
          "status": "R"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: dev-support-scripts/Output/impact_analysis/modules_baseline.json, M: dev-support-scripts/Output/impact_analysis/tests_baseline.json, R: dev-support-scripts/apply-multiple-diffs/test_samples/test_context_flow_sample.py...
- **2025-05-10 (Commit `81c9db0` by David Ryan)**: fix(tests): add missing 'import viewer' statement in test_vector_fields.py to resolve NameError when accessing the fully qualified module path. This addresses the import/reference issue identified in the failing test 'test_field_uses_utils_module', where references to viewer.semantic.vector.utils.* were made without importing the top-level 'viewer' module.
<!-- AI_DATA_START
    {
      "hash": "81c9db0407644e3231176cbce39b96356a93188f",
      "short_message": "fix(tests): add missing 'import viewer' statement in test_vector_fields.py to resolve NameError when accessing the fully qualified module path. This addresses the import/reference issue identified in the failing test 'test_field_uses_utils_module', where references to viewer.semantic.vector.utils.* were made without importing the top-level 'viewer' module.",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_vector_fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Semantic Subsystem",
        "BugFix",
        "Vector/Embedding",
        "Feature",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Semantic Subsystem, BugFix, Vector/Embedding, Feature, Testing
  - Files: M: tests/integration/test_vector_fields.py
- **2025-05-10 (Commit `739ba03` by David Ryan)**: fix(tests): update test_registry_context_awareness to align with vector subsystem architecture
<!-- AI_DATA_START
    {
      "hash": "739ba03999316183600579155f18af28691dd500",
      "short_message": "fix(tests): update test_registry_context_awareness to align with vector subsystem architecture",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "dev-support-scripts/Output/git_commit_viewer_tree.txt",
          "status": "A"
        },
        {
          "path": "dev-support-scripts/Output/tests_tree.txt",
          "status": "A"
        },
        {
          "path": "dev-support-scripts/Output/viewer_tree.txt",
          "status": "A"
        },
        {
          "path": "dev-support-scripts/apply-multiple-diffs/test_samples/backup_20250509_074209/test_context_flow_sample.py.5df0cf76.bak",
          "status": "A"
        },
        {
          "path": "dev-support-scripts/apply-multiple-diffs/test_samples/backup_20250509_074432/test_context_flow_sample.py.0222d36c.bak",
          "status": "A"
        },
        {
          "path": "dev-support-scripts/apply-multiple-diffs/test_samples/backup_20250509_075933/test_context_flow_sample.py.6e7fa5cb.bak",
          "status": "A"
        },
        {
          "path": "dev-support-scripts/apply-multiple-diffs/test_samples/backup_20250509_080106/test_context_flow_sample.py.d24fe111.bak",
          "status": "A"
        },
        {
          "path": "tests/integration/test_context_flow.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 10 Vector System Testing Phase 5/Analysis of Failing Tests.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analysis and Attempted Fixes/May 11 Failing Tests Analysis and Fix Attempts.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, BugFix
  - Files: A: dev-support-scripts/Output/git_commit_viewer_tree.txt, A: dev-support-scripts/Output/tests_tree.txt, A: dev-support-scripts/Output/viewer_tree.txt...
- **2025-05-10 (Commit `96b5029` by David Ryan)**: fix(tests): update test_field_operations_with_utils in tests/integration/test_context_flow.py to trigger correct code path for vector_to_db_string
<!-- AI_DATA_START
    {
      "hash": "96b5029e5849956c59d8e211b27130263f22de17",
      "short_message": "fix(tests): update test_field_operations_with_utils in tests/integration/test_context_flow.py to trigger correct code path for vector_to_db_string",
      "author": "David Ryan",
      "date_iso": "2025-05-10",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_context_flow.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 10 Vector System Testing Phase 5/Analysis of Failing Tests.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 11 Tests analysis and Attempted Fixes/May 11 Failing Tests Analysis and Fix Attempts.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, BugFix
  - Files: M: tests/integration/test_context_flow.py, M: theory-and-planning/May 10 Vector System Testing Phase 5/Analysis of Failing Tests.md, M: theory-and-planning/May 11 Tests analysis and Attempted Fixes/May 11 Failing Tests Analysis and Fix Attempts.md
- **2025-05-09 (Commit `75c342d` by David Ryan)**: feat(tooling): optimize vector mutation tool for LLM context efficiency
<!-- AI_DATA_START
    {
      "hash": "75c342dd172fef3aed044ee03dff930028f66597",
      "short_message": "feat(tooling): optimize vector mutation tool for LLM context efficiency",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "programming_scripts/macos_apply_diff.py",
          "status": "A"
        },
        {
          "path": "programming_scripts/simple_apply_diff.py",
          "status": "A"
        },
        {
          "path": "test_diff.txt",
          "status": "D"
        },
        {
          "path": "test_file.txt",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Add Sophisticated AI-RAG Capabilities to Django Projects.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Augmented Retrieval- A New Dimension for Any Django Project.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Essential Files for Comprehensive Understanding Vector Interface Testing.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/File-System-Models.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/For Review- Specialized Chunking Strategies and Linguistic Backends for Git-Viewer and Beyond.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Leveraging Vector Semantics for Curriculum Development.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Leveraging Vector Semantics for Document-Enhanced Learning.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Linguistics interface and prompt embedding.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 9 Final Yard for Extending Embedding Architecture.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Optimal Chunking Backends & Linguistic Parsing for Educational Content.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Prompt Composition Pipeline- Leveraging the Framework for LLM Integration.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Prompt Expansion as Semantic Enrichment with Linguistics Interface.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Query Embedding for Semantic Search.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Retrieval coordination layer.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/School Teaching & Learning App.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/README.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/macos_apply_multi_mutation_diffs.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/requirements-apply-diff.txt",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/test_apply_mutations.sh",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector Interface/Vector Interface Integration Status 3.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/test_diff.txt",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: A: programming_scripts/macos_apply_diff.py, A: programming_scripts/simple_apply_diff.py, D: test_diff.txt...
- **2025-05-09 (Commit `b48e570` by David Ryan)**: docs(tooling): add mutation management best practices with migration-style patterns
<!-- AI_DATA_START
    {
      "hash": "b48e57078ff6739262de63e3d4bf2e26265239a5",
      "short_message": "docs(tooling): add mutation management best practices with migration-style patterns",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/README.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/real_mutations/may-09-2025-vector_test_refactoring_mutations.yaml",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: M: theory-and-planning/Support-Scripts/apply-multiple-diffs/README.md, D: theory-and-planning/Support-Scripts/apply-multiple-diffs/real_mutations/may-09-2025-vector_test_refactoring_mutations.yaml
- **2025-05-09 (Commit `d14a503` by David Ryan)**: docs(tooling): clarify mutation script path and add vector test validation counts
<!-- AI_DATA_START
    {
      "hash": "d14a503cf85d9d0d0363169d68a514fa8a611b91",
      "short_message": "docs(tooling): clarify mutation script path and add vector test validation counts",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/README.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Testing, Feature
  - Files: M: theory-and-planning/Support-Scripts/apply-multiple-diffs/README.md
- **2025-05-09 (Commit `6cc8e6f` by David Ryan)**: fix(mutations): update vector test refactoring mutation patterns to match actual files
<!-- AI_DATA_START
    {
      "hash": "6cc8e6ffda51578bb975eba492314b0384d98bde",
      "short_message": "fix(mutations): update vector test refactoring mutation patterns to match actual files",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/real_mutations/may-09-2025-vector_test_refactoring_mutations.yaml",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, BugFix
  - Files: M: theory-and-planning/Support-Scripts/apply-multiple-diffs/real_mutations/may-09-2025-vector_test_refactoring_mutations.yaml
- **2025-05-09 (Commit `55e4f71` by David Ryan)**: refactor(tests): implement VectorContext.with_updates() pattern in test_context_flow.py
<!-- AI_DATA_START
    {
      "hash": "55e4f713d9f37c2b7a3b4f35a707e4bd40530fb3",
      "short_message": "refactor(tests): implement VectorContext.with_updates() pattern in test_context_flow.py",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "pytest_integration_results.txt",
          "status": "D"
        },
        {
          "path": "pytest_results.txt",
          "status": "D"
        },
        {
          "path": "tests/integration/test_context_flow.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/real_mutations/may-09-2025-vector_test_refactoring-dry-run-results.json",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/real_mutations/may-09-2025-vector_test_refactoring-results.json",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/real_mutations/may-09-2025-vector_test_refactoring_mutations.yaml",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/backup_20250509_074209/test_context_flow_sample.py.5df0cf76.bak",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/backup_20250509_074432/test_context_flow_sample.py.0222d36c.bak",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/backup_20250509_075933/test_context_flow_sample.py.6e7fa5cb.bak",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/backup_20250509_080106/test_context_flow_sample.py.d24fe111.bak",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/May 6 Handoff - Vector System Test Refactoring.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring Progress May 9.md",
          "status": "D"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: D: pytest_integration_results.txt, D: pytest_results.txt, M: tests/integration/test_context_flow.py...
- **2025-05-09 (Commit `d46bf20` by David Ryan)**: docs(refactoring): add essential files section to Vector Test Refactoring Progress
<!-- AI_DATA_START
    {
      "hash": "d46bf2022bb88c826cf44438466ac7df338ff510",
      "short_message": "docs(refactoring): add essential files section to Vector Test Refactoring Progress",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector System Test Refactoring Progress May 9.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Testing, Feature
  - Files: M: theory-and-planning/Vector System Test Refactoring Progress May 9.md
- **2025-05-09 (Commit `e36c79d` by David Ryan)**: refactor(tests): implement Mutation 2.3 for test_utils.py dimension assertions
<!-- AI_DATA_START
    {
      "hash": "e36c79d96d51a0730f0297c10ae9066eae8f84ea",
      "short_message": "refactor(tests): implement Mutation 2.3 for test_utils.py dimension assertions",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_utils.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_utils.py
- **2025-05-09 (Commit `f60db1e` by David Ryan)**: refactor(tests): implement Mutation 2.4 for test_utils.py cosine similarity calculation
<!-- AI_DATA_START
    {
      "hash": "f60db1e759ca09f3a624e91f30a4c9d3aa4d967f",
      "short_message": "refactor(tests): implement Mutation 2.4 for test_utils.py cosine similarity calculation",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_utils.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_utils.py
- **2025-05-09 (Commit `f0e5283` by David Ryan)**: include path to theory-and-planning/Essential Files for Comprehensive Understanding Vector Interface Testing.md in theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md.
<!-- AI_DATA_START
    {
      "hash": "f0e5283d6157480acdbdc9137cb2fa2e1f5abd65",
      "short_message": "include path to theory-and-planning/Essential Files for Comprehensive Understanding Vector Interface Testing.md in theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md.",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/# Next Steps for Capability Negotiation .md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Add Sophisticated AI-RAG Capabilities to Django Projects.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Augmented Retrieval- A New Dimension for Any Django Project.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/File-System-Models.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/For Review- Specialized Chunking Strategies and Linguistic Backends for Git-Viewer and Beyond.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Leveraging Vector Semantics for Curriculum Development.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Leveraging Vector Semantics for Document-Enhanced Learning.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Linguistics interface and prompt embedding.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Optimal Chunking Backends & Linguistic Parsing for Educational Content.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Prompt Composition Pipeline- Leveraging the Framework for LLM Integration.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Prompt Expansion as Semantic Enrichment with Linguistics Interface.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Query Embedding for Semantic Search.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Retrieval coordination layer.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/School Teaching & Learning App.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing
  - Files: R: theory-and-planning/# Next Steps for Capability Negotiation .md, R: theory-and-planning/Add Sophisticated AI-RAG Capabilities to Django Projects.md, R: theory-and-planning/Augmented Retrieval- A New Dimension for Any Django Project.md...
- **2025-05-09 (Commit `2439fc5` by David Ryan)**: refactor(tests): implement Mutation 2.5 for test_utils.py non-normalized vector test
<!-- AI_DATA_START
    {
      "hash": "2439fc5463f29209b5f4a8139b91afcb7996ab3a",
      "short_message": "refactor(tests): implement Mutation 2.5 for test_utils.py non-normalized vector test",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_utils.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_utils.py
- **2025-05-09 (Commit `e244c21` by David Ryan)**: fix(tests): fix mock implementation and complete test_utils.py mutations
<!-- AI_DATA_START
    {
      "hash": "e244c216cf248b4e77d7c00b17b083f82c284682",
      "short_message": "fix(tests): fix mock implementation and complete test_utils.py mutations",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_utils.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, BugFix
  - Files: M: tests/unit/semantic/vector/test_utils.py, M: theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md
- **2025-05-09 (Commit `89a4f2e` by David Ryan)**: refactor(tests): implement Mutation 3.1 for test_independence.py dimension fallback assertions
<!-- AI_DATA_START
    {
      "hash": "89a4f2e8480d7d9b2eedcdac23883342c1608317",
      "short_message": "refactor(tests): implement Mutation 3.1 for test_independence.py dimension fallback assertions",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_independence.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_independence.py
- **2025-05-09 (Commit `5fb9fe1` by David Ryan)**: refactor(tests): implement Mutation 3.2 for test_independence.py utils module dimension default
<!-- AI_DATA_START
    {
      "hash": "5fb9fe1828e495e635cf01f161ce59f32e3dee60",
      "short_message": "refactor(tests): implement Mutation 3.2 for test_independence.py utils module dimension default",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_independence.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_independence.py
- **2025-05-09 (Commit `435fb02` by David Ryan)**: refactor(tests): implement Mutation 3.3 for test_independence.py module import assertions
<!-- AI_DATA_START
    {
      "hash": "435fb02d0c57c0baf36dfba08a10e1a333e05cb2",
      "short_message": "refactor(tests): implement Mutation 3.3 for test_independence.py module import assertions",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_independence.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_independence.py, M: theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md
- **2025-05-09 (Commit `40202d7` by David Ryan)**: refactor(tests): implement Mutation 4.1 for test_contract.py store_vectors signature
<!-- AI_DATA_START
    {
      "hash": "40202d7f95909ef71e75af7681bc3bfecf9b37ba",
      "short_message": "refactor(tests): implement Mutation 4.1 for test_contract.py store_vectors signature",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_contract.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_contract.py, M: theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md
- **2025-05-09 (Commit `c959235` by David Ryan)**: refactor(tests): implement Mutation 4.2 for test_contract.py search_vectors signature
<!-- AI_DATA_START
    {
      "hash": "c9592352337e33eb3bfb4717adeb845bf7282aaf",
      "short_message": "refactor(tests): implement Mutation 4.2 for test_contract.py search_vectors signature",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_contract.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_contract.py, M: theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md
- **2025-05-09 (Commit `fb88db2` by David Ryan)**: refactor(tests): implement Mutation 4.3 for test_contract.py delete_vectors signature
<!-- AI_DATA_START
    {
      "hash": "fb88db240708a06b58180eb4fa286102b93ce5f2",
      "short_message": "refactor(tests): implement Mutation 4.3 for test_contract.py delete_vectors signature",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_contract.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_contract.py, M: theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md
- **2025-05-09 (Commit `f8bd4ba` by David Ryan)**: refactor(tests): implement Mutation 4.4 for test_contract.py create_collection signature
<!-- AI_DATA_START
    {
      "hash": "f8bd4ba20e0c68c9bf2d01d02a8eb3273eedb5c4",
      "short_message": "refactor(tests): implement Mutation 4.4 for test_contract.py create_collection signature",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_contract.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_contract.py, M: theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md
- **2025-05-09 (Commit `c43211c` by David Ryan)**: refactor(tests): implement Mutation 4.5 for test_contract.py capability declaration structure
<!-- AI_DATA_START
    {
      "hash": "c43211c0e0666b87baa7c4eb4080b31a4a191d5a",
      "short_message": "refactor(tests): implement Mutation 4.5 for test_contract.py capability declaration structure",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_contract.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_contract.py, M: theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md
- **2025-05-09 (Commit `479b9d6` by David Ryan)**: This completes Steps 3 and 4 of the Vector Test Refactoring Plan. The implementation has achieved the goal of making the vector system contract tests more resilient to backend implementation variations while still ensuring core functionality requirements.
<!-- AI_DATA_START
    {
      "hash": "479b9d6200ceeb7062d6103156c21496c3ba1abd",
      "short_message": "This completes Steps 3 and 4 of the Vector Test Refactoring Plan. The implementation has achieved the goal of making the vector system contract tests more resilient to backend implementation variations while still ensuring core functionality requirements.",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing
  - Files: M: theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md
- **2025-05-09 (Commit `6d3403c` by David Ryan)**: refactor(tests): implement Mutation 5.1 for test_capability_negotiation.py default metric expectation
<!-- AI_DATA_START
    {
      "hash": "6d3403c52243ed3687c559e76ea69481b8d80a33",
      "short_message": "refactor(tests): implement Mutation 5.1 for test_capability_negotiation.py default metric expectation",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_capability_negotiation.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_capability_negotiation.py, M: theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md
- **2025-05-09 (Commit `c844aa9` by David Ryan)**: refactor(tests): implement Mutation 5.2 for test_capability_negotiation.py default format expectation
<!-- AI_DATA_START
    {
      "hash": "c844aa9543ac5ac0d3d5df043fdf5fa09830ea0a",
      "short_message": "refactor(tests): implement Mutation 5.2 for test_capability_negotiation.py default format expectation",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_capability_negotiation.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_capability_negotiation.py, M: theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md
- **2025-05-09 (Commit `4499472` by David Ryan)**: refactor(tests): implement Mutation 6.1 for test_error_recovery.py connection mock path
<!-- AI_DATA_START
    {
      "hash": "4499472b3aa45ce2e45e80b1fc42b72779a161fd",
      "short_message": "refactor(tests): implement Mutation 6.1 for test_error_recovery.py connection mock path",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py
- **2025-05-09 (Commit `e435a63` by David Ryan)**: refactor(tests): implement Mutation 6.2 for test_error_recovery.py service method call
<!-- AI_DATA_START
    {
      "hash": "e435a63a86ce79acd41abdf641a6dc79d65b0d8f",
      "short_message": "refactor(tests): implement Mutation 6.2 for test_error_recovery.py service method call",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, Feature
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py, M: theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md
- **2025-05-09 (Commit `145ab4b` by David Ryan)**: docs(tests): create Vector Tests Status for May 10 with forensic error analysis
<!-- AI_DATA_START
    {
      "hash": "145ab4b72afefc363c30b9324ad22351f0e9a702",
      "short_message": "docs(tests): create Vector Tests Status for May 10 with forensic error analysis",
      "author": "David Ryan",
      "date_iso": "2025-05-09",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 10 Vector Subsystem Tests Phase 4/May 10 Vector Tests Status.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Testing
  - Files: D: theory-and-planning/May 10 Vector Subsystem Tests Phase 4/May 10 Vector Tests Status.md
- **2025-05-08 (Commit `d4eb272` by David Ryan)**: feat(tooling): add LLM-optimized multi-mutation apply script with testing infrastructure
<!-- AI_DATA_START
    {
      "hash": "d4eb272fe8a015521457220f39a2ac112d2f6b79",
      "short_message": "feat(tooling): add LLM-optimized multi-mutation apply script with testing infrastructure",
      "author": "David Ryan",
      "date_iso": "2025-05-08",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/README.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/macos_apply_multi_mutation_diffs.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/README.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/test_apply_mutations.sh",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/test_context_flow_sample.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/vector_test_mutations.yaml",
          "status": "D"
        }
      ],
      "themes": [
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Feature
  - Files: D: theory-and-planning/Support-Scripts/apply-multiple-diffs/README.md, D: theory-and-planning/Support-Scripts/apply-multiple-diffs/macos_apply_multi_mutation_diffs.py, D: theory-and-planning/Support-Scripts/apply-multiple-diffs/test_samples/README.md...
- **2025-05-06 (Commit `6b2c2b0` by David Ryan)**: test(vector): implement test_independence.py updates from alignment plan
<!-- AI_DATA_START
    {
      "hash": "6b2c2b0271e75470f837aa311b90ebdcaebac806",
      "short_message": "test(vector): implement test_independence.py updates from alignment plan",
      "author": "David Ryan",
      "date_iso": "2025-05-06",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_independence.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature
  - Files: M: tests/unit/semantic/vector/test_independence.py, M: theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md
- **2025-05-06 (Commit `9b448e4` by David Ryan)**: test(vector): implement test_error_recovery.py updates from alignment plan
<!-- AI_DATA_START
    {
      "hash": "9b448e4a6570109d9dc2b4422f5873dfd3fddf28",
      "short_message": "test(vector): implement test_error_recovery.py updates from alignment plan",
      "author": "David Ryan",
      "date_iso": "2025-05-06",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature
  - Files: M: tests/unit/semantic/vector/test_error_recovery.py, M: theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md
- **2025-05-06 (Commit `fbb466c` by David Ryan)**: test(vector): implement test_vector_fields.py updates from alignment plan
<!-- AI_DATA_START
    {
      "hash": "fbb466cdfc0c3fd08a38ab5166f0ce5ff819d765",
      "short_message": "test(vector): implement test_vector_fields.py updates from alignment plan",
      "author": "David Ryan",
      "date_iso": "2025-05-06",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_vector_fields.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature
  - Files: M: tests/integration/test_vector_fields.py, M: theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md
- **2025-05-06 (Commit `700ba55` by David Ryan)**: test(vector): implement test_context_flow.py updates from alignment plan
<!-- AI_DATA_START
    {
      "hash": "700ba55ccfa178c9ca60c68e3d59843f5707cf61",
      "short_message": "test(vector): implement test_context_flow.py updates from alignment plan",
      "author": "David Ryan",
      "date_iso": "2025-05-06",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_context_flow.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature
  - Files: M: tests/integration/test_context_flow.py, M: theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md
- **2025-05-06 (Commit `bfd3218` by David Ryan)**: fix(vector-tests): move VectorDatabaseRegistry import to module scope
<!-- AI_DATA_START
    {
      "hash": "bfd32182f7f873a2c52da91885c341b4c1de3de9",
      "short_message": "fix(vector-tests): move VectorDatabaseRegistry import to module scope",
      "author": "David Ryan",
      "date_iso": "2025-05-06",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_contract.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Second Stage Further Features/May 6 Future Looking Next-Gen Rag Elements.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, BugFix
  - Files: M: tests/unit/semantic/vector/test_contract.py, D: theory-and-planning/Second Stage Further Features/May 6 Future Looking Next-Gen Rag Elements.md
- **2025-05-06 (Commit `67038c9` by David Ryan)**: update gitignore to not ignore Support-Scripts scripts but only their outputs.
<!-- AI_DATA_START
    {
      "hash": "67038c92a19b0bdde3d83b8533f63701e541e9fc",
      "short_message": "update gitignore to not ignore Support-Scripts scripts but only their outputs.",
      "author": "David Ryan",
      "date_iso": "2025-05-06",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": ".gitignore",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: .gitignore
- **2025-05-06 (Commit `8e0ca4b` by David Ryan)**: adding version control to SupportScripts dir
<!-- AI_DATA_START
    {
      "hash": "8e0ca4b195fcd799f16575a379150cb87c391dbe",
      "short_message": "adding version control to SupportScripts dir",
      "author": "David Ryan",
      "date_iso": "2025-05-06",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Support-Scripts/README.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/api_contract_analyzer.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/change_impact_analyzer.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/dependency_graph_generator.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/extract_docstrings.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/generate_tree_view.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/mock_access_path_analyzer.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/test_coverage_analyzer.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Support-Scripts/test_implementation_analyzer.py",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: theory-and-planning/Support-Scripts/README.md, D: theory-and-planning/Support-Scripts/api_contract_analyzer.py, D: theory-and-planning/Support-Scripts/change_impact_analyzer.py...
- **2025-05-06 (Commit `fa939a4` by David Ryan)**: feat(tooling): add specialized analysis scripts for test-implementation alignment
<!-- AI_DATA_START
    {
      "hash": "fa939a45d1d55d8c6bce4d50b7345dea3d3f0240",
      "short_message": "feat(tooling): add specialized analysis scripts for test-implementation alignment",
      "author": "David Ryan",
      "date_iso": "2025-05-06",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Support-Scripts/test_implementation_analyzer.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Feature
  - Files: M: theory-and-planning/Support-Scripts/test_implementation_analyzer.py
- **2025-05-06 (Commit `a5dec2a` by David Ryan)**: docs(tooling): update Support-Scripts README with new analysis tools
<!-- AI_DATA_START
    {
      "hash": "a5dec2ae562ce78baa848353c33d6e764cce15f6",
      "short_message": "docs(tooling): update Support-Scripts README with new analysis tools",
      "author": "David Ryan",
      "date_iso": "2025-05-06",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Support-Scripts/README.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: theory-and-planning/Support-Scripts/README.md
- **2025-05-06 (Commit `342160c` by David Ryan)**: fix(tooling): improve mock_access_path_analyzer for robust function path detection
<!-- AI_DATA_START
    {
      "hash": "342160c1f993aa4934a8b83f1ee3a88775f29c85",
      "short_message": "fix(tooling): improve mock_access_path_analyzer for robust function path detection",
      "author": "David Ryan",
      "date_iso": "2025-05-06",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Support-Scripts/mock_access_path_analyzer.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement, BugFix
  - Files: M: theory-and-planning/Support-Scripts/mock_access_path_analyzer.py
- **2025-05-06 (Commit `f395b79` by David Ryan)**: feat(tooling): add enhanced_apply_diff.py with error reduction features
<!-- AI_DATA_START
    {
      "hash": "f395b799a76451a55b37ac8bd0d4f5935905540d",
      "short_message": "feat(tooling): add enhanced_apply_diff.py with error reduction features",
      "author": "David Ryan",
      "date_iso": "2025-05-06",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/enhanced_apply_diff.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: theory-and-planning/Vector System Test Refactoring 3 May 6/enhanced_apply_diff.py
- **2025-05-06 (Commit `6376193` by David Ryan)**: feat(security): add simple_apply_diff.py script for controlled file modifications
<!-- AI_DATA_START
    {
      "hash": "6376193b2ed620ffecf2184aca5540e98bd9673d",
      "short_message": "feat(security): add simple_apply_diff.py script for controlled file modifications",
      "author": "David Ryan",
      "date_iso": "2025-05-06",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "programming_scripts/simple_apply_diff.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/May 6 Handoff - Vector System Test Refactoring.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan.md",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: programming_scripts/simple_apply_diff.py, D: theory-and-planning/Vector System Test Refactoring 3 May 6/May 6 Handoff - Vector System Test Refactoring.md, D: theory-and-planning/Vector System Test Refactoring 3 May 6/Vector-Test-Refactoring-Plan-Revised.md...
- **2025-05-06 (Commit `f36ac77` by David Ryan)**: feat(security): add macOS-native SafeFileEditor with atomic operations
<!-- AI_DATA_START
    {
      "hash": "f36ac770e8fea847a973facfd39a7b613e110667",
      "short_message": "feat(security): add macOS-native SafeFileEditor with atomic operations",
      "author": "David Ryan",
      "date_iso": "2025-05-06",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "programming_scripts/macos_apply_diff.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: programming_scripts/macos_apply_diff.py
- **2025-05-05 (Commit `9c6f8d2` by David Ryan)**: docs(vector): create comprehensive Vector Interface system knowledge map
<!-- AI_DATA_START
    {
      "hash": "9c6f8d241128d12f0f7d39328b42e32a455507fe",
      "short_message": "docs(vector): create comprehensive Vector Interface system knowledge map",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Context.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: D: theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Context.md
- **2025-05-05 (Commit `f7b86a0` by David Ryan)**: feat(vector): create utils.py module to centralize utility functions
<!-- AI_DATA_START
    {
      "hash": "f7b86a04962391c7baf97fd0a353482cecd97425",
      "short_message": "feat(vector): create utils.py module to centralize utility functions",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Context.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/utils.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Context.md, D: viewer/semantic/vector/utils.py
- **2025-05-05 (Commit `4dbe29d` by David Ryan)**: refactor(vector): update __init__.py to use centralized utility functions
<!-- AI_DATA_START
    {
      "hash": "4dbe29d9a3f8e387859e1e07155938364a0b6085",
      "short_message": "refactor(vector): update __init__.py to use centralized utility functions",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/__init__.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Refactor/Improvement
  - Files: M: theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md, M: viewer/semantic/vector/__init__.py
- **2025-05-05 (Commit `769f58e` by David Ryan)**: refactor(vector): update service.py to import directly from utils module
<!-- AI_DATA_START
    {
      "hash": "769f58e2a990bbcabdf5abee294824b27d4a720d",
      "short_message": "refactor(vector): update service.py to import directly from utils module",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/service.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Refactor/Improvement
  - Files: M: theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md, M: viewer/semantic/vector/service.py
- **2025-05-05 (Commit `9e48350` by David Ryan)**: refactor(vector): update PostgreSQL backend to use utility functions
<!-- AI_DATA_START
    {
      "hash": "9e4835060063defb8aba556cbb4d380d28e9cea3",
      "short_message": "refactor(vector): update PostgreSQL backend to use utility functions",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/backends/postgresql.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Refactor/Improvement
  - Files: M: theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md, M: viewer/semantic/vector/backends/postgresql.py
- **2025-05-05 (Commit `05a8982` by David Ryan)**: refactor(vector): update memory backend to use centralized utility functions
<!-- AI_DATA_START
    {
      "hash": "05a8982efd00b4bc0154859ca4244d2f49c718b3",
      "short_message": "refactor(vector): update memory backend to use centralized utility functions",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/backends/memory.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Refactor/Improvement
  - Files: M: theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md, M: viewer/semantic/vector/backends/memory.py
- **2025-05-05 (Commit `2698f9f` by David Ryan)**: refactor(vector): update registry.py to use centralized metadata utilities
<!-- AI_DATA_START
    {
      "hash": "2698f9f62d52218a25138a525b0288afa752aa61",
      "short_message": "refactor(vector): update registry.py to use centralized metadata utilities",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Refactor/Improvement
  - Files: M: theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md, M: viewer/semantic/registry.py
- **2025-05-05 (Commit `6994f1a` by David Ryan)**: refactor(vector): update fields.py to use centralized utility functions
<!-- AI_DATA_START
    {
      "hash": "6994f1ad41dc1266aac06d31949be55793cfbfe8",
      "short_message": "refactor(vector): update fields.py to use centralized utility functions",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Refactor/Improvement
  - Files: M: theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md, M: viewer/semantic/vector/fields.py
- **2025-05-05 (Commit `ad1cc18` by David Ryan)**: docs(vector): update documentation after utils refactoring implementation
<!-- AI_DATA_START
    {
      "hash": "ad1cc18cd5bc8c904ba5afffa81be8860e85a238",
      "short_message": "docs(vector): update documentation after utils refactoring implementation",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/Context-and-Knowledge-for-Vector-System-Testing-Update.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Context-Update.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: D: theory-and-planning/May-5-Vector-System-Testing/Context-and-Knowledge-for-Vector-System-Testing-Update.md, D: theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Context-Update.md
- **2025-05-05 (Commit `22314c4` by David Ryan)**: docs(vector): enhance test plan with invisible commas issue validation
<!-- AI_DATA_START
    {
      "hash": "22314c498540f3850d9016c967afc1f8677df699",
      "short_message": "docs(vector): enhance test plan with invisible commas issue validation",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Test-Implementation-Plan.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Testing
  - Files: D: theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Test-Implementation-Plan.md
- **2025-05-05 (Commit `7c4e8c3` by David Ryan)**: test(vector): create test_utils.py for comprehensive utility testing
<!-- AI_DATA_START
    {
      "hash": "7c4e8c375d86245feadb234fa5272174c0f0e0ff",
      "short_message": "test(vector): create test_utils.py for comprehensive utility testing",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_utils.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing
  - Files: D: tests/unit/semantic/vector/test_utils.py
- **2025-05-05 (Commit `d7775a7` by David Ryan)**: test(vector): update context flow tests to use utils module
<!-- AI_DATA_START
    {
      "hash": "d7775a74622c8b3f29607c2931ff8132f14c6332",
      "short_message": "test(vector): update context flow tests to use utils module",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_context_flow.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing
  - Files: M: tests/integration/test_context_flow.py
- **2025-05-05 (Commit `411a510` by David Ryan)**: test(vector): update independence tests for utils module
<!-- AI_DATA_START
    {
      "hash": "411a5107553e710b45149b895cc92065cff29850",
      "short_message": "test(vector): update independence tests for utils module",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_independence.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing
  - Files: M: tests/unit/semantic/vector/test_independence.py
- **2025-05-05 (Commit `65e33d9` by David Ryan)**: test(vector): update cross-backend consistency tests to use utils module
<!-- AI_DATA_START
    {
      "hash": "65e33d9577f7f036ce960b43d40dcbd8f26932b4",
      "short_message": "test(vector): update cross-backend consistency tests to use utils module",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_cross_backend_consistency.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing
  - Files: M: tests/integration/test_cross_backend_consistency.py
- **2025-05-05 (Commit `00416cb` by David Ryan)**: test(vector): update vector fields tests to verify utils module usage
<!-- AI_DATA_START
    {
      "hash": "00416cb740e82e6fb5051fd15355e20d672f83cf",
      "short_message": "test(vector): update vector fields tests to verify utils module usage",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_vector_fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing
  - Files: M: tests/integration/test_vector_fields.py
- **2025-05-05 (Commit `fc6a49a` by David Ryan)**: test(vector): add Django configuration to conftest.py for integration tests
<!-- AI_DATA_START
    {
      "hash": "fc6a49a67fb847ae6b0a12fae365f80656953f5f",
      "short_message": "test(vector): add Django configuration to conftest.py for integration tests",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/conftest.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature
  - Files: M: tests/conftest.py
- **2025-05-05 (Commit `5258710` by David Ryan)**: test(vector): add Git-related settings to conftest.py
<!-- AI_DATA_START
    {
      "hash": "5258710f4fecb44142f25e65824147d090e9d434",
      "short_message": "test(vector): add Git-related settings to conftest.py",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/conftest.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature
  - Files: M: tests/conftest.py
- **2025-05-05 (Commit `2bdfedc` by David Ryan)**: test(vector): fix module import independence test to prevent DB access
<!-- AI_DATA_START
    {
      "hash": "2bdfedcd4312c5a57dd3676c614ca80fa595aeb5",
      "short_message": "test(vector): fix module import independence test to prevent DB access",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_independence.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, BugFix
  - Files: M: tests/unit/semantic/vector/test_independence.py
- **2025-05-05 (Commit `8c58876` by David Ryan)**: test(vector): add automatic backend registration to conftest.py
<!-- AI_DATA_START
    {
      "hash": "8c588764f45fd2cebd070baa20b655a28dc75830",
      "short_message": "test(vector): add automatic backend registration to conftest.py",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/conftest.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature
  - Files: M: tests/conftest.py
- **2025-05-05 (Commit `cd86e11` by David Ryan)**: docs(vector): create comprehensive test alignment implementation plan: theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md
<!-- AI_DATA_START
    {
      "hash": "cd86e113c7c6a2d46fd07a25ca7928df51ff1dd8",
      "short_message": "docs(vector): create comprehensive test alignment implementation plan: theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Testing
  - Files: D: theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md
- **2025-05-05 (Commit `1dd1077` by David Ryan)**: test(vector): implement test_utils.py updates from alignment plan
<!-- AI_DATA_START
    {
      "hash": "1dd1077d1a35e7ce5e8e76f40ae5ed365e6e7261",
      "short_message": "test(vector): implement test_utils.py updates from alignment plan",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_utils.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature
  - Files: M: tests/unit/semantic/vector/test_utils.py, M: theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md
- **2025-05-05 (Commit `c5ce8fc` by David Ryan)**: test(vector): implement test_contract.py updates from alignment plan
<!-- AI_DATA_START
    {
      "hash": "c5ce8fcfd3c439b57aa5c459e14e4698017d9767",
      "short_message": "test(vector): implement test_contract.py updates from alignment plan",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_contract.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature
  - Files: M: tests/unit/semantic/vector/test_contract.py
- **2025-05-05 (Commit `6d8e204` by David Ryan)**: test(vector): implement test_capability_negotiation.py updates from alignment plan
<!-- AI_DATA_START
    {
      "hash": "6d8e204c79d44bc3572d95f7305edb24b423d946",
      "short_message": "test(vector): implement test_capability_negotiation.py updates from alignment plan",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/unit/semantic/vector/test_capability_negotiation.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature
  - Files: M: tests/unit/semantic/vector/test_capability_negotiation.py
- **2025-05-05 (Commit `313c60b` by David Ryan)**: add Support-Scripts to gitignore. Support-Scripts/Output contains tree views of main project dirs and extracted docstrings for all files in main project dirs.
<!-- AI_DATA_START
    {
      "hash": "313c60bb7e258a4c1008036b9694b53d717979f5",
      "short_message": "add Support-Scripts to gitignore. Support-Scripts/Output contains tree views of main project dirs and extracted docstrings for all files in main project dirs.",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": ".gitignore",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: .gitignore
- **2025-05-05 (Commit `e679399` by David Ryan)**: feat(tooling): add scripts to support token-efficient consumption of actionable insights into the codebase. See theory-and-planning/Support-Scripts/README.md
<!-- AI_DATA_START
    {
      "hash": "e6793998103a2ca67162b9db53aec0af2b62dba4",
      "short_message": "feat(tooling): add scripts to support token-efficient consumption of actionable insights into the codebase. See theory-and-planning/Support-Scripts/README.md",
      "author": "David Ryan",
      "date_iso": "2025-05-05",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: theory-and-planning/May-5-Vector-System-Testing/May-5-Complete-Set-of-Test-Updates-Required-for-Full-Alignment.md

**Overall Themes for Period:**
<!-- AI_DATA_START
  {
    "themes_summary": [
      {
        "theme": "Testing",
        "count": 82
      },
      {
        "theme": "Feature",
        "count": 63
      },
      {
        "theme": "Vector/Embedding",
        "count": 50
      },
      {
        "theme": "Refactor/Improvement",
        "count": 40
      },
      {
        "theme": "Documentation",
        "count": 26
      },
      {
        "theme": "BugFix",
        "count": 22
      },
      {
        "theme": "General Update",
        "count": 7
      },
      {
        "theme": "Semantic Subsystem",
        "count": 1
      }
    ]
  }
AI_DATA_END -->
- Testing: 82 mentions/commits
- Feature: 63 mentions/commits
- Vector/Embedding: 50 mentions/commits
- Refactor/Improvement: 40 mentions/commits
- Documentation: 26 mentions/commits
- BugFix: 22 mentions/commits
- General Update: 7 mentions/commits
- Semantic Subsystem: 1 mentions/commits

---

## Development Period: 2025-04-28 to 2025-05-04
(2025-04-28 to 2025-05-04)

<!-- AI_DATA_START
  {
    "label": "2025-04-28 to 2025-05-04",
    "start_date_iso": "2025-04-28",
    "end_date_iso": "2025-05-04",
    "commit_count": 320,
    "new_modules": [
      "analysis_output.txt",
      "git_commit_viewer_analysis.md",
      "line_analysis.txt",
      "test_output.txt",
      "test_rerun.txt",
      "tests.integration.test_capability_negotiation",
      "tests.integration.test_capability_negotiation copy",
      "theory-and-planning.April 29 Implementation Plan- pgvector for Git Commit Viewer.md",
      "theory-and-planning.April 30 Comprehensively Refactor Git Status to impose no assumptions.md",
      "theory-and-planning.April 30 Next Steps for generating embeddings.md",
      "theory-and-planning.May 1 7-42-am diary.MD",
      "theory-and-planning.May 1 Services Directory.md",
      "theory-and-planning.May 1 Settings.md",
      "theory-and-planning.May 1 views py.md",
      "theory-and-planning.May 2 Abstracted LinguisticProcessor.md",
      "theory-and-planning.May 2 Linguistic-Tag-Extraction-Implementation.md",
      "theory-and-planning.May 2 LinguisticProcessor Interface.md",
      "theory-and-planning.May 4 Testing after unified registry updates.Required-Fixes.md",
      "theory-and-planning.Unified-Linguistic-Interface.md",
      "theory-and-planning.Vector-Distance-Lookup-Implementation-Plan.md",
      "theory-and-planning.implementation-possibilities.md",
      "theory-and-planning.unified_registry_aligned.chunking_registry",
      "theory-and-planning.unified_registry_aligned.linguistic_registry",
      "theory-and-planning.unified_registry_aligned.registry_base",
      "theory-and-planning.unified_registry_aligned.zip",
      "viewer.management.commands.populate_tag_dictionaries"
    ],
    "modified_modules": [
      {
        "module": "viewer.models",
        "commit_count": 20,
        "example_commits": [
          "58dc8ed",
          "dfcb269",
          "345a7f5"
        ]
      },
      {
        "module": "theory-and-planning.April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
        "commit_count": 14,
        "example_commits": [
          "7df1f1e",
          "dfcb269",
          "006bd54"
        ]
      },
      {
        "module": "viewer.semantic.registry",
        "commit_count": 14,
        "example_commits": [
          "96152d5",
          "2d02491",
          "29751db"
        ]
      },
      {
        "module": "viewer.apps",
        "commit_count": 13,
        "example_commits": [
          "f51e902",
          "3c24e5c",
          "c0ac220"
        ]
      },
      {
        "module": "git_commit_viewer.settings",
        "commit_count": 11,
        "example_commits": [
          "99e2577",
          "70f06da",
          "f3fb58c"
        ]
      },
      {
        "module": "viewer.services.embedders",
        "commit_count": 11,
        "example_commits": [
          "54f231a",
          "f3fb58c",
          "7040e00"
        ]
      },
      {
        "module": "viewer.pgvector.tests.test_fields",
        "commit_count": 10,
        "example_commits": [
          "d970218",
          "c7df6bb",
          "ad3c287"
        ]
      },
      {
        "module": "README_AI.md",
        "commit_count": 10,
        "example_commits": [
          "80bc33c",
          "cd68074",
          "ad3c287"
        ]
      },
      {
        "module": "theory-and-planning.April-30-git-commit-viewer-files-list.md",
        "commit_count": 10,
        "example_commits": [
          "84bca8e",
          "0118955",
          "dc88b6b"
        ]
      },
      {
        "module": "viewer.management.commands.generate_commit_tags",
        "commit_count": 10,
        "example_commits": [
          "1337c29",
          "344a8ea",
          "88caef5"
        ]
      },
      {
        "module": "viewer.views",
        "commit_count": 9,
        "example_commits": [
          "58dc8ed",
          "a49ff03",
          "dfcb269"
        ]
      },
      {
        "module": "viewer.services.embedder_registry",
        "commit_count": 9,
        "example_commits": [
          "3ad001c",
          "4ffa1be",
          "c94e0c4"
        ]
      },
      {
        "module": "theory-and-planning.chunking interface.Chunking Architecture with Unified Registry Implementation Plan.md",
        "commit_count": 9,
        "example_commits": [
          "c7b539a",
          "37f5a7c",
          "1ad3e63"
        ]
      },
      {
        "module": "tests.integration.test_capability_negotiation",
        "commit_count": 9,
        "example_commits": [
          "730848b",
          "86de861",
          "bb080f8"
        ]
      },
      {
        "module": "theory-and-planning.Vector Interface.Updated Vector Interface Implementation Plan.md",
        "commit_count": 9,
        "example_commits": [
          "b944a72",
          "4c871d6",
          "7203d17"
        ]
      },
      {
        "module": "theory-and-planning.April 29 Implementation Plan- pgvector for Git Commit Viewer.md",
        "commit_count": 8,
        "example_commits": [
          "345a7f5",
          "de32fe9",
          "c99ab74"
        ]
      },
      {
        "module": "viewer.pgvector.fields",
        "commit_count": 8,
        "example_commits": [
          "d970218",
          "01c1155",
          "ad3c287"
        ]
      },
      {
        "module": "viewer.pgvector.lookups",
        "commit_count": 8,
        "example_commits": [
          "d970218",
          "ece8395",
          "ad3c287"
        ]
      },
      {
        "module": "viewer.pgvector.expressions",
        "commit_count": 8,
        "example_commits": [
          "a5456c5",
          "bb76b59",
          "42d8a8b"
        ]
      },
      {
        "module": "viewer.semantic.chunking.__init__",
        "commit_count": 8,
        "example_commits": [
          "dbfd0d7",
          "2b31f3f",
          "819a379"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Session-Summary.md",
        "commit_count": 8,
        "example_commits": [
          "a9b043d",
          "0eebec7",
          "e72a957"
        ]
      },
      {
        "module": "requirements.txt",
        "commit_count": 7,
        "example_commits": [
          "2ac5641",
          "99e2577",
          "f3fb58c"
        ]
      },
      {
        "module": "viewer.admin",
        "commit_count": 6,
        "example_commits": [
          "dfcb269",
          "e81ca49",
          "ad3c287"
        ]
      },
      {
        "module": "viewer.semantic.decorators",
        "commit_count": 6,
        "example_commits": [
          "cc26957",
          "f3fb58c",
          "4437408"
        ]
      },
      {
        "module": "theory-and-planning.April 29 Chunking Service Implementation.md",
        "commit_count": 6,
        "example_commits": [
          "60c0283",
          "75f3d6b",
          "0fcdc0e"
        ]
      },
      {
        "module": "theory-and-planning.Advanced Unified Registry System.Unified_Registry_System_Implementation_Plan.md",
        "commit_count": 6,
        "example_commits": [
          "4ee0ad2",
          "47035ad",
          "c981562"
        ]
      },
      {
        "module": "viewer.semantic.linguistic.__init__",
        "commit_count": 6,
        "example_commits": [
          "9ce8acc",
          "ef60c94",
          "8fcd9db"
        ]
      },
      {
        "module": "viewer.pgvector.__init__",
        "commit_count": 5,
        "example_commits": [
          "d970218",
          "a7382b9",
          "ad3c287"
        ]
      },
      {
        "module": "theory-and-planning.April 30 Next Steps for generating embeddings.md",
        "commit_count": 5,
        "example_commits": [
          "f8bfcaf",
          "3a26ec7",
          "551a2fe"
        ]
      },
      {
        "module": "viewer.management.commands.generate_embeddings",
        "commit_count": 5,
        "example_commits": [
          "4ee84bb",
          "9b0dd9b",
          "ef1e836"
        ]
      },
      {
        "module": "viewer.management.commands.semantic_search",
        "commit_count": 5,
        "example_commits": [
          "4ee84bb",
          "9b0dd9b",
          "6ded46f"
        ]
      },
      {
        "module": "documentation.Git-Commit-Viewer-Management-Commands.md",
        "commit_count": 5,
        "example_commits": [
          "5e9295c",
          "5e5ee4b",
          "cb5da57"
        ]
      },
      {
        "module": "theory-and-planning.Semantic_Tagging_Implementation_Plan.md",
        "commit_count": 5,
        "example_commits": [
          "1526df8",
          "2e44fa3",
          "1337c29"
        ]
      },
      {
        "module": "theory-and-planning.May 3 Linguistics Interface Implementation Plan.md",
        "commit_count": 5,
        "example_commits": [
          "214b1b9",
          "cda201d",
          "58ab4b1"
        ]
      },
      {
        "module": "viewer.pgvector.registry",
        "commit_count": 5,
        "example_commits": [
          "4e80e2e",
          "2d02491",
          "9fdcef6"
        ]
      },
      {
        "module": "viewer.semantic.chunking.service",
        "commit_count": 5,
        "example_commits": [
          "83cb91a",
          "5251981",
          "34fcde3"
        ]
      },
      {
        "module": "viewer.templates.viewer.base.html",
        "commit_count": 4,
        "example_commits": [
          "1ae549e",
          "dfcb269",
          "2c59fd0"
        ]
      },
      {
        "module": "viewer.templates.viewer.list_repositories.html",
        "commit_count": 4,
        "example_commits": [
          "1ae549e",
          "8a19728",
          "a49ff03"
        ]
      },
      {
        "module": "theory-and-planning.Second-Stage Refactoring- Structured Semantic Automation Layer.md",
        "commit_count": 4,
        "example_commits": [
          "2dee166",
          "9c50801",
          "e990d40"
        ]
      },
      {
        "module": "viewer.semantic.fields",
        "commit_count": 4,
        "example_commits": [
          "cc26957",
          "f3fb58c",
          "3de3390"
        ]
      },
      {
        "module": "viewer.services.embedding_processor",
        "commit_count": 4,
        "example_commits": [
          "54f231a",
          "f3fb58c",
          "6780927"
        ]
      },
      {
        "module": "theory-and-planning.April 29 pgvector Integration Guide.md",
        "commit_count": 4,
        "example_commits": [
          "345a7f5",
          "de32fe9",
          "e990d40"
        ]
      },
      {
        "module": ".gitignore",
        "commit_count": 4,
        "example_commits": [
          "f2c8d7c",
          "32a7961",
          "8eb828b"
        ]
      },
      {
        "module": "viewer.management.commands.clear_data",
        "commit_count": 4,
        "example_commits": [
          "77a0f18",
          "b22f858",
          "c411da9"
        ]
      },
      {
        "module": "viewer.management.commands.add_self",
        "commit_count": 4,
        "example_commits": [
          "5a09c0f",
          "02203a3",
          "7dcf626"
        ]
      },
      {
        "module": "Git-Commit-Viewer-Management-Commands.md",
        "commit_count": 4,
        "example_commits": [
          "411f65e",
          "e46faaf",
          "d9fc58d"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Abstract Embedding Configuration Model.md",
        "commit_count": 4,
        "example_commits": [
          "f27a5ee",
          "e46faaf",
          "e990d40"
        ]
      },
      {
        "module": "README.md",
        "commit_count": 4,
        "example_commits": [
          "3d7906c",
          "e46faaf",
          "e00eeae"
        ]
      },
      {
        "module": "theory-and-planning.May 1 7-42-am diary.MD",
        "commit_count": 4,
        "example_commits": [
          "3d7906c",
          "e46faaf",
          "e990d40"
        ]
      },
      {
        "module": "theory-and-planning.Embedding-Configuration-System.md",
        "commit_count": 4,
        "example_commits": [
          "e00eeae",
          "4ffa1be",
          "d9fc58d"
        ]
      },
      {
        "module": "theory-and-planning.Dimension Issues Refactoring.Cline May 1 Embedding_Dimension_Refactoring_Plan.md",
        "commit_count": 4,
        "example_commits": [
          "d9fc58d",
          "94c547d",
          "e990d40"
        ]
      },
      {
        "module": "theory-and-planning.Dimension Issues Refactoring.DaFu May 1 Dimensions Refactoring.md",
        "commit_count": 4,
        "example_commits": [
          "d9fc58d",
          "94c547d",
          "e990d40"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Atomic Chunking Abstractions Possibilities.md",
        "commit_count": 4,
        "example_commits": [
          "6e3cb9f",
          "5e5ee4b",
          "e990d40"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Django Chunking Implementation.md",
        "commit_count": 4,
        "example_commits": [
          "6e2d546",
          "5e5ee4b",
          "e990d40"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Code Analysis Chunking.md",
        "commit_count": 4,
        "example_commits": [
          "f3e66e5",
          "5e5ee4b",
          "e990d40"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Language Agnostic Code Analysis.md",
        "commit_count": 4,
        "example_commits": [
          "f3e66e5",
          "5e5ee4b",
          "e990d40"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Swift and TypeScript Analysis.md",
        "commit_count": 4,
        "example_commits": [
          "f3e66e5",
          "5e5ee4b",
          "e990d40"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Code Comments Model.md",
        "commit_count": 4,
        "example_commits": [
          "3eb3bdd",
          "5e5ee4b",
          "e990d40"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Possible UI Buttons Left Column:Panel.md",
        "commit_count": 4,
        "example_commits": [
          "3eb3bdd",
          "5e5ee4b",
          "e990d40"
        ]
      },
      {
        "module": "viewer.management.commands.sync_vector_dimensions",
        "commit_count": 4,
        "example_commits": [
          "02edd3b",
          "3dc0e93",
          "cbfd328"
        ]
      },
      {
        "module": "viewer.management.commands.test_dimension_fix",
        "commit_count": 4,
        "example_commits": [
          "f872466",
          "5e5ee4b",
          "bdd4dae"
        ]
      },
      {
        "module": "viewer.services.tag_normalization_service",
        "commit_count": 4,
        "example_commits": [
          "79f2198",
          "57ea18c",
          "f4dd2a1"
        ]
      },
      {
        "module": "theory-and-planning.chunking interface.test_chunking_service",
        "commit_count": 4,
        "example_commits": [
          "82754c7",
          "c981562",
          "17ebd3e"
        ]
      },
      {
        "module": "theory-and-planning.May 3 Unified Registry System Design.md",
        "commit_count": 4,
        "example_commits": [
          "aca4c6e",
          "572e958",
          "4ee0ad2"
        ]
      },
      {
        "module": "theory-and-planning.Advanced Unified Registry System.Implementation Impact Analysis- Unified Registry System & Chunking Architecture.md",
        "commit_count": 4,
        "example_commits": [
          "4ee0ad2",
          "c981562",
          "dd8d989"
        ]
      },
      {
        "module": "theory-and-planning.Advanced Unified Registry System.Unified Registry System & Linguistics Interface- Implementation Impact Analysis.md",
        "commit_count": 4,
        "example_commits": [
          "4ee0ad2",
          "c981562",
          "dd8d989"
        ]
      },
      {
        "module": "theory-and-planning.Advanced Unified Registry System.Unified Registry System Impact- Embedder Registry.md",
        "commit_count": 4,
        "example_commits": [
          "4ee0ad2",
          "c981562",
          "dd8d989"
        ]
      },
      {
        "module": "theory-and-planning.Linguistics interface.Linguistics Implementation Plan for Unified Registry System.md",
        "commit_count": 4,
        "example_commits": [
          "608aa48",
          "2d02491",
          "dd8d989"
        ]
      },
      {
        "module": "theory-and-planning.Tagging system.Tag System with Unified Registry Implementation.md",
        "commit_count": 4,
        "example_commits": [
          "da892fc",
          "2d02491",
          "dd8d989"
        ]
      },
      {
        "module": "theory-and-planning.Advanced Unified Registry System.Enhancing the Prompt-Composition Pipeline with Unified Registry System.md",
        "commit_count": 4,
        "example_commits": [
          "6eee2cc",
          "2d02491",
          "dd8d989"
        ]
      },
      {
        "module": "documentation.Chunking-Architecture.md",
        "commit_count": 4,
        "example_commits": [
          "7eb0329",
          "ddb67a4",
          "5251981"
        ]
      },
      {
        "module": "viewer.semantic.tagging.service",
        "commit_count": 4,
        "example_commits": [
          "88caef5",
          "34fcde3",
          "0bb6dc9"
        ]
      },
      {
        "module": "tests.integration.test_initialization",
        "commit_count": 4,
        "example_commits": [
          "730848b",
          "314b302",
          "13df2a7"
        ]
      },
      {
        "module": "tests.package.test_independence",
        "commit_count": 4,
        "example_commits": [
          "730848b",
          "4c871d6",
          "16ed965"
        ]
      },
      {
        "module": "theory-and-planning.May 4 Testing after unified registry updates.May 4 Context System and Capability Negotiation Test Failures and Fixes.md",
        "commit_count": 4,
        "example_commits": [
          "0272102",
          "129a7e4",
          "5135dbb"
        ]
      },
      {
        "module": "theory-and-planning.Vector Interface.Implementation-Progress-Report.md",
        "commit_count": 4,
        "example_commits": [
          "b2edb27",
          "25d9145",
          "ad35346"
        ]
      },
      {
        "module": "viewer.services.chunkers",
        "commit_count": 3,
        "example_commits": [
          "fca0808",
          "75f3d6b",
          "4804085"
        ]
      },
      {
        "module": "viewer.pgvector.apps",
        "commit_count": 3,
        "example_commits": [
          "d970218",
          "2af445c",
          "ad3c287"
        ]
      },
      {
        "module": "viewer.pgvector.indexes",
        "commit_count": 3,
        "example_commits": [
          "d970218",
          "d4345ef",
          "ad3c287"
        ]
      },
      {
        "module": "viewer.pgvector.management.commands.install_pgvector",
        "commit_count": 3,
        "example_commits": [
          "d970218",
          "b0697b4",
          "ad3c287"
        ]
      },
      {
        "module": "April 30 Comprehensively Refactor Git Status to impose no assumptions.md",
        "commit_count": 3,
        "example_commits": [
          "95dbeda",
          "ad3c287",
          "d799343"
        ]
      },
      {
        "module": "April 30 Status Notes and Thoughts.md",
        "commit_count": 3,
        "example_commits": [
          "d799343",
          "7040e00",
          "9c50801"
        ]
      },
      {
        "module": "theory-and-planning.April-30-custom-prompt-composition-pipeline.md",
        "commit_count": 3,
        "example_commits": [
          "dee56d6",
          "e990d40",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.April-30-Git-Commit-Viewer-Cline-Musings.md",
        "commit_count": 3,
        "example_commits": [
          "a3da5cd",
          "e990d40",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Database elements NOT currently being chunked and embedded.md",
        "commit_count": 3,
        "example_commits": [
          "28fa665",
          "e990d40",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Models with Embedding Fields.md",
        "commit_count": 3,
        "example_commits": [
          "28fa665",
          "e990d40",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Services Directory.md",
        "commit_count": 3,
        "example_commits": [
          "28fa665",
          "e990d40",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Settings.md",
        "commit_count": 3,
        "example_commits": [
          "28fa665",
          "e990d40",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Update Repository command.md",
        "commit_count": 3,
        "example_commits": [
          "28fa665",
          "d9fc58d",
          "94c547d"
        ]
      },
      {
        "module": "theory-and-planning.May 1 views py.md",
        "commit_count": 3,
        "example_commits": [
          "28fa665",
          "e990d40",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.implementation-possibilities.md",
        "commit_count": 3,
        "example_commits": [
          "020b9c6",
          "d9fc58d",
          "94c547d"
        ]
      },
      {
        "module": "theory-and-planning.Vector-Distance-Lookup-Implementation-Plan.md",
        "commit_count": 3,
        "example_commits": [
          "79f527a",
          "d9fc58d",
          "94c547d"
        ]
      },
      {
        "module": "theory-and-planning.May 1 implementation-possibilities.md",
        "commit_count": 3,
        "example_commits": [
          "c0d4002",
          "e990d40",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Fork Clone Model Ideas.md",
        "commit_count": 3,
        "example_commits": [
          "f3e66e5",
          "5e5ee4b",
          "6329c2f"
        ]
      },
      {
        "module": "viewer.services.nlp_service",
        "commit_count": 3,
        "example_commits": [
          "e048940",
          "5f12540",
          "4c871d6"
        ]
      },
      {
        "module": "viewer.management.commands.populate_tag_dictionaries",
        "commit_count": 3,
        "example_commits": [
          "7449003",
          "d73844b",
          "db6e6ef"
        ]
      },
      {
        "module": "theory-and-planning.May-3-LP-Interface-Approaches.md",
        "commit_count": 3,
        "example_commits": [
          "214b1b9",
          "e990d40",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.Linguistics interface.Refactored Linguistics Implementation Plan.md",
        "commit_count": 3,
        "example_commits": [
          "97600a2",
          "4d3b174",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.Prompt-Composition Pipeline as a Universal Django NLP Layer.md",
        "commit_count": 3,
        "example_commits": [
          "6eee2cc",
          "2d02491",
          "a7fc2fe"
        ]
      },
      {
        "module": "viewer.semantic.linguistic.models",
        "commit_count": 3,
        "example_commits": [
          "50d0491",
          "34fcde3",
          "4c871d6"
        ]
      },
      {
        "module": "viewer.semantic.linguistic.service",
        "commit_count": 3,
        "example_commits": [
          "2a67bdb",
          "0bb6dc9",
          "4c871d6"
        ]
      },
      {
        "module": "documentation.Unified-Registry-System.md",
        "commit_count": 3,
        "example_commits": [
          "1873cfe",
          "3ede890",
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.After-action unified registry inventory-and-review.Service-Layer-Integration-Analysis.md",
        "commit_count": 3,
        "example_commits": [
          "6e2d7df",
          "dd8d989",
          "44b0ab8"
        ]
      },
      {
        "module": "theory-and-planning.After-action unified registry inventory-and-review.Integration-Testing-Plan.md",
        "commit_count": 3,
        "example_commits": [
          "71eb106",
          "78505bd",
          "44b0ab8"
        ]
      },
      {
        "module": "tests.conftest",
        "commit_count": 3,
        "example_commits": [
          "730848b",
          "365c3ae",
          "4c871d6"
        ]
      },
      {
        "module": "tests.integration.test_contexts",
        "commit_count": 3,
        "example_commits": [
          "730848b",
          "c286ff0",
          "4c871d6"
        ]
      },
      {
        "module": "viewer.semantic.context",
        "commit_count": 3,
        "example_commits": [
          "9ae8ba8",
          "616ac92",
          "4c871d6"
        ]
      },
      {
        "module": "analysis_output.txt",
        "commit_count": 3,
        "example_commits": [
          "6ee8a9d",
          "4c871d6",
          "214163e"
        ]
      },
      {
        "module": "line_analysis.txt",
        "commit_count": 3,
        "example_commits": [
          "6ee8a9d",
          "4c871d6",
          "214163e"
        ]
      },
      {
        "module": "test_rerun.txt",
        "commit_count": 3,
        "example_commits": [
          "6ee8a9d",
          "4c871d6",
          "214163e"
        ]
      },
      {
        "module": "documentation.Capability Negotiation System- Complete Analysis and Implementation pre-success.md",
        "commit_count": 3,
        "example_commits": [
          "17ebd3e",
          "4c871d6",
          "85ed7ed"
        ]
      },
      {
        "module": "documentation.Capability Negotiation System- Successful Implementation.md",
        "commit_count": 3,
        "example_commits": [
          "17ebd3e",
          "4c871d6",
          "85ed7ed"
        ]
      },
      {
        "module": "viewer.semantic.vector.__init__",
        "commit_count": 3,
        "example_commits": [
          "0e9d6ad",
          "09a83d0",
          "23206af"
        ]
      },
      {
        "module": "theory-and-planning.May-5-Vector-System-Testing.May-5-Vector-Interface-Utils-Refactoring-Plan.md",
        "commit_count": 3,
        "example_commits": [
          "0f2088a",
          "321f654",
          "b8e8893"
        ]
      },
      {
        "module": "viewer.migrations.0005_repository_last_fetched",
        "commit_count": 2,
        "example_commits": [
          "d1e7468",
          "dfcb269"
        ]
      },
      {
        "module": "git_commit_viewer_analysis.md",
        "commit_count": 2,
        "example_commits": [
          "dfcb269",
          "3a26ec7"
        ]
      },
      {
        "module": "viewer.urls",
        "commit_count": 2,
        "example_commits": [
          "dfcb269",
          "a65e485"
        ]
      },
      {
        "module": "viewer.semantic.__init__",
        "commit_count": 2,
        "example_commits": [
          "cc26957",
          "f3fb58c"
        ]
      },
      {
        "module": "viewer.semantic.managers",
        "commit_count": 2,
        "example_commits": [
          "cc26957",
          "f3fb58c"
        ]
      },
      {
        "module": "viewer.semantic.mixins",
        "commit_count": 2,
        "example_commits": [
          "cc26957",
          "f3fb58c"
        ]
      },
      {
        "module": "viewer.services.__init__",
        "commit_count": 2,
        "example_commits": [
          "54f231a",
          "f3fb58c"
        ]
      },
      {
        "module": "viewer.pgvector.management.__init__",
        "commit_count": 2,
        "example_commits": [
          "d970218",
          "ad3c287"
        ]
      },
      {
        "module": "viewer.pgvector.management.commands.__init__",
        "commit_count": 2,
        "example_commits": [
          "d970218",
          "ad3c287"
        ]
      },
      {
        "module": "viewer.pgvector.tests.__init__",
        "commit_count": 2,
        "example_commits": [
          "d970218",
          "ad3c287"
        ]
      },
      {
        "module": "viewer.migrations.0006_install_pgvector",
        "commit_count": 2,
        "example_commits": [
          "5245a1c",
          "ad3c287"
        ]
      },
      {
        "module": "viewer.migrations.0007_commitmessagechunk_diffchunk_commit_author_email_and_more",
        "commit_count": 2,
        "example_commits": [
          "cd68074",
          "ad3c287"
        ]
      },
      {
        "module": "viewer.templates.viewer.commit_detail.html",
        "commit_count": 2,
        "example_commits": [
          "2c59fd0",
          "ad3c287"
        ]
      },
      {
        "module": "viewer.migrations.0008_remove_filechange_viewer_file_path_74026f_idx_and_more",
        "commit_count": 2,
        "example_commits": [
          "35fbd61",
          "ad3c287"
        ]
      },
      {
        "module": "April 30 Embed Model Abstractions Possibilities.md",
        "commit_count": 2,
        "example_commits": [
          "0359b24",
          "9c50801"
        ]
      },
      {
        "module": "viewer.management.commands.populate_self",
        "commit_count": 2,
        "example_commits": [
          "edcfb14",
          "e46faaf"
        ]
      },
      {
        "module": "viewer.services.repository_processor",
        "commit_count": 2,
        "example_commits": [
          "edcfb14",
          "e46faaf"
        ]
      },
      {
        "module": "viewer.migrations.0009_embeddingprovider_alter_branch_options_and_more",
        "commit_count": 2,
        "example_commits": [
          "6d10ffe",
          "4ffa1be"
        ]
      },
      {
        "module": "documentation.Tag-System-README.md",
        "commit_count": 2,
        "example_commits": [
          "cb5da57",
          "d551868"
        ]
      },
      {
        "module": "viewer.management.commands.import_tag_taxonomy",
        "commit_count": 2,
        "example_commits": [
          "db6e6ef",
          "d551868"
        ]
      },
      {
        "module": "documentation.Linguistic-Tag-Extraction-Implementation.md",
        "commit_count": 2,
        "example_commits": [
          "7a335c5",
          "af75052"
        ]
      },
      {
        "module": "documentation.Unified-Linguistic-Interface.md",
        "commit_count": 2,
        "example_commits": [
          "baa3179",
          "a3abd6b"
        ]
      },
      {
        "module": "theory-and-planning.May 2 Abstracted LinguisticProcessor.md",
        "commit_count": 2,
        "example_commits": [
          "af75052",
          "214b1b9"
        ]
      },
      {
        "module": "theory-and-planning.May 2 LinguisticProcessor Interface.md",
        "commit_count": 2,
        "example_commits": [
          "6329c2f",
          "214b1b9"
        ]
      },
      {
        "module": "theory-and-planning.Chunking Architecture Implementation Plan.md",
        "commit_count": 2,
        "example_commits": [
          "372361f",
          "82754c7"
        ]
      },
      {
        "module": "theory-and-planning.chunking interface.chunking_config.yaml",
        "commit_count": 2,
        "example_commits": [
          "82754c7",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.April 30 Comprehensively Refactor Git Status to impose no assumptions.md",
        "commit_count": 2,
        "example_commits": [
          "e990d40",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.April 30 Embed Model Abstractions Possibilities.md",
        "commit_count": 2,
        "example_commits": [
          "e990d40",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.April 30 Status Notes and Thoughts.md",
        "commit_count": 2,
        "example_commits": [
          "e990d40",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.May 1 Fork or Clone model ideas.md",
        "commit_count": 2,
        "example_commits": [
          "e990d40",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.Stand alone django-pgvector.md",
        "commit_count": 2,
        "example_commits": [
          "aca4c6e",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.Tagging system.May 3 Tag System Refactoring Leveraging Linguistics and Chunking Interfaces.md",
        "commit_count": 2,
        "example_commits": [
          "aca4c6e",
          "c981562"
        ]
      },
      {
        "module": "theory-and-planning.Linguistics interface.May 3 Linguistics Interface Implementation Plan.md",
        "commit_count": 2,
        "example_commits": [
          "572e958",
          "97600a2"
        ]
      },
      {
        "module": "theory-and-planning.unified_registry_aligned.zip",
        "commit_count": 2,
        "example_commits": [
          "97600a2",
          "4ee0ad2"
        ]
      },
      {
        "module": "theory-and-planning.unified_registry_aligned.chunking_registry",
        "commit_count": 2,
        "example_commits": [
          "97600a2",
          "4ee0ad2"
        ]
      },
      {
        "module": "theory-and-planning.unified_registry_aligned.linguistic_registry",
        "commit_count": 2,
        "example_commits": [
          "97600a2",
          "4ee0ad2"
        ]
      },
      {
        "module": "theory-and-planning.unified_registry_aligned.registry_base",
        "commit_count": 2,
        "example_commits": [
          "97600a2",
          "4ee0ad2"
        ]
      },
      {
        "module": "theory-and-planning.May 3 Architecture Integration Overview.md",
        "commit_count": 2,
        "example_commits": [
          "6eee2cc",
          "2d02491"
        ]
      },
      {
        "module": "viewer.semantic.chunking.base",
        "commit_count": 2,
        "example_commits": [
          "dbfd0d7",
          "5251981"
        ]
      },
      {
        "module": "viewer.semantic.chunking.registry",
        "commit_count": 2,
        "example_commits": [
          "dbfd0d7",
          "5251981"
        ]
      },
      {
        "module": "viewer.semantic.chunking.token_strategy",
        "commit_count": 2,
        "example_commits": [
          "a3a6147",
          "5251981"
        ]
      },
      {
        "module": "viewer.semantic.chunking.paragraph_strategy",
        "commit_count": 2,
        "example_commits": [
          "ad179ec",
          "5251981"
        ]
      },
      {
        "module": "viewer.semantic.chunking.adapters",
        "commit_count": 2,
        "example_commits": [
          "3618e06",
          "5251981"
        ]
      },
      {
        "module": "viewer.semantic.chunking.linguistic_strategy",
        "commit_count": 2,
        "example_commits": [
          "05dfa54",
          "5251981"
        ]
      },
      {
        "module": "viewer.semantic.linguistic.registry",
        "commit_count": 2,
        "example_commits": [
          "d0977a6",
          "ef60c94"
        ]
      },
      {
        "module": "viewer.semantic.tagging.__init__",
        "commit_count": 2,
        "example_commits": [
          "2bb83f7",
          "88caef5"
        ]
      },
      {
        "module": "theory-and-planning.Vector Interface.Vector Interface Implementation Plan for Unified Registry System.md",
        "commit_count": 2,
        "example_commits": [
          "a4b7e43",
          "6913123"
        ]
      },
      {
        "module": "theory-and-planning.After-action unified registry inventory-and-review.Service-Initialization-Dependencies.md",
        "commit_count": 2,
        "example_commits": [
          "ab153eb",
          "44b0ab8"
        ]
      },
      {
        "module": "theory-and-planning.After-action unified registry inventory-and-review.Type-Conversion-Analysis.md",
        "commit_count": 2,
        "example_commits": [
          "ed867ff",
          "44b0ab8"
        ]
      },
      {
        "module": "documentation.Service-Layer-Integration.md",
        "commit_count": 2,
        "example_commits": [
          "dd8d989",
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.After-action unified registry inventory-and-review.Context-Object-Propagation.md",
        "commit_count": 2,
        "example_commits": [
          "dd8d989",
          "44b0ab8"
        ]
      },
      {
        "module": "theory-and-planning.After-action unified registry inventory-and-review.Capability-Negotiation-Analysis.md",
        "commit_count": 2,
        "example_commits": [
          "69f7001",
          "44b0ab8"
        ]
      },
      {
        "module": "theory-and-planning.After-action unified registry inventory-and-review.Integration-Analysis-Summary.md",
        "commit_count": 2,
        "example_commits": [
          "b6d9927",
          "44b0ab8"
        ]
      },
      {
        "module": "theory-and-planning.After-action unified registry inventory-and-review.High-Confidence-Mutations.md",
        "commit_count": 2,
        "example_commits": [
          "a4e0687",
          "44b0ab8"
        ]
      },
      {
        "module": "theory-and-planning.After-action unified registry inventory-and-review.Embedding-Integration-Analysis.md",
        "commit_count": 2,
        "example_commits": [
          "2716061",
          "44b0ab8"
        ]
      },
      {
        "module": "theory-and-planning.After-action unified registry inventory-and-review.Embedding-Integration-Mutations.md",
        "commit_count": 2,
        "example_commits": [
          "90d3c6f",
          "44b0ab8"
        ]
      },
      {
        "module": "tests.README.md",
        "commit_count": 2,
        "example_commits": [
          "730848b",
          "4c871d6"
        ]
      },
      {
        "module": "tests.integration.test_embedding_integration",
        "commit_count": 2,
        "example_commits": [
          "730848b",
          "4c871d6"
        ]
      },
      {
        "module": "tests.integration.test_metadata",
        "commit_count": 2,
        "example_commits": [
          "730848b",
          "4c871d6"
        ]
      },
      {
        "module": "tests.unit.semantic.linguistic.test_registry",
        "commit_count": 2,
        "example_commits": [
          "730848b",
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Project-Structure.md",
        "commit_count": 2,
        "example_commits": [
          "6af2139",
          "4c871d6"
        ]
      },
      {
        "module": "viewer.semantic.adapters",
        "commit_count": 2,
        "example_commits": [
          "e72a957",
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.Vector Interface.Embedding Interface Integration with Vector Interface.md",
        "commit_count": 2,
        "example_commits": [
          "6c05a1a",
          "4c871d6"
        ]
      },
      {
        "module": "viewer.pgvector.context",
        "commit_count": 2,
        "example_commits": [
          "220b061",
          "4c871d6"
        ]
      },
      {
        "module": "viewer.pgvector.service",
        "commit_count": 2,
        "example_commits": [
          "b47e55e",
          "4c871d6"
        ]
      },
      {
        "module": "documentation.Subsystem-Documentation-Updates.md",
        "commit_count": 2,
        "example_commits": [
          "d5a85ce",
          "4c871d6"
        ]
      },
      {
        "module": "documentation.Testing-Execution-Plan.md",
        "commit_count": 2,
        "example_commits": [
          "d67c693",
          "0272102"
        ]
      },
      {
        "module": "documentation.Initialization-Test-Progress.md",
        "commit_count": 2,
        "example_commits": [
          "05b79dc",
          "0272102"
        ]
      },
      {
        "module": "theory-and-planning.May 4 Testing after unified registry updates.Registry-Implementation-Analysis.md",
        "commit_count": 2,
        "example_commits": [
          "0272102",
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 Testing after unified registry updates.Required-Fixes.md",
        "commit_count": 2,
        "example_commits": [
          "0272102",
          "129a7e4"
        ]
      },
      {
        "module": "theory-and-planning.May 4 Testing after unified registry updates.May 4 Proposed Tests To Complete Test Suite.md",
        "commit_count": 2,
        "example_commits": [
          "129a7e4",
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 Testing after unified registry updates.Implementation Error Analysis and Fix Approach.md",
        "commit_count": 2,
        "example_commits": [
          "03ce866",
          "4c871d6"
        ]
      },
      {
        "module": "test_output.txt",
        "commit_count": 2,
        "example_commits": [
          "d4e5f0c",
          "5cb4594"
        ]
      },
      {
        "module": "theory-and-planning.chunking interface.May 4 Additional Chunking Back End Ideas.md",
        "commit_count": 2,
        "example_commits": [
          "d4e5f0c",
          "4c871d6"
        ]
      },
      {
        "module": "tests.integration.test_capability_negotiation copy",
        "commit_count": 2,
        "example_commits": [
          "6ee8a9d",
          "4336f8b"
        ]
      },
      {
        "module": "theory-and-planning.# Next Steps for Capability Negotiation .md",
        "commit_count": 2,
        "example_commits": [
          "17ebd3e",
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.capability-negotiation-comprehensive-implementation-plan.md",
        "commit_count": 2,
        "example_commits": [
          "17ebd3e",
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.Second Stage Further Features.Thinking Out Chunking Backends.md",
        "commit_count": 2,
        "example_commits": [
          "0a5d735",
          "4c871d6"
        ]
      },
      {
        "module": "viewer.semantic.vector.backends.__init__",
        "commit_count": 2,
        "example_commits": [
          "7203d17",
          "5bf512f"
        ]
      },
      {
        "module": "theory-and-planning.Vector Interface.May 4 Proposed Vector Interface Test Coverage Strateg.md",
        "commit_count": 2,
        "example_commits": [
          "214163e",
          "85ed7ed"
        ]
      },
      {
        "module": "theory-and-planning.Vector Interface.Vector-Interface-Testing-Guidelines.md",
        "commit_count": 2,
        "example_commits": [
          "214163e",
          "85ed7ed"
        ]
      },
      {
        "module": "viewer.migrations.0004_alter_commit_commit_date_filechange",
        "commit_count": 1,
        "example_commits": [
          "dfcb269"
        ]
      },
      {
        "module": "viewer.templates.viewer.commit_detail_full.html",
        "commit_count": 1,
        "example_commits": [
          "dfcb269"
        ]
      },
      {
        "module": "viewer.templates.viewer.fetch_commits.html",
        "commit_count": 1,
        "example_commits": [
          "dfcb269"
        ]
      },
      {
        "module": "viewer.templates.viewer.view_commits.html",
        "commit_count": 1,
        "example_commits": [
          "dfcb269"
        ]
      },
      {
        "module": "viewer.migrations.0010_alter_commit_message_embedding_and_more",
        "commit_count": 1,
        "example_commits": [
          "6077370"
        ]
      },
      {
        "module": "viewer.migrations.0011_tagdictionary_canonicaltag_alter_commit_tags_and_more",
        "commit_count": 1,
        "example_commits": [
          "2e44fa3"
        ]
      },
      {
        "module": "viewer.management.commands.manage_tag_dictionary",
        "commit_count": 1,
        "example_commits": [
          "1337c29"
        ]
      },
      {
        "module": "viewer.services.search_service",
        "commit_count": 1,
        "example_commits": [
          "a65e485"
        ]
      },
      {
        "module": "documentation.tag_taxonomy.json",
        "commit_count": 1,
        "example_commits": [
          "db6e6ef"
        ]
      },
      {
        "module": "theory-and-planning.May 2 Linguistic-Tag-Extraction-Implementation.md",
        "commit_count": 1,
        "example_commits": [
          "214b1b9"
        ]
      },
      {
        "module": "theory-and-planning.Unified-Linguistic-Interface.md",
        "commit_count": 1,
        "example_commits": [
          "214b1b9"
        ]
      },
      {
        "module": "theory-and-planning.May 3 Chunking Architecture Implementation Plan.md",
        "commit_count": 1,
        "example_commits": [
          "e990d40"
        ]
      },
      {
        "module": "theory-and-planning.chunking interface.May 3 Chunking Architecture Implementation Plan.md",
        "commit_count": 1,
        "example_commits": [
          "c981562"
        ]
      },
      {
        "module": "viewer.semantic.linguistic.interfaces",
        "commit_count": 1,
        "example_commits": [
          "6676a96"
        ]
      },
      {
        "module": "viewer.semantic.linguistic.backends.__init__",
        "commit_count": 1,
        "example_commits": [
          "429cd26"
        ]
      },
      {
        "module": "viewer.semantic.linguistic.backends.spacy_processor",
        "commit_count": 1,
        "example_commits": [
          "429cd26"
        ]
      },
      {
        "module": "viewer.semantic.linguistic.strategies",
        "commit_count": 1,
        "example_commits": [
          "a7fc2fe"
        ]
      },
      {
        "module": "viewer.management.commands.process_linguistic",
        "commit_count": 1,
        "example_commits": [
          "d55589c"
        ]
      },
      {
        "module": "documentation.Linguistic-Interface.md",
        "commit_count": 1,
        "example_commits": [
          "44b86d7"
        ]
      },
      {
        "module": "documentation.Management-Commands.md",
        "commit_count": 1,
        "example_commits": [
          "44b86d7"
        ]
      },
      {
        "module": "viewer.semantic.linguistic.boundary_provider",
        "commit_count": 1,
        "example_commits": [
          "8fcd9db"
        ]
      },
      {
        "module": "viewer.semantic.tagging.base",
        "commit_count": 1,
        "example_commits": [
          "2bb83f7"
        ]
      },
      {
        "module": "viewer.semantic.tagging.linguistic_strategy",
        "commit_count": 1,
        "example_commits": [
          "2bb83f7"
        ]
      },
      {
        "module": "viewer.semantic.tagging.pattern_strategy",
        "commit_count": 1,
        "example_commits": [
          "2bb83f7"
        ]
      },
      {
        "module": "viewer.semantic.tagging.registry",
        "commit_count": 1,
        "example_commits": [
          "2bb83f7"
        ]
      },
      {
        "module": "viewer.models_tagging",
        "commit_count": 1,
        "example_commits": [
          "88caef5"
        ]
      },
      {
        "module": "viewer.semantic.tagging.adapters",
        "commit_count": 1,
        "example_commits": [
          "88caef5"
        ]
      },
      {
        "module": "viewer.semantic.tagging.chain",
        "commit_count": 1,
        "example_commits": [
          "88caef5"
        ]
      },
      {
        "module": "documentation.Tagging-System.md",
        "commit_count": 1,
        "example_commits": [
          "a868ab4"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Embedding-Integration-Mutations.md",
        "commit_count": 1,
        "example_commits": [
          "6c05a1a"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Capability-Negotiation-Analysis.md",
        "commit_count": 1,
        "example_commits": [
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Context-Object-Propagation.md",
        "commit_count": 1,
        "example_commits": [
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Embedding-Integration-Analysis.md",
        "commit_count": 1,
        "example_commits": [
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.High-Confidence Mutations for Embedding System Integration.md",
        "commit_count": 1,
        "example_commits": [
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.High-Confidence-Mutations.md",
        "commit_count": 1,
        "example_commits": [
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Integration-Analysis-Summary.md",
        "commit_count": 1,
        "example_commits": [
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Integration-Testing-Plan.md",
        "commit_count": 1,
        "example_commits": [
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Service-Initialization-Dependencies.md",
        "commit_count": 1,
        "example_commits": [
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Service-Layer-Integration-Analysis.md",
        "commit_count": 1,
        "example_commits": [
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 After-action unified registry inventory-and-review.Type-Conversion-Analysis.md",
        "commit_count": 1,
        "example_commits": [
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 Testing after unified registry updates.Initialization-Test-Progress.md",
        "commit_count": 1,
        "example_commits": [
          "4c871d6"
        ]
      },
      {
        "module": "theory-and-planning.May 4 Testing after unified registry updates.Testing-Execution-Plan.md",
        "commit_count": 1,
        "example_commits": [
          "4c871d6"
        ]
      },
      {
        "module": "viewer.semantic.vector.models",
        "commit_count": 1,
        "example_commits": [
          "82e1292"
        ]
      },
      {
        "module": "viewer.semantic.vector.interfaces",
        "commit_count": 1,
        "example_commits": [
          "af4c229"
        ]
      },
      {
        "module": "viewer.semantic.vector.registry",
        "commit_count": 1,
        "example_commits": [
          "ad3ed08"
        ]
      },
      {
        "module": "viewer.semantic.vector.backends.postgresql",
        "commit_count": 1,
        "example_commits": [
          "7203d17"
        ]
      },
      {
        "module": "viewer.semantic.vector.backends.memory",
        "commit_count": 1,
        "example_commits": [
          "5bf512f"
        ]
      },
      {
        "module": "viewer.semantic.vector.service",
        "commit_count": 1,
        "example_commits": [
          "09a83d0"
        ]
      },
      {
        "module": "viewer.semantic.vector.fields",
        "commit_count": 1,
        "example_commits": [
          "23206af"
        ]
      },
      {
        "module": "documentation.Vector-Interface-Migration-Guide.md",
        "commit_count": 1,
        "example_commits": [
          "214163e"
        ]
      },
      {
        "module": "documentation.Vector-Interface.md",
        "commit_count": 1,
        "example_commits": [
          "214163e"
        ]
      },
      {
        "module": "theory-and-planning.Vector Interface.Vector Interface Integration Status 3.md",
        "commit_count": 1,
        "example_commits": [
          "a89b4a5"
        ]
      },
      {
        "module": "theory-and-planning.Second Stage Further Features.Prompt-composition-pipeline.md",
        "commit_count": 1,
        "example_commits": [
          "85ed7ed"
        ]
      },
      {
        "module": "vector-interface-migration-plan.md",
        "commit_count": 1,
        "example_commits": [
          "85ed7ed"
        ]
      },
      {
        "module": "tests.integration.test_context_flow",
        "commit_count": 1,
        "example_commits": [
          "fb3b1d0"
        ]
      },
      {
        "module": "tests.integration.test_cross_backend_consistency",
        "commit_count": 1,
        "example_commits": [
          "fb3b1d0"
        ]
      },
      {
        "module": "tests.integration.test_vector_fields",
        "commit_count": 1,
        "example_commits": [
          "fb3b1d0"
        ]
      },
      {
        "module": "tests.unit.semantic.vector.test_capability_negotiation",
        "commit_count": 1,
        "example_commits": [
          "fb3b1d0"
        ]
      },
      {
        "module": "tests.unit.semantic.vector.test_contract",
        "commit_count": 1,
        "example_commits": [
          "fb3b1d0"
        ]
      },
      {
        "module": "tests.unit.semantic.vector.test_error_recovery",
        "commit_count": 1,
        "example_commits": [
          "fb3b1d0"
        ]
      },
      {
        "module": "tests.unit.semantic.vector.test_independence",
        "commit_count": 1,
        "example_commits": [
          "fb3b1d0"
        ]
      },
      {
        "module": "theory-and-planning.May-5-Vector-System-Testing.Context-and-Knowledge-for-Vector-System-Testing.md",
        "commit_count": 1,
        "example_commits": [
          "5c983b6"
        ]
      }
    ],
    "architectural_notes": [
      {
        "id": "arch_note_20250512111007904980",
        "text": "Core models (`viewer.models`) show interaction with the `viewer.semantic.vector` subsystem, indicating integration of vector capabilities."
      }
    ]
  }
AI_DATA_END -->
**Total Commits:** 320

**New Modules Introduced:** analysis_output.txt, git_commit_viewer_analysis.md, line_analysis.txt, test_output.txt, test_rerun.txt, tests.integration.test_capability_negotiation, tests.integration.test_capability_negotiation copy, theory-and-planning.April 29 Implementation Plan- pgvector for Git Commit Viewer.md, theory-and-planning.April 30 Comprehensively Refactor Git Status to impose no assumptions.md, theory-and-planning.April 30 Next Steps for generating embeddings.md, theory-and-planning.May 1 7-42-am diary.MD, theory-and-planning.May 1 Services Directory.md, theory-and-planning.May 1 Settings.md, theory-and-planning.May 1 views py.md, theory-and-planning.May 2 Abstracted LinguisticProcessor.md, theory-and-planning.May 2 Linguistic-Tag-Extraction-Implementation.md, theory-and-planning.May 2 LinguisticProcessor Interface.md, theory-and-planning.May 4 Testing after unified registry updates.Required-Fixes.md, theory-and-planning.Unified-Linguistic-Interface.md, theory-and-planning.Vector-Distance-Lookup-Implementation-Plan.md, theory-and-planning.implementation-possibilities.md, theory-and-planning.unified_registry_aligned.chunking_registry, theory-and-planning.unified_registry_aligned.linguistic_registry, theory-and-planning.unified_registry_aligned.registry_base, theory-and-planning.unified_registry_aligned.zip, viewer.management.commands.populate_tag_dictionaries

**Key Modified Modules (by commit frequency):**
- `viewer.models` (20 commits)
- `theory-and-planning.April 29 Refactoring to Support Chunkng and Embedding with PGVector.md` (14 commits)
- `viewer.semantic.registry` (14 commits)
- `viewer.apps` (13 commits)
- `git_commit_viewer.settings` (11 commits)
- ...and others.

**Architectural Notes:**
<!-- AI_ARCH_NOTE_ID: arch_note_20250512111007904980 -->
- Core models (`viewer.models`) show interaction with the `viewer.semantic.vector` subsystem, indicating integration of vector capabilities.

**Commit Highlights & Themes:**
- **2025-05-04 (Commit `71eb106` by David Ryan)**: docs(testing): create comprehensive integration testing plan for cross-system validation
<!-- AI_DATA_START
    {
      "hash": "71eb10643c7fa01ad0a98d2c3a0d567c567dc9df",
      "short_message": "docs(testing): create comprehensive integration testing plan for cross-system validation",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Integration-Testing-Plan.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing
  - Files: D: theory-and-planning/After-action unified registry inventory-and-review/Integration-Testing-Plan.md
- **2025-05-04 (Commit `2716061` by David Ryan)**: docs(analysis): analyze embedding system integration opportunities
<!-- AI_DATA_START
    {
      "hash": "2716061272db4774d4d89715abcc8e1f9c98c8ab",
      "short_message": "docs(analysis): analyze embedding system integration opportunities",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Embedding-Integration-Analysis.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: D: theory-and-planning/After-action unified registry inventory-and-review/Embedding-Integration-Analysis.md
- **2025-05-04 (Commit `78505bd` by David Ryan)**: docs(testing): expand integration testing plan with embedding system tests
<!-- AI_DATA_START
    {
      "hash": "78505bd233c6ca38d260a962101fd4196b709de0",
      "short_message": "docs(testing): expand integration testing plan with embedding system tests",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Integration-Testing-Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Testing
  - Files: M: theory-and-planning/After-action unified registry inventory-and-review/Integration-Testing-Plan.md
- **2025-05-04 (Commit `90d3c6f` by David Ryan)**: docs(architecture): provide implementation code for embedding integration
<!-- AI_DATA_START
    {
      "hash": "90d3c6f4cdf53d03f76b094ed186e7c1df3276bf",
      "short_message": "docs(architecture): provide implementation code for embedding integration",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Embedding-Integration-Mutations.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: D: theory-and-planning/After-action unified registry inventory-and-review/Embedding-Integration-Mutations.md
- **2025-05-04 (Commit `44b0ab8` by David Ryan)**: rename May 4 After-action unified registry inventory-and-review dir for clarity
<!-- AI_DATA_START
    {
      "hash": "44b0ab86ba3c05521ddffbf25aac79bbf5390550",
      "short_message": "rename May 4 After-action unified registry inventory-and-review dir for clarity",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Capability-Negotiation-Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Context-Object-Propagation.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Embedding-Integration-Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Embedding-Integration-Mutations.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/High-Confidence-Mutations.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Integration-Analysis-Summary.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Integration-Testing-Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Service-Initialization-Dependencies.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Service-Layer-Integration-Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Type-Conversion-Analysis.md",
          "status": "R"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: R: theory-and-planning/After-action unified registry inventory-and-review/Capability-Negotiation-Analysis.md, R: theory-and-planning/After-action unified registry inventory-and-review/Context-Object-Propagation.md, R: theory-and-planning/After-action unified registry inventory-and-review/Embedding-Integration-Analysis.md...
- **2025-05-04 (Commit `a9b043d` by David Ryan)**: docs(knowledge-transfer): create comprehensive session summary for unified registry integration
<!-- AI_DATA_START
    {
      "hash": "a9b043dcc133665fc912aa5cc1cd607abfb1ef77",
      "short_message": "docs(knowledge-transfer): create comprehensive session summary for unified registry integration",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md
- **2025-05-04 (Commit `730848b` by David Ryan)**: test(infrastructure): create comprehensive test architecture for unified registry system
<!-- AI_DATA_START
    {
      "hash": "730848b94b234f66ac5cdd4e9f8fb8cadc6b3913",
      "short_message": "test(infrastructure): create comprehensive test architecture for unified registry system",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/README.md",
          "status": "D"
        },
        {
          "path": "tests/conftest.py",
          "status": "D"
        },
        {
          "path": "tests/integration/test_capability_negotiation.py",
          "status": "D"
        },
        {
          "path": "tests/integration/test_contexts.py",
          "status": "D"
        },
        {
          "path": "tests/integration/test_embedding_integration.py",
          "status": "D"
        },
        {
          "path": "tests/integration/test_initialization.py",
          "status": "D"
        },
        {
          "path": "tests/integration/test_metadata.py",
          "status": "D"
        },
        {
          "path": "tests/package/test_independence.py",
          "status": "D"
        },
        {
          "path": "tests/unit/semantic/linguistic/test_registry.py",
          "status": "D"
        }
      ],
      "themes": [
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing
  - Files: D: tests/README.md, D: tests/conftest.py, D: tests/integration/test_capability_negotiation.py...
- **2025-05-04 (Commit `0eebec7` by David Ryan)**: docs(knowledge-transfer): update session summary with test architecture implementation
<!-- AI_DATA_START
    {
      "hash": "0eebec7969cbd95b03aab097e2bcede15fe561fb",
      "short_message": "docs(knowledge-transfer): update session summary with test architecture implementation",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing
  - Files: M: theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md
- **2025-05-04 (Commit `6af2139` by David Ryan)**: docs(navigation): create comprehensive project structure map
<!-- AI_DATA_START
    {
      "hash": "6af2139213c156b42c95dc55a3ba8738924c8b22",
      "short_message": "docs(navigation): create comprehensive project structure map",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Project-Structure.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: theory-and-planning/May 4 After-action unified registry inventory-and-review/Project-Structure.md
- **2025-05-04 (Commit `9ae8ba8` by David Ryan)**: feat(context): implement core BaseContext class for cross-subsystem standardization
<!-- AI_DATA_START
    {
      "hash": "9ae8ba883f6afbf3357b02b9b449a5d0e33cc6ed",
      "short_message": "feat(context): implement core BaseContext class for cross-subsystem standardization",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/context.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/context.py
- **2025-05-04 (Commit `365c3ae` by David Ryan)**: test(context): enable context objects fixture with real BaseContext implementation
<!-- AI_DATA_START
    {
      "hash": "365c3ae99de235b314ae7dea7429a5b9a67d5ef9",
      "short_message": "test(context): enable context objects fixture with real BaseContext implementation",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/conftest.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing
  - Files: M: tests/conftest.py
- **2025-05-04 (Commit `c286ff0` by David Ryan)**: test(context): implement first integration tests for BaseContext
<!-- AI_DATA_START
    {
      "hash": "c286ff000d7dd3677f2c20c4cf33b0fe53a2dafc",
      "short_message": "test(context): implement first integration tests for BaseContext",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_contexts.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Feature
  - Files: M: tests/integration/test_contexts.py
- **2025-05-04 (Commit `e72a957` by David Ryan)**: feat(adapters): implement centralized adapter registration to break circular dependencies
<!-- AI_DATA_START
    {
      "hash": "e72a95709d723b81677472b97a3b0922264bcef6",
      "short_message": "feat(adapters): implement centralized adapter registration to break circular dependencies",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md",
          "status": "M"
        },
        {
          "path": "viewer/apps.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/adapters.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md, M: viewer/apps.py, D: viewer/semantic/adapters.py
- **2025-05-04 (Commit `314b302` by David Ryan)**: test(initialization): implement integration tests for centralized adapter system
<!-- AI_DATA_START
    {
      "hash": "314b3029f77c08b240b97798f9b9c0c5871dc785",
      "short_message": "test(initialization): implement integration tests for centralized adapter system",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_initialization.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Feature
  - Files: M: tests/integration/test_initialization.py
- **2025-05-04 (Commit `29751db` by David Ryan)**: feat(registry): remove import-time initializations and add metadata helpers
<!-- AI_DATA_START
    {
      "hash": "29751dba80469bf08687365eaab4849910bf8236",
      "short_message": "feat(registry): remove import-time initializations and add metadata helpers",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/chunking/__init__.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/linguistic/__init__.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md, M: viewer/semantic/chunking/__init__.py, M: viewer/semantic/linguistic/__init__.py...
- **2025-05-04 (Commit `34fcde3` by David Ryan)**: feat(context): implement specialized context subclasses for all subsystems
<!-- AI_DATA_START
    {
      "hash": "34fcde315fd48d5101ee0bd6eb41f4838d0b6cf7",
      "short_message": "feat(context): implement specialized context subclasses for all subsystems",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/chunking/service.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/linguistic/models.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/tagging/service.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/semantic/chunking/service.py, M: viewer/semantic/linguistic/models.py, M: viewer/semantic/tagging/service.py
- **2025-05-04 (Commit `0bb6dc9` by David Ryan)**: feat(context): update service methods to accept and propagate context
<!-- AI_DATA_START
    {
      "hash": "0bb6dc94e5235473fe348be1655a049a42a31c66",
      "short_message": "feat(context): update service methods to accept and propagate context",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/chunking/service.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/linguistic/service.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/tagging/service.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/semantic/chunking/service.py, M: viewer/semantic/linguistic/service.py, M: viewer/semantic/tagging/service.py
- **2025-05-04 (Commit `6c05a1a` by David Ryan)**: update Session Summary to reflect current status of completed work.
<!-- AI_DATA_START
    {
      "hash": "6c05a1aa3fbefd56edf1d83c87c14cb1c27c050a",
      "short_message": "update Session Summary to reflect current status of completed work.",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Embedding-Integration-Mutations.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector Interface/Embedding Interface Integration with Vector Interface.md",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: R: theory-and-planning/May 4 After-action unified registry inventory-and-review/Embedding-Integration-Mutations.md, M: theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md, D: theory-and-planning/Vector Interface/Embedding Interface Integration with Vector Interface.md
- **2025-05-04 (Commit `f40eb18` by David Ryan)**: feat(negotiation): implement capability negotiation enhancements
<!-- AI_DATA_START
    {
      "hash": "f40eb1844b06ccf2236c36e0b036171abc367672",
      "short_message": "feat(negotiation): implement capability negotiation enhancements",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/semantic/registry.py
- **2025-05-04 (Commit `86de861` by David Ryan)**: test(negotiation): implement capability negotiation tests
<!-- AI_DATA_START
    {
      "hash": "86de8611e225025c1d20b398c47b676cf0c0d45b",
      "short_message": "test(negotiation): implement capability negotiation tests",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_capability_negotiation.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Feature
  - Files: M: tests/integration/test_capability_negotiation.py
- **2025-05-04 (Commit `7b635d5` by David Ryan)**: docs(summary): mark capability negotiation enhancements as completed
<!-- AI_DATA_START
    {
      "hash": "7b635d532237d844683e5796bae41aba7ef30842",
      "short_message": "docs(summary): mark capability negotiation enhancements as completed",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md
- **2025-05-04 (Commit `220b061` by David Ryan)**: feat(embedding): implement EmbeddingContext class for embedding operations
<!-- AI_DATA_START
    {
      "hash": "220b06174a955ab9939fb29a5758a5c9d0b9f935",
      "short_message": "feat(embedding): implement EmbeddingContext class for embedding operations",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/context.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: D: viewer/pgvector/context.py
- **2025-05-04 (Commit `9fdcef6` by David Ryan)**: feat(embedding): enhance registry with content detection and initialization
<!-- AI_DATA_START
    {
      "hash": "9fdcef6a9b19ab607c6d1ab5da37e0990a630864",
      "short_message": "feat(embedding): enhance registry with content detection and initialization",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/pgvector/registry.py
- **2025-05-04 (Commit `b47e55e` by David Ryan)**: feat(embedding): implement integrated embedding service with cross-system capabilities
<!-- AI_DATA_START
    {
      "hash": "b47e55ea59ddd12052dcbc35ec4a0a12a4debce7",
      "short_message": "feat(embedding): implement integrated embedding service with cross-system capabilities",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/service.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: D: viewer/pgvector/service.py
- **2025-05-04 (Commit `a967942` by David Ryan)**: feat(embedding): integrate embedding system in initialization sequence
<!-- AI_DATA_START
    {
      "hash": "a967942bdf9c7ecf2cc39a3a267a5ca79d2b85f4",
      "short_message": "feat(embedding): integrate embedding system in initialization sequence",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/apps.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/apps.py
- **2025-05-04 (Commit `3f28e72` by David Ryan)**: docs(summary): mark all implementation tasks as completed
<!-- AI_DATA_START
    {
      "hash": "3f28e72f741e73558b3e5f0fd3173f895b3ba4b2",
      "short_message": "docs(summary): mark all implementation tasks as completed",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md
- **2025-05-04 (Commit `3ede890` by David Ryan)**: docs(registry): update Unified-Registry-System documentation with recent enhancements
<!-- AI_DATA_START
    {
      "hash": "3ede890c05cdb7fe3219322e6a16f113648764b2",
      "short_message": "docs(registry): update Unified-Registry-System documentation with recent enhancements",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Unified-Registry-System.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: documentation/Unified-Registry-System.md
- **2025-05-04 (Commit `d5a85ce` by David Ryan)**: docs: create comprehensive documentation update plan for all subsystems
<!-- AI_DATA_START
    {
      "hash": "d5a85ce2e0dcc534f881294fbb3685171e771f71",
      "short_message": "docs: create comprehensive documentation update plan for all subsystems",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Subsystem-Documentation-Updates.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: documentation/Subsystem-Documentation-Updates.md
- **2025-05-04 (Commit `d67c693` by David Ryan)**: docs: create structured testing execution plan for unified registry
<!-- AI_DATA_START
    {
      "hash": "d67c693ccaa7ab9e3137ea0167233ac2902a2e79",
      "short_message": "docs: create structured testing execution plan for unified registry",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Testing-Execution-Plan.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing
  - Files: D: documentation/Testing-Execution-Plan.md
- **2025-05-04 (Commit `1a01ea8` by David Ryan)**: feat(registry): add can_convert method to AdvancedRegistry base class
<!-- AI_DATA_START
    {
      "hash": "1a01ea8a420414a9dea6c168eed40285d283054c",
      "short_message": "feat(registry): add can_convert method to AdvancedRegistry base class",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/semantic/registry.py
- **2025-05-04 (Commit `13df2a7` by David Ryan)**: fix(tests): correct adapter count verification in test_adapter_registration_completeness
<!-- AI_DATA_START
    {
      "hash": "13df2a7a3a8b2d3918333ac058394ad993d32455",
      "short_message": "fix(tests): correct adapter count verification in test_adapter_registration_completeness",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_initialization.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, BugFix
  - Files: M: tests/integration/test_initialization.py
- **2025-05-04 (Commit `05b79dc` by David Ryan)**: docs: add May 4 2025 Initialization Test progress report
<!-- AI_DATA_START
    {
      "hash": "05b79dc8940777ef0c48cd9ff8e34374e6566d9f",
      "short_message": "docs: add May 4 2025 Initialization Test progress report",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Initialization-Test-Progress.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing, Feature
  - Files: D: documentation/Initialization-Test-Progress.md
- **2025-05-04 (Commit `0272102` by David Ryan)**: docs: analyze context system and capability negotiation test failures
<!-- AI_DATA_START
    {
      "hash": "02721025965ec64f4645e422d4c378a84dd46fac",
      "short_message": "docs: analyze context system and capability negotiation test failures",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Initialization-Test-Progress.md",
          "status": "R"
        },
        {
          "path": "documentation/Testing-Execution-Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/May 4 Context System and Capability Negotiation Test Failures and Fixes.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/Registry-Implementation-Analysis.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/Required-Fixes.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing
  - Files: R: documentation/Initialization-Test-Progress.md, R: documentation/Testing-Execution-Plan.md, D: theory-and-planning/May 4 Testing after unified registry updates/May 4 Context System and Capability Negotiation Test Failures and Fixes.md...
- **2025-05-04 (Commit `129a7e4` by David Ryan)**: docs: propose implementations for placeholder initialization tests
<!-- AI_DATA_START
    {
      "hash": "129a7e49e03d64a77a52edc1d7fca5755f7ae64f",
      "short_message": "docs: propose implementations for placeholder initialization tests",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/May 4 Context System and Capability Negotiation Test Failures and Fixes.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/May 4 Proposed Tests To Complete Test Suite.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/Required-Fixes.md",
          "status": "A"
        }
      ],
      "themes": [
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing
  - Files: M: theory-and-planning/May 4 Testing after unified registry updates/May 4 Context System and Capability Negotiation Test Failures and Fixes.md, D: theory-and-planning/May 4 Testing after unified registry updates/May 4 Proposed Tests To Complete Test Suite.md, A: theory-and-planning/May 4 Testing after unified registry updates/Required-Fixes.md
- **2025-05-04 (Commit `616ac92` by David Ryan)**: fix(context): filter subsystem-specific properties in context conversion
<!-- AI_DATA_START
    {
      "hash": "616ac924296a1c1a5dcaca6aa3d09934c54cc1a4",
      "short_message": "fix(context): filter subsystem-specific properties in context conversion",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/context.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/semantic/context.py
- **2025-05-04 (Commit `bb080f8` by David Ryan)**: fix(capability): resolve method collision in TestProvider capabilities
<!-- AI_DATA_START
    {
      "hash": "bb080f8be1e1edb9c4dbc38dacafae6bc48daff0",
      "short_message": "fix(capability): resolve method collision in TestProvider capabilities",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_capability_negotiation.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: tests/integration/test_capability_negotiation.py
- **2025-05-04 (Commit `4c2cda5` by David Ryan)**: feat(registry): add missing create() method to IntegrationInterface
<!-- AI_DATA_START
    {
      "hash": "4c2cda55e4a34c1ab3d523c3e5278cdb828ede67",
      "short_message": "feat(registry): add missing create() method to IntegrationInterface",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/semantic/registry.py
- **2025-05-04 (Commit `5135dbb` by David Ryan)**: docs: adjust and expand method type consistency implementation plan
<!-- AI_DATA_START
    {
      "hash": "5135dbbe938d85f329d2ccc69a38a9423d88c5e5",
      "short_message": "docs: adjust and expand method type consistency implementation plan",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/May 4 Context System and Capability Negotiation Test Failures and Fixes.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: theory-and-planning/May 4 Testing after unified registry updates/May 4 Context System and Capability Negotiation Test Failures and Fixes.md
- **2025-05-04 (Commit `03ce866` by David Ryan)**: docs: identify implementation error and correct fix approach
<!-- AI_DATA_START
    {
      "hash": "03ce86682f51bda89c496657cdc9778ac8a6cb9c",
      "short_message": "docs: identify implementation error and correct fix approach",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/Implementation Error Analysis and Fix Approach.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, BugFix
  - Files: D: theory-and-planning/May 4 Testing after unified registry updates/Implementation Error Analysis and Fix Approach.md
- **2025-05-04 (Commit `3c0d159` by David Ryan)**: fix(capability): update negotiate_capabilities to support both class and instance methods
<!-- AI_DATA_START
    {
      "hash": "3c0d159b182fdc1e4b5a8b54eb09ff6936d2900c",
      "short_message": "fix(capability): update negotiate_capabilities to support both class and instance methods",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_capability_negotiation.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: tests/integration/test_capability_negotiation.py, M: viewer/semantic/registry.py
- **2025-05-04 (Commit `7d98b8a` by David Ryan)**: fix(capability): implement method extraction for dual capability patterns
<!-- AI_DATA_START
    {
      "hash": "7d98b8a09769f76a967f0b0933f09741e3a899b0",
      "short_message": "fix(capability): implement method extraction for dual capability patterns",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature, BugFix
  - Files: M: viewer/semantic/registry.py
- **2025-05-04 (Commit `d4e5f0c` by David Ryan)**: feat(capability): attempt to enhance instance capabilities detection
<!-- AI_DATA_START
    {
      "hash": "d4e5f0c5b824487c52b2cee503bbf66f5449aeab",
      "short_message": "feat(capability): attempt to enhance instance capabilities detection",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "test_output.txt",
          "status": "D"
        },
        {
          "path": "tests/integration/test_capability_negotiation.py.bak",
          "status": "D"
        },
        {
          "path": "theory-and-planning/chunking interface/May 4 Additional Chunking Back End Ideas.md",
          "status": "D"
        },
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: test_output.txt, D: tests/integration/test_capability_negotiation.py.bak, D: theory-and-planning/chunking interface/May 4 Additional Chunking Back End Ideas.md...
- **2025-05-04 (Commit `88acfae` by David Ryan)**: fix(capability): implement method disambiguation for dual capability patterns
<!-- AI_DATA_START
    {
      "hash": "88acfae51b3ddacce29a41b55e79b12385b519b6",
      "short_message": "fix(capability): implement method disambiguation for dual capability patterns",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature, BugFix
  - Files: M: viewer/semantic/registry.py
- **2025-05-04 (Commit `5cb4594` by David Ryan)**: fix(capability): resolve method binding conflict in negotiate_capabilities
<!-- AI_DATA_START
    {
      "hash": "5cb459422d1da5d2c0d5cf84ffbd9ed778565caa",
      "short_message": "fix(capability): resolve method binding conflict in negotiate_capabilities",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "test_output.txt",
          "status": "A"
        },
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: A: test_output.txt, M: viewer/semantic/registry.py
- **2025-05-04 (Commit `6ee8a9d` by David Ryan)**: fix(capability): implement semantic type handling in capability negotiation
<!-- AI_DATA_START
    {
      "hash": "6ee8a9d960e64851e75aec780aef39e4476856dd",
      "short_message": "fix(capability): implement semantic type handling in capability negotiation",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "analysis_output.txt",
          "status": "D"
        },
        {
          "path": "line_analysis.txt",
          "status": "D"
        },
        {
          "path": "test_rerun.txt",
          "status": "D"
        },
        {
          "path": "tests/integration/test_capability_negotiation copy.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Semantic Subsystem",
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Semantic Subsystem, Feature, BugFix
  - Files: D: analysis_output.txt, D: line_analysis.txt, D: test_rerun.txt...
- **2025-05-04 (Commit `bdd4dae` by David Ryan)**: fix(tests): configure Django settings in test files to resolve ImproperlyConfigured errors
<!-- AI_DATA_START
    {
      "hash": "bdd4dae745a52dcbbd2a9ed5c576dc168d94e70c",
      "short_message": "fix(tests): configure Django settings in test files to resolve ImproperlyConfigured errors",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/test_dimension_fix.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/tests/test_fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, BugFix
  - Files: M: viewer/management/commands/test_dimension_fix.py, M: viewer/pgvector/tests/test_fields.py
- **2025-05-04 (Commit `17ebd3e` by David Ryan)**: (docs) add docs in support of investigations and changes in light of running tests.
<!-- AI_DATA_START
    {
      "hash": "17ebd3e6bd6a01b5e4934c015d0c716c2755a467",
      "short_message": "(docs) add docs in support of investigations and changes in light of running tests.",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Capability Negotiation System- Complete Analysis and Implementation pre-success.md",
          "status": "D"
        },
        {
          "path": "documentation/Capability Negotiation System- Successful Implementation.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/# Next Steps for Capability Negotiation .md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/capability-negotiation-comprehensive-implementation-plan.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/chunking interface/test_chunking_service.py",
          "status": "R"
        }
      ],
      "themes": [
        "Documentation",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing, Feature
  - Files: D: documentation/Capability Negotiation System- Complete Analysis and Implementation pre-success.md, D: documentation/Capability Negotiation System- Successful Implementation.md, D: theory-and-planning/# Next Steps for Capability Negotiation .md...
- **2025-05-04 (Commit `6a44b00` by David Ryan)**: fix(subsystem): implement fallback mechanism for vector dimensions to resolve package dependency isolation
<!-- AI_DATA_START
    {
      "hash": "6a44b00bd8be8ec54f9bce631153d038d93ef04a",
      "short_message": "fix(subsystem): implement fallback mechanism for vector dimensions to resolve package dependency isolation",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature, BugFix
  - Files: M: viewer/pgvector/fields.py
- **2025-05-04 (Commit `ec79008` by David Ryan)**: fix(tests): implement programmatic vector generation to resolve invisible commas issue
<!-- AI_DATA_START
    {
      "hash": "ec790084e2267fc13f1782993ae22913032b0d9c",
      "short_message": "fix(tests): implement programmatic vector generation to resolve invisible commas issue",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/tests/test_fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature, BugFix
  - Files: M: viewer/pgvector/tests/test_fields.py
- **2025-05-04 (Commit `0b2fadd` by David Ryan)**: fix(tests): use direct field instantiation to resolve 'str has no get_prep_value' error
<!-- AI_DATA_START
    {
      "hash": "0b2fadd2daaad7371e83efc0b7c8ffdb2d36811f",
      "short_message": "fix(tests): use direct field instantiation to resolve 'str has no get_prep_value' error",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/tests/test_fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, BugFix
  - Files: M: viewer/pgvector/tests/test_fields.py
- **2025-05-04 (Commit `4336f8b` by David Ryan)**: fix(capability): implement method disambiguation and fallback logic
<!-- AI_DATA_START
    {
      "hash": "4336f8b86c4567049d857e8cc34eba36436b0302",
      "short_message": "fix(capability): implement method disambiguation and fallback logic",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_capability_negotiation copy.py",
          "status": "A"
        },
        {
          "path": "tests/integration/test_capability_negotiation.py",
          "status": "M"
        },
        {
          "path": "tests/integration/test_capability_negotiation.py.bak",
          "status": "A"
        },
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature, BugFix
  - Files: A: tests/integration/test_capability_negotiation copy.py, M: tests/integration/test_capability_negotiation.py, A: tests/integration/test_capability_negotiation.py.bak...
- **2025-05-04 (Commit `b944a72` by David Ryan)**: docs(vector): update Vector Interface Implementation Plan for revised capability negotiation
<!-- AI_DATA_START
    {
      "hash": "b944a72d69ff5f52011cf51f7c3689b05eb803aa",
      "short_message": "docs(vector): update Vector Interface Implementation Plan for revised capability negotiation",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: D: theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md
- **2025-05-04 (Commit `0a5d735` by David Ryan)**: future looking chunking backends, after updated vector interface implementaion and other subsystem checks and refinements.
<!-- AI_DATA_START
    {
      "hash": "0a5d735f42885d32e838b7b5c0f57f91f9c3c55e",
      "short_message": "future looking chunking backends, after updated vector interface implementaion and other subsystem checks and refinements.",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Second Stage Further Features/Thinking Out Chunking Backends.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding
  - Files: D: theory-and-planning/Second Stage Further Features/Thinking Out Chunking Backends.md
- **2025-05-04 (Commit `4c871d6` by David Ryan)**: Merge pull request #14 from davidorex/testing/generate-commit-tags
<!-- AI_DATA_START
    {
      "hash": "4c871d6b9c3d035ecef1ba905215f75108ab3092",
      "short_message": "Merge pull request #14 from davidorex/testing/generate-commit-tags",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "analysis_output.txt",
          "status": "D"
        },
        {
          "path": "documentation/Capability Negotiation System- Complete Analysis and Implementation pre-success.md",
          "status": "D"
        },
        {
          "path": "documentation/Capability Negotiation System- Successful Implementation.md",
          "status": "D"
        },
        {
          "path": "documentation/Service-Layer-Integration.md",
          "status": "D"
        },
        {
          "path": "documentation/Subsystem-Documentation-Updates.md",
          "status": "D"
        },
        {
          "path": "documentation/Unified-Registry-System.md",
          "status": "D"
        },
        {
          "path": "line_analysis.txt",
          "status": "D"
        },
        {
          "path": "requirements.txt",
          "status": "M"
        },
        {
          "path": "test_rerun.txt",
          "status": "D"
        },
        {
          "path": "tests/README.md",
          "status": "D"
        },
        {
          "path": "tests/conftest.py",
          "status": "D"
        },
        {
          "path": "tests/integration/test_capability_negotiation.py",
          "status": "D"
        },
        {
          "path": "tests/integration/test_contexts.py",
          "status": "D"
        },
        {
          "path": "tests/integration/test_embedding_integration.py",
          "status": "D"
        },
        {
          "path": "tests/integration/test_initialization.py",
          "status": "D"
        },
        {
          "path": "tests/integration/test_metadata.py",
          "status": "D"
        },
        {
          "path": "tests/package/test_independence.py",
          "status": "D"
        },
        {
          "path": "tests/unit/semantic/linguistic/test_registry.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/# Next Steps for Capability Negotiation .md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Enhancing the Prompt-Composition Pipeline with Unified Registry System.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Implementation Impact Analysis- Unified Registry System & Chunking Architecture.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified Registry System & Linguistics Interface- Implementation Impact Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified Registry System Impact- Embedder Registry.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified_Registry_System_Implementation_Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Linguistics interface/Linguistics Implementation Plan for Unified Registry System.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Capability-Negotiation-Analysis.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Context-Object-Propagation.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Embedding-Integration-Analysis.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/High-Confidence Mutations for Embedding System Integration.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/High-Confidence-Mutations.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Integration-Analysis-Summary.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Integration-Testing-Plan.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Project-Structure.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Service-Initialization-Dependencies.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Service-Layer-Integration-Analysis.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Session-Summary.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 After-action unified registry inventory-and-review/Type-Conversion-Analysis.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/Implementation Error Analysis and Fix Approach.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/Initialization-Test-Progress.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/May 4 Context System and Capability Negotiation Test Failures and Fixes.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/May 4 Proposed Tests To Complete Test Suite.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/Registry-Implementation-Analysis.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 4 Testing after unified registry updates/Testing-Execution-Plan.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Second Stage Further Features/Thinking Out Chunking Backends.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Tagging system/Tag System with Unified Registry Implementation.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Vector Interface/Embedding Interface Integration with Vector Interface.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/capability-negotiation-comprehensive-implementation-plan.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/chunking interface/May 4 Additional Chunking Back End Ideas.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/chunking interface/test_chunking_service.py",
          "status": "R"
        },
        {
          "path": "viewer/apps.py",
          "status": "M"
        },
        {
          "path": "viewer/management/commands/generate_commit_tags.py",
          "status": "M"
        },
        {
          "path": "viewer/management/commands/test_dimension_fix.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/context.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/fields.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/registry.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/service.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/tests/test_fields.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/adapters.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/chunking/__init__.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/chunking/service.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/context.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/linguistic/__init__.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/linguistic/models.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/linguistic/service.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/registry.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/tagging/service.py",
          "status": "M"
        },
        {
          "path": "viewer/services/nlp_service.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing
  - Files: D: analysis_output.txt, D: documentation/Capability Negotiation System- Complete Analysis and Implementation pre-success.md, D: documentation/Capability Negotiation System- Successful Implementation.md...
- **2025-05-04 (Commit `82e1292` by David Ryan)**: feat(vector): implement base vector data models (Phase 1, Step 1.1)
<!-- AI_DATA_START
    {
      "hash": "82e1292eb1183651960d0cf688461aadcd74533a",
      "short_message": "feat(vector): implement base vector data models (Phase 1, Step 1.1)",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/vector/models.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: D: viewer/semantic/vector/models.py
- **2025-05-04 (Commit `af4c229` by David Ryan)**: feat(vector): define core vector interfaces (Phase 1, Step 1.2)
<!-- AI_DATA_START
    {
      "hash": "af4c229717e6f5ea97d63d73c8aa32c988a40abd",
      "short_message": "feat(vector): define core vector interfaces (Phase 1, Step 1.2)",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/vector/interfaces.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: D: viewer/semantic/vector/interfaces.py
- **2025-05-04 (Commit `ad3ed08` by David Ryan)**: feat(vector): implement registry system with unified registry (Phase 1, Step 1.3)
<!-- AI_DATA_START
    {
      "hash": "ad3ed08cb98ad26f2e39ab43bd73f0ca11146369",
      "short_message": "feat(vector): implement registry system with unified registry (Phase 1, Step 1.3)",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/vector/registry.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: D: viewer/semantic/vector/registry.py
- **2025-05-04 (Commit `0e9d6ad` by David Ryan)**: feat(vector): create package structure with convenience functions (Phase 1, Step 1.4)
<!-- AI_DATA_START
    {
      "hash": "0e9d6ad2aebe0bd2a97b657c9e672c7051b8f635",
      "short_message": "feat(vector): create package structure with convenience functions (Phase 1, Step 1.4)",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/vector/__init__.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: D: viewer/semantic/vector/__init__.py
- **2025-05-04 (Commit `7203d17` by David Ryan)**: feat(vector): implement PostgreSQL backend with registry integration (Phase 2, Step 2.1)
<!-- AI_DATA_START
    {
      "hash": "7203d17317df0286c522dc28f2978d5e63cdc733",
      "short_message": "feat(vector): implement PostgreSQL backend with registry integration (Phase 2, Step 2.1)",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/backends/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/vector/backends/postgresql.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md, D: viewer/semantic/vector/backends/__init__.py, D: viewer/semantic/vector/backends/postgresql.py
- **2025-05-04 (Commit `5bf512f` by David Ryan)**: feat(vector): implement in-memory backend for testing (Phase 2, Step 2.2)
<!-- AI_DATA_START
    {
      "hash": "5bf512f05600e6e19c512a468ed8cdacc8eab0dd",
      "short_message": "feat(vector): implement in-memory backend for testing (Phase 2, Step 2.2)",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/backends/__init__.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/backends/memory.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature
  - Files: M: theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md, M: viewer/semantic/vector/backends/__init__.py, D: viewer/semantic/vector/backends/memory.py
- **2025-05-04 (Commit `b2edb27` by David Ryan)**: docs(vector): create implementation progress report for Vector Interface
<!-- AI_DATA_START
    {
      "hash": "b2edb272e95d909899eecb1dcedbe76e1f9bc887",
      "short_message": "docs(vector): create implementation progress report for Vector Interface",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector Interface/Implementation-Progress-Report.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: D: theory-and-planning/Vector Interface/Implementation-Progress-Report.md, M: theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md
- **2025-05-04 (Commit `09a83d0` by David Ryan)**: feat(vector): implement unified VectorService layer (Phase 3, Step 3.1)
<!-- AI_DATA_START
    {
      "hash": "09a83d05683404bc93639e7dd81d70dd77924fc0",
      "short_message": "feat(vector): implement unified VectorService layer (Phase 3, Step 3.1)",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/vector/__init__.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/service.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/semantic/vector/__init__.py, D: viewer/semantic/vector/service.py
- **2025-05-04 (Commit `25d9145` by David Ryan)**: docs(vector): update implementation progress report with Phase 3 completion
<!-- AI_DATA_START
    {
      "hash": "25d91451dd9c3be5d45036352b9d6097c8585554",
      "short_message": "docs(vector): update implementation progress report with Phase 3 completion",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector Interface/Implementation-Progress-Report.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: M: theory-and-planning/Vector Interface/Implementation-Progress-Report.md, M: theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md
- **2025-05-04 (Commit `23206af` by David Ryan)**: feat(vector): implement Django model fields for vector integration (Phase 4, Step 4.1)
<!-- AI_DATA_START
    {
      "hash": "23206afcbad74c8489070ad7ce65aebfb8b033b2",
      "short_message": "feat(vector): implement Django model fields for vector integration (Phase 4, Step 4.1)",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/__init__.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/vector/fields.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md, M: viewer/semantic/vector/__init__.py, D: viewer/semantic/vector/fields.py
- **2025-05-04 (Commit `ad35346` by David Ryan)**: docs(vector): update progress report with Phase 4 completion
<!-- AI_DATA_START
    {
      "hash": "ad3534613c0339e536951cd9319029257c974cb6",
      "short_message": "docs(vector): update progress report with Phase 4 completion",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector Interface/Implementation-Progress-Report.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: M: theory-and-planning/Vector Interface/Implementation-Progress-Report.md
- **2025-05-04 (Commit `214163e` by David Ryan)**: docs(vector): complete Vector Interface documentation (Phase 5)
<!-- AI_DATA_START
    {
      "hash": "214163e1476ba249b45ec5543eb265a8c713d47f",
      "short_message": "docs(vector): complete Vector Interface documentation (Phase 5)",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "analysis_output.txt",
          "status": "A"
        },
        {
          "path": "documentation/Vector-Interface-Migration-Guide.md",
          "status": "D"
        },
        {
          "path": "documentation/Vector-Interface.md",
          "status": "D"
        },
        {
          "path": "line_analysis.txt",
          "status": "A"
        },
        {
          "path": "test_rerun.txt",
          "status": "A"
        },
        {
          "path": "theory-and-planning/Vector Interface/May 4 Proposed Vector Interface Test Coverage Strateg.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector Interface/Vector-Interface-Testing-Guidelines.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: A: analysis_output.txt, D: documentation/Vector-Interface-Migration-Guide.md, D: documentation/Vector-Interface.md...
- **2025-05-04 (Commit `33e7a18` by David Ryan)**: docs(vector): mark Phase 5 complete in implementation progress report
<!-- AI_DATA_START
    {
      "hash": "33e7a18496bebce7e1c7b4a1665997c95cac9ad5",
      "short_message": "docs(vector): mark Phase 5 complete in implementation progress report",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector Interface/Implementation-Progress-Report.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: M: theory-and-planning/Vector Interface/Implementation-Progress-Report.md, M: theory-and-planning/Vector Interface/Updated Vector Interface Implementation Plan.md
- **2025-05-04 (Commit `f9fca57` by David Ryan)**: feat(vector): integrate Vector Interface with semantic_unit decorator
<!-- AI_DATA_START
    {
      "hash": "f9fca57b9fe89d1a168da4d2ffcf06e5a175efad",
      "short_message": "feat(vector): integrate Vector Interface with semantic_unit decorator",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/decorators.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/semantic/decorators.py
- **2025-05-04 (Commit `a89b4a5` by David Ryan)**: refactor(test): implement programmatic vector generation in test_l2_distance_lookup to address potential invisible commas issue\n\nThis commit refactors the vector test patterns in test_l2_distance_lookup method to follow the recommendations from the Vector Testing Guidelines document. The changes are as follows:\n\n1. Replace the literal vector declarations with programmatically generated vectors using dimensions variable and initialization loops\n2. Generate the origin vector using [0.0] * dimensions for consistency\n3. Create unit vectors by initializing zero vectors and setting specific indices\n4. Maintain the same test vectors (origin, x-axis unit vector, z-axis unit vector) while changing how they are constructed\n\nThese changes are part of Phase 3 in our Vector Interface Migration Plan and specifically target the 'invisible commas' issue documented in the Vector-Interface-Testing-Guidelines.md. The issue arises when vector literals are copied between editors or have encoding issues, resulting in commas disappearing despite looking correct in the source code.\n\nThe existing vector_str() utility is still used to format vectors for SQL operations, but now the initial test vectors themselves are created programmatically to eliminate the risk of syntax errors in the vector construction phase.\n\nThe test intent and validation logic remain unchanged - we're still verifying that L2 distance calculations work properly between origin and unit vectors.
<!-- AI_DATA_START
    {
      "hash": "a89b4a5b609f0faafbc718e286b30ae7522126b6",
      "short_message": "refactor(test): implement programmatic vector generation in test_l2_distance_lookup to address potential invisible commas issue\\n\\nThis commit refactors the vector test patterns in test_l2_distance_lookup method to follow the recommendations from the Vector Testing Guidelines document. The changes are as follows:\\n\\n1. Replace the literal vector declarations with programmatically generated vectors using dimensions variable and initialization loops\\n2. Generate the origin vector using [0.0] * dimensions for consistency\\n3. Create unit vectors by initializing zero vectors and setting specific indices\\n4. Maintain the same test vectors (origin, x-axis unit vector, z-axis unit vector) while changing how they are constructed\\n\\nThese changes are part of Phase 3 in our Vector Interface Migration Plan and specifically target the 'invisible commas' issue documented in the Vector-Interface-Testing-Guidelines.md. The issue arises when vector literals are copied between editors or have encoding issues, resulting in commas disappearing despite looking correct in the source code.\\n\\nThe existing vector_str() utility is still used to format vectors for SQL operations, but now the initial test vectors themselves are created programmatically to eliminate the risk of syntax errors in the vector construction phase.\\n\\nThe test intent and validation logic remain unchanged - we're still verifying that L2 distance calculations work properly between origin and unit vectors.",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector Interface/Vector Interface Integration Status 3.md",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/tests/test_fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Refactor/Improvement, Feature
  - Files: D: theory-and-planning/Vector Interface/Vector Interface Integration Status 3.md, M: viewer/pgvector/tests/test_fields.py
- **2025-05-04 (Commit `8942edd` by David Ryan)**: fix(tests): refactor vector tests for clarity and correctness
<!-- AI_DATA_START
    {
      "hash": "8942edd496c8fd2293fd7642013845fdf1bbc05a",
      "short_message": "fix(tests): refactor vector tests for clarity and correctness",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/tests/test_fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Refactor/Improvement",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Refactor/Improvement, BugFix
  - Files: M: viewer/pgvector/tests/test_fields.py
- **2025-05-04 (Commit `85ed7ed` by David Ryan)**: fix(vector): remove circular dependencies between pgvector and models
<!-- AI_DATA_START
    {
      "hash": "85ed7ed606abc6c60e43ea5f33a24d8ae471f55d",
      "short_message": "fix(vector): remove circular dependencies between pgvector and models",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Capability Negotiation System- Complete Analysis and Implementation pre-success.md",
          "status": "R"
        },
        {
          "path": "documentation/Capability Negotiation System- Successful Implementation.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Second Stage Further Features/Prompt-composition-pipeline.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Vector Interface/May 4 Proposed Vector Interface Test Coverage Strateg.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Vector Interface/Vector-Interface-Testing-Guidelines.md",
          "status": "M"
        },
        {
          "path": "vector-interface-migration-plan.md",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/expressions.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/fields.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/registry.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/tests/test_fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, BugFix
  - Files: R: documentation/Capability Negotiation System- Complete Analysis and Implementation pre-success.md, R: documentation/Capability Negotiation System- Successful Implementation.md, R: theory-and-planning/Second Stage Further Features/Prompt-composition-pipeline.md...
- **2025-05-04 (Commit `16ed965` by David Ryan)**: test(vector): enhance module independence test to verify both interfaces
<!-- AI_DATA_START
    {
      "hash": "16ed965c5c1b99307e3cfa3a314e071fe4fc47c6",
      "short_message": "test(vector): enhance module independence test to verify both interfaces",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/package/test_independence.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing
  - Files: M: tests/package/test_independence.py
- **2025-05-04 (Commit `acfff6c` by David Ryan)**: fix(tests): refactor CapabilityProvider to support both Registry and factory patterns
<!-- AI_DATA_START
    {
      "hash": "acfff6c7d46df89d41357315e9168efc78959ea7",
      "short_message": "fix(tests): refactor CapabilityProvider to support both Registry and factory patterns",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_capability_negotiation.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Refactor/Improvement",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Refactor/Improvement, BugFix
  - Files: M: tests/integration/test_capability_negotiation.py
- **2025-05-04 (Commit `2093c35` by David Ryan)**: test(capability): verify CapabilityProvider refactoring compatibility
<!-- AI_DATA_START
    {
      "hash": "2093c3545a03efa0435fdf8c221516b589240b00",
      "short_message": "test(capability): verify CapabilityProvider refactoring compatibility",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [],
      "themes": [
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing
- **2025-05-04 (Commit `ee85dd8` by David Ryan)**: test(vector): update independence tests to use only unified vector interface
<!-- AI_DATA_START
    {
      "hash": "ee85dd8bd25aa9942456aed8c16088db94a4c873",
      "short_message": "test(vector): update independence tests to use only unified vector interface",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/package/test_independence.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing
  - Files: M: tests/package/test_independence.py
- **2025-05-04 (Commit `fb3b1d0` by David Ryan)**: test(vector): implement comprehensive Vector Interface test coverage
<!-- AI_DATA_START
    {
      "hash": "fb3b1d096d95026875f07ebc5c09cc6a37c4b64e",
      "short_message": "test(vector): implement comprehensive Vector Interface test coverage",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "tests/integration/test_context_flow.py",
          "status": "D"
        },
        {
          "path": "tests/integration/test_cross_backend_consistency.py",
          "status": "D"
        },
        {
          "path": "tests/integration/test_vector_fields.py",
          "status": "D"
        },
        {
          "path": "tests/unit/semantic/vector/test_capability_negotiation.py",
          "status": "D"
        },
        {
          "path": "tests/unit/semantic/vector/test_contract.py",
          "status": "D"
        },
        {
          "path": "tests/unit/semantic/vector/test_error_recovery.py",
          "status": "D"
        },
        {
          "path": "tests/unit/semantic/vector/test_independence.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Testing, Feature
  - Files: D: tests/integration/test_context_flow.py, D: tests/integration/test_cross_backend_consistency.py, D: tests/integration/test_vector_fields.py...
- **2025-05-04 (Commit `0f2088a` by David Ryan)**: docs(vector): create comprehensive Vector Interface Utils refactoring plan to resolve circular dependencies\n\nThis commit adds a detailed implementation plan for refactoring the Vector Interface to resolve the circular import dependency discovered during test execution. Key aspects of the plan include:\n\n1. Creating a new utils.py module to centralize utility functions currently scattered across multiple files\n2. Moving get_vector_dimensions() out of __init__.py to break the circular dependency with service.py\n3. Centralizing vector format conversion, similarity calculation, and metadata handling utilities\n4. Providing atomic, file-by-file mutation instructions with exact diff examples\n5. Outlining a five-phase implementation strategy with validation steps\n\nThe plan is architectural in nature, focusing on improved separation of concerns, maintainability, and testability while preserving the existing functionality and contracts between components. This refactoring will establish a more robust foundation for the Vector Interface, making it easier to extend and maintain in the future.
<!-- AI_DATA_START
    {
      "hash": "0f2088a57d283c89495d7dd7cad54533aacd267d",
      "short_message": "docs(vector): create comprehensive Vector Interface Utils refactoring plan to resolve circular dependencies\\n\\nThis commit adds a detailed implementation plan for refactoring the Vector Interface to resolve the circular import dependency discovered during test execution. Key aspects of the plan include:\\n\\n1. Creating a new utils.py module to centralize utility functions currently scattered across multiple files\\n2. Moving get_vector_dimensions() out of __init__.py to break the circular dependency with service.py\\n3. Centralizing vector format conversion, similarity calculation, and metadata handling utilities\\n4. Providing atomic, file-by-file mutation instructions with exact diff examples\\n5. Outlining a five-phase implementation strategy with validation steps\\n\\nThe plan is architectural in nature, focusing on improved separation of concerns, maintainability, and testability while preserving the existing functionality and contracts between components. This refactoring will establish a more robust foundation for the Vector Interface, making it easier to extend and maintain in the future.",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Testing",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Testing, Refactor/Improvement
  - Files: D: theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md
- **2025-05-04 (Commit `321f654` by David Ryan)**: docs(vector): enhance refactoring plan with detailed test file modifications\n\nThis commit extends the Vector Interface Utils Refactoring Plan with comprehensive test file updates to support the new architecture. These additions include:\n\n1. Creation of a new test_utils.py file with thorough unit tests for all utility functions\n2. Specific import changes needed in existing test files to resolve circular dependencies\n3. Updates to test_contract.py, test_capability_negotiation.py, and test_independence.py to align with the new structure\n4. Refactoring of integration tests to use the centralized utility functions\n5. Creation of a new test_context_flow.py test module to verify context propagation\n\nThese test modifications complete the refactoring strategy by ensuring all functionality remains validated after moving utility functions to a dedicated module. The test changes maintain the same validation logic while adapting to the new architectural structure, providing a clear path for implementation.
<!-- AI_DATA_START
    {
      "hash": "321f65430a183795e640770568f9f82b61799da1",
      "short_message": "docs(vector): enhance refactoring plan with detailed test file modifications\\n\\nThis commit extends the Vector Interface Utils Refactoring Plan with comprehensive test file updates to support the new architecture. These additions include:\\n\\n1. Creation of a new test_utils.py file with thorough unit tests for all utility functions\\n2. Specific import changes needed in existing test files to resolve circular dependencies\\n3. Updates to test_contract.py, test_capability_negotiation.py, and test_independence.py to align with the new structure\\n4. Refactoring of integration tests to use the centralized utility functions\\n5. Creation of a new test_context_flow.py test module to verify context propagation\\n\\nThese test modifications complete the refactoring strategy by ensuring all functionality remains validated after moving utility functions to a dedicated module. The test changes maintain the same validation logic while adapting to the new architectural structure, providing a clear path for implementation.",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Testing
  - Files: M: theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md
- **2025-05-04 (Commit `5c983b6` by David Ryan)**: docs(vector): create knowledge context guide for Vector Interface refactoring\n\nThis commit adds a structured guidance document listing all essential files an AI should study before implementing the utils module refactoring. The document provides:\n\n1. A carefully ordered reading sequence that builds understanding progressively\n2. Clear categorization of files into core architecture, implementation details, tests, and documentation\n3. Explanation of key patterns that pervade the codebase, including Registry Pattern, Capability Negotiation, and Package Independence\n4. A recommended implementation sequence to ensure changes maintain architectural integrity\n\nThis knowledge guide complements the implementation plan by establishing the contextual understanding required before making changes. By first building a comprehensive mental model of the system, implementers can better appreciate the architectural implications of the refactoring and avoid unintended consequences.
<!-- AI_DATA_START
    {
      "hash": "5c983b63c0375052099f5791f3b52dd5a299de83",
      "short_message": "docs(vector): create knowledge context guide for Vector Interface refactoring\\n\\nThis commit adds a structured guidance document listing all essential files an AI should study before implementing the utils module refactoring. The document provides:\\n\\n1. A carefully ordered reading sequence that builds understanding progressively\\n2. Clear categorization of files into core architecture, implementation details, tests, and documentation\\n3. Explanation of key patterns that pervade the codebase, including Registry Pattern, Capability Negotiation, and Package Independence\\n4. A recommended implementation sequence to ensure changes maintain architectural integrity\\n\\nThis knowledge guide complements the implementation plan by establishing the contextual understanding required before making changes. By first building a comprehensive mental model of the system, implementers can better appreciate the architectural implications of the refactoring and avoid unintended consequences.",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/Context-and-Knowledge-for-Vector-System-Testing.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Testing
  - Files: D: theory-and-planning/May-5-Vector-System-Testing/Context-and-Knowledge-for-Vector-System-Testing.md
- **2025-05-04 (Commit `b8e8893` by David Ryan)**: fix(vector): enhance vector_to_db_string to prevent invisible commas issue
<!-- AI_DATA_START
    {
      "hash": "b8e88938f74e254d09268b7f0ad72d8fb480844c",
      "short_message": "fix(vector): enhance vector_to_db_string to prevent invisible commas issue",
      "author": "David Ryan",
      "date_iso": "2025-05-04",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, BugFix
  - Files: M: theory-and-planning/May-5-Vector-System-Testing/May-5-Vector-Interface-Utils-Refactoring-Plan.md
- **2025-05-03 (Commit `214b1b9` by David Ryan)**: docs(linguistic-interface): Comprehensive architecture analysis and implementation plan for linguistic processing integration
<!-- AI_DATA_START
    {
      "hash": "214b1b956054ae974252b090da6860bc099cb1ce",
      "short_message": "docs(linguistic-interface): Comprehensive architecture analysis and implementation plan for linguistic processing integration",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 2 Abstracted LinguisticProcessor.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/May 2 Linguistic-Tag-Extraction-Implementation.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/May 2 LinguisticProcessor Interface.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/May 3 Linguistics Interface Implementation Plan.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May-3-LP-Interface-Approaches.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Unified-Linguistic-Interface.md",
          "status": "A"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: A: theory-and-planning/May 2 Abstracted LinguisticProcessor.md, A: theory-and-planning/May 2 Linguistic-Tag-Extraction-Implementation.md, A: theory-and-planning/May 2 LinguisticProcessor Interface.md...
- **2025-05-03 (Commit `cda201d` by David Ryan)**: docs(linguistic-interface): propose safety enhancements to implementation plan
<!-- AI_DATA_START
    {
      "hash": "cda201d001b747adef0749910475cc8a12f9a2a6",
      "short_message": "docs(linguistic-interface): propose safety enhancements to implementation plan",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 3 Linguistics Interface Implementation Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: theory-and-planning/May 3 Linguistics Interface Implementation Plan.md
- **2025-05-03 (Commit `58ab4b1` by David Ryan)**: (docs) remove revisions addendum to Linguistics interface implementation plan after factoring them into the code in the plan.
<!-- AI_DATA_START
    {
      "hash": "58ab4b17ffbb6ccd581d0c25edea5f055e1aa377",
      "short_message": "(docs) remove revisions addendum to Linguistics interface implementation plan after factoring them into the code in the plan.",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 3 Linguistics Interface Implementation Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: theory-and-planning/May 3 Linguistics Interface Implementation Plan.md
- **2025-05-03 (Commit `372361f` by David Ryan)**: docs(architecture): Add detailed implementation plan for chunking architecture with per-field strategy support
<!-- AI_DATA_START
    {
      "hash": "372361fe6949b0a1fa4dfaedfff9802bfd69ba6e",
      "short_message": "docs(architecture): Add detailed implementation plan for chunking architecture with per-field strategy support",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Chunking Architecture Implementation Plan.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: D: theory-and-planning/Chunking Architecture Implementation Plan.md
- **2025-05-03 (Commit `82754c7` by David Ryan)**: added May 3 Chunking Architecture Implemenation Plan.
<!-- AI_DATA_START
    {
      "hash": "82754c72dcbff41ef08f25fc044c7267e8a19d47",
      "short_message": "added May 3 Chunking Architecture Implemenation Plan.",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Chunking Architecture Implementation Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/chunking interface/chunking_config.yaml",
          "status": "D"
        },
        {
          "path": "theory-and-planning/chunking interface/test_chunking_service.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: R: theory-and-planning/Chunking Architecture Implementation Plan.md, D: theory-and-planning/chunking interface/chunking_config.yaml, D: theory-and-planning/chunking interface/test_chunking_service.py
- **2025-05-03 (Commit `e990d40` by David Ryan)**: (docs) complete reorganization of theory-and-planning dir for clarity.
<!-- AI_DATA_START
    {
      "hash": "e990d40de2bfed52bc2a19d8470451373855c597",
      "short_message": "(docs) complete reorganization of theory-and-planning dir for clarity.",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Chunking Service Implementation.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/April 29 pgvector Integration Guide.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/April 30 Comprehensively Refactor Git Status to impose no assumptions.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/April 30 Embed Model Abstractions Possibilities.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/April 30 Status Notes and Thoughts.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/April-30-Git-Commit-Viewer-Cline-Musings.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/April-30-custom-prompt-composition-pipeline.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Dimension Issues Refactoring/Cline May 1 Embedding_Dimension_Refactoring_Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Dimension Issues Refactoring/DaFu May 1 Dimensions Refactoring.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 7-42-am diary.MD",
          "status": "A"
        },
        {
          "path": "theory-and-planning/May 1 Abstract Embedding Configuration Model.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Atomic Chunking Abstractions Possibilities.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Code Analysis Chunking.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Code Comments Model.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Database elements NOT currently being chunked and embedded.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Django Chunking Implementation.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Fork or Clone model ideas.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Language Agnostic Code Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Models with Embedding Fields.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Possible UI Buttons Left Column:Panel.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Services Directory.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/May 1 Settings.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/May 1 Swift and TypeScript Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 implementation-possibilities.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 views py.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/May 3 Chunking Architecture Implementation Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 3 Linguistics Interface Implementation Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May-3-LP-Interface-Approaches.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Second-Stage Refactoring- Structured Semantic Automation Layer.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Semantic_Tagging_Implementation_Plan.md",
          "status": "R"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: R: theory-and-planning/April 29 Chunking Service Implementation.md, R: theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md, R: theory-and-planning/April 29 pgvector Integration Guide.md...
- **2025-05-03 (Commit `aca4c6e` by David Ryan)**: add unified registry design, tag system refactoring in light of linguistics and chunking interfaces, and standalone django-pgvector envisionings.
<!-- AI_DATA_START
    {
      "hash": "aca4c6ee7772bcd5a973a3c02623f151584fcf08",
      "short_message": "add unified registry design, tag system refactoring in light of linguistics and chunking interfaces, and standalone django-pgvector envisionings.",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 3 Unified Registry System Design.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Stand alone django-pgvector.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Tagging system/May 3 Tag System Refactoring Leveraging Linguistics and Chunking Interfaces.md",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: theory-and-planning/May 3 Unified Registry System Design.md, D: theory-and-planning/Stand alone django-pgvector.md, D: theory-and-planning/Tagging system/May 3 Tag System Refactoring Leveraging Linguistics and Chunking Interfaces.md
- **2025-05-03 (Commit `572e958` by David Ryan)**: initial revisions to Linguistics Interface implementation plan to align with Chunking interface and Unified Registry design.
<!-- AI_DATA_START
    {
      "hash": "572e9587ec4f0ea6dd6a1a0f066043bc2a18e26c",
      "short_message": "initial revisions to Linguistics Interface implementation plan to align with Chunking interface and Unified Registry design.",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Linguistics interface/May 3 Linguistics Interface Implementation Plan.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 3 Unified Registry System Design.md",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: theory-and-planning/Linguistics interface/May 3 Linguistics Interface Implementation Plan.md, M: theory-and-planning/May 3 Unified Registry System Design.md
- **2025-05-03 (Commit `97600a2` by David Ryan)**: add refactored clean Linguistics interface implementation plan. Will now remove tag-related elements: Remove tag extraction-specific components
<!-- AI_DATA_START
    {
      "hash": "97600a258f35bc23861203fa206c2bffacabd743",
      "short_message": "add refactored clean Linguistics interface implementation plan. Will now remove tag-related elements: Remove tag extraction-specific components",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Linguistics interface/May 3 Linguistics Interface Implementation Plan.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Linguistics interface/Refactored Linguistics Implementation Plan.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/unified_registry_aligned.zip",
          "status": "D"
        },
        {
          "path": "theory-and-planning/unified_registry_aligned/chunking_registry.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/unified_registry_aligned/linguistic_registry.py",
          "status": "D"
        },
        {
          "path": "theory-and-planning/unified_registry_aligned/registry_base.py",
          "status": "D"
        }
      ],
      "themes": [
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement, Feature
  - Files: M: theory-and-planning/Linguistics interface/May 3 Linguistics Interface Implementation Plan.md, D: theory-and-planning/Linguistics interface/Refactored Linguistics Implementation Plan.md, D: theory-and-planning/unified_registry_aligned.zip...
- **2025-05-03 (Commit `4d3b174` by David Ryan)**: refactored Linguistics interface implementation plan to create a cleaner architecture and better separation of concerns. Tag extraction has been removed from the Linguistics interface, leaving that responsibility to the dedicated Tag System that should consume linguistic analysis through the well-defined interfaces.
<!-- AI_DATA_START
    {
      "hash": "4d3b1741460f54fedd16d2801108fed00936aefe",
      "short_message": "refactored Linguistics interface implementation plan to create a cleaner architecture and better separation of concerns. Tag extraction has been removed from the Linguistics interface, leaving that responsibility to the dedicated Tag System that should consume linguistic analysis through the well-defined interfaces.",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Linguistics interface/Refactored Linguistics Implementation Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement
  - Files: M: theory-and-planning/Linguistics interface/Refactored Linguistics Implementation Plan.md
- **2025-05-03 (Commit `4ee0ad2` by David Ryan)**: visions for Advanced Unified Registry System, plus impact analyses on existing and planned subsystems.
<!-- AI_DATA_START
    {
      "hash": "4ee0ad26a04a9dc7b4d58bebec42653a797205eb",
      "short_message": "visions for Advanced Unified Registry System, plus impact analyses on existing and planned subsystems.",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Implementation Impact Analysis- Unified Registry System & Chunking Architecture.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified Registry System & Linguistics Interface- Implementation Impact Analysis.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified Registry System Impact- Embedder Registry.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified_Registry_System_Implementation_Plan.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 3 Unified Registry System Design.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/unified_registry_aligned.zip",
          "status": "A"
        },
        {
          "path": "theory-and-planning/unified_registry_aligned/chunking_registry.py",
          "status": "A"
        },
        {
          "path": "theory-and-planning/unified_registry_aligned/linguistic_registry.py",
          "status": "A"
        },
        {
          "path": "theory-and-planning/unified_registry_aligned/registry_base.py",
          "status": "A"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: theory-and-planning/Advanced Unified Registry System/Implementation Impact Analysis- Unified Registry System & Chunking Architecture.md, D: theory-and-planning/Advanced Unified Registry System/Unified Registry System & Linguistics Interface- Implementation Impact Analysis.md, D: theory-and-planning/Advanced Unified Registry System/Unified Registry System Impact- Embedder Registry.md...
- **2025-05-03 (Commit `47035ad` by David Ryan)**: docs(registry): add file structure and location section to Unified Registry System Implementation Plan
<!-- AI_DATA_START
    {
      "hash": "47035ade932b3a05df6f4517697ffb64c7dea2c5",
      "short_message": "docs(registry): add file structure and location section to Unified Registry System Implementation Plan",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified_Registry_System_Implementation_Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: M: theory-and-planning/Advanced Unified Registry System/Unified_Registry_System_Implementation_Plan.md
- **2025-05-03 (Commit `c981562` by David Ryan)**: Merge pull request #11 from davidorex/feature/linguistics-interface
<!-- AI_DATA_START
    {
      "hash": "c98156293048e80a4e30b740f981fac5cff77136",
      "short_message": "Merge pull request #11 from davidorex/feature/linguistics-interface",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Implementation Impact Analysis- Unified Registry System & Chunking Architecture.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified Registry System & Linguistics Interface- Implementation Impact Analysis.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified Registry System Impact- Embedder Registry.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified_Registry_System_Implementation_Plan.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/April 29 Chunking Service Implementation.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/April 29 pgvector Integration Guide.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/April 30 Comprehensively Refactor Git Status to impose no assumptions.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/April 30 Embed Model Abstractions Possibilities.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/April 30 Status Notes and Thoughts.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/April-30-Git-Commit-Viewer-Cline-Musings.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/April-30-custom-prompt-composition-pipeline.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Dimension Issues Refactoring/Cline May 1 Embedding_Dimension_Refactoring_Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Dimension Issues Refactoring/DaFu May 1 Dimensions Refactoring.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Linguistics interface/Refactored Linguistics Implementation Plan.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 7-42-am diary.MD",
          "status": "A"
        },
        {
          "path": "theory-and-planning/May 1 Abstract Embedding Configuration Model.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Atomic Chunking Abstractions Possibilities.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Code Analysis Chunking.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Code Comments Model.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Database elements NOT currently being chunked and embedded.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Django Chunking Implementation.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Fork or Clone model ideas.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Language Agnostic Code Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Models with Embedding Fields.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Possible UI Buttons Left Column:Panel.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Services Directory.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/May 1 Settings.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/May 1 Swift and TypeScript Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 implementation-possibilities.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 views py.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/May 3 Linguistics Interface Implementation Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 3 Unified Registry System Design.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May-3-LP-Interface-Approaches.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Second-Stage Refactoring- Structured Semantic Automation Layer.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Semantic_Tagging_Implementation_Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Stand alone django-pgvector.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Tagging system/May 3 Tag System Refactoring Leveraging Linguistics and Chunking Interfaces.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/chunking interface/May 3 Chunking Architecture Implementation Plan.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/chunking interface/chunking_config.yaml",
          "status": "D"
        },
        {
          "path": "theory-and-planning/chunking interface/test_chunking_service.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: theory-and-planning/Advanced Unified Registry System/Implementation Impact Analysis- Unified Registry System & Chunking Architecture.md, D: theory-and-planning/Advanced Unified Registry System/Unified Registry System & Linguistics Interface- Implementation Impact Analysis.md, D: theory-and-planning/Advanced Unified Registry System/Unified Registry System Impact- Embedder Registry.md...
- **2025-05-03 (Commit `96152d5` by David Ryan)**: feat(registry): implement Phase 1 of Unified Registry System core foundation
<!-- AI_DATA_START
    {
      "hash": "96152d53eff4aa8c7f0eabb50a873a8ac69a5723",
      "short_message": "feat(registry): implement Phase 1 of Unified Registry System core foundation",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/registry.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/registry.py
- **2025-05-03 (Commit `4e80e2e` by David Ryan)**: feat(registry): implement EmbeddingRegistry for Unified Registry System
<!-- AI_DATA_START
    {
      "hash": "4e80e2ed6e044e4950b9d9b46a4ed0b2a4f9c0d0",
      "short_message": "feat(registry): implement EmbeddingRegistry for Unified Registry System",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/registry.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/pgvector/registry.py
- **2025-05-03 (Commit `15cc50e` by David Ryan)**: feat(registry): create compatibility layer for embedder migration
<!-- AI_DATA_START
    {
      "hash": "15cc50e08fe411c120da0bc9a53fcbf83327a9d1",
      "short_message": "feat(registry): create compatibility layer for embedder migration",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/embedder_registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/services/embedder_registry.py
- **2025-05-03 (Commit `608aa48` by David Ryan)**: docs(linguistics): create Unified Registry System integration plan for Linguistics Interface
<!-- AI_DATA_START
    {
      "hash": "608aa4883a5de8234019c9aaf1108230001746ce",
      "short_message": "docs(linguistics): create Unified Registry System integration plan for Linguistics Interface",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Linguistics interface/Linguistics Implementation Plan for Unified Registry System.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: theory-and-planning/Linguistics interface/Linguistics Implementation Plan for Unified Registry System.md
- **2025-05-03 (Commit `c7b539a` by David Ryan)**: mostly-written Chunking Architecture with Unified Registry Implementation Plan.md which cuts off during Best Practices section at line 2259.
<!-- AI_DATA_START
    {
      "hash": "c7b539acb65fdd9d32e0991a8ab5c84e8e1b2fbb",
      "short_message": "mostly-written Chunking Architecture with Unified Registry Implementation Plan.md which cuts off during Best Practices section at line 2259.",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md
- **2025-05-03 (Commit `37f5a7c` by David Ryan)**: mostly-written Chunking Architecture with Unified Registry Implementation Plan.md which cuts off during Best Practices section at line 2259.
<!-- AI_DATA_START
    {
      "hash": "37f5a7ce9cc89272df63732e1c2fa0f5075e3dfb",
      "short_message": "mostly-written Chunking Architecture with Unified Registry Implementation Plan.md which cuts off during Best Practices section at line 2259.",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md
- **2025-05-03 (Commit `1ad3e63` by David Ryan)**: docs(chunking): complete Unified Registry System integration plan for Chunking Architecture
<!-- AI_DATA_START
    {
      "hash": "1ad3e63ab547074d15eb618d22ad534cf92b24cf",
      "short_message": "docs(chunking): complete Unified Registry System integration plan for Chunking Architecture",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md
- **2025-05-03 (Commit `da892fc` by David Ryan)**: docs(tagging): create Tag System with Unified Registry Implementation plan
<!-- AI_DATA_START
    {
      "hash": "da892fc82c4a4623f225b41c3abf26278795026c",
      "short_message": "docs(tagging): create Tag System with Unified Registry Implementation plan",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Tagging system/Tag System with Unified Registry Implementation.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: theory-and-planning/Tagging system/Tag System with Unified Registry Implementation.md
- **2025-05-03 (Commit `6eee2cc` by David Ryan)**: finishe implementing unified registry system, and now to focus on Chunking Architecture.
<!-- AI_DATA_START
    {
      "hash": "6eee2ccdac19d212bd971c086698747548b9a21a",
      "short_message": "finishe implementing unified registry system, and now to focus on Chunking Architecture.",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Enhancing the Prompt-Composition Pipeline with Unified Registry System.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 3 Architecture Integration Overview.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Prompt-Composition Pipeline as a Universal Django NLP Layer.md",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: theory-and-planning/Advanced Unified Registry System/Enhancing the Prompt-Composition Pipeline with Unified Registry System.md, D: theory-and-planning/May 3 Architecture Integration Overview.md, D: theory-and-planning/Prompt-Composition Pipeline as a Universal Django NLP Layer.md
- **2025-05-03 (Commit `2d02491` by David Ryan)**: Merge pull request #12 from davidorex/feature/unified-registry-system
<!-- AI_DATA_START
    {
      "hash": "2d02491af4accca607ab8c8412a6324841510b5b",
      "short_message": "Merge pull request #12 from davidorex/feature/unified-registry-system",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Enhancing the Prompt-Composition Pipeline with Unified Registry System.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Linguistics interface/Linguistics Implementation Plan for Unified Registry System.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 3 Architecture Integration Overview.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Prompt-Composition Pipeline as a Universal Django NLP Layer.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Tagging system/Tag System with Unified Registry Implementation.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/registry.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/registry.py",
          "status": "D"
        },
        {
          "path": "viewer/services/embedder_registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: theory-and-planning/Advanced Unified Registry System/Enhancing the Prompt-Composition Pipeline with Unified Registry System.md, D: theory-and-planning/Linguistics interface/Linguistics Implementation Plan for Unified Registry System.md, D: theory-and-planning/May 3 Architecture Integration Overview.md...
- **2025-05-03 (Commit `dbfd0d7` by David Ryan)**: feat(chunking): intend to establish core infrastructure for Chunking Architecture
<!-- AI_DATA_START
    {
      "hash": "dbfd0d7bf74d118b237023fe016a7a907a45bdb9",
      "short_message": "feat(chunking): intend to establish core infrastructure for Chunking Architecture",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/chunking/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/chunking/base.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/chunking/registry.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/chunking/__init__.py, D: viewer/semantic/chunking/base.py, D: viewer/semantic/chunking/registry.py
- **2025-05-03 (Commit `a3a6147` by David Ryan)**: feat(chunking): introduce intent for token-based chunking strategy
<!-- AI_DATA_START
    {
      "hash": "a3a6147d676b0beb4fb6e14fc412850c38fd8d05",
      "short_message": "feat(chunking): introduce intent for token-based chunking strategy",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/chunking/token_strategy.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/chunking/token_strategy.py
- **2025-05-03 (Commit `ad179ec` by David Ryan)**: feat(chunking): intend to create paragraph-respecting chunking strategy
<!-- AI_DATA_START
    {
      "hash": "ad179ec9163619edf2e4e63354a70f374e366ac9",
      "short_message": "feat(chunking): intend to create paragraph-respecting chunking strategy",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/chunking/paragraph_strategy.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/chunking/paragraph_strategy.py
- **2025-05-03 (Commit `2b31f3f` by David Ryan)**: feat(chunking): intend to expose strategy implementations in package API
<!-- AI_DATA_START
    {
      "hash": "2b31f3f33ee299f5d59463bfd9b2c4270968f918",
      "short_message": "feat(chunking): intend to expose strategy implementations in package API",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/chunking/__init__.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/semantic/chunking/__init__.py
- **2025-05-03 (Commit `83cb91a` by David Ryan)**: feat(chunking): intend to provide service layer for chunking operations
<!-- AI_DATA_START
    {
      "hash": "83cb91aca8ccad369c5058655b0d13a862c07f10",
      "short_message": "feat(chunking): intend to provide service layer for chunking operations",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/chunking/service.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/chunking/service.py
- **2025-05-03 (Commit `819a379` by David Ryan)**: feat(chunking): intend to integrate service layer with package API
<!-- AI_DATA_START
    {
      "hash": "819a379b311ef5930ba6506bef5b1e5dc2480312",
      "short_message": "feat(chunking): intend to integrate service layer with package API",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/chunking/__init__.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/semantic/chunking/__init__.py
- **2025-05-03 (Commit `3618e06` by David Ryan)**: feat(chunking): intend to establish cross-system integration adapters
<!-- AI_DATA_START
    {
      "hash": "3618e0655660fec9bdb54f499bef90789254421b",
      "short_message": "feat(chunking): intend to establish cross-system integration adapters",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/chunking/adapters.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/chunking/adapters.py
- **2025-05-03 (Commit `05dfa54` by David Ryan)**: feat(chunking): intend to add linguistic-aware chunking strategy
<!-- AI_DATA_START
    {
      "hash": "05dfa5495edd7db6a3c9ea07d928acd3bce9688d",
      "short_message": "feat(chunking): intend to add linguistic-aware chunking strategy",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/chunking/linguistic_strategy.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/chunking/linguistic_strategy.py
- **2025-05-03 (Commit `98f4181` by David Ryan)**: feat(chunking): add notes about linguistics placeholder implementations
<!-- AI_DATA_START
    {
      "hash": "98f418108afeeebb5f2fef20767db0bbe51c1819",
      "short_message": "feat(chunking): add notes about linguistics placeholder implementations",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/chunking/__init__.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/semantic/chunking/__init__.py
- **2025-05-03 (Commit `3de3390` by David Ryan)**: feat(chunking): update ChunkableTextField to support chunking strategies
<!-- AI_DATA_START
    {
      "hash": "3de339071794c7ff8d7430f914743bde150f311b",
      "short_message": "feat(chunking): update ChunkableTextField to support chunking strategies",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md, M: viewer/semantic/fields.py
- **2025-05-03 (Commit `4437408` by David Ryan)**: feat(chunking): update semantic_unit decorator to support strategy configuration
<!-- AI_DATA_START
    {
      "hash": "4437408a23019a68b4a06b68b05cd3c1d4b569f3",
      "short_message": "feat(chunking): update semantic_unit decorator to support strategy configuration",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/decorators.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/semantic/decorators.py
- **2025-05-03 (Commit `7eb0329` by David Ryan)**: docs(chunking): add comprehensive architecture documentation
<!-- AI_DATA_START
    {
      "hash": "7eb03293910778a2768cada22a680d1f74b4ee48",
      "short_message": "docs(chunking): add comprehensive architecture documentation",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Chunking-Architecture.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: D: documentation/Chunking-Architecture.md
- **2025-05-03 (Commit `ddb67a4` by David Ryan)**: docs(chunking): expand architecture documentation with extensibility and future capabilities
<!-- AI_DATA_START
    {
      "hash": "ddb67a400bbba848ae090bf46246dcd3e20e9439",
      "short_message": "docs(chunking): expand architecture documentation with extensibility and future capabilities",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Chunking-Architecture.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: documentation/Chunking-Architecture.md
- **2025-05-03 (Commit `a6bd7f3` by David Ryan)**: note progress on Chunking implementation plan.
<!-- AI_DATA_START
    {
      "hash": "a6bd7f33751b168931bbac6ae4c50c3dd560fe66",
      "short_message": "note progress on Chunking implementation plan.",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md
- **2025-05-03 (Commit `5251981` by David Ryan)**: Merge pull request #13 from davidorex/feature/chunking-architecture-with-unified-registry
<!-- AI_DATA_START
    {
      "hash": "5251981478f00db07926ff3dd9c18c190b550295",
      "short_message": "Merge pull request #13 from davidorex/feature/chunking-architecture-with-unified-registry",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Chunking-Architecture.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/chunking/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/chunking/adapters.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/chunking/base.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/chunking/linguistic_strategy.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/chunking/paragraph_strategy.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/chunking/registry.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/chunking/service.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/chunking/token_strategy.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/decorators.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: documentation/Chunking-Architecture.md, M: theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md, D: viewer/semantic/chunking/__init__.py...
- **2025-05-03 (Commit `50d0491` by David Ryan)**: feat(linguistic): implement base linguistic data structures
<!-- AI_DATA_START
    {
      "hash": "50d049192e58138dcb71773be6fd48a7a1c509d3",
      "short_message": "feat(linguistic): implement base linguistic data structures",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/linguistic/models.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/linguistic/models.py
- **2025-05-03 (Commit `6676a96` by David Ryan)**: feat(linguistic): define core interfaces with integration boundaries
<!-- AI_DATA_START
    {
      "hash": "6676a96bcf30782a66a565059a89cadca904e62e",
      "short_message": "feat(linguistic): define core interfaces with integration boundaries",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/linguistic/interfaces.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/linguistic/interfaces.py
- **2025-05-03 (Commit `d0977a6` by David Ryan)**: feat(linguistic): implement registry system with unified registry pattern
<!-- AI_DATA_START
    {
      "hash": "d0977a67eb162f1dc1634ee076471b426234556c",
      "short_message": "feat(linguistic): implement registry system with unified registry pattern",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/linguistic/registry.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/linguistic/registry.py
- **2025-05-03 (Commit `9ce8acc` by David Ryan)**: feat(linguistic): create package structure and API surface
<!-- AI_DATA_START
    {
      "hash": "9ce8acc1ed605d5c7d83b7fa7cd4cef1f509d299",
      "short_message": "feat(linguistic): create package structure and API surface",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/linguistic/__init__.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/linguistic/__init__.py
- **2025-05-03 (Commit `429cd26` by David Ryan)**: feat(linguistic): implement spaCy backend with registry integration
<!-- AI_DATA_START
    {
      "hash": "429cd2680a40707a77931332a5ae4af909879e73",
      "short_message": "feat(linguistic): implement spaCy backend with registry integration",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/linguistic/backends/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/linguistic/backends/spacy_processor.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/linguistic/backends/__init__.py, D: viewer/semantic/linguistic/backends/spacy_processor.py
- **2025-05-03 (Commit `a7fc2fe` by David Ryan)**: feat(linguistic): implement linguistic strategies with registry integration
<!-- AI_DATA_START
    {
      "hash": "a7fc2feb676867e8f8950ee3fe3711149213807d",
      "short_message": "feat(linguistic): implement linguistic strategies with registry integration",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Prompt-Composition Pipeline as a Universal Django NLP Layer.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/linguistic/strategies.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: theory-and-planning/Prompt-Composition Pipeline as a Universal Django NLP Layer.md, D: viewer/semantic/linguistic/strategies.py
- **2025-05-03 (Commit `2a67bdb` by David Ryan)**: feat(linguistic): implement unified linguistic service layer
<!-- AI_DATA_START
    {
      "hash": "2a67bdbb31b926b96d6d85d38fb2a8639631c079",
      "short_message": "feat(linguistic): implement unified linguistic service layer",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/linguistic/service.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/linguistic/service.py
- **2025-05-03 (Commit `ef60c94` by David Ryan)**: feat(linguistic): add adapter pattern for cross-system integration
<!-- AI_DATA_START
    {
      "hash": "ef60c94e7724e017b5e2e36d1aa012446b720019",
      "short_message": "feat(linguistic): add adapter pattern for cross-system integration",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/linguistic/__init__.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/linguistic/registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/semantic/linguistic/__init__.py, M: viewer/semantic/linguistic/registry.py
- **2025-05-03 (Commit `09ef05f` by David Ryan)**: feat(semantic): enhance semantic_unit decorator with linguistic capabilities
<!-- AI_DATA_START
    {
      "hash": "09ef05fa1238cbbe1e6f439895fd8adb4c30987d",
      "short_message": "feat(semantic): enhance semantic_unit decorator with linguistic capabilities",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/decorators.py",
          "status": "M"
        }
      ],
      "themes": [
        "Semantic Subsystem",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Semantic Subsystem, Feature
  - Files: M: viewer/semantic/decorators.py
- **2025-05-03 (Commit `d55589c` by David Ryan)**: feat(linguistic): implement CLI utility for linguistic processing
<!-- AI_DATA_START
    {
      "hash": "d55589c2aa11d1f72d2ec80b7b3577c2552800ad",
      "short_message": "feat(linguistic): implement CLI utility for linguistic processing",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/process_linguistic.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/management/commands/process_linguistic.py
- **2025-05-03 (Commit `344a8ea` by David Ryan)**: feat(linguistic): enhance tag generation with linguistic processing capabilities
<!-- AI_DATA_START
    {
      "hash": "344a8eaacd2bb9573aefcd1edbc11b702a2878a0",
      "short_message": "feat(linguistic): enhance tag generation with linguistic processing capabilities",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/generate_commit_tags.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/management/commands/generate_commit_tags.py
- **2025-05-03 (Commit `33e4e78` by David Ryan)**: feat(linguistic): add configuration settings and app initialization
<!-- AI_DATA_START
    {
      "hash": "33e4e7896101eb3797f63a286cef0cb22df38785",
      "short_message": "feat(linguistic): add configuration settings and app initialization",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer/settings.py",
          "status": "M"
        },
        {
          "path": "viewer/apps.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: git_commit_viewer/settings.py, M: viewer/apps.py
- **2025-05-03 (Commit `44b86d7` by David Ryan)**: docs(linguistic): add comprehensive linguistic interface documentation
<!-- AI_DATA_START
    {
      "hash": "44b86d7a5a5f587e433a3704bbb3a258491ffbed",
      "short_message": "docs(linguistic): add comprehensive linguistic interface documentation",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Linguistic-Interface.md",
          "status": "D"
        },
        {
          "path": "documentation/Management-Commands.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: D: documentation/Linguistic-Interface.md, M: documentation/Management-Commands.md
- **2025-05-03 (Commit `8fcd9db` by David Ryan)**: feat(linguistic): implement boundary provider for chunking integration
<!-- AI_DATA_START
    {
      "hash": "8fcd9dba12138685ddedfaae7117d3c59def00d1",
      "short_message": "feat(linguistic): implement boundary provider for chunking integration",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/linguistic/__init__.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/linguistic/boundary_provider.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/semantic/linguistic/__init__.py, D: viewer/semantic/linguistic/boundary_provider.py
- **2025-05-03 (Commit `251e1e3` by David Ryan)**: docs(subsystems): update documentation and remove placeholder notes after linguistic integration
<!-- AI_DATA_START
    {
      "hash": "251e1e3e20660c6ae0acf217e3d3f784ccd33aef",
      "short_message": "docs(subsystems): update documentation and remove placeholder notes after linguistic integration",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Chunking-Architecture.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/chunking/__init__.py",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: documentation/Chunking-Architecture.md, M: viewer/semantic/chunking/__init__.py
- **2025-05-03 (Commit `2ab39a7` by David Ryan)**: docs: update README_AI with Chunking Architecture and Unified Registry System
<!-- AI_DATA_START
    {
      "hash": "2ab39a7a0aff4ef503514ec2ed42c8a893fb37df",
      "short_message": "docs: update README_AI with Chunking Architecture and Unified Registry System",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: README_AI.md
- **2025-05-03 (Commit `2bb83f7` by David Ryan)**: feat(tagging): implement tag extraction system with Unified Registry
<!-- AI_DATA_START
    {
      "hash": "2bb83f76dba39da3cb4b2133d21215aed98d0baa",
      "short_message": "feat(tagging): implement tag extraction system with Unified Registry",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/tagging/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/tagging/base.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/tagging/linguistic_strategy.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/tagging/pattern_strategy.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/tagging/registry.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/semantic/tagging/__init__.py, D: viewer/semantic/tagging/base.py, D: viewer/semantic/tagging/linguistic_strategy.py...
- **2025-05-03 (Commit `88caef5` by David Ryan)**: feat(tagging): implement tagging service with Unified Registry integration
<!-- AI_DATA_START
    {
      "hash": "88caef5391643c779cb1dbb4cccd49f13619f39b",
      "short_message": "feat(tagging): implement tagging service with Unified Registry integration",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/generate_commit_tags.py",
          "status": "M"
        },
        {
          "path": "viewer/models_tagging.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/tagging/__init__.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/tagging/adapters.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/tagging/chain.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/tagging/service.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/management/commands/generate_commit_tags.py, D: viewer/models_tagging.py, M: viewer/semantic/tagging/__init__.py...
- **2025-05-03 (Commit `4399544` by David Ryan)**: feat(commands): update generate_commit_tags to use Unified Registry
<!-- AI_DATA_START
    {
      "hash": "43995442a5a359ddf076e113888b983d03ab361e",
      "short_message": "feat(commands): update generate_commit_tags to use Unified Registry",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/generate_commit_tags.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/management/commands/generate_commit_tags.py
- **2025-05-03 (Commit `a868ab4` by David Ryan)**: docs: add comprehensive tagging system documentation
<!-- AI_DATA_START
    {
      "hash": "a868ab4401bba216106a02d069225f6acd1eeb77",
      "short_message": "docs: add comprehensive tagging system documentation",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "M"
        },
        {
          "path": "documentation/Tagging-System.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: M: README_AI.md, D: documentation/Tagging-System.md
- **2025-05-03 (Commit `a4b7e43` by David Ryan)**: docs(vector): add comprehensive Vector Interface implementation plan
<!-- AI_DATA_START
    {
      "hash": "a4b7e43f25e7061045b4389add70328b88b62370",
      "short_message": "docs(vector): add comprehensive Vector Interface implementation plan",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector Interface/Vector Interface Implementation Plan for Unified Registry System.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Feature
  - Files: D: theory-and-planning/Vector Interface/Vector Interface Implementation Plan for Unified Registry System.md
- **2025-05-03 (Commit `a9197b4` by David Ryan)**: fix(linguistic): properly export LinguisticService in package __init__.py
<!-- AI_DATA_START
    {
      "hash": "a9197b4895013ade17327cdcec6b6c39358f0848",
      "short_message": "fix(linguistic): properly export LinguisticService in package __init__.py",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/generate_commit_tags.py",
          "status": "M"
        },
        {
          "path": "viewer/semantic/linguistic/__init__.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/management/commands/generate_commit_tags.py, M: viewer/semantic/linguistic/__init__.py
- **2025-05-03 (Commit `6913123` by David Ryan)**: feat(commands): add verbose flag to generate_commit_tags for visibility
<!-- AI_DATA_START
    {
      "hash": "6913123ff1510fd12f85b2d39c7b812bb93e1310",
      "short_message": "feat(commands): add verbose flag to generate_commit_tags for visibility",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector Interface/Vector Interface Implementation Plan for Unified Registry System.md",
          "status": "M"
        },
        {
          "path": "viewer/management/commands/generate_commit_tags.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: theory-and-planning/Vector Interface/Vector Interface Implementation Plan for Unified Registry System.md, M: viewer/management/commands/generate_commit_tags.py
- **2025-05-03 (Commit `826970a` by David Ryan)**: feat(commands): add timeout handling to generate_commit_tags command
<!-- AI_DATA_START
    {
      "hash": "826970a24d4805d45073da0c6c5dc61b68d19c2b",
      "short_message": "feat(commands): add timeout handling to generate_commit_tags command",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/generate_commit_tags.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/management/commands/generate_commit_tags.py
- **2025-05-03 (Commit `567d44a` by David Ryan)**: feat(commands): add progress indicator for model downloads
<!-- AI_DATA_START
    {
      "hash": "567d44a8f461b70654f2dd306f7eb20b9d02c8bf",
      "short_message": "feat(commands): add progress indicator for model downloads",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/generate_commit_tags.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/management/commands/generate_commit_tags.py
- **2025-05-03 (Commit `5f12540` by David Ryan)**: fix(nlp): prevent network downloads and use local models only
<!-- AI_DATA_START
    {
      "hash": "5f125408eea6d37abae225ddbe2c241fc3743486",
      "short_message": "fix(nlp): prevent network downloads and use local models only",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "requirements.txt",
          "status": "M"
        },
        {
          "path": "viewer/management/commands/generate_commit_tags.py",
          "status": "M"
        },
        {
          "path": "viewer/services/nlp_service.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: requirements.txt, M: viewer/management/commands/generate_commit_tags.py, M: viewer/services/nlp_service.py
- **2025-05-03 (Commit `1873cfe` by David Ryan)**: docs: add Service Layer Integration skeleton document
<!-- AI_DATA_START
    {
      "hash": "1873cfeea4838aae914ebe75e34b131ca3b93991",
      "short_message": "docs: add Service Layer Integration skeleton document",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Unified-Registry-System.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified_Registry_System_Implementation_Plan.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: D: documentation/Unified-Registry-System.md, M: theory-and-planning/Advanced Unified Registry System/Unified_Registry_System_Implementation_Plan.md
- **2025-05-03 (Commit `6e2d7df` by David Ryan)**: docs(analysis): create evidence-based Service Layer Integration Analysis
<!-- AI_DATA_START
    {
      "hash": "6e2d7df6eb280de4a3b7409843c1e18e8ea163da",
      "short_message": "docs(analysis): create evidence-based Service Layer Integration Analysis",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Service-Layer-Integration-Analysis.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: theory-and-planning/After-action unified registry inventory-and-review/Service-Layer-Integration-Analysis.md
- **2025-05-03 (Commit `ab153eb` by David Ryan)**: docs(analysis): document service initialization dependency issues
<!-- AI_DATA_START
    {
      "hash": "ab153eb714b6d2acd417d52d56913288a7c375b7",
      "short_message": "docs(analysis): document service initialization dependency issues",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Service-Initialization-Dependencies.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: theory-and-planning/After-action unified registry inventory-and-review/Service-Initialization-Dependencies.md
- **2025-05-03 (Commit `ed867ff` by David Ryan)**: docs(analysis): examine cross-system type conversion vulnerabilities
<!-- AI_DATA_START
    {
      "hash": "ed867ff52c198c3a27bbc5aed4fbb09d9de957c0",
      "short_message": "docs(analysis): examine cross-system type conversion vulnerabilities",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Type-Conversion-Analysis.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: theory-and-planning/After-action unified registry inventory-and-review/Type-Conversion-Analysis.md
- **2025-05-03 (Commit `dd8d989` by David Ryan)**: docs(analysis): analyze context object propagation inconsistencies
<!-- AI_DATA_START
    {
      "hash": "dd8d9893812500c8926e43c8ddcf75981ee7899b",
      "short_message": "docs(analysis): analyze context object propagation inconsistencies",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Service-Layer-Integration.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Enhancing the Prompt-Composition Pipeline with Unified Registry System.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Implementation Impact Analysis- Unified Registry System & Chunking Architecture.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified Registry System & Linguistics Interface- Implementation Impact Analysis.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified Registry System Impact- Embedder Registry.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Advanced Unified Registry System/Unified_Registry_System_Implementation_Plan.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Context-Object-Propagation.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Service-Layer-Integration-Analysis.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Linguistics interface/Linguistics Implementation Plan for Unified Registry System.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Tagging system/Tag System with Unified Registry Implementation.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/chunking interface/Chunking Architecture with Unified Registry Implementation Plan.md",
          "status": "R"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: documentation/Service-Layer-Integration.md, R: theory-and-planning/Advanced Unified Registry System/Enhancing the Prompt-Composition Pipeline with Unified Registry System.md, R: theory-and-planning/Advanced Unified Registry System/Implementation Impact Analysis- Unified Registry System & Chunking Architecture.md...
- **2025-05-03 (Commit `69f7001` by David Ryan)**: docs(analysis): identify capability negotiation deficiencies
<!-- AI_DATA_START
    {
      "hash": "69f70014400542e62f3256f7e7d80eacbcaf9248",
      "short_message": "docs(analysis): identify capability negotiation deficiencies",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Capability-Negotiation-Analysis.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: theory-and-planning/After-action unified registry inventory-and-review/Capability-Negotiation-Analysis.md
- **2025-05-03 (Commit `b6d9927` by David Ryan)**: docs(analysis): synthesize service integration vulnerabilities into summary
<!-- AI_DATA_START
    {
      "hash": "b6d99275ff52ad61135d87bae5661840c84c6aa3",
      "short_message": "docs(analysis): synthesize service integration vulnerabilities into summary",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/Integration-Analysis-Summary.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: theory-and-planning/After-action unified registry inventory-and-review/Integration-Analysis-Summary.md
- **2025-05-03 (Commit `a4e0687` by David Ryan)**: docs(architecture): provide concrete fixes for service integration issues
<!-- AI_DATA_START
    {
      "hash": "a4e06876d1d1c45db7a05db7a0e3d9b8e5d40472",
      "short_message": "docs(architecture): provide concrete fixes for service integration issues",
      "author": "David Ryan",
      "date_iso": "2025-05-03",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/After-action unified registry inventory-and-review/High-Confidence-Mutations.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, BugFix
  - Files: D: theory-and-planning/After-action unified registry inventory-and-review/High-Confidence-Mutations.md
- **2025-05-02 (Commit `4a814f1` by David Ryan)**: feat(dimensions): Enhance central dimension provider with caching and updates
<!-- AI_DATA_START
    {
      "hash": "4a814f1152d720d3dbd9c8ea1ed8d4b8451a46cb",
      "short_message": "feat(dimensions): Enhance central dimension provider with caching and updates",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/models.py
- **2025-05-02 (Commit `02edd3b` by David Ryan)**: feat(dimensions): Add schema synchronization mechanisms for dimension consistency
<!-- AI_DATA_START
    {
      "hash": "02edd3b5f9215f65d6cea972dea88c40a40f0a8a",
      "short_message": "feat(dimensions): Add schema synchronization mechanisms for dimension consistency",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/sync_vector_dimensions.py",
          "status": "D"
        },
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/management/commands/sync_vector_dimensions.py, M: viewer/models.py
- **2025-05-02 (Commit `19ec9bc` by David Ryan)**: fix(embedder): Update EmbedderRegistry to propagate dimension changes
<!-- AI_DATA_START
    {
      "hash": "19ec9bcbc3386edb0106ea74b447123bff5a4fcf",
      "short_message": "fix(embedder): Update EmbedderRegistry to propagate dimension changes",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/embedder_registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/services/embedder_registry.py
- **2025-05-02 (Commit `7e77dd9` by David Ryan)**: feat(vector-field): Make VectorField adapt to global dimension settings
<!-- AI_DATA_START
    {
      "hash": "7e77dd9c3550917d4b5f75792b4caf64a4f3ecf1",
      "short_message": "feat(vector-field): Make VectorField adapt to global dimension settings",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/pgvector/fields.py
- **2025-05-02 (Commit `c0b38a3` by David Ryan)**: refactor(vector-literal): Improve VectorLiteral dimension handling
<!-- AI_DATA_START
    {
      "hash": "c0b38a34898c515c9104f59992b4cd3260797e83",
      "short_message": "refactor(vector-literal): Improve VectorLiteral dimension handling",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/expressions.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Refactor/Improvement
  - Files: M: viewer/pgvector/expressions.py
- **2025-05-02 (Commit `10a8e35` by David Ryan)**: feat(vector-lookup): Add dimension awareness to vector distance lookups
<!-- AI_DATA_START
    {
      "hash": "10a8e35e07bab8d37e732d491b6e02d2af82abe9",
      "short_message": "feat(vector-lookup): Add dimension awareness to vector distance lookups",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/lookups.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/pgvector/lookups.py
- **2025-05-02 (Commit `8807799` by David Ryan)**: fix(vector-literal): Store vector_value attribute in VectorLiteral initialization
<!-- AI_DATA_START
    {
      "hash": "880779959d2be86208249bc8038b98afabd1e692",
      "short_message": "fix(vector-literal): Store vector_value attribute in VectorLiteral initialization",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/expressions.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, BugFix
  - Files: M: viewer/pgvector/expressions.py
- **2025-05-02 (Commit `95d3e0d` by David Ryan)**: Update README_AI to reflect implementation of theory-and-planning/Dimension Issues Refactoring/DaFu May 1 Dimensions Refactoring.md.
<!-- AI_DATA_START
    {
      "hash": "95d3e0d9fe2059db5b48b5e115b3c377000ab02e",
      "short_message": "Update README_AI to reflect implementation of theory-and-planning/Dimension Issues Refactoring/DaFu May 1 Dimensions Refactoring.md.",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: README_AI.md
- **2025-05-02 (Commit `063c3b2` by David Ryan)**: refactor(dimensions): Revise dimension source priority in get_vector_dimensions
<!-- AI_DATA_START
    {
      "hash": "063c3b20e9f9fde1f94d7272e98bfab28ff53f84",
      "short_message": "refactor(dimensions): Revise dimension source priority in get_vector_dimensions",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement
  - Files: M: viewer/models.py
- **2025-05-02 (Commit `a0f17ac` by David Ryan)**: docs(README): Update PGVector integration status with dimension priority changes
<!-- AI_DATA_START
    {
      "hash": "a0f17ac6cc2de7669dbc8d54ea39deec361b5880",
      "short_message": "docs(README): Update PGVector integration status with dimension priority changes",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: README_AI.md
- **2025-05-02 (Commit `f872466` by David Ryan)**: feat(dimensions): Add diagnostic tool for vector dimension mismatch investigation
<!-- AI_DATA_START
    {
      "hash": "f872466e6b4b2e9edb96ef34414919e6bbfe486e",
      "short_message": "feat(dimensions): Add diagnostic tool for vector dimension mismatch investigation",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/test_dimension_fix.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: D: viewer/management/commands/test_dimension_fix.py
- **2025-05-02 (Commit `a30f2b8` by David Ryan)**: fix(dimensions): Update default dimensions in settings.py to match Ollama model
<!-- AI_DATA_START
    {
      "hash": "a30f2b8584f657bb80b28356278b4160cdf2453e",
      "short_message": "fix(dimensions): Update default dimensions in settings.py to match Ollama model",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer/settings.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: git_commit_viewer/settings.py
- **2025-05-02 (Commit `3dc0e93` by David Ryan)**: fix(dimensions): Enhance sync_vector_dimensions to attempt handling dimension changes
<!-- AI_DATA_START
    {
      "hash": "3dc0e935d7c69beb5529a7cec45e0eb6fdb2dd9e",
      "short_message": "fix(dimensions): Enhance sync_vector_dimensions to attempt handling dimension changes",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/sync_vector_dimensions.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/management/commands/sync_vector_dimensions.py
- **2025-05-02 (Commit `cbfd328` by David Ryan)**: feat(dimensions): Add embedding regeneration capability to sync_vector_dimensions command
<!-- AI_DATA_START
    {
      "hash": "cbfd32892e3f5475b247d79f8672a3a296fa015a",
      "short_message": "feat(dimensions): Add embedding regeneration capability to sync_vector_dimensions command",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/sync_vector_dimensions.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/management/commands/sync_vector_dimensions.py
- **2025-05-02 (Commit `5e9295c` by David Ryan)**: docs: Update management commands documentation with dimension-related tools
<!-- AI_DATA_START
    {
      "hash": "5e9295c6b4a1336ce8e84db4c094060d0a791a3b",
      "short_message": "docs: Update management commands documentation with dimension-related tools",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Git-Commit-Viewer-Management-Commands.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: documentation/Git-Commit-Viewer-Management-Commands.md
- **2025-05-02 (Commit `4a8ef2c` by David Ryan)**: docs: Update README_AI.md to reflect resolved dimension issues
<!-- AI_DATA_START
    {
      "hash": "4a8ef2c41b5fcd937f159826f4adf5de88f33ad7",
      "short_message": "docs: Update README_AI.md to reflect resolved dimension issues",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: README_AI.md
- **2025-05-02 (Commit `5e5ee4b` by David Ryan)**: Merge pull request #9 from davidorex/feature/dimension-mismatch-fix
<!-- AI_DATA_START
    {
      "hash": "5e5ee4b97f55ca3debe7f7fed0e839d61023896f",
      "short_message": "Merge pull request #9 from davidorex/feature/dimension-mismatch-fix",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "M"
        },
        {
          "path": "documentation/Git-Commit-Viewer-Management-Commands.md",
          "status": "M"
        },
        {
          "path": "git_commit_viewer/settings.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 1 Atomic Chunking Abstractions Possibilities.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Code Analysis Chunking.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Code Comments Model.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Django Chunking Implementation.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Fork Clone Model Ideas.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Language Agnostic Code Analysis.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Possible UI Buttons Left Column:Panel.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Swift and TypeScript Analysis.md",
          "status": "D"
        },
        {
          "path": "viewer/management/commands/sync_vector_dimensions.py",
          "status": "D"
        },
        {
          "path": "viewer/management/commands/test_dimension_fix.py",
          "status": "D"
        },
        {
          "path": "viewer/models.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/expressions.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/fields.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/lookups.py",
          "status": "M"
        },
        {
          "path": "viewer/services/embedder_registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature, BugFix
  - Files: M: README_AI.md, M: documentation/Git-Commit-Viewer-Management-Commands.md, M: git_commit_viewer/settings.py...
- **2025-05-02 (Commit `1526df8` by David Ryan)**: docs: Add comprehensive semantic tagging implementation plan
<!-- AI_DATA_START
    {
      "hash": "1526df84c3c5543873377b93093b2812b987013b",
      "short_message": "docs: Add comprehensive semantic tagging implementation plan",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Semantic_Tagging_Implementation_Plan.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Semantic Subsystem",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Semantic Subsystem, Feature
  - Files: D: theory-and-planning/Semantic_Tagging_Implementation_Plan.md
- **2025-05-02 (Commit `cb53758` by David Ryan)**: feat(semantic): Implement core Tag models and Commit integration
<!-- AI_DATA_START
    {
      "hash": "cb537585ea47e03f6115696a3420f37c419cfe6e",
      "short_message": "feat(semantic): Implement core Tag models and Commit integration",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Semantic Subsystem",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Semantic Subsystem, Feature
  - Files: M: viewer/models.py
- **2025-05-02 (Commit `6077370` by David Ryan)**: feat(db): Add migrations for Tag and CommitTag models
<!-- AI_DATA_START
    {
      "hash": "6077370c307271bd1fbd07fcfdaf8f1dc722fe04",
      "short_message": "feat(db): Add migrations for Tag and CommitTag models",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/migrations/0010_alter_commit_message_embedding_and_more.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/migrations/0010_alter_commit_message_embedding_and_more.py
- **2025-05-02 (Commit `79f2198` by David Ryan)**: feat(tags): Implement Tag Dictionary System
<!-- AI_DATA_START
    {
      "hash": "79f21981a93bb1e1a5de5221aae22a9a6d514201",
      "short_message": "feat(tags): Implement Tag Dictionary System",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        },
        {
          "path": "viewer/services/tag_normalization_service.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/models.py, D: viewer/services/tag_normalization_service.py
- **2025-05-02 (Commit `2e44fa3` by David Ryan)**: feat(db): Add migrations for Tag Dictionary System
<!-- AI_DATA_START
    {
      "hash": "2e44fa35fea3b5a7cc3dfe63dc61af2221c80450",
      "short_message": "feat(db): Add migrations for Tag Dictionary System",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Semantic_Tagging_Implementation_Plan.md",
          "status": "M"
        },
        {
          "path": "viewer/migrations/0011_tagdictionary_canonicaltag_alter_commit_tags_and_more.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: theory-and-planning/Semantic_Tagging_Implementation_Plan.md, D: viewer/migrations/0011_tagdictionary_canonicaltag_alter_commit_tags_and_more.py
- **2025-05-02 (Commit `606b517` by David Ryan)**: chore(deps): Add NLP dependencies for tag system
<!-- AI_DATA_START
    {
      "hash": "606b51721f7d3c5a155e2c0898d15df422ef9647",
      "short_message": "chore(deps): Add NLP dependencies for tag system",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "requirements.txt",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: requirements.txt
- **2025-05-02 (Commit `e048940` by David Ryan)**: feat(nlp): Implement NLP Service for tag extraction
<!-- AI_DATA_START
    {
      "hash": "e04894001c858223a560af9bec439c50109d1c49",
      "short_message": "feat(nlp): Implement NLP Service for tag extraction",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/nlp_service.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/services/nlp_service.py
- **2025-05-02 (Commit `1337c29` by David Ryan)**: feat(commands): Implement tag management commands
<!-- AI_DATA_START
    {
      "hash": "1337c292eb8447176a793fd102fad4385ac6c76f",
      "short_message": "feat(commands): Implement tag management commands",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Semantic_Tagging_Implementation_Plan.md",
          "status": "M"
        },
        {
          "path": "viewer/management/commands/generate_commit_tags.py",
          "status": "D"
        },
        {
          "path": "viewer/management/commands/manage_tag_dictionary.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: theory-and-planning/Semantic_Tagging_Implementation_Plan.md, D: viewer/management/commands/generate_commit_tags.py, D: viewer/management/commands/manage_tag_dictionary.py
- **2025-05-02 (Commit `a65e485` by David Ryan)**: feat(search): Implement semantic search with tag integration
<!-- AI_DATA_START
    {
      "hash": "a65e485711d78de21eb8432fc621e5a65d51fdd7",
      "short_message": "feat(search): Implement semantic search with tag integration",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/search_service.py",
          "status": "D"
        },
        {
          "path": "viewer/urls.py",
          "status": "M"
        },
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "Semantic Subsystem",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Semantic Subsystem, Feature
  - Files: D: viewer/services/search_service.py, M: viewer/urls.py, M: viewer/views.py
- **2025-05-02 (Commit `cb5da57` by David Ryan)**: docs: Add comprehensive tag system documentation
<!-- AI_DATA_START
    {
      "hash": "cb5da57821545e2221884775d93b2a5fd16cad18",
      "short_message": "docs: Add comprehensive tag system documentation",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "M"
        },
        {
          "path": "documentation/Git-Commit-Viewer-Management-Commands.md",
          "status": "M"
        },
        {
          "path": "documentation/Tag-System-README.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: M: README_AI.md, M: documentation/Git-Commit-Viewer-Management-Commands.md, D: documentation/Tag-System-README.md
- **2025-05-02 (Commit `6e3b8c3` by David Ryan)**: feat(commands): Enhance clear_data with tag system support
<!-- AI_DATA_START
    {
      "hash": "6e3b8c3be834372d2a8fa02c5ef7bd48f2da897b",
      "short_message": "feat(commands): Enhance clear_data with tag system support",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Git-Commit-Viewer-Management-Commands.md",
          "status": "M"
        },
        {
          "path": "viewer/management/commands/clear_data.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: documentation/Git-Commit-Viewer-Management-Commands.md, M: viewer/management/commands/clear_data.py
- **2025-05-02 (Commit `4df210b` by David Ryan)**: feat(admin): Register Tag System models in Django admin interface
<!-- AI_DATA_START
    {
      "hash": "4df210bb530f576a8152847708edb68706742db4",
      "short_message": "feat(admin): Register Tag System models in Django admin interface",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/admin.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/admin.py
- **2025-05-02 (Commit `7449003` by David Ryan)**: feat(commands): Add populate_tag_dictionaries management command
<!-- AI_DATA_START
    {
      "hash": "74490034cc93e2757be3d5290c95f8ea86ddc180",
      "short_message": "feat(commands): Add populate_tag_dictionaries management command",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/populate_tag_dictionaries.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/management/commands/populate_tag_dictionaries.py
- **2025-05-02 (Commit `d73844b` by David Ryan)**: refactor(commands): Optimize populate_tag_dictionaries command for performance and usability
<!-- AI_DATA_START
    {
      "hash": "d73844b35a25234092783e3aec45bee393cdbd84",
      "short_message": "refactor(commands): Optimize populate_tag_dictionaries command for performance and usability",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/populate_tag_dictionaries.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement
  - Files: M: viewer/management/commands/populate_tag_dictionaries.py
- **2025-05-02 (Commit `db6e6ef` by David Ryan)**: feat(tags): Add taxonomy JSON and import command
<!-- AI_DATA_START
    {
      "hash": "db6e6ef32ce3ee0c825753b53a79de5f2d1d4159",
      "short_message": "feat(tags): Add taxonomy JSON and import command",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/tag_taxonomy.json",
          "status": "D"
        },
        {
          "path": "viewer/management/commands/import_tag_taxonomy.py",
          "status": "D"
        },
        {
          "path": "viewer/management/commands/populate_tag_dictionaries.py",
          "status": "A"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: documentation/tag_taxonomy.json, D: viewer/management/commands/import_tag_taxonomy.py, A: viewer/management/commands/populate_tag_dictionaries.py
- **2025-05-02 (Commit `d551868` by David Ryan)**: fix(tags): Modify import_tag_taxonomy to attempt dictionary ID lookup
<!-- AI_DATA_START
    {
      "hash": "d551868f8017144b6a31954e63dcb3a6c3431d96",
      "short_message": "fix(tags): Modify import_tag_taxonomy to attempt dictionary ID lookup",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Tag-System-README.md",
          "status": "M"
        },
        {
          "path": "viewer/management/commands/import_tag_taxonomy.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: documentation/Tag-System-README.md, M: viewer/management/commands/import_tag_taxonomy.py
- **2025-05-02 (Commit `57ea18c` by David Ryan)**: fix(embeddings): Correct method name in TagNormalizationService
<!-- AI_DATA_START
    {
      "hash": "57ea18c8b27406d4e5d3e84b8da30da81a56caa7",
      "short_message": "fix(embeddings): Correct method name in TagNormalizationService",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/tag_normalization_service.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/services/tag_normalization_service.py
- **2025-05-02 (Commit `f4dd2a1` by David Ryan)**: fix(tags): Refine vector similarity filtering in tag normalization
<!-- AI_DATA_START
    {
      "hash": "f4dd2a1c5eece4e526e6b8d301d57b4e7c0bbaad",
      "short_message": "fix(tags): Refine vector similarity filtering in tag normalization",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/tag_normalization_service.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, BugFix
  - Files: M: viewer/services/tag_normalization_service.py
- **2025-05-02 (Commit `d5a517e` by David Ryan)**: fix(tags): Enhance tag generation with atomicity and filtering
<!-- AI_DATA_START
    {
      "hash": "d5a517eb279c1cd98db0848cd6efb04f947e8e52",
      "short_message": "fix(tags): Enhance tag generation with atomicity and filtering",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/tag_normalization_service.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/services/tag_normalization_service.py
- **2025-05-02 (Commit `c3a091b` by David Ryan)**: fix(tags): Add null check in Commit.add_tag method
<!-- AI_DATA_START
    {
      "hash": "c3a091b7a5bc4fab35bbeeafb1268fb3c1d4bd40",
      "short_message": "fix(tags): Add null check in Commit.add_tag method",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature, BugFix
  - Files: M: viewer/models.py
- **2025-05-02 (Commit `7a335c5` by David Ryan)**: docs: Add implementation plan for linguistic-aware tag extraction
<!-- AI_DATA_START
    {
      "hash": "7a335c5c17149699087c2fd596ea4ba76e4eedec",
      "short_message": "docs: Add implementation plan for linguistic-aware tag extraction",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Linguistic-Tag-Extraction-Implementation.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: D: documentation/Linguistic-Tag-Extraction-Implementation.md
- **2025-05-02 (Commit `baa3179` by David Ryan)**: docs: Design unified linguistic interface across system components
<!-- AI_DATA_START
    {
      "hash": "baa31799b89defb0892e8742e8c703070e60d603",
      "short_message": "docs: Design unified linguistic interface across system components",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Unified-Linguistic-Interface.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: documentation/Unified-Linguistic-Interface.md
- **2025-05-02 (Commit `af75052` by David Ryan)**: add 2 docs on Linguistic Interface
<!-- AI_DATA_START
    {
      "hash": "af750520fb1c494d9675f0ed0f45b2b4911f191f",
      "short_message": "add 2 docs on Linguistic Interface",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Linguistic-Tag-Extraction-Implementation.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 2 Abstracted LinguisticProcessor.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: R: documentation/Linguistic-Tag-Extraction-Implementation.md, D: theory-and-planning/May 2 Abstracted LinguisticProcessor.md
- **2025-05-02 (Commit `a3abd6b` by David Ryan)**: docs: move planning ideas to correct dir
<!-- AI_DATA_START
    {
      "hash": "a3abd6bfb820a20f779d2bee6c05d0c643089965",
      "short_message": "docs: move planning ideas to correct dir",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "documentation/Git-Commit-Viewer-Management-Commands.md",
          "status": "R"
        },
        {
          "path": "documentation/Unified-Linguistic-Interface.md",
          "status": "R"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: R: documentation/Git-Commit-Viewer-Management-Commands.md, R: documentation/Unified-Linguistic-Interface.md
- **2025-05-02 (Commit `c097215` by David Ryan)**: fix(app-init): Replace direct DB access with post_migrate signal
<!-- AI_DATA_START
    {
      "hash": "c09721579bd99d1a2acb3ac8924f93fc7d50b45b",
      "short_message": "fix(app-init): Replace direct DB access with post_migrate signal",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/apps.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/apps.py
- **2025-05-02 (Commit `25ea94c` by David Ryan)**: Merge pull request #10 from davidorex/feature/use-post-migrate
<!-- AI_DATA_START
    {
      "hash": "25ea94c80d3c648af5991fdfce24b588e1a1ee0e",
      "short_message": "Merge pull request #10 from davidorex/feature/use-post-migrate",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/apps.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/apps.py
- **2025-05-02 (Commit `6329c2f` by David Ryan)**: linguistic processor ideas
<!-- AI_DATA_START
    {
      "hash": "6329c2ff1223ec30b49e200507a8b86f117eace9",
      "short_message": "linguistic processor ideas",
      "author": "David Ryan",
      "date_iso": "2025-05-02",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 1 Fork Clone Model Ideas.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 2 LinguisticProcessor Interface.md",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: R: theory-and-planning/May 1 Fork Clone Model Ideas.md, D: theory-and-planning/May 2 LinguisticProcessor Interface.md
- **2025-05-01 (Commit `3d7906c` by David Ryan)**: docs: Add comprehensive project README
<!-- AI_DATA_START
    {
      "hash": "3d7906c9d33a024d953542f3a338d55c119b8fcc",
      "short_message": "docs: Add comprehensive project README",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 1 7-42-am diary.MD",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: M: README.md, D: theory-and-planning/May 1 7-42-am diary.MD
- **2025-05-01 (Commit `e46faaf` by David Ryan)**: Merge pull request #6 from davidorex/feature/repository-service-module
<!-- AI_DATA_START
    {
      "hash": "e46faaf2f7f44ea2185e8596e7990905beb4ea87",
      "short_message": "Merge pull request #6 from davidorex/feature/repository-service-module",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "Git-Commit-Viewer-Management-Commands.md",
          "status": "D"
        },
        {
          "path": "README.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/May 1 7-42-am diary.MD",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Abstract Embedding Configuration Model.md",
          "status": "D"
        },
        {
          "path": "viewer/management/commands/populate_self.py",
          "status": "D"
        },
        {
          "path": "viewer/services/repository_processor.py",
          "status": "D"
        },
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: Git-Commit-Viewer-Management-Commands.md, M: README.md, D: theory-and-planning/May 1 7-42-am diary.MD...
- **2025-05-01 (Commit `020b9c6` by David Ryan)**: future-looking ideas to eventually roadmap.
<!-- AI_DATA_START
    {
      "hash": "020b9c66575d7853effd03c17e1b4e6f8edd6abe",
      "short_message": "future-looking ideas to eventually roadmap.",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/implementation-possibilities.md",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: theory-and-planning/implementation-possibilities.md
- **2025-05-01 (Commit `3463ab4` by David Ryan)**: feat(embeddings): Add EmbeddingProvider and EmbeddingConfiguration models
<!-- AI_DATA_START
    {
      "hash": "3463ab4109d0095342c503330f8969aa8113f0bc",
      "short_message": "feat(embeddings): Add EmbeddingProvider and EmbeddingConfiguration models",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/models.py
- **2025-05-01 (Commit `3ad001c` by David Ryan)**: feat(embeddings): Create EmbedderRegistry service for dynamic provider management
<!-- AI_DATA_START
    {
      "hash": "3ad001c49360e37b2b550ded5eadf7bb4328ec6a",
      "short_message": "feat(embeddings): Create EmbedderRegistry service for dynamic provider management",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/embedder_registry.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/services/embedder_registry.py
- **2025-05-01 (Commit `f51e902` by David Ryan)**: feat(embeddings): Implement provider discovery mechanism in AppConfig
<!-- AI_DATA_START
    {
      "hash": "f51e90246925808da9c513009625485b03da04d5",
      "short_message": "feat(embeddings): Implement provider discovery mechanism in AppConfig",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/apps.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/apps.py
- **2025-05-01 (Commit `d34d7fe` by David Ryan)**: feat(embeddings): Update embedders with configuration-based instantiation
<!-- AI_DATA_START
    {
      "hash": "d34d7feddf1ad2fff349153fa5e4e0934d0fb00a",
      "short_message": "feat(embeddings): Update embedders with configuration-based instantiation",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/embedders.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/services/embedders.py
- **2025-05-01 (Commit `4bcb1f6` by David Ryan)**: feat(admin): Complete admin registration for embedding configuration models (Task 1)
<!-- AI_DATA_START
    {
      "hash": "4bcb1f68cd6e89470b5535aff1fd35098de39593",
      "short_message": "feat(admin): Complete admin registration for embedding configuration models (Task 1)",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/admin.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/admin.py
- **2025-05-01 (Commit `827114e` by David Ryan)**: feat(management): Update embedding commands to use configuration system (Task 2)
<!-- AI_DATA_START
    {
      "hash": "827114e2818fd137e0b75684761893d902ba8e8c",
      "short_message": "feat(management): Update embedding commands to use configuration system (Task 2)",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/generate_embeddings.py",
          "status": "M"
        },
        {
          "path": "viewer/management/commands/semantic_search.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/management/commands/generate_embeddings.py, M: viewer/management/commands/semantic_search.py
- **2025-05-01 (Commit `3e71fcb` by David Ryan)**: feat(models): Start dynamic vector field dimensions implementation (Task 3)
<!-- AI_DATA_START
    {
      "hash": "3e71fcb6b5bd6dd7fb1a036c29ede1447af5e690",
      "short_message": "feat(models): Start dynamic vector field dimensions implementation (Task 3)",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/models.py
- **2025-05-01 (Commit `f9112b0` by David Ryan)**: feat(models): Complete Vector Field Dimensions implementation (Task 3)
<!-- AI_DATA_START
    {
      "hash": "f9112b018968a1b69623023835695b2307d2eaf6",
      "short_message": "feat(models): Complete Vector Field Dimensions implementation (Task 3)",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/models.py
- **2025-05-01 (Commit `3c24e5c` by David Ryan)**: chore(migrations): Temporarily disable provider discovery during app initialization
<!-- AI_DATA_START
    {
      "hash": "3c24e5c4f41c281c4719daafe79fd8b3969034bf",
      "short_message": "chore(migrations): Temporarily disable provider discovery during app initialization",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/apps.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/apps.py
- **2025-05-01 (Commit `6d10ffe` by David Ryan)**: feat(migrations): Create migrations for embedding configuration system (Task 4)
<!-- AI_DATA_START
    {
      "hash": "6d10ffe97fc8bdc22b30be79c703d923135c84df",
      "short_message": "feat(migrations): Create migrations for embedding configuration system (Task 4)",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/migrations/0009_embeddingprovider_alter_branch_options_and_more.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: D: viewer/migrations/0009_embeddingprovider_alter_branch_options_and_more.py
- **2025-05-01 (Commit `c0ac220` by David Ryan)**: feat(migrations): Restore provider discovery functionality (Task 4)
<!-- AI_DATA_START
    {
      "hash": "c0ac22001da72ff251747e34be3af29ca56ecc36",
      "short_message": "feat(migrations): Restore provider discovery functionality (Task 4)",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/apps.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/apps.py
- **2025-05-01 (Commit `98ced4e` by David Ryan)**: feat(migrations): Improve provider discovery with migration-aware checks (Task 4)
<!-- AI_DATA_START
    {
      "hash": "98ced4e056c4b89a3a9e282ef7b05d9c4bb3d35b",
      "short_message": "feat(migrations): Improve provider discovery with migration-aware checks (Task 4)",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/apps.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement, Feature
  - Files: M: viewer/apps.py
- **2025-05-01 (Commit `be216e4` by David Ryan)**: feat(embeddings): Add OllamaEmbedder implementation for local embedding models
<!-- AI_DATA_START
    {
      "hash": "be216e45d023b4dc56f0a2d9a9b29931bfbf2408",
      "short_message": "feat(embeddings): Add OllamaEmbedder implementation for local embedding models",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/embedders.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/services/embedders.py
- **2025-05-01 (Commit `b75edef` by David Ryan)**: fix(embeddings): Remove duplicate function declaration in embedders.py
<!-- AI_DATA_START
    {
      "hash": "b75edefc99bda3ec3d59450ba369fefc3d1e9bbe",
      "short_message": "fix(embeddings): Remove duplicate function declaration in embedders.py",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/embedders.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/services/embedders.py
- **2025-05-01 (Commit `e00eeae` by David Ryan)**: docs: Add comprehensive embedding configuration system documentation
<!-- AI_DATA_START
    {
      "hash": "e00eeae83114590d3250fc94ebbc8a0d4ab36e90",
      "short_message": "docs: Add comprehensive embedding configuration system documentation",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/April-30-git-commit-viewer-files-list.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Embedding-Configuration-System.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Feature
  - Files: M: README.md, M: theory-and-planning/April-30-git-commit-viewer-files-list.md, D: theory-and-planning/Embedding-Configuration-System.md
- **2025-05-01 (Commit `4ffa1be` by David Ryan)**: Merge pull request #7 from davidorex/feature/embedding-configuration-model
<!-- AI_DATA_START
    {
      "hash": "4ffa1be71b94b6aab2cbffd67ed92d10b3a8aa6b",
      "short_message": "Merge pull request #7 from davidorex/feature/embedding-configuration-model",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/April-30-git-commit-viewer-files-list.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/Embedding-Configuration-System.md",
          "status": "D"
        },
        {
          "path": "viewer/admin.py",
          "status": "M"
        },
        {
          "path": "viewer/apps.py",
          "status": "M"
        },
        {
          "path": "viewer/management/commands/generate_embeddings.py",
          "status": "M"
        },
        {
          "path": "viewer/management/commands/semantic_search.py",
          "status": "M"
        },
        {
          "path": "viewer/migrations/0009_embeddingprovider_alter_branch_options_and_more.py",
          "status": "D"
        },
        {
          "path": "viewer/models.py",
          "status": "M"
        },
        {
          "path": "viewer/services/embedder_registry.py",
          "status": "D"
        },
        {
          "path": "viewer/services/embedders.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: README.md, M: theory-and-planning/April-30-git-commit-viewer-files-list.md, D: theory-and-planning/Embedding-Configuration-System.md...
- **2025-05-01 (Commit `79f527a` by David Ryan)**: docs(vector-lookup): Create implementation plan for vector distance lookup fix
<!-- AI_DATA_START
    {
      "hash": "79f527aa4d1050e01e9ebb34d5e6bfb896d6f099",
      "short_message": "docs(vector-lookup): Create implementation plan for vector distance lookup fix",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Vector-Distance-Lookup-Implementation-Plan.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, BugFix
  - Files: D: theory-and-planning/Vector-Distance-Lookup-Implementation-Plan.md
- **2025-05-01 (Commit `8c09de4` by David Ryan)**: fix(pgvector): Enhance vector distance lookups for field references
<!-- AI_DATA_START
    {
      "hash": "8c09de4dd02b2bbfcdd1e53a1ca2e96c08e8bd1f",
      "short_message": "fix(pgvector): Enhance vector distance lookups for field references",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/lookups.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, BugFix
  - Files: M: viewer/pgvector/lookups.py
- **2025-05-01 (Commit `cf2b991` by David Ryan)**: fix(pgvector): Update vector literal formatting for PostgreSQL
<!-- AI_DATA_START
    {
      "hash": "cf2b9910b5c3760bcac7d1c58a16ff25935fbfbd",
      "short_message": "fix(pgvector): Update vector literal formatting for PostgreSQL",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/lookups.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, BugFix
  - Files: M: viewer/pgvector/lookups.py
- **2025-05-01 (Commit `a5456c5` by David Ryan)**: feat(pgvector): Add VectorLiteral expression for annotation contexts
<!-- AI_DATA_START
    {
      "hash": "a5456c5a4b01be4a9b3e4c2148e97d34b3ac4090",
      "short_message": "feat(pgvector): Add VectorLiteral expression for annotation contexts",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/__init__.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/expressions.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/pgvector/__init__.py, D: viewer/pgvector/expressions.py
- **2025-05-01 (Commit `bb76b59` by David Ryan)**: fix for expressions.py that safely renders a vector literal for PostgreSQL using proper ::vector casting. This avoids misinterpretation by the Django ORM, which might treat string-like values as field references if not explicitly overridden via as_sql().
<!-- AI_DATA_START
    {
      "hash": "bb76b59c7a5f8771b2d334b0d5af81c421af351d",
      "short_message": "fix for expressions.py that safely renders a vector literal for PostgreSQL using proper ::vector casting. This avoids misinterpretation by the Django ORM, which might treat string-like values as field references if not explicitly overridden via as_sql().",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/expressions.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, BugFix
  - Files: M: viewer/pgvector/expressions.py
- **2025-05-01 (Commit `c0d4002` by David Ryan)**: Comprehensive future-looking implementation possiblities.
<!-- AI_DATA_START
    {
      "hash": "c0d400281cd79f5dfe0a93057db680e4eab62fc9",
      "short_message": "Comprehensive future-looking implementation possiblities.",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 1 implementation-possibilities.md",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: theory-and-planning/May 1 implementation-possibilities.md
- **2025-05-01 (Commit `c94e0c4` by David Ryan)**: fix(embeddings): Update EmbedderRegistry to sync config dimensions with embedder output
<!-- AI_DATA_START
    {
      "hash": "c94e0c464c1d053f05c51b964c016fee090684b2",
      "short_message": "fix(embeddings): Update EmbedderRegistry to sync config dimensions with embedder output",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/embedder_registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/services/embedder_registry.py
- **2025-05-01 (Commit `5fcf792` by David Ryan)**: feat(embeddings): Add dimension consistency to BaseEmbedder and OllamaEmbedder
<!-- AI_DATA_START
    {
      "hash": "5fcf7925a6dc85f30a6a9e6ff8363e81090c00d8",
      "short_message": "feat(embeddings): Add dimension consistency to BaseEmbedder and OllamaEmbedder",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/embedders.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/services/embedders.py
- **2025-05-01 (Commit `42d8a8b` by David Ryan)**: refactor(embeddings): Replace hardcoded dimension values with get_vector_dimensions() in provider configuration.
<!-- AI_DATA_START
    {
      "hash": "42d8a8b68ea701b7ef7724072e020dda5ee1a312",
      "short_message": "refactor(embeddings): Replace hardcoded dimension values with get_vector_dimensions() in provider configuration.",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/apps.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/expressions.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement
  - Files: M: viewer/apps.py, M: viewer/pgvector/expressions.py
- **2025-05-01 (Commit `6e1c54d` by David Ryan)**: fix(embeddings): Correct indentation in EmbedderRegistry.create_embedder method
<!-- AI_DATA_START
    {
      "hash": "6e1c54d2e534db0ee9d4ae753c21fcf823a938fe",
      "short_message": "fix(embeddings): Correct indentation in EmbedderRegistry.create_embedder method",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/embedder_registry.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/services/embedder_registry.py
- **2025-05-01 (Commit `d9fc58d` by David Ryan)**: docs: 2 proposed plans for fixing dimension mis-match issues in Dimension Issues Refactoring dir, and create docs dir with proper documentation files as separate from theory and planning docs.
<!-- AI_DATA_START
    {
      "hash": "d9fc58d494c315749cc64f0625770f8141d16891",
      "short_message": "docs: 2 proposed plans for fixing dimension mis-match issues in Dimension Issues Refactoring dir, and create docs dir with proper documentation files as separate from theory and planning docs.",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "Git-Commit-Viewer-Management-Commands.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/April 30 Next Steps for generating embeddings.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/April-30-git-commit-viewer-files-list.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Dimension Issues Refactoring/Cline May 1 Embedding_Dimension_Refactoring_Plan.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Dimension Issues Refactoring/DaFu May 1 Dimensions Refactoring.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Embedding-Configuration-System.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Update Repository command.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Vector-Distance-Lookup-Implementation-Plan.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/implementation-possibilities.md",
          "status": "A"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: R: Git-Commit-Viewer-Management-Commands.md, A: theory-and-planning/April 30 Next Steps for generating embeddings.md, R: theory-and-planning/April-30-git-commit-viewer-files-list.md...
- **2025-05-01 (Commit `94c547d` by David Ryan)**: Merge pull request #8 from davidorex/feature/vector-distance-lookup-fix
<!-- AI_DATA_START
    {
      "hash": "94c547d51548927b51246141a0942ed847a74996",
      "short_message": "Merge pull request #8 from davidorex/feature/vector-distance-lookup-fix",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "Git-Commit-Viewer-Management-Commands.md",
          "status": "R"
        },
        {
          "path": "viewer/apps.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/April 30 Next Steps for generating embeddings.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/April-30-git-commit-viewer-files-list.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Dimension Issues Refactoring/Cline May 1 Embedding_Dimension_Refactoring_Plan.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Dimension Issues Refactoring/DaFu May 1 Dimensions Refactoring.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/Embedding-Configuration-System.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/May 1 Update Repository command.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Vector-Distance-Lookup-Implementation-Plan.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/implementation-possibilities.md",
          "status": "R"
        },
        {
          "path": "viewer/pgvector/__init__.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/expressions.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/lookups.py",
          "status": "M"
        },
        {
          "path": "viewer/services/embedder_registry.py",
          "status": "M"
        },
        {
          "path": "viewer/services/embedders.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature, BugFix
  - Files: R: Git-Commit-Viewer-Management-Commands.md, M: viewer/apps.py, A: theory-and-planning/April 30 Next Steps for generating embeddings.md...
- **2025-05-01 (Commit `6e3cb9f` by David Ryan)**: envsion abstract chunking interface along with composible atomic chunking strategy objects
<!-- AI_DATA_START
    {
      "hash": "6e3cb9f7a96032a88204f5ed0f2763117c9754dc",
      "short_message": "envsion abstract chunking interface along with composible atomic chunking strategy objects",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 1 Atomic Chunking Abstractions Possibilities.md",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: theory-and-planning/May 1 Atomic Chunking Abstractions Possibilities.md
- **2025-05-01 (Commit `6e2d546` by David Ryan)**: additional django specific proposal for atomic chunking chain system.
<!-- AI_DATA_START
    {
      "hash": "6e2d54651563d497c32d91117090f640f04fd8ec",
      "short_message": "additional django specific proposal for atomic chunking chain system.",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 1 Django Chunking Implementation.md",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: theory-and-planning/May 1 Django Chunking Implementation.md
- **2025-05-01 (Commit `f3e66e5` by David Ryan)**: further future planning ideas and proposals to evaluate.
<!-- AI_DATA_START
    {
      "hash": "f3e66e5e8396afcb2a0f7ee55fe8a38b33c45625",
      "short_message": "further future planning ideas and proposals to evaluate.",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 1 Code Analysis Chunking.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Fork Clone Model Ideas.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Language Agnostic Code Analysis.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Swift and TypeScript Analysis.md",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: theory-and-planning/May 1 Code Analysis Chunking.md, D: theory-and-planning/May 1 Fork Clone Model Ideas.md, D: theory-and-planning/May 1 Language Agnostic Code Analysis.md...
- **2025-05-01 (Commit `3eb3bdd` by David Ryan)**: future looking planning docs
<!-- AI_DATA_START
    {
      "hash": "3eb3bdd48559f3c7ba37d046b72de71051a09bde",
      "short_message": "future looking planning docs",
      "author": "David Ryan",
      "date_iso": "2025-05-01",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 1 Code Comments Model.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Possible UI Buttons Left Column:Panel.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: theory-and-planning/May 1 Code Comments Model.md, D: theory-and-planning/May 1 Possible UI Buttons Left Column:Panel.md
- **2025-04-30 (Commit `e81ca49` by David Ryan)**: refactor(admin): add FileChange to admin UI and improve model names
<!-- AI_DATA_START
    {
      "hash": "e81ca492ed94252eaf16bedda42970a3de4b325a",
      "short_message": "refactor(admin): add FileChange to admin UI and improve model names",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/admin.py",
          "status": "M"
        },
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "UI/Frontend",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: UI/Frontend, Refactor/Improvement, Feature
  - Files: M: viewer/admin.py, M: viewer/models.py
- **2025-04-30 (Commit `ad3c287` by David Ryan)**: Merge pull request #5 from davidorex/feature/pgvector-app
<!-- AI_DATA_START
    {
      "hash": "ad3c28737d03fa761f9cf90ad39a16ba4ef05b37",
      "short_message": "Merge pull request #5 from davidorex/feature/pgvector-app",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "M"
        },
        {
          "path": "April 30 Comprehensively Refactor Git Status to impose no assumptions.md",
          "status": "D"
        },
        {
          "path": "git_commit_viewer/settings.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "M"
        },
        {
          "path": "viewer/admin.py",
          "status": "M"
        },
        {
          "path": "viewer/migrations/0006_install_pgvector.py",
          "status": "D"
        },
        {
          "path": "viewer/migrations/0007_commitmessagechunk_diffchunk_commit_author_email_and_more.py",
          "status": "D"
        },
        {
          "path": "viewer/migrations/0008_remove_filechange_viewer_file_path_74026f_idx_and_more.py",
          "status": "D"
        },
        {
          "path": "viewer/models.py",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/apps.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/fields.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/indexes.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/lookups.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/management/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/management/commands/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/management/commands/install_pgvector.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/tests/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/tests/test_fields.py",
          "status": "D"
        },
        {
          "path": "viewer/templates/viewer/base.html",
          "status": "M"
        },
        {
          "path": "viewer/templates/viewer/commit_detail.html",
          "status": "M"
        },
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: README_AI.md, D: April 30 Comprehensively Refactor Git Status to impose no assumptions.md, M: git_commit_viewer/settings.py...
- **2025-04-30 (Commit `d799343` by David Ryan)**: Notes and thoughts for pgvector work.
<!-- AI_DATA_START
    {
      "hash": "d7993431d4b445c24b7df56d7bcdd928f65d1332",
      "short_message": "Notes and thoughts for pgvector work.",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "April 30 Comprehensively Refactor Git Status to impose no assumptions.md",
          "status": "R"
        },
        {
          "path": "April 30 Status Notes and Thoughts.md",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: R: April 30 Comprehensively Refactor Git Status to impose no assumptions.md, D: April 30 Status Notes and Thoughts.md
- **2025-04-30 (Commit `0359b24` by David Ryan)**: docs(embedding): document embedding model abstraction possibilities for PGVector integration
<!-- AI_DATA_START
    {
      "hash": "0359b240971fe7b746a10daca91a983ea4b672cf",
      "short_message": "docs(embedding): document embedding model abstraction possibilities for PGVector integration",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "April 30 Embed Model Abstractions Possibilities.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation
  - Files: D: April 30 Embed Model Abstractions Possibilities.md
- **2025-04-30 (Commit `7040e00` by David Ryan)**: feat(embeddings): update OpenAIEmbedder to use text-embedding-3-large by default
<!-- AI_DATA_START
    {
      "hash": "7040e00478a498855114bd42e19695eb388f9e35",
      "short_message": "feat(embeddings): update OpenAIEmbedder to use text-embedding-3-large by default",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "April 30 Status Notes and Thoughts.md",
          "status": "M"
        },
        {
          "path": "viewer/services/embedders.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: April 30 Status Notes and Thoughts.md, M: viewer/services/embedders.py
- **2025-04-30 (Commit `9c50801` by David Ryan)**: move docs
<!-- AI_DATA_START
    {
      "hash": "9c5080105023d77041348c2fbe8e7fd21e8dc545",
      "short_message": "move docs",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "April 30 Embed Model Abstractions Possibilities.md",
          "status": "R"
        },
        {
          "path": "April 30 Status Notes and Thoughts.md",
          "status": "R"
        },
        {
          "path": "theory-and-planning/Second-Stage Refactoring- Structured Semantic Automation Layer.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: R: April 30 Embed Model Abstractions Possibilities.md, R: April 30 Status Notes and Thoughts.md, M: theory-and-planning/Second-Stage Refactoring- Structured Semantic Automation Layer.md
- **2025-04-30 (Commit `f8bfcaf` by David Ryan)**: add possible next steps doc to evaluate
<!-- AI_DATA_START
    {
      "hash": "f8bfcafd6f2e690f092fed2f922e5bd6af4b8659",
      "short_message": "add possible next steps doc to evaluate",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 30 Next Steps for generating embeddings.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: D: theory-and-planning/April 30 Next Steps for generating embeddings.md
- **2025-04-30 (Commit `3a26ec7` by David Ryan)**: edit to April 30 next steps.
<!-- AI_DATA_START
    {
      "hash": "3a26ec7706af01fefa25b88152426c5091d3f9e8",
      "short_message": "edit to April 30 next steps.",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer_analysis.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md",
          "status": "A"
        },
        {
          "path": "theory-and-planning/April 30 Next Steps for generating embeddings.md",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: A: git_commit_viewer_analysis.md, A: theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md, M: theory-and-planning/April 30 Next Steps for generating embeddings.md
- **2025-04-30 (Commit `84bca8e` by David Ryan)**: docs: Create comprehensive file structure analysis document for Git Commit Viewer
<!-- AI_DATA_START
    {
      "hash": "84bca8e98b43c5adf2b929aa6f92e5819089c4bb",
      "short_message": "docs: Create comprehensive file structure analysis document for Git Commit Viewer",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April-30-git-commit-viewer-files-list.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: theory-and-planning/April-30-git-commit-viewer-files-list.md
- **2025-04-30 (Commit `551a2fe` by David Ryan)**: fix(semantic-search): Use direct git_status field instead of non-existent display method
<!-- AI_DATA_START
    {
      "hash": "551a2fef442d30984219ccab87f7144eee38fb25",
      "short_message": "fix(semantic-search): Use direct git_status field instead of non-existent display method",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 30 Next Steps for generating embeddings.md",
          "status": "M"
        }
      ],
      "themes": [
        "Semantic Subsystem",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Semantic Subsystem, BugFix
  - Files: M: theory-and-planning/April 30 Next Steps for generating embeddings.md
- **2025-04-30 (Commit `f2c8d7c` by David Ryan)**: added theory-and-planning/april-30-ground-truth-test-file.yaml to gitignore in prep for semantic evaluation suite
<!-- AI_DATA_START
    {
      "hash": "f2c8d7cabfb66fa74182096b26be0592c834a82d",
      "short_message": "added theory-and-planning/april-30-ground-truth-test-file.yaml to gitignore in prep for semantic evaluation suite",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": ".gitignore",
          "status": "M"
        }
      ],
      "themes": [
        "Semantic Subsystem",
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Semantic Subsystem, Testing, Feature
  - Files: M: .gitignore
- **2025-04-30 (Commit `32a7961` by David Ryan)**: chore(evaluation): update .gitignore for semantic evaluation suite
<!-- AI_DATA_START
    {
      "hash": "32a79619dfe6d598ba98b1a8c751d8d971b4649e",
      "short_message": "chore(evaluation): update .gitignore for semantic evaluation suite",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": ".gitignore",
          "status": "M"
        }
      ],
      "themes": [
        "Semantic Subsystem"
      ]
    }
  AI_DATA_END -->
  - Themes: Semantic Subsystem
  - Files: M: .gitignore
- **2025-04-30 (Commit `4ee84bb` by David Ryan)**: feat(semantic-search): Implement embedding management commands
<!-- AI_DATA_START
    {
      "hash": "4ee84bb4b7db426a994e0b31382f18810162fc37",
      "short_message": "feat(semantic-search): Implement embedding management commands",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/generate_embeddings.py",
          "status": "D"
        },
        {
          "path": "viewer/management/commands/semantic_search.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Semantic Subsystem",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Semantic Subsystem, Feature
  - Files: D: viewer/management/commands/generate_embeddings.py, D: viewer/management/commands/semantic_search.py
- **2025-04-30 (Commit `9b0dd9b` by David Ryan)**: refactor(semantic-search): Optimize management commands for AI context efficiency
<!-- AI_DATA_START
    {
      "hash": "9b0dd9b3c74322c155dc396acef367d7c283bc3d",
      "short_message": "refactor(semantic-search): Optimize management commands for AI context efficiency",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/generate_embeddings.py",
          "status": "M"
        },
        {
          "path": "viewer/management/commands/semantic_search.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement",
        "Semantic Subsystem"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement, Semantic Subsystem
  - Files: M: viewer/management/commands/generate_embeddings.py, M: viewer/management/commands/semantic_search.py
- **2025-04-30 (Commit `281295a` by David Ryan)**: chore(config): Add OpenAI API key to settings.py
<!-- AI_DATA_START
    {
      "hash": "281295a1e67861584f742b5d8bdb9b0a59d163cc",
      "short_message": "chore(config): Add OpenAI API key to settings.py",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer/settings.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: git_commit_viewer/settings.py
- **2025-04-30 (Commit `0118955` by David Ryan)**: docs: Update file list to reflect implemented management commands
<!-- AI_DATA_START
    {
      "hash": "0118955724448a0f12c52a90e54d93389eed33c1",
      "short_message": "docs: Update file list to reflect implemented management commands",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April-30-git-commit-viewer-files-list.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: M: theory-and-planning/April-30-git-commit-viewer-files-list.md
- **2025-04-30 (Commit `8eb828b` by David Ryan)**: add .env to gitignore
<!-- AI_DATA_START
    {
      "hash": "8eb828b24ca3b022e9195d8dd8cd0858024757c7",
      "short_message": "add .env to gitignore",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": ".gitignore",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: .gitignore
- **2025-04-30 (Commit `0eb3c1d` by David Ryan)**: refactor: Move OpenAI API key to .env file
<!-- AI_DATA_START
    {
      "hash": "0eb3c1d80f0418b197c391b8a2dca85c63b35051",
      "short_message": "refactor: Move OpenAI API key to .env file",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": ".gitignore",
          "status": "M"
        },
        {
          "path": "git_commit_viewer/settings.py",
          "status": "M"
        },
        {
          "path": "requirements.txt",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement
  - Files: M: .gitignore, M: git_commit_viewer/settings.py, M: requirements.txt
- **2025-04-30 (Commit `dc88b6b` by David Ryan)**: docs: Update file documentation to reflect dotenv integration
<!-- AI_DATA_START
    {
      "hash": "dc88b6bec4f40ae9e8e7989e2926843539d937ba",
      "short_message": "docs: Update file documentation to reflect dotenv integration",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April-30-git-commit-viewer-files-list.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: theory-and-planning/April-30-git-commit-viewer-files-list.md
- **2025-04-30 (Commit `2192468` by David Ryan)**: fix(embeddings): Update OpenAIEmbedder for OpenAI API v1.x compatibility
<!-- AI_DATA_START
    {
      "hash": "219246858962ee72d2b717651d091fe66bc5de36",
      "short_message": "fix(embeddings): Update OpenAIEmbedder for OpenAI API v1.x compatibility",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April-30-git-commit-viewer-files-list.md",
          "status": "M"
        },
        {
          "path": "viewer/services/embedders.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: theory-and-planning/April-30-git-commit-viewer-files-list.md, M: viewer/services/embedders.py
- **2025-04-30 (Commit `77a0f18` by David Ryan)**: feat(management): Add clear_data command for development cleanup
<!-- AI_DATA_START
    {
      "hash": "77a0f18233d0c5ae97724ae1298018ea249dc2c1",
      "short_message": "feat(management): Add clear_data command for development cleanup",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/clear_data.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/management/commands/clear_data.py
- **2025-04-30 (Commit `b22f858` by David Ryan)**: enhance(management): Improve clear_data command with precise embedding metrics
<!-- AI_DATA_START
    {
      "hash": "b22f858859d28733e6dec4180c81cab19142bd22",
      "short_message": "enhance(management): Improve clear_data command with precise embedding metrics",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/clear_data.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Refactor/Improvement
  - Files: M: viewer/management/commands/clear_data.py
- **2025-04-30 (Commit `e957269` by David Ryan)**: docs: Update file list with clear_data management command
<!-- AI_DATA_START
    {
      "hash": "e9572699b9bd55bdeaedd7aedf8d26b660363871",
      "short_message": "docs: Update file list with clear_data management command",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April-30-git-commit-viewer-files-list.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: theory-and-planning/April-30-git-commit-viewer-files-list.md
- **2025-04-30 (Commit `5a09c0f` by David Ryan)**: feat(management): Add add_self.py command for development environment setup
<!-- AI_DATA_START
    {
      "hash": "5a09c0f7c218b6c30e61c40ebe7f973a4c9549c3",
      "short_message": "feat(management): Add add_self.py command for development environment setup",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April-30-git-commit-viewer-files-list.md",
          "status": "M"
        },
        {
          "path": "viewer/management/commands/add_self.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: theory-and-planning/April-30-git-commit-viewer-files-list.md, D: viewer/management/commands/add_self.py
- **2025-04-30 (Commit `dee56d6` by David Ryan)**: future looking prompt-composition-pipeline.
<!-- AI_DATA_START
    {
      "hash": "dee56d68f4e1f898b7f0ee40c7625b0a7c19616d",
      "short_message": "future looking prompt-composition-pipeline.",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April-30-custom-prompt-composition-pipeline.md",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: theory-and-planning/April-30-custom-prompt-composition-pipeline.md
- **2025-04-30 (Commit `02203a3` by David Ryan)**: fix RuntimeWarning: DateTimeField Repository.last_fetched received a naive datetime (2025-04-30 21:19:46.467164) while time zone support is active error raised by add_self.py
<!-- AI_DATA_START
    {
      "hash": "02203a3a81b64be3477250d5978681a67f38a10c",
      "short_message": "fix RuntimeWarning: DateTimeField Repository.last_fetched received a naive datetime (2025-04-30 21:19:46.467164) while time zone support is active error raised by add_self.py",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/add_self.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/management/commands/add_self.py
- **2025-04-30 (Commit `a3da5cd` by David Ryan)**: add doc on possible prompt pipeline composition.
<!-- AI_DATA_START
    {
      "hash": "a3da5cdfe914aa7865af1a983856e82790ed7cc4",
      "short_message": "add doc on possible prompt pipeline composition.",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April-30-Git-Commit-Viewer-Cline-Musings.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: D: theory-and-planning/April-30-Git-Commit-Viewer-Cline-Musings.md
- **2025-04-30 (Commit `c411da9` by David Ryan)**: fix(management): Update clear_data command to properly handle --all flag by explicitly deleting all model data
<!-- AI_DATA_START
    {
      "hash": "c411da9b0055f1dc524ff138c764505ab798faee",
      "short_message": "fix(management): Update clear_data command to properly handle --all flag by explicitly deleting all model data",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/clear_data.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/management/commands/clear_data.py
- **2025-04-30 (Commit `7dcf626` by David Ryan)**: fix(management): Attempt to handle both string and bytes types in add_self.py diff processing
<!-- AI_DATA_START
    {
      "hash": "7dcf6266c96590c20270f5de5237f2ee31d56a1d",
      "short_message": "fix(management): Attempt to handle both string and bytes types in add_self.py diff processing",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/add_self.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/management/commands/add_self.py
- **2025-04-30 (Commit `553438e` by David Ryan)**: fix(management): Refactor add_self.py to correctly handle branch-commit associations
<!-- AI_DATA_START
    {
      "hash": "553438e07549990be20a06bcbbc9f52e4c31b8b6",
      "short_message": "fix(management): Refactor add_self.py to correctly handle branch-commit associations",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/add_self.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement, BugFix
  - Files: M: viewer/management/commands/add_self.py
- **2025-04-30 (Commit `ef1e836` by David Ryan)**: enhance(embeddings): Add support for chunk_embedding field in generate_embeddings command
<!-- AI_DATA_START
    {
      "hash": "ef1e8362f15215430b4254c7143224f8af2cac0a",
      "short_message": "enhance(embeddings): Add support for chunk_embedding field in generate_embeddings command",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/generate_embeddings.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/management/commands/generate_embeddings.py
- **2025-04-30 (Commit `1d4d7a3` by David Ryan)**: fix(embeddings): Attempt to resolve OpenAI client initialization errors
<!-- AI_DATA_START
    {
      "hash": "1d4d7a3fcbf959e97e4538152ea6d07c8459bebb",
      "short_message": "fix(embeddings): Attempt to resolve OpenAI client initialization errors",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/embedders.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/services/embedders.py
- **2025-04-30 (Commit `6ded46f` by David Ryan)**: fix(commands): Update semantic_search.py import path and field detection
<!-- AI_DATA_START
    {
      "hash": "6ded46f5b7a2b92765cd5e5327185a1a9dadd68c",
      "short_message": "fix(commands): Update semantic_search.py import path and field detection",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/semantic_search.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/management/commands/semantic_search.py
- **2025-04-30 (Commit `28fa665` by David Ryan)**: add May 1 analyses to support creation of embedding model settings and to refactor add_self with new populate_self management command and a service module that abstracts the logic of fetch_commits, to have a single source of operational truth for processing and storing commit details in the db. This is intended to solve the current non-working add_self management command.
<!-- AI_DATA_START
    {
      "hash": "28fa6658ca90210e1033912c7151d661adcdce85",
      "short_message": "add May 1 analyses to support creation of embedding model settings and to refactor add_self with new populate_self management command and a service module that abstracts the logic of fetch_commits, to have a single source of operational truth for processing and storing commit details in the db. This is intended to solve the current non-working add_self management command.",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 1 Database elements NOT currently being chunked and embedded.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Models with Embedding Fields.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Services Directory.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Settings.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 Update Repository command.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/May 1 views py.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Refactor/Improvement, Feature
  - Files: D: theory-and-planning/May 1 Database elements NOT currently being chunked and embedded.md, D: theory-and-planning/May 1 Models with Embedding Fields.md, D: theory-and-planning/May 1 Services Directory.md...
- **2025-04-30 (Commit `edcfb14` by David Ryan)**: refactor(repository): Create single source of truth for repository processing
<!-- AI_DATA_START
    {
      "hash": "edcfb14d07a6d4b68e23625c90b40fce0deaf835",
      "short_message": "refactor(repository): Create single source of truth for repository processing",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/management/commands/populate_self.py",
          "status": "D"
        },
        {
          "path": "viewer/services/repository_processor.py",
          "status": "D"
        },
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement
  - Files: D: viewer/management/commands/populate_self.py, D: viewer/services/repository_processor.py, M: viewer/views.py
- **2025-04-30 (Commit `411f65e` by David Ryan)**: refactor(repository): Create unified repository processing system and documentation
<!-- AI_DATA_START
    {
      "hash": "411f65ec62f80617529321f4f10cdcd12fbc67b0",
      "short_message": "refactor(repository): Create unified repository processing system and documentation",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "Git-Commit-Viewer-Management-Commands.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Refactor/Improvement
  - Files: D: Git-Commit-Viewer-Management-Commands.md
- **2025-04-30 (Commit `f27a5ee` by David Ryan)**: docs(embeddings): Add dynamic embedding configuration system design
<!-- AI_DATA_START
    {
      "hash": "f27a5ee0e07050ad6fae2b07ed166721eb7a51d3",
      "short_message": "docs(embeddings): Add dynamic embedding configuration system design",
      "author": "David Ryan",
      "date_iso": "2025-04-30",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/May 1 Abstract Embedding Configuration Model.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Feature
  - Files: D: theory-and-planning/May 1 Abstract Embedding Configuration Model.md
- **2025-04-29 (Commit `70f06da` by David Ryan)**: config: update PostgreSQL credentials and document implementation progress
<!-- AI_DATA_START
    {
      "hash": "70f06da35cd8f90afa2b5d731e42bb01223290c3",
      "short_message": "config: update PostgreSQL credentials and document implementation progress",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer/settings.py",
          "status": "M"
        },
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: git_commit_viewer/settings.py, M: theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md
- **2025-04-29 (Commit `f3fb58c` by David Ryan)**: Merge pull request #2 from davidorex/feature/chunking-embedding-refactor
<!-- AI_DATA_START
    {
      "hash": "f3fb58ce060b275904d3ce5cb586da2bd125a5ed",
      "short_message": "Merge pull request #2 from davidorex/feature/chunking-embedding-refactor",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer/settings.py",
          "status": "M"
        },
        {
          "path": "requirements.txt",
          "status": "M"
        },
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "M"
        },
        {
          "path": "viewer/semantic/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/decorators.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/fields.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/managers.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/mixins.py",
          "status": "D"
        },
        {
          "path": "viewer/services/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/services/embedders.py",
          "status": "D"
        },
        {
          "path": "viewer/services/embedding_processor.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Refactor/Improvement, Feature
  - Files: M: git_commit_viewer/settings.py, M: requirements.txt, M: theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md...
- **2025-04-29 (Commit `b144d3c` by David Ryan)**: slight edits to April 29 refactoring.
<!-- AI_DATA_START
    {
      "hash": "b144d3cca978d52493e74dbc32a12cb753279d33",
      "short_message": "slight edits to April 29 refactoring.",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md
- **2025-04-29 (Commit `60c0283` by David Ryan)**: add Chunking Service Implementation to accomplish.
<!-- AI_DATA_START
    {
      "hash": "60c0283a04fc17166380eaa170653b6546514e5d",
      "short_message": "add Chunking Service Implementation to accomplish.",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Chunking Service Implementation.md",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: theory-and-planning/April 29 Chunking Service Implementation.md
- **2025-04-29 (Commit `fca0808` by David Ryan)**: feat: implement chunking service for text segmentation and token management
<!-- AI_DATA_START
    {
      "hash": "fca0808bd08a4b073a8c31ef689dcd823c61f304",
      "short_message": "feat: implement chunking service for text segmentation and token management",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/chunkers.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/services/chunkers.py
- **2025-04-29 (Commit `6780927` by David Ryan)**: refactor: integrate chunking service with embedding processor
<!-- AI_DATA_START
    {
      "hash": "6780927b99d4bae3d06f7a9cb9b3bdf7e020be02",
      "short_message": "refactor: integrate chunking service with embedding processor",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/embedding_processor.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Refactor/Improvement
  - Files: M: viewer/services/embedding_processor.py
- **2025-04-29 (Commit `75f3d6b` by David Ryan)**: feat: implement max_chunks parameter for chunking service
<!-- AI_DATA_START
    {
      "hash": "75f3d6bc55557bde53f69d8129075d20fbeaa0db",
      "short_message": "feat: implement max_chunks parameter for chunking service",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Chunking Service Implementation.md",
          "status": "M"
        },
        {
          "path": "viewer/services/chunkers.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: theory-and-planning/April 29 Chunking Service Implementation.md, M: viewer/services/chunkers.py
- **2025-04-29 (Commit `0fcdc0e` by David Ryan)**: docs: update Chunking Service implementation document with completion status
<!-- AI_DATA_START
    {
      "hash": "0fcdc0e91326bd86bbeeb81c76c0ea2c1d52dd3a",
      "short_message": "docs: update Chunking Service implementation document with completion status",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Chunking Service Implementation.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: M: theory-and-planning/April 29 Chunking Service Implementation.md
- **2025-04-29 (Commit `bb7eb04` by David Ryan)**: docs: update main refactoring document to mark Chunking Service as implemented
<!-- AI_DATA_START
    {
      "hash": "bb7eb0456d19a12f09fca03cffe84f664212ac36",
      "short_message": "docs: update main refactoring document to mark Chunking Service as implemented",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: M: theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md
- **2025-04-29 (Commit `4804085` by David Ryan)**: Merge pull request #3 from davidorex/feature/chunking-service
<!-- AI_DATA_START
    {
      "hash": "48040859666fc1264d4ccd20923b2cf3d436f697",
      "short_message": "Merge pull request #3 from davidorex/feature/chunking-service",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Chunking Service Implementation.md",
          "status": "M"
        },
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "M"
        },
        {
          "path": "viewer/services/chunkers.py",
          "status": "D"
        },
        {
          "path": "viewer/services/embedding_processor.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: theory-and-planning/April 29 Chunking Service Implementation.md, M: theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md, D: viewer/services/chunkers.py...
- **2025-04-29 (Commit `345a7f5` by David Ryan)**: refactor(pgvector): prepare for custom pgvector implementation
<!-- AI_DATA_START
    {
      "hash": "345a7f52c09e9650270aacff0a71193054bf83a2",
      "short_message": "refactor(pgvector): prepare for custom pgvector implementation",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/April 29 pgvector Integration Guide.md",
          "status": "D"
        },
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement
  - Files: D: theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md, D: theory-and-planning/April 29 pgvector Integration Guide.md, M: viewer/models.py
- **2025-04-29 (Commit `de32fe9` by David Ryan)**: Merge pull request #4 from davidorex/feature/core-models-postgresql-pgvector-integration
<!-- AI_DATA_START
    {
      "hash": "de32fe963fd30e639e91a82a327d04885a0ee2fc",
      "short_message": "Merge pull request #4 from davidorex/feature/core-models-postgresql-pgvector-integration",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/April 29 pgvector Integration Guide.md",
          "status": "D"
        },
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md, D: theory-and-planning/April 29 pgvector Integration Guide.md, M: viewer/models.py
- **2025-04-29 (Commit `c99ab74` by David Ryan)**: feat(pgvector): enhance implementation plan with safety features and expanded tests
<!-- AI_DATA_START
    {
      "hash": "c99ab744b6fc5092200ad8a3adebf485a3c1c568",
      "short_message": "feat(pgvector): enhance implementation plan with safety features and expanded tests",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Feature
  - Files: M: theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md
- **2025-04-29 (Commit `d970218` by David Ryan)**: feat(pgvector): create basic package structure for custom pgvector integration
<!-- AI_DATA_START
    {
      "hash": "d970218942d4ab056843dc9ff0d1b1794e91360b",
      "short_message": "feat(pgvector): create basic package structure for custom pgvector integration",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/apps.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/fields.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/indexes.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/lookups.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/management/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/management/commands/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/management/commands/install_pgvector.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/tests/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/pgvector/tests/test_fields.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/pgvector/__init__.py, D: viewer/pgvector/apps.py, D: viewer/pgvector/fields.py...
- **2025-04-29 (Commit `a7382b9` by David Ryan)**: feat(pgvector): implement package initialization
<!-- AI_DATA_START
    {
      "hash": "a7382b912ff54deda244d8f4c57af51016d9c69b",
      "short_message": "feat(pgvector): implement package initialization",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md",
          "status": "M"
        },
        {
          "path": "viewer/pgvector/__init__.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md, M: viewer/pgvector/__init__.py
- **2025-04-29 (Commit `2af445c` by David Ryan)**: feat(pgvector): implement app configuration
<!-- AI_DATA_START
    {
      "hash": "2af445c1370bff0e6460eec4ac5cc37f7c5c25ad",
      "short_message": "feat(pgvector): implement app configuration",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/apps.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/pgvector/apps.py
- **2025-04-29 (Commit `01c1155` by David Ryan)**: feat(pgvector): implement VectorField for PostgreSQL vector storage
<!-- AI_DATA_START
    {
      "hash": "01c1155c982b46915082c2382dd0e01d4c0b10e1",
      "short_message": "feat(pgvector): implement VectorField for PostgreSQL vector storage",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/pgvector/fields.py
- **2025-04-29 (Commit `ece8395` by David Ryan)**: feat(pgvector): implement vector similarity lookups
<!-- AI_DATA_START
    {
      "hash": "ece83956290c8d1e42bde058dc265ca82a2d5df6",
      "short_message": "feat(pgvector): implement vector similarity lookups",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/lookups.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/pgvector/lookups.py
- **2025-04-29 (Commit `d4345ef` by David Ryan)**: feat(pgvector): implement vector indexing support
<!-- AI_DATA_START
    {
      "hash": "d4345ef7a2259a65a4e8694a5b3d75c537714eb3",
      "short_message": "feat(pgvector): implement vector indexing support",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/indexes.py",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: M: viewer/pgvector/indexes.py
- **2025-04-29 (Commit `b0697b4` by David Ryan)**: feat(pgvector): implement management command for pgvector installation
<!-- AI_DATA_START
    {
      "hash": "b0697b478ba2fd2c834997c171411c8407a8ea20",
      "short_message": "feat(pgvector): implement management command for pgvector installation",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/management/commands/install_pgvector.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/pgvector/management/commands/install_pgvector.py
- **2025-04-29 (Commit `c7df6bb` by David Ryan)**: test(pgvector): implement comprehensive test suite for VectorField
<!-- AI_DATA_START
    {
      "hash": "c7df6bbb50b811eaa5844ab47c7ffc8be2999e7d",
      "short_message": "test(pgvector): implement comprehensive test suite for VectorField",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/pgvector/tests/test_fields.py",
          "status": "M"
        }
      ],
      "themes": [
        "Testing",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Testing, Feature
  - Files: M: viewer/pgvector/tests/test_fields.py
- **2025-04-29 (Commit `5245a1c` by David Ryan)**: feat(pgvector): add migration for pgvector extension installation
<!-- AI_DATA_START
    {
      "hash": "5245a1c1ce2e799f943ed02cd134bd3a066a40c3",
      "short_message": "feat(pgvector): add migration for pgvector extension installation",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/migrations/0006_install_pgvector.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/migrations/0006_install_pgvector.py
- **2025-04-29 (Commit `b0a51fa` by David Ryan)**: feat(pgvector): update Django settings for pgvector integration
<!-- AI_DATA_START
    {
      "hash": "b0a51faa0a664ae3799ecf9fd70ced15595dd0a2",
      "short_message": "feat(pgvector): update Django settings for pgvector integration",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer/settings.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: git_commit_viewer/settings.py
- **2025-04-29 (Commit `c213ca4` by David Ryan)**: mark completed phases and steps as completed.
<!-- AI_DATA_START
    {
      "hash": "c213ca4093f3f591fb187a19cf7ce99ffb286c7a",
      "short_message": "mark completed phases and steps as completed.",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md
- **2025-04-29 (Commit `7612361` by David Ryan)**: docs(implementation-plan): document pgvector implementation status with verification results and testing challenges
<!-- AI_DATA_START
    {
      "hash": "761236123afcb7aecd6790ee71131f3f3236ab11",
      "short_message": "docs(implementation-plan): document pgvector implementation status with verification results and testing challenges",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Testing"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Testing
  - Files: M: theory-and-planning/April 29 Implementation Plan- pgvector for Git Commit Viewer.md
- **2025-04-29 (Commit `e4fb80a` by David Ryan)**: docs(pgvector): update refactoring document to correctly mark core models as implemented
<!-- AI_DATA_START
    {
      "hash": "e4fb80acf19d9c2eb1071f4e2b18521f9dbc2342",
      "short_message": "docs(pgvector): update refactoring document to correctly mark core models as implemented",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: M: theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md
- **2025-04-29 (Commit `76435b0` by David Ryan)**: docs(pgvector): mark Commit Model as implemented with commit reference
<!-- AI_DATA_START
    {
      "hash": "76435b0ad72fd8bfcf823d71cf8ebbd5b9e7f382",
      "short_message": "docs(pgvector): mark Commit Model as implemented with commit reference",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: M: theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md
- **2025-04-29 (Commit `80bc33c` by David Ryan)**: docs(readme): add comprehensive pgvector integration documentation to README_AI.md
<!-- AI_DATA_START
    {
      "hash": "80bc33cc2dfe4c7e58fef7d150b01ce45fd318e5",
      "short_message": "docs(readme): add comprehensive pgvector integration documentation to README_AI.md",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: M: README_AI.md
- **2025-04-29 (Commit `3318930` by David Ryan)**: fix(settings): add default Git author/committer settings for Commit model migration
<!-- AI_DATA_START
    {
      "hash": "33189306187671fec024cae623f8a741d1e9262f",
      "short_message": "fix(settings): add default Git author/committer settings for Commit model migration",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer/settings.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature, BugFix
  - Files: M: git_commit_viewer/settings.py
- **2025-04-29 (Commit `88aed33` by David Ryan)**: fix(models): update Commit model to use default Git settings
<!-- AI_DATA_START
    {
      "hash": "88aed33aaf1d1ec2f8ebb693215fcb90ae986290",
      "short_message": "fix(models): update Commit model to use default Git settings",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/models.py
- **2025-04-29 (Commit `d538cfb` by David Ryan)**: fix(views): populate Git author and committer fields in fetch_commits view
<!-- AI_DATA_START
    {
      "hash": "d538cfb5efc87d13be9b1d53a0793d031988c1a3",
      "short_message": "fix(views): populate Git author and committer fields in fetch_commits view",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/views.py
- **2025-04-29 (Commit `cd68074` by David Ryan)**: docs(all): add migration and update documentation for Git author/committer implementation
<!-- AI_DATA_START
    {
      "hash": "cd68074e5b234120b870c591a95e03c77fa658c8",
      "short_message": "docs(all): add migration and update documentation for Git author/committer implementation",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "M"
        },
        {
          "path": "viewer/migrations/0007_commitmessagechunk_diffchunk_commit_author_email_and_more.py",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Feature
  - Files: M: README_AI.md, D: viewer/migrations/0007_commitmessagechunk_diffchunk_commit_author_email_and_more.py
- **2025-04-29 (Commit `95dbeda` by David Ryan)**: docs(refactoring): add comprehensive Git status semantic preservation plan
<!-- AI_DATA_START
    {
      "hash": "95dbeda648fec8ebceb73daedc5d592fcaa4fc5b",
      "short_message": "docs(refactoring): add comprehensive Git status semantic preservation plan",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "April 30 Comprehensively Refactor Git Status to impose no assumptions.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation",
        "Semantic Subsystem",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Semantic Subsystem, Feature
  - Files: D: April 30 Comprehensively Refactor Git Status to impose no assumptions.md
- **2025-04-29 (Commit `765df5e` by David Ryan)**: refactor(models): update FileChange model to preserve raw Git status semantics
<!-- AI_DATA_START
    {
      "hash": "765df5e9610e45b35eb7af5696687aa531ac5843",
      "short_message": "refactor(models): update FileChange model to preserve raw Git status semantics",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement
  - Files: M: viewer/models.py
- **2025-04-29 (Commit `70ac254` by David Ryan)**: refactor(views): update views to preserve raw Git status semantics
<!-- AI_DATA_START
    {
      "hash": "70ac2543dbfe4661a86fd329b84b9107ada122c7",
      "short_message": "refactor(views): update views to preserve raw Git status semantics",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement
  - Files: M: viewer/views.py
- **2025-04-29 (Commit `2c59fd0` by David Ryan)**: refactor(templates): update templates to display raw Git status semantics
<!-- AI_DATA_START
    {
      "hash": "2c59fd0432e39828da9dc1a0a3417479b390c9bf",
      "short_message": "refactor(templates): update templates to display raw Git status semantics",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/base.html",
          "status": "M"
        },
        {
          "path": "viewer/templates/viewer/commit_detail.html",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement
  - Files: M: viewer/templates/viewer/base.html, M: viewer/templates/viewer/commit_detail.html
- **2025-04-29 (Commit `db1669a` by David Ryan)**: fix(models): add default value for git_status field to enable migrations
<!-- AI_DATA_START
    {
      "hash": "db1669a6a66ad45e3190698b7f416a0f93a8eeaf",
      "short_message": "fix(models): add default value for git_status field to enable migrations",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature, BugFix
  - Files: M: viewer/models.py
- **2025-04-29 (Commit `35fbd61` by David Ryan)**: feat(migrations): add migration for Git status semantic preservation
<!-- AI_DATA_START
    {
      "hash": "35fbd61a3b7380deefd4d508f4d71020162b1d27",
      "short_message": "feat(migrations): add migration for Git status semantic preservation",
      "author": "David Ryan",
      "date_iso": "2025-04-29",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/migrations/0008_remove_filechange_viewer_file_path_74026f_idx_and_more.py",
          "status": "D"
        }
      ],
      "themes": [
        "Semantic Subsystem",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Semantic Subsystem, Feature
  - Files: D: viewer/migrations/0008_remove_filechange_viewer_file_path_74026f_idx_and_more.py
- **2025-04-28 (Commit `1ae549e` by David Ryan)**: feat: Add pulsing animation to Update Repository button during HTMX requests
<!-- AI_DATA_START
    {
      "hash": "1ae549e39ad3886c89197aeaafba3084439f6f06",
      "short_message": "feat: Add pulsing animation to Update Repository button during HTMX requests",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/base.html",
          "status": "M"
        },
        {
          "path": "viewer/templates/viewer/list_repositories.html",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/templates/viewer/base.html, M: viewer/templates/viewer/list_repositories.html
- **2025-04-28 (Commit `58dc8ed` by David Ryan)**: feat: Add last_fetched timestamp to Repository model
<!-- AI_DATA_START
    {
      "hash": "58dc8ed554bdd9bed45469fa0be9dcc52f0b908a",
      "short_message": "feat: Add last_fetched timestamp to Repository model",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        },
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/models.py, M: viewer/views.py
- **2025-04-28 (Commit `d1e7468` by David Ryan)**: chore: Add migration for Repository.last_fetched field
<!-- AI_DATA_START
    {
      "hash": "d1e7468444a931b51451e3ee6dc943d7d19c02fd",
      "short_message": "chore: Add migration for Repository.last_fetched field",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/migrations/0005_repository_last_fetched.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/migrations/0005_repository_last_fetched.py
- **2025-04-28 (Commit `8a19728` by David Ryan)**: feat: Display last fetched timestamp next to Update Repository button
<!-- AI_DATA_START
    {
      "hash": "8a19728f125651ac494b34dd62fd4c5d5617e0d6",
      "short_message": "feat: Display last fetched timestamp next to Update Repository button",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/list_repositories.html",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/templates/viewer/list_repositories.html
- **2025-04-28 (Commit `a49ff03` by David Ryan)**: feat: Update repository fetching to include all branches and improve branch ordering
<!-- AI_DATA_START
    {
      "hash": "a49ff03493c5db7571437d04a54757f1b45573d6",
      "short_message": "feat: Update repository fetching to include all branches and improve branch ordering",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/list_repositories.html",
          "status": "M"
        },
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement, Feature
  - Files: M: viewer/templates/viewer/list_repositories.html, M: viewer/views.py
- **2025-04-28 (Commit `7df1f1e` by David Ryan)**: add theory and planning dir, add April 29 Refactoring to Support Chunkng and Embedding with PGVector.md
<!-- AI_DATA_START
    {
      "hash": "7df1f1ef537401939e263a2ae83f74f9813a61f2",
      "short_message": "add theory and planning dir, add April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: D: theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md
- **2025-04-28 (Commit `dfcb269` by David Ryan)**: Merge pull request #1 from davidorex/fixes/april-28
<!-- AI_DATA_START
    {
      "hash": "dfcb269a367e0122ba8ce6f460eabe0596c09a49",
      "short_message": "Merge pull request #1 from davidorex/fixes/april-28",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer_analysis.md",
          "status": "D"
        },
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "D"
        },
        {
          "path": "viewer/admin.py",
          "status": "M"
        },
        {
          "path": "viewer/migrations/0004_alter_commit_commit_date_filechange.py",
          "status": "D"
        },
        {
          "path": "viewer/migrations/0005_repository_last_fetched.py",
          "status": "D"
        },
        {
          "path": "viewer/models.py",
          "status": "M"
        },
        {
          "path": "viewer/templates/viewer/base.html",
          "status": "M"
        },
        {
          "path": "viewer/templates/viewer/commit_detail_full.html",
          "status": "D"
        },
        {
          "path": "viewer/templates/viewer/fetch_commits.html",
          "status": "M"
        },
        {
          "path": "viewer/templates/viewer/list_repositories.html",
          "status": "M"
        },
        {
          "path": "viewer/templates/viewer/view_commits.html",
          "status": "M"
        },
        {
          "path": "viewer/urls.py",
          "status": "M"
        },
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: D: git_commit_viewer_analysis.md, D: theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md, M: viewer/admin.py...
- **2025-04-28 (Commit `006bd54` by David Ryan)**: docs: enhance semantic model architecture with advanced pgvector integration features
<!-- AI_DATA_START
    {
      "hash": "006bd543300e9930cfe830243ea1dccf5291d076",
      "short_message": "docs: enhance semantic model architecture with advanced pgvector integration features",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "M"
        }
      ],
      "themes": [
        "Documentation",
        "Semantic Subsystem"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation, Semantic Subsystem
  - Files: M: theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md
- **2025-04-28 (Commit `3b58a68` by David Ryan)**: docs: add Django-native embedding pipeline architecture to pgvector design
<!-- AI_DATA_START
    {
      "hash": "3b58a682b84b6e2c5cdd80285a314e7fec344747",
      "short_message": "docs: add Django-native embedding pipeline architecture to pgvector design",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md",
          "status": "M"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Documentation",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Documentation, Feature
  - Files: M: theory-and-planning/April 29 Refactoring to Support Chunkng and Embedding with PGVector.md
- **2025-04-28 (Commit `2dee166` by David Ryan)**: add Second-State Refactoring proposal.
<!-- AI_DATA_START
    {
      "hash": "2dee16600d08f60da8847db79d49584875ff20c4",
      "short_message": "add Second-State Refactoring proposal.",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "theory-and-planning/Second-Stage Refactoring- Structured Semantic Automation Layer.md",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: theory-and-planning/Second-Stage Refactoring- Structured Semantic Automation Layer.md
- **2025-04-28 (Commit `2ac5641` by David Ryan)**: deps: add dependencies for PostgreSQL and pgvector integration
<!-- AI_DATA_START
    {
      "hash": "2ac5641b81de605e0949b23bf030d685e7aecfe5",
      "short_message": "deps: add dependencies for PostgreSQL and pgvector integration",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "requirements.txt",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: requirements.txt
- **2025-04-28 (Commit `99e2577` by David Ryan)**: config: update settings.py for PostgreSQL and pgvector integration
<!-- AI_DATA_START
    {
      "hash": "99e2577205bfcef2ff8115f89c270f4f3da931eb",
      "short_message": "config: update settings.py for PostgreSQL and pgvector integration",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer/settings.py",
          "status": "M"
        },
        {
          "path": "requirements.txt",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: git_commit_viewer/settings.py, M: requirements.txt
- **2025-04-28 (Commit `cc26957` by David Ryan)**: feat: implement semantic utilities for pgvector integration
<!-- AI_DATA_START
    {
      "hash": "cc26957416a522f5d5f48db26bd1f4d1cbb5ebe8",
      "short_message": "feat: implement semantic utilities for pgvector integration",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/semantic/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/decorators.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/fields.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/managers.py",
          "status": "D"
        },
        {
          "path": "viewer/semantic/mixins.py",
          "status": "D"
        }
      ],
      "themes": [
        "Semantic Subsystem",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Semantic Subsystem, Feature
  - Files: D: viewer/semantic/__init__.py, D: viewer/semantic/decorators.py, D: viewer/semantic/fields.py...
- **2025-04-28 (Commit `54f231a` by David Ryan)**: feat: implement embedding service pipeline for vector generation
<!-- AI_DATA_START
    {
      "hash": "54f231afa49dca6fdbfc3387be5ef17fd696eef9",
      "short_message": "feat: implement embedding service pipeline for vector generation",
      "author": "David Ryan",
      "date_iso": "2025-04-28",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/services/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/services/embedders.py",
          "status": "D"
        },
        {
          "path": "viewer/services/embedding_processor.py",
          "status": "D"
        }
      ],
      "themes": [
        "Vector/Embedding",
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Vector/Embedding, Feature
  - Files: D: viewer/services/__init__.py, D: viewer/services/embedders.py, D: viewer/services/embedding_processor.py

**Overall Themes for Period:**
<!-- AI_DATA_START
  {
    "themes_summary": [
      {
        "theme": "Feature",
        "count": 177
      },
      {
        "theme": "Documentation",
        "count": 85
      },
      {
        "theme": "Vector/Embedding",
        "count": 70
      },
      {
        "theme": "BugFix",
        "count": 53
      },
      {
        "theme": "Testing",
        "count": 33
      },
      {
        "theme": "Refactor/Improvement",
        "count": 26
      },
      {
        "theme": "General Update",
        "count": 23
      },
      {
        "theme": "Semantic Subsystem",
        "count": 14
      },
      {
        "theme": "UI/Frontend",
        "count": 1
      }
    ]
  }
AI_DATA_END -->
- Feature: 177 mentions/commits
- Documentation: 85 mentions/commits
- Vector/Embedding: 70 mentions/commits
- BugFix: 53 mentions/commits
- Testing: 33 mentions/commits
- Refactor/Improvement: 26 mentions/commits
- General Update: 23 mentions/commits
- Semantic Subsystem: 14 mentions/commits
- UI/Frontend: 1 mentions/commits

---

## Development Period: 2025-04-21 to 2025-04-27
(2025-04-21 to 2025-04-27)

<!-- AI_DATA_START
  {
    "label": "2025-04-21 to 2025-04-27",
    "start_date_iso": "2025-04-21",
    "end_date_iso": "2025-04-27",
    "commit_count": 76,
    "new_modules": [
      "git_commit_viewer"
    ],
    "modified_modules": [
      {
        "module": "viewer.views",
        "commit_count": 17,
        "example_commits": [
          "03ccb1a",
          "bd55d3d",
          "091ea06"
        ]
      },
      {
        "module": "git_commit_viewer",
        "commit_count": 10,
        "example_commits": [
          "4eb8fde",
          "ebfc551",
          "dc9de21"
        ]
      },
      {
        "module": "viewer.urls",
        "commit_count": 8,
        "example_commits": [
          "66e9081",
          "6e87720",
          "4abab2c"
        ]
      },
      {
        "module": "viewer.templates.viewer.view_commits.html",
        "commit_count": 8,
        "example_commits": [
          "fbdb9c9",
          "ad84f29",
          "bc4e548"
        ]
      },
      {
        "module": "viewer.templates.viewer.list_repositories.html",
        "commit_count": 8,
        "example_commits": [
          "ac99688",
          "cb4386f",
          "26bf19f"
        ]
      },
      {
        "module": "viewer.models",
        "commit_count": 4,
        "example_commits": [
          "cf5a83a",
          "25446b4",
          "d6a9f51"
        ]
      },
      {
        "module": "viewer.templates.viewer.index.html",
        "commit_count": 4,
        "example_commits": [
          "a2c6439",
          "774398e",
          "7e54452"
        ]
      },
      {
        "module": ".gitignore",
        "commit_count": 3,
        "example_commits": [
          "69e7d52",
          "86c865d",
          "091ea06"
        ]
      },
      {
        "module": "viewer.templates.viewer.fetch_commits.html",
        "commit_count": 3,
        "example_commits": [
          "2088959",
          "bd1e477",
          "c7ebc16"
        ]
      },
      {
        "module": "viewer.templates.viewer.commit_detail.html",
        "commit_count": 3,
        "example_commits": [
          "8a97c2d",
          "6354ae8",
          "1d77a56"
        ]
      },
      {
        "module": "README_AI.md",
        "commit_count": 3,
        "example_commits": [
          "898913f",
          "8c67acf",
          "13bf204"
        ]
      },
      {
        "module": "git_commit_viewer.urls",
        "commit_count": 2,
        "example_commits": [
          "43ce024",
          "937915a"
        ]
      },
      {
        "module": "viewer.admin",
        "commit_count": 2,
        "example_commits": [
          "43ce024",
          "b5a218d"
        ]
      },
      {
        "module": "README.md",
        "commit_count": 1,
        "example_commits": [
          "c18b19e"
        ]
      },
      {
        "module": "requirements.txt",
        "commit_count": 1,
        "example_commits": [
          "5204d65"
        ]
      },
      {
        "module": "git_commit_viewer.settings",
        "commit_count": 1,
        "example_commits": [
          "acfc85b"
        ]
      },
      {
        "module": "git_commit_viewer.__init__",
        "commit_count": 1,
        "example_commits": [
          "43ce024"
        ]
      },
      {
        "module": "git_commit_viewer.asgi",
        "commit_count": 1,
        "example_commits": [
          "43ce024"
        ]
      },
      {
        "module": "git_commit_viewer.wsgi",
        "commit_count": 1,
        "example_commits": [
          "43ce024"
        ]
      },
      {
        "module": "manage",
        "commit_count": 1,
        "example_commits": [
          "43ce024"
        ]
      },
      {
        "module": "viewer.__init__",
        "commit_count": 1,
        "example_commits": [
          "43ce024"
        ]
      },
      {
        "module": "viewer.apps",
        "commit_count": 1,
        "example_commits": [
          "43ce024"
        ]
      },
      {
        "module": "viewer.migrations.__init__",
        "commit_count": 1,
        "example_commits": [
          "43ce024"
        ]
      },
      {
        "module": "viewer.tests",
        "commit_count": 1,
        "example_commits": [
          "43ce024"
        ]
      },
      {
        "module": "viewer.templates.viewer.base.html",
        "commit_count": 1,
        "example_commits": [
          "3e6b845"
        ]
      },
      {
        "module": "viewer.migrations.0001_initial",
        "commit_count": 1,
        "example_commits": [
          "b741e57"
        ]
      },
      {
        "module": "viewer.templates.viewer.view_commits_full.html",
        "commit_count": 1,
        "example_commits": [
          "b741e57"
        ]
      },
      {
        "module": "viewer.migrations.0002_commit_files_changed",
        "commit_count": 1,
        "example_commits": [
          "26bf19f"
        ]
      },
      {
        "module": "viewer.migrations.0003_remove_commit_branch_commit_branches",
        "commit_count": 1,
        "example_commits": [
          "26bf19f"
        ]
      },
      {
        "module": "git_commit_viewer_analysis.md",
        "commit_count": 1,
        "example_commits": [
          "662dd9b"
        ]
      },
      {
        "module": "viewer.templates.viewer.commit_detail_full.html",
        "commit_count": 1,
        "example_commits": [
          "7503cc7"
        ]
      },
      {
        "module": "viewer.migrations.0004_alter_commit_commit_date_filechange",
        "commit_count": 1,
        "example_commits": [
          "60fc514"
        ]
      }
    ],
    "architectural_notes": [
      {
        "id": "arch_note_20250512111007903895",
        "text": "Core models (`viewer.models`) show interaction with the `viewer.semantic.vector` subsystem, indicating integration of vector capabilities."
      }
    ]
  }
AI_DATA_END -->
**Total Commits:** 76

**New Modules Introduced:** git_commit_viewer

**Key Modified Modules (by commit frequency):**
- `viewer.views` (17 commits)
- `git_commit_viewer` (10 commits)
- `viewer.urls` (8 commits)
- `viewer.templates.viewer.view_commits.html` (8 commits)
- `viewer.templates.viewer.list_repositories.html` (8 commits)
- ...and others.

**Architectural Notes:**
<!-- AI_ARCH_NOTE_ID: arch_note_20250512111007903895 -->
- Core models (`viewer.models`) show interaction with the `viewer.semantic.vector` subsystem, indicating integration of vector capabilities.

**Commit Highlights & Themes:**
- **2025-04-27 (Commit `93a4718` by David Ryan)**: Enhance commit detail display in view_commits template
<!-- AI_DATA_START
    {
      "hash": "93a471828e02eddc93dec7d378c80d96c57e1f75",
      "short_message": "Enhance commit detail display in view_commits template",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/view_commits.html",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/templates/viewer/view_commits.html
- **2025-04-27 (Commit `66a4c1d` by David Ryan)**: Enhance commit detail UI and interaction in view_commits template
<!-- AI_DATA_START
    {
      "hash": "66a4c1d807385089e096410b8dab02334b84a9a4",
      "short_message": "Enhance commit detail UI and interaction in view_commits template",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/view_commits.html",
          "status": "M"
        }
      ],
      "themes": [
        "UI/Frontend"
      ]
    }
  AI_DATA_END -->
  - Themes: UI/Frontend
  - Files: M: viewer/templates/viewer/view_commits.html
- **2025-04-27 (Commit `dc62b58` by David Ryan)**: Enhance commit summary display in view_commits template
<!-- AI_DATA_START
    {
      "hash": "dc62b585556a9d7f7a96244ed77934bed0fb81bb",
      "short_message": "Enhance commit summary display in view_commits template",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/view_commits.html",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/templates/viewer/view_commits.html
- **2025-04-27 (Commit `25446b4` by David Ryan)**: Update Commit model to include files_changed field
<!-- AI_DATA_START
    {
      "hash": "25446b442cedc359a8353451a8517bdf9822f383",
      "short_message": "Update Commit model to include files_changed field",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/models.py
- **2025-04-27 (Commit `2168def` by David Ryan)**: Update fetch_commits view to populate files_changed field
<!-- AI_DATA_START
    {
      "hash": "2168def10cbaaa7c8a0156750275a71ee3a87bf3",
      "short_message": "Update fetch_commits view to populate files_changed field",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/views.py
- **2025-04-27 (Commit `5f06448` by David Ryan)**: Refine fetch_commits function to ensure files_changed field is updated
<!-- AI_DATA_START
    {
      "hash": "5f06448d651ba07e9df8698e19cd8780f3327bda",
      "short_message": "Refine fetch_commits function to ensure files_changed field is updated",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/views.py
- **2025-04-27 (Commit `df751aa` by David Ryan)**: Enhance repository management and commit fetching
<!-- AI_DATA_START
    {
      "hash": "df751aade360dc706d86b88c0d993fa25c23a032",
      "short_message": "Enhance repository management and commit fetching",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/views.py
- **2025-04-27 (Commit `ac99688` by David Ryan)**: Add list_repositories.html template
<!-- AI_DATA_START
    {
      "hash": "ac996884c61fb954caa4ad4a32533521ac16d615",
      "short_message": "Add list_repositories.html template",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/list_repositories.html",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: viewer/templates/viewer/list_repositories.html
- **2025-04-27 (Commit `17420b2` by David Ryan)**: Update urls.py to include list_repositories view
<!-- AI_DATA_START
    {
      "hash": "17420b24a448841f417e9b1b4622ff3195dc9eca",
      "short_message": "Update urls.py to include list_repositories view",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/urls.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/urls.py
- **2025-04-27 (Commit `774398e` by David Ryan)**: Update index.html to include link to repository list
<!-- AI_DATA_START
    {
      "hash": "774398ee9e4c43c0dd5a163981a9c2e200518449",
      "short_message": "Update index.html to include link to repository list",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/index.html",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/templates/viewer/index.html
- **2025-04-27 (Commit `898913f` by David Ryan)**: Add README_AI.md for AI development guidance
<!-- AI_DATA_START
    {
      "hash": "898913fe6dec5fd982660504e1c0a9f3574783e7",
      "short_message": "Add README_AI.md for AI development guidance",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: README_AI.md
- **2025-04-27 (Commit `bd1e477` by David Ryan)**: Update fetch_commits.html to support repository updates
<!-- AI_DATA_START
    {
      "hash": "bd1e477175e81b85da8ef4ba06e2c6f2a7dfccd0",
      "short_message": "Update fetch_commits.html to support repository updates",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/fetch_commits.html",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/templates/viewer/fetch_commits.html
- **2025-04-27 (Commit `d85678a` by David Ryan)**: Enhance fetch_commits view for repository updates and error handling
<!-- AI_DATA_START
    {
      "hash": "d85678a2a2924b53d0a7af181bd0093825d4b44b",
      "short_message": "Enhance fetch_commits view for repository updates and error handling",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/views.py
- **2025-04-27 (Commit `d2aca69` by David Ryan)**: Enhance commit_detail view with comprehensive Git-specific information
<!-- AI_DATA_START
    {
      "hash": "d2aca697d03281af4bd94ecd277fff71385dc0cf",
      "short_message": "Enhance commit_detail view with comprehensive Git-specific information",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/views.py
- **2025-04-27 (Commit `6354ae8` by David Ryan)**: Enhance commit_detail.html template with comprehensive Git-specific information
<!-- AI_DATA_START
    {
      "hash": "6354ae8dad889cc95a9c93d4d8ed7aa13eb592b3",
      "short_message": "Enhance commit_detail.html template with comprehensive Git-specific information",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/commit_detail.html",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/templates/viewer/commit_detail.html
- **2025-04-27 (Commit `8c67acf` by David Ryan)**: Update README_AI.md to reflect recent developments and architectural changes
<!-- AI_DATA_START
    {
      "hash": "8c67acf9db2028ebcfacde826c2a34d72d59f388",
      "short_message": "Update README_AI.md to reflect recent developments and architectural changes",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: README_AI.md
- **2025-04-27 (Commit `a8bb1d4` by David Ryan)**: Enhance fetch_commits and view_commits to handle multiple branches
<!-- AI_DATA_START
    {
      "hash": "a8bb1d48e2ce13f4815a50334637f0a14a1d5449",
      "short_message": "Enhance fetch_commits and view_commits to handle multiple branches",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/views.py
- **2025-04-27 (Commit `d6a9f51` by David Ryan)**: Update Commit model to support multiple branches
<!-- AI_DATA_START
    {
      "hash": "d6a9f51a4d82d0c387ac27961c6e59717837715a",
      "short_message": "Update Commit model to support multiple branches",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/models.py
- **2025-04-27 (Commit `ae72a31` by David Ryan)**: Update view_commits.html template for multi-branch support
<!-- AI_DATA_START
    {
      "hash": "ae72a310a4a4029cee25c5be9de82755e96436aa",
      "short_message": "Update view_commits.html template for multi-branch support",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/view_commits.html",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/templates/viewer/view_commits.html
- **2025-04-27 (Commit `1d77a56` by David Ryan)**: Update commit_detail.html template for multi-branch support
<!-- AI_DATA_START
    {
      "hash": "1d77a56b4f1729fa7b4173568d335ea71e5d780d",
      "short_message": "Update commit_detail.html template for multi-branch support",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/commit_detail.html",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/templates/viewer/commit_detail.html
- **2025-04-27 (Commit `1599ef8` by David Ryan)**: Update views.py to support multi-branch functionality
<!-- AI_DATA_START
    {
      "hash": "1599ef80e6793bea75fb52e67dec648d1ea25a5b",
      "short_message": "Update views.py to support multi-branch functionality",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/views.py
- **2025-04-27 (Commit `5d356ef` by David Ryan)**: Update urls.py to support multi-branch functionality
<!-- AI_DATA_START
    {
      "hash": "5d356efdc04e681236424b79ad14e3a0f5ec49fd",
      "short_message": "Update urls.py to support multi-branch functionality",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/urls.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/urls.py
- **2025-04-27 (Commit `7e54452` by David Ryan)**: Update index.html to support new URL structure for multi-branch functionality
<!-- AI_DATA_START
    {
      "hash": "7e54452a375a3a087f6a8678add3febeb638b161",
      "short_message": "Update index.html to support new URL structure for multi-branch functionality",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/index.html",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/templates/viewer/index.html
- **2025-04-27 (Commit `cb4386f` by David Ryan)**: Update list_repositories.html to support new URL structure for multi-branch functionality
<!-- AI_DATA_START
    {
      "hash": "cb4386f1701c822d82e66f6972cd1eeefd35ddb3",
      "short_message": "Update list_repositories.html to support new URL structure for multi-branch functionality",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/list_repositories.html",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/templates/viewer/list_repositories.html
- **2025-04-27 (Commit `13bf204` by David Ryan)**: Update README_AI.md to reflect multi-branch functionality implementation
<!-- AI_DATA_START
    {
      "hash": "13bf204e0b0df04c47bf9c411fa0cdc7f9806f65",
      "short_message": "Update README_AI.md to reflect multi-branch functionality implementation",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README_AI.md",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: README_AI.md
- **2025-04-27 (Commit `26bf19f` by David Ryan)**: migrations 0002 and 0003.
<!-- AI_DATA_START
    {
      "hash": "26bf19f0c4f91eef5b2523e1af811dee7954045b",
      "short_message": "migrations 0002 and 0003.",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/migrations/0002_commit_files_changed.py",
          "status": "D"
        },
        {
          "path": "viewer/migrations/0003_remove_commit_branch_commit_branches.py",
          "status": "D"
        },
        {
          "path": "viewer/templates/viewer/list_repositories.html",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: viewer/migrations/0002_commit_files_changed.py, D: viewer/migrations/0003_remove_commit_branch_commit_branches.py, M: viewer/templates/viewer/list_repositories.html
- **2025-04-27 (Commit `4a94722` by David Ryan)**: Fix CSRF token issue in list_repositories.html
<!-- AI_DATA_START
    {
      "hash": "4a947222ae9bcda86b6748e23b3de3cf16c3c8e6",
      "short_message": "Fix CSRF token issue in list_repositories.html",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/list_repositories.html",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/templates/viewer/list_repositories.html
- **2025-04-27 (Commit `4a40ef8` by David Ryan)**: Refactor repository management and commit fetching
<!-- AI_DATA_START
    {
      "hash": "4a40ef8a41e3c4b254e3ab5d0be167b1bc0807b4",
      "short_message": "Refactor repository management and commit fetching",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/index.html",
          "status": "M"
        },
        {
          "path": "viewer/templates/viewer/list_repositories.html",
          "status": "M"
        },
        {
          "path": "viewer/urls.py",
          "status": "M"
        },
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement
  - Files: M: viewer/templates/viewer/index.html, M: viewer/templates/viewer/list_repositories.html, M: viewer/urls.py...
- **2025-04-27 (Commit `24089d7` by David Ryan)**: Implement 'Add New Repository' functionality
<!-- AI_DATA_START
    {
      "hash": "24089d7fb4876873ccdf5b59c97cd04cde24e52c",
      "short_message": "Implement 'Add New Repository' functionality",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/list_repositories.html",
          "status": "M"
        },
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/templates/viewer/list_repositories.html, M: viewer/views.py
- **2025-04-27 (Commit `ad4c3b6` by David Ryan)**: Fix URL routing for fetch_commits and update views
<!-- AI_DATA_START
    {
      "hash": "ad4c3b6de9d08957ad6c7b763a16372830265fb0",
      "short_message": "Fix URL routing for fetch_commits and update views",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/urls.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/urls.py
- **2025-04-27 (Commit `b5a218d` by David Ryan)**: feat(admin): Register models in Django admin interface for comprehensive database management
<!-- AI_DATA_START
    {
      "hash": "b5a218d6f77f5bd9cb148340941ae1973dca29f3",
      "short_message": "feat(admin): Register models in Django admin interface for comprehensive database management",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/admin.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/admin.py
- **2025-04-27 (Commit `88f2ce8` by David Ryan)**: fix(repository): Fix URL reference and enhance branch handling logic
<!-- AI_DATA_START
    {
      "hash": "88f2ce85ea7f691956a563a948289bdc2dd0496b",
      "short_message": "fix(repository): Fix URL reference and enhance branch handling logic",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/list_repositories.html",
          "status": "M"
        },
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/templates/viewer/list_repositories.html, M: viewer/views.py
- **2025-04-27 (Commit `46ef4da` by David Ryan)**: fix(ui): Fix branch dropdown selection functionality in view_commits template
<!-- AI_DATA_START
    {
      "hash": "46ef4da1729f0e13659cdec41a58893e597dcf3e",
      "short_message": "fix(ui): Fix branch dropdown selection functionality in view_commits template",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/view_commits.html",
          "status": "M"
        }
      ],
      "themes": [
        "UI/Frontend",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: UI/Frontend, BugFix
  - Files: M: viewer/templates/viewer/view_commits.html
- **2025-04-27 (Commit `662dd9b` by David Ryan)**: docs: Comprehensive analysis of Git Commit Viewer with prioritized mutations
<!-- AI_DATA_START
    {
      "hash": "662dd9b8c1317f8ac4d2bcd84b4a8eb5f8aa4cd9",
      "short_message": "docs: Comprehensive analysis of Git Commit Viewer with prioritized mutations",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer_analysis.md",
          "status": "D"
        }
      ],
      "themes": [
        "Documentation"
      ]
    }
  AI_DATA_END -->
  - Themes: Documentation
  - Files: D: git_commit_viewer_analysis.md
- **2025-04-27 (Commit `8e49f50` by David Ryan)**: fix: Rename duplicate URL patterns to prevent resolution conflicts
<!-- AI_DATA_START
    {
      "hash": "8e49f508d2fa058de4a0fced68116dbc4a45c19b",
      "short_message": "fix: Rename duplicate URL patterns to prevent resolution conflicts",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/urls.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/urls.py
- **2025-04-27 (Commit `c7ebc16` by David Ryan)**: fix: Update URL reference in fetch_commits.html template
<!-- AI_DATA_START
    {
      "hash": "c7ebc1682d316386c738ac3ad1ea4aa1601c47a3",
      "short_message": "fix: Update URL reference in fetch_commits.html template",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/fetch_commits.html",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/templates/viewer/fetch_commits.html
- **2025-04-27 (Commit `ad38aea` by David Ryan)**: fix: Update URL reference in list_repositories.html template
<!-- AI_DATA_START
    {
      "hash": "ad38aea7f36f625ae621e46429f8c1583252b064",
      "short_message": "fix: Update URL reference in list_repositories.html template",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/list_repositories.html",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/templates/viewer/list_repositories.html
- **2025-04-27 (Commit `6f45be6` by David Ryan)**: fix: Update URL reference in views.py
<!-- AI_DATA_START
    {
      "hash": "6f45be6217c5c343268b49e0cd76f39e9028d86a",
      "short_message": "fix: Update URL reference in views.py",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: viewer/views.py
- **2025-04-27 (Commit `7503cc7` by David Ryan)**: fix: Add missing commit_detail_full.html template
<!-- AI_DATA_START
    {
      "hash": "7503cc7450063e01f5d4e427c5ee1ab59c80f966",
      "short_message": "fix: Add missing commit_detail_full.html template",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/commit_detail_full.html",
          "status": "D"
        }
      ],
      "themes": [
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature, BugFix
  - Files: D: viewer/templates/viewer/commit_detail_full.html
- **2025-04-27 (Commit `4841abd` by David Ryan)**: fix: Add Git repository path validation
<!-- AI_DATA_START
    {
      "hash": "4841abd057324937e2f89d9ece9ea79c8090cadd",
      "short_message": "fix: Add Git repository path validation",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature, BugFix
  - Files: M: viewer/views.py
- **2025-04-27 (Commit `ab31807` by David Ryan)**: fix: Improve error handling for initial commits with no parents
<!-- AI_DATA_START
    {
      "hash": "ab31807ded52b624f315f26fcd41aedaf9531ce6",
      "short_message": "fix: Improve error handling for initial commits with no parents",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement, BugFix
  - Files: M: viewer/views.py
- **2025-04-27 (Commit `60fc514` by David Ryan)**: fix: Refactor data storage and add performance optimizations
<!-- AI_DATA_START
    {
      "hash": "60fc5147640958ba5eff4118e50568df0225e176",
      "short_message": "fix: Refactor data storage and add performance optimizations",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/migrations/0004_alter_commit_commit_date_filechange.py",
          "status": "D"
        },
        {
          "path": "viewer/models.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature",
        "Refactor/Improvement",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature, Refactor/Improvement, BugFix
  - Files: D: viewer/migrations/0004_alter_commit_commit_date_filechange.py, M: viewer/models.py
- **2025-04-27 (Commit `b64b65b` by David Ryan)**: chore: Apply database migrations
<!-- AI_DATA_START
    {
      "hash": "b64b65b90cd5f8eb4a48ec19a133234663ec5c3b",
      "short_message": "chore: Apply database migrations",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
- **2025-04-27 (Commit `76068c2` by David Ryan)**: feat: Update fetch_commits to populate FileChange records
<!-- AI_DATA_START
    {
      "hash": "76068c2ff010f964536fac868883d30f6f8ad960",
      "short_message": "feat: Update fetch_commits to populate FileChange records",
      "author": "David Ryan",
      "date_iso": "2025-04-27",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: viewer/views.py
- **2025-04-26 (Commit `2088959` by David Ryan)**: Create fetch_commits template for Git Commit Viewer
<!-- AI_DATA_START
    {
      "hash": "2088959da99728c7668f3dd0f8c536ba02b6e10f",
      "short_message": "Create fetch_commits template for Git Commit Viewer",
      "author": "David Ryan",
      "date_iso": "2025-04-26",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/fetch_commits.html",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: viewer/templates/viewer/fetch_commits.html
- **2025-04-26 (Commit `fbdb9c9` by David Ryan)**: Create view_commits template for Git Commit Viewer
<!-- AI_DATA_START
    {
      "hash": "fbdb9c95b203921781339c1c47a26c3227dca49c",
      "short_message": "Create view_commits template for Git Commit Viewer",
      "author": "David Ryan",
      "date_iso": "2025-04-26",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/view_commits.html",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: viewer/templates/viewer/view_commits.html
- **2025-04-26 (Commit `bd55d3d` by David Ryan)**: Update views for HTMX integration in Git Commit Viewer
<!-- AI_DATA_START
    {
      "hash": "bd55d3dea0fce9dd654b155354f75146edf4a2b4",
      "short_message": "Update views for HTMX integration in Git Commit Viewer",
      "author": "David Ryan",
      "date_iso": "2025-04-26",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/views.py
- **2025-04-26 (Commit `8a97c2d` by David Ryan)**: Create commit_detail template for Git Commit Viewer
<!-- AI_DATA_START
    {
      "hash": "8a97c2d25c1dc55eb9eb6a9f26f432d451f98a4d",
      "short_message": "Create commit_detail template for Git Commit Viewer",
      "author": "David Ryan",
      "date_iso": "2025-04-26",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/commit_detail.html",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: viewer/templates/viewer/commit_detail.html
- **2025-04-26 (Commit `6e87720` by David Ryan)**: Update URL patterns for HTMX integration in Git Commit Viewer
<!-- AI_DATA_START
    {
      "hash": "6e8772073103f5d342a116dd3952e5c27dd2a033",
      "short_message": "Update URL patterns for HTMX integration in Git Commit Viewer",
      "author": "David Ryan",
      "date_iso": "2025-04-26",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/urls.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/urls.py
- **2025-04-26 (Commit `937915a` by David Ryan)**: Update main URL configuration for Git Commit Viewer
<!-- AI_DATA_START
    {
      "hash": "937915a73126a1d8eabac20a68e75adf82dfa124",
      "short_message": "Update main URL configuration for Git Commit Viewer",
      "author": "David Ryan",
      "date_iso": "2025-04-26",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer/urls.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: git_commit_viewer/urls.py
- **2025-04-26 (Commit `ad84f29` by David Ryan)**: Enhance view_commits template with pagination and clickable commit items
<!-- AI_DATA_START
    {
      "hash": "ad84f29f700821a80ca9576df391afa53f513849",
      "short_message": "Enhance view_commits template with pagination and clickable commit items",
      "author": "David Ryan",
      "date_iso": "2025-04-26",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/view_commits.html",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/templates/viewer/view_commits.html
- **2025-04-26 (Commit `091ea06` by David Ryan)**: Implement pagination in view_commits function
<!-- AI_DATA_START
    {
      "hash": "091ea06de318896d9564ef01e020ddf0f9e05b6d",
      "short_message": "Implement pagination in view_commits function",
      "author": "David Ryan",
      "date_iso": "2025-04-26",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": ".gitignore",
          "status": "M"
        },
        {
          "path": "viewer/views.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: .gitignore, M: viewer/views.py
- **2025-04-26 (Commit `b741e57` by David Ryan)**: Create view_commits_full.html template for full page loads
<!-- AI_DATA_START
    {
      "hash": "b741e575b3a31c89aff5123e9a3ace32a4475e6b",
      "short_message": "Create view_commits_full.html template for full page loads",
      "author": "David Ryan",
      "date_iso": "2025-04-26",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/migrations/0001_initial.py",
          "status": "D"
        },
        {
          "path": "viewer/templates/viewer/view_commits_full.html",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: viewer/migrations/0001_initial.py, D: viewer/templates/viewer/view_commits_full.html
- **2025-04-26 (Commit `bc4e548` by David Ryan)**: Update view_commits template to use urlencode filter for branch names
<!-- AI_DATA_START
    {
      "hash": "bc4e5484dd7cd934fcd54361792eec2098f76f0a",
      "short_message": "Update view_commits template to use urlencode filter for branch names",
      "author": "David Ryan",
      "date_iso": "2025-04-26",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/view_commits.html",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/templates/viewer/view_commits.html
- **2025-04-26 (Commit `4abab2c` by David Ryan)**: Update URL pattern for view_commits to handle special characters in branch names
<!-- AI_DATA_START
    {
      "hash": "4abab2c9e8fc86c1bbb882d7db3469593b1fdc4c",
      "short_message": "Update URL pattern for view_commits to handle special characters in branch names",
      "author": "David Ryan",
      "date_iso": "2025-04-26",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/urls.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: viewer/urls.py
- **2025-04-25 (Commit `5204d65` by David Ryan)**: Update Django version to 5.2 in requirements.txt
<!-- AI_DATA_START
    {
      "hash": "5204d65fe527b205736a7f222e424d8dfb3f6702",
      "short_message": "Update Django version to 5.2 in requirements.txt",
      "author": "David Ryan",
      "date_iso": "2025-04-25",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "requirements.txt",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: requirements.txt
- **2025-04-25 (Commit `acfc85b` by David Ryan)**: Update Django settings for Git Commit Viewer
<!-- AI_DATA_START
    {
      "hash": "acfc85b6c574aaeeadda648af27e84a66cd35bae",
      "short_message": "Update Django settings for Git Commit Viewer",
      "author": "David Ryan",
      "date_iso": "2025-04-25",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer/settings.py",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: git_commit_viewer/settings.py
- **2025-04-25 (Commit `cf5a83a` by David Ryan)**: Create Django models for Git Commit Viewer
<!-- AI_DATA_START
    {
      "hash": "cf5a83a25ba57e5ebea794972bc090c5a36f966a",
      "short_message": "Create Django models for Git Commit Viewer",
      "author": "David Ryan",
      "date_iso": "2025-04-25",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/models.py",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: viewer/models.py
- **2025-04-25 (Commit `03ccb1a` by David Ryan)**: Create Django views for Git Commit Viewer
<!-- AI_DATA_START
    {
      "hash": "03ccb1aa96ee5819ea3530984807858a1edcab37",
      "short_message": "Create Django views for Git Commit Viewer",
      "author": "David Ryan",
      "date_iso": "2025-04-25",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/views.py",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: viewer/views.py
- **2025-04-25 (Commit `66e9081` by David Ryan)**: Create URL patterns for Git Commit Viewer
<!-- AI_DATA_START
    {
      "hash": "66e908161ea8cebb07758fd8f1d68fe0e40285fa",
      "short_message": "Create URL patterns for Git Commit Viewer",
      "author": "David Ryan",
      "date_iso": "2025-04-25",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/urls.py",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: viewer/urls.py
- **2025-04-25 (Commit `43ce024` by David Ryan)**: Add Django project structure files
<!-- AI_DATA_START
    {
      "hash": "43ce024e5b5e3e3910ad0ade38366d59b5a1657c",
      "short_message": "Add Django project structure files",
      "author": "David Ryan",
      "date_iso": "2025-04-25",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer/__init__.py",
          "status": "D"
        },
        {
          "path": "git_commit_viewer/asgi.py",
          "status": "D"
        },
        {
          "path": "git_commit_viewer/urls.py",
          "status": "D"
        },
        {
          "path": "git_commit_viewer/wsgi.py",
          "status": "D"
        },
        {
          "path": "manage.py",
          "status": "D"
        },
        {
          "path": "viewer/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/admin.py",
          "status": "D"
        },
        {
          "path": "viewer/apps.py",
          "status": "D"
        },
        {
          "path": "viewer/migrations/__init__.py",
          "status": "D"
        },
        {
          "path": "viewer/tests.py",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: git_commit_viewer/__init__.py, D: git_commit_viewer/asgi.py, D: git_commit_viewer/urls.py...
- **2025-04-25 (Commit `3e6b845` by David Ryan)**: Create base HTML template with HTMX integration
<!-- AI_DATA_START
    {
      "hash": "3e6b845fa162028ec878d192262d8f51c4f4020b",
      "short_message": "Create base HTML template with HTMX integration",
      "author": "David Ryan",
      "date_iso": "2025-04-25",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/base.html",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: viewer/templates/viewer/base.html
- **2025-04-25 (Commit `a2c6439` by David Ryan)**: Create index template for Git Commit Viewer
<!-- AI_DATA_START
    {
      "hash": "a2c6439afe5633b34f3aeb7028733672ae9bb644",
      "short_message": "Create index template for Git Commit Viewer",
      "author": "David Ryan",
      "date_iso": "2025-04-25",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "viewer/templates/viewer/index.html",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: viewer/templates/viewer/index.html
- **2025-04-24 (Commit `f6fbd47` by David Ryan)**: Transform git_commit_viewer.py into a Streamlit application
<!-- AI_DATA_START
    {
      "hash": "f6fbd478108949f6022a4d02d706a0e8e731d1a6",
      "short_message": "Transform git_commit_viewer.py into a Streamlit application",
      "author": "David Ryan",
      "date_iso": "2025-04-24",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: git_commit_viewer.py
- **2025-04-24 (Commit `416d367` by David Ryan)**: Fix database schema mismatch and update commit storage
<!-- AI_DATA_START
    {
      "hash": "416d3676e984a3e40be15667137b9e7fd71b82ab",
      "short_message": "Fix database schema mismatch and update commit storage",
      "author": "David Ryan",
      "date_iso": "2025-04-24",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer.py",
          "status": "M"
        }
      ],
      "themes": [
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: BugFix
  - Files: M: git_commit_viewer.py
- **2025-04-24 (Commit `d629867` by David Ryan)**: Enhance UI with repository list and improved layout
<!-- AI_DATA_START
    {
      "hash": "d62986738b4f01b1057eda4456a6314528ac00e1",
      "short_message": "Enhance UI with repository list and improved layout",
      "author": "David Ryan",
      "date_iso": "2025-04-24",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer.py",
          "status": "M"
        }
      ],
      "themes": [
        "UI/Frontend",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: UI/Frontend, Refactor/Improvement
  - Files: M: git_commit_viewer.py
- **2025-04-24 (Commit `86c865d` by David Ryan)**: Add results.md to .gitignore
<!-- AI_DATA_START
    {
      "hash": "86c865d5aa3123c7363902c792d5d49b6cf38128",
      "short_message": "Add results.md to .gitignore",
      "author": "David Ryan",
      "date_iso": "2025-04-24",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": ".gitignore",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: .gitignore
- **2025-04-24 (Commit `c18b19e` by David Ryan)**: Add README.md with project description and usage instructions
<!-- AI_DATA_START
    {
      "hash": "c18b19e99800e33d4fa6e94dcc3825203a226065",
      "short_message": "Add README.md with project description and usage instructions",
      "author": "David Ryan",
      "date_iso": "2025-04-24",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "README.md",
          "status": "D"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: D: README.md
- **2025-04-24 (Commit `bf3944c` by David Ryan)**: Refactor UI and improve date formatting
<!-- AI_DATA_START
    {
      "hash": "bf3944c149dd7569e2699e5db41e3c89855455c0",
      "short_message": "Refactor UI and improve date formatting",
      "author": "David Ryan",
      "date_iso": "2025-04-24",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer.py",
          "status": "M"
        }
      ],
      "themes": [
        "UI/Frontend",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: UI/Frontend, Refactor/Improvement
  - Files: M: git_commit_viewer.py
- **2025-04-24 (Commit `c041025` by David Ryan)**: Enhance UI and improve repository/branch selection
<!-- AI_DATA_START
    {
      "hash": "c041025cf21c6488be68894440880e148d445f1e",
      "short_message": "Enhance UI and improve repository/branch selection",
      "author": "David Ryan",
      "date_iso": "2025-04-24",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer.py",
          "status": "M"
        }
      ],
      "themes": [
        "UI/Frontend",
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: UI/Frontend, Refactor/Improvement
  - Files: M: git_commit_viewer.py
- **2025-04-23 (Commit `4eb8fde` by David Ryan)**: Create git_commit_viewer.py script
<!-- AI_DATA_START
    {
      "hash": "4eb8fde0d557743a88b66326c4d89df1d0e34a5b",
      "short_message": "Create git_commit_viewer.py script",
      "author": "David Ryan",
      "date_iso": "2025-04-23",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer.py",
          "status": "A"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: A: git_commit_viewer.py
- **2025-04-23 (Commit `69e7d52` by David Ryan)**: Update .gitignore for Python and macOS
<!-- AI_DATA_START
    {
      "hash": "69e7d52422c1e4e782dd7d67be4660d0e4f1c4e0",
      "short_message": "Update .gitignore for Python and macOS",
      "author": "David Ryan",
      "date_iso": "2025-04-23",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": ".gitignore",
          "status": "D"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: D: .gitignore
- **2025-04-23 (Commit `ebfc551` by David Ryan)**: Enhance git_commit_viewer.py with repository and branch support
<!-- AI_DATA_START
    {
      "hash": "ebfc551400785e39660fd6a0c2dd88d52a420586",
      "short_message": "Enhance git_commit_viewer.py with repository and branch support",
      "author": "David Ryan",
      "date_iso": "2025-04-23",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer.py",
          "status": "M"
        }
      ],
      "themes": [
        "General Update"
      ]
    }
  AI_DATA_END -->
  - Themes: General Update
  - Files: M: git_commit_viewer.py
- **2025-04-23 (Commit `dc9de21` by David Ryan)**: Fix database schema and improve user feedback
<!-- AI_DATA_START
    {
      "hash": "dc9de2149a439936ede4464729c8f1370d529e79",
      "short_message": "Fix database schema and improve user feedback",
      "author": "David Ryan",
      "date_iso": "2025-04-23",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement",
        "BugFix"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement, BugFix
  - Files: M: git_commit_viewer.py
- **2025-04-23 (Commit `50e49a4` by David Ryan)**: Improve user feedback when no query is provided
<!-- AI_DATA_START
    {
      "hash": "50e49a4e5c4ac5a30ce9aa36b65294fc90fe6c85",
      "short_message": "Improve user feedback when no query is provided",
      "author": "David Ryan",
      "date_iso": "2025-04-23",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer.py",
          "status": "M"
        }
      ],
      "themes": [
        "Refactor/Improvement"
      ]
    }
  AI_DATA_END -->
  - Themes: Refactor/Improvement
  - Files: M: git_commit_viewer.py
- **2025-04-23 (Commit `d28d374` by David Ryan)**: Add result limiting and Markdown export features
<!-- AI_DATA_START
    {
      "hash": "d28d374436137253cf973abb025f8e08016892c6",
      "short_message": "Add result limiting and Markdown export features",
      "author": "David Ryan",
      "date_iso": "2025-04-23",
      "semantic_tags": [],
      "files_changed": [
        {
          "path": "git_commit_viewer.py",
          "status": "M"
        }
      ],
      "themes": [
        "Feature"
      ]
    }
  AI_DATA_END -->
  - Themes: Feature
  - Files: M: git_commit_viewer.py

**Overall Themes for Period:**
<!-- AI_DATA_START
  {
    "themes_summary": [
      {
        "theme": "General Update",
        "count": 45
      },
      {
        "theme": "BugFix",
        "count": 14
      },
      {
        "theme": "Feature",
        "count": 13
      },
      {
        "theme": "Refactor/Improvement",
        "count": 8
      },
      {
        "theme": "UI/Frontend",
        "count": 5
      },
      {
        "theme": "Documentation",
        "count": 1
      }
    ]
  }
AI_DATA_END -->
- General Update: 45 mentions/commits
- BugFix: 14 mentions/commits
- Feature: 13 mentions/commits
- Refactor/Improvement: 8 mentions/commits
- UI/Frontend: 5 mentions/commits
- Documentation: 1 mentions/commits

---
