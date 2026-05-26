// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://verfix.dev',
  output: "static",
  integrations: [starlight({
    expressiveCode: {
      themes: ['github-dark', 'github-light'],
      styleOverrides: {
        borderRadius: '8px',
        codeFontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        codeFontSize: '0.8125rem',
        codeLineHeight: '1.75',
        borderColor: '#2A2A2E',
      },
    },
    title: 'Verfix',
    description: 'Browser verification runtime for AI-generated web apps. Run deterministic flows, assert UI state, get structured JSON for agents.',
    logo: {
      light: './src/assets/logo.svg',
      dark: './src/assets/logo.svg',
      replacesTitle: false,
    },
    social: [
      { icon: 'github', label: 'GitHub', href: 'https://github.com/verfix-dev/verfix' },
      { icon: 'npm', label: 'npm', href: 'https://www.npmjs.com/package/verfix' },
    ],
    customCss: ['./src/styles/global.css'],
    sidebar: [
      { label: 'Getting Started', slug: 'getting-started' },
      {
        label: 'Reference',
        items: [
          { label: 'CLI Reference', slug: 'cli-reference' },
          { label: 'Config Reference', slug: 'config-reference' },
          { label: 'Execution Modes', slug: 'execution-modes' },
          { label: 'Failure Taxonomy', slug: 'failure-taxonomy' },
        ],
      },
      {
        label: 'Guides',
        items: [
          { label: 'Agent Integration', slug: 'agent-integration' },
          { label: 'Self-Hosting', slug: 'self-hosting' },
        ],
      },
    ],
    head: [
      {
        tag: 'link',
        attrs: {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
      },
      {
        tag: 'link',
        attrs: {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true,
        },
      },
      {
        tag: 'link',
        attrs: {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
      },
      {
        tag: 'meta',
        attrs: { property: 'og:image', content: 'https://verfix.dev/og-image.png' },
      },
      {
        tag: 'meta',
        attrs: { name: 'twitter:card', content: 'summary_large_image' },
      },
      {
        tag: 'meta',
        attrs: { name: 'twitter:image', content: 'https://verfix.dev/og-image.png' },
      },
    ],
  }), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});