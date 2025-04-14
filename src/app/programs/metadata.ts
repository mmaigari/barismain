import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Our Programs',
  description: 'Explore Bariş Charity Foundation\'s comprehensive programs in education, healthcare, food security, water access, community development, and humanitarian aid.',
  openGraph: {
    title: 'Bariş Charity Foundation - Our Programs',
    description: 'Explore Bariş Charity Foundation\'s comprehensive programs in education, healthcare, food security, water access, community development, and humanitarian aid.',
    url: 'https://barischarityfoundation.org/programs',
    images: [
      {
        url: '/programs/programs-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Bariş Charity Foundation Programs',
      }
    ],
  },
  keywords: ['charity programs', 'education initiatives', 'medical aid programs', 'food security', 'water access programs', 'community development', 'humanitarian aid'],
};