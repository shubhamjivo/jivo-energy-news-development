import Link from "next/link";
import { VIDEOS } from "@/lib/content";
import { CoverImage } from "@/components/ui/CoverImage";
import { HScroll } from "@/components/ui/HScroll";
import { Kicker } from "@/components/ui/Kicker";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WatchListen() {
  return (
    <section className="px-5 pb-2 pt-8 desk:px-24 desk:pt-10">
      <SectionHeading
        kicker="VIDEO"
        title="Watch & Listen"
        href="/news"
        action="All videos →"
      />
      <div className="mt-3.5 h-px bg-ink" />

      <div className="mt-4 hidden grid-cols-3 gap-6 desk:grid">
        {VIDEOS.map((video) => (
          <VideoCard key={video.title} video={video} />
        ))}
      </div>

      <div className="mt-4 desk:hidden">
        <HScroll className="gap-4">
          {VIDEOS.map((video) => (
            <div key={video.title} className="w-[280px] shrink-0 snap-start">
              <VideoCard video={video} />
            </div>
          ))}
        </HScroll>
      </div>
    </section>
  );
}

function VideoCard({ video }: { video: (typeof VIDEOS)[number] }) {
  return (
    <Link href="/news" className="flex flex-col gap-2">
      <div className="relative">
        <CoverImage
          src={video.image}
          alt={video.title}
          className="h-[160px] w-full"
          sizes="(max-width: 1439px) 80vw, 424px"
        />
        <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90">
          <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-ink" />
        </span>
      </div>
      <Kicker>VIDEO</Kicker>
      <p className="text-[15px] font-semibold leading-5 text-ink">{video.title}</p>
    </Link>
  );
}
