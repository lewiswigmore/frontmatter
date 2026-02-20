// Component types for the AI Agent & MCP Builder

export interface ComponentField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "color" | "boolean" | "key-value" | "json" | "list";
  default: string;
  options?: string[]; // For select type
  placeholder?: string;
}

export interface ReadmeComponent {
  id: string;
  name: string;
  category: "frontmatter" | "instructions" | "tools" | "examples" | "security" | "mcp" | "extras";
  description: string;
  fields: ComponentField[];
  template: string; // Markdown/YAML/JSON template with {{variable}} placeholders
  preview?: string; // Optional preview image URL
}

export interface Section {
  id: string;
  componentId: string;
  values: Record<string, string>;
}

export interface Archetype {
  id: string;
  name: string;
  tagline: string;
  description: string;
  persona: string;
  preview: string; // Preview image or emoji
  sections: Section[];
}

export type TargetEditor = "vscode" | "cursor" | "claude-code" | "windsurf" | "generic";

export interface BuilderState {
  sections: Section[];
  globalValues: {
    agentName: string;
    description: string;
    version?: string;
    author?: string;
    targetEditor?: TargetEditor;
  };
}
