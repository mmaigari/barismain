"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, Lightbulb, CheckCircle2, Zap, School, Sun } from 'lucide-react';
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
  const { currentModal, setCurrentModal, setProgramName, setDonationAmount } = useDonation();

  // Handle general donation
  const handleDonate = () => {
    setProgramName("Lighting Up a School");
    setCurrentModal('donationOptions');
  };
  
  // Handle solar panel donation
  const handleDonateSolarPanel = () => {
    setProgramName("Solar Panel for School");
    setDonationAmount(500); // Cost for one solar panel system
    
    // Store donation details for fixed amount flow
    localStorage.setItem("donationType", "fixed");
    localStorage.setItem("fixedAmount", "500");
    localStorage.setItem("programType", "education");
    localStorage.setItem("isRecurring", "false"); // One-time donation
    localStorage.setItem("programTitle", "Solar Panel for School");
    localStorage.setItem("programDescription", "Provide a solar panel system for schools without electricity.");
    localStorage.setItem("unitLabel", "systems");
    
    // Set the current modal to quantity selection
    setCurrentModal('quantityOptions');
  };
  
  // Handle classroom lighting kit donation
  const handleDonateClassroomLighting = () => {
    setProgramName("Classroom Lighting Kit");
    setDonationAmount(150); // Cost for one classroom lighting kit
    
    // Store donation details for fixed amount flow
    localStorage.setItem("donationType", "fixed");
    localStorage.setItem("fixedAmount", "150");
    localStorage.setItem("programType", "education");
    localStorage.setItem("isRecurring", "false"); // One-time donation
    localStorage.setItem("programTitle", "Classroom Lighting Kit");
    localStorage.setItem("programDescription", "Provide lighting for one classroom to improve learning conditions.");
    localStorage.setItem("unitLabel", "classrooms");
    
    // Set the current modal to quantity selection
    setCurrentModal('quantityOptions');
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
                  Donate a Solar System ($500)
                </button>
                <button
                  onClick={handleDonateClassroomLighting}
                  className="bg-[#FFB400]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/70 transition-colors flex items-center justify-center"
                >
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Light Up a Classroom ($150)
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
                      Solar Panel System ($500)
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFB400] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Complete solar panel system (panels, inverter, batteries)</span>
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
                      Classroom Lighting Kit ($150)
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
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Why Lighting Matters</h3>
                
                <p>
                  Proper lighting in schools is not just a convenience—it's essential for effective education. 
                  Adequate lighting improves visibility of learning materials, reduces eye strain, and creates 
                  a more conducive learning environment. Additionally, solar-powered lighting allows schools to:
                </p>
                
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#FFB400] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Extend learning hours beyond daylight, particularly important during shorter winter days</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#FFB400] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Conduct evening classes for adult education and community programs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#FFB400] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Provide a safer environment for students and teachers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#FFB400] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Introduce students to renewable energy concepts through practical example</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl border-t-4 border-[#FFB400]">
                    <div className="w-12 h-12 bg-[#FFB400]/10 rounded-full flex items-center justify-center mb-4">
                      <School className="w-6 h-6 text-[#FFB400]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">25+</h3>
                    <p className="text-gray-600">Schools Illuminated</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border-t-4 border-[#FFB400]">
                    <div className="w-12 h-12 bg-[#FFB400]/10 rounded-full flex items-center justify-center mb-4">
                      <Lightbulb className="w-6 h-6 text-[#FFB400]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">180+</h3>
                    <p className="text-gray-600">Classrooms Lit</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border-t-4 border-[#FFB400]">
                    <div className="w-12 h-12 bg-[#FFB400]/10 rounded-full flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-[#FFB400]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">12,000+</h3>
                    <p className="text-gray-600">Students Benefiting</p>
                  </div>
                </div>
                
                <div className="mt-10">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button
                      onClick={handleDonateSolarPanel}
                      className="bg-[#FFB400] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/90 transition-colors"
                    >
                      Donate a Solar System ($500)
                    </button>
                    <button
                      onClick={handleDonateClassroomLighting}
                      className="bg-[#FFB400]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/70 transition-colors"
                    >
                      Light Up a Classroom ($150)
                    </button>
                  </div>
                </div>
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
              <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                The Impact of School Lighting
              </h2>
              
              <p className="text-lg text-gray-700 mb-10">
                Our Lighting Up a School program has transformed educational experiences in communities 
                without electricity. Here's how solar lighting is making a difference:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/education/extended-hours.jpg"
                    alt="Extended Study Hours"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Extended Study Hours</h3>
                  <p className="text-gray-700">
                    Schools with solar lighting systems report a significant increase in study hours. 
                    Students can now attend classes earlier in the morning and later in the evening, 
                    particularly beneficial during winter months when daylight hours are shorter. Evening 
                    study programs have increased by 68% in schools with our solar lighting systems.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="order-2 md:order-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Improved Academic Performance</h3>
                  <p className="text-gray-700">
                    Better lighting conditions have led to improved academic outcomes. Teachers report 
                    that students can read and write more effectively, with a 32% increase in reading 
                    comprehension scores. Overall academic performance has improved by 25% in schools 
                    with proper lighting solutions.
                  </p>
                </div>
                
                <div className="relative h-64 rounded-xl overflow-hidden order-1 md:order-2">
                  <Image
                    src="/education/academic-improvement.jpg"
                    alt="Academic Improvement"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/education/community-center.jpg"
                    alt="Community Center"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Schools as Community Centers</h3>
                  <p className="text-gray-700">
                    With reliable lighting, schools have become community hubs for adult education, 
                    community meetings, and after-hours activities. This has strengthened community 
                    engagement with schools and increased parental involvement in education, with a 
                    45% increase in parent-teacher meetings.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-[#FFB400]/5 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Testimonials</h3>
                <div className="space-y-4">
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "Before we had solar lighting in our school, we could only study when the sun was up. 
                      During the rainy season, the classrooms would be so dark that we could barely see what 
                      was written on the board. Now we can study anytime, and I've been able to improve my grades."
                    </p>
                    <p className="font-medium text-[#FFB400]">— Musa, 14-year-old student</p>
                  </div>
                  
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "The solar lighting system has completely transformed our school. Not only can we teach more 
                      effectively in well-lit classrooms, but we now hold evening classes for adults in the community. 
                      The school has become a true center of learning for the entire village."
                    </p>
                    <p className="font-medium text-[#FFB400]">— Mrs. Abimbola, School Principal</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={handleDonateSolarPanel}
                    className="bg-[#FFB400] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/90 transition-colors"
                  >
                    Donate a Solar System ($500)
                  </button>
                  <button
                    onClick={handleDonateClassroomLighting}
                    className="bg-[#FFB400]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/70 transition-colors"
                  >
                    Light Up a Classroom ($150)
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
                    question: "What's the difference between a solar system and a classroom lighting kit?",
                    answer: "A solar system ($500) is more comprehensive, including larger solar panels, batteries, and an inverter that can power multiple classrooms and potentially other equipment like computers. A classroom lighting kit ($150) is focused on providing basic LED lighting for a single classroom with a smaller solar panel and battery system."
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
              
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Have More Questions?</h3>
                <p className="text-gray-700 mb-4">
                  If you have additional questions about our Lighting Up a School program, please don't 
                  hesitate to contact us. Our team is happy to provide more information about how your 
                  support makes a difference.
                </p>
                <Link 
                  href="/contact"
                  className="text-[#09869a] font-medium hover:underline flex items-center"
                >
                  Contact Us
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="mt-10 text-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={handleDonateSolarPanel}
                    className="bg-[#FFB400] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/90 transition-colors"
                  >
                    Donate a Solar System ($500)
                  </button>
                  <button
                    onClick={handleDonateClassroomLighting}
                    className="bg-[#FFB400]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/70 transition-colors"
                  >
                    Light Up a Classroom ($150)
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
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">
              How Our School Lighting Program Works
            </h2>
            
            <p className="text-gray-700 text-center mb-12">
              From your donation to illuminating a school, here's how the process works:
            </p>
            
            <div className="space-y-12">
              {[
                {
                  step: "1",
                  title: "Your Donation",
                  description: "You donate either a complete solar system ($500) or a classroom lighting kit ($150), providing the funds needed for equipment and installation.",
                  icon: <Sun className="w-6 h-6 text-white" />
                },
                {
                  step: "2",
                  title: "Needs Assessment & Planning",
                  description: "We identify schools without electricity and assess their specific lighting needs, creating a tailored lighting plan for each location.",
                  icon: <Lightbulb className="w-6 h-6 text-white" />
                },
                {
                  step: "3",
                  title: "Installation & Training",
                  description: "Our trained technicians install the solar panels and lighting systems, while providing maintenance training to school staff.",
                  icon: <Zap className="w-6 h-6 text-white" />
                },
                {
                  step: "4",
                  title: "Ongoing Support & Monitoring",
                  description: "We conduct regular follow-ups to ensure systems are functioning properly and provide technical support when needed.",
                  icon: <CheckCircle2 className="w-6 h-6 text-white" />
                }
              ].map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#FFB400] rounded-full flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleDonateSolarPanel}
                  className="bg-[#FFB400] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/90 transition-colors"
                >
                  Donate a Solar System ($500)
                </button>
                <button
                  onClick={handleDonateClassroomLighting}
                  className="bg-[#FFB400]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFB400]/70 transition-colors"
                >
                  Light Up a Classroom ($150)
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
                Donate a Solar System ($500)
              </button>
              <button
                onClick={handleDonateClassroomLighting}
                className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Light Up a Classroom ($150)
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