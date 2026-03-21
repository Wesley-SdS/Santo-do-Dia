import { APP_DESCRIPTION, APP_NAME, APP_URL } from '@/constants';

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    applicationCategory: 'ReligiousApp',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    creator: {
      '@type': 'Organization',
      name: 'Fraternidade São João Paulo II',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
