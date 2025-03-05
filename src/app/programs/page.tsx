"use client"

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Droplet, Utensils, GraduationCap, 
  Heart, Building, Users, Briefcase, ArrowLeft, ArrowRight, 
  Handshake, Calculator, Leaf } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import AuthModal from '@/components/auth/AuthModal';

// Define program data structure
interface Program {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

export default function ProgramsPage() {
  // Carousel refs and state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [authModal, setAuthModal] = useState(false);

  // Programs matching exactly what's in the navbar dropdown
  const programs: Program[] = [
    {
      id: "medical",
      name: "Medical Program",
      description: "Providing essential healthcare services to vulnerable communities in need.",
      icon: <Heart className="w-6 h-6" />,
      color: "#FF6F61",
      link: "/programs/medical"
    },
    {
      id: "campaigns",
      name: "Campaigns",
      description: "Focused initiatives addressing urgent humanitarian needs and crisis response.",
      icon: <Users className="w-6 h-6" />,
      color: "#008080",
      link: "/programs/campaigns"
    },
    {
      id: "sponsorship",
      name: "Sponsorship",
      description: "Support programs for vulnerable individuals through direct sponsorship.",
      icon: <Handshake className="w-6 h-6" />,
      color: "#E1AD01",
      link: "/programs/sponsorship"
    },
    {
      id: "education",
      name: "Education",
      description: "Access to quality education for marginalized communities and students.",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "#800000",
      link: "/programs/education"
    },
    {
      id: "zakat",
      name: "Zakat",
      description: "Distribute zakat funds to eligible recipients in accordance with Islamic principles.",
      icon: <Calculator className="w-6 h-6" />,
      color: "#FFA500",
      link: "/programs/zakat"
    },
    {
      id: "food",
      name: "Food Program",
      description: "Addressing hunger through sustainable food distribution and agricultural initiatives.",
      icon: <Utensils className="w-6 h-6" />,
      color: "#008080",
      link: "/programs/food"
    },
    {
      id: "wash",
      name: "WASH Program",
      description: "Water, sanitation, and hygiene solutions for communities facing water scarcity.",
      icon: <Droplet className="w-6 h-6" />,
      color: "#FFDE59",
      link: "/programs/wash"
    },
    {
      id: "community",
      name: "Community Resilience",
      description: "Building community capacity to withstand and recover from crises and disasters.",
      icon: <Leaf className="w-6 h-6" />,
      color: "#FF6F61",
      link: "/programs/community"
    },
    {
      id: "recovery",
      name: "Early Recovery",
      description: "Supporting communities to rebuild livelihoods after disasters and conflicts.",
      icon: <Briefcase className="w-6 h-6" />,
      color: "#FF6F61",
      link: "/programs/recovery"
    },
    {
      id: "sadaka",
      name: "Sadaka Jariya",
      description: "Long-term charitable projects that provide continuous benefits to communities.",
      icon: <Building className="w-6 h-6" />,
      color: "#008080",
      link: "/programs/sadaka"
    }
  ];

  // Handle carousel scrolling
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const handleResize = () => {
      if (scrollRef.current) {
        setMaxScroll(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const cardWidth = scrollRef.current.clientWidth / 3; // Assuming 3 cards visible
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    const newPosition = Math.max(0, Math.min(scrollPosition + scrollAmount, maxScroll));
    setScrollPosition(newPosition);
    
    scrollRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Navbar onAuthModalOpen={() => setAuthModal(true)} />
      <AuthModal isOpen={authModal} onClose={() => setAuthModal(false)} />
      
      <div className="min-h-screen bg-gray-50 pt-24 lg:pt-[120px] pb-16">
        {/* Hero Section */}
        <section className="bg-[#f8f9fa] py-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-[#09869a] flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-[#09869a] font-medium">Programs</span>
            </div>
            
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-[#09869a] mb-4">
              Our Programs
            </h1>
            <div className="w-24 h-1.5 bg-[#FA6418] rounded-full mb-6"></div>
            <p className="text-gray-700 text-xl max-w-3xl">
              Donate and contribute to emerging projects and campaigns that make a difference in vulnerable communities.
            </p>
          </div>
        </section>
        
        {/* Programs Carousel */}
        <section className="py-16 bg-[#f8f9fa]" >
          <div className="container mx-auto px-4 relative">
            {/* Carousel Navigation */}
            <div className="flex justify-end gap-2 mb-6">
              <button 
                onClick={() => scroll('left')} 
                className="p-2 rounded-full border border-gray-200 text-[#09869a] hover:bg-[#09869a] hover:text-white transition-colors disabled:opacity-50"
                disabled={scrollPosition <= 0}
                aria-label="Scroll left"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')} 
                className="p-2 rounded-full border border-gray-200 text-[#09869a] hover:bg-[#09869a] hover:text-white transition-colors disabled:opacity-50"
                disabled={scrollPosition >= maxScroll}
                aria-label="Scroll right"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Carousel Container */}
            <div className="relative overflow-x-auto hide-scrollbar pb-4" ref={scrollRef}>
              <div className="flex gap-6 w-max">
                {programs.map((program) => (
                  <Link 
                    href={program.link} 
                    key={program.id}
                    className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden group w-[300px]"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div 
                          className="p-3 rounded-lg mr-4"
                          style={{ backgroundColor: `${program.color}15` }}
                        >
                          <div style={{ color: program.color }}>
                            {program.icon}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#09869a] transform group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="text-xl font-bold text-[#006666] mb-2">
                        {program.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {program.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Programs Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="font-montserrat text-3xl font-bold text-[#09869a] mb-8 text-center">
              Featured Programs
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.slice(0, 6).map((program) => (
                <Link 
                  href={program.link} 
                  key={`featured-${program.id}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="p-3 rounded-lg mr-4"
                        style={{ backgroundColor: `${program.color}15` }}
                      >
                        <div style={{ color: program.color }}>
                          {program.icon}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#09869a] transform group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-xl font-bold text-[#006666] mb-2">
                      {program.name}
                    </h3>
                    <p className="text-gray-600">
                      {program.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-[#09869a] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Your contribution can change lives. Join us in our mission to provide sustainable solutions and emergency relief to those who need it most.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link 
                href="/donate" 
                className="bg-white text-[#09869a] py-3 px-8 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Donate Now
              </Link>
              <Link 
                href="/contact" 
                className="bg-transparent border border-white text-white py-3 px-8 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}