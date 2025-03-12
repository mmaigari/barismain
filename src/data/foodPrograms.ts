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
    imageSrc: '/programs/basic-meal.jpg',
    href: '/programs/food/meals',
  },
  {
    id: 'family-packages',
    title: 'Food Parcels Distribution',
    imageSrc: '/programs/food-parcels.jpg',
    href: '/programs/food/packages',
  },
  {
    id: 'aqeeqah',
    title: 'Aqeeqah Services',
    imageSrc: '/programs/aqeeqah.jpg',
    href: '/programs/food/aqeeqah',
  },
  {
    id: 'vows',
    title: 'Vows and Nazar Services',
    imageSrc: '/programs/vows.jpg',
    href: '/programs/food/vows',
  },
  {
    id: 'qurbani',
    title: 'Qurbani Services',
    imageSrc: '/programs/qurbani.jpg',
    href: '/programs/food/qurbani',
  },
];