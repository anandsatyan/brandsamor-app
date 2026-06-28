export type NavKey =
  | 'overview'
  | 'how-it-works'
  | 'fragrance-products'
  | 'packaging'
  | 'faq';

export type SiteRoute = {
  path: string;
  navKey?: NavKey;
  homeSection?: string;
  label: string;
};

export const SITE_NAV: SiteRoute[] = [
  { label: 'Overview', path: '/', homeSection: 'overview', navKey: 'overview' },
  { label: 'How It Works', path: '/how-it-works', navKey: 'how-it-works' },
  { label: 'Products', path: '/fragrance-products', navKey: 'fragrance-products' },
  { label: 'Packaging', path: '/packaging-branding', navKey: 'packaging' },
  { label: 'FAQ', path: '/', homeSection: 'faq', navKey: 'faq' },
];

export const INTERNAL_PAGES: SiteRoute[] = [
  { label: 'How It Works', path: '/how-it-works', navKey: 'how-it-works' },
  { label: 'Fragrance Products', path: '/fragrance-products', navKey: 'fragrance-products', homeSection: 'fragrance-products' },
  { label: 'Fragrance Sampling', path: '/fragrance-sampling', homeSection: 'fragrance-sampling' },
  { label: 'Packaging & Branding', path: '/packaging-branding', navKey: 'packaging', homeSection: 'packaging' },
  { label: 'Start a Perfume Line', path: '/start-a-perfume-line', homeSection: 'why-perfume' },
  { label: 'Who We Work With', path: '/who-we-work-with', homeSection: 'who-we-work-with' },
  { label: 'Why Brandsamor', path: '/why-brandsamor', homeSection: 'why-brandsamor' },
  { label: 'Quality & Compliance', path: '/quality-compliance', homeSection: 'compliance' },
];

export const getNavHref = (route: SiteRoute, isHome: boolean) => {
  if (route.homeSection && route.path === '/') {
    return isHome ? `#${route.homeSection}` : `/#${route.homeSection}`;
  }
  if (route.homeSection && !route.navKey) {
    return route.path;
  }
  if (route.path !== '/' && route.navKey) {
    return route.path;
  }
  if (route.homeSection) {
    return isHome ? `#${route.homeSection}` : `/#${route.homeSection}`;
  }
  return route.path;
};

export const getActiveNavKey = (pathname: string): NavKey | null => {
  const match = INTERNAL_PAGES.find((page) => page.path === pathname);
  return match?.navKey ?? null;
};
