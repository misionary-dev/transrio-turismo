"use client";

import { useEffect } from "react";

const INITIAL_DELAY_MS = 5000;
const QUIET_AFTER_INPUT_MS = 1200;
const MAX_WAIT_MS = 12000;

/**
 * gtm.js (y los tags que dispara: GA4, pixel, etc.) entra cuando el hilo
 * estuvo quieto. Un toque reprograma la carga para no sumarla al INP.
 * dataLayer sigue recibiendo eventos antes de que el script llegue.
 */
export function DeferredGtm({ id }: { id: string }) {
  useEffect(() => {
    let loaded = false;
    let timer = 0;
    const started = performance.now();

    const load = () => {
      if (loaded) return;
      loaded = true;
      window.clearTimeout(timer);
      const w = window as Window & { dataLayer?: object[] };
      w.dataLayer = w.dataLayer || [];
      const hasStart = w.dataLayer.some(
        (entry) =>
          !!entry &&
          typeof entry === "object" &&
          "event" in entry &&
          (entry as { event?: string }).event === "gtm.js",
      );
      if (!hasStart) {
        w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      }
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
      document.head.appendChild(script);
      window.removeEventListener("pointerdown", bump, true);
      window.removeEventListener("keydown", bump);
    };

    const arm = (delay: number) => {
      window.clearTimeout(timer);
      const remain = MAX_WAIT_MS - (performance.now() - started);
      const wait = Math.max(200, Math.min(delay, Math.max(remain, 200)));
      timer = window.setTimeout(load, wait);
    };

    const bump = () => {
      if (!loaded) arm(QUIET_AFTER_INPUT_MS);
    };

    arm(INITIAL_DELAY_MS);
    window.addEventListener("pointerdown", bump, { capture: true, passive: true });
    window.addEventListener("keydown", bump, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", bump, true);
      window.removeEventListener("keydown", bump);
    };
  }, [id]);

  return null;
}
