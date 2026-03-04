# 🧩 src/site/_includes

Nunjucks layout templates and reusable UI component partials. This is where the entire HTML structure of the site is defined — from the outermost page shell down to individual UI widgets.

## Purpose

[Eleventy](https://www.11ty.dev/) treats this as the **layouts and partials directory**. It contains:

- **Page layouts** — the base HTML shell that wraps every page (`<html>`, `<head>`, `<body>`)
- **Content layouts** — wrappers specific to notes, home page, graph page
- **UI components** — self-contained partials for each section of the interface

## How Layouts Work

Any note or page can reference a layout in its frontmatter:

```yaml
---
layout: layouts/note.njk
title: My Note Title
---
```

Eleventy resolves `layouts/note.njk` relative to this `_includes/` folder, injects the page's content at `{{ content | safe }}`, and outputs the final HTML.

## Component System

Components are individual `.njk` partial files that layouts pull in with `{% include %}`. Each component corresponds to one UI section:

| Component Area | Description |
|----------------|-------------|
| Navbar | Top navigation bar with logo, search button, theme toggle |
| Filetree sidebar | Left collapsible folder/note navigation |
| TOC | Right-side floating table of contents |
| Graph widget | Mini knowledge graph in the right sidebar |
| Backlinks | "What links here" panel in the right sidebar |
| Search modal | Full-screen search overlay |
| Transclusion | Inline embedded note renderer |

---

> 🎨 When customizing the site's structure, adding new sections, or building new UI components, this is the primary folder to work in. Keep each component in its own file for maintainability.
