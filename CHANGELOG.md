# Changelog

All notable changes to the Verfix website and documentation will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.4] - 2026-05-26

Official deployment and initial public release of the Verfix website and documentation repository.

### Added
- **Marketing Landing Page (`/`)**: High-performance, modern hero section, animated terminal demonstration, core problem/solution comparisons, execution modes, and interactive quickstarts.
- **Full Documentation Suite**:
  - `Getting Started`: Basic concepts, installation pathways, and CLI checks.
  - `CLI Reference`: Fully documented commands (`init`, `run`, `list`, `logs`, `server`, `status`).
  - `Config Reference`: Detailed description of `verfix.config.json` schema and execution options.
  - `Execution Modes`: In-depth breakdown of `strict`, `assisted`, and `exploratory` runner styles.
  - `Failure Taxonomy`: Detailed error outputs, failure mapping, and contextual structured JSON outputs.
  - `Agent Integration`: Guide on integrating Verfix with AI frameworks (LangChain, LangGraph, AutoGen, LlamaIndex).
  - `Self-Hosting`: Manual installation, Docker-Compose, environment variables, and network configurations.
- **AI-Visibility Files**: Included standard-compliant `/llms.txt` and `/llms-full.txt` endpoints in the public root to provide structured project training context directly to AI clients.
- **SEO & Sitemap**: Configured `@astrojs/sitemap` package to generate sitemaps dynamically and mapped full open-graph preview images (`/og-image.svg`).
- **Telemetry Disclosures**: Created public `/telemetry` page explaining raw anonymous usage collection policies.

### Changed
- **Styling Architecture**: Separated marketing CSS overrides from Starlight configuration core to preserve clean, un-hijacked native layouts on documentation pages.
- **Theme Support**: Completely resolved light-theme layout crashes. Standardized dark sidebar and header with light-theme system body contents while letting code blocks dynamically pivot between `github-dark` and `github-light` color configurations.
- **Animations**: Refactored the homepage typing terminal (`TerminalDemo`) to use highly performant, non-repeating JavaScript typing transitions that respect `prefers-reduced-motion` constraints.
- **Copy Actions**: Styled and positioned code-block copy buttons into a predictable hover-active overlay, preventing overflow layout clipping in code boxes.

### Fixed
- Fixed `/docs` 404 pathing by implementing an automatic server-side Astro redirect pointer routing straight to `/getting-started`.
- Corrected CSS global asset compiling issues by removing `@import` calls inside `<style>` segments and shifting them to Frontmatter scripts.
