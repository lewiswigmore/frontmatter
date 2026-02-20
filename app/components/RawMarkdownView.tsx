"use client";

import { useState, useCallback, useMemo } from "react";
import { Section } from "../types";
import { getComponentById } from "../data/components";
import { Copy } from "lucide-react";

const DANGEROUS_KEYS = new Set(["__proto__", "constructor", "prototype"]);
function safeFromEntries(entries: [string, string][]): Record<string, string> {
  return Object.fromEntries(entries.filter(([k]) => !DANGEROUS_KEYS.has(k)));
}

interface RawMarkdownViewProps {
  sections: Section[];
  globalValues: Record<string, string>;
}

export function generateMarkdownForSection(
  section: Section,
  globalValues: Record<string, string>
): string {
  const component = getComponentById(section.componentId);
  if (!component) return "";

  let markdown = component.template;

  // Replace field values
  Object.entries(section.values).forEach(([key, value]) => {
    markdown = markdown.replace(
      new RegExp(`\\{\\{${key}\\}\\}`, "g"),
      value
    );
  });

  // Replace remaining global values
  Object.entries(globalValues).forEach(([key, value]) => {
    markdown = markdown.replace(
      new RegExp(`\\{\\{${key}\\}\\}`, "g"),
      value
    );
  });

  // Clean up lines with empty values (e.g., "**Denied:** " → remove line)
  markdown = markdown
    .split("\n")
    .filter((line) => !/^\*\*[^*]+:\*\*\s*$/.test(line.trim()))
    .join("\n");

  // Post-process separator styles
  if (section.componentId === "extras-separator") {
    const style = section.values.style || "line";
    if (style === "line") markdown = "---";
    else if (style === "dots") markdown = "· · ·";
    else if (style === "blank") markdown = "&nbsp;";
  }

  // MCP target header — generate client-specific instructions
  if (section.componentId === "mcp-target-header") {
    const client = section.values.client || "claude-desktop";
    const configs: Record<string, string> = {
      "claude-desktop": `## MCP Configuration — Claude Desktop\n\n> Add the server blocks below to the \`mcpServers\` object in your config file:\n>\n> **macOS:** \`~/Library/Application Support/Claude/claude_desktop_config.json\`\n> **Windows:** \`%APPDATA%\\Claude\\claude_desktop_config.json\``,
      "vscode": `## MCP Configuration — VS Code\n\n> Add the server blocks below to your MCP config:\n>\n> **Workspace:** \`.vscode/mcp.json\` (use \`"servers"\` instead of \`"mcpServers"\`)\n> **User:** Settings → search "mcp" → Edit in settings.json under \`"mcp.servers"\``,
      "cursor": `## MCP Configuration — Cursor\n\n> Add the server blocks below to your Cursor MCP config:\n>\n> **Global:** \`~/.cursor/mcp.json\` under \`"mcpServers"\`\n> **Workspace:** \`.cursor/mcp.json\` under \`"mcpServers"\``,
      "windsurf": `## MCP Configuration — Windsurf\n\n> Add the server blocks below to your Windsurf MCP config:\n>\n> **Config:** \`~/.codeium/windsurf/mcp_config.json\` under \`"mcpServers"\``,
      "claude-code": `## MCP Configuration — Claude Code\n\n> Add servers using the Claude Code CLI:\n>\n> **Project:** \`claude mcp add <name> -- <command> <args...>\`\n> **Global:** \`claude mcp add --scope user <name> -- <command> <args...>\``,
    };
    markdown = configs[client] || configs["claude-desktop"];
  }

  // MCP stdio server (base + all presets)
  if (
    section.componentId === "mcp-server-block" ||
    section.componentId.startsWith("mcp-preset-")
  ) {
    const serverName = section.values.serverName || "server";
    const command = section.values.command || "npx";
    let args: string[] = [];
    try { args = JSON.parse(section.values.args || "[]"); } catch { args = []; }
    if (!Array.isArray(args)) args = [];
    let env: [string, string][] = [];
    try {
      const parsed = JSON.parse(section.values.env || "[]");
      if (Array.isArray(parsed)) env = parsed;
      else if (typeof parsed === "object" && parsed !== null) env = Object.entries(parsed);
    } catch { env = []; }

    const serverConfig: Record<string, unknown> = { command, args };
    if (env.length > 0) {
      serverConfig.env = safeFromEntries(env);
    }
    const config = { mcpServers: { [serverName]: serverConfig } };
    markdown = "```json\n" + JSON.stringify(config, null, 2) + "\n```";
  }

  // MCP URL-based server (SSE / Streamable HTTP)
  if (section.componentId === "mcp-sse-server") {
    const serverName = section.values.serverName || "server";
    const url = section.values.url || "http://localhost:3001/sse";
    let env: [string, string][] = [];
    try {
      const parsed = JSON.parse(section.values.env || "[]");
      if (Array.isArray(parsed)) env = parsed;
      else if (typeof parsed === "object" && parsed !== null) env = Object.entries(parsed);
    } catch { env = []; }

    const serverConfig: Record<string, unknown> = { url };
    if (env.length > 0) {
      serverConfig.env = safeFromEntries(env);
    }
    const config = { mcpServers: { [serverName]: serverConfig } };
    markdown = "```json\n" + JSON.stringify(config, null, 2) + "\n```";
  }

  return markdown;
}

