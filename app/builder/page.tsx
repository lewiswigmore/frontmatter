"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Plus, Layout, Eye, Code, BookOpen, Heart, MessageSquarePlus } from "lucide-react";
import Preview from "../components/Preview";
import RawMarkdownView, { generateMarkdownFromSections } from "../components/RawMarkdownView";
import ComponentPicker from "../components/ComponentPicker";
import ArchetypePicker from "../components/ArchetypePicker";
import SectionEditor from "../components/SectionEditor";
import GlobalSettings from "../components/GlobalSettings";
import KofiModal from "../components/KofiModal";
import { archetypes } from "../data/archetypes";
import { Section, Archetype, ReadmeComponent } from "../types";
import Link from "next/link";

export default function Home() {
  const [sections, setSections] = useState<Section[]>(archetypes[0].sections);
  const [globalValues, setGlobalValues] = useState<Record<string, string>>({
    username: "octocat",
    name: "Your Name",
  });
  const [copied, setCopied] = useState(false);
  const [showComponentPicker, setShowComponentPicker] = useState(false);
  const [showArchetypePicker, setShowArchetypePicker] = useState(false);
  const [showKofiModal, setShowKofiModal] = useState(false);
  const [viewMode, setViewMode] = useState<"preview" | "raw">("preview");

  const handleCopy = async () => {
    const markdown = generateMarkdownFromSections(sections, globalValues);
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setShowKofiModal(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectArchetype = useCallback((archetype: Archetype) => {
    setSections(archetype.sections);
  }, []);

  const handleAddComponent = useCallback((component: ReadmeComponent) => {
    const defaultValues: Record<string, string> = {};
    component.fields.forEach((field) => {
      defaultValues[field.name] = field.default;
    });

    const newSection: Section = {
      id: `section-${Date.now()}`,
      componentId: component.id,
      values: defaultValues,
    };

    setSections((prev) => [...prev, newSection]);
  }, []);

  const handleUpdateSection = useCallback((index: number, section: Section) => {
    setSections((prev) => {
      const newSections = [...prev];
      newSections[index] = section;
      return newSections;
    });
  }, []);

  const handleDeleteSection = useCallback((index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleMoveSection = useCallback((index: number, direction: "up" | "down") => {
    setSections((prev) => {
      const newSections = [...prev];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= newSections.length) return prev;
      [newSections[index], newSections[newIndex]] = [
        newSections[newIndex],
        newSections[index],
      ];
      return newSections;
    });
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
        <header className="border-b border-stone-200 sticky top-0 z-40 bg-paper -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="py-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link href="/" className="font-mono text-lg sm:text-xl tracking-tight text-stone-900 hover:opacity-80 transition-opacity">
                frontmatter<span className="text-orange-600">.cc</span>
              </Link>
              <span className="hidden md:inline font-mono text-xs text-stone-400 border-l border-stone-300 pl-3">
                README Design Studio
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/builder/gallery"
                className="flex items-center justify-center p-2 sm:px-3 sm:py-1.5 font-mono text-sm border border-stone-300 bg-transparent hover:bg-stone-100 text-stone-700 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Gallery</span>
              </Link>

              <div className="hidden sm:block w-px h-6 bg-stone-200" />

              <button
                onClick={() => setShowArchetypePicker(true)}
                className="flex items-center justify-center p-2 sm:px-3 sm:py-1.5 font-mono text-sm border border-stone-300 bg-transparent hover:bg-stone-100 text-stone-700 transition-colors"
              >
                <Layout className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Archetypes</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center justify-center p-2 sm:px-3 sm:py-1.5 font-mono text-sm border border-stone-300 bg-transparent hover:bg-stone-100 text-stone-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="hidden sm:inline ml-2">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="hidden sm:inline ml-2">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col overflow-hidden border-x border-stone-200">
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-[360px] xl:w-[420px] shrink-0 h-[40vh] lg:h-full border-b lg:border-b-0 lg:border-r border-stone-200 bg-paper flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-2 sm:px-3 py-2 border-b border-stone-200 bg-stone-50">
              <span className="font-mono text-xs text-stone-500 uppercase tracking-widest">
                Builder
              </span>
              <button
                onClick={() => setShowComponentPicker(true)}
                className="flex items-center gap-1 px-2 py-1 font-mono text-xs border border-stone-300 bg-transparent hover:bg-stone-100 text-stone-600 transition-colors"
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-3">
              <GlobalSettings values={globalValues} onChange={setGlobalValues} />

              <div className="space-y-2">
                <div className="font-mono text-xs text-stone-500 uppercase tracking-widest px-1">
                  Sections ({sections.length})
                </div>
                {sections.map((section, index) => (
                  <SectionEditor
                    key={section.id}
                    section={section}
                    index={index}
                    globalValues={globalValues}
                    onUpdate={(s) => handleUpdateSection(index, s)}
                    onDelete={() => handleDeleteSection(index)}
                    onMoveUp={() => handleMoveSection(index, "up")}
                    onMoveDown={() => handleMoveSection(index, "down")}
                    isFirst={index === 0}
                    isLast={index === sections.length - 1}
                  />
                ))}
                {sections.length === 0 && (
                  <div className="text-center py-6 sm:py-8 border border-dashed border-stone-300">
                    <p className="font-mono text-sm text-stone-400">
                      No sections yet
                    </p>
                    <button
                      onClick={() => setShowComponentPicker(true)}
                      className="mt-2 font-mono text-xs text-stone-600 hover:text-stone-900 underline"
                    >
                      Add your first component
                    </button>
                  </div>
                )}
              </div>

              {/* Ko-fi subtle widget - desktop only */}
              <div className="hidden lg:block pt-2">
                <a
                  href="https://ko-fi.com/lewiswigmore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2
                    px-3 py-2
                    border border-dashed border-stone-300
                    hover:border-orange-400 hover:bg-orange-50
                    transition-colors group
                  "
                >
                  <Heart className="w-3.5 h-3.5 text-stone-400 group-hover:text-orange-500 transition-colors" />
                  <span className="font-mono text-xs text-stone-400 group-hover:text-stone-600">
                    Support this project
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-2 sm:px-3 py-2 border-b border-stone-200 bg-stone-50">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode("preview")}
                  className={`flex items-center gap-1 px-2 py-1 font-mono text-xs transition-colors ${viewMode === "preview" ? "bg-stone-200 text-stone-900" : "text-stone-500 hover:text-stone-700"}`}
                >
                  <Eye className="w-3 h-3" />
                  Preview
                </button>
                <button
                  onClick={() => setViewMode("raw")}
                  className={`flex items-center gap-1 px-2 py-1 font-mono text-xs transition-colors ${viewMode === "raw" ? "bg-stone-200 text-stone-900" : "text-stone-500 hover:text-stone-700"}`}
                >
                  <Code className="w-3 h-3" />
                  Raw
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
              {viewMode === "preview" ? (
                <Preview sections={sections} globalValues={globalValues} />
              ) : (
                <RawMarkdownView sections={sections} globalValues={globalValues} />
              )}
            </div>
          </div>
        </div>
        </main>

        <footer className="border-t border-x border-stone-200 shrink-0">
          <div className="px-3 py-1.5">
            <div className="flex items-center justify-between gap-2 font-mono text-xs text-stone-400">
            <span className="hidden sm:inline">Make your README matter.</span>
            <span className="sm:hidden">frontmatter.cc</span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/lewiswigmore/frontmatter/issues/new?labels=enhancement&title=Feature%20Request:"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-green-600 transition-colors"
              >
                <MessageSquarePlus className="w-3 h-3" />
                <span className="hidden sm:inline">Suggest</span>
              </a>
              <a
                href="https://ko-fi.com/lewiswigmore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-orange-600 transition-colors"
              >
                <Heart className="w-3 h-3" />
                <span className="hidden sm:inline">Support</span>
              </a>
              <span>{sections.length} sections</span>
            </div>
            </div>
          </div>
        </footer>
      </div>

      <ComponentPicker
        isOpen={showComponentPicker}
        onClose={() => setShowComponentPicker(false)}
        onAddComponent={handleAddComponent}
      />
      <ArchetypePicker
        isOpen={showArchetypePicker}
        onClose={() => setShowArchetypePicker(false)}
        onSelectArchetype={handleSelectArchetype}
      />
      <KofiModal
        isOpen={showKofiModal}
        onClose={() => setShowKofiModal(false)}
      />
    </div>
  );
}
