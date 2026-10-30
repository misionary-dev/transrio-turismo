"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HOURS } from "@/lib/contact";

interface AIMarketingHeroKeloProps {
  className?: string;
  badge?: ReactNode;
}

export default function AIMarketingHeroKelo({
  className,
  badge,
}: AIMarketingHeroKeloProps) {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    let timeoutId = 0;
    const arm = () => {
      timeoutId = window.setTimeout(() => setPlayVideo(true), 8000);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.removeEventListener("load", arm);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-[70svh] min-h-[480px] flex-col overflow-hidden bg-black",
        className,
      )}
      style={{ fontFamily: "var(--font-dm), sans-serif" }}
    >
      <Image
        src="/videos/hero-poster.webp"
        alt=""
        fill
        preload
        fetchPriority="high"
        sizes="100vw"
        quality={50}
        className="object-cover object-[42%_center]"
      />

      {playVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 z-[1] h-full w-full object-cover object-[42%_center]"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 55% 42% at 50% 52%, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 70%), " +
            "linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.04) 32%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.04) 72%, rgba(0,0,0,0.38) 100%)",
        }}
      />

      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        {badge ? <div className="mb-0">{badge}</div> : null}
        <h1 className="mb-3 max-w-4xl text-center text-[2.15rem] leading-[1.08] font-semibold tracking-[-0.02em] text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.35),0_4px_24px_rgba(0,0,0,0.45)] md:mb-4 md:text-6xl lg:text-[62px]">
          Brasil te espera.
          <br />
          Nosotros te <span className="italic">llevamos</span>
        </h1>

        <p className="mb-6 max-w-[480px] text-center text-sm leading-relaxed text-white/95 [text-shadow:0_1px_3px_rgba(0,0,0,0.5),0_2px_14px_rgba(0,0,0,0.4)] md:mb-8 md:text-lg">
          Paquetes a Torres, Capão da Canoa y Camboriú desde Posadas. Salidas
          2026 con bus cama + hotel.
        </p>

        <div className="flex flex-col items-center gap-3">
          <Link
            href="/paquetes"
            className="rounded-full bg-brand-red-mid px-7 py-3 text-[15px] font-semibold text-white transition-all hover:scale-105 hover:brightness-110 active:scale-95 md:px-8 md:py-4 md:text-base"
          >
            Conocé nuestros paquetes
          </Link>
          <span className="text-sm text-white/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
            {HOURS}
          </span>
        </div>
      </section>
    </div>
  );
}
