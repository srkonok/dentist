import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Atoshi Islam — Dental Surgeon, Dhaka",
  description:
    "Expert dental care by Dr. Atoshi Islam, BDS (DU), PGT Oral & Maxillofacial Surgery. Two clinics in Dhaka.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
