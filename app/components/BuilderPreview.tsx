"use client";

import { useState, useEffect } from "react";
import { MousePointer2, Bot, Plug, FileText, Settings, Terminal, Wind } from "lucide-react";

const archetypeIcons: Record<string, React.ReactNode> = {
  "agent-skill": <Bot aria-hidden="true" className="w-6 h-6 text-stone-700" />,
  "cursor-rules": <MousePointer2 aria-hidden="true" className="w-6 h-6 text-stone-700" />,
  "claude-code": <Terminal aria-hidden="true" className="w-6 h-6 text-stone-700" />,
  "mcp-config": <Plug aria-hidden="true" className="w-6 h-6 text-stone-700" />,
  "system-prompt": <FileText aria-hidden="true" className="w-6 h-6 text-stone-700" />,
  "copilot-instructions": <Settings aria-hidden="true" className="w-6 h-6 text-stone-700" />,
  "windsurf-rules": <Wind aria-hidden="true" className="w-6 h-6 text-stone-700" />,
};

const archetypeCards = [
  {
    id: "agent-skill",
    name: "VS Code Agent Skill",
    tagline: "Extend GitHub Copilot",
    preview: [
      { type: "yaml", content: "---" },
      { type: "yaml", content: "name: code-reviewer" },
      { type: "yaml", content: "description: Reviews PRs" },
      { type: "yaml", content: "version: 1.0.0" },
      { type: "yaml", content: "---" },
      { type: "heading", content: "## Role: Code Reviewer" },
      { type: "text", content: "You are an expert code reviewer." },
      { type: "text", content: "- Check for security issues" },
      { type: "text", content: "- Suggest performance gains" },
    ],
  },
  {
    id: "cursor-rules",
    name: "Cursor Rules",
    tagline: "Configure Cursor AI",
    preview: [
      { type: "yaml", content: "---" },
      { type: "yaml", content: "description: TypeScript standards" },
      { type: "yaml", content: "globs: **/*.{ts,tsx}" },
      { type: "yaml", content: "alwaysApply: false" },
      { type: "yaml", content: "---" },
      { type: "heading", content: "## Tech Stack" },
      { type: "text", content: "- Next.js 16 (App Router)" },
      { type: "text", content: "- TypeScript (strict mode)" },
      { type: "heading", content: "## Forbidden" },
      { type: "text", content: "- Never use any" },
    ],
  },
  {
    id: "claude-code",
    name: "Claude Code",
    tagline: "Guide Claude in your project",
    preview: [
      { type: "heading", content: "## Project Overview" },
      { type: "text", content: "A Next.js web application." },
      { type: "heading", content: "## Common Commands" },
      { type: "code", content: "npm run dev    # Start dev" },
      { type: "code", content: "npm run test   # Run tests" },
      { type: "heading", content: "## Conventions" },
      { type: "text", content: "- Use server components" },
      { type: "text", content: "- Strict TypeScript" },
    ],
  },
  {
    id: "mcp-config",
    name: "MCP Server Config",
    tagline: "Connect your tools",
    preview: [
      { type: "code", content: "{" },
      { type: "code", content: '  "mcpServers": {' },
      { type: "code", content: '    "postgres": {' },
      { type: "code", content: '      "command": "npx",' },
      { type: "code", content: '      "args": ["-y", "..."]' },
      { type: "code", content: "    }" },
      { type: "code", content: "  }" },
      { type: "code", content: "}" },
    ],
  },
  {
    id: "system-prompt",
    name: "System Prompt",
    tagline: "Shape the AI's behavior",
    preview: [
      { type: "yaml", content: "---" },
      { type: "yaml", content: "name: writing-assistant" },
      { type: "yaml", content: "author: You" },
      { type: "yaml", content: "---" },
      { type: "heading", content: "# Role" },
      { type: "text", content: "You are a helpful assistant." },
      { type: "heading", content: "# Rules" },
      { type: "text", content: "1. Be concise." },
      { type: "text", content: "2. Use markdown." },
    ],
  },
  {
    id: "copilot-instructions",
    name: "Copilot Instructions",
    tagline: "Guide your repo's AI",
    preview: [
      { type: "heading", content: "## Role: Senior Developer" },
      { type: "text", content: "You follow the team's conventions" },
      { type: "text", content: "and write production-quality code." },
      { type: "heading", content: "## Rules" },
      { type: "text", content: "- Use TypeScript for all code" },
      { type: "text", content: "- Write unit tests" },
      { type: "text", content: "- Keep functions under 30 lines" },
      { type: "heading", content: "## Context" },
      { type: "text", content: "Next.js 15, Tailwind, TypeScript." },
    ],
  },
];

// Grid layout: 3 cards per row
const CARDS_PER_ROW = 3;
const CARD_WIDTH = 130;
const GAP = 12;
const PADDING = 16;

function getCardPosition(index: number) {
  const row = Math.floor(index / CARDS_PER_ROW);
  const col = index % CARDS_PER_ROW;
  const x = PADDING + col * (CARD_WIDTH + GAP) + CARD_WIDTH / 2;
  const y = 50 + row * 90 + 45;
  return { x, y };
}

