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

const DignityPacksPageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  const handleDonateClick = () => {
    setProgramName("Dignity Packs Distribution");
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
            src="/images/programs/dignity-packs.jpg"
            alt="Dignity Packs Distribution"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Dignity Packs Distribution
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
              <span className="text-[#09869a] font-medium">Dignity Packs Distribution</span>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg">
                <p>
                  Our Dignity Packs program provides essential hygiene and care items to vulnerable 
                  populations, including the elderly, those experiencing homelessness, and families 
                  facing financial hardship.
                </p>
                
                <h2>What's in a Dignity Pack?</h2>
                <ul>
                  <li>Personal hygiene items</li>
                  <li>Sanitary products</li>
                  <li>Basic first aid supplies</li>
                  <li>Comfort items</li>
                  <li>Seasonal necessities</li>
                </ul>
                
                <p>
                  These packs not only address physical needs but also help restore dignity and 
                  self-respect to individuals facing difficult circumstances.
                </p>
                
                <div className="bg-[#09869a]/10 p-6 rounded-lg border border-[#09869a]/20 my-8 text-center">
                  <h3 className="text-[#09869a] font-semibold text-xl mb-4">Support Dignity Packs Distribution</h3>
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

const DignityPacksPage = () => {
  return (
    <DonationProvider>
      <DignityPacksPageContent />
    </DonationProvider>
  );
};

export default DignityPacksPage;