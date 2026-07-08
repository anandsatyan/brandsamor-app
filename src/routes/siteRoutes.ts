export type NavKey =
  | 'home'
  | 'how-it-works'
  | 'fragrance-products'
  | 'fragrance-sampling'
  | 'packaging'
  | 'start-a-perfume-line'
  | 'about';

export type SiteRoute = {
  path: string;
  navKey?: NavKey;
  homeSection?: string;
  label: string;
};

export const SITE_NAV: SiteRoute[] = [
  { label: 'Home', path: '/', navKey: 'home' },
  { label: 'About', path: '/about', navKey: 'about' },
  { label: 'How It Works', path: '/how-it-works', navKey: 'how-it-works' },
  { label: 'Products', path: '/fragrance-products', navKey: 'fragrance-products' },
  { label: 'Sampling', path: '/fragrance-sampling', navKey: 'fragrance-sampling' },
  { label: 'Branding', path: '/packaging-branding', navKey: 'packaging' },
  { label: 'Start a Perfume Line', path: '/start-a-perfume-line', navKey: 'start-a-perfume-line' },
];

export const INTERNAL_PAGES: SiteRoute[] = [
  { label: 'How It Works', path: '/how-it-works', navKey: 'how-it-works' },
  { label: 'Fragrance Products', path: '/fragrance-products', navKey: 'fragrance-products', homeSection: 'fragrance-products' },
  { label: 'Fragrance Sampling', path: '/fragrance-sampling', navKey: 'fragrance-sampling', homeSection: 'fragrance-sampling' },
  { label: 'Packaging & Branding', path: '/packaging-branding', navKey: 'packaging', homeSection: 'packaging' },
  { label: 'Start a Perfume Line', path: '/start-a-perfume-line', navKey: 'start-a-perfume-line', homeSection: 'why-perfume' },
  { label: 'Who We Work With', path: '/who-we-work-with', homeSection: 'who-we-work-with' },
  { label: 'Why Brandsamor', path: '/why-brandsamor', homeSection: 'why-brandsamor' },
  { label: 'Quality & Compliance', path: '/quality-compliance', homeSection: 'compliance' },
  { label: 'How Your Batch Is Made', path: '/how-your-batch-is-made' },
  { label: 'Private Label Perfume USA', path: '/private-label-perfume-manufacturer-usa' },
  { label: 'Custom Perfume Manufacturer', path: '/custom-perfume-manufacturer' },
];

export const getNavHref = (route: SiteRoute, isHome: boolean) => {
  if (route.homeSection && route.path === '/') {
    return isHome ? `#${route.homeSection}` : `/#${route.homeSection}`;
  }
  if (route.homeSection && route.path !== '/') {
    return route.path;
  }
  if (route.homeSection) {
    return isHome ? `#${route.homeSection}` : `/#${route.homeSection}`;
  }
  return route.path;
};

export const getActiveNavKey = (pathname: string): NavKey | null => {
  const match = SITE_NAV.find((page) => page.path === pathname);
  return match?.navKey ?? INTERNAL_PAGES.find((page) => page.path === pathname)?.navKey ?? null;
};
