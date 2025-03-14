"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from "@/components/navigation/Navbar";
import AuthModal from "@/components/auth/AuthModal";
import { ChevronRight, Home, MessageSquareText, HelpCircle, FileText, Mail, Phone, Shield, Book, UserCheck } from 'lucide-react';

export default function HelpPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // Navigation items for help section
  const navItems = [
    { id: "faqs", label: "Frequently Asked Questions", icon: HelpCircle, description: "Find answers to common questions about our organization and services" },
    { id: "terms", label: "Terms of Use", icon: FileText, description: "Read our terms and conditions for using our website and services" },
    { id: "contact", label: "Contact Us", icon: Phone, description: "Get in touch with our team through various channels" },
    { id: "privacy", label: "Privacy Policy", icon: Shield, description: "Learn how we protect and manage your personal information" }

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
          <span className="text-[#09869a] font-medium">Help</span>
        </div>
        
        <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-[#09869a] mb-4">
          Help Center
        </h1>
        <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mb-6"></div>
        
        <p className="text-lg text-gray-700 max-w-3xl mb-12">
          Welcome to our Help Center. Find answers, get support, and learn more about 
          our organization. Select a topic below to explore.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          {navItems.map((item, index) => {
            // Alternate between two color schemes
            const isEven = index % 2 === 0;
            const colorScheme = isEven 
              ? { bg: "bg-[#09869a]/5", hover: "hover:bg-[#09869a]/10", text: "text-[#09869a]", icon: "text-[#09869a]" }
              : { bg: "bg-[#FA6418]/5", hover: "hover:bg-[#FA6418]/10", text: "text-[#FA6418]", icon: "text-[#FA6418]" };
            
            return (
              <Link 
                href={`/help/${item.id}`} 
                key={item.id} 
                className={`w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] p-6 rounded-lg ${colorScheme.bg} ${colorScheme.hover} transition-colors border border-transparent hover:border-gray-200 group max-w-sm`}
              >
                <div className="flex items-start">
                  <div className={`p-3 rounded-full bg-white mr-4 ${colorScheme.text}`}>
                    <item.icon className={`h-6 w-6 ${colorScheme.icon}`} />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-gray-900">{item.label}</h2>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <span className={`inline-flex items-center font-medium ${colorScheme.text}`}>
                      Learn more <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}