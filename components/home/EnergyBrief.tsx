import { ENERGY_BRIEF } from "@/lib/content";

export function EnergyBrief() {
  return (
    <section
      id="brief"
      className="hidden items-center gap-5 bg-ink px-24 desk:flex"
    >
      <div className="flex h-[52px] w-[170px] shrink-0 items-center justify-center bg-forest">
        <p className="text-[11px] font-bold tracking-[0.44px] text-white">
          Africa Energy Brief
        </p>
      </div>
      {ENERGY_BRIEF.map((item, i) => (
        <div key={item.kicker} className="flex items-center gap-5">
          {i > 0 ? <span className="text-xs text-muted">/</span> : null}
          <p className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[11px] font-semibold text-accent">{item.kicker}</span>
            <span className="text-xs text-white">{item.text}</span>
          </p>
        </div>
      ))}
    </section>
  );
}
