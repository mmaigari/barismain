"use client"

import React, { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import AuthModal from "@/components/auth/AuthModal";
import HeroSection from "@/components/home/HeroSection";
import VideoSection from "@/components/home/VideoSection";
import AboutSection from "@/components/home/AboutSection";
import ActivePrograms from "@/components/home/ActivePrograms";
import AboutPartners from "@/components/about/AboutPartners";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAuthModalOpen={() => setAuthModalOpen(true)} />
      
      {/* Content sections */}
      <HeroSection />
      <VideoSection />
      <AboutSection />
      <ActivePrograms />

      <AboutPartners />
   
      
      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
