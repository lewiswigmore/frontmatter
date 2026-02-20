import { AgentTemplate } from "./types";

export const mcpConfigTemplates: AgentTemplate[] = [
  {
    id: "mcp-postgres",
    name: "PostgreSQL MCP",
    description: "Connect your AI client to a PostgreSQL database via MCP.",
    category: "mcp",
    archetypeIds: ["mcp-config"],
    icon: "Database",
    tags: ["Database", "PostgreSQL", "stdio"],
    globalValues: {
      agentName: "postgres-mcp",
      description: "MCP server for querying and managing a PostgreSQL database.",
    },
    sections: [
      {
        id: "t-pg-0",
        componentId: "mcp-target-header",
        values: {
          client: "claude-desktop",
        },
      },
      {
        id: "t-pg-1",
        componentId: "mcp-preset-postgres",
        values: {
          serverName: "postgres",
          command: "npx",
          args: '["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:password@localhost:5432/mydb"]',
          env: '[]',
        },
      },
    ],
  },
  {
    id: "mcp-github",
    name: "GitHub MCP",
    description: "Connect your AI client to the GitHub API for repos, issues, and PRs.",
    category: "mcp",
    archetypeIds: ["mcp-config"],
    icon: "Github",
    tags: ["GitHub", "API", "stdio"],
    globalValues: {
      agentName: "github-mcp",
      description: "MCP server for interacting with GitHub repositories, issues, and pull requests.",
    },
    sections: [
      {
        id: "t-gh-0",
        componentId: "mcp-target-header",
        values: {
          client: "claude-desktop",
        },
      },
      {
        id: "t-gh-1",
        componentId: "mcp-preset-github",
        values: {
          serverName: "github",
          command: "npx",
          args: '["-y", "@modelcontextprotocol/server-github"]',
          env: '[["GITHUB_PERSONAL_ACCESS_TOKEN", "ghp_your_token_here"]]',
        },
      },
    ],
  },
  {
    id: "mcp-filesystem",
    name: "Filesystem MCP",
    description: "Give your AI client read/write access to local directories.",
    category: "mcp",
    archetypeIds: ["mcp-config"],
    icon: "FolderOpen",
    tags: ["Filesystem", "Local", "stdio"],
    globalValues: {
      agentName: "filesystem-mcp",
      description: "MCP server for reading and writing files in specified local directories.",
    },
    sections: [
      {
        id: "t-fs-0",
        componentId: "mcp-target-header",
        values: {
          client: "claude-desktop",
        },
      },
      {
        id: "t-fs-1",
        componentId: "mcp-preset-filesystem",
        values: {
          serverName: "filesystem",
          command: "npx",
          args: '["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/projects"]',
          env: '[]',
        },
      },
    ],
  },
  {
    id: "mcp-brave-search",
    name: "Brave Search MCP",
    description: "Give your AI client web search capabilities via Brave Search API.",
    category: "mcp",
    archetypeIds: ["mcp-config"],
    icon: "SearchCode",
    tags: ["Search", "Web", "API"],
    globalValues: {
      agentName: "brave-search-mcp",
      description: "MCP server for performing web searches through the Brave Search API.",
    },
    sections: [
      {
        id: "t-bs-0",
        componentId: "mcp-target-header",
        values: {
          client: "claude-desktop",
        },
      },
      {
        id: "t-bs-1",
        componentId: "mcp-preset-brave-search",
        values: {
          serverName: "brave-search",
          command: "npx",
          args: '["-y", "@modelcontextprotocol/server-brave-search"]',
          env: '[["BRAVE_API_KEY", "your_brave_api_key_here"]]',
        },
      },
    ],
  },
];
