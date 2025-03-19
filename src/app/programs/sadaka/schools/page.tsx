"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, School, Home, Building, BookOpen, Users } from 'lucide-react';
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
const BuildingSchoolsContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setProgramName("Building Schools");
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
              <span className="text-[#09869a] font-medium">Building Schools</span>
            </div>
            
            <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
              <div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center mb-4 lg:justify-start justify-center">
                    <div className="p-3 rounded-full bg-[#4CAF50]/10">
                      <School className="w-8 h-8 text-[#4CAF50]" />
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold leading-tight text-[#09869a] sm:text-4xl sm:leading-tight lg:leading-tight lg:text-5xl font-montserrat">Building Schools</h1>
                  <div className="w-24 h-1.5 bg-[#4CAF50] rounded-full my-4 mx-auto lg:mx-0"></div>
                  
                  <p className="mt-2 text-lg text-gray-700 sm:mt-4">
                    Help build schools that provide quality education to children in underserved communities, creating opportunities for generations to come and breaking the cycle of poverty.
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <a 
                      href="#"
                      onClick={handleDonateClick}
                      className="inline-flex px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a]"
                    >
                      Build a School
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center mt-10 gap-y-5 gap-x-12 lg:justify-start">
                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-[#09869a] sm:text-4xl">2</p>
                    <p className="ml-3 text-sm text-gray-900">Schools<br />Built</p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-[#09869a] sm:text-4xl">1,200+</p>
                    <p className="ml-3 text-sm text-gray-900">Students<br />Educated</p>
                  </div>
                  
              
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                  <Image 
                    src="/new/schools-hero.png" 
                    alt="Building Schools" 
                    width={600} 
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[260px]">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-[#4CAF50]/10 rounded-full">
                      <BookOpen className="w-5 h-5 text-[#4CAF50]" />
                    </div>
                    <h3 className="ml-3 font-semibold text-gray-900">Education for All</h3>
                  </div>
                  <p className="text-sm text-gray-600">Your support gives children access to education and opportunities for a better future</p>
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
                    Our Building Schools program focuses on establishing educational facilities in underserved communities where access to education is limited or non-existent. By building and supporting schools, we provide children with the opportunity to learn, grow, and develop the skills they need for a better future.
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Importance of Education as Sadaka Jariya</h3>
                  <p className="mb-4">
                    The Prophet Muhammad (peace be upon him) said: "When a person dies, their deeds end except for three: ongoing charity, knowledge that benefits others, or a righteous child who prays for them."
                  </p>
                  <p className="mb-4">
                    Building schools is a powerful form of Sadaka Jariya as it combines both ongoing charity and knowledge that benefits others. Each student who receives an education through these schools carries forward the impact of your donation, creating a continuous cycle of benefit that extends far beyond the initial contribution.
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Types of School Projects</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Primary Schools</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>For elementary education (grades 1-6)</li>
                        <li>Basic classrooms and essential facilities</li>
                        <li>Capacity for 150-300 students</li>
                        <li>Starting from $40,000</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Secondary Schools</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>For middle and high school education</li>
                        <li>Specialized classrooms and laboratories</li>
                        <li>Capacity for 200-400 students</li>
                        <li>Starting from $60,000</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Vocational Training Centers</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>For practical skills development</li>
                        <li>Specialized workshops and equipment</li>
                        <li>Training for various trades and professions</li>
                        <li>Starting from $35,000</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">School Renovation Projects</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Upgrading existing facilities</li>
                        <li>Expanding capacity of current schools</li>
                        <li>Improving safety and learning conditions</li>
                        <li>Starting from $15,000</li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">What Each School Includes</h3>
                  <ol className="list-decimal pl-5 mb-6 space-y-2">
                    <li><strong>Classrooms:</strong> Properly sized rooms with adequate seating, lighting, and ventilation</li>
                    <li><strong>Administrative Spaces:</strong> Offices for teachers and administrators</li>
                    <li><strong>Learning Resources:</strong> Basic educational materials, textbooks, and teaching aids</li>
                    <li><strong>Hygiene Facilities:</strong> Clean, accessible washrooms for students and staff</li>
                    <li><strong>Water Supply:</strong> Access to clean drinking water for all students</li>
                    <li><strong>Recreational Areas:</strong> Spaces for physical education and play</li>
                    <li><strong>Security Features:</strong> Appropriate measures to ensure student safety</li>
                  </ol>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Our Approach</h3>
                  <ol className="list-decimal pl-5 mb-6 space-y-2">
                    <li><strong>Community Engagement:</strong> Working with local communities to understand educational needs</li>
                    <li><strong>Sustainable Design:</strong> Using appropriate, environmentally friendly building materials</li>
                    <li><strong>Local Participation:</strong> Involving local labor and resources in construction</li>
                    <li><strong>Quality Education:</strong> Developing quality curricula and teacher training programs</li>
                    <li><strong>Ongoing Support:</strong> Providing continued assistance for school operations</li>
                    <li><strong>Community Ownership:</strong> Establishing local school management committees</li>
                    <li><strong>Monitoring and Evaluation:</strong> Regular assessment of educational outcomes and impacts</li>
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
                      <span className="font-medium">Areas with limited access to education</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Project Cost:</span>
                      <span className="font-medium">$15,000 - $100,000+</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Naming Opportunity:</span>
                      <span className="font-medium">Name a school or classroom after a loved one</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Project Includes:</span>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        <li>Construction materials and labor</li>
                        <li>Basic classroom furniture</li>
                        <li>Initial educational supplies</li>
                        <li>Teacher training support</li>
                        <li>Progress updates and completion report</li>
                      </ul>
                    </div>
                  </div>
                </div>
                

                {/* Support CTA */}
                <div className="bg-[#09869A] text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Build a School</h3>
                  <p className="mb-6">Your donation will help construct a school that provides education and hope for generations of children to come.</p>
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
              <Link href="/programs/sadaka/masjids" className="group bg-white p-6 rounded-lg hover:shadow-md transition-shadow flex items-start">
                <div className="p-3 rounded-full bg-[#008080]/10 mr-4 mt-1">
                  <Building className="w-6 h-6 text-[#008080]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Building Masjids</h3>
                  <p className="text-gray-600 mb-4">Create centers for worship, education, and community development that benefit generations to come.</p>
                  <div className="flex items-center text-[#09869A] font-medium">
                    Learn more
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:ml-2 transition-all" />
                  </div>
                </div>
              </Link>
              
              <Link href="/programs/sadaka/orphanages" className="group bg-white p-6 rounded-lg hover:shadow-md transition-shadow flex items-start">
                <div className="p-3 rounded-full bg-[#E878A2]/10 mr-4 mt-1">
                  <Users className="w-6 h-6 text-[#E878A2]" />
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
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-10 bg-[#09869a]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Build a School Today</h2>
            <p className="text-xl text-white/90 mb-8">
              Your donation will help establish educational facilities that empower children and communities through knowledge and opportunity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#"
                onClick={handleDonateClick}
                className="px-8 py-4 text-base font-semibold text-[#09869a] bg-white rounded-lg hover:bg-gray-100 transition-all"
              >
                Build a School
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
const BuildingSchoolsPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="schools">
        <BuildingSchoolsContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default BuildingSchoolsPage;