"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { ChevronRight, Heart, Home } from 'lucide-react';
import { DonationProvider, useDonation } from '@/contexts/DonationContext';
import DonationOptionsModal from '@/components/donation/modals/DonationOptionsModal';
import PaymentFeesModal from '@/components/donation/modals/PaymentFeesModal';
import TeamSupportModal from '@/components/donation/modals/TeamSupportModal';
import SignInModal from '@/components/donation/modals/SignInModal';
import GuestContinueModal from '@/components/donation/modals/GuestContinueModal';
import PaymentMethodModal from '@/components/donation/modals/PaymentMethodModal';
import ConfirmationModal from '@/components/donation/modals/ConfirmationModal';
import PaystackProvider from '@/components/payment/PaystackProvider';
import { medicalPrograms } from '@/data/medicalPrograms';
import MedicalProgramCard from '@/components/programs/MedicalProgramCard';

// Wrap the existing content with the DonationFlow component
const MedicalProgramContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  const handleDonateClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setProgramName("Medical Program");
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
                {/* Include all the paths from your SVG */}
              </g>
            </g>
          </svg>
        </div>

        {/* Page Content */}
        <section className="relative py-4 sm:py-6 lg:py-8">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-[#09869a] flex items-center">
                <Home className="w-3 h-3 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs" className="hover:text-[#09869a]">Programs</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <span className="text-[#09869a] font-medium">Medical Program</span>
            </div>
            
            <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
              <div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center mb-4 lg:justify-start justify-center">
                    <div className="p-3 rounded-full bg-[#FF6F61]/10">
                      <Heart className="w-8 h-8 text-[#FF6F61]" />
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold leading-tight text-[#09869a] sm:text-4xl sm:leading-tight lg:leading-tight lg:text-5xl font-montserrat">Medical Care for Vulnerable Communities</h1>
                  <div className="w-24 h-1.5 bg-[#FA6418] rounded-full my-4 mx-auto lg:mx-0"></div>
                  
                  <p className="mt-2 text-lg text-gray-700 sm:mt-4">
                    Our Medical Program provides essential healthcare services to vulnerable communities facing limited access to medical care. 
                    From mobile clinics and emergency medical aid to specialized care and health education, we&apos;re committed to improving health outcomes and saving lives.
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <a 
                      href="#"
                      onClick={handleDonateClick}
                      className="inline-flex px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-[#e32613] rounded-lg hover:bg-[#e32613]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a]"
                    >
                      Donate
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center mt-10 gap-y-5 gap-x-12 lg:justify-start">
                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-[#09869a] sm:text-4xl">31</p>
                    <p className="ml-3 text-sm text-gray-900">Medical<br />Missions</p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-[#09869a] sm:text-4xl">2,810</p>
                    <p className="ml-3 text-sm text-gray-900">Beneficiaries</p>
                  </div>
                  
                
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                  <Image 
                    src="/programs/medical-hero.png" 
                    alt="Medical volunteers providing healthcare" 
                    width={600} 
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[260px]">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-[#FF6F61]/10 rounded-full">
                      <Heart className="w-5 h-5 text-[#FF6F61]" />
                    </div>
                    <h3 className="ml-3 font-semibold text-gray-900">Emergency Response</h3>
                  </div>
                  <p className="text-sm text-gray-600">Our medical teams respond within 48 hours to crisis situations worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Medical Programs Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#09869a] mb-4">Our Medical Programs</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Explore our specialized medical initiatives and find out how you can contribute
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {medicalPrograms.map((program) => (
                <MedicalProgramCard
                  key={program.id}
                  title={program.title}
                  imageSrc={program.imageSrc}
                  href={program.href}
                  fixedCost={program.fixedCost}
                />
              ))}
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-6 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#09869a] mb-6">What We Do</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="bg-[#FF6F61]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[#FF6F61]">01</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile Clinics</h3>
                <p className="text-gray-700">Bringing medical care to remote and underserved communities through fully equipped mobile clinics.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="bg-[#FF6F61]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[#FF6F61]">02</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Medical Relief</h3>
                <p className="text-gray-700">Providing rapid medical response during natural disasters, conflicts, and humanitarian crises.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="bg-[#FF6F61]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[#FF6F61]">03</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Health Education</h3>
                <p className="text-gray-700">Educating communities on disease prevention, hygiene practices, and maternal health.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="bg-[#FF6F61]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[#FF6F61]">04</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Supply Distribution</h3>
                <p className="text-gray-700">Delivering essential medications, equipment, and supplies to healthcare facilities in need.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="bg-[#FF6F61]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[#FF6F61]">05</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Specialist Care</h3>
                <p className="text-gray-700">Providing specialized medical services including surgeries, maternal care, and pediatric treatment.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="bg-[#FF6F61]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[#FF6F61]">06</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Healthcare Training</h3>
                <p className="text-gray-700">Training local healthcare workers to build sustainable medical capacity in communities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-10 bg-[#e32613]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Make a Difference Today</h2>
            <p className="text-xl text-white/90 mb-8">
              Your support enables us to provide life-saving medical care to those who need it most. 
              Together, we can improve health outcomes and build resilient communities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={handleDonateClick}
                className="px-8 py-4 text-base font-semibold text-[#09869a] bg-white rounded-lg hover:bg-gray-100 transition-all"
              >
                Donate Now
              </button>
              <Link 
                href="/contact" 
                className="px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Main component that wraps with context provider
const MedicalProgramPage = () => {
  return (
    <PaystackProvider>
      <DonationProvider programId="medical">
        <MedicalProgramContent />
      </DonationProvider>
    </PaystackProvider>
  );
};

export default MedicalProgramPage;