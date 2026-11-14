"use client";

import { useEffect, useRef, useState } from "react";

export function LazyMap({ src, title }: { src: string; title: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    let idleId = 0;
    let timer = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        const reveal = () => setShow(true);
        if (window.requestIdleCallback) {
          idleId = window.requestIdleCallback(reveal, { timeout: 1500 });
        } else {
          timer = window.setTimeout(reveal, 300);
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (idleId) window.cancelIdleCallback?.(idleId);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className="aspect-video w-full overflow-hidden rounded-2xl bg-brand-black-light"
    >
      {show ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="h-full w-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : null}
    </div>
  );
}
