// Component types for the README builder

export interface ComponentField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "color" | "boolean" | "badges-picker";
  default: string;
  options?: string[]; // For select type
  placeholder?: string;
}

export interface ReadmeComponent {
  id: string;
  name: string;
  category: "header" | "stats" | "tech" | "social" | "projects" | "extras";
  description: string;
  fields: ComponentField[];
  template: string; // Markdown template with {{variable}} placeholders
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

export interface BuilderState {
  sections: Section[];
  globalValues: {
    username: string;
    name: string;
    email?: string;
    website?: string;
    twitter?: string;
    linkedin?: string;
  };
}
