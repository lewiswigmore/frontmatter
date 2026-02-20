import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs text-stone-400 uppercase tracking-widest mb-4">
          404
        </p>
        <h1 className="font-serif text-4xl text-stone-900 mb-4">
          Page not found
        </h1>
        <p className="font-mono text-sm text-stone-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            title="Return to home page"
            className="
              flex items-center gap-2
              font-mono text-sm
              px-4 py-2
              border border-stone-900
              bg-stone-900 text-white
              hover:bg-stone-800
              transition-colors
            "
          >
            <ArrowLeft aria-hidden="true" className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/builder"
            title="Open the builder"
            className="
              font-mono text-sm
              px-4 py-2
              border border-stone-300
              text-stone-700
              hover:bg-stone-100
              transition-colors
            "
          >
            Open Builder
          </Link>
        </div>
      </div>
      <p className="absolute bottom-4 font-mono text-xs text-stone-400" aria-hidden="true">
        frontmatter<span className="text-orange-600">.cc</span>
      </p>
    </div>
  );
}
