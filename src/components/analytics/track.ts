"use client";

import { sendGTMEvent } from "@next/third-parties/google";

type GaParams = Record<string, string | number | boolean | undefined>;

/**
 * Empuja un Custom Event al dataLayer (formato GTM).
 * En el contenedor: trigger tipo “Custom Event” con el mismo `event` name,
 * y un tag GA4 Event que lo reenvíe a la propiedad G-7PSZ21CFV9.
 */
export function trackEvent(name: string, params: GaParams = {}) {
  if (typeof window === "undefined") return;
  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    cleaned[key] = value;
  }
  sendGTMEvent({ event: name, ...cleaned });
}
