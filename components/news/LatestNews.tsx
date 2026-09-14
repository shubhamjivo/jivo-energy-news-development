import Link from "next/link";
import { LATEST_STORIES } from "@/lib/content";
import { CoverImage } from "@/components/ui/CoverImage";
import { Kicker } from "@/components/ui/Kicker";

export function LatestNews() {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[1px] text-accent">LATEST</p>
      <div className="h-px bg-accent" />
      {LATEST_STORIES.map((story) => (
        <Link
          key={story.title}
          href="/news"
          className="flex gap-3 border-b border-hairline py-2"
        >
          <CoverImage
            src={story.image}
            alt={story.title}
            className="size-[72px] shrink-0 rounded-sm"
            sizes="72px"
          />
          <div className="flex min-w-0 flex-col gap-1.5">
            <Kicker>{story.kicker}</Kicker>
            <p className="text-sm font-semibold leading-[18px] text-ink">
              {story.title}
            </p>
            <p className="text-[9px] text-muted">{story.meta}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
