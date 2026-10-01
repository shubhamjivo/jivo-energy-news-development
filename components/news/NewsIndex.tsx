import Link from "next/link";
import {
  getLatestArticleCards,
  getNewsPage,
} from "@/lib/articles";
import { getLeadArticle, type PageContent } from "@/lib/cms";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Kicker } from "@/components/ui/Kicker";
import { NewsLatest } from "@/components/news/NewsLatest";

const PAGE_SIZE = 6;

export async function NewsIndex({
  page,
  topic,
  intro,
}: {
  page: number;
  topic: string;
  intro: PageContent;
}) {
  const lead = await getLeadArticle();
  const excludeIds = lead && !topic ? [lead.id] : [];
  const [latest, fallbackRelated] = await Promise.all([
    getNewsPage({
      page,
      pageSize: PAGE_SIZE,
      category: topic || undefined,
      excludeIds,
    }),
    lead && lead.related.length === 0
      ? getLatestArticleCards(4, [lead.id])
      : Promise.resolve([]),
  ]);
  const related = lead
    ? lead.related.length > 0
      ? lead.related
      : fallbackRelated
    : [];

  return (
    <main>
      <section className="pt-8 pb-2 desk:pt-10">
        <Container>
          <p className="text-[10px] font-semibold tracking-[1px] text-accent">
            {intro.kicker}
          </p>
          <h1 className="mt-2.5 text-[32px] font-bold leading-[38px] text-ink desk:text-[48px] desk:leading-none">
            {intro.title}
          </h1>
          <p className="mt-2.5 max-w-[820px] text-sm leading-5 text-muted desk:text-base desk:leading-6">
            {intro.intro}
          </p>
          <div className="mt-2.5 h-px bg-hairline" />
        </Container>
      </section>

      {lead ? (
        <section className="py-3 desk:py-6">
          <Container>
            <div className="flex flex-col gap-8 desk:flex-row desk:items-start desk:gap-7">
              <article className="min-w-0 flex-1">
                {lead.image ? (
                  <Link href={lead.href} className="block">
                    <CoverImage
                      src={lead.image}
                      alt={lead.gallery[0]?.alt ?? lead.title}
                      className="h-[200px] w-full desk:h-[430px]"
                      sizes="(max-width: 1439px) 100vw, 820px"
                      priority
                    />
                  </Link>
                ) : null}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="font-semibold tracking-[0.88px] text-accent">
                    {lead.kicker}
                  </span>
                  <span className="hidden tracking-[0.66px] text-muted desk:inline">
                    {lead.markets}
                  </span>
                </div>
                <h2 className="mt-3 text-[24px] font-bold leading-[30px] text-ink desk:text-[32px] desk:leading-[38px]">
                  <Link href={lead.href} className="hover:text-muted">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-[21px] text-muted desk:max-w-[760px] desk:text-[15px] desk:leading-[22px]">
                  {lead.dek}
                </p>
                <p className="mt-2 text-[11px] text-muted desk:text-xs">
                  {lead.byline}
                </p>
              </article>

              {related.length > 0 ? (
                <aside className="w-full shrink-0 desk:w-[380px]">
                  <h2 className="text-base font-bold leading-[22px] text-ink desk:text-lg">
                    <span className="desk:hidden">Also in this story</span>
                    <span className="hidden desk:inline">RELATED NEWS</span>
                  </h2>
                  <div className="mt-0.5 h-px bg-accent" />
                  {related.slice(0, 4).map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex gap-3.5 border-b border-hairline py-3 last:border-b-0"
                    >
                      {item.thumbnail ? (
                        <CoverImage
                          src={item.thumbnail}
                          alt={item.imageAlt}
                          className="h-[72px] w-[96px] shrink-0 desk:h-[88px] desk:w-[120px]"
                          sizes="120px"
                        />
                      ) : null}
                      <div className="flex min-w-0 flex-col gap-1.5">
                        {item.kicker ? <Kicker>{item.kicker}</Kicker> : null}
                        <p className="text-[13px] font-semibold leading-[17px] text-ink desk:text-[15px] desk:leading-5">
                          {item.title}
                        </p>
                        <p className="text-[9px] text-muted">{item.meta}</p>
                      </div>
                    </Link>
                  ))}
                </aside>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      <NewsLatest
        stories={latest.articles}
        page={Math.min(page, latest.pageCount)}
        pageCount={latest.pageCount}
        topic={topic}
      />
    </main>
  );
}
