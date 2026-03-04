# 🖼️ src/site/img

Static image assets for the site. Files placed here are copied as-is to the build output and served publicly at `/img/`.

## What Belongs Here

This folder is for **site-wide design assets** only:

- **Logo / brand assets** — displayed in the navbar and filetree sidebar
- **Open Graph images** — used for social media link previews when sharing the site URL
- **Favicons** — site icon variants (the primary `favicon.svg` lives at `src/site/favicon.svg`)
- **General UI graphics** — background images or decorative assets referenced in templates or SCSS

## Usage in Templates

```html
<img src="/img/logo.png" alt="Site Logo" height="40" />
```

## Usage in SCSS

```scss
.hero {
  background-image: url('/img/banner.jpg');
}
```

## ⚠️ Note for Obsidian Users

Images **attached to your Obsidian notes** (pasted screenshots, embedded diagrams) are pushed directly into `src/site/notes/` alongside the note Markdown files by the [Digital Garden plugin](https://github.com/oleeskild/Obsidian-Digital-Garden). They do **not** belong in this folder.

| Asset Type | Where it Lives |
|------------|----------------|
| Site logo, OG images, UI graphics | `src/site/img/` |
| Note-attached images (from Obsidian) | `src/site/notes/` (auto-managed) |

> Optimize images before adding them here. Use `.webp` or compressed `.jpg`/`.png` to keep the site fast.
