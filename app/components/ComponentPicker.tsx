"use client";

import { useState } from "react";
import { components, componentCategories } from "../data/components";
import { ReadmeComponent } from "../types";
import {
  Type,
  BarChart3,
  Code2,
  Users,
  FolderGit2,
  Sparkles,
  Plus,
  X,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Type: <Type className="w-4 h-4" />,
  BarChart3: <BarChart3 className="w-4 h-4" />,
  Code2: <Code2 className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  FolderGit2: <FolderGit2 className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
};

interface ComponentPickerProps {
  onAddComponent: (component: ReadmeComponent) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ComponentPicker({
  onAddComponent,
  isOpen,
  onClose,
}: ComponentPickerProps) {
  const [activeCategory, setActiveCategory] = useState<string>("header");

  if (!isOpen) return null;

  const filteredComponents = components.filter(
    (c) => c.category === activeCategory
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/20">
      <div className="bg-paper border border-stone-300 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200">
          <h2 className="font-serif text-lg text-stone-900">Add Component</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-stone-100 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Categories Sidebar */}
          <div className="w-48 border-r border-stone-200 py-2">
            {componentCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  w-full flex items-center gap-2 px-4 py-2
                  font-mono text-sm text-left
                  transition-colors
                  ${
                    activeCategory === cat.id
                      ? "bg-stone-100 text-stone-900"
                      : "text-stone-600 hover:bg-stone-50"
                  }
                `}
              >
                {iconMap[cat.icon]}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Components List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {filteredComponents.map((component) => (
                <button
                  key={component.id}
                  onClick={() => {
                    onAddComponent(component);
                    onClose();
                  }}
                  className="
                    w-full text-left p-3
                    border border-stone-200 hover:border-stone-400
                    hover:bg-stone-50
                    transition-colors
                    group
                  "
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-mono text-sm font-medium text-stone-900">
                        {component.name}
                      </h3>
                      <p className="font-mono text-xs text-stone-500 mt-0.5">
                        {component.description}
                      </p>
                    </div>
                    <Plus className="w-4 h-4 text-stone-400 group-hover:text-stone-600" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
