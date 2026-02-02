"use client";

import { X, Heart, Coffee } from "lucide-react";

interface KofiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KofiModal({ isOpen, onClose }: KofiModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-paper border border-stone-200 w-full max-w-sm">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-stone-400 hover:text-stone-600"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-orange-100 flex items-center justify-center">
              <Coffee className="w-6 h-6 text-orange-600" />
            </div>
          </div>

          <h3 className="font-serif text-xl text-stone-900 mb-2">
            README copied!
          </h3>
          <p className="font-mono text-sm text-stone-500 mb-6">
            Paste it into your GitHub profile repository.
          </p>

          <div className="space-y-3">
            <a
              href="https://ko-fi.com/lewiswigmore"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center gap-2
                w-full py-3 px-4
                font-mono text-sm
                bg-orange-600 hover:bg-orange-700
                text-white
                transition-colors
              "
            >
              <Heart className="w-4 h-4" />
              Buy me a coffee
            </a>

            <button
              onClick={onClose}
              className="
                w-full py-2 px-4
                font-mono text-xs
                text-stone-500 hover:text-stone-700
                transition-colors
              "
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
