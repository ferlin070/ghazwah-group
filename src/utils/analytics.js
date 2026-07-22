/**
 * Google Analytics 4 — lightweight wrapper
 *
 * Usage:
 *   import { trackEvent } from '../utils/analytics';
 *   trackEvent('conversion', 'form_submit', 'Hubungi Kami');
 *
 * GA4 is only active when VITE_GA_MEASUREMENT_ID is set in the environment.
 * In dev mode (VITE_DEV) events are logged to the console instead.
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const IS_DEV = import.meta.env.DEV;

/** Has the gtag script been loaded? */
let initialized = false;

/** Call once (from App.jsx) to push the initial page_view event. */
export function initGA() {
  if (!GA_ID && !IS_DEV) return;               // No ID configured — skip silently
  if (initialized) return;
  initialized = true;

  if (IS_DEV) {
    console.log('[GA] Dev mode — events logged to console only');
    return;
  }

  // gtag is already set up by the <script> tag in index.html.
  // DO NOT reassign window.gtag here — that would overwrite the real
  // gtag function loaded by gtag.js and break all subsequent event tracking.
  // Index.html already handles gtag('js', ...) and gtag('config', ...).
}

/**
 * Track a conversion event.
 *
 * @param {'conversion'|'engagement'|'navigation'} action
 * @param {string} category  e.g. 'form', 'cta', 'whatsapp', 'portfolio'
 * @param {string} [label]   Optional human-readable label
 */
export function trackEvent(action, category, label) {
  if (!GA_ID && !IS_DEV) return;

  if (IS_DEV) {
    console.log(`[GA] ${action} / ${category}${label ? ` — ${label}` : ''}`);
    return;
  }

  if (typeof window.gtag !== 'function') return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label || undefined,
    send_to: GA_ID,
  });
}

/**
 * Track a page view (call from router or on hash change if using hash navigation).
 */
export function trackPageView(path) {
  if (!GA_ID && !IS_DEV) return;

  if (IS_DEV) {
    console.log(`[GA] page_view: ${path || window.location.pathname}`);
    return;
  }

  if (typeof window.gtag !== 'function') return;

  window.gtag('config', GA_ID, {
    page_path: path || window.location.pathname + window.location.hash,
  });
}
