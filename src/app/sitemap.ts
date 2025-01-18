import { routes } from "@/lib/routes-map";
import { siteConfig } from "@/lib/site-config";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        ...Object.values(routes).map((route) => ({
            url: new URL(route, siteConfig.url).toString(),
            lastModified: new Date(),
            priority: 1,
        })),
        {
            url: siteConfig.repo,
            priority: 0.5,
        },
    ];
}
