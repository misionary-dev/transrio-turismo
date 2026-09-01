# Migración Transrio Turismo

Base de referencia del sitio actual y checklist capa a capa.

**Origen WP:** `https://www.transrioturismo.tur.ar/travel/`  
**Destino:** Next.js (este repo) → Vercel  
**Conversión:** WhatsApp-first (no CF7)

Leyenda: `[ ]` pendiente · `[x]` hecho · `[~]` parcial

---

## Base WP (referencia — no tocar DNS hasta avisar)

```
transrioturismo.tur.ar/travel/
├── Layout
│   ├── Header (logo Transrio)
│   ├── Nav
│   │   ├── Inicio
│   │   ├── ¿Quiénes somos?
│   │   ├── Paquetes ▸ Solicitar Cotización
│   │   └── Contacto
│   └── Footer
│       ├── Galerías MetaSlider (Playas / Playa / Brasil)
│       ├── Links (Inicio, Quiénes, Misión, Contacto)
│       └── Dirección Posadas + tel + mail
│
├── / (Home)
│   ├── 1. Buscador (destino + duración → /packages)
│   ├── 2. Hero slider (FlexSlider, 3 slides imagen)
│   │     ├── Torres 2026
│   │     ├── Capao da Canoa 2026
│   │     └── Camboriú 2026
│   ├── 3. Grid “Los mejores paquetes” (3 cards)
│   └── 4. ¿Dónde estamos? (texto + Google Maps)
│
├── /quienes-somos
├── /mision-vision-valores
├── /packages              ← listado + filtros
├── /package/[slug]        ← Torres | Capao | Camboriu
│     ├── Hero / título
│     ├── Destino · duración · precio
│     ├── Incluye / No incluye
│     ├── Contenido Elementor
│     └── Form “Consultá este paquete”
├── /cotizacion            ← CF7 → WhatsApp
└── /contacto              ← CF7 → WhatsApp
```

**Paquetes vivos (datos):** Camboriú · Torres · Capão da Canoa (~10d/7n, ene–feb). Precio: “¡Consulta!”.

**Contacto comercial:** fijo `0376 459-6777` · WA `+54 9 376 429-2909` · Lun–Vie 08:30–12:00 / 16:00–20:00.

---

## Capas (marcar acá)

### Capa 1 — Layout

- [x] Header + logo oficial
- [x] Nav (Inicio, Quiénes, Paquetes, Contacto)
- [x] CTA WhatsApp en header
- [~] Footer (tel / mail / dirección — sin MetaSlider)
- [ ] Links footer alineados a WP (Misión, etc.)

### Capa 2 — Home

- [x] Hero full-bleed (video) + copy temporada
- [x] Bloque cotizar (destino → WhatsApp)
- [~] Listado / scroll de paquetes (3 destinos)
- [~] Sección ubicación (+ mapa)
- [ ] Paridad o decisión final vs buscador WP + FlexSlider + grid clásico

### Capa 3 — Rutas internas

- [ ] `/quienes-somos`
- [ ] `/mision-vision-valores`
- [ ] `/contacto` (contenido + WA / tel)
- [ ] `/cotizacion` (flujo WA, reemplazo CF7)

### Capa 4 — Paquetes

- [x] Datos base en `src/data/packages.ts`
- [ ] `/packages` listado + filtros
- [ ] `/package/[slug]` ficha completa
  - [ ] Hero / título
  - [ ] Destino · duración · precio
  - [ ] Incluye / No incluye
  - [ ] Contenido (migración Elementor)
  - [ ] CTA “Consultá este paquete” → WhatsApp

### Capa 5 — Conversión

- [x] `src/lib/contact.ts` (WA + tel + horarios)
- [x] Mensajes precargados por destino
- [ ] Unificar todos los CTAs al mismo flujo WA
- [ ] Botón flotante WA (si se mantiene)

### Capa 6 — Deploy / go-live

- [x] Repo GitHub + proyecto Vercel
- [ ] Contenido y rutas listas para producción
- [ ] DNS DonWeb → Vercel (**solo cuando se indique**)
- [ ] Mail permanece en DonWeb

---

## Decisiones ya tomadas

| Tema | Decisión |
|------|----------|
| Stack | Next.js + React → Vercel |
| Forms CF7 | Reemplazo por WhatsApp |
| Hero | Video, no FlexSlider de 3 imágenes (salvo que se revierta) |
| Home buscador | Elegir destino → WA (no filtrar a `/packages` primero) |
| Hosting actual | DonWeb/Hostmar — **no** Hostinger |
| DNS | No apuntar hasta sitio listo |
| Animaciones extra | React Bits vía shadcn (`@react-bits`) + GSAP |

### React Bits (instalado)

Registry en `components.json` → `@react-bits`.  
Componentes en `src/components/`:

- `SplitFlapText` (hero temporada — en uso)
- `ScrollVelocity`, `GlareHover`, `BlurText`, `Magnet` (listos para cablear)

Agregar más: `npx.cmd shadcn@latest add @react-bits/Nombre-TS-TW`

---

## Cómo usar este archivo

1. Trabajar **una capa** a la vez.
2. Al terminar un ítem: marcar `[x]`.
3. Si queda a medias: `[~]` + nota corta.
4. No marcar go-live (Capa 6 DNS) sin confirmación explícita.
