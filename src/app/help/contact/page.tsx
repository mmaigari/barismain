"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Phone, Mail, MessageSquareText, HelpCircle } from 'lucide-react';
import Navbar from "@/components/navigation/Navbar";
import AuthModal from "@/components/auth/AuthModal";
import ContactUs from '@/components/help/ContactUs';

export default function HelpContactPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // Navigation items for related sections
  const relatedSections = [
    { id: "feedback", label: "Send Feedback", icon: Mail },
    { id: "chat-support", label: "Chat Support", icon: MessageSquareText },
    { id: "faqs", label: "Frequently Asked Questions", icon: HelpCircle },
  ];
  
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
          <span className="text-[#09869a] font-medium">Contact Us</span>
        </div>
        
        {/* Main Content Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-10">
          <ContactUs />
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
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}