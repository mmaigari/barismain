"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Network, Home, Building, Users } from 'lucide-react';
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
const NetworkingBusinessContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setProgramName("Networking & Business Support");
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
              <span className="text-[#09869a] font-medium">Networking & Business</span>
            </div>
            
            <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
              <div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center mb-4 lg:justify-start justify-center">
                    <div className="p-3 rounded-full bg-[#FF6F61]/10">
                      <Building className="w-8 h-8 text-[#FF6F61]" />
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold leading-tight text-[#09869a] sm:text-4xl sm:leading-tight lg:leading-tight lg:text-5xl font-montserrat">Networking & Business Support</h1>
                  <div className="w-24 h-1.5 bg-[#FA6418] rounded-full my-4 mx-auto lg:mx-0"></div>
                  
                  <p className="mt-2 text-lg text-gray-700 sm:mt-4">
                    Our Networking & Business Support program helps entrepreneurs build connections, access resources, and develop sustainable businesses that create jobs and drive economic growth.
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
                    src="/programs/networking-business-hero.jpg" 
                    alt="Networking & Business Support" 
                    width={600} 
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[260px]">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-[#FF6F61]/10 rounded-full">
                      <Network className="w-5 h-5 text-[#FF6F61]" />
                    </div>
                    <h3 className="ml-3 font-semibold text-gray-900">Business Connections</h3>
                  </div>
                  <p className="text-sm text-gray-600">We build networks that provide mentoring, resources, and market access</p>
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
                    Our Networking & Business Support program is designed to help entrepreneurs and small business owners develop sustainable enterprises that create jobs and contribute to economic recovery. Through a combination of business development services, networking opportunities, and resource access, we support both new and existing businesses to thrive in challenging environments.
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Program Objectives</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Support the development and growth of micro, small, and medium enterprises (MSMEs)</li>
                    <li>Create business networks and mentoring opportunities for entrepreneurs</li>
                    <li>Facilitate access to financial services and investment capital</li>
                    <li>Generate employment opportunities through business growth</li>
                    <li>Promote market linkages and value chain development</li>
                  </ul>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Our Services</h3>
                  <p className="mb-4">
                    We provide comprehensive business development support across several key areas:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Business Development</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Business plan development</li>
                        <li>Market research and analysis</li>
                        <li>Product development</li>
                        <li>Financial management</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Networking & Mentorship</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Business networking events</li>
                        <li>Mentor matching programs</li>
                        <li>Industry-specific peer groups</li>
                        <li>Business forums and conferences</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Resource Access</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Microfinance linkages</li>
                        <li>Startup grants and seed capital</li>
                        <li>Shared workspace facilities</li>
                        <li>Technology and equipment access</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Market Linkages</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Market access facilitation</li>
                        <li>Value chain integration</li>
                        <li>Exhibition and trade show support</li>
                        <li>E-commerce development</li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Our Approach</h3>
                  <ol className="list-decimal pl-5 mb-6 space-y-2">
                    <li><strong>Assessment:</strong> Evaluating business needs and market opportunities</li>
                    <li><strong>Planning:</strong> Developing tailored business development plans</li>
                    <li><strong>Skills Building:</strong> Providing training and capacity development</li>
                    <li><strong>Resource Mobilization:</strong> Facilitating access to financial and technical resources</li>
                    <li><strong>Networking:</strong> Creating connections and business relationship opportunities</li>
                    <li><strong>Market Access:</strong> Building linkages to markets and value chains</li>
                    <li><strong>Monitoring:</strong> Ongoing support and business performance tracking</li>
                  </ol>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Program Details</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-gray-500 text-sm">Program Duration:</span>
                      <span className="font-medium">6-12 months (business-dependent)</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Location:</span>
                      <span className="font-medium">Business hubs and community centers</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Eligibility:</span>
                      <span className="font-medium">Entrepreneurs and small business owners</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Average Support Cost:</span>
                      <span className="font-medium">$500 - $2,000 per business</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Support Includes:</span>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        <li>Business development services</li>
                        <li>Networking opportunities</li>
                        <li>Mentorship</li>
                        <li>Technical resources</li>
                        <li>Market access support</li>
                      </ul>
                    </div>
                  </div>
                </div>
                

                
                {/* Support CTA */}
                <div className="bg-[#09869A] text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Support This Program</h3>
                  <p className="mb-6">Your donation helps entrepreneurs build sustainable businesses that create jobs and drive economic recovery.</p>
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
              
              <Link href="/programs/early-recovery/cash-for-work" className="group bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Cash for Work (CFW) Program</h3>
                <p className="text-gray-600 mb-4">Creating temporary employment while rebuilding communities.</p>
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
const NetworkingBusinessPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="networking-business">
        <NetworkingBusinessContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default NetworkingBusinessPage;