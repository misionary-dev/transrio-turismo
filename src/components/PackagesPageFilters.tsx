"use client";

import { useCallback } from "react";
import { MapPin, CalendarDays, Sun } from "lucide-react";

export type FilterState = {
  destino: string[];
  duracion: string[];
  temporada: string[];
};

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const DESTINOS = [
  { value: "gramado-canela", label: "Gramado y Canela" },
  { value: "camboriu", label: "Camboriú" },
  { value: "torres", label: "Torres" },
  { value: "capao-canoa", label: "Capão da Canoa" },
  { value: "florianopolis", label: "Florianópolis" },
];

const DURACIONES = [
  { value: "4-noches", label: "4 Noches" },
  { value: "5-noches", label: "5 Noches" },
  { value: "7-noches", label: "7 Noches" },
  { value: "10-noches", label: "10 Noches" },
];

const TEMPORADAS = [
  { value: "verano", label: "Verano" },
  { value: "otono", label: "Otoño" },
  { value: "invierno", label: "Invierno" },
  { value: "primavera", label: "Primavera" },
];

export function PackagesPageFilters({ filters, onFilterChange }: FiltersProps) {
  const toggleFilter = useCallback(
    (category: keyof FilterState, value: string) => {
      const current = filters[category];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      onFilterChange({ ...filters, [category]: updated });
    },
    [filters, onFilterChange]
  );

  const clearFilters = useCallback(() => {
    onFilterChange({ destino: [], duracion: [], temporada: [] });
  }, [onFilterChange]);

  const hasActiveFilters =
    filters.destino.length > 0 ||
    filters.duracion.length > 0 ||
    filters.temporada.length > 0;

  return (
    <aside className="flex flex-col gap-6">
      {/* Header */}
      <div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-brand-red-mid hover:underline"
          >
            Limpiar todos
          </button>
        )}
      </div>

      {/* Destino */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-brand-red-mid" />
          <h3 className="font-semibold text-brand-black">Destino</h3>
        </div>
        <div className="space-y-2">
          {DESTINOS.map((destino) => (
            <label key={destino.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.destino.includes(destino.value)}
                onChange={() => toggleFilter("destino", destino.value)}
                className="h-4 w-4 rounded border-gray-300 text-brand-red-mid cursor-pointer"
              />
              <span className="text-sm text-foreground/80">{destino.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duración */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-brand-red-mid" />
          <h3 className="font-semibold text-brand-black">Duración</h3>
        </div>
        <div className="space-y-2">
          {DURACIONES.map((duracion) => (
            <label key={duracion.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.duracion.includes(duracion.value)}
                onChange={() => toggleFilter("duracion", duracion.value)}
                className="h-4 w-4 rounded border-gray-300 text-brand-red-mid cursor-pointer"
              />
              <span className="text-sm text-foreground/80">{duracion.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Temporada */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4 text-brand-red-mid" />
          <h3 className="font-semibold text-brand-black">Temporada</h3>
        </div>
        <div className="space-y-2">
          {TEMPORADAS.map((temporada) => (
            <label key={temporada.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.temporada.includes(temporada.value)}
                onChange={() => toggleFilter("temporada", temporada.value)}
                className="h-4 w-4 rounded border-gray-300 text-brand-red-mid cursor-pointer"
              />
              <span className="text-sm text-foreground/80">{temporada.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
