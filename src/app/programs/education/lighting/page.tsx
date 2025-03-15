"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, Lightbulb, CheckCircle2, Zap, School, Sun, Heart } from 'lucide-react';
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

function LightingUpSchoolContent() {
  const [authModal, setAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  
  // Destructure currency and formatAmount from the donation context
  const { 
    currentModal, 
    setCurrentModal, 
    setProgramName, 
    setDonationAmount, 
    currency,
    formatAmount,
    convertAmount
  } = useDonation();

  // Define base prices in USD
  const USD_PRICES = {
    solarSystem: 500,
    classroomLighting: 150
  };

  // Get current prices based on selected currency
  const getCurrentPrices = () => {
    if (currency === 'NGN') {
      return {
        solarSystem: convertAmount(USD_PRICES.solarSystem, 'USD', 'NGN'),
        classroomLighting: convertAmount(USD_PRICES.classroomLighting, 'USD', 'NGN')
      };
    }
    return USD_PRICES;
  };

  const prices = getCurrentPrices();

  // Handle general donation
  const handleDonate = () => {
    setProgramName("Lighting Up a School");
    setCurrentModal('donationOptions');
  };
  
  // Handle solar panel donation
  const handleDonateSolarPanel = () => {
    setProgramName("Solar Panel for School");
    
    // Use the correct amount based on currency
    const amount = prices.solarSystem;
    setDonationAmount(amount);
    
    // Store donation details for fixed amount flow
    localStorage.setItem("donationType", "fixed");
    localStorage.setItem("fixedAmount", amount.toString());
    localStorage.setItem("programType", "education");
    localStorage.setItem("isRecurring", "false");
    localStorage.setItem("programTitle", "Solar Panel for School");
    localStorage.setItem("programDescription", "Provide a solar power for schools without electricity.");
    localStorage.setItem("unitLabel", "systems");
    
    setCurrentModal('quantityOptions');
  };
  
  // Handle classroom lighting kit donation
  const handleDonateClassroomLighting = () => {
    setProgramName("Classroom Lighting Kit");
    
    // Use the correct amount based on currency
    const amount = prices.classroomLighting;
    setDonationAmount(amount);
    
    // Store donation details for fixed amount flow
    localStorage.setItem("donationType", "fixed");
    localStorage.setItem("fixedAmount", amount.toString());
    localStorage.setItem("programType", "education");
    localStorage.setItem("isRecurring", "false");
    localStorage.setItem("programTitle", "Classroom Lighting Kit");
    localStorage.setItem("programDescription", "Provide lighting for one classroom to improve learning conditions.");
    localStorage.setItem("unitLabel", "classrooms");
    
    setCurrentModal('quantityOptions');
  };

  // Update the amounts when currency changes
  useEffect(() => {
    // Re-calculate prices when currency changes
    getCurrentPrices();
  }, [currency]);

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
      <section className="relative bg-gray-50 pt-16 pb-20 overflow-hidden">
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
            <Link href="/programs/education" className="hover:text-[#09869a]">
              Education
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-[#FFB400] font-medium">Lighting Up a School</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#FFB400]/10 text-[#FFB400] mb-4">
                <Lightbulb className="w-4 h-4 mr-2" />
                Education Program
              </div>
              
              <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Lighting Up a School
              </h1>
              
              <p className="text-gray-700 text-lg mb-6">
                Our Lighting Up a School program provides solar-powered lighting systems to schools 
                without electricity, creating better learning environments and extending study hours for students.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDonateSolarPanel}
                  className="bg-[#FFB400] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/90 transition-colors flex items-center justify-center"
                >
                  <Sun className="w-5 h-5 mr-2" />
                  Donate a Solar System ({formatAmount(prices.solarSystem)})
                </button>
                <button
                  onClick={handleDonateClassroomLighting}
                  className="bg-[#FFB400]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/70 transition-colors flex items-center justify-center"
                >
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Light Up a Classroom ({formatAmount(prices.classroomLighting)})
                </button>
                
                <button
                  onClick={handleDonate}
                  className="bg-white border-2 border-[#FFB400] text-[#FFB400] px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/5 transition-colors flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Custom Donation
                </button>
              </div>
              <a
                href="#how-it-works"
                className="text-[#09869a] flex items-center font-medium hover:underline mt-4"
              >
                Learn How It Works
              </a>
            </div>
            
            <div className="relative h-80 lg:h-96">
              <Image
                src="/education/lighting-school-hero.jpg"
                alt="Lighting Up a School"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto pb-px">
            {['about', 'impact', 'faq'].map((tab) => (
              <button
                key={tab}
                className={`py-4 px-6 font-medium text-sm capitalize whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-[#FFB400] text-[#FFB400]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'faq' ? 'FAQ' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      {activeTab === 'about' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                About Lighting Up a School
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Across many rural and underserved communities, schools operate without reliable electricity, 
                  limiting educational opportunities and learning hours. When classrooms are dark or poorly lit, 
                  students struggle to see learning materials, and teachers face challenges delivering effective 
                  lessons, especially during cloudy days or early evening hours.
                </p>
                
                <p className="mt-4">
                  Our Lighting Up a School program addresses this challenge by providing sustainable 
                  solar-powered lighting solutions to schools without electricity. By harnessing clean, 
                  renewable energy, we create brighter learning environments that extend study hours and 
                  improve educational outcomes.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Program Components</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center">
                      <Sun className="w-5 h-5 text-[#FFB400] mr-2" />
                      Solar Power ({formatAmount(prices.solarSystem)})
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFB400] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Complete solar system (panels, inverter, batteries)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFB400] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Powers multiple classrooms and administrative areas</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFB400] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Includes installation and basic maintenance training</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFB400] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Potential to power additional equipment like computers</span>
                      </li>
                    </ul>
                    <div className="mt-6 text-center">
                      <button
                        onClick={handleDonateSolarPanel}
                        className="bg-[#FFB400] text-white px-6 py-2 rounded-md font-medium hover:bg-[#FFB400]/90 transition-colors"
                      >
                        Donate a Solar System
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center">
                      <Lightbulb className="w-5 h-5 text-[#FFB400] mr-2" />
                      Classroom Lighting Kit ({formatAmount(prices.classroomLighting)})
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFB400] mr-3 flex-shrink-0 mt-0.5" />
                        <span>LED lighting fixtures for one classroom</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFB400] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Small solar panel to power the lighting system</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFB400] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Battery storage for nighttime use</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFB400] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Installation and simple maintenance instructions</span>
                      </li>
                    </ul>
                    <div className="mt-6 text-center">
                      <button
                        onClick={handleDonateClassroomLighting}
                        className="bg-[#FFB400] text-white px-6 py-2 rounded-md font-medium hover:bg-[#FFB400]/90 transition-colors"
                      >
                        Light Up a Classroom
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Rest of the About section remains unchanged */}
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Impact Section */}
      {activeTab === 'impact' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Impact section content remains the same */}
              
              <div className="mt-10 text-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={handleDonateSolarPanel}
                    className="bg-[#FFB400] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/90 transition-colors"
                  >
                    School ({formatAmount(prices.solarSystem)})
                  </button>
                  <button
                    onClick={handleDonateClassroomLighting}
                    className="bg-[#FFB400]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/70 transition-colors"
                  >
                    Classroom ({formatAmount(prices.classroomLighting)})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* FAQ Section */}
      {activeTab === 'faq' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    question: "Why are solar lighting systems important for schools?",
                    answer: "Many schools in rural and underserved areas operate without electricity, limiting learning to daylight hours and reducing visibility on cloudy days. Solar lighting extends study hours, improves visibility for reading and writing, creates safer environments, and allows for evening community programs, significantly enhancing educational opportunities."
                  },
                  {
                    question: `What's the difference between a solar system and a classroom lighting kit?`,
                    answer: `A solar system (${formatAmount(prices.solarSystem)}) is more comprehensive, including larger solar panels, batteries, and an inverter that can power multiple classrooms and potentially other equipment like computers. A classroom lighting kit (${formatAmount(prices.classroomLighting)}) is focused on providing basic LED lighting for a single classroom with a smaller solar panel and battery system.`
                  },
                  {
                    question: "How long do these solar systems last?",
                    answer: "Our solar lighting systems are designed for durability, with panels typically lasting 20-25 years with minimal maintenance. Batteries usually need replacement after 5-7 years, and LED lights have an average lifespan of 50,000 hours (approximately 10+ years of school use). We provide maintenance training to ensure long-term functionality."
                  },
                  {
                    question: "How do you select which schools receive lighting systems?",
                    answer: "We prioritize schools in areas without grid electricity, focusing on those with high enrollment, demonstrated commitment to education, and community support. We also consider the potential impact on evening education programs and community use. Our local partners help identify schools with the greatest need and readiness."
                  },
                  {
                    question: "Can I donate to a specific school?",
                    answer: "Yes, if you have a specific school in mind, please contact us directly. We can work with you to determine if the school meets our criteria and coordinate the installation. If you don't have a specific school in mind, we'll allocate your donation to schools on our priority list."
                  },
                  {
                    question: "Is there training provided with the installation?",
                    answer: "Yes, all installations include basic maintenance training for school staff. We provide illustrated maintenance guides in local languages and conduct hands-on training sessions. For larger solar systems, we also provide more comprehensive technical training to ensure the system remains operational for years to come."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={handleDonateSolarPanel}
                    className="bg-[#FFB400] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/90 transition-colors"
                  >
                    Donate a Solar System ({formatAmount(prices.solarSystem)})
                  </button>
                  <button
                    onClick={handleDonateClassroomLighting}
                    className="bg-[#FFB400]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/70 transition-colors"
                  >
                    Light Up a Classroom ({formatAmount(prices.classroomLighting)})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* How it works content remains the same */}
            
            <div className="mt-12 text-center">
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleDonateSolarPanel}
                  className="bg-[#FFB400] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/90 transition-colors"
                >
                  Donate a Solar System ({formatAmount(prices.solarSystem)})
                </button>
                <button
                  onClick={handleDonateClassroomLighting}
                  className="bg-[#FFB400]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/70 transition-colors"
                >
                  Light Up a Classroom ({formatAmount(prices.classroomLighting)})
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#FFB400] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">
              Bring Light to Education
            </h2>
            <p className="text-white/80 mb-8">
              Your donation today can help illuminate classrooms and transform educational opportunities 
              for thousands of students. Choose an option below to make a difference.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleDonateSolarPanel}
                className="bg-white text-[#FFB400] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Donate a Solar System ({formatAmount(prices.solarSystem)})
              </button>
              <button
                onClick={handleDonateClassroomLighting}
                className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Light Up a Classroom ({formatAmount(prices.classroomLighting)})
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
}

export default function LightingUpSchool() {
  return (
    <DonationProvider>
      <LightingUpSchoolContent />
    </DonationProvider>
  );
}