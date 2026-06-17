import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE_URL } from "@/lib/constants";
import PageHeroBanner from "@/components/ui/PageHeroBanner";
import {
  ImplantIcon,
  WisdomToothIcon,
  RootCanalIcon,
  CosmeticIcon,
  OralSurgeryIcon,
  CheckupIcon,
} from "@/components/ui/ServiceIcons";

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
  { key: "implants",    Icon: ImplantIcon     },
  { key: "wisdom",      Icon: WisdomToothIcon  },
  { key: "rootCanal",   Icon: RootCanalIcon    },
  { key: "cosmetic",    Icon: CosmeticIcon     },
  { key: "oralSurgery", Icon: OralSurgeryIcon  },
  { key: "checkup",     Icon: CheckupIcon      },
] as const;

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <div className="pt-16">
      <PageHeroBanner title={t("title")} subtitle={t("subtitle")} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ key, Icon }) => (
            <article
              key={key}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 card-hover flex flex-col"
            >
              {/* Icon panel */}
              <div className="flex items-center justify-center h-44 bg-neutral-50 border-b border-neutral-100">
                <div className="w-20 h-20 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-11 h-11 text-brand-600" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-base font-bold text-neutral-900 mb-2">
                  {t(`${key}.name`)}
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed mb-5 flex-1">
                  {t(`${key}.desc`)}
                </p>
                <Link
                  href="/appointment"
                  className="text-brand-600 text-sm font-semibold hover:text-brand-700 flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  {t("bookNow")}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
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
            {t("ctaButton")}
          </Link>
        </div>
      </div>
    </div>
  );
}
