import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#04251a",
    theme_color: "#04251a",
    icons: [{ src: "/logo.png", sizes: "512x512", type: "image/png" }],
  };
}
