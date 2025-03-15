"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Book, Shield, FileText, Heart, Calendar } from 'lucide-react';
import Navbar from "@/components/navigation/Navbar";
import AuthModal from "@/components/auth/AuthModal";
import DonationGuide from '@/components/help/DonationGuide';
import { useDonation } from '@/contexts/DonationContext';
import DonationModals from '@/components/donation/DonationModals';

export default function HelpDonationGuidePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // Add the missing hooks you're using
  const { 
    setCurrentModal, 
    setProgramName,
    setDonationAmount, // This was missing
    setDonationFrequency // This was missing
  } = useDonation();
  
  // Navigation items for related sections
  const relatedSections = [
    { id: "privacy", label: "Privacy Policy", icon: Shield },
    { id: "terms", label: "Terms of Use", icon: FileText },
  ];
  
  // Function to start a donation
  const handleStartDonation = () => {
    setProgramName('General Donation');
    setCurrentModal('donationOptions');
  };

  // Function for recurring donation
  const handleRecurringDonation = () => {
    setProgramName('Recurring Support');
    setDonationAmount(25); // Now this will work
    setDonationFrequency('monthly'); // Now this will work
    setCurrentModal('recurringDonation');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar onAuthModalOpen={() => setAuthModalOpen(true)} />
      
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#09869a] flex items-center">
            <Home className="w-3.5 h-3.5 mr-1" />
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1" />
          <Link href="/help" className="hover:text-[#09869a]">
            Help
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1" />
          <span className="text-[#09869a] font-medium">Donation Guide</span>
        </div>
        
        {/* Main Content Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-10">
          <DonationGuide />
          
          {/* Donation CTA */}
          <div className="mt-10 bg-gradient-to-r from-[#09869a]/10 to-[#09869a]/5 p-6 rounded-lg border border-[#09869a]/20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-gray-800">Ready to Make a Difference?</h3>
                <p className="text-gray-600 mt-1">Your donation can help change lives today.</p>
              </div>
              <button
                onClick={handleStartDonation}
                className="px-6 py-3 bg-[#09869a] hover:bg-[#09869a]/90 text-white rounded-md font-medium flex items-center transition-colors"
              >
                <Heart className="w-5 h-5 mr-2 text-white" />
                Make a Donation Now
              </button>
            </div>
          </div>

          {/* Recurring Donation CTA */}
          <div className="mt-10 bg-gradient-to-r from-[#0AB95F]/10 to-[#0AB95F]/5 p-6 rounded-lg border border-[#0AB95F]/20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-gray-800">Become a Regular Supporter</h3>
                <p className="text-gray-600 mt-1">
                  Set up a recurring donation to help us create sustainable impact.
                </p>
              </div>
              <button
                onClick={handleRecurringDonation}
                className="px-6 py-3 bg-[#0AB95F] hover:bg-[#0AB95F]/90 text-white rounded-md font-medium flex items-center transition-colors"
              >
                <Calendar className="w-5 h-5 mr-2 text-white" />
                Set Up Monthly Support
              </button>
            </div>
          </div>
        </div>
        
        {/* Related Sections */}
        <div className="mt-12">
          <h2 className="font-montserrat text-2xl font-bold text-gray-800 mb-6">
            Explore Related Sections
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedSections.map((section, index) => {
              const isEven = index % 2 === 0;
              const colorScheme = isEven 
                ? { bg: "bg-[#09869a]/5", hover: "hover:bg-[#09869a]/10", text: "text-[#09869a]" }
                : { bg: "bg-[#FA6418]/5", hover: "hover:bg-[#FA6418]/10", text: "text-[#FA6418]" };
              
              return (
                <Link 
                  href={`/help/${section.id}`}
                  key={section.id}
                  className={`p-4 rounded-lg ${colorScheme.bg} ${colorScheme.hover} flex items-center group transition-colors`}
                >
                  <section.icon className={`h-5 w-5 mr-3 ${colorScheme.text}`} />
                  <span className="font-medium">{section.label}</span>
                  <ChevronRight className={`ml-auto h-4 w-4 ${colorScheme.text} transition-transform group-hover:translate-x-1`} />
                </Link>
              );
            })}
            
            {/* Add Donation Link */}
            <button
              onClick={handleStartDonation} 
              className="p-4 rounded-lg bg-[#09869a]/10 hover:bg-[#09869a]/20 flex items-center group transition-colors"
            >
              <Heart className="h-5 w-5 mr-3 text-[#09869a]" />
              <span className="font-medium">Make a Donation</span>
              <ChevronRight className="ml-auto h-4 w-4 text-[#09869a] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          {/* Back to All Sections */}
          <div className="mt-8 text-center">
            <Link 
              href="/help" 
              className="inline-flex items-center text-[#09869a] hover:text-[#09869a]/80 font-medium"
            >
              <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
              Back to All Help Sections
            </Link>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <DonationModals />
    </div>
  );
}