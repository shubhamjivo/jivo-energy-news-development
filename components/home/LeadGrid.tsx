import Link from "next/link";
import { getLatestArticleCards, leadByline } from "@/lib/articles";
import { getLeadArticle, type CmsPage } from "@/lib/pages";
import { Container } from "@/components/ui/Container";
import { ArticleHero } from "@/components/news/ArticleHero";
import { LatestNews } from "@/components/news/LatestNews";
import { RelatedNews } from "@/components/news/RelatedNews";

export async function LeadGrid({ home }: { home: CmsPage | null }) {
  const lead = await getLeadArticle(home);
  if (!lead) return null;

  const others = await getLatestArticleCards(10, [lead.id]);
  const latest = others.slice(0, 6);
  // Without editor-picked related stories, fill the rail with stories on the
  // same topic, then the next newest; reuse the Latest list only when the
  // site has too few articles for both.
  const unused = others.slice(6);
  const sameTopic = others.filter((item) => item.kicker && item.kicker === lead.kicker);
  const related =
    lead.related.length > 0
      ? lead.related.slice(0, 4)
      : [...new Set([...sameTopic, ...unused, ...others])].slice(0, 4);

  return (
    <section id="latest" className="scroll-mt-36 py-6 desk:py-8">
      <Container>
        <div className="flex flex-col gap-8 desk:flex-row desk:items-start desk:gap-6">
          <aside className="order-3 hidden w-[300px] shrink-0 desk:order-1 desk:block">
            <LatestNews items={latest} />
          </aside>

          <article className="order-1 min-w-0 flex-1 desk:order-2">
            {lead.gallery.length > 0 ? (
              <ArticleHero
                slides={lead.gallery}
                sizes="(max-width: 1439px) 100vw, 680px"
              />
            ) : null}
            <div className="mt-3.5 flex flex-col gap-2">
              {lead.kicker || lead.markets ? (
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  {lead.kicker ? (
                    <span className="font-semibold tracking-[0.88px] text-accent">
                      {lead.kicker}
                    </span>
                  ) : null}
                  {lead.markets ? (
                    <span className="tracking-[0.66px] text-muted">
                      {lead.markets}
                    </span>
                  ) : null}
                </div>
              ) : null}
              <h1 className="text-[28px] font-bold leading-[34px] text-ink">
                <Link href={lead.href} className="hover:text-muted">
                  {lead.title}
                </Link>
              </h1>
              {lead.dek ? (
                <p className="text-sm leading-[21px] text-muted">{lead.dek}</p>
              ) : null}
              <p className="text-xs text-muted">{leadByline(lead)}</p>
            </div>
          </article>

          <div className="order-2 min-w-0 desk:order-3 desk:w-[292px] desk:shrink-0">
            <RelatedNews items={related} />
          </div>
        </div>

        <div className="mt-8 desk:hidden">
          <LatestNews items={latest} />
        </div>
      </Container>
    </section>
  );
}
