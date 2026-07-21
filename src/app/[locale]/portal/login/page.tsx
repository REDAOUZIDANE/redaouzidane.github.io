"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, ArrowLeft } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { Eyebrow } from "@/components/Eyebrow";
import { useAuth } from "@/lib/supabase/AuthProvider";

const inputClass =
  "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-navy-950 outline-none transition-colors focus:border-green-500";

export default function PortalLoginPage() {
  const params = useParams<{ locale: string }>();
  const router = useRouter();
  const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.portal.login;

  const { configured, session, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) router.replace(`/${locale}/portal/`);
  }, [session, router, locale]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) setError(error);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-grid px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <Link
          prefetch={false}
          href={`/${locale}/`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-navy-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t.backHome}
        </Link>

        <div className="mt-6 text-center">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 className="font-display text-2xl font-extrabold text-navy-950">{t.title}</h1>
          <p className="mt-2 text-sm text-slate-500">{t.subtitle}</p>
        </div>

        {!configured ? (
          <p className="mt-8 rounded-xl bg-slate-50 px-4 py-3 text-center text-sm text-slate-600">
            {t.notConfigured}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-navy-900">{t.emailLabel}</span>
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-navy-900">{t.passwordLabel}</span>
              <input
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:opacity-60"
            >
              {submitting ? t.submitting : t.submit}
              <LogIn className="h-4 w-4" />
            </button>

            <p className="text-center text-xs leading-relaxed text-slate-400">{t.forgotHint}</p>
          </form>
        )}
      </div>
    </div>
  );
}
