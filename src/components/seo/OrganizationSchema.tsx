import JsonLd from './JsonLd';

export default function OrganizationSchema() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Bariş Charity Foundation",
    "url": "https://barischarity.org",
    "logo": "https://barischarity.org/logo-main2.svg",
    "sameAs": [
      "https://www.facebook.com/barischarityfoundation",
      "https://twitter.com/barischarity",
      "https://www.instagram.com/baris_charity_foundation?igsh=eXhibTBlcWY2eW5y",
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
        "email": "info@barischarity.org",
        "telephone": "+90-XXX-XXX-XXXX",
        "url": "https://barischarity.org/help/contact"
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