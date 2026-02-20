"use client";

import { archetypes } from "../data/archetypes";
import { getComponentById } from "../data/components";
import { Archetype } from "../types";
import { X, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { IconFromName } from "./IconMap";

interface ArchetypePickerProps {
  onSelectArchetype: (archetype: Archetype) => void;
  isOpen: boolean;
  onClose: () => void;
  hasSections?: boolean;
}

export default function ArchetypePicker({
  onSelectArchetype,
  isOpen,
  onClose,
  hasSections,
}: ArchetypePickerProps) {
  const [pendingArchetype, setPendingArchetype] = useState<Archetype | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (pendingArchetype) {
          setPendingArchetype(null);
        } else {
          onClose();
        }
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      setPendingArchetype(null);
    };
  }, [isOpen, onClose, pendingArchetype]);

  if (!isOpen) return null;

  const handleSelect = (archetype: Archetype) => {
    if (hasSections) {
      setPendingArchetype(archetype);
    } else {
      onSelectArchetype(archetype);
      onClose();
    }
  };

  const handleConfirm = () => {
    if (pendingArchetype) {
      onSelectArchetype(pendingArchetype);
      setPendingArchetype(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/20">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={() => { setPendingArchetype(null); onClose(); }} />
      <div role="dialog" aria-modal="true" aria-label="Choose Archetype" className="relative bg-paper border border-stone-300 w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div>
            <h2 className="font-serif text-xl text-stone-900">Choose Your Archetype</h2>
            <p className="font-mono text-xs text-stone-500 mt-1">
              Start with a template — this will replace your current sections
            </p>
          </div>
          <button
            onClick={() => { setPendingArchetype(null); onClose(); }}
            aria-label="Close"
            title="Close"
            className="p-1 hover:bg-stone-100 text-stone-500"
          >
            <X aria-hidden="true" className="w-5 h-5" />
          </button>
        </div>

        {/* Confirm banner */}
        {pendingArchetype && (
          <div className="px-6 py-3 bg-orange-50 border-b border-orange-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <AlertTriangle aria-hidden="true" className="w-4 h-4 text-orange-600 shrink-0" />
              <span className="font-mono text-xs text-stone-700">
                Replace all sections with <strong>{pendingArchetype.name}</strong>?
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setPendingArchetype(null)}
                className="px-3 py-1 font-mono text-xs border border-stone-300 hover:bg-stone-100 text-stone-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-3 py-1 font-mono text-xs bg-orange-600 hover:bg-orange-700 text-white transition-colors"
              >
                Replace
              </button>
            </div>
          </div>
        )}

        {/* Archetypes Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {archetypes.map((archetype) => (
              <button
                key={archetype.id}
                onClick={() => handleSelect(archetype)}
                className={`
                  text-left p-4
                  border hover:border-stone-400
                  hover:bg-stone-50
                  transition-colors
                  group
                  ${pendingArchetype?.id === archetype.id ? "border-orange-400 bg-orange-50/50" : "border-stone-200"}
                `}
              >
                <div className="flex items-start gap-3">
                  <div className="text-stone-500 mt-0.5">
                    <IconFromName name={archetype.preview} className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base text-stone-900 group-hover:text-stone-700">
                      {archetype.name}
                    </h3>
                    <p className="font-mono text-xs text-stone-500 mt-0.5">
                      {archetype.tagline}
                    </p>
                  </div>
                </div>
                <p className="font-mono text-xs text-stone-600 mt-3 leading-relaxed">
                  {archetype.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {archetype.sections.map((s) => {
                    const comp = getComponentById(s.componentId);
                    return comp ? (
                      <span key={s.id} className="px-1.5 py-0.5 font-mono text-[10px] text-stone-500 bg-stone-50 border border-stone-200">
                        {comp.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
