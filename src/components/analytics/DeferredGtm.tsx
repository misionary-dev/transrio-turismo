"use client";

import { useEffect } from "react";

const IDLE_TIMEOUT_MS = 2500;

type Scheduler = { yield?: () => Promise<void> };

/**
 * gtm.js entra en el primer hueco después del load (tope ~2,5 s) o en el
 * primer gesto, lo que ocurra antes. La inyección queda fuera del turno
 * del evento para no sumarla al INP. Así el page_view de GA4 sale dentro
 * de los primeros ~3 s y los rebotes cortos no se pierden.
 */
export function DeferredGtm({ id }: { id: string }) {
  useEffect(() => {
    let loaded = false;
    let cancelled = false;
    let idleId = 0;
    let timer = 0;

    const load = () => {
      if (cancelled || loaded) return;
      loaded = true;
      cancelScheduled();
      detachGesture();
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
    };

    const afterPaint = (fn: () => void) => {
      const scheduler = (globalThis as { scheduler?: Scheduler }).scheduler;
      if (typeof scheduler?.yield === "function") {
        void scheduler.yield().then(fn);
        return;
      }
      if (typeof requestAnimationFrame === "function") {
        requestAnimationFrame(() => {
          setTimeout(fn, 0);
        });
        return;
      }
      setTimeout(fn, 0);
    };

    const cancelScheduled = () => {
      if (idleId) window.cancelIdleCallback?.(idleId);
      idleId = 0;
      window.clearTimeout(timer);
      timer = 0;
    };

    const onGesture = () => {
      detachGesture();
      cancelScheduled();
      afterPaint(load);
    };

    function detachGesture() {
      window.removeEventListener("pointerdown", onGesture, true);
      window.removeEventListener("keydown", onGesture);
    }

    const scheduleIdle = () => {
      if (loaded) return;
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => afterPaint(load), {
          timeout: IDLE_TIMEOUT_MS,
        });
        return;
      }
      timer = window.setTimeout(() => afterPaint(load), IDLE_TIMEOUT_MS);
    };

    window.addEventListener("pointerdown", onGesture, {
      capture: true,
      passive: true,
    });
    window.addEventListener("keydown", onGesture, { passive: true });

    if (document.readyState === "complete") scheduleIdle();
    else window.addEventListener("load", scheduleIdle, { once: true });

    return () => {
      cancelled = true;
      cancelScheduled();
      detachGesture();
      window.removeEventListener("load", scheduleIdle);
    };
  }, [id]);

  return null;
}
