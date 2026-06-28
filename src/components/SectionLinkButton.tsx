import { Link } from 'react-router-dom';

export const SectionLinkButton = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="inline-flex items-center px-5 py-3 text-sm font-semibold uppercase tracking-wider rounded-lg border border-[#2D302B] text-[#2D302B] hover:bg-[#2D302B] hover:text-white transition-colors"
  >
    {children}
  </Link>
);
