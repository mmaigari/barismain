"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Leaf, ArrowUp, Info } from 'lucide-react';
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

// Add this interface above your component
interface LivestockDonationModalProps {
  onClose: () => void;
}

// Add this interface for livestock types
interface LivestockType {
  id: string;
  name: string;
  price: number;
}

// Custom donation modal component for livestock
const LivestockDonationModal = ({ onClose }: LivestockDonationModalProps) => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  const [selectedType, setSelectedType] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const livestockTypes: LivestockType[] = [
    { id: 'goat', name: 'Goat', price: 60 },
    { id: 'sheep', name: 'Sheep', price: 80 },
    { id: 'cow', name: 'Cow', price: 300 }
  ];

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setError('');
  };

  const handleTypeSelect = (type: LivestockType) => {
    setSelectedType(type.id);
    setAmount(type.price.toString());
    setError('');
  };

  const handleDonate = () => {
    const donationAmount = parseFloat(amount);
    
    if (!selectedType) {
      setError('Please select a livestock type');
      return;
    }
    
    if (!donationAmount || isNaN(donationAmount)) {
      setError('Please enter a valid amount');
      return;
    }
    
    const typeInfo = livestockTypes.find(type => type.id === selectedType);
    setProgramName(`Livestock (${typeInfo?.name || 'General'})`);
    setDonationAmount(donationAmount);
    setCurrentModal('paymentFees');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Support Livestock Rearing</h3>
        <p className="text-gray-600 mb-6">
          Your donation provides livestock to families, helping them generate sustainable income and improve nutrition.
        </p>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select Livestock Type
          </label>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {livestockTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type)}
                className={`px-3 py-2 text-center border rounded-md transition-colors ${
                  selectedType === type.id
                    ? 'bg-[#09869a] text-white border-[#09869a]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{type.name}</div>
                <div className={selectedType === type.id ? 'text-white' : 'text-[#09869a]'}>
                  ${type.price}
                </div>
              </button>
            ))}
          </div>

          <label className="block text-gray-700 font-medium mb-2">
            Custom Amount (Optional)
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

const LivestockRearingPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const [livestockModal, setLivestockModal] = useState(false);
  const { currentModal } = useDonation();
  
  const handleEmpowerNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLivestockModal(true);
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {livestockModal && <LivestockDonationModal onClose={() => setLivestockModal(false)} />}
      
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
              <span className="text-gray-900">Livestock Rearing</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="relative h-56 md:h-64">
                    <Image 
                      src="/new/livestock-hero.png" 
                      alt="Livestock Rearing" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Livestock Rearing Projects</h1>
                    
                    <div className="prose max-w-none">
                      <p className="mb-4">
                        Our Livestock Rearing project aims to create sustainable livelihoods for families through 
                        the provision of livestock such as goats, sheep, and cows. The program is designed to empower 
                        beneficiaries with the resources needed to generate income, improve nutrition, and build 
                        resilience against economic hardships.
                      </p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Available Livestock Options</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-bold">Goats</h4>
                          <p className="text-[#09869a] font-bold">$60 per goat</p>
                          <p className="text-sm text-gray-600 mt-2">
                            Goats provide milk, meat, and offspring that can be sold for income.
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-bold">Sheep</h4>
                          <p className="text-[#09869a] font-bold">$80 per sheep</p>
                          <p className="text-sm text-gray-600 mt-2">
                            Sheep provide wool, meat, and are valuable assets for sustainable farming.
                          </p>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-bold">Cows</h4>
                          <p className="text-[#09869a] font-bold">$300 per cow</p>
                          <p className="text-sm text-gray-600 mt-2">
                            Cows provide milk, calves, and significantly boost a family's economic status.
                          </p>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">How It Works</h3>
                      <ol className="list-decimal pl-5 mb-6">
                        <li className="mb-2">We identify families in need who have the capacity to care for livestock.</li>
                        <li className="mb-2">Your donation funds the purchase of livestock and initial veterinary care.</li>
                        <li className="mb-2">Families receive training on proper animal husbandry techniques.</li>
                        <li className="mb-2">Beneficiaries commit to passing on the first female offspring to another family.</li>
                        <li>This creates a sustainable cycle of community empowerment.</li>
                      </ol>
                      
                      <div className="bg-gray-50 p-4 rounded-lg my-6 border-l-4 border-[#09869a]">
                        <p className="text-sm italic">
                          "The goat I received has already given birth twice. I sold one kid to pay for my children's school 
                          fees and gave the other to my neighbor as part of the program. The milk has improved my family's nutrition, 
                          and I'm saving to buy a second goat." — Amina, Program Beneficiary
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
                      <Link href="/programs/community/women-empowerment" className="text-[#09869a] hover:underline">
                        Women Empowerment Initiatives
                      </Link>
                    </li>
                    <li>
                      <Link href="/programs/community/youth-capacity" className="text-[#09869a] hover:underline">
                        Building Young Capacity
                      </Link>
                    </li>
                    <li>
                      <Link href="/programs/wash" className="text-[#09869a] hover:underline">
                        Water, Sanitation & Hygiene
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

const LivestockRearingPage = () => {
  return (
    <PaystackProvider>
      <DonationProvider programId="livestock-rearing">
        <LivestockRearingPageContent />
      </DonationProvider>
    </PaystackProvider>
  );
};

export default LivestockRearingPage;