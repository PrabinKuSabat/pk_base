# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Prabin Kumar Sabat as the author maintaining notes from Obsidian.
- Technical readers exploring RISC-V, Linux, GPU simulation, computer architecture, and systems research notes.
- Inferred from the portfolio brief: systems employers and research peers following selected work into the journal.

## Product Purpose

Publish a durable, navigable digital garden from Prabin's Obsidian notes. Success means notes remain easy to publish, discover, read, connect, and selectively surface on the portfolio without duplicating their metadata.

## Positioning

The garden exposes the working record behind the portfolio: linked notes, experiments, diagrams, and evolving technical understanding rather than a second promotional site.

## Operating Context

Prabin writes in Obsidian and the Digital Garden plugin manages files under `src/site/notes/`. Eleventy builds those notes into a static site on Vercel. Repository plugins provide search, graph, navigation, math, timestamps, and theme behavior.

## Capabilities and Constraints

- Preserve the Eleventy and Digital Garden publishing workflow.
- Treat `src/site/notes/` as plugin-managed content; do not manually rewrite notes during design work.
- Use plugin/layout/style extension points so upstream template updates remain feasible.
- Provide simple light and dark themes.
- Generate a public, machine-readable index of visible published notes from note metadata.
- Portfolio inclusion is selected in the portfolio’s Keystatic singleton by stable PK Base URL.
- Preserve search, graph, backlinks, math, Canvas/Excalidraw, and existing public note URLs.
- Vercel production is connected to the GitHub `main` branch.

## Brand Commitments

Use Prabin Kumar Sabat's name where author identity is required. Write interface copy as factual wayfinding, not self-promotion.

## Evidence on Hand

- Published notes and metadata under `src/site/notes/`.
- Existing Eleventy layouts, Digital Garden helpers, and first-party plugins.
- The `ring0ledger-ui` plugin is the current customization boundary.
- No verified readership, citation, performance, or publication claims are present; future work must not fabricate them.

## Product Principles

1. Keep Obsidian as the authoring source of truth.
2. Make relationships between notes useful without obstructing reading.
3. Preserve plugin and template upgrade paths.
4. Expose published-note metadata automatically for portfolio curation.
5. Keep public behavior accessible and dependency-light.

## Accessibility & Inclusion

Target WCAG 2.2 AA behavior: semantic landmarks, keyboard-operable navigation, visible focus, readable line lengths, reflow at 200% zoom, sufficient contrast, and reduced-motion operation.
