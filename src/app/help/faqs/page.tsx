"use client"

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      question: "How can I donate to Baris Charity Foundation?",
      answer: "You can donate through our website using our secure payment system, or by contacting our office directly. We accept various payment methods including credit cards, bank transfers, and mobile payments."
    },
    {
      question: "Where does my donation go?",
      answer: "Your donations directly support our programs in education, healthcare, clean water projects, emergency relief, and community development. We ensure that at least 85% of all donations go directly to our field programs."
    },
    {
      question: "Can I volunteer with BCF?",
      answer: "Yes! We welcome volunteers for both local and international opportunities. Please visit our 'Get Involved' page to learn about current volunteer openings or contact our volunteer coordinator."
    },
    {
      question: "Is my donation tax-deductible?",
      answer: "BCF is a registered non-profit organization, and donations may be tax-deductible in your country. We provide official receipts for all donations. Please consult with your tax advisor for specifics regarding your situation."
    },
    {
      question: "How can I stay updated about BCF's work?",
      answer: "You can subscribe to our newsletter, follow us on social media, or check our website regularly for updates. We also publish annual reports and impact stories throughout the year."
    }
  ];
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div>
      <h1 className="font-montserrat text-3xl font-bold text-[#09869a] mb-4">Frequently Asked Questions</h1>
      <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mb-8"></div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}