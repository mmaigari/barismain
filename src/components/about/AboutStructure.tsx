import React from 'react';
import { User, ChartBar, Briefcase } from 'lucide-react';

const AboutStructure = () => {
  // Board members data structure for easier management
  const boardMembers = [
    {
      name: "Mus'ab Yusuf Abdullahi",
      position: "Chairman",
      responsibilities: [
        "Leads the board and ensures alignment with the foundation's mission.",
        "Oversees community engagement initiatives to strengthen stakeholder relationships.",
        "Provides financial oversight, ensuring responsible management of funds and compliance with financial regulations."
      ],
      icon: User
    },
    {
      name: "Ahmad Hussaini Yusuf",
      position: "Fundraising & Development, Program Evaluation",
      responsibilities: [
        "Develops and implements fundraising strategies to sustain the foundation's programs.",
        "Assesses program effectiveness and impact, ensuring continuous improvement.",
        "Builds partnerships with donors, sponsors, and institutional funders."
      ],
      icon: ChartBar
    },
    {
      name: "Mohammed Al-Rachid",
      position: "Leadership & Governance, Strategic Planning",
      responsibilities: [
        "Provides leadership in policy formulation and governance.",
        "Guides the long-term strategic direction of the organization.",
        "Ensures that all programs align with global best practices in nonprofit management."
      ],
      icon: Briefcase
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-[#09869a] mb-4">
            Our Structure
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full"></div>
          <p className="mt-6 text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            Bariş Charity Foundation operates with a clear organizational structure that ensures accountability, efficiency, and focused impact.
          </p>
        </div>
        
        {/* Board of Directors Content */}
        <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-md border border-[#09869a]/10">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="p-1.5 sm:p-2 rounded-full bg-[#09869a]/10 mr-2 sm:mr-3">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#09869a]" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#09869a]">Board of Directors</h3>
          </div>
          
          <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8">
            The Board of Directors provides leadership, oversight, and strategic direction for Bariş Charity Foundation. They ensure that the foundation stays true to its mission and operates effectively to maximize its impact.
          </p>
          
          {/* For mobile displays, stack each member in a card-like layout */}
          <div className="space-y-6 md:hidden">
            {boardMembers.map((member, index) => (
              <div 
                key={index}
                className="rounded-lg p-4 shadow-sm"
              >
                <h4 className="font-bold text-lg text-gray-800 mb-1">{member.name}</h4>
                <p className="text-[#FA6418] text-sm font-semibold mb-3 pb-2 border-b border-gray-200">{member.position}</p>
                
                <ul className="space-y-3">
                  {member.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#FA6418] text-lg mr-2 mt-0.5 flex-shrink-0">•</span>
                      <span className="text-gray-700 text-sm">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* For tablets and desktop, use grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <div className="mb-4">
                  <h4 className="font-bold text-lg text-gray-800 leading-tight">{member.name}</h4>
                  <p className="text-[#FA6418] text-sm font-semibold mt-1">{member.position}</p>
                </div>
                
                <ul className="space-y-3 mt-4">
                  {member.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#FA6418] text-lg mr-2 mt-0.5 flex-shrink-0">•</span>
                      <span className="text-gray-700 text-base">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStructure;