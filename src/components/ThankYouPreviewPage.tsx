import { Link } from 'react-router-dom';
import { OrderThankYou } from '../sampling/components/checkout/OrderThankYou';
import { BrandLogo } from './BrandLogo';
import { SeoHead } from './SeoHead';

const PREVIEW_ORDER = {
  sampleOrderNumber: 10101,
  sampleOrderLabel: 'SO-10101',
  transactionId: 'TXN-10101-PREVIEW01',
  paymentIntentId: 'pi_preview_demo',
  amount: 10000,
  currency: 'usd',
  paidAt: new Date().toISOString(),
  product: 'curated-sample-kit',
};

const PREVIEW_PAYMENT = {
  paymentIntentId: 'pi_preview_demo',
  status: 'succeeded',
  amount: 10000,
  amountReceived: 10000,
  currency: 'usd',
  transactionId: 'TXN-10101-PREVIEW01',
  sampleOrderNumber: 10101,
  paidAt: new Date().toISOString(),
  source: 'preview',
};

/** Temporary local preview — remove when thank-you design is finalized. */
export const ThankYouPreviewPage = () => (
  <div className="min-h-screen bg-[#f3efe3] px-4 py-8 sm:px-6 sm:py-12">
    <SeoHead
      title="Thank you preview | Brandsamor"
      description="Temporary preview of the sample kit thank-you page."
      url="https://www.brandsamor.com/curated-sampling/thank-you-preview"
      robots="noindex, nofollow"
    />
    <div className="mx-auto mb-8 flex max-w-xl items-center justify-between gap-4">
      <Link to="/">
        <BrandLogo />
      </Link>
      <p className="type-caption text-[#725F52]">Preview only · not a real order</p>
    </div>
    <OrderThankYou
      order={PREVIEW_ORDER}
      payment={PREVIEW_PAYMENT}
      onDone={() => {
        window.location.href = '/curated-sampling';
      }}
    />
  </div>
);
