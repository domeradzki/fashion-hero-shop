// PostHog — basic product analytics (pageviews + clicks only).
// Runs on the client before React hydration (Next.js `instrumentation-client` convention).
// Session replay and error tracking are intentionally OFF — see flags below.
import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

// No-op when the key is missing (e.g. local dev without analytics) so the app never crashes.
if (key) {
  try {
    posthog.init(key, {
      api_host: host,
      defaults: "2025-05-24",
      capture_pageview: "history_change", // pageviews, incl. App Router client navigation
      capture_pageleave: true,
      autocapture: true, // clicks (and other element interactions)
      disable_session_recording: true, // no session replay
      capture_exceptions: false, // no error tracking
      capture_performance: false, // no web vitals / performance capture
      capture_dead_clicks: false, // no dead-click autocapture
      disable_surveys: true, // no surveys
    });
  } catch (error) {
    // Never let analytics setup break the app.
    console.error("PostHog init failed", error);
  }
}
