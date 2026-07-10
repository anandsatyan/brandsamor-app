import type { ReactNode } from 'react';

interface FieldInputProps {
  id: string;
  label: ReactNode;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
  optional?: boolean;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export const FieldInput = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  optional = false,
  error,
  multiline = false,
  rows = 4,
}: FieldInputProps) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-sm font-semibold text-[#2B1809]">
      {label}
      {optional && <span className="ml-1 font-normal text-[#725F52]">(optional)</span>}
    </label>
    {multiline ? (
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        className={[
          'w-full rounded-xl border bg-[#FFFDFC] px-4 py-3 text-base text-[#2B1809] placeholder:text-[#725F52]/60',
          error ? 'border-[#B42318]' : 'border-[#EADFD3] focus:border-[#FF600A]',
        ].join(' ')}
      />
    ) : (
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={[
          'w-full rounded-xl border bg-[#FFFDFC] px-4 py-3 text-base text-[#2B1809] placeholder:text-[#725F52]/60',
          error ? 'border-[#B42318]' : 'border-[#EADFD3] focus:border-[#FF600A]',
        ].join(' ')}
      />
    )}
    {error && (
      <p className="text-sm text-[#B42318]" role="alert">
        {error}
      </p>
    )}
  </div>
);
