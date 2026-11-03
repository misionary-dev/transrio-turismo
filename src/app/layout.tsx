import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { activeCampaignKey } from "@/lib/campaigns";
import { TRAVEL_AGENCY_JSON_LD } from "@/lib/seo";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  GOOGLE_SITE_VERIFICATION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "./fonts.css";
import "./globals.css";

const dmSans = localFont({
  src: "../fonts/dm-sans-latin.woff2",
  variable: "--font-dm-loaded",
  display: "swap",
  weight: "100 1000",
  preload: false,
  adjustFontFallback: "Arial",
  fallback: ["DM Sans Fallback", "system-ui", "sans-serif"],
});

const funnel = localFont({
  src: "../fonts/funnel-display-latin.woff2",
  variable: "--font-funnel-loaded",
  display: "swap",
  weight: "600",
  preload: false,
  adjustFontFallback: "Arial",
  fallback: ["Funnel Display Fallback", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Transrio Turismo",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  // Meta en <head>: <meta name="google-site-verification" content="…" />
  // Debe permanecer publicada; si se quita, GSC pierde la verificación.
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${dmSans.variable} ${funnel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "setTimeout(function(){document.documentElement.classList.add('fonts-ready')},300)",
          }}
        />
        <SiteAnalytics />
        <JsonLd data={TRAVEL_AGENCY_JSON_LD} />
        <SiteHeader campaigns={activeCampaignKey()} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
