import type { ComponentType } from "react";
import {
  Egg,
  Flower2,
  Gift,
  Globe,
  Heart,
  PartyPopper,
  Sparkles,
  Sun,
  Tag,
  Zap,
} from "lucide-react";
import { MateIcon } from "@/components/icons/MateIcon";
import { whatsappUrl } from "@/lib/contact";

/**
 * Calendario de campañas del sitio. Fechas en hora Argentina (UTC-3);
 * `end` es exclusivo: la campaña deja de verse en ese instante.
 */
export type Campaign = {
  id: string;
  start: string;
  end: string;
  /** Texto del badge en el hero del home. */
  label: string;
  /** Tooltip del ícono en el header. */
  title: string;
  color: string;
  /** Imagen en R2 (key) o ícono; si hay imagen, tiene prioridad. */
  image?: { key: string; ratio: string; alt: string };
  icon?: ComponentType<{ className?: string }>;
  href?: string;
  /** Tinte de fondo del home (solo la campaña activa de mayor prioridad). */
  tint?: string;
};

const wa = (message: string) => whatsappUrl(`Hola Transrio! ${message}`);

export const CAMPAIGNS: Campaign[] = [
  {
    id: "octubre-rosa-2026",
    start: "2026-10-01T00:00:00-03:00",
    end: "2026-11-01T00:00:00-03:00",
    label: "Octubre Rosa · La detección temprana salva vidas",
    title: "Octubre Rosa: mes de concientización sobre el cáncer de mama",
    color: "#ff6699",
    image: {
      key: "/campanas/octubre-rosa/lazo-rosa.png",
      ratio: "307/384",
      alt: "Lazo rosa — Octubre Rosa, concientización sobre el cáncer de mama",
    },
    href: "https://www.argentina.gob.ar/salud/instituto-nacional-del-cancer/institucional/pncm",
    tint: "255,102,153",
  },
  {
    id: "dia-de-la-madre-2026",
    start: "2026-10-05T00:00:00-03:00",
    end: "2026-10-19T00:00:00-03:00",
    label: "Día de la Madre · Regalale un viaje a mamá",
    title: "Día de la Madre — domingo 18 de octubre",
    color: "#e11d74",
    icon: Heart,
    href: wa("Quiero regalarle un viaje a mamá por el Día de la Madre."),
  },
  {
    id: "semana-cyber-2026",
    start: "2026-11-02T00:00:00-03:00",
    end: "2026-11-09T00:00:00-03:00",
    label: "Semana Cyber · Asegurá tu verano en Brasil",
    title: "Semana Cyber — del 2 al 8 de noviembre",
    color: "#2563eb",
    icon: Zap,
    href: wa("Vi la Semana Cyber y quiero reservar mi verano en Brasil."),
  },
  {
    id: "black-friday-2026",
    start: "2026-11-27T00:00:00-03:00",
    end: "2026-12-01T00:00:00-03:00",
    label: "Black Friday · Reservá tu verano 2027",
    title: "Black Friday — del 27 al 30 de noviembre",
    color: "#111111",
    icon: Tag,
    href: wa("Vi el Black Friday y quiero reservar mi verano 2027."),
  },
  {
    id: "dia-del-mate-2026",
    start: "2026-11-28T00:00:00-03:00",
    end: "2026-12-01T00:00:00-03:00",
    label: "30/11 · Día Nacional del Mate, orgullo misionero",
    title: "Día Nacional del Mate y natalicio de Andresito Guacurarí",
    color: "#4d7c0f",
    icon: MateIcon,
  },
  {
    id: "navidad-2026",
    start: "2026-12-07T00:00:00-03:00",
    end: "2026-12-26T00:00:00-03:00",
    label: "Felices fiestas · Esta Navidad regalá un viaje",
    title: "Navidad 2026",
    color: "#b91c1c",
    icon: Gift,
    href: wa("Quiero regalar un viaje esta Navidad."),
    tint: "250,204,21",
  },
  {
    id: "anio-nuevo-reyes-2027",
    start: "2026-12-26T00:00:00-03:00",
    end: "2027-01-07T00:00:00-03:00",
    label: "¡Feliz 2027! · Que los Reyes te traigan un viaje",
    title: "Año Nuevo y Reyes",
    color: "#ca8a04",
    icon: Sparkles,
    href: wa("Quiero arrancar el 2027 con un viaje."),
  },
  {
    id: "verano-2027",
    start: "2027-01-07T00:00:00-03:00",
    end: "2027-02-01T00:00:00-03:00",
    label: "Verano 2027 · Salidas semanales a Brasil",
    title: "Temporada de verano en Brasil",
    color: "#ea580c",
    icon: Sun,
    href: "/paquetes",
  },
  {
    id: "carnaval-2027",
    start: "2027-02-01T00:00:00-03:00",
    end: "2027-02-10T00:00:00-03:00",
    label: "Carnaval 2027 · Viví el finde largo en Brasil",
    title: "Carnaval — lunes 8 y martes 9 de febrero",
    color: "#9333ea",
    icon: PartyPopper,
    href: wa("Quiero viajar a Brasil para el finde largo de Carnaval."),
    tint: "168,85,247",
  },
  {
    id: "san-valentin-2027",
    start: "2027-02-10T00:00:00-03:00",
    end: "2027-02-15T00:00:00-03:00",
    label: "San Valentín · Una escapada en pareja",
    title: "San Valentín — 14 de febrero",
    color: "#e11d48",
    icon: Heart,
    href: wa("Quiero armar una escapada en pareja por San Valentín."),
  },
  {
    id: "semana-santa-2027",
    start: "2027-03-08T00:00:00-03:00",
    end: "2027-03-29T00:00:00-03:00",
    label: "Semana Santa 2027 · Gramado y Canela",
    title: "Semana Santa — del 25 al 28 de marzo",
    color: "#7c3aed",
    icon: Egg,
    href: "/paquetes/gramado-canela-semana-santa",
  },
  {
    id: "dia-del-padre-2027",
    start: "2027-06-07T00:00:00-03:00",
    end: "2027-06-21T00:00:00-03:00",
    label: "Día del Padre · Regalale un viaje a papá",
    title: "Día del Padre — domingo 20 de junio",
    color: "#0369a1",
    icon: Gift,
    href: wa("Quiero regalarle un viaje a papá por el Día del Padre."),
  },
  {
    id: "primavera-2027",
    start: "2027-09-14T00:00:00-03:00",
    end: "2027-09-22T00:00:00-03:00",
    label: "Día de la Primavera · Viajá con tu grupo",
    title: "Día de la Primavera y del Estudiante — 21 de septiembre",
    color: "#16a34a",
    icon: Flower2,
    href: "/salida-grupal",
    tint: "250,204,21",
  },
  {
    id: "dia-mundial-turismo-2027",
    start: "2027-09-27T00:00:00-03:00",
    end: "2027-09-28T00:00:00-03:00",
    label: "27/9 · Día Mundial del Turismo",
    title: "Día Mundial del Turismo",
    color: "#0284c7",
    icon: Globe,
    href: "/paquetes",
  },
];

/** IDs activos unidos por coma: string estable para comparar snapshots. */
export function activeCampaignKey(now = Date.now()) {
  return CAMPAIGNS.filter(
    (c) => now >= Date.parse(c.start) && now < Date.parse(c.end),
  )
    .map((c) => c.id)
    .join(",");
}

export function campaignsFromKey(key: string) {
  const ids = new Set(key.split(",").filter(Boolean));
  return CAMPAIGNS.filter((c) => ids.has(c.id));
}
