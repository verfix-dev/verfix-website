# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

This repo is the marketing site and documentation for **Verfix** — a browser verification runtime for AI-generated web apps (the actual product lives at github.com/verfix-dev/verfix, a separate repo). This site is built with Astro + Starlight and deploys to Cloudflare Pages as a static site at verfix.dev.

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server at localhost:4321
npm run build     # production build to ./dist/
npm run preview   # preview the production build locally
npm run astro     # run arbitrary Astro CLI commands
```

There is no test suite or linter configured — validate changes with `npm run build` (catches MDX/Astro/type errors) and by checking the page in `npm run dev`.

## Architecture

Two distinct halves of the site share the same Astro project but use different layout systems:

- **Marketing pages** (`src/pages/index.astro`, `src/pages/telemetry.astro`) — hand-built pages using `src/layouts/MarketingLayout.astro`, styled via `src/styles/marketing.css` and design tokens in `src/styles/global.css` (CSS custom properties prefixed `--vf-*` for colors; these tokens do nothing on their own until a component references them). Reusable pieces live in `src/components/` (`TerminalDemo.astro` — animated typing terminal, `CopyButton.astro` — copy-to-clipboard).
- **Docs pages** (`src/content/docs/*.mdx`) — driven entirely by the Starlight integration configured in `astro.config.mjs`. Adding a doc page means: create the `.mdx` file with `title`/`description` frontmatter, then register it in the `sidebar` array in `astro.config.mjs` — pages aren't auto-listed in the sidebar. `src/components/overrides/ThemeSelect.astro` overrides a Starlight built-in component. Docs content is validated against `docsSchema()` via `src/content.config.ts`.

Global `<head>` tags (fonts, favicons, OG/Twitter meta) are set in two places that should stay in sync: `MarketingLayout.astro` (for marketing pages) and the Starlight `head` array in `astro.config.mjs` (for docs pages).

## Changelog

`src/content/docs/changelog.mdx` is a human-curated summary of releases for the website audience and links out to the authoritative `CHANGELOG.md` in the main verfix CLI/runtime repo. When the CLI repo cuts a release, this file and the displayed version badge in `index.astro` (`hero-badge`, currently "v0.2.10 — now on npm") need updating to match — check recent commit history for the pattern (e.g. "chore: update website for v0.2.10 release").
