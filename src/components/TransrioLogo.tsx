import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** `dark` = pie/fondos oscuros: el negro del lockup pasa a blanco y el rojo se conserva. */
  variant?: "light" | "dark";
};

export function TransrioLogo({ className, variant = "light" }: Props) {
  return (
    // SVG local (fondo transparente). El PNG de R2 trae placa blanca.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-transrio.svg"
      alt="Transrio Turismo"
      width={240}
      height={64}
      className={cn(
        "h-11 w-auto max-w-[200px] object-contain object-left",
        variant === "dark" && "[filter:invert(1)_hue-rotate(180deg)_saturate(1.35)]",
        className,
      )}
    />
  );
}
