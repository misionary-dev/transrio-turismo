#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

put() {
  local file="$1"
  local key="${file#public/}"
  local ct="application/octet-stream"
  case "$file" in
    *.jpg|*.jpeg) ct="image/jpeg" ;;
    *.png) ct="image/png" ;;
    *.svg) ct="image/svg+xml" ;;
    *.webp) ct="image/webp" ;;
  esac
  echo "→ $key"
  npx wrangler r2 object put "transrio/${key}" \
    --file="$file" \
    --content-type="$ct" \
    --cache-control="public, max-age=31536000, immutable" \
    --remote \
    --force
}

echo "Habilitando r2.dev público…"
npx wrangler r2 bucket dev-url enable transrio --force || true

while IFS= read -r -d '' file; do
  put "$file"
done < <(find public/destinos public/institucional -type f \( -name '*.jpg' -o -name '*.jpeg' -o -name '*.png' \) -print0)

put public/logo-transrio.png
put public/logo-transrio.svg

echo "Listo. Revisá wrangler r2 bucket dev-url get transrio"
