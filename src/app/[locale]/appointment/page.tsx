import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
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
  return (
    <div className="pt-16">
      {/* Banner */}
      <div className="bg-gradient-to-br from-brand-800 to-brand-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Book an Appointment
          </h1>
          <p className="text-brand-200 text-lg">Consultation hours: 10:00 AM – 3:00 PM</p>
        </div>
      </div>
      <AppointmentForm />
    </div>
  );
}
