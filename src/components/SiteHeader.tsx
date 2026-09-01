"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { quoteMessage, whatsappUrl } from "@/lib/contact";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/paquetes", label: "Paquetes" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const wa = whatsappUrl(quoteMessage());

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[72px] md:px-6">
        <Link
          href="/"
          className="relative flex h-10 w-[140px] shrink-0 items-center md:h-12 md:w-[168px]"
        >
          <Image
            src="/logo-transrio.png"
            alt="Transrio Turismo"
            fill
            priority
            sizes="168px"
            className="object-contain object-left"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer text-sm font-medium text-ink/70 transition-colors duration-200 hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:brightness-110"
          >
            WhatsApp
          </a>
          <button
            type="button"
            className="cursor-pointer rounded-full p-2 text-brand md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-black/5 bg-white px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-lg px-3 py-3 text-sm font-medium text-ink/80 transition-colors duration-200 hover:bg-black/[0.03] hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded-lg px-3 py-3 text-sm font-semibold text-[#25D366]"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
