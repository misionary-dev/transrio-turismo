import type { PackageDetail } from "@/data/package-details";

/**
 * Helpers para derivar datos de presentación (título limpio, duración,
 * temporada, precio, imágenes) a partir de un `PackageDetail` crudo.
 * Se usan en las distintas variantes de card de la sección "Paquetes".
 */

export type Season = "Verano" | "Otoño" | "Invierno" | "Primavera";

/**
 * Imágenes a mostrar en la card. Por ahora devuelve siempre vacío a
 * propósito: hasta que lleguen las fotos definitivas de cada paquete, todas
 * las cards muestran el estado "Foto próximamente" (incluidas Camboriú,
 * Torres y Capão da Canoa, que tenían una foto del sitio viejo).
 */
export function getCardImages(pkg: PackageDetail): string[] {
  return pkg.images;
}

/** Nombre del destino sin el sufijo de duración ("— 10 días / 7 noches"). */
export function getDisplayTitle(pkg: PackageDetail): string {
  return pkg.destino.replace(/\s*—\s*\d+\s*d[ií]as[^—]*$/i, "").trim();
}

function parseDDMMYYYY(date: string): Date | null {
  const match = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
}

/** "N días / M noches", tomado del texto del template o calculado a partir de las fechas. */
export function getDurationLabel(pkg: PackageDetail): string {
  const haystack = `${pkg.destino} ${pkg.itinerario}`;
  const match = haystack.match(/(\d+)\s*d[ií]as?\D{0,15}?(\d+)\s*noches/i);
  if (match) return `${match[1]} días / ${match[2]} noches`;

  const first = pkg.fechas[0];
  if (first) {
    const start = parseDDMMYYYY(first.salida);
    const end = parseDDMMYYYY(first.regreso);
    if (start && end) {
      const nights = Math.round(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (nights > 0) return `${nights + 1} días / ${nights} noches`;
    }
  }
  return "";
}

/** Temporada (hemisferio sur) según el mes de la primera fecha de salida. */
export function getSeason(pkg: PackageDetail): Season | null {
  const first = pkg.fechas[0];
  if (!first) return null;
  const date = parseDDMMYYYY(first.salida);
  if (!date) return null;
  const month = date.getMonth() + 1; // 1-12

  if (month === 12 || month <= 2) return "Verano";
  if (month <= 5) return "Otoño";
  if (month <= 8) return "Invierno";
  return "Primavera";
}

/** Extrae el monto de "desde 455 USD hab cuádruple" → "USD 455" (sin la aclaración de habitación). */
export function getPriceAmount(pkg: PackageDetail): string {
  const match = pkg.precios.cocheCama.match(/desde\s+([\d.,]+)\s*USD/i);
  return match ? `USD ${match[1]}` : pkg.precios.cocheCama;
}
