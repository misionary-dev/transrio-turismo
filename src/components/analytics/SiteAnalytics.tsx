import { GoogleAnalytics } from "@next/third-parties/google";
import { AnalyticsListener } from "@/components/analytics/AnalyticsListener";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

/** GA4 + captura global de clics/formularios. */
export function SiteAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <AnalyticsListener />
    </>
  );
}
