"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Leaf, Heart, HandHelping } from 'lucide-react';
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

// Define interface for card props
interface CommunityProgramCardProps {
  title: string;
  imageSrc: string;
  href: string;
  price?: number;
  description?: string;
}

// Program card component for the community programs
const CommunityProgramCard = ({ title, imageSrc, href, price, description }: CommunityProgramCardProps) => {
  // Get the donation context
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  
  const handleProgramDonate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Debug to verify function is being called
    console.log(`Donating to program: ${title}`);
    
    // Set up program-specific donation
    setProgramName(title);
    
    // If price is defined, set it as fixed donation amount
    if (price) {
      setDonationAmount(price);
      
      // Store donation details for the specific program
      localStorage.setItem("donationType", "fixed");
      localStorage.setItem("fixedAmount", price.toString());
      localStorage.setItem("programType", "community");
      localStorage.setItem("isRecurring", "false"); // One-time donation
      localStorage.setItem("programTitle", title);
      localStorage.setItem("programDescription", description || `Support our ${title} initiative`);
      
      // Skip options and go directly to payment fees
      setCurrentModal('paymentFees');
    } else {
      // No fixed price, show donation options
      localStorage.setItem("donationType", "custom");
      localStorage.setItem("programType", "community");
      localStorage.setItem("isRecurring", "false");
      localStorage.setItem("programTitle", title);
      localStorage.setItem("programDescription", description || `Support our ${title} initiative`);
      
      // Show donation options modal
      setCurrentModal('donationOptions');
    }
  };
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      {/* Keep the program card content wrapper separate from the Link */}
      <div>
        <Link href={href} className="block">
          <div className="relative h-48">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            {description && (
              <p className="text-gray-600 text-sm mb-3">{description}</p>
            )}
            {price && (
              <div className="text-[#09869a] font-bold">${price}</div>
            )}
          </div>
        </Link>
      </div>
      {/* Card footer with buttons */}
      <div className="px-4 pb-4 flex justify-between items-center">
        <Link href={href} className="text-sm text-[#09869a] hover:underline">
          Learn more
        </Link>
        {/* Make the button a separate element not nested in the Link */}
        <button
          onClick={handleProgramDonate}
          className="inline-block px-4 py-2 bg-[#09869a] text-white text-sm rounded-lg hover:bg-[#09869a]/90"
        >
          Donate
        </button>
      </div>
    </div>
  );
};

// Create a DonationOptionsModal component that was missing
const DonationOptionsModal = () => {
  const { setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  const [customAmount, setCustomAmount] = useState("");
  const programTitle = localStorage.getItem("programTitle") || "Community Donation";
  
  const predefinedAmounts = [10, 25, 50, 100];
  
  const handleClose = () => {
    setCurrentModal('');
  };
  
  const handleDonate = (amount: number) => {
    setDonationAmount(amount);
    localStorage.setItem("donationAmount", amount.toString());
    setCurrentModal('paymentFees');
  };
  
  const handleCustomDonate = () => {
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount > 0) {
      setDonationAmount(amount);
      localStorage.setItem("donationAmount", amount.toString());
      setCurrentModal('paymentFees');
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{programTitle}</h3>
        <p className="text-gray-600 mb-6">
          Select an amount to donate or enter a custom amount.
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {predefinedAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleDonate(amount)}
              className="px-6 py-3 border rounded-lg hover:bg-gray-50 font-medium"
            >
              ${amount}
            </button>
          ))}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Amount
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 border border-r-0 border-gray-300 rounded-l-md">
              $
            </span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              min="1"
              step="any"
              className="flex-1 p-2 border border-gray-300 rounded-r-md focus:ring-[#09869a] focus:border-[#09869a]"
              placeholder="Enter amount"
            />
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleCustomDonate}
            disabled={!customAmount || parseFloat(customAmount) <= 0}
            className={`px-6 py-2 bg-[#09869a] text-white rounded-lg ${
              !customAmount || parseFloat(customAmount) <= 0 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-[#09869a]/90'
            }`}
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

// Community program page content component
const CommunityProgramContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();

  const handleDonateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProgramName("Community Resilience Program");
    
    // Store donation details for general donation
    localStorage.setItem("donationType", "custom");
    localStorage.setItem("programType", "community");
    localStorage.setItem("isRecurring", "false"); // One-time donation
    localStorage.setItem("programTitle", "Community Resilience Program");
    localStorage.setItem("programDescription", "Support our community resilience and economic empowerment initiatives.");
    
    // Show donation options modal for amount selection
    setCurrentModal('donationOptions');
  };
  
  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {/* Render modals based on currentModal state */}
      {currentModal === 'donationOptions' && <DonationOptionsModal />}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
      <div className="relative bg-gray-50 pt-8">
        {/* Background SVG element */}
        <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0 opacity-[0.03] z-0">
          <svg 
            viewBox="0 0 322.8 322.72" 
            className="w-full h-full"
          >
            <g id="Layer_1-2" data-name="Layer_1">
              <g>
                <path fill="#09869a" d="M283.58,261.59l-79.44-78.37,22.96-21.09,.39,.39,78.63,77.61-22.54,21.46Zm-77.76-78.35l77.78,76.74,20.86-19.86-77.39-76.39-21.25,19.52Z"/>
                <path fill="#09869a" d="M105.83,187.73l-.55-.19L0,150.22l10.45-30.18,.55,.19,105.23,37.32-10.4,30.18ZM1.47,149.51l103.65,36.74,9.65-27.99L11.16,121.52,1.47,149.51Z"/>
              </g>
            </g>
          </svg>
        </div>

        {/* Page Content */}
        <section className="relative py-4 sm:py-6 lg:py-8">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-[#09869a]">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs" className="hover:text-[#09869a]">Programs</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <span className="text-gray-900">Community Resilience</span>
            </div>
            
            <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
                  Community Resilience & Economic Empowerment
                </h1>
                <p className="mt-4 text-lg text-gray-600 sm:mt-6">
                  Empowering communities to become self-sufficient through sustainable economic initiatives and skills development.
                </p>
                <div className="mt-6 sm:mt-8">
                  <button
                    onClick={handleDonateClick}
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#09869a] border border-transparent rounded-md shadow-sm hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a]"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="relative mx-auto overflow-hidden rounded-lg aspect-w-16 aspect-h-9 lg:max-w-md">
                  <Image
                    className="object-cover"
                    src="/programs/community.jpg"
                    alt="Community Resilience"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Programs Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#09869a]">Our Community Programs</h2>
              <p className="mt-4 text-lg text-gray-600">
                Building resilient communities through sustainable economic development initiatives.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communityPrograms.map((program) => (
                <CommunityProgramCard
                  key={program.id}
                  title={program.title}
                  imageSrc={program.imageSrc}
                  href={program.href}
                  price={program.price}
                  description={program.description}
                />
              ))}
            </div>
          </div>
        </section>



        {/* Call to Action */}
        <section className="py-10 bg-[#09869a]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Make a Difference Today</h2>
            <p className="text-xl text-white/90 mb-8">
              Your support enables us to empower communities through sustainable economic initiatives.
              Together, we can build resilient communities and create lasting change.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleDonateClick}
                className="px-6 py-3 bg-white text-[#09869a] font-medium rounded-md hover:bg-gray-100"
              >
                Donate Now
              </button>
              <Link 
                href="/contact"
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Toaster position="bottom-center" />
    </>
  );
};

// Main component that wraps with context provider
const CommunityProgramPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="community">
        <CommunityProgramContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default CommunityProgramPage;