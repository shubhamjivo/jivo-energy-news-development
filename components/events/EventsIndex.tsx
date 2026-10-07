import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import type { EventEntry, VideoEntry } from "@/lib/cms";
import type { PageContent } from "@/lib/pages";

export function EventsIndex({
  intro,
  events,
  replays,
}: {
  intro: PageContent;
  events: EventEntry[];
  replays: VideoEntry[];
}) {
  const featured = events.find((event) => event.featured);

  return (
    <main>
      <PageIntro kicker={intro.kicker} title={intro.title} dek={intro.intro} />

      {featured ? (
        <section className="py-6">
          <Container>
            <div className="grid items-center gap-6 desk:grid-cols-2 desk:gap-10">
              {featured.image ? (
                <CoverImage
                  src={featured.image}
                  alt={featured.title}
                  className="h-[220px] w-full desk:h-[260px]"
                  sizes="(max-width: 1439px) 100vw, 580px"
                />
              ) : null}
              <div>
                <p className="text-[10px] font-semibold tracking-[1px] text-accent">
                  FEATURED · {featured.dateRange}
                </p>
                <h2 className="mt-2 text-[28px] font-bold leading-none text-ink">
                  {featured.title}
                </h2>
                {featured.venue ? (
                  <p className="mt-2 text-sm text-muted">{featured.venue}</p>
                ) : null}
                {featured.description ? (
                  <p className="mt-3 max-w-[520px] text-sm leading-6 text-ink">
                    {featured.description}
                  </p>
                ) : null}
                {featured.highlights.length > 0 ? (
                  <dl className="mt-5 grid grid-cols-3 gap-4">
                    {featured.highlights.slice(0, 3).map((stat) => (
                      <div key={stat.label}>
                        <dt className="text-xl font-bold text-ink">{stat.value}</dt>
                        <dd className="mt-1 text-[11px] text-muted">{stat.label}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                <Link
                  href={featured.registrationUrl || "#newsletter"}
                  className="mt-5 inline-flex h-9 items-center bg-accent px-4 text-xs font-semibold text-white"
                >
                  Register interest
                </Link>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-4">
        <Container>
          <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
            Upcoming on the diary
          </h2>
          {events.length === 0 ? (
            <p className="mt-4 text-sm text-muted">No upcoming events yet.</p>
          ) : null}
          <ul className="mt-4">
            {events.map((event) => (
              <li
                key={event.slug}
                className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-4 border-b border-hairline py-4 sm:grid-cols-[56px_minmax(0,1fr)_auto]"
              >
                <div className="flex h-14 w-14 flex-col items-center justify-center bg-navy text-white">
                  <span className="text-lg font-bold leading-none">{event.day}</span>
                  <span className="mt-0.5 text-[9px] tracking-[0.6px]">{event.month}</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                    {event.type}
                  </p>
                  <h3 className="mt-0.5 text-base font-semibold text-ink">{event.title}</h3>
                  <p className="text-xs text-muted">{event.meta}</p>
                </div>
                <a
                  href={event.registrationUrl || "#diary"}
                  className="col-start-2 text-xs text-muted hover:text-ink sm:col-start-auto"
                >
                  Add to diary →
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {replays.length > 0 ? (
      <section id="diary" className="pb-12 pt-6">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
              Watch & listen — replays
            </h2>
            <Link href="/insights" className="text-xs text-muted hover:text-ink">
              All videos →
            </Link>
          </div>
          <ul className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {replays.map((video) => (
              <li key={video.id}>
                <CoverImage
                  src={video.image}
                  alt=""
                  className="h-[150px] w-full"
                  sizes="(max-width: 1439px) 100vw, 380px"
                />
                <p className="mt-2.5 text-[10px] font-semibold tracking-[0.8px] text-accent">
                  VIDEO
                </p>
                <h3 className="mt-1 text-base font-semibold leading-5 text-ink">
                  {video.href ? (
                    <a href={video.href} target="_blank" rel="noopener noreferrer">
                      {video.title}
                    </a>
                  ) : (
                    video.title
                  )}
                </h3>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      ) : null}
    </main>
  );
}
