"use client";

import { useEffect } from "react";
import { trackItem } from "@/components/analytics/track";

type Props = {
  slug: string;
  name: string;
  price: number;
};

/** Dispara view_item (ecommerce GA4) al abrir un paquete. */
export function TrackPackageView({ slug, name, price }: Props) {
  useEffect(() => {
    trackItem("view_item", {
      item_id: slug,
      item_name: name,
      price,
      item_category: "paquete",
    });
  }, [slug, name, price]);

  return null;
}
