"use client";

import { Section } from "../types";
import { getComponentById } from "../data/components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { useState, DragEvent } from "react";
import { Trash2 } from "lucide-react";

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
  onReorderSections?: (fromIndex: number, toIndex: number) => void;
  onDeleteSection?: (index: number) => void;
}

// Drop zone for preview sections
function PreviewDropZone({ 
  isActive, 
  onDragOver, 
  onDragLeave, 
  onDrop 
}: { 
  isActive: boolean;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className="relative z-10 h-2"
    >
      {/* Large invisible hit area */}
      <div className="absolute inset-x-0 -top-4 -bottom-4" />
      {/* Visual indicator - only shows when active */}
      <div
        className={`absolute inset-x-0 top-1/2 -translate-y-1/2 rounded ${
          isActive 
            ? "bg-orange-100 border-2 border-dashed border-orange-400 h-6" 
            : "h-0.5 bg-transparent"
        }`}
      />
    </div>
  );
}

export default function Preview({ sections, globalValues, onReorderSections, onDeleteSection }: PreviewProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  const generateMarkdownForSection = (section: Section): string => {
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
  };

  // Drag handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  const handleDropZoneDragOver = (e: DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    setDropTargetIndex(targetIndex);
  };

  const handleDropZoneDragLeave = () => {
    setDropTargetIndex(null);
  };

  const handleDropZoneDrop = (e: DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || !onReorderSections) {
      setDraggedIndex(null);
      setDropTargetIndex(null);
      return;
    }

    let insertIndex = targetIndex;
    if (draggedIndex < targetIndex) {
      insertIndex = targetIndex - 1;
    }

    if (draggedIndex !== insertIndex) {
      onReorderSections(draggedIndex, insertIndex);
    }

    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  const markdownComponents = {
    img: ({ node, src, alt, ...props }: any) => {
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
          onError={(e: any) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      );
    },
    h1: ({ node, ...props }: any) => (
      <h1 {...props} className="text-2xl font-bold mt-6 mb-4 first:mt-0" />
    ),
    h2: ({ node, ...props }: any) => (
      <h2 {...props} className="text-xl font-bold mt-5 mb-3" />
    ),
    h3: ({ node, ...props }: any) => (
      <h3 {...props} className="text-lg font-semibold mt-4 mb-2" />
    ),
    p: ({ node, ...props }: any) => (
      <p {...props} className="my-3" />
    ),
    a: ({ node, href, children, ...props }: any) => {
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
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto bg-white">
        <div className="p-3 sm:p-4 max-w-3xl mx-auto">
          <article className="prose prose-stone prose-sm max-w-none prose-headings:font-sans prose-a:text-blue-600 prose-img:my-2 prose-img:mx-auto">
            {/* Initial drop zone */}
            {onReorderSections && sections.length > 0 && draggedIndex !== null && (
              <PreviewDropZone
                isActive={dropTargetIndex === 0 && draggedIndex !== 0}
                onDragOver={(e) => handleDropZoneDragOver(e, 0)}
                onDragLeave={handleDropZoneDragLeave}
                onDrop={(e) => handleDropZoneDrop(e, 0)}
              />
            )}
            
            {sections.map((section, index) => {
              const markdown = generateMarkdownForSection(section);
              const component = getComponentById(section.componentId);
              
              return (
                <div key={section.id}>
                  {onReorderSections ? (
                    <div
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragEnd={handleDragEnd}
                      className={`group relative cursor-grab active:cursor-grabbing rounded ${
                        draggedIndex === index
                          ? "opacity-50 scale-[0.98] border-2 border-dashed border-orange-400 bg-orange-50"
                          : "border-2 border-transparent hover:border-dashed hover:border-orange-300 hover:bg-orange-50/30"
                      }`}
                      style={{ margin: '-2px', padding: '6px' }}
                    >
                      {/* Section label - shows on hover */}
                      <div className="absolute -top-5 left-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <span className="text-[10px] font-mono text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                          {component?.name || "Section"}
                        </span>
                      </div>
                      
                      {/* Delete button - shows on hover */}
                      {onDeleteSection && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSection(index);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-orange-100 hover:bg-red-100 border border-orange-300 hover:border-red-300 rounded text-orange-500 hover:text-red-500 z-10"
                          title="Delete section"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                      
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, [rehypeSanitize, customSchema]]}
                        components={markdownComponents}
                      >
                        {markdown}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, [rehypeSanitize, customSchema]]}
                      components={markdownComponents}
                    >
                      {markdown}
                    </ReactMarkdown>
                  )}
                  
                  {/* Drop zone after each section */}
                  {onReorderSections && draggedIndex !== null && (
                    <PreviewDropZone
                      isActive={dropTargetIndex === index + 1 && draggedIndex !== index && draggedIndex !== index + 1}
                      onDragOver={(e) => handleDropZoneDragOver(e, index + 1)}
                      onDragLeave={handleDropZoneDragLeave}
                      onDrop={(e) => handleDropZoneDrop(e, index + 1)}
                    />
                  )}
                </div>
              );
            })}
          </article>
        </div>
      </div>
    </div>
  );
}
