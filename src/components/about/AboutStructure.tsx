import React, { useState, useRef, useEffect } from 'react';
import { User, ChartBar, Briefcase, Users, LayoutGrid, UserCheck, HeartHandshake, ChevronLeft, ChevronRight } from 'lucide-react';

// Custom CSS for hiding scrollbars
const scrollbarHideStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

const AboutStructure = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('board');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  
  // Check if scroll buttons should be visible
  useEffect(() => {
    const checkScrollable = () => {
      const container = tabsContainerRef.current;
      if (container) {
        setShowScrollButtons(container.scrollWidth > container.clientWidth);
      }
    };
    
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  // Scroll tabs left or right
  const scrollTabs = (direction: 'left' | 'right') => {
    const container = tabsContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };
  
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
  
  // Tab definitions
  const tabs = [
    {
      id: 'board',
      label: 'Board of Directors',
      icon: Users,
      description: 'The Board of Directors provides leadership, oversight, and strategic direction for Baris Charity Foundation. They ensure that the foundation stays true to its mission and operates effectively to maximize its impact.'
    },
    {
      id: 'executive',
      label: 'Executive Team',
      icon: UserCheck,
      description: 'Led by our Chief Executive Officer, this team manages daily operations and program implementation.'
    },
    {
      id: 'programs',
      label: 'Program Teams',
      icon: LayoutGrid,
      description: 'Specialized teams focus on our key program areas, ensuring expert delivery and continuous improvement.'
    },
    {
      id: 'support',
      label: 'Support Functions',
      icon: HeartHandshake,
      description: 'These include Finance, Human Resources, Communications, and Donor Relations teams that ensure smooth operations.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <style>{scrollbarHideStyles}</style>
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
        
        {/* Tab Navigation */}
        <div className="relative mb-8">
          {showScrollButtons && (
            <>
              <button
                onClick={() => scrollTabs('left')}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
                aria-label="Scroll tabs left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => scrollTabs('right')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
                aria-label="Scroll tabs right"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}
          <div
            ref={tabsContainerRef}
            className="flex overflow-x-auto py-2 px-1 gap-2 md:gap-3 scrollbar-hide"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center whitespace-nowrap px-3 py-2 rounded-lg transition-all flex-shrink-0 ${
                  activeTab === tab.id 
                    ? 'bg-[#09869a] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" />
                <span className="font-medium text-sm sm:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content Container */}
        <div className="bg-white rounded-xl p-8 shadow-md border border-[#09869a]/10">
          {/* Active Tab Content */}
          {tabs.map((tab) => (
            <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-full bg-[#09869a]/10 mr-3">
                  <tab.icon className="w-6 h-6 text-[#09869a]" />
                </div>
                <h3 className="text-2xl font-bold text-[#09869a]">{tab.label}</h3>
              </div>
              
              <p className="text-gray-700 mb-8">
                {tab.description}
              </p>
              
              {/* Board of Directors Content */}
              {tab.id === 'board' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {boardMembers.map((member, index) => (
                    <div 
                      key={index}
                      className="bg-gray-50 rounded-lg p-5 border border-gray-100 hover:shadow-md transition-shadow flex flex-col"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-[#09869a]/10 flex items-center justify-center mr-4 flex-shrink-0">
                          <member.icon className="w-6 h-6 text-[#09869a]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-800 leading-tight">{member.name}</h4>
                          <p className="text-[#FA6418] text-sm font-medium">{member.position}</p>
                        </div>
                      </div>
                      
                      <ul className="space-y-3 mt-3">
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
              )}
              
              {/* Empty State for Other Teams */}
              {tab.id !== 'board' && (
                <div className="py-10 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <tab.icon className="w-10 h-10 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-500">Team members coming soon</h4>
                  <p className="text-gray-400 max-w-md mx-auto mt-2">
                    We're in the process of building our {tab.label.toLowerCase()}. Check back later for updates.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStructure;