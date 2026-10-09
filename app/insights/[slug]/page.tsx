import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterCta } from "@/components/layout/NewsletterCta";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { prepareArticleHtml } from "@/lib/article-html";
import { getInsightBySlug, getInsightSlugs } from "@/lib/cms";
import { getStrapiOrigin } from "@/lib/strapi";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const SECTION_HREF: Record<string, { href: string; label: string }> = {
  "learning-center": { href: "/insights/learning-center", label: "Learning Center" },
  technology: { href: "/insights/technology", label: "Technology" },
  reports: { href: "/insights/reports", label: "Reports" },
  opinion: { href: "/insights/opinion", label: "Opinion" },
  interviews: { href: "/insights/interviews", label: "Interviews" },
  analysis: { href: "/insights", label: "Analysis" },
};

async function loadInsight(slug: string) {
  try {
    return await getInsightBySlug(slug);
  } catch (error) {
    console.error("Could not load insight from Strapi", error);
    return null;
  }
}

export async function generateStaticParams() {
  const rows = await getInsightSlugs();
  return rows.map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await loadInsight(slug);
  if (!insight) return {};
  const title = insight.seoTitle || insight.title;
  const description = insight.seoDescription || insight.summary || insight.title;
  const image = insight.seoImage || insight.image;
  return {
    title,
    description,
    alternates: { canonical: insight.href },
    openGraph: {
      type: "article",
      title,
      description,
      url: insight.href,
      images: image ? [image] : undefined,
      publishedTime: insight.publishedAt,
    },
  };
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = await loadInsight(slug);
  if (!insight) notFound();

  const section =
    SECTION_HREF[insight.tags.find((tag) => SECTION_HREF[tag]) ?? ""] ?? SECTION_HREF.analysis;
  const { html } = prepareArticleHtml(insight.content, insight.id, getStrapiOrigin());

  return (
    <main>
      <section className="py-6 desk:py-8">
        <Container>
          <article className="mx-auto max-w-[760px]">
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
                priority
              />
            ) : null}
            {insight.pullQuote ? (
              <blockquote className="mt-6 border-l-2 border-accent pl-4 text-lg font-semibold leading-7 text-ink">
                “{insight.pullQuote}”
              </blockquote>
            ) : null}
            <div
              className="article-body mt-6"
              dangerouslySetInnerHTML={{ __html: html }}
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
          </article>
        </Container>
      </section>
      <NewsletterCta />
    </main>
  );
}
