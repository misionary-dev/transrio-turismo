/** WhatsApp comercial Transrio (móvil). */
export const WHATSAPP_E164 = "5493764292909";

export const PHONES = {
  fijo: "+54 0376 459-6777",
  fijoTel: "+543764596777",
  movil: "+54 9 376 429-2909",
  movilTel: "+5493764292909",
} as const;

export const HOURS = "Lun–Vie 08:30 a 12:00 y 16:00 a 20:00";

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
