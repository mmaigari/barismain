import React from 'react';
import Image from 'next/image';

const AboutOverview = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#09869a] mb-6">
              Mandate
            </h2>
            <div className="w-20 h-1.5 bg-[#FA6418] rounded-full mb-8"></div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Bariş Charity Foundation is a non-profit, community-based organization committed to alleviating suffering through comprehensive and sustainable development. Our services include educational opportunities, vocational training, mentoring, rehabilitation, and advocacy to improve the economic and social standing of vulnerable groups.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are a civil society organization that upholds equal opportunity and non-discrimination. Our work benefits all individuals regardless of race, nationality, color, political or social affiliation, or cultural background.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/about-overview.jpg" 
              alt="Children benefiting from Bariş Charity programs" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOverview;