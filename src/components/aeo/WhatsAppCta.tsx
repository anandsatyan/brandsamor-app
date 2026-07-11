import { MessageCircle } from 'lucide-react';
import { WHATSAPP_GCC, whatsappHref } from '../../seo/contactChannels';

export const WhatsAppCta = ({
  prefill = 'Hi Brandsamor — I am interested in private label perfume manufacturing for the UAE/KSA market.',
  label = 'Chat on WhatsApp',
  className = '',
  variant = 'inline',
}: {
  prefill?: string;
  label?: string;
  className?: string;
  variant?: 'inline' | 'button' | 'floating';
}) => {
  const href = whatsappHref(prefill);

  if (variant === 'floating') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp Brandsamor at ${WHATSAPP_GCC.display}`}
        className={`fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-[2px] bg-[#25D366] px-4 py-3 text-white shadow-lg type-caption font-semibold uppercase tracking-wider hover:opacity-95 ${className}`}
      >
        <MessageCircle size={18} aria-hidden="true" />
        WhatsApp
      </a>
    );
  }

  if (variant === 'button') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-5 py-3 font-semibold uppercase tracking-wider rounded-[2px] bg-[#25D366] text-white hover:opacity-95 ${className}`}
      >
        <MessageCircle size={18} aria-hidden="true" />
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-heading underline underline-offset-4 hover:opacity-80 ${className}`}
    >
      <MessageCircle size={16} aria-hidden="true" />
      {label} ({WHATSAPP_GCC.display})
    </a>
  );
};
