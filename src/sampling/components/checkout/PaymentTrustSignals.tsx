import { Lock, Mail, ShieldCheck } from 'lucide-react';

export const StripeBadge = () => (
  <a
    href="https://stripe.com"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-xs text-[#725f52] hover:text-[#2b1809]"
  >
    <span>Powered by</span>
    <span className="inline-flex items-center rounded-[3px] bg-[#0a2540] px-2 py-1">
      <img
        src="/stripe-logo.png"
        alt="Stripe"
        width={72}
        height={24}
        className="h-4 w-auto"
      />
    </span>
  </a>
);

export const PaymentTrustSignals = () => (
  <div className="mt-4 rounded-[5px] border border-[#e8e0d8] bg-[#faf7f2] p-4">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#2b1809]" aria-hidden="true" />
          <div className="space-y-0.5 text-sm text-[#725f52]">
            <p className="font-medium text-[#2b1809]">256-bit encrypted payment</p>
            <p>Your card details are encrypted in transit and processed by Stripe. Brandsamor never stores your full card number.</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#2b1809]" aria-hidden="true" />
          <div className="space-y-0.5 text-sm text-[#725f52]">
            <p className="font-medium text-[#2b1809]">PCI-compliant checkout</p>
            <p>Payments run on Stripe’s certified infrastructure used by millions of businesses worldwide.</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#2b1809]" aria-hidden="true" />
          <div className="space-y-0.5 text-sm text-[#725f52]">
            <p className="font-medium text-[#2b1809]">Full refund before dispatch</p>
            <p>
              Change your mind anytime before we ship — email{' '}
              <a
                className="font-medium text-[#2b1809] underline-offset-2 hover:underline"
                href="mailto:info@brandsamor.com"
              >
                info@brandsamor.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-[#e8e0d8] pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
        <StripeBadge />
      </div>
    </div>
  </div>
);
