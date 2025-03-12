"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Import already fixed - using Wrench instead of Tool
import { ChevronRight, Home, Droplet, Wrench } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { DonationProvider, useDonation } from '@/contexts/DonationContext';
import PaymentFeesModal from '@/components/donation/modals/PaymentFeesModal';
import TeamSupportModal from '@/components/donation/modals/TeamSupportModal';
import SignInModal from '@/components/donation/modals/SignInModal';
import GuestContinueModal from '@/components/donation/modals/GuestContinueModal';
import PaymentMethodModal from '@/components/donation/modals/PaymentMethodModal';
import ConfirmationModal from '@/components/donation/modals/ConfirmationModal';
import PayPalProvider from '@/components/payment/PayPalProvider';
import { washPrograms } from '@/data/washPrograms';

// Add this interface for the modal props
interface HandPumpDonationModalProps {
  fixedCost: number;
  onClose: () => void;
}

// Update the component definition with proper typing
const HandPumpDonationModal = ({ fixedCost, onClose }: HandPumpDonationModalProps) => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  
  const handleDonate = () => {
    setProgramName("Hand Pump Well");
    setDonationAmount(fixedCost);
    setCurrentModal('paymentFees');
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Donate a Hand Pump Well</h3>
        <p className="text-gray-600 mb-6">
          Your donation of ${fixedCost} will fund the construction of a hand pump well, providing 
          reliable water access to a village or community. Each well can serve 300-500 people with 
          clean water for drinking, cooking, and sanitation.
        </p>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDonate}
            className="px-6 py-2 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg"
          >
            Donate ${fixedCost}
          </button>
        </div>
      </div>
    </div>
  );
};

const HandPumpPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [wellModal, setWellModal] = useState(false);
  const { currentModal } = useDonation();
  
  // Add type annotation to event parameter
  const handleDonateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWellModal(true);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {wellModal && <HandPumpDonationModal fixedCost={1700} onClose={() => setWellModal(false)} />}
      
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
      <div className="relative bg-gray-50 pt-8">
        <section className="relative py-2">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-[#0088cc]">Home</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs" className="hover:text-[#0088cc]">Programs</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs/wash" className="hover:text-[#0088cc]">WASH</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <span className="text-gray-900">Hand Pump Well</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-56 md:h-64">
                    <Image 
                      src="/programs/hand-pump-well.jpg" 
                      alt="Hand Pump Well" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Hand Pump Well Program</h1>
                    <p className="text-gray-600 mb-4">
                      Our Hand Pump Well program provides a reliable, sustainable water source for villages 
                      and communities lacking access to clean water. These wells are more efficient than bucket wells, 
                      providing higher water flow and improved accessibility through a manual pump mechanism.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Each hand pump well can serve 300-500 people, providing clean water for drinking, 
                      cooking, washing, and irrigation. Hand pump wells significantly improve health outcomes 
                      and quality of life in rural communities that previously relied on unsafe water sources.
                    </p>
                    
                    <div className="bg-[#0088cc]/10 p-5 rounded-lg mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">Hand Pump Well Construction</h2>
                          <p className="text-gray-600">Full sponsorship of one community well</p>
                        </div>
                        <div className="text-3xl font-bold text-[#0088cc]">$1,700</div>
                      </div>
                      <button 
                        onClick={handleDonateClick}
                        className="mt-4 w-full py-3 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg transition"
                      >
                        Sponsor a Hand Pump Well
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">How Hand Pump Wells Work</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Construction Process</h3>
                          <p className="text-gray-600 mb-4">
                            A hand pump well is drilled to a depth of 20-45 meters to reach deeper groundwater. 
                            PVC casing is installed to protect the borehole, and a hand pump mechanism is mounted 
                            on a concrete platform at ground level. The entire system is designed for durability and 
                            ease of maintenance.
                          </p>
                          
                          <h3 className="font-semibold text-gray-800 mb-2">Water Collection</h3>
                          <p className="text-gray-600">
                            Users operate a manual lever or handle to pump water to the surface. This mechanical 
                            system is more efficient than rope-and-bucket methods, providing faster access to 
                            water with less physical effort.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Community Management</h3>
                          <p className="text-gray-600 mb-4">
                            We train local community members to maintain and repair the pump system. A water committee 
                            is established to manage usage schedules, collect nominal fees for maintenance, and ensure 
                            equitable access for all community members.
                          </p>
                          
                          <h3 className="font-semibold text-gray-800 mb-2">Advantages</h3>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Higher water flow than bucket wells</li>
                            <li>More hygienic water collection</li>
                            <li>Serves larger population (300-500 people)</li>
                            <li>Easier to operate, especially for women and children</li>
                            <li>10-15 year lifespan with proper maintenance</li>
                            <li>Parts can be locally sourced in many regions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Impact of Your Donation</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">300-500</div>
                          <div className="text-gray-600">People served per well</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">80%</div>
                          <div className="text-gray-600">Reduction in waterborne diseases</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">15 yrs</div>
                          <div className="text-gray-600">Average well lifespan</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Timeline</h2>
                      <div className="space-y-4">
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            1
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Site Selection & Community Engagement</h3>
                            <p className="text-gray-600">1-2 weeks</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            2
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Drilling & Construction</h3>
                            <p className="text-gray-600">2-3 weeks</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            3
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Pump Installation & Water Testing</h3>
                            <p className="text-gray-600">1 week</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            4
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Community Training & Handover</h3>
                            <p className="text-gray-600">1 week</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar - 1 column */}
              <div className="lg:col-span-1">
                {/* Donation Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Sponsor a Hand Pump Well</h3>
                    <p className="text-gray-600 mb-6">
                      Your contribution of $1,700 will provide a complete hand pump well for a village in need, 
                      giving hundreds of people access to clean water for generations to come.
                    </p>
                    <button 
                      onClick={handleDonateClick}
                      className="w-full py-3 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg transition duration-200"
                    >
                      Donate $1,700
                    </button>
                  </div>
                </div>
                
                {/* Benefits Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Benefits of Hand Pump Wells</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Clean, safe water for entire communities</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Dramatic reduction in waterborne illnesses</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Wrench className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Simple technology that can be locally maintained</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Improved school attendance rates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Economic opportunities through time saved</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Testimonial Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <div className="italic text-gray-600 mb-4">
                      "Before the hand pump well was installed in our village, I had to walk 3 kilometers each way to 
                      collect water for my family. Now, clean water is just a few minutes away. My children no longer 
                      miss school to help carry water, and we've seen far fewer illnesses in our community."
                    </div>
                    <div className="font-medium text-gray-800">— Fatima M., Village of Makala</div>
                  </div>
                </div>
                
                {/* Other Programs Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Other WASH Programs</h3>
                    <ul className="space-y-3">
                      {washPrograms.filter(program => program.id !== 'hand-pump-well').map(program => (
                        <li key={program.id}>
                          <Link href={program.href} className="text-[#0088cc] hover:underline">
                            {program.title}
                            {program.price && <span className="text-gray-600"> (${program.price})</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Link href="/programs/wash" className="text-[#0088cc] font-medium hover:underline">
                        View all WASH programs →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Toaster position="bottom-center" />
    </>
  );
};

// Main component wrapped with DonationProvider
const HandPumpWellPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="hand-pump-well">
        <HandPumpPageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default HandPumpWellPage;