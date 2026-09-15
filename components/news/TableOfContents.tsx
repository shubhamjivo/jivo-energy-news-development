import { articleHeadingId } from "@/lib/article-html";

export { articleHeadingId };

export function TableOfContents({
  headings,
  idPrefix,
}: {
  headings: readonly string[];
  idPrefix: string;
}) {
  const items = [
    { id: `${idPrefix}-overview`, label: "Overview" },
    ...headings.map((text) => ({
      id: `${idPrefix}-${articleHeadingId(text)}`,
      label: text,
    })),
  ];

  return (
    <nav aria-label="Table of contents" className="mt-6">
      <p className="text-[10px] font-semibold tracking-[1px] text-accent">
        TABLE OF CONTENTS
      </p>
      <div className="h-px bg-accent" />
      <ol>
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-baseline gap-3 border-b border-hairline py-2.5 text-sm font-semibold leading-[18px] text-ink hover:text-muted"
            >
              <span className="shrink-0 text-[11px] tracking-[0.8px] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
