"use client";

import { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HOURS } from "@/lib/contact";

/** Panorama de Balneário Camboriú: bahía, skyline y vegetación; foto sin texto superpuesto. */
const HERO_IMG_ALT =
  "Vista panorámica de Balneário Camboriú: bahía turquesa, isla, skyline costero y vegetación tropical al amanecer.";

interface AIMarketingHeroKeloProps {
  className?: string;
  badge?: ReactNode;
}

export default function AIMarketingHeroKelo({
  className,
  badge,
}: AIMarketingHeroKeloProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[min(100svh,920px)] flex-col overflow-hidden bg-black md:h-[70svh] md:min-h-[520px]",
        className,
      )}
      style={{ fontFamily: "var(--font-dm), sans-serif" }}
    >
      <Image
        src="/campaigns/camboriu-verano-2027-hero.webp"
        alt={HERO_IMG_ALT}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={85}
        className="object-cover object-[52%_42%] md:object-[center_40%]"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-12 pt-28 text-center sm:px-6 md:pb-10 md:pt-24">
        {badge ? <div className="mb-4 w-full">{badge}</div> : null}

        <p className="mb-4 inline-flex items-center justify-center rounded-full bg-brand-red-mid px-4 py-1.5 text-xs font-bold tracking-wide text-white shadow-lg [text-shadow:0_1px_2px_rgba(0,0,0,0.25)] md:text-sm">
          Verano 2027
        </p>

        <h1
          className="mb-4 max-w-[18ch] font-[family-name:var(--font-funnel)] text-[2.4rem] leading-[1.06] font-semibold tracking-[-0.02em] text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.45),0_4px_28px_rgba(0,0,0,0.35)] sm:max-w-4xl sm:text-5xl md:mb-5 md:text-6xl lg:text-[4.25rem]"
          style={{ wordBreak: "normal" }}
        >
          Camboriú te espera
        </h1>

        <p className="mb-5 max-w-lg text-balance text-center text-sm leading-relaxed text-white/95 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)] md:mb-6 md:max-w-xl md:text-base">
          7 noches, pasajes en bus cama Río Uruguay, hoteles de 3 y 4 estrellas,
          salidas todos los lunes del verano.
        </p>

        <div className="mb-6 flex max-w-md flex-wrap items-center justify-center gap-2 md:mb-8">
          <span className="rounded-full border border-white/20 bg-brand-red-mid/90 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm md:text-xs">
            Reservá con $200.000
          </span>
          <span className="rounded-full border border-white/20 bg-brand-red-mid/90 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm md:text-xs">
            6 cuotas sin interés
          </span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Link
            href="/paquetes"
            data-analytics="cta"
            data-analytics-location="hero"
            className="rounded-full bg-brand-red-mid px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] md:px-10 md:py-4 md:text-base"
          >
            Ver paquetes
          </Link>
          <span className="max-w-[280px] text-center text-xs leading-snug text-white/88 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)] md:text-sm">
            {HOURS}
          </span>
        </div>
      </section>
    </div>
  );
}
