import Link from "next/link";
import type { InsightDetail } from "@/lib/cms";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Faq } from "@/components/ui/Faq";

const SECTION_HREF: Record<string, { href: string; label: string }> = {
  "learning-center": { href: "/insights/learning-center", label: "Learning Center" },
  technology: { href: "/insights/technology", label: "Technology" },
  reports: { href: "/insights/reports", label: "Reports" },
  opinion: { href: "/insights/opinion", label: "Opinion" },
  interviews: { href: "/insights/interviews", label: "Interviews" },
  analysis: { href: "/insights", label: "Analysis" },
};

export function InsightView({
  insight,
  priorityImage = false,
}: {
  insight: InsightDetail;
  priorityImage?: boolean;
}) {
  const section =
    SECTION_HREF[insight.tags.find((tag) => SECTION_HREF[tag]) ?? ""] ?? SECTION_HREF.analysis;

  return (
    <section className="py-5 desk:py-6">
      <Container>
        <article
          className="mx-auto max-w-[760px]"
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
          <p className="mt-4 text-[11px] font-semibold tracking-[0.88px] text-accent">
            {insight.label}
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-[34px] text-ink desk:text-[36px] desk:leading-[42px]">
            {insight.title}
          </h1>
          {insight.summary ? (
            <p className="mt-3 text-[15px] leading-[22px] text-muted">{insight.summary}</p>
          ) : null}
          {insight.byline ? <p className="mt-3 text-xs text-muted">{insight.byline}</p> : null}
          {insight.image ? (
            <CoverImage
              src={insight.image}
              alt={insight.title}
              className="mt-6 aspect-[16/9] w-full"
              sizes="(max-width: 1439px) 100vw, 760px"
              priority={priorityImage}
            />
          ) : null}
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
      </Container>
    </section>
  );
}
