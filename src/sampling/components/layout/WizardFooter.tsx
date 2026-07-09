import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { StickyActionBar } from './StickyActionBar';

interface WizardFooterProps {
  children: ReactNode;
  onBack?: () => void;
  secondary?: ReactNode;
}

export const WizardFooter = ({ children, onBack, secondary }: WizardFooterProps) => (
  <>
    {onBack && (
      <button
        type="button"
        onClick={onBack}
        className="fixed bottom-6 left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--sampling-heading)] text-white shadow-md transition-transform hover:scale-105 active:scale-95 motion-reduce:transition-none sm:left-6"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5" aria-hidden />
      </button>
    )}
    <div className="mt-8 lg:mt-10">
      <StickyActionBar secondary={secondary}>{children}</StickyActionBar>
    </div>
  </>
);
