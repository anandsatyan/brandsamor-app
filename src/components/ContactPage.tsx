import { Link } from 'react-router-dom';
import { InfoPageLayout } from '../components/info/InfoPageLayout';
import { ORGANIZATION } from '../seo/siteConfig';
import { PAGE_METADATA } from '../seo/pageMetadata';

export const ContactPage = () => {
  const meta = PAGE_METADATA['/contact'];

  return (
    <InfoPageLayout meta={meta} badge="CONTACT">
      <section className="border-t border-[#f1ece0] pt-8 sm:pt-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl">Get in touch</h2>
        <p className="text-[#77736E] leading-relaxed">
          Brandsamor is currently in a pre-launch phase. You can reach the team directly while the full onboarding
          application is being built.
        </p>
        <address className="not-italic space-y-3 text-[#2D302B]">
          <p>
            <span className="font-semibold">Email: </span>
            <a href={`mailto:${ORGANIZATION.email}`} className="underline decoration-[#A8BBBF] underline-offset-4 hover:text-[#A8BBBF]">
              {ORGANIZATION.email}
            </a>
          </p>
          <p>
            <span className="font-semibold">Phone: </span>
            <a href={`tel:${ORGANIZATION.phone}`} className="underline decoration-[#A8BBBF] underline-offset-4 hover:text-[#A8BBBF]">
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
        <p className="text-[#77736E] leading-relaxed">
          For background on the company, see the{' '}
          <Link to="/about" className="font-medium text-[#2D302B] underline decoration-[#A8BBBF] underline-offset-4 hover:text-[#A8BBBF]">
            About Brandsamor
          </Link>{' '}
          page. For policy questions, review our{' '}
          <Link to="/privacy-policy" className="font-medium text-[#2D302B] underline decoration-[#A8BBBF] underline-offset-4 hover:text-[#A8BBBF]">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/terms" className="font-medium text-[#2D302B] underline decoration-[#A8BBBF] underline-offset-4 hover:text-[#A8BBBF]">
            Terms of Service
          </Link>
          .
        </p>
      </section>
    </InfoPageLayout>
  );
};
