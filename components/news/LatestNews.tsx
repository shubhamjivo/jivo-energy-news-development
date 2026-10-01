import Link from "next/link";
import type { ArticleCard } from "@/lib/article-types";
import { CoverImage } from "@/components/ui/CoverImage";
import { Kicker } from "@/components/ui/Kicker";

export function LatestNews({ items }: { items: ArticleCard[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[1px] text-accent">LATEST</p>
      <div className="h-px bg-accent" />
      {items.map((story) => (
        <Link
          key={story.id}
          href={story.href}
          className="flex gap-3 border-b last:border-b-0 border-hairline py-2"
        >
          {story.thumbnail ? (
            <CoverImage
              src={story.thumbnail}
              alt={story.imageAlt}
              className="size-[72px] shrink-0"
              sizes="72px"
            />
          ) : null}
          <div className="flex min-w-0 flex-col gap-1.5">
            {story.kicker ? <Kicker>{story.kicker}</Kicker> : null}
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
