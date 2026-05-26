# Contributing to Verfix Website

Thank you for your interest in contributing to the Verfix website! This document provides guidelines and instructions for contributing.

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, browser)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When suggesting:

- Use a clear and descriptive title
- Provide detailed explanation of the enhancement
- Explain why this would be useful
- Include mockups or examples if relevant

### Pull Requests

1. Fork the repo and create your branch from `main`
2. Follow the existing code style and conventions
3. Test your changes locally (`npm run dev` and `npm run build`)
4. Update documentation if needed
5. Write clear commit messages
6. Submit a pull request

## 🏗️ Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/verfix-website.git
cd verfix-website

# Install dependencies
npm install

# Start dev server
npm run dev
```

## 📝 Content Guidelines

### Documentation Pages

- Write in clear, concise language
- Use active voice
- Include code examples where helpful
- Add appropriate frontmatter (title, description)
- Follow existing structure and tone

### Code Style

- **Astro components**: Use `.astro` extension
- **Styles**: Scope styles when possible, use CSS variables from design system
- **TypeScript**: Add types for props and functions
- **Formatting**: Use Prettier defaults (handled by IDE)

### Design System

Use CSS variables defined in `src/styles/global.css`:

```css
--vf-green: #00D97E;    /* Primary accent */
--vf-bg: #0A0A0B;       /* Background */
--vf-surface: #111113;  /* Cards, surfaces */
--vf-text: #F0F0F2;     /* Primary text */
```

## 🧪 Testing

Before submitting a PR:

```bash
# Build the site (must succeed with zero errors)
npm run build

# Preview the built site
npm run preview
```

Manual checks:
- ✅ All pages load without errors
- ✅ Navigation works correctly
- ✅ Responsive design works on mobile/tablet/desktop
- ✅ Code blocks are readable and copyable
- ✅ Links point to correct destinations

## 📦 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add dark mode toggle
fix: correct broken link in CLI reference
docs: update installation instructions
style: improve spacing on mobile
refactor: extract TerminalDemo into component
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style/formatting (no logic change)
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Build process, dependencies

## 🔍 Code Review Process

1. Maintainers will review your PR within 3-5 business days
2. Address any requested changes
3. Once approved, a maintainer will merge your PR
4. Your contribution will be automatically deployed

## 📜 License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.

## 🤔 Questions?

- **General questions**: [GitHub Discussions](https://github.com/verfix-dev/verfix/discussions)
- **Bug reports**: [GitHub Issues](https://github.com/verfix-dev/verfix-website/issues)
- **Security issues**: See [SECURITY.md](SECURITY.md)

## 🙏 Thank You!

Your contributions help make Verfix better for everyone. We appreciate your time and effort!
