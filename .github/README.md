# ⚙️ .github

This folder contains GitHub-specific configuration files for repository automation, security, and maintenance.

## Contents

| File | Purpose |
|------|---------|
| `dependabot.yml` | Automated dependency update configuration |

---

## Dependabot

[Dependabot](https://docs.github.com/en/code-security/dependabot) is configured to automatically monitor npm dependencies in this project and open pull requests when updates are available. This keeps the build pipeline secure and all packages current without requiring manual monitoring.

### What It Does

- Scans `package.json` and `package-lock.json` for outdated npm packages
- Automatically opens PRs with dependency version bumps
- Keeps the Eleventy build environment and all plugins up to date
- Flags security vulnerabilities in dependencies early

### Workflow

```
Dependabot detects outdated package
        ↓
Opens a PR with the version bump
        ↓
You review and merge (or dismiss)
        ↓
Vercel/Netlify rebuilds with updated deps
```

> ℹ️ No manual action is required here. This folder is managed automatically by GitHub. If you fork this repo, Dependabot will activate for your fork as well once you enable it in your repository's **Settings → Code security and analysis**.
