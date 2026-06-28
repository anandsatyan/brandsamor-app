import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  FAQ_ITEMS,
  ORGANIZATION,
  SITE_NAME,
  SITE_URL,
} from './siteConfig';

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;
const webpageId = `${SITE_URL}/#webpage`;
const serviceId = `${SITE_URL}/#service`;

const howItWorksSteps = [
  {
    name: 'Sample from our scent library',
    text: 'Explore the scent library and choose samples that match your brand, customer, and use case.',
  },
  {
    name: 'Pick your starting scents',
    text: 'Choose one scent or a small set of scents to launch with and test demand before expanding.',
  },
  {
    name: 'Choose your bottle and branding setup',
    text: 'Select the bottle, cap, spray, label, color, printing, and packaging details for your launch.',
  },
  {
    name: 'Get ready-to-sell perfumes delivered',
    text: 'Receive your first finished batch within weeks, packed and ready to sell or gift.',
  },
];

export const structuredDataGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: ORGANIZATION.name,
      legalName: ORGANIZATION.legalName,
      url: SITE_URL,
      logo: `${SITE_URL}/vite.svg`,
      description: DEFAULT_DESCRIPTION,
      telephone: ORGANIZATION.phone,
      email: ORGANIZATION.email,
      address: {
        '@type': 'PostalAddress',
        ...ORGANIZATION.address,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: ORGANIZATION.phone,
        contactType: 'customer service',
        areaServed: 'Worldwide',
        availableLanguage: ['English'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      publisher: {
        '@id': organizationId,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'WebPage',
      '@id': webpageId,
      url: SITE_URL,
      name: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      isPartOf: {
        '@id': websiteId,
      },
      about: {
        '@id': serviceId,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/vite.svg`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Service',
      '@id': serviceId,
      name: 'Private Label Perfume Manufacturing',
      serviceType: 'Private label fragrance manufacturing',
      provider: {
        '@id': organizationId,
      },
      areaServed: 'Worldwide',
      description:
        'Private label perfume manufacturing for brands that want ready-to-sell fragrance products with custom scent, bottle, and packaging options.',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/PreOrder',
        description: 'Private label perfume launches are coming soon. Sample-first workflow available.',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@type': 'HowTo',
      '@id': `${SITE_URL}/#how-to-start-perfume-line`,
      name: 'How to Start Your Own Perfume Line',
      description:
        'A step-by-step way to launch a private label perfume line with scent sampling, packaging customization, and ready-to-sell production.',
      step: howItWorksSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    },
  ],
};
