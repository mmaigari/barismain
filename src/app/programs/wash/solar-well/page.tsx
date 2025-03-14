"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Droplet, Sun } from 'lucide-react';
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

// Add interface for the modal props
interface SolarWellDonationModalProps {
  fixedCost: number;
  onClose: () => void;
}

// Donation modal component with proper type annotations
const SolarWellDonationModal = ({ fixedCost, onClose }: SolarWellDonationModalProps) => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  
  const handleDonate = () => {
    setProgramName("Solar Well");
    setDonationAmount(fixedCost);
    setCurrentModal('paymentFees');
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Donate a Solar Well</h3>
        <p className="text-gray-600 mb-6">
          Your donation of ${fixedCost} will fund the construction of a solar-powered well system, providing 
          sustainable water access to a large community. Each solar well can serve 1,000+ people with 
          clean water without requiring manual pumping.
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

const SolarWellPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [wellModal, setWellModal] = useState(false);
  const { currentModal } = useDonation();
  
  // Add type annotation to the event parameter
  const handleDonateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWellModal(true);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {wellModal && <SolarWellDonationModal fixedCost={3100} onClose={() => setWellModal(false)} />}
      
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
              <span className="text-gray-900">Solar Well</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-56 md:h-64">
                    <Image 
                      src="/programs/solar-well-hero.png" 
                      alt="Solar Well" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Solar Well Program</h1>
                    <p className="text-gray-600 mb-4">
                      Our Solar Well program provides a sustainable, modern water solution for larger communities 
                      without access to clean water or electricity. These systems combine solar power with efficient 
                      pumping technology to deliver water without manual effort, serving more people and providing 
                      higher water flow rates.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Each solar well can serve 1,000+ people, providing clean water for drinking, cooking, washing, 
                      irrigation, and other community needs. These systems transform communities by creating reliable 
                      water infrastructure that operates even in areas with no electrical grid connection.
                    </p>
                    
                    <div className="bg-[#0088cc]/10 p-5 rounded-lg mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">Solar Well Construction</h2>
                          <p className="text-gray-600">Full sponsorship of one community solar well system</p>
                        </div>
                        <div className="text-3xl font-bold text-[#0088cc]">$3,100</div>
                      </div>
                      <button 
                        onClick={handleDonateClick}
                        className="mt-4 w-full py-3 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg transition"
                      >
                        Sponsor a Solar Well
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">How Solar Wells Work</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">System Components</h3>
                          <p className="text-gray-600 mb-4">
                            A solar well system consists of solar panels, a controller, a submersible pump, 
                            water storage tanks, and distribution points. The solar panels convert sunlight into 
                            electricity, which powers the pump to draw water from underground and store it in tanks 
                            for community use.
                          </p>
                          
                          <h3 className="font-semibold text-gray-800 mb-2">Daily Operation</h3>
                          <p className="text-gray-600">
                            During daylight hours, the solar panels generate electricity to pump water into 
                            elevated storage tanks. The stored water is then available 24/7 through gravity-fed 
                            taps, ensuring continuous access even when the sun isn't shining.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Sustainability Features</h3>
                          <p className="text-gray-600 mb-4">
                            Our solar wells are designed for long-term operation with minimal maintenance. The systems 
                            have no fuel costs, few moving parts, and typically last 15-25 years. Components are selected 
                            for durability in harsh environments and resistance to corrosion and UV damage.
                          </p>
                          
                          <h3 className="font-semibold text-gray-800 mb-2">Advantages</h3>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>No manual pumping required</li>
                            <li>High water flow rates</li>
                            <li>Serves larger populations (1,000+ people)</li>
                            <li>Environmentally friendly renewable energy</li>
                            <li>Low operating costs</li>
                            <li>20+ year system lifespan</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Impact of Your Donation</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">1,000+</div>
                          <div className="text-gray-600">People served per well</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">90%</div>
                          <div className="text-gray-600">Reduction in waterborne diseases</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">20+ yrs</div>
                          <div className="text-gray-600">Average system lifespan</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Implementation Process</h2>
                      <div className="space-y-4">
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            1
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Site Assessment & Hydrogeological Survey</h3>
                            <p className="text-gray-600">2-3 weeks</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            2
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Borehole Drilling & Development</h3>
                            <p className="text-gray-600">2-3 weeks</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            3
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Solar System Installation</h3>
                            <p className="text-gray-600">1-2 weeks</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            4
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Water Storage & Distribution Construction</h3>
                            <p className="text-gray-600">2 weeks</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            5
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Water Quality Testing & System Commissioning</h3>
                            <p className="text-gray-600">1 week</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            6
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Community Training & Management Setup</h3>
                            <p className="text-gray-600">1-2 weeks</p>
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
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Sponsor a Solar Well</h3>
                    <p className="text-gray-600 mb-6">
                      Your contribution of $3,100 will provide a complete solar-powered water system for a large community, 
                      giving over 1,000 people access to clean, sustainable water for decades to come.
                    </p>
                    <button 
                      onClick={handleDonateClick}
                      className="w-full py-3 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg transition duration-200"
                    >
                      Donate $3,100
                    </button>
                  </div>
                </div>
                
                {/* Benefits Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Benefits of Solar Wells</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Sun className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Renewable energy with no fuel costs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Higher water output for larger communities</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">No manual pumping required</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Sun className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Functions in areas with no electrical grid</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Longer lifespan than manual pumps</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Testimonial Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <div className="italic text-gray-600 mb-4">
                      "The solar well has transformed our entire community. Before, we couldn't grow vegetables 
                      during the dry season, and many children were sick from drinking unclean water. Now we have 
                      clean water flowing all day without anyone having to pump. Our community garden is thriving, 
                      and the health of our children has improved dramatically."
                    </div>
                    <div className="font-medium text-gray-800">— Ibrahim K., Community Leader, Badarawa Village</div>
                  </div>
                </div>
                
                {/* Other Programs Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Other WASH Programs</h3>
                    <ul className="space-y-3">
                      {washPrograms.filter(program => program.id !== 'solar-well').map(program => (
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
const SolarWellPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="solar-well">
        <SolarWellPageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default SolarWellPage;