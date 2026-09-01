import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.transrioturismo.tur.ar",
        pathname: "/travel/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
