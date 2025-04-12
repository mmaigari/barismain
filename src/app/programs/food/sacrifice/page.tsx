"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home, Heart } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
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
import { sacrificePrograms } from '@/data/foodPrograms';

// Wrapper component to use the donation context
const SacrificePageContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  // Handle program donation
  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setProgramName("Sacrifice Program");
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
      <section className="relative py-16 bg-gradient-to-r from-[#008080] to-[#007070] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/new/qurbani-hero.jpg" 
            alt="Sacrifice Program Background" 
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
            <Link href="/programs/food" className="hover:text-white">
              Food
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-white font-medium">Sacrifice Program</span>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-montserrat text-3xl md:text-4xl font-bold mb-2">
                Sacrifice Program Services
              </h1>
              <div className="w-24 h-1 bg-white rounded-full mb-4"></div>
              <p className="text-lg max-w-2xl text-white/90 mb-6">
                Our Sacrifice Program fulfills important religious practices while providing 
                nutritious meat to those in need. Choose from our Qurbani, Aqeeqah, and Vows 
                services to combine spiritual obligations with charitable giving.
              </p>
              
              {/* Donation and volunteer buttons */}
              <div className="mt-6">
                <a
                  href="#"
                  onClick={handleDonateClick}
                  className="px-8 py-4 text-base font-semibold text-[#008080] bg-white rounded-lg hover:bg-gray-100 transition-all mr-4"
                >
                  Donate
                </a>
                <Link
                  href="/volunteer?program=sacrifice"
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
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Sacrifice Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sacrificePrograms.map((program) => (
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
                    <div className="mt-4">
                      <span className="inline-flex items-center text-[#008080] font-medium">
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

      {/* About Sacrifice Programs Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About Our Sacrifice Services</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What are Sacrifice Services?</h3>
              <p className="text-gray-600 mb-4">
                Our Sacrifice Services offer a way to fulfill important religious obligations 
                such as Qurbani, Aqeeqah, and Vows while providing essential nutrition to 
                vulnerable communities. Each sacrifice is performed according to proper Islamic 
                guidelines, and the meat is distributed to those in need.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Qurbani</h3>
                <p className="text-gray-600 mb-3">
                  Fulfill your Qurbani obligation during Eid al-Adha by sacrificing an animal 
                  and providing meat to those in need, following the tradition of Prophet Ibrahim.
                </p>
                <Link href="/programs/food/sacrifice/qurbani" className="text-[#008080] font-medium hover:underline">
                  Learn more →
                </Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Aqeeqah</h3>
                <p className="text-gray-600 mb-3">
                  Celebrate the birth of a child through the Islamic tradition of Aqeeqah, 
                  while helping provide nutritious meat to families facing food insecurity.
                </p>
                <Link href="/programs/food/sacrifice/aqeeqah" className="text-[#008080] font-medium hover:underline">
                  Learn more →
                </Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Vows</h3>
                <p className="text-gray-600 mb-3">
                  Fulfill religious vows and pledges (Nadhr/Nazar) that you've made to Allah, 
                  while supporting our mission to provide food to those in need.
                </p>
                <Link href="/programs/food/sacrifice/vows" className="text-[#008080] font-medium hover:underline">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 bg-[#008080]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Fulfill Your Religious Duties While Helping Others
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Your sacrifice provides nutritious meat to families in need, combining spiritual 
            obligations with humanitarian service.
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
              href="/volunteer?program=sacrifice" 
              className="px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all"
            >
              Volunteer with Us
            </Link>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
};

// Main component wrapped with DonationProvider
const SacrificePage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="sacrifice">
        <SacrificePageContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default SacrificePage;