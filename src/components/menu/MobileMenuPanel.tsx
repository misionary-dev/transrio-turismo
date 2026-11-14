"use client";

import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { closeMenu } from "@/components/menu/menu-state";

export function MobileMenuPanel({
  links,
  wa,
}: {
  links: { label: string; href: string }[];
  wa: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-t border-black/5 bg-brand-white px-4 py-3 md:hidden">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={closeMenu}
          className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-brand-black transition-colors hover:bg-black/5"
        >
          {link.label}
        </Link>
      ))}
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        onClick={closeMenu}
        className="mt-1 flex items-center justify-center gap-2 rounded-full bg-brand-red-mid px-5 py-2.5 text-[15px] font-semibold text-white transition hover:brightness-110"
      >
        <WhatsAppIcon />
        Charlemos
      </a>
    </div>
  );
}
