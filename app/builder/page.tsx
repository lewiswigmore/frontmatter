import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { archetypes } from "../data/archetypes";
import { IconFromName } from "../components/IconMap";

export default function BuilderStartPage() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
        <header className="border-b border-stone-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <Link href="/" className="font-mono text-lg sm:text-xl tracking-tight text-stone-900 hover:opacity-80 transition-opacity">
                  frontmatter<span className="text-orange-600">.cc</span>
                </Link>
                <span className="hidden md:inline font-mono text-xs text-stone-400 border-l border-stone-300 pl-3">
                  AI Agent Studio
                </span>
              </div>
              <Link
                href="/builder/gallery"
                className="flex items-center gap-2 font-mono text-xs text-stone-500 hover:text-stone-700 transition-colors"
              >
                <BookOpen aria-hidden="true" className="w-3.5 h-3.5" />
                Gallery
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center py-16 sm:py-24">
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-2 justify-center text-stone-400 font-mono text-xs mb-4">
              <ArrowLeft aria-hidden="true" className="w-3.5 h-3.5" />
              Choose an archetype to continue
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 text-center">
              What do you want to build?
            </h1>
            <p className="font-mono text-sm text-stone-500 text-center mt-3 max-w-md mx-auto">
              Pick a structure first, then choose a template or start from scratch.
            </p>

            <div className="mt-10 space-y-3">
              {archetypes.map((archetype) => (
                <Link
                  key={archetype.id}
                  href={`/builder/${archetype.id}`}
                  className="
                    w-full text-left p-5
                    border border-stone-200 hover:border-stone-400
                    hover:bg-stone-50
                    transition-colors
                    group flex items-center gap-4
                  "
                >
                  <div className="shrink-0 text-stone-500">
                    <IconFromName name={archetype.preview} className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h2 className="font-serif text-lg text-stone-900 group-hover:text-stone-700">
                        {archetype.name}
                      </h2>
                      <span className="font-mono text-xs text-stone-400">
                        {archetype.tagline}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-stone-500 mt-1 leading-relaxed">
                      {archetype.description}
                    </p>
                  </div>
                  <ArrowRight aria-hidden="true" className="w-4 h-4 text-stone-300 group-hover:text-stone-500 shrink-0 transition-colors" />
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/builder/gallery"
                className="font-mono text-xs text-stone-400 hover:text-stone-600 transition-colors"
              >
                Or browse the full gallery for pre-made templates &rarr;
              </Link>
            </div>
          </div>
        </main>

        <footer className="border-t border-stone-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="py-2">
            <p className="font-mono text-xs text-stone-400 text-center">
              Build AI Agents that matter.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
