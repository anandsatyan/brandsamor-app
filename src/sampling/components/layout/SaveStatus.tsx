import { Check } from 'lucide-react';

export const SaveStatus = ({ visible }: { visible: boolean }) => (
  <span aria-live="polite" className="inline-flex min-w-0 items-center">
    {visible ? (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#137A3A]">
        <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="truncate">Saved on this device</span>
      </span>
    ) : null}
  </span>
);
