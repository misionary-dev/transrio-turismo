import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PackagesPageClient } from "@/components/packages/PackagesPageClient";
import { packageListJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Paquetes a Brasil en bus cama desde Posadas | Transrio" },
  description:
    "Paquetes Transrio desde Posadas: Torres, Capão, Camboriú, Florianópolis, Gramado y Termas. Ómnibus cama Río Uruguay, hotel y asistencia.",
  alternates: { canonical: "/paquetes" },
  openGraph: {
    title: "Paquetes a Brasil desde Posadas | Transrio Turismo",
    description:
      "Torres, Capão, Camboriú, Gramado y Termas. Bus cama, hotel y asistencia.",
    url: "/paquetes",
  },
};

export default function PaquetesPage() {
  return (
    <>
      <JsonLd data={packageListJsonLd()} />
      <PackagesPageClient />
    </>
  );
}
