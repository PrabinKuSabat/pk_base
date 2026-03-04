# 🛠️ src/helpers

Server-side JavaScript utility modules consumed by the [Eleventy](https://www.11ty.dev/) build pipeline. These modules run **exclusively at build time** — they are never shipped to the browser.

## Files

| File | Purpose |
|------|---------|
| `constants.js` | Shared constant values (paths, keys, defaults) used across the build |
| `filetreeUtils.js` | Recursively builds the nested file tree object for the left-sidebar navigation |
| `linkUtils.js` | Resolves Obsidian-style `[[wiki links]]` into proper HTML `<a>` tags with correct relative URLs |
| `userSetup.js` | Reads and validates user configuration from `.env` (GitHub token, repo name, base URL, etc.) |
| `userUtils.js` | Small lookup helpers for user-specific data |
| `utils.js` | General-purpose helpers: slugification, path normalization, string manipulation |

---

## Key Responsibilities

### Link Resolution — `linkUtils.js`
Obsidian notes use `[[Page Name]]` wiki-link syntax. This module converts those references into proper relative HTML links during the build so they work correctly on the published site.

### File Tree — `filetreeUtils.js`
Reads the `src/site/notes/` directory recursively and constructs a nested JSON tree that the left sidebar Nunjucks template uses to render the collapsible folder navigation.

### User Config — `userSetup.js`
Loads environment variables from `.env` so the Digital Garden plugin can authenticate to GitHub and push notes to the correct repository. Variables include the GitHub Personal Access Token, repository owner, repository name, and site base URL.

### General Utils — `utils.js`
Small, pure functions used in multiple places — converting note titles to URL slugs, normalizing file paths across OS, trimming whitespace, etc.

---

> These utilities are imported by `.eleventy.js` at the project root. If you extend the build (e.g. adding a custom Eleventy filter or a new data source), place the supporting logic here.
