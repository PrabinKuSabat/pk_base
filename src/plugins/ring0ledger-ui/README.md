# PK Base UI plugin

This enabled plugin is the upgrade-safe owner of PK Base’s shared portfolio visual system.

- templates/navigation.njk provides the journal, portfolio, repository, and theme controls.
- templates/head.njk applies the saved theme before paint.
- templates/footer-contact.njk provides the restrained contact footer.
- styles/pk-fixes.css owns the light/dark tokens, reading layout, responsive rules, focus treatment, and motion.
- assets/pk-ui.js owns theme persistence, reading progress, and note reading metadata.

The older modular rzl style layers and duplicate theme controller were removed so one stylesheet and one script own the experience. The specialized Excalidraw stylesheet remains in src/site/styles/user.

moc-nav remains installed but disabled because both plugins claim the exclusive navigation region. Re-enable it only when intentionally replacing this navigation system.
