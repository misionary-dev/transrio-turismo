"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { HOURS } from "@/lib/contact";

interface AIMarketingHeroKeloProps {
  className?: string;
}

export default function AIMarketingHeroKelo({
  className,
}: AIMarketingHeroKeloProps) {
  return (
    <div
      className={cn(
        "relative flex h-[70svh] min-h-[480px] flex-col overflow-hidden bg-black",
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

      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
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
          <Link
            href="/paquetes"
            className="rounded-full bg-brand-red-mid px-7 py-3 text-[15px] font-semibold text-white transition-all hover:scale-105 hover:brightness-110 active:scale-95 md:px-8 md:py-4 md:text-base"
          >
            Conocé nuestros paquetes
          </Link>
          <span className="text-sm text-white/60">{HOURS}</span>
        </motion.div>
      </section>
    </div>
  );
}
