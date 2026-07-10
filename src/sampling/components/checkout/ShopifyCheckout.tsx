import { FormEvent, useEffect, useState } from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COUNTRIES } from '../../data/questions';
import type { LeadDetails } from '../../types/sampling';
import type { PublicFragrance } from '../../lib/fragranceApi';
import { getStripePromise } from '../../lib/stripeClient';
import { PaymentTrustSignals } from './PaymentTrustSignals';

export interface CheckoutFormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  company: string;
  shipping: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billing: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingSameAsShipping: boolean;
}

export type PaidCheckoutResult = {
  payment: Record<string, unknown>;
  order: Record<string, unknown> | null;
};

interface ShopifyCheckoutProps {
  lead: LeadDetails;
  fragrances: PublicFragrance[];
  sessionId: string;
  clientSecret: string | null;
  paymentIntentId: string | null;
  initializingPayment: boolean;
  onEnsurePaymentIntent: (checkout: CheckoutFormData) => Promise<void>;
  onPaid: (result: PaidCheckoutResult) => void;
  onRestart?: () => void;
  error: string | null;
}

const splitName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: '', lastName: '' };
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
};

const buildInitialCheckout = (lead: LeadDetails): CheckoutFormData => {
  const { firstName, lastName } = splitName(lead.fullName);
  const country = lead.country || 'US';
  const emptyAddress = { line1: '', line2: '', city: '', state: '', postalCode: '', country };
  return {
    email: lead.email,
    phone: lead.phone,
    firstName,
    lastName,
    company: lead.brandName ?? '',
    shipping: { ...emptyAddress },
    billing: { ...emptyAddress },
    billingSameAsShipping: true,
  };
};

const fieldClass =
  'w-full rounded-[5px] border border-[#d9d9d9] bg-white px-3 py-3 text-[15px] text-[#2b1809] placeholder:text-[#737373] focus:border-[#2b1809] focus:outline-none focus:ring-1 focus:ring-[#2b1809]';

const labelClass = 'sr-only';

const appearance = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary: '#2B1809',
    colorBackground: '#ffffff',
    colorText: '#2B1809',
    colorDanger: '#B42318',
    fontFamily: 'Funnel Sans Variable, system-ui, sans-serif',
    borderRadius: '5px',
  },
};

