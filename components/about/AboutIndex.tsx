import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import type { AboutContent, PageContent } from "@/lib/pages";

export function AboutIndex({ intro, about }: { intro: PageContent; about: AboutContent }) {
  return (
    <main>
      <PageIntro kicker={intro.kicker} title={intro.title} dek={intro.intro} />

      <section className="py-8">
        <Container>
          <h2 className="text-[26px] font-bold leading-tight text-ink desk:text-[32px]">
            {about.heading}
          </h2>
          <div className="mt-4 grid gap-6 desk:grid-cols-2 desk:gap-12">
            <div className="flex flex-col gap-4 text-sm leading-6 text-ink">
              {about.introLeft.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div>
              <div className="flex flex-col gap-4 text-sm leading-6 text-ink">
                {about.introRight.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-4 text-xs text-accent">{about.tagline}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
            {about.coverageHeading}
          </h2>
          <ul className="mt-5 grid gap-6 sm:grid-cols-2 desk:grid-cols-3">
            {about.coverage.map((item) => (
              <li key={item.title}>
                <h3 className="text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm leading-5 text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
            {about.bureausHeading}
          </h2>
          <ul className="mt-5 grid gap-4 desk:grid-cols-3">
            {about.bureaus.map((bureau) => (
              <li key={bureau.title} className="bg-navy p-5 text-white">
                <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                  {bureau.title.toUpperCase()}
                </p>
                <h3 className="mt-2 text-xl font-bold">{bureau.title}</h3>
                <p className="mt-2 text-sm leading-5 text-white/80">{bureau.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
              {about.teamHeading}
            </h2>
            <a href={about.teamLinkUrl} className="text-xs text-muted hover:text-ink">
              {about.teamLinkLabel}
            </a>
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-4 desk:grid-cols-4">
            {about.team.map((person) => (
              <li key={person.name}>
                <div
                  className={`flex h-[180px] items-center justify-center text-[42px] font-bold ${
                    person.highlight
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
                {about.contactHeading}
              </h2>
              <p className="mt-3 max-w-[520px] text-sm leading-6 text-muted">
                {about.contactText}
              </p>
              <a
                href={`mailto:${about.contactEmail}`}
                className="mt-4 inline-block text-base font-semibold text-ink"
              >
                {about.contactEmail}
              </a>
            </div>
            <div className="bg-navy p-6 text-white">
              <p className="text-[10px] font-semibold tracking-[1px] text-accent">
                {about.briefKicker}
              </p>
              <h3 className="mt-2 text-2xl font-bold">{about.briefHeading}</h3>
              <p className="mt-2 text-sm leading-5 text-white/80">{about.briefText}</p>
              <Link
                href={about.briefUrl}
                className="mt-5 inline-flex h-9 items-center bg-accent px-4 text-xs font-semibold text-white"
              >
                {about.briefButton}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
