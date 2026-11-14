"use client";

import dynamic from "next/dynamic";
import type { PackageCardGalleryProps } from "@/components/packages/PackageCardGallery";

const PackageCardGallery = dynamic(
  () =>
    import("@/components/packages/PackageCardGallery").then(
      (m) => m.PackageCardGallery,
    ),
);

export function PackageCardGallerySlot(props: PackageCardGalleryProps) {
  return <PackageCardGallery {...props} />;
}
