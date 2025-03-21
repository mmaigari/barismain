export interface CommunityProgram {
  id: string;
  title: string;
  imageSrc: string;
  href: string;
  price?: number;
  description?: string;
}

export const communityPrograms: CommunityProgram[] = [
  {
    id: 'livestock-rearing',
    title: 'Livestock Rearing Projects',
    imageSrc: '/new/livestock.png', // Update with actual path when available
    href: '/programs/community/livestock-rearing',
    price: 80,
    description: 'Support sustainable livestock projects that provide income and nutrition to families.'
  },
  {
    id: 'goat',
    title: 'Goat',
    imageSrc: '/new/goat.png', // Update with actual path when available
    href: '/programs/community/livestock-rearing',
    price: 60,
    description: 'Provide a goat to a family to help them generate income and improve nutrition.'
  },
  {
    id: 'sheep',
    title: 'Sheep',
    imageSrc: '/new/sheep.png', // Update with actual path when available
    href: '/programs/community/livestock-rearing',
    price: 80,
    description: 'Donate a sheep to support sustainable livelihoods for families in need.'
  },
  {
    id: 'cow',
    title: 'Cow',
    imageSrc: '/new/cattle.png', // Update with actual path when available
    href: '/programs/community/livestock-rearing',
    price: 300,
    description: 'Fund a cow project that can transform a family\'s economic situation.'
  },
  {
    id: 'women-empowerment',
    title: 'Women Empowerment Initiatives',
    imageSrc: '/new/women.jpg', // Update with actual path when available
    href: '/programs/community/women-empowerment',
    price: 200,
    description: 'Support programs that empower women through skills training and economic opportunities.'
  },
  {
    id: 'youth-capacity',
    title: 'Building Young Capacity',
    imageSrc: '/new/capacity.png', // Update with actual path when available
    href: '/programs/community/youth-capacity',
    description: 'Support youth development programs that build skills and create opportunities.'
  },
];