import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ContactHero } from "@/components/ContactHero";
import { ContactPageForm } from "@/components/ContactPageForm";
import { FAQ_JSON_LD } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Contacto en Posadas, Av. Quaranta 3837 | Transrio" },
  description:
    "Visitá Transrio Turismo en Av. Quaranta 3837, Posadas. Teléfono +54 0376 459-6777, WhatsApp +54 9 376 429-2909. Lun–Vie 08:30–12:00 y 16:00–20:00.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={FAQ_JSON_LD} />
      <ContactHero />
      <ContactPageForm />
    </>
  );
}
