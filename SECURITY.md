# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Security Measures

This project implements the following security controls:

- **No Raw HTML** — Markdown rendering does not allow raw HTML to prevent XSS attacks
- **Link Validation** — All links are validated to block `javascript:` and `data:` URIs
- **Sanitized Output** — Using `rehype-sanitize` for additional XSS protection
- **Dependency Auditing** — Regular security audits of npm packages

## Reporting a Vulnerability

If you discover a security vulnerability, please report it via [GitHub Security Advisories](https://github.com/lewiswigmore/frontmatter/security/advisories/new).

**Please do not report security vulnerabilities through public GitHub issues.**

You can expect:
- Acknowledgment within 48 hours
- Regular updates on progress
- Credit in the fix announcement (if desired)

Thank you for helping keep Frontmatter secure!
