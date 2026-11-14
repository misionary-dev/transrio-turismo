type Scheduler = { yield?: () => Promise<void> };

/** Cede el hilo para que el navegador pinte antes de seguir. */
export function yieldToMain(): Promise<void> {
  const scheduler = (globalThis as { scheduler?: Scheduler }).scheduler;
  if (typeof scheduler?.yield === "function") return scheduler.yield();
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}
