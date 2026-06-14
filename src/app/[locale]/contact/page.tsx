import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { DOCTOR, CHAMBERS, SITE_URL } from "@/lib/constants";
import ContactForm from "./ContactForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("contactTitle"),
    alternates: { canonical: `${SITE_URL}/${locale}/contact` },
  };
}

export default function ContactPage() {
  const t = useTranslations("contact");

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
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact info */}
          <div className="space-y-8">
            {/* Chambers */}
            {CHAMBERS.map((chamber, i) => {
              const nameKey = i === 0 ? "chamber1" : "chamber2";
              const addrKey = i === 0 ? "chamber1Address" : "chamber2Address";
              return (
                <div key={chamber.id} className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
                  {/* Map — real embed if available, otherwise placeholder */}
                  {"mapEmbedUrl" in chamber && chamber.mapEmbedUrl ? (
                    <div className="h-52 relative">
                      <iframe
                        src={chamber.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map for ${chamber.nameEn}`}
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                  ) : (
                    /* HD Popular chamber — show clinic logo + address banner */
                    <div className="h-48 bg-gradient-to-br from-blue-900 to-indigo-900 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" aria-hidden="true"><defs><pattern id="cdots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#cdots)"/></svg>
                      </div>
                      <Image
                        src="/images/hd-popular-logo.webp"
                        alt="HD Popular Dental Care"
                        width={100}
                        height={100}
                        className="relative z-10 drop-shadow-xl"
                      />
                      <p className="relative z-10 text-white font-bold text-sm tracking-wide drop-shadow">HD Popular Dental Care</p>
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                        <LocationIcon />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-neutral-900">{t(nameKey as "chamber1" | "chamber2")}</p>
                        <p className="text-neutral-500 text-sm mt-0.5">{t(addrKey as "chamber1Address" | "chamber2Address")}</p>
                        {"mapsUrl" in chamber && chamber.mapsUrl && (
                          <a
                            href={chamber.mapsUrl as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-medium mt-2"
                          >
                            <ExternalLinkIcon />
                            Open in Google Maps
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Contact details */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 space-y-4">
              <ContactRow icon={<ClockIcon />} label={t("hours")} value={t("hoursValue")} />
              {!DOCTOR.phone.startsWith("TODO") && (
                <ContactRow
                  icon={<PhoneIcon />}
                  label={t("phone")}
                  value={
                    <a href={`tel:${DOCTOR.phone}`} className="hover:underline text-sm">
                      {DOCTOR.phone}
                    </a>
                  }
                />
              )}
              {!DOCTOR.email.startsWith("TODO") && (
                <ContactRow
                  icon={<MailIcon />}
                  label={t("email")}
                  value={
                    <a href={`mailto:${DOCTOR.email}`} className="hover:underline text-sm">
                      {DOCTOR.email}
                    </a>
                  }
                />
              )}
              <ContactRow
                icon={<FacebookIcon />}
                label={t("facebook")}
                value={
                  <a
                    href={DOCTOR.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 hover:underline text-sm"
                  >
                    {t("facebookPage")}
                  </a>
                }
              />
            </div>
          </div>

          {/* Contact form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon, label, value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-neutral-400 font-medium mb-0.5">{label}</p>
        <div className="text-neutral-800 text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
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

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
