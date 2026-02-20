"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Heart, Search, X } from "lucide-react";

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let idx = lowerText.indexOf(lowerQuery);
  while (idx !== -1) {
    if (idx > lastIndex) parts.push(text.slice(lastIndex, idx));
    parts.push(
      <mark key={idx} className="bg-orange-100 text-inherit">
        {text.slice(idx, idx + query.length)}
      </mark>
    );
    lastIndex = idx + query.length;
    idx = lowerText.indexOf(lowerQuery, lastIndex);
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length > 0 ? <>{parts}</> : <>{text}</>;
}
import { archetypes } from "../../data/archetypes";
import { components, componentCategories, getComponentById } from "../../data/components";
import { templates, templateCategories } from "../../data/templates";
import { IconFromName } from "../../components/IconMap";

type TabType = "templates" | "archetypes" | "components" | "resources";

const resources = [
  {
    name: "Model Context Protocol",
    description: "The open standard for connecting AI assistants to external tools and data",
    url: "https://modelcontextprotocol.io",
    features: ["Open Standard", "Tool Integration", "Multiple Transports"],
  },
  {
    name: "VS Code Agent Mode",
    description: "Build custom AI agents and skills for VS Code Copilot",
    url: "https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode",
    features: ["Custom Skills", "Prompt Files", "Agent Instructions"],
  },
  {
    name: "MCP Servers Registry",
    description: "Community-maintained list of MCP server implementations",
    url: "https://github.com/modelcontextprotocol/servers",
    features: ["Reference Servers", "Community Servers", "SDK Examples"],
  },
  {
    name: "Anthropic Prompt Engineering",
    description: "Guide to writing effective system prompts and instructions",
    url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering",
    features: ["Best Practices", "Techniques", "Examples"],
  },
  {
    name: "OpenAI Prompt Guide",
    description: "Strategies for getting better results from language models",
    url: "https://platform.openai.com/docs/guides/prompt-engineering",
    features: ["Tactics", "Examples", "Safety"],
  },
];

