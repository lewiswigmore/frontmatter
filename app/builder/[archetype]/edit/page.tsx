import type { Metadata } from "next";
import { archetypes } from "../../../data/archetypes";
import EditorClient from "./EditorClient";

export function generateStaticParams() {
  return archetypes.map((a) => ({ archetype: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ archetype: string }>;
}): Promise<Metadata> {
  const { archetype: slug } = await params;
  const archetype = archetypes.find((a) => a.id === slug);
  if (!archetype) return {};
  return {
    title: `${archetype.name} Builder`,
    description: `Build a ${archetype.name} configuration with the visual editor.`,
  };
}

export default function BuilderEditorPage() {
  return <EditorClient />;
}
