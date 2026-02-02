"use client";

import { useState, useEffect } from "react";
import { MousePointer2, Twitter, Github } from "lucide-react";

const archetypeCards = [
  {
    id: "minimalist",
    name: "The Minimalist",
    emoji: "🪨",
    tagline: "Less is more",
    preview: [
      { type: "heading", content: "Alex Chen" },
      { type: "text", content: "Software Developer" },
      { type: "separator", content: "" },
      { type: "text", content: "→ Building open source tools" },
      { type: "text", content: "→ Always learning" },
      { type: "separator", content: "" },
      { type: "social", content: "twitter github" },
    ],
  },
  {
    id: "stats-junkie",
    name: "The Stats Junkie",
    emoji: "📊",
    tagline: "Numbers don't lie",
    preview: [
      { type: "typing", content: "Full Stack Developer..." },
      { type: "badge", content: "1.2k visitors" },
      { type: "stats", content: "GitHub Stats ████████ A+" },
      { type: "stats", content: "Streak: 127 days 🔥" },
      { type: "stats", content: "Top Langs: TS 45% JS 30%" },
      { type: "trophy", content: "🏆 🏆 🏆 🏆 🏆" },
    ],
  },
  {
    id: "terminal",
    name: "The Terminal",
    emoji: "💻",
    tagline: "$ sudo make me a README",
    preview: [
      { type: "ascii", content: "╔═══════════════════╗" },
      { type: "ascii", content: "║  > alex_chen_     ║" },
      { type: "ascii", content: "║  > engineer       ║" },
      { type: "ascii", content: "╚═══════════════════╝" },
      { type: "code", content: "$ npm run build" },
      { type: "code", content: "$ vim ~/.config" },
    ],
  },
  {
    id: "creative",
    name: "The Creative",
    emoji: "🎨",
    tagline: "Where code meets design",
    preview: [
      { type: "wave", content: "~~ gradient banner ~~" },
      { type: "typing", content: "Creative Developer..." },
      { type: "text", content: "✨ Building beautiful interfaces" },
      { type: "icons", content: "figma  react  tailwind" },
      { type: "badge", content: "Portfolio →" },
      { type: "wave", content: "~~ footer wave ~~" },
    ],
  },
  {
    id: "frontend-dev",
    name: "The Frontend Dev",
    emoji: "✨",
    tagline: "Pixels, passion & performance",
    preview: [
      { type: "wave", content: "~~ waving header ~~" },
      { type: "typing", content: "Building interfaces..." },
      { type: "icons", content: "html css react vue" },
      { type: "stats", content: "GitHub Stats ████████" },
      { type: "stats", content: "Top Langs: TS JS CSS" },
      { type: "badge", content: "@alexchen" },
    ],
  },
  {
    id: "open-source",
    name: "The Open Source Hero",
    emoji: "🦸",
    tagline: "Building in public",
    preview: [
      { type: "heading", content: "Hey! I'm Alex 👋" },
      { type: "badge", content: "Open Source Maintainer" },
      { type: "text", content: "→ Maintaining 12 projects" },
      { type: "stats", content: "GitHub Stats ████████" },
      { type: "project", content: "📦 my-awesome-lib ⭐ 2.4k" },
      { type: "sponsor", content: "☕ Buy me a coffee" },
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
  const y = 50 + row * 90 + 45; // 50 = header offset, 90 = card height + gap, 45 = center
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
  const PreviewContent = () => (
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
            {line.type === "typing" && (
              <span className="text-blue-600 italic">{line.content}</span>
            )}
            {line.type === "separator" && (
              <div className="border-t border-stone-200 my-2" />
            )}
            {line.type === "badge" && (
              <span className="inline-block bg-stone-100 px-2 py-0.5 text-[10px] border border-stone-200">
                {line.content}
              </span>
            )}
            {line.type === "stats" && (
              <div className="bg-stone-50 border border-stone-200 px-2 py-1 text-[10px] text-stone-500">
                {line.content}
              </div>
            )}
            {line.type === "trophy" && (
              <div className="text-center text-lg tracking-widest">
                {line.content}
              </div>
            )}
            {line.type === "ascii" && (
              <div className="text-green-600 font-bold text-[10px] leading-tight">
                {line.content}
              </div>
            )}
            {line.type === "code" && (
              <div className="text-green-500 bg-stone-900 px-2 py-0.5 text-[10px]">
                {line.content}
              </div>
            )}
            {line.type === "wave" && (
              <div className="text-center text-[10px] text-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 py-1">
                {line.content}
              </div>
            )}
            {line.type === "icons" && (
              <div className="flex gap-1">
                {line.content.split("  ").map((icon, j) => (
                  <span key={j} className="bg-stone-800 text-white px-1.5 py-0.5 text-[9px]">
                    {icon}
                  </span>
                ))}
              </div>
            )}
            {line.type === "social" && (
              <div className="flex gap-2 items-center">
                {line.content.includes("twitter") && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-stone-500">
                    <Twitter className="w-3 h-3" />
                  </span>
                )}
                {line.content.includes("github") && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-stone-500">
                    <Github className="w-3 h-3" />
                  </span>
                )}
              </div>
            )}
            {line.type === "project" && (
              <div className="bg-stone-50 border border-stone-200 px-2 py-1 text-[10px]">
                {line.content}
              </div>
            )}
            {line.type === "sponsor" && (
              <span className="inline-block bg-orange-100 text-orange-700 px-2 py-0.5 text-[10px] border border-orange-200">
                {line.content}
              </span>
            )}
          </div>
        ))}
        <span
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
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="font-mono text-[10px] text-stone-400 px-2 py-0.5 bg-white border border-stone-200 rounded-sm">
                frontmatter.cc/builder
              </div>
            </div>
          </div>
          
          {/* Archetype tabs */}
          <div className="flex overflow-x-auto border-b border-stone-200 bg-stone-50 scrollbar-hide">
            {archetypeCards.map((arch, index) => (
              <button
                key={arch.id}
                onClick={() => setSelectedArchetype(index)}
                className={`flex-shrink-0 px-3 py-2 font-mono text-xs border-b-2 transition-colors ${
                  selectedArchetype === index
                    ? "border-orange-500 text-orange-600 bg-white"
                    : "border-transparent text-stone-500"
                }`}
              >
                <span className="mr-1">{arch.emoji}</span>
                <span className="hidden sm:inline">{arch.name.replace("The ", "")}</span>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="p-4 bg-stone-50">
            <PreviewContent />
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
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="font-mono text-xs text-stone-400 px-3 py-1 bg-white border border-stone-200 rounded-sm">
            frontmatter.cc/builder
          </div>
        </div>
        <div className="w-12" />
      </div>

      {/* Builder UI mockup */}
      <div className="flex min-h-[320px]">
        {/* Left: Archetype picker */}
        <div className="w-1/2 border-r border-stone-200 p-4 relative">
          <div className="font-mono text-xs text-stone-500 mb-3 uppercase tracking-wide">
            Select Archetype
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
                <div className="text-2xl mb-1">{arch.emoji}</div>
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
            <MousePointer2 className="w-5 h-5 text-orange-600 fill-orange-100" />
          </div>
        </div>

        {/* Right: Preview */}
        <div className="w-1/2 p-4 bg-stone-50">
          <div className="flex items-center justify-between mb-3">
            <div className="font-mono text-xs text-stone-500 uppercase tracking-wide">
              Preview
            </div>
            <div className="font-mono text-[10px] px-2 py-0.5 bg-green-100 text-green-700 border border-green-200">
              GitHub Ready
            </div>
          </div>
          
          <PreviewContent />

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
