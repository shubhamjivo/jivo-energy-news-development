export function Dots({ count, active = 0 }: { count: number; active?: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={
            i === active
              ? "size-2 rounded-full bg-ink"
              : "size-1.5 rounded-full bg-muted/50"
          }
        />
      ))}
    </div>
  );
}
