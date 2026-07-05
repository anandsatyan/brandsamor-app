import { Link } from 'react-router-dom';
import { InfoPageLayout } from '../components/info/InfoPageLayout';
import { trackContactCta, trackEmailClick, trackPhoneClick } from '../analytics/siteAnalytics';
import { ORGANIZATION } from '../seo/siteConfig';
import { PAGE_METADATA } from '../seo/pageMetadata';

export const ContactPage = () => {
  const meta = PAGE_METADATA['/contact'];

  return (
    <InfoPageLayout meta={meta} badge="CONTACT">
      <section className="border-t border-border pt-8 sm:pt-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl">Get in touch</h2>
        <p className="text-body leading-relaxed">
          Reach the Brandsamor team for private-label fragrance questions, project inquiries, and customer support.
        </p>
        <address className="not-italic space-y-3 text-heading">
          <p>
            <span className="font-semibold">Email: </span>
            <a
              href={`mailto:${ORGANIZATION.email}`}
              className="underline decoration-accent underline-offset-4 hover:text-accent"
              onClick={() => {
                trackEmailClick('contact_page');
                trackContactCta('contact_page', 'email');
              }}
            >
              {ORGANIZATION.email}
            </a>
          </p>
          <p>
            <span className="font-semibold">Phone: </span>
            <a
              href={`tel:${ORGANIZATION.phone}`}
              className="underline decoration-accent underline-offset-4 hover:text-accent"
              onClick={() => {
                trackPhoneClick('contact_page');
                trackContactCta('contact_page', 'phone');
              }}
            >
              {ORGANIZATION.phone}
            </a>
          </p>
          <p>
            <span className="font-semibold">Legal entity: </span>
            {ORGANIZATION.legalName}
          </p>
          <p>
            {ORGANIZATION.address.streetAddress}
            <br />
            {ORGANIZATION.address.addressLocality}, {ORGANIZATION.address.addressRegion}{' '}
            {ORGANIZATION.address.postalCode}
            <br />
            {ORGANIZATION.address.addressCountry}
          </p>
        </address>
        <p className="text-body leading-relaxed">
          For background on the company, see the{' '}
          <Link to="/about" className="font-medium text-accent underline decoration-accent underline-offset-4 hover:opacity-80">
            About Brandsamor
          </Link>{' '}
          page. For policy questions, review our{' '}
          <Link to="/privacy-policy" className="font-medium text-accent underline decoration-accent underline-offset-4 hover:opacity-80">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/terms" className="font-medium text-accent underline decoration-accent underline-offset-4 hover:opacity-80">
            Terms of Service
          </Link>
          .
        </p>
      </section>
    </InfoPageLayout>
  );
};
