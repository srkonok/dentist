import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DOCTOR } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Wave divider */}
      <div className="wave-top">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full" aria-hidden="true">
          <path d="M0 60 C360 0 1080 0 1440 60 L1440 60 L0 60 Z" fill="#171717" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <FooterLogoMark />
              <span className="font-bold text-white text-sm leading-tight">{t("doctorName")}</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-3">
              {t("tagline")}
            </p>
            <p className="text-xs text-brand-400 font-medium">{t("bmdc")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-sm" role="list">
              {[
                { href: "/", labelKey: "linkHome" },
                { href: "/about", labelKey: "linkAbout" },
                { href: "/services", labelKey: "linkServices" },
                { href: "/appointment", labelKey: "linkAppointment" },
                { href: "/blog", labelKey: "linkBlog" },
                { href: "/contact", labelKey: "linkContact" },
              ].map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-neutral-400 hover:text-brand-300 transition-colors duration-200"
                  >
                    {t(labelKey as "linkHome" | "linkAbout" | "linkServices" | "linkAppointment" | "linkBlog" | "linkContact")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chambers */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">{t("chambers")}</h3>
            <ul className="space-y-4 text-sm" role="list">
              <li>
                <p className="text-brand-400 font-medium mb-0.5">{t("chamber1Name")}</p>
                <p className="text-neutral-400 leading-snug">{t("chamber1Address")}</p>
              </li>
              <li>
                <p className="text-brand-400 font-medium mb-0.5">{t("chamber2Name")}</p>
                <p className="text-neutral-400 leading-snug">{t("chamber2Address")}</p>
              </li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">{t("follow")}</h3>
            <a
              href={DOCTOR.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-brand-300 transition-colors duration-200"
              aria-label="Follow on Facebook"
            >
              <FacebookIcon />
              {DOCTOR.facebookPage}
            </a>
            <div className="mt-6 space-y-2 text-sm">
              <p className="text-neutral-400">
                <span className="text-neutral-300 font-medium">{t("hoursLabel")}:</span>{" "}
                {DOCTOR.consultationHours}
              </p>
              {!DOCTOR.phone.startsWith("TODO") && (
                <p className="text-neutral-400">
                  <span className="text-neutral-300 font-medium">{t("phoneLabel")}:</span>{" "}
                  <a href={`tel:${DOCTOR.phone}`} className="hover:text-brand-300 transition-colors duration-200">
                    {DOCTOR.phone}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <p>{t("copyright", { year })}</p>
          <p>Built with ❤ for patient care</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLogoMark() {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
      style={{ background: "linear-gradient(135deg, #0b3d35 0%, #0d766e 60%, #0e7490 100%)", boxShadow: "0 2px 8px rgba(13,148,136,0.4)" }}
    >
      <svg width="22" height="22" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="fl-tooth" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0f7f5" />
          </linearGradient>
          <linearGradient id="fl-cross" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <path d="M72 88 C72 72 78 60 86 57 C90 55.5 93 57 95 60 C96.5 62.5 97.5 64 100 64 C102.5 64 103.5 62.5 105 60 C107 57 110 55.5 114 57 C122 60 128 72 128 88 C128 96 125 102 121 106 C118 109 115 114 114 120 L112 133 C111.5 136 109.5 138 107 137.5 C104.5 137 103.5 134.5 103 132 L101 122 C100.5 120 99.5 120 99 122 L97 132 C96.5 134.5 95.5 137 93 137.5 C90.5 138 88.5 136 88 133 L86 120 C85 114 82 109 79 106 C75 102 72 96 72 88 Z" fill="url(#fl-tooth)" />
        <path d="M88 82 Q94 88 100 86 Q106 88 112 82" stroke="rgba(13,148,136,0.3)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="119.5" y="58.5" width="5" height="15" rx="2.5" fill="url(#fl-cross)" />
        <rect x="114.5" y="63.5" width="15" height="5" rx="2.5" fill="url(#fl-cross)" />
      </svg>
    </div>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
