import { CheckCircle2, Copy } from 'lucide-react';
import { useState } from 'react';
import { PrimaryButton, StickyActionBar } from '../layout/StickyActionBar';
import { PaymentTrustSignals } from './PaymentTrustSignals';

type OrderThankYouProps = {
  order: Record<string, unknown> | null;
  payment: Record<string, unknown> | null;
  onDone: () => void;
};

const copyText = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
};

export const OrderThankYou = ({ order, payment, onDone }: OrderThankYouProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const sampleOrderNumber = String(
    order?.sampleOrderLabel ??
      (order?.sampleOrderNumber ? `SO-${order.sampleOrderNumber}` : 'Pending'),
  );
  const transactionId = String(order?.transactionId ?? payment?.transactionId ?? 'Pending');
  const amount =
    typeof payment?.amount === 'number'
      ? `$${(Number(payment.amount) / 100).toFixed(2)}`
      : typeof order?.amount === 'number'
        ? `$${(Number(order.amount) / 100).toFixed(2)}`
        : '$100.00';

  const handleCopy = async (label: string, value: string) => {
    const ok = await copyText(value);
    if (ok) {
      setCopied(label);
      window.setTimeout(() => setCopied(null), 1800);
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 flex justify-center">
        <CheckCircle2 className="h-14 w-14 text-[#1f7a4d]" aria-hidden="true" />
      </div>
      <h1 className="text-center type-h1">Thank you. Your sample kit order is confirmed.</h1>
      <p className="mt-3 text-center type-body text-[#725F52]">
        We received your payment securely. Save your order and transaction details below for your
        records. Brandsamor will follow up with shipping updates using your checkout contact details.
      </p>

      <div className="mt-8 space-y-3 rounded-2xl border border-[#EADFD3] bg-[#FFFDFC] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#725F52]">
              Sample order number
            </p>
            <p className="mt-1 font-serif text-2xl text-[#2B1809]">{sampleOrderNumber}</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-[2px] border border-[#EADFD3] px-3 py-2 text-xs font-semibold text-[#2B1809]"
            onClick={() => void handleCopy('order', sampleOrderNumber)}
          >
            <Copy className="h-3.5 w-3.5" />
            {copied === 'order' ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className="border-t border-[#EADFD3] pt-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#725F52]">
                Transaction ID
              </p>
              <p className="mt-1 break-all font-mono text-sm text-[#2B1809]">{transactionId}</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-[2px] border border-[#EADFD3] px-3 py-2 text-xs font-semibold text-[#2B1809]"
              onClick={() => void handleCopy('txn', transactionId)}
            >
              <Copy className="h-3.5 w-3.5" />
              {copied === 'txn' ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="border-t border-[#EADFD3] pt-3 text-sm text-[#725F52]">
          <p>
            <span className="font-semibold text-[#2B1809]">Amount paid:</span> {amount} USD
          </p>
          <p className="mt-1">
            <span className="font-semibold text-[#2B1809]">Product:</span> Curated Sample Kit (5
            fragrances)
          </p>
        </div>
      </div>

      <div className="mt-5">
        <PaymentTrustSignals />
      </div>

      <div className="mt-8">
        <StickyActionBar>
          <PrimaryButton onClick={onDone}>Back to start</PrimaryButton>
        </StickyActionBar>
      </div>
    </div>
  );
};
