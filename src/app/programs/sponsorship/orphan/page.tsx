"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, Users, Heart, Calendar, CheckCircle2, HelpCircle } from 'lucide-react';
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

function OrphanSponsorshipContent() {
  const [authModal, setAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const { currentModal, setCurrentModal, setProgramName, setDonationAmount } = useDonation();

  // Handle sponsorship selection
  const handleSponsor = () => {
    setProgramName("Orphan Sponsorship");
    setDonationAmount(30); // Default monthly amount for orphan sponsorship
    
    // Store donation details for fixed amount flow
    localStorage.setItem("donationType", "fixed");
    localStorage.setItem("fixedAmount", "30");
    localStorage.setItem("programType", "sponsorship");
    localStorage.setItem("isRecurring", "true"); // Sponsorships are recurring monthly
    localStorage.setItem("programTitle", "Orphan Sponsorship");
    localStorage.setItem("programDescription", "Monthly sponsorship to support an orphaned child's basic needs, healthcare, and education.");
    localStorage.setItem("unitLabel", "children");
    
    // Set the current modal to quantity selection instead of donation options
    setCurrentModal('quantityOptions');
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
      {currentModal === 'quantityOptions' && <QuantityOptionsModal />}
      
      {/* Hero Section */}
      <section className="relative bg-gray-50 pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] z-0">
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 448.52 179.48" className="h-full w-full">
            <defs>
              <style>
                {`.cls-1 {fill: #fa6418;} .cls-2 {fill: #e32613;} .cls-3, .cls-4 {fill: #09869a;} .cls-5 {fill: #17c5ce;}`}
              </style>
            </defs>
            {/* SVG paths - simplified for brevity */}
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
            <Link href="/programs/sponsorship" className="hover:text-[#09869a]">
              Sponsorship
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-[#E5502A] font-medium">Orphan Sponsorship</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#E5502A]/10 text-[#E5502A] mb-4">
                <Users className="w-4 h-4 mr-2" />
                Sponsorship Program
              </div>
              
              <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Orphan Sponsorship Program
              </h1>
              
              <p className="text-gray-700 text-lg mb-6">
                By sponsoring an orphan, you provide continuous support that covers essential needs like food, 
                clothing, healthcare, and education, helping them build a brighter future despite their circumstances.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <button
                  onClick={handleSponsor}
                  className="bg-[#E5502A] text-white px-6 py-3 rounded-md font-medium hover:bg-[#E5502A]/90 transition-colors"
                >
                  Sponsor an Orphan ($30/month)
                </button>
                <a
                  href="#how-it-works"
                  className="text-[#09869a] flex items-center font-medium hover:underline mt-2 sm:mt-0"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  How Sponsorship Works
                </a>
              </div>
            </div>
            
            <div className="relative h-80 lg:h-96">
              <Image
                src="/sponsorships/orphan-hero.jpg"
                alt="Orphan Sponsorship"
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
                    ? 'border-[#E5502A] text-[#E5502A]'
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
                About Our Orphan Sponsorship
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Our Orphan Sponsorship program is designed to provide consistent, comprehensive support 
                  to orphaned children in underserved communities. Through monthly contributions from 
                  compassionate sponsors like you, we ensure these vulnerable children receive the care 
                  they need to thrive.
                </p>
                
                <p>
                  Each orphan in our program receives personalized attention and support tailored to their 
                  specific needs. Your monthly donation of $30 ensures that a child has access to:
                </p>
                
                <ul className="space-y-4 mt-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#E5502A] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Nutritious Food</strong>
                      <p className="mt-1">
                        Regular, balanced meals that support healthy growth and development.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#E5502A] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Healthcare</strong>
                      <p className="mt-1">
                        Regular medical check-ups, immunizations, and treatment when needed.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#E5502A] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Clothing & Shelter</strong>
                      <p className="mt-1">
                        Safe living conditions and appropriate clothing for different seasons.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#E5502A] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Education Support</strong>
                      <p className="mt-1">
                        School enrollment, books, uniforms, and educational materials.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#E5502A] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Psychosocial Support</strong>
                      <p className="mt-1">
                        Counseling and guidance to help children cope with loss and develop resilience.
                      </p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8 p-5 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparent Reporting</h3>
                  <p>
                    As a sponsor, you'll receive regular updates on your sponsored child's progress, 
                    including photos, letters, academic achievements, and health status reports. This 
                    transparency ensures you can see the direct impact of your support.
                  </p>
                </div>
              </div>
              
              <div className="mt-10">
                <button
                  onClick={handleSponsor}
                  className="bg-[#E5502A] text-white px-6 py-3 rounded-md font-medium hover:bg-[#E5502A]/90 transition-colors"
                >
                  Sponsor an Orphan Now
                </button>
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
                The Impact of Your Sponsorship
              </h2>
              
              <p className="text-lg text-gray-700 mb-10">
                Your monthly contribution of $30 creates a profound and lasting impact on the life of an orphaned child. 
                Here's how your support transforms lives:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/sponsorships/impact-education.jpg"
                    alt="Education Impact"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Educational Advancement</h3>
                  <p className="text-gray-700">
                    With your support, orphaned children can attend school, often for the first time. Many sponsored 
                    children have gone on to complete secondary education and even pursue university degrees, breaking 
                    cycles of poverty in their communities.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="order-2 md:order-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Improved Health & Wellbeing</h3>
                  <p className="text-gray-700">
                    Regular medical care and nutritious meals have dramatically improved health outcomes for sponsored 
                    children. We've seen reductions in malnutrition rates and increased access to critical healthcare 
                    services, resulting in healthier, happier children.
                  </p>
                </div>
                
                <div className="relative h-64 rounded-xl overflow-hidden order-1 md:order-2">
                  <Image
                    src="/sponsorships/impact-health.jpg"
                    alt="Health Impact"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/sponsorships/impact-community.jpg"
                    alt="Community Impact"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Community Transformation</h3>
                  <p className="text-gray-700">
                    Your sponsorship doesn't just help one child—it strengthens entire communities. Our sponsored 
                    children become agents of change, using their education and opportunities to lift others up 
                    and improve conditions in their communities.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-[#E5502A]/5 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Success Stories</h3>
                <div className="space-y-4">
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "Before I was sponsored, I had no hope for education. Now I've completed secondary school and 
                      am training to become a teacher. I want to give back to my community the way my sponsor gave to me."
                    </p>
                    <p className="font-medium text-[#E5502A]">— Amina, Former Sponsored Child</p>
                  </div>
                  
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "The monthly support ensured I had food, clothing, and could attend school. Today, I'm studying 
                      medicine and dream of serving as a doctor in my village where healthcare access is limited."
                    </p>
                    <p className="font-medium text-[#E5502A]">— Ibrahim, Former Sponsored Child</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <button
                  onClick={handleSponsor}
                  className="bg-[#E5502A] text-white px-6 py-3 rounded-md font-medium hover:bg-[#E5502A]/90 transition-colors"
                >
                  Start Making an Impact Today
                </button>
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
                    question: "How much does it cost to sponsor an orphan?",
                    answer: "Our orphan sponsorship program costs $30 per month. This amount provides comprehensive support including food, clothing, healthcare, education, and psychosocial support."
                  },
                  {
                    question: "Can I communicate with my sponsored child?",
                    answer: "Yes, we facilitate communication between sponsors and children through letters and messages. You'll also receive regular updates about your sponsored child's progress and well-being."
                  },
                  {
                    question: "How long does the sponsorship last?",
                    answer: "Sponsorship is most impactful when maintained until the child becomes self-sufficient, typically through the completion of their education. However, you can choose the duration of your commitment and can cancel at any time."
                  },
                  {
                    question: "Is my sponsorship tax-deductible?",
                    answer: "Yes, your sponsorship contributions are tax-deductible as allowed by law. You will receive an annual receipt for your donations for tax purposes."
                  },
                  {
                    question: "Can I visit my sponsored child?",
                    answer: "We occasionally organize sponsor visits to our program locations. These visits are carefully planned to ensure they're beneficial for both sponsors and children. Contact us for more information about upcoming opportunities."
                  },
                  {
                    question: "What happens if I need to stop my sponsorship?",
                    answer: "We understand that circumstances change. If you need to end your sponsorship, please contact us as soon as possible so we can find a new sponsor for the child. Your contributions until that point will still have made a significant difference."
                  },
                  {
                    question: "How do you select children for the sponsorship program?",
                    answer: "We work with local community leaders and organizations to identify orphaned children who are most in need of support. We assess their family situation, current living conditions, and access to education and healthcare."
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
                  If you have additional questions about our orphan sponsorship program, please don't 
                  hesitate to contact us. Our team is here to help.
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
                <button
                  onClick={handleSponsor}
                  className="bg-[#E5502A] text-white px-6 py-3 rounded-md font-medium hover:bg-[#E5502A]/90 transition-colors"
                >
                  Sponsor an Orphan ($30/month)
                </button>
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
              How Orphan Sponsorship Works
            </h2>
            
            <p className="text-gray-700 text-center mb-12">
              Our orphan sponsorship program is designed to be simple, transparent, and impactful.
            </p>
            
            <div className="space-y-12">
              {[
                {
                  step: "1",
                  title: "Choose to Sponsor",
                  description: "Start by clicking the 'Sponsor an Orphan' button and setting up your monthly contribution of $30.",
                  icon: <Heart className="w-6 h-6 text-white" />
                },
                {
                  step: "2",
                  title: "Child Assignment",
                  description: "We'll match you with a specific orphaned child who will benefit from your support.",
                  icon: <Users className="w-6 h-6 text-white" />
                },
                {
                  step: "3",
                  title: "Receive Updates",
                  description: "You'll receive regular updates about your sponsored child's well-being, education, and development.",
                  icon: <Calendar className="w-6 h-6 text-white" />
                },
                {
                  step: "4",
                  title: "Ongoing Support",
                  description: "Your monthly contribution provides continuous, reliable support that helps your sponsored child thrive.",
                  icon: <CheckCircle2 className="w-6 h-6 text-white" />
                }
              ].map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#E5502A] rounded-full flex items-center justify-center">
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
              <button
                onClick={handleSponsor}
                className="bg-[#E5502A] text-white px-6 py-3 rounded-md font-medium hover:bg-[#E5502A]/90 transition-colors"
              >
                Begin Your Sponsorship Journey
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#E5502A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">
              Change a Life Today
            </h2>
            <p className="text-white/80 mb-8">
              Your $30 monthly sponsorship gives an orphaned child the essentials they need to thrive: 
              food, shelter, healthcare, education, and hope for a brighter future.
            </p>
            <button
              onClick={handleSponsor}
              className="bg-white text-[#E5502A] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Sponsor an Orphan Now
            </button>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
}

export default function OrphanSponsorship() {
  return (
    <DonationProvider>
      <OrphanSponsorshipContent />
    </DonationProvider>
  );
}