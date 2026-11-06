export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.transrioturismo.tur.ar"
).replace(/\/$/, "");

/** Token meta de Google Search Console (no borrar tras verificar). */
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
  "lf-dcdAcSA8EhFFZDmOMyP0kndCXEjS2V12KrYWHN4k";

export const SITE_NAME = "Transrio Turismo";

export const DEFAULT_TITLE =
  "Camboriú verano 2027 en bus cama desde Posadas | Transrio";

export const DEFAULT_DESCRIPTION =
  "Camboriú te espera: 7 noches, bus cama Río Uruguay y hoteles 3 y 4 estrellas, salidas todos los lunes del verano. 3 o 6 cuotas sin interés con Visa o Mastercard. También Torres, Capão, Gramado y más desde Posadas.";

export const GEO = {
  latitude: -27.402666,
  longitude: -55.919349,
} as const;
