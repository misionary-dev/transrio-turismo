/** Contenedor GTM. Override con NEXT_PUBLIC_GTM_ID. */
export const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-NRVSSZST";

/**
 * Measurement ID GA4 — no se carga con gtag.js en el sitio.
 * Se configura como tag dentro del contenedor GTM (evita doble pageview).
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-7PSZ21CFV9";

/** Eventos de conversión / negocio (triggers Custom Event en GTM + key events en GA4). */
export const GA_EVENTS = {
  whatsapp: "generate_lead",
  phone: "click_phone",
  email: "click_email",
  social: "click_social",
  map: "click_map",
  cta: "cta_click",
  ui: "ui_click",
  outbound: "click_outbound",
  formStart: "form_start",
  formSubmit: "form_submit",
  viewItem: "view_item",
  selectItem: "select_item",
} as const;
