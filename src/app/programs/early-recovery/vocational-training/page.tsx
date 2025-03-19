"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, GraduationCap, Home, Briefcase, Wrench } from 'lucide-react';
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
const VocationalTrainingContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setProgramName("Vocational Training & Skills Development");
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
              <span className="text-[#09869a] font-medium">Vocational Training</span>
            </div>
            
            <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
              <div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center mb-4 lg:justify-start justify-center">
                    <div className="p-3 rounded-full bg-[#FF6F61]/10">
                      <GraduationCap className="w-8 h-8 text-[#FF6F61]" />
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold leading-tight text-[#09869a] sm:text-4xl sm:leading-tight lg:leading-tight lg:text-5xl font-montserrat">Vocational Training & Skills Development</h1>
                  <div className="w-24 h-1.5 bg-[#FA6418] rounded-full my-4 mx-auto lg:mx-0"></div>
                  
                  <p className="mt-2 text-lg text-gray-700 sm:mt-4">
                    Our Vocational Training & Skills Development program equips vulnerable individuals with practical, marketable skills for sustainable employment opportunities and economic independence.
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
                    src="/programs/vocational-training-hero.jpg" 
                    alt="Vocational Training & Skills Development" 
                    width={600} 
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[260px]">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-[#FF6F61]/10 rounded-full">
                      <Wrench className="w-5 h-5 text-[#FF6F61]" />
                    </div>
                    <h3 className="ml-3 font-semibold text-gray-900">Hands-On Learning</h3>
                  </div>
                  <p className="text-sm text-gray-600">Our practical approach ensures participants gain real-world applicable skills</p>
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
                    Our Vocational Training & Skills Development program aims to address unemployment and economic vulnerability by providing participants with practical, market-driven skills training. By focusing on both technical skills and essential soft skills, we prepare individuals for successful entry into the workforce or entrepreneurship.
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Program Objectives</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Provide high-quality technical and vocational skills training to vulnerable youth and adults</li>
                    <li>Increase employability and job placement rates among program graduates</li>
                    <li>Support the development of small businesses and entrepreneurship</li>
                    <li>Foster self-reliance and sustainable livelihoods for participants and their families</li>
                    <li>Address community needs through targeted skills development in high-demand sectors</li>
                  </ul>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Our Training Courses</h3>
                  <p className="mb-4">
                    We offer a diverse range of training courses based on local market demands and employment opportunities, including:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Construction & Trades</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Carpentry & Woodworking</li>
                        <li>Masonry & Bricklaying</li>
                        <li>Plumbing & Electrical</li>
                        <li>Welding & Metalwork</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">IT & Digital Skills</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Computer Literacy</li>
                        <li>Office Applications</li>
                        <li>Web Design Basics</li>
                        <li>Digital Marketing</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Textiles & Handicrafts</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Tailoring & Sewing</li>
                        <li>Embroidery & Textile Arts</li>
                        <li>Jewelry Making</li>
                        <li>Leather Working</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Food & Hospitality</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Culinary Arts</li>
                        <li>Food Processing</li>
                        <li>Baking & Pastry</li>
                        <li>Hospitality Services</li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Program Components</h3>
                  <ol className="list-decimal pl-5 mb-6 space-y-2">
                    <li><strong>Skills Assessment:</strong> Initial evaluation to match participants with appropriate training programs</li>
                    <li><strong>Technical Training:</strong> Hands-on instruction in specific vocational skills</li>
                    <li><strong>Business Skills:</strong> Training in entrepreneurship, financial literacy, and business management</li>
                    <li><strong>Life Skills:</strong> Development of essential soft skills including communication and problem-solving</li>
                    <li><strong>Mentorship:</strong> Guidance from industry professionals and successful entrepreneurs</li>
                    <li><strong>Job Placement Support:</strong> Assistance with finding employment opportunities or starting businesses</li>
                    <li><strong>Starter Kits:</strong> Provision of essential tools and equipment needed to begin working</li>
                  </ol>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Program Details</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-gray-500 text-sm">Duration:</span>
                      <span className="font-medium">3-6 months (course dependent)</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Location:</span>
                      <span className="font-medium">Multiple centers across regions</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Eligibility:</span>
                      <span className="font-medium">18+ years old, vulnerable populations</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Cost per Trainee:</span>
                      <span className="font-medium">$250 - $500 (varies by course)</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Includes:</span>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        <li>Skills training</li>
                        <li>Training materials</li>
                        <li>Certification</li>
                        <li>Starter toolkit</li>
                        <li>Job placement support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                
                {/* Support CTA */}
                <div className="bg-[#09869A] text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Support This Program</h3>
                  <p className="mb-6">Your donation can help someone acquire skills for a sustainable livelihood and break the cycle of poverty.</p>
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
              <Link href="/programs/early-recovery/social-services" className="group bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Social Services Assistance</h3>
                <p className="text-gray-600 mb-4">Providing essential social services to support individuals and families in need.</p>
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
const VocationalTrainingPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="vocational-training">
        <VocationalTrainingContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default VocationalTrainingPage;