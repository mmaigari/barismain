export interface WashProgram {
  id: string;
  title: string;
  imageSrc: string;
  href: string;
  price?: number;
  description?: string;
}

export const washPrograms: WashProgram[] = [
  {
    id: 'bucket-well',
    title: 'Bucket Well',
    imageSrc: '/programs/bucket-well.jpg',
    href: '/programs/wash/bucket-well',
    price: 300,
    description: 'Basic water access solution for small communities'
  },
  {
    id: 'hand-pump-well',
    title: 'Hand Pump Well',
    imageSrc: '/programs/hand-pump-well.jpg',
    href: '/programs/wash/hand-pump',
    price: 1700,
    description: 'Manual pump system providing clean water for villages'
  },
  {
    id: 'solar-well',
    title: 'Solar Well',
    imageSrc: '/programs/solar-well.jpg',
    href: '/programs/wash/solar-well',
    price: 3100,
    description: 'Sustainable solar-powered water system for larger communities'
  },
  {
    id: 'artesian-well',
    title: 'Artesian Well',
    imageSrc: '/programs/artesian-well.jpg',
    href: '/programs/wash/artesian-well',
    description: 'Deep-drilled well accessing pressurized underground water'
  },
  {
    id: 'sanitation',
    title: 'Sewage & Toilet Construction',
    imageSrc: '/programs/sanitation.jpg',
    href: '/programs/wash/sanitation',
    price: 1000,
    description: 'Sanitation facilities to improve hygiene and health'
  }
];