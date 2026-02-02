"use client";

import { archetypes } from "../data/archetypes";
import { Archetype } from "../types";
import { X } from "lucide-react";

interface ArchetypePickerProps {
  onSelectArchetype: (archetype: Archetype) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArchetypePicker({
  onSelectArchetype,
  isOpen,
  onClose,
}: ArchetypePickerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/20">
      <div className="bg-paper border border-stone-300 w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div>
            <h2 className="font-serif text-xl text-stone-900">Choose Your Archetype</h2>
            <p className="font-mono text-xs text-stone-500 mt-1">
              Start with a template that matches your persona
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-stone-100 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Archetypes Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {archetypes.map((archetype) => (
              <button
                key={archetype.id}
                onClick={() => {
                  onSelectArchetype(archetype);
                  onClose();
                }}
                className="
                  text-left p-4
                  border border-stone-200 hover:border-stone-400
                  hover:bg-stone-50
                  transition-colors
                  group
                "
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{archetype.preview}</span>
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
                <p className="font-mono text-xs text-stone-400 mt-2 italic">
                  {archetype.persona}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
