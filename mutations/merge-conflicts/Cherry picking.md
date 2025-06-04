## Answer

Cherry picking can be used to selectively bring changes from main to my-main by:

1. Identifying non-conflicting commits in main that contain desired features
2. Using `git cherry-pick <commit-hash>` to apply specific commits to my-main
3. Focusing on commits that modify files not changed in my-main

Best practices:

- Cherry pick small, atomic commits rather than large changes
- Maintain clear commit messages to track what was cherry-picked
- Use `git cherry-pick -x` to reference original commits
- Apply related commits in sequence to maintain dependencies
- Resolve conflicts immediately after each cherry-pick

Benefits:

- Selective integration of specific features without full merge
- Avoids complex merge conflicts in heavily diverged branches
- Preserves custom features in my-main while adopting specific upstream improvements
- Allows gradual integration of changes for easier testing
- Creates cleaner history than multiple conflict-heavy merges
