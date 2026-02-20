import Link from "next/link";
import { ArrowRight, Layers, Zap, Copy, Github, Heart, MessageSquarePlus, FileCode, Plug, Terminal } from "lucide-react";
import { FAQAccordion } from "./components/FAQAccordion";
import { BuilderPreview } from "./components/BuilderPreview";
import { TypingTerminal } from "./components/TypingTerminal";

const faqs = [
  {
    question: "What is an AI Agent Skill?",
    answer:
      "An AI Agent Skill is a markdown file with YAML frontmatter that defines custom instructions, tools, and behaviors for AI assistants like GitHub Copilot. It allows you to extend the AI's capabilities with your own domain knowledge.",
  },
  {
    question: "What is an MCP Configuration?",
    answer:
      "Model Context Protocol (MCP) allows AI models to securely connect to local or remote data sources. An MCP configuration is a JSON block that tells your AI client (like Claude Desktop or VS Code) how to connect to these servers.",
  },
  {
    question: "Is frontmatter.cc free to use?",
    answer:
      "Yes, completely free and open source under the MIT license. No account required, no hidden fees, no premium features locked behind a paywall.",
  },
  {
    question: "How do I use my generated files?",
    answer:
      "Click Copy or Download in the builder, then place the file in the right location for your editor: .github/agents/ for VS Code, .cursor/rules/ for Cursor, CLAUDE.md for Claude Code, .windsurfrules for Windsurf, or skills/ for OpenClaw.",
  },
  {
    question: "What are archetypes?",
    answer:
      "Archetypes define the structure and output format for a specific editor or use case — VS Code Agent Skills, Cursor Rules, Claude Code, OpenClaw Skills, MCP Server Configs, System Prompts, and more. Pick one, then choose from matching templates or start from scratch.",
  },
  {
    question: "Can I customize the components?",
    answer:
      "Absolutely. Every component is editable—change your agent's name, define custom JSON schemas for tools, add few-shot examples, or configure environment variables.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "frontmatter.cc",
  description:
    "A free, open source visual builder for AI Agent Skills, Prompts, and MCP Configurations.",
  url: "https://frontmatter.cc",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Lewis Wigmore",
    url: "https://github.com/lewiswigmore",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\u003c') }}
      />
      <header className="border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-mono text-xl text-stone-900">
              frontmatter<span className="text-orange-600">.cc</span>
            </h1>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/lewiswigmore/frontmatter"
                target="_blank"
                rel="noopener noreferrer"
                title="Star on GitHub"
                className="flex items-center gap-1.5 font-mono text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                <Github aria-hidden="true" className="w-4 h-4" />
                <span className="hidden sm:inline">Star on GitHub</span>
              </a>
              <Link
                href="/builder"
                className="font-mono text-sm px-4 py-2 border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-colors"
                title="Open the builder"
              >
                Open Builder
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-tight mb-6">
              Build AI Agents that
              <br />
              <span className="text-orange-600">matter.</span>
            </h2>
            <p className="font-mono text-sm sm:text-base text-stone-600 max-w-xl mx-auto mb-10 leading-relaxed">
              A free, open source visual builder for AI Agent Skills, Prompts, and MCP Configurations. Pick an archetype,
              customize components, copy the code. Done in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/builder"
                className="flex items-center gap-2 font-mono text-sm px-6 py-3 border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-colors"
                title="Start building your agent"
              >
                Start Building
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/lewiswigmore/frontmatter"
                target="_blank"
                rel="noopener noreferrer"
                title="View source code on GitHub"
                className="flex items-center gap-2 font-mono text-sm px-6 py-3 border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <Github aria-hidden="true" className="w-4 h-4" />
                View Source
              </a>
            </div>

            {/* File path hint */}
            <div className="mt-12 flex justify-center">
              <TypingTerminal />
            </div>

            {/* Works with */}
            <div className="mt-8">
              <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mb-3">
                Works with
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                <span className="font-mono text-xs text-stone-500">VS Code</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="font-mono text-xs text-stone-500">GitHub Copilot</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="font-mono text-xs text-stone-500">Cursor</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="font-mono text-xs text-stone-500">Claude Code</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="font-mono text-xs text-stone-500">Windsurf</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="font-mono text-xs text-stone-500">OpenClaw</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="font-mono text-xs text-stone-500">Claude Desktop</span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span className="font-mono text-xs text-stone-500">Any MCP Client</span>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-stone-200 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <h3 className="font-serif text-2xl text-stone-900 mb-2 text-center">
              Three steps, one file
            </h3>
            <p className="font-mono text-xs text-stone-500 text-center mb-12">
              From blank page to production-ready config
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="relative border border-stone-200 bg-white p-6">
                <span className="font-mono text-5xl text-stone-100 absolute top-3 right-4 select-none" aria-hidden="true">01</span>
                <div className="relative">
                  <Layers className="w-5 h-5 text-orange-600 mb-4" aria-hidden="true" />
                  <h4 className="font-serif text-lg text-stone-900 mb-2">Pick an archetype</h4>
                  <p className="font-mono text-xs text-stone-500 leading-relaxed">
                    Agent Skill, MCP Config, System Prompt, OpenClaw Skill, or Copilot Instructions — choose the structure that fits your use case.
                  </p>
                </div>
              </div>
              <div className="relative border border-stone-200 bg-white p-6 border-t-0 md:border-t md:border-l-0">
                <span className="font-mono text-5xl text-stone-100 absolute top-3 right-4 select-none" aria-hidden="true">02</span>
                <div className="relative">
                  <Plug className="w-5 h-5 text-orange-600 mb-4" aria-hidden="true" />
                  <h4 className="font-serif text-lg text-stone-900 mb-2">Choose a template</h4>
                  <p className="font-mono text-xs text-stone-500 leading-relaxed">
                    Start from a pre-made template, use the archetype defaults, or begin from scratch. Then add components to customize.
                  </p>
                </div>
              </div>
              <div className="relative border border-stone-200 bg-white p-6 border-t-0 md:border-t md:border-l-0">
                <span className="font-mono text-5xl text-stone-100 absolute top-3 right-4 select-none" aria-hidden="true">03</span>
                <div className="relative">
                  <Copy className="w-5 h-5 text-orange-600 mb-4" aria-hidden="true" />
                  <h4 className="font-serif text-lg text-stone-900 mb-2">Edit, copy & ship</h4>
                  <p className="font-mono text-xs text-stone-500 leading-relaxed">
                    Customize components in the visual editor, preview the output live, then copy or download your file. Done.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="border-t border-stone-200">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-10">
              <p className="font-mono text-[10px] text-orange-600 uppercase tracking-widest mb-2">New</p>
              <h3 className="font-serif text-2xl text-stone-900 mb-2">
                Now with OpenClaw support
              </h3>
              <p className="font-mono text-xs text-stone-500 max-w-lg mx-auto leading-relaxed">
                Build SKILL.md files for OpenClaw — the open source personal AI assistant with 200k+ stars.
                Create skills that work across WhatsApp, Telegram, Slack, Discord, and more.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="border border-stone-200 p-5">
                <p className="font-mono text-xs text-orange-600 mb-1">5,700+</p>
                <p className="font-serif text-sm text-stone-900 mb-1">Community Skills</p>
                <p className="font-mono text-[11px] text-stone-400 leading-relaxed">Published on ClawHub, the official OpenClaw skills registry.</p>
              </div>
              <div className="border border-stone-200 p-5">
                <p className="font-mono text-xs text-orange-600 mb-1">15+ Channels</p>
                <p className="font-serif text-sm text-stone-900 mb-1">Multi-Platform</p>
                <p className="font-mono text-[11px] text-stone-400 leading-relaxed">WhatsApp, Telegram, Slack, Discord, iMessage, Teams, and more.</p>
              </div>
              <div className="border border-stone-200 p-5">
                <p className="font-mono text-xs text-orange-600 mb-1">Same Format</p>
                <p className="font-serif text-sm text-stone-900 mb-1">AgentSkills Compatible</p>
                <p className="font-mono text-[11px] text-stone-400 leading-relaxed">SKILL.md with YAML frontmatter — works with VS Code Agent Skills too.</p>
              </div>
            </div>
            <div className="text-center">
              <Link
                href="/builder/openclaw"
                className="inline-flex items-center gap-2 font-mono text-sm text-orange-600 hover:text-orange-700 transition-colors"
                title="Build an OpenClaw skill"
              >
                Build an OpenClaw skill
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-stone-200">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              <div className="flex gap-4">
                <FileCode className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="font-serif text-base text-stone-900 mb-1">50+ Building Blocks</h4>
                  <p className="font-mono text-xs text-stone-500 leading-relaxed">
                    YAML frontmatter, tool definitions with JSON Schema, MCP server entries, environment variables, few-shot examples, and more.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Terminal className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="font-serif text-base text-stone-900 mb-1">Real Output Formats</h4>
                  <p className="font-mono text-xs text-stone-500 leading-relaxed">
                    Generates valid .agent.md, SKILL.md, .mdc, CLAUDE.md, .windsurfrules, and OpenClaw skill files — not pseudocode.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Zap className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="font-serif text-base text-stone-900 mb-1">Instant Preview</h4>
                  <p className="font-mono text-xs text-stone-500 leading-relaxed">
                    See rendered markdown and raw source side-by-side as you build. Every edit updates live.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Github className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="font-serif text-base text-stone-900 mb-1">Open Source, No Lock-in</h4>
                  <p className="font-mono text-xs text-stone-500 leading-relaxed">
                    MIT licensed. No account, no telemetry, no server. Everything runs in your browser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Builder Preview */}
        <section className="border-t border-stone-200">
          <div className="max-w-5xl mx-auto px-4 py-16">
            <div className="text-center mb-10">
              <h3 className="font-serif text-2xl text-stone-900 mb-2">
                See it in action
              </h3>
              <p className="font-mono text-xs text-stone-500">
                Pick an archetype, customize components, preview your file in real-time
              </p>
            </div>
            <BuilderPreview />
            <div className="mt-6 text-center">
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 font-mono text-sm text-orange-600 hover:text-orange-700 transition-colors"
                title="Try the full builder"
              >
                Try the full builder
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-stone-200 bg-stone-50">
          <div className="max-w-2xl mx-auto px-4 py-16">
            <h3 className="font-serif text-2xl text-stone-900 mb-2 text-center">
              Frequently Asked Questions
            </h3>
            <p className="font-mono text-xs text-stone-500 text-center mb-10">
              Everything you need to know about building AI Agent files
            </p>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-stone-200">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-4">
              Your next agent starts here
            </h3>
            <p className="font-mono text-sm text-stone-500 mb-3 max-w-md mx-auto">
              No account needed. No data leaves your browser.
            </p>
            <p className="font-mono text-xs text-stone-400 mb-8">
              Free and open source — forever.
            </p>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 font-mono text-sm px-6 py-3 border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-colors"
              title="Open the builder"
            >
              Open the Builder
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="font-mono text-xs text-stone-400">
              frontmatter<span className="text-orange-600">.cc</span> — MIT License
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/lewiswigmore/frontmatter/issues/new?template=feature_request.md"
                target="_blank"
                rel="noopener noreferrer"
                title="Suggest a feature on GitHub"
                className="flex items-center gap-1 font-mono text-xs text-stone-400 hover:text-green-600 transition-colors"
              >
                <MessageSquarePlus aria-hidden="true" className="w-3 h-3" />
                Suggest Feature
              </a>
              <a
                href="https://ko-fi.com/lewiswigmore"
                target="_blank"
                rel="noopener noreferrer"
                title="Support on Ko-fi"
                className="flex items-center gap-1 font-mono text-xs text-stone-400 hover:text-orange-600 transition-colors"
              >
                <Heart aria-hidden="true" className="w-3 h-3" />
                Support
              </a>
              <a
                href="https://github.com/lewiswigmore/frontmatter"
                target="_blank"
                rel="noopener noreferrer"
                title="View source on GitHub"
                className="flex items-center gap-1 font-mono text-xs text-stone-400 hover:text-stone-600 transition-colors"
              >
                <Github aria-hidden="true" className="w-3 h-3" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
