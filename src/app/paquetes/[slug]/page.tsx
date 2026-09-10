import { notFound } from "next/navigation";
import { Calendar, ImageOff, MapPin, ShieldCheck, Utensils } from "lucide-react";
import { packageDetails } from "@/data/package-details";
import { quoteMessage, whatsappUrl } from "@/lib/contact";
import {
  getDisplayTitle,
  getDurationLabel,
  getPriceAmount,
  getSeason,
} from "@/lib/package-presentation";

export function generateStaticParams() {
  return packageDetails.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata(props: PageProps<"/paquetes/[slug]">) {
  const { slug } = await props.params;
  const pkg = packageDetails.find((p) => p.slug === slug);
  if (!pkg) return {};
  return { title: `${getDisplayTitle(pkg)} — Transrio Turismo` };
}

export default async function PaqueteDetallePage(
  props: PageProps<"/paquetes/[slug]">,
) {
  const { slug } = await props.params;
  const pkg = packageDetails.find((p) => p.slug === slug);
  if (!pkg) notFound();

  const title = getDisplayTitle(pkg);
  const duration = getDurationLabel(pkg);
  const season = getSeason(pkg);
  const amount = getPriceAmount(pkg);
  const wa = whatsappUrl(
    quoteMessage({ destination: title, duration: duration || undefined }),
  );
  const menoresConDetalle = pkg.menores.filter((m) => m.detalle);

  return (
    <main className="bg-white">
      {/* Portada */}
      <div className="flex h-64 flex-col items-center justify-center gap-2 bg-brand-black-light text-white/50 md:h-80">
        <ImageOff className="h-8 w-8" />
        <span className="text-sm font-medium">Foto próximamente</span>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        {season ? (
          <span className="mb-3 inline-block rounded-full bg-brand-red-mid/10 px-3 py-1 text-xs font-semibold text-brand-red-mid">
            {season}
          </span>
        ) : null}

        <h1 className="text-3xl font-semibold tracking-tight text-brand-black md:text-4xl">
          {title}
        </h1>

        {duration ? (
          <p className="mt-2 text-brand-black/60">{duration}</p>
        ) : null}

        <p className="mt-5 text-base leading-relaxed text-brand-black/70">
          {pkg.description}
        </p>

        {/* Precio + CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/5 bg-brand-white p-5">
          <p className="text-lg font-semibold">
            Desde <span className="text-brand-red-mid">{amount}</span>{" "}
            <span className="text-sm font-normal text-brand-black/50">
              por persona, coche cama
            </span>
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-red-mid px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Reservar por WhatsApp
          </a>
        </div>

        {/* Datos clave */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-black">
              <Calendar className="h-4 w-4 text-brand-red-mid" />
              Fechas de salida
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-brand-black/70">
              {pkg.fechas.map((f, i) => (
                <li key={i}>
                  {f.salida} → {f.regreso}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-black">
              <MapPin className="h-4 w-4 text-brand-red-mid" />
              Alojamiento
            </h2>
            <p className="mt-2 text-sm text-brand-black/70">
              {pkg.alojamiento.hotel}
            </p>
            <p className="mt-1 text-sm text-brand-black/70">
              {pkg.alojamiento.ubicacion}
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-black">
              <Utensils className="h-4 w-4 text-brand-red-mid" />
              Comidas incluidas
            </h2>
            <p className="mt-2 text-sm text-brand-black/70">
              {pkg.comidasIncluidas}
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-black">
              <ShieldCheck className="h-4 w-4 text-brand-red-mid" />
              Cobertura médica
            </h2>
            <p className="mt-2 text-sm text-brand-black/70">
              {pkg.coberturaMedica.incluida
                ? pkg.coberturaMedica.proveedor
                : "No incluida"}
              {pkg.coberturaMedica.monto
                ? ` — ${pkg.coberturaMedica.monto}`
                : ""}
            </p>
          </div>
        </div>

        {menoresConDetalle.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-sm font-semibold text-brand-black">
              Menores
            </h2>
            <ul className="mt-2 space-y-2 text-sm text-brand-black/70">
              {menoresConDetalle.map((m) => (
                <li key={m.rango}>
                  <span className="font-medium text-brand-black">
                    {m.rango}:
                  </span>{" "}
                  {m.detalle}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Itinerario */}
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-brand-black">
            Itinerario
          </h2>
          <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-brand-black/70">
            {pkg.itinerario}
          </p>
        </div>

        {/* Documentación */}
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-brand-black">
            Documentación requerida
          </h2>
          <p className="mt-2 text-sm text-brand-black/70">
            {pkg.documentacionRequerida}
          </p>
        </div>

        {/* Cancelación */}
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-brand-black">
            Política de cancelación
          </h2>
          <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-brand-black/70">
            {pkg.politicaCancelacion}
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-red-mid px-8 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Reservar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
