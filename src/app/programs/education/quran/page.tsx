"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, Book, CheckCircle2, BookOpen, Users, Globe } from 'lucide-react';
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

function QuranDistributionContent() {
  const [authModal, setAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const { currentModal, setCurrentModal, setProgramName, setDonationAmount } = useDonation();

  // Handle general donation
  const handleDonate = () => {
    setProgramName("Quran Distribution");
    setCurrentModal('donationOptions');
  };
  
  // Handle single Quran donation ($5 each)
  const handleDonateSingleQuran = () => {
    setProgramName("Single Quran Distribution");
    setDonationAmount(5); // Cost for one Quran
    
    // Store donation details for fixed amount flow
    localStorage.setItem("donationType", "fixed");
    localStorage.setItem("fixedAmount", "5");
    localStorage.setItem("programType", "education");
    localStorage.setItem("isRecurring", "false"); // One-time donation
    localStorage.setItem("programTitle", "Quran Distribution");
    localStorage.setItem("programDescription", "Provide Quran copies to students, schools, and communities.");
    localStorage.setItem("unitLabel", "copies");
    
    // Set the current modal to quantity selection
    setCurrentModal('quantityOptions');
  };
  
  // Handle bulk Quran donation (100 copies for $400)
  const handleDonateBulkQuran = () => {
    setProgramName("Bulk Quran Distribution");
    setDonationAmount(400); // Cost for 100 Qurans
    
    // Store donation details for fixed amount flow
    localStorage.setItem("donationType", "fixed");
    localStorage.setItem("fixedAmount", "400");
    localStorage.setItem("programType", "education");
    localStorage.setItem("isRecurring", "false"); // One-time donation
    localStorage.setItem("programTitle", "Bulk Quran Distribution (100 copies)");
    localStorage.setItem("programDescription", "Provide 100 Quran copies to students, schools, and communities.");
    localStorage.setItem("unitLabel", "packs");
    
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
            <Link href="/programs/education" className="hover:text-[#09869a]">
              Education
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-[#28C76F] font-medium">Quran Distribution</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#28C76F]/10 text-[#28C76F] mb-4">
                <Book className="w-4 h-4 mr-2" />
                Education Program
              </div>
              
              <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Quran Distribution Program
              </h1>
              
              <p className="text-gray-700 text-lg mb-6">
                Our Quran Distribution program provides copies of the Holy Quran to students, schools, mosques, 
                and communities, promoting Islamic education and spiritual growth across underserved regions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDonateSingleQuran}
                  className="bg-[#28C76F] text-white px-6 py-3 rounded-md font-medium hover:bg-[#28C76F]/90 transition-colors flex items-center justify-center"
                >
                  <Book className="w-5 h-5 mr-2" />
                  Donate 1 Quran Copy ($5)
                </button>
                <button
                  onClick={handleDonateBulkQuran}
                  className="bg-[#28C76F]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#28C76F]/70 transition-colors flex items-center justify-center"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Donate 100 Copies ($400)
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
                src="/education/quran-distribution-hero.jpg"
                alt="Quran Distribution"
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
                    ? 'border-[#28C76F] text-[#28C76F]'
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
                About Our Quran Distribution Program
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  The Holy Quran is the most fundamental text for Muslims worldwide, providing spiritual 
                  guidance, moral teachings, and a framework for life. Access to the Quran is essential 
                  for Islamic education and spiritual development.
                </p>
                
                <p className="mt-4">
                  Unfortunately, in many communities, there is a shortage of Quran copies, limiting access 
                  to this important religious text. Our Quran Distribution program addresses this need by 
                  providing quality copies of the Quran to individuals, schools, mosques, and entire communities.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Program Features</h3>
                
                <div className="bg-gray-50 p-6 rounded-xl my-6">
                  <h4 className="font-bold text-lg mb-4">Our Quran Distribution includes:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#28C76F] mr-3 flex-shrink-0 mt-0.5" />
                      <span>High-quality, durable hardcover Quran copies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#28C76F] mr-3 flex-shrink-0 mt-0.5" />
                      <span>Arabic text with translation options based on local languages</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#28C76F] mr-3 flex-shrink-0 mt-0.5" />
                      <span>Distribution to schools, madrassas, mosques, and community centers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#28C76F] mr-3 flex-shrink-0 mt-0.5" />
                      <span>Special focus on regions with limited access to Islamic texts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#28C76F] mr-3 flex-shrink-0 mt-0.5" />
                      <span>Optional Tajweed-marked copies for Quranic studies</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 flex justify-center gap-4 flex-wrap">
                    <button
                      onClick={handleDonateSingleQuran}
                      className="bg-[#28C76F] text-white px-6 py-2 rounded-md font-medium hover:bg-[#28C76F]/90 transition-colors"
                    >
                      Donate 1 Copy ($5)
                    </button>
                    <button
                      onClick={handleDonateBulkQuran}
                      className="bg-[#28C76F]/80 text-white px-6 py-2 rounded-md font-medium hover:bg-[#28C76F]/70 transition-colors"
                    >
                      Donate 100 Copies ($400)
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Why This Matters</h3>
                
                <p>
                  Access to the Quran is fundamental for Muslims to practice their faith and deepen their 
                  understanding of Islam. For students in Islamic schools and madrassas, having their own copy 
                  of the Quran is essential for effective learning and spiritual growth.
                </p>
                
                <p className="mt-4">
                  By donating Quran copies, you're supporting Islamic education and enabling more 
                  people to connect with their faith. Your contribution helps create more educated, 
                  spiritually grounded communities with stronger connections to Islamic teachings.
                </p>
              </div>
              
              <div className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl border-t-4 border-[#28C76F]">
                    <div className="w-12 h-12 bg-[#28C76F]/10 rounded-full flex items-center justify-center mb-4">
                      <Book className="w-6 h-6 text-[#28C76F]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">10,000+</h3>
                    <p className="text-gray-600">Quran Copies Distributed</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border-t-4 border-[#28C76F]">
                    <div className="w-12 h-12 bg-[#28C76F]/10 rounded-full flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6 text-[#28C76F]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">120+</h3>
                    <p className="text-gray-600">Schools & Institutions</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border-t-4 border-[#28C76F]">
                    <div className="w-12 h-12 bg-[#28C76F]/10 rounded-full flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-[#28C76F]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">25+</h3>
                    <p className="text-gray-600">Communities Served</p>
                  </div>
                </div>
                
                <div className="mt-10">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button
                      onClick={handleDonateSingleQuran}
                      className="bg-[#28C76F] text-white px-6 py-3 rounded-md font-medium hover:bg-[#28C76F]/90 transition-colors"
                    >
                      Donate 1 Copy ($5)
                    </button>
                    <button
                      onClick={handleDonateBulkQuran}
                      className="bg-[#28C76F]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#28C76F]/70 transition-colors"
                    >
                      Donate 100 Copies ($400)
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
                The Impact of Quran Distribution
              </h2>
              
              <p className="text-lg text-gray-700 mb-10">
                Our Quran Distribution program has made significant improvements in access to Islamic 
                education and spiritual growth. Here's how your donation makes a difference:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/education/quran-students.jpg"
                    alt="Students with Quran"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Enhanced Islamic Education</h3>
                  <p className="text-gray-700">
                    Schools and madrassas that received Quran copies reported significant improvements 
                    in students' ability to read, memorize, and understand the Quran. With each student 
                    having their own copy, teachers can provide more targeted instruction and students 
                    can practice at home.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="order-2 md:order-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Broader Community Access</h3>
                  <p className="text-gray-700">
                    By distributing Qurans to community centers and mosques, we've expanded access beyond 
                    educational institutions. Community members of all ages can now engage with the Quran, 
                    leading to more vibrant religious education programs and increased community involvement.
                  </p>
                </div>
                
                <div className="relative h-64 rounded-xl overflow-hidden order-1 md:order-2">
                  <Image
                    src="/education/quran-community.jpg"
                    alt="Community Quran Study"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-[#28C76F]/5 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Testimonials</h3>
                <div className="space-y-4">
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "Having our own Qurans has transformed our madrassa. Before, three or four students 
                      would share one copy, making it difficult to follow lessons properly. Now, each student 
                      can read along and make notes, greatly improving their understanding and memorization."
                    </p>
                    <p className="font-medium text-[#28C76F]">— Sheikh Abdul, Islamic Studies Teacher</p>
                  </div>
                  
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "Receiving my own copy of the Quran was a special moment for me. I can now study at home 
                      and have deepened my connection with the teachings. My parents are also happy because 
                      they can read it too, making our home more blessed."
                    </p>
                    <p className="font-medium text-[#28C76F]">— Amina, 14-year-old student</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={handleDonateSingleQuran}
                    className="bg-[#28C76F] text-white px-6 py-3 rounded-md font-medium hover:bg-[#28C76F]/90 transition-colors"
                  >
                    Donate 1 Copy ($5)
                  </button>
                  <button
                    onClick={handleDonateBulkQuran}
                    className="bg-[#28C76F]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#28C76F]/70 transition-colors"
                  >
                    Donate 100 Copies ($400)
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
                    question: "What type of Qurans do you distribute?",
                    answer: "We distribute high-quality, hardcover Qurans that are durable and made to last. Depending on the region, we provide Arabic-only copies or versions with translations in local languages such as English, French, Hausa, or other relevant languages based on community needs."
                  },
                  {
                    question: "Why are there two donation options?",
                    answer: "We offer single copy donations ($5) for individuals who want to make a smaller contribution, and bulk donations (100 copies for $400) for those who want to make a larger impact at a slightly discounted rate. The bulk option is also popular for mosques, schools, or community groups pooling resources together."
                  },
                  {
                    question: "How do you decide where to distribute Qurans?",
                    answer: "We work with local Islamic organizations, schools, and community leaders to identify areas with the greatest need for Quran copies. We prioritize regions with limited access to religious texts, growing Muslim communities, and educational institutions serving underprivileged populations."
                  },
                  {
                    question: "Can I request Qurans for a specific school or mosque?",
                    answer: "Yes, you can make a dedicated donation for a specific institution. Please contact us directly to arrange this, and we'll work with you to fulfill the request based on our distribution capabilities in that area."
                  },
                  {
                    question: "Do you offer digital Qurans as well?",
                    answer: "Currently, our focus is on providing physical copies of the Quran, as many of the communities we serve have limited access to digital devices or reliable internet. However, we're exploring options to include digital resources in the future as technology access improves."
                  },
                  {
                    question: "How can I verify that my donation was used to distribute Qurans?",
                    answer: "We document all our distribution events with photos and reports, which we share on our website and social media channels. We also send updates to donors via email. For bulk donations, we can provide specific information about where those Qurans were distributed."
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
                  If you have additional questions about our Quran Distribution program, please don't 
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
                    onClick={handleDonateSingleQuran}
                    className="bg-[#28C76F] text-white px-6 py-3 rounded-md font-medium hover:bg-[#28C76F]/90 transition-colors"
                  >
                    Donate 1 Copy ($5)
                  </button>
                  <button
                    onClick={handleDonateBulkQuran}
                    className="bg-[#28C76F]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#28C76F]/70 transition-colors"
                  >
                    Donate 100 Copies ($400)
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
              How Quran Distribution Works
            </h2>
            
            <p className="text-gray-700 text-center mb-12">
              From your donation to a Quran reaching someone's hands, here's how the process works:
            </p>
            
            <div className="space-y-12">
              {[
                {
                  step: "1",
                  title: "Your Donation",
                  description: "You donate either individual Quran copies ($5 each) or bulk packages (100 copies for $400), providing the funds needed for purchasing and distribution.",
                  icon: <Book className="w-6 h-6 text-white" />
                },
                {
                  step: "2",
                  title: "Quran Acquisition",
                  description: "We work with trusted publishers to obtain high-quality Quran copies that meet our standards for durability and readability.",
                  icon: <BookOpen className="w-6 h-6 text-white" />
                },
                {
                  step: "3",
                  title: "Needs Assessment",
                  description: "We identify schools, mosques, and communities with the greatest need for Quran copies through our local partners.",
                  icon: <Users className="w-6 h-6 text-white" />
                },
                {
                  step: "4",
                  title: "Distribution & Follow-up",
                  description: "We distribute the Qurans to the identified recipients and conduct follow-up visits to ensure they are being effectively utilized.",
                  icon: <CheckCircle2 className="w-6 h-6 text-white" />
                }
              ].map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#28C76F] rounded-full flex items-center justify-center">
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
                  onClick={handleDonateSingleQuran}
                  className="bg-[#28C76F] text-white px-6 py-3 rounded-md font-medium hover:bg-[#28C76F]/90 transition-colors"
                >
                  Donate 1 Copy ($5)
                </button>
                <button
                  onClick={handleDonateBulkQuran}
                  className="bg-[#28C76F]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#28C76F]/70 transition-colors"
                >
                  Donate 100 Copies ($400)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#28C76F] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">
              Help Spread the Words of Allah
            </h2>
            <p className="text-white/80 mb-8">
              Your donation today will help provide access to the Holy Quran for those who need it most. 
              For just $5 per copy, you can help spread the divine guidance and wisdom of the Quran to 
              students, schools, and communities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleDonateSingleQuran}
                className="bg-white text-[#28C76F] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Donate 1 Copy ($5)
              </button>
              <button
                onClick={handleDonateBulkQuran}
                className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Donate 100 Copies ($400)
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
}

export default function QuranDistribution() {
  return (
    <DonationProvider>
      <QuranDistributionContent />
    </DonationProvider>
  );
}