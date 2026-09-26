/**
 * Ficha completa de cada paquete de viaje, según el template
 * "Transrio_Template_Paquetes_Viaje" (Word) que arma el equipo comercial.
 *
 * Este archivo TODAVÍA NO se consume en ninguna pantalla — es el modelo de
 * datos que vamos a usar más adelante para generar el JSON real de paquetes
 * (páginas de detalle, filtros, etc). El objetivo hoy es dejar tipado y
 * cargado todo lo que el template trae, para no perder información.
 *
 * Pendientes:
 * - `images`: destinos locales en /public/destinos (no reusar el WP).
 * - `description`: el template NO tiene este campo. Escribí un borrador para
 *   cada paquete a partir del resto de la info (destino, hotel, itinerario)
 *   — hay que revisarlos/ajustarlos con el equipo comercial antes de publicar.
 */

/** Un tramo de salida/regreso, formato DD/MM/YYYY tal cual figura en el template. */
export type DepartureDate = {
  salida: string;
  regreso: string;
};

/** Política para un rango etario de menores. `null` = "-" (no aplica / no informado). */
export type ChildPolicy = {
  rango: "0-3 años" | "4-5 años" | "6+ años";
  detalle: string | null;
};

export type PackageDetail = {
  /** Identificador único, kebab-case. No siempre coincide con el slug de `packages.ts`. */
  slug: string;

  /** Nombre del destino tal cual aparece en el template (puede incluir duración, ej. "10 días / 7 noches"). */
  destino: string;

  /** Ciudad de salida del colectivo. */
  origen: string;

  /**
   * Borrador de bajada comercial — campo agregado, no viene del template.
   * Revisar antes de publicar.
   */
  description: string;

  /** Uno o más tramos de fecha de salida/regreso (algunos paquetes tienen varias salidas fijas). */
  fechas: DepartureDate[];

  precios: {
    /** Valor por persona en coche cama. Texto libre tal cual el template (moneda mixta ARS/USD según paquete). */
    cocheCama: string;
    /** Valor por persona en coche semi cama. "-" cuando no se ofrece. */
    cocheSemiCama: string;
  };

  comidasIncluidas: string;

  alojamiento: {
    /** Categoría / nombre del hotel. */
    hotel: string;
    /** Ubicación / referencia de cercanía informada en "¿Incluye Hotel? Dónde". */
    ubicacion: string;
  };

  menores: ChildPolicy[];

  /**
   * Itinerario día por día, tal cual el texto del template (incluye la
   * duración "X días / Y noches" cuando el template la puso acá en vez de
   * en `destino`).
   */
  itinerario: string;

  documentacionRequerida: string;

  coberturaMedica: {
    incluida: boolean;
    proveedor: string | null;
    /** Ej. "USD 25.000". Vacío si el template no lo especificó. */
    monto: string | null;
  };

  politicaCancelacion: string;

  /** Pendiente — se van a cargar cuando lleguen las imágenes de cada paquete. */
  images: string[];
};

