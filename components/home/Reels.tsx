import Link from "next/link";
import { REELS } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { Dots } from "@/components/ui/Dots";
import { HScroll } from "@/components/ui/HScroll";

export function Reels() {
  return (
    <section className="py-8 desk:py-10">
      <Container>
      <div className="flex items-center justify-between">
        <h2 className="text-[26px] font-bold text-ink desk:text-[28px]">Reels</h2>
        <Link href="/news" className="text-sm font-semibold text-forest">
          VIEW ALL →
        </Link>
      </div>

      <HScroll className="mt-6 gap-5" controls controlPosition="bottom" step={260}>
        {REELS.map((reel) => (
          <Link
            key={reel.title}
            href="/news"
            className="relative h-[380px] w-[210px] shrink-0 snap-start overflow-hidden bg-ink desk:h-[426px] desk:w-[240px]"
          >
            <CoverImage
              src={reel.image}
              alt={reel.title}
              className="absolute inset-0 h-full w-full"
              sizes="240px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-2xl bg-white">
              <span className="ml-0.5 border-y-[5px] border-l-[8px] border-y-transparent border-l-ink" />
            </span>
            <span className="absolute right-3 top-3 rounded-full bg-black px-2 py-1 text-[10px] font-semibold text-white">
              {reel.duration}
            </span>
            <p className="absolute inset-x-3 bottom-4 text-base font-semibold leading-[22px] text-white">
              {reel.title}
            </p>
          </Link>
        ))}
      </HScroll>
      <div className="mt-4 flex justify-center">
        <Dots count={2} />
      </div>
      </Container>
    </section>
  );
}
