---
report_type: CurrentCodeSnapshot
generation_timestamp_iso: '2025-05-12T12:09:30.843815+00:00'
analysis_data_timestamps_iso:
  dependency_graph: '2025-05-11T22:32:01.190858+00:00'
  test_coverage: '2025-05-12T12:07:57.387430+00:00'
project_name: git-commit-viewer
summary_stats:
  total_modules_analyzed: 103
  overall_docstring_coverage_percentage: N/A
  overall_test_coverage_percentage: 0.0
---

# Current Code Snapshot: git-commit-viewer
Generated: 2025-05-12T12:09:30.843815+00:00
Analysis Data From (approximate latest):
- dependency_graph: 2025-05-11T22:32:01.190858+00:00
- test_coverage: 2025-05-12T12:07:57.387430+00:00


## 1. Project Overview & Health Summary
<!-- AI_DATA_START
  {
    "total_modules": 103,
    "doc_coverage": "N/A",
    "test_coverage": 0.0,
    "key_architectural_points": [
      {
        "name": "viewer.models",
        "dependents_count": 16,
        "dependencies_count": 2
      }
    ]
  }
AI_DATA_END -->
- Total Modules (from dep graph): 103
- Documentation Coverage: N/A
- Test Coverage: 0.0

## 2. Overall Architecture
<!-- AI_DATA_START
  {
    "key_subsystems": [
      {
        "name": "viewer",
        "module_count": 98
      },
      {
        "name": "git_commit_viewer",
        "module_count": 5
      }
    ],
    "central_modules": [
      {
        "name": "viewer.models",
        "dependents_count": 16,
        "dependencies_count": 2
      },
      {
        "name": "viewer.semantic.registry",
        "dependents_count": 10,
        "dependencies_count": 4
      },
      {
        "name": "viewer.semantic.linguistic",
        "dependents_count": 8,
        "dependencies_count": 0
      },
      {
        "name": "viewer.semantic.chunking",
        "dependents_count": 7,
        "dependencies_count": 0
      },
      {
        "name": "viewer.services.embedder_registry",
        "dependents_count": 7,
        "dependencies_count": 1
      }
    ],
    "architectural_concerns": [],
    "total_modules_analyzed_in_graph": 103
  }
AI_DATA_END -->
### Key Subsystems:
- viewer (98 modules)
- git_commit_viewer (5 modules)

### Central Modules (by dependents):
- `viewer.models` (Dependents: 16, Dependencies: 2)
- `viewer.semantic.registry` (Dependents: 10, Dependencies: 4)
- `viewer.semantic.linguistic` (Dependents: 8, Dependencies: 0)
- `viewer.semantic.chunking` (Dependents: 7, Dependencies: 0)
- `viewer.services.embedder_registry` (Dependents: 7, Dependencies: 1)


## 3. Key API Contracts
No API contract data loaded or components specified for summary.

## 4. Documentation Coverage
<!-- AI_DATA_START
  {
    "overall_coverage_percentage": "N/A",
    "key_undocumented_apis": []
  }
AI_DATA_END -->
- Overall Coverage: N/A


## 5. Test Coverage
<!-- AI_DATA_START
  {
    "overall_percentage": 0.0,
    "low_coverage_modules": []
  }
AI_DATA_END -->
- Overall Coverage: 0.0


## (Future) Code Complexity Hotspots
- Not Implemented

## (Future) Dead Code Summary
- Not Implemented

## (Future) Technology Stack
- Not Implemented
