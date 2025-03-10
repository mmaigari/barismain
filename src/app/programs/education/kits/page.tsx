"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, PenTool, PackageOpen, Briefcase, CheckCircle2, Users } from 'lucide-react';
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

function SchoolKitsContent() {
  const [authModal, setAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const { currentModal, setCurrentModal, setProgramName, setDonationAmount } = useDonation();

  // Handle donation
  const handleDonate = () => {
    setProgramName("School Kits Distribution");
    setCurrentModal('donationOptions');
  };
  
  // Handle fixed-price kit donation
  const handleDonateKit = () => {
    setProgramName("School Kits Distribution");
    setDonationAmount(25); // Cost for one school kit
    
    // Store donation details for fixed amount flow
    localStorage.setItem("donationType", "fixed");
    localStorage.setItem("fixedAmount", "25");
    localStorage.setItem("programType", "education");
    localStorage.setItem("isRecurring", "false"); // One-time donation
    localStorage.setItem("programTitle", "School Kits Distribution");
    localStorage.setItem("programDescription", "Provide essential school supplies to students in need.");
    localStorage.setItem("unitLabel", "kits");
    
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
            <span className="text-[#FF9F43] font-medium">School Kits</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#FF9F43]/10 text-[#FF9F43] mb-4">
                <PenTool className="w-4 h-4 mr-2" />
                Education Program
              </div>
              
              <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                School Kits Distribution
              </h1>
              
              <p className="text-gray-700 text-lg mb-6">
                Our School Kits program provides essential educational supplies to students in need, 
                empowering them with the basic tools required for effective learning and academic success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDonateKit}
                  className="bg-[#FF9F43] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FF9F43]/90 transition-colors flex items-center justify-center"
                >
                  <PackageOpen className="w-5 h-5 mr-2" />
                  Donate a School Kit ($25)
                </button>
                <a
                  href="#how-it-works"
                  className="text-[#09869a] flex items-center font-medium hover:underline mt-2 sm:mt-0"
                >
                  Learn How It Works
                </a>
              </div>
            </div>
            
            <div className="relative h-80 lg:h-96">
              <Image
                src="/education/school-kits-hero.jpg"
                alt="School Kits Distribution"
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
                    ? 'border-[#FF9F43] text-[#FF9F43]'
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
                About Our School Kits Program
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  In many underserved communities, students lack basic school supplies such as notebooks, 
                  pencils, and backpacks. This shortage creates significant barriers to learning and can 
                  lead to decreased attendance and participation in school activities.
                </p>
                
                <p className="mt-4">
                  Our School Kits Distribution program addresses this challenge by providing comprehensive 
                  kits that contain all the essential supplies a student needs for effective learning. Each 
                  kit is carefully assembled to meet grade-specific needs and local educational requirements.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">What's Inside Each Kit?</h3>
                
                <div className="bg-gray-50 p-6 rounded-xl my-6">
                  <h4 className="font-bold text-lg mb-4">Each $25 School Kit contains:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#FF9F43] mr-3 flex-shrink-0 mt-0.5" />
                      <span>Durable backpack</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#FF9F43] mr-3 flex-shrink-0 mt-0.5" />
                      <span>5 notebooks or exercise books</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#FF9F43] mr-3 flex-shrink-0 mt-0.5" />
                      <span>10 pencils and 5 pens</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#FF9F43] mr-3 flex-shrink-0 mt-0.5" />
                      <span>Pencil sharpener and eraser</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#FF9F43] mr-3 flex-shrink-0 mt-0.5" />
                      <span>Ruler and geometry set (for older students)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#FF9F43] mr-3 flex-shrink-0 mt-0.5" />
                      <span>Coloring pencils or crayons</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#FF9F43] mr-3 flex-shrink-0 mt-0.5" />
                      <span>Age-appropriate reading book</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleDonateKit}
                      className="bg-[#FF9F43] text-white px-6 py-2 rounded-md font-medium hover:bg-[#FF9F43]/90 transition-colors"
                    >
                      Donate a Kit Now
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Distribution Approach</h3>
                
                <p>
                  We work with local schools and community organizations to identify students who lack essential 
                  school supplies. Our distribution events are typically held at the beginning of the school year 
                  to ensure students are prepared for their studies. We also conduct mid-year distributions to 
                  address ongoing needs.
                </p>
                
                <p className="mt-4">
                  To ensure sustainability and local ownership, we often partner with local businesses 
                  and community members who contribute to the program either through financial support 
                  or by volunteering during assembly and distribution events.
                </p>
              </div>
              
              <div className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl border-t-4 border-[#FF9F43]">
                    <div className="w-12 h-12 bg-[#FF9F43]/10 rounded-full flex items-center justify-center mb-4">
                      <PackageOpen className="w-6 h-6 text-[#FF9F43]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">5,000+</h3>
                    <p className="text-gray-600">School Kits Distributed</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border-t-4 border-[#FF9F43]">
                    <div className="w-12 h-12 bg-[#FF9F43]/10 rounded-full flex items-center justify-center mb-4">
                      <Briefcase className="w-6 h-6 text-[#FF9F43]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">50+</h3>
                    <p className="text-gray-600">Schools Supported</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border-t-4 border-[#FF9F43]">
                    <div className="w-12 h-12 bg-[#FF9F43]/10 rounded-full flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-[#FF9F43]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">15+</h3>
                    <p className="text-gray-600">Communities Reached</p>
                  </div>
                </div>
                
                <div className="mt-10">
                  <button
                    onClick={handleDonateKit}
                    className="bg-[#FF9F43] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FF9F43]/90 transition-colors"
                  >
                    Donate School Kits
                  </button>
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
                The Impact of School Kits
              </h2>
              
              <p className="text-lg text-gray-700 mb-10">
                Our School Kits Distribution program has made significant improvements in student 
                participation, attendance, and performance. Here's how your donation makes a difference:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/education/attendance-impact.jpg"
                    alt="Improved Attendance"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Improved Attendance</h3>
                  <p className="text-gray-700">
                    Schools that received our school kits reported a 27% increase in regular student 
                    attendance. Students are more motivated to attend school when they have the proper 
                    tools for learning, reducing the embarrassment and practical challenges of coming 
                    to class unprepared.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="order-2 md:order-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Enhanced Academic Performance</h3>
                  <p className="text-gray-700">
                    Teachers report that students with proper school supplies are more engaged in classroom 
                    activities and complete homework assignments at higher rates. This has led to measurable 
                    improvements in academic performance, with an average 22% increase in core subject scores.
                  </p>
                </div>
                
                <div className="relative h-64 rounded-xl overflow-hidden order-1 md:order-2">
                  <Image
                    src="/education/performance-impact.jpg"
                    alt="Academic Performance"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-[#FF9F43]/5 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Student Testimonials</h3>
                <div className="space-y-4">
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "Before I received my school kit, I often missed writing assignments because I didn't have 
                      a notebook. Now I can participate in all activities and my grades have improved. I feel 
                      proud to come to school with my new backpack and supplies."
                    </p>
                    <p className="font-medium text-[#FF9F43]">— Fatima, 3rd Grade Student</p>
                  </div>
                  
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "Having proper school supplies has made a big difference for me. I used to struggle in math 
                      class because I didn't have a ruler or compass, but now I can complete all the exercises. 
                      I'm even considering becoming a mathematics teacher one day!"
                    </p>
                    <p className="font-medium text-[#FF9F43]">— Hassan, 8th Grade Student</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <button
                  onClick={handleDonateKit}
                  className="bg-[#FF9F43] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FF9F43]/90 transition-colors"
                >
                  Donate School Kits
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
                    question: "Why does a school kit cost $25?",
                    answer: "Each school kit costs $25 to cover the expense of quality, durable supplies including a backpack, notebooks, writing instruments, and other grade-appropriate materials. This also includes the costs of assembly and distribution to remote communities."
                  },
                  {
                    question: "Can I donate multiple kits?",
                    answer: "Yes! When you click 'Donate a School Kit,' you'll have the option to select the quantity of kits you wish to donate. Every kit makes a difference in a child's education."
                  },
                  {
                    question: "How do you decide which students receive the kits?",
                    answer: "We work with local schools and community leaders to identify students with the greatest need. Our goal is to prioritize children from families with limited financial resources, orphans, and those at risk of dropping out due to lack of supplies."
                  },
                  {
                    question: "Are the school kits adapted for different age groups?",
                    answer: "Yes, we customize kits based on age groups: primary school kits (ages 5-11) and secondary school kits (ages 12-18). Each contains age-appropriate supplies, such as simpler materials for younger children and more advanced tools like geometry sets for older students."
                  },
                  {
                    question: "When do distributions take place?",
                    answer: "Our main distributions happen before the start of the school year (usually August/September), with additional distributions in January to replenish supplies. In emergency situations, we may conduct special distributions as needed."
                  },
                  {
                    question: "How do I know my donation is making an impact?",
                    answer: "We provide regular updates on our distribution events through our newsletter and social media. We also publish annual impact reports that detail the number of kits distributed, communities reached, and educational outcomes. Sign up for our newsletter to stay informed."
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
                  If you have additional questions about our School Kits Distribution program, please don't 
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
                <button
                  onClick={handleDonateKit}
                  className="bg-[#FF9F43] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FF9F43]/90 transition-colors"
                >
                  Donate School Kits
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
              How School Kit Distribution Works
            </h2>
            
            <p className="text-gray-700 text-center mb-12">
              From your donation to a child receiving their kit, here's how the process works:
            </p>
            
            <div className="space-y-12">
              {[
                {
                  step: "1",
                  title: "Your Donation",
                  description: "You donate one or more school kits at $25 each, providing the funds needed for supplies and distribution.",
                  icon: <PenTool className="w-6 h-6 text-white" />
                },
                {
                  step: "2",
                  title: "Kit Assembly",
                  description: "We purchase quality supplies in bulk and assemble complete kits with all necessary educational materials.",
                  icon: <PackageOpen className="w-6 h-6 text-white" />
                },
                {
                  step: "3",
                  title: "Needs Assessment",
                  description: "We work with local schools to identify students who lack essential school supplies.",
                  icon: <Users className="w-6 h-6 text-white" />
                },
                {
                  step: "4",
                  title: "Distribution Event",
                  description: "We distribute kits to students at local schools, ensuring they have the tools they need for successful learning.",
                  icon: <CheckCircle2 className="w-6 h-6 text-white" />
                }
              ].map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#FF9F43] rounded-full flex items-center justify-center">
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
                onClick={handleDonateKit}
                className="bg-[#FF9F43] text-white px-8 py-3 rounded-md font-medium hover:bg-[#FF9F43]/90 transition-colors"
              >
                Donate School Kits
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#FF9F43] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">
              Help a Child Succeed in School
            </h2>
            <p className="text-white/80 mb-8">
              For just $25, you can provide a student with essential school supplies that will help them 
              participate fully in their education. Your donation today can make a lasting impact on a 
              child's educational journey.
            </p>
            <button
              onClick={handleDonateKit}
              className="bg-white text-[#FF9F43] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Donate a School Kit
            </button>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
}

export default function SchoolKits() {
  return (
    <DonationProvider>
      <SchoolKitsContent />
    </DonationProvider>
  );
}