/**
 * "X people are viewing this product" — fake social-proof helper.
 *
 * The count is fictional: a deterministic base derived from the product id
 * (so SSR and the first client render agree — no hydration mismatch) plus an
 * optional client-only random drift applied later in `useViewingCount`.
 *
 * All values here are deterministic and safe to call during server rendering.
 * Tune the marketing behaviour from a single place: VIEWING_COUNT_CONFIG.
 */

export const VIEWING_COUNT_CONFIG = {
  /** Master switch — set to false to remove the badge everywhere. */
  enabled: true,
  /** Inclusive lower bound for the displayed count. */
  min: 10,
  /** Inclusive upper bound for the displayed count. */
  max: 45,
  /** How often the live count drifts on the product page (ms). */
  driftMs: 5000,
  /** Roughly what share of listing tiles show the badge (0–1). */
  listingShowRatio: 0.4,
} as const;

/** Stable, order-sensitive string hash (no Math.random — SSR safe). */
export function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Deterministic base "viewers" count for a product, mapped into
 * [config.min, config.max]. Same product id → same number every render.
 */
export function getBaseViewingCount(productId: string): number {
  const { min, max } = VIEWING_COUNT_CONFIG;
  const span = max - min + 1;
  return min + (hashString(productId) % span);
}

/**
 * Whether a listing tile should show the badge. Only the busier products
 * (top `listingShowRatio` of the range) qualify, so it stays believable —
 * not every product appears to have a crowd. Deterministic by product id.
 */
export function shouldShowOnListing(productId: string): boolean {
  if (!VIEWING_COUNT_CONFIG.enabled) return false;
  const { min, max, listingShowRatio } = VIEWING_COUNT_CONFIG;
  const threshold = max - (max - min) * listingShowRatio;
  return getBaseViewingCount(productId) >= threshold;
}
