"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/types";

const inputClass =
  "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-navy-950 outline-none transition-colors focus:border-green-500";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const labels = dict.contact.labels;
  const placeholders = dict.contact.placeholders;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company && `Company: ${form.company}`,
      form.phone && `Phone: ${form.phone}`,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${dict.contact.email}?subject=${encodeURIComponent(
      labels.subjectDefault
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={labels.name}>
          <input
            required
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={placeholders.name}
            className={inputClass}
          />
        </Field>
        <Field label={labels.email}>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={placeholders.email}
            className={inputClass}
          />
        </Field>
        <Field label={labels.company}>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder={placeholders.company}
            className={inputClass}
          />
        </Field>
        <Field label={labels.phone}>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder={placeholders.phone}
            className={inputClass}
          />
        </Field>
      </div>
      <Field label={labels.message}>
        <textarea
          required
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder={placeholders.message}
          className={`${inputClass} resize-none`}
        />
      </Field>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-950 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-green-600 sm:w-auto"
      >
        {labels.submit}
        <Send className="h-4 w-4" />
      </button>

      <p className="text-xs leading-relaxed text-slate-400">{dict.contact.note}</p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy-900">{label}</span>
      {children}
    </label>
  );
}
