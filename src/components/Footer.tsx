import Link from "next/link";
import { Mail } from "lucide-react";
import { LogoLockup } from "./LogoMark";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: `/${locale}/`, label: dict.nav.home },
    { href: `/${locale}/services/`, label: dict.nav.services },
    { href: `/${locale}/about/`, label: dict.nav.about },
    { href: `/${locale}/contact/`, label: dict.nav.contact },
  ];

  return (
    <footer className="mt-auto bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr_1.4fr_1fr]">
          <div>
            <LogoLockup variant="white" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {dict.footer.quickLinksTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link prefetch={false} href={link.href} className="text-sm text-slate-400 transition-colors hover:text-green-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {dict.footer.servicesTitle}
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {dict.serviceCategories.map((cat) => (
                <li key={cat.id}>
                  <Link prefetch={false}
                    href={`/${locale}/services/#${cat.id}`}
                    className="text-sm text-slate-400 transition-colors hover:text-green-400"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {dict.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-400" />
                <a href={`mailto:${dict.contact.email}`} className="hover:text-green-400">
                  {dict.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {year} LIMBO Consulting. {dict.footer.rights}
          </p>
          <p className="text-slate-500">
            {dict.marketing.line}
          </p>
        </div>
      </div>
    </footer>
  );
}
