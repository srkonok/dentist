import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DOCTOR } from "@/lib/constants";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-neutral-900"
      aria-label="Hero"
    >
      {/* Background decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-700/20 blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-accent-500/10 blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-5" aria-hidden="true">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28 sm:py-28 sm:pt-36 lg:py-32 lg:pt-40">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Text content */}
          <div className="animate-fade-in-up text-center lg:text-left">
            {/* BMDC badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/20 border border-brand-400/30 mb-6">
              <ShieldCheckIcon />
              <span className="text-brand-200 text-sm font-semibold">{t("badge")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
              {t("name")}
            </h1>
            <p className="text-brand-300 text-sm sm:text-lg font-medium mb-4">{t("credentials")}</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-6">{t("tagline")}</p>
            <p className="text-neutral-300 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {t("description")}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-500 hover:bg-brand-400 text-white font-semibold text-lg transition-all shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5"
              >
                <CalendarIcon />
                {t("cta")}
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-brand-400/50 text-brand-200 font-semibold text-lg hover:border-brand-300 hover:text-white transition-all"
              >
                {t("learnMore")}
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Trust stats */}
            <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
              {[
                { labelKey: "trustBmdc", value: "✓" },
                { labelKey: "trustSurgeon", value: "✓" },
                { labelKey: "trustClinics", value: "2" },
              ].map(({ labelKey, value }) => (
                <div key={labelKey} className="flex items-center gap-2">
                  <span className="text-brand-400 font-bold">{value}</span>
                  <span className="text-neutral-400 text-sm">
                    {t(labelKey as "trustBmdc" | "trustSurgeon" | "trustClinics")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor photo */}
          <div className="flex flex-col items-center lg:items-end animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              {/* Decorative rings */}
              <div className="hidden sm:block absolute inset-0 rounded-full border-2 border-brand-400/30 scale-110" />
              <div className="hidden sm:block absolute inset-0 rounded-full border border-brand-400/15 scale-125" />

              {/* Doctor photo — proper Next.js Image */}
              <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-brand-500/40 shadow-2xl relative">
                <Image
                  src="/images/dr-atoshe.webp"
                  alt={`${DOCTOR.name} — Dental Surgeon`}
                  fill
                  className="object-cover object-[50%_25%]"
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 384px"
                />
              </div>

              {/* Floating card: BMDC — desktop only */}
              <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center">
                  <ShieldCheckIcon className="text-brand-600" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 font-medium">BMDC Reg.</p>
                  <p className="text-sm font-bold text-brand-700">{DOCTOR.bmdcReg}</p>
                </div>
              </div>

              {/* Floating card: Hours — desktop only */}
              <div className="hidden sm:block absolute -top-2 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[10px] text-neutral-500 font-medium">{t("openToday")}</p>
                </div>
                <p className="text-xs font-bold text-neutral-800">10 AM – 3 PM</p>
              </div>
            </div>

            {/* Mobile trust pills — shown only on small screens below photo */}
            <div className="flex sm:hidden flex-wrap justify-center gap-2 mt-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-teal-200 border border-teal-400/20">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                BMDC #{DOCTOR.bmdcReg}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-sky-200 border border-sky-400/20">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                {t("openToday")} · 10 AM–3 PM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block">
          <path d="M0 80 L0 40 C360 0 1080 0 1440 40 L1440 80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

function ShieldCheckIcon({ className = "text-brand-400" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

