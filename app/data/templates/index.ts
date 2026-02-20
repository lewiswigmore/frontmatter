import { agentSkillTemplates } from "./agent-skill";
import { systemPromptTemplates } from "./system-prompt";
import { copilotInstructionsTemplates } from "./copilot-instructions";
import { claudeCodeTemplates } from "./claude-code";
import { cursorRulesTemplates } from "./cursor-rules";
import { windsurfRulesTemplates } from "./windsurf-rules";
import { mcpConfigTemplates } from "./mcp-config";
import { openclawTemplates } from "./openclaw";
import { AgentTemplate } from "./types";

export type { AgentTemplate, ArchetypeId } from "./types";
export { templateCategories, INSTRUCTION_ARCHETYPES, FRONTMATTER_COMPONENT_IDS } from "./types";

export const templates: AgentTemplate[] = [
  ...agentSkillTemplates,
  ...systemPromptTemplates,
  ...copilotInstructionsTemplates,
  ...claudeCodeTemplates,
  ...cursorRulesTemplates,
  ...windsurfRulesTemplates,
  ...mcpConfigTemplates,
  ...openclawTemplates,
];

export function getTemplateById(id: string) {
  return templates.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string) {
  return templates.filter((t) => t.category === category);
}
