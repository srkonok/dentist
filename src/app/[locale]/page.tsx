import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { DOCTOR, CHAMBERS, SITE_URL } from "@/lib/constants";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDesc"),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: { en: `${SITE_URL}/en`, bn: `${SITE_URL}/bn` },
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDesc"),
      url: `${SITE_URL}/${locale}`,
    },
  };
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: DOCTOR.name,
    description:
      "Expert dental care by Dr. Atoshe Islam, BDS (DU), PGT Oral & Maxillofacial Surgery.",
    url: SITE_URL,
    telephone: DOCTOR.phone,
    sameAs: [DOCTOR.facebookUrl],
    medicalSpecialty: ["Dentistry", "Oral and Maxillofacial Surgery"],
    openingHours: "Mo-Su 10:00-15:00", // TODO: confirm exact days
    location: CHAMBERS.map((c) => ({
      "@type": "MedicalClinic",
      name: c.nameEn,
      address: {
        "@type": "PostalAddress",
        streetAddress: c.addressEn,
        addressLocality: "Dhaka",
        addressCountry: "BD",
      },
      geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ServicesPreview />
      <WhyUsSection />
      <TestimonialsSection />
    </>
  );
}
