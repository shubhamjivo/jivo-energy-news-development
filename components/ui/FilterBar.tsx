export function FilterBar<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((item) => {
        const active = item === value;
        return (
          <button
            key={item}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(item)}
            className={`px-3 py-[7px] text-xs ${
              active ? "bg-navy text-white" : "border border-hairline text-ink"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