// Determine if a frontmatter section is included in output for the given editor
export function isSectionIncludedForEditor(
  componentId: string,
  targetEditor: string
): boolean {
  if (!componentId.startsWith("frontmatter-")) return true;
  switch (targetEditor) {
    case "cursor":
      return componentId === "frontmatter-cursor";
    case "claude-code":
    case "windsurf":
      return false;
    default: // vscode, generic
      return true;
  }
}

export function generateMarkdownFromSections(
  sections: Section[],
  globalValues: Record<string, string>
): string {
  const editor = globalValues.targetEditor || "vscode";

  const outputSections = sections.filter((section) =>
    isSectionIncludedForEditor(section.componentId, editor)
  );

  const body = outputSections
    .map((section) => generateMarkdownForSection(section, globalValues))
    .join("\n\n");

  // For Cursor: auto-generate frontmatter if no cursor frontmatter section exists
  if (
    editor === "cursor" &&
    !sections.some((s) => s.componentId === "frontmatter-cursor")
  ) {
    const desc =
      globalValues.description || globalValues.agentName || "Agent rules";
    const cursorFrontmatter = `---\ndescription: ${desc}\nglobs: \nalwaysApply: true\n---`;
    return body
      ? cursorFrontmatter + "\n\n" + body
      : cursorFrontmatter;
  }

  return body;
}

export default function RawMarkdownView({
  sections,
  globalValues,
}: RawMarkdownViewProps) {
  const markdown = generateMarkdownFromSections(sections, globalValues);
  const lines = useMemo(() => markdown ? markdown.split('\n') : [], [markdown]);
  const wordCount = markdown ? markdown.split(/\s+/).filter(Boolean).length : 0;
  const [rawCopied, setRawCopied] = useState(false);
  const [copiedLine, setCopiedLine] = useState<number | null>(null);
  const [wordWrap, setWordWrap] = useState(true);

  const handleCopyRaw = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setRawCopied(true);
      setTimeout(() => setRawCopied(false), 2000);
    } catch { /* clipboard not available */ }
  };

  const handleCopyLine = useCallback(async (lineIndex: number) => {
    try {
      await navigator.clipboard.writeText(lines[lineIndex]);
      setCopiedLine(lineIndex);
      setTimeout(() => setCopiedLine((prev) => prev === lineIndex ? null : prev), 1200);
    } catch { /* clipboard not available */ }
  }, [lines]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto bg-stone-50 relative">
        {lines.length > 0 ? (
          <div className="p-4 font-mono text-xs">
            <table className="w-full border-collapse" role="presentation">
              <tbody>
                {lines.map((line, i) => {
                  const trimmed = line.trimStart();
                  let lineClass = "text-stone-700";
                  if (trimmed.startsWith("# ")) lineClass = "text-stone-900 font-semibold";
                  else if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) lineClass = "text-stone-800 font-medium";
                  else if (trimmed === "---") lineClass = "text-stone-400";
                  else if (trimmed.startsWith("```")) lineClass = "text-orange-600/70";
                  else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) lineClass = "text-stone-600";
                  else if (trimmed.startsWith("> ")) lineClass = "text-stone-500 italic";
                  return (
                    <tr key={i} className="leading-5 hover:bg-stone-100/60 transition-none group">
                      <td
                        className={`text-right pr-4 select-none w-8 align-top cursor-pointer ${copiedLine === i ? 'text-green-600' : 'text-stone-300 group-hover:text-stone-500'}`}
                        onClick={() => handleCopyLine(i)}
                        title="Copy line"
                      >{copiedLine === i ? '✓' : i + 1}</td>
                      <td className={`${lineClass} ${wordWrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'}`}>{line || ' '}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="font-mono text-sm text-stone-400">Add a section to see output</p>
          </div>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 19px,
              #78716c 19px,
              #78716c 20px
            )`,
            backgroundPosition: "0 16px",
          }}
        />
      </div>
      {lines.length > 0 && (
        <div className="shrink-0 px-4 py-1.5 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <span className="font-mono text-[11px] text-stone-400">
            {lines.length} {lines.length === 1 ? "line" : "lines"} · {wordCount} {wordCount === 1 ? "word" : "words"} · {markdown.length} chars
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setWordWrap((w) => !w)}
              className="font-mono text-[11px] text-stone-400 hover:text-stone-600 transition-colors"
              title={wordWrap ? "Disable word wrap" : "Enable word wrap"}
            >
              {wordWrap ? "Wrap: On" : "Wrap: Off"}
            </button>
            <button
              onClick={handleCopyRaw}
              className="flex items-center gap-1 font-mono text-[11px] text-stone-400 hover:text-stone-600 transition-colors"
              title="Copy raw markdown"
            >
              <Copy aria-hidden="true" className="w-3 h-3" />
              {rawCopied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
