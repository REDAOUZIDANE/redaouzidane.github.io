import { Check } from "lucide-react";
import { CategoryIcon } from "./icons";
import type { ServiceCategory } from "@/lib/i18n/types";

export function ServiceCategoryCard({
  category,
  compact = false,
}: {
  category: ServiceCategory;
  compact?: boolean;
}) {
  const items = compact ? category.items.slice(0, 4) : category.items;
  const remaining = compact ? category.items.length - items.length : 0;

  return (
    <div
      id={category.id}
      className="card-lift group flex h-full scroll-mt-28 flex-col rounded-2xl border border-slate-200 bg-white p-7 hover:shadow-xl hover:shadow-slate-200/60"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-white transition-colors duration-300 group-hover:bg-green-600 group-hover:scale-110">
        <CategoryIcon icon={category.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 font-display text-lg font-bold text-navy-950">{category.title}</h3>
      <p className="mt-1.5 text-sm text-slate-500">{category.tagline}</p>
      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {remaining > 0 && (
        <p className="mt-3 text-xs font-medium text-slate-400">+{remaining} more</p>
      )}
    </div>
  );
}
