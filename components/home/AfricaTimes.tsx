import Link from "next/link";
import { AFRICA_TIMES } from "@/lib/content";
import { Chevron } from "@/components/ui/Chevron";
import { CoverImage } from "@/components/ui/CoverImage";
import { HScroll } from "@/components/ui/HScroll";

export function AfricaTimes() {
  return (
    <section id="africa-times" className="px-5 py-8 desk:px-24 desk:py-10">
      <div className="flex flex-col gap-2 desk:flex-row desk:items-center desk:gap-2.5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
            AFRICA TIMES
          </h2>
          <Chevron />
        </div>
        <p className="text-[11px] font-semibold tracking-[0.44px] text-accent">
          Four desks. One briefing.
        </p>
      </div>

      <div className="mt-4 hidden gap-4 desk:flex">
        {AFRICA_TIMES.map((col) => (
          <TimesColumn key={col.title} col={col} />
        ))}
      </div>

      <div className="mt-4 desk:hidden">
        <HScroll className="gap-4">
          {AFRICA_TIMES.map((col) => (
            <div key={col.title} className="w-[304px] shrink-0 snap-start">
              <TimesColumn col={col} />
            </div>
          ))}
        </HScroll>
      </div>
    </section>
  );
}

function TimesColumn({ col }: { col: (typeof AFRICA_TIMES)[number] }) {
  return (
    <div className="flex w-full flex-col border border-muted/40 px-3.5 pb-2.5 pt-4 desk:w-[318px]">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-bold text-ink">{col.title}</h3>
        <Chevron />
      </div>
      <div className="mt-1 h-px bg-accent" />
      {col.stories.map((story) => (
        <Link
          key={story.title}
          href="/news"
          className="flex items-center gap-2.5 border-b border-hairline py-2.5 last:border-b-0"
        >
          <p className="min-w-0 flex-1 text-[13px] leading-[19px] text-muted">
            {story.title}
          </p>
          <CoverImage
            src={story.image}
            alt=""
            className="h-12 w-16 shrink-0"
            sizes="64px"
          />
        </Link>
      ))}
    </div>
  );
}
