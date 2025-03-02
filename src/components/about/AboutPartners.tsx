import React from 'react';
import Image from 'next/image';

const AboutPartners = () => {
  const partners = [
    {
      name: "Hasene International",
      country: "Germany",
      logo: "/images/partners/hasene.png"
    },
    {
      name: "Yardimeli Dernegi",
      country: "Turkey",
      logo: "/images/partners/yardimeli.png"
    },
    {
      name: "Sekka World Su Hizmetleri",
      country: "Turkey",
      logo: "/images/partners/sekka.png"
    },
    {
      name: "Insanizi Insani Yardim Dernegi",
      country: "Turkey",
      logo: "/images/partners/insanizi.png"
    },
    {
      name: "Afrika Hayat Assosiation AHAD",
      country: "Turkey",
      logo: "/images/partners/ahad.png"
    },
    {
      name: "Humaniti",
      country: "Canada",
      logo: "/images/partners/humaniti.png"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">
            Partnerships & Collaborations
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            We collaborate with renowned international organizations to maximize our impact and reach.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="relative w-32 h-20 mb-4">
                <Image 
                  src={partner.logo} 
                  alt={partner.name} 
                  fill
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150x100?text=Logo";
                  }}
                />
              </div>
              <h3 className="text-lg font-bold text-[#09869a] mb-1">{partner.name}</h3>
              <p className="text-gray-600 text-sm">{partner.country}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default AboutPartners;