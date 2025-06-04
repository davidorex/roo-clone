# Branch Relationships

## Repository Structure

- **Origin Repository**: https://github.com/davidorex/roo-clone.git (fork)
- **Upstream Repository**: https://github.com/RooCodeInc/Roo-Code.git (original)

## Local Branches

### Main Branches

1. **main**

    - Tracks: `upstream/main`
    - Purpose: Local version of the canonical upstream repository

2. **my-main**
    - Tracks: `origin/my-main`
    - Purpose: User's customized version of the repo

## Branch Relationships

### Divergence Point

- Common ancestor between `main` and `my-main`: `68b60a274` "Add unsaved settings warning to codebase indexing settings view (#3944)"

## Remote Tracking

- `main` → tracks → `upstream/main`
- `my-main` → tracks → `origin/my-main`
- `jun-2-main` → no remote tracking
- `june-2-merge` → no remote tracking

## Summary

The repository has two development lines:

1. The canonical upstream (`main`)
2. The customized fork (`my-main`)

## Merge Purpose

The primary goal of merging these branches is to:

1. **Incorporate Upstream Developments**: Evaluate and take advantage of latest developments, bug fixes, and features from the upstream/main branch as needed. Generally favor all.
2. **Preserve Custom Features**: Retain all the custom features that have been developed in my-main. If necessary and the opportunity arises, evaluate refactoring possibities to adhere to existing patterns in upstream so that custom implementations are in exact alignment
3. **Maintain Compatibility**: Ensure that custom features continue to work with the latest upstream code.
4. **Refine pre-merge preparatory steps**: envision a process of merging that reduces conflicts and maintains customizations. Consider a process of programmatic re-implementation of custom features into updated upstream rather than merge conflict resolution.

Stay current with upstream dev while preserving custom features.

Document exact specifics of customizations -- by file or by feature?

Pause after state change tool use
System prompt component differences
System prompt language differences
Tasks.ts differences.
Git info in env. details.
Code analysis output file paths in system prompt
Commit message reminder language
