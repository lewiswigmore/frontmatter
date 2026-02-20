import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse agent archetypes, building blocks, and resources for AI Agent Skills, MCP Server Configs, and System Prompts. Free and open source.",
  alternates: {
    canonical: "/builder/gallery",
  },
  openGraph: {
    title: "Gallery — frontmatter.cc",
    description:
      "Browse agent archetypes, building blocks, and resources for crafting AI Agent Skills, MCP Configs, and System Prompts.",
    url: "https://frontmatter.cc/builder/gallery",
  },
  twitter: {
    title: "Gallery — frontmatter.cc",
    description:
      "Browse agent archetypes, building blocks, and resources for crafting AI Agent Skills, MCP Configs, and System Prompts.",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
