import { ReactNode } from 'react';
import BreadcrumbSchema from './BreadcrumbSchema';
import DonationSchema from './DonationSchema';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SeoWrapperProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  donation?: {
    name: string;
    description: string;
    image?: string;
    identifier?: string;
  }
}

export default function SeoWrapper({ children, breadcrumbs, donation }: SeoWrapperProps) {
  return (
    <>
      {breadcrumbs && <BreadcrumbSchema items={breadcrumbs} />}
      {donation && <DonationSchema {...donation} />}
      {children}
    </>
  );
}