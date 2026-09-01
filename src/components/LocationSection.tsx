"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function LocationSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-location-copy]", {
        opacity: 0,
        x: -24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from("[data-location-map]", {
        opacity: 0,
        x: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-brand px-6 py-20 text-white md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-14">
        <div data-location-copy>
          <p className="text-sm font-semibold tracking-[0.2em] text-sand/80 uppercase">
            Posadas, Misiones
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-funnel)] text-3xl font-semibold tracking-tight md:text-4xl">
            ¿Dónde estamos?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/75">
            Av. Quaranta Nº 3837 — Posadas, Argentina.
          </p>
          <p className="mt-2 text-base text-white/75">
            Tel:{" "}
            <a className="underline decoration-white/30" href="tel:+543764596777">
              +54 0376 459-6777
            </a>
          </p>
          <p className="mt-2 text-base text-white/75">
            <a
              className="underline decoration-white/30"
              href="mailto:info@transrioturismo.tur.ar"
            >
              info@transrioturismo.tur.ar
            </a>
          </p>
        </div>

        <div
          data-location-map
          className="overflow-hidden rounded-3xl border border-white/15 shadow-2xl"
        >
          <iframe
            title="Ubicación Transrio Turismo"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d885.5341607372526!2d-55.919349170763304!3d-27.40266620830769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9457be8be4e37d51%3A0xdb94ee22bd2f6065!2sAvenida+Luis+Quaranta+3837%2C+Posadas%2C+Misi%C3%B3nes!5e0!3m2!1ses-419!2sar!4v1525651340026"
            className="h-[280px] w-full border-0 md:h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
