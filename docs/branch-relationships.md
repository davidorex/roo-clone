# Branch Relationships Analysis

## Repository Structure

- **Origin Repository**: https://github.com/davidorex/roo-clone.git (fork)
- **Upstream Repository**: https://github.com/RooCodeInc/Roo-Code.git (original)

## Local Branches

### Main Branches

1. **main**

    - Tracks: `upstream/main`
    - Latest commit: `c67356991` "Update contributors list (#4164)"
    - Purpose: Local version of the canonical upstream repository

2. **my-main**
    - Tracks: `origin/my-main`
    - Latest commit: `5eb4699cc` "add pre-merge prep ideas to have a process for easing merge conflict resolutions on a pre-merge branch."
    - Purpose: User's customized version of the repo

### June Branches (Created for Merge Preparation)

3. **jun-2-main**

    - Created from: `main`
    - Latest commit: `ce2e113fb` "scripts output"
    - Purpose: Working branch based on upstream main

4. **june-2-merge**
    - Created from: `my-main`
    - Latest commit: `5eb4699cc` "add pre-merge prep ideas to have a process for easing merge conflict resolutions on a pre-merge branch."
    - Purpose: Working branch based on customized main

## Branch Relationships

### Divergence Point

- Common ancestor between `main` and `my-main`: `68b60a274` "Add unsaved settings warning to codebase indexing settings view (#3944)"
- Date of divergence: May 24, 2025 (approximately 9 days ago)
- This is also the common ancestor between `jun-2-main` and `june-2-merge`

### Commit Differences

- `main` has 125 commits that are not in `my-main`
- `my-main` has 125 commits that are not in `main`
- This represents approximately 1-2 weeks of divergent development

### Recent Development Focus

- **main/jun-2-main**: Recent commits focus on version bumps, UI changes, and contributor updates
- **my-main/june-2-merge**: Recent commits focus on merge conflict analysis and preparation

## Remote Tracking

- `main` → tracks → `upstream/main`
- `my-main` → tracks → `origin/my-main`
- `jun-2-main` → no remote tracking
- `june-2-merge` → no remote tracking

## Summary

The repository has two primary development lines:

1. The canonical upstream (`main` and its derivative `jun-2-main`)
2. The customized fork (`my-main` and its derivative `june-2-merge`)

These branches diverged on May 24, 2025, and have since developed independently with 125 unique commits on each side. The June branches (`jun-2-main` and `june-2-merge`) were created to prepare for a potential merge between the two development lines.

## Merge Purpose

The primary goal of merging these branches is to:

1. **Incorporate Upstream Developments**: Take advantage of all the latest developments, bug fixes, and features from the upstream/main branch
2. **Preserve Custom Features**: Retain all the custome features that have been developed in my-main
3. **Maintain Compatibility**: Ensure that custom features continue to work with the latest upstream code. These will be specified in a subsequent investigation.

This approach allows for staying current with the canonical codebase while preserving the value of custom development work.
