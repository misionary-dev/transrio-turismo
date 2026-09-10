import Link from "next/link";
import { ArrowRight, ImageOff } from "lucide-react";
import type { PackageDetail } from "@/data/package-details";
import { quoteMessage, whatsappUrl } from "@/lib/contact";
import {
  getDisplayTitle,
  getDurationLabel,
  getPriceAmount,
  getSeason,
} from "@/lib/package-presentation";

export function PackageCardPhoto({ pkg }: { pkg: PackageDetail }) {
  const title = getDisplayTitle(pkg);
  const duration = getDurationLabel(pkg);
  const season = getSeason(pkg);
  const amount = getPriceAmount(pkg);
  const wa = whatsappUrl(
    quoteMessage({ destination: title, duration: duration || undefined }),
  );
  const statsLine = [duration, `Desde ${amount}`].filter(Boolean).join(" · ");

  return (
    <div className="group relative flex h-[440px] w-full flex-col justify-end overflow-hidden rounded-3xl bg-brand-black-light shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      {/* Foto — placeholder hasta tener las imágenes reales */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/25">
        <ImageOff className="h-10 w-10" />
        <span className="text-xs font-medium">Foto próximamente</span>
      </div>

      {season ? (
        <span className="absolute top-4 left-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-black backdrop-blur-sm">
          {season}
        </span>
      ) : null}

      {/* Degradado inferior con la info */}
      <div className="relative z-[5] bg-gradient-to-t from-black/90 via-black/55 to-transparent px-6 pt-20 pb-5 text-white">
        <h3 className="text-2xl leading-tight font-bold">{title}</h3>
        {statsLine ? (
          <p className="mt-1 text-sm text-white/80">{statsLine}</p>
        ) : null}

        <div className="mt-4 flex items-center gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-xl bg-brand-red-mid px-4 py-3 text-center text-sm font-semibold text-white transition hover:brightness-110"
          >
            Reservar
          </a>
          <Link
            href={`/paquetes/${pkg.slug}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/25"
          >
            Conocer más
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
