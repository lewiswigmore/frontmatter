import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, FileText, Layers } from "lucide-react";
import { archetypes } from "../../data/archetypes";
import { templates } from "../../data/templates";
import type { ArchetypeId } from "../../data/templates";
import { IconFromName } from "../../components/IconMap";

interface ArchetypeRouteProps {
  params: Promise<{
    archetype: string;
  }>;
}

export function generateStaticParams() {
  return archetypes.map((a) => ({ archetype: a.id }));
}

export async function generateMetadata({ params }: ArchetypeRouteProps): Promise<Metadata> {
  const { archetype: slug } = await params;
  const archetype = archetypes.find((a) => a.id === slug);
  if (!archetype) return {};
  return {
    title: `${archetype.name} Templates`,
    description: archetype.description,
  };
}

export default async function ArchetypeTemplatesPage({ params }: ArchetypeRouteProps) {
  const { archetype: archetypeSlug } = await params;
  const archetype = archetypes.find((item) => item.id === archetypeSlug);
  if (!archetype) {
    notFound();
  }

  const matchingTemplates = templates.filter(
    (template) => template.archetypeIds.includes(archetype.id as ArchetypeId)
  );

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
        <header className="border-b border-stone-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="py-3 flex items-center justify-between">
            <Link
              href="/builder"
              title="All archetypes"
              className="flex items-center gap-2 text-stone-500 hover:text-stone-700 transition-colors"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" />
              <span className="font-mono text-xs">All archetypes</span>
            </Link>
            <Link
              href="/builder/gallery"
              title="Browse gallery"
              className="font-mono text-xs text-stone-400 hover:text-stone-600 transition-colors"
            >
              Browse gallery
            </Link>
          </div>
        </header>

        <main className="flex-1 py-10 sm:py-14">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 border border-stone-200 bg-white flex items-center justify-center text-stone-500">
                <IconFromName name={archetype.preview} className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-mono text-xs uppercase tracking-widest text-stone-400">
                  {archetype.tagline}
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-1">
                  {archetype.name}
                </h1>
                <p className="font-mono text-sm text-stone-500 mt-3 max-w-2xl">
                  {archetype.description}
                </p>
                <p className="font-mono text-xs text-stone-400 mt-2 max-w-2xl">
                  {archetype.persona}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Link
                href={`/builder/${archetype.id}/edit`}
                title="Start with the archetype's default sections"
                className="border border-stone-200 hover:border-stone-400 transition-colors bg-white p-4 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 text-stone-600">
                  <Layers aria-hidden="true" className="w-4 h-4" />
                  <span className="font-mono text-xs">Use defaults</span>
                </div>
                <p className="font-mono text-xs text-stone-500">
                  Start with the archetype’s base structure.
                </p>
              </Link>
              <Link
                href={`/builder/${archetype.id}/edit?blank=true`}
                title="Start with an empty canvas"
                className="border border-stone-200 hover:border-stone-400 transition-colors bg-white p-4 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 text-stone-600">
                  <FileText aria-hidden="true" className="w-4 h-4" />
                  <span className="font-mono text-xs">Start from scratch</span>
                </div>
                <p className="font-mono text-xs text-stone-500">
                  Begin with an empty canvas for this archetype.
                </p>
              </Link>
              <div className="border border-dashed border-stone-200 bg-stone-50 p-4">
                <p className="font-mono text-xs text-stone-400">
                  {matchingTemplates.length} template{matchingTemplates.length === 1 ? "" : "s"} available
                </p>
                <p className="font-mono text-xs text-stone-500 mt-2">
                  Pick a ready-made setup below to move faster.
                </p>
              </div>
            </div>

            <section className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-stone-900">Templates</h2>
                <span className="font-mono text-xs text-stone-400">
                  {matchingTemplates.length} total
                </span>
              </div>

              {matchingTemplates.length === 0 ? (
                <div className="border border-dashed border-stone-300 p-6 text-center">
                  <p className="font-mono text-sm text-stone-400">
                    No templates yet for this archetype.
                  </p>
                  <Link
                    href={`/builder/${archetype.id}/edit`}
                    className="inline-flex items-center gap-2 font-mono text-xs text-orange-600 hover:text-orange-700 mt-3"
                  >
                    Use defaults instead
                    <ArrowRight aria-hidden="true" className="w-3 h-3" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchingTemplates.map((template) => (
                    <Link
                      key={template.id}
                      href={`/builder/${archetype.id}/edit?template=${template.id}`}
                      className="border border-stone-200 bg-white p-4 flex flex-col hover:border-stone-300 transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-0.5 text-stone-500">
                          <IconFromName name={template.icon} className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-base text-stone-900 leading-tight">
                            {template.name}
                          </h3>
                          <p className="font-mono text-xs text-stone-500 mt-1 line-clamp-2">
                            {template.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {template.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 font-mono text-[10px] text-stone-500 bg-stone-50 border border-stone-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                        <span className="font-mono text-[10px] text-stone-400">
                          {template.sections.length} section{template.sections.length !== 1 ? "s" : ""}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-orange-600">
                          Use
                          <ArrowRight aria-hidden="true" className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
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
