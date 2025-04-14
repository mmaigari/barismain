import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://barischarityfoundation.org';
  
  // Main routes
  const routes = [
    '',
    '/about',
    '/about/overview',
    '/about/vision-mission',
    '/about/structure',
    '/about/programs',
    '/about/impact',
    '/about/partners',
    '/about/reports',
    '/programs',
    '/programs/education',
    '/programs/education/renovation',
    '/programs/education/lighting',
    '/programs/education/support',
    '/programs/education/kits',
    '/programs/education/quran',
    '/programs/medical',
    '/programs/medical/eye-surgery',
    '/programs/food',
    '/programs/food/packages',
    '/programs/food/meals',
    '/programs/food/aqeeqah',
    '/programs/food/vows',
    '/programs/wash',
    '/programs/wash/artesian-well',
    '/programs/wash/bucket-well',
    '/programs/wash/hand-pump',
    '/programs/wash/solar-well',
    '/programs/wash/sanitation',
    '/programs/community',
    '/programs/community/youth-capacity',
    '/programs/community/women-empowerment',
    '/programs/sponsorship',
    '/programs/sponsorship/student',
    '/programs/sadaka',
    '/programs/sadaka/masjids',
    '/programs/sadaka/schools',
    '/programs/campaigns',
    '/programs/campaigns/awareness',
    '/help',
    '/help/contact',
    '/help/faqs',
    '/help/terms',
    '/help/privacy',
    '/store',
    '/volunteer',
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 
              route.startsWith('/programs') ? 0.9 : 
              route.startsWith('/about') ? 0.8 : 0.7,
  }));
}