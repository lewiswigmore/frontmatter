"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  DragEvent,
  Suspense,
} from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Copy,
  Plus,
  Layout,
  Eye,
  Code,
  BookOpen,
  Heart,
  MessageSquarePlus,
  Download,
  ChevronsUpDown,
  RotateCcw,
} from "lucide-react";
import Preview from "../../../components/Preview";
import RawMarkdownView, {
  generateMarkdownFromSections,
} from "../../../components/RawMarkdownView";
import ComponentPicker from "../../../components/ComponentPicker";
import ArchetypePicker from "../../../components/ArchetypePicker";
import SectionEditor, { DropZone } from "../../../components/SectionEditor";
import GlobalSettings from "../../../components/GlobalSettings";
import KofiModal from "../../../components/KofiModal";
import { getArchetypeById } from "../../../data/archetypes";
import { getTemplateById } from "../../../data/templates";
import { FRONTMATTER_COMPONENT_IDS } from "../../../data/templates/types";
import { Section, Archetype, ReadmeComponent } from "../../../types";
import Link from "next/link";

export default function EditorClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-paper flex items-center justify-center">
          <span className="font-mono text-sm text-stone-400">Loading builder...</span>
        </div>
      }
    >
      <BuilderEditorContent />
    </Suspense>
  );
}

/**
 * Adapt template sections for a different archetype by swapping
 * the frontmatter section to match the target archetype's format.
 */
function adaptSectionsForArchetype(
  templateSections: Section[],
  targetArchetype: Archetype | undefined
): Section[] {
  // Strip any frontmatter sections from the template
  const contentSections = templateSections.filter(
    (s) => !FRONTMATTER_COMPONENT_IDS.includes(s.componentId)
  );

  if (!targetArchetype) return contentSections;

  // Check if the target archetype's default first section is a frontmatter component
  const archetypeFirstSection = targetArchetype.sections[0];
  if (
    archetypeFirstSection &&
    FRONTMATTER_COMPONENT_IDS.includes(archetypeFirstSection.componentId)
  ) {
    // Prepend the archetype's frontmatter section
    return [{ ...archetypeFirstSection, id: `adapted-fm-${Date.now()}` }, ...contentSections];
  }

  // Archetype doesn't use frontmatter (claude-code, windsurf, copilot-instructions)
  return contentSections;
}

