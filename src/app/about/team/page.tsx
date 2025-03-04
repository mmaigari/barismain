"use client"

import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';

export const metadata = {
  title: 'Our Team | BCF',
}

export default function TeamPage() {
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar onAuthModalOpen={() => setAuthModalOpen(true)} />
      
      <AboutHero />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#09869a] mb-6 text-center">
            Our Team
          </h2>
          <div className="w-24 h-1.5 bg-[#FA6418] mx-auto rounded-full mb-8"></div>
          
          {/* Team content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add team members here */}
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}