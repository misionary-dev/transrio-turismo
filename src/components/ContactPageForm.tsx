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

export function ContactPageForm() {
  const wa = whatsappUrl(quoteMessage());

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
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
                className="inline-flex items-start gap-2 transition hover:text-brand-red-mid"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>{ADDRESS}</span>
              </a>

              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>{HOURS}</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <a
                  href={`tel:${PHONES.fijoTel}`}
                  className="inline-flex items-center gap-2 transition hover:text-brand-red-mid"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  <span>{PHONES.fijo}</span>
                </a>
                <a
                  href={`tel:${PHONES.movilTel}`}
                  className="inline-flex items-center gap-2 transition hover:text-brand-red-mid"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  <span>{PHONES.movil}</span>
                </a>
              </div>

              <div className="mt-2 flex items-center gap-3 pt-2">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:opacity-75"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:opacity-75"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon />
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:opacity-75"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
