import { AgentTemplate } from "./types";

export const claudeCodeTemplates: AgentTemplate[] = [
  // ============ CLAUDE CODE ============
  {
    id: "claude-code-nextjs",
    name: "Next.js Project",
    description: "CLAUDE.md for a Next.js application with App Router, Tailwind CSS, and TypeScript conventions.",
    category: "engineering",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "FileText",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    globalValues: {
      agentName: "claude-code-nextjs",
      description: "Project context for a Next.js application using App Router and TypeScript.",
    },
    sections: [
      {
        id: "t-ccnx-1",
        componentId: "instructions-project-overview",
        values: {
          overview: "This is a Next.js web application built with the App Router, TypeScript in strict mode, and Tailwind CSS for styling. The codebase follows a feature-based folder structure under `app/` with co-located components, hooks, and tests.",
        },
      },
      {
        id: "t-ccnx-2",
        componentId: "instructions-tech-stack",
        values: {
          stack: "- **Language:** TypeScript (strict mode)\n- **Framework:** Next.js 15 (App Router)\n- **Styling:** Tailwind CSS v4\n- **Testing:** Vitest + React Testing Library\n- **Package Manager:** pnpm\n- **Linting:** ESLint + Prettier",
        },
      },
      {
        id: "t-ccnx-3",
        componentId: "instructions-common-commands",
        values: {
          commands: "```bash\n# Development\npnpm dev             # Start dev server on :3000\npnpm build           # Production build\npnpm start           # Run production build locally\npnpm lint            # Lint and format check\n\n# Testing\npnpm test            # Run test suite\npnpm test:watch      # Watch mode\npnpm test:coverage   # Coverage report\n```",
        },
      },
      {
        id: "t-ccnx-4",
        componentId: "instructions-conventions",
        values: {
          conventions: "- Prefer server components; use `\"use client\"` only when interactivity is needed\n- Co-locate tests next to source files: `Button.tsx` → `Button.test.tsx`\n- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`\n- Name files in kebab-case; name components in PascalCase\n- Use absolute imports with `@/` prefix\n- Keep components under 200 lines — extract when larger",
        },
      },
      {
        id: "t-ccnx-5",
        componentId: "instructions-forbidden",
        values: {
          forbidden: "- Never use `any` — use `unknown` and narrow the type\n- Never commit secrets or API keys — use environment variables\n- Never push directly to `main` — always use feature branches\n- Never use `console.log` in committed code — use the project logger\n- Never skip tests when fixing bugs — add a regression test first",
        },
      },
    ],
  },
  {
    id: "claude-code-python-api",
    name: "Python API Project",
    description: "CLAUDE.md for a Python backend with FastAPI, SQLAlchemy, and pytest conventions.",
    category: "engineering",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "Terminal",
    tags: ["Python", "FastAPI", "SQLAlchemy"],
    globalValues: {
      agentName: "claude-code-python-api",
      description: "Project context for a Python FastAPI backend with SQLAlchemy ORM.",
    },
    sections: [
      {
        id: "t-ccpy-1",
        componentId: "instructions-project-overview",
        values: {
          overview: "This is a REST API built with FastAPI and Python 3.12. It uses SQLAlchemy 2.0 as the ORM with async support, Alembic for migrations, and Pydantic v2 for request/response validation. The API follows a layered architecture: routers → services → repositories.",
        },
      },
      {
        id: "t-ccpy-2",
        componentId: "instructions-tech-stack",
        values: {
          stack: "- **Language:** Python 3.12\n- **Framework:** FastAPI\n- **ORM:** SQLAlchemy 2.0 (async)\n- **Migrations:** Alembic\n- **Validation:** Pydantic v2\n- **Testing:** pytest + pytest-asyncio\n- **Package Manager:** uv\n- **CI/CD:** GitHub Actions",
        },
      },
      {
        id: "t-ccpy-3",
        componentId: "instructions-common-commands",
        values: {
          commands: "```bash\n# Development\nuv run uvicorn app.main:app --reload   # Start dev server on :8000\nuv run pytest                          # Run test suite\nuv run pytest --cov                    # Run with coverage\nuv run ruff check .                    # Lint\nuv run ruff format .                   # Format\n\n# Database\nuv run alembic upgrade head            # Run pending migrations\nuv run alembic revision --autogenerate -m \"description\"  # Generate migration\nuv run alembic downgrade -1            # Rollback one migration\n```",
        },
      },
      {
        id: "t-ccpy-4",
        componentId: "instructions-conventions",
        values: {
          conventions: "- Use type hints on all function signatures — no untyped public functions\n- Use `async def` for all route handlers and database operations\n- Separate models (SQLAlchemy), schemas (Pydantic), and services into distinct modules\n- Use dependency injection via FastAPI's `Depends()` for database sessions and auth\n- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`\n- Keep functions under 30 lines — extract helpers when longer",
        },
      },
      {
        id: "t-ccpy-5",
        componentId: "instructions-forbidden",
        values: {
          forbidden: "- Never modify migration files that have already been applied\n- Never use `SELECT *` in queries — select only needed columns\n- Never commit `.env` files or hardcode secrets\n- Never use `print()` for logging — use the `logging` module\n- Never write raw SQL in route handlers — use the repository layer",
        },
      },
    ],
  },
  {
    id: "claude-code-fullstack-monorepo",
    name: "Fullstack Monorepo",
    description: "CLAUDE.md for a Turborepo monorepo with a Next.js frontend and shared packages.",
    category: "engineering",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "Layers",
    tags: ["Monorepo", "Turborepo", "Packages"],
    globalValues: {
      agentName: "claude-code-monorepo",
      description: "Project context for a Turborepo monorepo with frontend, API, and shared packages.",
    },
    sections: [
      {
        id: "t-ccmr-1",
        componentId: "instructions-project-overview",
        values: {
          overview: "This is a Turborepo monorepo containing a Next.js frontend, an API service, and shared packages for types, utilities, and UI components. Packages are linked via workspace protocol and share a common TypeScript config.",
        },
      },
      {
        id: "t-ccmr-2",
        componentId: "instructions-tech-stack",
        values: {
          stack: "- **Monorepo:** Turborepo\n- **Frontend:** Next.js 15 (App Router) in `apps/web`\n- **API:** Express + tRPC in `apps/api`\n- **Shared UI:** React component library in `packages/ui`\n- **Shared Types:** TypeScript types in `packages/types`\n- **Shared Utils:** Utility functions in `packages/utils`\n- **Package Manager:** pnpm (workspaces)\n- **Testing:** Vitest",
        },
      },
      {
        id: "t-ccmr-3",
        componentId: "instructions-common-commands",
        values: {
          commands: "```bash\n# Development (run from root)\npnpm dev                      # Start all apps in dev mode\npnpm dev --filter=web         # Start only the frontend\npnpm dev --filter=api         # Start only the API\n\n# Building\npnpm build                    # Build all packages and apps\npnpm build --filter=web       # Build only the frontend\n\n# Testing\npnpm test                     # Run all tests across workspace\npnpm test --filter=utils      # Test a specific package\n\n# Adding dependencies\npnpm add <pkg> --filter=web   # Add to a specific app\npnpm add <pkg> -w             # Add to root workspace\n```",
        },
      },
      {
        id: "t-ccmr-4",
        componentId: "instructions-conventions",
        values: {
          conventions: "- All shared code goes in `packages/` — apps should never import from each other\n- Use workspace protocol for internal deps: `\"@repo/ui\": \"workspace:*\"`\n- Each package has its own `tsconfig.json` extending the root config\n- Run commands from the repo root using `--filter` — avoid `cd` into packages\n- Shared types live in `packages/types` — never duplicate type definitions\n- Use Conventional Commits with scope: `feat(web):`, `fix(api):`, `chore(ui):`",
        },
      },
      {
        id: "t-ccmr-5",
        componentId: "instructions-forbidden",
        values: {
          forbidden: "- Never import directly between apps (`apps/web` must not import from `apps/api`)\n- Never install dependencies at the wrong level — use `--filter` or `-w`\n- Never bypass Turborepo's task pipeline — define all tasks in `turbo.json`\n- Never commit without running `pnpm build` to verify cross-package compatibility\n- Never use relative paths to reference other packages — use the `@repo/*` alias",
        },
      },
    ],
  },
  {
    id: "claude-code-go-service",
    name: "Go Microservice",
    description: "CLAUDE.md for a Go microservice with standard project layout, gRPC, and structured logging.",
    category: "engineering",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "Building",
    tags: ["Go", "Microservice", "gRPC"],
    globalValues: {
      agentName: "claude-code-go-service",
      description: "Project context for a Go microservice with standard layout and structured logging.",
    },
    sections: [
      {
        id: "t-ccgo-1",
        componentId: "instructions-project-overview",
        values: {
          overview: "This is a Go microservice following the standard project layout. It exposes both gRPC and HTTP/REST endpoints, uses PostgreSQL for persistence, and is deployed as a container to Kubernetes. The service follows clean architecture with separate transport, service, and repository layers.",
        },
      },
      {
        id: "t-ccgo-2",
        componentId: "instructions-tech-stack",
        values: {
          stack: "- **Language:** Go 1.23\n- **Transport:** gRPC + HTTP (grpc-gateway)\n- **Database:** PostgreSQL with pgx driver\n- **Migrations:** goose\n- **Logging:** slog (structured JSON)\n- **Testing:** Go standard library + testify\n- **CI/CD:** GitHub Actions\n- **Deployment:** Docker + Kubernetes",
        },
      },
      {
        id: "t-ccgo-3",
        componentId: "instructions-common-commands",
        values: {
          commands: "```bash\n# Development\ngo run ./cmd/server           # Start the service\ngo test ./...                 # Run all tests\ngo test -race ./...           # Tests with race detector\ngo vet ./...                  # Static analysis\ngolangci-lint run             # Lint\n\n# Database\ngoose -dir migrations postgres \"$DATABASE_URL\" up      # Migrate\ngoose -dir migrations postgres \"$DATABASE_URL\" down     # Rollback\n\n# Code generation\nbuf generate                  # Generate protobuf/gRPC code\ngo generate ./...             # Run all go:generate directives\n\n# Docker\ndocker build -t myservice .   # Build image\n```",
        },
      },
      {
        id: "t-ccgo-4",
        componentId: "instructions-conventions",
        values: {
          conventions: "- Follow standard Go project layout: `cmd/`, `internal/`, `pkg/`, `api/`\n- Use `internal/` for all business logic — it cannot be imported externally\n- Accept interfaces, return structs\n- Use context propagation for cancellation and deadlines on all I/O\n- Use table-driven tests with subtests (`t.Run`)\n- Errors must provide context: `fmt.Errorf(\"creating user: %w\", err)`\n- Use Conventional Commits: `feat:`, `fix:`, `refactor:`",
        },
      },
      {
        id: "t-ccgo-5",
        componentId: "instructions-forbidden",
        values: {
          forbidden: "- Never use `panic` for error handling — return errors\n- Never use global state or `init()` for service dependencies — use dependency injection\n- Never commit generated code changes without regenerating from source (protobuf, mocks)\n- Never use `interface{}` or `any` without a type assertion or constraint\n- Never ignore errors — handle them or explicitly assign to `_` with a comment explaining why",
        },
      },
    ],
  },
  {
    id: "claude-code-rust-cli",
    name: "Rust CLI Tool",
    description: "CLAUDE.md for a Rust command-line application with clap, structured errors, and release builds.",
    category: "engineering",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "Terminal",
    tags: ["Rust", "CLI", "clap"],
    globalValues: {
      agentName: "claude-code-rust-cli",
      description: "Project context for a Rust CLI tool using clap for argument parsing.",
    },
    sections: [
      {
        id: "t-ccrs-1",
        componentId: "instructions-project-overview",
        values: {
          overview: "This is a Rust command-line tool built with clap for argument parsing and anyhow/thiserror for error handling. It reads structured input, processes data, and outputs results to stdout. The project follows Rust idioms and is distributed as a single static binary.",
        },
      },
      {
        id: "t-ccrs-2",
        componentId: "instructions-tech-stack",
        values: {
          stack: "- **Language:** Rust (latest stable)\n- **CLI Framework:** clap v4 (derive API)\n- **Error Handling:** anyhow (application) + thiserror (library)\n- **Serialization:** serde + serde_json\n- **Testing:** Rust built-in tests + assert_cmd for integration\n- **CI/CD:** GitHub Actions with cross-compilation\n- **Linting:** clippy + rustfmt",
        },
      },
      {
        id: "t-ccrs-3",
        componentId: "instructions-common-commands",
        values: {
          commands: "```bash\n# Development\ncargo run -- --help           # Run with help flag\ncargo build                   # Debug build\ncargo build --release         # Optimized release build\ncargo test                    # Run all tests\ncargo clippy                  # Lint\ncargo fmt                     # Format code\ncargo doc --open              # Generate and open docs\n\n# Install locally\ncargo install --path .\n```",
        },
      },
      {
        id: "t-ccrs-4",
        componentId: "instructions-conventions",
        values: {
          conventions: "- Use `clap` derive macros for argument parsing — no manual arg handling\n- Use `thiserror` for domain error types, `anyhow` in `main` and CLI glue code\n- All public items must have doc comments (`///`)\n- Use `Result<T>` return types — never unwrap in library code\n- Organize modules by concern: `cli.rs`, `config.rs`, `process.rs`, `output.rs`\n- Write integration tests in `tests/` using `assert_cmd` and `predicates`",
        },
      },
      {
        id: "t-ccrs-5",
        componentId: "instructions-forbidden",
        values: {
          forbidden: "- Never use `.unwrap()` or `.expect()` in library code — propagate errors with `?`\n- Never use `unsafe` without a `// SAFETY:` comment explaining the invariant\n- Never ignore clippy warnings — fix them or `#[allow]` with justification\n- Never hardcode file paths — accept them as CLI arguments or config\n- Never use `println!` for logging — use `eprintln!` for diagnostics, stdout for output only",
        },
      },
    ],
  },
];
