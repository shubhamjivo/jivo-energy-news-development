import Link from "next/link";
import { REPORTS } from "@/lib/content";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";

const NOTES = [
  {
    kicker: "POLICY NOTE",
    title: "Mission 300 is a capital stack, not a slogan",
    dek: "Concessional money is being layered against private offtake in four markets. The test is whether utilities can still sign bankable PPAs.",
    image: "/images/latest-grid.png",
  },
  {
    kicker: "DATA",
    title: "Why transmission, not generation, is the 2026 bottleneck",
    dek: "Our project file shows 41 GW of shovel-ready renewables waiting on a line. The bid windows will not clear without it.",
    image: "/images/video-3.png",
  },
  {
    kicker: "MARKETS",
    title: "West Africa’s solar close is a template, not an outlier",
    dek: "Pooling DFI capital with regional IPPs solved a currency and offtake problem that single-country auctions could not.",
    image: "/images/latest-solar.png",
  },
] as const;

export function InsightsIndex({
  kicker = "ANALYSIS",
  title = "Insights",
  dek = "Long-form reporting, data notes and the outlooks our newsroom publishes.",
  variant = "all",
}: {
  kicker?: string;
  title?: string;
  dek?: string;
  variant?: "all" | "reports" | "notes";
}) {
  const showFeature = variant === "all";
  const showReports = variant === "all" || variant === "reports";
  const showNotes = variant === "all" || variant === "notes";

  return (
    <main>
      <PageIntro kicker={kicker} title={title} dek={dek} />

      {showFeature ? (
        <section className="py-6">
          <Container>
            <div className="grid items-center gap-6 desk:grid-cols-[minmax(0,280px)_minmax(0,1fr)] desk:gap-10">
              <CoverImage
                src="/images/insight-featured.png"
                alt=""
                className="h-[220px] w-full desk:h-[240px]"
                sizes="280px"
              />
              <div>
                <p className="text-[10px] font-semibold tracking-[1px] text-accent">
                  THE GREAT READ
                </p>
                <p className="mt-3 text-[22px] font-semibold leading-7 text-ink desk:text-[26px] desk:leading-8">
                  “Storage will become central to Africa’s renewable-energy growth over the next five years.”
                </p>
                <h2 className="mt-4 text-lg font-bold leading-6 text-ink">
                  What Africa’s Grid Bottleneck Means for the Next Decade of Renewables
                </h2>
                <p className="mt-2 max-w-[640px] text-sm leading-6 text-muted">
                  Without transmission and four-hour storage, a decade of solar and wind auctions will stall at the substation gate. Naledi Mokoena traces the money now moving into wires and batteries.
                </p>
                <p className="mt-3 text-xs text-muted">
                  By Naledi Mokoena · 8 min read · Insights
                </p>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {showReports ? (
        <section className="py-4">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
                Latest Reports
              </h2>
              <Link href="/insights/reports" className="text-xs text-muted hover:text-ink">
                Browse the library →
              </Link>
            </div>
            <ul className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 desk:grid-cols-4">
              {REPORTS.map((report) => (
                <li key={report.title}>
                  <Link href="/insights/reports" className="block">
                    <CoverImage
                      src={report.image}
                      alt={report.title}
                      className="h-[150px] w-full"
                      sizes="(max-width: 1439px) 50vw, 280px"
                    />
                    <p className="mt-2.5 text-[10px] font-semibold tracking-[0.8px] text-accent">
                      REPORT
                    </p>
                    <h3 className="mt-1 text-base font-semibold leading-5 text-ink">
                      {report.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {showNotes ? (
        <section className="pb-12 pt-6">
          <Container>
            <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
              Analysis & briefing notes
            </h2>
            <ul className="mt-5 flex flex-col gap-6">
              {NOTES.map((note) => (
                <li key={note.title} className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-center">
                  <CoverImage
                    src={note.image}
                    alt=""
                    className="h-[110px] w-full"
                    sizes="180px"
                  />
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                      {note.kicker}
                    </p>
                    <h3 className="mt-1 text-lg font-bold leading-6 text-ink">
                      {note.title}
                    </h3>
                    <p className="mt-1 max-w-[720px] text-sm leading-6 text-muted">
                      {note.dek}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
