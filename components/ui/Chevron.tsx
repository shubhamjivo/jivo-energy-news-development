export function Chevron({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex size-5 items-center justify-center rounded-[10px] bg-forest text-[13px] font-bold leading-none text-white ${className}`}
      aria-hidden
    >
      ›
    </span>
  );
}
