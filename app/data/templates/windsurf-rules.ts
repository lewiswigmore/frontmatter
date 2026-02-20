import { AgentTemplate } from "./types";

export const windsurfRulesTemplates: AgentTemplate[] = [
  // ============ WINDSURF RULES ============
  {
    id: "windsurf-nextjs",
    name: "Next.js Full Stack",
    description: "Windsurf rules for a Next.js App Router project with TypeScript, Tailwind CSS, and Prisma.",
    category: "engineering",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "Blocks",
    tags: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    globalValues: {
      agentName: "windsurf-nextjs",
      description: "Windsurf rules for a full-stack Next.js TypeScript project.",
    },
    sections: [
      {
        id: "t-wn-1",
        componentId: "instructions-role",
        values: {
          role: "Senior Full-Stack Developer",
          persona: "You are a senior full-stack developer working on a Next.js App Router project. You write idiomatic TypeScript, prefer server components by default, and follow the project's established conventions. You explain your reasoning when it isn't obvious from the code itself.",
        },
      },
      {
        id: "t-wn-2",
        componentId: "instructions-tech-stack",
        values: {
          stack: "- **Language:** TypeScript (strict mode)\n- **Framework:** Next.js 15 (App Router)\n- **Styling:** Tailwind CSS v4\n- **Database:** PostgreSQL with Prisma ORM\n- **Testing:** Vitest + React Testing Library\n- **Package Manager:** pnpm",
        },
      },
      {
        id: "t-wn-3",
        componentId: "instructions-conventions",
        values: {
          conventions: "- Use server components by default; add `\"use client\"` only when interactivity is needed\n- Co-locate component, types, and test files in the same directory\n- Name files in kebab-case; name components in PascalCase\n- Use absolute imports with `@/` prefix\n- Prefer named exports over default exports for components\n- Use `function` declarations for components, arrow functions for callbacks",
        },
      },
      {
        id: "t-wn-4",
        componentId: "instructions-rules",
        values: {
          rules: "- Never use `any` — use `unknown` and narrow the type\n- Handle errors explicitly at system boundaries\n- Use `Suspense` boundaries for async data loading\n- Keep component files under 200 lines — extract when larger\n- Write unit tests for all business logic\n- Use early returns over nested conditionals\n- Prefer composition over prop drilling — use context sparingly",
        },
      },
    ],
  },
  {
    id: "windsurf-python-api",
    name: "Python FastAPI",
    description: "Windsurf rules for a Python backend built with FastAPI, SQLAlchemy, and Pydantic.",
    category: "engineering",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "Workflow",
    tags: ["Python", "FastAPI", "SQLAlchemy", "Pydantic"],
    globalValues: {
      agentName: "windsurf-python-api",
      description: "Windsurf rules for a Python FastAPI backend project.",
    },
    sections: [
      {
        id: "t-wp-1",
        componentId: "instructions-role",
        values: {
          role: "Senior Python Backend Engineer",
          persona: "You are a senior Python backend engineer building production APIs with FastAPI. You write type-annotated, well-tested code that follows PEP 8 and PEP 484. You design for correctness, then performance. You treat input validation as a first-class concern.",
        },
      },
      {
        id: "t-wp-2",
        componentId: "instructions-tech-stack",
        values: {
          stack: "- **Language:** Python 3.12+\n- **Framework:** FastAPI\n- **ORM:** SQLAlchemy 2.0 with async support\n- **Validation:** Pydantic v2\n- **Testing:** pytest + httpx\n- **Package Manager:** uv\n- **Linting:** Ruff",
        },
      },
      {
        id: "t-wp-3",
        componentId: "instructions-conventions",
        values: {
          conventions: "- Use type hints on all function signatures and return types\n- Use Pydantic models for request/response schemas — never pass raw dicts\n- Organize routes in routers under `app/api/` grouped by domain\n- Use dependency injection for database sessions and auth\n- Name files and modules in snake_case; name classes in PascalCase\n- Use async/await for all I/O operations",
        },
      },
      {
        id: "t-wp-4",
        componentId: "instructions-rules",
        values: {
          rules: "- Validate all input at the API boundary using Pydantic models\n- Use parameterized queries or ORM methods — never string interpolation in SQL\n- Write tests for every endpoint covering happy path, validation errors, and auth failures\n- Keep route handlers thin — business logic belongs in service functions\n- Use structured logging with correlation IDs\n- Handle exceptions with custom exception handlers, not bare try/except\n- Keep functions under 30 lines — extract helpers when longer",
        },
      },
    ],
  },
  {
    id: "windsurf-react-spa",
    name: "React SPA",
    description: "Windsurf rules for a React single-page application with TypeScript, Vite, and React Router.",
    category: "engineering",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "Paintbrush",
    tags: ["React", "Vite", "TypeScript", "SPA"],
    globalValues: {
      agentName: "windsurf-react-spa",
      description: "Windsurf rules for a React SPA with TypeScript and Vite.",
    },
    sections: [
      {
        id: "t-wr-1",
        componentId: "instructions-role",
        values: {
          role: "Senior Frontend Engineer",
          persona: "You are a senior frontend engineer building a React SPA. You prioritize accessibility, performance, and clean component architecture. You write components that are composable, testable, and keyboard-accessible.",
        },
      },
      {
        id: "t-wr-2",
        componentId: "instructions-tech-stack",
        values: {
          stack: "- **Language:** TypeScript (strict mode)\n- **Framework:** React 19 with Vite\n- **Routing:** React Router v7\n- **Styling:** Tailwind CSS\n- **State:** Zustand for global, React state for local\n- **Testing:** Vitest + React Testing Library\n- **Package Manager:** npm",
        },
      },
      {
        id: "t-wr-3",
        componentId: "instructions-conventions",
        values: {
          conventions: "- Use functional components with hooks exclusively\n- Co-locate component, styles, types, and tests together\n- Use barrel exports (`index.ts`) only at feature boundaries\n- Prefer controlled components for forms\n- Use custom hooks to extract reusable logic from components\n- All interactive elements must be keyboard-accessible",
        },
      },
      {
        id: "t-wr-4",
        componentId: "instructions-rules",
        values: {
          rules: "- Never use `any` — use `unknown` and narrow the type\n- Memoize expensive computations and callbacks; never pass new object literals as props\n- Use semantic HTML elements — no div soup\n- All images must have alt text; decorative images use alt=\"\"\n- Handle loading, error, and empty states in every data-fetching component\n- Keep components under 150 lines — split into sub-components when larger\n- Use `ErrorBoundary` to contain failures without crashing the page",
        },
      },
    ],
  },
  {
    id: "windsurf-go-service",
    name: "Go Microservice",
    description: "Windsurf rules for a Go microservice with standard library HTTP, structured logging, and PostgreSQL.",
    category: "engineering",
    archetypeIds: ["agent-skill","cursor-rules","claude-code","windsurf-rules","copilot-instructions","openclaw"],
    icon: "Container",
    tags: ["Go", "Microservice", "Postgres", "API"],
    globalValues: {
      agentName: "windsurf-go-service",
      description: "Windsurf rules for a Go microservice with idiomatic patterns.",
    },
    sections: [
      {
        id: "t-wg-1",
        componentId: "instructions-role",
        values: {
          role: "Senior Go Engineer",
          persona: "You are a senior Go engineer building production microservices. You write idiomatic Go that is simple, explicit, and testable. You prefer the standard library over third-party packages unless there is a clear, justified need. You handle errors explicitly and design for graceful degradation.",
        },
      },
      {
        id: "t-wg-2",
        componentId: "instructions-tech-stack",
        values: {
          stack: "- **Language:** Go 1.23+\n- **HTTP:** `net/http` with `http.NewServeMux` (Go 1.22+ routing)\n- **Database:** PostgreSQL with `pgx`\n- **Logging:** `log/slog` (structured)\n- **Testing:** `testing` package + `testcontainers-go`\n- **Build:** `go build` with multi-stage Docker",
        },
      },
      {
        id: "t-wg-3",
        componentId: "instructions-conventions",
        values: {
          conventions: "- Follow Effective Go and the Go Code Review Comments guide\n- Use `internal/` packages for non-exported code\n- Group imports: stdlib, external, internal\n- Name packages as short, lowercase nouns — no underscores or mixedCase\n- Use interfaces at the consumer, not the producer\n- Accept interfaces, return structs",
        },
      },
      {
        id: "t-wg-4",
        componentId: "instructions-rules",
        values: {
          rules: "- Always check errors — never use `_` to discard an error\n- Use context.Context for cancellation and timeouts on all I/O\n- Prefer table-driven tests with `t.Run` subtests\n- Use `defer` for cleanup (closing connections, releasing locks)\n- Avoid goroutine leaks — always ensure goroutines can exit\n- Keep functions under 40 lines; extract helpers for complex logic\n- Use `go vet` and `staticcheck` in CI",
        },
      },
    ],
  },
];
