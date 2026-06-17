import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { DOCTOR, SITE_URL } from "@/lib/constants";
import PageHeroBanner from "@/components/ui/PageHeroBanner";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("aboutTitle"),
    alternates: { canonical: `${SITE_URL}/${locale}/about` },
  };
}

export default function AboutPage() {
  const t = useTranslations("about");
  const qualifications = [
    t("qual1"),
    t("qual2"),
    t("qual3"),
  ];

  return (
    <div className="pt-16">
      <PageHeroBanner title={t("title")} subtitle={t("subtitle")} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Doctor photo */}
          <div className="lg:sticky lg:top-24">
            <div className="relative max-w-xs sm:max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[600/760]">
              <Image
                src="/images/dr-atoshe.webp"
                alt={t("photoAlt")}
                fill
                className="object-cover object-[50%_20%] sm:object-top"
                priority
                sizes="(max-width: 640px) 320px, 384px"
              />
              {/* Gradient overlay at bottom for text legibility */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-900/95 via-brand-900/60 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-center">
                <p className="text-white font-bold text-sm" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>{t("doctorName")}</p>
                <p className="text-brand-200 text-xs" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}>BMDC Reg. {DOCTOR.bmdcReg}</p>
              </div>
            </div>

            {/* BMDC badge card */}
            <div className="mt-6 mx-auto max-w-sm bg-white rounded-2xl border border-brand-100 shadow-md p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center shrink-0">
                <ShieldIcon />
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">
                  {t("bmdcLabel")}
                </p>
                <p className="text-2xl font-bold text-brand-700">{t("bmdcNumber")}</p>
                <p className="text-xs text-neutral-400">Bangladesh Medical & Dental Council</p>
              </div>
            </div>

            {/* Official visiting card */}
            <div className="mt-5 mx-auto max-w-sm">
              <p className="text-xs text-neutral-400 font-medium uppercase tracking-widest text-center mb-2.5">
                {t("visitingCardLabel")}
              </p>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-100">
                <Image
                  src="/visiting-card.png"
                  alt={`${DOCTOR.name} — Official Practice Card`}
                  width={600}
                  height={300}
                  className="w-full h-auto"
                  sizes="(max-width: 640px) 100vw, 384px"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">{t("doctorName")}</h2>
            <p className="text-brand-600 font-medium mb-6">{t("doctorCredentials")}</p>
            <p className="text-neutral-600 leading-relaxed mb-8">{t("bio")}</p>

            {/* Qualifications */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <GradCapIcon />
                {t("qualifications")}
              </h3>
              <ul className="space-y-3">
                {qualifications.map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-neutral-700">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience */}
            <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100 mb-8">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">{t("experience")}</h3>
              <p className="text-neutral-600">{t("expDesc")}</p>
            </div>

            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow"
            >
              {t("bookCta")}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function GradCapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
