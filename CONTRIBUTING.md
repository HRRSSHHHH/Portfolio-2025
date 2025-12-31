# Development Workflow Best Practices

You are absolutely right! The "Feature Branch Workflow" is the industry standard for maintaining a healthy codebase.

## 🌳 The Branching Strategy

### 1. `main` Branch (Production)
- **Status**: Always stable, always working.
- **Rule**: NEVER push directly to `main` while working on new complex features.
- **Purpose**: This branch represents the "Live" version of your website. If you need to revert, you reset to the latest commit on main.

### 2. Feature Branches (Development)
- **Naming Convention**: `feat/feature-name` or `fix/bug-name` (e.g., `feat/contact-page`, `fix/navbar-spacing`).
- **Rule**: Create a new branch for **every** new task or experiment.
- **Purpose**: allows you to break things without breaking the `main` website.

## 🔄 The Cycle

1. **Start**: Switch to main and pull latest.
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Branch**: Create your workspace.
   ```bash
   git checkout -b feat/my-new-feature
   ```
3. **Work**: Code, break stuff, fix stuff.
4. **Save**: Stage and Commit.
   ```bash
   git add .
   git commit -m "Added cool animation"
   ```
5. **Sanity Check**: Merge to main ONLY when perfect.
   ```bash
   git checkout main
   git merge feat/my-new-feature
   ```
6. **Push**:
   ```bash
   git push origin main
   ```

## 🏷️ Releasing (Versioning)
When you reach a major milestone (like today), you tag it.
```bash
git tag v2.1
git push origin v2.1
```

## ⏪ Switching Versions (Time Travel)

Since we are using this workflow, going back to a working version is instant.

### Option 1: Go back to the latest stable code
```bash
git checkout main
```

### Option 2: Go back to a specific version (e.g., v2.0)
```bash
git checkout v2.0
```
*(This puts you in "detached HEAD" state. If you want to make fixes here, create a branch: `git checkout -b fix/v2.0-hotfix v2.0`)*

