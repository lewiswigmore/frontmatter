# Contributing to Frontmatter

Thank you for your interest in contributing! This project welcomes contributions from everyone.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Install** dependencies: `npm install`
4. **Run** the dev server: `npm run dev`

## How to Contribute

### Reporting Bugs

- [Open a bug report](https://github.com/lewiswigmore/frontmatter/issues/new?template=bug_report.md)
- Check existing issues first to avoid duplicates
- Include steps to reproduce and expected vs actual behavior

### Suggesting Features

- [Open a feature request](https://github.com/lewiswigmore/frontmatter/issues/new?template=feature_request.md)
- Explain the use case and why it would be valuable
- Be open to discussion and feedback

### Pull Requests

1. Create a new branch from `main`
2. Make your changes
3. Test your changes locally (`npm run build`)
4. Submit a PR with a clear description

### Adding Components or Archetypes

New building blocks and agent archetypes are always welcome! Please:

- Follow the existing code style
- Add TypeScript types where applicable
- Test the component in the live preview
- Update documentation if needed

## Code Style

- Use TypeScript for all new code
- Follow the existing Tailwind CSS patterns
- Keep components small and focused
- Ensure accessibility (keyboard nav, screen readers)

## Security

This project takes security seriously. Please review our security controls:

- No raw HTML rendering in markdown preview
- All links must be validated (no `javascript:` URIs)
- Dependencies are regularly audited

If you find a security vulnerability, please report it privately via GitHub Security Advisories.

## Questions?

Feel free to open an issue or reach out to [@lewiswigmore](https://github.com/lewiswigmore).
