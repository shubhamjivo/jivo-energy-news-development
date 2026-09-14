import Link from "next/link";
import type { Article } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { ArticleHero } from "@/components/news/ArticleHero";
import { LatestNews } from "@/components/news/LatestNews";
import { RelatedNews } from "@/components/news/RelatedNews";
import {
  TableOfContents,
  articleHeadingId,
} from "@/components/news/TableOfContents";

export function ArticleView({ article }: { article: Article }) {
  return (
    <section className="py-6 desk:py-8">
      <Container>
        <div className="flex flex-col gap-10 desk:flex-row desk:items-start desk:gap-8">
          <article className="min-w-0 flex-1">
            <p className="text-[11px] tracking-[0.22px] text-muted">
              <Link href="/news" className="hover:text-ink">
                News
              </Link>
              <span className="px-1.5">/</span>
              {article.kicker}
            </p>

            <ArticleHero slides={article.gallery} className="mt-3" />

            <div className="mt-3.5 flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <span className="font-semibold tracking-[0.88px] text-accent">
                  {article.kicker}
                </span>
                <span className="tracking-[0.66px] text-muted">
                  {article.markets}
                </span>
              </div>
              <h1 className="text-[28px] font-bold leading-[34px] text-ink desk:text-[32px] desk:leading-[38px]">
                {article.title}
              </h1>
              <p className="text-sm leading-[21px] text-muted desk:text-[15px] desk:leading-[22px]">
                {article.dek}
              </p>
              <p className="text-xs text-muted text-neutral-900">{article.byline}</p>
            </div>

            <div className="mt-6 h-px bg-hairline" />

            <TableOfContents
              headings={article.body
                .filter((block) => block.type === "h2")
                .map((block) => block.text)}
            />

            <div id="overview" className="mt-6 flex scroll-mt-16 flex-col gap-5">
              {article.body.map((block, i) =>
                block.type === "h2" ? (
                  <h2
                    key={i}
                    id={articleHeadingId(block.text)}
                    className="scroll-mt-16 pt-2 text-[22px] font-bold leading-[28px] text-ink"
                  >
                    {block.text}
                  </h2>
                ) : (
                  <p
                    key={i}
                    className="text-[16px] leading-[26px] text-ink/90"
                  >
                    {block.text}
                  </p>
                ),
              )}
            </div>
          </article>

          <aside
            className="w-full shrink-0 desk:sticky desk:top-14 desk:w-[320px]"
            id="latest"
          >
            <RelatedNews carousel={false} />
            <div className="mt-8">
              <LatestNews />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
