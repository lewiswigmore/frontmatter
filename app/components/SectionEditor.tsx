"use client";

import { Section } from "../types";
import { getComponentById, componentCategories } from "../data/components";
import { isSectionIncludedForEditor } from "./RawMarkdownView";
import { Trash2, GripVertical, ChevronDown, ChevronUp, Copy, Plus, X } from "lucide-react";
import { useState, DragEvent, useRef, useEffect } from "react";


interface SectionEditorProps {
  section: Section;
  index: number;
  globalValues: Record<string, string>;
  onUpdate: (section: Section) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  onDragStart: (index: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  defaultExpanded?: boolean;
  expandOverride?: { expanded: boolean; gen: number };
}

// Drop zone component for between sections
interface DropZoneProps {
  index: number;
  isActive: boolean;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
}

export function DropZone({ isActive, onDragOver, onDragLeave, onDrop }: DropZoneProps) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className="relative z-10 h-2 -my-1"
    >
      {/* Large invisible hit area */}
      <div className="absolute inset-x-0 -top-3 -bottom-3" />
      {/* Visual indicator - only shows when active */}
      <div
        className={`absolute inset-x-2 top-1/2 -translate-y-1/2 ${
          isActive
            ? "bg-orange-100 border-2 border-dashed border-orange-400 h-4"
            : "h-0.5 bg-transparent"
        }`}
      />
    </div>
  );
}



