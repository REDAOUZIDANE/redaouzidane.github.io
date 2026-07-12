import { Mail, MapPin, Clock } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { Eyebrow } from "@/components/Eyebrow";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { notFound } from "next/navigation";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const contact = dict.contact;

  return (
    <section className="bg-grid">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h1 className="text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
            {contact.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">{contact.subtitle}</p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <h2 className="font-display text-lg font-bold text-navy-950">{contact.infoTitle}</h2>
              <ul className="mt-5 space-y-5">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-navy-900">{contact.email}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-navy-900">{contact.location}</p>
                    <p className="text-sm text-slate-500">{contact.locationValue}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-navy-900">{contact.hoursLabel}</p>
                    <p className="text-sm text-slate-500">{contact.hoursValue}</p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
            <h2 className="font-display text-lg font-bold text-navy-950">{contact.formTitle}</h2>
            <div className="mt-6">
              <ContactForm dict={dict} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
