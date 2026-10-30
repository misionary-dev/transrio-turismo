"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sun,
  Leaf,
  Snowflake,
  Flower2,
  ImageOff,
} from "@/components/icons/ui";
import { cn } from "@/lib/utils";
import type { PackageDetail } from "@/data/package-details";
import { quoteMessage, whatsappUrl } from "@/lib/contact";
import {
  getCardImages,
  getDisplayTitle,
  getDurationLabel,
  getPriceAmount,
  getSeason,
  type Season,
} from "@/lib/package-presentation";

const SEASON_ICON: Record<Season, typeof Sun> = {
  Verano: Sun,
  Otoño: Leaf,
  Invierno: Snowflake,
  Primavera: Flower2,
};

export function PackageCardCarousel({
  pkg,
  heading = "h3",
}: {
  pkg: PackageDetail;
  heading?: "h2" | "h3";
}) {
  const TitleTag = heading;
  const images = getCardImages(pkg);
  const [currentIndex, setCurrentIndex] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShowImage(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const title = getDisplayTitle(pkg);
  const duration = getDurationLabel(pkg);
  const season = getSeason(pkg);
  const SeasonIcon = season ? SEASON_ICON[season] : null;
  const amount = getPriceAmount(pkg);
  const wa = whatsappUrl(
    quoteMessage({ destination: title, duration: duration || undefined }),
  );

  function changeImage(dir: number) {
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-black/5 bg-white text-brand-black shadow-md transition duration-300 hover:shadow-xl">
      {/* Carrusel de imágenes — click abre detalle; flechas no bloquean el resto */}
      <div ref={frameRef} className="group relative h-64 bg-brand-black-light">
        <Link
          href={`/paquetes/${pkg.slug}`}
          className="absolute inset-0 z-0 cursor-pointer"
          aria-label={`Ver ${title}`}
        >
          {images.length > 0 && showImage ? (
            <Image
              key={images[currentIndex]}
              src={images[currentIndex]}
              alt={title}
              fill
              quality={50}
              sizes="(min-width: 1024px) 360px, 100vw"
              fetchPriority="low"
              className="object-cover"
            />
          ) : images.length > 0 ? null : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/50">
              <ImageOff className="h-8 w-8" />
              <span className="text-xs font-medium">Foto próximamente</span>
            </div>
          )}
        </Link>

        {images.length > 1 ? (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                changeImage(-1);
              }}
              aria-label="Foto anterior"
              className="pointer-events-auto rounded-full bg-black/40 p-1.5 text-white hover:bg-black/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                changeImage(1);
              }}
              aria-label="Foto siguiente"
              className="pointer-events-auto rounded-full bg-black/40 p-1.5 text-white hover:bg-black/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : null}

        {season ? (
          <div className="pointer-events-none absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-black backdrop-blur-sm">
            {SeasonIcon ? <SeasonIcon className="h-3.5 w-3.5" /> : null}
            {season}
          </div>
        ) : null}

        {images.length > 1 ? (
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex(index);
                }}
                aria-label={`Ir a la foto ${index + 1}`}
                className="pointer-events-auto flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={cn(
                    "rounded-full",
                    currentIndex === index
                      ? "h-1.5 w-4 bg-white"
                      : "h-1.5 w-1.5 bg-white/50",
                  )}
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Contenido */}
      <div className="space-y-3 p-5">
        <TitleTag className="text-xl font-bold">
          <Link href={`/paquetes/${pkg.slug}`} className="hover:underline">
            {title}
          </Link>
        </TitleTag>

        {duration ? (
          <p className="text-sm text-brand-black/60">{duration}</p>
        ) : null}

        <p className="line-clamp-3 text-sm leading-relaxed text-brand-black/70">
          {pkg.description}
        </p>

        <p className="pt-2 font-semibold">
          Desde <span className="text-brand-red-mid">{amount}</span>
        </p>

        <div className="flex items-center gap-2 pt-1">
          <Link
            href={`/paquetes/${pkg.slug}`}
            className="flex-1 rounded-full border border-brand-red-mid px-4 py-2 text-center text-sm font-semibold text-brand-red-mid transition hover:bg-brand-red-mid/10"
          >
            Conocer más
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-red-mid px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Reservar
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
