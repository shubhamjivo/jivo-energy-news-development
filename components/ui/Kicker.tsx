type KickerProps = {
  children: string;
  className?: string;
  tone?: "accent" | "ink";
};

export function Kicker({ children, className = "", tone = "accent" }: KickerProps) {
  return (
    <p
      className={`text-[9px] font-semibold tracking-[0.72px] uppercase ${
        tone === "accent" ? "text-accent" : "text-ink"
      } ${className}`}
    >
      {children}
    </p>
  );
}
