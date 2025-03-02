"use client"

import { useEffect, useRef } from 'react';
import { FaTimes, FaHeart, FaUsers, FaHandshake, FaCalculator, 
  FaUtensils, FaTint, FaLeaf, FaLandmark } from 'react-icons/fa';

interface ProgramsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const programsData = [
  {
    name: "Medical Program",
    icon: <FaHeart />,
    color: "#FF6F61",
    subPrograms: ["Surgeries", "Medical Bill Payment", "Sanitary Packs", "Health Facilities"]
  },
  {
    name: "WASH Program",
    icon: <FaTint />,
    color: "#FFDE59",
    subPrograms: ["Bucket Well", "Solar Well", "Hand Pump Well", "Artesian Well", "Sewage", "Toilets"]
  },
  {
    name: "Food Program",
    icon: <FaUtensils />,
    color: "#008080",
    subPrograms: ["Hot Meals", "Food Parcels", "Akika", "Vows", "Kurban"]
  },
  {
    name: "Humanitarian Aid",
    icon: <FaUsers />,
    color: "#008080",
    subPrograms: ["Humanitarian Campaign", "Urgent Relief Response", "Cash Aid"]
  },
  {
    name: "Sadaka Jariya",
    icon: <FaLandmark />,
    color: "#008080",
    subPrograms: ["Build a Masjid", "Build an Orphanage", "Build a School"]
  },
  {
    name: "Sponsorship",
    icon: <FaHandshake />,
    color: "#E1AD01",
    subPrograms: ["Orphan Sponsorship", "Orphan Student Sponsorship"]
  },
  {
    name: "Zakat",
    icon: <FaCalculator />,
    color: "#FFA500",
    subPrograms: ["Zakat Calculator", "Manual"]
  },
  {
    name: "Community Resilience",
    icon: <FaLeaf />,
    color: "#FF6F61",
    subPrograms: ["Livestock Rearing", "Building Young Capacity", "Empowering Women"]
  },
];

const ProgramsModal = ({ isOpen, onClose }: ProgramsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.body.style.overflow = ''; // Re-enable scrolling
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      style={{ 
        animation: isOpen ? "fadeIn 0.3s ease-in-out" : "fadeOut 0.3s ease-in-out",
      }}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        style={{ 
          animation: isOpen ? "modalSlideIn 0.3s ease-out" : "modalSlideOut 0.3s ease-in",
        }}
      >
        <div className="sticky top-0 z-10 flex justify-between items-center p-5 border-b bg-white">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333]">All Programs</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            aria-label="Close modal"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programsData.map((program, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
                style={{ borderLeft: `4px solid ${program.color}` }}
              >
                <div className="flex items-start mb-3">
                  <div 
                    className="mr-3 p-2 rounded-md"
                    style={{ backgroundColor: `${program.color}15` }}
                  >
                    <span style={{ color: program.color }}>
                      {program.icon}
                    </span>
                  </div>
                  <h3 
                    className="text-lg font-semibold"
                    style={{ color: program.color }}
                  >
                    {program.name}
                  </h3>
                </div>
                
                <ul className="ml-2 space-y-1">
                  {program.subPrograms.map((subProgram, subIndex) => (
                    <li key={subIndex} className="text-sm text-gray-700">
                      <a 
                        href={`/programs/${program.name.toLowerCase().replace(/\s+/g, '-')}/${subProgram.toLowerCase().replace(/\s+/g, '-')}`}
                        className="hover:text-[#FA6418] hover:underline transition-colors flex items-center"
                      >
                        <span className="mr-2">•</span>
                        {subProgram}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsModal;