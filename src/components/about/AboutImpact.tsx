import React from 'react';
import { 
  FaHeartbeat, FaBook, FaUtensils, FaTint 
} from 'react-icons/fa';

const AboutImpact = () => {
  const impacts = [
    {
      category: "Medical Program",
      icon: <FaHeartbeat className="text-3xl" />,
      achievements: [
        "Eye surgeries for individuals with cataracts",
        "General surgeries for critical conditions",
        "Medical bill payments for those in need",
        "Sanitary pack distribution for women and girls",
        "Support for healthcare facilities in underserved areas"
      ]
    },
    {
      category: "WASH Program",
      icon: <FaTint className="text-3xl" />,
      achievements: [
        "Over 1000 water wells constructed across Northern Nigeria",
        "Bucket wells for small communities",
        "Solar wells providing sustainable water solutions",
        "Hand pump wells in rural areas",
        "Artesian wells delivering high-quality groundwater",
        "Improved sanitation facilities in public and private spaces"
      ]
    },
    {
      category: "Food Security",
      icon: <FaUtensils className="text-3xl" />,
      achievements: [
        "Regular hot meals distribution",
        "Food parcels to struggling families",
        "Akika and vows distributions",
        "Annual Qurbani during Eid-ul-Adha"
      ]
    },
    {
      category: "Education Support",
      icon: <FaBook className="text-3xl" />,
      achievements: [
        "School supplies distribution",
        "Quran distribution to students and institutions",
        "Solar lighting installations in schools",
        "School renovation projects"
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">
            Our Impact
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Through dedication, collaboration, and your support, we have achieved significant milestones in our mission to uplift communities in need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-md text-center border border-[#09869a]/10 hover:shadow-lg transition-all duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#f9fafb] rounded-full mb-6 shadow-inner">
            </div>
            <h3 className="text-5xl font-bold text-[#09869a] mb-2">150K+</h3>
            <p className="text-lg font-semibold text-gray-700 mb-1">Lives Impacted</p>
            <p className="text-sm text-gray-600">Across multiple communities</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutImpact;