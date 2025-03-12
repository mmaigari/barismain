export interface EarlyRecoveryProgram {
  id: string;
  title: string;
  imageSrc: string;
  href: string;
  fixedCost?: number;
  description?: string;
}

export const earlyRecoveryPrograms: EarlyRecoveryProgram[] = [
  {
    id: 'vocational-training',
    title: 'Vocational Training & Skills Development',
    imageSrc: '/programs/vocational-training.png',
    href: '/programs/early-recovery/vocational-training',
    description: 'Empowering individuals with practical skills for sustainable employment'
  },
  {
    id: 'social-services',
    title: 'Social Services Assistance',
    imageSrc: '/programs/social-services.png',
    href: '/programs/early-recovery/social-services',
    description: 'Providing essential support services to vulnerable communities'
  },
  {
    id: 'networking-business',
    title: 'Networking & Business Support',
    imageSrc: '/programs/networking-business.png',
    href: '/programs/early-recovery/networking-business',
    description: 'Helping entrepreneurs build connections and grow their businesses'
  },
  {
    id: 'cash-for-work',
    title: 'Cash for Work (CFW) Program',
    imageSrc: '/programs/cash-for-work.png',
    href: '/programs/early-recovery/cash-for-work',
    fixedCost: 50,
    description: 'Creating temporary employment opportunities while rebuilding communities'
  },
];