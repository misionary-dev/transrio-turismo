"use client";

import dynamic from "next/dynamic";
import { useEffect, useSyncExternalStore } from "react";
import { getMenuOpen, subscribeMenu } from "@/components/menu/menu-state";

const MobileMenuPanel = dynamic(
  () => import("@/components/menu/MobileMenuPanel").then((m) => m.MobileMenuPanel),
  { ssr: false },
);

export function MobileMenuSlot({
  links,
  wa,
}: {
  links: { label: string; href: string }[];
  wa: string;
}) {
  const menuOpen = useSyncExternalStore(subscribeMenu, getMenuOpen, () => false);

  useEffect(() => {
    const prefetch = () => {
      void import("@/components/menu/MobileMenuPanel");
    };
    const idle = window.requestIdleCallback?.(prefetch, { timeout: 1500 });
    const timer = window.setTimeout(prefetch, 1500);
    return () => {
      if (idle !== undefined) window.cancelIdleCallback?.(idle);
      window.clearTimeout(timer);
    };
  }, []);

  if (!menuOpen) return null;
  return <MobileMenuPanel links={links} wa={wa} />;
}
