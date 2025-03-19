"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Building2, Home, Building, Heart, Users, School } from 'lucide-react';
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
const BuildingMasjidsContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setProgramName("Building Masjids");
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
              <Link href="/programs/sadaka" className="hover:text-[#09869a]">Sadaka Jariya</Link>
              <ChevronRight className="w-3 h-3 mx-1" />
              <span className="text-[#09869a] font-medium">Building Masjids</span>
            </div>
            
            <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
              <div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center mb-4 lg:justify-start justify-center">
                    <div className="p-3 rounded-full bg-[#008080]/10">
                      <Building2 className="w-8 h-8 text-[#008080]" />
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold leading-tight text-[#09869a] sm:text-4xl sm:leading-tight lg:leading-tight lg:text-5xl font-montserrat">Building Masjids</h1>
                  <div className="w-24 h-1.5 bg-[#008080] rounded-full my-4 mx-auto lg:mx-0"></div>
                  
                  <p className="mt-2 text-lg text-gray-700 sm:mt-4">
                    Building a masjid is one of the most rewarding acts of Sadaka Jariya, creating a center for worship, education, and community development that benefits generations to come.
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <a 
                      href="#"
                      onClick={handleDonateClick}
                      className="inline-flex px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a]"
                    >
                      Build a Masjid
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center mt-10 gap-y-5 gap-x-12 lg:justify-start">
                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-[#09869a] sm:text-4xl">3+</p>
                    <p className="ml-3 text-sm text-gray-900">Masjids<br />Built</p>
                  </div>


                  
                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-[#09869a] sm:text-4xl">500+</p>
                    <p className="ml-3 text-sm text-gray-900">People<br />Benefited</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                  <Image 
                    src="/programs/masjid-hero.jpg" 
                    alt="Building Masjids" 
                    width={600} 
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[260px]">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-[#008080]/10 rounded-full">
                      <Heart className="w-5 h-5 text-[#008080]" />
                    </div>
                    <h3 className="ml-3 font-semibold text-gray-900">Continuous Reward</h3>
                  </div>
                  <p className="text-sm text-gray-600">Every prayer and act of worship performed in the masjid adds to your rewards</p>
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
                    Our Building Masjids program focuses on constructing places of worship in areas where communities lack proper facilities for prayer, education, and gatherings. These masjids become vibrant centers of spiritual growth, learning, and social development that serve multiple generations.
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Significance of Building a Masjid</h3>
                  <p className="mb-4">
                    The Prophet Muhammad (peace be upon him) said: "Whoever builds a mosque for Allah, Allah will build for him a similar house in Paradise." (Sahih Bukhari)
                  </p>
                  <p className="mb-4">
                    Building a masjid is one of the most virtuous forms of Sadaka Jariya (ongoing charity), as it continues to benefit people long after construction. Every prayer, Quran recitation, educational session, and community service that takes place within its walls adds to the reward of those who contributed to its establishment.
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Types of Masjids We Build</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Small Community Masjids</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Capacity: 100-200 worshippers</li>
                        <li>Prayer hall and basic facilities</li>
                        <li>Suitable for small rural villages</li>
                        <li>Starting from $15,000</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Medium-Sized Masjids</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Capacity: 200-500 worshippers</li>
                        <li>Prayer hall, washrooms, and classrooms</li>
                        <li>For larger villages and small towns</li>
                        <li>Starting from $30,000</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Large Central Masjids</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Capacity: 500+ worshippers</li>
                        <li>Full facilities including library and community hall</li>
                        <li>For towns and urban areas</li>
                        <li>Starting from $50,000</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Masjid Renovations</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Repair and upgrading of existing structures</li>
                        <li>Addition of essential facilities</li>
                        <li>For damaged or inadequate masjids</li>
                        <li>Starting from $5,000</li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">What Each Masjid Includes</h3>
                  <ol className="list-decimal pl-5 mb-6 space-y-2">
                    <li><strong>Prayer Hall:</strong> The main worship space with appropriate flooring, mihrab (prayer niche), and minbar (pulpit)</li>
                    <li><strong>Ablution Facilities:</strong> Clean water supply and washrooms for wudu (ritual washing)</li>
                    <li><strong>Educational Spaces:</strong> Areas for Quranic studies and community educational programs</li>
                    <li><strong>Women's Section:</strong> Dedicated space for female worshippers</li>
                    <li><strong>Community Areas:</strong> Spaces for social gatherings and community events</li>
                    <li><strong>Minaret:</strong> In larger masjids, a tower from which the call to prayer is made</li>
                  </ol>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Our Approach</h3>
                  <ol className="list-decimal pl-5 mb-6 space-y-2">
                    <li><strong>Community Consultation:</strong> Working with local communities to understand their specific needs</li>
                    <li><strong>Site Selection:</strong> Identifying appropriate and accessible locations</li>
                    <li><strong>Local Materials:</strong> Using locally available materials where possible to reduce costs and support local economies</li>
                    <li><strong>Local Labor:</strong> Employing local workers to boost the community economy</li>
                    <li><strong>Sustainability:</strong> Incorporating sustainable design elements like natural lighting and ventilation</li>
                    <li><strong>Long-term Support:</strong> Helping establish committees for ongoing maintenance and operation</li>
                  </ol>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Program Details</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-gray-500 text-sm">Construction Time:</span>
                      <span className="font-medium">6-12 months (size dependent)</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Location:</span>
                      <span className="font-medium">Northern Nigeria</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Project Cost:</span>
                      <span className="font-medium">$15,000 - $100,000+</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Naming Opportunity:</span>
                      <span className="font-medium">Name a masjid after a loved one</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Project Includes:</span>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        <li>All construction materials</li>
                        <li>Labor costs</li>
                        <li>Basic furnishings</li>
                        <li>Commemorative plaque</li>
                        <li>Progress updates and completion report</li>
                      </ul>
                    </div>
                  </div>
                </div>
    
                
                {/* Support CTA */}
                <div className="bg-[#09869A] text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Build a Masjid</h3>
                  <p className="mb-6">Your donation towards building a masjid will create a legacy of ongoing benefit for communities and continuous rewards for you.</p>
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
        

        {/* Other Sadaka Jariya Programs */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-[#09869a] mb-8">Other Sadaka Jariya Programs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/programs/sadaka/orphanages" className="group bg-white p-6 rounded-lg hover:shadow-md transition-shadow flex items-start">
                <div className="p-3 rounded-full bg-[#008080]/10 mr-4 mt-1">
                  <Users className="w-6 h-6 text-[#008080]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Establishing Orphanages</h3>
                  <p className="text-gray-600 mb-4">Provide shelter, care, and education for children who have lost their parents, offering them hope for a better future.</p>
                  <div className="flex items-center text-[#09869A] font-medium">
                    Learn more
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:ml-2 transition-all" />
                  </div>
                </div>
              </Link>
              
              <Link href="/programs/sadaka/schools" className="group bg-white p-6 rounded-lg hover:shadow-md transition-shadow flex items-start">
                <div className="p-3 rounded-full bg-[#008080]/10 mr-4 mt-1">
                  <School className="w-6 h-6 text-[#008080]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Building Schools</h3>
                  <p className="text-gray-600 mb-4">Support education that empowers children and communities to break the cycle of poverty and build sustainable futures.</p>
                  <div className="flex items-center text-[#09869A] font-medium">
                    Learn more
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:ml-2 transition-all" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-10 bg-[#09869a]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Build a Masjid Today</h2>
            <p className="text-xl text-white/90 mb-8">
              Your donation will help establish a center for worship, education, and community development that will benefit generations to come.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#"
                onClick={handleDonateClick}
                className="px-8 py-4 text-base font-semibold text-[#09869a] bg-white rounded-lg hover:bg-gray-100 transition-all"
              >
                Build a Masjid
              </a>
              <Link 
                href="/contact" 
                className="px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all"
              >
                Discuss a Custom Project
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Main component that wraps with context provider
const BuildingMasjidsPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="masjids">
        <BuildingMasjidsContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default BuildingMasjidsPage;