function BuilderEditorContent() {
  const searchParams = useSearchParams();
  const params = useParams<{ archetype: string }>();
  const [sections, setSections] = useState<Section[]>(() => {
    const templateId = searchParams.get("template");
    const isBlank = searchParams.get("blank") === "true";
    const currentArchetypeId = params?.archetype;
    const currentArchetype = typeof currentArchetypeId === "string"
      ? getArchetypeById(currentArchetypeId)
      : undefined;

    if (templateId) {
      const template = getTemplateById(templateId);
      if (template) {
        // If the template's primary archetype matches, use sections as-is
        if (template.archetypeIds[0] === currentArchetypeId) {
          return template.sections;
        }
        // Cross-archetype: swap frontmatter to match the current archetype
        return adaptSectionsForArchetype(template.sections, currentArchetype);
      }
    }
    if (isBlank) return [];
    if (currentArchetype) return currentArchetype.sections;
    return [];
  });
  const [globalValues, setGlobalValues] = useState<Record<string, string>>(() => {
    const base = { agentName: "my-agent", description: "A helpful AI assistant", author: "Your Name" };
    const templateId = searchParams.get("template");
    if (templateId) {
      const template = getTemplateById(templateId);
      if (template) return { ...base, ...template.globalValues };
    }
    return base;
  });
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const builderScrollRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [showComponentPicker, setShowComponentPicker] = useState(false);
  const [showArchetypePicker, setShowArchetypePicker] = useState(false);
  const [showKofiModal, setShowKofiModal] = useState(false);
  const copyCountRef = useRef(0);
  const [viewMode, setViewMode] = useState<"preview" | "raw">("preview");
  const [allExpanded, setAllExpanded] = useState(false);
  const [expandGen, setExpandGen] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (!confirmReset) return;
    const timer = setTimeout(() => setConfirmReset(false), 4000);
    return () => clearTimeout(timer);
  }, [confirmReset]);

  useEffect(() => {
    if (lastAddedId && builderScrollRef.current) {
      requestAnimationFrame(() => {
        builderScrollRef.current?.scrollTo({
          top: builderScrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [lastAddedId]);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  const handleCopy = useCallback(async () => {
    const markdown = generateMarkdownFromSections(sections, globalValues);
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setCopyError(false);
      copyCountRef.current += 1;
      if (copyCountRef.current === 1) {
        setShowKofiModal(true);
      }
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  }, [sections, globalValues]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        handleCopy();
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "M") {
        e.preventDefault();
        setViewMode((v) => (v === "preview" ? "raw" : "preview"));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleCopy]);

  const isMac =
    typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);
  const copyShortcut = isMac ? "⇧⌘C" : "Ctrl+Shift+C";
  const viewToggleShortcut = isMac ? "⇧⌘M" : "Ctrl+Shift+M";

  const downloadFilename = (() => {
    const editor = globalValues.targetEditor || "vscode";
    const agentName = globalValues.agentName || "agent";
    switch (editor) {
      case "cursor":
        return `${agentName}.mdc`;
      case "claude-code":
        return "CLAUDE.md";
      case "windsurf":
        return ".windsurfrules";
      case "vscode":
        return `${agentName}.md`;
      default:
        return `${agentName}.md`;
    }
  })();

  const handleDownload = () => {
    const markdown = generateMarkdownFromSections(sections, globalValues);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSelectArchetype = useCallback((archetype: Archetype) => {
    setSections(archetype.sections);
    setLastAddedId(null);
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

    setLastAddedId(newSection.id);
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

  const handleDuplicateSection = useCallback((index: number) => {
    const newId = `section-${Date.now()}`;
    setSections((prev) => {
      const section = prev[index];
      const newSection: Section = {
        id: newId,
        componentId: section.componentId,
        values: { ...section.values },
      };
      const newSections = [...prev];
      newSections.splice(index + 1, 0, newSection);
      return newSections;
    });
    setLastAddedId(newId);
  }, []);

  const handleMoveSection = useCallback(
    (index: number, direction: "up" | "down") => {
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
    },
    []
  );

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDropZoneDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>, targetIndex: number) => {
      e.preventDefault();
      if (draggedIndex === null) return;
      setDropTargetIndex(targetIndex);
    },
    [draggedIndex]
  );

  const handleDropZoneDragLeave = useCallback(() => {
    setDropTargetIndex(null);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDropTargetIndex(null);
  }, []);

  const handleDropZoneDrop = useCallback(
    (e: DragEvent<HTMLDivElement>, targetIndex: number) => {
      e.preventDefault();
      if (draggedIndex === null) {
        handleDragEnd();
        return;
      }

      let insertIndex = targetIndex;
      if (draggedIndex < targetIndex) {
        insertIndex = targetIndex - 1;
      }

      if (draggedIndex !== insertIndex) {
        setSections((prev) => {
          const newSections = [...prev];
          const [draggedSection] = newSections.splice(draggedIndex, 1);
          newSections.splice(insertIndex, 0, draggedSection);
          return newSections;
        });
      }

      handleDragEnd();
    },
    [draggedIndex, handleDragEnd]
  );

  const handleReorderSections = useCallback(
    (fromIndex: number, toIndex: number) => {
      setSections((prev) => {
        const newSections = [...prev];
        const [movedSection] = newSections.splice(fromIndex, 1);
        newSections.splice(toIndex, 0, movedSection);
        return newSections;
      });
    },
    []
  );

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
        <header className="border-b border-stone-200 sticky top-0 z-40 bg-paper -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="py-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <Link
                  href="/"
                  className="font-mono text-lg sm:text-xl tracking-tight text-stone-900 hover:opacity-80 transition-opacity"
                >
                  frontmatter<span className="text-orange-600">.cc</span>
                </Link>
                <span className="hidden md:inline font-mono text-xs text-stone-400 border-l border-stone-300 pl-3">
                  AI Agent Studio
                </span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  href="/builder/gallery"
                  aria-label="Gallery"
                  title="Browse templates & components"
                  className="flex items-center justify-center p-2 sm:px-3 sm:py-1.5 font-mono text-sm border border-stone-300 bg-transparent hover:bg-stone-100 text-stone-700 transition-colors"
                >
                  <BookOpen aria-hidden="true" className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">Gallery</span>
                </Link>

                <div
                  className="hidden sm:block w-px h-6 bg-stone-200"
                  aria-hidden="true"
                />

                <button
                  onClick={() => setShowArchetypePicker(true)}
                  aria-label="Archetypes"
                  title="Choose a starting template"
                  className="flex items-center justify-center p-2 sm:px-3 sm:py-1.5 font-mono text-sm border border-stone-300 bg-transparent hover:bg-stone-100 text-stone-700 transition-colors"
                >
                  <Layout aria-hidden="true" className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">Archetypes</span>
                </button>

                <button
                  onClick={handleCopy}
                  aria-label="Copy to clipboard"
                  title={`Copy markdown to clipboard (${copyShortcut})`}
                  className="flex items-center justify-center p-2 sm:px-3 sm:py-1.5 font-mono text-sm border border-stone-300 bg-transparent hover:bg-stone-100 text-stone-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Copy aria-hidden="true" className="w-4 h-4 text-green-700" />
                      <span className="hidden sm:inline ml-2 text-green-700">
                        Copied
                      </span>
                    </>
                  ) : copyError ? (
                    <>
                      <Copy aria-hidden="true" className="w-4 h-4 text-red-600" />
                      <span className="hidden sm:inline ml-2 text-red-600">
                        Failed
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy aria-hidden="true" className="w-4 h-4" />
                      <span className="hidden sm:inline ml-2">Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownload}
                  aria-label="Download"
                  title={`Download as ${(() => {
                    const editor = globalValues.targetEditor || "vscode";
                    const name = globalValues.agentName || "agent";
                    switch (editor) {
                      case "cursor":
                        return `${name}.mdc`;
                      case "claude-code":
                        return "CLAUDE.md";
                      case "windsurf":
                        return ".windsurfrules";
                      default:
                        return `${name}.md`;
                    }
                  })()}`}
                  className="flex items-center justify-center p-2 sm:px-3 sm:py-1.5 font-mono text-sm border border-stone-300 bg-transparent hover:bg-stone-100 text-stone-700 transition-colors"
                >
                  <Download aria-hidden="true" className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">Save</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col overflow-hidden border-x border-stone-200">
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            <div className="w-full lg:w-[360px] xl:w-[420px] shrink-0 h-[50vh] lg:h-full border-b lg:border-b-0 lg:border-r border-stone-200 bg-paper flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-2 sm:px-3 py-2 border-b border-stone-200 bg-stone-50">
                <span className="font-mono text-xs text-stone-500 uppercase tracking-widest">
                  Builder
                </span>
                <div className="flex items-center gap-1">
                  {sections.length > 0 &&
                    (confirmReset ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setConfirmReset(false)}
                          className="px-2 py-1 font-mono text-[10px] text-stone-500 hover:bg-stone-100 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setSections([]);
                            setConfirmReset(false);
                          }}
                          className="px-2 py-1 font-mono text-[10px] text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Clear all
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmReset(true)}
                        title="Clear all sections"
                        aria-label="Clear all sections"
                        className="flex items-center gap-1 px-2 py-1 font-mono text-xs text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                      >
                        <RotateCcw aria-hidden="true" className="w-3 h-3" />
                      </button>
                    ))}
                  <button
                    onClick={() => setShowComponentPicker(true)}
                    title="Add a component"
                    className="flex items-center gap-1 px-2 py-1 font-mono text-xs border border-stone-300 bg-transparent hover:bg-stone-100 text-stone-600 transition-colors"
                  >
                    <Plus aria-hidden="true" className="w-3 h-3" />
                    Add
                  </button>
                </div>
              </div>

              <div
                ref={builderScrollRef}
                className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-3"
              >
                <GlobalSettings values={globalValues} onChange={setGlobalValues} />

                <div className="space-y-0">
                  <div className="flex items-center justify-between px-1 mb-2">
                    <span className="font-mono text-xs text-stone-500 uppercase tracking-widest">
                      Sections ({sections.length})
                    </span>
                    {sections.length > 1 && (
                      <button
                        onClick={() => {
                          setAllExpanded(!allExpanded);
                          setExpandGen((g) => g + 1);
                        }}
                        title={allExpanded ? "Collapse all" : "Expand all"}
                        className="flex items-center gap-1 px-1.5 py-0.5 font-mono text-[10px] text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                      >
                        <ChevronsUpDown aria-hidden="true" className="w-3 h-3" />
                        {allExpanded ? "Collapse" : "Expand"}
                      </button>
                    )}
                  </div>
                  {sections.length > 0 && draggedIndex !== null && (
                    <DropZone
                      index={0}
                      isActive={dropTargetIndex === 0 && draggedIndex !== 0}
                      onDragOver={(e) => handleDropZoneDragOver(e, 0)}
                      onDragLeave={handleDropZoneDragLeave}
                      onDrop={(e) => handleDropZoneDrop(e, 0)}
                    />
                  )}
                  {sections.map((section, index) => (
                    <div key={section.id}>
                      <SectionEditor
                        section={section}
                        index={index}
                        globalValues={globalValues}
                        onUpdate={(s) => handleUpdateSection(index, s)}
                        onDelete={() => handleDeleteSection(index)}
                        onDuplicate={() => handleDuplicateSection(index)}
                        onMoveUp={() => handleMoveSection(index, "up")}
                        onMoveDown={() => handleMoveSection(index, "down")}
                        isFirst={index === 0}
                        isLast={index === sections.length - 1}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        isDragging={draggedIndex === index}
                        defaultExpanded={section.id === lastAddedId}
                        expandOverride={
                          expandGen > 0
                            ? { expanded: allExpanded, gen: expandGen }
                            : undefined
                        }
                      />
                      {draggedIndex !== null && (
                        <DropZone
                          index={index + 1}
                          isActive={
                            dropTargetIndex === index + 1 &&
                            draggedIndex !== index &&
                            draggedIndex !== index + 1
                          }
                          onDragOver={(e) => handleDropZoneDragOver(e, index + 1)}
                          onDragLeave={handleDropZoneDragLeave}
                          onDrop={(e) => handleDropZoneDrop(e, index + 1)}
                        />
                      )}
                      {draggedIndex === null && index < sections.length - 1 && (
                        <div className="h-2" />
                      )}
                    </div>
                  ))}
                  {sections.length === 0 && (
                    <div className="text-center py-6 sm:py-8 border border-dashed border-stone-300">
                      <p className="font-mono text-sm text-stone-400">
                        No sections yet
                      </p>
                      <div className="mt-2 flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setShowComponentPicker(true)}
                          className="font-mono text-xs text-stone-600 hover:text-stone-900 underline"
                        >
                          Add a component
                        </button>
                        <span className="font-mono text-xs text-stone-300">
                          or
                        </span>
                        <Link
                          href="/builder/gallery"
                          className="font-mono text-xs text-orange-600 hover:text-orange-700"
                        >
                          browse templates
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden lg:block pt-2">
                  <a
                    href="https://ko-fi.com/lewiswigmore"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Support this project on Ko-fi"
                    className="
                      flex items-center gap-2
                      px-3 py-2
                      border border-dashed border-stone-300
                      hover:border-orange-400 hover:bg-orange-50
                      transition-colors group
                    "
                  >
                    <Heart aria-hidden="true" className="w-3.5 h-3.5 text-stone-400 group-hover:text-orange-500 transition-colors" />
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
                    aria-pressed={viewMode === "preview"}
                    title={`Preview (${viewToggleShortcut})`}
                    className={`flex items-center gap-1 px-2 py-1 font-mono text-xs transition-colors ${
                      viewMode === "preview"
                        ? "bg-stone-200 text-stone-900"
                        : "text-stone-500 hover:text-stone-700"
                    }`}
                  >
                    <Eye aria-hidden="true" className="w-3 h-3" />
                    Preview
                  </button>
                  <button
                    onClick={() => setViewMode("raw")}
                    aria-pressed={viewMode === "raw"}
                    title={`Raw markdown (${viewToggleShortcut})`}
                    className={`flex items-center gap-1 px-2 py-1 font-mono text-xs transition-colors ${
                      viewMode === "raw"
                        ? "bg-stone-200 text-stone-900"
                        : "text-stone-500 hover:text-stone-700"
                    }`}
                  >
                    <Code aria-hidden="true" className="w-3 h-3" />
                    Raw
                  </button>
                </div>
                {sections.length > 0 && (
                  <kbd
                    className="hidden sm:inline-block font-mono text-[10px] text-stone-400 border border-stone-200 px-1.5 py-0.5 leading-none"
                    aria-hidden="true"
                    title={`Copy output (${copyShortcut})`}
                  >
                    {copyShortcut}
                  </kbd>
                )}
              </div>

              <div className="flex-1 min-h-0 overflow-hidden">
                {viewMode === "preview" ? (
                  <Preview
                    sections={sections}
                    globalValues={globalValues}
                    onReorderSections={handleReorderSections}
                    onDeleteSection={handleDeleteSection}
                    onOpenPicker={() => setShowComponentPicker(true)}
                  />
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
              <span className="hidden sm:inline">Build AI Agents that matter.</span>
              <span className="sm:hidden">frontmatter.cc</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/lewiswigmore/frontmatter/issues/new?labels=enhancement&title=Feature%20Request:"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Suggest a feature on GitHub"
                  className="flex items-center gap-1 hover:text-green-600 transition-colors"
                >
                  <MessageSquarePlus aria-hidden="true" className="w-3 h-3" />
                  <span className="hidden sm:inline">Suggest</span>
                </a>
                <a
                  href="https://ko-fi.com/lewiswigmore"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Support on Ko-fi"
                  className="flex items-center gap-1 hover:text-orange-600 transition-colors"
                >
                  <Heart aria-hidden="true" className="w-3 h-3" />
                  <span className="hidden sm:inline">Support</span>
                </a>
                <span>
                  {sections.length} {sections.length === 1 ? "section" : "sections"}
                  <span className="ml-1 text-stone-300">· {downloadFilename}</span>
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <ComponentPicker
        isOpen={showComponentPicker}
        onClose={() => setShowComponentPicker(false)}
        onAddComponent={handleAddComponent}
        targetEditor={globalValues.targetEditor || "vscode"}
      />
      <ArchetypePicker
        isOpen={showArchetypePicker}
        onClose={() => setShowArchetypePicker(false)}
        onSelectArchetype={handleSelectArchetype}
        hasSections={sections.length > 0}
      />
      <KofiModal isOpen={showKofiModal} onClose={() => setShowKofiModal(false)} />
    </div>
  );
}
