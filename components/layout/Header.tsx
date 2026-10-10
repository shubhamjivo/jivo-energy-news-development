"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { InsightCard } from "@/lib/cms";
import { NAV_LINKS, UTILITY_LINKS } from "@/lib/site";
import { InsightsMenu } from "@/components/layout/InsightsMenu";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-[18px]" fill="none">
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.75" />
      <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

// Formatted on the client so the date and time are the reader's "now"; empty
// during server render to avoid a hydration mismatch.
function useUtcClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, []);
  if (!now) return { date: "", time: "" };
  const date = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const time = `${now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  })} UTC`;
  return { date, time };
}

export function Header({ insightsFeature = null }: { insightsFeature?: InsightCard | null }) {
  const pathname = usePathname();
  const clock = useUtcClock();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setCompact((current) => {
          if (!current && y > 64) return true;
          if (current && y < 4) return false;
          return current;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-paper [overflow-anchor:none] transition-shadow duration-300 ease-out ${
        compact
          ? "shadow-[0_1px_0_0_var(--clr-neutral-200),0_8px_16px_-12px_color-mix(in_srgb,var(--clr-primary-900)_25%,transparent)]"
          : ""
      }`}
    >
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out desk:hidden ${
            compact ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
          }`}
        >
          <div className="overflow-hidden">
            <Container className="flex h-7 items-center justify-between text-[11px] tracking-[0.22px] text-muted">
              <p>{clock.date}</p>
              <p>{clock.time}</p>
            </Container>
          </div>
        </div>

        <div className="border-b border-accent bg-paper desk:hidden">
          <Container className={`grid grid-cols-[1.5rem_minmax(0,1fr)_1.5rem] items-center gap-3 transition-[padding] duration-300 ease-out ${compact ? "py-1" : "py-3"}`}>
            <span aria-hidden />
            <Link href="/" className="block justify-self-center">
              <Logo
                preload
                sizes="230px"
                className="object-contain object-center transition-[width,height] duration-300 ease-out"
                style={compact ? { width: 48, height: 32 } : { width: 230, height: 110 }}
              />
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-6 w-6 flex-col items-end justify-center gap-1.5"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="h-0.5 w-6 bg-ink" />
              <span className="h-0.5 w-4 bg-ink" />
            </button>
          </Container>
        </div>

        <div className="hidden bg-paper desk:block">
          <Container className={`flex items-center transition-[gap,padding] duration-300 ease-out ${compact ? "gap-5 py-1" : "gap-8 py-3"}`}>
            <Link href="/" className="block shrink-0">
              <Logo
                preload
                sizes="230px"
                className="object-contain object-left transition-[width,height] duration-300 ease-out"
                style={compact ? { width: 48, height: 32 } : { width: 230, height: 110 }}
              />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  compact
                    ? "pointer-events-none grid-rows-[0fr] opacity-0"
                    : "grid-rows-[1fr] opacity-100"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex items-center justify-between gap-6">
                    <nav className="flex min-w-0 items-center gap-5 text-[11px] font-medium tracking-[0.16em] uppercase">
                      {UTILITY_LINKS.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="whitespace-nowrap text-muted hover:text-ink"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                    <p className="shrink-0 text-[11px] tracking-[0.04em] text-muted">
                      {clock.date ? `${clock.date} · ${clock.time}` : ""}
                    </p>
                  </div>
                  <div className="my-3 h-px bg-hairline" />
                </div>
              </div>
              <div className="flex items-center justify-between gap-6">
                <nav aria-label="Primary" className="flex min-w-0 items-center gap-6 text-[13px] font-semibold tracking-[0.12em] uppercase">
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
                              active ? "text-accent" : "text-muted hover:text-ink"
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
                                feature={insightsFeature}
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
                            ? "whitespace-nowrap text-accent"
                            : "whitespace-nowrap text-muted hover:text-ink"
                        }
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
                <button
                  type="button"
                  aria-label="Search"
                  className="shrink-0 text-ink hover:text-accent"
                  onClick={() => setSearchOpen((v) => !v)}
                >
                  <SearchIcon />
                </button>
              </div>
            </div>
          </Container>
          <div className="h-px bg-accent" />
        </div>

        {searchOpen ? (
          <form className="border-b border-hairline bg-paper py-3" action="/news" method="get">
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
                className="w-full border border-hairline px-3 py-2 text-sm text-ink outline-none focus:border-navy"
              />
            </Container>
          </form>
        ) : null}

        {open ? (
          <nav aria-label="Mobile" className="border-b border-hairline bg-paper py-4 desk:hidden">
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
                          active ? "text-sm font-semibold text-accent" : "text-sm text-ink"
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
                      active ? "text-sm font-semibold text-accent" : "text-sm text-ink"
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
    </header>
  );
}
