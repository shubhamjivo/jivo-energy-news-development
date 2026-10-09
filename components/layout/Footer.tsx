import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import type { SiteSettings } from "@/lib/cms";
import { withAllFooterLinks } from "@/lib/site";

export function Footer({ settings }: { settings: SiteSettings }) {
  const columns = withAllFooterLinks(settings.footerColumns);

  return (
    <footer className="bg-neutral-900 pb-8 pt-10">
      <Container className="flex flex-col gap-8 desk:flex-row desk:items-start desk:justify-between">
        <div className="flex flex-col items-start gap-3">
          <Link href="/" className="block w-[180px] max-w-full desk:w-[200px]">
            <Logo sizes="200px" className="h-auto w-full" />
          </Link>
          <p className="text-[11px] tracking-[0.22px] text-accent">
            {settings.tagline}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 desk:flex desk:gap-12">
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-1.5 desk:w-40">
              <p className="text-[10px] font-semibold tracking-[0.8px] text-accent">
                {col.heading}
              </p>
              {col.links.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
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
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] text-accent">{settings.copyright}</p>
          {settings.socialLinks.length > 0 ? (
            <ul className="flex flex-wrap gap-4">
              {settings.socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-white hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
