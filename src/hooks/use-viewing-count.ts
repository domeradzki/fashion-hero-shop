"use client";

import { useEffect, useState } from "react";
import {
  VIEWING_COUNT_CONFIG,
  getBaseViewingCount,
} from "@/lib/viewing-count";

interface UseViewingCountOptions {
  /** When true, the number drifts every few seconds to feel "live". */
  live?: boolean;
}

/**
 * Returns a fake "people viewing" count for a product.
 *
 * The initial value is deterministic (derived from the product id via a lazy
 * initializer), so the server-rendered markup matches the first client render
 * and React does not warn about hydration. Any randomness happens only inside
 * the effect, which runs after mount on the client.
 */
export function useViewingCount(
  productId: string,
  { live = false }: UseViewingCountOptions = {},
): number {
  const [count, setCount] = useState(() => getBaseViewingCount(productId));

  useEffect(() => {
    if (!live) return;

    // Respect users who prefer reduced motion — keep the number still.
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { min, max, driftMs } = VIEWING_COUNT_CONFIG;
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      // Slight jitter so the cadence doesn't feel mechanical.
      const delay = driftMs + Math.round((Math.random() - 0.5) * 1500);
      timeoutId = setTimeout(() => {
        setCount((current) => {
          const step = Math.floor(Math.random() * 2) + 1; // 1 or 2
          const direction = Math.random() < 0.5 ? -1 : 1;
          const next = current + step * direction;
          return Math.min(max, Math.max(min, next));
        });
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [live, productId]);

  return count;
}
