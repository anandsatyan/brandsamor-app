import { Link, useLocation } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { ORGANIZATION } from '../seo/siteConfig';
import { trackEmailClick, trackPhoneClick } from '../analytics/siteAnalytics';
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
    <h4 className="font-bold text-heading mb-6">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          {'path' in link ? (
            <Link to={link.path} className="hover:text-accent">
              {link.label}
            </Link>
          ) : (
            <a href={resolveHref(link)} className="hover:text-accent">
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
    <footer className="bg-surface py-12 sm:py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-body text-sm">
        <div className="space-y-6 sm:col-span-2 lg:col-span-1">
          <Link to="/" className="inline-block" aria-label="Brandsamor home">
            <BrandLogo />
          </Link>
          <address className="not-italic space-y-2">
            <p>Private Label Fragrance Studio</p>
            <p>
              {ORGANIZATION.address.streetAddress}, {ORGANIZATION.address.addressLocality}{' '}
              {ORGANIZATION.address.addressRegion}
              <br />
              {ORGANIZATION.address.postalCode}, U.S.A
            </p>
            <p className="text-body/80 leading-relaxed">
              We have team presence across the US, India, Dubai and China.
            </p>
            <p>
              <a
                href={`tel:${ORGANIZATION.phone}`}
                className="hover:text-accent"
                onClick={() => trackPhoneClick('footer')}
              >
                {ORGANIZATION.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${ORGANIZATION.email}`}
                className="hover:text-accent"
                onClick={() => trackEmailClick('footer')}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-12 sm:mt-16 pt-8 border-t border-border text-xs flex flex-col sm:flex-row gap-4 justify-between items-center text-body text-center sm:text-left">
        <p>© {new Date().getFullYear()}, {ORGANIZATION.legalName}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center sm:justify-end">
          <Link to="/about" className="hover:text-accent">
            About
          </Link>
          <Link to="/knowledge-base" className="hover:text-accent">
            Knowledge Base
          </Link>
          <Link to="/contact" className="hover:text-accent">
            Contact
          </Link>
          <Link to="/privacy-policy" className="hover:text-accent">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-accent">
            Terms
          </Link>
          <Link to="/refund-and-cancellation-policy" className="hover:text-accent">
            Refunds
          </Link>
        </div>
      </div>
    </footer>
  );
};
