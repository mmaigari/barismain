"use client"

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AboutStructure from '@/components/about/AboutStructure';
import AboutPrograms from '@/components/about/AboutPrograms';
import AboutImpact from '@/components/about/AboutImpact';
import AboutPartners from '@/components/about/AboutPartners';
import AboutReports from '@/components/about/AboutReports';
import { ChevronRight } from 'lucide-react';

// Create a separate client component that uses useSearchParams
function AboutContent() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');
  
  const [activeSection, setActiveSection] = useState(sectionParam || "overview");
  
  const navItems = useMemo(() => [
    { id: "overview", label: "Overview" },
    { id: "vision-mission", label: "Vision & Mission" },
    { id: "structure", label: "Our Structure" },
    { id: "programs", label: "Our Programs" },
    { id: "impact", label: "Our Impact" },
    { id: "partners", label: "Our Partners" },
    { id: "reports", label: "Annual Reports" },
  ], []);
  
  useEffect(() => {
    if (sectionParam && navItems.some(item => item.id === sectionParam)) {
      setActiveSection(sectionParam);
    }
  }, [sectionParam, navItems]);
  
  const changeSection = (id: string) => {
    setActiveSection(id);
  };

  // Render the actual content here - this was missing in the original code
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation sidebar */}
        <div className="md:w-1/4">
          <nav className="sticky top-24">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => changeSection(item.id)}
                    className={`flex items-center w-full p-3 rounded-lg transition ${
                      activeSection === item.id
                        ? "bg-[#09869a] text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {activeSection === item.id && (
                      <ChevronRight className="h-4 w-4 mr-2" />
                    )}
                    <span className={activeSection === item.id ? "ml-0" : "ml-6"}>
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Content area */}
        <div className="md:w-3/4">
          {activeSection === "structure" && <AboutStructure />}
          {activeSection === "programs" && <AboutPrograms />}
          {activeSection === "impact" && <AboutImpact />}
          {activeSection === "partners" && <AboutPartners />}
          {activeSection === "reports" && <AboutReports />}
          {/* Add other sections as needed */}
        </div>
      </div>
    </div>
  );
}

// Main page component wrapping the content with Suspense
export default function AboutPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-8">Loading...</div>}>
      <AboutContent />
    </Suspense>
  );
}