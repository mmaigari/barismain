import JsonLd from './JsonLd';

interface ProjectSchemaProps {
  name: string;
  description: string;
  image?: string;
  url?: string;
  area?: string;
  dateCreated?: string;
  keywords?: string[];
  goals?: string[];
  progress?: number; // percentage of completion (0-100)
}

export default function ProjectSchema({
  name,
  description,
  image = "/logo-main2.svg",
  url,
  area,
  dateCreated,
  keywords = [],
  goals = [],
  progress
}: ProjectSchemaProps) {
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": `Bariş Charity Foundation - ${name}`,
    "description": description,
    "image": image.startsWith('http') ? image : `https://barischarity.org${image}`,
    "url": url ? (url.startsWith('http') ? url : `https://barischarity.org${url}`) : "https://barischarity.org",
    ...(area && { "areaServed": area }),
    ...(dateCreated && { "dateCreated": dateCreated }),
    ...(keywords.length > 0 && { "keywords": keywords.join(", ") }),
    ...(goals.length > 0 && {
      "subOrganization": goals.map(goal => ({
        "@type": "OrganizationRole",
        "roleName": "Project Goal",
        "description": goal
      }))
    }),
    ...(typeof progress === 'number' && {
      "additionalProperty": {
        "@type": "PropertyValue",
        "name": "projectProgress",
        "value": `${progress}%`
      }
    }),
    "parentOrganization": {
      "@type": "NGO",
      "name": "Bariş Charity Foundation",
      "url": "https://barischarity.org"
    }
  };

  return <JsonLd data={projectSchema} />;
}