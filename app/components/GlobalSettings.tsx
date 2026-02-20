"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const editorOptions = [
  { value: "vscode", label: "VS Code / Copilot", hint: ".github/instructions/*.instructions.md" },
  { value: "cursor", label: "Cursor", hint: ".cursor/rules/*.md" },
  { value: "claude-code", label: "Claude Code", hint: "CLAUDE.md" },
  { value: "windsurf", label: "Windsurf", hint: ".windsurfrules" },
  { value: "generic", label: "Generic / Other", hint: "Plain markdown" },
] as const;

interface GlobalSettingsProps {
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
}

export default function GlobalSettings({ values, onChange }: GlobalSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const handleChange = (key: string, value: string) => {
    onChange({ ...values, [key]: value });
  };

  const selectedEditor = editorOptions.find(e => e.value === (values.targetEditor || "vscode"));

  return (
    <div className="border border-stone-200 bg-white">
      <div
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        className={`px-3 py-2 bg-stone-50 ${isExpanded ? "border-b border-stone-200" : ""} cursor-pointer flex items-center justify-between`}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <span className="font-mono text-xs text-stone-500 uppercase tracking-widest">
          Agent Details
        </span>
        <ChevronDown aria-hidden="true" className={`w-4 h-4 text-stone-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
      </div>
      {!isExpanded && (
        <div className="px-3 py-1.5 border-t border-stone-100">
          <span className="font-mono text-xs text-stone-400 truncate block">
            {values.agentName || "unnamed"} — {selectedEditor?.label || "VS Code"}
          </span>
          {values.description && (
            <span className="font-mono text-[10px] text-stone-300 truncate block mt-0.5">
              {values.description.length > 60 ? values.description.slice(0, 60) + "…" : values.description}
            </span>
          )}
        </div>
      )}
      {isExpanded && <div className="p-3 space-y-3">
        <div>
          <label className="block font-mono text-xs text-stone-500 mb-1">
            Target Editor
          </label>
          <div className="grid grid-cols-1 gap-1">
            {editorOptions.map((editor) => (
              <button
                key={editor.value}
                type="button"
                onClick={() => handleChange("targetEditor", editor.value)}
                aria-pressed={(values.targetEditor || "vscode") === editor.value}
                className={`flex items-center justify-between px-2 py-1.5 font-mono text-xs text-left transition-colors ${
                  (values.targetEditor || "vscode") === editor.value
                    ? "bg-stone-100 text-stone-900 border border-stone-300"
                    : "text-stone-600 hover:bg-stone-50 border border-transparent"
                }`}
              >
                <span>{editor.label}</span>
                <span className="text-stone-400 text-[10px]">{editor.hint}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-mono text-xs text-stone-500 mb-1">
            Agent Name
          </label>
          <input
            type="text"
            value={values.agentName || ""}
            onChange={(e) => handleChange("agentName", e.target.value)}
            onFocus={(e) => e.target.select()}
            placeholder="my-agent"
            className="
              w-full px-2 py-1.5
              font-mono text-sm text-stone-800
              border-b border-stone-200 focus:border-stone-400
              focus-visible:border-stone-500
              bg-transparent
              outline-none
              placeholder:text-stone-300
            "
          />
        </div>
        <div>
          <label className="block font-mono text-xs text-stone-500 mb-1">
            Description
          </label>
          <textarea
            value={values.description || ""}
            onChange={(e) => {
              handleChange("description", e.target.value);
              const el = e.target;
              el.style.height = 'auto';
              el.style.height = Math.max(el.scrollHeight, 40) + 'px';
            }}
            ref={(el) => {
              if (el) {
                el.style.height = 'auto';
                el.style.height = Math.max(el.scrollHeight, 40) + 'px';
              }
            }}
            placeholder="What does this agent do?"
            style={{ minHeight: '40px' }}
            className="
              w-full px-2 py-1.5
              font-mono text-sm text-stone-800
              border-b border-stone-200 focus:border-stone-400
              focus-visible:border-stone-500
              bg-transparent
              resize-none
              outline-none
              overflow-hidden
              placeholder:text-stone-300
            "
          />
        </div>
        <div>
          <label className="block font-mono text-xs text-stone-500 mb-1">
            Author
          </label>
          <input
            type="text"
            value={values.author || ""}
            onChange={(e) => handleChange("author", e.target.value)}
            onFocus={(e) => e.target.select()}
            placeholder="Your Name"
            className="
              w-full px-2 py-1.5
              font-mono text-sm text-stone-800
              border-b border-stone-200 focus:border-stone-400
              focus-visible:border-stone-500
              bg-transparent
              outline-none
              placeholder:text-stone-300
            "
          />
        </div>
      </div>}
    </div>
  );
}
