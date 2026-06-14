"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
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

  const isHome = pathname === "/";

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
        isHome && !scrolled
          ? "bg-transparent"
          : "bg-white/96 backdrop-blur-xl border-b border-neutral-100 shadow-sm"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo + Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="Dr. Atoshe Islam — Home"
        >
          <Image
              src="/images/hd-popular-logo.webp"
              alt="HD Popular Dental Care logo"
              width={44}
              height={44}
              className="rounded-full"
              priority
            />
          <div className="leading-tight">
            <p className={`text-sm font-bold transition-colors ${isHome && !scrolled ? "text-white group-hover:text-white/80" : "text-brand-700 group-hover:text-brand-600"}`}>
              {DOCTOR.name}
            </p>
            <p className={`text-[10px] hidden sm:block ${isHome && !scrolled ? "text-white/70" : "text-neutral-500"}`}>
              BDS · BMDC {DOCTOR.bmdcReg}
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-0.5" role="list">
          {navLinks.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  pathname === href
                    ? isHome && !scrolled ? "text-white bg-white/20" : "text-brand-700 bg-brand-50"
                    : isHome && !scrolled ? "text-white/85 hover:text-white hover:bg-white/12" : "text-neutral-600 hover:text-brand-700 hover:bg-brand-50/60"
                }`}
              >
                {t(key)}
                {pathname === href && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: isHome && !scrolled ? "rgba(255,255,255,0.7)" : "#0d9488" }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <button
            onClick={toggleLocale}
            className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
              isHome && !scrolled
                ? "border-white/40 text-white hover:bg-white/15"
                : "border-brand-200 text-brand-700 hover:bg-brand-50"
            }`}
            aria-label="Switch language"
          >
            <GlobeIcon />
            {t("switchLang")}
          </button>

          {/* CTA */}
          <Link
            href="/appointment"
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-white text-sm font-bold transition-all duration-150 hover:-translate-y-0.5"
            style={
              isHome && !scrolled
                ? { background: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.28)" }
                : { background: "linear-gradient(135deg, #0d9488, #0369a1)", boxShadow: "0 2px 12px rgba(14,148,136,0.35)" }
            }
          >
            {t("appointment")}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className={`lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors ${isHome && !scrolled ? "text-white hover:bg-white/15" : "text-neutral-700 hover:bg-neutral-100"}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${menuOpen ? "block" : "hidden"}`}
        style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)" }}
      >
        <div className="border-t border-neutral-100 px-4 py-4 space-y-1">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-brand-700 bg-brand-50 font-semibold"
                  : "text-neutral-700 hover:text-brand-700 hover:bg-neutral-50"
              }`}
            >
              {t(key)}
              {pathname === href && <span className="w-2 h-2 rounded-full bg-brand-500" />}
            </Link>
          ))}
          <div className="pt-2 pb-1 flex gap-2.5">
            <button
              onClick={() => { toggleLocale(); setMenuOpen(false); }}
              className="flex-1 py-3 rounded-xl border border-brand-200 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
            >
              {t("switchLang")}
            </button>
            <Link
              href="/appointment"
              onClick={() => setMenuOpen(false)}
              className="flex-1 py-3 rounded-xl text-white text-sm font-bold text-center"
              style={{ background: "linear-gradient(135deg, #0d9488, #0369a1)", boxShadow: "0 2px 12px rgba(14,148,136,0.3)" }}
            >
              {t("appointment")}
            </Link>
          </div>
        </div>
      </div>
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
