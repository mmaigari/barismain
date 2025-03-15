"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, GraduationCap, BookOpen, School, PenTool, HelpCircle, CheckCircle2, Heart } from 'lucide-react';
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

function StudentSponsorshipContent() {
  const [authModal, setAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const { currentModal, setCurrentModal, setProgramName, setDonationAmount } = useDonation();

  // Handle sponsorship selection for primary school
  const handleSponsorPrimary = () => {
    setProgramName("Orphan Student Sponsorship - Primary School");
    setDonationAmount(50); // Fixed amount for primary school sponsorship
    
    // Store donation details for fixed amount flow
    localStorage.setItem("donationType", "fixed");
    localStorage.setItem("fixedAmount", "50");
    localStorage.setItem("programType", "sponsorship");
    localStorage.setItem("isRecurring", "true"); // Sponsorships are recurring monthly
    localStorage.setItem("programTitle", "Primary School Sponsorship");
    localStorage.setItem("programDescription", "Monthly sponsorship for an orphaned primary school student's education.");
    localStorage.setItem("unitLabel", "students");
    
    // Set the current modal to quantity selection instead of donation options
    setCurrentModal('quantityOptions');
  };

  // Handle sponsorship selection for secondary school
  const handleSponsorSecondary = () => {
    setProgramName("Orphan Student Sponsorship - Secondary School");
    setDonationAmount(65); // Fixed amount for secondary school sponsorship
    
    // Store donation details for fixed amount flow
    localStorage.setItem("donationType", "fixed");
    localStorage.setItem("fixedAmount", "65");
    localStorage.setItem("programType", "sponsorship");
    localStorage.setItem("isRecurring", "true"); // Sponsorships are recurring monthly
    localStorage.setItem("programTitle", "Secondary School Sponsorship");
    localStorage.setItem("programDescription", "Monthly sponsorship for an orphaned secondary school student's education.");
    localStorage.setItem("unitLabel", "students");
    
    // Set the current modal to quantity selection instead of donation options
    setCurrentModal('quantityOptions');
  };

  // Handle custom donation
  const handleCustomDonate = () => {
    setProgramName("Orphan Student Support");
    
    // Use donationOptions modal to let user choose their own amount
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
      {currentModal === 'quantityOptions' && <QuantityOptionsModal />}
      
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
            <Link href="/programs/sponsorship" className="hover:text-[#09869a]">
              Sponsorship
            </Link>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-[#2A88E5] font-medium">Student Sponsorship</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#2A88E5]/10 text-[#2A88E5] mb-4">
                <GraduationCap className="w-4 h-4 mr-2" />
                Educational Support
              </div>
              
              <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Orphan Student Sponsorship Program
              </h1>
              
              <p className="text-gray-700 text-lg mb-6">
                Help orphaned children access quality education through our dedicated student sponsorship program. 
                Your support covers school fees, educational materials, uniforms, and other academic needs.
              </p>
              
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleSponsorPrimary}
                  className="bg-[#2A88E5] text-white px-6 py-3 rounded-md font-medium hover:bg-[#2A88E5]/90 transition-colors flex items-center"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Sponsor Primary School Student ($50/month)
                </button>
                
                <button
                  onClick={handleSponsorSecondary}
                  className="bg-[#2A88E5] text-white px-6 py-3 rounded-md font-medium hover:bg-[#2A88E5]/90 transition-colors flex items-center"
                >
                  <School className="w-5 h-5 mr-2" />
                  Sponsor Secondary School Student ($65/month)
                </button>
                
                {/* Add the new custom donation button */}
                <button
                  onClick={handleCustomDonate}
                  className="bg-white border-2 border-[#2A88E5] text-[#2A88E5] px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Make a Custom Donation
                </button>
                
                <a
                  href="#how-it-works"
                  className="text-[#09869a] flex items-center font-medium hover:underline mt-2"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  How Student Sponsorship Works
                </a>
              </div>
            </div>
            
            <div className="relative h-80 lg:h-96">
              <Image
                src="/sponsorships/student.png"
                alt="Orphan Student Sponsorship"
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
                    ? 'border-[#2A88E5] text-[#2A88E5]'
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
                About Student Sponsorship
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Our Orphan Student Sponsorship program focuses specifically on educational support for orphaned 
                  children. Education is a powerful tool that can transform lives and create pathways out of poverty, 
                  which is why we've created dedicated sponsorship options for students at different levels.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                  <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#2A88E5]">
                    <div className="flex items-center mb-3">
                      <BookOpen className="w-6 h-6 text-[#2A88E5] mr-2" />
                      <h3 className="text-xl font-bold">Primary School</h3>
                    </div>
                    <p className="text-gray-700">
                      Monthly sponsorship: <span className="font-bold">$50</span>
                    </p>
                    <p className="mt-3">
                      Covers tuition fees, books, writing materials, uniforms, shoes, and basic school supplies for 
                      primary school students aged 5-12 years.
                    </p>
                    <button
                      onClick={handleSponsorPrimary}
                      className="mt-4 bg-[#2A88E5] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#2A88E5]/90 transition-colors"
                    >
                      Sponsor Now
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#2A88E5]">
                    <div className="flex items-center mb-3">
                      <School className="w-6 h-6 text-[#2A88E5] mr-2" />
                      <h3 className="text-xl font-bold">Secondary School</h3>
                    </div>
                    <p className="text-gray-700">
                      Monthly sponsorship: <span className="font-bold">$65</span>
                    </p>
                    <p className="mt-3">
                      Covers tuition fees, textbooks, lab materials, uniforms, transportation, and additional 
                      educational resources for secondary school students aged 13-18.
                    </p>
                    <button
                      onClick={handleSponsorSecondary}
                      className="mt-4 bg-[#2A88E5] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#2A88E5]/90 transition-colors"
                    >
                      Sponsor Now
                    </button>
                  </div>
                </div>
                
                <p>
                  Your sponsorship is a direct investment in a child's future. With your support, we can help orphaned 
                  children overcome the educational barriers they face and give them the tools they need to succeed.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">What Your Sponsorship Provides</h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#2A88E5] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">School Fees</strong>
                      <p className="mt-1">
                        Full coverage of tuition and registration fees at quality local schools.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#2A88E5] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">School Supplies</strong>
                      <p className="mt-1">
                        Books, notebooks, pens, pencils, backpacks, and other essential learning materials.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#2A88E5] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Uniforms</strong>
                      <p className="mt-1">
                        School uniforms, shoes, and appropriate clothing for all seasons.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#2A88E5] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Transportation</strong>
                      <p className="mt-1">
                        Safe transportation to and from school for children living far from educational facilities.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#2A88E5] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Academic Support</strong>
                      <p className="mt-1">
                        Additional tutoring, homework help, and educational guidance when needed.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#2A88E5] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Examination Fees</strong>
                      <p className="mt-1">
                        Coverage for all required tests and examination fees.
                      </p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8 p-5 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Academic Progress Reports</h3>
                  <p>
                    As a sponsor, you'll receive regular updates on your sponsored student's academic progress, 
                    including report cards, achievements, challenges, and growth. This keeps you connected to 
                    the real impact your support is making.
                  </p>
                </div>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSponsorPrimary}
                  className="bg-[#2A88E5] text-white px-6 py-3 rounded-md font-medium hover:bg-[#2A88E5]/90 transition-colors flex items-center justify-center"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Sponsor Primary Student ($50/month)
                </button>
                
                <button
                  onClick={handleSponsorSecondary}
                  className="bg-[#2A88E5]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#2A88E5]/70 transition-colors flex items-center justify-center"
                >
                  <School className="w-5 h-5 mr-2" />
                  Sponsor Secondary Student ($65/month)
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
                The Impact of Educational Sponsorship
              </h2>
              
              <p className="text-lg text-gray-700 mb-10">
                When you sponsor a student's education, you're not just paying for school fees—you're 
                transforming their entire future. Here's how your support creates lasting change:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/sponsorships/student-impact-1.jpg"
                    alt="Academic Achievement"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Academic Achievement</h3>
                  <p className="text-gray-700">
                    Our sponsored students consistently show improved academic performance. With proper 
                    educational materials and support, they can focus on learning instead of worrying about 
                    basic needs. Many have gone on to score in the top percentiles of their classes.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="order-2 md:order-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Higher Education Access</h3>
                  <p className="text-gray-700">
                    With a solid educational foundation, sponsored students have greater opportunities to 
                    pursue higher education. Several of our former sponsored students have gone on to 
                    universities, vocational training, and professional certification programs.
                  </p>
                </div>
                
                <div className="relative h-64 rounded-xl overflow-hidden order-1 md:order-2">
                  <Image
                    src="/sponsorships/student-impact-2.jpg"
                    alt="Higher Education"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/sponsorships/student-impact-3.jpg"
                    alt="Career Opportunities"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Career Opportunities</h3>
                  <p className="text-gray-700">
                    Education opens doors to meaningful employment and financial independence. Sponsored 
                    students have greater earning potential and more career options, breaking the cycle of 
                    poverty for themselves and future generations.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-[#2A88E5]/5 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Student Success Stories</h3>
                <div className="space-y-4">
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "I never thought I could finish school after losing my parents. The sponsorship program 
                      provided everything I needed—books, uniforms, and even extra tutoring. Now I'm studying 
                      computer science at university and hope to use technology to improve healthcare in my community."
                    </p>
                    <p className="font-medium text-[#2A88E5]">— Fatima, Former Sponsored Student</p>
                  </div>
                  
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "Being sponsored through secondary school changed everything for me. My sponsor's support 
                      meant I could focus on my studies instead of worrying about fees or supplies. I graduated 
                      with honors and am now training to become a teacher so I can give back to other children."
                    </p>
                    <p className="font-medium text-[#2A88E5]">— Mohammed, Former Sponsored Student</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleSponsorPrimary}
                    className="bg-[#2A88E5] text-white px-6 py-3 rounded-md font-medium hover:bg-[#2A88E5]/90 transition-colors"
                  >
                    Sponsor Primary Student ($50/month)
                  </button>
                  
                  <button
                    onClick={handleSponsorSecondary}
                    className="bg-[#2A88E5]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#2A88E5]/70 transition-colors"
                  >
                    Sponsor Secondary Student ($65/month)
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
                    question: "What's the difference between primary and secondary school sponsorship?",
                    answer: "Primary school sponsorship ($50/month) covers educational needs for children aged 5-12 in elementary education. Secondary school sponsorship ($65/month) supports students aged 13-18 in higher grades with more advanced educational materials and requirements."
                  },
                  {
                    question: "Why does secondary school sponsorship cost more?",
                    answer: "Secondary education involves higher tuition fees, more expensive textbooks, specialized materials for subjects like sciences, often greater transportation costs, and additional educational resources needed for more complex subjects and exam preparation."
                  },
                  {
                    question: "Can I communicate with my sponsored student?",
                    answer: "Yes, we facilitate exchange of letters and updates between sponsors and students. This communication is meaningful for both the student and sponsor, creating a connection that goes beyond financial support."
                  },
                  {
                    question: "How long does the sponsorship commitment last?",
                    answer: "While we encourage sponsors to support a student through their entire educational journey, we understand that circumstances change. You can sponsor on a yearly basis with the option to renew, or commit to the full duration of the student's primary or secondary education."
                  },
                  {
                    question: "Can I sponsor a student with specific interests or in a specific region?",
                    answer: "We do our best to match sponsors with students based on preferences when possible. Please note your preferences when signing up, and we'll try to accommodate them while prioritizing students with the most urgent needs."
                  },
                  {
                    question: "How do you select students for the sponsorship program?",
                    answer: "We work with local schools and community organizations to identify orphaned children with academic potential who lack the financial means to continue their education. We assess their family situation, academic records, and the level of need."
                  },
                  {
                    question: "What happens after my sponsored student completes their education?",
                    answer: "When your sponsored student completes their education level, you'll have the option to continue supporting them at the next level (e.g., from primary to secondary, or secondary to vocational/university) or to sponsor another student in need."
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
                  If you have additional questions about our student sponsorship program, please don't 
                  hesitate to contact us. Our team is here to help you understand how your support makes a difference.
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
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleSponsorPrimary}
                    className="bg-[#2A88E5] text-white px-6 py-3 rounded-md font-medium hover:bg-[#2A88E5]/90 transition-colors"
                  >
                    Sponsor Primary Student ($50/month)
                  </button>
                  
                  <button
                    onClick={handleSponsorSecondary}
                    className="bg-[#2A88E5]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#2A88E5]/70 transition-colors"
                  >
                    Sponsor Secondary Student ($65/month)
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
              How Student Sponsorship Works
            </h2>
            
            <p className="text-gray-700 text-center mb-12">
              Our student sponsorship program is designed to be transparent, impactful, and meaningful for both sponsors and students.
            </p>
            
            <div className="space-y-12">
              {[
                {
                  step: "1",
                  title: "Choose Your Sponsorship Level",
                  description: "Select either primary school sponsorship ($50/month) or secondary school sponsorship ($65/month) based on your preference.",
                  icon: <GraduationCap className="w-6 h-6 text-white" />
                },
                {
                  step: "2",
                  title: "Student Matching",
                  description: "We match you with a student whose educational needs align with your sponsorship level.",
                  icon: <PenTool className="w-6 h-6 text-white" />
                },
                {
                  step: "3",
                  title: "Support Implementation",
                  description: "Your sponsorship is put to work immediately, covering tuition, supplies, uniforms, and other educational needs.",
                  icon: <BookOpen className="w-6 h-6 text-white" />
                },
                {
                  step: "4",
                  title: "Updates and Connection",
                  description: "Receive regular updates, academic reports, and correspondence from your sponsored student.",
                  icon: <School className="w-6 h-6 text-white" />
                }
              ].map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#2A88E5] rounded-full flex items-center justify-center">
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleSponsorPrimary}
                  className="bg-[#2A88E5] text-white px-6 py-3 rounded-md font-medium hover:bg-[#2A88E5]/90 transition-colors"
                >
                  Sponsor Primary Student
                </button>
                
                <button
                  onClick={handleSponsorSecondary}
                  className="bg-[#2A88E5]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#2A88E5]/70 transition-colors"
                >
                  Sponsor Secondary Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#2A88E5] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">
              Invest in a Child's Future Today
            </h2>
            <p className="text-white/80 mb-8">
              Your monthly sponsorship provides an orphaned child with the education they need to build a brighter future. 
              Choose the sponsorship level that works for you and start making a difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSponsorPrimary}
                className="bg-white text-[#2A88E5] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Primary: $50/month
              </button>
              
              <button
                onClick={handleSponsorSecondary}
                className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <School className="w-5 h-5 mr-2" />
                Secondary: $65/month
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function StudentSponsorshipPage() {
  return (
    <DonationProvider>
      <StudentSponsorshipContent />
      <Toaster />
    </DonationProvider>
  );
}