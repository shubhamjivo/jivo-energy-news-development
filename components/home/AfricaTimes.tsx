import Link from "next/link";
import type { ArticleCard } from "@/lib/article-types";
import type { SectionHeading as Heading } from "@/lib/home-sections";
import { Container } from "@/components/ui/Container";
import { Chevron } from "@/components/ui/Chevron";
import { CoverImage } from "@/components/ui/CoverImage";
import { Carousel } from "@/components/ui/Carousel";

type TimesDesk = { title: string; stories: ArticleCard[] };

export function AfricaTimes({ desks, heading }: { desks: TimesDesk[]; heading: Heading }) {
  const columns = desks.filter((desk) => desk.stories.length > 0);
  if (columns.length === 0) return null;

  return (
    <section id="africa-times" className="scroll-mt-36 py-8 desk:py-10">
      <Container>
        <div className="flex flex-col gap-2 desk:flex-row desk:items-center desk:gap-2.5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
              {heading.title}
            </h2>
            {/* <Chevron /> */}
          </div>
          {/* {heading.kicker ? ( */}
          {/*   <p className="text-[11px] font-semibold tracking-[0.44px] text-accent"> */}
          {/*     {heading.kicker} */}
          {/*   </p> */}
          {/* ) : null} */}
        </div>

        <div className="mt-4 hidden gap-4 desk:flex">
          {columns.map((col) => (
            <TimesColumn key={col.title} col={col} />
          ))}
        </div>

        <div className="mt-4 desk:hidden">
          <Carousel spaceBetween={16}>
            {columns.map((col) => (
              <div key={col.title} className="w-[304px]">
                <TimesColumn col={col} />
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}

function TimesColumn({ col }: { col: TimesDesk }) {
  return (
    <div className="flex w-full min-w-0 flex-col border border-muted/40 px-3.5 pb-2.5 pt-4 desk:flex-1">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-bold text-ink">{col.title}</h3>
        {/* <Chevron /> */}
      </div>
      <div className="mt-1 h-px bg-accent" />
      {col.stories.map((story) => (
        <Link
          key={story.id}
          href={story.href}
          className="flex items-center gap-2.5 border-b border-hairline py-2.5 last:border-b-0"
        >
          <p className="min-w-0 flex-1 text-[13px] leading-[19px] text-muted">
            {story.title}
          </p>
          {story.thumbnail ? (
            <CoverImage
              src={story.thumbnail}
              alt=""
              className="h-12 w-16 shrink-0"
              sizes="64px"
            />
          ) : null}
        </Link>
      ))}
    </div>
  );
}
