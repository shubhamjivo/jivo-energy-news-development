import Link from "next/link";
import type { ArticleCard } from "@/lib/article-types";
import type { SectionHeading as Heading } from "@/lib/home-sections";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

// The newest investment stories, each with its amount on the right.
export function InvestmentWatch({ stories, heading }: { stories: ArticleCard[]; heading: Heading }) {
  if (stories.length === 0) return null;

  return (
    <section className="py-5 desk:py-6">
      <Container>
      <SectionHeading
        kicker={heading.kicker}
        title={heading.title}
        href={heading.linkUrl}
        action={heading.linkLabel}
      />
      <div className="mt-3.5 h-px bg-ink" />
      {stories.map((story) => (
        <Link
          key={story.id}
          href={story.href}
          className="flex flex-col gap-2 border-b border-hairline py-4 desk:flex-row desk:items-center desk:justify-between desk:gap-6 desk:py-3"
        >
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-[10px] font-semibold tracking-[0.8px] text-accent uppercase">
              {story.markets || story.kicker}
            </p>
            <p className="text-base font-semibold leading-[21px] text-ink">{story.title}</p>
          </div>
          {story.investment ? (
            <p className="text-[22px] font-bold text-ink desk:shrink-0">{story.investment}</p>
          ) : null}
        </Link>
      ))}
      </Container>
    </section>
  );
}
