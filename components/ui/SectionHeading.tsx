import Link from "next/link";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  href?: string;
  action?: string;
  id?: string;
  reserveControls?: boolean;
};

export function SectionHeading({
  kicker,
  title,
  href,
  action,
  id,
  reserveControls = false,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-1.5" id={id}>
      <p className="text-[10px] font-semibold tracking-[1px] text-accent uppercase">
        {kicker}
      </p>
      <div
        className={`flex items-end justify-between gap-4 ${
          reserveControls ? "desk:pr-[88px]" : ""
        }`}
      >
        <h2 className="text-[26px] font-bold leading-none text-ink desk:text-[28px]">
          {title}
        </h2>
        {action && href ? (
          <Link
            href={href}
            className="shrink-0 text-xs text-muted hover:text-ink"
          >
            {action}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
