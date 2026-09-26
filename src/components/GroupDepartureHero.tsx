"use client";

import { PhotoPageHero } from "@/components/PhotoPageHero";

export function GroupDepartureHero() {
  return (
    <PhotoPageHero
      src="/institucional/rio-uruguay-embarque.jpg"
      alt="Embarque en ómnibus Río Uruguay"
    >
      <h1
        data-hero-title
        className="font-[family-name:var(--font-funnel)] text-5xl font-semibold text-white md:text-6xl"
      >
        Viaja en Grupo
      </h1>
      <p
        data-hero-subtitle
        className="mx-auto mt-3 max-w-2xl text-sm text-white/80"
      >
        Crea recuerdos inolvidables con amigos, familia o tu equipo. Nosotros
        nos encargamos de todo.
      </p>
    </PhotoPageHero>
  );
}
