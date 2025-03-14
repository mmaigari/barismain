"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Droplet, ArrowUp, Info } from 'lucide-react';
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
interface ArtesianWellDonationModalProps {
  onClose: () => void;
}

// Custom donation modal component for artesian wells
const ArtesianWellDonationModal = ({ onClose }: ArtesianWellDonationModalProps) => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  
  const predefinedAmounts = [4000, 5000, 6000];

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setError('');
  };
  
  const handleDonate = () => {
    const donationAmount = parseFloat(amount);
    
    if (!donationAmount || isNaN(donationAmount) || donationAmount < 500) {
      setError('Please enter a valid amount (minimum $500)');
      return;
    }
    
    setProgramName("Artesian Well");
    setDonationAmount(donationAmount);
    setCurrentModal('paymentFees');
    onClose();
  };
  
  const selectPredefinedAmount = (predefinedAmount: number) => {
    setAmount(predefinedAmount.toString());
    setError('');
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Donate for an Artesian Well</h3>
        <p className="text-gray-600 mb-6">
          Artesian wells are deep-drilled wells that access naturally pressurized underground water sources. 
          The cost varies based on depth, location, and local conditions, typically ranging from $4,000-$6,000.
        </p>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {predefinedAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => selectPredefinedAmount(amount)}
                className="px-4 py-2 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 rounded-md text-[#0088cc] font-medium"
              >
                ${amount.toLocaleString()}
              </button>
            ))}
          </div>
          
          <label className="block text-gray-700 font-medium mb-2">
            Custom Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={amount}
              onChange={handleCustomAmountChange}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc] focus:border-[#0088cc] outline-none"
              placeholder="Enter amount"
              min="500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        
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
            Donate {amount ? `$${parseFloat(amount).toLocaleString()}` : 'Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ArtesianWellPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [wellModal, setWellModal] = useState(false);
  const { currentModal } = useDonation();
  
  const handleDonateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWellModal(true);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {wellModal && <ArtesianWellDonationModal onClose={() => setWellModal(false)} />}
      
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
              <span className="text-gray-900">Artesian Well</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-56 md:h-64">
                    <Image 
                      src="/programs/artesian-well-hero.png" 
                      alt="Artesian Well" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Artesian Well Program</h1>
                    <p className="text-gray-600 mb-4">
                      Our Artesian Well program offers the most sophisticated and sustainable water 
                      solution for areas with special geological conditions. Unlike conventional wells that require 
                      pumping, artesian wells access naturally pressurized water sources that flow to the surface without 
                      external energy, creating a self-sustaining water supply system.
                    </p>
                    <p className="text-gray-600 mb-6">
                      These specialized wells can serve entire communities of 1,500+ people and provide 
                      exceptionally clean water filtered through layers of rock and soil. Artesian wells 
                      are an ideal solution for communities located near specific geological formations containing 
                      confined aquifers.
                    </p>
                    
                    <div className="bg-[#0088cc]/10 p-5 rounded-lg mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">Artesian Well Construction</h2>
                          <p className="text-gray-600">Full sponsorship of an artesian well system</p>
                        </div>
                        <div className="text-2xl font-bold text-[#0088cc]">$4,000 - $6,000</div>
                      </div>
                      <div className="flex items-center mt-2 mb-4 text-sm text-gray-600 bg-white/70 p-2 rounded">
                        <Info className="w-4 h-4 text-[#0088cc] mr-2" />
                        Costs vary based on depth and location. Our team can provide a specific quote after site assessment.
                      </div>
                      <button 
                        onClick={handleDonateClick}
                        className="mt-4 w-full py-3 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg transition"
                      >
                        Donate for an Artesian Well
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">What Makes Artesian Wells Special</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Natural Pressure System</h3>
                          <p className="text-gray-600 mb-4">
                            Artesian wells tap into confined aquifers where water is under pressure between layers of impermeable rock. 
                            When the well is drilled into this pressurized zone, water naturally rises to the surface without 
                            pumping, sometimes creating a fountain effect. This natural energy eliminates the need for 
                            mechanical pumps or electricity.
                          </p>
                          
                          <h3 className="font-semibold text-gray-800 mb-2">Exceptional Water Quality</h3>
                          <p className="text-gray-600">
                            Artesian water is often of superior quality, having been naturally filtered through 
                            multiple layers of sand, gravel, and rock over many years. This natural filtration process 
                            removes many contaminants and results in mineral-rich, clean water suitable for drinking 
                            without extensive treatment.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">Complex Construction Process</h3>
                          <p className="text-gray-600 mb-4">
                            Artesian wells require specialized geological surveys to identify suitable locations where confined 
                            aquifers exist. The drilling process is more complex, requiring deeper boreholes (often 
                            100+ meters) and special casing systems to maintain pressure and prevent contamination 
                            from surface water.
                          </p>
                          
                          <h3 className="font-semibold text-gray-800 mb-2">Advantages</h3>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>No pumping equipment required</li>
                            <li>Zero energy costs for operation</li>
                            <li>Superior water quality and taste</li>
                            <li>Higher flow rates than traditional wells</li>
                            <li>Minimal maintenance requirements</li>
                            <li>25+ year operational lifespan</li>
                            <li>More resistant to seasonal fluctuations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Impact of Your Donation</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">1,500+</div>
                          <div className="text-gray-600">People served per well</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">95%</div>
                          <div className="text-gray-600">Reduction in waterborne diseases</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-[#0088cc] mb-2">25+ yrs</div>
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
                            <h3 className="font-semibold text-gray-800">Geological Survey & Feasibility Study</h3>
                            <p className="text-gray-600">2-4 weeks</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            2
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Site Preparation & Equipment Mobilization</h3>
                            <p className="text-gray-600">1-2 weeks</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            3
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Deep Drilling & Aquifer Access</h3>
                            <p className="text-gray-600">2-3 weeks</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            4
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Well Casing & Development</h3>
                            <p className="text-gray-600">1-2 weeks</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            5
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Flow Control System Installation</h3>
                            <p className="text-gray-600">1 week</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            6
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Distribution Network Construction</h3>
                            <p className="text-gray-600">2-3 weeks</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center text-white font-bold">
                            7
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">Water Quality Testing & System Handover</h3>
                            <p className="text-gray-600">1 week</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Artesian Well Science</h2>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">How Artesian Pressure Works</h3>
                        <div className="relative h-48 md:h-64 mb-4">
                          <Image 
                            src="/programs/artesian-diagram.jpg" 
                            alt="Artesian Well Diagram" 
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="text-gray-600">
                          Artesian wells work on a simple but powerful principle. Water enters the ground at a high elevation 
                          (recharge area) and flows down through a porous layer (aquifer) that's sandwiched between two impermeable 
                          layers of rock or clay. As water accumulates in this confined space, pressure builds up. 
                          When we drill through the upper impermeable layer at a lower elevation than the recharge area, 
                          the pressurized water naturally rises toward the surface, sometimes with enough force to create 
                          a fountain without any pumping required.
                        </p>
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
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Sponsor an Artesian Well</h3>
                    <p className="text-gray-600 mb-6">
                      Your contribution will help fund a sophisticated artesian well system that provides 
                      clean, naturally-pressurized water to entire communities for generations to come.
                    </p>
                    <button 
                      onClick={handleDonateClick}
                      className="w-full py-3 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg transition duration-200"
                    >
                      Donate Now
                    </button>
                    <p className="text-sm text-gray-500 mt-3">
                      Artesian wells cost between $4,000-$6,000 based on depth and location.
                    </p>
                  </div>
                </div>
                
                {/* Site Selection Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Site Selection Criteria</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Presence of confined aquifers in the region</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <ArrowUp className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Appropriate hydraulic pressure gradient</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Suitable geological formations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <ArrowUp className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Adequate recharge areas at higher elevations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-[#0088cc]/10 p-1 rounded-full mr-2 mt-1">
                          <Droplet className="w-4 h-4 text-[#0088cc]" />
                        </span>
                        <span className="text-gray-600">Community size and water demand assessment</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Testimonial Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
                  <div className="p-6">
                    <div className="italic text-gray-600 mb-4">
                      "When the artesian well was completed, it was like witnessing a miracle. Water began flowing 
                      from the ground without any pumps or electricity. Our village had struggled with water scarcity 
                      for generations, and suddenly we had abundant, clean water flowing day and night. The taste is pure, 
                      and our children no longer suffer from the waterborne illnesses that once plagued our community."
                    </div>
                    <div className="font-medium text-gray-800">— Muhammed S., Village Elder, Kano State</div>
                  </div>
                </div>
                
                {/* Other Programs Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Other WASH Programs</h3>
                    <ul className="space-y-3">
                      {washPrograms.filter(program => program.id !== 'artesian-well').map(program => (
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
const ArtesianWellPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="artesian-well">
        <ArtesianWellPageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default ArtesianWellPage;