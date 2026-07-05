import { Check } from 'lucide-react';

export const SaveStatus = ({ visible }: { visible: boolean }) => (
  <span
    className={[
      'inline-flex items-center gap-1 text-xs font-medium text-[#137A3A] transition-opacity duration-200',
      visible ? 'opacity-100' : 'opacity-0',
    ].join(' ')}
    aria-live="polite"
  >
    <Check className="h-3.5 w-3.5" aria-hidden />
    Saved on this device
  </span>
);
