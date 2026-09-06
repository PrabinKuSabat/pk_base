# Ring0Ledger UI plugin

This directory owns Ring0Ledger-specific presentation and interaction code that must survive upstream Digital Garden template upgrades.

## Ownership

- `templates/navigation.njk` — custom Ring0Ledger navigation region.
- `templates/head.njk` — fonts, theme bootstrap, and Excalidraw pre-paint classes.
- `templates/footer-*.njk` — custom footer surfaces.
- `styles/pk-fixes.css` — legacy/global Ring0Ledger overrides kept before the modular user styles in the cascade.
- `assets/pk-ui.js` and `assets/rzl.js` — client-side Ring0Ledger interactions.

The finer-grained visual modules remain under `src/site/styles/user/`, which is also a Digital Garden user-owned extension surface.

Do not move these customizations back into template-owned files such as `pageheader.njk`, `navbar.njk`, `index.njk`, `note.njk`, or `digital-garden-base.scss`. Upstream template updates may replace those files.

`src/plugins/plugins.json` disables the first-party `dg-filetree` navigation provider so this plugin can own the `navigation` region. Other first-party plugins such as search, math, timestamps, and link preview remain enabled and integrate through plugin slots.
