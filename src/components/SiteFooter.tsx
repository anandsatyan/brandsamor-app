import { Link, useLocation } from 'react-router-dom';
import { ORGANIZATION } from '../seo/siteConfig';
import { INTERNAL_PAGES } from '../routes/siteRoutes';

const footerExploreLinks = [
  { label: 'Start Your Perfume Line', hash: 'overview' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Fragrance Products', path: '/fragrance-products' },
  { label: 'Fragrance Sampling', path: '/fragrance-sampling' },
  { label: 'Packaging & Branding', path: '/packaging-branding' },
  { label: 'FAQ', hash: 'faq' },
] as const;

const footerTopicLinks = INTERNAL_PAGES.filter(
  (page) => !['/how-it-works', '/fragrance-products', '/fragrance-sampling', '/packaging-branding'].includes(page.path),
).map((page) => ({ label: page.label, path: page.path }));

const footerFaqLinks = [
  { label: 'What is private label perfume?', hash: 'faq' },
  { label: 'How do I start my own perfume line?', hash: 'faq' },
  { label: 'Minimum order quantity', hash: 'faq' },
  { label: 'Order samples before bulk', hash: 'faq' },
  { label: 'Compliance documentation', hash: 'faq' },
  { label: 'Worldwide shipping', hash: 'faq' },
] as const;

const FooterLinkList = ({
  title,
  links,
  resolveHref,
}: {
  title: string;
  links: readonly ({ label: string } & ({ hash: string } | { path: string }))[];
  resolveHref: (link: { hash?: string }) => string;
}) => (
  <div>
    <h4 className="font-bold text-[#2D302B] mb-6">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          {'path' in link ? (
            <Link to={link.path} className="hover:text-[#A8BBBF] transition-colors">
              {link.label}
            </Link>
          ) : (
            <a href={resolveHref(link)} className="hover:text-[#A8BBBF] transition-colors">
              {link.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export const SiteFooter = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const resolveHref = (link: { hash?: string }) => (isHome ? `#${link.hash}` : `/#${link.hash}`);

  return (
    <footer className="bg-[#f9f7f2] py-12 sm:py-16 border-t border-[#f1ece0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-[#77736E] text-sm">
        <div className="space-y-6 sm:col-span-2 lg:col-span-1">
          <Link to="/" className="font-display text-[#A8BBBF] text-2xl font-bold tracking-tight inline-block">
            Brandsamor
          </Link>
          <address className="not-italic space-y-2">
            <p>Private Label Fragrance Studio</p>
            <p>
              {ORGANIZATION.address.streetAddress}, {ORGANIZATION.address.addressLocality}{' '}
              {ORGANIZATION.address.addressRegion}
              <br />
              {ORGANIZATION.address.postalCode}, U.S.A
            </p>
            <p className="text-[#2D302B]/80 leading-relaxed">
              We have team presence across the US, India, Dubai and China.
            </p>
            <p>
              <a href={`tel:${ORGANIZATION.phone}`} className="hover:text-[#A8BBBF] transition-colors">
                {ORGANIZATION.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${ORGANIZATION.email}`}
                className="hover:text-[#A8BBBF] transition-colors"
              >
                {ORGANIZATION.email}
              </a>
            </p>
          </address>
        </div>

        <FooterLinkList title="Explore" links={footerExploreLinks} resolveHref={resolveHref} />
        <FooterLinkList title="Private label topics" links={footerTopicLinks} resolveHref={resolveHref} />
        <FooterLinkList title="Popular questions" links={footerFaqLinks} resolveHref={resolveHref} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-12 sm:mt-16 pt-8 border-t border-[#f1ece0] text-xs flex flex-col sm:flex-row gap-4 justify-between items-center text-[#77736E] text-center sm:text-left">
        <p>© {new Date().getFullYear()}, {ORGANIZATION.legalName}</p>
        <a
          href={`mailto:${ORGANIZATION.email}`}
          className="hover:text-[#A8BBBF] transition-colors"
        >
          Contact us
        </a>
      </div>
    </footer>
  );
};
