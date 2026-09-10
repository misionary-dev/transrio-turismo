import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Flower2,
  ImageOff,
  Leaf,
  Snowflake,
  Sun,
  Tag,
} from "lucide-react";
import type { PackageDetail } from "@/data/package-details";
import { quoteMessage, whatsappUrl } from "@/lib/contact";
import {
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

const STACK_COUNT = 3;

type StackStyle = CSSProperties & Record<"--tx" | "--r", string>;

function stackStyle(index: number): StackStyle {
  return {
    transform: `translateX(${index * 26}px)`,
    zIndex: STACK_COUNT - index,
    "--tx": `${index * 46}px`,
    "--r": `${index * 4 - 4}deg`,
  };
}

export function PackageCardStacked({ pkg }: { pkg: PackageDetail }) {
  const title = getDisplayTitle(pkg);
  const duration = getDurationLabel(pkg);
  const season = getSeason(pkg);
  const amount = getPriceAmount(pkg);
  const SeasonIcon = season ? SEASON_ICON[season] : null;
  const wa = whatsappUrl(
    quoteMessage({ destination: title, duration: duration || undefined }),
  );

  return (
    <div className="group relative flex w-full flex-col rounded-2xl border border-black/5 bg-white p-6 text-brand-black shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/paquetes/${pkg.slug}`}
        className="mb-6 flex items-center justify-between gap-3"
      >
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <ArrowRight className="h-6 w-6 shrink-0 text-brand-red-mid transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      </Link>

      {/* Fotos apiladas — placeholder hasta tener las imágenes reales */}
      <div className="relative mb-6 h-32 overflow-hidden">
        {Array.from({ length: STACK_COUNT }).map((_, index) => (
          <div
            key={index}
            style={stackStyle(index)}
            className="absolute h-full w-[45%] overflow-hidden rounded-lg border-2 border-white bg-brand-black-light shadow-md transition-all duration-300 ease-in-out group-hover:translate-x-[var(--tx)] group-hover:rotate-[var(--r)]"
          >
            {index === 0 ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-white/50">
                <ImageOff className="h-5 w-5" />
                <span className="text-[10px] font-medium">
                  Foto próximamente
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand-black/60">
        {season ? (
          <span className="flex items-center gap-1.5">
            {SeasonIcon ? <SeasonIcon className="h-4 w-4" /> : null}
            {season}
          </span>
        ) : null}
        {duration ? (
          <span className="flex items-center gap-1.5">
            <CalendarClock className="h-4 w-4" />
            {duration}
          </span>
        ) : null}
        <span className="flex items-center gap-1.5">
          <Tag className="h-4 w-4" />
          Desde {amount}
        </span>
      </div>

      <p className="line-clamp-3 text-sm leading-relaxed text-brand-black/60">
        {pkg.description}
      </p>

      <div className="mt-5 flex items-center gap-2">
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
          className="flex-1 rounded-full bg-brand-red-mid px-4 py-2 text-center text-sm font-semibold text-white transition hover:brightness-110"
        >
          Reservar
        </a>
      </div>
    </div>
  );
}
