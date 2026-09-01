"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PackageSearch } from "@/components/PackageSearch";

gsap.registerPlugin(useGSAP);

export function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-brand]", { opacity: 0, y: 24, duration: 0.8 })
        .from("[data-hero-title]", { opacity: 0, y: 36, duration: 0.9 }, "-=0.45")
        .from("[data-hero-sub]", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5")
        .from("[data-hero-cta]", { opacity: 0, y: 16, duration: 0.6 }, "-=0.35")
        .from("[data-hero-search]", { opacity: 0, y: 28, duration: 0.8 }, "-=0.25");
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          poster="https://www.transrioturismo.tur.ar/travel/wp-content/uploads/2018/04/torresguarita-1920x550.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 pb-10 pt-36 md:pb-14 md:pt-40">
        <p
          data-hero-brand
          className="font-[family-name:var(--font-funnel)] text-sm tracking-[0.28em] text-sand uppercase md:text-base"
        >
          Transrio Turismo
        </p>

        <h1
          data-hero-title
          className="mt-4 max-w-3xl font-[family-name:var(--font-funnel)] text-4xl leading-[1.05] font-semibold tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Brasil te espera.
          <br />
          Nosotros te llevamos.
        </h1>

        <p
          data-hero-sub
          className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
        >
          Paquetes a Torres, Capão da Canoa y Camboriú desde Posadas. Salidas
          2026 con coordinación permanente.
        </p>

        <div data-hero-cta className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/paquetes"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand transition hover:bg-sand"
          >
            Ver paquetes
          </Link>
          <Link
            href="/cotizacion"
            className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            Solicitar cotización
          </Link>
        </div>

        <div data-hero-search className="mt-10 md:mt-14">
          <PackageSearch />
        </div>
      </div>
    </section>
  );
}
