"use client";

import { PhotoPageHero } from "@/components/PhotoPageHero";

export function ContactHero() {
  return (
    <PhotoPageHero
      src="/institucional/rio-uruguay-rosa.jpg"
      alt="Unidad Río Uruguay de Transrio Turismo"
    >
      <h1
        data-hero-title
        className="font-[family-name:var(--font-funnel)] text-5xl font-semibold text-white md:text-6xl"
      >
        Contáctanos
      </h1>
      <p data-hero-subtitle className="mt-3 text-sm text-white/80">
        Dejanos tu consulta y te respondemos a la brevedad
      </p>
    </PhotoPageHero>
  );
}
