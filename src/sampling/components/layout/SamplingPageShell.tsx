import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { WizardChrome } from './WizardChrome';
import { ProgressHeader } from './ProgressHeader';
import { STEP_CONTACT, STEP_REVIEW } from '../../types/sampling';

interface SamplingPageShellProps {
  children: ReactNode;
  currentStep: number;
  onSaveExit: () => void;
  saved?: boolean;
  exitOnly?: boolean;
  contentClassName?: string;
}

export const SamplingPageShell = ({
  children,
  currentStep,
  onSaveExit,
  saved = false,
  exitOnly = false,
  contentClassName = '',
}: SamplingPageShellProps) => {
  const showProgress = currentStep >= STEP_CONTACT && currentStep <= STEP_REVIEW;
  const paddingTop = showProgress
    ? 'calc(var(--sampling-sticky-header-height) + 2rem)'
    : 'calc(var(--sampling-chrome-height) + 2rem)';

  return (
    <div
      className="flex min-h-screen min-h-[100dvh] flex-col"
      style={
        {
          '--sampling-scroll-offset': showProgress
            ? 'var(--sampling-sticky-header-height)'
            : 'var(--sampling-chrome-height)',
        } as CSSProperties
      }
    >
      <div className="fixed inset-x-0 top-0 z-50 bg-[var(--sampling-cream)]">
        <WizardChrome onSaveExit={onSaveExit} saved={saved} exitOnly={exitOnly} />
        {showProgress && <ProgressHeader currentQuestionStep={currentStep} />}
      </div>
      <main
        className={`mx-auto flex w-full flex-1 flex-col px-5 pb-28 sm:px-8 sm:pb-32 ${contentClassName}`}
        style={{ paddingTop }}
      >
        {children}
      </main>
    </div>
  );
};

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
