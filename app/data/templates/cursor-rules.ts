import { AgentTemplate } from "./types";

export const cursorRulesTemplates: AgentTemplate[] = [
  // ============ MCP SERVERS ============
  // ============ CURSOR RULES ============
  {
    id: "cursor-nextjs-typescript",
    name: "Next.js TypeScript",
    description: "Cursor rules for Next.js projects with App Router, TypeScript strict mode, and Tailwind CSS.",
    category: "engineering",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "Globe",
    tags: ["Next.js", "TypeScript", "Tailwind", "App Router"],
    globalValues: {
      agentName: "nextjs-cursor-rules",
      description: "Cursor rules enforcing Next.js App Router conventions with TypeScript and Tailwind CSS.",
    },
    sections: [
      {
        id: "t-cnxt-1",
        componentId: "frontmatter-cursor",
        values: {
          description: "Next.js App Router and TypeScript coding standards",
          globs: "**/*.{ts,tsx}",
          alwaysApply: "false",
        },
      },
      {
        id: "t-cnxt-2",
        componentId: "instructions-tech-stack",
        values: {
          stack: "- **Runtime:** Node.js 22\n- **Framework:** Next.js 16 (App Router)\n- **Language:** TypeScript (strict mode)\n- **Styling:** Tailwind CSS v4\n- **Testing:** Vitest + React Testing Library\n- **Package Manager:** pnpm",
        },
      },
      {
        id: "t-cnxt-3",
        componentId: "instructions-conventions",
        values: {
          conventions: "- Use `function` declarations for components, arrow functions for callbacks\n- Prefer server components by default; add `\"use client\"` only when interactivity is needed\n- Co-locate component, types, and test files in the same directory\n- Name files in kebab-case; name components in PascalCase\n- Use `@/` path alias for imports from the project root\n- Use barrel exports (`index.ts`) only at feature boundaries",
        },
      },
      {
        id: "t-cnxt-4",
        componentId: "instructions-forbidden",
        values: {
          forbidden: "- Never use `any` — use `unknown` and narrow the type\n- Never use `var` — use `const` by default, `let` only when reassignment is needed\n- Never disable ESLint rules inline without a comment explaining why\n- Never commit `.env` files or hardcode secrets\n- Never use `console.log` in committed code — use the project's logger",
        },
      },
      {
        id: "t-cnxt-5",
        componentId: "instructions-rules",
        values: {
          rules: "- Use `Suspense` boundaries for async data loading with skeleton fallbacks\n- Handle all error states explicitly in UI components\n- Prefer composition and React context over deep prop drilling\n- Use `next/image` for all images with explicit width and height\n- Keep component files under 200 lines — extract when larger\n- Validate environment variables at build time with Zod",
        },
      },
    ],
  },
  {
    id: "cursor-python-fastapi",
    name: "Python FastAPI",
    description: "Cursor rules for Python backends with FastAPI, Pydantic validation, and async patterns.",
    category: "engineering",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "Wrench",
    tags: ["Python", "FastAPI", "Pydantic", "Backend"],
    globalValues: {
      agentName: "python-fastapi-rules",
      description: "Cursor rules for Python FastAPI projects with Pydantic models and async patterns.",
    },
    sections: [
      {
        id: "t-cpfa-1",
        componentId: "frontmatter-cursor",
        values: {
          description: "Python and FastAPI coding conventions",
          globs: "**/*.py",
          alwaysApply: "false",
        },
      },
      {
        id: "t-cpfa-2",
        componentId: "instructions-tech-stack",
        values: {
          stack: "- **Language:** Python 3.12+\n- **Framework:** FastAPI\n- **Validation:** Pydantic v2\n- **Database:** SQLAlchemy 2.0 + Alembic for migrations\n- **Testing:** pytest + httpx (async test client)\n- **Linting:** Ruff\n- **Package Manager:** uv",
        },
      },
      {
        id: "t-cpfa-3",
        componentId: "instructions-conventions",
        values: {
          conventions: "- Use Pydantic `BaseModel` for all request and response schemas\n- Use `async def` for all route handlers and database operations\n- Organize routes into routers by domain: `routers/users.py`, `routers/orders.py`\n- Use dependency injection for database sessions, auth, and config\n- Name files in snake_case; name classes in PascalCase\n- Type-annotate every function signature — use `-> None` for void returns",
        },
      },
      {
        id: "t-cpfa-4",
        componentId: "instructions-forbidden",
        values: {
          forbidden: "- Never use `# type: ignore` without an explanation comment\n- Never use bare `except:` — catch specific exception types\n- Never hardcode database credentials — use environment variables\n- Never use synchronous ORM calls inside async routes\n- Never return raw database models — always map to Pydantic response schemas",
        },
      },
      {
        id: "t-cpfa-5",
        componentId: "instructions-rules",
        values: {
          rules: "- Use `HTTPException` with meaningful status codes and error details\n- Write parameterized queries — never interpolate user input into SQL\n- Use Alembic for all schema changes — never modify the database manually\n- Add integration tests for every endpoint with happy path and error cases\n- Keep route handlers thin — extract business logic into service functions\n- Use structured logging with correlation IDs for request tracing",
        },
      },
    ],
  },
  {
    id: "cursor-react-component-lib",
    name: "React Component Library",
    description: "Cursor rules for building accessible, composable React component libraries with Storybook.",
    category: "design",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "Puzzle",
    tags: ["React", "Components", "Storybook", "Accessibility"],
    globalValues: {
      agentName: "react-component-lib-rules",
      description: "Cursor rules for building accessible React component libraries with consistent APIs.",
    },
    sections: [
      {
        id: "t-crcl-1",
        componentId: "frontmatter-cursor",
        values: {
          description: "React component library conventions and accessibility standards",
          globs: "src/components/**/*.{ts,tsx}",
          alwaysApply: "false",
        },
      },
      {
        id: "t-crcl-2",
        componentId: "instructions-tech-stack",
        values: {
          stack: "- **Language:** TypeScript (strict mode)\n- **Framework:** React 19\n- **Styling:** CSS custom properties + Tailwind CSS\n- **Documentation:** Storybook 8\n- **Testing:** Vitest + React Testing Library + axe-core\n- **Build:** tsup for library bundling",
        },
      },
      {
        id: "t-crcl-3",
        componentId: "instructions-conventions",
        values: {
          conventions: "- Use compound components (`Menu` + `Menu.Item`) for complex compositions\n- Every component must forward refs and accept `className` passthrough\n- Use design tokens as CSS custom properties — never hardcode colors or spacing\n- Name component props interfaces as `{ComponentName}Props`\n- One component per file with co-located test and story\n- Export all components from `src/index.ts` with explicit named exports",
        },
      },
      {
        id: "t-crcl-4",
        componentId: "instructions-forbidden",
        values: {
          forbidden: "- Never use `div` for interactive elements — use `button`, `a`, or semantic HTML\n- Never rely on color alone to convey information — add icons or text\n- Never skip heading levels (h1 → h3 without h2)\n- Never use `outline: none` without providing an alternative focus indicator\n- Never use `any` in component prop types — define explicit interfaces",
        },
      },
      {
        id: "t-crcl-5",
        componentId: "instructions-rules",
        values: {
          rules: "- All interactive elements must be keyboard-navigable (Tab, Enter, Space, Escape)\n- Maintain WCAG 2.2 AA contrast ratios: 4.5:1 normal text, 3:1 large text\n- Write Storybook stories for every variant and state (default, hover, focus, disabled, error, loading)\n- Include `aria-*` attributes where semantic HTML is insufficient\n- Document props with JSDoc comments — they appear in Storybook's controls panel\n- Restrict visual customization to design-token-based variants, not arbitrary style overrides",
        },
      },
    ],
  },
  {
    id: "cursor-go-backend",
    name: "Go Backend Service",
    description: "Cursor rules for Go microservices with clean architecture, structured logging, and gRPC/REST APIs.",
    category: "engineering",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "Building",
    tags: ["Go", "Microservices", "gRPC", "Clean Architecture"],
    globalValues: {
      agentName: "go-backend-rules",
      description: "Cursor rules for Go backend services with clean architecture and idiomatic patterns.",
    },
    sections: [
      {
        id: "t-cgbe-1",
        componentId: "frontmatter-cursor",
        values: {
          description: "Go backend service conventions and patterns",
          globs: "**/*.go",
          alwaysApply: "false",
        },
      },
      {
        id: "t-cgbe-2",
        componentId: "instructions-tech-stack",
        values: {
          stack: "- **Language:** Go 1.23+\n- **HTTP Framework:** stdlib `net/http` with Chi router\n- **Database:** PostgreSQL via `pgx`\n- **Logging:** `slog` (structured logging)\n- **Testing:** stdlib `testing` + `testify`\n- **Build:** `go build` with `Makefile`",
        },
      },
      {
        id: "t-cgbe-3",
        componentId: "instructions-conventions",
        values: {
          conventions: "- Follow Effective Go and the Go Code Review Comments wiki\n- Use `context.Context` as the first parameter for functions that do I/O\n- Return `error` as the last return value — never panic for expected failures\n- Name packages in lowercase singular: `user`, `order`, not `users`, `models`\n- Use table-driven tests with descriptive subtest names\n- Group imports: stdlib, external, internal — separated by blank lines",
        },
      },
      {
        id: "t-cgbe-4",
        componentId: "instructions-forbidden",
        values: {
          forbidden: "- Never use `panic` for error handling — return errors up the call stack\n- Never ignore errors with `_` without a comment explaining why\n- Never use `init()` functions for application logic — only for package-level registration\n- Never use global mutable state — pass dependencies via constructors\n- Never use `interface{}` / `any` when a concrete type or generic constraint works",
        },
      },
      {
        id: "t-cgbe-5",
        componentId: "instructions-rules",
        values: {
          rules: "- Define interfaces at the consuming package, not the implementing one\n- Use constructor functions (`NewService(...)`) for dependency injection\n- Wrap errors with `fmt.Errorf(\"context: %w\", err)` for stack trace context\n- Write integration tests using `testcontainers-go` for database dependencies\n- Use `slog` with structured fields — never `fmt.Println` or `log.Println`\n- Keep functions under 40 lines — extract helpers for readability",
        },
      },
    ],
  },
  {
    id: "cursor-security-hardened",
    name: "Security-Hardened Rules",
    description: "Cursor rules enforcing secure coding practices — input validation, auth, encryption, and OWASP compliance.",
    category: "security",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "ShieldCheck",
    tags: ["Security", "OWASP", "Auth", "Validation"],
    globalValues: {
      agentName: "security-hardened-rules",
      description: "Cursor rules enforcing secure coding practices aligned with OWASP Top 10.",
    },
    sections: [
      {
        id: "t-csec-1",
        componentId: "frontmatter-cursor",
        values: {
          description: "Security-first coding standards for all application code",
          globs: "**/*.{ts,tsx,js,jsx,py,go}",
          alwaysApply: "true",
        },
      },
      {
        id: "t-csec-2",
        componentId: "instructions-conventions",
        values: {
          conventions: "- Validate all user input at trust boundaries using schema validation (Zod, Pydantic, etc.)\n- Use parameterized queries for all database operations — no string interpolation\n- Encode output based on context: HTML entities for HTML, URL encoding for URLs\n- Set `httpOnly`, `secure`, and `SameSite=strict` flags on all authentication cookies\n- Use constant-time comparison for secrets and tokens\n- Default to deny — whitelist allowed values rather than blacklisting dangerous ones",
        },
      },
      {
        id: "t-csec-3",
        componentId: "instructions-forbidden",
        values: {
          forbidden: "- Never log sensitive data: passwords, tokens, PII, credit card numbers\n- Never hardcode secrets, API keys, or credentials in source code\n- Never use `Math.random()` for security-sensitive values — use `crypto.randomBytes` or equivalent\n- Never use `eval()`, `new Function()`, or dynamic code execution with user input\n- Never disable TLS certificate validation\n- Never store passwords in plaintext — use bcrypt, Argon2id, or scrypt",
        },
      },
      {
        id: "t-csec-4",
        componentId: "instructions-rules",
        values: {
          rules: "- Enforce authentication and authorization checks on every protected endpoint\n- Use cryptographically secure random generators for all tokens and session IDs\n- Set security headers: CSP, HSTS, X-Content-Type-Options, X-Frame-Options\n- Rate-limit all authentication endpoints and public APIs\n- Validate file uploads: check MIME type, enforce size limits, generate safe filenames\n- Never expose stack traces or internal error details to end users\n- Audit all dependencies for known CVEs before adding them",
        },
      },
    ],
  },
];
