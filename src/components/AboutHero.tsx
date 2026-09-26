"use client";

import { PhotoPageHero } from "@/components/PhotoPageHero";

export function AboutHero() {
  return (
    <PhotoPageHero
      src="/institucional/rio-uruguay-azul.jpg"
      alt="Ómnibus cama Río Uruguay, flota de Transrio Turismo"
    >
      <p
        data-hero-subtitle
        className="mb-3 text-sm font-semibold tracking-[0.2em] text-white uppercase"
      >
        Operador turístico regional
      </p>
      <h1
        data-hero-title
        className="font-[family-name:var(--font-funnel)] text-5xl font-semibold text-white md:text-6xl"
      >
        ¿Quiénes somos?
      </h1>
    </PhotoPageHero>
  );
}
