import JsonLd from './JsonLd';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSchemaProps {
  faqs: FaqItem[];
}

export default function FaqSchema({ faqs }: FaqSchemaProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return <JsonLd data={faqSchema} />;
}