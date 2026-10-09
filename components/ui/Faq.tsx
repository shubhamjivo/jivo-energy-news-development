import type { FaqItem } from "@/lib/article-types";

// "Got questions?" under an article or insight: one row per question that
// opens to show its answer.
export function Faq({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-[28px] font-bold leading-[34px] text-ink">Got questions?</h2>
      <div className="mt-6 border-b border-hairline">
        {items.map((item) => (
          <details key={item.question} className="group border-t border-hairline">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base text-ink [&::-webkit-details-marker]:hidden">
              {item.question}
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="size-4 shrink-0 transition-transform group-open:rotate-45"
              >
                <path
                  d="M8 1v14M1 8h14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </summary>
            <p className="whitespace-pre-line pb-5 pr-8 text-sm leading-6 text-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

// FAQPage structured data for the page's own article or insight.
export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
