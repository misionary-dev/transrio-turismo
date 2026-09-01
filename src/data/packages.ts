export type Destination = {
  value: string;
  label: string;
  count: number;
};

export type Duration = {
  value: string;
  label: string;
  count: number;
};

export type Package = {
  slug: string;
  title: string;
  destination: string;
  duration: string;
  aside: string;
  price: string;
  excerpt: string;
  image: string;
};

export const destinations: Destination[] = [
  { value: "brasil", label: "Brasil", count: 3 },
  { value: "camboriu", label: "Camboriú", count: 1 },
  { value: "capao-da-canoa", label: "Capão da Canoa", count: 1 },
  { value: "torres", label: "Torres", count: 1 },
];

export const durations: Duration[] = [
  { value: "7-noches", label: "7 Noches", count: 3 },
  { value: "enero", label: "Enero", count: 3 },
  { value: "febrero", label: "Febrero", count: 3 },
];

export const packages: Package[] = [
  {
    slug: "camboriu",
    title: "Camboriú (SC) — 2026",
    destination: "Brasil · Camboriú",
    duration: "10 días · 7 noches",
    aside: "Oferta especial",
    price: "¡Consulta!",
    excerpt:
      "Salidas todos los lunes 15 hs. Enero y febrero. Marzo y abril consultar.",
    image:
      "https://www.transrioturismo.tur.ar/travel/wp-content/uploads/2025/09/camboriu1-800x600.png",
  },
  {
    slug: "torres",
    title: "Torres (RS) — 2026",
    destination: "Brasil · Torres",
    duration: "10 días · 7 noches",
    aside: "Oferta especial",
    price: "¡Consulta!",
    excerpt:
      "Salidas todos los lunes 15 hs. Enero y febrero. Semana Santa consultar.",
    image:
      "https://www.transrioturismo.tur.ar/travel/wp-content/uploads/2018/04/torresguarita-800x600.jpg",
  },
  {
    slug: "capao-canoa",
    title: "Capão da Canoa (RS) — 2026",
    destination: "Brasil · Capão da Canoa",
    duration: "10 días · 7 noches",
    aside: "Oferta especial",
    price: "¡Consulta!",
    excerpt: "Salidas todos los lunes 15 hs. Enero y febrero disponibles.",
    image:
      "https://www.transrioturismo.tur.ar/travel/wp-content/uploads/2018/04/capaodacanoa-800x600.jpg",
  },
];
