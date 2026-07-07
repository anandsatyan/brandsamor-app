import type { ReactNode } from 'react';

export const SectionEyebrow = ({ children }: { children: ReactNode }) => (
  <h4 className="type-eyebrow mb-6 flex items-center gap-4">
    <span className="w-8 h-px bg-border" />
    {children}
  </h4>
);
