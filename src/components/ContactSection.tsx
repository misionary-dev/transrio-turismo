import { Clock, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import {
  ADDRESS,
  ADDRESS_MAPS_URL,
  HOURS,
  MAPS_EMBED_URL,
  PHONES,
  SOCIAL_LINKS,
  quoteMessage,
  whatsappUrl,
} from "@/lib/contact";

export function ContactSection() {
  const wa = whatsappUrl(quoteMessage());

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="text-3xl leading-tight font-semibold tracking-tight text-brand-red-mid md:text-5xl">
          Contactanos
        </h2>
        <p className="mt-3 max-w-xl text-sm text-brand-black/60 md:text-base">
          Dejanos tu consulta y te respondemos a la brevedad, o escribinos
          directo por WhatsApp.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Formulario — todavía maquetado, sin envío conectado */}
          <form className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="nombre"
                className="mb-1.5 block text-sm font-medium text-brand-black"
              >
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-brand-black placeholder-black/40 outline-none transition focus:border-brand-red-mid"
              />
            </div>

            <div>
              <label
                htmlFor="contacto"
                className="mb-1.5 block text-sm font-medium text-brand-black"
              >
                Email o teléfono
              </label>
              <input
                id="contacto"
                type="text"
                placeholder="¿Cómo te contactamos?"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-brand-black placeholder-black/40 outline-none transition focus:border-brand-red-mid"
              />
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="mb-1.5 block text-sm font-medium text-brand-black"
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                rows={4}
                placeholder="Contanos qué viaje tenés en mente"
                className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-brand-black placeholder-black/40 outline-none transition focus:border-brand-red-mid"
              />
            </div>

            {/* Sin conectar todavía — falta definir el servicio de envío de mail */}
            <button
              type="button"
              className="mt-2 rounded-full bg-brand-red-mid px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Enviar consulta
            </button>
          </form>

          {/* Mapa + datos de contacto */}
          <div className="flex flex-col gap-6">
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                src={MAPS_EMBED_URL}
                title="Ubicación Transrio Turismo"
                loading="lazy"
                className="h-full w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col gap-3 text-sm text-brand-black">
              <a
                href={ADDRESS_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <MapPin className="h-4 w-4 shrink-0" />
                {ADDRESS}
              </a>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                {HOURS}
              </span>
              <a
                href={`tel:${PHONES.fijoTel}`}
                className="flex items-center gap-2 hover:underline"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {PHONES.fijo}
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                {PHONES.movil}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Transrio Turismo"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-white text-brand-black transition hover:bg-black/10"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Transrio Turismo"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-white text-brand-black transition hover:bg-black/10"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
