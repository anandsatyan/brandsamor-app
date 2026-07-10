import type { ReactNode } from 'react';
import { Lock } from 'lucide-react';

const CardIcon = ({ label, children }: { label: string; children: ReactNode }) => (
  <span
    className="inline-flex h-7 min-w-[42px] items-center justify-center rounded border border-[#d9d9d9] bg-white px-1.5"
    title={label}
    aria-label={label}
  >
    {children}
  </span>
);

export const PaymentMethodIcons = () => (
  <div className="flex flex-wrap items-center gap-1.5" aria-label="Accepted payment methods">
    <CardIcon label="Visa">
      <svg viewBox="0 0 48 16" className="h-3.5 w-10" aria-hidden="true">
        <text x="0" y="12" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="700" fill="#1A1F71">
          VISA
        </text>
      </svg>
    </CardIcon>
    <CardIcon label="Mastercard">
      <svg viewBox="0 0 32 20" className="h-4 w-7" aria-hidden="true">
        <circle cx="12" cy="10" r="7" fill="#EB001B" />
        <circle cx="20" cy="10" r="7" fill="#F79E1B" />
        <path d="M16 5.2a7 7 0 0 1 0 9.6 7 7 0 0 1 0-9.6z" fill="#FF5F00" />
      </svg>
    </CardIcon>
    <CardIcon label="American Express">
      <svg viewBox="0 0 48 16" className="h-3.5 w-10" aria-hidden="true">
        <rect width="48" height="16" rx="2" fill="#2E77BC" />
        <text x="5" y="11.5" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="700" fill="#fff">
          AMEX
        </text>
      </svg>
    </CardIcon>
    <CardIcon label="Discover">
      <svg viewBox="0 0 48 16" className="h-3.5 w-10" aria-hidden="true">
        <text x="0" y="12" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="700" fill="#F76F00">
          DISCOVER
        </text>
      </svg>
    </CardIcon>
  </div>
);

export const StripeBadge = () => (
  <a
    href="https://stripe.com"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 text-xs text-[#725f52] hover:text-[#2b1809]"
  >
    <span>Powered by</span>
    <svg viewBox="0 0 60 25" className="h-5 w-12" aria-label="Stripe" role="img">
      <title>Stripe</title>
      <path
        fill="#635BFF"
        d="M59.64 14.28h-8.06c.36 1.9 1.97 3.12 4.24 3.12 1.87 0 3.25-.7 4.1-1.8l.03-.04 2.12 1.4-.03.04c-1.36 1.84-3.55 2.9-6.42 2.9-4.8 0-8.1-3.18-8.1-7.9 0-4.55 3.3-7.8 7.84-7.8 4.3 0 7.2 3.1 7.2 7.55 0 .84-.08 1.66-.22 2.53h.3zm-7.7-2.3h5.5c-.2-2.05-1.7-3.35-3.5-3.35-1.9 0-3.3 1.3-3.5 3.35h1.5zm-9.2 8.82c-4.55 0-7.55-3.2-7.55-7.9s3-7.8 7.55-7.8c2.2 0 3.95.8 5.2 2.15l.04.04-1.85 1.7-.04-.04c-.85-.9-2.05-1.45-3.35-1.45-2.7 0-4.55 2.1-4.55 5.4 0 3.35 1.85 5.5 4.55 5.5 1.4 0 2.6-.55 3.5-1.5l.04-.04 1.85 1.65-.04.04c-1.3 1.4-3.15 2.25-5.45 2.25zm-13.9.2-6.05-14.2h3.15l4.2 10.55 4.15-10.55h3.1l-6.05 14.2h-2.5zM15.3 8.4c0 1.55-.95 2.45-3.05 3.05l-2.15.6c-1.35.4-1.85.8-1.85 1.55 0 .9.8 1.5 2.05 1.5 1.1 0 2.05-.4 2.85-1.15l.04-.04 1.7 1.55-.04.04c-1.15 1.15-2.7 1.8-4.7 1.8-2.7 0-4.55-1.5-4.55-3.7 0-1.7 1.05-2.7 3.25-3.3l2.15-.6c1.2-.35 1.65-.75 1.65-1.4 0-.8-.75-1.35-1.9-1.35-1.15 0-2.05.5-2.8 1.25l-.04.04L6.1 7.1l.04-.04C7.3 5.95 8.85 5.4 10.7 5.4c2.65 0 4.6 1.4 4.6 3.5zM5.2 20.8H2.05V6.6H5.2v14.2zM3.6 4.85c-1.1 0-1.95-.85-1.95-1.95S2.5.95 3.6.95s1.95.85 1.95 1.95-.85 1.95-1.95 1.95z"
      />
    </svg>
  </a>
);

export const PaymentTrustSignals = () => (
  <div className="mt-4 space-y-3 rounded-[5px] border border-[#e8e0d8] bg-[#faf7f2] p-4">
    <div className="flex items-start gap-2.5">
      <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#2b1809]" aria-hidden="true" />
      <div className="space-y-1 text-sm text-[#725f52]">
        <p className="font-medium text-[#2b1809]">Secure checkout</p>
        <p>
          Payments are processed by Stripe with 256-bit TLS encryption. Brandsamor never stores your
          full card number on our servers.
        </p>
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e8e0d8] pt-3">
      <PaymentMethodIcons />
      <StripeBadge />
    </div>
    <p className="border-t border-[#e8e0d8] pt-3 text-xs leading-relaxed text-[#725f52]">
      Need to cancel? You can request a full refund anytime before dispatch by emailing{' '}
      <a className="font-medium text-[#2b1809] underline-offset-2 hover:underline" href="mailto:info@brandsamor.com">
        info@brandsamor.com
      </a>
      .
    </p>
  </div>
);
