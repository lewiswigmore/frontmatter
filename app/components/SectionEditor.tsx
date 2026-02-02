"use client";

import { Section, ReadmeComponent } from "../types";
import { getComponentById } from "../data/components";
import { Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef } from "react";
import SkillIconsPicker from "./SkillIconsPicker";
import SocialBadgesPicker, { SocialBadge, generateSocialBadgesMarkdown } from "./SocialBadgesPicker";

interface SectionEditorProps {
  section: Section;
  index: number;
  globalValues: Record<string, string>;
  onUpdate: (section: Section) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

// Helper to determine if a field is a hex color field
const isHexColorField = (field: { name: string; label: string; placeholder?: string }) => {
  const colorIndicators = ['hex', 'color'];
  const labelLower = field.label.toLowerCase();
  const placeholderLower = (field.placeholder || '').toLowerCase();
  return (
    colorIndicators.some(indicator => labelLower.includes(indicator)) ||
    placeholderLower.includes('hex') ||
    placeholderLower.includes('without #')
  );
};

// Helper to determine if a field is a skill icons field
const isSkillIconsField = (field: { name: string; label: string }, componentId: string) => {
  return componentId === "tech-skillicons" && field.name === "icons";
};

export default function SectionEditor({
  section,
  index,
  globalValues,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: SectionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const component = getComponentById(section.componentId);

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

  // Convert hex string to #hex format for color picker
  const toColorPickerValue = (val: string) => {
    if (!val) return '#6366f1';
    if (val.startsWith('#')) return val;
    // Check if it's a valid 6-char hex
    if (/^[0-9A-Fa-f]{6}$/.test(val)) return `#${val}`;
    return '#6366f1';
  };

  // Convert color picker #hex to hex without #
  const fromColorPickerValue = (val: string) => {
    return val.replace('#', '');
  };

  return (
    <div className="border border-stone-200 bg-white group">
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2 bg-stone-50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <GripVertical className="w-4 h-4 text-stone-300" />
        <span className="font-mono text-xs text-stone-400 w-6">{index + 1}</span>
        <span className="font-mono text-sm text-stone-700 flex-1">
          {component.name}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp();
            }}
            disabled={isFirst}
            className="p-1 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronUp className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown();
            }}
            disabled={isLast}
            className="p-1 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronDown className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:bg-red-100 text-stone-400 hover:text-red-600"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-stone-400 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Fields */}
      {isExpanded && (
        <div className="p-3 space-y-3 border-t border-stone-100">
          {component.fields.map((field) => {
            const currentValue = section.values[field.name] || field.default;
            const showColorPicker = field.type === "text" && isHexColorField(field);
            const showSkillIconsPicker = isSkillIconsField(field, section.componentId);
            const currentTheme = section.values["theme"] as "dark" | "light" || "dark";
            
            return (
              <div key={field.name}>
                <label className="block font-mono text-xs text-stone-500 mb-1">
                  {field.label}
                </label>
                {showSkillIconsPicker ? (
                  <SkillIconsPicker
                    value={currentValue}
                    onChange={(val) => handleFieldChange(field.name, val)}
                    theme={currentTheme}
                  />
                ) : field.type === "badges-picker" ? (
                  <SocialBadgesPicker
                    badges={(() => {
                      try {
                        return JSON.parse(currentValue || "[]");
                      } catch {
                        return [];
                      }
                    })()}
                    style={section.values["badgeStyle"] || "for-the-badge"}
                    onChange={(badges, style) => {
                      handleFieldChange(field.name, JSON.stringify(badges));
                      handleFieldChange("badgeStyle", style);
                    }}
                  />
                ) : field.type === "textarea" ? (
                  <textarea
                    value={currentValue}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    className="
                      w-full px-2 py-1.5
                      font-mono text-sm text-stone-800
                      border-b border-stone-200 focus:border-stone-400
                      bg-transparent
                      resize-none
                      outline-none
                      break-all
                    "
                  />
                ) : field.type === "select" ? (
                  <select
                    value={currentValue}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="
                      w-full px-2 py-1.5
                      font-mono text-sm text-stone-800
                      border border-stone-200 focus:border-stone-400
                      bg-white
                      outline-none
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
                      border border-stone-200 focus:border-stone-400
                      bg-white
                      outline-none
                    "
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                ) : field.type === "color" || showColorPicker ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={toColorPickerValue(currentValue)}
                      onChange={(e) => handleFieldChange(field.name, fromColorPickerValue(e.target.value))}
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
                      placeholder={field.placeholder}
                      className="
                        flex-1 px-2 py-1.5
                        font-mono text-sm text-stone-800
                        border-b border-stone-200 focus:border-stone-400
                        bg-transparent
                        outline-none
                      "
                    />
                    {/^[0-9A-Fa-f]{6}$/.test(currentValue) && (
                      <div
                        className="w-4 h-4 border border-stone-300"
                        style={{ backgroundColor: `#${currentValue}` }}
                      />
                    )}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={currentValue}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="
                      w-full px-2 py-1.5
                      font-mono text-sm text-stone-800
                      border-b border-stone-200 focus:border-stone-400
                      bg-transparent
                      outline-none
                      overflow-hidden text-ellipsis
                    "
                  />
                )}
                {/* Show resolved value for placeholders */}
                {currentValue?.includes("{{") && (
                  <p className="font-mono text-xs text-stone-400 mt-1 break-all">
                    → {getDisplayValue(currentValue)}
                  </p>
                )}
                {/* Show preview for long URLs */}
                {currentValue?.length > 60 && !currentValue?.includes("{{") && (
                  <p className="font-mono text-xs text-stone-400 mt-1 break-all truncate max-w-full" title={currentValue}>
                    {currentValue.slice(0, 60)}...
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
