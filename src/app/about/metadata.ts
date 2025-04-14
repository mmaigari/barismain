import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Bariş Charity Foundation, our mission, vision, values, and organizational structure. Discover our commitment to sustainable development and humanitarian aid.',
  openGraph: {
    title: 'About Bariş Charity Foundation',
    description: 'Learn about Bariş Charity Foundation, our mission, vision, values, and organizational structure. Discover our commitment to sustainable development and humanitarian aid.',
    url: 'https://barischarityfoundation.org/about',
    images: [
      {
        url: '/about-overview.jpg',
        width: 1200,
        height: 630,
        alt: 'About Bariş Charity Foundation',
      }
    ],
  },
  keywords: ['charity organization', 'foundation history', 'charity mission', 'vision statement', 'humanitarian aid organization'],
};