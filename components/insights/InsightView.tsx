import Link from "next/link";
import type { InsightCard, InsightDetail } from "@/lib/cms";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Faq } from "@/components/ui/Faq";
import { Kicker } from "@/components/ui/Kicker";

const SECTION_HREF: Record<string, { href: string; label: string }> = {
  "learning-center": { href: "/insights/learning-center", label: "Learning Center" },
  technology: { href: "/insights/technology", label: "Technology" },
  reports: { href: "/insights/reports", label: "Reports" },
  opinion: { href: "/insights/opinion", label: "Opinion" },
  interviews: { href: "/insights/interviews", label: "Interviews" },
  analysis: { href: "/insights", label: "Analysis" },
};

// Sidebar lists, styled like Related News and Latest beside a news article.
function RelatedInsights({ items }: { items: InsightCard[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-bold leading-[22px] text-ink">RELATED INSIGHTS</h2>
      <div className="mt-0.5 h-px bg-accent" />
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="flex gap-3 border-b border-hairline py-3 last:border-b-0"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {item.label ? <Kicker>{item.label}</Kicker> : null}
            <p className="text-[15px] font-semibold leading-[18px] text-ink">{item.title}</p>
            {item.summary ? (
              <p className="line-clamp-2 text-xs leading-4 text-muted">{item.summary}</p>
            ) : null}
          </div>
          {item.image ? (
            <CoverImage
              src={item.image}
              alt={item.title}
              className="h-[72px] w-[88px] shrink-0"
              sizes="88px"
            />
          ) : null}
        </Link>
      ))}
    </div>
  );
}

function LatestInsights({ items }: { items: InsightCard[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[1px] text-accent">LATEST</p>
      <div className="h-px bg-accent" />
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="flex gap-3 border-b border-hairline py-2 last:border-b-0"
        >
          {item.image ? (
            <CoverImage
              src={item.image}
              alt={item.title}
              className="size-[72px] shrink-0"
              sizes="72px"
            />
          ) : null}
          <div className="flex min-w-0 flex-col gap-1.5">
            {item.label ? <Kicker>{item.label}</Kicker> : null}
            <p className="text-sm font-semibold leading-[18px] text-ink">{item.title}</p>
            {item.byline ? <p className="text-[9px] text-muted">{item.byline}</p> : null}
          </div>
        </Link>
      ))}
    </div>
  );
}

// Same layout as a news article: the story on the left, related and latest
// lists in a sticky column on the right.
export function InsightView({
  insight,
  latest,
  priorityImage = false,
}: {
  insight: InsightDetail;
  latest: InsightCard[];
  priorityImage?: boolean;
}) {
  const sectionTag = insight.tags.find((tag) => SECTION_HREF[tag]) ?? "";
  const section = SECTION_HREF[sectionTag] ?? SECTION_HREF.analysis;
  // Related: the editor's picks first, then the newest from the same page.
  const others = latest.filter(
    (item) => item.id !== insight.id && !insight.related.some((pick) => pick.id === item.id),
  );
  const related = [
    ...insight.related,
    ...others.filter((item) => item.tags.includes(sectionTag)),
  ].slice(0, 3);
  const latestOthers = others.filter((item) => !related.includes(item)).slice(0, 6);

  return (
    <section className="py-5 desk:py-6">
      <Container>
        <div className="flex flex-col gap-10 desk:flex-row desk:items-start desk:gap-8">
          <article
            className="min-w-0 flex-1"
            data-article-slug={insight.slug}
            data-article-title={insight.title}
          >
            <p className="text-[11px] tracking-[0.22px] text-muted">
              <Link href="/insights" className="hover:text-ink">
                Insights
              </Link>
              <span className="px-1.5">/</span>
              <Link href={section.href} className="hover:text-ink">
                {section.label}
              </Link>
            </p>

            {insight.image ? (
              <CoverImage
                src={insight.image}
                alt={insight.title}
                className="mt-3 h-[232px] w-full desk:h-[420px]"
                sizes="(max-width: 1439px) 100vw, 840px"
                priority={priorityImage}
              />
            ) : null}

            <div className="mt-3.5 flex flex-col gap-2">
              {insight.label ? (
                <p className="text-[11px] font-semibold tracking-[0.88px] text-accent">
                  {insight.label}
                </p>
              ) : null}
              <h1 className="text-[28px] font-bold leading-[34px] text-ink desk:text-[32px] desk:leading-[38px]">
                {insight.title}
              </h1>
              {insight.byline ? (
                <p className="text-xs text-neutral-900">{insight.byline}</p>
              ) : null}
            </div>

            <div className="mt-6 h-px bg-hairline" />

            {insight.pullQuote ? (
              <blockquote className="mt-6 border-l-2 border-accent pl-4 text-lg font-semibold leading-7 text-ink">
                “{insight.pullQuote}”
              </blockquote>
            ) : null}
            <div
              className="article-body mt-6"
              dangerouslySetInnerHTML={{ __html: insight.contentHtml }}
            />
            {insight.reportFile ? (
              <a
                href={insight.reportFile}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-10 items-center bg-accent px-5 text-sm font-semibold text-white"
              >
                Download the report (PDF)
              </a>
            ) : null}
            <Faq items={insight.faqs} />
          </article>

          <aside className="flex w-full shrink-0 flex-col gap-8 desk:sticky desk:top-14 desk:w-[320px]">
            <RelatedInsights items={related} />
            <LatestInsights items={latestOthers} />
          </aside>
        </div>
      </Container>
    </section>
  );
}
