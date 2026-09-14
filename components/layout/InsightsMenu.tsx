"use client";

import Image from "next/image";
import Link from "next/link";
import { FEATURED_INSIGHT, INSIGHTS_LINKS } from "@/lib/site";

type InsightsMenuProps = {
  pathname: string;
  onNavigate?: () => void;
  variant?: "dropdown" | "inline";
};

export function InsightsMenu({
  pathname,
  onNavigate,
  variant = "dropdown",
}: InsightsMenuProps) {
  if (variant === "inline") {
    return (
      <ul className="flex flex-col gap-2 pl-3">
        {INSIGHTS_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                className={
                  active
                    ? "text-sm font-semibold text-ink"
                    : "text-sm text-muted"
                }
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="flex w-[min(560px,calc(100vw-2rem))] border border-hairline bg-paper shadow-[0_12px_32px_-12px_rgba(3,14,80,0.28)]">
      <ul className="flex min-w-[200px] flex-1 flex-col justify-center gap-4 px-6 py-6">
        {INSIGHTS_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                className={
                  active
                    ? "text-[15px] font-semibold text-ink"
                    : "text-[15px] text-ink hover:text-muted"
                }
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href={FEATURED_INSIGHT.href}
        onClick={onNavigate}
        className="relative m-3 hidden w-[280px] shrink-0 flex-col justify-end overflow-hidden bg-ink p-5 text-white sm:flex"
      >
        <Image
          src={FEATURED_INSIGHT.image}
          alt=""
          fill
          sizes="280px"
          className="object-cover opacity-35"
        />
        <div className="relative">
          <p className="text-[11px] font-semibold tracking-[1.4px] text-accent uppercase">
            {FEATURED_INSIGHT.kicker}
          </p>
          <p className="mt-2 text-lg font-bold leading-6">
            {FEATURED_INSIGHT.title}
          </p>
          <p className="mt-2 text-[13px] leading-5 text-white/80">
            {FEATURED_INSIGHT.dek}
          </p>
        </div>
      </Link>
    </div>
  );
}
