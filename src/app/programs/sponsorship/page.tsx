"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, Users, GraduationCap, Heart, Calendar, Star } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { DonationProvider, useDonation } from '@/contexts/DonationContext';
import DonationOptionsModal from '@/components/donation/modals/DonationOptionsModal';
import PaymentFeesModal from '@/components/donation/modals/PaymentFeesModal';
import TeamSupportModal from '@/components/donation/modals/TeamSupportModal';
import SignInModal from '@/components/donation/modals/SignInModal';
import GuestContinueModal from '@/components/donation/modals/GuestContinueModal';
import PaymentMethodModal from '@/components/donation/modals/PaymentMethodModal';
import ConfirmationModal from '@/components/donation/modals/ConfirmationModal';

function SponsorshipProgramsContent() {
  const [authModal, setAuthModal] = useState(false);
  const { currentModal, setCurrentModal, setProgramName, setDonationAmount } = useDonation();
  
  // Define the sponsorship programs
  const sponsorshipPrograms = [
    {
      id: "orphan",
      title: "Orphan Sponsorship",
      description: "Provide essential support for orphaned children including food, clothing, healthcare, and education.",
      image: "/sponsorships/orphan.png",
      link: "/programs/sponsorship/orphan",
      color: "#E5502A",
      icon: <Users className="w-6 h-6 text-white" />
    },
    {
      id: "student",
      title: "Orphan Student Sponsorship",
      description: "Support orphaned children's education with dedicated sponsorship for primary and secondary schooling.",
      image: "/sponsorships/student.png",
      link: "/programs/sponsorship/student",
      color: "#2A88E5",
      icon: <GraduationCap className="w-6 h-6 text-white" />
    }
  ];

  // Handle sponsorship selection
  const handleSponsor = (programName: string, amount?: number) => {
    setProgramName(programName);
    if (amount) {
      setDonationAmount(amount);
    }
    setCurrentModal('donationOptions');
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      {/* Add donation modals */}
      {currentModal === 'donationOptions' && <DonationOptionsModal />}
      {currentModal === 'paymentFees' && <PaymentFeesModal />}
      {currentModal === 'teamSupport' && <TeamSupportModal />}
      {currentModal === 'signIn' && <SignInModal />}
      {currentModal === 'guestContinue' && <GuestContinueModal />}
      {currentModal === 'paymentMethod' && <PaymentMethodModal />}
      {currentModal === 'confirmation' && <ConfirmationModal />}
      
      {/* Hero Section */}
      <section className="relative bg-gray-50 pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] z-0">

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
            <span className="text-[#09869a] font-medium">Sponsorship</span>
          </div>
          
          <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-[#09869a] mb-4">
            Sponsorship Programs
          </h1>
          <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mb-6"></div>
          
          <div className="max-w-3xl">
            <p className="text-gray-700 text-lg mb-6">
              Our sponsorship programs provide continuous support to vulnerable individuals, 
              especially orphaned children. Through your regular contributions, you can make a 
              lasting difference in someone's life by providing education, healthcare, and basic needs.
            </p>
            
            {/* Add donate button here */}
            <button
              onClick={() => handleSponsor("Sponsorship Programs")}
              className="bg-[#FA6418] text-white px-8 py-3 rounded-md font-medium hover:bg-[#FA6418]/90 transition-colors inline-flex items-center"
            >
              Donate Now
              <Heart className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
      
      {/* How Sponsorship Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              How Sponsorship Works
            </h2>
            <p className="text-gray-600">
              Our sponsorship process is simple, transparent, and impactful. Your monthly contribution 
              directly supports a specific child's needs and development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Choose a Program",
                description: "Select the sponsorship program that aligns with your values and goals."
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Monthly Contribution",
                description: "Set up a recurring donation to provide consistent support."
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Make a Difference",
                description: "Your donation directly impacts a child's life, health, and education."
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Receive Updates",
                description: "Get regular updates on the progress and impact of your sponsorship."
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#09869a]/10 rounded-full flex items-center justify-center text-[#09869a] mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sponsorship Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Our Sponsorship Programs
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose from our various sponsorship options to support vulnerable children and help them 
              achieve their full potential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {sponsorshipPrograms.map((program) => (
              <div 
                key={program.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl"
              >
                {/* Program Image */}
                <Link href={program.link}>
                  <div className="relative h-64">
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
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{program.title}</h3>
                    </div>
                  </div>
                </Link>
                
                {/* Program Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={program.link}
                      className="bg-[#FA6418] text-white px-5 py-2 rounded-md font-medium hover:bg-[#09869a]/90 transition-colors"
                    >
                      Learn More
                    </Link>
                    
                    <button
                      onClick={() => handleSponsor(program.title)}
                      className="text-[#FA6418] border border-[#FA6418] px-5 py-2 rounded-md font-medium hover:bg-[#09869a]/10 transition-colors"
                    >
                      Sponsor Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-96 md:h-full">
                <Image
                  src="/sponsorships/impact.png"
                  alt="Sponsorship Impact"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <div>
                <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                  Your Sponsorship Makes a Real Difference
                </h2>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#09869a]/10 rounded-full flex items-center justify-center text-[#09869a] mr-4">
                      <span className="font-bold text-lg">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Education</h3>
                      <p className="text-gray-600">
                        Your sponsorship provides tuition, books, uniforms, and other educational materials.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#09869a]/10 rounded-full flex items-center justify-center text-[#09869a] mr-4">
                      <span className="font-bold text-lg">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Healthcare</h3>
                      <p className="text-gray-600">
                        Sponsored children receive regular medical check-ups, vaccinations, and treatment when needed.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#09869a]/10 rounded-full flex items-center justify-center text-[#09869a] mr-4">
                      <span className="font-bold text-lg">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Nutrition</h3>
                      <p className="text-gray-600">
                        Your support ensures children receive nutritious meals and develop healthy eating habits.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#09869a]/10 rounded-full flex items-center justify-center text-[#09869a] mr-4">
                      <span className="font-bold text-lg">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Emotional Support</h3>
                      <p className="text-gray-600">
                        Sponsored children benefit from mentorship, counseling, and a sense of community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#FA6418] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">
              Transform a Child's Life Today
            </h2>
            <p className="text-[#FA6418]/80 mb-8">
              Your monthly sponsorship provides consistent support that helps vulnerable children 
              overcome challenges and build a brighter future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#sponsorship-programs"
                className="bg-white text-[#09869a] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Sponsor a Child
              </Link>
              <Link 
                href="/contact" 
                className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
}

export default function SponsorshipPrograms() {
  return (
    <DonationProvider>
      <SponsorshipProgramsContent />
    </DonationProvider>
  );
}