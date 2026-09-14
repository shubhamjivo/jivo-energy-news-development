import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-neutral-900 pb-8 pt-10">
      <Container className="flex flex-col gap-8 desk:flex-row desk:items-start desk:justify-between">
        <div className="flex flex-col gap-1.5">
          <Link href="/" className="text-xl font-bold text-white">
            AFRICA ENERGY
          </Link>
          <p className="text-[11px] tracking-[0.22px] text-accent">
            Energy intelligence, Africa-first
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 desk:flex desk:w-[720px] desk:gap-12">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className="flex w-40 flex-col gap-1.5">
              <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                {col.heading}
              </p>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13px] text-white hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </Container>
      <Container>
        <div className="mt-6 h-px bg-accent" />
        <p className="mt-4 text-[11px] text-accent">
          © 2026 Africa Energy. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
