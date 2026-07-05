import { Check } from 'lucide-react';

interface MultiSelectChipProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const MultiSelectChip = ({
  label,
  selected = false,
  disabled = false,
  onClick,
}: MultiSelectChipProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-pressed={selected}
    className={[
      'inline-flex items-center gap-2 rounded-full border-2 px-5 py-3 text-[15px] font-semibold transition-all duration-200',
      selected
        ? 'sampling-chip-selected border-[#FF600A] bg-[rgba(255,96,10,0.08)] text-[#2B1809]'
        : 'border-[#EADFD3] bg-[#FFFDFC] text-[#2B1809] hover:border-[#FF600A]/40',
      disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
    ].join(' ')}
  >
    {selected && <Check className="h-4 w-4 text-[#FF600A]" aria-hidden />}
    {label}
  </button>
);
