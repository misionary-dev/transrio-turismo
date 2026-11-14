"use client";

import { useSyncExternalStore } from "react";
import { getMenuOpen, subscribeMenu, toggleMenu } from "@/components/menu/menu-state";

export function MobileMenuButton() {
  const menuOpen = useSyncExternalStore(subscribeMenu, getMenuOpen, () => false);

  return (
    <button
      type="button"
      onClick={toggleMenu}
      className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] justify-self-end md:hidden"
      aria-label="Abrir menú"
      aria-expanded={menuOpen}
    >
      <span
        className={
          "block h-[2px] w-5 bg-brand-black transition-all duration-300 " +
          (menuOpen ? "translate-y-[7px] rotate-45" : "")
        }
      />
      <span
        className={
          "block h-[2px] w-5 bg-brand-black transition-all duration-300 " +
          (menuOpen ? "opacity-0" : "")
        }
      />
      <span
        className={
          "block h-[2px] w-5 bg-brand-black transition-all duration-300 " +
          (menuOpen ? "-translate-y-[7px] -rotate-45" : "")
        }
      />
    </button>
  );
}
