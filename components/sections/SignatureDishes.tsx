import { DishCard } from "@/components/cards/DishCard";
import { FadeUp } from "@/components/motion/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { signatureDishes } from "@/lib/content/dishes";

export function SignatureDishes() {
  const [feature, second, third, ...rest] = signatureDishes;

  return (
    <section aria-labelledby="signature-title" className="grain relative overflow-hidden bg-hs-green-dark py-28 md:py-40">
      <Aurora />

      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="signature-title"
            eyebrow="Signature creations"
            className="lg:col-span-7"
            lines={["Plates we're", <em key="k" className="text-gold-gradient">known for.</em>]}
          />
          <FadeUp className="lg:col-span-4 lg:col-start-9">
            <p className="text-lead text-hs-cream/75">
              Handcrafted with the finest ingredients and authentic spices — the dishes our guests return for, night after night.
            </p>
            <ButtonLink href="/menu" variant="ghost" className="mt-8">
              Full menu
            </ButtonLink>
          </FadeUp>
        </div>

        <div className="mt-20 grid gap-y-20 lg:mt-28 lg:grid-cols-12 lg:gap-x-10">
          <DishCard dish={feature} variant="feature" className="lg:col-span-6" />

          <div className="grid content-start gap-20 lg:col-span-6 lg:pt-32">
            <DishCard dish={second} variant="wide" />
            <DishCard dish={third} variant="wide" delay={0.1} className="lg:ml-16" />
          </div>

          {rest.map((dish, i) => (
            <DishCard
              key={dish.no}
              dish={dish}
              variant="compact"
              delay={i * 0.08}
              className={["lg:col-span-4", "lg:col-span-4 lg:mt-24", "lg:col-span-4 lg:-mt-6"][i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
