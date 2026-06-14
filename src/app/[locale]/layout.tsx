import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Dr. Atoshe Islam — Dental Surgeon",
    default: "Dr. Atoshe Islam — Dental Surgeon, Dhaka",
  },
  description:
    "Expert dental care by Dr. Atoshe Islam, BDS (DU), PGT Oral & Maxillofacial Surgery. Two clinics in Dhaka — Mirpur 14 & West Kafrul.",
  metadataBase: new URL("https://dratosheislam.com"), // TODO: update with real domain
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Dr. Atoshe Islam Dental Practice",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "bn")) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
