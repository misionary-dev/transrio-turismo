"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import { Bus, Building2, Heart } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AboutSection() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animación de la sección 1
      gsap.from("[data-about-image]", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-about-content]",
          start: "top 70%",
        },
      });

      gsap.from("[data-about-text]", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-about-content]",
          start: "top 70%",
        },
      });

      // Animación de los ítems de características
      gsap.from("[data-feature-item]", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-features-section]",
          start: "top 70%",
        },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="bg-white">
      {/* Sección 1: Nuestros Orígenes */}
      <section
        data-about-content
        className="mx-auto max-w-6xl px-6 py-16 md:py-24"
      >
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div data-about-text>
            <h2 className="text-3xl font-semibold text-brand-red-mid mb-6 md:text-4xl">
              Nuestros Orígenes
            </h2>
            <p className="text-base leading-relaxed text-foreground/80">
              Nacimos como operadores, partiendo de la base de la gran estructura
              de transporte de pasajeros que posee nuestra empresa de origen, que
              es <strong>Río Uruguay</strong>, quienes proporcionan a los agentes
              de viajes de la región litoral, de toda la argentina y países
              limítrofes el servicio de transporte de pasajeros con la mejor y
              más moderna flota de ómnibus.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              Es por ello que pretendemos mantener los mismos estándares de
              calidad y servicio que Río Uruguay, y garantizar que todos los
              demás servicios que ofrecemos apunten a cubrir todas las
              necesidades de nuestros pasajeros y sus expectativas de viaje.
            </p>
          </div>
          <div data-about-image className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-black-light">
            <Image
              src="/institucional/rio-uruguay-flota.jpg"
              alt="Flota de ómnibus Río Uruguay en Posadas"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Sección 2: Calidad y Compromiso */}
      <section data-features-section className="bg-brand-red-mid py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Servicio de Transporte */}
            <div data-feature-item className="flex flex-col items-center text-center text-white">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Bus className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Servicio de Transporte
              </h3>
              <p className="text-sm leading-relaxed text-white/90">
                Flota moderna de ómnibus de última tecnología con la comodidad y seguridad que mereces en tus viajes.
              </p>
            </div>

            {/* Hoteles Categoría */}
            <div data-feature-item className="flex flex-col items-center text-center text-white">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Building2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Hoteles 3-4 Estrellas
              </h3>
              <p className="text-sm leading-relaxed text-white/90">
                Alojamientos de categoría con todas las comodidades y las mejores ubicaciones en cada destino.
              </p>
            </div>

            {/* Asistencia Médica */}
            <div data-feature-item className="flex flex-col items-center text-center text-white">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Asistencia al Viajero
              </h3>
              <p className="text-sm leading-relaxed text-white/90">
                Cobertura médica amplia protegiendo y cuidando a cada pasajero durante todo el viaje.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
