"use client";

type GaParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Empuja a dataLayer con el mismo contrato que gtag()
 * (`dataLayer.push(arguments)`), así los eventos se encolan
 * aunque <GoogleAnalytics /> aún no haya hidratado.
 */
function gtagCommand() {
  window.dataLayer = window.dataLayer || [];
  // gtag.js inspecciona Arguments, no un Array literal
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

/** Envía un evento a GA4. */
export function trackEvent(name: string, params: GaParams = {}) {
  if (typeof window === "undefined") return;
  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    cleaned[key] = value;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name, cleaned);
    return;
  }
  gtagCommand("event", name, cleaned);
}
