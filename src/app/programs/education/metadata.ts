import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Education Programs',
  description: 'Support Bariş Charity Foundation\'s education programs providing school renovation, lighting for schools, educational supplies, and Quran teaching initiatives for underserved communities.',
  openGraph: {
    title: 'Education Programs | Bariş Charity Foundation',
    description: 'Support Bariş Charity Foundation\'s education programs providing school renovation, lighting for schools, educational supplies, and Quran teaching initiatives.',
    url: 'https://barischarityfoundation.org/programs/education',
    images: [
      {
        url: '/education/education-support.png',
        width: 1200,
        height: 630,
        alt: 'Bariş Charity Foundation Education Programs',
      }
    ],
  },
  keywords: ['education charity', 'school renovation', 'school lighting', 'educational supplies', 'quran teaching', 'education support'],
};