import Link from "next/link";
import AIMarketingHeroKelo from "@/components/AIMarketingHeroKelo";
import { PackagesIntro } from "@/components/packages/PackagesIntro";
import { PackageCardCarousel } from "@/components/packages/PackageCardCarousel";
import { GroupDepartureSection } from "@/components/GroupDepartureSection";
import { ContactSection } from "@/components/ContactSection";
import { packageDetails } from "@/data/package-details";

const FEATURED_PACKAGES = packageDetails;

export default function Home() {
  return (
    <>
      <AIMarketingHeroKelo />

      {/* Diseño 1 — card con carrusel de fotos */}
      <section className="bg-white">
        <PackagesIntro />
        <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PACKAGES.map((pkg) => (
            <PackageCardCarousel key={pkg.slug} pkg={pkg} />
          ))}
        </div>
        <div className="flex justify-center px-6 pt-10 pb-20">
          <Link
            href="/paquetes"
            className="rounded-full bg-brand-red-mid px-7 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Conocé todos nuestros paquetes
          </Link>
        </div>
      </section>

      <GroupDepartureSection />

      <ContactSection />
    </>
  );
}
