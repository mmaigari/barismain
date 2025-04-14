import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Food Security Programs',
  description: 'Support Bariş Charity Foundation\'s food security initiatives including food packages, hot meals, Aqeeqah and Qurbani services to fight hunger in vulnerable communities.',
  openGraph: {
    title: 'Food Security Programs | Bariş Charity Foundation',
    description: 'Support Bariş Charity Foundation\'s food security initiatives including food packages, hot meals, and donation services.',
    url: 'https://barischarityfoundation.org/programs/food',
    images: [
      {
        url: '/new/food.png',
        width: 1200,
        height: 630,
        alt: 'Bariş Charity Foundation Food Security Programs',
      }
    ],
  },
  keywords: ['food charity', 'food packages', 'hot meals program', 'aqeeqah', 'qurbani', 'food security', 'hunger relief'],
};