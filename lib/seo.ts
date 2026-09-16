import type { Metadata } from "next";
import { accolade, hours, site } from "@/lib/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string; width?: number; height?: number };
  type?: "website" | "article";
};

const defaultImage = { url: "/og.jpg", alt: "The emerald dining room at High Spirits", width: 1200, height: 630 };

export function pageMetadata({ title, description, path, image = defaultImage, type = "website" }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": absoluteUrl("/#restaurant"),
    name: site.name,
    description: site.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    image: [absoluteUrl("/og.jpg")],
    telephone: site.phone.e164,
    email: site.email,
    servesCuisine: site.cuisine,
    acceptsReservations: true,
    hasMenu: absoluteUrl("/menu"),
    award: `${accolade.title} — ${accolade.body}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postcode,
      addressCountry: site.address.countryCode,
    },
    openingHoursSpecification: hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.schemaDays,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [site.socials.instagram, site.socials.facebook, site.listings.tripadvisor, site.listings.agfg],
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
