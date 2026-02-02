"use client";

import { Section } from "../types";
import { getComponentById } from "../data/components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

const customSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), "img", "a", "p", "div", "span", "br", "hr"],
  attributes: {
    ...defaultSchema.attributes,
    img: ["src", "alt", "width", "height", "align"],
    a: ["href", "target", "rel"],
    p: ["align"],
    div: ["align"],
    "*": ["className", "style"],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ["http", "https", "data"],
    href: ["http", "https", "mailto"],
  },
};

interface PreviewProps {
  sections: Section[];
  globalValues: Record<string, string>;
}

export default function Preview({ sections, globalValues }: PreviewProps) {
  const generateMarkdown = (): string => {
    return sections
      .map((section) => {
        const component = getComponentById(section.componentId);
        if (!component) return "";

        let markdown = component.template;

        // Replace field values
        Object.entries(section.values).forEach(([key, value]) => {
          // Handle special cases for social badges
          if (component.id === "social-badges") {
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
  };

  const markdown = generateMarkdown();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto bg-white">
        <div className="p-3 sm:p-4 max-w-3xl mx-auto">
          <article className="prose prose-stone prose-sm max-w-none prose-headings:font-sans prose-a:text-blue-600 prose-img:my-2 prose-img:mx-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, [rehypeSanitize, customSchema]]}
              components={{
                img: ({ node, src, alt, ...props }) => {
                  if (typeof src === "string" && (src.startsWith("javascript:") || src.startsWith("data:text"))) {
                    return null;
                  }
                  return (
                    <img 
                      src={src}
                      alt={alt || ""}
                      {...props} 
                      className="max-w-full h-auto inline-block"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  );
                },
                h1: ({ node, ...props }) => (
                  <h1 {...props} className="text-2xl font-bold mt-6 mb-4 first:mt-0" />
                ),
                h2: ({ node, ...props }) => (
                  <h2 {...props} className="text-xl font-bold mt-5 mb-3" />
                ),
                h3: ({ node, ...props }) => (
                  <h3 {...props} className="text-lg font-semibold mt-4 mb-2" />
                ),
                p: ({ node, ...props }) => (
                  <p {...props} className="my-3" />
                ),
                a: ({ node, href, children, ...props }) => {
                  if (typeof href === "string" && href.startsWith("javascript:")) {
                    return <span>{children}</span>;
                  }
                  return (
                    <a 
                      href={href} 
                      {...props} 
                      className="inline-block"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {markdown}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
