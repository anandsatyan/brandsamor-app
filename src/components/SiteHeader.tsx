import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SITE_NAV, type NavKey } from '../routes/siteRoutes';

const HOME_SECTION_IDS = SITE_NAV.filter((item) => item.homeSection && item.path === '/').map(
  (item) => item.homeSection!,
);

const useActiveNavSection = (sectionIds: readonly string[], enabled: boolean) => {
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const sectionIdsKey = sectionIds.join('|');

  useEffect(() => {
    if (!enabled) return;

    const getHeaderOffset = () =>
      document.querySelector('header')?.getBoundingClientRect().height ?? 120;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + getHeaderOffset() + 1;
      let currentId = sectionIds[0];

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= scrollPosition) {
          currentId = id;
        }
      }

      setActiveId((current) => (current === currentId ? current : currentId));
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [sectionIdsKey, sectionIds, enabled]);

  return activeId;
};

const getNavHref = (item: (typeof SITE_NAV)[number], isHome: boolean) => {
  if (item.path !== '/') return item.path;
  if (item.homeSection) return isHome ? `#${item.homeSection}` : `/#${item.homeSection}`;
  return '/';
};

type SiteHeaderProps = {
  activeNavKey?: NavKey | null;
};

export const SiteHeader = ({ activeNavKey: activeNavKeyProp }: SiteHeaderProps = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const activeNavId = useActiveNavSection(HOME_SECTION_IDS, isHome && !activeNavKeyProp);

  const resolvedActiveKey: NavKey | null =
    activeNavKeyProp ??
    SITE_NAV.find((item) => item.path === location.pathname)?.navKey ??
    null;

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

  const isNavActive = (item: (typeof SITE_NAV)[number]) => {
    if (item.navKey && resolvedActiveKey) return item.navKey === resolvedActiveKey;
    if (item.homeSection && isHome) return activeNavId === item.homeSection;
    return false;
  };

  const renderNavItem = (item: (typeof SITE_NAV)[number], className: string, onClick?: () => void) => {
    const href = getNavHref(item, isHome);
    const isActive = isNavActive(item);
    const content = (
      <>
        <span
          className={`absolute top-0 left-0 right-0 h-[3px] bg-[#A8BBBF] transition-opacity duration-200 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
        {item.label}
      </>
    );

    if (item.path !== '/') {
      return (
        <Link to={href} onClick={onClick} className={className}>
          {content}
        </Link>
      );
    }

    return (
      <a href={href} onClick={onClick} className={className}>
        {content}
      </a>
    );
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#f1ece0]/70 bg-[#f9f7f2]/75 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-[#f9f7f2]/60">
        <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-12 py-4 sm:py-5">
          <button
            type="button"
            className="absolute left-4 sm:left-6 lg:hidden p-1 text-[#2D302B] hover:text-[#A8BBBF] transition-colors"
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
            className="absolute right-4 sm:right-6 lg:right-12 text-sm text-[#77736E] hover:text-[#2D302B] transition-colors"
          >
            Login
          </a>
        </div>

        <nav className="hidden lg:block border-t border-[#f1ece0]/70" aria-label="Page sections">
          <div className="grid grid-cols-5 max-w-4xl mx-auto">
            {SITE_NAV.map((item) =>
              renderNavItem(
                item,
                `relative py-3 text-center text-[10px] lg:text-xs uppercase tracking-[0.15em] lg:tracking-[0.2em] font-medium transition-colors duration-200 ${
                  isNavActive(item) ? 'text-[#2D302B]' : 'text-[#77736E] hover:text-[#2D302B]'
                }`,
              ),
            )}
          </div>
        </nav>
      </header>

      <div className="h-[68px] lg:h-[114px]" aria-hidden="true" />

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[60] bg-[#2D302B]/30 backdrop-blur-[2px] lg:hidden"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.nav
              id="mobile-nav-drawer"
              className="fixed top-0 left-0 z-[70] h-full w-[min(85vw,320px)] border-r border-[#f1ece0]/70 bg-[#f9f7f2]/95 backdrop-blur-lg lg:hidden"
              aria-label="Mobile page sections"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
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
                  className="p-1 text-[#2D302B] hover:text-[#A8BBBF] transition-colors"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col py-2">
                {SITE_NAV.map((item) =>
                  renderNavItem(
                    item,
                    `relative px-5 py-4 text-sm uppercase tracking-[0.15em] font-medium border-l-[3px] transition-colors ${
                      isNavActive(item)
                        ? 'text-[#2D302B] border-[#2D302B] bg-[#f1ece0]/40'
                        : 'text-[#77736E] border-transparent hover:text-[#2D302B] hover:bg-[#f1ece0]/20'
                    }`,
                    handleNavClick,
                  ),
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 px-5 py-6 border-t border-[#f1ece0]/70">
                <a
                  href="#"
                  onClick={handleNavClick}
                  className="block text-center text-sm text-[#77736E] hover:text-[#2D302B] transition-colors"
                >
                  Login
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
