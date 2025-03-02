import React from 'react';
import { 
  FaHeartbeat, FaHandHoldingHeart, FaChild, 
  FaBook, FaCalculator, FaUtensils, FaTint, 
  FaUsers, FaTools, FaMosque 
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
            Impact & Achievements
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Since 2020, we have implemented impactful programs across multiple sectors, improving lives and strengthening communities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {impacts.map((impact, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#09869a]/10 text-[#09869a] mr-4 flex-shrink-0">
                  {impact.icon}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-[#09869a] mb-4">{impact.category}</h3>
                  <ul className="space-y-2">
                    {impact.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-[#FA6418] rounded-full mt-2 mr-2"></span>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-[#09869a]/5 p-6 md:p-8 rounded-lg border-l-4 border-[#09869a]">
          <h3 className="text-xl font-bold text-[#09869a] mb-4">Making a Difference</h3>
          <p className="text-gray-700 mb-4">
            Through these initiatives, Baris Charity Foundation has made a lasting impact on countless lives, ensuring sustainable development and community empowerment across Northern Nigeria and beyond.
          </p>
          <p className="text-gray-700">
            We continue to expand our reach and deepen our impact, guided by our commitment to addressing critical needs and creating pathways to self-sufficiency.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutImpact;