import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://torrentechnical.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://torrentechnical.com/privacy',
      lastModified: new Date('2026-07-12'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
