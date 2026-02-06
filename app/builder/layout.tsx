import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Builder",
  description:
    "Build your perfect GitHub profile README with a drag-and-drop editor. Choose from 9 archetypes, 20+ components, and preview in real-time. Free, no sign-up required.",
  alternates: {
    canonical: "/builder",
  },
  openGraph: {
    title: "README Builder — frontmatter.cc",
    description:
      "Build your perfect GitHub profile README with a drag-and-drop editor. 9 archetypes, 20+ components, real-time preview.",
    url: "https://frontmatter.cc/builder",
  },
  twitter: {
    title: "README Builder — frontmatter.cc",
    description:
      "Build your perfect GitHub profile README with a drag-and-drop editor. 9 archetypes, 20+ components, real-time preview.",
  },
};

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
