import { useEffect, useState } from 'react';
import { COUNTRIES } from '../../data/questions';
import type { LeadDetails } from '../../types/sampling';
import type { PublicFragrance } from '../../lib/fragranceApi';

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

interface ShopifyCheckoutProps {
  lead: LeadDetails;
  fragrances: PublicFragrance[];
  onPay: (checkout: CheckoutFormData) => Promise<void>;
  error: string | null;
  paying: boolean;
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

const OrderSummary = ({ fragrances }: { fragrances: PublicFragrance[] }) => (
  <aside className="checkout-summary">
    <div className="checkout-summary-inner space-y-5">
      <div className="flex gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#e8e0d8] bg-white">
          <img
            src="/img-sample-kit.png"
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
    </div>
  </aside>
);

export const ShopifyCheckout = ({ lead, fragrances, onPay, error, paying }: ShopifyCheckoutProps) => {
  const [checkout, setCheckout] = useState<CheckoutFormData>(() => buildInitialCheckout(lead));

  useEffect(() => {
    setCheckout(buildInitialCheckout(lead));
  }, [lead]);

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
          <p className="mt-1 text-sm text-[#725f52]">All transactions are secure and encrypted.</p>
          <div className="mt-3 rounded-[5px] border border-[#d9d9d9] bg-white p-4">
            <p className="text-sm font-medium text-[#2b1809]">Credit card</p>
            <p className="mt-2 text-sm text-[#725f52]">
              Card payment is processed securely via Stripe after you click Pay now.
            </p>
          </div>
        </section>

        {error && (
          <p className="rounded-[5px] border border-[#fecdca] bg-[#fef3f2] px-4 py-3 text-sm text-[#b42318]" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          disabled={paying}
          onClick={() => onPay(checkout)}
          className="checkout-pay-btn"
        >
          {paying ? 'Processing…' : 'Pay now'}
        </button>

        <p className="checkout-footer-links">
          <span>Refund policy</span>
          <span>Shipping</span>
          <span>Privacy policy</span>
          <span>Terms of service</span>
        </p>
      </div>

      <OrderSummary fragrances={fragrances} />
      </div>
    </div>
  );
};
