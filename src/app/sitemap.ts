import type { MetadataRoute } from 'next';
import { APP_URL } from '@/constants';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const saints = await prisma.saint.findMany({
    select: { slug: true, updatedAt: true },
  });

  const saintUrls: MetadataRoute.Sitemap = saints.map((saint) => ({
    url: `${APP_URL}/santo/${saint.slug}`,
    lastModified: saint.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: APP_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    {
      url: `${APP_URL}/explorar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${APP_URL}/calendario`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${APP_URL}/apoiar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    { url: `${APP_URL}/mapa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${APP_URL}/kids`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
  ];

  return [...staticPages, ...saintUrls];
}
