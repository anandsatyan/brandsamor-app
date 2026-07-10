import type { ReactNode } from 'react';

interface StickyActionBarProps {
  children: ReactNode;
  secondary?: ReactNode;
}

export const StickyActionBar = ({ children, secondary }: StickyActionBarProps) => (
  <div className="sticky bottom-0 left-0 right-0 z-10 -mx-4 border-t border-[#EADFD3] bg-[#f3efe3]/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex-1">{children}</div>
      {secondary && <div className="flex justify-center sm:justify-end">{secondary}</div>}
    </div>
  </div>
);

export const PrimaryButton = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="w-full rounded-[2px] bg-heading px-6 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:min-w-[200px]"
  >
    {children}
  </button>
);

export const TextLinkButton = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="text-sm font-semibold text-[#FF600A] underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
  >
    {children}
  </button>
);
