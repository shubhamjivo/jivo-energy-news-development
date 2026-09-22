export function UpNextDivider() {
  return (
    <div className="container pb-3" role="separator">
      <div className="flex items-center gap-3">
        <span aria-hidden className="h-1 w-8 shrink-0 bg-neutral-900" />
        <p className="relative shrink-0 text-[15px] font-bold leading-none text-neutral-900">
          Up Next
          <svg
            aria-hidden
            viewBox="0 0 10 6"
            className="absolute top-full left-1/2 mt-1 h-1.5 w-2.5 -translate-x-1/2"
          >
            <path fill="currentColor" d="M0 0h10L5 6z" />
          </svg>
        </p>
        <span aria-hidden className="h-1 min-w-0 flex-1 bg-neutral-900" />
      </div>
    </div>
  );
}
