"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, Building2, Hammer, CheckCircle2, Ruler, Users, School, Heart } from 'lucide-react';
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

function RenovationProjectsContent() {
  const [authModal, setAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const { currentModal, setCurrentModal, setProgramName, setDonationAmount } = useDonation();

  // Handle general donation
  const handleDonate = () => {
    setProgramName("School Renovation Projects");
    setCurrentModal('donationOptions');
  };
  
  // Handle classroom renovation donation
  const handleDonateClassroom = () => {
    setProgramName("Classroom Renovation");
    setDonationAmount(2000); // Cost for one classroom renovation
    
    // Store donation details for fixed amount flow
    localStorage.setItem("donationType", "fixed");
    localStorage.setItem("fixedAmount", "2000");
    localStorage.setItem("programType", "education");
    localStorage.setItem("isRecurring", "false"); // One-time donation
    localStorage.setItem("programTitle", "Classroom Renovation");
    localStorage.setItem("programDescription", "Renovate a classroom to create a better learning environment.");
    localStorage.setItem("unitLabel", "classrooms");
    
    // Set the current modal to quantity selection
    setCurrentModal('quantityOptions');
  };
  
  // Handle furniture set donation
  const handleDonateFurniture = () => {
    setProgramName("School Furniture Set");
    setDonationAmount(500); // Cost for one furniture set
    
    // Store donation details for fixed amount flow
    localStorage.setItem("donationType", "fixed");
    localStorage.setItem("fixedAmount", "500");
    localStorage.setItem("programType", "education");
    localStorage.setItem("isRecurring", "false"); // One-time donation
    localStorage.setItem("programTitle", "School Furniture Set");
    localStorage.setItem("programDescription", "Provide desks and chairs for a classroom of students.");
    localStorage.setItem("unitLabel", "sets");
    
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
            <span className="text-[#7367F0] font-medium">School Renovation</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#7367F0]/10 text-[#7367F0] mb-4">
                <Building2 className="w-4 h-4 mr-2" />
                Education Program
              </div>
              
              <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                School Renovation Projects
              </h1>
              
              <p className="text-gray-700 text-lg mb-6">
                Our School Renovation Projects improve learning environments by repairing and upgrading 
                school buildings and classrooms, providing quality furniture, and creating safe, conducive 
                spaces for education.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDonateClassroom}
                  className="bg-[#E32613] text-white px-6 py-3 rounded-md font-medium hover:bg-[#7367F0]/90 transition-colors flex items-center justify-center"
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  Classroom ($2,000)
                </button>
                <button
                  onClick={handleDonateFurniture}
                  className="bg-[#E32613]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#7367F0]/70 transition-colors flex items-center justify-center"
                >
                  <School className="w-5 h-5 mr-2" />
                  Furniture ($500)
                </button>
                
                {/* Add this new general donation button */}
                <button
                  onClick={handleDonate}
                  className="bg-white border-2 border-[#E32613] text-[#7367F0] px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
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
                src="/education/renovation.png"
                alt="School Renovation"
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
                    ? 'border-[#7367F0] text-[#7367F0]'
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
                About Our School Renovation Projects
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Many schools in underserved communities operate in buildings that are deteriorating, 
                  unsafe, or inadequate for effective learning. Damaged roofs, crumbling walls, 
                  insufficient lighting, lack of proper furniture, and overcrowded classrooms create 
                  challenging environments that hinder educational achievement.
                </p>
                
                <p className="mt-4">
                  Our School Renovation Projects address these infrastructure challenges by 
                  renovating classrooms, providing quality furniture, and creating safe, conducive 
                  learning environments where students can thrive. By improving physical spaces, 
                  we enhance the overall educational experience and outcomes.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Program Components</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center">
                      <Building2 className="w-5 h-5 text-[#7367F0] mr-2" />
                      Classroom Renovation ($2,000)
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Full repairs of walls, floors, and ceilings</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Windows and door replacements or repairs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Fresh paint and improved aesthetics</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Basic electrical and lighting upgrades</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Chalkboard or whiteboard installation</span>
                      </li>
                    </ul>
                    <div className="mt-6 text-center">
                      <button
                        onClick={handleDonateClassroom}
                        className="bg-[#7367F0] text-white px-6 py-2 rounded-md font-medium hover:bg-[#7367F0]/90 transition-colors"
                      >
                        Renovate a Classroom
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center">
                      <School className="w-5 h-5 text-[#7367F0] mr-2" />
                      Classroom Furniture Set ($500)
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Desks and chairs for 25-30 students</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Teacher's desk and chair</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Storage cabinet for classroom materials</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Locally made, durable furniture</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                        <span>Supports local craftsmen and businesses</span>
                      </li>
                    </ul>
                    <div className="mt-6 text-center">
                      <button
                        onClick={handleDonateFurniture}
                        className="bg-[#7367F0] text-white px-6 py-2 rounded-md font-medium hover:bg-[#7367F0]/90 transition-colors"
                      >
                        Donate Furniture
                      </button>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Why School Infrastructure Matters</h3>
                
                <p>
                  The physical learning environment has a direct impact on educational outcomes. Research shows 
                  that students in well-maintained, properly equipped classrooms demonstrate better attendance, 
                  higher engagement, and improved academic performance. A conducive learning environment:
                </p>
                
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Enhances student concentration and reduces distractions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Improves teacher morale and teaching effectiveness</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Creates safer spaces that protect children from environmental hazards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Signals to students that their education and well-being are valued</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#7367F0] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Encourages community pride and involvement in education</span>
                  </li>
                </ul>
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
                The Impact of School Renovation
              </h2>
              
              <p className="text-lg text-gray-700 mb-10">
                Our School Renovation Projects have transformed educational spaces across multiple 
                communities. Here's how improved infrastructure is making a difference:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/education/renovation-attendance.jpg"
                    alt="Improved Attendance"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Increased Attendance</h3>
                  <p className="text-gray-700">
                    Schools with renovated classrooms report a significant increase in student attendance, 
                    with an average improvement of 24%. Students are more motivated to attend classes in 
                    safe, comfortable environments, and parents are more confident sending their children 
                    to well-maintained facilities.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="order-2 md:order-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Enhanced Learning Outcomes</h3>
                  <p className="text-gray-700">
                    Properly equipped classrooms with adequate furniture allow students to focus on learning 
                    rather than physical discomfort. Teachers report that students in renovated classrooms 
                    show 30% higher engagement levels and improved academic performance across all subjects, 
                    particularly in reading and mathematics.
                  </p>
                </div>
                
                <div className="relative h-64 rounded-xl overflow-hidden order-1 md:order-2">
                  <Image
                    src="/education/renovation-learning.jpg"
                    alt="Enhanced Learning"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/education/renovation-community.jpg"
                    alt="Community Pride"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Community Pride and Involvement</h3>
                  <p className="text-gray-700">
                    Renovated schools become a source of community pride. We've seen a 45% increase in 
                    parent-teacher association membership and community volunteering in schools that have 
                    undergone renovation. Parents and community members are more likely to engage in school 
                    activities when they see external investment in their children's education.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-[#7367F0]/5 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Before & After Testimonials</h3>
                <div className="space-y-4">
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "Before the renovation, our classroom roof leaked during the rainy season, and 
                      many students had to sit on the floor due to lack of furniture. Now, we have a 
                      beautiful classroom with proper desks for everyone. Students are excited to come 
                      to school, and I can teach more effectively."
                    </p>
                    <p className="font-medium text-[#7367F0]">— Mr. Ibrahim, Primary School Teacher</p>
                  </div>
                  
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "Having my own desk and chair has made a huge difference in how I learn. 
                      Before, I would get backaches from sitting on the floor or sharing a broken bench 
                      with three other students. Now I can write properly and focus on the lessons instead 
                      of being uncomfortable."
                    </p>
                    <p className="font-medium text-[#7367F0]">— Halima, 12-year-old student</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={handleDonateClassroom}
                    className="bg-[#7367F0] text-white px-6 py-3 rounded-md font-medium hover:bg-[#7367F0]/90 transition-colors"
                  >
                    Renovate a Classroom ($2,000)
                  </button>
                  <button
                    onClick={handleDonateFurniture}
                    className="bg-[#7367F0]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#7367F0]/70 transition-colors"
                  >
                    Donate Furniture ($500)
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
                    question: "What types of renovations are included in a classroom renovation?",
                    answer: "A classroom renovation ($2,000) typically includes repairs to walls, floors, and ceilings; window and door replacements or repairs; fresh paint; lighting improvements; electrical upgrades where necessary; and installation of proper chalkboards or whiteboards. We assess each classroom individually and focus on the most critical needs within the budget."
                  },
                  {
                    question: "What is included in a furniture donation?",
                    answer: "A classroom furniture set ($500) provides desks and chairs for 25-30 students, a teacher's desk and chair, and a storage cabinet for classroom materials. All furniture is locally sourced and made with durable materials designed to withstand many years of use. By working with local craftsmen, we also support the local economy."
                  },
                  {
                    question: "How do you select which schools receive renovations?",
                    answer: "We prioritize schools with critical infrastructure needs that serve underprivileged communities. Factors we consider include the physical condition of buildings, overcrowding, lack of furniture, safety concerns, and the school's commitment to maintaining improvements. We work with local education authorities and community leaders to identify the schools with the greatest need."
                  },
                  {
                    question: "How long does a renovation project take?",
                    answer: "The timeline varies based on the scope of work, but most classroom renovations are completed within 4-6 weeks. Furniture production and delivery typically takes 3-4 weeks. We aim to schedule major renovations during school holidays to minimize disruption, but smaller improvements may be done during the school year with proper planning."
                  },
                  {
                    question: "Can I donate to renovate a specific school?",
                    answer: "Yes, if you have a specific school in mind, please contact us directly. We can assess the school's needs and provide a tailored renovation plan. We welcome partnerships with donors who have connections to particular communities or schools and will work with you to ensure your donation makes the maximum impact."
                  },
                  {
                    question: "How do you ensure the renovations are maintained?",
                    answer: "Sustainability is a key component of our approach. Before starting any renovation, we establish maintenance agreements with school administrators and local education authorities. We also provide basic maintenance training and sometimes establish small maintenance funds. We conduct follow-up visits to ensure renovations are properly maintained and address any issues that arise."
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
                  If you have additional questions about our School Renovation Projects, please don't 
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
                    onClick={handleDonateClassroom}
                    className="bg-[#7367F0] text-white px-6 py-3 rounded-md font-medium hover:bg-[#7367F0]/90 transition-colors"
                  >
                    Renovate a Classroom ($2,000)
                  </button>
                  <button
                    onClick={handleDonateFurniture}
                    className="bg-[#7367F0]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#7367F0]/70 transition-colors"
                  >
                    Donate Furniture ($500)
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
              How Our School Renovation Process Works
            </h2>
            
            <p className="text-gray-700 text-center mb-12">
              From your donation to a renovated classroom, here's how the process works:
            </p>
            
            <div className="space-y-12">
              {[
                {
                  step: "1",
                  title: "Your Donation",
                  description: "You donate either a classroom renovation ($2,000) or a furniture set ($500), providing the funds needed for materials and labor.",
                  icon: <Building2 className="w-6 h-6 text-white" />
                },
                {
                  step: "2",
                  title: "Assessment & Planning",
                  description: "Our team assesses the school's needs and creates a detailed renovation plan, working closely with school administrators and local craftsmen.",
                  icon: <Ruler className="w-6 h-6 text-white" />
                },
                {
                  step: "3",
                  title: "Renovation & Furniture Production",
                  description: "Skilled local workers complete the renovations while local artisans craft durable school furniture, supporting the local economy.",
                  icon: <Hammer className="w-6 h-6 text-white" />
                },
                {
                  step: "4",
                  title: "Handover & Maintenance Training",
                  description: "We hand over the renovated spaces and furniture to the school, providing maintenance training and establishing sustainability plans.",
                  icon: <CheckCircle2 className="w-6 h-6 text-white" />
                }
              ].map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#7367F0] rounded-full flex items-center justify-center">
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
                  onClick={handleDonateClassroom}
                  className="bg-[#7367F0] text-white px-6 py-3 rounded-md font-medium hover:bg-[#7367F0]/90 transition-colors"
                >
                  Renovate a Classroom ($2,000)
                </button>
                <button
                  onClick={handleDonateFurniture}
                  className="bg-[#7367F0]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#7367F0]/70 transition-colors"
                >
                  Donate Furniture ($500)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#7367F0] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">
              Transform Learning Environments
            </h2>
            <p className="text-white/80 mb-8">
              Your donation today can help create safe, comfortable, and conducive learning spaces for 
              thousands of students. Choose an option below to make a lasting impact on education.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleDonateClassroom}
                className="bg-white text-[#7367F0] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Renovate a Classroom ($2,000)
              </button>
              <button
                onClick={handleDonateFurniture}
                className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Donate Furniture ($500)
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
}

export default function RenovationProjects() {
  return (
    <DonationProvider>
      <RenovationProjectsContent />
    </DonationProvider>
  );
}