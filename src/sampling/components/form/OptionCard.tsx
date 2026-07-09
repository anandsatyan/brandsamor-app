import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface OptionCardProps {
  label: string;
  description?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  icon?: LucideIcon;
  badge?: string;
  horizontal?: boolean;
  className?: string;
}

export const OptionCard = ({
  label,
  description,
  selected = false,
  disabled = false,
  onClick,
  icon: Icon,
  badge,
  horizontal = false,
  className = '',
}: OptionCardProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-pressed={selected}
    className={[
      'group relative w-full rounded-2xl border text-left transition-all duration-200',
      horizontal ? 'flex items-center gap-4 p-4' : 'p-5',
      selected
        ? 'sampling-option-selected border-[#2B1809] bg-[rgba(43,24,10,0.06)]'
        : 'border-[#EADFD3] bg-[#FFFDFC] hover:border-[#2B1809]/25',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      className,
    ].join(' ')}
  >
    {Icon && (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FEF7ED] text-[#2B1809]">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
    )}
    <span className={horizontal ? 'flex-1' : 'block'}>
      <span className="flex items-start justify-between gap-2">
        <span className="text-base font-semibold text-[#2B1809]">{label}</span>
        {selected && (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2B1809] text-white">
            <Check className="h-3.5 w-3.5" aria-hidden />
          </span>
        )}
      </span>
      {description && (
        <span className="mt-1 block text-sm leading-relaxed text-[#725F52]">{description}</span>
      )}
      {badge && (
        <span className="mt-2 inline-block rounded-full bg-[#FFD43B]/30 px-2 py-0.5 text-xs font-medium text-[#2B1809]">
          {badge}
        </span>
      )}
    </span>
  </button>
);
