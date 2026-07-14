"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Contact form — cartoon styled. Concept demo: on submit it shows a thank-you
 * state client-side. PLACEHOLDER: wire to email / form service once confirmed.
 */
export function ContactForm() {
  const t = useTranslations("contactPage.form");
  const [sent, setSent] = useState(false);

  const inputStyle =
    "w-full bg-surface px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none";
  const border = {
    border: "3px solid var(--outline-ink)",
    borderRadius: "var(--radius)",
  } as const;

  if (sent) {
    return (
      <div
        className="card-cartoon flex min-h-[18rem] items-center justify-center p-8 text-center"
      >
        <p className="display text-primary" style={{ fontSize: "var(--type-section-size)" }}>
          {t("sent")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-5"
    >
      <Field label={t("name")}>
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder={t("namePh")}
          className={inputStyle}
          style={border}
        />
      </Field>
      <Field label={t("email")}>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={t("emailPh")}
          className={inputStyle}
          style={border}
        />
      </Field>
      <Field label={t("message")}>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={t("messagePh")}
          className={`${inputStyle} resize-none`}
          style={border}
        />
      </Field>

      <button
        type="submit"
        className="label mt-2 self-start bg-primary px-8 py-4 text-primary-foreground transition-colors duration-200 hover:bg-foreground"
        style={{ borderRadius: "var(--radius-pill)", boxShadow: "4px 4px 0 var(--outline-ink)" }}
      >
        {t("submit")} →
      </button>

      <p className="text-xs text-muted-foreground/70">{t("note")}</p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label text-[0.7rem] text-primary-strong">{label}</span>
      {children}
    </label>
  );
}
