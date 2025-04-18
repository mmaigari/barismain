import React, { useState, useRef, useEffect } from 'react';
import { 
  FaHeartbeat, FaHandHoldingHeart, FaChild, 
  FaBook, FaCalculator, FaUtensils, 
  FaTint, FaUsers, FaTools, FaMosque,
  FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';

const AboutPrograms = () => {
  const [activeTab, setActiveTab] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const programs = [
    {
      id: 1,
      icon: <FaHeartbeat className="text-3xl" />,
      title: "Medical Program",
      description: "Providing life-changing surgical procedures and healthcare support to individuals in need.",
      details: [
        "Eye Surgery & General Surgeries",
        "Medical Bill Assistance",
        "Sanitary Packs Distribution",
        "Health Facilities Support"
      ],
      beneficiaries: "Low-income individuals, patients requiring urgent surgeries, women and girls, communities with limited healthcare access."
    },
    {
      id: 2,
      icon: <FaHandHoldingHeart className="text-3xl" />,
      title: "Humanitarian Campaigns",
      description: "Delivering rapid assistance during emergencies and supporting those in dire situations.",
      details: [
        "Emergency Relief Response",
        "Cash Aid Distribution",
        "Humanitarian Awareness Campaigns"
      ],
      beneficiaries: "Victims of conflicts and disasters, families facing extreme hardship, underprivileged communities."
    },
    {
      id: 3,
      icon: <FaChild className="text-3xl" />,
      title: "Sponsorship Programs",
      description: "Supporting orphans with financial and emotional assistance for their education and wellbeing.",
      details: [
        "Orphan Sponsorship",
        "Orphan Student Sponsorship"
      ],
      beneficiaries: "Orphaned children in need of financial and emotional support, students requiring educational assistance."
    },
    {
      id: 4,
      icon: <FaBook className="text-3xl" />,
      title: "Education Support",
      description: "Enhancing access to quality education through resources and infrastructure improvements.",
      details: [
        "School Kits Distribution",
        "Quran Distribution",
        "Lighting Up a School",
        "School Renovation Projects"
      ],
      beneficiaries: "Underprivileged students, religious institutions, schools in rural and underdeveloped areas."
    },
    {
      id: 5,
      icon: <FaCalculator className="text-3xl" />,
      title: "Zakat & Financial Assistance",
      description: "Facilitating proper calculation and distribution of religious financial obligations.",
      details: [
        "Zakat Calculator",
        "Zakat Disbursement"
      ],
      beneficiaries: "Muslims fulfilling zakat obligations, underprivileged families eligible for zakat assistance."
    },
    {
      id: 6,
      icon: <FaUtensils className="text-3xl" />,
      title: "Food Security Program",
      description: "Combating hunger through distribution of meals and essential food supplies.",
      details: [
        "Hot Meals Distribution",
        "Food Parcels Distribution",
        "Aqeeqah, Vows, & Qurbani Services"
      ],
      beneficiaries: "Low-income families, individuals in crisis areas, communities observing religious traditions."
    },
    {
      id: 7,
      icon: <FaTint className="text-3xl" />,
      title: "WASH Program",
      description: "Improving access to clean water and sanitation facilities in underserved communities.",
      details: [
        "Bucket Well & Hand Pump Well",
        "Solar Well & Artesian Well",
        "Sewage & Toilet Construction"
      ],
      beneficiaries: "Communities with water shortages, families without clean drinking water, schools lacking sanitation."
    },
    {
      id: 8,
      icon: <FaUsers className="text-3xl" />,
      title: "Community Resilience",
      description: "Strengthening community capacity through sustainable economic opportunities.",
      details: [
        "Livestock Rearing Projects",
        "Building Young Capacity",
        "Women Empowerment Initiatives"
      ],
      beneficiaries: "Families needing income opportunities, youth seeking employment, women striving for financial independence."
    },
    {
      id: 9,
      icon: <FaTools className="text-3xl" />,
      title: "Early Recovery & Livelihood",
      description: "Helping individuals rebuild their lives through skills development and employment.",
      details: [
        "Vocational Training & Skills Development",
        "Social Services Assistance",
        "Networking & Business Support",
        "Cash for Work (CFW) Program"
      ],
      beneficiaries: "People recovering from crises, unemployed individuals, families striving for self-sufficiency."
    },
    {
      id: 10,
      icon: <FaMosque className="text-3xl" />,
      title: "Sadaqah Jariyah",
      description: "Creating lasting impact through construction of essential community facilities.",
      details: [
        "Building Masjids",
        "Establishing Orphanages",
        "Building Schools"
      ],
      beneficiaries: "Muslim communities, orphaned children, underprivileged areas lacking infrastructure."
    }
  ];

  // Handle tab click and scroll to the corresponding card
  const handleTabClick = (programId: number) => {
    setActiveTab(programId);
    
    // Find the program card and scroll to it
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll('.program-card');
      const cardIndex = programId - 1; // Convert to zero-based index
      
      if (cards[cardIndex]) {
        cards[cardIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  // Scroll carousel to previous item
  const scrollPrev = () => {
    if (carouselRef.current) {
      // Find current visible card index
      const currentIndex = programs.findIndex(p => p.id === activeTab);
      const newIndex = Math.max(0, currentIndex - 1);
      setActiveTab(programs[newIndex].id);
      
      const cards = carouselRef.current.querySelectorAll('.program-card');
      if (cards[newIndex]) {
        cards[newIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  // Scroll carousel to next item
  const scrollNext = () => {
    if (carouselRef.current) {
      // Find current visible card index
      const currentIndex = programs.findIndex(p => p.id === activeTab);
      const newIndex = Math.min(programs.length - 1, currentIndex + 1);
      setActiveTab(programs[newIndex].id);
      
      const cards = carouselRef.current.querySelectorAll('.program-card');
      if (cards[newIndex]) {
        cards[newIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest', 
          inline: 'center'
        });
      }
    }
  };

  // Use Intersection Observer to update active tab based on visible cards
  useEffect(() => {
    if (!carouselRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cardId = Number(entry.target.getAttribute('data-program-id'));
            if (cardId && cardId !== activeTab) {
              setActiveTab(cardId);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 // Card needs to be 60% visible to be considered active
      }
    );
    
    // Observe all program cards
    const cards = carouselRef.current.querySelectorAll('.program-card');
    cards.forEach(card => observer.observe(card));
    
    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">
            Focus Areas & Programs
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Our diverse programs address critical needs across multiple sectors, creating lasting positive change.
          </p>
        </div>
        
        {/* Program tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 md:space-x-4 min-w-max p-1">
            {programs.map(program => (
              <button
                key={program.id}
                className={`px-3 md:px-5 py-2 rounded-full text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === program.id 
                    ? "bg-[#09869a] text-white" 
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => handleTabClick(program.id)}
              >
                {program.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Carousel Navigation Controls */}
        <div className="flex justify-end mb-4 gap-2">
          <button 
            onClick={scrollPrev}
            disabled={activeTab === 1}
            className="p-2 rounded-full bg-[#FA6418] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E45A16] transition-colors"
            aria-label="Previous program"
          >
            <FaChevronLeft />
          </button>
          <button 
            onClick={scrollNext}
            disabled={activeTab === programs.length}
            className="p-2 rounded-full bg-[#FA6418] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E45A16] transition-colors"
            aria-label="Next program"
          >
            <FaChevronRight />
          </button>
        </div>
        
        {/* Program Cards Carousel */}
        <div 
          className="relative overflow-hidden"
        >
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar"
            style={{
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {programs.map((program) => (
              <div 
                key={program.id}
                data-program-id={program.id}
                className={`program-card flex-shrink-0 w-full md:w-[90%] lg:w-[85%] snap-center bg-white rounded-lg shadow-md p-6 md:p-8 ${
                  activeTab === program.id ? "ring-2 ring-[#09869a]" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#09869a]/10 text-[#09869a] mx-auto md:mx-0">
                    {program.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-[#09869a] mb-4 text-center md:text-left">{program.title}</h3>
                    <p className="text-gray-700 mb-6">{program.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-lg text-[#FA6418] mb-3">Programs:</h4>
                        <ul className="space-y-2">
                          {program.details.map((detail, index) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-[#FA6418] rounded-full mt-2 mr-3"></span>
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-lg text-[#FA6418] mb-3">Beneficiaries:</h4>
                        <p className="text-gray-700">{program.beneficiaries}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {programs.map(program => (
            <button
              key={program.id}
              onClick={() => handleTabClick(program.id)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeTab === program.id 
                  ? "bg-[#09869a] w-5" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to ${program.title}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPrograms;