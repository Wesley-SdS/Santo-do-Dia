import { APP_URL } from '@/constants';

interface SaintJsonLdProps {
  saint: {
    name: string;
    slug: string;
    biographyShort: string;
    imageUrl: string | null;
    birthDate: string | null;
    deathDate: string | null;
    birthPlace: string | null;
    country: string | null;
  };
}

export function SaintJsonLd({ saint }: SaintJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: saint.name,
    description: saint.biographyShort,
    url: `${APP_URL}/santo/${saint.slug}`,
    image: saint.imageUrl ?? undefined,
    birthDate: saint.birthDate ?? undefined,
    deathDate: saint.deathDate ?? undefined,
    birthPlace: saint.birthPlace ? { '@type': 'Place', name: saint.birthPlace } : undefined,
    nationality: saint.country ? { '@type': 'Country', name: saint.country } : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
