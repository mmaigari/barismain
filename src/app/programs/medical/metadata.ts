import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Medical Programs',
  description: 'Support Bariş Charity Foundation\'s medical initiatives including eye surgeries, dignity packs, medical cases, and free medical consultations for vulnerable communities.',
  openGraph: {
    title: 'Medical Programs | Bariş Charity Foundation',
    description: 'Support Bariş Charity Foundation\'s medical initiatives including eye surgeries, dignity packs, medical cases, and free medical consultations.',
    url: 'https://barischarityfoundation.org/programs/medical',
    images: [
      {
        url: '/programs/eye-surgery.png',
        width: 1200,
        height: 630,
        alt: 'Bariş Charity Foundation Medical Programs',
      }
    ],
  },
  keywords: ['medical charity', 'eye surgery program', 'dignity packs', 'healthcare aid', 'medical consultation', 'health initiatives'],
};