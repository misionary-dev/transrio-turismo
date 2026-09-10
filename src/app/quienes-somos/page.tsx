import Link from "next/link";

export default function QuienesSomosPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold text-brand-black md:text-4xl">
        Quiénes somos
      </h1>
      <p className="text-black/60">
        Esta sección está en construcción. Muy pronto vas a poder conocer más
        sobre Transrio Turismo.
      </p>
      <Link
        href="/"
        className="rounded-full bg-brand-red-mid px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
