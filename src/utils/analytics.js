const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const IS_DEV = import.meta.env.DEV;
const SCRIPT_ID = 'ghz-ga-script';
let initialized = false;

function ensureGtag() {
  if (!GA_ID || typeof document === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  if (document.getElementById(SCRIPT_ID)) return;

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  script.onerror = () => {
    script.remove();
  };
  document.head.appendChild(script);
}

export function initGA() {
  if (!GA_ID && !IS_DEV) return;
  if (initialized) return;
  initialized = true;

  if (IS_DEV) {
    console.log('[GA] Dev mode — events logged to console only');
    return;
  }

  ensureGtag();
  if (typeof window.gtag === 'function') {
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }
}

export function trackEvent(action, category, label) {
  if (!GA_ID && !IS_DEV) return;

  if (IS_DEV) {
    console.log(`[GA] ${action} / ${category}${label ? ` — ${label}` : ''}`);
    return;
  }

  ensureGtag();
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label || undefined,
    send_to: GA_ID,
  });
}

export function trackPageView(path) {
  if (!GA_ID && !IS_DEV) return;

  if (IS_DEV) {
    console.log(`[GA] page_view: ${path || window.location.pathname}`);
    return;
  }

  ensureGtag();
  if (typeof window.gtag !== 'function') return;

  window.gtag('config', GA_ID, {
    page_path: path || window.location.pathname + window.location.hash,
  });
}
