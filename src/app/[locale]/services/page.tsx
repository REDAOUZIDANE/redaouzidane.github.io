import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { Eyebrow } from "@/components/Eyebrow";
import { ServiceCategoryCard } from "@/components/ServiceCategoryCard";
import { notFound } from "next/navigation";

export default async function ServicesPage({
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
      <section className="bg-grid border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center lg:px-8 lg:py-24">
          <Eyebrow>{dict.nav.services}</Eyebrow>
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
            {dict.servicesOverview.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            {dict.servicesOverview.subtitle}
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-sm font-medium text-slate-500">
            {dict.marketing.line}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.serviceCategories.map((category) => (
            <ServiceCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28">
        <div className="rounded-3xl bg-navy-950 px-8 py-14 text-center sm:px-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {dict.cta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">{dict.cta.subtitle}</p>
          <div className="mt-7">
            <Link prefetch={false}
              href={`/${locale}/contact/`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-green-100"
            >
              {dict.cta.button}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
