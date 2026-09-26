"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ImageOff } from "lucide-react";

gsap.registerPlugin(useGSAP);

export function PackageHero({
  title,
  duration,
  season,
  image,
  wa,
}: {
  title: string;
  duration: string;
  season: string | null;
  image: string | undefined;
  wa: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-pkg-kicker]", { opacity: 0, y: 16, duration: 0.6 })
          .from("[data-pkg-title]", { opacity: 0, y: 28, duration: 0.8 }, "-=0.35")
          .from("[data-pkg-meta]", { opacity: 0, y: 16, duration: 0.55 }, "-=0.4")
          .from("[data-pkg-cta]", { opacity: 0, y: 12, duration: 0.5 }, "-=0.3");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[70svh] flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-brand-black-light">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-white/50">
            <ImageOff className="h-8 w-8" />
            <span className="text-sm font-medium">Foto próximamente</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/80" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10 pt-28 md:pb-14 md:pt-32">
        <Link
          href="/paquetes"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Todos los paquetes
        </Link>

        {season ? (
          <p
            data-pkg-kicker
            className="font-[family-name:var(--font-funnel)] text-sm tracking-[0.28em] text-sand uppercase"
          >
            {season}
          </p>
        ) : null}

        <h1
          data-pkg-title
          className="mt-3 max-w-4xl font-[family-name:var(--font-funnel)] text-4xl leading-[1.05] font-semibold tracking-tight text-white md:text-6xl"
        >
          {title}
        </h1>

        {duration ? (
          <p data-pkg-meta className="mt-3 text-base text-white/80 md:text-lg">
            {duration} · salida desde Posadas
          </p>
        ) : null}

        <a
          data-pkg-cta
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex cursor-pointer rounded-full bg-brand-red-mid px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Reservar por WhatsApp
        </a>
      </div>
    </section>
  );
}
