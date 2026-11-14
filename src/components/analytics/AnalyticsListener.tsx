"use client";

import { useEffect, useRef } from "react";
import { GA_EVENTS } from "@/lib/analytics";
import { trackEvent, trackItem, type GaItem } from "@/components/analytics/track";
import { yieldToMain } from "@/lib/yield";

function textOf(el: Element | null, max = 80): string {
  if (!el) return "";
  const raw =
    el.getAttribute("aria-label") ||
    el.getAttribute("title") ||
    el.textContent ||
    "";
  return raw.replace(/\s+/g, " ").trim().slice(0, max);
}

function closestInteractive(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest(
    "a[href], button, [role='button'], input[type='submit'], input[type='button'], summary",
  ) as HTMLElement | null;
}

function classifyLink(href: string, host: string) {
  const lower = href.toLowerCase();
  if (
    lower.startsWith("https://wa.me/") ||
    lower.startsWith("https://api.whatsapp.com/") ||
    lower.includes("whatsapp.com/send")
  ) {
    return { event: GA_EVENTS.whatsapp, method: "whatsapp" as const };
  }
  if (lower.startsWith("tel:")) {
    return { event: GA_EVENTS.phone, method: "phone" as const };
  }
  if (lower.startsWith("mailto:")) {
    return { event: GA_EVENTS.email, method: "email" as const };
  }
  if (
    lower.includes("instagram.com") ||
    lower.includes("facebook.com") ||
    lower.includes("fb.com")
  ) {
    return { event: GA_EVENTS.social, method: "social" as const };
  }
  if (
    lower.includes("google.com/maps") ||
    lower.includes("maps.google.") ||
    lower.includes("goo.gl/maps")
  ) {
    return { event: GA_EVENTS.map, method: "map" as const };
  }
  try {
    const url = new URL(href, `https://${host}`);
    if (url.hostname !== host && !url.hostname.endsWith(`.${host}`)) {
      return { event: GA_EVENTS.outbound, method: "outbound" as const };
    }
  } catch {
    /* ignore invalid */
  }
  return null;
}

function packageSlugFromPath(pathname: string): string | undefined {
  const m = pathname.match(/^\/paquetes\/([^/?#]+)/);
  return m?.[1];
}

function itemFrom(el: HTMLElement): GaItem | null {
  const price = Number(el.dataset.analyticsPrice);
  const itemId = el.dataset.analyticsItemId;
  const itemName = el.dataset.analyticsItemName;
  const itemCategory = el.dataset.analyticsItemCategory;
  if (!itemId || !itemName || !itemCategory || !Number.isFinite(price)) return null;
  return {
    item_id: itemId,
    item_name: itemName,
    price,
    item_category: itemCategory,
  };
}

/**
 * Clics de conversión marcados con data-analytics, más enlaces especiales
 * (WhatsApp, teléfono, mail, redes, mapa). El texto visible no decide el evento.
 */
export function AnalyticsListener() {
  const lastKey = useRef("");
  const lastAt = useRef(0);
  const formsStarted = useRef(new WeakSet<HTMLFormElement>());

  useEffect(() => {
    const dedupe = (key: string) => {
      const now = Date.now();
      if (key === lastKey.current && now - lastAt.current < 400) return true;
      lastKey.current = key;
      lastAt.current = now;
      return false;
    };

    const runClick = (target: EventTarget | null, button: number, prevented: boolean) => {
      if (prevented) return;
      if (button !== 0 && button !== 1) return;

      const el = closestInteractive(target);
      if (!el) return;

      const label =
        el.dataset.analyticsLabel || textOf(el) || el.tagName.toLowerCase();
      const location =
        el.dataset.analyticsLocation ||
        el.closest("[data-analytics-section]")?.getAttribute(
          "data-analytics-section",
        ) ||
        undefined;
      const path = window.location.pathname;

      if (el instanceof HTMLAnchorElement && el.href) {
        const href = el.href;
        const classified = classifyLink(href, window.location.hostname);
        const key = `a:${classified?.event ?? "nav"}:${href}:${label}`;
        if (dedupe(key)) return;

        if (classified) {
          trackEvent(classified.event, {
            method: classified.method,
            link_url: href.slice(0, 500),
            link_text: label,
            page_path: path,
            location,
            package_slug: packageSlugFromPath(path),
          });
          if (classified.event === GA_EVENTS.whatsapp) {
            void yieldToMain().then(() => {
              trackEvent("whatsapp_click", {
                link_text: label,
                page_path: path,
                location,
                package_slug: packageSlugFromPath(path),
              });
            });
          }
          return;
        }

        if (el.dataset.analytics === "select_item") {
          const item = itemFrom(el);
          if (item) trackItem("select_item", item);
          return;
        }

        trackEvent(el.dataset.analytics === "cta" ? GA_EVENTS.cta : GA_EVENTS.ui, {
          link_url: href.slice(0, 500),
          link_text: label,
          page_path: path,
          location,
          element_type: "link",
        });
        return;
      }

      const key = `btn:${label}:${path}`;
      if (dedupe(key)) return;
      if (el.dataset.analytics === "select_item") {
        const item = itemFrom(el);
        if (item) trackItem("select_item", item);
        return;
      }
      trackEvent(el.dataset.analytics === "cta" ? GA_EVENTS.cta : GA_EVENTS.ui, {
        link_text: label,
        page_path: path,
        location,
        element_type: el.tagName.toLowerCase(),
      });
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target;
      const button = e.button;
      const prevented = e.defaultPrevented;
      void yieldToMain().then(() => runClick(target, button, prevented));
    };

    const runFocusIn = (target: EventTarget | null) => {
      const t = target;
      if (!(t instanceof HTMLElement)) return;
      const form = t.closest("form");
      if (!form || formsStarted.current.has(form)) return;
      if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement)) {
        return;
      }
      formsStarted.current.add(form);
      trackEvent(GA_EVENTS.formStart, {
        form_id: form.id || form.getAttribute("name") || "contact",
        page_path: window.location.pathname,
      });
    };

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target;
      void yieldToMain().then(() => runFocusIn(target));
    };

    const runSubmit = (target: EventTarget | null) => {
      const form = target;
      if (!(form instanceof HTMLFormElement)) return;
      trackEvent(GA_EVENTS.formSubmit, {
        form_id: form.id || form.getAttribute("name") || "contact",
        page_path: window.location.pathname,
      });
    };

    const onSubmit = (e: Event) => {
      const target = e.target;
      void yieldToMain().then(() => runSubmit(target));
    };

    const listen: AddEventListenerOptions = { capture: true, passive: true };
    document.addEventListener("click", onClick, listen);
    document.addEventListener("focusin", onFocusIn, listen);
    document.addEventListener("submit", onSubmit, listen);
    return () => {
      document.removeEventListener("click", onClick, listen);
      document.removeEventListener("focusin", onFocusIn, listen);
      document.removeEventListener("submit", onSubmit, listen);
    };
  }, []);

  return null;
}
