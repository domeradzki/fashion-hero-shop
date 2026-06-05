"use client";

import { useEffect, useState } from "react";
import { FollowButton } from "./follow-button";
import { PremiumCard } from "./premium-card";
import { track } from "@/lib/track";

interface BoutiqueFollowProps {
  sellerId: string;
}

export function BoutiqueFollow({ sellerId }: BoutiqueFollowProps) {
  const [followed, setFollowed] = useState(false);
  const [notified, setNotified] = useState(false);

  // W1 denominator — fire once per boutique page view (named event for PostHog).
  useEffect(() => {
    track({ type: "reached_boutique", sellerId, timestamp: Date.now() });
  }, [sellerId]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <FollowButton
          sellerId={sellerId}
          followed={followed}
          onFollowedChange={setFollowed}
          notified={notified}
          onNotifiedChange={setNotified}
        />
      </div>
      {followed && <PremiumCard sellerId={sellerId} />}
    </>
  );
}
