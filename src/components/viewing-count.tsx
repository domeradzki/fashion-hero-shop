"use client";

import { cn } from "@/lib/utils";
import { EyeIcon } from "@/components/icons";
import { useViewingCount } from "@/hooks/use-viewing-count";
import { useFeatureFlag } from "@/hooks/use-feature-flag";
import { VIEWING_COUNT_CONFIG } from "@/lib/viewing-count";

interface ViewingCountProps {
  productId: string;
  /** Drift the number every few seconds (product page only). */
  live?: boolean;
  /** "detail" = full sentence on the PDP, "card" = compact listing tile. */
  variant?: "detail" | "card";
  className?: string;
}

export function ViewingCount({
  productId,
  live = false,
  variant = "detail",
  className,
}: ViewingCountProps) {
  const count = useViewingCount(productId, { live });
  // PostHog kill-switch on top of the local config gate. Default ON until the flag is created.
  const flagEnabled = useFeatureFlag("viewing-count-badge", true);

  if (!flagEnabled || !VIEWING_COUNT_CONFIG.enabled) return null;

  if (variant === "card") {
    return (
      <p
        className={cn(
          "flex items-center gap-1 text-[11px] text-warm-gray/70",
          className,
        )}
      >
        <EyeIcon className="h-3 w-3" />
        <span>{count} watching</span>
      </p>
    );
  }

  const verb = count === 1 ? "person is" : "people are";

  return (
    <div
      className={cn("flex items-center gap-2 text-xs text-warm-gray", className)}
      aria-live="off"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-charcoal/40" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-charcoal/60" />
      </span>
      <EyeIcon className="h-3.5 w-3.5 text-charcoal/70" />
      <span>
        <span className="font-medium text-charcoal">{count}</span> {verb} viewing
        this right now
      </span>
    </div>
  );
}
