# ⚡ src/site/scripts

Client-side JavaScript files that power all interactive features in the browser. These scripts are served as static assets and run in the user's browser — not at build time.

## Features Powered Here

| Feature | Description |
|---------|-------------|
| **Full-text Search** | Real-time search across all published notes using a pre-built JSON index |
| **Knowledge Graph** | Interactive D3.js-powered graph visualizing connections between notes |
| **Theme Toggle** | Dark / light mode switching with OS `prefers-color-scheme` detection |
| **Filetree Interactions** | Expand/collapse folder nodes in the left sidebar without page reload |
| **Transclusion** | Inline rendering of `![[embedded note]]` references |
| **Copy Code** | One-click copy button on all code blocks |

---

## Philosophy

Scripts here are written to be **lightweight and dependency-minimal**. The goal is sub-second page loads with no heavy frameworks. The approach is vanilla JavaScript with carefully chosen micro-libraries only where genuinely necessary (e.g., D3.js for the graph).

---

## Adding a Custom Script

1. Create your `.js` file in this directory
2. Reference it in the appropriate layout in `src/site/_includes/`:
   ```html
   <script src="/scripts/my-script.js" defer></script>
   ```
3. Eleventy copies it to the build output automatically

---

> 🏎️ Keep scripts small and single-purpose. One script = one concern. Avoid bundling unrelated logic together — it makes debugging and future customization much easier.
