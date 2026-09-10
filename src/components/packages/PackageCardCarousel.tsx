"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sun,
  Leaf,
  Snowflake,
  Flower2,
  ImageOff,
} from "lucide-react";
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

const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export function PackageCardCarousel({ pkg }: { pkg: PackageDetail }) {
  const images = getCardImages(pkg);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const title = getDisplayTitle(pkg);
  const duration = getDurationLabel(pkg);
  const season = getSeason(pkg);
  const SeasonIcon = season ? SEASON_ICON[season] : null;
  const amount = getPriceAmount(pkg);
  const wa = whatsappUrl(
    quoteMessage({ destination: title, duration: duration || undefined }),
  );

  function changeImage(dir: number) {
    setDirection(dir);
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 40px -12px rgba(1,1,1,0.18)",
      }}
      className="w-full overflow-hidden rounded-2xl border border-black/5 bg-white text-brand-black shadow-md"
    >
      {/* Carrusel de imágenes */}
      <div className="group relative h-64 bg-brand-black-light">
        {images.length > 0 ? (
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex]}
                alt={title}
                fill
                sizes="(min-width: 1024px) 360px, 100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/50">
            <ImageOff className="h-8 w-8" />
            <span className="text-xs font-medium">Foto próximamente</span>
          </div>
        )}

        {images.length > 1 ? (
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => changeImage(-1)}
              aria-label="Foto anterior"
              className="rounded-full bg-black/40 p-1.5 text-white hover:bg-black/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => changeImage(1)}
              aria-label="Foto siguiente"
              className="rounded-full bg-black/40 p-1.5 text-white hover:bg-black/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : null}

        {season ? (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-black backdrop-blur-sm">
            {SeasonIcon ? <SeasonIcon className="h-3.5 w-3.5" /> : null}
            {season}
          </div>
        ) : null}

        {images.length > 1 ? (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir a la foto ${index + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  currentIndex === index
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/50",
                )}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* Contenido */}
      <div className="space-y-3 p-5">
        <h3 className="text-xl font-bold">{title}</h3>

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
    </motion.div>
  );
}
