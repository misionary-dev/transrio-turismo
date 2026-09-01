"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowRight, CalendarDays, Phone } from "lucide-react";
import { packages } from "@/data/packages";
import SplitFlapText from "@/components/SplitFlapText";
import {
  HOURS,
  PHONES,
  quoteMessage,
  whatsappUrl,
} from "@/lib/contact";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const DURATION_LABEL = "10 días / 7 noches · Enero–Febrero 2026";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function DestinationPicker() {
  const [selected, setSelected] = useState(packages[0].slug);
  const pkg = packages.find((p) => p.slug === selected) ?? packages[0];
  const wa = whatsappUrl(
    quoteMessage({
      destination: pkg.destination,
      duration: DURATION_LABEL,
    }),
  );

  return (
    <div
      data-hero-picker
      className="mx-auto w-full max-w-3xl rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-xl md:p-5"
    >
      <p className="text-center text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
        Elegí tu destino
      </p>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {packages.map((p) => {
          const active = p.slug === selected;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => setSelected(p.slug)}
              className={`min-h-12 cursor-pointer rounded-xl border px-3 py-2.5 text-sm font-bold uppercase transition duration-200 ${
                active
                  ? "border-accent bg-accent text-ink"
                  : "border-white/15 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {p.slug === "camboriu"
                ? "Camboriú"
                : p.slug === "torres"
                  ? "Torres"
                  : "Capão da Canoa"}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85">
        <CalendarDays className="h-4 w-4 shrink-0 text-accent" aria-hidden />
        <span className="font-medium">{DURATION_LABEL}</span>
      </div>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-sm font-bold tracking-wide text-white uppercase transition duration-200 hover:brightness-110"
      >
        Cotizar por WhatsApp
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>

      <div className="mt-4 border-t border-white/10 pt-4 text-center">
        <p className="text-xs tracking-wide text-white/75">
          Llamá ahora:{" "}
          <a
            href={`tel:${PHONES.fijoTel}`}
            className="cursor-pointer font-semibold text-white underline decoration-white/30"
          >
            {PHONES.fijo}
          </a>
          {" · "}
          <a
            href={`tel:${PHONES.movilTel}`}
            className="cursor-pointer font-semibold text-white underline decoration-white/30"
          >
            {PHONES.movil}
          </a>
        </p>
        <p className="mt-1.5 text-[11px] text-white/50">{HOURS}</p>
      </div>
    </div>
  );
}

export function ScrollHome() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const title = root.current?.querySelector("[data-hero-title]");
        let split: SplitText | undefined;

        if (title) {
          split = SplitText.create(title, {
            type: "words,chars",
            charsClass: "hero-char inline-block",
          });
          gsap.from(split.chars, {
            opacity: 0,
            yPercent: 120,
            rotateX: -40,
            stagger: 0.02,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.15,
          });
        }

        gsap.from("[data-hero-sub]", {
          opacity: 0,
          y: 28,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.35,
        });

        gsap.from("[data-quote-section]", {
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-quote-section]",
            start: "top 80%",
          },
        });

        gsap.to("[data-hero-video]", {
          scale: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to("[data-hero-copy]", {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "center top",
            end: "bottom top",
            scrub: 1,
          },
        });

        const pin = root.current?.querySelector(
          "[data-pin]",
        ) as HTMLElement | null;
        const track = root.current?.querySelector(
          "[data-track]",
        ) as HTMLElement | null;
        if (!pin || !track) return () => split?.revert();

        const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const scrollTween = gsap.to(track, {
          x: () => -getScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${getScroll() * 1.15}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-slide-card]").forEach((card) => {
          gsap.from(card, {
            opacity: 0.35,
            scale: 0.92,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 85%",
              end: "left 45%",
              scrub: true,
            },
          });
        });

        return () => {
          split?.revert();
        };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(
          "[data-hero-title], [data-hero-sub]",
          {
            opacity: 0,
            y: 24,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          },
        );

        gsap.from("[data-quote-section]", {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-quote-section]",
            start: "top 85%",
          },
        });

        gsap.from("[data-mobile-card]", {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-mobile-packages]",
            start: "top 80%",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section
        data-hero
        className="relative flex min-h-[100svh] flex-col overflow-hidden"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            data-hero-video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full origin-center scale-100 object-cover will-change-transform"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>

        <div
          data-hero-copy
          className="relative z-10 mx-auto flex w-full max-w-[96vw] flex-1 flex-col items-center justify-start px-4 pt-[18svh] pb-16 text-center md:px-8 md:pt-[20svh]"
        >
          <div data-hero-sub className="mb-5 flex justify-center md:mb-6">
            <SplitFlapText
              words={["VERANO 2026", "VERANO 2027"]}
              charset="alphanumeric"
              flipDuration={0.1}
              stagger={0.035}
              cycleDelay={2.8}
              fontSize="clamp(0.85rem, 2.2vw, 1.25rem)"
              tileColor="#1a1a1a"
              textColor="#F5C518"
              tileRadius={6}
              gap={3}
              loop
            />
          </div>

          <h1
            data-hero-title
            className="hero-title mt-0 font-[family-name:var(--font-funnel)]"
          >
            Brasil te espera.
            <br />
            Nosotros te llevamos.
          </h1>

          <p className="hero-sub mt-5 max-w-xl text-[0.8rem] tracking-[0.18em] opacity-90 md:mt-6 md:text-[0.95rem]">
            Salidas confirmadas · Bus cama + hotel
          </p>
        </div>
      </section>

      <section
        data-quote-section
        className="bg-ink px-4 py-16 md:px-6 md:py-20"
        aria-label="Cotizar destino"
      >
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-[0.25em] text-accent uppercase">
            Cotizá ahora
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-funnel)] text-3xl font-semibold tracking-tight text-white uppercase md:text-4xl">
            Elegí destino y escribinos
          </h2>
        </div>
        <DestinationPicker />
      </section>

      <section
        data-pin
        className="relative hidden h-screen overflow-hidden bg-ink md:block"
        aria-label="Recorrido de paquetes"
      >
        <div data-track className="flex h-full w-max will-change-transform">
          <div className="flex h-full w-screen shrink-0 flex-col justify-center px-16">
            <p className="text-sm font-semibold tracking-[0.25em] text-accent uppercase">
              Temporada 2026
            </p>
            <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-funnel)] text-5xl font-semibold tracking-tight text-white uppercase lg:text-6xl">
              Elegí tu playa.
              <br />
              Cotizá por WhatsApp.
            </h2>
          </div>

          {packages.map((pkg) => {
            const wa = whatsappUrl(
              quoteMessage({
                destination: pkg.destination,
                duration: DURATION_LABEL,
              }),
            );
            return (
              <article
                key={pkg.slug}
                data-slide-card
                className="flex h-full w-[min(85vw,720px)] shrink-0 items-center px-8"
              >
                <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl md:grid-cols-2">
                  <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:min-h-[520px]">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-10">
                    <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
                      {pkg.aside}
                    </p>
                    <h3 className="mt-3 font-[family-name:var(--font-funnel)] text-3xl font-semibold text-white uppercase">
                      {pkg.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/55">
                      {pkg.destination} · {pkg.duration}
                    </p>
                    <p className="mt-5 text-base leading-relaxed text-white/70">
                      {pkg.excerpt}
                    </p>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white uppercase transition duration-200 hover:brightness-110"
                    >
                      Cotizar por WhatsApp
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}

          <div className="flex h-full w-screen shrink-0 flex-col items-start justify-center px-16">
            <h2 className="max-w-xl font-[family-name:var(--font-funnel)] text-5xl font-semibold text-white uppercase">
              ¿Listo para salir?
            </h2>
            <p className="mt-5 max-w-md text-lg text-white/65">
              Escribinos o llamá. Te respondemos en horario de atención.
            </p>
            <a
              href={whatsappUrl(quoteMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white uppercase transition duration-200 hover:brightness-110"
            >
              Abrir WhatsApp
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section
        data-mobile-packages
        className="bg-background px-6 py-16 md:hidden"
      >
        <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">
          Temporada 2026
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-funnel)] text-3xl font-semibold text-ink uppercase">
          Los mejores paquetes
        </h2>
        <div className="mt-8 flex flex-col gap-6">
          {packages.map((pkg) => {
            const wa = whatsappUrl(
              quoteMessage({
                destination: pkg.destination,
                duration: DURATION_LABEL,
              }),
            );
            return (
              <article
                key={pkg.slug}
                data-mobile-card
                className="overflow-hidden rounded-3xl bg-white shadow-lg"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-funnel)] text-xl font-semibold text-ink uppercase">
                    {pkg.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/65">{pkg.excerpt}</p>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex cursor-pointer rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white uppercase"
                  >
                    Cotizar por WhatsApp
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-brand px-6 py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
              Posadas, Misiones
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-funnel)] text-3xl font-semibold tracking-tight uppercase md:text-4xl">
              ¿Dónde estamos?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/85">
              Av. Quaranta Nº 3837 — Posadas, Argentina.
            </p>
            <p className="mt-4 flex items-start gap-2 text-base text-white">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span>
                <a
                  className="cursor-pointer font-semibold underline decoration-white/30"
                  href={`tel:${PHONES.fijoTel}`}
                >
                  {PHONES.fijo}
                </a>
                <br />
                <a
                  className="cursor-pointer font-semibold underline decoration-white/30"
                  href={`tel:${PHONES.movilTel}`}
                >
                  {PHONES.movil}
                </a>
              </span>
            </p>
            <p className="mt-3 text-sm text-white/75">{HOURS}</p>
            <a
              href={whatsappUrl(quoteMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex cursor-pointer rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white uppercase"
            >
              WhatsApp
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
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

      <a
        href={whatsappUrl(quoteMessage())}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Cotizar por WhatsApp"
        className="fixed right-4 bottom-4 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition duration-200 hover:scale-105 md:right-6 md:bottom-6"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
