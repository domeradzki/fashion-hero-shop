import type { Seller } from "@/types";
import { getSellerAudience } from "@/data/audience";

interface BoutiqueHeaderProps {
  seller: Seller;
}

export function BoutiqueHeader({ seller }: BoutiqueHeaderProps) {
  const followers = getSellerAudience(seller.id)?.followers ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-label mb-2">Butik</p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal">
            {seller.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-warm-gray">
            {seller.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-warm-gray">
            {seller.rating > 0 && (
              <span className="text-charcoal">
                ★ {seller.rating.toFixed(1)}
              </span>
            )}
            <span>Na FashionHero od {seller.joinedYear}</span>
          </div>
        </div>
        <div className="shrink-0 rounded-md bg-card px-4 py-3 text-center">
          <p className="text-2xl font-semibold text-charcoal">
            {followers}
          </p>
          <p className="text-label mt-0.5">Obserwujących</p>
        </div>
      </div>
    </div>
  );
}
