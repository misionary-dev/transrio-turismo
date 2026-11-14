import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "@/components/icons/ui";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { media } from "@/lib/media";
import { CampaignHeaderMarks } from "@/components/Campaigns";
import { MobileMenuButton } from "@/components/menu/MobileMenuButton";
import { MobileMenuSlot } from "@/components/menu/MobileMenuSlot";
import {
  ADDRESS,
  ADDRESS_MAPS_URL,
  HOURS,
  quoteMessage,
  whatsappUrl,
} from "@/lib/contact";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Quiénes somos", href: "/quienes-somos" },
  { label: "Paquetes", href: "/paquetes" },
  { label: "Salida grupal", href: "/salida-grupal" },
  { label: "Contacto", href: "/contacto" },
];

export function SiteHeader({ campaigns }: { campaigns: string }) {
  const wa = whatsappUrl(quoteMessage());

  return (
    <>
      <div className="w-full bg-brand-red-mid">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-center md:justify-center md:px-8">
          <span className="flex items-center gap-1.5 text-xs font-bold text-white md:text-sm">
            <Clock className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
            {HOURS}
          </span>
          <a
            href={ADDRESS_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold text-white transition-colors hover:text-white/80 md:text-sm"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
            {ADDRESS}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-brand-white">
        <nav className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-4 px-4 py-3 md:grid-cols-[1fr_auto_1fr] md:px-8 md:py-4">
          <div className="flex items-center gap-3 justify-self-start">
            <Link
              href="/"
              className="relative flex h-9 w-[130px] shrink-0 items-center md:h-11 md:w-[156px]"
            >
              <Image
                src={media("/logo-transrio.png")}
                alt="Transrio Turismo — operador de viajes en Posadas"
                fill
                loading="lazy"
                fetchPriority="low"
                sizes="(min-width: 768px) 156px, 130px"
                className="object-contain object-left"
              />
            </Link>
            <CampaignHeaderMarks active={campaigns} />
          </div>

          <div className="hidden items-center gap-1 justify-self-center md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-brand-black transition-colors hover:bg-black/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden justify-self-end md:flex">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-2 rounded-full bg-brand-red-mid px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:brightness-110"
            >
              <WhatsAppIcon />
              Charlemos
            </a>
          </div>

          <MobileMenuButton />
        </nav>

        <MobileMenuSlot links={NAV_LINKS} wa={wa} />
      </header>
    </>
  );
}
