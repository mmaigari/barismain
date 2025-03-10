"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, BookOpen, Users, CheckCircle2, FileText, School } from 'lucide-react';
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

function EducationSupportContent() {
  const [authModal, setAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const { currentModal, setCurrentModal, setProgramName, setDonationAmount } = useDonation();

  // Handle donation
  const handleDonate = () => {
    setProgramName("Education Support");
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
            <span className="text-[#4B6CB7] font-medium">Education Support</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#4B6CB7]/10 text-[#4B6CB7] mb-4">
                <BookOpen className="w-4 h-4 mr-2" />
                Education Program
              </div>
              
              <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Education Support Program
              </h1>
              
              <p className="text-gray-700 text-lg mb-6">
                Our Education Support program provides comprehensive assistance to improve educational 
                outcomes in underserved communities through teacher training, educational resources, 
                and infrastructure improvements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDonate}
                  className="bg-[#4B6CB7] text-white px-6 py-3 rounded-md font-medium hover:bg-[#4B6CB7]/90 transition-colors"
                >
                  Donate Now
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
                src="/education/education-support-hero.jpg"
                alt="Education Support"
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
                    ? 'border-[#4B6CB7] text-[#4B6CB7]'
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
                About Our Education Support Program
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Our Education Support program is designed to address the comprehensive needs of educational 
                  systems in underserved communities. We believe that quality education requires more than 
                  just buildings and books—it needs well-trained teachers, appropriate learning materials, 
                  and supportive educational environments.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Program Components</h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#4B6CB7] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Teacher Training and Development</strong>
                      <p className="mt-1">
                        We provide professional development opportunities for teachers to enhance their teaching 
                        methodologies, subject knowledge, and classroom management skills.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#4B6CB7] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Educational Resources</strong>
                      <p className="mt-1">
                        We supply textbooks, workbooks, teaching aids, and other learning materials to schools 
                        lacking essential educational resources.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#4B6CB7] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Curriculum Enhancement</strong>
                      <p className="mt-1">
                        We work with local education authorities to develop and implement improved curricula 
                        that are relevant to students' needs and contexts.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#4B6CB7] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Basic Infrastructure Support</strong>
                      <p className="mt-1">
                        We assist with minor repairs, furniture, and basic facilities to create conducive 
                        learning environments.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#4B6CB7] mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-gray-900">Community Involvement</strong>
                      <p className="mt-1">
                        We engage parents and community members in supporting education through parent-teacher 
                        associations and community education committees.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl border-t-4 border-[#4B6CB7]">
                    <div className="w-12 h-12 bg-[#4B6CB7]/10 rounded-full flex items-center justify-center mb-4">
                      <School className="w-6 h-6 text-[#4B6CB7]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">25+</h3>
                    <p className="text-gray-600">Schools Supported</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border-t-4 border-[#4B6CB7]">
                    <div className="w-12 h-12 bg-[#4B6CB7]/10 rounded-full flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-[#4B6CB7]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">200+</h3>
                    <p className="text-gray-600">Teachers Trained</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border-t-4 border-[#4B6CB7]">
                    <div className="w-12 h-12 bg-[#4B6CB7]/10 rounded-full flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-[#4B6CB7]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">10,000+</h3>
                    <p className="text-gray-600">Educational Materials Distributed</p>
                  </div>
                </div>
                <div className="mt-10">
                  <button
                    onClick={handleDonate}
                    className="bg-[#4B6CB7] text-white px-6 py-3 rounded-md font-medium hover:bg-[#4B6CB7]/90 transition-colors"
                  >
                    Support Education
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
                Our Impact
              </h2>
              
              <p className="text-lg text-gray-700 mb-10">
                Our Education Support program has made significant improvements in educational outcomes 
                across multiple communities. Here are some of the key impacts we've achieved:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/education/teacher-training.jpg"
                    alt="Teacher Training"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Improved Teaching Quality</h3>
                  <p className="text-gray-700">
                    Through our teacher training programs, 84% of participating teachers reported 
                    improved confidence in their teaching methods and subject knowledge. Classroom 
                    observations have shown significant improvements in student engagement and 
                    learning outcomes.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="order-2 md:order-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Enhanced Learning Resources</h3>
                  <p className="text-gray-700">
                    Schools that received our educational materials saw a 35% increase in student academic 
                    performance across core subjects. Access to quality textbooks and learning materials 
                    has significantly improved student engagement and comprehension.
                  </p>
                </div>
                
                <div className="relative h-64 rounded-xl overflow-hidden order-1 md:order-2">
                  <Image
                    src="/education/learning-resources.jpg"
                    alt="Learning Resources"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/education/community-involvement.jpg"
                    alt="Community Involvement"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Greater Community Participation</h3>
                  <p className="text-gray-700">
                    Parent and community involvement in supported schools increased by 60%, resulting in 
                    better school governance, resource mobilization, and overall support for education. 
                    School attendance rates have improved as communities place higher value on education.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-[#4B6CB7]/5 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Testimonials</h3>
                <div className="space-y-4">
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "The teacher training program has completely transformed my approach to teaching. 
                      I now have more effective strategies to engage my students and address their 
                      different learning needs. My students are more enthusiastic and their grades 
                      have improved significantly."
                    </p>
                    <p className="font-medium text-[#4B6CB7]">— Aisha, Primary School Teacher</p>
                  </div>
                  
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "Before this program, our school had very few textbooks and teaching materials. 
                      Students had to share books, making homework difficult. Now each child has access 
                      to their own textbooks, and we have teaching aids that make learning more interactive 
                      and enjoyable."
                    </p>
                    <p className="font-medium text-[#4B6CB7]">— Ibrahim, School Principal</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <button
                  onClick={handleDonate}
                  className="bg-[#4B6CB7] text-white px-6 py-3 rounded-md font-medium hover:bg-[#4B6CB7]/90 transition-colors"
                >
                  Support Our Work
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
                    question: "How does my donation help the Education Support Program?",
                    answer: "Your donation directly funds teacher training workshops, purchase of educational materials, curriculum development, and basic infrastructure improvements in schools. We ensure that funds are allocated based on needs assessment to maximize impact."
                  },
                  {
                    question: "Which regions benefit from this program?",
                    answer: "We currently focus on underserved communities in West Africa, particularly in rural areas where educational resources are limited. As funding grows, we plan to expand to more regions based on needs assessment."
                  },
                  {
                    question: "How do you select which schools to support?",
                    answer: "We work with local education authorities to identify schools with the greatest needs. Our selection criteria include the level of existing resources, student-to-teacher ratios, infrastructure needs, and community commitment to education."
                  },
                  {
                    question: "Can I donate to support a specific aspect of the program?",
                    answer: "Yes, you can specify if you'd like your donation to go toward teacher training, educational materials, or infrastructure support. Just include a note with your donation specifying your preference."
                  },
                  {
                    question: "How do you measure the success of this program?",
                    answer: "We track multiple metrics including student academic performance, teacher effectiveness, student attendance and retention rates, community involvement, and overall school environment. We conduct regular evaluations and share results with our donors."
                  },
                  {
                    question: "Do you work with local governments and education authorities?",
                    answer: "Yes, we collaborate closely with local education authorities to ensure our programs align with national curricula and educational policies. This partnership ensures sustainability and integration of our support into the broader education system."
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
                  If you have additional questions about our Education Support program, please don't 
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
                  onClick={handleDonate}
                  className="bg-[#4B6CB7] text-white px-6 py-3 rounded-md font-medium hover:bg-[#4B6CB7]/90 transition-colors"
                >
                  Support Education
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
              How Our Education Support Works
            </h2>
            
            <p className="text-gray-700 text-center mb-12">
              Our comprehensive approach ensures that your donation creates lasting impact in education.
            </p>
            
            <div className="space-y-12">
              {[
                {
                  step: "1",
                  title: "Needs Assessment",
                  description: "We work with local communities and education authorities to identify specific educational needs and challenges.",
                  icon: <FileText className="w-6 h-6 text-white" />
                },
                {
                  step: "2",
                  title: "Program Design",
                  description: "Based on assessment results, we develop tailored intervention programs focusing on teacher training, educational resources, or infrastructure needs.",
                  icon: <BookOpen className="w-6 h-6 text-white" />
                },
                {
                  step: "3",
                  title: "Implementation",
                  description: "We execute the planned interventions, working closely with school administration, teachers, and community members.",
                  icon: <Users className="w-6 h-6 text-white" />
                },
                {
                  step: "4",
                  title: "Monitoring & Evaluation",
                  description: "We continuously monitor progress and conduct evaluations to measure impact and make necessary adjustments.",
                  icon: <CheckCircle2 className="w-6 h-6 text-white" />
                }
              ].map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#4B6CB7] rounded-full flex items-center justify-center">
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
                onClick={handleDonate}
                className="bg-[#4B6CB7] text-white px-8 py-3 rounded-md font-medium hover:bg-[#4B6CB7]/90 transition-colors"
              >
                Support Education
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#4B6CB7] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">
              Make a Difference in Education Today
            </h2>
            <p className="text-white/80 mb-8">
              Your support can help improve educational quality for thousands of students. Join us in our mission 
              to create better learning environments and opportunities for children in underserved communities.
            </p>
            <button
              onClick={handleDonate}
              className="bg-white text-[#4B6CB7] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Donate Now
            </button>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
}

export default function EducationSupport() {
  return (
    <DonationProvider>
      <EducationSupportContent />
    </DonationProvider>
  );
}