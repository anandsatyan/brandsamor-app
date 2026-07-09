import { motion } from 'framer-motion';
import { QUESTIONNAIRE_STEPS } from '../../types/sampling';

interface ProgressHeaderProps {
  currentQuestionStep: number;
}

const segmentState = (index: number, currentIndex: number) => {
  if (index < currentIndex) return 'complete' as const;
  if (index === currentIndex) return 'current' as const;
  return 'pending' as const;
};

export const ProgressHeader = ({ currentQuestionStep }: ProgressHeaderProps) => {
  const currentIndex = Math.max(0, currentQuestionStep - 1);

  return (
    <nav aria-label="Brief progress" className="w-full">
      <div className="flex w-full">
        {QUESTIONNAIRE_STEPS.map((segment, index) => {
          const state = segmentState(index, currentIndex);

          return (
            <motion.div
              key={segment.id}
              className={[
                'relative flex h-10 flex-1 items-center justify-center px-1 sm:h-11 sm:px-2',
                state === 'complete' && 'bg-[var(--sampling-progress-complete)]',
                state === 'current' && 'bg-[var(--sampling-progress-current)]',
                state === 'pending' && 'bg-[var(--sampling-progress-pending)]',
              ]
                .filter(Boolean)
                .join(' ')}
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <span
                className={[
                  'text-center text-[8px] font-semibold uppercase leading-tight tracking-wide sm:text-[10px] sm:tracking-wider',
                  state === 'pending'
                    ? 'text-[var(--sampling-muted)]'
                    : 'text-white',
                ].join(' ')}
              >
                <span className="hidden min-[480px]:inline">{segment.shortLabel}</span>
                <span className="min-[480px]:hidden">{segment.shortLabel.split(' ')[0]}</span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </nav>
  );
};
