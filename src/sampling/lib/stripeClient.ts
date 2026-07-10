import { loadStripe, type Stripe } from '@stripe/stripe-js';

export type StripePublicConfig = {
  publishableKey: string;
  amount: number;
  currency: string;
};

let cachedConfig: StripePublicConfig | null | undefined;
let stripePromise: Promise<Stripe | null> | null = null;

export async function fetchStripeConfig(): Promise<StripePublicConfig> {
  if (cachedConfig) return cachedConfig;

  const res = await fetch('/api/stripe/config');
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error ?? 'Stripe is not configured');
  }

  cachedConfig = {
    publishableKey: String(data.publishableKey),
    amount: Number(data.amount),
    currency: String(data.currency || 'usd'),
  };
  return cachedConfig;
}

export function getStripePromise(publishableKey: string): Promise<Stripe | null> {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
}
