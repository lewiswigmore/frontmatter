"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { components, componentCategories } from "../data/components";
import { ReadmeComponent } from "../types";
import { IconFromName } from "./IconMap";
import { Plus, X, Search } from "lucide-react";

// Map of which frontmatter components belong to which editor
const frontmatterEditorMap: Record<string, string[]> = {
  vscode: ["frontmatter-skill", "frontmatter-prompt", "frontmatter-agent", "frontmatter-instructions"],
  cursor: ["frontmatter-cursor"],
  "claude-code": [],
  windsurf: [],
  generic: ["frontmatter-skill", "frontmatter-prompt", "frontmatter-agent", "frontmatter-cursor", "frontmatter-instructions"],
};

function getEditorHint(
  componentId: string,
  targetEditor: string
): { text: string; dim: boolean } | null {
  if (!componentId.startsWith("frontmatter-")) return null;
  const relevant = frontmatterEditorMap[targetEditor] || frontmatterEditorMap.vscode;
  if (relevant.includes(componentId)) return null;
  if (targetEditor === "claude-code")
    return { text: "not used by Claude Code", dim: true };
  if (targetEditor === "windsurf")
    return { text: "not used by Windsurf", dim: true };
  if (targetEditor === "cursor")
    return { text: "not used by Cursor", dim: true };
  return { text: "for a different editor", dim: true };
}

interface ComponentPickerProps {
  onAddComponent: (component: ReadmeComponent) => void;
  isOpen: boolean;
  onClose: () => void;
  targetEditor?: string;
}

export default function ComponentPicker({
  onAddComponent,
  isOpen,
  onClose,
  targetEditor = "vscode",
}: ComponentPickerProps) {
  const [activeCategory, setActiveCategory] = useState<string>("frontmatter");
  const [searchQuery, setSearchQuery] = useState("");
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      setSearchQuery("");
      setJustAdded(null);
    };
  }, [isOpen, onClose]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of componentCategories) {
      counts[cat.id] = components.filter((c) => c.category === cat.id).length;
    }
    return counts;
  }, []);

  if (!isOpen) return null;

  const matchesSearch = (text: string) =>
    text.toLowerCase().includes(searchQuery.toLowerCase());

  const filteredComponents = searchQuery
    ? components.filter((c) => matchesSearch(c.name) || matchesSearch(c.description))
    : components.filter((c) => c.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/20">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label="Add Component" className="relative bg-paper border border-stone-300 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200">
          <h2 className="font-serif text-lg text-stone-900">Add Component</h2>
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block font-mono text-[10px] text-stone-400 border border-stone-200 px-1.5 py-0.5 leading-none" aria-hidden="true">Esc</kbd>
            <button
              onClick={onClose}
              aria-label="Close"
              title="Close"
              className="p-1 hover:bg-stone-100 text-stone-500"
            >
              <X aria-hidden="true" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-2 border-b border-stone-200">
          <div className="relative">
            <Search aria-hidden="true" className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components…"
              aria-label="Search components"
              className="w-full pl-8 pr-8 py-1.5 font-mono text-sm text-stone-800 border-b border-stone-200 focus:border-stone-400 focus-visible:border-stone-500 bg-transparent outline-none placeholder:text-stone-300"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); searchInputRef.current?.focus(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-stone-100 text-stone-400"
                aria-label="Clear search"
              >
                <X aria-hidden="true" className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          {/* Categories - horizontal scroll on mobile, sidebar on desktop */}
          <div className={`flex sm:flex-col sm:w-48 border-b sm:border-b-0 sm:border-r border-stone-200 overflow-x-auto sm:overflow-x-visible sm:py-2 scrollbar-hide ${searchQuery ? "opacity-50 pointer-events-none" : ""}`}>
            {componentCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSearchQuery(""); }}
                className={`
                  flex items-center gap-2 px-4 py-2
                  font-mono text-sm text-left whitespace-nowrap
                  shrink-0
                  transition-colors
                  ${
                    activeCategory === cat.id && !searchQuery
                      ? "bg-stone-100 text-stone-900"
                      : "text-stone-600 hover:bg-stone-50"
                  }
                `}
              >
                <IconFromName name={cat.icon} className="w-4 h-4" />
                <span>{cat.name}</span>
                <span className="text-stone-400 text-[10px] ml-auto">{categoryCounts[cat.id]}</span>
              </button>
            ))}
            <div className="hidden sm:block mt-auto px-4 py-2">
              <p className="font-mono text-[10px] text-stone-300 leading-relaxed">
                Shift+click to add multiple · Esc to close
              </p>
            </div>
          </div>

          {/* Components List */}
          <div className="flex-1 overflow-y-auto p-4">
            {searchQuery && (
              <p className="font-mono text-xs text-stone-400 mb-3">
                {filteredComponents.length} result{filteredComponents.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
              </p>
            )}
            {filteredComponents.length === 0 ? (
              <div className="text-center py-8">
                <p className="font-mono text-sm text-stone-400">No components match &ldquo;{searchQuery}&rdquo;</p>
                <button onClick={() => setSearchQuery("")} className="mt-2 font-mono text-xs text-orange-600 hover:text-orange-700">
                  Clear search
                </button>
              </div>
            ) : (
            <div className="space-y-2">
              {filteredComponents.map((component) => (
                <button
                  key={component.id}
                  onClick={(e) => {
                    onAddComponent(component);
                    setJustAdded(component.id);
                    setTimeout(() => setJustAdded((prev) => prev === component.id ? null : prev), 1200);
                    if (!e.shiftKey) onClose();
                  }}
                  className={`
                    w-full text-left p-3
                    border hover:border-stone-400
                    hover:bg-stone-50
                    transition-colors
                    group
                    ${justAdded === component.id ? "border-green-400 bg-green-50/50" : "border-stone-200"}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2.5">
                      <IconFromName
                        name={componentCategories.find((c) => c.id === component.category)?.icon ?? "FileText"}
                        className="w-4 h-4 text-stone-400 mt-0.5 shrink-0"
                      />
                      <div>
                      <h3 className="font-mono text-sm font-medium text-stone-900">
                        {component.name}
                      </h3>
                      <p className="font-mono text-xs text-stone-500 mt-0.5">
                        {component.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="font-mono text-[10px] text-stone-400">
                          {component.fields.length} {component.fields.length === 1 ? "field" : "fields"}
                        </span>
                        {searchQuery && (
                          <span className="font-mono text-[10px] text-stone-400 border border-stone-200 px-1 py-0.5">
                            {componentCategories.find((c) => c.id === component.category)?.name ?? component.category}
                          </span>
                        )}
                        {(() => {
                          const hint = getEditorHint(component.id, targetEditor);
                          if (!hint) return null;
                          return (
                            <span className="font-mono text-[10px] text-stone-400 border border-stone-200 px-1 py-0.5">
                              {hint.text}
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                    </div>
                    {justAdded === component.id ? (
                      <span className="font-mono text-[10px] text-green-600 shrink-0">Added</span>
                    ) : (
                      <Plus aria-hidden="true" className="w-4 h-4 text-stone-400 group-hover:text-stone-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
