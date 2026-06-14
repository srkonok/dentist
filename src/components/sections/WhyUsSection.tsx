import { useTranslations } from "next-intl";

const cards = [
  {
    key: "qualified",
    icon: <GraduationCapIcon />,
    gradient: "from-teal-500 to-cyan-600",
    num: "01",
  },
  {
    key: "bmdc",
    icon: <ShieldCheckIcon />,
    gradient: "from-emerald-500 to-green-600",
    num: "02",
  },
  {
    key: "sterilization",
    icon: <SparklesIcon />,
    gradient: "from-sky-500 to-blue-600",
    num: "03",
  },
  {
    key: "comfort",
    icon: <HeartIcon />,
    gradient: "from-rose-500 to-pink-600",
    num: "04",
  },
] as const;

export default function WhyUsSection() {
  const t = useTranslations("whyUs");

  return (
    <section
      className="section-padding relative overflow-hidden"
      aria-labelledby="why-us-title"
      style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #f8fafc 50%, #f0f9ff 100%)" }}
    >
      {/* Decorative background shape */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #ccfbf1 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #bae6fd 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — centered */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest mb-4 border border-brand-200">
            {t("pill")}
          </span>
          <h2 id="why-us-title" className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-neutral-900 mb-3 tracking-tight leading-tight">
            {t("title")}
          </h2>
          <p className="text-neutral-500 text-base max-w-lg mx-auto leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-[5fr_7fr] gap-10 xl:gap-14 items-start">

          {/* Left: trust metrics */}
          <div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {([
                { val: "BMDC", labelKey: "statBmdc", color: "#0d9488" },
                { val: "BDS", labelKey: "statBds", color: "#0ea5e9" },
                { val: "2", labelKey: "statClinics", color: "#8b5cf6" },
                { val: "100%", labelKey: "statSterilized", color: "#10b981" },
              ] as const).map(({ val, labelKey, color }) => (
                <div
                  key={labelKey}
                  className="rounded-2xl p-4 bg-white border border-neutral-100"
                  style={{ boxShadow: "0 1px 10px rgba(0,0,0,0.05)" }}
                >
                  <p className="text-2xl font-black mb-0.5" style={{ color }}>{val}</p>
                  <p className="text-xs text-neutral-400 font-medium">{t(labelKey)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: feature cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map(({ key, icon, gradient, num }) => (
              <div
                key={key}
                className="group relative bg-white rounded-2xl p-5 border border-neutral-100 card-hover overflow-hidden"
                style={{ boxShadow: "0 1px 12px rgba(0,0,0,0.05)" }}
              >
                {/* Large background number */}
                <span className="absolute top-3 right-4 text-6xl font-black text-neutral-50 select-none leading-none pointer-events-none">
                  {num}
                </span>

                {/* Icon */}
                <div className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3.5 shadow-md group-hover:scale-110 transition-transform duration-200`}>
                  {icon}
                </div>

                <h3 className="relative z-10 text-neutral-900 font-bold text-sm mb-1.5">
                  {t(`${key}.title` as `${typeof key}.title`)}
                </h3>
                <p className="relative z-10 text-neutral-500 text-sm leading-relaxed">
                  {t(`${key}.desc` as `${typeof key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GraduationCapIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
      <path d="M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75z" />
      <path d="M5 15l.75 2.25L8 18l-2.25.75L5 21l-.75-2.25L2 18l2.25-.75z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
