"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  DATE_LINE,
  MOBILE_DATE,
  MOBILE_TIME,
  NAV_LINKS,
  UTILITY_LINKS,
} from "@/lib/content";
import { InsightsMenu } from "@/components/layout/InsightsMenu";
import { Container } from "@/components/ui/Container";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const mastheadRef = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);

  useEffect(() => {
    const node = mastheadRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCompact(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header>
        <div ref={mastheadRef}>
          <div className="bg-navy text-[11px] tracking-[0.22px] text-white">
            <Container className="flex h-7 items-center justify-between desk:h-[34px]">
              <p className="hidden desk:block">{DATE_LINE}</p>
              <p className="desk:hidden">{MOBILE_DATE}</p>
              <p className="desk:hidden">{MOBILE_TIME}</p>
              <nav className="hidden items-center gap-[22px] tracking-[0.44px] desk:flex">
                {UTILITY_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </Container>
          </div>

          <div className="bg-paper py-4 desk:h-[150px] desk:py-6">
            <Container className="flex h-full flex-col items-center justify-center gap-2">
              <Link
                href="/"
                className="text-center text-[32px] font-bold leading-none tracking-[-1.28px] desk:text-[64px]"
              >
                <span className="text-navy">AFRICA</span>{" "}
                <span className="text-black">ENERGY</span>{" "}
                <span className="text-black">NEWS</span>
              </Link>
              <div className="flex w-full items-center justify-between">
                <p className="text-center text-[12px] leading-[18px] text-muted desk:text-left desk:text-sm desk:leading-[21px]">
                  Energy intelligence, Africa-first
                </p>
                <Link
                  href="/#newsletter"
                  className="hidden h-8 w-[108px] items-center justify-center bg-accent text-[15px] font-semibold leading-[18px] text-white desk:flex"
                >
                  Subscribe
                </Link>
              </div>
            </Container>
          </div>
        </div>
      </header>

      <div
        className={`sticky top-0 z-40 bg-paper ${compact ? "shadow-[0_1px_0_0_var(--color-hairline),0_8px_16px_-12px_rgb(3_14_80_/_0.25)]" : ""
          }`}
      >
        <div className="h-px bg-accent" />
        <Container className="flex h-10 items-center justify-between gap-4 desk:h-11">
          {compact ? (
            <Link
              href="/"
              className="shrink-0 text-[13px] font-bold tracking-[-0.3px] desk:text-base"
            >
              <span className="text-navy">AFRICA</span>{" "}
              <span className="text-black">ENERGY</span>{" "}
              <span className="hidden text-black sm:inline">NEWS</span>
            </Link>
          ) : null}

          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 items-center gap-7 text-sm desk:flex"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              if (link.href === "/insights") {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setInsightsOpen(true)}
                    onMouseLeave={() => setInsightsOpen(false)}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={insightsOpen}
                      aria-haspopup="true"
                      className={`inline-flex items-center gap-1 ${
                        active
                          ? "font-semibold leading-[18px] text-ink"
                          : "leading-[21px] text-muted hover:text-ink"
                      }`}
                    >
                      {link.label}
                      <span aria-hidden className="text-[10px]">
                        ▾
                      </span>
                    </Link>
                    {insightsOpen ? (
                      <div className="absolute top-full left-0 z-50 pt-3">
                        <InsightsMenu
                          pathname={pathname}
                          onNavigate={() => setInsightsOpen(false)}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "font-semibold leading-[18px] text-ink"
                      : "leading-[21px] text-muted hover:text-ink"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <nav
            aria-label="Primary"
            className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto text-[13px] text-muted no-scrollbar desk:hidden"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "whitespace-nowrap font-semibold text-ink"
                      : "whitespace-nowrap"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex shrink-0 items-center gap-4">
            {compact ? (
              <Link
                href="/#newsletter"
                className="hidden h-7 items-center bg-accent px-3 text-[12px] font-semibold text-white desk:flex"
              >
                Subscribe
              </Link>
            ) : null}
            <button
              type="button"
              className="hidden text-[15px] font-semibold text-ink desk:block"
              onClick={() => setSearchOpen((v) => !v)}
            >
              Search
            </button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-6 w-6 flex-col items-end justify-center gap-1.5 desk:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="h-0.5 w-6 bg-ink" />
              <span className="h-0.5 w-4 bg-ink" />
            </button>
          </div>
        </Container>
        <div className="h-px bg-hairline" />

        {searchOpen ? (
          <form
            className="hidden border-b border-hairline py-3 desk:block"
            action="/news"
            method="get"
          >
            <Container>
            <label className="sr-only" htmlFor="site-search">
              Search Africa Energy News
            </label>
            <input
              id="site-search"
              autoFocus
              type="search"
              name="q"
              placeholder="Search Africa Energy News"
              className="w-full border border-hairline px-3 py-2 text-sm outline-none focus:border-navy"
            />
            </Container>
          </form>
        ) : null}

        {open ? (
          <nav
            aria-label="Mobile"
            className="border-b border-hairline bg-paper py-4 desk:hidden"
          >
            <Container className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              if (link.href === "/insights") {
                return (
                  <div key={link.href} className="flex flex-col gap-2">
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={
                        active ? "text-sm font-semibold text-ink" : "text-sm text-ink"
                      }
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                    <InsightsMenu
                      pathname={pathname}
                      onNavigate={() => setOpen(false)}
                      variant="inline"
                    />
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active ? "text-sm font-semibold text-ink" : "text-sm text-ink"
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#newsletter"
              className="mt-2 flex h-10 items-center justify-center bg-accent text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Subscribe
            </Link>
            </Container>
          </nav>
        ) : null}
      </div>
    </>
  );
}
