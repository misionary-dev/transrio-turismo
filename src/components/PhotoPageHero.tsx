"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type PhotoPageHeroProps = {
  src: string;
  alt: string;
  children: ReactNode;
};

export function PhotoPageHero({ src, alt, children }: PhotoPageHeroProps) {
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
    { scope: heroRef },
  );

  return (
    <div
      ref={heroRef}
      className="relative flex h-96 w-full items-center justify-center overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 px-6 text-center">{children}</div>
    </div>
  );
}
