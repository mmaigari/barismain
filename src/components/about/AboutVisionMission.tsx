import React from 'react';

const AboutVisionMission = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">
            Vision & Mission
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          <div className="bg-[#09869a]/5 p-8 rounded-lg border-l-4 border-[#09869a]">
            <h3 className="text-2xl font-bold text-[#09869a] mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              Empowering vulnerable groups to become productive members of society, contributing to community development and economic growth.
            </p>
            <p className="text-gray-700 italic mt-4 font-medium">
              "The best of mankind is that who is most beneficial to mankind."
            </p>
          </div>
          
          <div className="bg-[#FA6418]/5 p-8 rounded-lg border-l-4 border-[#FA6418]">
            <h3 className="text-2xl font-bold text-[#FA6418] mb-4">Our Mission</h3>
            <ul className="text-gray-700 space-y-3">
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-[#FA6418] rounded-full flex-shrink-0 mt-1 mr-3"></span>
                <span>Almajiri Welfare: Feeding, awareness, and advocacy programs to strengthen their commitment to society and cultivate a sense of responsibility.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-[#FA6418] rounded-full flex-shrink-0 mt-1 mr-3"></span>
                <span>Youth Employment & Rehabilitation: Skill-building and vocational training programs tailored to unemployment challenges.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-[#FA6418] rounded-full flex-shrink-0 mt-1 mr-3"></span>
                <span>WASH Initiatives: Using our extensive network to seek support for clean water, sanitation, and hygiene projects.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-[#FA6418] rounded-full flex-shrink-0 mt-1 mr-3"></span>
                <span>Mentorship & Support: Continuous mentoring and follow-up services for vulnerable groups.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-[#FA6418] rounded-full flex-shrink-0 mt-1 mr-3"></span>
                <span>Volunteerism: Encouraging graduates and professionals to engage in community service.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVisionMission;