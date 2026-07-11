export function Ticker({ items }: { items: string[] }) {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-slate-100 bg-slate-50/60 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent" />
      <div className="ticker-track flex w-max items-center gap-10 whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-sm font-semibold tracking-wide text-navy-800/70"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
