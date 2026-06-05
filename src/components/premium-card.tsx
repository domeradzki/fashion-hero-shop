"use client";

import { useState } from "react";
import { track } from "@/lib/track";
import { formatPrice } from "@/lib/format";

interface PremiumCardProps {
  sellerId: string;
}

export function PremiumCard({ sellerId }: PremiumCardProps) {
  const [optedIn, setOptedIn] = useState(false);

  function handleOptIn() {
    if (optedIn) return;
    setOptedIn(true);
    track({ type: "premium_optin", sellerId, timestamp: Date.now() });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      <div className="rounded-md bg-charcoal px-6 py-6 text-primary-foreground sm:px-8 sm:py-8">
        <p className="text-label text-primary-foreground/70">
          Dla obserwujących
        </p>
        <h2 className="mt-1 text-xl font-semibold">
          FashionHero Premium — {formatPrice(19)}/mc
        </h2>
        <p className="mt-2 max-w-xl text-sm text-primary-foreground/80">
          Wcześniejszy dostęp do dropów obserwowanych marek + darmowe zwroty.
        </p>

        {optedIn ? (
          <p className="mt-5 text-sm font-medium text-primary-foreground">
            Premium włączone ✓ — odblokowaliśmy Ci wczesny dostęp do dropów.
          </p>
        ) : (
          <button
            type="button"
            onClick={handleOptIn}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-primary-foreground px-6 py-2.5 text-xs font-medium uppercase tracking-[0.6px] text-charcoal transition-opacity hover:opacity-85"
          >
            Włącz Premium
          </button>
        )}
      </div>
    </div>
  );
}
