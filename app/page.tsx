import type { Metadata } from "next";
import { ChefStory } from "@/components/chef/ChefStory";
import { PartnerStory } from "@/components/chef/PartnerStory";
import { ExperienceScroller } from "@/components/experiences/ExperienceScroller";
import { GalleryTeaser } from "@/components/gallery/GalleryTeaser";
import { HomeHero } from "@/components/hero/HomeHero";
import { JourneySection } from "@/components/journey/JourneySection";
import { JournalTeaser } from "@/components/journal/JournalTeaser";
import { ReviewsSlider } from "@/components/reviews/ReviewsSlider";
import { Ingredients } from "@/components/sections/Ingredients";
import { Intro } from "@/components/sections/Intro";
import { Philosophy } from "@/components/sections/Philosophy";
import { ReservationCTA } from "@/components/sections/ReservationCTA";
import { SignatureDishes } from "@/components/sections/SignatureDishes";
import { Marquee } from "@/components/ui/Marquee";
import { pageMetadata } from "@/lib/seo";
import { site, taglines } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "High Spirits | Authentic Indian Fine Dining & Buffet in Bunbury",
    description: site.description,
    path: "/",
  }),
  title: { absolute: "High Spirits | Authentic Indian Fine Dining & Buffet in Bunbury" },
};

/**
 * Arrive → Discover → Feel → Explore → Desire → Trust → Reserve
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Marquee items={taglines} label="High Spirits taglines" className="border-y border-hs-gold/20 bg-hs-green-deep py-6 text-hs-cream/90" />
      <Intro />
      <SignatureDishes />
      <ExperienceScroller />
      <ChefStory />
      <PartnerStory />
      <JourneySection />
      <Philosophy />
      <Ingredients />
      <ReviewsSlider />
      <GalleryTeaser />
      <JournalTeaser />
      <ReservationCTA />
    </>
  );
}
