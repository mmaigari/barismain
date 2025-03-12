"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Users, Home, Building, Heart } from 'lucide-react';
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
const EstablishingOrphanagesContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setProgramName("Establishing Orphanages");
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
              <span className="text-[#09869a] font-medium">Establishing Orphanages</span>
            </div>
            
            <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
              <div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center mb-4 lg:justify-start justify-center">
                    <div className="p-3 rounded-full bg-[#E878A2]/10">
                      <Users className="w-8 h-8 text-[#E878A2]" />
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold leading-tight text-[#09869a] sm:text-4xl sm:leading-tight lg:leading-tight lg:text-5xl font-montserrat">Establishing Orphanages</h1>
                  <div className="w-24 h-1.5 bg-[#E878A2] rounded-full my-4 mx-auto lg:mx-0"></div>
                  
                  <p className="mt-2 text-lg text-gray-700 sm:mt-4">
                    Your support helps establish orphanages that provide shelter, care, education, and emotional support to orphaned children, giving them hope and opportunities for a brighter future.
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <a 
                      href="#"
                      onClick={handleDonateClick}
                      className="inline-flex px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a]"
                    >
                      Support an Orphanage
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center mt-10 gap-y-5 gap-x-12 lg:justify-start">
                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-[#09869a] sm:text-4xl">18</p>
                    <p className="ml-3 text-sm text-gray-900">Orphanages<br />Established</p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-[#09869a] sm:text-4xl">1,450+</p>
                    <p className="ml-3 text-sm text-gray-900">Children<br />Supported</p>
                  </div>
                  
                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-[#09869a] sm:text-4xl">8</p>
                    <p className="ml-3 text-sm text-gray-900">Countries<br />Served</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                  <Image 
                    src="/programs/orphanage-hero.jpg" 
                    alt="Establishing Orphanages" 
                    width={600} 
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[260px]">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-[#E878A2]/10 rounded-full">
                      <Heart className="w-5 h-5 text-[#E878A2]" />
                    </div>
                    <h3 className="ml-3 font-semibold text-gray-900">Lifelong Impact</h3>
                  </div>
                  <p className="text-sm text-gray-600">Your support transforms lives and creates opportunities for vulnerable children</p>
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
                    Our Establishing Orphanages program focuses on creating safe, nurturing environments where orphaned children can grow, learn, and thrive. These orphanages provide more than just basic shelter—they become homes where children receive comprehensive care, education, emotional support, and opportunities to develop their full potential.
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Significance of Supporting Orphans</h3>
                  <p className="mb-4">
                    The Prophet Muhammad (peace be upon him) said: "I and the one who cares for an orphan will be together in Paradise like this," and he held his two fingers together to illustrate. (Sahih Bukhari)
                  </p>
                  <p className="mb-4">
                    Supporting orphans is highly emphasized in Islam and other faiths. When you contribute to establishing an orphanage, you help provide stability, care, and opportunities for children who have lost their parents. This form of Sadaka Jariya creates ongoing benefits as the facility continues to serve generations of children in need.
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Types of Orphanage Projects</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">New Orphanage Construction</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Complete facilities for 20-50 children</li>
                        <li>Dormitories, classrooms, dining areas</li>
                        <li>For communities with no existing facilities</li>
                        <li>Starting from $60,000</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Orphanage Expansion</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Adding capacity to existing facilities</li>
                        <li>Improving services and infrastructure</li>
                        <li>For growing orphanages with limited space</li>
                        <li>Starting from $25,000</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Specialized Facilities</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Educational wings, computer labs, libraries</li>
                        <li>Vocational training centers</li>
                        <li>For enhancing educational opportunities</li>
                        <li>Starting from $15,000</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Orphanage Renovation</h4>
                      <ul className="list-disc pl-5 text-sm">
                        <li>Upgrading existing buildings and facilities</li>
                        <li>Improving safety and living conditions</li>
                        <li>For aging or inadequate facilities</li>
                        <li>Starting from $10,000</li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">What Each Orphanage Includes</h3>
                  <ol className="list-decimal pl-5 mb-6 space-y-2">
                    <li><strong>Living Quarters:</strong> Safe, clean dormitories with proper beds and storage for personal belongings</li>
                    <li><strong>Educational Facilities:</strong> Classrooms and study areas equipped with necessary learning materials</li>
                    <li><strong>Dining and Kitchen:</strong> Hygienic food preparation and dining areas that can accommodate all residents</li>
                    <li><strong>Hygiene Facilities:</strong> Clean washrooms, showers, and laundry facilities</li>
                    <li><strong>Recreational Areas:</strong> Indoor and outdoor spaces for play, sports, and leisure activities</li>
                    <li><strong>Health Services:</strong> Basic medical facilities or access to healthcare</li>
                    <li><strong>Staff Quarters:</strong> Accommodation for caregivers and administrators</li>
                  </ol>
                  
                  <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Our Approach</h3>
                  <ol className="list-decimal pl-5 mb-6 space-y-2">
                    <li><strong>Community Integration:</strong> Ensuring orphanages are connected to and supported by local communities</li>
                    <li><strong>Family-Style Care:</strong> Creating small family units rather than institutional environments</li>
                    <li><strong>Education Focus:</strong> Prioritizing quality education and skill development for future self-sufficiency</li>
                    <li><strong>Emotional Support:</strong> Providing counseling and addressing the emotional needs of children</li>
                    <li><strong>Cultural Sensitivity:</strong> Respecting and nurturing children's cultural and religious identities</li>
                    <li><strong>Long-term Sustainability:</strong> Developing income-generating projects and local support networks</li>
                    <li><strong>Transition Programs:</strong> Supporting older children as they prepare for independent living</li>
                  </ol>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Program Details</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-gray-500 text-sm">Project Timeline:</span>
                      <span className="font-medium">9-18 months for construction</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Location:</span>
                      <span className="font-medium">Areas with high orphan populations</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Project Cost:</span>
                      <span className="font-medium">$10,000 - $100,000+</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Naming Opportunity:</span>
                      <span className="font-medium">Name an orphanage after a loved one</span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-sm">Project Includes:</span>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        <li>Construction/renovation costs</li>
                        <li>Basic furnishings and equipment</li>
                        <li>Initial operating expenses</li>
                        <li>Staff training</li>
                        <li>Progress updates and completion report</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Success Story */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Success Story</h3>
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src="/programs/orphanage-success-story.jpg"
                      alt="Orphanage success story"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="italic text-gray-600 mb-3">
                    "When I came to the orphanage at age 8, I was scared and alone. The staff became my family and gave me love, education, and hope. Today, I am a university graduate and work as a teacher, helping other children like me achieve their dreams."
                  </p>
                  <p className="text-sm font-medium text-gray-800">— Aisha M., Former Orphanage Resident</p>
                </div>
                
                {/* Support CTA */}
                <div className="bg-[#09869A] text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Support an Orphanage</h3>
                  <p className="mb-6">Your donation will help build and maintain a safe haven for orphaned children, providing them with care, education, and opportunities for a better future.</p>
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
        
        {/* Impact Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#09869a] mb-4">Program Impact</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Our orphanage program has transformed the lives of thousands of children by providing them with homes, care, and opportunities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-[#E878A2]/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Building className="w-8 h-8 text-[#E878A2]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">18</h3>
                <p className="text-gray-600">Orphanages built and supported since our founding</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-[#E878A2]/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-[#E878A2]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">1,450+</h3>
                <p className="text-gray-600">Orphaned children provided with care and education</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-[#E878A2]/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-[#E878A2]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">92%</h3>
                <p className="text-gray-600">Of children complete secondary education or vocational training</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Orphanage Project Gallery */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-[#09869a] mb-8 text-center">Our Orphanage Projects</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="relative h-48 overflow-hidden rounded-lg">
                <Image src="/programs/orphanage-project-1.jpg" alt="Orphanage project" fill className="object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="relative h-48 overflow-hidden rounded-lg">
                <Image src="/programs/orphanage-project-2.jpg" alt="Orphanage project" fill className="object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="relative h-48 overflow-hidden rounded-lg">
                <Image src="/programs/orphanage-project-3.jpg" alt="Orphanage project" fill className="object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="relative h-48 overflow-hidden rounded-lg">
                <Image src="/programs/orphanage-project-4.jpg" alt="Orphanage project" fill className="object-cover hover:scale-105 transition-transform" />
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
              
              <Link href="/programs/sadaka/schools" className="group bg-white p-6 rounded-lg hover:shadow-md transition-shadow flex items-start">
                <div className="p-3 rounded-full bg-[#008080]/10 mr-4 mt-1">
                  <Building className="w-6 h-6 text-[#008080]" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Help Build a Home for Orphaned Children</h2>
            <p className="text-xl text-white/90 mb-8">
              Your donation will help establish safe havens for orphaned children, providing them with care, education, and hope for a brighter future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#"
                onClick={handleDonateClick}
                className="px-8 py-4 text-base font-semibold text-[#09869a] bg-white rounded-lg hover:bg-gray-100 transition-all"
              >
                Support an Orphanage
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
const EstablishingOrphanagesPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="orphanages">
        <EstablishingOrphanagesContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default EstablishingOrphanagesPage;