<div align="center">

# 🌱 PK Base — Personal Digital Garden & Blog

> *Write in Obsidian. Push once. Publish beautifully.*

[![Fork this template](https://img.shields.io/badge/Use%20This%20Template-Fork%20Now-blueviolet?style=for-the-badge&logo=github)](https://github.com/PrabinKuSabat/pk_base/fork)
[![Live Site](https://img.shields.io/badge/Live%20Site-prabins.vercel.app-00C7B7?style=for-the-badge&logo=vercel)](https://prabins.vercel.app)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy%20to-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/PrabinKuSabat/pk_base)
[![Powered by Obsidian](https://img.shields.io/badge/Powered%20by-Obsidian-7c3aed?style=for-the-badge&logo=obsidian)](https://obsidian.md)

</div>

---

## 🎯 Motto

> **"Think in Obsidian. Share with the world."**

`pk_base` is a minimalistic, modern personal website and digital garden built on top of the [Digital Garden Obsidian Plugin](https://github.com/oleeskild/Obsidian-Digital-Garden). This is not just a website — it is a **living knowledge ecosystem** where writing, organizing, and publishing are one seamless, automated workflow.

---

## ✨ Purpose

This repo is a heavily customized fork of [oleeskild/digitalgarden](https://github.com/oleeskild/digitalgarden). It transforms the default Digital Garden template into a polished personal blogging platform and portfolio site that is:

- **Minimalistic** — no clutter, just your words and ideas front and center
- **Modern** — clean typography, smooth interactions, responsive on all devices
- **Automated** — write in Obsidian,publish, and your live site updates instantly
- **Extensible** — every visual detail is themeable through CSS variables
- **Free to host** — deploy on Vercel or Netlify at zero cost

---

## 🚀 Use This Template

Want your own Obsidian-powered personal website? Fork this repo and you're 80% there.

<div align="center">

### 👉 [Fork PK Base and make it yours](https://github.com/PrabinKuSabat/pk_base/fork)

</div>

> ⭐ If this template helps you, please star the repo — it means a lot!

---

## 🔧 Quick Setup Guide

1. **Fork** this repo → click [**Fork PK Base**](https://github.com/PrabinKuSabat/pk_base/fork)
2. **Deploy** your fork instantly:
   - Vercel: [vercel.com/new](https://vercel.com/new) → Import your fork
   - Netlify: [app.netlify.com](https://app.netlify.com) → Import your fork
3. **Install** the [Digital Garden Plugin](https://github.com/oleeskild/Obsidian-Digital-Garden) inside your Obsidian vault via Community Plugins
4. **Configure** the plugin with:
   - Your GitHub username and forked repo name
   - A GitHub Personal Access Token (with `repo` scope)
   - Your deployed site URL
5. **Write** any note in Obsidian and add `dg-publish: true` to the frontmatter
6. **Publish** using the Digital Garden plugin
7. **Watch your site go live** — Vercel/Netlify rebuilds automatically on every push ⚡

📖 Full detailed docs at [dg-docs.ole.dev](https://dg-docs.ole.dev/)

---

## 🌿 The Obsidian Ecosystem

This entire setup is built around [Obsidian](https://obsidian.md) — a powerful, local-first, Markdown-based knowledge base. The publishing workflow is elegantly simple:

```
✍️  Write in Obsidian
        ↓
🏷️  Add  dg-publish: true  to frontmatter
        ↓
🚀  Publish uisng the Digital Garden plugin
        ↓
🔀  Plugin pushes your note to GitHub via API
        ↓
⚙️  Vercel/Netlify detects the push & rebuilds
        ↓
🌐  Your note is live on the web in seconds
```

### Benefits of This Automated Ecosystem

- 📝 **Write locally** — all notes live on your machine, full ownership, no vendor lock-in
- 🔗 **Backlinks & Graph View** — your published site shows an interactive knowledge graph of note connections
- ⚡ **Instant publishing** — one click in Obsidian pushes your content live globally
- 🎨 **Full design control** — customize every pixel via CSS variables without touching core templates
- 🔍 **Full-text search** — built-in real-time search across all your published notes
- 📡 **RSS Feed** — readers can subscribe to your updates at `/feed.xml`
- 🗺️ **Sitemap** — auto-generated `sitemap.xml` for search engine indexing
- 🌙 **Dark / Light mode** — automatic theme switching based on OS preference
- 🖊️ **Zero CMS needed** — Obsidian IS your CMS

---

## 📁 Project Structure

```
pk_base/
├── .github/              # GitHub automation (Dependabot)
├── src/
│   ├── helpers/          # Build-time JS utility modules
│   └── site/
│       ├── _data/        # Global site data and Eleventy data files
│       ├── _includes/    # Nunjucks layout templates & UI components
│       ├── img/          # Static site images and brand assets
│       ├── notes/        # Auto-managed: your published Obsidian notes
│       ├── scripts/      # Client-side JavaScript (search, graph, theme)
│       └── styles/       # SCSS stylesheets and CSS variable overrides
├── .eleventy.js          # Eleventy SSG configuration
├── .env                  # Environment variables (not committed — see .gitignore)
├── netlify.toml          # Netlify deployment configuration
├── vercel.json           # Vercel deployment configuration
└── package.json          # Node.js project metadata and dependencies
```

---

## 🎨 Customization

All visual customization lives in `src/site/styles/custom-style.scss`. Override any CSS variable there:

```scss
body {
  /* Layout */
  --dg-content-max-width: 800px;
  --dg-content-font-size: 16px;

  /* Colors */
  --background-primary: #0f0f0f;
  --text-normal: #e2e2e2;
  --text-accent: #7c6af7;
}
```

See the full [CSS Variables Reference](#css-variables) section below, or visit the [styles folder README](./src/site/styles/README.md).

---

## 🙏 Credits & Acknowledgements

This project stands on the shoulders of incredible open-source work and communities.

### 🌱 Digital Garden Plugin
**Repository:** [oleeskild/Obsidian-Digital-Garden](https://github.com/oleeskild/digitalgarden)  
**Author:** [Ole Eskild Steensen](https://github.com/oleeskild)  
**Docs:** [dg-docs.ole.dev](https://dg-docs.ole.dev/)  
The core engine that bridges Obsidian and the published web. `pk_base` is a fork and customization of this template. Without this plugin and its companion template, none of this workflow would exist.

### 💎 Obsidian
**Website:** [obsidian.md](https://obsidian.md)  
The local-first Markdown knowledge base that serves as the entire writing environment. Obsidian's powerful plugin ecosystem, backlinks, canvas, and graph view make it the perfect tool for building and managing a personal knowledge base.

### 🤝 Obsidian Community
A massive thank you to the **Obsidian Community** — the plugin developers, theme designers, PKM enthusiasts, and knowledge workers who have collectively built an ecosystem that makes tools like this possible. The community forum, Discord, and Reddit have been invaluable throughout the development of this setup.  
→ [Join the Community](https://obsidian.md/community)

### ⚡ Eleventy (11ty)
**Website:** [11ty.dev](https://www.11ty.dev/)  
The static site generator powering the build pipeline. Fast, flexible, and zero-config friendly.

### 🚀 Vercel
**Website:** [vercel.com](https://vercel.com)  
Free, instant global deployments triggered automatically on every push. The live site runs at [prabins.vercel.app](https://prabins.vercel.app).

---

## 📐 CSS Variables

The site is fully customizable through CSS variables. Override these in `src/site/styles/custom-style.scss`.

### Color Variables

| Variable | Description |
|----------|-------------|
| `--text-normal` | Normal text color |
| `--text-muted` | Muted/secondary text |
| `--text-accent` | Accent/highlight color |
| `--link-color` | Hyperlink color |
| `--background-primary` | Main page background |
| `--background-secondary` | Secondary surface background |
| `--interactive-accent` | Interactive element accent |

### Layout Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `--dg-content-max-width` | `700px` | Maximum width of the content area |
| `--dg-content-font-size` | `18px` | Base font size for content |
| `--dg-content-line-height` | `1.5` | Line height for content |
| `--dg-filetree-width` | `250px` | Left sidebar (filetree) width |
| `--dg-sidebar-max-width` | `350px` | Right sidebar max width |

> For the complete variable reference covering all components (Graph, TOC, Search, Navbar, Backlinks, Timestamps, etc.), see [`src/site/styles/README.md`](./src/site/styles/README.md).

---

## 📜 License

This project is open-source. Fork it, customize it, make it yours — just give credit where it's due. 🙏

---

<div align="center">

Made with ❤️ by [Prabin Kumar Sabat](https://prabins.vercel.app)  
Powered by [Obsidian](https://obsidian.md) · [Digital Garden](https://github.com/oleeskild/digitalgarden) · [Eleventy](https://www.11ty.dev/) · [Vercel](https://vercel.com)

</div>
