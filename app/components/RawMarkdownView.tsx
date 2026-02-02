"use client";

import { Section, ReadmeComponent } from "../types";
import { getComponentById } from "../data/components";
import { generateSocialBadgesMarkdown, SocialBadge } from "./SocialBadgesPicker";

interface RawMarkdownViewProps {
  sections: Section[];
  globalValues: Record<string, string>;
}

export function generateMarkdownFromSections(
  sections: Section[],
  globalValues: Record<string, string>
): string {
  return sections
    .map((section) => {
      const component = getComponentById(section.componentId);
      if (!component) return "";

      let markdown = component.template;

      // Replace field values
      Object.entries(section.values).forEach(([key, value]) => {
        // Handle social badges picker
        if (component.id === "social-badges-picker" && key === "badges") {
          try {
            const badges: SocialBadge[] = JSON.parse(value || "[]");
            const style = section.values["badgeStyle"] || "for-the-badge";
            const badgesMarkdown = generateSocialBadgesMarkdown(badges, style);
            markdown = markdown.replace("{{badges}}", badgesMarkdown);
          } catch {
            markdown = markdown.replace("{{badges}}", "");
          }
        }
        // Handle special cases for social badges (manual)
        else if (component.id === "social-badges") {
          if (key === "twitter" && value) {
            markdown = markdown.replace(
              "{{twitter}}",
              `<a href="https://twitter.com/${value}"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" /></a>\n`
            );
          } else if (key === "twitter") {
            markdown = markdown.replace("{{twitter}}", "");
          }
          if (key === "linkedin" && value) {
            markdown = markdown.replace(
              "{{linkedin}}",
              `<a href="https://linkedin.com/in/${value}"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" /></a>\n`
            );
          } else if (key === "linkedin") {
            markdown = markdown.replace("{{linkedin}}", "");
          }
          if (key === "email" && value) {
            markdown = markdown.replace(
              "{{email}}",
              `<a href="mailto:${value}"><img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" /></a>\n`
            );
          } else if (key === "email") {
            markdown = markdown.replace("{{email}}", "");
          }
          if (key === "website" && value) {
            markdown = markdown.replace(
              "{{website}}",
              `<a href="https://${value}"><img src="https://img.shields.io/badge/Website-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white" /></a>\n`
            );
          } else if (key === "website") {
            markdown = markdown.replace("{{website}}", "");
          }
        }
        // Handle tech badges conversion
        else if (component.id === "tech-badges" && key === "badges") {
          const badgeLines = value
            .split("\n")
            .filter((line) => line.trim())
            .map((line) => {
              const [name, color] = line.split("-");
              if (name && color) {
                return `![${name.trim()}](https://img.shields.io/badge/${encodeURIComponent(
                  name.trim()
                )}-${color.trim()}?style=for-the-badge&logo=${encodeURIComponent(
                  name.trim().toLowerCase()
                )}&logoColor=white)`;
              }
              return "";
            })
            .filter(Boolean)
            .join(" ");
          markdown = markdown.replace(`{{${key}}}`, badgeLines);
        }
        // Handle pinned repos second repo
        else if (component.id === "projects-pinned" && key === "repo2") {
          if (value) {
            markdown = markdown.replace(
              "{{repo2}}",
              `[![Repo Card](https://github-readme-stats.vercel.app/api/pin/?username=${
                section.values.username || globalValues.username
              }&repo=${value}&theme=${section.values.theme})](https://github.com/${
                section.values.username || globalValues.username
              }/${value})`
            );
          } else {
            markdown = markdown.replace("{{repo2}}", "");
          }
        } else {
          markdown = markdown.replace(
            new RegExp(`\\{\\{${key}\\}\\}`, "g"),
            value
          );
        }
      });

      // Replace remaining global values
      Object.entries(globalValues).forEach(([key, value]) => {
        markdown = markdown.replace(
          new RegExp(`\\{\\{${key}\\}\\}`, "g"),
          value
        );
      });

      return markdown;
    })
    .join("\n\n");
}

export default function RawMarkdownView({
  sections,
  globalValues,
}: RawMarkdownViewProps) {
  const markdown = generateMarkdownFromSections(sections, globalValues);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto bg-stone-50 relative">
        <pre className="p-4 font-mono text-xs text-stone-700 whitespace-pre-wrap break-words">
          {markdown}
        </pre>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 19px,
              #78716c 19px,
              #78716c 20px
            )`,
            backgroundPosition: "0 16px",
          }}
        />
      </div>
    </div>
  );
}
