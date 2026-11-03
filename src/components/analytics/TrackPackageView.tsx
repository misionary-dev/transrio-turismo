"use client";

import { useEffect } from "react";
import { GA_EVENTS } from "@/lib/analytics";
import { trackEvent } from "@/components/analytics/track";

type Props = {
  slug: string;
  name: string;
  /** Precio display (ej. "USD 1.200"); no se parsea a number. */
  priceLabel?: string;
};

/** Dispara view_item (ecommerce recomendado) al abrir un paquete. */
export function TrackPackageView({ slug, name, priceLabel }: Props) {
  useEffect(() => {
    trackEvent(GA_EVENTS.viewItem, {
      currency: "USD",
      item_id: slug,
      item_name: name,
      item_category: "paquete",
      price_label: priceLabel,
      page_path: `/paquetes/${slug}`,
    });
  }, [slug, name, priceLabel]);

  return null;
}
