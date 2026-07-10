import { loadStripe, type Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripePublishableKey = () => {
  const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;
  return key?.trim() || '';
};

export const getStripePromise = () => {
  if (!stripePromise) {
    const key = getStripePublishableKey();
    stripePromise = key ? loadStripe(key) : Promise.resolve(null);
  }
  return stripePromise;
};
