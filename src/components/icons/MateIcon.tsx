export function MateIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "h-4 w-4"}
    >
      <path d="M12.5 10 16 3" />
      <path d="m14.9 2.6 2.2 1" />
      <path d="M6.5 10h9c.6 0 1 .4 1 1 0 4.8-2.4 9-5.5 9s-5.5-4.2-5.5-9c0-.6.4-1 1-1Z" />
      <path d="M8 13.5h6" />
    </svg>
  );
}
