"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { LogoLockup } from "./LogoMark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}/`, label: dict.nav.home },
    { href: `/${locale}/services/`, label: dict.nav.services },
    { href: `/${locale}/about/`, label: dict.nav.about },
    { href: `/${locale}/contact/`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link prefetch={false} href={`/${locale}/`} onClick={() => setOpen(false)}>
          <LogoLockup />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link prefetch={false}
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy-900/80 transition-colors hover:text-green-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LanguageSwitcher locale={locale} />
          <Link prefetch={false}
            href={`/${locale}/contact/`}
            className="group inline-flex items-center gap-1.5 rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-600"
          >
            {dict.nav.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy-950 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-6 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link prefetch={false}
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-base font-medium text-navy-900 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <LanguageSwitcher locale={locale} />
            <Link prefetch={false}
              href={`/${locale}/contact/`}
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white"
            >
              {dict.nav.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
