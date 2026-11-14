let open = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeMenu(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getMenuOpen() {
  return open;
}

export function toggleMenu() {
  open = !open;
  emit();
}

export function closeMenu() {
  if (!open) return;
  open = false;
  emit();
}
