export interface FoodProgram {
  id: string;
  title: string;
  imageSrc: string;
  href: string;
  fixedCost?: number;
}

export const foodPrograms: FoodProgram[] = [
  {
    id: 'meal-distribution',
    title: 'Hot Meal Distribution',
    imageSrc: '/new/hot-meal.png',
    href: '/programs/food/meals',
  },
  {
    id: 'family-packages',
    title: 'Food Parcels Distribution',
    imageSrc: '/new/food-parcel.png',
    href: '/programs/food/packages',
  },
  {
    id: 'aqeeqah',
    title: 'Aqeeqah Services',
    imageSrc: '/new/Aqeeqah.jpg',
    href: '/programs/food/aqeeqah',
  },
  {
    id: 'vows',
    title: 'Vows Services',
    imageSrc: '/new/vow.png',
    href: '/programs/food/vows',
  },
  {
    id: 'qurbani',
    title: 'Qurbani Services',
    imageSrc: '/new/qurbani.jpg',
    href: '/programs/food/qurbani',
  },
];