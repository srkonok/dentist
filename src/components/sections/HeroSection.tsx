import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DOCTOR } from "@/lib/constants";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
      style={{ background: "linear-gradient(135deg, #0b3d35 0%, #0d766e 45%, #0e7490 75%, #1a3356 100%)" }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] -left-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-15" style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-10" style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" aria-hidden="true">
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-28 lg:pt-32 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-center">

          {/* Text column */}
          <div className="animate-fade-in-up order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(45,212,191,0.15)", border: "1px solid rgba(45,212,191,0.35)" }}>
              <ShieldCheckIcon />
              <span className="text-teal-200 text-sm font-semibold tracking-wide">{t("badge")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-3">
              {t("name")}
            </h1>
            <p className="text-teal-300 text-sm font-medium mb-4 tracking-wider uppercase">{t("credentials")}</p>

            <p
              className="text-2xl sm:text-3xl font-bold mb-5 leading-snug"
              style={{ background: "linear-gradient(135deg, #5eead4 0%, #38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              {t("tagline")}
            </p>

            <p className="text-slate-300 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
              {t("description")}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-bold text-sm transition-all duration-200 hover:-translate-y-1 active:scale-95"
                style={{ background: "linear-gradient(135deg, #0d9488, #0ea5e9)", boxShadow: "0 4px 24px rgba(14,148,136,0.45)" }}
              >
                <CalendarIcon />
                {t("cta")}
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white/10 active:scale-95"
                style={{ border: "2px solid rgba(94,234,212,0.4)", backdropFilter: "blur(4px)" }}
              >
                {t("learnMore")}
                <ArrowRightIcon />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {([
                { label: t("trustBmdc", { reg: DOCTOR.bmdcReg }), color: "#2dd4bf" },
                { label: t("trustDegree"), color: "#38bdf8" },
                { label: t("trustClinics"), color: "#a78bfa" },
              ] as const).map(({ label, color }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(255,255,255,0.08)", color, border: `1px solid ${color}33` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Doctor photo card */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up order-1 lg:order-2" style={{ animationDelay: "0.15s" }}>
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[360px]">

              {/* Photo — no silhouette overlay, no text on top of image */}
              <div
                className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl"
                style={{
                  aspectRatio: "3/4",
                  background: "linear-gradient(160deg, #115e59 0%, #0f766e 50%, #0e7490 100%)",
                  border: "1px solid rgba(45,212,191,0.25)",
                }}
              >
                <Image
                  src="/images/dr-atoshe.webp"
                  alt={`${DOCTOR.name} — Dental Surgeon`}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 360px"
                />
                {/* Subtle edge darkening only */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 60px rgba(7,47,42,0.35)" }}
                />
              </div>

              {/* Badge: name + BMDC reg — bottom-left */}
              <div
                className="absolute -bottom-4 -left-4 flex items-center gap-2.5 px-3.5 py-2.5 bg-white rounded-2xl shadow-xl"
                style={{ minWidth: "175px" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #0d9488, #0369a1)" }}
                >
                  <ShieldCheckIcon color="white" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest leading-tight">BMDC #{DOCTOR.bmdcReg}</p>
                  <p className="text-sm font-black text-teal-700 leading-tight">{DOCTOR.name}</p>
                </div>
              </div>

              {/* Badge: open hours — top-right */}
              <div className="absolute -top-3 -right-3 px-3.5 py-2.5 bg-white rounded-2xl shadow-xl">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide">{t("openToday")}</p>
                </div>
                <p className="text-xs font-black text-slate-800">{t("openHours")}</p>
              </div>

              {/* Decorative rings */}
              <div className="absolute inset-[-10px] rounded-[2.4rem] -z-10 opacity-20" style={{ border: "2px solid #2dd4bf" }} />
              <div className="absolute inset-[-20px] rounded-[2.8rem] -z-10 opacity-10" style={{ border: "1px solid #38bdf8" }} />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block">
          <path d="M0 72 L0 42 C240 10 480 2 720 12 C960 22 1200 10 1440 42 L1440 72 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

function ShieldCheckIcon({ color = "#2dd4bf" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
