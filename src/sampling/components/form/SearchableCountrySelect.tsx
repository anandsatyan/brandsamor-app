import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { COUNTRIES } from '../../data/questions';

interface SearchableCountrySelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const SearchableCountrySelect = ({
  id,
  label,
  value,
  onChange,
  error,
}: SearchableCountrySelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  const selectedName = COUNTRIES.find((c) => c.code === value)?.name ?? '';

  return (
    <div className="relative space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-[#2B1809]">
        {label}
      </label>
      <button
        type="button"
        id={id}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={[
          'flex w-full items-center justify-between rounded-xl border bg-[#FFFDFC] px-4 py-3 text-left text-base',
          error ? 'border-[#B42318]' : 'border-[#EADFD3]',
          selectedName ? 'text-[#2B1809]' : 'text-[#725F52]/60',
        ].join(' ')}
      >
        {selectedName || 'Select your country'}
        <ChevronDown className="h-5 w-5 text-[#725F52]" aria-hidden />
      </button>
      {error && (
        <p className="text-sm text-[#B42318]" role="alert">
          {error}
        </p>
      )}
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-xl border border-[#EADFD3] bg-[#FFFDFC] shadow-lg">
          <div className="flex items-center gap-2 border-b border-[#EADFD3] px-3 py-2">
            <Search className="h-4 w-4 text-[#725F52]" aria-hidden />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search countries"
              className="w-full bg-transparent text-sm outline-none"
              autoFocus
            />
          </div>
          <ul role="listbox" className="max-h-48 overflow-y-auto py-1">
            {filtered.map((country) => (
              <li key={country.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value === country.code}
                  onClick={() => {
                    onChange(country.code);
                    setOpen(false);
                    setQuery('');
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#FEF7ED]"
                >
                  {country.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
