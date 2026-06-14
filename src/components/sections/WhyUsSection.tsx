import { useTranslations } from "next-intl";

const cards = [
  {
    key: "qualified",
    icon: <GraduationCapIcon />,
    color: "bg-brand-50 text-brand-600",
  },
  {
    key: "bmdc",
    icon: <ShieldCheckIcon />,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    key: "sterilization",
    icon: <SparklesIcon />,
    color: "bg-sky-50 text-sky-600",
  },
  {
    key: "comfort",
    icon: <HeartIcon />,
    color: "bg-rose-50 text-rose-500",
  },
] as const;

export default function WhyUsSection() {
  const t = useTranslations("whyUs");

  return (
    <section className="section-padding bg-neutral-50" aria-labelledby="why-us-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-3">
            Why Choose Us
          </span>
          <h2 id="why-us-title" className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
            {t("title")}
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ key, icon, color }) => (
            <div
              key={key}
              className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 card-hover"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                {icon}
              </div>
              <h3 className="text-neutral-900 font-semibold mb-2">
                {t(`${key}.title` as `${typeof key}.title`)}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {t(`${key}.desc` as `${typeof key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GraduationCapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
      <path d="M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75z" />
      <path d="M5 15l.75 2.25L8 18l-2.25.75L5 21l-.75-2.25L2 18l2.25-.75z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
