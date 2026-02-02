import Link from "next/link";
import { ArrowRight, Layers, Zap, Copy, Github, Heart, MessageSquarePlus } from "lucide-react";
import { FAQAccordion } from "./components/FAQAccordion";
import { BuilderPreview } from "./components/BuilderPreview";

const faqs = [
  {
    question: "What is a GitHub profile README?",
    answer:
      "A GitHub profile README is a special repository that appears on your GitHub profile page. Create a repo with the same name as your username (e.g., github.com/yourname/yourname), add a README.md file, and it will be displayed on your profile.",
  },
  {
    question: "Is frontmatter.cc free to use?",
    answer:
      "Yes, completely free and open source under the MIT license. No account required, no hidden fees, no premium features locked behind a paywall.",
  },
  {
    question: "How do I use my generated README?",
    answer:
      "Click 'Copy Markdown' in the builder, then paste it into the README.md file in your profile repository (the repo named after your GitHub username). Commit and push—your profile will update instantly.",
  },
  {
    question: "What are archetypes?",
    answer:
      "Archetypes are pre-designed templates based on different developer personas: Minimalist, Stats Junkie, Terminal Hacker, Creative Designer, and more. Pick one as a starting point, then customize the components.",
  },
  {
    question: "Can I customize the components?",
    answer:
      "Absolutely. Every component is editable—change your username, select different stats, pick your tech stack icons, reorder sections, or remove anything you don't need.",
  },
  {
    question: "Will my README work on GitHub?",
    answer:
      "Yes. All generated markdown is GitHub-compatible. We use standard markdown syntax and popular badge/stats services that GitHub renders correctly.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "frontmatter.cc",
  description:
    "A free, open source design studio for creating GitHub profile READMEs with templates, components, and live preview.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
                className="flex items-center gap-1.5 font-mono text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">Star on GitHub</span>
              </a>
              <Link
                href="/builder"
                className="font-mono text-sm px-4 py-2 border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-colors"
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
              Make your README
              <br />
              <span className="text-orange-600">matter.</span>
            </h2>
            <p className="font-mono text-sm sm:text-base text-stone-600 max-w-xl mx-auto mb-10 leading-relaxed">
              A free, open source design studio for GitHub profile READMEs. Pick an archetype,
              customize components, copy the markdown. Done in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/builder"
                className="flex items-center gap-2 font-mono text-sm px-6 py-3 border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-colors"
              >
                Start Building
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/lewiswigmore/frontmatter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-sm px-6 py-3 border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <Github className="w-4 h-4" />
                View Source
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-stone-200 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 border border-stone-200 bg-white flex items-center justify-center">
                  <Layers className="w-5 h-5 text-stone-600" />
                </div>
                <h3 className="font-serif text-lg text-stone-900 mb-2">
                  9 Archetypes
                </h3>
                <p className="font-mono text-xs text-stone-500 leading-relaxed">
                  Start with a persona template that matches your developer identity.
                  Minimalist, Stats Junkie, Terminal, and more.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 border border-stone-200 bg-white flex items-center justify-center">
                  <Zap className="w-5 h-5 text-stone-600" />
                </div>
                <h3 className="font-serif text-lg text-stone-900 mb-2">
                  20+ Components
                </h3>
                <p className="font-mono text-xs text-stone-500 leading-relaxed">
                  Mix and match headers, stats cards, tech badges, social links,
                  and more. All GitHub-compatible.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 border border-stone-200 bg-white flex items-center justify-center">
                  <Copy className="w-5 h-5 text-stone-600" />
                </div>
                <h3 className="font-serif text-lg text-stone-900 mb-2">
                  One-Click Copy
                </h3>
                <p className="font-mono text-xs text-stone-500 leading-relaxed">
                  Preview your README, copy the raw markdown, paste into your
                  GitHub profile repo. That&apos;s it.
                </p>
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
                Pick an archetype, customize components, preview your README in real-time
              </p>
            </div>
            <BuilderPreview />
            <div className="mt-6 text-center">
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 font-mono text-sm text-orange-600 hover:text-orange-700 transition-colors"
              >
                Try the full builder
                <ArrowRight className="w-4 h-4" />
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
              Everything you need to know about GitHub profile READMEs
            </p>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-stone-200">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h3 className="font-serif text-2xl text-stone-900 mb-4">
              Ready to build?
            </h3>
            <p className="font-mono text-sm text-stone-500 mb-6">
              No account needed. Free and open source forever.
            </p>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 font-mono text-sm px-6 py-3 border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 transition-colors"
            >
              Open the Builder
              <ArrowRight className="w-4 h-4" />
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
                className="flex items-center gap-1 font-mono text-xs text-stone-400 hover:text-green-600 transition-colors"
              >
                <MessageSquarePlus className="w-3 h-3" />
                Suggest Feature
              </a>
              <a
                href="https://ko-fi.com/lewiswigmore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-xs text-stone-400 hover:text-orange-600 transition-colors"
              >
                <Heart className="w-3 h-3" />
                Support
              </a>
              <a
                href="https://github.com/lewiswigmore/frontmatter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-mono text-xs text-stone-400 hover:text-stone-600 transition-colors"
              >
                <Github className="w-3 h-3" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
