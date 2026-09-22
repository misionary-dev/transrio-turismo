"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-hero-title]", {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from("[data-hero-subtitle]", {
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
        <p data-hero-subtitle className="text-sm font-semibold tracking-[0.2em] text-white uppercase mb-3">
          Operador turístico regional
        </p>
        <h1 data-hero-title className="font-[family-name:var(--font-funnel)] text-5xl font-semibold text-white md:text-6xl">
          ¿Quiénes somos?
        </h1>
      </div>
    </div>
  );
}
