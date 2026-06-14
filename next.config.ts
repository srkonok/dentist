import type { NextConfig } from "next/types";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.17"],
  images: {
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
