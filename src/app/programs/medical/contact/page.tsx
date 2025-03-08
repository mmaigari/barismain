"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { DonationProvider, useDonation } from '@/contexts/DonationContext';
import DonationOptionsModal from '@/components/donation/modals/DonationOptionsModal';
import PaymentFeesModal from '@/components/donation/modals/PaymentFeesModal';
import TeamSupportModal from '@/components/donation/modals/TeamSupportModal';
import SignInModal from '@/components/donation/modals/SignInModal';
import GuestContinueModal from '@/components/donation/modals/GuestContinueModal';
import PaymentMethodModal from '@/components/donation/modals/PaymentMethodModal';
import ConfirmationModal from '@/components/donation/modals/ConfirmationModal';
import PayPalProvider from '@/components/payment/PayPalProvider';

const HealthFacilitiesPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  const handleDonateClick = () => {
    setProgramName("Health Facilities Support");
    setCurrentModal('donationOptions');
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {currentModal === 'donationOptions' && <DonationOptionsModal />}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
      <div className="relative bg-gray-50 pt-20">
        <div className="relative w-full h-72 md:h-96">
          <Image 
            src="/images/programs/health-facilities.jpg"
            alt="Health Facilities Support"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Health Facilities Support
            </h1>
          </div>
        </div>

        <section className="relative py-8 sm:py-12 lg:py-16">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-[#09869a] flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link href="/programs" className="hover:text-[#09869a]">Programs</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link href="/programs/medical" className="hover:text-[#09869a]">Medical Program</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-[#09869a] font-medium">Health Facilities Support</span>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg">
                <p>
                  Our Health Facilities Support program helps improve healthcare infrastructure 
                  in underserved communities by providing essential equipment, supplies, and training 
                  to clinics and hospitals.
                </p>
                
                <h2>How We Support Health Facilities</h2>
                <ul>
                  <li>Providing medical equipment and supplies</li>
                  <li>Supporting facility renovations</li>
                  <li>Funding staff training and education</li>
                  <li>Implementing health information systems</li>
                  <li>Ensuring reliable water and power supply</li>
                </ul>
                
                <p>
                  By strengthening healthcare facilities, we help ensure that quality medical care 
                  is accessible to entire communities, improving health outcomes for thousands.
                </p>
                
                <div className="bg-[#09869a]/10 p-6 rounded-lg border border-[#09869a]/20 my-8 text-center">
                  <h3 className="text-[#09869a] font-semibold text-xl mb-4">Support Health Facilities</h3>
                  <button
                    onClick={handleDonateClick}
                    className="px-8 py-4 text-base font-semibold text-white bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 transition-all"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const HealthFacilitiesPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider>
        <HealthFacilitiesPageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default HealthFacilitiesPage;