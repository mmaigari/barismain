"use client"

import React, { useState } from 'react';
import Navbar from "@/components/navigation/Navbar";
import AuthModal from "@/components/auth/AuthModal";
import AboutHero from '@/components/about/AboutHero';
import AboutOverview from '@/components/about/AboutOverview';
import AboutVisionMission from '@/components/about/AboutVisionMission';
import AboutStructure from '@/components/about/AboutStructure';
import AboutPrograms from '@/components/about/AboutPrograms';
import AboutImpact from '@/components/about/AboutImpact';
import AboutPartners from '@/components/about/AboutPartners';

export default function AboutPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onAuthModalOpen={() => setAuthModalOpen(true)} />
      <AboutHero />
      <AboutOverview />
      <AboutVisionMission />
      <AboutStructure />
      <AboutPrograms />
      <AboutImpact />
      <AboutPartners />
      
      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}