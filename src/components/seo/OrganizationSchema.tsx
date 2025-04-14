import JsonLd from './JsonLd';

export default function OrganizationSchema() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Bariş Charity Foundation",
    "url": "https://barischarityfoundation.org",
    "logo": "https://barischarityfoundation.org/logo-main2.svg",
    "sameAs": [
      "https://www.facebook.com/barischarityfoundation",
      "https://twitter.com/barischarity",
      "https://www.instagram.com/barischarityfoundation",
      "https://www.linkedin.com/company/baris-charity-foundation"
    ],
    "description": "Bariş Charity Foundation is committed to alleviating suffering through comprehensive and sustainable development programs in education, healthcare, food security, and community resilience.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Turkey"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "info@barischarityfoundation.org",
        "url": "https://barischarityfoundation.org/help/contact"
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "Bariş Charity Foundation Founder"
    },
    "foundingDate": "2015",
    "nonprofitStatus": "Nonprofit501c3"
  };

  return <JsonLd data={orgSchema} />;
}