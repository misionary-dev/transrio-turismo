"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { packages } from "@/data/packages";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PackagesSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-packages-heading]", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
      });

      gsap.from("[data-package-card]", {
        opacity: 0,
        y: 40,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-packages-grid]",
          start: "top 78%",
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-background px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div data-packages-heading className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
            Temporada 2026
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-funnel)] text-3xl font-semibold tracking-tight text-brand md:text-5xl">
            Los mejores paquetes para vos
          </h2>
          <p className="mt-4 text-base text-foreground/70 md:text-lg">
            Tres destinos de playa en Brasil, con traslados en bus cama y
            alojamiento incluido.
          </p>
        </div>

        <div
          data-packages-grid
          className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6"
        >
          {packages.map((pkg) => (
            <article
              key={pkg.slug}
              data-package-card
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-30px_rgba(11,61,74,0.45)]"
            >
              <Link
                href={`/paquetes/${pkg.slug}`}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                  {pkg.aside}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-funnel)] text-xl font-semibold text-brand">
                  <Link href={`/paquetes/${pkg.slug}`}>{pkg.title}</Link>
                </h3>
                <p className="mt-1 text-sm text-foreground/55">
                  {pkg.destination} · {pkg.duration}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/70">
                  {pkg.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
                  <span className="text-sm font-bold text-brand">{pkg.price}</span>
                  <Link
                    href={`/paquetes/${pkg.slug}`}
                    className="text-sm font-semibold text-accent transition hover:underline"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
