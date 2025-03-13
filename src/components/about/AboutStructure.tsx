import React from 'react';
import { User, ChartBar, Briefcase, Users } from 'lucide-react';

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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">
            Our Structure
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Bariş Charity Foundation operates with a clear organizational structure that ensures accountability, efficiency, and focused impact.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-8 shadow-md border border-[#09869a]/10">
          {/* Board of Directors Section */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-full bg-[#09869a]/10 mr-3">
                <Users className="w-6 h-6 text-[#09869a]" />
              </div>
              <h3 className="text-2xl font-bold text-[#09869a]">Board of Directors</h3>
            </div>
            
            <p className="text-gray-700 mb-8">
              The Board of Directors provides leadership, oversight, and strategic direction for Baris Charity Foundation. 
              They ensure that the foundation stays true to its mission and operates effectively to maximize its impact.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {boardMembers.map((member, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#09869a]/10 flex items-center justify-center mr-4">
                      <member.icon className="w-6 h-6 text-[#09869a]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{member.name}</h4>
                      <p className="text-[#FA6418] text-sm">{member.position}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mt-4">
                    {member.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#FA6418] mr-2 mt-1">•</span>
                        <span className="text-gray-700 text-sm">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              {/* Executive Team */}
              <h3 className="text-2xl font-bold text-[#09869a] mb-4">Executive Team</h3>
              <p className="text-gray-700 mb-6">
                Led by our Chief Executive Officer, this team manages daily operations and program implementation.
              </p>
            </div>
            
            <div>
              {/* Program Teams */}
              <h3 className="text-2xl font-bold text-[#09869a] mb-4">Program Teams</h3>
              <p className="text-gray-700 mb-6">
                Specialized teams focus on our key program areas, ensuring expert delivery and continuous improvement.
              </p>
            </div>
          </div>
          
          {/* Support Functions */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-[#09869a] mb-4">Support Functions</h3>
            <p className="text-gray-700">
              These include Finance, Human Resources, Communications, and Donor Relations teams that ensure smooth operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStructure;