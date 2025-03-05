"use client"

import React, { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import AuthModal from "@/components/auth/AuthModal";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ImpactSection from "@/components/home/ImpactSection";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAuthModalOpen={() => setAuthModalOpen(true)} />
      
      {/* Content sections */}
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <TestimonialsSection />
      <ImpactSection />
   
      
      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
