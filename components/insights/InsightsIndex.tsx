import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import type { InsightCard } from "@/lib/cms";
import type { PageContent } from "@/lib/pages";

export function InsightsIndex({
  intro,
  featured = null,
  reports,
  notes,
}: {
  intro: PageContent;
  featured?: InsightCard | null;
  /** Omit to hide the reports section. */
  reports?: InsightCard[];
  /** Omit to hide the notes section. */
  notes?: InsightCard[];
}) {
  const empty = !featured && !reports?.length && !notes?.length;

  return (
    <main>
      <PageIntro kicker={intro.kicker} title={intro.title} dek={intro.intro} />

      {featured ? (
        <section className="py-5 desk:py-6">
          <Container>
            <Link
              href={featured.href}
              className="grid items-center gap-6 desk:grid-cols-[minmax(0,280px)_minmax(0,1fr)] desk:gap-10"
            >
              {featured.image ? (
                <CoverImage
                  src={featured.image}
                  alt=""
                  className="h-[220px] w-full desk:h-[240px]"
                  sizes="280px"
                />
              ) : null}
              <div>
                <p className="text-[10px] font-semibold tracking-[1px] text-accent">
                  THE GREAT READ
                </p>
                {featured.pullQuote ? (
                  <p className="mt-3 text-[22px] font-semibold leading-7 text-ink desk:text-[26px] desk:leading-8">
                    “{featured.pullQuote}”
                  </p>
                ) : null}
                <h2 className="mt-4 text-lg font-bold leading-6 text-ink">
                  {featured.title}
                </h2>
                <p className="mt-2 max-w-[640px] text-sm leading-6 text-muted">
                  {featured.summary}
                </p>
                <p className="mt-3 text-xs text-muted">
                  {[featured.byline, "Insights"].filter(Boolean).join(" · ")}
                </p>
              </div>
            </Link>
          </Container>
        </section>
      ) : null}

      {reports?.length ? (
        <section className="py-5 desk:py-6">
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
              {reports.map((report) => (
                <li key={report.id}>
                  <Link href={report.href} className="block">
                    {report.image ? (
                      <CoverImage
                        src={report.image}
                        alt={report.title}
                        className="h-[150px] w-full"
                        sizes="(max-width: 1439px) 50vw, 280px"
                      />
                    ) : null}
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

      {notes?.length ? (
        <section className="py-5 desk:py-6">
          <Container>
            <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
              Analysis & briefing notes
            </h2>
            <ul className="mt-5 flex flex-col gap-6">
              {notes.map((note) => (
                <li key={note.id}>
                  <Link
                    href={note.href}
                    className={`grid gap-4 sm:items-center ${
                      note.image ? "sm:grid-cols-[180px_minmax(0,1fr)]" : ""
                    }`}
                  >
                    {note.image ? (
                      <CoverImage
                        src={note.image}
                        alt=""
                        className="h-[110px] w-full"
                        sizes="180px"
                      />
                    ) : null}
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                        {note.label}
                      </p>
                      <h3 className="mt-1 text-lg font-bold leading-6 text-ink">
                        {note.title}
                      </h3>
                      <p className="mt-1 max-w-[720px] text-sm leading-6 text-muted">
                        {note.summary}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {empty ? (
        <section className="py-5 desk:py-6">
          <Container>
            <p className="text-sm text-muted">Nothing published in this section yet.</p>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
