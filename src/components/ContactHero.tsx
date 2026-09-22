"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function ContactHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-contact-title]", {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from("[data-contact-subtitle]", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
    },
    { scope: heroRef }
  );

  return (
    <div ref={heroRef} className="relative h-96 w-full bg-brand-red-mid flex items-center justify-center">
      <div className="text-center">
        <h1 data-contact-title className="font-[family-name:var(--font-funnel)] text-5xl font-semibold text-white md:text-6xl">
          Contáctanos
        </h1>
        <p data-contact-subtitle className="mt-3 text-sm text-white/80">
          Dejanos tu consulta y te respondemos a la brevedad
        </p>
      </div>
    </div>
  );
}
