import { ORGANIZATION } from '../seo/siteConfig';

const footerExploreLinks = [
  { label: 'Start Your Perfume Line', href: '#overview' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Packaging', href: '#packaging' },
  { label: 'Customer Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
] as const;

const footerTopicLinks = [
  { label: 'Why Sell Perfume Under Your Brand', href: '#why-perfume' },
  { label: 'Why Brandsamor Private Label', href: '#why-brandsamor' },
  { label: 'Compliance Support', href: '#compliance' },
  { label: 'Product & Packaging Options', href: '#product-options' },
  { label: 'Is This Right for Your Brand?', href: '#fit-check' },
] as const;

const footerFaqLinks = [
  { label: 'What is private label perfume?', href: '#faq' },
  { label: 'How do I start my own perfume line?', href: '#faq' },
  { label: 'Minimum order quantity', href: '#faq' },
  { label: 'Order samples before bulk', href: '#faq' },
  { label: 'Compliance documentation', href: '#faq' },
  { label: 'Worldwide shipping', href: '#faq' },
] as const;

const FooterLinkList = ({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) => (
  <div>
    <h4 className="font-bold text-[#2D302B] mb-6">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href} className="hover:text-[#A8BBBF] transition-colors">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const SiteFooter = () => (
  <footer className="bg-[#f9f7f2] py-12 sm:py-16 border-t border-[#f1ece0]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-[#77736E] text-sm">
      <div className="space-y-6 sm:col-span-2 lg:col-span-1">
        <div className="font-display text-[#A8BBBF] text-2xl font-bold tracking-tight">
          Brandsamor
        </div>
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

      <FooterLinkList title="On this page" links={footerExploreLinks} />
      <FooterLinkList title="Private label topics" links={footerTopicLinks} />
      <FooterLinkList title="Popular questions" links={footerFaqLinks} />
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
