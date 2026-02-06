import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse 9 README archetypes, 20+ components, and popular integrations like GitHub Stats, Skill Icons, and Shields.io. Find the perfect template for your GitHub profile.",
  alternates: {
    canonical: "/builder/gallery",
  },
  openGraph: {
    title: "Gallery — frontmatter.cc",
    description:
      "Browse README archetypes, components, and integrations for your GitHub profile. 9 templates, 20+ components.",
    url: "https://frontmatter.cc/builder/gallery",
  },
  twitter: {
    title: "Gallery — frontmatter.cc",
    description:
      "Browse README archetypes, components, and integrations for your GitHub profile. 9 templates, 20+ components.",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
