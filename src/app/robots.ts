import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/profile', '/settings', '/auth'],
    },
    sitemap: 'https://barischarityfoundation.org/sitemap.xml',
  };
}