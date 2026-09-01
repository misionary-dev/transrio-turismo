import Link from "next/link";
import { HOURS, PHONES, quoteMessage, whatsappUrl } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-[#081416] px-6 py-12 text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-funnel)] text-xl font-semibold text-white uppercase">
            Transrio Turismo
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed">
            Agencia de viajes en Posadas. Paquetes a Brasil con salidas
            programadas.
          </p>
          <p className="mt-3 text-sm text-white/80">
            <a className="cursor-pointer hover:text-white" href={`tel:${PHONES.fijoTel}`}>
              {PHONES.fijo}
            </a>
            {" · "}
            <a className="cursor-pointer hover:text-white" href={`tel:${PHONES.movilTel}`}>
              {PHONES.movil}
            </a>
          </p>
          <p className="mt-1 text-xs text-white/50">{HOURS}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link href="/" className="cursor-pointer hover:text-white">
            Inicio
          </Link>
          <Link href="/quienes-somos" className="cursor-pointer hover:text-white">
            Quiénes somos
          </Link>
          <a
            href={whatsappUrl(quoteMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-semibold text-[#25D366] hover:brightness-110"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
