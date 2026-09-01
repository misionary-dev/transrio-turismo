"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, CalendarDays, Search } from "lucide-react";
import { destinations, durations } from "@/data/packages";

export function PackageSearch({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [destination, setDestination] = useState("-1");
  const [duration, setDuration] = useState("-1");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination !== "-1") params.set("destino", destination);
    if (duration !== "-1") params.set("duracion", duration);
    const qs = params.toString();
    router.push(qs ? `/paquetes?${qs}` : "/paquetes");
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`w-full max-w-3xl rounded-2xl border border-white/20 bg-black/40 p-3 shadow-2xl backdrop-blur-2xl md:p-4 ${className}`}
    >
      <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <label className="flex min-h-14 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
          <MapPin className="h-4 w-4 shrink-0 text-white/55" aria-hidden />
          <span className="sr-only">Destino</span>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full appearance-none bg-transparent text-sm font-medium text-white outline-none"
          >
            <option value="-1" className="text-black">
              Todos los destinos
            </option>
            {destinations.map((d) => (
              <option key={d.value} value={d.value} className="text-black">
                {d.label} ({d.count})
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-h-14 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
          <CalendarDays className="h-4 w-4 shrink-0 text-white/55" aria-hidden />
          <span className="sr-only">Duración</span>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full appearance-none bg-transparent text-sm font-medium text-white outline-none"
          >
            <option value="-1" className="text-black">
              Todas las duraciones
            </option>
            {durations.map((d) => (
              <option key={d.value} value={d.value} className="text-black">
                {d.label} ({d.count})
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-bold text-white transition hover:brightness-110"
        >
          <Search className="h-4 w-4" aria-hidden />
          Buscar
        </button>
      </div>
    </form>
  );
}
