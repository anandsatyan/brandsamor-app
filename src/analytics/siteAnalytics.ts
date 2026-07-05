import { trackEvent } from './gtag';

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

const emit = (eventName: string, params?: AnalyticsParams) => {
  trackEvent(eventName, {
    ...params,
    page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
  });
};

export const trackPackamorTrustLink = (linkLabel: string, destination: string) => {
  emit('packamor_trust_link', { link_label: linkLabel, link_url: destination });
};

export const trackContactCta = (location: string, channel?: 'email' | 'phone' | 'form') => {
  emit('contact_cta', { cta_location: location, contact_channel: channel });
};

export const trackComingSoonCta = (location: string) => {
  emit('coming_soon_cta', { cta_location: location });
};

export const trackSampleCta = (location: string) => {
  emit('sample_cta', { cta_location: location });
};

export const trackPhoneClick = (location: string) => {
  emit('phone_click', { cta_location: location });
};

export const trackEmailClick = (location: string) => {
  emit('email_click', { cta_location: location });
};

export const trackKnowledgeBaseArticleClick = (slug: string, title: string, source: string) => {
  emit('kb_article_click', { article_slug: slug, article_title: title, click_source: source });
};

/** Prepare reporting for AI referral sources and UTM parameters via page_view config. */
export const trackReferralContext = () => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source');
  const utmMedium = params.get('utm_medium');
  const utmCampaign = params.get('utm_campaign');
  const referrer = document.referrer;

  if (!utmSource && !referrer) return;

  emit('referral_context', {
    utm_source: utmSource ?? undefined,
    utm_medium: utmMedium ?? undefined,
    utm_campaign: utmCampaign ?? undefined,
    page_referrer: referrer || undefined,
  });
};
