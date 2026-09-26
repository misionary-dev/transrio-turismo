import type { Metadata } from "next";
import { GroupDepartureHero } from "@/components/GroupDepartureHero";
import { GroupDepartureInfo } from "@/components/GroupDepartureInfo";
import { ContactPageForm } from "@/components/ContactPageForm";

export const metadata: Metadata = {
  title: { absolute: "Salidas grupales a Brasil desde Posadas | Transrio" },
  description:
    "Armamos viajes grupales de más de 20 personas desde Posadas: transporte en bus cama Río Uruguay, alojamiento y organización a medida.",
  alternates: { canonical: "/salida-grupal" },
};

export default function SalidaGrupalPage() {
  return (
    <>
      <GroupDepartureHero />
      <GroupDepartureInfo />
      <ContactPageForm />
    </>
  );
}
