import Link from "next/link";
import type { ArticleCard, CmsArticle } from "@/lib/article-types";
import { Container } from "@/components/ui/Container";
import { ArticleHero } from "@/components/news/ArticleHero";
import { LatestNews } from "@/components/news/LatestNews";
import { RelatedNews } from "@/components/news/RelatedNews";

export function ArticleView({
  article,
  latest,
  priorityImage = false,
}: {
  article: CmsArticle;
  latest: ArticleCard[];
  priorityImage?: boolean;
}) {
  const latestOthers = latest
    .filter((item) => item.id !== article.id)
    .slice(0, 6);
  const idPrefix = `article-${article.id}`;

  return (
    <section className="py-5 desk:py-6">
      <Container>
        <div className="flex flex-col gap-10 desk:flex-row desk:items-start desk:gap-8">
          <article
            className="min-w-0 flex-1"
            data-article-id={article.id}
            data-article-slug={article.slug}
            data-article-title={article.title}
            id={idPrefix}
          >
            <p className="text-[11px] tracking-[0.22px] text-muted">
              <Link href="/news" className="hover:text-ink">
                News
              </Link>
              {article.kicker ? (
                <>
                  <span className="px-1.5">/</span>
                  {article.kicker}
                </>
              ) : null}
            </p>

            {article.gallery.length > 0 ? (
              <ArticleHero
                slides={article.gallery}
                className="mt-3"
                unoptimized
                priority={priorityImage}
              />
            ) : null}

            <div className="mt-3.5 flex flex-col gap-2">
              {article.kicker || article.markets ? (
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  {article.kicker ? (
                    <span className="font-semibold tracking-[0.88px] text-accent">
                      {article.kicker}
                    </span>
                  ) : null}
                  {article.markets ? (
                    <span className="tracking-[0.66px] text-muted">
                      {article.markets}
                    </span>
                  ) : null}
                </div>
              ) : null}
              <h1 className="text-[28px] font-bold leading-[34px] text-ink desk:text-[32px] desk:leading-[38px]">
                {article.title}
              </h1>
              <p className="text-xs text-muted text-neutral-900">
                {article.byline}
              </p>
            </div>

            <div className="mt-6 h-px bg-hairline" />

            <div
              id={`${idPrefix}-overview`}
              className="article-body mt-6 scroll-mt-16"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          </article>

          <aside
            className="w-full shrink-0 desk:sticky desk:top-14 desk:w-[320px]"
            id={`${idPrefix}-latest`}
          >
            <RelatedNews items={article.related} carousel={false} />
            <div className="mt-8">
              <LatestNews items={latestOthers} />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
