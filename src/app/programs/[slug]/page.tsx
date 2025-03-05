"use client"

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';

export default function ProgramDetailPage() {
  const [authModal, setAuthModal] = useState(false);
  const params = useParams();
  const programSlug = params.slug;

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      <div className="min-h-screen bg-gray-50 pt-24 lg:pt-[120px] pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">
            {/* Display program name based on slug */}
            {programSlug === 'medical' && 'Medical Program'}
            {programSlug === 'education' && 'Education Program'}
            {programSlug === 'food' && 'Food Program'}
            {/* Add other program types as needed */}
          </h1>
          <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mb-8"></div>
          
          {/* Program-specific content goes here */}
        </div>
      </div>
    </>
  );
}