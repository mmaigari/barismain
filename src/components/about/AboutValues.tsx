import React from 'react';
import {
  Shield,
  Heart,
  Accessibility,
  Recycle,
  Handshake,
  Lightbulb,
  Globe
} from "lucide-react";

const values = [
  {
    icon: <Heart className="w-12 h-12 text-[#FF6F61]" />,
    title: "Compassion",
    description: "We serve with kindness, dignity, and care for the most vulnerable."
  },
  {
    icon: <Shield className="w-12 h-12 text-[#008080]" />,
    title: "Integrity",
    description: "Transparency and accountability are at the heart of everything we do."
  },
  {
    icon: <Accessibility className="w-12 h-12 text-[#E1AD01]" />,
    title: "Equity & Inclusion",
    description: "Everyone deserves equal access to opportunities, regardless of background."
  },
  {
    icon: <Recycle className="w-12 h-12 text-[#008080]" />,
    title: "Sustainability",
    description: "We focus on long-term solutions that create lasting impact."
  },
  {
    icon: <Handshake className="w-12 h-12 text-[#800000]" />,
    title: "Community & Collaboration",
    description: "Together, we achieve more by working with local and global partners."
  },
  {
    icon: <Lightbulb className="w-12 h-12 text-[#FFA500]" />,
    title: "Education & Empowerment",
    description: "Knowledge transforms lives and builds a brighter future."
  },
  {
    icon: <Globe className="w-12 h-12 text-[#E1AD01]" />,
    title: "Faith & Cultural Respect",
    description: "Our work honors diverse traditions and values."
  }
];

const AboutValues = () => {
  return (
    <section className="py-16 md:py-24 bg-[#f9fafb]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">
            Core Values
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Our core values guide every decision and action we take as an organization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#09869a]/10 flex items-center justify-center text-[#09869a] mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#09869a] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;