import Link from "next/link";
import { RELATED_NEWS } from "@/lib/content";
import { CoverImage } from "@/components/ui/CoverImage";
import { Carousel } from "@/components/ui/Carousel";
import { Kicker } from "@/components/ui/Kicker";

export function RelatedNews({ carousel = true }: { carousel?: boolean }) {
  return (
    <div>
      <h2 className="text-lg font-bold leading-[22px] text-ink">RELATED NEWS</h2>
      <div className="mt-0.5 h-px bg-accent" />
      {carousel ? (
        <>
          <div className="hidden desk:block">
            {RELATED_NEWS.map((item, i) => (
              <RelatedRow key={`${item.title}-${i}`} item={item} />
            ))}
          </div>
          <div className="desk:hidden">
            <Carousel className="pt-3" spaceBetween={16}>
              {RELATED_NEWS.map((item, i) => (
                <Link
                  key={`${item.title}-m-${i}`}
                  href="/news"
                  className="block w-[220px]"
                >
                  <CoverImage
                    src={item.image}
                    alt={item.title}
                    className="h-[88px] w-full"
                    sizes="220px"
                  />
                  <Kicker className="mt-2">{item.kicker}</Kicker>
                  <p className="mt-1 text-[15px] font-semibold leading-[18px] text-ink">
                    {item.title}
                  </p>
                </Link>
              ))}
            </Carousel>
          </div>
        </>
      ) : (
        RELATED_NEWS.map((item, i) => (
          <RelatedRow key={`${item.title}-${i}`} item={item} />
        ))
      )}
    </div>
  );
}

function RelatedRow({
  item,
}: {
  item: (typeof RELATED_NEWS)[number];
}) {
  return (
    <Link
      href="/news"
      className="flex gap-3 border-b border-hairline py-3 last:border-b-0"
    >
      <div className="flex min-w-0 flex-col gap-1">
        <Kicker>{item.kicker}</Kicker>
        <p className="text-[15px] font-semibold leading-[18px] text-ink">
          {item.title}
        </p>
        <p className="text-xs leading-4 text-muted">{item.dek}</p>
      </div>
      <CoverImage
        src={item.image}
        alt={item.title}
        className="h-[72px] w-[88px] shrink-0 rounded-sm"
        sizes="88px"
      />
    </Link>
  );
}
