import Image from "next/image";
import type { ReactNode } from "react";

type PhotoPageHeroProps = {
  src: string;
  alt: string;
  children: ReactNode;
};

export function PhotoPageHero({ src, alt, children }: PhotoPageHeroProps) {
  return (
    <div className="relative flex h-96 w-full items-center justify-center overflow-hidden">
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
