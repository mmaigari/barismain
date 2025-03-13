"use client"

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Navbar from "@/components/navigation/Navbar";
import AuthModal from "@/components/auth/AuthModal";
import AboutOverview from '@/components/about/AboutOverview';
import AboutVisionMission from '@/components/about/AboutVisionMission';
import AboutStructure from '@/components/about/AboutStructure';
import AboutPrograms from '@/components/about/AboutPrograms';
import AboutImpact from '@/components/about/AboutImpact';
import AboutPartners from '@/components/about/AboutPartners';
import AboutReports from '@/components/about/AboutReports';
import { ChevronRight, Home, Users, Target, Award, Layout, Building, BarChart, Handshake, FileText } from 'lucide-react';
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
  const pathname = usePathname();
  
  // Navigation items for about section
  const navItems = [
    { id: "overview", label: "Overview", icon: Users, description: "Learn about our organization's history, mission, and impact" },
    { id: "vision-mission", label: "Vision & Mission", icon: Target, description: "Discover our guiding principles and long-term goals" },
    { id: "values", label: "Our Values", icon: Award, description: "Explore the core values that drive our organization" },
    { id: "structure", label: "Our Structure", icon: Layout, description: "Understand our organizational structure and leadership" },
    { id: "programs", label: "Our Programs", icon: Building, description: "Learn about the programs and initiatives we offer" },
    { id: "impact", label: "Our Impact", icon: BarChart, description: "See how we're making a difference in communities" },
    { id: "partners", label: "Our Partners", icon: Handshake, description: "Meet the organizations we collaborate with" },
    { id: "reports", label: "Annual Reports", icon: FileText, description: "Access our annual reports and financial statements" },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar onAuthModalOpen={() => setAuthModalOpen(true)} />
      
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#09869a] flex items-center">
            <Home className="w-3.5 h-3.5 mr-1" />
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1" />
          <span className="text-[#09869a] font-medium">About</span>
        </div>
        
        <h1 className="font-montserrat text-3xl lg:text-4xl font-bold text-[#09869a] mb-4">
          About Baris Charity Foundation
        </h1>
        <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mb-6"></div>
        
        <p className="text-lg text-gray-700 max-w-3xl mb-12">
          Learn more about our organization, our mission, and the impact we're making around the world. 
          Select a topic below to explore different aspects of our work.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {navItems.map((item, index) => {
            // Alternate between two color schemes
            const isEven = index % 2 === 0;
            const colorScheme = isEven 
              ? { bg: "bg-[#09869a]/5", hover: "hover:bg-[#09869a]/10", text: "text-[#09869a]", icon: "text-[#09869a]" }
              : { bg: "bg-[#FA6418]/5", hover: "hover:bg-[#FA6418]/10", text: "text-[#FA6418]", icon: "text-[#FA6418]" };
            
            return (
              <Link 
                href={`/about/${item.id}`} 
                key={item.id} 
                className={`p-6 rounded-lg ${colorScheme.bg} ${colorScheme.hover} transition-colors border border-transparent hover:border-gray-200 group`}
              >
                <div className="flex items-start">
                  <div className={`p-3 rounded-full bg-white mr-4 ${colorScheme.text}`}>
                    <item.icon className={`h-6 w-6 ${colorScheme.icon}`} />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-gray-900">{item.label}</h2>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <span className={`inline-flex items-center font-medium ${colorScheme.text}`}>
                      Learn more <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}