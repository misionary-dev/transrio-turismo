"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Users, MapPin, Zap, Heart } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function GroupDepartureInfo() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animación de la sección principal
      gsap.from("[data-group-image]", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-group-content]",
          start: "top 70%",
        },
      });

      gsap.from("[data-group-text]", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-group-content]",
          start: "top 70%",
        },
      });

      // Animación de los ítems de características
      gsap.from("[data-benefit-item]", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-benefits-section]",
          start: "top 70%",
        },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="bg-white">
      {/* Sección Principal */}
      <section
        data-group-content
        className="mx-auto max-w-6xl px-6 py-16 md:py-24"
      >
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div data-group-text>
            <h2 className="text-3xl font-semibold text-brand-red-mid mb-6 md:text-4xl">
              Tu Viaje Perfecto en Grupo
            </h2>
            <p className="text-base leading-relaxed text-foreground/80">
              ¿Quiénes somos? Somos expertos en organizar viajes grupales únicos
              y memorables. Con más de una década de experiencia, conocemos cada
              detalle que hace que un viaje grupal sea perfecto.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              Desde la planificación inicial hasta el último momento, te
              acompañamos en cada paso. Nuestro equipo se dedica a crear
              experiencias que tus amigos, familia o colegas recordarán para
              siempre.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              Nos encargamos de todo: transporte en nuestra moderna flota de
              ómnibus cama, alojamiento en hoteles de calidad, coordinación de
              actividades y asistencia médica 24/7. Tú solo preocúpate por
              disfrutar.
            </p>
          </div>
          <div data-group-image className="aspect-[4/3] overflow-hidden rounded-2xl bg-brand-black-light">
            <div className="h-full w-full flex items-center justify-center text-white/40">
              <span className="text-sm">Foto próximamente</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section data-benefits-section className="bg-brand-red-mid py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-semibold text-white mb-12 md:text-4xl text-center">
            Por qué Planificamos tu Viaje
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Beneficio 1 */}
            <div data-benefit-item className="flex flex-col items-center text-center text-white">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Experiencia Grupal
              </h3>
              <p className="text-sm leading-relaxed text-white/90">
                Sabemos cómo manejar grupos: coordinación perfecta, actividades para todos y espacios para la diversión.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div data-benefit-item className="flex flex-col items-center text-center text-white">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Destinos a Medida
              </h3>
              <p className="text-sm leading-relaxed text-white/90">
                Elegís el destino y nosotros armamos el itinerario perfecto según lo que quieran vivir juntos.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div data-benefit-item className="flex flex-col items-center text-center text-white">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Logística Completa
              </h3>
              <p className="text-sm leading-relaxed text-white/90">
                Transporte, alojamiento, comidas y asistencia incluida. Vos solo disfrutá del viaje.
              </p>
            </div>

            {/* Beneficio 4 */}
            <div data-benefit-item className="flex flex-col items-center text-center text-white">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Atención Personal
              </h3>
              <p className="text-sm leading-relaxed text-white/90">
                Coordinadores especializados en viajes grupales disponibles las 24 horas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
