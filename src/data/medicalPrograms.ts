export interface MedicalProgram {
  id: string;
  title: string;
  imageSrc: string;
  href: string;
  fixedCost?: number;
}

export const medicalPrograms: MedicalProgram[] = [
  {
    id: 'eye-surgery',
    title: 'Eye Surgery',
    imageSrc: '/programs/eye-surgery.png', // Update with real path when available
    href: '/programs/medical/eye-surgery',
    fixedCost: 100,
  },
  {
    id: 'medical-bill',
    title: 'Medical Bill Assistance',
    imageSrc: '/programs/medical-bill.png', // Update with real path when available
    href: '/programs/medical/medicalcases',
  },
  {
    id: 'dignity-packs',
    title: 'Dignity Packs Distribution',
    imageSrc: '/programs/dignity-pack.png', // Update with real path when available
    href: '/programs/medical/dignitypacks',
  },
  {
    id: 'health-facilities',
    title: 'Health Facilities Support',
    imageSrc: '/programs/health-facilities.png', // Update with real path when available
    href: '/programs/medical/contact',
  },
];