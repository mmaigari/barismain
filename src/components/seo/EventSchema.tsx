import JsonLd from './JsonLd';

interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address?: string;
    city?: string;
    country?: string;
    isVirtual?: boolean;
  };
  image?: string;
  organizerName?: string;
  url?: string;
}

export default function EventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  image = "/logo-main2.svg",
  organizerName = "Bariş Charity Foundation",
  url,
}: EventSchemaProps) {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    ...(endDate && { "endDate": endDate }),
    "location": location.isVirtual
      ? {
          "@type": "VirtualLocation",
          "name": location.name,
          "url": url || "https://barischarityfoundation.org",
        }
      : {
          "@type": "Place",
          "name": location.name,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": location.city,
            "addressCountry": location.country,
            "streetAddress": location.address,
          },
        },
    "image": image.startsWith('http') ? image : `https://barischarityfoundation.org${image}`,
    "organizer": {
      "@type": "Organization",
      "name": organizerName,
      "url": "https://barischarityfoundation.org"
    },
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": location.isVirtual
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    ...(url && { "url": url.startsWith('http') ? url : `https://barischarityfoundation.org${url}` })
  };

  return <JsonLd data={eventSchema} />;
}