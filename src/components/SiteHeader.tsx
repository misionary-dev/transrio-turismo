import Image from "next/image";
import Link from "next/link";
import { quoteMessage, whatsappUrl } from "@/lib/contact";

export function SiteHeader() {
  const wa = whatsappUrl(quoteMessage());

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[72px] md:px-6">
        <Link
          href="/"
          className="relative flex h-10 w-[140px] shrink-0 items-center md:h-12 md:w-[168px]"
        >
          <Image
            src="/logo-transrio.png"
            alt="Transrio Turismo"
            fill
            priority
            sizes="168px"
            className="object-contain object-left"
          />
        </Link>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:brightness-110"
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
