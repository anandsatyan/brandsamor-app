/**
 * Sample kit localized pricing.
 * Fixed friendly prices ≈ USD $100 purchasing power (not live FX).
 * Unknown country / unsupported currency → USD $100.
 *
 * Keep in sync with shared/sampleKitPricing.mjs (used by the Node server).
 */

/** Stripe zero-decimal currencies (amount is in whole currency units). */
export const ZERO_DECIMAL_CURRENCIES = new Set([
  'bif',
  'clp',
  'djf',
  'gnf',
  'jpy',
  'kmf',
  'krw',
  'mga',
  'pyg',
  'rwf',
  'ugx',
  'vnd',
  'vuv',
  'xaf',
  'xof',
  'xpf',
]);

/** ISO country → ISO currency (lowercase). */
export const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: 'usd',
  GB: 'gbp',
  UK: 'gbp',
  IE: 'eur',
  DE: 'eur',
  FR: 'eur',
  ES: 'eur',
  IT: 'eur',
  NL: 'eur',
  BE: 'eur',
  AT: 'eur',
  PT: 'eur',
  FI: 'eur',
  GR: 'eur',
  LU: 'eur',
  MT: 'eur',
  CY: 'eur',
  SK: 'eur',
  SI: 'eur',
  EE: 'eur',
  LV: 'eur',
  LT: 'eur',
  HR: 'eur',
  CA: 'cad',
  AU: 'aud',
  NZ: 'nzd',
  CH: 'chf',
  SE: 'sek',
  NO: 'nok',
  DK: 'dkk',
  PL: 'pln',
  CZ: 'czk',
  HU: 'huf',
  RO: 'ron',
  BG: 'bgn',
  JP: 'jpy',
  KR: 'krw',
  SG: 'sgd',
  HK: 'hkd',
  MY: 'myr',
  TH: 'thb',
  PH: 'php',
  ID: 'idr',
  IN: 'inr',
  AE: 'aed',
  SA: 'sar',
  QA: 'qar',
  KW: 'kwd',
  BH: 'bhd',
  OM: 'omr',
  ZA: 'zar',
  BR: 'brl',
  MX: 'mxn',
  AR: 'ars',
  CL: 'clp',
  CO: 'cop',
  PE: 'pen',
  TR: 'try',
  IL: 'ils',
  TW: 'twd',
  VN: 'vnd',
  LK: 'lkr',
  NP: 'npr',
  RU: 'rub',
  UA: 'uah',
  IS: 'isk',
};

/**
 * Countries we do not sell sample kits to.
 * Kept out of country pickers and rejected at payment time.
 */
export const ORDER_BLOCKED_COUNTRIES = new Set([
  'PK', // Pakistan
  'BD', // Bangladesh
  'EG', // Egypt
  'MA', // Morocco
  'DZ', // Algeria
  'NG', // Nigeria
  'KE', // Kenya
  'GH', // Ghana
]);

/**
 * Kit price in Stripe minor units (cents / zero-decimal whole units).
 * Three-decimal Stripe currencies (kwd/bhd/omr): amount × 1000.
 */
export const SAMPLE_KIT_PRICES: Record<string, number> = {
  usd: 10000,
  gbp: 8000,
  eur: 9500,
  cad: 14000,
  aud: 15500,
  nzd: 17000,
  chf: 9000,
  sek: 110000,
  nok: 110000,
  dkk: 70000,
  pln: 40000,
  czk: 230000,
  huf: 37000,
  ron: 47000,
  bgn: 18500,
  jpy: 15000,
  krw: 135000,
  sgd: 13500,
  hkd: 78000,
  myr: 47000,
  thb: 360000,
  php: 580000,
  idr: 1600000,
  inr: 850000,
  aed: 37000,
  sar: 37500,
  qar: 36500,
  kwd: 31000,
  bhd: 38000,
  omr: 39000,
  zar: 185000,
  brl: 55000,
  mxn: 185000,
  ars: 10000000,
  clp: 95000,
  cop: 42000000,
  pen: 38000,
  try: 340000,
  ils: 37000,
  twd: 320000,
  vnd: 2500000,
  lkr: 3000000,
  npr: 1350000,
  rub: 950000,
  uah: 410000,
  isk: 14000,
};

export const DEFAULT_SAMPLE_KIT_PRICE = { amount: 10000, currency: 'usd' } as const;

export function normalizeCountryCode(country: unknown): string {
  const code = String(country ?? '')
    .trim()
    .toUpperCase();
  if (code === 'UK') return 'GB';
  if (/^[A-Z]{2}$/.test(code)) return code;
  return '';
}

export function isOrderBlockedCountry(country: unknown): boolean {
  const code = normalizeCountryCode(country);
  return Boolean(code && ORDER_BLOCKED_COUNTRIES.has(code));
}

export function assertOrderCountryAllowed(...countries: unknown[]): void {
  for (const country of countries) {
    if (!isOrderBlockedCountry(country)) continue;
    const code = normalizeCountryCode(country);
    const err = new Error(
      `We don't currently ship sample kits to ${code}. Please choose another country.`,
    ) as Error & { statusCode?: number; code?: string };
    err.statusCode = 403;
    err.code = 'ORDER_COUNTRY_BLOCKED';
    throw err;
  }
}

export function currencyForCountry(country: unknown): string {
  const code = normalizeCountryCode(country);
  if (!code || isOrderBlockedCountry(code)) return 'usd';
  return COUNTRY_TO_CURRENCY[code] || 'usd';
}

export function getSampleKitPrice(country: unknown): { amount: number; currency: string } {
  const currency = currencyForCountry(country);
  const amount = SAMPLE_KIT_PRICES[currency];
  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
    return { ...DEFAULT_SAMPLE_KIT_PRICE };
  }
  return { amount, currency };
}

export function formatSampleKitMoney(
  amount: number,
  currency = 'usd',
  locale?: string,
): string {
  const cur = String(currency || 'usd').toLowerCase();
  const zero = ZERO_DECIMAL_CURRENCIES.has(cur);
  const threeDecimal = cur === 'kwd' || cur === 'bhd' || cur === 'omr';
  const major = threeDecimal
    ? Number(amount) / 1000
    : zero
      ? Number(amount)
      : Number(amount) / 100;

  try {
    return new Intl.NumberFormat(locale || undefined, {
      style: 'currency',
      currency: cur.toUpperCase(),
      minimumFractionDigits: zero ? 0 : threeDecimal ? 3 : 2,
      maximumFractionDigits: zero ? 0 : threeDecimal ? 3 : 2,
    }).format(major);
  } catch {
    return `${major.toFixed(zero ? 0 : 2)} ${cur.toUpperCase()}`;
  }
}

export function sampleKitPriceLabel(country: unknown, locale?: string): string {
  const { amount, currency } = getSampleKitPrice(country);
  return formatSampleKitMoney(amount, currency, locale);
}
