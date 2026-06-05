import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSeller, sellers } from "@/data/sellers";
import { getProductsBySeller } from "@/data/products";
import { ProductGrid } from "@/components/product-grid";
import { BoutiqueHeader } from "@/components/boutique-header";
import { BoutiqueFollow } from "@/components/boutique-follow";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return sellers.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seller = getSeller(slug);

  if (!seller) {
    return { title: "Butik nie znaleziony | FashionHero" };
  }

  return {
    title: `${seller.name} — Butik | FashionHero`,
    description: seller.description,
  };
}

export default async function BoutiquePage({ params }: PageProps) {
  const { slug } = await params;
  const seller = getSeller(slug);

  if (!seller) {
    notFound();
  }

  const products = getProductsBySeller(slug);

  return (
    <>
      <BoutiqueHeader seller={seller} />
      <BoutiqueFollow sellerId={seller.id} />
      <ProductGrid products={products} />
    </>
  );
}
