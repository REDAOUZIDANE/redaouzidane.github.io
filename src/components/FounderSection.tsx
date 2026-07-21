import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { AnimatedCounter } from "./AnimatedCounter";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

function Avatar({ name, size = "lg" }: { name: string; size?: "lg" | "sm" }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const dimension = size === "lg" ? "h-28 w-28 text-3xl" : "h-16 w-16 text-lg";

  return (
    <div
      className={`flex ${dimension} shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-950 to-green-700 font-display font-extrabold text-white`}
    >
      {initials}
    </div>
  );
}

export function FounderSection({ dict }: { dict: Dictionary }) {
  const founder = dict.founder;

  return (
    <section id="founder" className="scroll-mt-28 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{founder.eyebrow}</Eyebrow>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            {founder.title}
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-12 rounded-3xl border border-slate-200 p-8 sm:p-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <Avatar name={founder.name} />
            <div className="text-center sm:text-left">
              <h3 className="font-display text-xl font-bold text-navy-950">{founder.name}</h3>
              <p className="text-sm font-semibold text-green-600">{founder.role}</p>
              <p className="mt-1 text-sm text-slate-500">{founder.credential}</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {founder.bio.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {founder.badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-navy-900"
              >
                <Award className="h-3.5 w-3.5 text-green-600" />
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-9 grid grid-cols-1 gap-4 border-t border-slate-100 pt-8 sm:grid-cols-3">
            {founder.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl font-extrabold text-navy-950">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FounderTeaser({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const founder = dict.founder;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
      <Reveal className="flex flex-col items-center gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center sm:flex-row sm:text-left lg:p-10">
        <Avatar name={founder.name} size="sm" />
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
            {founder.eyebrow}
          </p>
          <p className="mt-1.5 font-display text-base font-bold text-navy-950">
            {founder.name} · {founder.role}
          </p>
          <p className="mt-1.5 text-sm text-slate-600">{founder.homeTeaser}</p>
        </div>
        <Link
          prefetch={false}
          href={`/${locale}/about/#founder`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-navy-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
        >
          {founder.homeCta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}
