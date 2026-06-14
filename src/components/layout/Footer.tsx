import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LogoSvg from "@/components/ui/LogoSvg";
import { DOCTOR, CHAMBERS } from "@/lib/constants";

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
            <div className="flex items-center gap-2 mb-4">
              <LogoSvg size={32} />
              <span className="font-bold text-white text-sm">{DOCTOR.name}</span>
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
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/appointment", label: "Book Appointment" },
                { href: "/blog", label: "Dental Tips" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-neutral-400 hover:text-brand-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chambers */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">{t("chambers")}</h3>
            <ul className="space-y-4 text-sm" role="list">
              {CHAMBERS.map((chamber) => (
                <li key={chamber.id}>
                  <p className="text-brand-400 font-medium mb-0.5">{chamber.nameEn}</p>
                  <p className="text-neutral-400 leading-snug">{chamber.addressEn}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">{t("follow")}</h3>
            <a
              href={DOCTOR.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-brand-400 transition-colors"
              aria-label="Follow on Facebook"
            >
              <FacebookIcon />
              {DOCTOR.facebookPage}
            </a>
            <div className="mt-6 space-y-2 text-sm">
              <p className="text-neutral-400">
                <span className="text-neutral-300 font-medium">Hours:</span>{" "}
                {DOCTOR.consultationHours}
              </p>
              <p className="text-neutral-400">
                <span className="text-neutral-300 font-medium">Phone:</span>{" "}
                <span className="text-yellow-400 text-xs">TODO: Add number</span>
              </p>
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

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
