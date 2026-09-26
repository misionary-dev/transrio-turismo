import type { Metadata } from "next";
import { AboutHero } from "@/components/AboutHero";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: { absolute: "Quiénes somos: operador turístico en Posadas | Transrio" },
  description:
    "Transrio Turismo es operador turístico en Posadas, Misiones. Paquetes a Brasil en ómnibus cama Río Uruguay, hotel y asistencia al viajero.",
  alternates: { canonical: "/quienes-somos" },
};

export default function QuienesSomosPage() {
  return (
    <>
      <AboutHero />
      <AboutSection />
      <ContactSection />
    </>
  );
}
