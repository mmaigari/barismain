"use client"

import { useState } from 'react';
import Link from 'next/link';
import { 
  FaHeart, FaUsers, FaHandshake, FaGraduationCap, 
  FaCalculator, FaUtensils, FaTint, FaLeaf, 
  FaSuitcase, FaLandmark, FaArrowRight 
} from 'react-icons/fa';
import ProgramsModal from './ProgramsModal';

// Program data derived from the navigation menu
const programs = [
  {
    name: "Medical Program",
    icon: <FaHeart />,
    color: "#FF6F61",
    description: "Providing essential medical services, surgeries, and healthcare support to underserved communities.",
    link: "/programs/medical"
  },
  {
    name: "Education",
    icon: <FaGraduationCap />,
    color: "#800000",
    description: "Supporting educational initiatives through school supplies, infrastructure, and learning resources.",
    link: "/programs/education"
  },
  {
    name: "WASH Program",
    icon: <FaTint />,
    color: "#FFDE59",
    description: "Implementing clean water solutions, sanitation facilities, and hygiene education programs.",
    link: "/programs/wash"
  },
  {
    name: "Food Program",
    icon: <FaUtensils />,
    color: "#008080",
    description: "Distributing nutritious meals, food parcels, and sustainable food solutions to combat hunger.",
    link: "/programs/food"
  },
  {
    name: "Community Resilience",
    icon: <FaLeaf />,
    color: "#FF6F61",
    description: "Strengthening community capacity to withstand crises through preparation, resources, and infrastructure.",
    link: "/programs/community"
  },
  {
    name: "Sadaka Jariya",
    icon: <FaLandmark />,
    color: "#008080",
    description: "Building sustainable infrastructure like schools, orphanages, and mosques for long-term community benefit.",
    link: "/programs/sadaka"
  }
];

const ProgramsSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#333] mb-4">
            Our Programs
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-6"></div>
          <p className="text-[#555] max-w-3xl mx-auto text-lg">
            Discover the various ways we&apos;re making a difference through our comprehensive 
            programs designed to address critical needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {programs.map((program, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-5px]"
              style={{ borderTop: `4px solid ${program.color}` }}
            >
              <div className="p-6">
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ backgroundColor: `${program.color}15` }}
                >
                  <span className="text-2xl" style={{ color: program.color }}>
                    {program.icon}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-[#333] mb-3">
                  {program.name}
                </h3>
                
                <p className="text-[#666] mb-5 min-h-[4.5rem]">
                  {program.description}
                </p>
                
                <Link 
                  href={program.link}
                  className="inline-flex items-center text-[#FA6418] font-medium hover:text-[#E45A16] transition-colors"
                >
                  Learn More <FaArrowRight className="ml-2 text-sm" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <button 
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center bg-[#FA6418] hover:bg-[#E45A16] text-white py-3 px-8 rounded-full font-medium transition-colors shadow-md"
          >
            <span>Explore All Programs</span>
            <div className="ml-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <FaArrowRight className="text-sm" />
            </div>
          </button>
        </div>
      </div>
      
      {/* Programs Modal */}
      <ProgramsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default ProgramsSection;