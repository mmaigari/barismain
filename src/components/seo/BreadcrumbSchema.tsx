import JsonLd from './JsonLd';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  // Add home as the first item if not already present
  const breadcrumbItems = items[0]?.name.toLowerCase() === 'home' ? items : [
    { name: 'Home', url: 'https://barischarity.org' },
    ...items
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `https://barischarity.org${item.url}`
    }))
  };

  return <JsonLd data={breadcrumbSchema} />;
}