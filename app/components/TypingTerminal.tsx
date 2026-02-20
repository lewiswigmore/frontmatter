"use client";

import { useState, useEffect } from "react";

const COMMAND = "cp config.md → .github/agents/";
const TYPE_SPEED = 65; // ms per character
const START_DELAY = 800; // ms before typing begins

export function TypingTerminal() {
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), START_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!started || charIndex >= COMMAND.length) return;
    const timeout = setTimeout(() => setCharIndex((i) => i + 1), TYPE_SPEED);
    return () => clearTimeout(timeout);
  }, [started, charIndex]);

  const typed = COMMAND.slice(0, charIndex);
  const done = charIndex >= COMMAND.length;

  return (
    <div aria-label="Terminal: cp config.md → .github/agents/" className="inline-flex items-center gap-3 px-5 py-3 border border-stone-200 bg-white font-mono text-xs text-stone-500">
      <span className="text-stone-400" aria-hidden="true">$</span>
      <span>
        {typed.split("config.md").map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && <span className="text-orange-600">config.md</span>}
          </span>
        ))}
      </span>
      <span
        className={`inline-block w-[2px] h-3.5 bg-orange-500 ${done ? "animate-pulse" : ""}`}
        aria-hidden="true"
      />
    </div>
  );
}
