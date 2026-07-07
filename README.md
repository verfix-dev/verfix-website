# Verfix Website

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

> Official website and documentation for [Verfix](https://github.com/verfix-dev/verfix) — Browser verification runtime for AI-generated web apps.

**Live at:** [verfix.dev](https://verfix.dev)

## 📚 About

This repository contains the marketing site and documentation for Verfix, a browser verification runtime that gives AI coding agents structured feedback from UI tests.

Built with:
- **[Astro](https://astro.build)** — Static site generator
- **[Starlight](https://starlight.astro.build)** — Documentation theme
- **[Tailwind CSS](https://tailwindcss.com)** — Styling
- **[Cloudflare Pages](https://pages.cloudflare.com)** — Deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/verfix-dev/verfix-website.git
cd verfix-website

# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:4321` to see the site.

## 📂 Project Structure

```
verfixdev/
├── .github/              # Issue and PR templates
├── public/               # Static assets (robots.txt, og-image.svg, llms.txt)
├── src/
│   ├── assets/          # SVG logo and images
│   ├── components/      # Astro components (TerminalDemo, CopyButton)
│   ├── content/
│   │   └── docs/        # Documentation pages (.mdx)
│   ├── layouts/         # Page layouts (MarketingLayout)
│   ├── pages/           # Routes (index.astro, telemetry.astro)
│   └── styles/          # Global CSS and design system
├── astro.config.mjs     # Astro configuration
└── package.json         # Dependencies
```

## 🛠️ Available Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview built site locally |
| `npm run astro` | Run Astro CLI commands |

## 📝 Content Guidelines

### Adding Documentation

1. Create a new `.mdx` file in `src/content/docs/`
2. Add frontmatter with `title` and `description`
3. Update sidebar in `astro.config.mjs`
4. Use Starlight components for callouts, code blocks, etc.

Example:

```mdx
---
title: Your Page Title
description: Brief description for SEO
---

## Introduction

Your content here...
```

### Design System

CSS variables are defined in `src/styles/global.css`:

- `--vf-green: #00D97E` — Primary accent
- `--vf-bg: #0A0A0B` — Background
- `--vf-surface: #111113` — Surface
- `--vf-text: #F0F0F2` — Text

### Marketing Components

Reusable components live in `src/components/`:
- `TerminalDemo.astro` — Animated terminal with typing effect
- `CopyButton.astro` — Copy-to-clipboard button

## 🚢 Deployment

The site auto-deploys to Cloudflare Pages on push to `main` — Cloudflare Pages' Git integration
builds the site (`npm run build`) and serves it from `./dist/` directly; there's no separate
GitHub Actions workflow in this repo. Available at `verfix.dev`.

Manual deployment:

```bash
npm run build
npx wrangler pages deploy dist
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test locally (`npm run dev` and `npm run build`)
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Reporting Issues

Found a bug or have a suggestion? [Open an issue](https://github.com/verfix-dev/verfix-website/issues/new).

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Main Project:** [github.com/verfix-dev/verfix](https://github.com/verfix-dev/verfix)
- **Documentation:** [verfix.dev/getting-started](https://verfix.dev/getting-started)
- **npm Package:** [npmjs.com/package/verfix](https://www.npmjs.com/package/verfix)
- **Community:** [GitHub Discussions](https://github.com/verfix-dev/verfix/discussions)

## 🙏 Acknowledgments

Built by [Jyotiraditya](https://github.com/verfix-dev) and [contributors](https://github.com/verfix-dev/verfix-website/graphs/contributors).

---

**Questions?** Open an [issue](https://github.com/verfix-dev/verfix-website/issues) or start a [discussion](https://github.com/verfix-dev/verfix/discussions).
