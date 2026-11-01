# Branching Strategy: GitHub Flow

MediCart is a small team, so we use GitHub Flow. It has one long-lived branch and short-lived feature branches.

| Branch | Purpose | Rules |
|--------|---------|-------|
| `main` | Always deployable. Every push here is deployed automatically | Protected. No direct pushes. Pull request and passing CI required |
| `feature/<name>` | New functionality | Branch from `main`, merge back by pull request |
| `fix/<name>` | Bug fixes | Same as feature branches |

## How a change moves through the repository

1. Create a branch from `main`: `git checkout -b feature/add-search`
2. Commit small, clear changes.
3. Push the branch. The CI job (build + test) runs automatically.
4. Open a pull request into `main`. CI runs again as a required check.
5. If CI fails, the merge button is blocked. Fix and push again.
6. After review and a green check, merge. The merge triggers the CD job.
7. The CD job deploys the same image that passed CI to the EC2 server and runs a smoke test.
8. Delete the merged branch.

## Why not Git Flow?

Git Flow adds `develop`, `release` and `hotfix` branches. That suits scheduled
releases with several versions in support. MediCart ships continuously, so extra
long-lived branches would only add merge overhead and delay releases.

## Branch protection settings (GitHub > Settings > Branches > Add rule for `main`)

- Require a pull request before merging
- Require status checks to pass before merging: select **Build & Test**
- Require branches to be up to date before merging
