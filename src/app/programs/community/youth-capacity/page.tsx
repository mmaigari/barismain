"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, BookOpen, ArrowUp, Info } from 'lucide-react';
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
import PaystackProvider from '@/components/payment/PaystackProvider';
import { communityPrograms } from '@/data/communityPrograms';

// Add interface for modal props
interface YouthCapacityModalProps {
  onClose: () => void;
}

// Custom donation modal component for youth capacity building
const YouthCapacityModal = ({ onClose }: YouthCapacityModalProps) => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  const [amount, setAmount] = useState('100');
  const [error, setError] = useState('');
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setError('');
  };

  const predefinedAmounts = [50, 100, 250];

  const handleSelectAmount = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
    setError('');
  };

  const handleDonate = () => {
    const donationAmount = parseFloat(amount);
    
    if (!donationAmount || isNaN(donationAmount)) {
      setError('Please enter a valid amount');
      return;
    }
    
    setProgramName("Building Young Capacity");
    setDonationAmount(donationAmount);
    setCurrentModal('paymentFees');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Support Youth Capacity Building</h3>
        <p className="text-gray-600 mb-6">
          Your donation helps young people develop skills, access education, and create sustainable futures.
        </p>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select Amount
          </label>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {predefinedAmounts.map((predefinedAmount) => (
              <button
                key={predefinedAmount}
                onClick={() => handleSelectAmount(predefinedAmount)}
                className={`px-3 py-2 text-center border rounded-md transition-colors ${
                  amount === predefinedAmount.toString()
                    ? 'bg-[#09869a] text-white border-[#09869a]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                ${predefinedAmount}
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

const YouthCapacityPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [youthModal, setYouthModal] = useState(false);
  const { currentModal } = useDonation();
  
  const handleEmpowerNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setYouthModal(true);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {youthModal && <YouthCapacityModal onClose={() => setYouthModal(false)} />}
      
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
              <span className="text-gray-900">Youth Capacity</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-56 md:h-64">
                    <Image 
                      src="/new/capacity-hero.png" 
                      alt="Youth Capacity Building" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Building Young Capacity</h1>
                    
                    <div className="prose max-w-none">
                      <p className="mb-4">
                        Our Youth Capacity Building program aims to equip young people with the skills, knowledge, 
                        and resources they need to thrive in today's competitive world. We believe that investing 
                        in youth is investing in our collective future, creating a ripple effect of positive change 
                        throughout communities.
                      </p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Program Components</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-bold">Skills Training</h4>
                          <p className="text-sm text-gray-600 mt-2">
                            Provides practical vocational and technical skills training in high-demand fields such as 
                            digital technology, construction, hospitality, and agriculture.
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-bold">Educational Support</h4>
                          <p className="text-sm text-gray-600 mt-2">
                            Offers scholarships, tutoring, and educational resources to help young people continue 
                            their education and achieve academic success.
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-bold">Entrepreneurship Development</h4>
                          <p className="text-sm text-gray-600 mt-2">
                            Mentors young entrepreneurs and provides startup funds for youth-led businesses that 
                            address community needs while creating economic opportunities.
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-bold">Leadership & Life Skills</h4>
                          <p className="text-sm text-gray-600 mt-2">
                            Develops critical thinking, communication, teamwork, and other essential life skills 
                            through workshops, camps, and community service projects.
                          </p>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">How Your Donation Helps</h3>
                      
                      <ul className="list-disc pl-5 mb-6">
                        <li className="mb-2">$50 provides a month of vocational training for one youth</li>
                        <li className="mb-2">$100 funds a starter kit with tools and equipment for a trained youth</li>
                        <li className="mb-2">$250 sponsors a young entrepreneur's business startup</li>
                        <li>$500 funds a full scholarship for a year of education</li>
                      </ul>
                      
                      <div className="bg-gray-50 p-4 rounded-lg my-6 border-l-4 border-[#09869a]">
                        <p className="text-sm italic">
                          "The computer programming course changed my life. I now work remotely for a tech company 
                          while mentoring other youth in my community. What seemed impossible before is now my reality. 
                          I'm grateful for the opportunity and support I received." — Ibrahim, Program Graduate
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
          
                
                <div className="bg-white rounded-xl overflow-hidden shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Related Programs</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/programs/community/livestock-rearing" className="text-[#09869a] hover:underline">
                        Livestock Rearing Projects
                      </Link>
                    </li>
                    <li>
                      <Link href="/programs/community/women-empowerment" className="text-[#09869a] hover:underline">
                        Women Empowerment Initiatives
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

const YouthCapacityPage = () => {
  return (
    <PaystackProvider>
      <DonationProvider programId="youth-capacity">
        <YouthCapacityPageContent />
      </DonationProvider>
    </PaystackProvider>
  );
};

export default YouthCapacityPage;