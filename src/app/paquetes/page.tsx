"use client";

import { useState, useMemo } from "react";
import { PackagesPageFilters, type FilterState } from "@/components/PackagesPageFilters";
import { PackageCardCarousel } from "@/components/packages/PackageCardCarousel";
import { packageDetails } from "@/data/package-details";

export default function PaquetesPage() {
  const [filters, setFilters] = useState<FilterState>({
    destino: [],
    duracion: [],
    temporada: [],
  });

  const filteredPackages = useMemo(() => {
    return packageDetails.filter((pkg) => {
      // Si no hay filtros activos, mostrar todos
      const hasActiveFilters =
        filters.destino.length > 0 ||
        filters.duracion.length > 0 ||
        filters.temporada.length > 0;

      if (!hasActiveFilters) return true;

      // Filtrar por destino
      if (filters.destino.length > 0) {
        const packageDestino = pkg.slug.toLowerCase();
        const matches = filters.destino.some((d) =>
          packageDestino.includes(d.toLowerCase())
        );
        if (!matches) return false;
      }

      // Filtrar por duración (basado en noches del slug o destino)
      if (filters.duracion.length > 0) {
        const durationMatch = filters.duracion.some((d) => {
          if (d === "7-noches") return pkg.destino.includes("7 noches");
          if (d === "10-noches") return pkg.destino.includes("10 días");
          if (d === "4-noches") return pkg.destino.includes("4 noches");
          if (d === "5-noches") return pkg.destino.includes("5 noches");
          return false;
        });
        if (!durationMatch) return false;
      }

      // Filtrar por temporada (basado en el destino/slug)
      if (filters.temporada.length > 0) {
        const slugLower = pkg.slug.toLowerCase();
        const temporadaMatch = filters.temporada.some((t) => {
          if (t === "verano") return ["gramado", "camboriu", "torres", "capao", "florianopolis"].some(d => slugLower.includes(d));
          if (t === "otono") return slugLower.includes("semana-santa");
          return false;
        });
        if (!temporadaMatch && filters.temporada.length > 0) return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <main className="bg-white min-h-screen py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-red-mid uppercase">
            Temporada 2026
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-funnel)] text-4xl font-semibold tracking-tight text-brand md:text-5xl">
            Todos nuestros paquetes
          </h1>
          <p className="mt-4 text-base text-foreground/70 md:text-lg">
            Descubre nuestros destinos en Brasil con transporte, alojamiento y asistencia incluida.
          </p>
        </div>

        {/* Filtros y Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <PackagesPageFilters filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Paquetes */}
          <div className="lg:col-span-4">
            {filteredPackages.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredPackages.map((pkg) => (
                  <PackageCardCarousel key={pkg.slug} pkg={pkg} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <p className="text-lg font-semibold text-foreground/70">
                  No encontramos paquetes con esos filtros
                </p>
                <button
                  onClick={() => setFilters({ destino: [], duracion: [], temporada: [] })}
                  className="text-sm text-brand-red-mid hover:underline font-semibold"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
