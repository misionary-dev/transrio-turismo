import type { SVGProps } from "react";

/**
 * Símbolo de círculos entrelazados Mastercard (colores de marca aproximados).
 * Colores de referencia públicos: rojo #EB001B, naranja #F79E1B.
 */
export function MastercardCirclesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 32 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Mastercard</title>
      <circle cx="12" cy="10" r="8" fill="#EB001B" />
      <circle cx="20" cy="10" r="8" fill="#F79E1B" fillOpacity={0.92} />
    </svg>
  );
}
