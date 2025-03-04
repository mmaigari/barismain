"use client"
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';
import Breadcrumb from '@/components/navigation/Breadcrumb';

export default function HelpLayoutClient({ children }: { children: React.ReactNode }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const pathname = usePathname();
  
  // Generate breadcrumb items based on the current path
  const getBreadcrumbItems = () => {
    const pathSegments = pathname.split('/').filter(segment => segment);
    
    // Always add "Help" as the first breadcrumb item
    const items = [{ label: 'Help', href: '/help' }];
    
    // Handle deeper paths
    if (pathSegments.length > 1) {
      const currentPage = pathSegments[pathSegments.length - 1];
      let label = '';
      
      // Map URLs to readable labels
      switch (currentPage) {
        case 'chat-support':
          label = 'Chat with Support Team';
          break;
        case 'faqs':
          label = 'FAQs';
          break;
        case 'terms':
          label = 'Terms of Use';
          break;
        case 'privacy':
          label = 'Privacy Policy';
          break;
        case 'contact':
          label = 'Contact Us';
          break;
        case 'feedback':
          label = 'Send Feedback';
          break;
        default:
          label = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
      }
      
      items.push({ label, href: pathname || '/help' });
    }
    
    return items;
  };
  
  return (
    <div className="bg-[#09869a] flex flex-col min-h-screen">
      <Navbar onAuthModalOpen={() => setAuthModalOpen(true)} />
      
      {/* Hero section for Help pages */}
      <div className="bg-[#09869a] text-white py-12 mt-[79px]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">Help & Support</h1>
            <p className="text-lg opacity-90">
              Find answers to your questions and get support from our team
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 flex-grow">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
              <Breadcrumb items={getBreadcrumbItems()} />
            </div>
            
            {/* Main content */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}