import Link from "next/link";
import type { ArticleCard } from "@/lib/article-types";
import { CoverImage } from "@/components/ui/CoverImage";
import { Carousel } from "@/components/ui/Carousel";
import { Kicker } from "@/components/ui/Kicker";

export function RelatedNews({
  items,
  carousel = true,
}: {
  items: ArticleCard[];
  carousel?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-bold leading-[22px] text-ink">RELATED NEWS</h2>
      <div className="mt-0.5 h-px bg-accent" />
      {carousel ? (
        <>
          <div className="hidden desk:block">
            {items.map((item) => (
              <RelatedRow key={item.id} item={item} />
            ))}
          </div>
          <div className="desk:hidden">
            <Carousel className="pt-3" spaceBetween={16}>
              {items.map((item) => (
                <Link key={`${item.id}-m`} href={item.href} className="block w-[220px]">
                  {item.thumbnail ? (
                    <CoverImage
                      src={item.thumbnail}
                      alt={item.imageAlt}
                      className="h-[88px] w-full"
                      sizes="220px"
                    />
                  ) : null}
                  {item.kicker ? <Kicker className="mt-2">{item.kicker}</Kicker> : null}
                  <p className="mt-1 text-[15px] font-semibold leading-[18px] text-ink">
                    {item.title}
                  </p>
                </Link>
              ))}
            </Carousel>
          </div>
        </>
      ) : (
        items.map((item) => <RelatedRow key={item.id} item={item} />)
      )}
    </div>
  );
}

function RelatedRow({ item }: { item: ArticleCard }) {
  return (
    <Link
      href={item.href}
      className="flex gap-3 border-b border-hairline py-3 last:border-b-0"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {item.kicker ? <Kicker>{item.kicker}</Kicker> : null}
        <p className="text-[15px] font-semibold leading-[18px] text-ink">
          {item.title}
        </p>
        {item.dek ? (
          <p className="line-clamp-2 text-xs leading-4 text-muted">{item.dek}</p>
        ) : null}
      </div>
      {item.thumbnail ? (
        <CoverImage
          src={item.thumbnail}
          alt={item.imageAlt}
          className="h-[72px] w-[88px] shrink-0"
          sizes="88px"
        />
      ) : null}
    </Link>
  );
}
