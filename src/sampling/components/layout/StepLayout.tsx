import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { WizardChrome } from './WizardChrome';
import { ProgressHeader } from './ProgressHeader';

interface StepLayoutProps {
  children: ReactNode;
  onSaveExit: () => void;
  saved?: boolean;
  currentQuestionStep: number;
}

export const StepLayout = ({
  children,
  onSaveExit,
  saved = false,
  currentQuestionStep,
}: StepLayoutProps) => (
  <div className="flex min-h-screen min-h-[100dvh] flex-col">
    <div className="fixed inset-x-0 top-0 z-50 bg-[var(--sampling-cream)]">
      <WizardChrome onSaveExit={onSaveExit} saved={saved} />
      <ProgressHeader currentQuestionStep={currentQuestionStep} />
    </div>
    <main
      className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-28 sm:max-w-xl sm:px-8 sm:pb-32"
      style={{ paddingTop: 'calc(var(--sampling-sticky-header-height) + 2rem)' }}
    >
      {children}
    </main>
  </div>
);

export const ScreenTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.22, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);
