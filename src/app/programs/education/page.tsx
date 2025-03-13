"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, BookOpen, Book, Lightbulb, Building, PenTool } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { Toaster } from 'react-hot-toast';
import { DonationProvider, useDonation } from '@/contexts/DonationContext';
import DonationOptionsModal from '@/components/donation/modals/DonationOptionsModal';
import PaymentFeesModal from '@/components/donation/modals/PaymentFeesModal';
import TeamSupportModal from '@/components/donation/modals/TeamSupportModal';
import SignInModal from '@/components/donation/modals/SignInModal';
import GuestContinueModal from '@/components/donation/modals/GuestContinueModal';
import PaymentMethodModal from '@/components/donation/modals/PaymentMethodModal';
import ConfirmationModal from '@/components/donation/modals/ConfirmationModal';
import QuantityOptionsModal from '@/components/donation/modals/QuantityOptionsModal';

function EducationProgramsContent() {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  
  // Define the education programs
  const educationPrograms = [
    {
      id: "support",
      title: "Education Support",
      description: "Provide general support for education initiatives including teacher training, educational materials, and school improvements.",
      image: "/education/education-support.png",
      link: "/programs/education/support",
      color: "#4B6CB7",
      icon: <BookOpen className="w-6 h-6 text-white" />
    },
    {
      id: "kits",
      title: "School Kits Distribution",
      description: "Provide essential school supplies to students in need, including backpacks, notebooks, pens, and other learning materials.",
      image: "/education/school-kits.png",
      link: "/programs/education/kits",
      color: "#FF9F43",
      icon: <PenTool className="w-6 h-6 text-white" />
    },
    {
      id: "quran",
      title: "Quran Distribution",
      description: "Support the distribution of Quran copies to students, schools, and communities to promote Islamic education and spiritual growth.",
      image: "/education/quran.png",
      link: "/programs/education/quran",
      color: "#28C76F",
      icon: <Book className="w-6 h-6 text-white" />
    },
    {
      id: "lighting",
      title: "Lighting Up a School",
      description: "Install solar panels and lighting systems in schools without electricity to create better learning environments.",
      image: "/education/lighting.png",
      link: "/programs/education/lighting",
      color: "#FFB400",
      icon: <Lightbulb className="w-6 h-6 text-white" />
    },
    {
      id: "renovation",
      title: "School Renovation Projects",
      description: "Repair and renovate dilapidated school buildings to create safe and conducive learning environments for students.",
      image: "/education/renovation.png",
      link: "/programs/education/renovation",
      color: "#7367F0",
      icon: <Building className="w-6 h-6 text-white" />
    }
  ];

  // Handle donation button click
  const handleDonate = (programName: string) => {
    setProgramName(programName);
    setCurrentModal('donationOptions');
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {/* Add donation modals */}
      {currentModal === 'donationOptions' && <DonationOptionsModal />}
      {currentModal === 'quantityOptions' && <QuantityOptionsModal />}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
      {/* Hero Section */}
      <section className="relative bg-gray-50 pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] z-0">
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 448.52 179.48" className="h-full w-full">
            <defs>
              <style>
                {`.cls-1 {fill: #fa6418;} .cls-2 {fill: #e32613;} .cls-3, .cls-4 {fill: #09869a;} .cls-5 {fill: #17c5ce;}`}
              </style>
            </defs>
            <g id="Layer_1-2" data-name="Layer 1">
              <g>
                <path className="cls-2" d="M126.36,90.63c14.19,14.01,28.87,28.5,43.66,43.09-4.19,3.99-8.26,7.86-12.11,11.53-14.35-14.16-29.03-28.64-43.88-43.29,4.26-3.91,8.38-7.7,12.34-11.33Z"/>
                <path className="cls-5" d="M0,83.34c1.9-5.49,3.73-10.79,5.62-16.24,19.51,6.92,38.85,13.78,58.44,20.73-1.88,5.46-3.7,10.74-5.6,16.23-19.53-6.92-38.88-13.78-58.47-20.72Z"/>
                <path className="cls-1" d="M95.34,115.56c5.64,.61,11.13,1.2,16.94,1.83-2.39,20.68-4.76,41.26-7.17,62.09-5.65-.62-11.19-1.22-16.93-1.84,2.39-20.73,4.76-41.26,7.16-62.07Z"/>
              </g>
            </g>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#09869a] flex items-center">
              <Home className="w-3 h-3 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <Link href="/programs" className="hover:text-[#09869a]">
              Programs
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-[#09869a] font-medium">Education</span>
          </div>
          
          <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-[#09869a] mb-4">
            Education Programs
          </h1>
          <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mb-6"></div>
          
          <div className="max-w-3xl">
            <p className="text-gray-700 text-lg mb-6">
              Our education programs aim to improve access to quality education for vulnerable 
              communities. From providing essential school supplies to renovating school buildings, 
              we're committed to creating better learning environments for students.
            </p>
          </div>
        </div>
      </section>
      
      {/* Impact Statistics */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-[#E32613] mb-2">981</div>
              <p className="text-gray-600">Beneficiaries</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-[#E32613] mb-2">481</div>
              <p className="text-gray-600">Quran Copies Distributed</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-[#E32613] mb-2">1</div>
              <p className="text-gray-600">Orphanage Built</p>
            </div>
           
          </div>
        </div>
      </section>
      
      {/* Education Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Our Education Initiatives
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore our education programs and learn how you can contribute to improving 
              educational opportunities for children in need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationPrograms.map((program) => (
              <div 
                key={program.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl"
              >
                {/* Program Image */}
                <Link href={program.link}>
                  <div className="relative h-48">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 rounded-full" style={{ backgroundColor: program.color }}>
                        <div className="flex items-center justify-center h-full">
                          {program.icon}
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold text-white">{program.title}</h3>
                    </div>
                  </div>
                </Link>
                
                {/* Program Content */}
                <div className="p-5">
                  <p className="text-gray-600 mb-6 h-20 line-clamp-3">{program.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={program.link}
                      className="text-[#09869a] font-medium hover:underline flex items-center"
                    >
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                    
                    <button
                      onClick={() => handleDonate(program.title)}
                      className="bg-[#E32613] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#09869a]/90 transition-colors"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Education Matters */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                  Why Education Matters
                </h2>
                <p className="text-gray-700 mb-4">
                  Education is one of the most powerful tools for breaking the cycle of poverty. It empowers 
                  individuals, strengthens communities, and builds the foundation for a more prosperous future.
                </p>
                <p className="text-gray-700 mb-4">
                  Despite its importance, millions of children worldwide lack access to quality education due 
                  to poverty, conflict, lack of infrastructure, and other barriers.
                </p>
                <p className="text-gray-700">
                  Through our education programs, we're working to address these challenges and create 
                  opportunities for children to learn, grow, and realize their full potential.
                </p>
              </div>
              <div className="order-1 md:order-2 relative h-64 md:h-96">
                <Image
                  src="/education/why-education.png"
                  alt="Why Education Matters"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#E32613] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">
              Support Education Today
            </h2>
            <p className="text-white/80 mb-8">
              Your contribution can help provide educational opportunities to children in need. 
              Choose one of our education programs and make a difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#education-programs"
                className="bg-white text-[#09869a] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Explore Programs
              </Link>
              <button
                onClick={() => handleDonate("Education Support")}
                className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
}

export default function EducationPrograms() {
  return (
    <DonationProvider>
      <EducationProgramsContent />
    </DonationProvider>
  );
}