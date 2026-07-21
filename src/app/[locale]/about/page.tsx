import Link from "next/link";
import { ArrowRight, Target, Eye } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { FounderSection } from "@/components/FounderSection";
import { notFound } from "next/navigation";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const about = dict.about;

  return (
    <>
      <section className="bg-grid border-b border-slate-100">
        <Reveal className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-8 lg:py-24">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h1 className="text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
            {about.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            {about.intro}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
        <Reveal className="space-y-6">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-slate-700">
              {p}
            </p>
          ))}
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="card-lift h-full rounded-2xl border border-slate-200 p-7 hover:shadow-lg hover:shadow-slate-200/60">
              <Target className="h-7 w-7 text-green-600" />
              <h2 className="mt-4 font-display text-lg font-bold text-navy-950">{about.missionTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{about.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card-lift h-full rounded-2xl border border-slate-200 p-7 hover:shadow-lg hover:shadow-slate-200/60">
              <Eye className="h-7 w-7 text-green-600" />
              <h2 className="mt-4 font-display text-lg font-bold text-navy-950">{about.visionTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{about.vision}</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {about.stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-slate-50 px-6 py-8 text-center">
              <p className="font-display text-3xl font-extrabold text-navy-950">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <FounderSection dict={dict} />

      <section className="bg-navy-950 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-white">
              {about.valuesTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 80}>
                <div className="card-lift h-full rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-green-400/40 hover:bg-white/[0.07]">
                  <h3 className="font-display text-base font-bold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">
            {dict.cta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">{dict.cta.subtitle}</p>
          <div className="mt-7">
            <Link prefetch={false}
              href={`/${locale}/contact/`}
              className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              {dict.cta.button}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
