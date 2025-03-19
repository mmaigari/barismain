"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Banknote, Home, Building, Hammer } from 'lucide-react';
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

// Wrap the existing content with the DonationFlow component
const CashForWorkContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setProgramName("Cash for Work Program");
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
              <Link href="/" className="hover:text-[#09869a] flex items-center">
                <Home className="w-3 h-3 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs" className="hover:text-[#09869a]">Programs</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <Link href="/programs/early-recovery" className="hover:text-[#09869a]">Early Recovery</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <span className="text-[#09869a] font-medium">Cash for Work</span>
            </div>
            
            <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
              <div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center mb-4 lg:justify-start justify-center">
                    <div className="p-3 rounded-full bg-[#FF6F61]/10">
                      <Banknote className="w-8 h-8 text-[#FF6F61]" />
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold leading-tight text-[#09869a] sm:text-4xl sm:leading-tight lg:leading-tight lg:text-5xl font-montserrat">Cash for Work (CFW) Program</h1>
                  <div className="w-24 h-1.5 bg-[#FA6418] rounded-full my-4 mx-auto lg:mx-0"></div>
                  
                  <p className="mt-2 text-lg text-gray-700 sm:mt-4">
                    Our Cash for Work program creates temporary employment opportunities that help communities rebuild infrastructure while providing crucial income to those affected by crises.
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <a 
                      href="#"
                      onClick={handleDonateClick}
                      className="inline-flex px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a]"
                    >
                      Support This Program
                    </a>
                  </div>
                </div>


              </div>

              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                  <Image 
                    src="/programs/cash-for-work-hero.jpg" 
                    alt="Cash for Work Program" 
                    width={600} 
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[260px]">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-[#FF6F61]/10 rounded-full">
                      <Hammer className="w-5 h-5 text-[#FF6F61]" />
                    </div>
                    <h3 className="ml-3 font-semibold text-gray-900">Dual Impact</h3>
                  </div>
                  <p className="text-sm text-gray-600">Providing income while rebuilding essential community infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Program Details Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-[#09869a] mb-6">About the Program</h2>
                
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    The Cash for Work (CFW) program is a key component of our early recovery strategy, designed to provide temporary employment to crisis-affected populations while rehabilitating essential community infrastructure and services. This dual-impact approach addresses immediate income needs while contributing to long-term community recovery and resilience.
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Program Objectives</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Provide temporary employment and income to vulnerable households</li>
                    <li>Rehabilitate and rebuild essential community infrastructure</li>
                    <li>Restore basic services in crisis-affected communities</li>
                    <li>Stimulate local economies through cash injections</li>
                    <li>Build skills that can lead to longer-term employment opportunities</li>
                  </ul>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Project Types</h3>
                  <p className="mb-4">
                    Our Cash for Work program encompasses a variety of community infrastructure and service projects:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Infrastructure Rehabilitation</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Road repair and maintenance</li>
                        <li>Small bridge construction</li>
                        <li>Community building rehabilitation</li>
                        <li>Irrigation canal cleaning and repair</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Water & Sanitation</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Water point construction</li>
                        <li>Drainage system cleaning</li>
                        <li>Public latrine construction</li>
                        <li>Solid waste management</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Agricultural Activities</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Land terracing and preparation</li>
                        <li>Reforestation projects</li>
                        <li>Community garden development</li>
                        <li>Soil conservation measures</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Community Services</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Public space cleaning and beautification</li>
                        <li>School and health facility cleaning</li>
                        <li>Community center maintenance</li>
                        <li>Disaster risk reduction activities</li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Our Approach</h3>
                  <ol className="list-decimal pl-5 mb-6 space-y-2">
                    <li><strong>Community Consultation:</strong> Identifying priority needs and potential projects with local communities</li>
                    <li><strong>Worker Selection:</strong> Prioritizing the most vulnerable households for employment opportunities</li>
                    <li><strong>Project Implementation:</strong> Providing technical guidance, tools, and supervision for quality work</li>
                    <li><strong>Cash Distribution:</strong> Ensuring secure, timely, and transparent payment to workers</li>
                    <li><strong>Skills Training:</strong> Incorporating relevant skills development into project activities</li>
                    <li><strong>Transition Support:</strong> Helping workers connect with longer-term livelihood opportunities</li>
                  </ol>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Program Details</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-gray-500 text-sm">Project Duration:</span>
                      <span className="font-medium">Typically 1-3 months per project</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Work Schedule:</span>
                      <span className="font-medium">Part-time (4-6 hours/day, 3-5 days/week)</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Eligibility:</span>
                      <span className="font-medium">Adults from vulnerable, crisis-affected households</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Payment Rate:</span>
                      <span className="font-medium">$5-10 per day (set to local market rates)</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Program Includes:</span>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        <li>Daily wage payments</li>
                        <li>Basic tools and equipment</li>
                        <li>Safety training and gear</li>
                        <li>Technical supervision</li>
                        <li>Skills development</li>
                      </ul>
                    </div>
                  </div>
                </div>
                

                
                {/* Support CTA */}
                <div className="bg-[#09869A] text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Support This Program</h3>
                  <p className="mb-6">Your donation helps create temporary employment opportunities while rebuilding vital community infrastructure.</p>
                  <a 
                    href="#"
                    onClick={handleDonateClick}
                    className="block w-full text-center bg-white text-[#09869A] hover:bg-gray-100 py-3 px-4 rounded-md font-medium transition-colors"
                  >
                    Donate Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        

        {/* Other Early Recovery Programs */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-[#09869a] mb-8">Other Early Recovery Programs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/programs/early-recovery/vocational-training" className="group bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Vocational Training & Skills Development</h3>
                <p className="text-gray-600 mb-4">Empowering individuals with practical skills for sustainable employment.</p>
                <div className="flex items-center text-[#09869A] font-medium">
                  Learn more
                  <ChevronRight className="ml-1 w-4 h-4 group-hover:ml-2 transition-all" />
                </div>
              </Link>
              
              <Link href="/programs/early-recovery/social-services" className="group bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Social Services Assistance</h3>
                <p className="text-gray-600 mb-4">Providing essential support services to vulnerable individuals and families.</p>
                <div className="flex items-center text-[#09869A] font-medium">
                  Learn more
                  <ChevronRight className="ml-1 w-4 h-4 group-hover:ml-2 transition-all" />
                </div>
              </Link>
              
              <Link href="/programs/early-recovery/networking-business" className="group bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Networking & Business Support</h3>
                <p className="text-gray-600 mb-4">Helping entrepreneurs build connections and grow their businesses.</p>
                <div className="flex items-center text-[#09869A] font-medium">
                  Learn more
                  <ChevronRight className="ml-1 w-4 h-4 group-hover:ml-2 transition-all" />
                </div>
              </Link>
            </div>
          </div>
        </section>
        
      </div>
    </>
  );
};

// Main component that wraps with context provider
const CashForWorkPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="cash-for-work">
        <CashForWorkContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default CashForWorkPage;