import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SITE_NAV, type NavKey } from '../routes/siteRoutes';

type SiteHeaderProps = {
  activeNavKey?: NavKey | null;
};

export const SiteHeader = ({ activeNavKey: activeNavKeyProp }: SiteHeaderProps = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const resolvedActiveKey: NavKey | null =
    activeNavKeyProp ?? SITE_NAV.find((item) => item.path === pathname)?.navKey ?? null;

  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  const handleNavClick = () => setIsMenuOpen(false);

  const isNavActive = (item: (typeof SITE_NAV)[number]) =>
    item.navKey != null && item.navKey === resolvedActiveKey;

  const activeUnderline = (
    <span
      className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#A8BBBF] rounded-full"
      aria-hidden="true"
    />
  );

  const renderNavItem = (
    item: (typeof SITE_NAV)[number],
    className: string,
    onClick?: () => void,
    showUnderline = true,
  ) => {
    const isActive = isNavActive(item);

    return (
      <Link to={item.path} onClick={onClick} className={className}>
        {showUnderline && isActive && activeUnderline}
        {item.label}
      </Link>
    );
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#f1ece0]/70 bg-[#f9f7f2]/75 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-[#f9f7f2]/60">
        <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-12 py-4 sm:py-5">
          <button
            type="button"
            className="absolute left-4 sm:left-6 lg:hidden p-1 text-[#2D302B] hover:text-[#A8BBBF]"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-[#A8BBBF] text-xl sm:text-2xl font-bold tracking-tight">
              Brandsamor
            </span>
          </Link>

          <a
            href="#"
            className="absolute right-4 sm:right-6 lg:right-12 text-sm text-[#77736E] hover:text-[#2D302B]"
          >
            Login
          </a>
        </div>

        <nav className="hidden lg:block border-t border-[#f1ece0]/70" aria-label="Main navigation">
          <div className="grid grid-cols-3 xl:grid-cols-6 max-w-6xl mx-auto">
            {SITE_NAV.map((item) => (
              <span key={item.path} className="contents">
                {renderNavItem(
                  item,
                  `relative px-2 py-3 text-center text-[10px] xl:text-xs uppercase tracking-[0.12em] xl:tracking-[0.15em] font-medium ${
                    isNavActive(item) ? 'text-[#2D302B]' : 'text-[#77736E] hover:text-[#2D302B]'
                  }`,
                )}
              </span>
            ))}
          </div>
        </nav>
      </header>

      <div className="h-[68px] lg:h-[114px]" aria-hidden="true" />

      {isMenuOpen && (
        <>
          <button
            type="button"
            className="mobile-nav-backdrop fixed inset-0 z-[60] bg-[#2D302B]/30 backdrop-blur-[2px] lg:hidden"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />

          <nav
            id="mobile-nav-drawer"
            className="mobile-nav-drawer fixed top-0 left-0 z-[70] h-full w-[min(85vw,320px)] border-r border-[#f1ece0]/70 bg-[#f9f7f2]/95 backdrop-blur-lg lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#f1ece0]/70">
              <Link
                to="/"
                onClick={handleNavClick}
                className="font-display text-[#A8BBBF] text-lg font-bold tracking-tight"
              >
                Brandsamor
              </Link>
              <button
                type="button"
                className="p-1 text-[#2D302B] hover:text-[#A8BBBF]"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col py-2">
              {SITE_NAV.map((item) => (
                <span key={item.path} className="contents">
                  {renderNavItem(
                    item,
                    `relative px-5 py-4 text-sm uppercase tracking-[0.12em] font-medium border-b-[3px] ${
                      isNavActive(item)
                        ? 'text-[#2D302B] border-[#A8BBBF]'
                        : 'text-[#77736E] border-transparent hover:text-[#2D302B] hover:border-[#f1ece0]'
                    }`,
                    handleNavClick,
                    false,
                  )}
                </span>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-5 py-6 border-t border-[#f1ece0]/70">
              <a
                href="#"
                onClick={handleNavClick}
                className="block text-center text-sm text-[#77736E] hover:text-[#2D302B]"
              >
                Login
              </a>
            </div>
          </nav>
        </>
      )}
    </>
  );
};
