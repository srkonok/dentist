import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const SERVICES = [
  { key: "implants", icon: <ImplantIcon /> },
  { key: "wisdom", icon: <ToothIcon /> },
  { key: "rootCanal", icon: <RootCanalIcon /> },
  { key: "cosmetic", icon: <CosmeticIcon /> },
  { key: "oralSurgery", icon: <SurgeryIcon /> },
  { key: "checkup", icon: <CheckupIcon /> },
] as const;

export default function ServicesPreview() {
  const t = useTranslations("services");

  return (
    <section className="section-padding bg-white" aria-labelledby="services-preview-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-widest mb-3">
            Services
          </span>
          <h2 id="services-preview-title" className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
            {t("title")}
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ key, icon }) => (
            <div
              key={key}
              className="group p-6 rounded-2xl border border-neutral-100 bg-neutral-50 card-hover cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                {icon}
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                {t(`${key}.name`)}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {t(`${key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-brand-500 text-brand-600 font-semibold hover:bg-brand-500 hover:text-white transition-all"
          >
            View All Services
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ImplantIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="8" /><circle cx="12" cy="12" r="4" />
      <line x1="12" y1="16" x2="12" y2="22" />
      <line x1="10" y1="19" x2="14" y2="19" />
      <line x1="10" y1="21" x2="14" y2="21" />
    </svg>
  );
}

function ToothIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C9 2 7 4 6.5 6.5 6 5.5 5 5 4 5.5 2.5 6.5 3 9 4 10c1 1.5 1 3 .7 5L4 19c-.3 2 .8 3.5 2 3s1.7-2 2-4l1-3c.3-1 1.7-1 2 0l1 3c.3 2 .7 3.5 2 4s2.3-1 2-3l-.7-4c-.3-2-.3-3.5.7-5 1-1 1.5-3.5 0-4.5-1-.5-2 0-2.5 1C17 4 15 2 12 2z" />
    </svg>
  );
}

function RootCanalIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C9 2 7 4 6.5 6.5 6 5.5 5 5 4 5.5 2.5 6.5 3 9 4 10c1 1.5 1 3 .7 5L4 19c-.3 2 .8 3.5 2 3s1.7-2 2-4l1-3c.3-1 1.7-1 2 0l1 3c.3 2 .7 3.5 2 4s2.3-1 2-3l-.7-4c-.3-2-.3-3.5.7-5 1-1 1.5-3.5 0-4.5-1-.5-2 0-2.5 1C17 4 15 2 12 2z" />
      <line x1="12" y1="8" x2="12" y2="16" strokeDasharray="2 2" />
    </svg>
  );
}

function CosmeticIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function SurgeryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 2.5c0 1.5-2.5 5.5-2.5 5.5S9.5 4 9.5 2.5a2.5 2.5 0 0 1 5 0z" />
      <line x1="12" y1="8" x2="12" y2="22" />
      <path d="M9 13l3 3 3-3" />
      <path d="M6 18h12" />
    </svg>
  );
}

function CheckupIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}
