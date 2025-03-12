"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Droplet } from 'lucide-react';
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
import { washPrograms } from '@/data/washPrograms';

// Wrapper component to use the donation context
const WashProgramContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  // Handle program donation
  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setProgramName("Water, Sanitation & Hygiene Program");
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
      <section className="relative py-16 bg-gradient-to-r from-[#0088cc] to-[#006699] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/programs/wash-pattern.jpg" 
            alt="WASH Pattern Background" 
            fill
            className="object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-white/80 mb-4">
            <Link href="/" className="hover:text-white flex items-center">
              <Home className="w-3 h-3 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href="/programs" className="hover:text-white">
              Programs
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-white font-medium">WASH Program</span>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
              <Droplet className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-montserrat text-3xl md:text-4xl font-bold mb-2">
                Water, Sanitation & Hygiene Program
              </h1>
              <div className="w-24 h-1 bg-white rounded-full mb-4"></div>
              <p className="text-lg max-w-2xl text-white/90 mb-6">
                Our WASH program provides clean water solutions and sanitation facilities to 
                communities without access to safe water. We implement sustainable projects that 
                improve health outcomes and enhance quality of life.
              </p>
              
              {/* Donation and volunteer buttons */}
              <div className="mt-6">
                <a
                  href="#"
                  onClick={handleDonateClick}
                  className="px-8 py-4 text-base font-semibold text-[#0088cc] bg-white rounded-lg hover:bg-gray-100 transition-all mr-4"
                >
                  Donate to This Program
                </a>
                <Link
                  href="/volunteer?program=wash"
                  className="px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all"
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
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our WASH Initiatives</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {washPrograms.map((program) => (
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
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#0088cc]">
                        {program.title}
                      </h3>
                      {program.price && (
                        <span className="text-lg font-bold text-[#0088cc]">${program.price}</span>
                      )}
                    </div>
                    {program.description && (
                      <p className="text-gray-600 mb-4">{program.description}</p>
                    )}
                    <div className="mt-4">
                      <span className="inline-flex items-center text-[#0088cc] font-medium">
                        Learn more 
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Our Impact</h2>
            <p className="text-gray-600 mb-10 text-center max-w-3xl mx-auto">
              Through our WASH program, we've made significant progress in providing clean water and 
              sanitation facilities to communities in need.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-[#0088cc] mb-2">150+</div>
                <div className="text-gray-700">Wells Constructed</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-[#0088cc] mb-2">75,000+</div>
                <div className="text-gray-700">People with Water Access</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-[#0088cc] mb-2">48</div>
                <div className="text-gray-700">Sanitation Facilities</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-[#0088cc] mb-2">65%</div>
                <div className="text-gray-700">Decrease in Water-borne Illness</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 bg-[#0088cc]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Provide Clean Water Today</h2>
          <p className="text-xl text-white/90 mb-8">
            Your support helps us deliver clean water solutions to communities facing water scarcity.
            Together, we can improve health outcomes and transform lives.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#"
              onClick={handleDonateClick}
              className="px-8 py-4 text-base font-semibold text-[#0088cc] bg-white rounded-lg hover:bg-gray-100 transition-all"
            >
              Donate Now
            </a>
            <Link 
              href="/volunteer?program=wash" 
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
export default function WashProgramPage() {
  return (
    <PayPalProvider>
      <DonationProvider programId="wash">
        <WashProgramContent />
      </DonationProvider>
    </PayPalProvider>
  );
}