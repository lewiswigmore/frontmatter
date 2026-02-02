"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Heart } from "lucide-react";
import { archetypes } from "../../data/archetypes";
import { components, componentCategories } from "../../data/components";

type TabType = "archetypes" | "components" | "integrations";

const integrations = [
  {
    name: "GitHub Readme Stats",
    description: "Dynamically generated stats for your GitHub readmes",
    url: "https://github.com/anuraghazra/github-readme-stats",
    features: ["Stats Card", "Top Languages", "Repo Cards", "Wakatime Stats"],
  },
  {
    name: "GitHub Readme Streak Stats",
    description: "Display your contribution streak",
    url: "https://github.com/DenverCoder1/github-readme-streak-stats",
    features: ["Current Streak", "Longest Streak", "Total Contributions"],
  },
  {
    name: "GitHub Profile Trophy",
    description: "Add dynamically generated GitHub Trophy to your readme",
    url: "https://github.com/ryo-ma/github-profile-trophy",
    features: ["Multiple Trophies", "Ranks", "Themes"],
  },
  {
    name: "Skill Icons",
    description: "Showcase your skills with beautiful icons",
    url: "https://github.com/tandpfun/skill-icons",
    features: ["100+ Icons", "Dark/Light Themes", "Grid Layout"],
  },
  {
    name: "Readme Typing SVG",
    description: "Dynamically generated typing effect",
    url: "https://github.com/DenverCoder1/readme-typing-svg",
    features: ["Custom Text", "Adjustable Speed", "Multiple Lines"],
  },
  {
    name: "GitHub Activity Graph",
    description: "A dynamically generated activity graph",
    url: "https://github.com/Ashutosh00710/github-readme-activity-graph",
    features: ["Contribution Graph", "Multiple Themes", "Customizable"],
  },
  {
    name: "Shields.io",
    description: "Quality metadata badges for open source projects",
    url: "https://shields.io",
    features: ["Any Badge", "Custom Colors", "Dynamic Data"],
  },
  {
    name: "Capsule Render",
    description: "Dynamic header and footer images",
    url: "https://github.com/kyechan99/capsule-render",
    features: ["Waving", "Gradient", "Animation"],
  },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("archetypes");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredComponents =
    activeCategory === "all"
      ? components
      : components.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
      <header className="border-b border-stone-200 bg-paper sticky top-0 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/builder"
                className="flex items-center gap-2 text-stone-500 hover:text-stone-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-mono text-sm">Back to Builder</span>
              </Link>
              <div className="w-px h-6 bg-stone-200" />
              <h1 className="font-serif text-xl text-stone-900">Gallery</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-stone-200 bg-stone-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex gap-0">
            {(["archetypes", "components", "integrations"] as TabType[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                  px-4 py-3
                  font-mono text-sm capitalize
                  border-b-2 -mb-px
                  transition-colors
                  ${
                    activeTab === tab
                      ? "border-stone-900 text-stone-900"
                      : "border-transparent text-stone-500 hover:text-stone-700"
                  }
                `}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 border-x border-stone-200">
      <div className="p-4 sm:p-6">
        {activeTab === "archetypes" && (
          <div>
            <div className="mb-6">
              <h2 className="font-serif text-2xl text-stone-900 mb-2">
                Persona Archetypes
              </h2>
              <p className="font-mono text-sm text-stone-500">
                Start with a template that matches who you are as a developer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {archetypes.map((archetype) => (
                <div
                  key={archetype.id}
                  className="border border-stone-200 bg-white p-5 hover:border-stone-400 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{archetype.preview}</span>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-stone-900">
                        {archetype.name}
                      </h3>
                      <p className="font-mono text-xs text-stone-500 mt-0.5">
                        {archetype.tagline}
                      </p>
                      <p className="font-mono text-sm text-stone-600 mt-3">
                        {archetype.description}
                      </p>
                      <p className="font-mono text-xs text-stone-400 mt-2 italic">
                        {archetype.persona}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="font-mono text-xs text-stone-400">
                          {archetype.sections.length} sections
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "components" && (
          <div>
            <div className="mb-6">
              <h2 className="font-serif text-2xl text-stone-900 mb-2">
                Component Library
              </h2>
              <p className="font-mono text-sm text-stone-500">
                Mix and match components to build your perfect README.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveCategory("all")}
                className={`
                  px-3 py-1.5 font-mono text-xs border transition-colors
                  ${
                    activeCategory === "all"
                      ? "bg-stone-900 text-white border-stone-900"
                      : "bg-transparent text-stone-600 border-stone-300 hover:border-stone-400"
                  }
                `}
              >
                All
              </button>
              {componentCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    px-3 py-1.5 font-mono text-xs border transition-colors
                    ${
                      activeCategory === cat.id
                        ? "bg-stone-900 text-white border-stone-900"
                        : "bg-transparent text-stone-600 border-stone-300 hover:border-stone-400"
                    }
                  `}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredComponents.map((component) => (
                <div
                  key={component.id}
                  className="border border-stone-200 bg-white p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-stone-500 bg-stone-100 mb-2">
                        {component.category}
                      </span>
                      <h3 className="font-mono text-sm font-medium text-stone-900">
                        {component.name}
                      </h3>
                      <p className="font-mono text-xs text-stone-500 mt-1">
                        {component.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-stone-100">
                    <span className="font-mono text-xs text-stone-400">
                      {component.fields.length} field
                      {component.fields.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "integrations" && (
          <div>
            <div className="mb-6">
              <h2 className="font-serif text-2xl text-stone-900 mb-2">
                Integrations
              </h2>
              <p className="font-mono text-sm text-stone-500">
                Third-party services that power your dynamic README content.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((integration) => (
                <a
                  key={integration.name}
                  href={integration.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-stone-200 bg-white p-5 hover:border-stone-400 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-mono text-sm font-medium text-stone-900 group-hover:text-stone-700">
                      {integration.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-600" />
                  </div>
                  <p className="font-mono text-xs text-stone-500 mt-2">
                    {integration.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {integration.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-0.5 font-mono text-[10px] text-stone-600 bg-stone-100"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      </main>

      <footer className="border-t border-x border-stone-200 bg-paper shrink-0">
        <div className="px-3 py-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-stone-400">
              frontmatter<span className="text-orange-600">.cc</span>
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://ko-fi.com/lewiswigmore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-stone-400 hover:text-orange-600 transition-colors"
              >
                <Heart className="w-3 h-3" />
                Support
              </a>
              <span className="font-mono text-xs text-stone-400">
                {components.length} components · {archetypes.length} archetypes
              </span>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
