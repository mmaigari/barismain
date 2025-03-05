"use client"

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from "@/components/navigation/Navbar";
import AuthModal from "@/components/auth/AuthModal";
import AboutOverview from '@/components/about/AboutOverview';
import AboutVisionMission from '@/components/about/AboutVisionMission';
import AboutStructure from '@/components/about/AboutStructure';
import AboutPrograms from '@/components/about/AboutPrograms';
import AboutImpact from '@/components/about/AboutImpact';
import AboutPartners from '@/components/about/AboutPartners';
import AboutReports from '@/components/about/AboutReports';
import { ChevronRight, Users, Target, Award, Layout, Building, BarChart, Handshake, FileText } from 'lucide-react';
import AboutValues from '@/components/about/AboutValues';

// Separate component that uses useSearchParams
function AboutContent() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');
  
  const [activeSection, setActiveSection] = useState(sectionParam || "overview");
  
  // Wrap navItems in useMemo to prevent recreation on each render
  const navItems = useMemo(() => [
    { id: "overview", label: "Overview", icon: "Users" },
    { id: "vision-mission", label: "Vision & Mission", icon: "Target" },
    { id: "values", label: "Our Values", icon: "Award" },
    { id: "structure", label: "Our Structure", icon: "Layout" },
    { id: "programs", label: "Our Programs", icon: "Building" },
    { id: "impact", label: "Our Impact", icon: "BarChart" },
    { id: "partners", label: "Our Partners", icon: "Handshake" },
    { id: "reports", label: "Annual Reports", icon: "FileText" },
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
      case "overview":
        return <AboutOverview />;
      case "vision-mission":
        return <AboutVisionMission />;
      case "values":
        return <AboutValues />;
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

  // Import the icons you need
  const getIcon = (iconName: string, className: string = "w-4 h-4") => {
    switch(iconName) {
      case "Users": return <Users className={className} />;
      case "Target": return <Target className={className} />;
      case "Award": return <Award className={className} />;
      case "Layout": return <Layout className={className} />;
      case "Building": return <Building className={className} />;
      case "BarChart": return <BarChart className={className} />;
      case "Handshake": return <Handshake className={className} />;
      case "FileText": return <FileText className={className} />;
      default: return <ChevronRight className={className} />;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar (LeftColumn) - Hidden on mobile */}
        <div className="hidden lg:block lg:w-1/4">
          <div className="sticky top-24">
            <h2 className="font-montserrat text-2xl font-bold text-[#09869a] mb-6">About</h2>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    changeSection(item.id);
                    // Update URL without reload
                    window.history.pushState({}, '', `/about?section=${item.id}`);
                  }}
                  className={`flex items-center w-full text-left p-3 rounded-md transition-colors font-montserrat ${
                    activeSection === item.id
                      ? "bg-[#09869a]/10 text-[#09869a] font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {/* Use getIcon function here */}
                  {getIcon(item.icon, `w-5 h-5 mr-3 ${
                    activeSection === item.id ? "text-[#09869a]" : "text-gray-400"
                  }`)}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
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
export default function AboutPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar onAuthModalOpen={() => setAuthModalOpen(true)} />
      
      <Suspense fallback={<div className="container mx-auto p-8 text-center">Loading...</div>}>
        <AboutContent />
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