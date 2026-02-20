"use client";

import { Section } from "../types";
import { getComponentById } from "../data/components";
import { generateMarkdownForSection, isSectionIncludedForEditor } from "./RawMarkdownView";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { useState, DragEvent } from "react";
import { Trash2 } from "lucide-react";
import type { ExtraProps } from "react-markdown";

const customSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), "img", "a", "p", "div", "span", "br", "hr"],
  attributes: {
    ...defaultSchema.attributes,
    img: ["src", "alt", "width", "height", "align"],
    a: ["href", "target", "rel"],
    p: ["align"],
    div: ["align"],
    "*": ["className"],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ["http", "https"],
    href: ["http", "https", "mailto"],
  },
};

interface PreviewProps {
  sections: Section[];
  globalValues: Record<string, string>;
  onReorderSections?: (fromIndex: number, toIndex: number) => void;
  onDeleteSection?: (index: number) => void;
  onOpenPicker?: () => void;
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
        className={`absolute inset-x-0 top-1/2 -translate-y-1/2 ${
          isActive 
            ? "bg-orange-100 border-2 border-dashed border-orange-400 h-6" 
            : "h-0.5 bg-transparent"
        }`}
      />
    </div>
  );
}

export default function Preview({ sections, globalValues, onReorderSections, onDeleteSection, onOpenPicker }: PreviewProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

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
    img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & ExtraProps) => {
      const srcLower = typeof src === "string" ? src.toLowerCase().trim() : "";
      if (srcLower.startsWith("javascript:") || srcLower.startsWith("data:")) {
        return null;
      }
      return (
        <img 
          src={src}
          alt={alt || ""}
          {...props} 
          className="max-w-full h-auto inline-block"
          loading="lazy"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.style.display = "none";
          }}
        />
      );
    },
    h1: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement> & ExtraProps) => (
      <h1 {...props} className="text-2xl font-bold mt-6 mb-4 first:mt-0" />
    ),
    h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement> & ExtraProps) => (
      <h2 {...props} className="text-xl font-bold mt-5 mb-3" />
    ),
    h3: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement> & ExtraProps) => (
      <h3 {...props} className="text-lg font-semibold mt-4 mb-2" />
    ),
    p: ({ ...props }: React.HTMLAttributes<HTMLParagraphElement> & ExtraProps) => (
      <p {...props} className="my-3" />
    ),
    a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & ExtraProps) => {
      if (typeof href === "string" && href.toLowerCase().trim().startsWith("javascript:")) {
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
            {sections.length === 0 && (
              <div className="text-center py-16">
                {onOpenPicker ? (
                  <button
                    onClick={onOpenPicker}
                    className="font-mono text-sm text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    + Add a section to see a preview
                  </button>
                ) : (
                  <p className="font-mono text-sm text-stone-400">
                    Add a section to see a preview
                  </p>
                )}
              </div>
            )}

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
              const markdown = generateMarkdownForSection(section, globalValues);
              const component = getComponentById(section.componentId);
              const isSkipped = !isSectionIncludedForEditor(section.componentId, globalValues.targetEditor || "vscode");
              
              return (
                <div key={section.id}>
                  {onReorderSections ? (
                    <div
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragEnd={handleDragEnd}
                      className={`group relative cursor-grab active:cursor-grabbing ${
                        isSkipped ? "opacity-30" : ""
                      } ${
                        draggedIndex === index
                          ? "opacity-50 scale-[0.98] border-2 border-dashed border-orange-400 bg-orange-50"
                          : "border-2 border-transparent hover:border-dashed hover:border-orange-300 hover:bg-orange-50/30"
                      }`}
                      style={{ margin: '-2px', padding: '6px' }}
                    >
                      {/* Section label - shows on hover */}
                      <div className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <span className="text-[10px] font-mono text-orange-500 bg-orange-50 px-1.5 py-0.5 border border-orange-200">
                          {component?.name || "Section"}{isSkipped ? " · skipped" : ""}
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
                          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-orange-100 hover:bg-red-100 border border-orange-300 hover:border-red-300 text-orange-500 hover:text-red-500 z-10"
                          aria-label="Delete section"
                          title="Delete section"
                        >
                          <Trash2 aria-hidden="true" className="w-3 h-3" />
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
