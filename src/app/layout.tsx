import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Atoshe Islam — Dental Surgeon, Dhaka",
  description:
    "Expert dental care by Dr. Atoshe Islam, BDS (DU), PGT Oral & Maxillofacial Surgery. Two clinics in Dhaka.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