export default function SectionEditor({
  section,
  index,
  globalValues,
  onUpdate,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  onDragStart,
  onDragEnd,
  isDragging,
  defaultExpanded,
  expandOverride,
}: SectionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded ?? false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Auto-dismiss delete confirmation after 3 seconds
  useEffect(() => {
    if (!confirmDelete) return;
    const timer = setTimeout(() => setConfirmDelete(false), 3000);
    return () => clearTimeout(timer);
  }, [confirmDelete]);

  // Derived: only show confirm when section is expanded
  const showConfirmDelete = confirmDelete && isExpanded;

  const fieldsRef = useRef<HTMLDivElement>(null);
  const component = getComponentById(section.componentId);

  // Respond to parent expand/collapse all
  const [lastOverrideGen, setLastOverrideGen] = useState(expandOverride?.gen ?? 0);
  if (expandOverride && expandOverride.gen !== lastOverrideGen) {
    setLastOverrideGen(expandOverride.gen);
    setIsExpanded(expandOverride.expanded);
  }

  // Auto-focus first input when expanding
  useEffect(() => {
    if (isExpanded && fieldsRef.current) {
      const firstInput = fieldsRef.current.querySelector<HTMLElement>('input, textarea, select');
      if (firstInput) {
        requestAnimationFrame(() => firstInput.focus());
      }
    }
  }, [isExpanded]);

  if (!component) return null;

  const handleFieldChange = (fieldName: string, value: string) => {
    onUpdate({
      ...section,
      values: { ...section.values, [fieldName]: value },
    });
  };

  const getDisplayValue = (value: string): string => {
    // Replace global placeholders for display
    let result = value;
    Object.entries(globalValues).forEach(([key, val]) => {
      result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), val);
    });
    return result;
  };

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragEnd={onDragEnd}
      className={`border bg-white group ${
        isDragging
          ? "opacity-50 border-dashed border-stone-400 scale-[0.98]"
          : "border-stone-200 transition-colors duration-200"
      }`}
    >
      {/* Header */}
      <div
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        className="flex items-center gap-2 px-3 py-2 bg-stone-50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          } else if (e.altKey && e.key === "ArrowUp" && !isFirst) {
            e.preventDefault();
            onMoveUp();
          } else if (e.altKey && e.key === "ArrowDown" && !isLast) {
            e.preventDefault();
            onMoveDown();
          }
        }}
      >
        <GripVertical 
          aria-hidden="true"
          className="w-4 h-4 text-stone-400 cursor-grab active:cursor-grabbing hover:text-stone-600 transition-colors" 
          onMouseDown={(e) => e.stopPropagation()}
        />
        <span className="font-mono text-xs text-stone-400 w-6" aria-hidden="true">{index + 1}</span>
        <span className="font-mono text-sm text-stone-700 flex-1 truncate">
          {component.name}
          <span className="font-mono text-[10px] text-stone-400 font-normal ml-2 border border-stone-200 px-1.5 py-0.5 align-middle">
            {componentCategories.find((c) => c.id === component.category)?.name ?? component.category}
          </span>
          {!isSectionIncludedForEditor(section.componentId, globalValues.targetEditor || "vscode") && (
            <span className="font-mono text-[10px] text-stone-400 font-normal ml-1.5 border border-dashed border-stone-300 px-1.5 py-0.5 align-middle" title="This section won't appear in output for the selected editor">
              skipped
            </span>
          )}
          {!isExpanded && section.values[component.fields[0]?.name] && (
            <span className="text-stone-400 font-normal ml-2 text-xs">
              {(() => {
                const raw = section.values[component.fields[0].name];
                const resolved = getDisplayValue(raw);
                return resolved.length > 30
                  ? resolved.slice(0, 30) + "…"
                  : resolved;
              })()}
            </span>
          )}
        </span>
        <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp();
            }}
            disabled={isFirst}
            title="Move up"
            className="p-1 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronUp aria-hidden="true" className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown();
            }}
            disabled={isLast}
            title="Move down"
            className="p-1 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronDown aria-hidden="true" className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate?.();
            }}
            title="Duplicate section"
            className="p-1 hover:bg-stone-200 text-stone-400 hover:text-stone-600"
          >
            <Copy aria-hidden="true" className="w-3 h-3" />
          </button>
          {showConfirmDelete ? (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setConfirmDelete(false); }}
                title="Cancel"
                className="px-1.5 py-0.5 font-mono text-[10px] text-stone-500 hover:bg-stone-200"
              >
                Cancel
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                title="Confirm delete"
                className="px-1.5 py-0.5 font-mono text-[10px] text-red-600 hover:bg-red-100"
              >
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDelete(true);
              }}
              title="Remove section"
              className="p-1 hover:bg-red-100 text-stone-400 hover:text-red-600"
            >
              <Trash2 aria-hidden="true" className="w-3 h-3" />
            </button>
          )}
        </div>
        <ChevronDown
          aria-hidden="true"
          className={`w-4 h-4 text-stone-400 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Fields */}
      {isExpanded && (
        <div ref={fieldsRef} className="p-3 space-y-3 border-t border-stone-100">
          <p className="font-mono text-[11px] text-stone-400 leading-relaxed -mb-1">{component.description}</p>
          {component.fields.map((field) => {
            const currentValue = section.values[field.name] || field.default;
            
            return (
              <div key={field.name}>
                <label className="block font-mono text-xs text-stone-500 mb-1">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    ref={(el) => {
                      if (el) {
                        el.style.height = 'auto';
                        el.style.height = Math.max(el.scrollHeight, 60) + 'px';
                      }
                    }}
                    value={currentValue}
                    onChange={(e) => {
                      handleFieldChange(field.name, e.target.value);
                      const el = e.target;
                      el.style.height = 'auto';
                      el.style.height = Math.max(el.scrollHeight, 60) + 'px';
                    }}
                    placeholder={field.placeholder}
                    style={{ minHeight: '60px' }}
                    className="
                      w-full px-2 py-1.5
                      font-mono text-sm text-stone-800
                      border-b border-stone-200 focus:border-stone-400
                      focus-visible:border-stone-500
                      bg-transparent
                      resize-none
                      outline-none
                      overflow-hidden
                      break-words
                      placeholder:text-stone-300
                    "
                  />
                ) : field.type === "select" ? (
                  <select
                    value={currentValue}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="
                      w-full px-2 py-1.5
                      font-mono text-sm text-stone-800
                      border-b border-stone-200 focus:border-stone-400
                      focus-visible:border-stone-500
                      bg-transparent
                      outline-none
                      cursor-pointer
                    "
                  >
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "boolean" ? (
                  <select
                    value={currentValue}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="
                      w-full px-2 py-1.5
                      font-mono text-sm text-stone-800
                      border-b border-stone-200 focus:border-stone-400
                      focus-visible:border-stone-500
                      bg-transparent
                      outline-none
                      cursor-pointer
                    "
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                ) : field.type === "color" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentValue.startsWith('#') ? currentValue : `#${currentValue}`}
                      onChange={(e) => handleFieldChange(field.name, e.target.value.replace('#', ''))}
                      className="
                        w-8 h-8
                        border border-stone-200
                        cursor-pointer
                        bg-transparent
                      "
                    />
                    <input
                      type="text"
                      value={currentValue}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      onFocus={(e) => e.target.select()}
                      placeholder={field.placeholder}
                      className="
                        flex-1 px-2 py-1.5
                        font-mono text-sm text-stone-800
                        border-b border-stone-200 focus:border-stone-400
                        focus-visible:border-stone-500
                        bg-transparent
                        outline-none
                        placeholder:text-stone-300
                      "
                    />
                  </div>
                ) : field.type === "list" ? (
                  (() => {
                    let items: string[] = [];
                    try { items = JSON.parse(currentValue || '[]'); } catch { items = currentValue ? [currentValue] : []; }
                    if (!Array.isArray(items)) items = [];
                    return (
                      <div className="space-y-1">
                        {items.map((item, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <span className="font-mono text-[10px] text-stone-300 w-4 text-right shrink-0">{i}</span>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const newItems = [...items];
                                newItems[i] = e.target.value;
                                handleFieldChange(field.name, JSON.stringify(newItems));
                              }}
                              onFocus={(e) => e.target.select()}
                              placeholder={field.placeholder || "value"}
                              className="flex-1 px-2 py-1 font-mono text-sm text-stone-800 border-b border-stone-200 focus:border-stone-400 bg-transparent outline-none placeholder:text-stone-300"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newItems = items.filter((_, j) => j !== i);
                                handleFieldChange(field.name, JSON.stringify(newItems));
                              }}
                              className="p-1 hover:bg-red-50 text-stone-300 hover:text-red-500"
                              title="Remove"
                              aria-label="Remove"
                            >
                              <X aria-hidden="true" className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleFieldChange(field.name, JSON.stringify([...items, ""]))}
                          className="flex items-center gap-1 px-2 py-1 font-mono text-[11px] text-stone-400 hover:text-stone-600 hover:bg-stone-50 border border-dashed border-stone-200 hover:border-stone-300 transition-colors"
                        >
                          <Plus aria-hidden="true" className="w-3 h-3" />
                          Add argument
                        </button>
                      </div>
                    );
                  })()
                ) : field.type === "key-value" ? (
                  (() => {
                    let pairs: [string, string][] = [];
                    try {
                      const parsed = JSON.parse(currentValue || '[]');
                      if (Array.isArray(parsed)) pairs = parsed;
                      else if (typeof parsed === 'object' && parsed !== null) pairs = Object.entries(parsed);
                    } catch { pairs = []; }
                    return (
                      <div className="space-y-1">
                        {pairs.map(([key, value], i) => (
                          <div key={i} className="flex items-center gap-1">
                            <input
                              type="text"
                              value={key}
                              onChange={(e) => {
                                const newPairs = [...pairs];
                                newPairs[i] = [e.target.value, newPairs[i][1]];
                                handleFieldChange(field.name, JSON.stringify(newPairs));
                              }}
                              onFocus={(e) => e.target.select()}
                              placeholder="KEY"
                              className="w-2/5 px-2 py-1 font-mono text-sm text-stone-800 border-b border-stone-200 focus:border-stone-400 bg-transparent outline-none placeholder:text-stone-300"
                            />
                            <span className="font-mono text-[10px] text-stone-300">=</span>
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => {
                                const newPairs = [...pairs];
                                newPairs[i] = [newPairs[i][0], e.target.value];
                                handleFieldChange(field.name, JSON.stringify(newPairs));
                              }}
                              onFocus={(e) => e.target.select()}
                              placeholder="value"
                              className="flex-1 px-2 py-1 font-mono text-sm text-stone-800 border-b border-stone-200 focus:border-stone-400 bg-transparent outline-none placeholder:text-stone-300"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newPairs = pairs.filter((_, j) => j !== i);
                                handleFieldChange(field.name, JSON.stringify(newPairs));
                              }}
                              className="p-1 hover:bg-red-50 text-stone-300 hover:text-red-500"
                              title="Remove"
                              aria-label="Remove"
                            >
                              <X aria-hidden="true" className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleFieldChange(field.name, JSON.stringify([...pairs, ["", ""]]))}
                          className="flex items-center gap-1 px-2 py-1 font-mono text-[11px] text-stone-400 hover:text-stone-600 hover:bg-stone-50 border border-dashed border-stone-200 hover:border-stone-300 transition-colors"
                        >
                          <Plus aria-hidden="true" className="w-3 h-3" />
                          Add variable
                        </button>
                      </div>
                    );
                  })()
                ) : (
                  <input
                    type="text"
                    value={currentValue}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    onFocus={(e) => e.target.select()}
                    placeholder={field.placeholder}
                    className="
                      w-full px-2 py-1.5
                      font-mono text-sm text-stone-800
                      border-b border-stone-200 focus:border-stone-400
                      focus-visible:border-stone-500
                      bg-transparent
                      outline-none
                      overflow-hidden text-ellipsis
                      placeholder:text-stone-300
                    "
                  />
                )}
                {/* Show resolved value for placeholders */}
                {currentValue?.includes("{{") && (
                  <p className="font-mono text-xs text-stone-400 mt-1 break-all">
                    → {getDisplayValue(currentValue)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
