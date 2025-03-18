"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, Calculator, Heart, Coins, DollarSign, BookOpen, CheckCircle2 } from 'lucide-react';
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

function ZakatProgramContent() {
  const [authModal, setAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const { currentModal, setCurrentModal, setProgramName, setDonationAmount } = useDonation();

  // Handle general Zakat donation
  const handleDonateZakat = () => {
    setProgramName("Zakat Donation");
    
    // Store donation details for custom amount flow
    localStorage.setItem("donationType", "custom");
    localStorage.setItem("programType", "zakat");
    localStorage.setItem("isRecurring", "false"); // One-time donation
    localStorage.setItem("programTitle", "Zakat Donation");
    localStorage.setItem("programDescription", "Fulfill your Zakat obligation and help those in need.");
    
    // Set the current modal to donation options
    setCurrentModal('donationOptions');
  };
  
  // Handle Zakat al-Fitr donation
  const handleDonateZakatAlFitr = () => {
    setProgramName("Zakat al-Fitr");
    
    // Get current exchange rate from your app's state or context
    // Fix the type issue by ensuring we have a string before parsing
    const exchangeRateStr = localStorage.getItem("exchangeRate") || "1";
    const baseAmount = 15;
    const convertedAmount = baseAmount * parseFloat(exchangeRateStr);
    
    setDonationAmount(baseAmount); // Keep original amount for display
    
    // Store donation details with currency information
    localStorage.setItem("donationType", "fixed");
    localStorage.setItem("fixedAmount", baseAmount.toString());
    localStorage.setItem("fixedAmountNaira", convertedAmount.toString());
    localStorage.setItem("programType", "zakat");
    localStorage.setItem("isRecurring", "false"); // One-time donation
    localStorage.setItem("programTitle", "Zakat al-Fitr");
    localStorage.setItem("programDescription", "Provide Zakat al-Fitr for those in need.");
    localStorage.setItem("unitLabel", "persons");
    localStorage.setItem("currencyCode", "USD"); // Store original currency
    
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
            <span className="text-[#FFA500] font-medium">Zakat</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#FFA500]/10 text-[#FFA500] mb-4">
                <Calculator className="w-4 h-4 mr-2" />
                Islamic Obligation
              </div>
              
              <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Zakat & Financial Assistance
              </h1>
              
              <p className="text-gray-700 text-lg mb-6">
                Fulfill your Islamic obligation of Zakat through our trusted program that ensures 
                your donation reaches eligible recipients in accordance with Shariah principles. 
                Help purify your wealth and support those in need.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDonateZakat}
                  className="bg-[#FFA500] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFA500]/90 transition-colors flex items-center justify-center"
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Donate Zakat
                </button>
                <button
                  onClick={handleDonateZakatAlFitr}
                  className="bg-[#FFA500]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFA500]/70 transition-colors flex items-center justify-center"
                >
                  <Coins className="w-5 h-5 mr-2" />
                  Zakat al-Fitr ($15/person)
                </button>
              </div>
              <Link
                href="/programs/zakat/calculator"
                className="text-[#09869a] flex items-center font-medium hover:underline mt-4"
              >
                Calculate Your Zakat
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="relative h-80 lg:h-96">
              <Image
                src="/programs/zakar.png"
                alt="Zakat Distribution"
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
                    ? 'border-[#FFA500] text-[#FFA500]'
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
                About Zakat
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Zakat is one of the Five Pillars of Islam, a mandatory charitable contribution that purifies wealth 
                  and helps those in need. It is an obligation upon Muslims who possess wealth above a certain threshold (nisab) 
                  for one lunar year, typically requiring them to give 2.5% of their qualifying assets to specific 
                  categories of recipients mentioned in the Quran.
                </p>
                
                <blockquote className="border-l-4 border-[#FFA500] pl-4 italic my-6">
                  "And establish prayer and give zakat, and whatever good you put forward for yourselves - 
                  you will find it with Allah. Indeed, Allah of what you do, is Seeing." 
                  <span className="block mt-2 font-semibold not-italic">— Quran 2:110</span>
                </blockquote>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Who is Eligible to Receive Zakat?</h3>
                
                <p>
                  The Quran (9:60) clearly defines eight categories of people who are eligible to receive Zakat:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFA500] mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Fuqara (The Poor):</span>
                          <p className="mt-1">Those who lack basic necessities and live below the poverty line.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFA500] mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Masakeen (The Needy):</span>
                          <p className="mt-1">Those who have some means but not enough to meet their basic needs.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFA500] mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Amil' Zakat (Zakat Administrators):</span>
                          <p className="mt-1">Those who collect and distribute Zakat.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFA500] mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Mu'allaf (New Muslims/Those Inclined):</span>
                          <p className="mt-1">Recent converts to Islam or those whose hearts need to be reconciled.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFA500] mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Riqab (Those in Bondage):</span>
                          <p className="mt-1">Those in slavery or bondage (in modern context, victims of trafficking or oppression).</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFA500] mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Gharimun (Those in Debt):</span>
                          <p className="mt-1">People burdened with debts they cannot repay.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFA500] mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Fi Sabilillah (In the Cause of Allah):</span>
                          <p className="mt-1">Those striving in the path of Allah (education, healthcare, community services).</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-[#FFA500] mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Ibnus Sabil (The Traveler):</span>
                          <p className="mt-1">Travelers who are stranded or in need (includes refugees).</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">How We Distribute Your Zakat</h3>
                
                <div className="bg-[#FFA500]/5 p-6 rounded-xl my-6">
                  <h4 className="font-bold text-lg mb-4">Our Zakat Distribution Principles:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#FFA500] mr-3 flex-shrink-0 mt-0.5" />
                      <span>100% of your Zakat reaches eligible recipients - we use separate admin funds for operational costs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#FFA500] mr-3 flex-shrink-0 mt-0.5" />
                      <span>Rigorous verification process to ensure recipients meet Shariah criteria</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#FFA500] mr-3 flex-shrink-0 mt-0.5" />
                      <span>Priority to the most vulnerable cases with immediate needs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#FFA500] mr-3 flex-shrink-0 mt-0.5" />
                      <span>Transparent reporting on how funds are used</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#FFA500] mr-3 flex-shrink-0 mt-0.5" />
                      <span>Shariah council oversight to ensure compliance with Islamic principles</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 flex justify-center gap-4 flex-wrap">
                    <button
                      onClick={handleDonateZakat}
                      className="bg-[#FFA500] text-white px-6 py-2 rounded-md font-medium hover:bg-[#FFA500]/90 transition-colors"
                    >
                      Donate Zakat
                    </button>
                    <Link
                      href="/programs/zakat/calculator"
                      className="bg-[#FFA500]/80 text-white px-6 py-2 rounded-md font-medium hover:bg-[#FFA500]/70 transition-colors"
                    >
                      Calculate Your Zakat
                    </Link>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Understanding Zakat al-Fitr</h3>
                
                <p>
                  Zakat al-Fitr (also known as Sadaqat al-Fitr) is a special form of charity that must be 
                  given by every Muslim, regardless of age or financial status, before the Eid al-Fitr prayer 
                  at the end of Ramadan. It helps purify the fasting person from any shortcomings during the 
                  month and ensures that the less fortunate can also celebrate Eid.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-xl my-6 border-l-4 border-[#FFA500]">
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Amount:</span> The amount for Zakat al-Fitr is typically the cost of one meal 
                    or approximately 2.5 kg (5.5 lbs) of the staple food in your region. In monetary terms, 
                    this is approximately $15 per person in your household.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Timing:</span> It should be paid before the Eid prayer so that it can 
                    be distributed to those in need before Eid day. However, we accept and distribute Zakat al-Fitr 
                    donations throughout the month of Ramadan.
                  </p>
                  
                  <div className="mt-4">
                    <button
                      onClick={handleDonateZakatAlFitr}
                      className="bg-[#FFA500] text-white px-6 py-2 rounded-md font-medium hover:bg-[#FFA500]/90 transition-colors"
                    >
                      Donate Zakat al-Fitr ($15/person)
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
                The Impact of Your Zakat
              </h2>
              
              <p className="text-lg text-gray-700 mb-10">
                Your Zakat contributions have transformed countless lives across communities worldwide. 
                Here's how your donations are making a meaningful difference:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/zakat/emergency-relief.jpg"
                    alt="Emergency Relief"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Emergency Relief</h3>
                  <p className="text-gray-700">
                    When disasters strike, your Zakat provides immediate assistance to affected families. 
                    Last year alone, we delivered emergency food, shelter, and medical aid to over 2,300 
                    families in crisis situations across multiple countries, helping them survive the 
                    most challenging times of their lives.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="order-2 md:order-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Empowerment</h3>
                  <p className="text-gray-700">
                    Beyond immediate relief, Zakat funds are used to break the cycle of poverty through 
                    sustainable solutions. We've established microfinance projects that have helped 780+ 
                    families start small businesses, with a remarkable 85% success rate in achieving financial 
                    independence within two years.
                  </p>
                </div>
                
                <div className="relative h-64 rounded-xl overflow-hidden order-1 md:order-2">
                  <Image
                    src="/zakat/financial-empowerment.jpg"
                    alt="Financial Empowerment"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/zakat/medical-assistance.jpg"
                    alt="Medical Assistance"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Medical Assistance</h3>
                  <p className="text-gray-700">
                    For many families, medical expenses can be catastrophic. Through Zakat funds, we've 
                    covered critical medical treatments for 1,250+ individuals who otherwise couldn't afford 
                    care, including surgeries, chronic disease management, and maternal healthcare, literally 
                    saving lives and restoring hope.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-[#FFA500]/5 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Testimonials from Recipients</h3>
                <div className="space-y-4">
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "After my husband passed away, I was left with three children and no source of income. 
                      The Zakat assistance we received not only helped us with immediate needs but also funded 
                      a small sewing business that now supports my family. We are forever grateful for this 
                      blessing from Allah through your organization."
                    </p>
                    <p className="font-medium text-[#FFA500]">— Aisha, Widow and Business Owner</p>
                  </div>
                  
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      "I had been struggling with a chronic heart condition for years, unable to afford the 
                      surgery I needed. The Zakat medical assistance program covered my treatment completely. 
                      Now I can work again and support my family. This is the true meaning of Zakat - bringing 
                      people from darkness to light."
                    </p>
                    <p className="font-medium text-[#FFA500]">— Mahmoud, Medical Assistance Recipient</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={handleDonateZakat}
                    className="bg-[#FFA500] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFA500]/90 transition-colors"
                  >
                    Donate Zakat
                  </button>
                  <Link
                    href="/programs/zakat/calculator"
                    className="bg-[#FFA500]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFA500]/70 transition-colors"
                  >
                    Calculate Your Zakat
                  </Link>
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
                    question: "How do you ensure my Zakat is given to eligible recipients?",
                    answer: "We follow strict Shariah guidelines for Zakat disbursement. Our dedicated Zakat team, supervised by qualified scholars, carefully verifies each potential recipient against the eight categories mentioned in the Quran. We conduct thorough needs assessments, verify income and asset information, and document each case to ensure compliance with Islamic principles."
                  },
                  {
                    question: "Is my donation 100% Zakat or do you deduct administrative fees?",
                    answer: "100% of your Zakat donation goes directly to eligible recipients. We never deduct administrative fees from Zakat funds. Our operational costs are covered through separate administrative donations and a portion of our general Sadaqah funds, ensuring that your Zakat fulfills its intended purpose."
                  },
                  {
                    question: "When is the best time to pay Zakat?",
                    answer: "Zakat becomes due once your wealth reaches the nisab threshold and a lunar year passes. While many choose to pay during Ramadan for increased rewards, you can fulfill your obligation at any time. What's most important is calculating your Zakat accurately and paying it when it becomes due according to your personal Zakat anniversary."
                  },
                  {
                    question: "How do you calculate Zakat on modern assets like stocks, retirement accounts, or cryptocurrencies?",
                    answer: "For stocks and investment assets held for growth, Zakat is due on the current market value at 2.5%. For retirement accounts, Zakat is generally due on accessible portions. Cryptocurrencies are treated like cash assets with 2.5% due on their market value. Our Zakat calculator includes these categories, but we recommend consulting with a scholar for complex situations."
                  },
                  {
                    question: "Can I specify which category of recipients should receive my Zakat?",
                    answer: "Yes, you can indicate your preference for your Zakat to go toward a specific category of recipients, such as the poor, those in debt, refugees, etc. While we try to honor these preferences, we also allocate funds based on urgent needs and where they can have the most impact, always ensuring they go to eligible recipients."
                  },
                  {
                    question: "Is Zakat due on jewelry?",
                    answer: "According to most scholars, gold and silver jewelry that exceeds what is customarily worn and is kept as wealth/investment is subject to Zakat at 2.5% of its market value. Jewelry that is for normal personal use is generally exempt. Our Zakat calculator can help you determine if your jewelry holdings are subject to Zakat."
                  },
                  {
                    question: "How is Zakat al-Fitr different from regular Zakat?",
                    answer: "Zakat al-Fitr is a special charity given at the end of Ramadan by every Muslim, regardless of wealth. Its purpose is to purify the fasting person and ensure the less fortunate can celebrate Eid. Unlike regular Zakat (which is 2.5% of qualifying wealth), Zakat al-Fitr is a fixed amount per person in the household, equivalent to one day's meals (approximately $15 per person)."
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
                  If you have questions about Zakat calculations, eligibility, or our distribution process, 
                  please don't hesitate to contact us. Our Zakat specialists can provide guidance on your 
                  specific situation.
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
                    onClick={handleDonateZakat}
                    className="bg-[#FFA500] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFA500]/90 transition-colors"
                  >
                    Donate Zakat
                  </button>
                  <Link
                    href="/programs/zakat/calculator"
                    className="bg-[#FFA500]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFA500]/70 transition-colors"
                  >
                    Calculate Your Zakat
                  </Link>
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
              How Our Zakat Process Works
            </h2>
            
            <p className="text-gray-700 text-center mb-12">
              From your donation to reaching those in need, here's how we ensure your Zakat fulfills its purpose:
            </p>
            
            <div className="space-y-12">
              {[
                {
                  step: "1",
                  title: "Calculate & Donate",
                  description: "Use our Zakat calculator to determine your obligation, then make your donation specifying it as Zakat.",
                  icon: <Calculator className="w-6 h-6 text-white" />
                },
                {
                  step: "2",
                  title: "Verification & Assessment",
                  description: "Our Zakat team identifies and verifies potential recipients against Shariah criteria through a thorough assessment process.",
                  icon: <CheckCircle2 className="w-6 h-6 text-white" />
                },
                {
                  step: "3",
                  title: "Distribution",
                  description: "Zakat funds are distributed to eligible recipients based on priority of need and in accordance with Islamic principles.",
                  icon: <Coins className="w-6 h-6 text-white" />
                },
                {
                  step: "4",
                  title: "Impact & Reporting",
                  description: "We track the impact of your Zakat and provide transparent reporting on how funds were used and lives changed.",
                  icon: <Heart className="w-6 h-6 text-white" />
                }
              ].map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
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
                  onClick={handleDonateZakat}
                  className="bg-[#FFA500] text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFA500]/90 transition-colors"
                >
                  Donate Zakat
                </button>
                <Link
                  href="/programs/zakat/calculator"
                  className="bg-[#FFA500]/80 text-white px-6 py-3 rounded-md font-medium hover:bg-[#FFA500]/70 transition-colors"
                >
                  Calculate Your Zakat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#FFA500] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-2xl lg:text-3xl font-bold mb-4">
              Fulfill Your Zakat Obligation Today
            </h2>
            <p className="text-white/80 mb-8">
              Your Zakat has the power to transform lives. By entrusting us with your obligation, 
              you ensure that your donation reaches those who truly need it, in accordance with 
              Islamic principles.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleDonateZakat}
                className="bg-white text-[#FFA500] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Donate Zakat
              </button>
              <Link
                href="/programs/zakat/calculator"
                className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Calculate Your Zakat
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Toaster position="bottom-center" />
    </>
  );
}

export default function ZakatProgram() {
  return (
    <DonationProvider>
      <ZakatProgramContent />
    </DonationProvider>
  );
}