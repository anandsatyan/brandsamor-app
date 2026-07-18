import { Link } from 'react-router-dom';
import { BrandLogo } from '../../../components/BrandLogo';
import { SaveStatus } from './SaveStatus';

interface WizardChromeProps {
  onSaveExit: () => void;
  saved?: boolean;
  exitOnly?: boolean;
}

export const WizardChrome = ({ onSaveExit, saved = false, exitOnly = false }: WizardChromeProps) => (
  <header className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-4 sm:px-6 sm:py-5">
    <div aria-hidden className="min-w-0" />
    <Link
      to="/"
      className="justify-self-center transition-opacity hover:opacity-80"
      aria-label="Brandsamor home"
    >
      <BrandLogo />
    </Link>
    <div className="relative flex min-w-0 items-center justify-end gap-3 justify-self-end">
      {!exitOnly && <SaveStatus visible={saved} />}
      <button
        type="button"
        onClick={onSaveExit}
        className="whitespace-nowrap text-sm font-semibold text-[var(--sampling-muted)] transition-colors hover:text-[var(--sampling-heading)]"
      >
        {exitOnly ? 'Exit' : 'Save + exit'}
      </button>
    </div>
  </header>
);
