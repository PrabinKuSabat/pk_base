# 📊 src/site/_data

Global [Eleventy data files](https://www.11ty.dev/docs/data-global/). Any `.json` or `.js` file placed in this directory is automatically made available as a named variable in every Nunjucks template across the site.

## Purpose

This directory is the **configuration and data layer** for the site templates. It typically holds:

- **Site metadata** — title, description, author name, canonical URL, social links
- **Navigation items** — links shown in the navbar
- **Environment-derived settings** — values loaded from `.env` via `src/helpers/userSetup.js`
- **Plugin-injected data** — note metadata and graph connection data pushed here by the Digital Garden plugin at build time

## How Eleventy Data Files Work

Eleventy reads every file in `_data/` and exposes it as a global template variable named after the file:

```
_data/meta.json  →  {{ meta.title }}, {{ meta.description }}
_data/user.js    →  {{ user.name }}, {{ user.repoLink }}
```

This means templates stay clean and logic-free — all configuration stays here.

## Example

```json
// _data/meta.json
{
  "title": "Prabin's Garden",
  "description": "Notes, thoughts, and ideas published from Obsidian.",
  "url": "https://prabins.vercel.app"
}
```

In any template:
```njk
<title>{{ meta.title }}</title>
<meta name="description" content="{{ meta.description }}">
```

---

> ⚠️ **Never store secrets here.** GitHub tokens and API keys must go in `.env` only — `.env` is listed in `.gitignore` and will not be committed.
