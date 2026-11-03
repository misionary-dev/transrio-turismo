export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.transrioturismo.tur.ar"
).replace(/\/$/, "");

/** Token meta de Google Search Console (no borrar tras verificar). */
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
  "lf-dcdAcSA8EhFFZDmOMyP0kndCXEjS2V12KrYWHN4k";

export const SITE_NAME = "Transrio Turismo";

export const DEFAULT_TITLE =
  "Paquetes a Brasil en bus cama desde Posadas | Transrio";

export const DEFAULT_DESCRIPTION =
  "Operador turístico en Posadas, Misiones. Paquetes a Torres, Capão, Camboriú, Gramado y Termas en ómnibus cama Río Uruguay, con hotel y asistencia.";

export const GEO = {
  latitude: -27.402666,
  longitude: -55.919349,
} as const;
