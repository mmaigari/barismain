import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Water, Sanitation, and Hygiene (WASH) Programs',
  description: 'Support Bariş Charity Foundation\'s WASH initiatives including artesian wells, bucket wells, hand pumps, solar wells, and sanitation projects to provide clean water access.',
  openGraph: {
    title: 'WASH Programs | Bariş Charity Foundation',
    description: 'Support Bariş Charity Foundation\'s water access and sanitation initiatives to provide clean water and hygiene to communities in need.',
    url: 'https://barischarityfoundation.org/programs/wash',
    images: [
      {
        url: '/programs/wash-programs.jpg',
        width: 1200,
        height: 630,
        alt: 'Bariş Charity Foundation WASH Programs',
      }
    ],
  },
  keywords: ['water charity', 'clean water initiatives', 'artesian wells', 'bucket wells', 'hand pumps', 'solar wells', 'sanitation projects', 'WASH program'],
};