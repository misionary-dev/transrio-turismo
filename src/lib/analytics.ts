/** Measurement ID GA4 (Google Analytics). Override con NEXT_PUBLIC_GA_MEASUREMENT_ID. */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-7PSZ21CFV9";

/** Eventos de conversión / negocio (marcar como key events en GA4 Admin). */
export const GA_EVENTS = {
  whatsapp: "generate_lead",
  phone: "click_phone",
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
