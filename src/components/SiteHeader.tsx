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
      <header className="site-header fixed top-0 left-0 right-0 z-50 bg-surface">
        <div className="site-header__bar relative flex items-center justify-center px-4 sm:px-6 lg:px-12 py-4 sm:py-5">
          <button
            type="button"
            className="site-header__menu-btn absolute left-4 sm:left-6 lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-secondary/45 text-heading transition-[color,background-color,transform] duration-200 hover:bg-secondary/80 hover:text-accent active:scale-95"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>

          <Link to="/" className="flex items-center gap-2" aria-label="Brandsamor home">
            <BrandLogo />
          </Link>

          <Link
            to="/login"
            className={`site-header__login absolute right-4 sm:right-6 lg:right-12 text-sm ${
              pathname === '/login' ? 'text-accent' : 'text-heading hover:text-accent'
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
                    isNavActive(item) ? 'text-accent' : 'text-heading hover:text-accent'
                  }`,
                )}
              </span>
            ))}
          </div>
        </nav>
      </header>

      <div className="site-header-spacer h-[89px] lg:h-[135px]" aria-hidden="true" />

      {isMenuOpen && (
        <>
          <button
            type="button"
            className="mobile-nav-backdrop fixed inset-0 z-[60] lg:hidden"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />

          <nav
            id="mobile-nav-drawer"
            className="mobile-nav-drawer fixed top-0 left-0 z-[70] flex h-full w-[min(88vw,22.5rem)] flex-col border-r border-border/60 bg-surface lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mobile-nav-drawer__accent" aria-hidden="true" />

            <div className="flex items-start justify-between gap-phi-3 border-b border-border/50 px-phi-4 py-phi-4">
              <div>
                <p className="type-eyebrow mb-phi-1">Menu</p>
                <Link to="/" onClick={handleNavClick} aria-label="Brandsamor home">
                  <BrandLogo />
                </Link>
              </div>
              <button
                type="button"
                className="mobile-nav-close flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-secondary/45 text-heading transition-[color,background-color,transform] duration-200 hover:bg-secondary/80 hover:text-accent active:scale-95"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto py-phi-2">
              {SITE_NAV.map((item, index) => {
                const active = isNavActive(item);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    className={`mobile-nav-link group mx-phi-2 flex items-center gap-phi-3 rounded-[2px] px-phi-3 py-phi-3 transition-colors duration-200 ${
                      active
                        ? 'mobile-nav-link--active bg-secondary/55'
                        : 'hover:bg-secondary/35'
                    }`}
                    style={{ animationDelay: `${0.06 + index * 0.045}s` }}
                  >
                    <span className="type-eyebrow shrink-0 tabular-nums text-body/45">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-serif text-phi-md leading-snug transition-colors duration-200 ${
                        active ? 'text-accent' : 'text-heading group-hover:text-accent'
                      }`}
                    >
                      {item.label}
                    </span>
                    {active && (
                      <span
                        className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-border/50 bg-surface px-phi-4 py-phi-4">
              <Link
                to="/login"
                onClick={handleNavClick}
                className="btn-primary w-full justify-center"
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
