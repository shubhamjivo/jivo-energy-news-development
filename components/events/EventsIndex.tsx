import Link from "next/link";
import { VIDEOS } from "@/lib/content";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";

const DIARY = [
  {
    day: "09",
    month: "SEP",
    kicker: "BRIEFING",
    title: "Africa Energy Briefing: Storage tenders",
    meta: "Johannesburg · Hybrid",
  },
  {
    day: "22",
    month: "SEP",
    kicker: "ROUNDTABLE",
    title: "Mission 300 capital roundtable",
    meta: "Nairobi · Invite only",
  },
  {
    day: "07",
    month: "OCT",
    kicker: "WORKSHOP",
    title: "West Africa solar offtake workshop",
    meta: "Lagos · In person",
  },
  {
    day: "18",
    month: "NOV",
    kicker: "SUMMIT",
    title: "Green hydrogen offtakers summit",
    meta: "Walvis Bay · In person",
  },
  {
    day: "03",
    month: "DEC",
    kicker: "WEBINAR",
    title: "Year-ahead investment outlook",
    meta: "Virtual",
  },
  {
    day: "16",
    month: "JUN",
    kicker: "FORUM",
    title: "Africa Energy Forum 2026",
    meta: "Cape Town · In person",
  },
] as const;

const REPLAYS = [
  { title: "Inside Africa's largest battery storage facility", image: VIDEOS[0].image },
  { title: "A financing desk talking storage with regional lenders", image: VIDEOS[1].image },
  { title: "This week in Africa energy: five stories explained", image: VIDEOS[2].image },
] as const;

export function EventsIndex() {
  return (
    <main>
      <PageIntro
        kicker="THE DIARY"
        title="Events"
        dek="Forums, tenders and briefings on the Africa energy calendar."
      />

      <section className="py-6">
        <Container>
          <div className="grid items-center gap-6 desk:grid-cols-2 desk:gap-10">
            <CoverImage
              src="/images/project-2.png"
              alt="Solar field prepared for the Africa Energy Forum"
              className="h-[220px] w-full desk:h-[260px]"
              sizes="(max-width: 1439px) 100vw, 580px"
            />
            <div>
              <p className="text-[10px] font-semibold tracking-[1px] text-accent">
                FEATURED · 16–19 JUNE 2026
              </p>
              <h2 className="mt-2 text-[28px] font-bold leading-none text-ink">
                Africa Energy Forum
              </h2>
              <p className="mt-2 text-sm text-muted">
                Cape Town International Convention Centre
              </p>
              <p className="mt-3 max-w-[520px] text-sm leading-6 text-ink">
                The continent’s principal gathering of ministers, DFIs, IPPs and offtakers. Africa Energy will host a briefing desk and daily dispatch from the floor.
              </p>
              <dl className="mt-5 grid grid-cols-3 gap-4">
                <div>
                  <dt className="text-xl font-bold text-ink">3,400+</dt>
                  <dd className="mt-1 text-[11px] text-muted">Delegates</dd>
                </div>
                <div>
                  <dt className="text-xl font-bold text-ink">80</dt>
                  <dd className="mt-1 text-[11px] text-muted">Countries</dd>
                </div>
                <div>
                  <dt className="text-xl font-bold text-ink">4</dt>
                  <dd className="mt-1 text-[11px] text-muted">Days</dd>
                </div>
              </dl>
              <Link
                href="#newsletter"
                className="mt-5 inline-flex h-9 items-center bg-accent px-4 text-xs font-semibold text-white"
              >
                Register interest
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
            Upcoming on the diary
          </h2>
          <ul className="mt-4">
            {DIARY.map((event) => (
              <li
                key={event.title}
                className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-4 border-b border-hairline py-4 sm:grid-cols-[56px_minmax(0,1fr)_auto]"
              >
                <div className="flex h-14 w-14 flex-col items-center justify-center bg-navy text-white">
                  <span className="text-lg font-bold leading-none">{event.day}</span>
                  <span className="mt-0.5 text-[9px] tracking-[0.6px]">{event.month}</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                    {event.kicker}
                  </p>
                  <h3 className="mt-0.5 text-base font-semibold text-ink">{event.title}</h3>
                  <p className="text-xs text-muted">{event.meta}</p>
                </div>
                <a
                  href="#diary"
                  className="col-start-2 text-xs text-muted hover:text-ink sm:col-start-auto"
                >
                  Add to diary →
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

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
            {REPLAYS.map((video) => (
              <li key={video.title}>
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
                  {video.title}
                </h3>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
