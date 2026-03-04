# 📝 src/site/notes

> **⚠️ This folder is auto-managed by the [Digital Garden Obsidian Plugin](https://github.com/oleeskild/Obsidian-Digital-Garden). Avoid manually editing or deleting files here.**

This is where all your published Obsidian notes live after being pushed by the Digital Garden plugin. It is the bridge between your private Obsidian vault and the public web.

---

## How the Magic Works

```
1. Write a note in Obsidian
        ↓
2. Add  dg-publish: true  to the note's YAML frontmatter
        ↓
3. Open the Digital Garden plugin panel → click Publish
        ↓
4. Plugin pushes the .md file here via the GitHub API
        ↓
5. Vercel / Netlify detects the commit and rebuilds
        ↓
6. Your note is live on the web in seconds ⚡
```

---

## Note Frontmatter

Every publishable note should include at minimum:

```yaml
---
title: My Note Title
dg-publish: true
---
```

Optional but useful:

```yaml
---
title: My Note Title
dg-publish: true
dg-home: false          # Set true for only ONE note: your home/landing page
tags: [blog, ideas]
dg-pinned: true         # Pins the note in the filetree
dg-hide: false          # Hides from filetree but still accessible via URL
---
```

---

## Structure

- **Subfolders** automatically mirror your Obsidian vault's folder structure
- **Attached images** are also pushed here alongside their parent note
- **Deleting** a note via the plugin removes the file from this folder
- This folder will be **empty in a fresh fork** — that's expected and correct

---

> 🌿 This is the magic folder where your private thinking meets the public web. Everything in here was written in Obsidian and intentionally published.
