import { ArrowLeft } from 'lucide-react';
import { QUESTIONNAIRE_STEPS } from '../../types/sampling';
import { SaveStatus } from './SaveStatus';

interface ProgressHeaderProps {
  currentQuestionStep: number;
  totalSteps?: number;
  stepLabel?: string;
  onBack?: () => void;
  showBack?: boolean;
  saved?: boolean;
}

export const ProgressHeader = ({
  currentQuestionStep,
  totalSteps = QUESTIONNAIRE_STEPS.length,
  stepLabel,
  onBack,
  showBack = true,
  saved = false,
}: ProgressHeaderProps) => {
  const progress = Math.min(100, Math.round((currentQuestionStep / totalSteps) * 100));
  const label = stepLabel ?? QUESTIONNAIRE_STEPS.find((s) => s.id === currentQuestionStep)?.label ?? '';

  return (
    <header className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        {showBack && onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#725F52] hover:text-[#2B1809]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
        ) : (
          <span />
        )}
        <SaveStatus visible={saved} />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-[#2B1809]">{label}</span>
          <span className="text-[#725F52]">
            Step {currentQuestionStep} of {totalSteps}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[#EADFD3]">
          <div
            className="h-full rounded-full bg-[#FF600A] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </header>
  );
};
