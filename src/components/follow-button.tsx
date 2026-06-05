"use client";

import { cn } from "@/lib/utils";
import { track } from "@/lib/track";

interface FollowButtonProps {
  sellerId: string;
  followed: boolean;
  onFollowedChange: (followed: boolean) => void;
  notified: boolean;
  onNotifiedChange: (notified: boolean) => void;
}

export function FollowButton({
  sellerId,
  followed,
  onFollowedChange,
  notified,
  onNotifiedChange,
}: FollowButtonProps) {
  function handleFollow() {
    const next = !followed;
    onFollowedChange(next);
    track({
      type: next ? "follow_click" : "unfollow",
      sellerId,
      timestamp: Date.now(),
    });
  }

  function handleNotify() {
    if (notified) return;
    onNotifiedChange(true);
    track({ type: "notify_optin", sellerId, timestamp: Date.now() });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={handleFollow}
        aria-pressed={followed}
        className={cn(
          "btn-cta",
          followed && "opacity-80"
        )}
      >
        {followed ? "Obserwujesz ✓" : "Obserwuj butik"}
      </button>

      <button
        type="button"
        onClick={handleNotify}
        disabled={notified}
        className={cn("btn-cta-outline", notified && "opacity-60")}
      >
        {notified ? "Powiadomimy Cię ✓" : "Powiadom o nowościach"}
      </button>
    </div>
  );
}
