import { GoogleTagManager } from "@next/third-parties/google";
import { AnalyticsListener } from "@/components/analytics/AnalyticsListener";
import { GTM_ID } from "@/lib/analytics";

/**
 * GTM es la única carga de tags de Google en el sitio.
 * GA4 (G-7PSZ21CFV9) debe vivir como tag dentro del contenedor GTM,
 * no con un segundo <GoogleAnalytics /> (doble conteo).
 */
export function SiteAnalytics() {
  if (!GTM_ID) return null;
  return (
    <>
      {/* Fallback sin JS — snippet oficial GTM, justo al inicio del body */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          title="Google Tag Manager"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <GoogleTagManager gtmId={GTM_ID} />
      <AnalyticsListener />
    </>
  );
}
