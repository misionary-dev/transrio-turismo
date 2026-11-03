"use client";

import { sendGTMEvent } from "@next/third-parties/google";

export type GaItem = {
  item_id: string;
  item_name: string;
  price: number;
  item_category: string;
};

type GaParam = string | number | boolean | GaItem[];

/**
 * Empuja un Custom Event al dataLayer (formato GTM).
 * En el contenedor: trigger tipo “Custom Event” con el mismo `event` name,
 * y un tag GA4 Event que lo reenvíe a la propiedad G-7PSZ21CFV9.
 */
export function trackEvent(
  name: string,
  params: Record<string, GaParam | undefined> = {},
) {
  if (typeof window === "undefined") return;
  const cleaned: Record<string, GaParam> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    if (typeof value === "number" && !Number.isFinite(value)) continue;
    cleaned[key] = value;
  }
  sendGTMEvent({ event: name, ...cleaned });
}

/** view_item / select_item según la spec de ecommerce de GA4. */
export function trackItem(name: "view_item" | "select_item", item: GaItem) {
  if (!Number.isFinite(item.price)) return;
  trackEvent(name, {
    currency: "USD",
    value: item.price,
    items: [item],
  });
}
