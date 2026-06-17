"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const TESTIMONIAL_KEYS = ["t1", "t2", "t3"] as const;

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding bg-white" aria-labelledby="testimonials-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold uppercase tracking-widest mb-3">
            Testimonials
          </span>
          <h2 id="testimonials-title" className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
            {t("title")}
          </h2>
          <p className="text-neutral-500">{t("subtitle")}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIAL_KEYS.map((key, i) => (
            <button
              key={key}
              onClick={() => setActive(i)}
              className={`text-left p-6 rounded-2xl border-2 transition-all ${
                active === i
                  ? "border-brand-500 bg-brand-50 shadow-lg"
                  : "border-neutral-100 bg-neutral-50 hover:border-brand-200"
              }`}
              aria-pressed={active === i}
            >
              <p className="text-neutral-700 text-sm leading-relaxed mb-4 italic">
                &ldquo;{t(`${key}.text`)}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-200 flex items-center justify-center">
                  <PersonIcon />
                </div>
                <div>
                  <p className="text-neutral-900 font-semibold text-sm">{t(`${key}.name`)}</p>
                  <p className="text-neutral-400 text-xs">{t(`${key}.location`)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
          {TESTIMONIAL_KEYS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={active === i}
              aria-label={`Testimonial ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                active === i ? "bg-brand-500 w-6" : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
