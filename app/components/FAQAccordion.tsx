"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-stone-200 bg-white hover:border-stone-300 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
            >
              <h4 className="font-serif text-base text-stone-900">
                {faq.question}
              </h4>
              <ChevronRight
                aria-hidden="true"
                className={`w-4 h-4 text-orange-600 flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <p className="font-mono text-xs text-stone-600 leading-relaxed px-5 pb-4">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
