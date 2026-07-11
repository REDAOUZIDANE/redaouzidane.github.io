import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { Eyebrow } from "@/components/Eyebrow";
import { Ticker } from "@/components/Ticker";
import { ServiceCategoryCard } from "@/components/ServiceCategoryCard";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-green-100 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-[-10%] h-96 w-96 rounded-full bg-navy-900/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{dict.hero.eyebrow}</Eyebrow>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
              {dict.hero.title}
              <br />
              <span className="text-green-600">{dict.hero.highlight}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              {dict.hero.subtitle}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link prefetch={false}
                href={`/${locale}/contact/`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-950 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 sm:w-auto"
              >
                {dict.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link prefetch={false}
                href={`/${locale}/services/`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-sm font-semibold text-navy-950 transition-colors hover:border-navy-950 sm:w-auto"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
            {dict.hero.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white/70 px-6 py-6 text-center backdrop-blur">
                <p className="font-display text-3xl font-extrabold text-navy-950">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <Ticker items={dict.hero.ticker} />
      </section>

      {/* Services overview */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{dict.servicesOverview.eyebrow}</Eyebrow>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            {dict.servicesOverview.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{dict.servicesOverview.subtitle}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.serviceCategories.map((category) => (
            <ServiceCategoryCard key={category.id} category={category} compact />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link prefetch={false}
            href={`/${locale}/services/`}
            className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
          >
            {dict.servicesOverview.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-navy-950 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-400">
              {dict.whyUs.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {dict.whyUs.title}
            </h2>
            <p className="mt-4 text-lg text-slate-300">{dict.whyUs.subtitle}</p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.whyUs.points.map((point) => (
              <div key={point.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
                <h3 className="mt-4 font-display text-base font-bold text-white">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{dict.approach.eyebrow}</Eyebrow>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            {dict.approach.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{dict.approach.subtitle}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {dict.approach.steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="font-display text-4xl font-extrabold text-slate-200">{step.number}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-navy-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-green-700 px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {dict.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-200">{dict.cta.subtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link prefetch={false}
              href={`/${locale}/contact/`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-green-100 sm:w-auto"
            >
              {dict.cta.button}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link prefetch={false}
              href={`/${locale}/services/`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white sm:w-auto"
            >
              {dict.cta.buttonSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
