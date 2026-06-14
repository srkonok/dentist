"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

const TESTIMONIAL_KEYS = ["t1", "t2", "t3"] as const;

const AVATAR_COLORS = [
  { bg: "#0d9488", text: "white" },
  { bg: "#0ea5e9", text: "white" },
  { bg: "#8b5cf6", text: "white" },
];

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % TESTIMONIAL_KEYS.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <section
      className="section-padding relative overflow-hidden"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{ background: "linear-gradient(135deg, #0f766e 0%, #0e7490 60%, #1e3a5f 100%)" }}
    >
      {/* Background dots */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true">
        <svg className="w-full h-full">
          <defs>
            <pattern id="tdots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tdots)" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)" }} aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-teal-200 text-xs font-bold uppercase tracking-widest mb-4 border border-white/20">
            {t("pill")}
          </span>
          <h2 id="testimonials-title" className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white mb-3 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-teal-200 text-base max-w-md mx-auto leading-relaxed">{t("subtitle")}</p>

          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} filled />
              ))}
            </div>
            <span className="text-white font-bold">5.0</span>
            <span className="text-teal-300 text-sm">· {t("verifiedPatients")}</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          {TESTIMONIAL_KEYS.map((key, i) => {
            const isActive = active === i;
            const { bg, text } = AVATAR_COLORS[i];
            const name = t(`${key}.name`);
            const initials = name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

            return (
              <button
                key={key}
                onClick={() => setActive(i)}
                className="text-left p-5 rounded-2xl border-2 transition-all duration-300 w-full"
                style={{
                  background: isActive ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                  borderColor: isActive ? "rgba(94,234,212,0.6)" : "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(8px)",
                  boxShadow: isActive ? "0 8px 32px rgba(0,0,0,0.2)" : "none",
                  transform: isActive ? "translateY(-4px)" : "none",
                }}
                aria-pressed={isActive}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <StarIcon key={si} filled />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/90 text-sm leading-relaxed mb-4 italic">
                  <QuoteIcon />
                  {t(`${key}.text`)}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                    style={{ background: bg, color: text }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{name}</p>
                    <p className="text-teal-300 text-xs">{t(`${key}.location`)}</p>
                  </div>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-teal-400 animate-pulse shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-7" role="tablist" aria-label="Testimonial navigation">
          {TESTIMONIAL_KEYS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={active === i}
              aria-label={`Testimonial ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: active === i ? "2rem" : "0.5rem",
                background: active === i ? "#2dd4bf" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StarIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#fbbf24" : "none"} stroke="#fbbf24" strokeWidth="1.5" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      className="inline-block mr-1 align-text-top opacity-40"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="white"
      aria-hidden="true"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}
