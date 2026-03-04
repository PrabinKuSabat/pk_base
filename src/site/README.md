# 🌐 src/site

The Eleventy input directory. Everything here is either copied directly to the build output or processed by Eleventy's [Nunjucks](https://mozilla.github.io/nunjucks/) template engine to generate the final static HTML pages.

## Structure

```
site/
├── _data/           # Global Eleventy data files (JSON/JS) available to all templates
├── _includes/       # Nunjucks layouts and reusable UI component partials
├── img/             # Static site-wide image assets
├── notes/           # Auto-managed: your published Obsidian notes (Markdown)
├── scripts/         # Client-side JavaScript (search, graph, theme toggle)
├── styles/          # SCSS stylesheets and CSS variable overrides
├── 404.njk          # Custom 404 error page
├── feed.njk         # RSS/Atom feed template → outputs /feed.xml
├── graph.njk        # Full-screen knowledge graph page
├── get-theme.js     # Inline theme detection script (served as static JS)
├── search-index.njk # Generates search-index.json for full-text search
└── sitemap.njk      # XML sitemap for SEO → outputs /sitemap.xml
```

---

## Key Template Files

| File | Output | Description |
|------|--------|-------------|
| `404.njk` | `/404.html` | Branded custom 404 error page |
| `feed.njk` | `/feed.xml` | RSS feed for note subscribers |
| `graph.njk` | `/graph` | Full-screen interactive knowledge graph |
| `search-index.njk` | `/search-index.json` | Pre-built search corpus for client-side search |
| `sitemap.njk` | `/sitemap.xml` | Search engine sitemap |

---

## Important Notes

- **`notes/`** is managed automatically by the [Digital Garden Obsidian Plugin](https://github.com/oleeskild/Obsidian-Digital-Garden). Do not manually edit files there.
- **`_data/`** and **`_includes/`** are special Eleventy directories — their naming is required by the framework.
- To add a new static page, create a `.njk` file here referencing a layout from `_includes/`.

> For a deeper dive into any subdirectory, see its own `README.md`.
