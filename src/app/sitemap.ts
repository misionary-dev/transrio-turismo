import type { MetadataRoute } from "next";
import { packageDetails } from "@/data/package-details";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    "",
    "/paquetes",
    "/quienes-somos",
    "/salida-grupal",
    "/contacto",
  ].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const packages = packageDetails.map((pkg) => ({
    url: `${SITE_URL}/paquetes/${pkg.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...packages];
}
