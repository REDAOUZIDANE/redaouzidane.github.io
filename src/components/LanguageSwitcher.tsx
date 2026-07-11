"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

function pathForLocale(pathname: string, target: Locale) {
  const segments = pathname.split("/").filter(Boolean);
  segments[0] = target;
  return `/${segments.join("/")}/`;
}

export function LanguageSwitcher({ locale, className }: { locale: Locale; className?: string }) {
  const pathname = usePathname();

  return (
    <div className={`flex items-center gap-1 text-sm font-medium ${className ?? ""}`}>
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          <Link prefetch={false}
            href={pathForLocale(pathname, loc)}
            aria-current={loc === locale}
            className={
              loc === locale
                ? "text-navy-950"
                : "text-slate-500 hover:text-navy-800 transition-colors"
            }
          >
            {loc.toUpperCase()}
          </Link>
          {i < locales.length - 1 && <span className="text-slate-300">/</span>}
        </span>
      ))}
    </div>
  );
}
