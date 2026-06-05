import posthog from "posthog-js";

export type FollowEvent = {
  type:
    | "reached_boutique"
    | "follow_click"
    | "notify_optin"
    | "unfollow"
    | "seller_audience_view"
    | "premium_optin";
  buyerId?: string;
  sellerId: string;
  timestamp: number;
};

// In-memory event log (fake-door stub — no backend, no persistence).
const events: FollowEvent[] = [];

export function track(event: FollowEvent): void {
  events.push(event);
  console.log("[track]", event);
  // Forward named events to PostHog (client only; no-op if PostHog isn't initialised).
  if (typeof window !== "undefined") {
    try {
      posthog.capture(event.type, {
        sellerId: event.sellerId,
        buyerId: event.buyerId,
      });
    } catch {
      // Never let analytics break the prototype.
    }
  }
}

export function getEvents(): FollowEvent[] {
  return events;
}
