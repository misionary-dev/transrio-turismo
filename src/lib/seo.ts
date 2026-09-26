import { packageDetails } from "@/data/package-details";
import {
  ADDRESS,
  HOURS,
  PHONES,
  SOCIAL_LINKS,
} from "@/lib/contact";
import { getDisplayTitle, getPriceAmount } from "@/lib/package-presentation";
import { media } from "@/lib/media";
import { GEO, SITE_NAME, SITE_URL } from "@/lib/site";
import type { PackageDetail } from "@/data/package-details";

const LOGO = media("/logo-transrio.png");

export const TRAVEL_AGENCY_JSON_LD = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO,
  image: LOGO,
  telephone: PHONES.fijoTel,
  email: "info@transrioturismo.tur.ar",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Quaranta 3837",
    addressLocality: "Posadas",
    addressRegion: "Misiones",
    postalCode: "3300",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  openingHours: "Mo-Fr 08:30-12:00,16:00-20:00",
  description:
    "Operador turístico regional en Posadas. Paquetes a Brasil en ómnibus cama Río Uruguay.",
  sameAs: [
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.facebook,
    "https://www.transrioturismo.tur.ar/travel/",
  ],
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Posadas, Misiones, Argentina",
  },
};

export const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Desde dónde salen los paquetes de Transrio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Las salidas son desde Posadas, Misiones, en ómnibus cama de Río Uruguay. La agencia está en Av. Quaranta 3837.",
      },
    },
    {
      "@type": "Question",
      name: "¿El viaje es en colectivo cama?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Transrio opera sobre la flota de Río Uruguay: transporte en bus cama, hotel y asistencia al viajero según cada paquete.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué destinos tienen en Brasil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paquetes a Torres, Capão da Canoa, Camboriú, Florianópolis (Canasvieiras), Gramado y Canela, y Termas Romanas en Río Grande do Sul.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué documentación piden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DNI último ejemplar vigente para viajar a Brasil. Los menores siguen la política de cada paquete.",
      },
    },
    {
      "@type": "Question",
      name: "¿Arman salidas grupales?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Para grupos de más de 20 personas armamos transporte, alojamiento y organización a medida.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuál es el horario de atención?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `${HOURS}. Teléfono ${PHONES.fijo} y WhatsApp ${PHONES.movil}. Dirección: ${ADDRESS}.`,
      },
    },
  ],
};

export function packageListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Paquetes Transrio Turismo",
    itemListElement: packageDetails.map((pkg, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getDisplayTitle(pkg),
      url: `${SITE_URL}/paquetes/${pkg.slug}`,
    })),
  };
}

export function touristTripJsonLd(pkg: PackageDetail) {
  const title = getDisplayTitle(pkg);
  const amount = getPriceAmount(pkg).replace(/USD\s+/i, "");
  const numeric = Number(amount.replace(/\./g, "").replace(",", "."));
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${title} — ${SITE_NAME}`,
    description: pkg.description,
    url: `${SITE_URL}/paquetes/${pkg.slug}`,
    touristType: "Paquete en bus cama desde Posadas",
    offers: Number.isFinite(numeric)
      ? {
          "@type": "Offer",
          priceCurrency: "USD",
          price: numeric,
          url: `${SITE_URL}/paquetes/${pkg.slug}`,
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };
}
