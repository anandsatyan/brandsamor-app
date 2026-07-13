/** GA4 measurement ID — loaded once via GTM (GTM-KRZ7PLJZ), not via a second gtag.js snippet. */
export const GA_MEASUREMENT_ID = 'G-P7C7Y3NW2N';
export const GTM_CONTAINER_ID = 'GTM-KRZ7PLJZ';

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const gtag = (...args: unknown[]) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
};

/**
 * SPA page views. Sent as page_view events so GTM's GA4 Configuration tag
 * should have "Send a page view event when this configuration loads" = false
 * to avoid double-counting the first load.
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