export function BuilderPreview() {
  const [selectedArchetype, setSelectedArchetype] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-cycle through archetypes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Calculate next card position for cursor
      const nextIndex = (selectedArchetype + 1) % archetypeCards.length;
      const pos = getCardPosition(nextIndex);
      
      setCursorPos(pos);
      
      setTimeout(() => {
        setSelectedArchetype(nextIndex);
        setIsAnimating(false);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedArchetype]);

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 800);
    return () => clearInterval(blink);
  }, []);

  const currentArchetype = archetypeCards[selectedArchetype];

  // Render preview content (shared between mobile and desktop)
  const previewContent = (
    <div className="bg-white border border-stone-200 p-4 font-mono text-xs min-h-[180px]">
      <div className="space-y-1.5">
        {currentArchetype.preview.map((line, i) => (
          <div key={i} className="min-h-[1em]">
            {line.type === "heading" && (
              <span className="text-stone-900 font-bold text-sm">
                {line.content}
              </span>
            )}
            {line.type === "text" && (
              <span className="text-stone-600">{line.content}</span>
            )}
            {line.type === "yaml" && (
              <div className="text-purple-600 text-[11px] leading-tight">
                {line.content}
              </div>
            )}
            {line.type === "code" && (
              <div className="text-green-600 bg-stone-900 px-2 py-0.5 text-[10px] -my-[1px]">
                {line.content}
              </div>
            )}
          </div>
        ))}
        <span
          aria-hidden="true"
          className={`inline-block w-[2px] h-3 bg-orange-500 ml-0.5 ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile: Simplified view without animation */}
      <div className="block lg:hidden">
        <div className="bg-white border border-stone-200 overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-200 bg-stone-50">
            <div className="flex gap-1.5" aria-hidden="true">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="font-mono text-[10px] text-stone-400 px-2 py-0.5 bg-white border border-stone-200 rounded-sm">
                frontmatter.cc/builder/{currentArchetype.id}
              </div>
            </div>
          </div>
          
          {/* Archetype tabs */}
          <div className="flex overflow-x-auto border-b border-stone-200 bg-stone-50 scrollbar-hide">
            {archetypeCards.map((arch, index) => (
              <button
                key={arch.id}
                onClick={() => setSelectedArchetype(index)}
                aria-pressed={selectedArchetype === index}
                className={`flex-shrink-0 px-3 py-2 font-mono text-xs border-b-2 transition-colors ${
                  selectedArchetype === index
                    ? "border-orange-500 text-orange-600 bg-white"
                    : "border-transparent text-stone-500"
                }`}
              >
                <span className="mr-1.5 inline-flex">{archetypeIcons[arch.id]}</span>
                <span className="hidden sm:inline">{arch.name.replace("The ", "")}</span>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="p-4 bg-stone-50">
            {previewContent}
            <div className="mt-3 text-center">
              <span className="font-mono text-[10px] text-stone-400">
                Tap to explore • <span className="text-orange-600">{currentArchetype.name}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Full animated view */}
      <div className="hidden lg:block relative bg-white border border-stone-200 overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-200 bg-stone-50">
        <div className="flex gap-1.5" aria-hidden="true">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="font-mono text-xs text-stone-400 px-3 py-1 bg-white border border-stone-200 rounded-sm">
            frontmatter.cc/builder/{currentArchetype.id}
          </div>
        </div>
        <div className="w-12" />
      </div>

      {/* Builder UI mockup */}
      <div className="flex min-h-[320px]">
        {/* Left: Archetype picker */}
        <div className="w-1/2 border-r border-stone-200 p-4 relative">
          <div className="font-mono text-xs text-stone-500 mb-3 uppercase tracking-wide">
            Choose Archetype
          </div>
          <div className="flex flex-wrap gap-3">
            {archetypeCards.map((arch, index) => (
              <button
                key={arch.id}
                className={`relative w-[130px] p-3 border text-left transition-all duration-200 ${
                  selectedArchetype === index
                    ? "border-orange-500 bg-orange-50"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <div className="mb-1">{archetypeIcons[arch.id]}</div>
                <div className="font-serif text-sm text-stone-900 leading-tight">
                  {arch.name}
                </div>
                <div className="font-mono text-[10px] text-stone-500 mt-0.5">
                  {arch.tagline}
                </div>
                {selectedArchetype === index && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Animated cursor */}
          <div
            className={`absolute pointer-events-none transition-all duration-300 ease-out ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <MousePointer2 aria-hidden="true" className="w-5 h-5 text-orange-600 fill-orange-100" />
          </div>
        </div>

        {/* Right: Preview */}
        <div className="w-1/2 p-4 bg-stone-50">
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono text-xs text-stone-500 uppercase tracking-wide">
              Preview
            </div>
            <div className="font-mono text-[10px] px-2 py-0.5 bg-green-100 text-green-700 border border-green-200">
              Ready to Copy
            </div>
          </div>
          
          {previewContent}

          {/* Action hint */}
          <div className="mt-3 text-center">
            <span className="font-mono text-[10px] text-stone-400">
              Archetype: <span className="text-orange-600">{currentArchetype.name}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
