import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bariş Charity Foundation',
    short_name: 'Bariş Charity',
    description: 'Bariş Charity Foundation - Hope Starts With You',
    start_url: '/',
    display: 'standalone',
    background_color: '#09869a',
    theme_color: '#09869a',
    icons: [
      {
        src: '/logo-main2.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}