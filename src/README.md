# 📦 src

The `src` directory is the heart of the project. All build-time logic and site source files live here. [Eleventy (11ty)](https://www.11ty.dev/) reads this directory to generate the final static site.

## Structure

```
src/
├── helpers/   # Server-side JavaScript utility modules (build-time only)
└── site/      # Eleventy source: templates, notes, styles, scripts, assets
```

## Overview

| Folder | Role |
|--------|------|
| `helpers/` | Build-time JS utilities — link processing, filetree construction, constants, user config loading |
| `site/` | The Eleventy input directory — all templates, notes, styles, scripts, and static assets |

## How It Fits Together

Eleventy is configured in `.eleventy.js` at the root of the project. It points to `src/site/` as its input and uses the modules inside `src/helpers/` as custom filters and data processors during the build. The output is a fully static HTML/CSS/JS site ready for deployment on any CDN.

> Any file or folder you add here becomes part of the build pipeline. Files outside `src/` (like `netlify.toml`, `vercel.json`, `package.json`) are deployment and tooling configs only.
