import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navSections = [
  { label: 'Overview', id: 'overview' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Packaging', id: 'packaging' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'FAQ', id: 'faq' },
] as const;

const NAV_SECTION_IDS = navSections.map((section) => section.id);

const useActiveNavSection = (sectionIds: readonly string[]) => {
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const sectionIdsKey = sectionIds.join('|');

  useEffect(() => {
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
  }, [sectionIdsKey, sectionIds]);

  return activeId;
};

export const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeNavId = useActiveNavSection(NAV_SECTION_IDS);

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

          <div className="flex items-center gap-2">
            <span className="font-display text-[#A8BBBF] text-xl sm:text-2xl font-bold tracking-tight">
              Brandsamor
            </span>
          </div>

          <a
            href="#"
            className="absolute right-4 sm:right-6 lg:right-12 text-sm text-[#77736E] hover:text-[#2D302B] transition-colors"
          >
            Login
          </a>
        </div>

        <nav className="hidden lg:block border-t border-[#f1ece0]/70" aria-label="Page sections">
          <div className="grid grid-cols-5 max-w-4xl mx-auto">
            {navSections.map(({ label, id }) => {
              const isActive = id === activeNavId;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`relative py-3 text-center text-[10px] lg:text-xs uppercase tracking-[0.15em] lg:tracking-[0.2em] font-medium transition-colors duration-200 ${
                    isActive ? 'text-[#2D302B]' : 'text-[#77736E] hover:text-[#2D302B]'
                  }`}
                >
                  <span
                    className={`absolute top-0 left-0 right-0 h-[3px] bg-[#A8BBBF] transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden="true"
                  />
                  {label}
                </a>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Spacer for fixed header */}
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
                <span className="font-display text-[#A8BBBF] text-lg font-bold tracking-tight">
                  Brandsamor
                </span>
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
                {navSections.map(({ label, id }) => {
                  const isActive = id === activeNavId;
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={handleNavClick}
                      className={`px-5 py-4 text-sm uppercase tracking-[0.15em] font-medium border-l-[3px] transition-colors ${
                        isActive
                          ? 'text-[#2D302B] border-[#2D302B] bg-[#f1ece0]/40'
                          : 'text-[#77736E] border-transparent hover:text-[#2D302B] hover:bg-[#f1ece0]/20'
                      }`}
                    >
                      {label}
                    </a>
                  );
                })}
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
