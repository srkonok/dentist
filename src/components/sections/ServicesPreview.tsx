import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const SERVICES = [
  {
    key: "implants",
    gradient: "from-teal-500 to-cyan-600",
    icon: <ImplantIcon />,
    accent: "#14b8a6",
  },
  {
    key: "wisdom",
    gradient: "from-sky-500 to-blue-600",
    icon: <ToothIcon />,
    accent: "#0ea5e9",
  },
  {
    key: "rootCanal",
    gradient: "from-violet-500 to-purple-600",
    icon: <RootCanalIcon />,
    accent: "#8b5cf6",
  },
  {
    key: "cosmetic",
    gradient: "from-amber-400 to-orange-500",
    icon: <CosmeticIcon />,
    accent: "#f59e0b",
  },
  {
    key: "oralSurgery",
    gradient: "from-rose-500 to-pink-600",
    icon: <SurgeryIcon />,
    accent: "#f43f5e",
  },
  {
    key: "checkup",
    gradient: "from-emerald-500 to-teal-600",
    icon: <CheckupIcon />,
    accent: "#10b981",
  },
] as const;

export default function ServicesPreview() {
  const t = useTranslations("services");

  return (
    <section className="section-padding bg-white" aria-labelledby="services-preview-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-widest mb-4 border border-brand-100">
            {t("pill")}
          </span>
          <h2 id="services-preview-title" className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 mb-3 tracking-tight leading-tight">
            {t("title")}
          </h2>
          <p className="text-neutral-500 max-w-lg mx-auto text-base leading-relaxed">{t("subtitle")}</p>
        </div>

        {/* Service grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ key, gradient, icon, accent }, idx) => (
            <div
              key={key}
              className="group relative bg-white rounded-2xl border border-neutral-100 overflow-hidden card-hover"
              style={{ boxShadow: "0 1px 12px rgba(0,0,0,0.05)" }}
            >
              {/* Gradient icon header */}
              <div className={`bg-gradient-to-br ${gradient} px-6 py-5 flex items-center justify-between`}>
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {icon}
                </div>
                <span className="text-4xl font-black text-white/10 select-none leading-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-neutral-900 text-base mb-1.5 group-hover:text-brand-700 transition-colors">
                  {t(`${key}.name`)}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                  {t(`${key}.desc`)}
                </p>
                <Link
                  href="/appointment"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all group-hover:gap-2.5"
                  style={{ color: accent }}
                >
                  {t("bookNow")}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>

              {/* Bottom accent bar on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #0d9488, #0369a1)", color: "white", boxShadow: "0 4px 16px rgba(14,148,136,0.3)" }}
          >
            {t("viewAll")}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ImplantIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="8" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="16" x2="12" y2="22" />
      <line x1="10" y1="19" x2="14" y2="19" />
      <line x1="10" y1="21" x2="14" y2="21" />
    </svg>
  );
}

function ToothIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C9 2 7 4 6.5 6.5 6 5.5 5 5 4 5.5 2.5 6.5 3 9 4 10c1 1.5 1 3 .7 5L4 19c-.3 2 .8 3.5 2 3s1.7-2 2-4l1-3c.3-1 1.7-1 2 0l1 3c.3 2 .7 3.5 2 4s2.3-1 2-3l-.7-4c-.3-2-.3-3.5.7-5 1-1 1.5-3.5 0-4.5-1-.5-2 0-2.5 1C17 4 15 2 12 2z" />
    </svg>
  );
}

function RootCanalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C9 2 7 4 6.5 6.5 6 5.5 5 5 4 5.5 2.5 6.5 3 9 4 10c1 1.5 1 3 .7 5L4 19c-.3 2 .8 3.5 2 3s1.7-2 2-4l1-3c.3-1 1.7-1 2 0l1 3c.3 2 .7 3.5 2 4s2.3-1 2-3l-.7-4c-.3-2-.3-3.5.7-5 1-1 1.5-3.5 0-4.5-1-.5-2 0-2.5 1C17 4 15 2 12 2z" />
      <line x1="12" y1="8" x2="12" y2="16" strokeDasharray="2 2" />
    </svg>
  );
}

function CosmeticIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3L14.5 8.5L21 9.5L16.5 14L17.5 21L12 17.5L6.5 21L7.5 14L3 9.5L9.5 8.5Z" />
    </svg>
  );
}

function SurgeryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 2.5c0 1.5-2.5 5.5-2.5 5.5S9.5 4 9.5 2.5a2.5 2.5 0 0 1 5 0z" />
      <line x1="12" y1="8" x2="12" y2="22" />
      <path d="M9 13l3 3 3-3" />
      <path d="M6 18h12" />
    </svg>
  );
}

function CheckupIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}
