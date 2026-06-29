import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
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

  const renderNavItem = (
    item: (typeof SITE_NAV)[number],
    className: string,
    onClick?: () => void,
  ) => (
    <Link to={item.path} onClick={onClick} className={className}>
      {item.label}
    </Link>
  );

  return (
    <>
      <header className="site-header fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-surface/75">
        <div className="site-header__bar relative flex items-center justify-center px-4 sm:px-6 lg:px-12 py-4 sm:py-5">
          <button
            type="button"
            className="site-header__menu-btn absolute left-4 sm:left-6 lg:hidden p-1 text-heading hover:text-accent"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/" className="flex items-center gap-2" aria-label="Brandsamor home">
            <BrandLogo />
          </Link>

          <Link
            to="/login"
            className={`site-header__login absolute right-4 sm:right-6 lg:right-12 text-sm ${
              pathname === '/login' ? 'text-accent' : 'text-body hover:text-accent'
            }`}
          >
            Login
          </Link>
        </div>

        <nav className="site-header__nav hidden lg:block px-4 xl:px-8" aria-label="Main navigation">
          <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-center gap-x-3 xl:gap-x-5 2xl:gap-x-7">
            {SITE_NAV.map((item) => (
              <span key={item.path} className="contents">
                {renderNavItem(
                  item,
                  `shrink-0 whitespace-nowrap px-1 py-3 text-center text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.08em] xl:tracking-[0.1em] 2xl:tracking-[0.12em] font-medium ${
                    isNavActive(item) ? 'text-accent' : 'text-body hover:text-accent'
                  }`,
                )}
              </span>
            ))}
          </div>
        </nav>
      </header>

      <div className="site-header-spacer h-[68px] lg:h-[114px]" aria-hidden="true" />

      {isMenuOpen && (
        <>
          <button
            type="button"
            className="mobile-nav-backdrop fixed inset-0 z-[60] bg-heading/30 backdrop-blur-[2px] lg:hidden"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />

          <nav
            id="mobile-nav-drawer"
            className="mobile-nav-drawer fixed top-0 left-0 z-[70] h-full w-[min(85vw,320px)] border-r border-border/70 bg-surface/95 backdrop-blur-lg lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/70">
              <Link to="/" onClick={handleNavClick} aria-label="Brandsamor home">
                <BrandLogo />
              </Link>
              <button
                type="button"
                className="p-1 text-heading hover:text-accent"
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
                    `px-5 py-4 text-sm uppercase tracking-[0.12em] font-medium ${
                      isNavActive(item) ? 'text-accent' : 'text-body hover:text-accent'
                    }`,
                    handleNavClick,
                  )}
                </span>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-5 py-6 border-t border-border/70">
              <Link
                to="/login"
                onClick={handleNavClick}
                className={`block text-center text-sm ${
                  pathname === '/login' ? 'text-accent' : 'text-body hover:text-accent'
                }`}
              >
                Login
              </Link>
            </div>
          </nav>
        </>
      )}
    </>
  );
};
