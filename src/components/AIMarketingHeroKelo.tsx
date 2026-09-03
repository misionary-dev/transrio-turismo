"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Palmtree, Waves, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { packages, type Package } from "@/data/packages";
import { HOURS, PHONES, quoteMessage, whatsappUrl } from "@/lib/contact";

interface AIMarketingHeroKeloProps {
  className?: string;
}

const DURATION_LABEL = "10 días / 7 noches · Enero–Febrero 2026";

const DEST_ICONS = {
  camboriu: Palmtree,
  torres: Landmark,
  "capao-canoa": Waves,
} as const;

function shortName(pkg: Package) {
  if (pkg.slug === "camboriu") return "Camboriú";
  if (pkg.slug === "torres") return "Torres";
  return "Capão";
}

export default function AIMarketingHeroKelo({
  className,
}: AIMarketingHeroKeloProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(packages[0].slug);
  const selected = packages.find((p) => p.slug === selectedSlug) ?? packages[0];
  const wa = whatsappUrl(
    quoteMessage({
      destination: selected.destination,
      duration: DURATION_LABEL,
    }),
  );

  return (
    <div
      className={cn(
        "relative flex min-h-[100svh] flex-col overflow-hidden bg-black",
        className,
      )}
      style={{ fontFamily: "var(--font-dm), sans-serif" }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover object-[42%_center]"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.04) 32%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.04) 72%, rgba(0,0,0,0.38) 100%)",
        }}
      />

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
        className="relative z-50 px-4 pt-6 pb-2 md:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 p-2 px-4 backdrop-blur-xl">
            <a
              href="/"
              className="flex items-center rounded-full bg-white px-3.5 py-1.5"
            >
              <Image
                src="/logo-transrio.png"
                alt="Transrio Turismo"
                width={160}
                height={28}
                priority
                className="h-[22px] w-auto"
              />
            </a>

            <div className="hidden items-center gap-2 md:flex">
              <a
                href={`tel:${PHONES.fijoTel}`}
                className="whitespace-nowrap px-2 py-1.5 text-[13px] font-medium text-white/70 transition-colors hover:text-white"
              >
                {PHONES.fijo}
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-black transition-all hover:scale-105 hover:bg-white/90 active:scale-95"
              >
                WhatsApp
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
            >
              <span
                className={
                  "block h-[2px] w-5 bg-white transition-all duration-300 " +
                  (menuOpen ? "translate-y-[7px] rotate-45" : "")
                }
              />
              <span
                className={
                  "block h-[2px] w-5 bg-white transition-all duration-300 " +
                  (menuOpen ? "opacity-0" : "")
                }
              />
              <span
                className={
                  "block h-[2px] w-5 bg-white transition-all duration-300 " +
                  (menuOpen ? "-translate-y-[7px] -rotate-45" : "")
                }
              />
            </button>
          </div>

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" as const }}
                className="mt-2 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl md:hidden"
              >
                <p className="px-3 text-[13px] text-white/50">{HOURS}</p>
                <a
                  href={`tel:${PHONES.fijoTel}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-[15px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {PHONES.fijo}
                </a>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-white px-5 py-2.5 text-center text-[15px] font-semibold text-black transition-all hover:bg-white/90"
                >
                  WhatsApp
                </a>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.nav>

      <section className="relative z-10 flex flex-1 flex-col px-6">
        <div className="flex flex-col items-center pt-8 text-center md:pt-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
            className="mb-3 max-w-4xl text-center text-[2.15rem] leading-[1.08] font-semibold tracking-[-0.02em] text-white md:mb-4 md:text-6xl lg:text-[62px]"
          >
            Brasil te espera.
            <br />
            Nosotros te <span className="italic">llevamos</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
            className="mb-6 max-w-[480px] text-center text-sm leading-relaxed text-white/85 md:mb-8 md:text-lg"
          >
            Paquetes a Torres, Capão da Canoa y Camboriú desde Posadas. Salidas
            2026 con bus cama + hotel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1] as const,
            }}
            className="flex flex-col items-center gap-3"
          >
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-7 py-3 text-[15px] font-semibold text-white backdrop-blur-lg transition-all hover:scale-105 hover:bg-white/20 active:scale-95 md:px-8 md:py-4 md:text-base"
            >
              Cotizar {shortName(selected)}
            </a>
            <span className="text-sm text-white/60">{HOURS}</span>
          </motion.div>
        </div>

        <div className="flex-1" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            ease: [0.25, 0.1, 0.25, 1] as const,
          }}
          className="mx-auto mb-6 w-full max-w-lg md:mb-8"
        >
          <div
            role="tablist"
            aria-label="Destinos"
            className="flex items-center justify-center gap-1 rounded-full border border-white/15 bg-black/25 p-1.5 backdrop-blur-xl"
          >
            {packages.map((pkg) => {
              const Icon =
                DEST_ICONS[pkg.slug as keyof typeof DEST_ICONS] ?? Landmark;
              const active = pkg.slug === selected.slug;
              return (
                <button
                  key={pkg.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedSlug(pkg.slug)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium whitespace-nowrap transition-all md:px-4 md:text-sm",
                    active
                      ? "bg-white text-black"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <Icon size={14} className="hidden sm:block" />
                  {shortName(pkg)}
                </button>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
