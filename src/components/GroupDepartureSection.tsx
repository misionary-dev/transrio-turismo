import Link from "next/link";
import Image from "next/image";

export function GroupDepartureSection() {
  return (
    <section className="bg-brand-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-brand-red-mid md:text-5xl">
            Salida grupal
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-black/70 md:text-lg">
            <strong>¿Sos parte de un grupo de amigos, un equipo o cualquier grupo de
            más de 20 personas?</strong> Armamos una salida grupal a medida, al
            destino que elijan. Nosotros nos encargamos de todo el plan de
            viaje —alojamiento, transporte y organización— para que ustedes
            solo se preocupen por disfrutar juntos.
          </p>
          <Link
            href="/salida-grupal"
            className="mt-8 inline-block rounded-full bg-brand-red-mid px-7 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Conocé la salida grupal
          </Link>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-brand-black-light">
          <Image
            src="/destinos/salida-grupal.jpg"
            alt="Grupo viajando juntos"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
