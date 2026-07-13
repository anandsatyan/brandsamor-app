/** GA4 measurement ID — loaded once via GTM (GTM-KRZ7PLJZ), not via a second gtag.js snippet. */
export const GA_MEASUREMENT_ID = 'G-P7C7Y3NW2N';
export const GTM_CONTAINER_ID = 'GTM-KRZ7PLJZ';

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __VISITOR_COUNTRY__?: string;
    __ANALYTICS_ENABLED__?: string | boolean;
  }
}

const readVisitorCountry = () => {
  if (typeof window === 'undefined') return '';
  const injected = String(window.__VISITOR_COUNTRY__ || '').trim().toUpperCase();
  if (/^[A-Z]{2}$/.test(injected)) return injected;

  const match = document.cookie.match(/(?:^|;\s*)visitor_country=([A-Z]{2})/i);
  return match?.[1]?.toUpperCase() ?? '';
};

const analyticsAllowed = () => {
  if (typeof window === 'undefined') return false;
  if (window.__ANALYTICS_ENABLED__ === false || window.__ANALYTICS_ENABLED__ === 'false') {
    return false;
  }
  return readVisitorCountry() !== 'IN';
};

const gtag = (...args: unknown[]) => {
  if (!analyticsAllowed()) return;
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
};

/**
 * SPA page views. Sent as page_view events so GTM's Google Tag should set
 * configuration parameter send_page_view = false to avoid double-counting.
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle ?? document.title,
    send_to: GA_MEASUREMENT_ID,
  });
};

export const trackEvent = (eventName: string, params?: GtagParams) => {
  gtag('event', eventName, {
    ...params,
    send_to: GA_MEASUREMENT_ID,
  });
};
