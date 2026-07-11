export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
      {children}
    </div>
  );
}
