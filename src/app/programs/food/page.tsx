"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Utensils } from 'lucide-react';
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
import PaystackProvider from '@/components/payment/PaystackProvider';
import { foodPrograms } from '@/data/foodPrograms';

// Wrapper component to use the donation context
const FoodProgramContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  // Handle program donation using the medical page pattern
  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setProgramName("Food Security Program");
    setCurrentModal('donationOptions');
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {/* Donation Flow Modals */}
      {currentModal === 'donationOptions' && <DonationOptionsModal />}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
      {/* Hero Section */}
      <section className="relative py-8 sm:py-16 bg-gradient-to-r from-[#008080] to-[#007070] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/programs/food-pattern.jpg" 
            alt="Food Pattern Background" 
            fill
            className="object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-xs sm:text-sm text-white/80 mb-4">
            <Link href="/" className="hover:text-white flex items-center">
              <Home className="w-3 h-3 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href="/programs" className="hover:text-white">
              Programs
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-white font-medium">Food Program</span>
          </div>
          
          <div className="flex flex-col xs:flex-row items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm mb-2 xs:mb-0">
              <Utensils className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h1 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Food Security Program
              </h1>
              <div className="w-20 sm:w-24 h-1 bg-white rounded-full mb-3 sm:mb-4"></div>
              <p className="text-sm sm:text-base md:text-lg max-w-2xl text-white/90 mb-4 sm:mb-6">
                Our Food Security Program provides essential nutrition to vulnerable 
                communities through hot meal distribution, food parcels, and specialized 
                services to combat hunger and malnutrition.
              </p>
              
              {/* Donation and volunteer buttons - stack on small screens */}
              <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row gap-3">
                <a
                  href="#"
                  onClick={handleDonateClick}
                  className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-[#008080] bg-white rounded-lg hover:bg-gray-100 transition-all text-center"
                >
                  Donate to This Program
                </a>
                <Link
                  href="/volunteer?program=food"
                  className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all text-center"
                >
                  Volunteer with Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Programs Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Food Security Initiatives</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodPrograms.map((program) => (
                <Link 
                  key={program.id} 
                  href={program.href}
                  className="group bg-gray-50 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg"
                >
                  <div className="h-48 relative overflow-hidden">
                    <Image 
                      src={program.imageSrc} 
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#008080]">
                      {program.title}
                    </h3>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="inline-flex items-center text-[#008080] font-medium">
                        Learn more 
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                      </span>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setProgramName(program.title);
                          setCurrentModal('donationOptions');
                        }}
                        className="px-3 py-1 text-sm font-medium text-white bg-[#008080] rounded hover:bg-[#006b6b] transition-colors"
                      >
                        Donate
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 bg-[#008080]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Make a Difference Today</h2>
          <p className="text-xl text-white/90 mb-8">
            Your support enables us to provide essential nutrition to those who need it most. 
            Together, we can combat hunger and build resilient communities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#"
              onClick={handleDonateClick}
              className="px-8 py-4 text-base font-semibold text-[#008080] bg-white rounded-lg hover:bg-gray-100 transition-all"
            >
              Donate Now
            </a>
            <Link 
              href="/volunteer?program=food" 
              className="px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all"
            >
              Volunteer with Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

// Main component wrapped with DonationProvider
export default function FoodProgramPage() {
  return (
    <PaystackProvider>
      <DonationProvider programId="food">
        <FoodProgramContent />
      </DonationProvider>
    </PaystackProvider>
  );
}