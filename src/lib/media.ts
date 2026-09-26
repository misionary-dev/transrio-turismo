/** Base pública del bucket R2 `transrio`. */
export const MEDIA_BASE = (
  process.env.NEXT_PUBLIC_MEDIA_URL ??
  "https://media.transrio.misionary.dev"
).replace(/\/$/, "");

/** Key R2 → URL. Acepta `destinos/x.jpg` o `/destinos/x.jpg`. */
export function media(path: string) {
  const key = path.replace(/^\//, "");
  return `${MEDIA_BASE}/${key}`;
}
