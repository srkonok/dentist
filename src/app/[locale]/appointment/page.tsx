import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SITE_URL } from "@/lib/constants";
import PageHeroBanner from "@/components/ui/PageHeroBanner";
import AppointmentForm from "./AppointmentForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("appointmentTitle"),
    alternates: { canonical: `${SITE_URL}/${locale}/appointment` },
  };
}

export default function AppointmentPage() {
  const t = useTranslations("appointment");
  return (
    <div className="pt-16">
      <PageHeroBanner title={t("pageTitle")} subtitle={t("pageSubtitle")} />
      <AppointmentForm />
    </div>
  );
}