const OrderSummary = ({
  fragrances,
  onRestart,
}: {
  fragrances: PublicFragrance[];
  onRestart?: () => void;
}) => (
  <aside className="checkout-summary">
    <div className="checkout-summary-inner space-y-5">
      <div className="flex gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#e8e0d8] bg-white">
          <img
            src="/fragrance-sample-kit.png"
            alt="Brandsamor curated sample kit"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[#2b1809]">Brandsamor Curated Sample Kit</p>
            <p className="mt-1 text-xs text-[#725f52]">Five fragrance samples selected for your brand</p>
          </div>
          <p className="text-sm font-medium text-[#2b1809]">$100.00</p>
        </div>
      </div>

      {fragrances.length > 0 && (
        <ul className="space-y-2 border-t border-[#e8e0d8] pt-4">
          {fragrances.map((f) => (
            <li key={f.slug} className="flex items-start justify-between gap-3 text-xs text-[#725f52]">
              <span>
                <span className="font-medium text-[#2b1809]">No. {f.number}</span> — {f.name}
              </span>
            </li>
          ))}
        </ul>
      )}

      {onRestart && (
        <p className="border-t border-[#e8e0d8] pt-3 text-xs leading-relaxed text-[#725f52]">
          Want different fragrances?{' '}
          <button
            type="button"
            onClick={onRestart}
            className="font-semibold text-[#FF600A] underline-offset-2 hover:underline"
          >
            Restart curated sampling
          </button>
        </p>
      )}

      <div className="space-y-2 border-t border-[#e8e0d8] pt-4 text-sm">
        <div className="flex justify-between text-[#725f52]">
          <span>Subtotal</span>
          <span>$100.00</span>
        </div>
        <div className="flex justify-between text-[#725f52]">
          <span>Shipping</span>
          <span className="text-right text-xs">Included in sample kit</span>
        </div>
        <div className="flex items-baseline justify-between border-t border-[#e8e0d8] pt-3">
          <span className="text-base font-medium text-[#2b1809]">Total</span>
          <div className="text-right">
            <span className="mr-2 text-xs text-[#725f52]">USD</span>
            <span className="text-xl font-semibold text-[#2b1809]">$100.00</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-[#e8e0d8] pt-4 text-xs text-[#725f52]">
        <Lock className="h-3.5 w-3.5 text-[#2b1809]" aria-hidden="true" />
        <span>SSL encrypted · PCI compliant via Stripe</span>
      </div>
    </div>
  </aside>
);

const CheckoutPaymentForm = ({
  checkout,
  sessionId,
  paymentIntentId,
  onPaid,
  externalError,
}: {
  checkout: CheckoutFormData;
  sessionId: string;
  paymentIntentId: string;
  onPaid: (result: PaidCheckoutResult) => void;
  externalError: string | null;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    try {
      const attachRes = await fetch('/api/checkout/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, checkout, reusePaymentIntentId: paymentIntentId }),
      });
      const attachData = await attachRes.json();
      if (!attachRes.ok) throw new Error(attachData?.error ?? 'Could not save checkout details');

      const returnUrl = new URL('/curated-sampling', window.location.origin);
      returnUrl.searchParams.set('payment_return', '1');
      returnUrl.searchParams.set('session_id', sessionId);

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl.toString(),
          receipt_email: checkout.email || undefined,
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        setError(confirmError.message ?? 'Payment failed. Please try again.');
        return;
      }

      const intentId = paymentIntent?.id ?? paymentIntentId;
      if (paymentIntent && paymentIntent.status !== 'succeeded') {
        setError(`Payment status is ${paymentIntent.status}. Please try another method.`);
        return;
      }

      const res = await fetch('/api/checkout/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, paymentIntentId: intentId, checkout }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error ?? 'Could not confirm payment with Brandsamor');
      }

      onPaid({ payment: data.payment ?? {}, order: data.order ?? null });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Payment failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-[5px] border border-[#d9d9d9] bg-white p-4">
        <div className="mb-3 flex items-center gap-2">
          <Lock className="h-4 w-4 text-[#2b1809]" aria-hidden="true" />
          <p className="text-sm font-medium text-[#2b1809]">Card details</p>
        </div>
        <PaymentElement options={{ layout: 'tabs' }} />
      </div>

      <PaymentTrustSignals />

      {(error || externalError) && (
        <p
          className="rounded-[5px] border border-[#fecdca] bg-[#fef3f2] px-4 py-3 text-sm text-[#b42318]"
          role="alert"
        >
          {error || externalError}
        </p>
      )}

      <button type="submit" disabled={!stripe || !elements || submitting} className="checkout-pay-btn">
        {submitting ? 'Processing secure payment…' : 'Pay $100.00 now'}
      </button>
    </form>
  );
};

export const ShopifyCheckout = ({
  lead,
  fragrances,
  sessionId,
  clientSecret,
  paymentIntentId,
  initializingPayment,
  onEnsurePaymentIntent,
  onPaid,
  onRestart,
  error,
}: ShopifyCheckoutProps) => {
  const [checkout, setCheckout] = useState<CheckoutFormData>(() => buildInitialCheckout(lead));

  useEffect(() => {
    setCheckout(buildInitialCheckout(lead));
  }, [lead]);

  useEffect(() => {
    void onEnsurePaymentIntent(checkout);
    // Initialize PaymentIntent once when checkout mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateShipping = (patch: Partial<CheckoutFormData['shipping']>) => {
    setCheckout((prev) => {
      const shipping = { ...prev.shipping, ...patch };
      return {
        ...prev,
        shipping,
        billing: prev.billingSameAsShipping ? { ...shipping } : prev.billing,
      };
    });
  };

  const updateBilling = (patch: Partial<CheckoutFormData['billing']>) => {
    setCheckout((prev) => ({ ...prev, billing: { ...prev.billing, ...patch }, billingSameAsShipping: false }));
  };

  return (
    <div className="checkout-shell">
      <div className="checkout-layout">
        <div className="checkout-main">
          <h1 className="checkout-page-title">Checkout</h1>

          <section className="checkout-section">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="checkout-section-title">Contact</h2>
            </div>
            <div className="space-y-3">
              <label className="block">
                <span className={labelClass}>Email</span>
                <input
                  type="email"
                  className={fieldClass}
                  placeholder="Email"
                  value={checkout.email}
                  onChange={(e) => setCheckout((s) => ({ ...s, email: e.target.value }))}
                  autoComplete="email"
                />
              </label>
              <label className="block">
                <span className={labelClass}>Phone</span>
                <input
                  type="tel"
                  className={fieldClass}
                  placeholder="Phone"
                  value={checkout.phone}
                  onChange={(e) => setCheckout((s) => ({ ...s, phone: e.target.value }))}
                  autoComplete="tel"
                />
              </label>
            </div>
          </section>

          <section className="checkout-section">
            <h2 className="checkout-section-title">Delivery</h2>
            <div className="mt-3 space-y-3">
              <label className="block">
                <span className={labelClass}>Country/Region</span>
                <select
                  className={fieldClass}
                  value={checkout.shipping.country}
                  onChange={(e) => updateShipping({ country: e.target.value })}
                  autoComplete="shipping country"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>First name</span>
                  <input
                    className={fieldClass}
                    placeholder="First name"
                    value={checkout.firstName}
                    onChange={(e) => setCheckout((s) => ({ ...s, firstName: e.target.value }))}
                    autoComplete="given-name"
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>Last name</span>
                  <input
                    className={fieldClass}
                    placeholder="Last name"
                    value={checkout.lastName}
                    onChange={(e) => setCheckout((s) => ({ ...s, lastName: e.target.value }))}
                    autoComplete="family-name"
                  />
                </label>
              </div>
              <label className="block">
                <span className={labelClass}>Company (optional)</span>
                <input
                  className={fieldClass}
                  placeholder="Company (optional)"
                  value={checkout.company}
                  onChange={(e) => setCheckout((s) => ({ ...s, company: e.target.value }))}
                  autoComplete="organization"
                />
              </label>
              <label className="block">
                <span className={labelClass}>Address</span>
                <input
                  className={fieldClass}
                  placeholder="Address"
                  value={checkout.shipping.line1}
                  onChange={(e) => updateShipping({ line1: e.target.value })}
                  autoComplete="address-line1"
                />
              </label>
              <label className="block">
                <span className={labelClass}>Apartment, suite, etc. (optional)</span>
                <input
                  className={fieldClass}
                  placeholder="Apartment, suite, etc. (optional)"
                  value={checkout.shipping.line2}
                  onChange={(e) => updateShipping({ line2: e.target.value })}
                  autoComplete="address-line2"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="block sm:col-span-1">
                  <span className={labelClass}>City</span>
                  <input
                    className={fieldClass}
                    placeholder="City"
                    value={checkout.shipping.city}
                    onChange={(e) => updateShipping({ city: e.target.value })}
                    autoComplete="address-level2"
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>State</span>
                  <input
                    className={fieldClass}
                    placeholder="State"
                    value={checkout.shipping.state}
                    onChange={(e) => updateShipping({ state: e.target.value })}
                    autoComplete="address-level1"
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>ZIP code</span>
                  <input
                    className={fieldClass}
                    placeholder="ZIP code"
                    value={checkout.shipping.postalCode}
                    onChange={(e) => updateShipping({ postalCode: e.target.value })}
                    autoComplete="postal-code"
                  />
                </label>
              </div>
            </div>
          </section>

          <section className="checkout-section">
            <h2 className="checkout-section-title">Shipping method</h2>
            <div className="mt-3 rounded-[5px] border border-[#d9d9d9] bg-[#fafafa] px-4 py-3 text-sm text-[#725f52]">
              Standard shipping is included with your curated sample kit.
            </div>
          </section>

          <section className="checkout-section">
            <h2 className="checkout-section-title">Billing address</h2>
            <label className="mt-3 flex items-center gap-2 text-sm text-[#2b1809]">
              <input
                type="checkbox"
                checked={checkout.billingSameAsShipping}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setCheckout((prev) => ({
                    ...prev,
                    billingSameAsShipping: checked,
                    billing: checked ? { ...prev.shipping } : prev.billing,
                  }));
                }}
                className="h-4 w-4 accent-[#2b1809]"
              />
              Same as shipping address
            </label>

            {!checkout.billingSameAsShipping && (
              <div className="mt-3 space-y-3">
                <label className="block">
                  <span className={labelClass}>Billing country/region</span>
                  <select
                    className={fieldClass}
                    value={checkout.billing.country}
                    onChange={(e) => updateBilling({ country: e.target.value })}
                    autoComplete="billing country"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className={labelClass}>Billing address</span>
                  <input
                    className={fieldClass}
                    placeholder="Address"
                    value={checkout.billing.line1}
                    onChange={(e) => updateBilling({ line1: e.target.value })}
                    autoComplete="billing address-line1"
                  />
                </label>
                <label className="block">
                  <span className={labelClass}>Apartment, suite, etc. (optional)</span>
                  <input
                    className={fieldClass}
                    placeholder="Apartment, suite, etc. (optional)"
                    value={checkout.billing.line2}
                    onChange={(e) => updateBilling({ line2: e.target.value })}
                    autoComplete="billing address-line2"
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="block">
                    <span className={labelClass}>City</span>
                    <input
                      className={fieldClass}
                      placeholder="City"
                      value={checkout.billing.city}
                      onChange={(e) => updateBilling({ city: e.target.value })}
                      autoComplete="billing address-level2"
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>State</span>
                    <input
                      className={fieldClass}
                      placeholder="State"
                      value={checkout.billing.state}
                      onChange={(e) => updateBilling({ state: e.target.value })}
                      autoComplete="billing address-level1"
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>ZIP code</span>
                    <input
                      className={fieldClass}
                      placeholder="ZIP code"
                      value={checkout.billing.postalCode}
                      onChange={(e) => updateBilling({ postalCode: e.target.value })}
                      autoComplete="billing postal-code"
                    />
                  </label>
                </div>
              </div>
            )}
          </section>

          <section className="checkout-section">
            <h2 className="checkout-section-title">Payment</h2>
            <p className="mt-1 text-sm text-[#725f52]">All transactions are secure and encrypted - Powered by Stripe</p>

            <div className="mt-3">
              {initializingPayment && !clientSecret && (
                <div className="rounded-[5px] border border-[#d9d9d9] bg-white p-4 text-sm text-[#725f52]">
                  Preparing secure payment form…
                </div>
              )}

              {clientSecret && paymentIntentId ? (
                <Elements stripe={getStripePromise()} options={{ clientSecret, appearance }}>
                  <CheckoutPaymentForm
                    checkout={checkout}
                    sessionId={sessionId}
                    paymentIntentId={paymentIntentId}
                    onPaid={onPaid}
                    externalError={error}
                  />
                </Elements>
              ) : (
                !initializingPayment && (
                  <div className="space-y-3">
                    <PaymentTrustSignals />
                    {error && (
                      <p
                        className="rounded-[5px] border border-[#fecdca] bg-[#fef3f2] px-4 py-3 text-sm text-[#b42318]"
                        role="alert"
                      >
                        {error}
                      </p>
                    )}
                    <button
                      type="button"
                      className="checkout-pay-btn"
                      onClick={() => void onEnsurePaymentIntent(checkout)}
                    >
                      Retry loading payment
                    </button>
                  </div>
                )
              )}
            </div>
          </section>

          <p className="checkout-footer-links">
            <Link to="/refund-and-cancellation-policy">Refund policy</Link>
            <Link to="/privacy-policy">Privacy policy</Link>
            <Link to="/terms">Terms of service</Link>
          </p>
        </div>

        <OrderSummary fragrances={fragrances} onRestart={onRestart} />
      </div>
    </div>
  );
};
