import Link from "next/link";
import { ArrowRight, Flower2, Leaf, Snowflake, Sun } from "@/components/icons/ui";
import { PackageCardGallerySlot } from "@/components/packages/PackageCardGallerySlot";
import type { PackageDetail } from "@/data/package-details";
import { quoteMessage, whatsappUrl } from "@/lib/contact";
import {
  getCardImages,
  getDisplayTitle,
  getDurationLabel,
  getPriceAmount,
  getSeason,
  selectItemAnalytics,
  type Season,
} from "@/lib/package-presentation";

const SEASON_ICON = {
  Verano: Sun,
  Otoño: Leaf,
  Invierno: Snowflake,
  Primavera: Flower2,
} as const satisfies Record<Season, typeof Sun>;

export function PackageCardCarousel({
  pkg,
  heading = "h3",
}: {
  pkg: PackageDetail;
  heading?: "h2" | "h3";
}) {
  const TitleTag = heading;
  const images = getCardImages(pkg);
  const title = getDisplayTitle(pkg);
  const duration = getDurationLabel(pkg);
  const season = getSeason(pkg);
  const SeasonIcon = season ? SEASON_ICON[season] : null;
  const amount = getPriceAmount(pkg);
  const itemAnalytics = selectItemAnalytics(pkg);
  const href = `/paquetes/${pkg.slug}`;
  const wa = whatsappUrl(
    quoteMessage({ destination: title, duration: duration || undefined }),
  );

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-black/5 bg-white text-brand-black shadow-md transition duration-300 hover:shadow-xl">
      <div className="relative h-64 bg-brand-black-light">
        <PackageCardGallerySlot
          images={images}
          title={title}
          href={href}
          itemAnalytics={itemAnalytics}
        />

        {season ? (
          <div className="pointer-events-none absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-black backdrop-blur-sm">
            {SeasonIcon ? <SeasonIcon className="h-3.5 w-3.5" /> : null}
            {season}
          </div>
        ) : null}
      </div>

      <div className="space-y-3 p-5">
        <TitleTag className="text-xl font-bold">
          <Link href={href} className="hover:underline" {...itemAnalytics}>
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
            href={href}
            className="flex-1 rounded-full border border-brand-red-mid px-4 py-2 text-center text-sm font-semibold text-brand-red-mid transition hover:bg-brand-red-mid/10"
            {...itemAnalytics}
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