export const packageDetails: PackageDetail[] = [
  {
    slug: "gramado-canela",
    destino: "Gramado y Canela",
    origen: "Posadas",
    description:
      "Escapada a la Serra Gaúcha: paisajes de montaña, gastronomía típica y las calles con encanto europeo de Gramado y Canela. Salida nocturna en bus cama desde Posadas, alojamiento con desayuno a metros de la Rua Coberta y días libres para recorrer a tu ritmo.",
    fechas: [{ salida: "09/12/2026", regreso: "14/12/2026" }],
    precios: {
      cocheCama: "desde 455 USD hab cuádruple",
      cocheSemiCama: "-",
    },
    comidasIncluidas:
      "Cena a bordo de ida — Almuerzo de regreso en parador de ruta (sin bebidas)",
    alojamiento: {
      hotel: "Hotel 3*** Laghetto Toscana c/desayuno",
      ubicacion:
        "En el centro de Gramado, a solo 650 metros de la Rua Coberta.",
    },
    menores: [
      {
        rango: "0-3 años",
        detalle:
          "Menor hasta 12 años: alojamiento sin cargo compartiendo con 2 adultos. Abona solo pasaje + asistencia médica (USD 253).",
      },
      { rango: "4-5 años", detalle: null },
      { rango: "6+ años", detalle: null },
    ],
    itinerario:
      "Salida nocturna desde Posadas con cena a bordo.\n" +
      "Día 2: Desayuno a bordo y llegada a Gramado y alojamiento.\n" +
      "Día 3: City tour por Gramado y Canela, recorriendo sus principales atractivos.\n" +
      "Día 4: Día libre para disfrutar de la ciudad o realizar excursiones opcionales.\n" +
      "Día 5: Día libre.\n" +
      "Día 6: Desayuno, check-out y regreso a Posadas con almuerzo en ruta incluido.",
    documentacionRequerida: "DNI último ejemplar vigente",
    coberturaMedica: {
      incluida: true,
      proveedor: "Universal Assistance",
      monto: "USD 25.000",
    },
    politicaCancelacion:
      "+45 días: 90% reintegro / 100% voucher\n" +
      "45 a 30 días: 75% / 90% voucher\n" +
      "30 a 15 días: 50% / 75% voucher\n" +
      "15 a 7 días: 25%\n" +
      "Menos de 7 días: sin reintegro\n" +
      "Señas o pagos hasta el 30%: sin reintegro ni reprogramación.",
    images: [
      "/destinos/gramado-lago-2.jpg",
      "/destinos/canela-2023.jpg",
      "/destinos/gramado-plaza.jpg",
      "/destinos/gramado-lago-negro.jpg",
    ],
  },
  {
    slug: "capao-da-canoa",
    destino: "Capão da Canoa — 10 días / 7 noches",
    origen: "Posadas",
    description:
      "10 días de sol y playa en Capão da Canoa, con salidas semanales en enero y febrero. Hoteles bien ubicados a pasos del centro y muy cerca de la playa, con cena incluida ida y vuelta.",
    fechas: [
      { salida: "04/01/2027", regreso: "12/01/2027" },
      { salida: "11/01/2027", regreso: "19/01/2027" },
      { salida: "18/01/2027", regreso: "26/01/2027" },
      { salida: "25/01/2027", regreso: "02/02/2027" },
      { salida: "01/02/2027", regreso: "09/02/2027" },
      { salida: "08/02/2027", regreso: "16/02/2027" },
      { salida: "15/02/2027", regreso: "23/02/2027" },
      { salida: "22/02/2027", regreso: "02/03/2027" },
    ],
    precios: {
      cocheCama: "desde 560 USD hab cuádruple",
      cocheSemiCama: "-",
    },
    comidasIncluidas: "Cena a bordo de ida — cena de regreso",
    alojamiento: {
      hotel: "Hotel 2** y 3*** c/desayuno",
      ubicacion:
        "Hoteles con excelente ubicación c/ desayuno, a pasos del centro y muy cerca de la playa.",
    },
    menores: [
      { rango: "0-3 años", detalle: null },
      { rango: "4-5 años", detalle: null },
      { rango: "6+ años", detalle: null },
    ],
    itinerario: "10 días - 7 noches",
    documentacionRequerida: "DNI último ejemplar",
    coberturaMedica: {
      incluida: true,
      proveedor: "Universal Assistance",
      monto: "USD 25.000",
    },
    politicaCancelacion:
      "+45 días: 90% reintegro / 100% voucher\n" +
      "45 a 30 días: 75% / 90% voucher\n" +
      "30 a 15 días: 50% / 75% voucher\n" +
      "15 a 7 días: 25%\n" +
      "Menos de 7 días: sin reintegro\n" +
      "Señas o pagos hasta el 30%: sin reintegro ni reprogramación.",
    images: [
      "/destinos/capao-orla.jpg",
      "/destinos/capao-praia.jpg",
      "/destinos/capao-farol.jpg",
      "/destinos/capao-navegantes.jpg",
    ],
  },
  {
    slug: "torres",
    destino: "Torres",
    origen: "Posadas",
    description:
      "10 días en Torres, uno de los balnearios más lindos de Río Grande do Sul. Alojamiento en pleno centro, a pocos minutos caminando de la playa, con salidas semanales en enero y febrero.",
    fechas: [
      { salida: "04/01/2027", regreso: "12/01/2027" },
      { salida: "11/01/2027", regreso: "19/01/2027" },
      { salida: "18/01/2027", regreso: "26/01/2027" },
      { salida: "25/01/2027", regreso: "02/02/2027" },
      { salida: "01/02/2027", regreso: "09/02/2027" },
      { salida: "08/02/2027", regreso: "16/02/2027" },
      { salida: "15/02/2027", regreso: "23/02/2027" },
      { salida: "22/02/2027", regreso: "02/03/2027" },
    ],
    precios: {
      cocheCama: "desde 603 USD hab dble",
      cocheSemiCama: "-",
    },
    comidasIncluidas: "Cena a bordo de ida — cena de regreso",
    alojamiento: {
      hotel: "Hotel Life 3*** c/desayuno",
      ubicacion:
        "Excelente ubicación en pleno centro de Torres, a pocos minutos caminando de la playa.",
    },
    menores: [
      { rango: "0-3 años", detalle: null },
      { rango: "4-5 años", detalle: null },
      { rango: "6+ años", detalle: null },
    ],
    itinerario: "10 días - 7 noches",
    documentacionRequerida: "DNI último ejemplar vigente",
    coberturaMedica: {
      incluida: true,
      proveedor: "Universal Assistance",
      // El template no informó un monto para este paquete puntual.
      monto: null,
    },
    politicaCancelacion:
      "+45 días: 90% reintegro / 100% voucher\n" +
      "45 a 30 días: 75% / 90% voucher\n" +
      "30 a 15 días: 50% / 75% voucher\n" +
      "15 a 7 días: 25%\n" +
      "Menos de 7 días: sin reintegro\n" +
      "Señas o pagos hasta el 30%: sin reintegro ni reprogramación.",
    images: [
      "/destinos/torres-guarita-aereo.jpg",
      "/destinos/torres-ciudad-aereo.jpg",
      "/destinos/torres-guarita.jpg",
      "/destinos/torres-guarita-ciudad.jpg",
    ],
  },
  {
    slug: "florianopolis-canasvieiras",
    destino: "Florianópolis — Canasvieiras — 10 días / 7 noches",
    origen: "Posadas",
    description:
      "10 días frente al mar en Canasvieiras, Florianópolis. Hotel con acceso directo a la playa y a pasos de restaurantes y comercios, con salidas semanales en enero y febrero.",
    fechas: [
      { salida: "04/01/2027", regreso: "12/01/2027" },
      { salida: "11/01/2027", regreso: "19/01/2027" },
      { salida: "18/01/2027", regreso: "26/01/2027" },
      { salida: "25/01/2027", regreso: "02/02/2027" },
      { salida: "01/02/2027", regreso: "09/02/2027" },
      { salida: "08/02/2027", regreso: "16/02/2027" },
      { salida: "15/02/2027", regreso: "23/02/2027" },
      { salida: "22/02/2027", regreso: "02/03/2027" },
    ],
    precios: {
      cocheCama: "desde 792 USD hab triple",
      cocheSemiCama: "-",
    },
    comidasIncluidas: "Cena a bordo de ida — cena de regreso",
    alojamiento: {
      hotel: "Hotel Palace I 3*** c/desayuno",
      ubicacion:
        "Ubicado sobre Rua José Daux 848, en pleno Canasvieiras. Está frente al mar, con acceso directo a la playa, y muy cerca de restaurantes y comercios de la zona.",
    },
    menores: [
      { rango: "0-3 años", detalle: null },
      { rango: "4-5 años", detalle: null },
      { rango: "6+ años", detalle: null },
    ],
    itinerario: "10 días - 7 noches",
    documentacionRequerida: "DNI último ejemplar",
    coberturaMedica: {
      incluida: true,
      proveedor: "Universal Assistance",
      monto: "USD 25.000",
    },
    politicaCancelacion:
      "+45 días: 90% reintegro / 100% voucher\n" +
      "45 a 30 días: 75% / 90% voucher\n" +
      "30 a 15 días: 50% / 75% voucher\n" +
      "15 a 7 días: 25%\n" +
      "Menos de 7 días: sin reintegro\n" +
      "Señas o pagos hasta el 30%: sin reintegro ni reprogramación.",
    images: ["/destinos/canasvieiras.jpg"],
  },
  {
    slug: "camboriu",
    destino: "Camboriú — 10 días / 7 noches",
    origen: "Posadas",
    description:
      "10 días en Balneário Camboriú, la playa más elegida de Santa Catarina. Hoteles en pleno centro, sobre o muy cerca de Av. Brasil, a pocos metros de la playa.",
    fechas: [
      { salida: "04/01/2027", regreso: "12/01/2027" },
      { salida: "11/01/2027", regreso: "19/01/2027" },
      { salida: "18/01/2027", regreso: "26/01/2027" },
      { salida: "25/01/2027", regreso: "02/02/2027" },
      { salida: "01/02/2027", regreso: "09/02/2027" },
      { salida: "08/02/2027", regreso: "16/02/2027" },
      { salida: "15/02/2027", regreso: "23/02/2027" },
      { salida: "22/02/2027", regreso: "02/03/2027" },
    ],
    precios: {
      cocheCama: "desde 640 USD hab cuádruple",
      cocheSemiCama: "-",
    },
    comidasIncluidas: "Cena a bordo de ida — cena de regreso",
    alojamiento: {
      hotel: "Hotel 3*** y 4**** c/desayuno",
      ubicacion:
        "Los hoteles están ubicados en pleno centro de Balneário Camboriú, sobre o muy cerca de Av. Brasil, con excelente acceso a comercios, restaurantes y a pocos metros de la playa.",
    },
    menores: [
      { rango: "0-3 años", detalle: null },
      { rango: "4-5 años", detalle: null },
      { rango: "6+ años", detalle: null },
    ],
    itinerario: "10 días - 7 noches",
    documentacionRequerida: "DNI último ejemplar",
    coberturaMedica: {
      incluida: true,
      proveedor: "Universal Assistance",
      monto: "USD 25.000",
    },
    politicaCancelacion:
      "+45 días: 90% reintegro / 100% voucher\n" +
      "45 a 30 días: 75% / 90% voucher\n" +
      "30 a 15 días: 50% / 75% voucher\n" +
      "15 a 7 días: 25%\n" +
      "Menos de 7 días: sin reintegro\n" +
      "Señas o pagos hasta el 30%: sin reintegro ni reprogramación.",
    images: [
      "/destinos/camboriu-atardecer.jpg",
      "/destinos/camboriu-cristo.jpg",
      "/destinos/camboriu-skyline-2.jpg",
      "/destinos/camboriu-playa.jpg",
      "/destinos/camboriu-skyline.jpg",
    ],
  },
  {
    slug: "gramado-canela-semana-santa",
    destino: "Gramado y Canela — Semana Santa",
    origen: "Posadas",
    description:
      "La magia de Gramado y Canela para Semana Santa: salida nocturna con cena a bordo, city tour incluido y días libres para disfrutar la ciudad o sumar excursiones opcionales.",
    fechas: [{ salida: "24/03/2027", regreso: "29/03/2027" }],
    precios: {
      cocheCama: "desde 470 USD hab cuádruple",
      cocheSemiCama: "-",
    },
    comidasIncluidas:
      "Cena a bordo de ida — Almuerzo de regreso en parador de ruta (sin bebidas)",
    alojamiento: {
      hotel: "Hotel 3*** Laghetto Toscana c/desayuno",
      ubicacion:
        "En el centro de Gramado, a solo 650 metros de la Rua Coberta.",
    },
    menores: [
      {
        rango: "0-3 años",
        detalle:
          "Menor hasta 12 años: alojamiento sin cargo compartiendo con 2 adultos. Abona solo pasaje + asistencia médica (USD 253).",
      },
      { rango: "4-5 años", detalle: null },
      { rango: "6+ años", detalle: null },
    ],
    itinerario:
      "6 días - 4 noches. Salida nocturna desde Posadas con cena a bordo.\n" +
      "Día 2: Desayuno a bordo y llegada a Gramado y alojamiento.\n" +
      "Día 3: City tour por Gramado y Canela, recorriendo sus principales atractivos.\n" +
      "Día 4: Día libre para disfrutar de la ciudad o realizar excursiones opcionales.\n" +
      "Día 5: Día libre.\n" +
      "Día 6: Desayuno, check-out y regreso a Posadas con almuerzo en ruta incluido.",
    documentacionRequerida: "DNI último ejemplar",
    coberturaMedica: {
      incluida: true,
      proveedor: "Universal Assistance",
      monto: "USD 25.000",
    },
    politicaCancelacion:
      "+45 días: 90% reintegro / 100% voucher\n" +
      "45 a 30 días: 75% / 90% voucher\n" +
      "30 a 15 días: 50% / 75% voucher\n" +
      "15 a 7 días: 25%\n" +
      "Menos de 7 días: sin reintegro\n" +
      "Señas o pagos hasta el 30%: sin reintegro ni reprogramación.",
    images: [
      "/destinos/canela-iglesia.jpg",
      "/destinos/canela-lourdes.jpg",
      "/destinos/gramado-joaquina.jpg",
      "/destinos/gramado-plaza.jpg",
    ],
  },
  {
    slug: "termas-romanas",
    destino: "Termas Romanas — Restinga Sêca, Rio Grande do Sul, Brasil",
    origen: "Posadas",
    description:
      "5 días de relax en Termas Romanas, Recanto Maestro (Río Grande do Sul), con pensión completa y aguas termales en medio de la naturaleza.",
    fechas: [{ salida: "24/03/2027", regreso: "28/03/2027" }],
    precios: {
      cocheCama: "desde 615 USD hab dble",
      cocheSemiCama: "-",
    },
    comidasIncluidas: "Cena a bordo de ida — Almuerzo de regreso",
    alojamiento: {
      hotel:
        "Hotel Resort Termas Romanas Recanto Maestro c/pensión completa (sin bebidas)",
      ubicacion:
        "Recanto Maestro, en el estado de Rio Grande do Sul, Brasil, cerca de São João do Polêsine.",
    },
    menores: [
      { rango: "0-3 años", detalle: null },
      { rango: "4-5 años", detalle: null },
      { rango: "6+ años", detalle: null },
    ],
    itinerario: "5 días - 3 noches",
    documentacionRequerida: "DNI último ejemplar vigente",
    coberturaMedica: {
      incluida: true,
      proveedor: "Universal Assistance",
      monto: "USD 25.000",
    },
    politicaCancelacion:
      "+45 días: 90% reintegro / 100% voucher\n" +
      "45 a 30 días: 75% / 90% voucher\n" +
      "30 a 15 días: 50% / 75% voucher\n" +
      "15 a 7 días: 25%\n" +
      "Menos de 7 días: sin reintegro\n" +
      "Señas o pagos hasta el 30%: sin reintegro ni reprogramación.",
    images: [
      "/destinos/termas-piscina.jpg",
      "/destinos/termas-spa.jpg",
      "/destinos/termas-parque.jpg",
      "/destinos/termas-piramide.jpg",
    ],
  },
];
