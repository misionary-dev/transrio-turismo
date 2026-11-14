"use client";

import { useEffect, useRef } from "react";

type Variant = "hero" | "about" | "group";

/** Carga GSAP en un hueco del hilo, fuera del bundle inicial de la ruta. */
export function IdleGsap({ variant }: { variant: Variant }) {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = markerRef.current?.parentElement;
    if (!root) return;
    let revert = () => {};
    let cancel = false;

    const start = () => {
      void import("./gsap-runs").then(({ runGsap }) => {
        if (cancel) return;
        revert = runGsap(variant, root);
      });
    };

    const idle = window.requestIdleCallback?.(start, { timeout: 250 });
    const timer = idle === undefined ? window.setTimeout(start, 400) : 0;

    return () => {
      cancel = true;
      if (idle !== undefined) window.cancelIdleCallback?.(idle);
      window.clearTimeout(timer);
      revert();
    };
  }, [variant]);

  return <span ref={markerRef} className="hidden" />;
}
