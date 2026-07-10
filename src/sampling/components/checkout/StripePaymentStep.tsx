import { FormEvent, useState } from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getStripePromise } from '../../lib/stripeClient';
import { PrimaryButton, StickyActionBar, TextLinkButton } from '../layout/StickyActionBar';

interface StripePaymentStepProps {
  clientSecret: string;
  paymentIntentId: string;
  sessionId: string;
  amountLabel?: string;
  onBack: () => void;
  onPaid: (payment: Record<string, unknown>) => void;
}

const appearance = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary: '#2B1809',
    colorBackground: '#FFFDFC',
    colorText: '#2B1809',
    colorDanger: '#B42318',
    fontFamily: 'Funnel Sans Variable, system-ui, sans-serif',
    borderRadius: '8px',
  },
};

const PaymentForm = ({
  paymentIntentId,
  sessionId,
  amountLabel = '$100.00',
  onBack,
  onPaid,
}: Omit<StripePaymentStepProps, 'clientSecret'>) => {
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
      const returnUrl = new URL('/curated-sampling', window.location.origin);
      returnUrl.searchParams.set('payment_return', '1');
      returnUrl.searchParams.set('session_id', sessionId);

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl.toString(),
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
        body: JSON.stringify({ sessionId, paymentIntentId: intentId }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error ?? 'Could not confirm payment with Brandsamor');
      }

      onPaid(data.payment ?? {});
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Payment failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-[#EADFD3] bg-[#FFFDFC] p-4 sm:p-5">
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      {error && (
        <p className="text-sm text-[#B42318]" role="alert">
          {error}
        </p>
      )}

      <StickyActionBar>
        <TextLinkButton type="button" onClick={onBack} disabled={submitting}>
          Back
        </TextLinkButton>
        <PrimaryButton type="submit" disabled={!stripe || !elements || submitting}>
          {submitting ? 'Processing…' : `Pay ${amountLabel}`}
        </PrimaryButton>
      </StickyActionBar>
    </form>
  );
};

export const StripePaymentStep = ({
  clientSecret,
  paymentIntentId,
  sessionId,
  amountLabel,
  onBack,
  onPaid,
}: StripePaymentStepProps) => {
  const stripePromise = getStripePromise();

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance,
      }}
    >
      <PaymentForm
        paymentIntentId={paymentIntentId}
        sessionId={sessionId}
        amountLabel={amountLabel}
        onBack={onBack}
        onPaid={onPaid}
      />
    </Elements>
  );
};
