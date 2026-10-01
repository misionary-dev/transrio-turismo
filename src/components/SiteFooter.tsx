import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { TransrioLogo } from "@/components/TransrioLogo";
import {
  ADDRESS,
  ADDRESS_MAPS_URL,
  HOURS,
  PHONES,
  SOCIAL_LINKS,
  quoteMessage,
  whatsappUrl,
} from "@/lib/contact";
import { DEFAULT_DESCRIPTION } from "@/lib/site";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/paquetes", label: "Paquetes" },
  { href: "/salida-grupal", label: "Salida grupal" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand-black-light text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_1fr_1fr] lg:gap-14">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-block">
            <TransrioLogo variant="dark" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
            {DEFAULT_DESCRIPTION}
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={whatsappUrl(quoteMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
            Navegación
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/75 transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
            Contacto
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li>
              <a href={`tel:${PHONES.fijoTel}`} className="hover:text-white">
                {PHONES.fijo}
              </a>
            </li>
            <li>
              <a href={`tel:${PHONES.movilTel}`} className="hover:text-white">
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

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/40">
          © {year} Transrio Turismo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
