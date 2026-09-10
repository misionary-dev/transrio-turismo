import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import {
  ADDRESS,
  ADDRESS_MAPS_URL,
  HOURS,
  PHONES,
  SOCIAL_LINKS,
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

export function SiteFooter() {
  const wa = whatsappUrl(quoteMessage());
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-black-light px-6 py-12 text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <Link href="/" className="relative block h-10 w-[150px]">
            <Image
              src="/logo-transrio.png"
              alt="Transrio Turismo"
              fill
              sizes="150px"
              className="object-contain object-left"
            />
          </Link>
          <p className="mt-4 text-sm leading-relaxed">
            Agencia de viajes en Posadas. Paquetes a Brasil con salidas
            programadas y armado de salidas grupales a medida.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Transrio Turismo"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Transrio Turismo"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Transrio Turismo"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-16 gap-y-8">
          <div>
            <p className="text-xs font-semibold tracking-wide text-white uppercase">
              Navegación
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wide text-white uppercase">
              Contacto
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <a
                  className="hover:text-white"
                  href={`tel:${PHONES.fijoTel}`}
                >
                  {PHONES.fijo}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white"
                  href={`tel:${PHONES.movilTel}`}
                >
                  {PHONES.movil}
                </a>
              </li>
              <li>
                <a
                  href={ADDRESS_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {ADDRESS}
                </a>
              </li>
              <li className="text-white/50">{HOURS}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
        <p>© {year} Transrio Turismo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
