import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CURATED_SAMPLING_PATH, LEAD_FORM_PATH } from '../../routes/leadForm';
import { ORGANIZATION } from '../../seo/siteConfig';
import { WhatsAppCta } from './WhatsAppCta';

export const StickyCtaBar = ({
  showWhatsApp = false,
  whatsappPrefill,
}: {
  showWhatsApp?: boolean;
  whatsappPrefill?: string;
}) => (
  <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur md:hidden">
    <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2">
      <a
        href={`tel:${ORGANIZATION.phone}`}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[2px] border border-border text-heading"
        aria-label={`Call ${ORGANIZATION.phone}`}
      >
        <Phone size={18} aria-hidden="true" />
      </a>
      {showWhatsApp && (
        <WhatsAppCta
          variant="button"
          label="WhatsApp"
          prefill={whatsappPrefill}
          className="!px-3 !py-2.5 shrink-0"
        />
      )}
      <Link to={CURATED_SAMPLING_PATH} className="btn-primary flex-1 justify-center text-center !py-2.5 !px-3">
        Sample
      </Link>
      <Link
        to={LEAD_FORM_PATH}
        className="flex-1 justify-center text-center inline-flex items-center px-3 py-2.5 font-semibold uppercase tracking-wider border border-heading/20 text-heading rounded-[2px]"
      >
        Quote
      </Link>
    </div>
  </div>
);
