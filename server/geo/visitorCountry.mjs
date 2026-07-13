/**
 * Resolve visitor country from common CDN / proxy headers.
 * Used to exclude analytics for blocked regions (e.g. India).
 */
export function getVisitorCountryFromHeaders(headers = {}) {
  const forced = String(process.env.FORCE_VISITOR_COUNTRY || '')
    .trim()
    .toUpperCase();
  if (/^[A-Z]{2}$/.test(forced)) return forced;

  const candidates = [
    headers['cf-ipcountry'],
    headers['CF-IPCountry'],
    headers['x-vercel-ip-country'],
    headers['x-country-code'],
    headers['cloudfront-viewer-country'],
  ];

  for (const value of candidates) {
    const code = String(Array.isArray(value) ? value[0] : value || '')
      .trim()
      .toUpperCase();
    if (/^[A-Z]{2}$/.test(code) && code !== 'XX' && code !== 'T1') {
      return code;
    }
  }

  return '';
}

export function buildVisitorCountryCookie(country) {
  const code = String(country || '')
    .trim()
    .toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return null;

  // 24h is enough for analytics gating; refresh on each HTML response.
  return `visitor_country=${code}; Path=/; Max-Age=86400; SameSite=Lax`;
}

export const ANALYTICS_EXCLUDED_COUNTRIES = new Set(
  String(process.env.ANALYTICS_EXCLUDED_COUNTRIES || 'IN')
    .split(',')
    .map((c) => c.trim().toUpperCase())
    .filter((c) => /^[A-Z]{2}$/.test(c)),
);

export function isAnalyticsExcludedCountry(country) {
  const code = String(country || '')
    .trim()
    .toUpperCase();
  return Boolean(code && ANALYTICS_EXCLUDED_COUNTRIES.has(code));
}
