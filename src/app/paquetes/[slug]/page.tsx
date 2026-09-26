import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, MapPin, ShieldCheck, Utensils } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PackageHero } from "@/components/packages/PackageHero";
import { packageDetails } from "@/data/package-details";
import { quoteMessage, whatsappUrl } from "@/lib/contact";
import {
  getCardImages,
  getDisplayTitle,
  getDurationLabel,
  getPriceAmount,
  getSeason,
} from "@/lib/package-presentation";
import { touristTripJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return packageDetails.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata(
  props: PageProps<"/paquetes/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const pkg = packageDetails.find((p) => p.slug === slug);
  if (!pkg) return {};
  const title = getDisplayTitle(pkg);
  const description = pkg.description.slice(0, 158);
  const hero = getCardImages(pkg)[0];
  return {
    title,
    description,
    alternates: { canonical: `/paquetes/${pkg.slug}` },
    openGraph: {
      title: `${title} | Transrio Turismo`,
      description,
      url: `/paquetes/${pkg.slug}`,
      images: hero ? [{ url: hero }] : undefined,
    },
  };
}

export default async function PaqueteDetallePage(
  props: PageProps<"/paquetes/[slug]">,
) {
  const { slug } = await props.params;
  const pkg = packageDetails.find((p) => p.slug === slug);
  if (!pkg) notFound();

  const images = getCardImages(pkg);
  const title = getDisplayTitle(pkg);
  const duration = getDurationLabel(pkg);
  const season = getSeason(pkg);
  const amount = getPriceAmount(pkg);
  const wa = whatsappUrl(
    quoteMessage({ destination: title, duration: duration || undefined }),
  );
  const menoresConDetalle = pkg.menores.filter((m) => m.detalle);
  const itinerarioLineas = pkg.itinerario
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <main className="bg-white">
      <JsonLd data={touristTripJsonLd(pkg)} />
      <PackageHero
        title={title}
        duration={duration}
        season={season}
        image={images[0]}
        wa={wa}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p className="text-base leading-relaxed text-brand-black/70 md:text-lg">
            {pkg.description}
          </p>

          {images.length > 1 ? (
            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {images.slice(1).map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-black-light"
                >
                  <Image
                    src={src}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}

          <section className="mt-12">
            <h2 className="font-[family-name:var(--font-funnel)] text-xl font-semibold text-brand-black">
              Itinerario
            </h2>
            <ol className="mt-4 space-y-3">
              {itinerarioLineas.map((linea) => (
                <li
                  key={linea}
                  className="rounded-xl border border-black/5 bg-brand-white px-4 py-3 text-sm leading-relaxed text-brand-black/70"
                >
                  {linea}
                </li>
              ))}
            </ol>
          </section>

          {menoresConDetalle.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-sm font-semibold text-brand-black">Menores</h2>
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
            </section>
          ) : null}

          <section className="mt-10">
            <h2 className="text-sm font-semibold text-brand-black">
              Documentación requerida
            </h2>
            <p className="mt-2 text-sm text-brand-black/70">
              {pkg.documentacionRequerida}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-sm font-semibold text-brand-black">
              Política de cancelación
            </h2>
            <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-brand-black/70">
              {pkg.politicaCancelacion}
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-black/5 bg-brand-white p-5">
            <p className="text-lg font-semibold">
              Desde <span className="text-brand-red-mid">{amount}</span>
            </p>
            <p className="mt-1 text-sm text-brand-black/50">
              por persona, coche cama
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex cursor-pointer items-center justify-center rounded-full bg-brand-red-mid px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Reservar por WhatsApp
            </a>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-black">
                <Calendar className="h-4 w-4 text-brand-red-mid" />
                Fechas de salida
              </h2>
              <ul className="mt-2 space-y-1 text-sm text-brand-black/70">
                {pkg.fechas.map((f) => (
                  <li key={`${f.salida}-${f.regreso}`}>
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
        </aside>
      </div>
    </main>
  );
}
