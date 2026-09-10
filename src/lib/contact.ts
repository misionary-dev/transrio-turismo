/** WhatsApp comercial Transrio (móvil). */
export const WHATSAPP_E164 = "5493764292909";

export const PHONES = {
  fijo: "+54 0376 459-6777",
  fijoTel: "+543764596777",
  movil: "+54 9 376 429-2909",
  movilTel: "+5493764292909",
} as const;

export const HOURS = "Lun–Vie 08:30 a 12:00 y 16:00 a 20:00";

export const ADDRESS = "Av. Quaranta 3837, Posadas, Misiones, Argentina";

export const ADDRESS_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(ADDRESS);

/** Embed de Google Maps para la ubicación de la agencia (Av. Quaranta 3837, Posadas). */
export const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d885.5341607372526!2d-55.919349170763304!3d-27.40266620830769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9457be8be4e37d51%3A0xdb94ee22bd2f6065!2sAvenida+Luis+Quaranta+3837%2C+Posadas%2C+Misi%C3%B3nes!5e0!3m2!1ses-419!2sar!4v1525651340026";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/transrioturismo",
  facebook: "https://www.facebook.com/transrioturismoevt/",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}

export function quoteMessage(opts?: {
  destination?: string;
  duration?: string;
}) {
  const destino = opts?.destination ?? "a consultar";
  const duracion = opts?.duration ?? "10 días / 7 noches — Enero–Febrero 2026";
  return [
    "Hola Transrio! Quiero cotizar un paquete:",
    `• Destino: ${destino}`,
    `• Duración: ${duracion}`,
    "¿Me pasan disponibilidad y precio?",
  ].join("\n");
}
