"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Users, ArrowUp, Info } from 'lucide-react';
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
import { communityPrograms } from '@/data/communityPrograms';

// Add this interface for the modal props
interface WomenEmpowermentModalProps {
  onClose: () => void;
}

// Custom donation modal component for women empowerment
const WomenEmpowermentModal = ({ onClose }: WomenEmpowermentModalProps) => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  const [amount, setAmount] = useState('200');
  const [error, setError] = useState('');
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setError('');
  };

  const handleDonate = () => {
    const donationAmount = parseFloat(amount);
    
    if (!donationAmount || isNaN(donationAmount)) {
      setError('Please enter a valid amount');
      return;
    }
    
    setProgramName("Women Empowerment Initiatives");
    setDonationAmount(donationAmount);
    setCurrentModal('paymentFees');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Support Women Empowerment</h3>
        <p className="text-gray-600 mb-6">
          Your donation helps empower women through skills training, business startup support, and mentoring programs.
        </p>
        
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-4">One step at a time approach:</h4>
          
          <ol className="list-decimal pl-5 mb-6 text-sm">
            <li className="mb-2">Skill Development Training ($50)</li>
            <li className="mb-2">Business Startup Kit ($75)</li>
            <li className="mb-2">Market Access Support ($50)</li>
            <li className="mb-2">Mentorship Program ($25)</li>
          </ol>
          
          <div className="bg-gray-50 p-3 rounded-md mb-6">
            <p className="text-sm text-gray-700">
              <strong>Total Package:</strong> $200 provides comprehensive support to help one woman achieve economic independence.
            </p>
          </div>
        
          <label className="block text-gray-700 font-medium mb-2">
            Donation Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={amount}
              onChange={handleCustomAmountChange}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#09869a] focus:border-[#09869a] outline-none"
              placeholder="Enter amount"
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
            className="px-6 py-2 bg-[#09869a] hover:bg-[#09869a]/90 text-white rounded-lg"
          >
            Donate {amount ? `$${parseFloat(amount).toLocaleString()}` : 'Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

const WomenEmpowermentPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [empowermentModal, setEmpowermentModal] = useState(false);
  const { currentModal } = useDonation();
  
  const handleEmpowerNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEmpowermentModal(true);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {empowermentModal && <WomenEmpowermentModal onClose={() => setEmpowermentModal(false)} />}
      
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
              <Link href="/" className="hover:text-[#09869a]">Home</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs" className="hover:text-[#09869a]">Programs</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs/community" className="hover:text-[#09869a]">Community Resilience</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <span className="text-gray-900">Women Empowerment</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-56 md:h-64">
                    <Image 
                      src="/new/women-hero.jpg" 
                      alt="Women Empowerment" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Women Empowerment Initiatives</h1>
                    
                    <div className="prose max-w-none">
                      <p className="mb-4">
                        Our Women Empowerment program aims to create sustainable economic opportunities for women
                        through comprehensive support that includes skills training, business development, and mentorship.
                        The program is designed to help women overcome barriers to economic participation and achieve 
                        financial independence.
                      </p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Our Approach: One Step at a Time</h3>
                      
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-bold">Step 1: Skill Development Training</h4>
                          <p className="text-sm text-gray-600 mt-2">
                            Women receive practical skills training in areas such as tailoring, food processing, 
                            handicrafts, or digital literacy based on local market needs and their interests.
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-bold">Step 2: Business Startup Kit</h4>
                          <p className="text-sm text-gray-600 mt-2">
                            Participants receive essential tools, equipment, and materials needed to start 
                            their business ventures. This might include sewing machines, food processing equipment,
                            or other trade-specific tools.
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-bold">Step 3: Market Access Support</h4>
                          <p className="text-sm text-gray-600 mt-2">
                            We help women connect with markets and customers through networking opportunities,
                            marketing support, and linkages to established businesses and cooperatives.
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-bold">Step 4: Mentorship Program</h4>
                          <p className="text-sm text-gray-600 mt-2">
                            Ongoing mentorship and coaching ensure that women can overcome challenges and
                            continue to grow their businesses over time. This includes financial literacy and
                            business management skills.
                          </p>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Program Impact</h3>
                      
                      <p className="mb-4">
                        For just $200, you can provide comprehensive support to help a woman achieve economic independence.
                        This investment creates a ripple effect, as women typically reinvest 90% of their income in their
                        families and communities, improving education, nutrition, and health outcomes.
                      </p>
                      
                      <div className="bg-gray-50 p-4 rounded-lg my-6 border-l-4 border-[#09869a]">
                        <p className="text-sm italic">
                          "After completing the tailoring training and receiving my sewing machine, I started a small 
                          business from my home. Now I can pay for my children's education and contribute to household 
                          expenses. The mentorship program helped me learn how to manage my finances and grow my customer base."
                          — Fatima, Program Graduate
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <button
                        onClick={handleEmpowerNowClick}
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#09869a] border border-transparent rounded-md shadow-sm hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a]"
                      >
                        Empower Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar - 1 column */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl overflow-hidden shadow-md p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Program Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Program Cost</span>
                        <span className="text-sm font-medium text-[#09869a]">$200 per woman</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Duration</span>
                        <span className="text-sm font-medium text-[#09869a]">6 months</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Women Supported</span>
                        <span className="text-sm font-medium text-[#09869a]">350+</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Success Rate</span>
                        <span className="text-sm font-medium text-[#09869a]">85%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl overflow-hidden shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Related Programs</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/programs/community/livestock-rearing" className="text-[#09869a] hover:underline">
                        Livestock Rearing Projects
                      </Link>
                    </li>
                    <li>
                      <Link href="/programs/community/youth-capacity" className="text-[#09869a] hover:underline">
                        Building Young Capacity
                      </Link>
                    </li>
                    <li>
                      <Link href="/programs/education" className="text-[#09869a] hover:underline">
                        Education Programs
                      </Link>
                    </li>
                  </ul>
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

const WomenEmpowermentPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="women-empowerment">
        <WomenEmpowermentPageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default WomenEmpowermentPage;