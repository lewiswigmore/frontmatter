import { Section } from "../../types";

export type ArchetypeId = "agent-skill" | "mcp-config" | "system-prompt" | "copilot-instructions" | "cursor-rules" | "claude-code" | "windsurf-rules" | "openclaw";

/** Archetypes that share instruction-style templates (role, rules, conventions, examples). */
export const INSTRUCTION_ARCHETYPES: ArchetypeId[] = [
  "agent-skill",
  "cursor-rules",
  "claude-code",
  "windsurf-rules",
  "copilot-instructions",
  "openclaw",
];

/** Frontmatter component IDs — stripped/swapped when a template is loaded under a different archetype. */
export const FRONTMATTER_COMPONENT_IDS = [
  "frontmatter-skill",
  "frontmatter-prompt",
  "frontmatter-cursor",
  "frontmatter-agent",
  "frontmatter-instructions",
  "frontmatter-openclaw",
];

export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  category: "engineering" | "devops" | "documentation" | "security" | "data" | "design" | "ai" | "productivity" | "services" | "mcp";
  archetypeIds: ArchetypeId[];
  icon: string;
  tags: string[];
  globalValues: {
    agentName: string;
    description: string;
    author?: string;
  };
  sections: Section[];
}

export const templateCategories = [
  { id: "engineering", name: "Engineering" },
  { id: "devops", name: "DevOps" },
  { id: "documentation", name: "Documentation" },
  { id: "security", name: "Security" },
  { id: "data", name: "Data" },
  { id: "design", name: "Design & UX" },
  { id: "ai", name: "AI & ML" },
  { id: "productivity", name: "Productivity" },
  { id: "services", name: "Services" },
  { id: "mcp", name: "MCP Servers" },
] as const;
