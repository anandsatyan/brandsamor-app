export const GA_MEASUREMENT_ID = 'G-P7C7Y3NW2N';

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

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: pagePath,
    page_title: pageTitle ?? document.title,
  });
};

export const trackEvent = (eventName: string, params?: GtagParams) => {
  gtag('event', eventName, params);
};
