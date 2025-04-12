"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDonation } from '@/contexts/DonationContext';
import EyeSurgeryModal from '@/components/donation/modals/EyeSurgeryModal';

interface MedicalProgramCardProps {
  title: string;
  imageSrc: string;
  href: string;
  fixedCost?: number;
}

const MedicalProgramCard: React.FC<MedicalProgramCardProps> = ({ title, imageSrc, href, fixedCost }) => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  const [eyeSurgeryModal, setEyeSurgeryModal] = useState(false);
  
  const handleDonate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Special handling for Eye Surgery to show the multi-surgery modal
    if (title === "Eye Surgery" && fixedCost) {
      setEyeSurgeryModal(true);
      return;
    }
    
    // Set program name in donation context
    setProgramName(title);
    
    if (fixedCost) {
      // For fixed cost programs
      setDonationAmount(fixedCost);
      localStorage.setItem("donationType", "fixed");
      localStorage.setItem("fixedAmount", fixedCost.toString());
    } else {
      // For flexible donation amounts
      localStorage.setItem("donationType", "custom");
    }
    
    // Store common donation details
    localStorage.setItem("programType", "medical");
    localStorage.setItem("isRecurring", "false");
    localStorage.setItem("programTitle", title);
    localStorage.setItem("programDescription", `Support our ${title} medical initiative.`);
    
    // Show donation options modal
    setCurrentModal('donationOptions');
  };
  
  return (
    <div className="relative group">
      <Link href={href} className="block">
        <div className="relative h-80 rounded-xl overflow-hidden shadow-lg transition-transform transform group-hover:scale-[1.02]">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            {fixedCost && (
              <div className="mt-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
                <span className="text-white font-medium">${fixedCost}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
      
      {/* Donate button */}
      <button 
        onClick={handleDonate}
        className="absolute top-4 right-4 bg-[#E32613] text-white text-sm px-3 py-1.5 rounded-lg hover:bg-[#E32613]/90 transition-colors shadow-md"
      >
        {title === "Eye Surgery" ? `Sponsor Surgery` : (fixedCost ? `Donate $${fixedCost}` : 'Donate')}
      </button>
      
      {/* Eye Surgery Modal */}
      {eyeSurgeryModal && <EyeSurgeryModal fixedCost={fixedCost || 100} onClose={() => setEyeSurgeryModal(false)} />}
    </div>
  );
};

export default MedicalProgramCard;