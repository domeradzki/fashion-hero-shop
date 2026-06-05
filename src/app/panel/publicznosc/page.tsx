import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSeller } from "@/data/sellers";
import { AudienceView } from "@/components/audience-view";

// Demo seller for the seller-side fake-door surface.
const DEMO_SELLER_SLUG = "bella-donna";

export const metadata: Metadata = {
  title: "Twoja publiczność | FashionHero",
  description: "Obserwujący i powtarzalna sprzedaż Twojego butiku na FashionHero.",
};

export default function AudiencePage() {
  const seller = getSeller(DEMO_SELLER_SLUG);

  if (!seller) {
    notFound();
  }

  return <AudienceView seller={seller} />;
}
