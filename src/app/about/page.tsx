"use client"

import React, { useState, useEffect } from 'react'; // Removed useRef
import { useSearchParams } from 'next/navigation';
import Navbar from "@/components/navigation/Navbar";
import AuthModal from "@/components/auth/AuthModal";
// Import only what you're using
import AboutOverview from '@/components/about/AboutOverview';
import AboutVisionMission from '@/components/about/AboutVisionMission';
import AboutStructure from '@/components/about/AboutStructure';
import AboutPrograms from '@/components/about/AboutPrograms';
import AboutImpact from '@/components/about/AboutImpact';
import AboutPartners from '@/components/about/AboutPartners';
import AboutReports from '@/components/about/AboutReports';
import { ChevronRight } from 'lucide-react';
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(sectionParam || "overview");
  
  // Navigation items configuration
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "vision-mission", label: "Vision & Mission" },
    { id: "structure", label: "Our Structure" },
    { id: "programs", label: "Our Programs" },
    { id: "impact", label: "Our Impact" },
    { id: "partners", label: "Our Partners" },
    { id: "reports", label: "Annual Reports" },
  ];
  
  // Update active section when URL parameter changes
  useEffect(() => {
    if (sectionParam && navItems.some(item => item.id === sectionParam)) {
      setActiveSection(sectionParam);
    }
  }, [sectionParam, navItems]); // Added navItems to deps array
  
  // Function to change the active section
  const changeSection = (id: string) => {
    setActiveSection(id);
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set('section', id);
    window.history.pushState({}, '', url);
    // Scroll back to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the active section content
  const renderActiveSection = () => {
    switch(activeSection) {
      case "overview":
        return <AboutOverview />;
      case "vision-mission":
        return <AboutVisionMission />;
      case "structure":
        return <AboutStructure />;
      case "programs":
        return <AboutPrograms />;
      case "impact":
        return <AboutImpact />;
      case "partners":
        return <AboutPartners />;
      case "reports":
        return <AboutReports />;
      default:
        return <AboutOverview />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar onAuthModalOpen={() => setAuthModalOpen(true)} />
      
      
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar (Left Column) */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <h2 className="font-montserrat text-2xl font-bold text-[#09869a] mb-6">About</h2>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => changeSection(item.id)}
                    className={`flex items-center w-full text-left p-3 rounded-md transition-colors ${
                      activeSection === item.id
                        ? "bg-[#09869a]/10 text-[#09869a] font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronRight 
                      className={`w-4 h-4 mr-2 ${
                        activeSection === item.id ? "text-[#09869a]" : "text-gray-400"
                      }`} 
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Main Content (Right Column) - Only show active section */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              {/* Display only the active section */}
              <div className="animate-fadeIn">
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      
      {/* Footer */}
   
    </div>
  );
}