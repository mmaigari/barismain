import JsonLd from './JsonLd';

interface DonationSchemaProps {
  name: string;
  description: string;
  image?: string;
  identifier?: string;
}

export default function DonationSchema({ 
  name, 
  description, 
  image = "/logo-main2.svg",
  identifier = "donation-campaign"
}: DonationSchemaProps) {
  const donationSchema = {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    "name": name,
    "description": description,
    "image": `https://barischarity.org${image}`,
    "identifier": identifier,
    "agent": {
      "@type": "NGO",
      "name": "Bariş Charity Foundation",
      "url": "https://barischarity.org"
    },
    "recipient": {
      "@type": "NGO",
      "name": "Bariş Charity Foundation"
    }
  };

  return <JsonLd data={donationSchema} />;
}