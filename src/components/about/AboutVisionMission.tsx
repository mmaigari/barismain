import React from 'react';

const AboutVisionMission = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">
            Our Vision & Mission
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="bg-white rounded-xl p-8 shadow-md border border-[#09869a]/10">
            <h3 className="text-3xl font-bold text-[#09869a] mb-6">Vision</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Baris Charity Foundation envisions a world where every individual has access to basic necessities, quality education, and healthcare, enabling them to break free from the cycle of poverty and lead dignified lives.
            </p>
            <p className="text-gray-700 leading-relaxed">
              {/* Fixed unescaped quotes with different quote types */}
              We believe in creating a future where &ldquo;no one is left behind&rdquo; in the journey toward sustainable development and social equality.
            </p>
          </div>
          
          {/* Mission */}
          <div className="bg-white rounded-xl p-8 shadow-md border border-[#09869a]/10">
            <h3 className="text-3xl font-bold text-[#09869a] mb-6">Mission</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our mission is to provide immediate relief and long-term support to vulnerable communities through sustainable programs in healthcare, education, water and sanitation, food security, and economic empowerment.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are committed to implementing innovative solutions that address the root causes of poverty, strengthening community resilience, and fostering self-sufficiency while upholding the principles of transparency, accountability, and respect for human dignity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVisionMission;