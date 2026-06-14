"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import LogoSvg from "@/components/ui/LogoSvg";
import { DOCTOR } from "@/lib/constants";

const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "appointment", href: "/appointment" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleLocale() {
    const next = locale === "en" ? "bn" : "en";
    router.replace(pathname, { locale: next });
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo + Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="Dr. Atoshe Islam — Home"
        >
          <LogoSvg size={36} />
          <div className="leading-tight">
            <p className="text-sm font-bold text-brand-700 group-hover:text-brand-600 transition-colors">
              {DOCTOR.name}
            </p>
            <p className="text-[10px] text-neutral-500 hidden sm:block">
              BDS · BMDC {DOCTOR.bmdcReg}
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navLinks.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? "text-brand-600 bg-brand-50"
                    : "text-neutral-700 hover:text-brand-600 hover:bg-brand-50"
                }`}
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <button
            onClick={toggleLocale}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full border border-brand-200 text-xs font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
            aria-label="Switch language"
          >
            <GlobeIcon />
            {t("switchLang")}
          </button>

          {/* CTA */}
          <Link
            href="/appointment"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors shadow-sm"
          >
            {t("appointment")}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === href
                    ? "text-brand-600 bg-brand-50"
                    : "text-neutral-700 hover:text-brand-600 hover:bg-brand-50"
                }`}
              >
                {t(key)}
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => { toggleLocale(); setMenuOpen(false); }}
                className="flex-1 py-2.5 rounded-xl border border-brand-200 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
              >
                {t("switchLang")}
              </button>
              <Link
                href="/appointment"
                onClick={() => setMenuOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold text-center hover:bg-brand-700 transition-colors"
              >
                {t("appointment")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
