"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ImageOff } from "@/components/icons/ui";
import { cn } from "@/lib/utils";

export type PackageCardGalleryProps = {
  images: string[];
  title: string;
  href: string;
  itemAnalytics: Record<string, string>;
};

export function PackageCardGallery({
  images,
  title,
  href,
  itemAnalytics,
}: PackageCardGalleryProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  function goTo(index: number) {
    startTransition(() => setCurrentIndex(index));
  }

  function changeImage(dir: number) {
    startTransition(() => {
      setCurrentIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return images.length - 1;
        if (next >= images.length) return 0;
        return next;
      });
    });
  }

  return (
    <div ref={frameRef} className="group absolute inset-0">
      <Link
        href={href}
        className="absolute inset-0 z-0 cursor-pointer"
        aria-label={`Ver ${title}`}
        {...itemAnalytics}
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

      {images.length > 1 ? (
        <div className="pointer-events-none absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                goTo(index);
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
  );
}
