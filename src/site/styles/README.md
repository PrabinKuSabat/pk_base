# 🎨 src/site/styles

All SCSS stylesheets and CSS variable definitions. This is your **primary customization interface** for the site's entire visual design — from colors and typography to layout dimensions and component sizing.

## Files

| File | Purpose |
|------|---------|
| `custom-style.scss` | **Your customization file** — override CSS variables and add custom rules here |
| Other `.scss` files | Base theme styles from the Digital Garden template — avoid editing these directly |

---

## How to Customize

Add all your overrides to `custom-style.scss`. This file is intentionally kept separate so your changes survive template updates cleanly:

```scss
body {
  /* Colors */
  --background-primary: #0f0f0f;
  --background-secondary: #1a1a1a;
  --text-normal: #e2e2e2;
  --text-accent: #7c6af7;
  --link-color: #7c6af7;

  /* Layout */
  --dg-content-max-width: 800px;
  --dg-content-font-size: 16px;

  /* Filetree */
  --dg-filetree-width: 260px;
}
```

---

## CSS Variable Reference

### Color Variables

| Variable | Description |
|----------|-------------|
| `--text-normal` | Normal text color |
| `--text-muted` | Muted / secondary text |
| `--text-faint` | Faint / tertiary text |
| `--text-accent` | Accent / highlight color |
| `--text-accent-hover` | Accent hover state |
| `--link-color` | Hyperlink color |
| `--link-color-hover` | Hyperlink hover color |
| `--link-unresolved-color` | Unresolved wiki link color |
| `--background-primary` | Main page background |
| `--background-secondary` | Secondary surface background |
| `--interactive-accent` | Interactive element accent |
| `--interactive-accent-hover` | Interactive accent hover |

### Layout Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--dg-content-max-width` | `700px` | Max width of the content area |
| `--dg-content-margin-top` | `90px` | Top margin for content |
| `--dg-content-font-size` | `18px` | Base content font size |
| `--dg-content-line-height` | `1.5` | Content line height |

### Filetree (Left Sidebar) Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--dg-filetree-width` | `250px` | Filetree sidebar width |
| `--dg-filetree-padding` | `10px 20px` | Filetree padding |
| `--dg-filetree-title-size` | `32px` | Filetree title font size |
| `--dg-filetree-gap` | `80px` | Gap from content |

### Right Sidebar Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--dg-sidebar-max-width` | `350px` | Right sidebar max width |
| `--dg-sidebar-gap` | `80px` | Gap between content and sidebar |
| `--dg-sidebar-top` | `75px` | Sidebar top offset |

### Graph Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--dg-graph-width` | `250px` | Graph widget width |
| `--dg-graph-height` | `250px` | Graph widget height |
| `--dg-graph-border-radius` | `10px` | Graph border radius |
| `--dg-graph-fullscreen-width` | `600px` | Fullscreen graph width |
| `--dg-graph-fullscreen-height` | `600px` | Fullscreen graph height |

### TOC Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--dg-toc-font-size` | `0.9rem` | TOC font size |
| `--dg-toc-max-height` | `220px` | TOC max height |
| `--dg-toc-title-size` | `1.2rem` | TOC title font size |

### Search Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--dg-search-box-width` | `900px` | Search modal width |
| `--dg-search-box-max-width` | `80%` | Search modal max width |
| `--dg-search-input-size` | `2rem` | Search input font size |
| `--dg-search-results-max-height` | `50vh` | Search results container max height |

### Backlinks Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--dg-backlinks-max-height` | `250px` | Backlinks list max height |
| `--dg-backlinks-title-size` | `0.9rem` | Backlinks title font size |
| `--dg-backlinks-card-size` | `0.85rem` | Backlink card font size |

### Navbar Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--dg-logo-height` | `40px` | Site logo height (desktop) |
| `--dg-logo-height-mobile` | `32px` | Site logo height (mobile) |
| `--dg-navbar-title-size-mobile` | `18px` | Navbar title size on mobile |

### Timestamps Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--dg-timestamps-size` | `0.8em` | Timestamps font size |
| `--dg-timestamps-gap` | `10px` | Gap between timestamp items |
| `--dg-timestamps-margin-top` | `20px` | Top margin for timestamps section |

---

> 💡 **Tip:** Start with `--background-primary`, `--text-normal`, and `--text-accent`. These three variables alone define most of the site's visual personality. Everything else is fine-tuning.
