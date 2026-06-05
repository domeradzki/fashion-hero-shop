"use client";

import { useEffect, useRef } from "react";
import type { Seller } from "@/types";
import { getSellerAudience } from "@/data/audience";
import { track } from "@/lib/track";

interface AudienceViewProps {
  seller: Seller;
}

export function AudienceView({ seller }: AudienceViewProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    track({
      type: "seller_audience_view",
      sellerId: seller.id,
      timestamp: Date.now(),
    });
  }, [seller.id]);

  const audience = getSellerAudience(seller.id);
  const followers = audience?.followers ?? 0;
  const repeatBuyerPct = Math.round((audience?.repeatBuyerRate ?? 0) * 100);
  const repeatGmvPct = Math.round((audience?.repeatGmvShare ?? 0) * 100);
  const recent = audience?.recentFollowers ?? [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <p className="text-label mb-2">Panel sprzedawcy · {seller.name}</p>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal">
        Twoja publiczność
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-warm-gray">
        To kupujący przypisani do Ciebie na FashionHero.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-md bg-card px-6 py-6">
          <p className="text-4xl font-semibold text-charcoal">{followers}</p>
          <p className="text-label mt-1">Obserwujących</p>
        </div>

        <div className="rounded-md bg-card px-6 py-6">
          <p className="text-4xl font-semibold text-charcoal">{repeatBuyerPct}%</p>
          <p className="text-label mt-1">Powracający kupujący: {repeatBuyerPct}%</p>
        </div>

        <div className="rounded-md bg-card px-6 py-6">
          <p className="text-4xl font-semibold text-charcoal">{repeatGmvPct}%</p>
          <p className="text-label mt-1">Udział powtórnego GMV: {repeatGmvPct}%</p>
          <p className="mt-2 text-sm text-warm-gray">
            Tyle Twojej sprzedaży pochodzi od stałych klientów.
          </p>
        </div>
      </div>

      {recent.length > 0 && (
        <div className="mt-4 rounded-md bg-card px-6 py-6">
          <p className="text-label mb-3">Ostatni obserwujący</p>
          <ul className="flex flex-wrap gap-2">
            {recent.map((name) => (
              <li
                key={name}
                className="rounded-full bg-secondary px-3 py-1 text-sm text-charcoal"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
