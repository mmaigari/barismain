"use client"

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from "@/components/navigation/Navbar";
import AuthModal from "@/components/auth/AuthModal";
import { ChevronRight, MessageSquareText, HelpCircle, FileText, Mail, Phone, Shield, Book, UserCheck } from 'lucide-react';

// Import components from existing help page files
import ChatSupport from '@/components/help/ChatSupport';
import FAQs from '@/components/help/FAQs';
import TermsOfUse from '@/components/help/TermsOfUse';
import SendFeedback from '@/components/help/SendFeedback';
import ContactUs from '@/components/help/ContactUs';
import PrivacyPolicy from '@/components/help/PrivacyPolicy';


// Separate component that uses useSearchParams
function HelpContent() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');
  
  const [activeSection, setActiveSection] = useState(sectionParam || "chat-support");
  
  // Wrap navItems in useMemo to prevent recreation on each render
  const navItems = useMemo(() => [
    { id: "chat-support", label: "Chat Support", icon: "MessageSquareText" },
    { id: "faqs", label: "FAQs", icon: "HelpCircle" },
    { id: "terms", label: "Terms of Use", icon: "FileText" },
    { id: "feedback", label: "Send Feedback", icon: "Mail" },
    { id: "contact", label: "Contact Us", icon: "Phone" },
    { id: "privacy", label: "Privacy Policy", icon: "Shield" },
    { id: "donation-guide", label: "Donation Guide", icon: "Book" },
    { id: "volunteer-info", label: "Volunteer Information", icon: "UserCheck" },
  ], []);
  
  // Update active section when URL parameter changes
  useEffect(() => {
    if (sectionParam && navItems.some(item => item.id === sectionParam)) {
      setActiveSection(sectionParam);
    }
  }, [sectionParam, navItems]);
  
  const changeSection = (id: string) => {
    setActiveSection(id);
  };
  
  // Helper function to render the active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "chat-support":
        return <ChatSupport />;
      case "faqs":
        return <FAQs />;
      case "terms":
        return <TermsOfUse />;
      case "feedback":
        return <SendFeedback />;
      case "contact":
        return <ContactUs />;
      case "privacy":
        return <PrivacyPolicy />;
    
      default:
        return <ChatSupport />;
    }
  };

  // Import the icons you need
  const getIcon = (iconName: string, className: string = "w-4 h-4") => {
    switch(iconName) {
      case "MessageSquareText": return <MessageSquareText className={className} />;
      case "HelpCircle": return <HelpCircle className={className} />;
      case "FileText": return <FileText className={className} />;
      case "Mail": return <Mail className={className} />;
      case "Phone": return <Phone className={className} />;
      case "Shield": return <Shield className={className} />;
      case "Book": return <Book className={className} />;
      case "UserCheck": return <UserCheck className={className} />;
      default: return <ChevronRight className={className} />;
    }
  };
  
  // Helper function for getting background and border color based on section
  const getSectionColors = (id: string) => {
    // Alternating colors for each section
    const isEvenIndex = navItems.findIndex(item => item.id === id) % 2 === 0;
    return isEvenIndex 
      ? {bg: 'bg-[#09869a]/10', text: 'text-[#09869a]'}
      : {bg: 'bg-[#FA6418]/10', text: 'text-[#FA6418]'};
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar (LeftColumn) - Hidden on mobile */}
        <div className="hidden lg:block lg:w-1/4">
          <div className="sticky top-24">
            <h2 className="font-montserrat text-2xl font-bold text-[#09869a] mb-6">Help Center</h2>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const colors = getSectionColors(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      changeSection(item.id);
                      // Update URL without reload
                      window.history.pushState({}, '', `/help?section=${item.id}`);
                    }}
                    className={`flex items-center w-full text-left p-3 rounded-md transition-colors font-montserrat ${
                      activeSection === item.id
                        ? `${colors.bg} ${colors.text} font-medium`
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {/* Use getIcon function here */}
                    {getIcon(item.icon, `w-5 h-5 mr-3 ${
                      activeSection === item.id ? colors.text : "text-gray-400"
                    }`)}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
            
            {/* Help Search Box */}
            <div className="mt-8 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Need more help?
              </h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search help articles..." 
                  className="w-full py-2 px-3 pl-9 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
                />
                <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Section Selector - Visible only on mobile */}
        <div className="lg:hidden mb-6">
          <label htmlFor="section-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select help topic
          </label>
          <div className="relative">
            <select
              id="section-select"
              value={activeSection}
              onChange={(e) => {
                changeSection(e.target.value);
                window.history.pushState({}, '', `/help?section=${e.target.value}`);
              }}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#09869a] focus:border-[#09869a] rounded-md"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
          
          {/* Mobile Search Box */}
          <div className="mt-4 relative">
            <input 
              type="text" 
              placeholder="Search help articles..." 
              className="w-full py-2 px-3 pl-9 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09869a] focus:border-transparent"
            />
            <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
        
        {/* Main Content (Right Column) */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="animate-fadeIn">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function HelpPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Suspense fallback={<div className="container mx-auto p-8 text-center">Loading...</div>}>
        <HelpContent />
      </Suspense>
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}