"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { ChevronRight, Building, Home, School, Users, Building2 } from 'lucide-react';
import { DonationProvider, useDonation } from '@/contexts/DonationContext';
import DonationOptionsModal from '@/components/donation/modals/DonationOptionsModal';
import PaymentFeesModal from '@/components/donation/modals/PaymentFeesModal';
import TeamSupportModal from '@/components/donation/modals/TeamSupportModal';
import SignInModal from '@/components/donation/modals/SignInModal';
import GuestContinueModal from '@/components/donation/modals/GuestContinueModal';
import PaymentMethodModal from '@/components/donation/modals/PaymentMethodModal';
import ConfirmationModal from '@/components/donation/modals/ConfirmationModal';
import PayPalProvider from '@/components/payment/PayPalProvider';
import MedicalProgramCard from '@/components/programs/MedicalProgramCard';

// Wrap the existing content with the DonationFlow component
const SadakaJariyaContent = () => {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName } = useDonation();
  
  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setProgramName("Sadaka Jariya");
    setCurrentModal('donationOptions');
  };

  // Define the Sadaka Jariya subprograms
  const sadakaPrograms = [
    {
      id: "masjids",
      title: "Building Masjids",
      imageSrc: "/programs/masjids.jpg",
      href: "/programs/sadaka/masjids"
    },
    {
      id: "orphanages",
      title: "Establishing Orphanages",
      imageSrc: "/programs/orphanages.jpg",
      href: "/programs/sadaka/orphanages"
    },
    {
      id: "schools",
      title: "Building Schools",
      imageSrc: "/programs/schools.jpg",
      href: "/programs/sadaka/schools"
    }
  ];
  
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
              <span className="text-[#09869a] font-medium">Sadaka Jariya</span>
            </div>
            
            <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
              <div>
                <div className="text-center lg:text-left">
                  <div className="flex items-center mb-4 lg:justify-start justify-center">
                    <div className="p-3 rounded-full bg-[#008080]/10">
                      <Building2 className="w-8 h-8 text-[#008080]" />
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold leading-tight text-[#09869a] sm:text-4xl sm:leading-tight lg:leading-tight lg:text-5xl font-montserrat">Sadaka Jariya (Ongoing Charity)</h1>
                  <div className="w-24 h-1.5 bg-[#008080] rounded-full my-4 mx-auto lg:mx-0"></div>
                  
                  <p className="mt-2 text-lg text-gray-700 sm:mt-4">
                    Sadaka Jariya projects create long-lasting benefits that continue to help communities for years to come, providing ongoing blessings for the donors and sustained support for beneficiaries.
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <a 
                      href="#"
                      onClick={handleDonateClick}
                      className="inline-flex px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-[#09869a] rounded-lg hover:bg-[#09869a]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09869a]"
                    >
                      Donate to This Program
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center mt-10 gap-y-5 gap-x-12 lg:justify-start">
                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-[#09869a] sm:text-4xl">65+</p>
                    <p className="ml-3 text-sm text-gray-900">Masjids<br />Built</p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-[#09869a] sm:text-4xl">32</p>
                    <p className="ml-3 text-sm text-gray-900">Schools<br />Established</p>
                  </div>
                  
                  <div className="flex items-center">
                    <p className="text-3xl font-medium text-[#09869a] sm:text-4xl">18</p>
                    <p className="ml-3 text-sm text-gray-900">Orphanages<br />Founded</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                  <Image 
                    src="/programs/sadaka-hero.jpg" 
                    alt="Sadaka Jariya projects" 
                    width={600} 
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[260px]">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-[#008080]/10 rounded-full">
                      <Building2 className="w-5 h-5 text-[#008080]" />
                    </div>
                    <h3 className="ml-3 font-semibold text-gray-900">Ongoing Impact</h3>
                  </div>
                  <p className="text-sm text-gray-600">Your contribution creates a legacy of continuous benefit for communities in need</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sadaka Programs Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#09869a] mb-4">Our Sadaka Jariya Projects</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Support projects that provide continuous benefits to communities for generations to come
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sadakaPrograms.map((program) => (
                <MedicalProgramCard
                  key={program.id}
                  title={program.title}
                  imageSrc={program.imageSrc}
                  href={program.href}
                />
              ))}
            </div>
          </div>
        </section>

        {/* What Is Sadaka Jariya Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#09869a] mb-4">What Is Sadaka Jariya?</h2>
                <div className="prose max-w-none">
                  <p className="mb-4 text-gray-700">
                    Sadaka Jariya, or "ongoing charity," refers to charitable actions that continue to benefit people and communities long after they are initiated. These projects create sustainable solutions that provide continuous support and blessings.
                  </p>
                  <p className="mb-4 text-gray-700">
                    When you contribute to a Sadaka Jariya project, your single donation turns into a source of ongoing reward, as the benefits continue to flow to those in need for years or even generations.
                  </p>
                  <p className="text-gray-700">
                    The Prophet Muhammad (peace be upon him) said: "When a person dies, their deeds come to an end except for three: ongoing charity (Sadaqah Jariyah), knowledge that is benefited from, or a righteous child who prays for them."
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative h-[320px] overflow-hidden rounded-lg shadow-lg">
                  <Image 
                    src="/programs/sadaka-concept.jpg" 
                    alt="Sadaka Jariya concept"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-[#09869a] mb-10">Benefits of Sadaka Jariya</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-[#008080]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Building className="w-8 h-8 text-[#008080]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Continuous Reward</h3>
                <p className="text-gray-700">
                  Your single donation continues to generate spiritual rewards as long as people benefit from the project, even after your lifetime.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-[#008080]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-[#008080]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Community Development</h3>
                <p className="text-gray-700">
                  Creates lasting infrastructure and services that help communities develop and prosper for generations to come.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-[#008080]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <School className="w-8 h-8 text-[#008080]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Sustainable Impact</h3>
                <p className="text-gray-700">
                  Addresses root causes of poverty and hardship through sustainable solutions rather than temporary relief.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Sadaka Jariya Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#09869a] mb-4">Types of Sadaka Jariya Projects</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                There are many ways to establish Sadaka Jariya. Here are some of the key projects we focus on:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-[#008080]/10">
                    <Building2 className="w-8 h-8 text-[#008080]" />
                  </div>
                  <h3 className="ml-3 text-xl font-bold text-gray-800">Building Masjids</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Masjids serve as centers of worship, education, and community gathering. They provide a place for daily prayers, Quranic studies, and community events.
                </p>
                <Link href="/programs/sadaka/masjids" className="text-[#09869a] font-medium hover:underline flex items-center">
                  Learn more
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-[#008080]/10">
                    <Users className="w-8 h-8 text-[#008080]" />
                  </div>
                  <h3 className="ml-3 text-xl font-bold text-gray-800">Establishing Orphanages</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Orphanages provide shelter, care, education, and support for children who have lost their parents, offering them hope for a better future.
                </p>
                <Link href="/programs/sadaka/orphanages" className="text-[#09869a] font-medium hover:underline flex items-center">
                  Learn more
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-[#008080]/10">
                    <School className="w-8 h-8 text-[#008080]" />
                  </div>
                  <h3 className="ml-3 text-xl font-bold text-gray-800">Building Schools</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Schools provide education that empowers children and communities to break the cycle of poverty and build sustainable futures.
                </p>
                <Link href="/programs/sadaka/schools" className="text-[#09869a] font-medium hover:underline flex items-center">
                  Learn more
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-10 bg-[#09869a]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Create a Lasting Legacy of Goodness</h2>
            <p className="text-xl text-white/90 mb-8">
              Your donation today will bring benefits to communities for generations to come.
              Leave a legacy of continuous charity that continues long after your contribution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#"
                onClick={handleDonateClick}
                className="px-8 py-4 text-base font-semibold text-[#09869a] bg-white rounded-lg hover:bg-gray-100 transition-all"
              >
                Donate Now
              </a>
              <Link 
                href="/contact" 
                className="px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-all"
              >
                Contact Us For More Information
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Main component that wraps with context provider
const SadakaJariyaPage = () => {
  return (
    <PayPalProvider>
      <DonationProvider programId="sadaka">
        <SadakaJariyaContent />
      </DonationProvider>
    </PayPalProvider>
  );
};

export default SadakaJariyaPage;