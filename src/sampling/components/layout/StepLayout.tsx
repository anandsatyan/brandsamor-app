import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { VialIllustration } from '../sampling/VialIllustration';

interface StepLayoutProps {
  children: ReactNode;
  contextTitle?: string;
  contextBody?: string;
  showVials?: boolean;
  vialCount?: number;
}

const panelCopy: Record<string, { title: string; body: string }> = {
  default: {
    title: 'Curated for your brand',
    body: 'Answer a few guided questions and we will shape exactly five fragrance directions for your sample kit.',
  },
  contact: {
    title: 'Your brief starts here',
    body: 'We save your progress on this device so you can return anytime.',
  },
  review: {
    title: 'Almost there',
    body: 'Review your brief before we curate your five fragrance directions.',
  },
  result: {
    title: 'Five focused directions',
    body: 'Each selection is designed to help you compare distinct scent styles without overwhelm.',
  },
};

export const StepLayout = ({
  children,
  contextTitle,
  contextBody,
  showVials = true,
  vialCount = 5,
}: StepLayoutProps) => {
  const copy = panelCopy.default;

  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:min-h-[100dvh] lg:flex-row">
      <aside className="hidden border-r border-[#EADFD3] bg-[#FFFDFC] px-8 py-10 lg:flex lg:w-[38%] lg:flex-col lg:justify-between">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#FF600A]">
            Brandsamor Sampling
          </p>
          <h2 className="text-3xl font-bold leading-tight text-[#2B1809]">
            {contextTitle ?? copy.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#725F52]">
            {contextBody ?? copy.body}
          </p>
        </div>
        {showVials && (
          <div className="mt-8 flex justify-center gap-3">
            {Array.from({ length: vialCount }).map((_, i) => (
              <VialIllustration key={i} index={i} animate />
            ))}
          </div>
        )}
      </aside>

      <main className="flex flex-1 flex-col">
        <div className="flex-1 px-4 py-6 pb-28 sm:px-6 sm:py-8 lg:max-w-[720px] lg:px-10 lg:py-12 lg:pb-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export const ScreenTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 16 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -12 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);
