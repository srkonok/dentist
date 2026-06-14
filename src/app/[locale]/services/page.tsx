import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE_URL } from "@/lib/constants";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("servicesTitle"),
    alternates: { canonical: `${SITE_URL}/${locale}/services` },
  };
}

const SERVICES = [
  {
    key: "implants",
    icon: <ImplantSvg />,
    color: "brand",
    gradient: "from-brand-500 to-brand-700",
  },
  {
    key: "wisdom",
    icon: <WisdomSvg />,
    color: "sky",
    gradient: "from-sky-500 to-sky-700",
  },
  {
    key: "rootCanal",
    icon: <RootSvg />,
    color: "violet",
    gradient: "from-violet-500 to-violet-700",
  },
  {
    key: "cosmetic",
    icon: <CosmeticSvg />,
    color: "amber",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    key: "oralSurgery",
    icon: <SurgerySvg />,
    color: "rose",
    gradient: "from-rose-500 to-rose-700",
  },
  {
    key: "checkup",
    icon: <CheckupSvg />,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
  },
] as const;

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <div className="pt-16">
      {/* Banner */}
      <div className="bg-gradient-to-br from-brand-800 to-brand-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            {t("title")}
          </h1>
          <p className="text-brand-200 text-lg">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map(({ key, icon, gradient }) => (
            <article
              key={key}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-neutral-100 card-hover"
            >
              {/* Icon header */}
              <div className={`bg-gradient-to-br ${gradient} p-8 flex items-center justify-center`}>
                <div className="w-20 h-20 flex items-center justify-center">
                  {icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-lg font-bold text-neutral-900 mb-2">
                  {t(`${key}.name`)}
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                  {t(`${key}.desc`)}
                </p>
                <Link
                  href="/appointment"
                  className="text-brand-600 text-sm font-semibold hover:text-brand-700 flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  {t("bookNow")}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-10 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t("ctaTitle")}</h2>
          <p className="text-brand-100 mb-6">{t("ctaSubtitle")}</p>
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-brand-700 font-bold hover:bg-brand-50 transition-colors shadow-lg"
          >
            {t("ctaBtn")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ImplantSvg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="28" y="8" width="8" height="20" rx="4" fill="white" opacity="0.9" />
      <circle cx="32" cy="34" r="8" fill="white" opacity="0.9" />
      <rect x="28" y="42" width="8" height="14" rx="4" fill="white" opacity="0.8" />
      <rect x="24" y="50" width="16" height="3" rx="1.5" fill="white" opacity="0.7" />
      <rect x="24" y="55" width="16" height="3" rx="1.5" fill="white" opacity="0.5" />
    </svg>
  );
}

function WisdomSvg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M32 8C25 8 19 12 17 18 15 23 16 28 18 33 20 38 19 43 18 50 17 56 21 60 25 58 29 56 29 50 30 45C31 41 33 40 32 40C31 40 33 41 34 45 35 50 35 56 39 58 43 60 47 56 46 50 45 43 44 38 46 33 48 28 49 23 47 18 45 12 39 8 32 8Z" fill="white" opacity="0.9" />
    </svg>
  );
}

function RootSvg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M32 8C25 8 19 12 17 18 15 23 16 28 18 33 20 38 19 43 18 50 17 56 21 60 25 58 29 56 29 50 30 45C31 41 33 40 32 40C31 40 33 41 34 45 35 50 35 56 39 58 43 60 47 56 46 50 45 43 44 38 46 33 48 28 49 23 47 18 45 12 39 8 32 8Z" fill="white" opacity="0.7" />
      <line x1="32" y1="14" x2="32" y2="40" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeDasharray="4 3" strokeLinecap="round" />
    </svg>
  );
}

function CosmeticSvg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="16" fill="white" opacity="0.9" />
      <circle cx="32" cy="32" r="8" fill="rgba(255,255,255,0.3)" />
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <line key={i} x1={32 + 22*Math.cos(deg*Math.PI/180)} y1={32 + 22*Math.sin(deg*Math.PI/180)} x2={32 + 18*Math.cos(deg*Math.PI/180)} y2={32 + 18*Math.sin(deg*Math.PI/180)} stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      ))}
    </svg>
  );
}

function SurgerySvg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M32 8 C28 8 24 12 24 17 C24 20 26 24 28 26 L28 48 C28 51 30 53 32 53 C34 53 36 51 36 48 L36 26 C38 24 40 20 40 17 C40 12 36 8 32 8Z" fill="white" opacity="0.9" />
      <line x1="28" y1="34" x2="36" y2="34" stroke="rgba(220,38,38,0.6)" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="40" x2="36" y2="40" stroke="rgba(220,38,38,0.6)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckupSvg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="12" y="10" width="40" height="44" rx="6" fill="white" opacity="0.9" />
      <rect x="20" y="20" width="24" height="3" rx="1.5" fill="#10b981" opacity="0.7" />
      <rect x="20" y="28" width="18" height="3" rx="1.5" fill="#10b981" opacity="0.5" />
      <polyline points="20,40 26,46 44,30" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