const tabs: TabType[] = ["templates", "archetypes", "components", "resources"];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("templates");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTemplateCategory, setActiveTemplateCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTyping(e)) return;
      if (e.key === "/") {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) {
        setActiveTab(tabs[num - 1]);
      }
    };
    const isTyping = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement).isContentEditable;
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSearchQuery("");
      searchInputRef.current?.blur();
    }
  }, []);

  const matchesSearch = (text: string) =>
    text.toLowerCase().includes(searchQuery.toLowerCase());

  const filteredTemplates = templates.filter((t) => {
    const categoryMatch = activeTemplateCategory === "all" || t.category === activeTemplateCategory;
    if (!categoryMatch) return false;
    if (!searchQuery) return true;
    return matchesSearch(t.name) || matchesSearch(t.description) || t.tags.some(matchesSearch);
  });

  const filteredComponents = components.filter((c) => {
    const categoryMatch = activeCategory === "all" || c.category === activeCategory;
    if (!categoryMatch) return false;
    if (!searchQuery) return true;
    return matchesSearch(c.name) || matchesSearch(c.description);
  });

  const filteredArchetypes = archetypes.filter((a) => {
    if (!searchQuery) return true;
    return matchesSearch(a.name) || matchesSearch(a.description) || matchesSearch(a.tagline) || matchesSearch(a.persona);
  });

  const filteredResources = resources.filter((r) => {
    if (!searchQuery) return true;
    return matchesSearch(r.name) || matchesSearch(r.description) || r.features.some(matchesSearch);
  });

  const resultCounts = useMemo(() => {
    if (!searchQuery) return null;
    const q = searchQuery.toLowerCase();
    const m = (t: string) => t.toLowerCase().includes(q);
    return {
      templates: templates.filter((t) => m(t.name) || m(t.description) || t.tags.some(m)).length,
      archetypes: archetypes.filter((a) => m(a.name) || m(a.description) || m(a.tagline) || m(a.persona)).length,
      components: components.filter((c) => m(c.name) || m(c.description)).length,
      resources: resources.filter((r) => m(r.name) || m(r.description) || r.features.some(m)).length,
    };
  }, [searchQuery]);

  const activeResultCount = resultCounts
    ? resultCounts[activeTab]
    : { templates: templates.length, archetypes: archetypes.length, components: components.length, resources: resources.length }[activeTab];

  const handleTagClick = useCallback((tag: string) => {
    setSearchQuery(tag);
    searchInputRef.current?.focus();
  }, []);

  const handleClearAll = useCallback(() => {
    setSearchQuery("");
    setActiveTemplateCategory("all");
    setActiveCategory("all");
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
      <div className="sticky top-0 z-40">
      <header className="border-b border-stone-200 bg-paper -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/builder"
                title="Back to builder"
                className="flex items-center gap-2 text-stone-500 hover:text-stone-700 transition-colors"
              >
                <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                <span className="font-mono text-sm hidden sm:inline">Builder</span>
              </Link>
              <div className="w-px h-5 bg-stone-200" aria-hidden="true" />
              <h1 className="font-serif text-lg text-stone-900">Gallery</h1>
            </div>
            <div className="flex gap-0">
              {tabs.map(
                (tab, index) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      mainRef.current?.scrollTo({ top: 0 });
                    }}
                    className={`
                    px-3 py-2
                    font-mono text-xs capitalize
                    border-b-2 -mb-px
                    transition-colors
                    ${
                      activeTab === tab
                        ? "border-stone-900 text-stone-900"
                        : "border-transparent text-stone-400 hover:text-stone-600"
                    }
                  `}
                  >
                    {tab}
                    {resultCounts ? (
                      <span className={`ml-1 font-mono text-[10px] ${
                        resultCounts[tab] === 0 ? "text-stone-300" : activeTab === tab ? "text-stone-500" : "text-stone-300"
                      }`}>
                        {resultCounts[tab]}
                      </span>
                    ) : (
                      <span className="hidden sm:inline ml-1 font-mono text-[10px] text-stone-300">{index + 1}</span>
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-stone-200 bg-paper -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="py-3 flex items-center gap-3">
          <Search aria-hidden="true" className="w-4 h-4 text-stone-400 shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder={`Search ${activeTab}…  (press /)`}
            aria-label={`Search ${activeTab}`}
            className="flex-1 bg-transparent font-mono text-sm text-stone-900 placeholder:text-stone-300 outline-none"
          />
          {searchQuery ? (
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-xs text-stone-400">
                {activeResultCount} result{activeResultCount !== 1 ? "s" : ""}
              </span>
              <button
                onClick={() => setSearchQuery("")}
                title="Clear search"
                aria-label="Clear search"
                className="text-stone-400 hover:text-stone-600"
              >
                <X aria-hidden="true" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <kbd className="hidden sm:inline-block font-mono text-[10px] text-stone-400 border border-stone-200 px-1.5 py-0.5 leading-none" aria-hidden="true">/</kbd>
          )}
        </div>
      </div>
      </div>

      <main ref={mainRef} className="flex-1 border-x border-stone-200">
      <div className="p-4 sm:p-6">
        {activeTab === "templates" && (
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setActiveTemplateCategory("all")}
                className={`
                  px-3 py-1.5 font-mono text-xs border transition-colors
                  ${activeTemplateCategory === "all"
                    ? "bg-stone-900 text-white border-stone-900"
                    : "bg-transparent text-stone-600 border-stone-300 hover:border-stone-400"
                  }
                `}
              >
                All ({searchQuery ? templates.filter((t) => matchesSearch(t.name) || matchesSearch(t.description) || t.tags.some(matchesSearch)).length : templates.length})
              </button>
              {templateCategories.map((cat) => {
                const count = templates.filter((t) => {
                  if (t.category !== cat.id) return false;
                  if (!searchQuery) return true;
                  return matchesSearch(t.name) || matchesSearch(t.description) || t.tags.some(matchesSearch);
                }).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTemplateCategory(cat.id)}
                    className={`
                      px-3 py-1.5 font-mono text-xs border transition-colors
                      ${activeTemplateCategory === cat.id
                        ? "bg-stone-900 text-white border-stone-900"
                        : "bg-transparent text-stone-600 border-stone-300 hover:border-stone-400"
                      }
                    `}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {(searchQuery && activeTemplateCategory !== "all") && (
              <div className="flex items-center gap-2 mb-4 font-mono text-xs text-stone-400">
                <span>Filtering by</span>
                <span className="px-2 py-0.5 bg-stone-100 text-stone-600">{templateCategories.find(c => c.id === activeTemplateCategory)?.name}</span>
                <span>+</span>
                <span className="px-2 py-0.5 bg-orange-50 text-orange-600">&ldquo;{searchQuery}&rdquo;</span>
                <button onClick={handleClearAll} className="text-orange-600 hover:text-orange-700 underline underline-offset-2">Clear all</button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="font-mono text-sm text-stone-400">No templates match &ldquo;{searchQuery}&rdquo;</p>
                  {activeTemplateCategory !== "all" && (
                    <button
                      onClick={() => setActiveTemplateCategory("all")}
                      className="mt-2 font-mono text-xs text-orange-600 hover:text-orange-700"
                    >
                      Clear category filter
                    </button>
                  )}
                </div>
              )}
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="border border-stone-200 bg-white p-4 flex flex-col hover:border-stone-300 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-0.5 text-stone-500">
                      <IconFromName name={template.icon} className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-base text-stone-900 leading-tight">
                        <HighlightMatch text={template.name} query={searchQuery} />
                      </h3>
                      <p className="font-mono text-xs text-stone-500 mt-1 line-clamp-2">
                        <HighlightMatch text={template.description} query={searchQuery} />
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {template.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={(e) => { e.preventDefault(); handleTagClick(tag); }}
                            className="px-1.5 py-0.5 font-mono text-[10px] text-stone-500 bg-stone-50 border border-stone-200 hover:bg-stone-100 cursor-pointer"
                          >
                            <HighlightMatch text={tag} query={searchQuery} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-stone-400">
                      {template.sections.length} section{template.sections.length !== 1 ? "s" : ""}
                      <span className="mx-1 text-stone-300">/</span>
                      <span className="capitalize">{template.archetypeIds[0].replace("-", " ")}</span>
                    </span>
                    <Link
                      href={`/builder/${template.archetypeIds[0]}/edit?template=${template.id}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      Use
                      <ArrowRight aria-hidden="true" className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "archetypes" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredArchetypes.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="font-mono text-sm text-stone-400">No archetypes match &ldquo;{searchQuery}&rdquo;</p>
                </div>
              )}
              {filteredArchetypes.map((archetype) => (
                <div
                  key={archetype.id}
                  className="border border-stone-200 bg-white p-4 hover:border-stone-300 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-stone-500">
                      <IconFromName name={archetype.preview} className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-base text-stone-900 leading-tight">
                        <HighlightMatch text={archetype.name} query={searchQuery} />
                      </h3>
                      <p className="font-mono text-xs text-stone-500 mt-0.5">
                        <HighlightMatch text={archetype.tagline} query={searchQuery} />
                      </p>
                      <p className="font-mono text-xs text-stone-600 mt-2 line-clamp-2">
                        <HighlightMatch text={archetype.description} query={searchQuery} />
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {archetype.sections.map((s) => {
                          const comp = getComponentById(s.componentId);
                          return comp ? (
                            <span key={s.componentId} className="font-mono text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5">
                              {comp.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-mono text-[10px] text-stone-400">
                          {archetype.sections.length} sections
                        </span>
                        <Link
                          href={`/builder/${archetype.id}`}
                          className="font-mono text-xs text-orange-600 hover:text-orange-700 transition-colors"
                        >
                          Use →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "components" && (
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setActiveCategory("all")}
                className={`
                  px-3 py-1.5 font-mono text-xs border transition-colors
                  ${
                    activeCategory === "all"
                      ? "bg-stone-900 text-white border-stone-900"
                      : "bg-transparent text-stone-600 border-stone-300 hover:border-stone-400"
                  }
                `}
              >
                All ({searchQuery ? components.filter((c) => matchesSearch(c.name) || matchesSearch(c.description)).length : components.length})
              </button>
              {componentCategories.map((cat) => {
                const count = components.filter((c) => {
                  if (c.category !== cat.id) return false;
                  if (!searchQuery) return true;
                  return matchesSearch(c.name) || matchesSearch(c.description);
                }).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      px-3 py-1.5 font-mono text-xs border transition-colors
                      ${
                        activeCategory === cat.id
                          ? "bg-stone-900 text-white border-stone-900"
                          : "bg-transparent text-stone-600 border-stone-300 hover:border-stone-400"
                      }
                    `}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {(searchQuery && activeCategory !== "all") && (
              <div className="flex items-center gap-2 mb-4 font-mono text-xs text-stone-400">
                <span>Filtering by</span>
                <span className="px-2 py-0.5 bg-stone-100 text-stone-600">{componentCategories.find(c => c.id === activeCategory)?.name}</span>
                <span>+</span>
                <span className="px-2 py-0.5 bg-orange-50 text-orange-600">&ldquo;{searchQuery}&rdquo;</span>
                <button onClick={handleClearAll} className="text-orange-600 hover:text-orange-700 underline underline-offset-2">Clear all</button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredComponents.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="font-mono text-sm text-stone-400">No components match &ldquo;{searchQuery}&rdquo;</p>
                  {activeCategory !== "all" && (
                    <button
                      onClick={() => setActiveCategory("all")}
                      className="mt-2 font-mono text-xs text-orange-600 hover:text-orange-700"
                    >
                      Clear category filter
                    </button>
                  )}
                </div>
              )}
              {filteredComponents.map((component) => (
                <div
                  key={component.id}
                  className="border border-stone-200 bg-white p-4 hover:border-stone-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <button
                        onClick={() => setActiveCategory(component.category)}
                        className="inline-block px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-stone-500 bg-stone-100 mb-2 hover:bg-stone-200 cursor-pointer"
                      >
                        {component.category}
                      </button>
                      <h3 className="font-mono text-sm font-medium text-stone-900">
                        <HighlightMatch text={component.name} query={searchQuery} />
                      </h3>
                      <p className="font-mono text-xs text-stone-500 mt-1">
                        <HighlightMatch text={component.description} query={searchQuery} />
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-stone-100">
                    <span className="font-mono text-xs text-stone-400">
                      {component.fields.length} field
                      {component.fields.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="font-mono text-sm text-stone-400">No resources match &ldquo;{searchQuery}&rdquo;</p>
                </div>
              )}
              {filteredResources.map((integration) => (
                <a
                  key={integration.name}
                  href={integration.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={integration.name}
                  className="border border-stone-200 bg-white p-5 hover:border-stone-400 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-mono text-sm font-medium text-stone-900 group-hover:text-stone-700">
                      <HighlightMatch text={integration.name} query={searchQuery} />
                    </h3>
                    <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-600" aria-hidden="true" />
                  </div>
                  <p className="font-mono text-xs text-stone-500 mt-2">
                    <HighlightMatch text={integration.description} query={searchQuery} />
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {integration.features.map((feature) => (
                      <button
                        key={feature}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleTagClick(feature); }}
                        className="px-2 py-0.5 font-mono text-[10px] text-stone-600 bg-stone-100 hover:bg-stone-200 cursor-pointer"
                      >
                        <HighlightMatch text={feature} query={searchQuery} />
                      </button>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      </main>

      <footer className="border-t border-x border-stone-200 bg-paper shrink-0">
        <div className="px-3 py-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-stone-400">
              frontmatter<span className="text-orange-600">.cc</span>
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://ko-fi.com/lewiswigmore"
                target="_blank"
                rel="noopener noreferrer"
                title="Support on Ko-fi"
                className="flex items-center gap-1.5 font-mono text-xs text-stone-400 hover:text-orange-600 transition-colors"
              >
                <Heart aria-hidden="true" className="w-3 h-3" />
                Support
              </a>
              <span className="font-mono text-xs text-stone-400">
                {templates.length} templates · {components.length} components
              </span>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
