import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { DOCTOR } from "@/lib/constants";

export default function CTABanner() {
  const t = useTranslations("cta");
  return (
    <section className="pb-20 pt-4 bg-white" aria-label="Book appointment call to action">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden px-6 sm:px-10 py-12 text-center"
          style={{ background: "linear-gradient(135deg, #0b3d35 0%, #0d766e 50%, #0e7490 100%)" }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)" }} />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }} />
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
              <defs>
                <pattern id="cta-dots" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-dots)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: "rgba(45,212,191,0.2)", border: "1px solid rgba(45,212,191,0.3)" }}
            >
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-teal-200 text-xs font-bold uppercase tracking-widest">
                {t("pill")}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
              {t("title")}
            </h2>
            <p className="text-teal-200 text-base max-w-lg mx-auto mb-8 leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-base transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: "white",
                  color: "#0d766e",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                }}
              >
                <CalendarIcon />
                {t("bookBtn")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-bold text-base text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white/10"
                style={{ border: "2px solid rgba(255,255,255,0.3)" }}
              >
                <PhoneIcon />
                {t("contactBtn")}
              </Link>
            </div>

            {/* Small trust line */}
            <p className="text-teal-300/70 text-xs mt-8">
              {t("trustLine", { reg: DOCTOR.bmdcReg })}
            </p>
          </div>
        </div>
      </div>
    </section>
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

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.71 3.41 2 2 0 0 1 3.68 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.16 6.16l1.02-1.02a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
