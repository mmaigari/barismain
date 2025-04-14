import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Bariş Charity Foundation - Hope Starts With You',
  description: 'Join Bariş Charity Foundation in our mission to create lasting change through sustainable development programs in education, healthcare, and community support.',
  openGraph: {
    title: 'Bariş Charity Foundation - Hope Starts With You',
    description: 'Join Bariş Charity Foundation in our mission to create lasting change through sustainable development programs in education, healthcare, and community support.',
    images: [
      {
        url: '/logo-main2.svg',
        width: 1200,
        height: 630,
        alt: 'Bariş Charity Foundation',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bariş Charity Foundation - Hope Starts With You',
    description: 'Join Bariş Charity Foundation in our mission to create lasting change through sustainable development programs in education, healthcare, and community support.',
    images: ['/logo-main2.svg'],
  },
};