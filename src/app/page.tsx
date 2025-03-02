"use client"

import React, { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import AuthModal from "@/components/auth/AuthModal";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ValuesSection from "@/components/home/ValuesSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GetInvolvedSection from "@/components/home/GetInvolvedSection";
import ImpactSection from "@/components/home/ImpactSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAuthModalOpen={() => setAuthModalOpen(true)} />
      
      {/* Content sections */}
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <ProgramsSection />
      <TestimonialsSection />
      <GetInvolvedSection />
      <ImpactSection />
      <ContactSection />
      
      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
