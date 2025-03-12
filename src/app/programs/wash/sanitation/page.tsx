"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Droplet, Bath, Heart } from 'lucide-react';
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
interface SanitationDonationModalProps {
  fixedCost: number;
  onClose: () => void;
}

// Donation modal component
const SanitationDonationModal = ({ fixedCost, onClose }: SanitationDonationModalProps) => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  
  const handleDonate = () => {
    setProgramName("Sewage & Toilet Construction");
    setDonationAmount(fixedCost);
    setCurrentModal('paymentFees');
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Donate for Sanitation Facilities</h3>
        <p className="text-gray-600 mb-6">
          Your donation of ${fixedCost} will fund the construction of sanitation facilities for a community in need, 
          including toilets, sewage systems, and handwashing stations. These facilities will help prevent disease and 
          promote dignity and safety.
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

const SanitationPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [sanitationModal, setSanitationModal] = useState(false);
  const { currentModal } = useDonation();
  
  const handleDonateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSanitationModal(true);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {sanitationModal && <SanitationDonationModal fixedCost={1000} onClose={() => setSanitationModal(false)} />}
      
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
              <span className="text-gray-900">Sewage & Toilet Construction</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-56 md:h-64">
                    <Image 
                      src="/programs/sanitation.jpg" 
                      alt="Sewage and Toilet Construction" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Sewage & Toilet Construction Program</h1>
                    <p className="text-gray-600 mb-4">
                      Our Sanitation program builds essential sewage systems and toilet facilities in communities 
                      lacking proper sanitation infrastructure. Access to clean, safe sanitation facilities is crucial 
                      for health, dignity, and safety, particularly for women and children.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Each sanitation project includes properly constructed toilets, sewage disposal systems, 
                      and handwashing stations. We also provide education on hygiene practices and facility maintenance, 
                      ensuring communities can maintain improved sanitation practices for years to come.
                    </p>
                    
                    <div className="bg-[#0088cc]/10 p-5 rounded-lg mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">Sanitation Facility Construction</h2>
                          <p className="text-gray-600">Full sponsorship of community sanitation facilities</p>
                        </div>
                        <div className="text-3xl font-bold text-[#0088cc]">$1,000</div>
                      </div>
                      <button 
                        onClick={handleDonateClick}
                        className="mt-4 w-full py-3 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg transition"
                      >
                        Sponsor Sanitation Facilities
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">About Our Sanitation Projects</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Project Components</h3>
                          <p className="text-gray-600 mb-4">
                            Each sanitation project includes construction of ventilated improved pit (VIP) latrines or 
                            pour-flush toilets depending on local conditions, proper sewage disposal systems, handwashing 
                            stations, and drainage systems to prevent standing water and mosquito breeding grounds.
                          </p>
                          
                          <h3 className="font-semibold text-gray-800 mb-2">Community Facilities</h3>
                          <p className="text-gray-600">
                            We build sanitation facilities for schools, health centers, and community spaces. 
                            Special attention is given to creating safe, private facilities for women and girls, 
                            who often face harassment or danger when using public facilities or open defecation areas.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Hygiene Education</h3>
                          <p className="text-gray-600 mb-4">
                            Each construction project includes comprehensive hygiene education programs for the community. 
                            Topics include proper handwashing, safe water handling, menstrual hygiene management, and facility 
                            maintenance to ensure sustainable impact.
                          </p>
                          
                          <h3 className="font-semibold text-gray-800 mb-2">Long-term Benefits</h3>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Reduction in diarrheal diseases by up to 40%</li>
                            <li>Improved school attendance, especially for girls</li>
                            <li>Decreased risk of violence for women and girls</li>
                            <li>Enhanced dignity and privacy</li>
                            <li>Reduced environmental contamination</li>
                            <li>Improved community health overall</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Impact of Your Donation</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">200+</div>
                          <div className="text-gray-600">People served per facility</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">40%</div>
                          <div className="text-gray-600">Reduction in diarrheal disease</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">15 yrs</div>
                          <div className="text-gray-600">Average facility lifespan</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Construction Process</h2>
                      <div className="space-y-4">
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            1
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Community Assessment & Engagement</h3>
                            <p className="text-gray-600">1-2 weeks</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            2
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Site Selection & Preparation</h3>
                            <p className="text-gray-600">1 week</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            3
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Toilet & Sewage System Construction</h3>
                            <p className="text-gray-600">3-4 weeks</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            4
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Handwashing Stations Installation</h3>
                            <p className="text-gray-600">1 week</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            5
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Community Hygiene Education</h3>
                            <p className="text-gray-600">2 weeks (ongoing)</p>
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
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Sponsor Sanitation Facilities</h3>
                    <p className="text-gray-600 mb-6">
                      Your contribution of $1,000 will provide complete sanitation facilities for a community in need, 
                      helping prevent disease and providing safety and dignity to hundreds of people.
                    </p>
                    <button 
                      onClick={handleDonateClick}
                      className="w-full py-3 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg transition duration-200"
                    >
                      Donate $1,000
                    </button>
                  </div>
                </div>
                
                {/* Statistics Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Sanitation Crisis Facts</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Heart className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">2.3 billion people worldwide lack basic sanitation facilities</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Heart className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Diarrheal diseases kill over 800 children under 5 every day</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Bath className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Proper sanitation can reduce diarrhea risk by up to 40%</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Shower className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Girls often drop out of school when they begin menstruating if schools lack proper facilities</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Testimonial Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <div className="italic text-gray-600 mb-4">
                      "Since the new toilets were built at our school, attendance has improved dramatically, 
                      especially for teenage girls. Before, many girls would skip school during their menstrual cycles 
                      because there was no privacy. Now they can attend school with dignity, and handwashing stations 
                      have helped reduce illness among all our students."
                    </div>
                    <div className="font-medium text-gray-800">— Amina T., School Principal, Katsina Region</div>
                  </div>
                </div>
                
                {/* Other Programs Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Other WASH Programs</h3>
                    <ul className="space-y-3">
                      {washPrograms.filter(program => program.id !== 'sanitation').map(program => (
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
const SanitationPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="sanitation">
        <SanitationPageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default SanitationPage;