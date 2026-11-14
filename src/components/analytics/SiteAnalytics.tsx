import { AnalyticsListener } from "@/components/analytics/AnalyticsListener";
import { DeferredGtm } from "@/components/analytics/DeferredGtm";
import { GTM_ID } from "@/lib/analytics";

/**
 * GTM es la única carga de tags de Google en el sitio.
 * GA4 (G-7PSZ21CFV9) vive como tag dentro del contenedor, no con gtag.js.
 * El script se difiere hasta un hueco del hilo para no competir con el INP.
 * Los eventos se encolan en dataLayer y el contenedor los procesa al llegar.
 */
export function SiteAnalytics() {
  if (!GTM_ID || !/^GTM-[A-Z0-9]+$/i.test(GTM_ID)) return null;
  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          title="Google Tag Manager"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <DeferredGtm id={GTM_ID} />
      <AnalyticsListener />
    </>
  );
}
