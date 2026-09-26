export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://transrio.misionary.dev"
).replace(/\/$/, "");

export const SITE_NAME = "Transrio Turismo";

export const DEFAULT_TITLE =
  "Paquetes a Brasil en bus cama desde Posadas | Transrio";

export const DEFAULT_DESCRIPTION =
  "Operador turístico en Posadas, Misiones. Paquetes a Torres, Capão, Camboriú, Gramado y Termas en ómnibus cama Río Uruguay, con hotel y asistencia.";

export const GEO = {
  latitude: -27.402666,
  longitude: -55.919349,
} as const;
