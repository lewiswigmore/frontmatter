import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Builder",
  description:
    "Choose an archetype to start building AI Agent Skills, MCP Server Configs, and System Prompts. Pick a template or start from scratch. Free, no sign-up required.",
  alternates: {
    canonical: "/builder",
  },
  openGraph: {
    title: "AI Agent Studio — frontmatter.cc",
    description:
      "Choose an archetype and template to build AI Agent Skills, MCP Configs, and System Prompts with a visual editor.",
    url: "https://frontmatter.cc/builder",
  },
  twitter: {
    title: "AI Agent Studio — frontmatter.cc",
    description:
      "Choose an archetype and template to build AI Agent Skills, MCP Configs, and System Prompts with a visual editor.",
  },
};

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
