import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";

const COVERAGE = [
  {
    title: "Solar & wind",
    dek: "Utility-scale generation, hybrid parks, auctions and PPAs.",
  },
  {
    title: "Storage",
    dek: "Batteries, pumped hydro and the tenders that firm variable power.",
  },
  {
    title: "Grid",
    dek: "Transmission, interconnectors and the utilities that operate them.",
  },
  {
    title: "Hydrogen",
    dek: "Export hubs, offtake and the path from announcement to FID.",
  },
  {
    title: "Capital",
    dek: "DFIs, commercial banks, M&A and the Mission 300 stack.",
  },
  {
    title: "Policy",
    dek: "Tenders, regulation and the politics of energy access.",
  },
] as const;

const BUREAUS = [
  {
    city: "Johannesburg",
    dek: "Southern Africa desk · Projects, storage, Eskom and the SAPP.",
  },
  {
    city: "Lagos",
    dek: "West Africa desk · Solar closes, offtake and regional capital.",
  },
  {
    city: "Nairobi",
    dek: "East Africa desk · Geothermal, wind, grids and Mission 300.",
  },
] as const;

const STAFF = [
  {
    initials: "AC",
    name: "Amara Chukwu",
    role: "West Africa correspondent · Lagos",
    tone: "navy",
  },
  {
    initials: "NM",
    name: "Naledi Mokoena",
    role: "Southern Africa editor · Johannesburg",
    tone: "navy",
  },
  {
    initials: "WK",
    name: "Wanjiku Kariuki",
    role: "East Africa correspondent · Nairobi",
    tone: "accent",
  },
  {
    initials: "DB",
    name: "Daniel Bekele",
    role: "Projects & data · Addis / Nairobi",
    tone: "navy",
  },
] as const;

export function AboutIndex() {
  return (
    <main>
      <PageIntro
        kicker="THE MASTHEAD"
        title="About"
        dek="Africa Energy is a newsroom covering the continent’s energy transition, Africa-first."
      />

      <section className="py-8">
        <Container>
          <h2 className="text-[26px] font-bold leading-tight text-ink desk:text-[32px]">
            Energy intelligence, Africa-first.
          </h2>
          <div className="mt-4 grid gap-6 desk:grid-cols-2 desk:gap-12">
            <div className="flex flex-col gap-4 text-sm leading-6 text-ink">
              <p>
                Africa Energy is an independent newsroom covering the continent’s energy transition — from utility-scale solar and storage to transmission, hydrogen, offtake and the capital that makes projects bankable.
              </p>
              <p>
                We report from Johannesburg, Lagos and Nairobi, and we write for the people who close deals: developers, DFIs, utilities, ministers and offtakers.
              </p>
            </div>
            <div>
              <p className="text-sm leading-6 text-ink">
                We do not treat Africa as a single market. Each dispatch is tagged to the country, the technology and the money. The project file, the company directory and the country pages are how readers navigate that complexity.
              </p>
              <p className="mt-4 text-xs text-accent">
                Founded 2024 · Independent · Subscriber-supported
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
            What we cover
          </h2>
          <ul className="mt-5 grid gap-6 sm:grid-cols-2 desk:grid-cols-3">
            {COVERAGE.map((item) => (
              <li key={item.title}>
                <h3 className="text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm leading-5 text-muted">{item.dek}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
            Bureaus
          </h2>
          <ul className="mt-5 grid gap-4 desk:grid-cols-3">
            {BUREAUS.map((bureau) => (
              <li key={bureau.city} className="bg-navy p-5 text-white">
                <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                  {bureau.city.toUpperCase()}
                </p>
                <h3 className="mt-2 text-xl font-bold">{bureau.city}</h3>
                <p className="mt-2 text-sm leading-5 text-white/80">{bureau.dek}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
              The newsroom
            </h2>
            <a
              href="mailto:desk@africaenergy.news"
              className="text-xs text-muted hover:text-ink"
            >
              Write to the desk →
            </a>
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-4 desk:grid-cols-4">
            {STAFF.map((person) => (
              <li key={person.initials}>
                <div
                  className={`flex h-[180px] items-center justify-center text-[42px] font-bold ${
                    person.tone === "accent"
                      ? "bg-accent text-ink"
                      : "bg-navy text-white"
                  }`}
                >
                  {person.initials}
                </div>
                <h3 className="mt-2.5 text-base font-semibold text-ink">{person.name}</h3>
                <p className="mt-1 text-xs text-muted">{person.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <div className="grid gap-6 desk:grid-cols-2 desk:items-stretch">
            <div>
              <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
                Contact the desk
              </h2>
              <p className="mt-3 max-w-[520px] text-sm leading-6 text-muted">
                Tips, corrections and partnership enquiries: desk@africaenergy.news. For the Brief, use Subscribe — we do not run a general comments board.
              </p>
              <a
                href="mailto:desk@africaenergy.news"
                className="mt-4 inline-block text-base font-semibold text-ink"
              >
                desk@africaenergy.news
              </a>
            </div>
            <div className="bg-navy p-6 text-white">
              <p className="text-[10px] font-semibold tracking-[1px] text-accent">
                AFRICA ENERGY BRIEF
              </p>
              <h3 className="mt-2 text-2xl font-bold">Five stories. Every morning.</h3>
              <p className="mt-2 text-sm leading-5 text-white/80">
                Intelligence from Johannesburg, Lagos and Nairobi — in one briefing.
              </p>
              <Link
                href="#newsletter"
                className="mt-5 inline-flex h-9 items-center bg-accent px-4 text-xs font-semibold text-white"
              >
                Subscribe to the Brief
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
