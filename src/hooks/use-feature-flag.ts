"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

/**
 * Boolean PostHog feature flag (kill-switch).
 * Falls back to `fallback` until flags load and when PostHog isn't initialised
 * (e.g. local dev without a key), so behaviour never breaks.
 */
export function useFeatureFlag(key: string, fallback = false): boolean {
  const [enabled, setEnabled] = useState(fallback);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => setEnabled(posthog.isFeatureEnabled(key) ?? fallback);
    sync();
    return posthog.onFeatureFlags(sync);
  }, [key, fallback]);

  return enabled;
}

/**
 * Multivariate PostHog flag / experiment variant (e.g. "control" | "test").
 * Returns `fallback` until flags load and when PostHog isn't initialised.
 */
export function useFeatureVariant(key: string, fallback = "control"): string {
  const [variant, setVariant] = useState(fallback);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => {
      const value = posthog.getFeatureFlag(key);
      setVariant(typeof value === "string" ? value : fallback);
    };
    sync();
    return posthog.onFeatureFlags(sync);
  }, [key, fallback]);

  return variant;
}
