import Image from "next/image";
import Link from "next/link";
import campana from "@/data/campana-vigente.json";
import { media } from "@/lib/media";

/** Bloque de campaña del home. El contenido vive en `src/data/campana-vigente.json`. */
export function CampanaBanner() {
  const now = Date.now();
  if (now < Date.parse(campana.start) || now >= Date.parse(campana.end)) {
    return null;
  }

  return (
    <aside aria-label={campana.title} className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 py-8 sm:flex-row sm:items-center sm:gap-8">
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-2xl bg-brand-black-light sm:w-72">
          <Image
            src={media(campana.image)}
            alt={campana.imageAlt}
            fill
            sizes="(min-width: 640px) 288px, 100vw"
            quality={50}
            fetchPriority="low"
            className="object-cover"
          />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {campana.title}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-brand-black md:text-3xl">
            {campana.text}
          </p>
          <Link
            href={campana.href}
            className="mt-4 inline-flex rounded-full bg-brand-red-mid px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {campana.cta}
          </Link>
        </div>
      </div>
    </aside>
  );
}
