import type { Metadata } from "next";
import Link from "next/link";
import AIMarketingHeroKelo from "@/components/AIMarketingHeroKelo";
import { JsonLd } from "@/components/JsonLd";
import { PackagesIntro } from "@/components/packages/PackagesIntro";
import { PackageCardCarousel } from "@/components/packages/PackageCardCarousel";
import { GroupDepartureSection } from "@/components/GroupDepartureSection";
import { ContactSection } from "@/components/ContactSection";
import { packageDetails } from "@/data/package-details";
import { FAQ_JSON_LD, packageListJsonLd } from "@/lib/seo";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/site";

const FEATURED_PACKAGES = packageDetails;

export const metadata: Metadata = {
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={packageListJsonLd()} />
      <JsonLd data={FAQ_JSON_LD} />
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
